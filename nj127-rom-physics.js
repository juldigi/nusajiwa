/* NJ127 | Classic 32 · NES ROM-informed interactive mechanics, NUSAJIWA original art.
 * This is NOT a cartridge emulator or a transfer of Nintendo maps, sprites, audio.
 * Facts derived from user ROM: NROM/mapper 0, 32 KiB PRG, 8 KiB CHR, 8 worlds.
 * The new features reflect classic platformer behaviour but are proprietary-
 * independent fantasy objects. All coordinates are in existing Classic world units.
 * Ephemeral state is attached only to current RUN; no save schema mutation.
 */
(function(){
'use strict';
if(window.NUSAJIWA_NES127)return;
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
const clean=x=>Number.isFinite(x)?x:0;
const stable=(kind,x,y,vx,vy)=>({kind,x,y,vx,vy,rise:0,age:0,alive:true});
const intersects=(x,g)=>x>g[0]-.24&&x<g[1]+.24;
const ground=(level,x)=>!level.gaps.some(g=>intersects(x,g));
const nearPipe=(level,x,y)=>level.pipes.some(p=>Math.abs(p.x-x)<.79&&y<p.h+.32);
const sweep=(a,b,c,r)=>Math.min(a,b)<=c+r&&Math.max(a,b)>=c-r;
const solid=b=>!b.used&&(b.kind!=='hidden'||b.reveal!==false);
/* All 3D/Canvas blocks share one collision box: top y+.40, bottom y-.40. */
function resolveBlocks(s,l,oldX,oldY){
 if(!s||!l?.blocks)return false;
 const half=.72,height=s.power?1.55:1.16;
 let hit=false;
 // Landing before wall resolution: when falling onto a block, it is solid.
 if(s.vy<=0){
  let top=-Infinity;
  for(const b of l.blocks){
   if(!solid(b)||Math.abs(s.x-b.x)>=half)continue;
   const y=b.y+.4;
   if(oldY>=y-.07&&s.y<=y&&y>top)top=y;
  }
  if(top>-Infinity){s.y=top;s.vy=0;s.grounded=true;hit=true;}
 }
 // Horizontal sweep stops walking directly THROUGH a rune/stone block.
 for(const b of l.blocks){
  if(!solid(b))continue;
  const bottom=b.y-.4,top=b.y+.4;
  if(s.y>=top-.06||s.y+height<=bottom+.06)continue;
  const left=b.x-half,right=b.x+half;
  if(oldX<=left+.02&&s.x>left){s.x=left;s.vx=0;hit=true;}
  else if(oldX>=right-.02&&s.x<right){s.x=right;s.vx=0;hit=true;}
 }
 return hit;
}
function start(s,l){
 if(!s||!l)return false;
 s.nj127={items:[],shots:[],star:0,starCollected:false,runHeld:false,
  fireCooldown:0,shellChain:0,shellKOs:0,elementalShots:0,stompCombo:0,
  scoreEarned:0,picked:0,blocked:0};
 return true;
}
// NJ128: temporary powers belong to a life, not a checkpoint or a save.
function isProtected(s){return !!(s?.nj127?.star>0);}
function resetLife(s){
 const fx=s?.nj127;if(!fx)return false;
 fx.items.length=0;fx.shots.length=0;fx.star=0;
 fx.runHeld=false;fx.fireCooldown=0;fx.shellChain=0;fx.stompCombo=0;
 return true;
}
function hitBlock(s,l,b,hint){
 const fx=s?.nj127;
 if(!fx||b?.content!=='power')return false;
 // Classic power-blocks now RELEASE a physical item. No instant power
 // grant, and no item passes through a cave roof/pipe face.
 const special=s.power>=2||(l.index%4===3&&l.blocks.filter(x=>x.kind==='power').indexOf(b)>0);
 const item=stable(special?'surya':'batu',b.x,b.y+.32, special?3.0:2.1,0);
 item.rise=.48;item.typeLabel=special?'Cahaya Surya':'Batu Daya';
 fx.items.push(item);
 hint?.('✧ '+item.typeLabel+' muncul · ambil untuk mengaktifkan!');
 return true;
}
function before(s,l,keys,dt){
 const fx=s?.nj127;if(!fx)return false;
 fx.star=Math.max(0,fx.star-dt);
 fx.fireCooldown=Math.max(0,fx.fireCooldown-dt);
 if(keys?.run&&!fx.runHeld&&s.power>=2&&fx.fireCooldown<=0&&!s.stop){
  fx.shots=fx.shots.filter(q=>q.alive&&q.age<2);
  if(fx.shots.length<2){
   const dir=s.facing||1,q=stable('bara',s.x+dir*.42,s.y+.83,
     dir*9.3,2.4);
   fx.shots.push(q);fx.elementalShots++;fx.fireCooldown=.19;
  }
 }
 fx.runHeld=!!keys?.run;
 return true;
}
function touchEnemy(s,l,e,hint){
 const fx=s?.nj127;
 if(!fx||fx.star<=0||!e?.alive)return false;
 e.alive=false;e.shell=false;e.vx=0;
 fx.stompCombo++;const points=200*Math.min(8,fx.stompCombo);
 s.score+=points;fx.scoreEarned+=points;
 hint?.('✦ Cahaya Surya · penjaga terkalahkan!');
 return true;
}
function stomp(s,l,e,hint){
 if(!s?.nj127||!e||!e.alive)return false;
 if(e.type==='shelled'&&!e.shell){
  e.shell=true;e.vx=0;e.y=.22;
  s.nj127.stompCombo++;s.score+=100;
  hint?.('Cangkang diam · sentuh dari samping untuk menendang');
  return true;
 }
 if(e.type==='shell'){
  e.type='shelled';e.shell=true;e.vx=0;e.y=.22;
  s.nj127.stompCombo++;
  hint?.('Cangkang dihentikan');
  return true;
 }
 return false;
}
function kickShell(s,l,e,hint){
 if(!s?.nj127||!e?.shell)return false;
 e.vx=(s.facing||1)*9;
 e.shell=false;e.type='shell';e.y=.21;
 s.score+=70;hint?.('➤ Cangkang bergulir!');
 return true;
}
function tickItems(s,l,fx,dt,hint){
 for(const item of fx.items){
  if(!item.alive)continue;
  item.age+=dt;
  if(item.rise>0){
   const rise=Math.min(dt,item.rise);
   item.y+=rise*1.65;
   item.rise-=rise;
  }else{
   item.vy-=17*dt;
   item.vy=Math.max(-9,item.vy);
   item.y+=item.vy*dt;
   const onLand=ground(l,item.x);
   if(onLand&&item.y<.36){item.y=.36;item.vy=0;}
   if(onLand&&item.y<=.37){
    const next=item.x+item.vx*dt;
    if(nearPipe(l,next,item.y)){item.vx*=-1;}
    else{item.x=next;}
   }else{
    item.x+=item.vx*dt;
   }
  }
  if(item.x<.5||item.x>l.length-2)item.vx*=-1;
  if(Math.abs(s.x-item.x)<.65&&Math.abs(s.y+.64-item.y)<.76){
   item.alive=false;fx.picked++;fx.stompCombo=0;
   if(item.kind==='surya'){
    fx.star=8.0;fx.starCollected=true;
    s.score+=400;fx.scoreEarned+=400;
    hint?.('✦ Cahaya Surya · 8 detik tak terkalahkan!');
   }else{
    s.power=Math.min(2,(s.power||0)+1);
    s.score+=180;fx.scoreEarned+=180;
    hint?.(s.power>=2?'◆ Kemampuan Bara aktif · tombol B untuk proyektil':'◇ Pelindung Batu Daya aktif!');
   }
  }
  if(item.age>15||item.y<-2.5)item.alive=false;
 }
 fx.items=fx.items.filter(x=>x.alive);
}
function tickShots(s,l,fx,dt,hint){
 for(const q of fx.shots){
  if(!q.alive)continue;
  q.age+=dt;
  const fromX=q.x,fromY=q.y;
  q.x+=q.vx*dt;q.vy=Math.max(-9,q.vy-19*dt);q.y+=q.vy*dt;
  if(q.y<.24){
   if(ground(l,q.x)){q.y=.24;q.vy=5.1;}
   else if(q.y<-1)q.alive=false;
  }
  // A swept hit test prevents fast shots tunnelling through solid scenery.
  for(const b of l.blocks){
   if(solid(b)&&sweep(fromX,q.x,b.x,.56)&&
     sweep(fromY,q.y,b.y,.53)){q.alive=false;fx.blocked++;break;}
  }
  if(!q.alive)continue;
  if(l.pipes.some(p=>sweep(fromX,q.x,p.x,.72)&&
      Math.min(fromY,q.y)<p.h+.33&&Math.max(fromY,q.y)>-.2))q.alive=false;
  if(q.x<0||q.x>l.length||q.age>2.1)q.alive=false;
  if(!q.alive)continue;
  for(const e of l.enemies){
   if(!e.alive||!sweep(fromX,q.x,e.x,.51)||
     !sweep(fromY,q.y,(e.y??0)+.27,.65))continue;
   if(e.type==='guard'){q.alive=false;break;}
   e.alive=false;e.shell=false;q.alive=false;
   s.score+=180;fx.scoreEarned+=180;fx.stompCombo++;
   hint?.('✧ Proyektil Bara mengenai musuh');
   break;
  }
 }
 fx.shots=fx.shots.filter(q=>q.alive);
}
function tickShellChains(s,l,fx,hint){
 for(const shell of l.enemies){
  if(!shell.alive||shell.type!=='shell'||Math.abs(shell.vx)<2)continue;
  for(const e of l.enemies){
   if(e===shell||!e.alive||!sweep(shell.prevX??shell.x,shell.x,e.x,.51))continue;
   if(Math.abs((shell.y??0)-(e.y??0))>.85||['fish','jelly'].includes(e.type))continue;
   e.alive=false;e.vx=0;fx.shellKOs++;fx.shellChain++;
   const pts=100*Math.min(8,2**Math.min(3,fx.shellChain-1));
   s.score+=pts;fx.scoreEarned+=pts;
   hint?.('➤ Serangan berantai cangkang ×'+fx.shellChain);
  }
 }
}
function after(s,l,dt,hint){
 const fx=s?.nj127;if(!fx||s.stop)return false;
 tickItems(s,l,fx,dt,hint);
 tickShots(s,l,fx,dt,hint);
 tickShellChains(s,l,fx,hint);
 return true;
}
function view(s){
 const x=s?.nj127;
 return x?{items:x.items,shots:x.shots,star:x.star,active:x.star>0,
  fire:s.power>=2,chain:x.shellChain,projectiles:x.elementalShots}:null;
}
function draw2D(ctx,s,X,Y,p){
 const fx=s?.nj127;
 if(!fx||!ctx)return;
 ctx.save();
 for(const o of fx.items){
  const x=X(o.x),y=Y(o.y),pulse=Math.sin(s.elapsed*7)*.13;
  ctx.fillStyle=o.kind==='surya'?'#ffdc7f':'#d0e9bc';
  ctx.strokeStyle=o.kind==='surya'?'#ff9950':'#416d62';
  ctx.lineWidth=Math.max(1,p*.05);
  ctx.beginPath();ctx.arc(x,y,(.24+pulse*.2)*p,0,Math.PI*2);ctx.fill();ctx.stroke();
  ctx.fillStyle='#27363b';ctx.font='bold '+Math.floor(p*.37)+'px system-ui';
  ctx.fillText(o.kind==='surya'?'✦':'◆',x-p*.18,y+p*.12);
 }
 for(const q of fx.shots){
  ctx.fillStyle='#ffae64';ctx.beginPath();
  ctx.arc(X(q.x),Y(q.y),p*.14,0,Math.PI*2);ctx.fill();
 }
 if(fx.star>0){
  ctx.strokeStyle='#ffe28b';ctx.lineWidth=p*.06;ctx.globalAlpha=.65;
  ctx.beginPath();ctx.arc(X(s.x),Y(s.y+.63),p*.63,0,Math.PI*2);ctx.stroke();
 }
 ctx.restore();
}
window.NUSAJIWA_NES127=Object.freeze({version:'NJ129.0',start,isProtected,resetLife,resolveBlocks,hitBlock,before,
 touchEnemy,stomp,kickShell,after,view,draw2D,romInformed:true,
 privacy:'NO original cartridge bytes, level maps, sprites or sounds shipped'});
})();