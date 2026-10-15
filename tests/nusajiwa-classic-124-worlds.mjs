import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const w={addEventListener(){}};
runInNewContext(read('nj124-classic-worlds.js'),{window:w});
runInNewContext(read('nj123-classic.js'),{window:w,document:{addEventListener(){}},localStorage:{getItem(){return null}},Math,Date,JSON});
const addon=w.NUSAJIWA_CLASSIC124,classic=w.NUSAJIWA_CLASSIC;
test('All 32 stages receive bespoke Indonesian names and localities, older engine remains 32/8',()=>{
 assert.equal(addon.stages.length,32);
 assert.equal(classic.levels.length,32);
 assert.equal(new Set(classic.levels.map(x=>x.challenge)).size,32);
 assert.equal(new Set(classic.levels.map(x=>x.location)).size,32);
 assert.equal(new Set(classic.levels.map(x=>x.world)).size,8);
 assert.equal(classic.worldDesign,'NJ124-Worlds');
 for(let i=0;i<32;i++){const stage=classic.previewPlan(i);assert.ok(stage.clock>=250&&stage.enemies>=7&&stage.blocks>=7);}
});
test('Stage checkpoint saves fallback respawn and secret relik cannot double count',()=>{
 const l={index:0,world:0,section:0,gaps:[],length:110,pipes:[],platforms:[]};
 addon.decorateLevel(l);
 const r={x:2,y:0,vx:0,elapsed:0,score:0,stop:false,secretFlag:false};
 assert.equal(addon.start(r,l),true);
 r.x=l.nj124.checkpoint+1;addon.update(r,l,1/60,()=>{},()=>{});
 assert.equal(addon.respawn(r,l),l.nj124.checkpoint);
 r.x=l.nj124.token;r.y=.65;let awards=0;
 addon.update(r,l,1/60,()=>{},n=>{awards+=n});
 const score=r.score;
 addon.update(r,l,1/60,()=>{},n=>{awards+=n});
 assert.equal(awards,3);assert.equal(r.score,score);
 const save={};addon.finish(r,save,0);
 assert.equal(save.regionalChallenges[0].relik,true);
});
test('Region-specific physics stay finite and gameplay launch, ROM reference, Pages asset are intact',()=>{
 for(const idx of [1,10,13,18,20,25]){
  const l={index:idx,world:Math.floor(idx/4),section:idx%4,gaps:[],length:110,pipes:[],platforms:[]};
  addon.decorateLevel(l);const p={x:55,y:0,vx:4,grounded:true,elapsed:1};
  addon.start(p,l);addon.motion(p,l,{},1/60);assert.ok(Number.isFinite(p.vx));
 }
 const main=read('nusajiwa-adventure.js');
 assert.ok(main.includes("a==='classic'"));
 assert.ok(main.includes('window.NUSAJIWA_CLASSIC?.open?.(currentPet)'));
 const html=read('index.html');
 assert.ok(html.indexOf('./nj124-classic-worlds.js')<html.indexOf('./nj123-classic.js'));
 assert.ok(html.includes('./nj124-rom-reference.js'));
 const pg=read('.github/workflows/pages.yml');
 assert.ok(pg.includes('node --check nj124-classic-worlds.js'));
 assert.ok(pg.split('\n').some(line=>line.includes('nj124-rom-reference.css nj124-classic-worlds.js')&&line.includes('_site/')));
 const qa=read('.github/workflows/tamagotchi-quality.yml');
 assert.ok(qa.includes("      - 'nj124-classic-worlds.js'"));
});
