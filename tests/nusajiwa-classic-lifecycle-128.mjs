import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const ctx={window:{}};runInNewContext(read('nj127-rom-physics.js'),ctx);
const api=ctx.window.NUSAJIWA_NES127;
const state=()=>({
 s:{x:8,y:0,vx:0,vy:0,score:0,facing:1,power:1,stop:false,elapsed:0},
 l:{index:0,length:80,gaps:[],pipes:[],enemies:[],blocks:[]}
});
test('NJ128: losing a life clears transient pickups, projectiles and Surya',()=>{
 const {s,l}=state();
 assert.equal(api.start(s,l),true);
 assert.equal(api.hitBlock(s,l,{x:8,y:2.1,content:'power'},()=>{}),true);
 s.nj127.shots.push({x:1,alive:true});
 s.nj127.star=5;s.nj127.fireCooldown=2;s.nj127.runHeld=true;
 s.nj127.picked=3;
 assert.equal(api.isProtected(s),true);
 assert.equal(api.resetLife(s),true);
 assert.equal(api.isProtected(s),false);
 assert.equal(s.nj127.items.length,0);
 assert.equal(s.nj127.shots.length,0);
 assert.equal(s.nj127.fireCooldown,0);
 assert.equal(s.nj127.runHeld,false);
 assert.equal(s.nj127.picked,3,'run statistics survive a single life loss');
 assert.equal(s.power,1,'shield state is managed by the main life system');
});
test('NJ128: missing state is safe and protection expires normally',()=>{
 assert.equal(api.resetLife(null),false);
 assert.equal(api.isProtected(null),false);
 const {s,l}=state();api.start(s,l);s.nj127.star=.1;
 api.before(s,l,{},.2);
 assert.equal(api.isProtected(s),false);
});
test('NJ128: platformer calls reset on death and consults Surya before damage',()=>{
 const source=read('nj123-classic.js');
 const die=source.slice(source.indexOf('function die(reason)'),source.indexOf('function damage()'));
 const damage=source.slice(source.indexOf('function damage()'),source.indexOf('function addCoin('));
 assert.match(die,/NUSAJIWA_NES127\?\.resetLife\?\.\(status\)/);
 assert.match(damage,/NUSAJIWA_NES127\?\.isProtected\?\.\(status\)/);
 assert.match(source,/if\(a==='resume'\)\{clearKeys\(\);playing=true;hideMenu\(\);last=0;buffer=0/);
 const release=JSON.parse(read('release.json'));
 assert.equal(release.merged_gameplay_improvements.filter(x=>x.patch==='NJ128').length,1);
 assert.equal(release.runtime.identities,300);
 assert.equal(release.version,'8.3');
});
