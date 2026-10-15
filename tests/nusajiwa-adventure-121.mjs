import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const src=read('nj121-adventure-worlds.js'),game=read('nusajiwa-adventure.js'),html=read('index.html');
const w={};runInNewContext(src,{window:w});
const d=w.NUSAJIWA_ADVENTURE121;
const parse=()=>{const a=game.indexOf('const LEVELS=['),b=game.indexOf('];',a);return runInNewContext(game.slice(a+'const LEVELS='.length,b+1))};
test('Exactly 15 original diverse Indonesian stage biomes with distinct mechanics and classic gates',()=>{
 assert.equal(d.zones.length,15);
 assert.equal(new Set(Array.from(d.zones,x=>x.place)).size,15);
 assert.equal(new Set(Array.from(d.zones,x=>x.biome)).size,15);
 const levels=parse();assert.equal(levels.length,15);assert.equal(d.configure(levels),true);
 assert.equal(new Set(levels.map(x=>x.nj121.biome)).size,15);
 assert.equal(levels.filter(x=>x.nj121.mechanic==='boss').length,3);
 assert.equal(levels.filter(x=>x.nj121.moving.length>=1).length,15);
 for(const l of levels){
  assert.ok(l.nj121.secretDestination>0&&l.nj121.secretDestination<l.length-3);
  assert.ok(l.nj121.secret[0]>5&&l.nj121.secret[0]<l.length-7);
  assert.ok(l.ground.some(([a,b])=>l.nj121.secret[0]>=a&&l.nj121.secret[0]<=b),'secret must be reachable on safe ground: '+l.name);
  assert.ok(l.nj121.moving.every(([x,y,width,amplitude,speed])=>x<l.length&&y>1&&width>2&&amplitude<1&&speed>0));
 }
 for(const ix of [4,9,14])assert.equal(levels[ix].sigils.length,3);
});
test('Hidden block requires jump then SKILL and persists only after successful finish',()=>{
 const levels=parse();d.configure(levels);
 const run={level:levels[0],patrols:[],score:0,x:17,y:1.5,vx:0,vy:5,grounded:false,seconds:1,ended:false,skillCool:0,
  health:3,sigils:[],fx:[]};
 d.init(run,0);assert.equal(run.nj121.secretFound,false);
 const emit=()=>{},play=()=>{},notice=()=>{},hurt=()=>{};
 assert.equal(d.special(run,notice,emit,play),false,'secret portal cannot open before block is discovered');
 run.y=run.nj121.blocks[0].y-.93;
 d.tick(run,1/60,{jump:false,special:false},hurt,notice,emit,play);
 assert.equal(run.nj121.blocks[0].revealed,true,'hit from underneath reveals rune');
 assert.equal(d.special(run,notice,emit,play),true);
 assert.equal(run.nj121.secretFound,true);
 assert.ok(run.x>20,'secret shortcut travels to safe location');
 assert.ok(run.score>=75);
 const record={completed:{}};d.finish(run,record,0);
 assert.equal(record.hiddenRoutes[0],true);
 assert.equal(d.special(run,notice,emit,play),false,'secret reward once per attempt');
});
test('Spring bounce, wind/flood drag, and moving platform interpolation are finite',()=>{
 const levels=parse();d.configure(levels);
 const run={level:levels[0],patrols:[],score:0,x:8,y:.1,vx:0,vy:-2,grounded:false,seconds:0,ended:false,fx:[]};
 d.init(run,0);
 const list0=d.mobilePlatforms(run);assert.ok(list0.length);
 run.seconds=1.45;const list1=d.mobilePlatforms(run);
 assert.notDeepEqual(JSON.stringify(list0),JSON.stringify(list1));
 assert.ok(list1.every(x=>x.every(Number.isFinite)));
 d.tick(run,1/60,{jump:false},()=>{},()=>{},()=>{},()=>{});
 assert.ok(run.vy>10,'root spring gives bounce impulse');
 const river={level:levels[7],patrols:[],x:47,y:0,seconds:0};
 d.init(river,7);assert.equal(d.gravity(river),13);
 river.x=8;assert.equal(d.gravity(river),22);
});
test('Stomp works, enemy cannot repeatedly grant score, adult pets retain save contract',()=>{
 const p={level:{nj121:{...d.zones[0],moving:[]}},vy:-3,y:.58,score:0,x:10};
 const enemy={defeated:false};
 assert.equal(d.enemyCollision(p,enemy,()=>{},()=>{},()=>{}),'stomp');
 assert.equal(enemy.defeated,true);assert.equal(p.score,15);assert.equal(p.vy,6.5);
 assert.equal(d.enemyCollision(p,enemy,()=>{},()=>{},()=>{}),'skip');
 assert.ok(game.includes("const KEY='nusajiwa-adventure-v1'"));
 assert.ok(game.includes("version:'8.3'"));
 assert.ok(game.includes("designVersion:'NJ121'"));
});
test('Both renderers, gameplay physics and Pages workflows integrate design system before core',()=>{
 assert.ok(game.includes('window.NUSAJIWA_ADVENTURE121?.configure(LEVELS)'));
 for(const x of ['mobilePlatforms?.(s)','gravity?.(s)','enemyCollision?.(s,enemy','special?.(run','tick?.(s,dt','finish?.(run,r'])assert.ok(game.includes(x),x);
 assert.ok(game.includes('const mobileVisuals='));
 assert.ok(game.includes('run.nj121.moving'));
 assert.ok(game.includes("for(const p of run.nj121.moving)"));
 assert.ok(html.includes('./nj121-adventure-worlds.js'));
 assert.ok(html.indexOf('./nj121-adventure-worlds.js')<html.indexOf('./nusajiwa-adventure.js'));
 const pages=read('.github/workflows/pages.yml'),quality=read('.github/workflows/tamagotchi-quality.yml');
 assert.ok(pages.includes('node --check nj121-adventure-worlds.js'));
 assert.ok(pages.split('\n').some(line=>line.includes('cp tamagotchi-3d.js')&&line.includes('nj121-adventure-worlds.js')&&line.includes('_site/')));
 assert.ok(quality.includes("      - 'nj121-adventure-worlds.js'"));
 assert.ok(quality.includes('node --check nj121-adventure-worlds.js'));
});
