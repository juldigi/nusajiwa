/* NJ122 · NUSAJIWA Hidden Sanctuaries (original game design)
 * Fifteen OPTIONAL playable bonus rooms, one per distinct Indonesian biome.
 * Teach → challenge → twist → relic; discover a hidden rune block then use SKILL.
 * No ROM, Mario music/sprites, maps, game code or Nintendo names copied.
 * Saved to existing nusajiwa-adventure-v1 record after parent level victory.
 */
(function(){
'use strict';
if(window.NUSAJIWA_ADVENTURE122)return;
const CHAMBERS=[
 ['Ceruk Akar Kilat','Pohon dipterokarpa tua','Akar melenting dan lompatan ganda','roots',0x4c9874],
 ['Palung Si Kancil','Rawa pinggir danau','Arus bawah dan permukaan terapung','swamp',0x519e9c],
 ['Menara Kabut Senyap','Puncak bukit berkabut','Tebing terbuka dan kabut pekat','mist',0x7caaa8],
 ['Ruang Kristal Kapur','Gua batu Bukit Barisan','Gemerincing batu dan rute sempit','crystal',0x4e617b],
 ['Pelataran Pusaka Rimba','Situs penjaga Sumatra','Tiga ukiran kuno dan pintu akhir','ruins',0xbb976c],
 ['Lorong Batu Bara','Kaki gunung berapi Jawa','Hembusan panas dan batu gelap','lava',0xbb5c43],
 ['Lumbung Benih','Persawahan Jawa','Balok padi tinggi dan jalan irigasi','rice',0xaac16a],
 ['Mata Air Batu','Aliran Kali Progo','Loncatan melintasi kolam dingin','spring',0x6aafbc],
 ['Ruang Prasasti','Kompleks candi','Tangga batu dan segel pilar','temple',0xb1a288],
 ['Perpustakaan Batu','Balairung Jawa','Tiga pahatan, pilihan lorong','archive',0xd19c68],
 ['Pulau Bintang Air','Danau Kalimantan','Pulau kecil berpijak terpisah','lake',0x6caeb0],
 ['Sarangan Akar Banir','Hutan hujan Kalimantan','Akar tinggi dan jalan berbelok','buttress',0x6c9861],
 ['Jembatan Kabut Meratus','Pegunungan Meratus','Angin silang dan tepi jurang','ridge',0x8ca6c4],
 ['Lembah Air Hitam','Sungai gambut Kalimantan','Langkah pendek di atas arus','peat',0x447c7c],
 ['Ruang Inti Hujan','Gerbang penjaga hujan','Tiga segel terakhir dan titian','rain',0x8fae87]
];
function createRoom(level,index){
 const row=CHAMBERS[index];if(!row||!level)return null;
 const tune=index%5,world=level.world||'sumatra';
 const ground=[[0,10],[12,22],[24,34]];
 const m=(i)=>[5,15,26][i];
 const hazards=[8.5+.1*(tune%3),18.7+.1*(tune%2),29+.14*(tune%4)];
 const ledges=[[9,1.6+.14*(tune%2),3.2],[21,1.8+.13*(tune%3),3.2],
  [14.5,2.3+.11*(tune%3),2.6]];
 const sigils=[m(0),m(1),m(2)].map(x=>[x,1.14]);
 const gusts=['ridge','mist','rain','lava'].includes(row[3])?[[13,18,(tune%2?2.0:-2.2)]]:[];
 return {
 name:row[0],tag:row[2],world,theme:row[3],length:32.8,sky:row[4],
 element:level.element,ground,ledges,hazards,checkpoints:[13,25],
 patrols:[[12.8,16.3,.55,1.15+.07*tune]],gusts,
 gem:30.5,sigils,secretRoom:true,biomeDetail:row[1]
 };
}
function init(run,index){
 if(!run||index<0||index>=CHAMBERS.length)return false;
 run.nj122={active:false,completed:false,visited:false,index,
  destination:null,origin:null,room:null};
 return true;
}
function enter(run,index,notice,emit,play){
 const st=run?.nj121,b=st?.blocks?.[0],state=run?.nj122;
 if(!state||state.active||state.completed||!b?.revealed||st.secretFound ||
  Math.abs(run.x-b.x)>2.2||run.ended)return false;
 const level=run.level,room=createRoom(level,index);
 if(!room)return false;
 state.origin={level,coins:run.coins,gem:run.gem,patrols:run.patrols,
  sigils:run.sigils,nj121:st,checkpoint:run.checkpoint,
  usedCp:run.usedCp,x:run.x,y:run.y,cameraX:run.cameraX};
 state.room=room;state.active=true;state.visited=true;
 run.level=room;
 run.coins=[5,10,14.8,18.1,24.6,27.4,30.5].map((x,i)=>({x,y:i%2?1.5:1,got:false}));
 run.gem={x:room.gem,y:2.0,got:true}; // no duplicating original elemental stone
 run.patrols=room.patrols.map(([start,end,y,speed])=>({start,end,y,speed,defeated:false}));
 run.sigils=room.sigils.map(([x,y])=>({x,y,got:false}));
 run.nj121=null;
 run.x=2;run.y=0;run.vx=0;run.vy=0;run.cameraX=4;
 run.grounded=true;run.coyote=.12;run.jumpBuffer=0;run.double=false;
 run.checkpoint=2;run.usedCp=[];run.skillCool=.4;run.hurtUntil=.3;
 notice('❖ '+room.name+' · ruang rahasia! Kumpulkan 3 segel lalu capai portal.');
 emit(2,.9,'magic',15);play('seal');
 return true;
}
function safeReturn(level,requested){
 const candidates=[];
 for(const [a,b] of level.ground)for(let x=Math.ceil(Math.max(a+1,requested));x<=b-1;x++){
  if(x>level.length-6)continue;
  if(level.hazards.some(h=>Math.abs(h-x)<1.5))continue;
  candidates.push(x);
 }
 return candidates[0]??Math.min(level.length-6,requested);
}
function exit(run,notice,emit,play){
 const st=run?.nj122,orig=st?.origin;
 if(!st?.active||!orig||run.sigils.some(s=>!s.got))return false;
 const old=orig.nj121,main=orig.level;
 const targets=orig.sigils.filter(s=>!s.got).map(s=>s.x);
 const proposed=Math.max(orig.x+2,old.zone.secretDestination||orig.x+2);
 const cap=targets.length?Math.min(...targets)-2:main.length-6;
 const returnX=safeReturn(main,Math.min(proposed,cap));
 run.level=main;run.coins=orig.coins;run.gem=orig.gem;run.patrols=orig.patrols;
 run.sigils=orig.sigils;run.nj121=old;run.usedCp=orig.usedCp;
 run.checkpoint=returnX;run.x=returnX;run.y=0;run.vx=0;run.vy=0;
 run.grounded=true;run.coyote=.12;run.cameraX=returnX+2;
 run.jumpBuffer=0;run.double=false;
 old.secretFound=true;old.secretNiche=true;old.shortcutUsed=true;
 st.active=false;st.completed=true;st.origin=null;
 run.score+=90;run.hurtUntil=.6;run.skillCool=.5;
 emit(returnX,1,'magic',15);play('win');
 notice('❖ Tiga segel berhasil! +90 Jiwa · rute rahasia tersimpan setelah gerbang utama.');
 return true;
}
function tick(run,notice,emit,play){
 const state=run?.nj122;
 if(!state?.active)return false;
 if(run.x>=run.level.length-1){
  if(run.sigils.some(s=>!s.got)){
   run.x=run.level.length-2.1;
   if(run.seconds-(state.lastGateNotice||-9)>2){
    state.lastGateNotice=run.seconds;
    notice('Gerbang ceruk masih terkunci. Cari semua 3 segel dahulu.');
   }
   return false;
  }
  return exit(run,notice,emit,play);
 }
 return false;
}
function finish(run,record,index){
 if(run?.nj122?.completed){
  if(!record.hiddenSanctuaries)record.hiddenSanctuaries={};
  record.hiddenSanctuaries[index]={name:CHAMBERS[index][0],completed:true};
 }
}
function draw2D(run,ctx,sx,sy,unit){
 if(!run?.nj122?.active)return;
 // Different original NUSAJIWA sanctuaries, mobile-safe art in 2D fallback.
 const row=CHAMBERS[run.nj122.index],world=run.nj122.index;
 ctx.save();
 ctx.fillStyle='#254c56';
 for(let x=1;x<=31;x+=3){
  ctx.fillRect(sx(x),sy(2.2),unit*.12,unit*.75);
  ctx.beginPath();ctx.arc(sx(x),sy(2.2+(x%3)*.15),unit*.28,0,Math.PI*2);ctx.fill();
 }
 ctx.fillStyle='#ffe9ad';
 for(const seal of run.sigils){
  if(seal.got)continue;
  ctx.beginPath();ctx.moveTo(sx(seal.x),sy(seal.y+.52));
  ctx.lineTo(sx(seal.x+.26),sy(seal.y+.20));
  ctx.lineTo(sx(seal.x),sy(seal.y-.05));
  ctx.lineTo(sx(seal.x-.26),sy(seal.y+.20));ctx.closePath();ctx.fill();
 }
 ctx.fillStyle='#ffd29b';
 ctx.fillRect(sx(32.1),sy(2.8),unit*.10,unit*2.8);
 ctx.font=Math.max(10,unit*.20)+'px sans-serif';
 ctx.fillText('❖ '+row[0],sx(Math.max(run.cameraX-3,1)),Math.max(20,sy(3.6)));
 ctx.restore();
}
function decorate3D(run,T,addMesh,addBox,material){
 if(!run?.nj122?.active)return;
 const row=CHAMBERS[run.nj122.index];
 const gold=material(0xfbe0a2),tone=material(row[4]),stone=material(0x506c71);
 for(let x=3;x<run.level.length;x+=5){
  addBox(stone,x,.45,-4,.42,2.8,.45);
  addMesh(new T.OctahedronGeometry(.48),tone,x,2.12,-4);
 }
 const rings=[];
 for(const seal of run.sigils){
  const ring=addMesh(new T.TorusGeometry(.38,.095,8,12),gold,seal.x,seal.y+.50,.5);
  ring.userData.nj122SealX=seal.x;rings.push(ring);
 }
 addMesh(new T.TorusGeometry(.80,.14,8,20),gold,32.0,1.45,.2);
 return rings;
}
function ui(run){return run?.nj122?.active?
 {name:CHAMBERS[run.nj122.index][0],sigils:run.sigils.filter(x=>x.got).length,required:3,active:true}:
 {active:false,discovered:!!run?.nj122?.completed};}
window.NUSAJIWA_ADVENTURE122=Object.freeze({version:'122.0',rooms:CHAMBERS,
 createRoom,init,enter,tick,exit,finish,draw2D,decorate3D,ui});
})();