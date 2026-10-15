import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const win={addEventListener(){}};
const ctx={window:win,document:{addEventListener(){}},localStorage:{getItem(){return null}},Math,Date,JSON};
for(const path of ['nj124-classic-worlds.js','nj130-stage-director.js',
 'nj127-rom-physics.js','nj123-classic.js'])runInNewContext(read(path),ctx);
const d=win.NUSAJIWA_STAGE130,physics=win.NUSAJIWA_NES127,classic=win.NUSAJIWA_CLASSIC;
function make(n){
 const l={index:n,world:Math.floor(n/4),length:120,section:n%4,
  boss:{x:108,hp:2+Math.floor(n/8),name:'Penjaga'},blocks:[],pipes:[],
  enemies:[],gaps:[],platforms:[],nj130:{pads:[],sentries:[]}};
 const s={x:99,y:0,vx:0,vy:0,grounded:true,score:0,elapsed:0,
  power:2,facing:1,invincible:0,stop:false};
 d.start(s,l);physics.start(s,l);return {s,l};
}
test('NJ132 each of eight boss stages patrols and fires bounded projectiles',()=>{
 for(let i=3;i<32;i+=4){
  const {s,l}=make(i),b=l.boss;
  for(let tick=0;tick<240;tick++){
   s.elapsed+=1/60;d.bossMotion(s,l,1/60,()=>{},()=>{});
  }
  assert.ok(Math.abs(b.x-b.home)<=2.5);
  assert.ok(b.attacks>=1,'boss attack absent: '+i);
  assert.ok(b.orbs.length<=3);
 }
});
test('NJ132 guardian hit recovery prevents rapid multi-hit; win opens gate',()=>{
 const {s,l}=make(3),b=l.boss;
 assert.equal(d.bossHit(s,l,'stomp'),true);
 assert.equal(d.bossHit(s,l,'stomp'),false);
 assert.equal(b.hp,1);
 d.bossMotion(s,l,.6,()=>{},()=>{});
 assert.equal(d.bossHit(s,l,'bara'),true);
 assert.equal(b.hp,0);assert.equal(b.orbs.length,0);
});
test('NJ132 boss orbs respect temporary shield and star immunity',()=>{
 const {s,l}=make(15),b=l.boss;
 s.x=90;s.invincible=2;
 b.orbs.push({x:90,y:.66,vx:0,age:0,alive:true});
 let damage=0;d.bossMotion(s,l,1/60,()=>damage++);
 assert.equal(damage,0);
 s.invincible=0;s.nj127.star=3;
 b.orbs.push({x:90,y:.66,vx:0,age:0,alive:true});
 d.bossMotion(s,l,1/60,()=>damage++);
 assert.equal(damage,0);
 s.nj127.star=0;
 b.orbs.push({x:90,y:.66,vx:0,age:0,alive:true});
 d.bossMotion(s,l,1/60,()=>damage++);
 assert.equal(damage,1);
});
test('NJ132 respawn resets fight including guardian health',()=>{
 const {s,l}=make(31),b=l.boss;
 d.bossHit(s,l,'stomp');b.orbs.push({x:80,y:1,vx:1,age:0,alive:true});
 d.resetLife(s,l);
 assert.equal(b.hp,b.maxHp);assert.equal(b.orbs.length,0);assert.equal(b.x,b.home);
});
test('NJ132 direction reversal skids, momentum carries into air',()=>{
 const l={type:'ground'},s={vx:0,grounded:true,facing:1};
 for(let i=0;i<36;i++)d.move(s,l,{right:true,run:true},1/60);
 assert.ok(s.vx>7&&s.vx<=8.2);
 d.move(s,l,{left:true,run:true},1/60);
 assert.equal(s.skid,true);assert.equal(s.facing,-1);
 const previous=s.vx;s.grounded=false;d.move(s,l,{},1/60);
 assert.ok(Math.abs(s.vx)<Math.abs(previous));
 assert.ok(Math.abs(s.vx)>Math.abs(previous)-.2);
});
test('NJ132 Bara projectiles damage guardians and appear in Three.js/Canvas',()=>{
 const {s,l}=make(7),b=l.boss;
 s.nj127.shots.push({x:b.x-1,y:1.04,vx:8,vy:0,age:0,alive:true});
 physics.after(s,l,.1,()=>{});
 assert.equal(b.hp,b.maxHp-1);
 const c=read('nj123-classic.js'),t=read('nj125-classic-3d.js');
 assert.ok(c.includes('NUSAJIWA_STAGE130?.move?.(s,l,key,dt)'));
 assert.ok(c.includes('NUSAJIWA_STAGE130?.bossMotion?.(s,l,dt,damage,hint)'));
 assert.ok(t.includes('bossOrbs.forEach'));
 assert.ok(c.includes('if(l.boss?.orbs)for(const orb'));
});
test('NJ132 retains all 32 original stages and 300 pets',()=>{
 assert.equal(classic.levels.length,32);
 assert.equal(classic.levels.filter(x=>x.type==='castle').length,8);
 for(let i=0;i<32;i++){
  const p=classic.previewPlan(i);
  assert.ok(p.choreography.startsWith('NJ130-'));
  assert.ok(p.gaps.every(g=>g[1]-g[0]<4));
 }
 const m=JSON.parse(read('release.json'));
 assert.equal(m.runtime.identities,300);assert.equal(m.version,'8.3');
 assert.equal(m.merged_gameplay_improvements.filter(x=>x.patch==='NJ132').length,1);
 const html=read('index.html');
 assert.ok(html.includes('nj123-classic.js?v=9.12.132'));
});
