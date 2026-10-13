import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Script} from 'node:vm';

const code=readFileSync(new URL('../tamagotchi-3d.js',import.meta.url),'utf8');
function boot(old={}){
 const memory=new Map(Object.entries(old)),events=new Map(),nodes=new Map(),seen=[];
 function el(){return {innerHTML:'',textContent:'',hidden:false,dataset:{},style:{},
  classList:{add(){},remove(){},toggle(){},contains(){return false}},
  addEventListener(t,f){events.set(t,f)},append(){},remove(){},click(){},setAttribute(){},
  focus(){},scrollIntoView(){},querySelectorAll(){return []},
  querySelector(q){if(!nodes.has(q))nodes.set(q,el());return nodes.get(q)}};
 }
 const scene=el();scene.append=n=>scene.child=n;
 const engine={version:1,spirit:120,pets:{},stones:{}};let selected='komodo';
 scene.querySelector=q=>{
  if(q==='#nj35Side.open'||q==='.nj-fallback')return null;
  if(q==='#nj35Adopt')return {click(){engine.pets[selected]={species:selected,phase:0,xp:0,stats:{hunger:75,happy:75,clean:75,energy:75,bond:10}}}};
  if(q==='#nj37Evolve')return {click(){if(engine.pets[selected]?.phase===0){engine.pets[selected].phase=1;engine.pets[selected].xp=8}}};
  if(q==='[data-njcare="feed"]')return {click(){engine.pets[selected].xp+=9}};
  if(q==='[data-njtab="archive"]')return {click(){seen.push('archive')}};
  return null;
 };
 const api={creatures:[{id:'komodo',name:'Komodo',origin:'Nusa Tenggara Timur'},
  {id:'tiger',name:'Harimau Sumatra',origin:'Sumatra'},{id:'kuyang',name:'Kuyang',origin:'Kalimantan'}],
  saveKey:'signature',getGameProgress:()=>JSON.parse(JSON.stringify(engine)),
  selectTamaSpecies:id=>(selected=id,true),getCurrentId:()=>selected,
  setTamaEnvironment:s=>{api.environment=s},setTamaMood(){},
  restartTamaGeneration:id=>{engine.pets[id].phase=0;engine.pets[id].xp=0;return true},
  rewardTamaAdventure:(id,xp,spirit,stone)=>{const p=engine.pets[id];if(!p||p.phase===0)return false;p.xp+=xp;engine.spirit+=spirit;if(stone)engine.stones[stone]=(engine.stones[stone]||0)+1;return true},
  is3D:()=>true};
 const window={NJ35:api,NJ45_CODEX:{},addEventListener(){}};
 const document={getElementById:id=>id==='nj35'?scene:null,createElement:()=>el(),
  body:{classList:{contains(){return true}},append(){}},addEventListener(){}};
 const localStorage={getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,v),removeItem:k=>memory.delete(k)};
 new Script(code).runInNewContext({window,document,localStorage,Date,console,setTimeout(){return 1},
  clearTimeout(){},setInterval(){return 1},confirm:()=>true});
 const click=(type,p={})=>events.get('click')({target:{closest:()=>({dataset:{tama:type,...p}})}});
 return {click,scene,api,engine,memory,seen,game:window.NUSAJIWA_TAMAGOTCHI};
}
test('boots 3D Tamagotchi with beginner eggs and physical A/B/C',()=>{
 const a=boot();
 assert.equal(a.game.version,'8.1');
 assert.match(a.scene.child.innerHTML,/njt-three-buttons/);
 assert.match(a.scene.child.querySelector('#njtPanel').innerHTML,/Telur Pertamamu/);
 assert.match(a.scene.child.querySelector('#njtPanel').innerHTML,/Harimau Sumatra/);
});
test('adopt, hatch and feed are connected to actual 3D pet save',()=>{
 const a=boot();a.click('choose',{id:'komodo'});
 assert.equal(a.game.getSave().pets.komodo.stage,0);
 a.click('hatch');assert.equal(a.game.getSave().pets.komodo.stage,1);
 a.click('meal');assert.equal(a.game.getSave().pets.komodo.hunger,4);
 assert.equal(a.engine.pets.komodo.xp,17);
 assert.equal(a.api.environment.dirty,0);
 assert.ok(a.memory.has('nusajiwa-tama-v70'));
});
test('Codex switches to the selected encyclopedia entry',()=>{
 const a=boot();a.click('choose',{id:'komodo'});
 a.game.open('codex');a.click('focus',{id:'kuyang'});a.click('read');
 assert.ok(a.game.getSave().reads.includes('kuyang'));
 a.click('nativeCodex');
 assert.equal(a.api.getCurrentId(),'kuyang');
 assert.ok(a.seen.includes('archive'));
});
test('retired character begins a new generation with album unchanged',()=>{
 const a=boot();a.click('choose',{id:'komodo'});a.click('hatch');
 const s=a.game.getSave();s.pets.komodo.retired=true;
 s.album.push({id:'komodo',name:'Komodo',age:16000,character:'Ceria'});
 const b=boot({'nusajiwa-tama-v70':JSON.stringify(s)});
 b.engine.pets.komodo={species:'komodo',phase:1,xp:8,stats:{}};
 b.click('choose',{id:'komodo'});
 assert.match(b.scene.child.querySelector('#njtPanel').innerHTML,/Generasi Baru/);
 b.click('restart');
 assert.equal(b.game.getSave().pets.komodo.stage,0);
 assert.equal(b.engine.pets.komodo.phase,0);
 assert.equal(b.game.getSave().album.length,1);
});

