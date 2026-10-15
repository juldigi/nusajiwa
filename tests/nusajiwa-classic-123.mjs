import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Script,runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const src=read('nj123-classic.js'),styles=read('nj123-classic.css');
const parent=read('nusajiwa-adventure.js'),html=read('index.html');
const doc={addEventListener(){},createElement(){return {};}};
const win={addEventListener(){},NUSAJIWA_CLASSIC:null};
const ctx={window:win,document:doc,localStorage:{getItem(){return null}},Math,Date,JSON};
new Script(src).runInNewContext(ctx);
const api=win.NUSAJIWA_CLASSIC;
const stages=api.levels.map(x=>({...x}));
test('Classic engine has 32 independent stages, exactly eight world sequences and all original folklore locations',()=>{
 assert.equal(api.levels.length,32);
 assert.equal(new Set(api.levels.map(x=>x.index)).size,32);
 const regions=new Set(api.levels.map(x=>x.region));
 assert.equal(regions.size,8);
 for(let w=0;w<8;w++){
  const four=api.levels.filter(x=>x.world===w+1);
  assert.equal(four.length,4);
  assert.deepEqual(Array.from(four,x=>x.stage),[1,2,3,4]);
  assert.deepEqual(Array.from(four,x=>x.index),[4*w,4*w+1,4*w+2,4*w+3]);
 }
 assert.equal(api.levels.filter(x=>x.type==='castle').length,8);
 assert.equal(api.levels.filter(x=>x.type==='water').length,2);
});
test('Thirty two stages differ geometrically, have reachable hazards and real secret entries',()=>{
 const plans=Array.from({length:32},(_,i)=>api.previewPlan(i));
 assert.equal(plans.length,32);
 assert.equal(plans.filter(p=>p.shortcuts>0).length,2);
 for(const p of plans){
  assert.ok(p.blocks>=7,'blocks missing: '+p.id);
  assert.ok(p.enemies>=7,'enemies missing: '+p.id);
  assert.ok(p.gaps.every(g=>g[1]-g[0]>=1.35&&g[1]-g[0]<4),'gap too wide '+p.id);
  assert.ok(p.clock>200);
  if(p.stage===4)assert.equal(p.boss,true);
  else assert.equal(p.boss,false);
 }
 const signatures=plans.map(p=>JSON.stringify([p.type,p.gaps,p.portals.map(x=>x.x),p.enemies,p.blocks]));
 assert.equal(new Set(signatures).size,32,'Each stage must have original terrain geometry');
 assert.deepEqual(Array.from(plans[1].portals.find(x=>x.warp).warp),[4,8,12]);
 assert.deepEqual(Array.from(plans[13].portals.find(x=>x.warp).warp),[20,24,28]);
});
test('NES-inspired mechanics implemented without shipping any ROM bytes or Nintendo sprites',()=>{
 for(const needle of ['TICK=1/60','max=water?3.8:(key.run?8.2:5.4)','!key.jump&&s.vy>0',
  "l.type==='water'","s.vy=6.6","b.kind==='hidden'","status.coins>=100",
  "enterSecret()","function pickPipe()","status.lives--","function finish()","function damage()"]){
  assert.ok(src.includes(needle),'missing gameplay primitive '+needle);
 }
 for(const s of ['\\.nes','\\.ips','\\.chr','\\.prg','Mario\\.png','Bowser\\.png','mario_sprite']){
  assert.equal(new RegExp(s,'i').test(src),false,'Unexpected Nintendo ROM asset reference: '+s);
 }
 assert.ok(src.includes("NUSAJIWA_TAMAGOTCHI"));
 assert.ok(src.includes("nusajiwa-classic-32-v1"));
});
test('Input buttons and iPhone controls integrate in existing adventure menu without breaking 15-stage contract',()=>{
 assert.ok(parent.includes("['classic','🎮 Kampanye Klasik · 32 Stage']"));
 assert.ok(parent.includes("window.NUSAJIWA_CLASSIC?.open?.(currentPet);"));
 for(const c of ['left','right','jump','run','down'])assert.ok(src.includes('data-h="'+c+'"'));
 assert.ok(src.includes('window.NUSAJIWA_ADVENTURE?.open?.();'));
 assert.ok(src.includes('if(candidate.stage===0')===false,'Pet gate only within existing function');
 assert.ok(src.includes('candidate.stage===0'));
 assert.ok(styles.includes('@media(max-width:650px)'));
 assert.ok(styles.includes('touch-action:none'));
 assert.ok(read('tests/nusajiwa-adventure.mjs').includes('Fifteen stages across Sumatra'));
});
test('GitHub Pages builds the original extra game, CSS, and quality check as independent assets',()=>{
 const pages=read('.github/workflows/pages.yml');
 const qa=read('.github/workflows/tamagotchi-quality.yml');
 assert.ok(html.includes('./nj123-classic.js?v=9.'));
 assert.ok(html.includes('./nj123-classic.css?v=9.2.123'));
 assert.ok(html.indexOf('nusajiwa-adventure.js?v=8.3.0')<html.indexOf('./nj123-classic.js'));
 assert.ok(pages.includes('node --check nj123-classic.js'));
 assert.ok(pages.split('\n').some(line=>line.includes('cp nj120-aquatic-batch13.js')&&line.includes('nj123-classic.js nj123-classic.css')&&line.includes('_site/')));
 assert.ok(qa.includes("      - 'nj123-classic.js'"));
 assert.ok(qa.includes('node --check nj123-classic.js'));
 const release=JSON.parse(read('release.json'));
 assert.equal(release.runtime.levels,15);
 assert.equal(release.runtime.identities,300);
 const classic=release.merged_gameplay_improvements.find(x=>x.patch==='NJ123');
 assert.ok(classic);
 assert.equal(classic.levels,32);
 assert.equal(classic.campaign_save_key,'nusajiwa-classic-32-v1');
});
