import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const src=read('nj122-hidden-sanctuaries.js'),core=read('nusajiwa-adventure.js');
const html=read('index.html'),workflow=read('.github/workflows/pages.yml');
const w={};runInNewContext(src,{window:w});
const api=w.NUSAJIWA_ADVENTURE122;
const a=core.indexOf('const LEVELS=['),b=core.indexOf('];',a);
const levels=runInNewContext(core.slice(a+'const LEVELS='.length,b+1));
test('Exactly fifteen distinct ORIGINAL secret sublevels mapped one-to-one to 15 locations',()=>{
 assert.equal(api.rooms.length,15);
 assert.equal(new Set(Array.from(api.rooms,r=>r[0])).size,15);
 assert.equal(new Set(Array.from(api.rooms,r=>r[3])).size,15);
 assert.equal(levels.length,15);
 for(let i=0;i<15;i++){
  const l=api.createRoom(levels[i],i);
  assert.equal(l.world,levels[i].world||'sumatra');
  assert.ok(l.secretRoom);assert.equal(l.sigils.length,3);
  assert.ok(l.length>30&&l.length<35);
  for(const [x,y] of l.sigils){
   assert.ok(l.ground.some(([a,b])=>x>=a+1&&x<=b-1),'Unreachable hidden sigil '+i);
   assert.ok(l.hazards.every(h=>Math.abs(h-x)>1.4),'Hidden sigil collides with spikes');
  }
  for(let j=1;j<l.ground.length;j++)assert.ok(l.ground[j][0]-l.ground[j-1][1]<=2.5);
  for(const cp of l.checkpoints)assert.ok(l.ground.some(([a,b])=>a<=cp&&cp<=b));
 }
});
test('Hidden chamber unlock requires revealed block + nearby SKILL and never copies rewards infinitely',()=>{
 const level=levels[0];level.nj121={zone:{secretDestination:28},blocks:[{x:17,y:2.4,revealed:false}],
 secretFound:false};
 const run={level,nj121:level.nj121,patrols:[],score:0,gem:{got:false,x:39},coins:[{x:7,got:false}],
 sigils:[],usedCp:[],checkpoint:2,x:17,y:0,vx:0,vy:0,cameraX:19,
 grounded:true,coyote:0,ended:false,hurtUntil:0,skillCool:0};
 api.init(run,0);
 const notice=()=>{},fx=()=>{},sound=()=>{};
 assert.equal(api.enter(run,0,notice,fx,sound),false);
 run.nj121.blocks[0].revealed=true;
 assert.equal(api.enter(run,0,notice,fx,sound),true);
 assert.equal(run.nj122.active,true);
 assert.ok(run.level.secretRoom);
 assert.equal(run.level.sigils.length,3);
 assert.equal(run.nj121,null);
 assert.equal(run.gem.got,true,'Do not duplicate elemental stone inside a bonus room');
 assert.equal(api.enter(run,0,notice,fx,sound),false,'cannot re-enter active bonus room');
 run.x=32.7;
 assert.equal(api.tick(run,notice,fx,sound),false,'exit requires all three secret sigils');
 assert.ok(run.x<31,'locked exit must block');
 run.sigils.forEach(s=>s.got=true);
 run.x=32.7;
 assert.equal(api.tick(run,notice,fx,sound),true);
 assert.equal(run.nj122.active,false);
 assert.equal(run.nj122.completed,true);
 assert.equal(run.level,level);
 assert.equal(run.nj121.secretFound,true);
 assert.equal(run.gem.got,false,'Original gemstone must persist');
 assert.ok(run.score>=90);
 assert.equal(api.enter(run,0,notice,fx,sound),false,'no repeated secret score exploit');
 const record={completed:{}};api.finish(run,record,0);
 assert.equal(record.hiddenSanctuaries[0].completed,true);
});
test('A failed/unplayed secret has no persistent completion or reward',()=>{
 const level=levels[2];level.nj121={zone:{secretDestination:30},blocks:[{x:48,y:2.5,revealed:true}],
 secretFound:false};
 const run={level,x:47.8,y:0,score:0,coins:[],patrols:[],sigils:[],gem:{got:false},usedCp:[]};
 api.init(run,2);
 const r={completed:{}};
 api.finish(run,r,2);assert.equal(r.hiddenSanctuaries,undefined);
 run.x=55;
 assert.equal(api.enter(run,2,()=>{},()=>{},()=>{}),false,'too far from hidden block');
 assert.equal(run.score,0);
});
test('Live engine triggers original optional level, 2D/3D drawing, reward persistence, Pages',()=>{
 for(const key of ['init(run,levelIndex)','enter?.(run,levelIndex','tick?.(s,announce,emitFx,playFx)',
  'finish?.(run,r,levelIndex)','draw2D?.(run,ctx,sx,sy,unit)',
  'decorate3D?.(run,T,mesh,box,material)','hiddenSanctuaries?.[i]','extraSecretVersion:\'NJ122\'']){
  assert.ok(core.includes(key),key);
 }
 assert.ok(html.includes('./nj122-hidden-sanctuaries.js'));
 assert.ok(html.indexOf('./nj122-hidden-sanctuaries.js')<html.indexOf('./nusajiwa-adventure.js'));
 assert.ok(workflow.includes('node --check nj122-hidden-sanctuaries.js'));
 assert.ok(workflow.includes('nj121-adventure-worlds.js nj122-hidden-sanctuaries.js _site/'));
 assert.ok(read('.github/workflows/tamagotchi-quality.yml').includes("      - 'nj122-hidden-sanctuaries.js'"));
});
