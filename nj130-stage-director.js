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
 return true;
}
function resetLife(run){
 if(!run?.nj130)return false;
 run.nj130.cooldown=0;return true;
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
window.NUSAJIWA_STAGE130=Object.freeze({version:'NJ130.0',
 blueprints:BLUEPRINTS,decorate,start,resetLife,bounce,position,update,draw2D,
 copyright:'Original Nusantara stage choreography; no Nintendo maps, graphics, music or ROM bytes'});
})();
