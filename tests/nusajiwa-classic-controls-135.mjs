import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const c={window:{}};runInNewContext(read('nj127-rom-physics.js'),c);
const engine=c.window.NUSAJIWA_NES127;
test('NJ135: hidden unrevealed bonus block is intangible; revealed block remains solid',()=>{
 const b={x:5,y:2.1,kind:'hidden',used:false};
 const l={blocks:[b]},s={x:5.1,y:2.15,vx:5,vy:0,power:0,grounded:false};
 assert.equal(engine.resolveBlocks(s,l,4,2.15),false);
 b.reveal=true;
 assert.equal(engine.resolveBlocks(s,l,4,2.15),true);
 assert.equal(s.vx,0);
 b.used=true;s.vx=5;s.x=5.1;
 assert.equal(engine.resolveBlocks(s,l,4,2.15),true);
});
test('NJ135: falling through enemy top triggers stomp before center overlap',()=>{
 const enemy={x:5,y:.38,shell:false};
 const s={x:5,y:.80,vy:-7};
 assert.equal(engine.stompContact(s,enemy,.97,false),true);
 assert.equal(engine.stompContact(s,enemy,.70,false),false);
 assert.equal(engine.stompContact(s,enemy,.97,true),false);
 s.vy=4;assert.equal(engine.stompContact(s,enemy,.97,false),false);
 enemy.shell=true;s.vy=-7;assert.equal(engine.stompContact(s,enemy,.97,false),false);
});
test('NJ135: complete stage carries life, score, coin and power into next only',()=>{
 const prev={index:0,completed:true,stop:true,lives:6,score:1280,coins:47,power:2};
 const next=engine.stageCarry(prev,1);
 assert.equal(next.lives,6);assert.equal(next.score,1280);
 assert.equal(next.coins,47);assert.equal(next.power,2);
 assert.equal(engine.stageCarry(prev,2),null);
 assert.equal(engine.stageCarry({...prev,completed:false},1),null);
 assert.equal(engine.stageCarry({...prev,stop:false},1),null);
});
test('NJ135: finger-tracked input coexists with separate keyboard ownership',()=>{
 const src=read('nj123-classic.js');
 assert.ok(src.includes("const keySources={left:new Set(),right:new Set(),jump:new Set(),run:new Set(),down:new Set()}"));
 assert.ok(src.includes("setKey(n,true,'pointer:'+ev.pointerId)"));
 assert.ok(src.includes("setKey(n,false,'pointer:'+ev.pointerId)"));
 assert.ok(src.includes("setKey(mapped,down,'keyboard:'+ev.code)"));
 assert.ok(src.includes('const held=owners.size>0;'));
 assert.ok(src.includes('if(k===\'jump\'&&held&&!key.jump)key.pressed=true;'));
 assert.ok(src.includes('for(const owners of Object.values(keySources))owners.clear();'));
 assert.ok(src.includes("start((status?.index??0)+1,true)"));
 assert.ok(src.includes('status.stop=true;status.completed=true;'));
 assert.ok(src.includes('const carry=continueRun?window.NUSAJIWA_NES127?.stageCarry?.(status,n):null;'));
});
test('NJ135: 3D retry creates fresh geometry for a freshly generated same stage',()=>{
 const src=read('nj125-classic-3d.js');
 assert.ok(src.includes("if(id!==stageKey||stageLevel!==level)"));
 assert.ok(src.includes("stageKey=level.index+':'+(pet?.id||'default');stageLevel=level;"));
 assert.ok(src.includes("gate=null;stageKey='';stageLevel=null;"));
});
test('NJ135: visual, registry, mobile controls, safe area and progress contracts',()=>{
 const css=read('nj123-classic.css'),index=read('index.html');
 assert.ok(css.includes('NJ135 Classic32'));
 assert.ok(css.includes('env(safe-area-inset-bottom,0px)'));
 assert.ok(css.includes('touch-action:none'));
 for(const f of ['nj123-classic.js','nj125-classic-3d.js',
 'nj127-rom-physics.js','nj123-classic.css'])
 assert.ok(index.includes(f+'?v=9.15.135'),f);
 const m=JSON.parse(read('release.json'));
 assert.equal(m.version,'8.3');assert.equal(m.runtime.identities,300);
 assert.equal(m.merged_gameplay_improvements.filter(e=>e.patch==='NJ135').length,1);
});
