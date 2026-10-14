import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Script} from 'node:vm';

const src=readFileSync(new URL('../nusajiwa-adventure.js',import.meta.url),'utf8');
function start(){
 const rootEvents={},documentEvents={},keys={};
 const nodes=new Map(),touch={};
 const drawing=new Proxy({},{get(o,k){return k in o?o[k]:()=>{}},set(o,k,v){o[k]=v;return true}});
 function el(name='element'){
  const e={name,hidden:false,innerHTML:'',textContent:'',dataset:{},style:{},
   width:0,height:0,clientWidth:390,clientHeight:812,events:{},
   classList:{add(){},remove(){}},append(){},remove(){},setAttribute(){},
   addEventListener(event,fn){this.events[event]=fn;},
   querySelector(q){if(!nodes.has(q))nodes.set(q,el(q));return nodes.get(q)},
   querySelectorAll(q){return q==='[data-hold]'?Object.values(touch):[]},
   replaceWith(){},cloneNode(){return el('newCanvas')},
   getBoundingClientRect(){return {width:390,height:812}},
   getContext(mode){return mode==='2d'?drawing:null},
   setPointerCapture(){}
  };
  return e;
 }
 for(const type of ['left','right','jump','special']){touch[type]=el(type);touch[type].dataset.hold=type}
 const root=el('root'),scene=el('scene');
 root.addEventListener=(name,fn)=>rootEvents[name]=fn;
 const doc={hidden:false,body:{append(){},classList:{add(){},remove(){}}},
   createElement:()=>root,getElementById:id=>id==='nj35'?scene:null,
   addEventListener:(name,fn,capture)=>{documentEvents[name]=fn}};
 const pet={id:'kuyang',stage:2,retired:false,sick:false,sleep:false,happy:4};
 const store=new Map();const localStorage={getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)};
 let frame=0,next=null,t=0;
 const raf=fn=>{next=fn;return ++frame};
 const win={innerWidth:390,innerHeight:812,devicePixelRatio:1,
   NUSAJIWA_TAMAGOTCHI:{getSave:()=>({active:'kuyang',pets:{kuyang:pet}}),refresh(){},open(){},awardAdventure(){return {earned:true,xp:27,spirit:14}} },
   addEventListener(){}};
 new Script(src).runInNewContext({window:win,document:doc,localStorage,Date,Math,
   console:{warn(){},log(){}},
   setTimeout:()=>1,clearTimeout(){},requestAnimationFrame:raf,cancelAnimationFrame(){next=null}}, {timeout:1000});
 const click=(nja,value='')=>{
  const b={dataset:{nja,value:String(value)}};
  rootEvents.click({target:{closest:()=>b}});
 };
 const hold=(type,on)=>touch[type].events[on?'pointerdown':'pointerup']({
  pointerId:1,preventDefault(){}
 });
 const tick=(count=1)=>{for(let i=0;i<count;i++){if(!next)return;t+=1000/60;const callback=next;next=null;callback(t)}};
 return {win,doc,scene,root,click,hold,tick,store,snapshot:()=>win.NUSAJIWA_ADVENTURE.getRunStatus()};
}
test('real simulated play loop: moving on iPhone, jumping, releasing, skill and pause',()=>{
 const game=start();assert.equal(game.win.NUSAJIWA_ADVENTURE.open(),true);
 game.click('level',0);
 assert.ok(game.snapshot().playing,'Level must actually run');
 const x0=game.snapshot().x;
 game.hold('right',true);
 game.tick(48);
 game.hold('right',false);
 const s=game.snapshot();
 assert.ok(s.x>x0+2,'Holding right should advance the character: '+s.x);
 assert.ok(s.vx>=0);
 game.hold('jump',true);
 game.tick(3);
 const airborne=game.snapshot();
 assert.ok(airborne.y>0,'Jump must lift pet from terrain: '+airborne.y);
 assert.equal(airborne.grounded,false);
 assert.ok(airborne.particles>0,'Jump should generate immediate visual particles');
 game.hold('jump',false);
 game.tick(4);
 assert.ok(game.snapshot().y>0,'Pet stays airborne for subsequent frames');
 game.click('pause');
 assert.equal(game.snapshot().playing,false);
 const frozen=game.snapshot().x;
 game.tick(15);
 assert.equal(game.snapshot().x,frozen,'Game physics must freeze while paused');
 game.click('resume');
 assert.ok(game.snapshot().playing);
 game.click('exit');
 assert.equal(game.scene.hidden,false,'Habitat must reappear');
 assert.equal(game.snapshot(),null,'The closed level must not retain live physics');
});
test('game sound toggle persists without requiring Web Audio APIs',()=>{
 const game=start();game.win.NUSAJIWA_ADVENTURE.open();
 game.click('level',0);
 game.click('audio');
 const save=JSON.parse(game.store.get('nusajiwa-adventure-v1'));
 assert.equal(save.sound,false);
 game.click('audio');
 assert.equal(JSON.parse(game.store.get('nusajiwa-adventure-v1')).sound,true);
 game.click('exit');
});
