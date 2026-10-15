import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const win={addEventListener(){}};
const ctx={window:win,document:{addEventListener(){}},
 localStorage:{getItem(){return null}},Math,Date,JSON};
for(const f of ['nj124-classic-worlds.js','nj130-stage-director.js',
 'nj127-rom-physics.js','nj123-classic.js'])runInNewContext(read(f),ctx);
const physics=win.NUSAJIWA_NES127,director=win.NUSAJIWA_STAGE130,classic=win.NUSAJIWA_CLASSIC;
const level=()=>({blocks:[],gaps:[],pipes:[],enemies:[],length:100,platforms:[]});
const player=()=>({x:5,y:2.2,vy:-3,vx:5,grounded:false,power:0});
test('NJ131: reward block remains solid after claiming a reward',()=>{
 const l=level(),p=player();l.blocks.push({x:5,y:2.1,kind:'power',used:true,reveal:true});
 p.y=2.3;
 assert.equal(physics.resolveBlocks(p,l,5,2.7),true);
 assert.equal(p.y,2.5);
 assert.equal(p.grounded,true);
});
test('NJ131: one-use block stops side collisions too, not only the top',()=>{
 const l=level(),p=player();l.blocks.push({x:5,y:2.1,kind:'rune',used:true,reveal:true});
 p.x=5.1;p.y=2.0;p.vy=0;
 assert.equal(physics.resolveBlocks(p,l,4.0,2.0),true);
 assert.equal(p.x,4.28);
 assert.equal(p.vx,0);
});
test('NJ131: stone disappears only after being destroyed; hidden unrevealed block is intangible',()=>{
 const l=level(),p=player(),b={x:5,y:2.1,kind:'stone',used:true,reveal:true};
 l.blocks.push(b);p.y=2.3;
 assert.equal(physics.resolveBlocks(p,l,5,2.7),true);
 b.destroyed=true;p.grounded=false;p.y=2.3;p.vy=-3;
 assert.equal(physics.resolveBlocks(p,l,5,2.7),false);
 b.destroyed=false;b.used=false;b.kind='hidden';b.reveal=false;
 assert.equal(physics.resolveBlocks(p,l,5,2.7),false);
});
test('NJ131: moving platform transform is used consistently for carrying',()=>{
 const p={x:20,y:2,kind:'suspended',w:3},l={platforms:[p]};
 const s={x:20,y:2,grounded:true,support:0,elapsed:1,bonus:false};
 const now=director.platformPosition(p,1);
 const earlier=director.platformPosition(p,.9);
 assert.equal(director.carry(s,l,.1),true);
 assert.ok(Math.abs(s.x-(20+now.x-earlier.x))<1e-9);
 assert.equal(s.y,2);
 s.support=null;assert.equal(director.carry(s,l,.1),false);
});
test('NJ131: vertical platform support follows same orbit and disengages mid-jump',()=>{
 const p={x:15,y:2,kind:'sway',w:3},l={platforms:[p]};
 const s={x:15,y:2,grounded:true,support:0,elapsed:2,bonus:false};
 assert.equal(director.carry(s,l,.1),true);
 const a=director.platformPosition(p,2),b=director.platformPosition(p,1.9);
 assert.ok(Math.abs(s.y-(2+a.y-b.y))<1e-9);
 s.grounded=false;assert.equal(director.carry(s,l,.1),false);
});
test('NJ131: all 32 stage blueprints survive, old save schema unchanged',()=>{
 assert.equal(classic.levels.length,32);
 for(let i=0;i<32;i++){
  const p=classic.previewPlan(i);
  assert.ok(p.choreography.startsWith('NJ130-'));
  assert.ok(p.sentries>=1);
 }
 const game=read('nj123-classic.js'),webgl=read('nj125-classic-3d.js');
 assert.ok(game.includes('NUSAJIWA_STAGE130?.carry?.(s,l,dt)'));
 assert.ok(game.includes('s.support=i'));
 assert.ok(game.includes('b.destroyed=true'));
 assert.ok(game.includes("b.used?'#75868a'"));
 assert.ok(webgl.includes('!x.ref.destroyed'));
 assert.ok(webgl.includes('x.cube.material=x.ref.used?x.spentBlock:x.activeMaterial'));
 assert.ok(webgl.includes('g.position.set(b.x,b.y,0)'));
 assert.ok(webgl.includes('NUSAJIWA_STAGE130?.platformPosition?.(x.p,t)'));
 const release=JSON.parse(read('release.json'));
 assert.equal(release.version,'8.3');
 assert.equal(release.runtime.identities,300);
 assert.equal(release.merged_gameplay_improvements.filter(x=>x.patch==='NJ131').length,1);
 const html=read('index.html');
 assert.ok(html.includes('nj123-classic.js?v=9.11.131'));
 assert.ok(html.includes('nj125-classic-3d.js?v=9.11.131'));
});
