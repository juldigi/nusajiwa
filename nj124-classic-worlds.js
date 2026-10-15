/* NJ124: 32 hand-directed Indonesian stage identities + mechanical polish.
 * Builds ON TOP of NJ123 independently; no Mario ROM, Nintendo map/sprites/audio.
 * The retro input and world progression remain stable. */
(function(){
'use strict';
if(window.NUSAJIWA_CLASSIC124)return;
const STAGES=[
 ['Akar Harimau','Hutan hujan Leuser','akar tinggi','roots'],
 ['Gua Rangkong','Hutan Kerinci','jalur gua bertingkat','cave'],
 ['Canopy Enggang','Taman Nasional Bukit Barisan','titian kanopi','canopy'],
 ['Gapura Rimba','Pintu hutan Sumatra','penjaga akar','boss'],
 ['Pasir Karang','Pesisir utara Jawa','pasir berlubang','coast'],
 ['Terowongan Kapur','Gua pesisir Gunung Kidul','lorong sempit','limestone'],
 ['Jembatan Mangrove','Muara pantai Jawa','titian bergerak','mangrove'],
 ['Benteng Samudra','Istana bawah laut Jawa','gerbang arus','boss'],
 ['Tebing Anoa','Pegunungan Latimojong','lereng berbatu','cliff'],
 ['Langit Tarsius','Kanopi Sulawesi','lompatan tinggi','cloud'],
 ['Puncak Kabut','Lembah Lore Lindu','angin berlawanan','wind'],
 ['Gerbang Angin','Puncak Sulawesi','penjaga langit','boss'],
 ['Arus Mahakam','Kalimantan Timur','arus gambut','swamp'],
 ['Gua Bekantan','Kalimantan Selatan','lorong akar','roots'],
 ['Jembatan Ulin','Kalimantan Barat','jembatan kayu','bridge'],
 ['Benteng Hujan','Hulu Kapuas','penjaga sungai','boss'],
 ['Padang Komodo','Pulau Rinca','savana panas','savanna'],
 ['Lorong Batu Api','Flores','lava bercelah','lava'],
 ['Titian Lontar','Sumbawa','gurun berangin','sands'],
 ['Puncak Watu','Gunung Rinjani','penjaga bara','boss'],
 ['Gerbang Pura','Bali','batu dan ornamen','temple'],
 ['Lorong Ukiran','Bangli','koridor patung','stone'],
 ['Lereng Candi','Bedugul','platform berundak','stairs'],
 ['Balairung Topeng','Pintu ritual Bali','penjaga segel','boss'],
 ['Pantai Kenari','Halmahera','karang dangkal','coast'],
 ['Karang Bercahaya','Banda Neira','arus terumbu','reef'],
 ['Gua Kelalawar Seram','Pulau Seram','gua senja','cave'],
 ['Benteng Lautan','Perairan Maluku','penjaga karang','boss'],
 ['Lembah Kasuari','Papua selatan','hutan tinggi','forest'],
 ['Akar Cenderawasih','Papua barat','titian pepohonan','canopy'],
 ['Kabut Jayawijaya','Pegunungan Tengah Papua','tebing angin','wind'],
 ['Istana Awan','Puncak Papua','penjaga langit','boss']
];
const isFiniteNumber=n=>Number.isFinite(n);
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
function safeGround(level,x){return level.gaps.every(([a,b])=>x<a-.65||x>b+.65);}
function safeX(level,x){
 for(let d=0;d<6;d+=.5){for(const z of [x+d,x-d]){
  if(z>3.5&&z<level.length-6&&safeGround(level,z)&&level.pipes.every(p=>Math.abs(p.x-z)>1.1))return +z.toFixed(2);
 }}return null;
}
function decorateLevel(level){
 if(!level||!Number.isInteger(level.index)||!STAGES[level.index])return level;
 const n=level.index,r=STAGES[n],place=r[1],element=r[3],challenge=r[2];
 level.name=r[0];level.place=place;
 const checkpoint=safeX(level,level.length*.49);
 const token=safeX(level,level.length*.72);
 const platform=safeX(level,level.length*.34);
 level.nj124={
  location:r[0],locale:place,challenge,element,checkpoint,token,
  tokenCollected:false,
  gusts:['cliff','wind','cloud','canopy'].includes(element)?
   [[safeX(level,level.length*.26)??26,safeX(level,level.length*.26)??26,Math.sin(n*.83)*1.18]]:[],
  movingStep:platform,
  wheel:['cave','limestone','stone','temple'].includes(element),
  sea:['coast','mangrove','reef','swamp'].includes(element),
  ember:['savanna','lava','sands'].includes(element),
  boss:element==='boss',
  secretName:n%4===1?'Relik ceruk tersembunyi':n%4===2?'Titian langit':'Jalur tanah purba',
  authored:'NJ124 Indonesian progression'
 };
 // One OPTIONAL raised cross-over platform per eligible stage; retains primary
 // collision grid while adding a different traversal challenge.
 if(platform!==null&&level.section!==3)level.platforms.push({
  x:platform,y:1.15+(n%3)*.30,w:2.15+(n%2)*.45,
  kind:n%2?'sway':'suspended'
 });
 return level;
}
function start(run,level){
 if(!run||!level?.nj124)return false;
 run.nj124={checkpoint:null,collected:false,checkpointBanner:false,
  current:level.nj124.location,stageId:level.index,terrain:level.nj124.element,
  startedAt:run.elapsed,hiddenReward:false};
 return true;
}
function motion(run,level,keys,dt){
 if(!run?.nj124||!level?.nj124)return false;
 const cfg=level.nj124,x=run.x;
 if(cfg.gusts.length){
  const [at]=cfg.gusts;
  const gx=at[0];
  if(Math.abs(x-gx)<4.3&&!run.grounded){run.vx+=Math.sin(run.elapsed*1.15+level.index)*2.4*dt}
 }
 if(cfg.sea&&run.grounded&&x>level.length*.30&&x<level.length*.65){
  // Waterlogged stone/coastal mud: mild drag, no input lock.
  run.vx*=1-Math.min(.065,dt*2);
 }
 if(cfg.ember&&run.grounded&&x>level.length*.42&&x<level.length*.62){
  run.vx+=Math.sign(run.vx||1)*.30*dt;
 }
 if(cfg.wheel&&x>level.length*.31&&x<level.length*.43){
  const wave=Math.sin(run.elapsed*3);
  if(Math.abs(wave)>.80&&run.grounded)run.vx*=.985;
 }
 return true;
}
function update(run,level,dt,hint,coin){
 if(!run?.nj124||!level?.nj124||run.stop)return false;
 const cfg=level.nj124,st=run.nj124;
 if(cfg.checkpoint!==null&&!st.checkpointBanner&&run.x>=cfg.checkpoint){
  st.checkpointBanner=true;st.checkpoint=cfg.checkpoint;
  hint('⚑ Titik kembali · '+cfg.location);
 }
 if(cfg.token!==null&&!st.collected&&Math.hypot(run.x-cfg.token,run.y+.65-1.30)<.7){
  st.collected=true;st.hiddenReward=true;
  coin(3);run.score+=230;run.secretFlag=true;
  hint('❖ Relik '+cfg.location+' ditemukan!');
 }
 return true;
}
function respawn(run,level){
 if(!run?.nj124||!level?.nj124)return null;
 const x=run.nj124.checkpoint;
 if(x===null||x===undefined)return null;
 if(!isFiniteNumber(x)||!safeGround(level,x))return null;
 return x;
}
function finish(run,record,index){
 const st=run?.nj124;if(!st||!record)return;
 if(!record.regionalChallenges)record.regionalChallenges={};
 const old=record.regionalChallenges[index]||{};
 record.regionalChallenges[index]={
  checkpoint:!!st.checkpointBanner||!!old.checkpoint,
  relik:!!st.collected||!!old.relik,
  location:st.current,
  terrain:st.terrain
 };
}
function drawBackdrop(ctx,l,s,X,Y,p,w,h){
 const cfg=l?.nj124;if(!cfg)return;
 const x0=Math.max(0,Math.floor((s?.cameraX||0)/7)*7-14);
 ctx.save();
 const t=s?.elapsed||0;
 for(let x=x0;x<(s?.cameraX||0)+w/p+16;x+=7){
  const px=X(x);
  if(cfg.ember){
   ctx.fillStyle='#b16e5277';ctx.beginPath();
   ctx.moveTo(px-40,Y(-.5));ctx.lineTo(px+12,Y(4.1));ctx.lineTo(px+63,Y(-.5));ctx.fill();
  }else if(cfg.sea){
   ctx.strokeStyle='#d0efe188';ctx.lineWidth=Math.max(1,p*.04);
   const yy=Y(.15+Math.sin(t+x*.3)*.11);ctx.beginPath();
   ctx.moveTo(px-25,yy);ctx.quadraticCurveTo(px,yy-5,px+28,yy);ctx.stroke();
  }else if(cfg.wheel){
   ctx.fillStyle='#b7b3988c';ctx.fillRect(px-12,Y(2.7),23,2.7*p);
   ctx.fillStyle='#6f787b88';ctx.fillRect(px-17,Y(2.8),34,7);
  }else{
   ctx.fillStyle='#275d4b77';ctx.fillRect(px-4,Y(3.0),10,3*p);
   ctx.beginPath();ctx.arc(px,Y(3.1),p*.75,0,Math.PI*2);ctx.fill();
  }
 }
 ctx.restore();
}
function drawForeground(ctx,l,s,X,Y,p){
 const cfg=l?.nj124;if(!cfg||!s)return;
 ctx.save();
 if(cfg.checkpoint!==null){
  const x=X(cfg.checkpoint);
  ctx.strokeStyle=s.nj124?.checkpointBanner?'#f9df9f':'#d9dac6';
  ctx.lineWidth=Math.max(1,p*.07);
  ctx.beginPath();ctx.moveTo(x,Y(0));ctx.lineTo(x,Y(1.72));ctx.stroke();
  ctx.fillStyle='#f6d692';
  ctx.fillRect(x,Y(1.68),p*.38,p*.21);
 }
 if(cfg.token!==null&&!s.nj124?.collected){
  const x=X(cfg.token),y=Y(1.30);
  ctx.fillStyle='#ffe2a3';ctx.beginPath();
  ctx.moveTo(x,y-p*.23);ctx.lineTo(x+p*.18,y);
  ctx.lineTo(x,y+p*.23);ctx.lineTo(x-p*.18,y);ctx.closePath();ctx.fill();
 }
 ctx.restore();
}
window.NUSAJIWA_CLASSIC124=Object.freeze({
 version:'NJ124.0',stages:Object.freeze(STAGES),decorateLevel,start,motion,update,
 respawn,finish,drawBackdrop,drawForeground
});
})();