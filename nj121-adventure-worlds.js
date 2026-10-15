/* NUSAJIWA NJ121 · ORIGINAL side-scrolling adventure design system.
 * Influences: readable 1985-era platformer teaching, optional secret passages,
 * escalating jumps and world identity. No Nintendo assets, music, maps or ROM.
 * Original Indonesian settings and interactions, same save key as v8.3. */
(function(){
'use strict';
if(window.NUSAJIWA_ADVENTURE121)return;
const ZONES=[
 {place:'Hutan Dipterokarpa Sumatra',biome:'kanopi',challenge:'Akar memantul dan tangga kanopi',mechanic:'spring',spring:[8,53],secret:[17,2.4],moving:[[31,1.65,2.7,.34,1.3]],tone:0x6ec39a},
 {place:'Rawa Danau Singkarak',biome:'rawa',challenge:'Jembatan apung melintasi pusaran air',mechanic:'current',water:[20,53],secret:[27,2.5],moving:[[39,1.8,3.0,.30,1.1],[60,1.8,2.8,.24,1.5]],tone:0x69a7ad},
 {place:'Punggung Bukit Berkabut',biome:'kabut',challenge:'Platform bergeser di balik kabut',mechanic:'fog',secret:[48,2.5],moving:[[31,2,2.6,.62,1.7],[68,2.1,2.6,.38,1.2]],tone:0xb6bfc0},
 {place:'Gua Batu Kapur Bukit Barisan',biome:'gua',challenge:'Stalaktit runtuh dan lorong gelap',mechanic:'cave',secret:[30,2.6],moving:[[48,1.65,3,.35,1.4]],falling:[27,50,71],tone:0x33495a},
 {place:'Situs Penjaga Rimba',biome:'ruins',challenge:'Temukan tiga segel lalu hadapi penjaga',mechanic:'boss',secret:[45,2.4],moving:[[29,1.8,2.7,.43,1.7]],sigils:[[10,1.15],[50,1.15],[87,1.15]],tone:0xa88b6e},
 {place:'Kaki Gunung Merapi',biome:'vulkanik',challenge:'Uap panas dan lantai berpijar',mechanic:'lava',secret:[31,2.5],moving:[[48,1.8,2.9,.45,1.4]],falling:[29,53],tone:0xb95e42},
 {place:'Teras Sawah Jawa Tengah',biome:'sawah',challenge:'Platform teras naik turun dan lonceng',mechanic:'terrace',spring:[12],secret:[55,2.5],moving:[[33,2.1,3.1,.52,1.2],[68,2,3.0,.48,1.6]],tone:0x95c16e},
 {place:'Kali Progo',biome:'banyu',challenge:'Arus bawah air dan napas petualang',mechanic:'swim',water:[43,58],secret:[53,2.5],moving:[[30,1.85,2.7,.50,1.9]],tone:0x639fb8},
 {place:'Kompleks Candi Batu',biome:'candi',challenge:'Batu rahasia dan pintu lorong tertutup',mechanic:'temple',secret:[29,2.6],moving:[[51,2.1,2.9,.36,1.2]],tone:0xafa084},
 {place:'Gerbang Penjaga Jawa',biome:'benteng',challenge:'Tiga segel di antara patroli penjaga',mechanic:'boss',secret:[31,2.6],moving:[[52,1.8,2.8,.54,1.7]],tone:0xb47659},
 {place:'Danau Hutan Kalimantan',biome:'danau',challenge:'Perahu hanyut dan platform terapung',mechanic:'boat',water:[43,58],secret:[30,2.4],moving:[[33,1.7,3,.55,1.2],[70,2,2.7,.46,1.3]],tone:0x69b6b0},
 {place:'Rimba Akar Banir',biome:'banir',challenge:'Lompat pada akar elastis dan tajuk',mechanic:'roots',spring:[10,53],secret:[51,2.7],moving:[[34,2.1,2.7,.58,1.4]],tone:0x438f61},
 {place:'Pegunungan Meratus',biome:'tebing',challenge:'Hembusan angin dan tepi jurang',mechanic:'wind',secret:[32,2.6],moving:[[53,2.2,2.8,.58,1.8]],tone:0x7eafbb},
 {place:'Aliran Air Hitam',biome:'hitam',challenge:'Pintu rute samping dan arus misteri',mechanic:'shadow',water:[45,63],secret:[53,2.5],moving:[[73,2.2,2.7,.51,1.4]],tone:0x36636c},
 {place:'Balairung Penjaga Hujan',biome:'balairung',challenge:'Tiga segel terakhir dan penjaga gerbang',mechanic:'boss',secret:[52,2.5],moving:[[72,1.8,2.9,.52,1.7]],tone:0x7e8f75}
];
// Four independently-scoped gameplay secrets:
// (1) discover an invisible block by hitting it from below,
// (2) unlock a bonus niche using SKILL near the discovered rune,
// (3) pocket extra Jiwa and jump to a safe optional short route,
// (4) permanently remember the niche per pet & level upon completion.
function safeLanding(level,x){
 for(const [a,b] of level.ground){
  const p=Math.max(a+1,Math.min(b-1,x));
  if(p<x-2)continue;
  if(level.hazards.some(h=>Math.abs(h-p)<1.6))continue;
  return Math.min(level.length-4,p);
 }
 return level.length-4;
}
function config(levels){
 if(!Array.isArray(levels)||levels.length!==ZONES.length)return false;
 for(let i=0;i<levels.length;i++){
  const l=levels[i],z=ZONES[i];
  l.nj121={...z,index:i,secretDestination:safeLanding(l,z.secret[0]+11)};
  if(z.sigils)l.sigils=z.sigils.map(v=>v.slice());
  // Existing basic collision-safe ground and save compatible world order remain.
  l.sky=z.tone;l.tag=z.challenge;
 }
 return true;
}
function init(run,index){
 const z=run.level.nj121;
 if(!z)return;
 run.nj121={zone:z,blocks:[{x:z.secret[0],y:z.secret[1],revealed:false,claimed:false}],
  moving:(z.moving||[]).map(([x,y,width,amplitude,speed],j)=>({x,y,width,amplitude,speed,offset:j*1.47})),
  springs:(z.spring||[]).map(x=>({x,lit:false})),
  falling:(z.falling||[]).map(x=>({x,phase:x*.17})),
  secretUnlocked:false,secretFound:false,secretNiche:false,shortcutUsed:false,waterBreath:12,
  bossHealth:z.mechanic==='boss'?3:0,lastNotice:0};
 // Give each stage visually distinct enemy behaviour and not repeat the same speed.
 run.patrols.forEach((e,j)=>{e.style=['crawler','hopper','sentry','glider'][(index+j)%4];e.defeated=false;});
}
function mobilePlatforms(run){
 const st=run.nj121;
 if(!st)return [];
 return st.moving.map(p=>[p.x,p.y+Math.sin(run.seconds*p.speed+p.offset)*p.amplitude,p.width]);
}
function gravity(run){
 const s=run?.nj121;if(!s)return 22;
 const z=s.zone;if(['swim','boat','shadow'].includes(z.mechanic) &&
  z.water && run.x>=z.water[0]&&run.x<=z.water[1]&&run.y<1.35)return 13;
 return 22;
}
function spring(run,emitFx,playFx){
 const st=run.nj121;if(!st)return false;
 const p=st.springs.find(p=>Math.abs(run.x-p.x)<.58);
 if(!p||run.y>.58||run.vy>0)return false;
 run.vy=12.2;run.grounded=false;run.double=false;
 emitFx(run.x,.35,'magic',12);playFx('jump');return true;
}
function special(run,announce,emitFx,playFx){
 const st=run?.nj121;if(!st)return false;
 const block=st.blocks[0];
 if(!block?.revealed||st.secretFound||Math.abs(run.x-block.x)>2.2)return false;
 // Deliberate two-action secret: knock on hidden block, then use SKILL
 // beside it to enter the niche (no accidental touch exploit).
 st.secretFound=true;st.secretNiche=true;st.shortcutUsed=true;
 run.score+=60;run.skillCool=1.1;
 emitFx(block.x,block.y,'magic',18);playFx('gem');
 run.x=st.zone.secretDestination;
 run.y=0;run.vy=0;run.vx=0;run.grounded=true;run.checkpoint=run.x;
 announce('✦ Ruang Jiwa tersembunyi! +60 Jiwa · jalur pintas ditemukan.');
 return true;
}
function tick(run,dt,input,hurt,announce,emitFx,playFx){
 const st=run?.nj121;if(!st||run.ended)return;
 const z=st.zone,block=st.blocks[0];
 if(!block.revealed&&run.vy>0&&Math.abs(run.x-block.x)<.48&&
  run.y+.95>=block.y&&run.y+.95<block.y+.25){
  block.revealed=true;run.vy=-1.8;run.score+=15;
  emitFx(block.x,block.y,'coin',9);playFx('coin');
  announce('❖ Blok tersembunyi ditemukan! Gunakan SKILL di dekatnya.');
 }
 if(spring(run,emitFx,playFx))announce('✦ Akar lentur memantulkan sahabat!');
 if(z.water&&run.x>=z.water[0]&&run.x<=z.water[1]&&run.y<1.1){
  run.vx*=.96;st.waterBreath=Math.max(0,st.waterBreath-dt);
  if(input.jump&&run.y<.75)run.vy=Math.max(run.vy,3.0);
  if(st.waterBreath<=0){st.waterBreath=12;hurt();announce('Ambil napas di atas air!');}
 }else st.waterBreath=Math.min(12,st.waterBreath+dt*5);
 if(z.falling?.length){
  for(const f of st.falling){
   // Falling mineral shards / volcanic rocks: predictable 3.2 second cycle.
   const t=(run.seconds+f.phase)%3.2;
   if(t>1.75&&t<2.60&&Math.abs(run.x-f.x)<.53){
    const spikeY=3.8-(t-1.75)*4.3;
    if(Math.abs((run.y+.60)-spikeY)<.46){hurt();return;}
   }
  }
 }
 // Guard captains have 3 hearts; players can stomp them three times.
 // First 3 hits only in a level with three sigils; other foes die on one stomp.
 const boss=st.bossHealth>0 && run.x>=run.level.length-10 && run.sigils.every(s=>s.got);
 if(boss && run.x>run.level.length-7.2 && run.x<run.level.length-5.2 &&
   run.y<.60 && run.hurtUntil<=0){
   // Boss shields may only be weakened by special pulse / route collect;
   // never lock the gate if a pet has no ability to jump in this narrow area.
   if(input.special){st.bossHealth=Math.max(0,st.bossHealth-1);
    run.score+=20;emitFx(run.x,1.0,'magic',6);playFx('skill');}
 }
}
function enemyCollision(run,enemy,announce,emitFx,playFx){
 if(enemy.defeated)return 'skip';
 if(run.vy<-.5 && run.y>.44){
  enemy.defeated=true;run.vy=6.5;run.score+=15;
  emitFx(run.x,run.y+.1,'coin',6);playFx('land');
  announce('✦ Penjaga dilompati! +15 Jiwa');
  return 'stomp';
 }
 return 'hurt';
}
function finish(run,rec,index){
 if(!run.nj121)return;
 if(!rec.hiddenRoutes)rec.hiddenRoutes={};
 if(run.nj121.secretFound)rec.hiddenRoutes[index]=true;
}
window.NUSAJIWA_ADVENTURE121=Object.freeze({
version:'121.0',zones:ZONES,configure:config,init,mobilePlatforms,gravity,special,tick,
enemyCollision,finish,safeLanding
});
})();