test('Adventure rewards connect to the same pet without duplicate XP farming',()=>{
 const a=boot();a.click('choose',{id:'komodo'});a.click('hatch');
 const before=a.engine.pets.komodo.xp;
 const reward={id:'komodo',level:0,stars:3,gem:true,element:'tanah'};
 const first=a.game.awardAdventure(reward);
 assert.equal(first.earned,true);
 assert.equal(first.xp,27);
 assert.equal(first.spirit,14);
 assert.equal(first.stone,true);
 assert.equal(a.engine.pets.komodo.xp,before+27);
 assert.equal(a.engine.stones.tanah,1);
 assert.equal(a.game.awardAdventure(reward).earned,false,'A second clear today must not duplicate XP');
 assert.equal(a.game.awardAdventure({...reward,id:'tiger'}).earned,false,'Cannot reward a different pet');
 assert.ok(a.game.getSave().pets.komodo.happy>=3);
});
test('Main menu includes optional platformer without losing classic tebak arah',()=>{
 const a=boot();a.click('choose',{id:'komodo'});a.click('hatch');
 a.game.open('game');
 assert.match(a.scene.child.querySelector('#njtPanel').innerHTML,/Tebak Arah/);
 assert.match(a.scene.child.querySelector('#njtPanel').innerHTML,/Jelajah Evolusi/);
 a.click('quickGame');
 assert.match(a.scene.child.querySelector('#njtPanel').innerHTML,/RONDE/);
});

test('Hidden elemental stone can still be found on a same-day replay with no duplicate XP',()=>{
 const a=boot();a.click('choose',{id:'komodo'});a.click('hatch');
 const reward={id:'komodo',level:1,stars:2,gem:false,element:'air'};
 const first=a.game.awardAdventure(reward);
 assert.equal(first.earned,true);
 assert.equal(first.stone,false);
 const currentXP=a.engine.pets.komodo.xp;
 const repeat=a.game.awardAdventure({...reward,gem:true});
 assert.equal(repeat.earned,true);
 assert.equal(repeat.xp,0);
 assert.equal(repeat.spirit,0);
 assert.equal(repeat.stone,true);
 assert.equal(a.engine.stones.air,1);
 assert.equal(a.engine.pets.komodo.xp,currentXP);
 assert.equal(a.game.awardAdventure({...reward,gem:true}).earned,false);
});

test('Java guardian trial grants evolution XP and one permanent milestone to this pet',()=>{
 const a=boot();a.click('choose',{id:'komodo'});a.click('hatch');
 const before=a.engine.pets.komodo.xp;
 const trial=a.game.awardAdventure({id:'komodo',level:9,stars:3,gem:true,element:'cahaya'});
 assert.equal(trial.earned,true);
 assert.equal(trial.xp,27);
 assert.equal(a.engine.pets.komodo.xp,before+27);
 assert.equal(a.engine.stones.cahaya,1);
 const p=a.game.getSave().pets.komodo;
 assert.ok(p.adventureMarks.includes('trial:9'));
 const oldStudied=p.studied;
 assert.equal(a.game.awardAdventure({id:'komodo',level:9,stars:3,gem:true,element:'cahaya'}).earned,false);
 assert.equal(a.game.getSave().pets.komodo.studied,oldStudied);
});
