import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const win={addEventListener(){}},ctx={window:win,document:{addEventListener(){}},
 localStorage:{getItem(){return null}},Math,Date,JSON};
runInNewContext(read('nj124-classic-worlds.js'),ctx);
runInNewContext(read('nj130-stage-director.js'),ctx);
runInNewContext(read('nj123-classic.js'),ctx);
const d=win.NUSAJIWA_STAGE130,c=win.NUSAJIWA_CLASSIC;
test('NJ130: all 32 original levels have individual choreographies and mechanics',()=>{
 assert.equal(d.blueprints.length,32);
 const p=Array.from({length:32},(_,i)=>c.previewPlan(i));
 assert.equal(new Set(p.map(x=>x.choreography)).size,32);
 for(const [i,s] of p.entries()){
  assert.ok(s.choreography?.startsWith('NJ130-'),String(i));
  assert.ok(s.sentries>=1,'moving hazard missing '+i);
  assert.ok(s.pads>=0&&s.pads<=2,'invalid pad count '+i);
  assert.ok(s.blocks>=7&&s.enemies>=7,'base gameplay lost '+i);
  assert.ok(s.gaps.every(g=>g[1]-g[0]>=1.35&&g[1]-g[0]<4));
 }
});
test('NJ130: authored stage features spawn on reachable ground away from pipes',()=>{
 for(let i=0;i<32;i++){
  const level={index:i,world:Math.floor(i/4),section:i%4,type:i%4===3?'castle':'ground',
   length:120+Math.floor(i/4)*6,gaps:[[43,45.4],[79,81.3]],
   blocks:[{x:39},{x:67}],pipes:[{x:28,h:1.4}],enemies:[],
   platforms:[],coins:[],secret:[],nj124:{},boss:null};
  d.decorate(level);
  for(const x of [...level.nj130.pads.map(p=>p.x),...level.nj130.sentries.map(p=>p.x)]){
   assert.ok(x>15&&x<level.length-15);
   assert.ok(level.gaps.every(([a,b])=>x<a-.92||x>b+.92));
   assert.ok(level.pipes.every(p=>Math.abs(p.x-x)>=1.65));
  }
 }
});
test('NJ130: spring boosts one grounded player, does not auto-trigger repeatedly',()=>{
 const l={nj130:{pads:[{x:28,boost:13}],sentries:[]}};
 const s={x:28,y:0,vy:-2,grounded:true,elapsed:1,nj130:{cooldown:0,bounces:0}};
 assert.equal(d.bounce(s,l),true);assert.equal(s.vy,13);
 assert.equal(s.grounded,false);assert.equal(d.bounce(s,l),false);
 d.update(s,l,.25,()=>{},()=>{});
 assert.ok(s.nj130.cooldown>0);
});
test('NJ130: moving sentry causes damage once on contact, but respects protection',()=>{
 const hazard={x:45,y:1.2,phase:0,amplitude:0,speed:1,kind:'wind',radius:.28};
 const l={nj130:{pads:[],sentries:[hazard]}};
 const s={x:45,y:.64,elapsed:0,invincible:0,stop:false,nj130:{cooldown:0,hazardHits:0}};
 let calls=0;d.update(s,l,1/60,()=>{calls++;s.invincible=1},()=>{});
 assert.equal(calls,1);
 d.update(s,l,1/60,()=>{calls++},()=>{});
 assert.equal(calls,1);
 assert.equal(s.nj130.hazardHits,1);
});
test('NJ130: animation, Canvas fallback, controller and Pages assets are wired',()=>{
 const classic=read('nj123-classic.js'),three=read('nj125-classic-3d.js');
 for(const prop of ['decorate','start','resetLife','bounce','update','draw2D'])
  assert.ok(classic.includes('NUSAJIWA_STAGE130?.'+prop+'?.('),prop);
 assert.ok(three.includes('for(const pad of level.nj130.pads)'));
 assert.ok(three.includes('for(const sentry of level.nj130.sentries)'));
 assert.ok(three.includes('for(const hazard of stageSentries)'));
 const html=read('index.html'),pages=read('.github/workflows/pages.yml');
 assert.ok(html.indexOf('nj130-stage-director.js')<html.indexOf('nj123-classic.js'));
 assert.ok(pages.includes('cp nj127-rom-physics.js nj130-stage-director.js _site/'));
 assert.ok(read('.github/workflows/tamagotchi-quality.yml').includes("      - 'nj130-stage-director.js'"));
 const ledger=JSON.parse(read('release.json'));
 assert.equal(ledger.runtime.identities,300);assert.equal(ledger.version,'8.3');
 assert.equal(ledger.merged_gameplay_improvements.filter(x=>x.patch==='NJ130').length,1);
});
