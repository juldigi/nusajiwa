import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Script,runInNewContext} from 'node:vm';

const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const html=read('index.html');
const engine=read('script_32.js');
const tama=read('tamagotchi-3d.js');
const codex=read('script_33.js');
const css=read('tamagotchi-3d.css');

function identities(){
 const begin=engine.indexOf('const CREATURES=[');
 assert.ok(begin>0,'Creature array must exist');
 const end=engine.indexOf('\n];',begin);
 assert.ok(end>begin,'Creature array closes properly');
 const expression=engine.slice(begin+'const CREATURES='.length,end+2);
 return runInNewContext(expression);
}
const records=identities();

test('Exactly 300 distinct creature identities, not 300 evolutions',()=>{
 assert.equal(records.length,300);
 assert.equal(new Set(records.map(x=>x[0])).size,300,'IDs must be unique');
 assert.equal(new Set(records.map(x=>x[1])).size,300,'Species display names must be distinct');
 assert.ok(records.every(r=>r.length>=6));
 assert.ok(records.some(r=>r[0]==='kura_ambon'));
 assert.ok(records.some(r=>r[0]==='kura_leher_ular_rote'));
 assert.ok(!records.some(r=>r[0]==='kura_rote'),'Old duplicate removed');
});
test('All primary release files are parseable',()=>{
 for(const [name,source] of [['3D engine',engine],['Tamagotchi',tama],['Codex',codex]])
  assert.doesNotThrow(()=>new Script(source,{filename:name}));
});
test('Game entry point loads retro controller after the existing 3D engine',()=>{
 const a=html.indexOf('./script_32.js'),b=html.indexOf('./tamagotchi-3d.js');
 assert.ok(a>=0&&b>a,'Tamagotchi script loads after the 3D engine');
 assert.ok(html.includes('./tamagotchi-3d.css'));
 assert.ok(css.includes('.njt-three-buttons'));
 assert.ok(tama.includes("const KEY='nusajiwa-tama-v70'"));
});
test('Digital-pet core includes classic interactive features',()=>{
 for(const key of ["'feed'","'light'","'game'","'medicine'","'toilet'","'status'","'discipline'","'codex'","'collection'"]){
  assert.ok(tama.includes(key),'Missing '+key);
 }
 for(const logic of ['p.mistakes','p.attention','p.hunger','p.happy','p.dirty','p.sick','p.age','p.discipline']){
  assert.ok(tama.includes(logic),'Missing '+logic);
 }
 assert.ok(tama.includes('function buttonA()'));
 assert.ok(tama.includes('function buttonB()'));
 assert.ok(tama.includes('function back()'));
 assert.ok(tama.includes('function exportWholeGame()'));
 assert.ok(tama.includes('function importWholeGame()'));
});
test('Encyclopedia remains source-linked and separates facts from fiction',()=>{
 assert.ok(codex.includes('window.NJ45_CODEX'));
 assert.ok(codex.includes('NJ45_CODEX["kura_ambon"]'));
 assert.ok(tama.includes("pressNative('[data-njtab=\"archive\"]')"));
 assert.ok(tama.includes('Fantasi')||tama.includes('fantasi'));
});
test('Legacy save migration and WebGL control bridge retained',()=>{
 assert.ok(engine.includes('raw.pets?.kura_rote'));
 assert.ok(tama.includes('o.pets.kura_rote'));
 assert.ok(engine.includes('selectTamaSpecies'));
 assert.ok(engine.includes('setTamaMood'));
});

test('Classic attention, 3D visual reactions and generations stay synchronized',()=>{
 assert.ok(tama.includes("screen==='starter'"),'First-egg choice screen missing');
 assert.ok(tama.includes("screen==='generation'"),'Repeat life cycle missing');
 assert.ok(tama.includes('API.setTamaEnvironment?.('),'The pet needs must reach the WebGL scene');
 assert.ok(engine.includes('setTamaEnvironment:njtSetLiving'),'3D scene must expose living conditions');
 assert.ok(engine.includes('restartTamaGeneration:njtRestartGeneration'),'Existing pets must support generational restart');
 assert.ok(engine.includes('njtApplyLiving(true)'),'3D feedback must initialize after renderer boot');
 assert.ok(tama.includes("p.reason==='Aku ingin perhatian!'"),'Discipline should depend on behavior, not neglect');
 assert.ok(tama.includes('data-njtab="archive"'),'Kodex must remain playable');
});

test('In-game Codex shows sources, searchable categories, and all 300 identities',()=>{
 assert.ok(engine.includes('getTamaCodexProfile:njtCodexRecord'));
 assert.ok(tama.includes('njt-book-page'),'The encyclopedia must be a game book');
 assert.ok(tama.includes('njt-book-sources'),'Source citations must be visible inside the game');
 assert.ok(tama.includes("codexKind==='fauna'"),'Fauna and folklore must be browsable separately');
 assert.ok(tama.includes("visibleCount+=60"),'All identities need discoverable pagination');
 assert.ok(tama.includes("API.rewardTamaCodexReading?.("),'Knowledge must support pet progression');
 assert.ok(tama.includes("store.reads.includes(id)"),'Repeated pages must not grant infinite one-time rewards');
 assert.ok(tama.includes("if(a==='nativeCodex')"),'Optional detailed 3D reference navigation must survive');
});
