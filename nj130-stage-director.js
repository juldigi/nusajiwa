/* NUSAJIWA NJ130 — 32-stage platformer choreography, original Nusantara level design.
 * One independent blueprint for each stage. Gameplay rhythm informed by the NES
 * genre, but NO Nintendo maps, assets, sounds, text, or ROM data are included.
 * Features: signature traversal, safe-ground spring stones, orbital sentries,
 * collectible teaching arcs, paced enemy patrols, dynamic moving platforms.
 * Does not add/alter localStorage keys or the Tamagotchi save schema.
 */
(function(){
'use strict';
if(window.NUSAJIWA_STAGE130)return;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const BLUEPRINTS=Object.freeze([
 // chapter, biome motion, rhythm 0–4, spring stones, sentries, coin arc
 ['Jejak Harimau','roots',0,1,1,'rising'],
 ['Ceruk Rangkong','cave',1,1,1,'descending'],
 ['Lintasan Enggang','canopy',1,2,1,'crest'],
 ['Segel Akar','boss',1,0,2,'descending'],
 ['Pantai Pertama','coast',1,1,1,'rising'],
 ['Lorong Kapur','cave',2,1,2,'wave'],
 ['Titian Bakau','mangrove',2,2,2,'crest'],
 ['Gerbang Arus','boss',2,0,2,'descending'],
 ['Tapak Anoa','cliff',2,1,2,'rising'],
 ['Lompat Tarsius','cloud',2,2,2,'crest'],
 ['Punggung Kabut','wind',3,2,2,'wave'],
 ['Ritual Angin','boss',3,0,3,'descending'],
 ['Riak Mahakam','swamp',2,1,2,'wave'],
 ['Akar Bekantan','cave',3,1,2,'rising'],
 ['Langkah Ulin','bridge',3,2,3,'crest'],
 ['Gerbang Hujan','boss',3,0,3,'wave'],
 ['Tapak Komodo','savanna',2,1,2,'descending'],
 ['Lorong Bara','lava',3,1,3,'wave'],
 ['Titian Lontar','wind',3,2,3,'crest'],
 ['Segel Watu','boss',3,0,3,'rising'],
 ['Jalan Pura','temple',2,1,2,'rising'],
 ['Ruang Relief','stone',3,1,3,'descending'],
 ['Tangga Candi','stairs',3,2,3,'crest'],
 ['Panggung Topeng','boss',4,0,3,'wave'],
 ['Pasir Halmahera','coast',3,1,3,'rising'],
 ['Arus Banda','water',3,0,3,'wave'],
 ['Langit Seram','cave',4,2,3,'crest'],
 ['Gerbang Laut','boss',4,0,4,'descending'],
 ['Tapak Kasuari','forest',3,1,3,'rising'],
 ['Sayap Cenderawasih','canopy',4,2,3,'crest'],
 ['Kabut Puncak','wind',4,2,4,'wave'],
 ['Tahta Langit','boss',4,0,4,'descending']
]);
const clear=(l,x,margin)=>l.gaps.every(g=>x<g[0]-margin||x>g[1]+margin);
function place(level,target,used){
 const low=17,high=level.length-16;
 for(let d=0;d<=11;d+=.5)for(const sign of [1,-1]){
  const x=clamp(target+d*sign,low,high);
  if(!clear(level,x,.92))continue;
  if(level.pipes.some(p=>Math.abs(p.x-x)<1.65))continue;
  if(level.blocks.some(b=>Math.abs(b.x-x)<1.05))continue;
  if(used.some(v=>Math.abs(v-x)<2.45))continue;
  return +x.toFixed(2);
 }
 return null;
}
function decorate(level){
 if(!level||!Number.isInteger(level.index)||!BLUEPRINTS[level.index])return level;
 const ix=level.index,b=BLUEPRINTS[ix],used=[],pads=[],sentries=[];
 // Every level has its own five-beat route; positions favor safe ground,
 // preserving existing checkpoints, secrets, pipe warps and finish gates.
 const cadence=b[2],padCount=level.type==='water'?0:b[3],hazardCount=b[4];
 for(let j=0;j<padCount;j++){
  const pos=place(level,level.length*(padCount===1?.32:(j===0?.27:.64)),used);
  if(pos!==null){pads.push({x:pos,boost:11.9+cadence*.48,kind:'batu-pantul'});used.push(pos);}
 }
 for(let j=0;j<hazardCount;j++){
  const pos=place(level,level.length*(.37+j*.43/Math.max(1,hazardCount-1)),used);
  if(pos!==null){
   sentries.push({x:pos,y:1.28+(j%2)*.58,amplitude:.48+.12*(cadence%3),
    speed:.95+cadence*.14+j*.17,phase:ix*.47+j*1.1,kind:b[1],
    radius:.27+(ix>=24?.03:0)});
   used.push(pos);
  }
 }
 // Distinct arcs are navigational signs; every reward remains collectible
 // with normal original NUSAJIWA physics, not an imported cartridge tilemap.
 const arcX=place(level,level.length*.53,used);
 if(arcX!==null){
  for(let k=-2;k<=2;k++){
   const x=arcX+k*.78;
   if(!clear(level,x,.23))continue;
   const arc=b[5]==='crest'?1.08-Math.abs(k)*.23:
    b[5]==='descending'?1.45-k*.16:
    b[5]==='wave'?.94+Math.sin((k+2)*1.2)*.38:.98+k*.14;
   level.coins.push({x:+x.toFixed(2),y:+(1.05+Math.max(0,arc)).toFixed(2),
    got:false,nj130:true});
  }
 }
 // Authored pacing: early regions teach movement; later regions tighten patrol.
 for(let j=0;j<level.enemies.length;j++){
  const e=level.enemies[j];
  if(e.type==='fish'||e.type==='jelly')continue;
  const forward=j%2===0?1:-1,speed=.42+cadence*.11+(j%3)*.09;
  e.vx=forward*speed;
  e.start=Math.max(2,e.base-(1.2+cadence*.11));
  e.end=Math.min(level.length-4,e.base+(1.25+cadence*.13));
 }
 // Individual crossover on safe land, never a barrier blocking the main route.
 if(level.section!==3){
  const across=place(level,level.length*(.70+(ix%3)*.03),used);
  if(across!==null)level.platforms.push({x:across,y:1.55+(ix%3)*.28,
    w:2.2+(ix%2)*.50,kind:ix%2?'sway':'suspended',nj130:true});
 }
 level.nj130={signature:'NJ130-'+String(ix+1).padStart(2,'0')+'-'+b[0],
  title:b[0],biome:b[1],cadence,pads,sentries,arc:b[5],
  route:['pengenalan','teknik','puncak','variasi','gerbang'],
  originalLayout:true};
 return level;
}
function start(run,level){
 if(!run||!level?.nj130)return false;
 run.nj130={cooldown:0,bounces:0,hazardHits:0};
 if(level.boss)bossStart(run,level);
 return true;
}
function resetLife(run,level){
 if(!run?.nj130)return false;
 run.nj130.cooldown=0;
 if(level?.boss){level.boss.hp=level.boss.maxHp||level.boss.hp;bossStart(run,level);}
 return true;
}
function bounce(run,level,hint){
 if(!run?.nj130||!level?.nj130||run.nj130.cooldown>0||
  run.vy>0||run.y>.22||!run.grounded)return false;
 for(const p of level.nj130.pads){
  if(Math.abs(run.x-p.x)>.58)continue;
  run.vy=p.boost;run.grounded=false;run.coyote=0;
  run.jumpBuffer=0;run.nj130.cooldown=.44;run.nj130.bounces++;
  hint?.('◆ Batu Pantul · lompatan tinggi!');
  return true;
 }
 return false;
}
function position(h,t){
 return {x:h.x+Math.sin(t*h.speed*.67+h.phase)*.48,
  y:h.y+Math.cos(t*h.speed+h.phase)*h.amplitude};
}
// NJ131: rendering, collision and carrying use exactly the same platform orbit.
function platformPosition(p,t){
 if(!p)return null;
 return {x:p.x+(p.kind==='suspended'?Math.sin(t*1.3+p.x):0),
  y:p.y+(p.kind==='sway'?Math.sin(t*1.2+p.x)*.45:0)};
}
function carry(run,level,dt){
 if(!run||!level||!run.grounded||!Number.isInteger(run.support)||run.bonus)return false;
 const p=level.platforms?.[run.support];if(!p)return false;
 const now=platformPosition(p,run.elapsed);
 const previous=platformPosition(p,Math.max(0,run.elapsed-dt));
 run.x+=now.x-previous.x;run.y+=now.y-previous.y;
 return true;
}
// NJ132 · fixed 60Hz momentum, braking and airborne inertia.
function move(run,level,keys,dt){
 if(!run||!level||!keys||!Number.isFinite(dt)||dt<=0)return false;
 const dir=(keys.right?1:0)-(keys.left?1:0),water=level.type==='water';
 const cap=water?3.8:(keys.run?8.2:5.4);
 const prev=Number.isFinite(run.vx)?run.vx:0;
 if(dir){
  const skid=Math.sign(prev)!==dir&&Math.abs(prev)>.2;
  const accel=skid?(run.grounded?35:16):(run.grounded?24:13);
  run.vx=clamp(prev+dir*accel*dt,-cap,cap);
  run.skid=skid&&!!run.grounded;run.facing=dir;
 }else{
  run.vx=Math.sign(prev)*Math.max(0,Math.abs(prev)-(run.grounded?19:4)*dt);
  run.skid=false;
 }
 return true;
}
// Eight independently scaled guardian fights, with short attack immunity.
function bossStart(run,level){
 const b=level?.boss;if(!b)return false;
 b.home=Number.isFinite(b.home)?b.home:b.x;
 b.maxHp=Number.isFinite(b.maxHp)?b.maxHp:b.hp;
 b.x=b.home;b.vx=-(.8+level.world*.10);
 b.bob=0;b.facing=-1;b.hurt=0;b.cooldown=1.8;
 b.orbs=[];b.attacks=0;b.enraged=false;
 return true;
}
function bossHit(run,level,source,hint){
 const b=level?.boss;if(!b||b.hp<=0||(b.hurt||0)>0)return false;
 b.hp=Math.max(0,b.hp-1);b.hurt=.52;
 b.enraged=b.hp<=Math.ceil(b.maxHp/2);
 run.score=(run.score||0)+(source==='bara'?160:250);
 if(b.hp===0){
  b.orbs=[];b.vx=0;b.bob=0;
  hint?.('✦ '+b.name+' ditaklukkan · gerbang terbuka!');
 }else hint?.('◆ Segel Penjaga melemah · '+b.hp+' kekuatan tersisa');
 return true;
}
function bossMotion(run,level,dt,damage,hint){
 const b=level?.boss;if(!b||!run||run.stop)return false;
 if(!Number.isFinite(b.home))bossStart(run,level);
 b.hurt=Math.max(0,(b.hurt||0)-dt);
 if(b.hp<=0){b.orbs=[];return true;}
 const tempo=.8+level.world*.10+(b.enraged?.48:0);
 b.x+=b.vx*dt;
 if(b.x<b.home-2.4){b.x=b.home-2.4;b.vx=Math.abs(tempo);}
 if(b.x>b.home+1.4){b.x=b.home+1.4;b.vx=-Math.abs(tempo);}
 b.bob=Math.sin(run.elapsed*(2+level.world*.25))*.13;
 b.facing=run.x<b.x?-1:1;b.cooldown-=dt;
 if(b.cooldown<=0&&Math.abs(run.x-b.x)<16&&b.orbs.length<3){
  const dir=run.x<b.x?-1:1;
  b.orbs.push({x:b.x+dir*.7,y:1.15+b.bob,
   vx:dir*(3+level.world*.24),age:0,alive:true});
  b.attacks++;b.cooldown=Math.max(.88,2.2-level.world*.13-(b.enraged?.22:0));
 }
 for(const orb of b.orbs){
  if(!orb.alive)continue;
  const prev=orb.x;orb.x+=orb.vx*dt;orb.age+=dt;
  if(orb.age>3.4||orb.x<0||orb.x>level.length)orb.alive=false;
  if(orb.alive&&level.pipes.some(p=>Math.min(prev,orb.x)<p.x+.69&&
    Math.max(prev,orb.x)>p.x-.69&&orb.y<p.h+.31))orb.alive=false;
  if(orb.alive&&level.blocks.some(q=>!q.destroyed&&
    (q.kind!=='hidden'||q.reveal)&&Math.abs(orb.x-q.x)<.57&&
    Math.abs(orb.y-q.y)<.53))orb.alive=false;
  if(!orb.alive)continue;
  if(Math.abs(run.x-orb.x)<.55&&Math.abs(run.y+.66-orb.y)<.65){
   orb.alive=false;
   if(run.invincible<=0&&!window.NUSAJIWA_NES127?.isProtected?.(run)){
    damage?.();hint?.('⚠ Serangan penjaga!');
   }
  }
 }
 b.orbs=b.orbs.filter(o=>o.alive);
 return true;
}
function update(run,level,dt,damage,hint){
 if(!run?.nj130||!level?.nj130||run.stop)return false;
 run.nj130.cooldown=Math.max(0,run.nj130.cooldown-dt);
 if(run.invincible>0||window.NUSAJIWA_NES127?.isProtected?.(run))return true;
 for(const h of level.nj130.sentries){
  const p=position(h,run.elapsed);
  if(Math.abs(run.x-p.x)>.67||Math.abs(run.y+.56-p.y)>.73)continue;
  run.nj130.hazardHits++;
  damage?.();hint?.('⚠ Penjaga wilayah bergerak!');
  break;
 }
 return true;
}
function draw2D(ctx,run,level,X,Y,p){
 if(!ctx||!level?.nj130)return;
 const t=run?.elapsed||0;
 ctx.save();
 for(const pad of level.nj130.pads){
  const x=X(pad.x),y=Y(0);
  ctx.fillStyle='#143f46';ctx.fillRect(x-p*.41,y-p*.12,p*.82,p*.16);
  ctx.fillStyle='#f6d684';ctx.beginPath();
  ctx.moveTo(x-p*.26,y-p*.19);ctx.lineTo(x,y-p*.48);
  ctx.lineTo(x+p*.26,y-p*.19);ctx.closePath();ctx.fill();
 }
 for(const h of level.nj130.sentries){
  const pos=position(h,t),x=X(pos.x),y=Y(pos.y);
  ctx.fillStyle=h.kind==='lava'||h.kind==='boss'?'#f09b68':'#aeddd4';
  ctx.strokeStyle='#f8e7ac';ctx.lineWidth=Math.max(1,p*.04);
  ctx.beginPath();ctx.arc(x,y,p*h.radius,0,Math.PI*2);ctx.fill();ctx.stroke();
  ctx.beginPath();ctx.moveTo(x-p*.15,y);ctx.lineTo(x+p*.15,y);ctx.stroke();
 }
 ctx.restore();
}
window.NUSAJIWA_STAGE130=Object.freeze({version:'NJ132.0',
 blueprints:BLUEPRINTS,decorate,start,resetLife,bounce,position,platformPosition,carry,
 move,bossStart,bossHit,bossMotion,update,draw2D,
 copyright:'Original Nusantara stage choreography; no Nintendo maps, graphics, music or ROM bytes'});
})();
