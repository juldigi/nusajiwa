import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const context={window:{}};runInNewContext(read('nj127-rom-physics.js'),context);
const physics=context.window.NUSAJIWA_NES127;
const setup=()=>({s:{x:5,y:0,vx:4,vy:-6,grounded:false,score:0,power:0,stop:false,facing:1,elapsed:1},
 l:{index:0,length:100,gaps:[],pipes:[],enemies:[],blocks:[]}});
test('NJ129: jump lands on top of active block without falling through',()=>{
 const {s,l}=setup();
 l.blocks.push({x:5,y:2.15,kind:'rune',used:false,reveal:true});
 s.y=2.39;assert.equal(physics.resolveBlocks(s,l,4.8,2.68),true);
 assert.equal(s.y,2.55);assert.equal(s.grounded,true);assert.equal(s.vy,0);
});
test('NJ129: run blocked by solid side, hidden or consumed block is intangible',()=>{
 const {s,l}=setup();s.y=2.05;s.vy=0;s.x=5.1;
 const b={x:5,y:2.15,kind:'stone',used:false,reveal:true};l.blocks.push(b);
 assert.equal(physics.resolveBlocks(s,l,4.1,2.05),true);
 assert.equal(s.x,4.28);assert.equal(s.vx,0);
 b.used=true;s.x=5.1;s.vx=3;
 assert.equal(physics.resolveBlocks(s,l,4.1,2.05),false);
 assert.equal(s.x,5.1);
 b.used=false;b.kind='hidden';b.reveal=false;
 assert.equal(physics.resolveBlocks(s,l,4.1,2.05),false);
});
test('NJ129: projectiles cannot pass through intact solid block',()=>{
 const {s,l}=setup();physics.start(s,l);
 s.power=2;l.blocks.push({x:5.3,y:1.05,kind:'stone',used:false,reveal:true});
 s.nj127.shots.push({alive:true,x:4.9,y:1.02,vx:40,vy:0,age:0});
 physics.after(s,l,.04,()=>{});
 assert.equal(s.nj127.shots.length,0);
 assert.equal(s.nj127.blocked,1);
});
test('NJ129: swept projectiles hit enemies across fast horizontal travel',()=>{
 const {s,l}=setup();physics.start(s,l);
 l.enemies.push({alive:true,x:6.1,y:.55,type:'walker',vx:0});
 s.nj127.shots.push({alive:true,x:5.2,y:.83,vx:50,vy:0,age:0});
 physics.after(s,l,.04,()=>{});
 assert.equal(l.enemies[0].alive,false);
 assert.equal(s.nj127.shots.length,0);
});
test('NJ129: shells eliminate enemies crossed between physics ticks, not only endpoints',()=>{
 const {s,l}=setup();physics.start(s,l);
 l.enemies.push({x:7,prevX:4.8,y:.22,vx:9,alive:true,type:'shell'},
  {x:5.9,y:.38,vx:0,alive:true,type:'walker'});
 physics.after(s,l,1/60,()=>{});
 assert.equal(l.enemies[1].alive,false);
 assert.equal(s.nj127.shellKOs,1);
});
test('NJ129: game uses block solver, touch jump assistance, independent shell meshes',()=>{
 const js=read('nj123-classic.js'),three=read('nj125-classic-3d.js');
 assert.match(js,/NUSAJIWA_NES127\?\.resolveBlocks\?\.\(s,l,oldX,oldY\)/);
 assert.match(js,/s\.jumpBuffer=\.12/);
 assert.match(js,/s\.coyote=s\.grounded\?\.10/);
 assert.match(js,/e\.type==='shell'&&Math\.abs\(e\.vx\)>2/);
 assert.match(three,/const shellRig=new THREE\.Group/);
 assert.match(three,/item\.shellRig\.rotation\.z/);
 assert.match(three,/!x\.ref\.used/);
 const html=read('index.html');
 assert.ok(html.includes('nj123-classic.js?v=9.9.129'));
 const r=JSON.parse(read('release.json'));
 assert.equal(r.version,'8.3');assert.equal(r.runtime.identities,300);
 assert.equal(r.merged_gameplay_improvements.filter(p=>p.patch==='NJ129').length,1);
});
