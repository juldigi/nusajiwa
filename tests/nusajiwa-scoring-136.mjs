import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const c={window:{}};runInNewContext(read('nj127-rom-physics.js'),c);
const game=c.window.NUSAJIWA_NES127;
const state=()=>({x:3,y:1,vy:-5,coins:0,stageCoins:0,lives:3,score:0,stop:false,nj127:{stompCombo:0,scoreEarned:0}});
test('NJ136: multiple consecutive stomps escalate predictably and landing resets',()=>{
 const s=state();
 const got=Array.from({length:6},()=>game.stompAward(s));
 assert.deepEqual(got,[100,200,400,800,1600,3200]);
 assert.equal(s.score,6300);
 assert.equal(s.nj127.stompCombo,6);
 assert.equal(game.resetStompChain(s),true);
 assert.equal(game.stompAward(s),100);
 assert.equal(s.score,6400);
 assert.equal(game.resetStompChain(null),false);
});
test('NJ136: combo and score safely cap after long airborne streak',()=>{
 const s=state();
 for(let i=0;i<22;i++)game.stompAward(s);
 assert.equal(s.nj127.stompCombo,8);
 assert.ok(s.score>0);
 assert.equal(game.stompAward(s),8000);
});
test('NJ136: 100 coin rollover gives a new life without losing stage earned count',()=>{
 const s=state();s.coins=98;
 assert.equal(game.collectCoins(s,6),1);
 assert.equal(s.coins,4);
 assert.equal(s.lives,4);
 assert.equal(s.stageCoins,6);
 assert.equal(s.score,600);
 assert.equal(game.collectCoins(s,0),0);
 assert.equal(game.collectCoins(s,-4),0);
});
test('NJ136: multiple hundred-coin bonuses are not silently dropped',()=>{
 const s=state();s.coins=90;
 assert.equal(game.collectCoins(s,212),3);
 assert.equal(s.coins,2);
 assert.equal(s.lives,6);
 assert.equal(s.stageCoins,212);
 assert.equal(s.score,21200);
});
test('NJ136: new level coin totals exclude balance carried from prior stage',()=>{
 const previous={index:0,completed:true,stop:true,lives:4,score:900,
  coins:35,power:2,stageCoins:75};
 const carried=game.stageCarry(previous,1);
 const next={...carried,stageCoins:0};
 game.collectCoins(next,5);
 assert.equal(next.coins,40);
 assert.equal(next.stageCoins,5);
 const code=read('nj123-classic.js');
 assert.ok(code.includes('r.totalCoins=(r.totalCoins||0)+(status.stageCoins||0);'));
 assert.ok(code.includes('if(s.grounded&&!wasGrounded)window.NUSAJIWA_NES127?.resetStompChain?.(s);'));
 assert.ok(code.includes('stompAward?.(s,hint)'));
 assert.ok(code.includes('const timeBonus=Math.max(0,Math.floor(status.remaining))*10'));
 assert.ok(code.includes('const finalStage=index===MAX-1'));
 assert.ok(code.includes('Legenda Nusantara · Tamat!'));
});
test('NJ136: preserve previous builds and cache-busted current scripts',()=>{
 const m=JSON.parse(read('release.json'));
 assert.equal(m.runtime.identities,300);
 assert.equal(m.version,'8.3');
 assert.equal(m.merged_gameplay_improvements.filter(x=>x.patch==='NJ136').length,1);
 const index=read('index.html');
 assert.ok(index.includes('nj123-classic.js?v=9.16.136'));
 assert.ok(index.includes('nj127-rom-physics.js?v=9.16.136'));
 for(const p of ['nj123-classic.css','nj125-classic-3d.js'])
  assert.ok(index.includes(p));
});
