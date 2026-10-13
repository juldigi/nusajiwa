import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Script,runInNewContext} from 'node:vm';

const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const source=read('nusajiwa-adventure.js'),css=read('nusajiwa-adventure.css');
const html=read('index.html'),tama=read('tamagotchi-3d.js'),engine=read('script_32.js');
function levels(){
 const first=source.indexOf('const LEVELS=['),end=source.indexOf('];',first);
 assert.ok(first>=0&&end>first);
 return runInNewContext(source.slice(first+'const LEVELS='.length,end+1));
}
test('Five original Rimba Sumatra stages with reachable gaps and checkpoints',()=>{
 const maps=levels();
 assert.equal(maps.length,5);
 assert.equal(new Set(maps.map(x=>x.name)).size,5);
 assert.equal(maps[0].name,'Gerbang Rimba');
 assert.equal(maps[4].name,'Ujian Penjaga Rimba');
 for(const m of maps){
  assert.ok(m.ground.length>=4);
  assert.ok(m.checkpoints.length>=2);
  assert.ok(m.hazards.length>=3);
  assert.ok(['tanah','api','air','angin','cahaya','bayangan'].includes(m.element));
  for(let i=1;i<m.ground.length;i++){
   const gap=m.ground[i][0]-m.ground[i-1][1];
   assert.ok(gap>=0&&gap<=3,'Unjumpable gap in '+m.name+': '+gap);
  }
  for(const cp of m.checkpoints)assert.ok(m.ground.some(g=>cp>=g[0]&&cp<=g[1]),'Checkpoint must be on land');
  for(const h of m.hazards)assert.ok(m.ground.some(g=>h>=g[0]&&h<=g[1]),'Hazard must not float above a gap');
  assert.ok(m.length>m.ground.at(-1)[0]&&m.length<m.ground.at(-1)[1]);
 }
});
test('Adventure JavaScript parses; Three.js and 2D fallback are both supported',()=>{
 assert.doesNotThrow(()=>new Script(source));
 assert.match(source,/THREE=lib/);
 assert.match(source,/new T\.WebGLRenderer/);
 assert.match(source,/new T\.OrthographicCamera/);
 assert.match(source,/canvas\.getContext\('2d'/);
 assert.match(source,/swapCanvas\(\)/,'Browser canvas contexts must not be reused across renderers');
 assert.match(source,/s\.level\.ground\.map\(g=>\[\(g\[0\]\+g\[1\]\)\/2/,'Collision range uses platform center');
 assert.match(source,/requestAnimationFrame\(loop\)/);
 assert.match(source,/function physics\(dt\)/);
});
test('Game is integrated into Tamagotchi, authentic elemental stones and save backup',()=>{
 assert.match(tama,/screen='playChoices'/);
 assert.match(tama,/window\.NUSAJIWA_ADVENTURE\?\.open/);
 assert.match(tama,/function awardAdventure\(result\)/);
 assert.match(engine,/rewardTamaAdventure:njtRewardAdventure/);
 assert.match(tama,/p\.adventureMarks/);
 assert.match(tama,/dailyKey/);
 assert.match(html,/nusajiwa-adventure\.css\?v=8\.0\.0/);
 assert.match(html,/nusajiwa-adventure\.js\?v=8\.0\.0/);
 assert.ok(html.indexOf('tamagotchi-3d.js?v=8.0.0')<html.indexOf('nusajiwa-adventure.js?v=8.0.0'));
 assert.match(tama,/adventure:localStorage\.getItem/);
 assert.match(tama,/localStorage\.setItem\('nusajiwa-adventure-v1'/);
});
test('iPhone controls, pause, 3D dominance and accessible buttons remain present',()=>{
 for(const control of ['left','right','jump','special'])assert.match(source,new RegExp('data-hold="'+control+'"'));
 assert.match(source,/pause\(\)/);
 assert.match(source,/Escape/);
 assert.match(source,/aria-label="Jelajah Evolusi/);
 assert.match(source,/document\.hidden/);
 assert.match(css,/#nja \.nja-pad button/);
 assert.match(css,/#nja #njaCanvas\{display:block;width:100%;height:100%/);
});
test('Adventure opens and closes as an integrated mode while preserving Tamagotchi visibility',()=>{
 const events={};const nodes=new Map();
 function elem(){
  return {hidden:false,innerHTML:'',textContent:'',dataset:{},style:{},width:0,height:0,
   classList:{add(){},remove(){}},append(){},replaceWith(){},setAttribute(){},
   addEventListener(k,fn){events[k]=fn},querySelectorAll(){return []},
   querySelector(k){if(!nodes.has(k))nodes.set(k,elem());return nodes.get(k)},
   cloneNode(){return elem()},getBoundingClientRect(){return {width:390,height:760}},
   getContext(){return {}}
  };
 }
 const root=elem(),scene=elem();
 const doc={createElement:()=>root,getElementById:id=>id==='nj35'?scene:null,
  body:{append(){},classList:{add(){},remove(){}}},addEventListener(){}};
 const pet={id:'kuyang',stage:1,happy:3,sick:false,sleep:false,retired:false};
 const win={NUSAJIWA_TAMAGOTCHI:{getSave:()=>({active:'kuyang',pets:{kuyang:pet}}),refresh(){},open(){}},devicePixelRatio:2,addEventListener(){}};
 const localStorage={getItem(){return null},setItem(){}};
 new Script(source).runInNewContext({window:win,document:doc,localStorage,console,Date,
  setTimeout(){return 1},clearTimeout(){},requestAnimationFrame(){return 1},cancelAnimationFrame(){},
  navigator:{},Math});
 assert.equal(win.NUSAJIWA_ADVENTURE.levels.length,5);
 assert.equal(win.NUSAJIWA_ADVENTURE.isOpen(),false);
 assert.equal(win.NUSAJIWA_ADVENTURE.open(),true);
 assert.equal(scene.hidden,true,'Tamagotchi and WebGL render must pause while Adventure runs');
 assert.equal(win.NUSAJIWA_ADVENTURE.isOpen(),true);
 win.NUSAJIWA_ADVENTURE.close();
 assert.equal(scene.hidden,false,'Return to the saved Tamagotchi screen');
 assert.equal(win.NUSAJIWA_ADVENTURE.isOpen(),false);
});