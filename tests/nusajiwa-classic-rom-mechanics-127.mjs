import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const ctx={window:{}};runInNewContext(read('nj127-rom-physics.js'),ctx);
const api=ctx.window.NUSAJIWA_NES127;
const run=()=>({s:{x:8,y:0,vx:0,vy:0,score:0,facing:1,power:0,stop:false,elapsed:0},
 l:{index:0,length:80,gaps:[],pipes:[],enemies:[],blocks:[]}});
test('Blocks release physical collectibles before granting avatar power',()=>{
 const {s,l}=run();api.start(s,l);
 const b={x:8,y:2.15,kind:'power',content:'power'};l.blocks.push(b);
 assert.equal(api.hitBlock(s,l,b,()=>{}),true);
 assert.equal(s.power,0);assert.equal(api.view(s).items.length,1);
 for(let i=0;i<500;i++){
  const item=api.view(s).items[0];if(item)s.x=item.x;
  api.after(s,l,1/60,()=>{});
 }
 assert.equal(s.power,1);
 assert.equal(api.view(s).items.length,0);
});
test('Run/B press launches bouncing fireball once per edge with max 2 active',()=>{
 const {s,l}=run();api.start(s,l);s.power=2;
 api.before(s,l,{run:true},1/60);
 api.before(s,l,{run:true},1/60);
 assert.equal(api.view(s).shots.length,1);
 api.before(s,l,{run:false},.25);api.before(s,l,{run:true},1/60);
 assert.equal(api.view(s).shots.length,2);
});
test('Star defeats touching foes, expires after 8 seconds and is nonpersistent',()=>{
 const {s,l}=run();api.start(s,l);
 s.nj127.star=8;
 const foe={alive:true,vx:1,type:'walker'};
 assert.equal(api.touchEnemy(s,l,foe,()=>{}),true);assert.equal(foe.alive,false);
 api.before(s,l,{run:false},8.5);
 assert.equal(api.touchEnemy(s,l,{alive:true,type:'walker'},()=>{}),false);
 assert.equal(read('nj127-rom-physics.js').includes('localStorage.'),false);
});
test('Stomp, kick and rolling shell eliminate other opponents for chain score',()=>{
 const {s,l}=run();api.start(s,l);
 const shell={x:7,y:.4,alive:true,type:'shelled',shell:false,vx:1};
 const a={x:7.1,alive:true,type:'walker'},b={x:7.2,alive:true,type:'shelled'};
 l.enemies.push(shell,a,b);
 assert.equal(api.stomp(s,l,shell,()=>{}),true);
 assert.equal(shell.vx,0);assert.equal(shell.shell,true);
 assert.equal(api.kickShell(s,l,shell,()=>{}),true);
 api.after(s,l,1/60,()=>{});
 assert.equal(a.alive,false);assert.equal(b.alive,false);
 assert.equal(s.nj127.shellKOs,2);
});
test('Existing Classic32 code paths and 3D/CSS fallbacks share runtime, no ROM deployed',()=>{
 const classic=read('nj123-classic.js'),three=read('nj125-classic-3d.js');
 for(const name of ['start','before','hitBlock','touchEnemy','stomp','kickShell','after','draw2D'])
 assert.ok(classic.includes('window.NUSAJIWA_NES127?.'+name+'?.('),name);
 assert.ok(three.includes('window.NUSAJIWA_NES127?.view?.(status)'));
 assert.ok(three.includes('new THREE.IcosahedronGeometry'));
 const html=read('index.html');
 assert.ok(html.indexOf('nj127-rom-physics.js')<html.indexOf('nj123-classic.js'));
 assert.ok(classic.includes("KEY='nusajiwa-classic-32-v1'"));
 assert.ok(read('nusajiwa-adventure.js').includes("KEY='nusajiwa-adventure-v1'"));
 const r=JSON.parse(read('release.json'));
 assert.equal(r.runtime.identities,300);
 assert.equal(r.merged_gameplay_improvements.filter(x=>x.patch==='NJ127').length,1);
 assert.ok(read('.github/workflows/pages.yml').includes('cp nj127-rom-physics.js'),'Physics asset must be copied even when batched');
 assert.ok(read('.github/workflows/tamagotchi-quality.yml').includes('node --check nj127-rom-physics.js'));
});
