/* NUSAJIWA NJ123 — Klasik 32: ORIGINAL retro platformer with NES-inspired
 * control principles. Designed for the user's own folklore creatures.
 * NOT a NES ROM emulator; no third-party ROM bytes, maps, artwork or audio.
 * Original 8 geographically distinctive worlds × 4 stages, secrets and pipes.
 * Independent progress namespace; older fifteen-stage adventure left intact. */
(function(){
'use strict';
if(window.NUSAJIWA_CLASSIC)return;
const KEY='nusajiwa-classic-32-v1',TICK=1/60,MAX=32,clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const WORLD=[
 {name:'Rimba Sumatra',env:'Hutan Hujan',sky:'#8ccfc2',far:'#3f9283',land:'#4b7356',accent:'#e8c66f',boss:'Penjaga Akar'},
 {name:'Laut Jawa',env:'Pesisir & Gua',sky:'#80bcd2',far:'#497da6',land:'#426780',accent:'#ffca8f',boss:'Penjaga Arus'},
 {name:'Pegunungan Sulawesi',env:'Tebing dan Kabut',sky:'#a9c5df',far:'#557f9c',land:'#516d76',accent:'#ebc883',boss:'Penjaga Angin'},
 {name:'Pedalaman Kalimantan',env:'Sungai & Bawah Tanah',sky:'#76bfa7',far:'#386f58',land:'#51634d',accent:'#eed181',boss:'Penjaga Rawa'},
 {name:'Kepulauan Nusa Tenggara',env:'Savana dan Batu Api',sky:'#efcba8',far:'#c37859',land:'#8a6350',accent:'#ffcb65',boss:'Penjaga Bara'},
 {name:'Pulau Bali',env:'Pura & Lereng',sky:'#c1d7c4',far:'#778f9e',land:'#718170',accent:'#e5bb72',boss:'Penjaga Segel'},
 {name:'Kepulauan Maluku',env:'Karang dan Laut',sky:'#80b9ce',far:'#34799c',land:'#486a85',accent:'#ffe29c',boss:'Penjaga Karang'},
 {name:'Tanah Papua',env:'Lembah Tinggi & Istana Awan',sky:'#a8c4dc',far:'#576f9c',land:'#6a768a',accent:'#f9d381',boss:'Penjaga Langit'}
];
const TYPES=[
 ['ground','underground','athletic','castle'],
 ['ground','water','bridge','castle'],
 ['ground','night','athletic','castle'],
 ['ground','underground','athletic','castle'],
 ['ground','ground','athletic','castle'],
 ['ground','night','athletic','castle'],
 ['ground','water','bridge','castle'],
 ['ground','ground','ground','castle']
];
const THEMES={
 ground:'Padang Rintangan',underground:'Lorong Tersembunyi',
 athletic:'Langkah di Ketinggian',water:'Arus Bawah Air',bridge:'Jembatan Angin',
 night:'Malam Berkabut',castle:'Gerbang Penjaga'
};
const SKILLS={spirit:'Melayang',bird:'Kepakan',tiger:'Lari cepat',forest:'Langkah alam'};
const rnd=(seed)=>()=>{seed=(Math.imul(seed,1664525)+1013904223)|0;return (seed>>>0)/4294967296};
function plan(index){
 const world=Math.floor(index/4),section=index%4,type=TYPES[world][section],v=WORLD[world],rand=rnd(813+index*101);
 const length=94+world*7+section*5,gaps=[],pipes=[],blocks=[],coins=[],enemies=[],platforms=[],secret=[];
 const hazards=type==='water'?2+world:3+Math.floor(world/2);
 const start=11+(index%3)*2,step=(length-26)/hazards;
 if(type!=='water'&&type!=='castle'){
  for(let i=0;i<hazards;i++){
   const x=Math.floor(start+i*step+rand()*2);
   const width=type==='athletic'||type==='bridge'?2.4+(i%2)*.3:1.4+((i+world)%3)*.32;
   gaps.push([x,x+width]);
  }
 }
 for(let i=0;i<Math.floor(length/12);i++){
  const x=8+i*11+(i%2)*2;
  const elevated=(type==='athletic'||type==='bridge')?1.6+(i%3)*.4:2.3+(i%3)*.18;
  if(type==='athletic'||type==='bridge'||type==='underground'||type==='castle'){
   platforms.push({x,y:elevated,w:2.8+(i%2)*.9,kind:type==='athletic'?'suspended':type==='bridge'?'sway':'ledge'});
  }
  if(i%2===0&&type!=='water')pipes.push({x:x+5,h:1.15+(i%3)*.40,secret:false});
  const bonus=(i===2||i===5),hidden=(i===3&&section!==3);
  blocks.push({x:x+1.7,y:2.15+(i%3)*.33,kind:hidden?'hidden':bonus?'power':'rune',used:false,
   reveal:!hidden,content:hidden?'life':bonus?'power':'coin'});
  if(type==='castle'&&i%3===0)blocks.push({x:x+3.1,y:3,kind:'stone',used:false,reveal:true,content:''});
 }
 for(let x=6;x<length-7;x+=4.1){
  if(!gaps.some(g=>x>g[0]-.35&&x<g[1]+.35))coins.push({x,y:1.0+(Math.floor(x)%3===0?.9:0),got:false});
 }
 for(let i=0;i<8+world*2+section;i++){
  const x=15+i*(length-32)/(8+world*2+section)+rand()*2;
  if(gaps.some(g=>x>g[0]-.6&&x<g[1]+.6))continue;
  const enemyType=type==='water'?(i%3?'fish':'jelly'):type==='castle'?(i%5===0?'guard':'walker'):(i%4===0?'shelled':'walker');
  enemies.push({x,base:x,y:type==='water'?1.2+(i%3):.38,vx:(i%2?-.50:.48)+(world*.03),alive:true,
   shell:false,type:enemyType,start:x-1.3,end:x+1.1,phase:i*.7});
 }
 if(type==='water')for(let i=0;i<Math.floor(length/16);i++){
  const x=11+i*15;platforms.push({x,y:2+(i%3),w:2.2,kind:'reef'});
 }
 const alternate=(world===0&&section===1)?[4,8,12]:(world===3&&section===1)?[20,24,28]:null;
 if(alternate){
  pipes.push({x:length-13,h:2.7,secret:true,warp:alternate,requiredY:2.25});
  secret.push({x:length-17,y:3.15,type:'vine',got:false});
 }
 if(section===0)secret.push({x:26+world*.45,y:2.9,type:'life',got:false});
 if(section===1||type==='underground')secret.push({x:41+world*.4,y:3.20,type:'cave',got:false});
 const gauntlet=type==='castle';
 if(gauntlet){
  gaps.length=0;
  for(let j=0;j<4;j++){
   const x=23+j*((length-39)/4);
   gaps.push([x,x+1.75]);
  }
 }
 const stage={index,world,section,region:v.name,name:THEMES[type],type,place:v.env,
  length,clock:world>=6?330:400,gaps,pipes,blocks,coins,enemies,platforms,secret,
  boss:gauntlet?{x:length-10,hp:2+Math.floor(world/2),name:v.boss,phase:0}:null,
  reward:['tanah','air','angin','bayangan','api','cahaya','air','cahaya'][world],
  colors:v,signature:type+'-'+index};
 const base=window.NUSAJIWA_CLASSIC124?.decorateLevel?.(stage)||stage;
 return window.NUSAJIWA_STAGE130?.decorate?.(base)||base;
}
const LEVELS=Array.from({length:MAX},(_,i)=>plan(i));
function load(){try{const a=JSON.parse(localStorage.getItem(KEY)||'null');if(a?.version===1&&a.pets)return a;}catch(_){}return {version:1,pets:{}}}
let store=null;
const stateFor=id=>{store=store||load();return store.pets[id]||(store.pets[id]={clears:{},hidden:{},totalCoins:0,highest:0,best:{}})};
function save(){try{localStorage.setItem(KEY,JSON.stringify(store))}catch(_){}}
let root=null,canvas=null,ctx=null,menu=null,pet=null,status=null,level=null,active=false,playing=false,returnTarget='adventure',
 last=0,buffer=0,raf=0,message='',messageUntil=0,pixelScale=32,viewWidth=24;
let key={left:false,right:false,jump:false,run:false,down:false,pressed:false},touch={};
const persona=p=>/kuyang|palasik|banaspati|pocong|kuntilanak|wewe|leak/.test(p.id)?'spirit':
 /rangkong|bird|elang|kakatua|garuda/.test(p.id)?'bird':
 /tiger|harimau|kucing|macan/.test(p.id)?'tiger':'forest';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const intersects=(x,g)=>x>g[0]-.29&&x<g[1]+.29;
const isGround=(l,x)=>!l.gaps.some(g=>intersects(x,g));
function makeUI(){
 if(root)return;
 root=document.createElement('section');root.id='njclassic';root.hidden=true;
 root.setAttribute('aria-label','Petualangan NUSAJIWA Klasik 32 Stage');
 root.innerHTML='<div class="njc-screen"><canvas id="njcCanvas" aria-label="Platformer dua dimensi retro NUSAJIWA"></canvas>'+
 '<div class="njc-top"><div><strong>NUSAJIWA</strong><small id="njcWorld">KLASIK • 32 STAGE</small></div>'+
 '<div class="njc-metrics"><b id="njcStage">1—1</b><b id="njcCoin">✧ 00</b><b id="njcLife">♥ 3</b><b id="njcTime">400</b></div>'+
 '<button data-c="pause" aria-label="Jeda permainan">Ⅱ</button></div>'+
 '<div id="njcNotice" role="status" aria-live="polite"></div>'+
 '<div class="njc-controls"><div><button data-h="left" aria-label="Ke kiri">◀</button>'+
 '<button data-h="right" aria-label="Ke kanan">▶</button></div>'+
 '<div><button data-h="down" aria-label="Masuk portal">↓<small>PORTAL</small></button>'+
 '<button data-h="run" aria-label="Berlari atau kemampuan" class="njc-b">B<small>LARI/SKILL</small></button>'+
 '<button data-h="jump" aria-label="Lompat atau berenang" class="njc-a">A<small>LOMPAT</small></button></div></div>'+
 '<div class="njc-overlay"><div id="njcMenu" class="njc-menu"></div></div></div>';
 document.body.appendChild(root);canvas=root.querySelector('#njcCanvas');
 ctx=canvas.getContext('2d',{alpha:false});menu=root.querySelector('#njcMenu');
 root.addEventListener('click',event=>{
  const b=event.target.closest('button[data-c]');if(!b)return;
  const a=b.dataset.c,value=Number(b.dataset.i);
  if(a==='close'){close();return}if(a==='rom'){window.NUSAJIWA_ROM_REF?.open?.();return}if(a==='levels'){showLevels();return}
  if(a==='level'){start(value);return}if(a==='next'){start((status?.index??0)+1);return}
  if(a==='retry'){start(status?.index??0);return}if(a==='resume'){clearKeys();playing=true;hideMenu();last=0;buffer=0;return}
  if(a==='pause'){pause();return}if(a==='warp'){jumpTo(value);return}
  if(a==='secret'){enterSecret();return}
 });
 for(const btn of root.querySelectorAll('[data-h]')){
  const n=btn.dataset.h;
  btn.addEventListener('pointerdown',ev=>{ev.preventDefault();btn.setPointerCapture?.(ev.pointerId);setKey(n,true)});
  for(const t of ['pointercancel','pointerup','lostpointercapture'])btn.addEventListener(t,ev=>{
   ev.preventDefault();setKey(n,false);
  });
 }
}
function setKey(which,on){
 const k=which==='down'?'down':which==='run'?'run':which;
 if(k==='jump'&&on&&!key.jump)key.pressed=true;
 key[k]=on;
}
function show(title,description,buttons){
 playing=false;clearKeys();root.querySelector('.njc-overlay').hidden=false;
 menu.innerHTML='<p class="njc-eyebrow">✧ NUSAJIWA • PETUALANGAN KLASIK</p><h2>'+esc(title)+'</h2>'+
 '<div class="njc-copy">'+description+'</div><div class="njc-actions">'+buttons.map(x=>
 '<button data-c="'+x[0]+'"'+(x[2]!==undefined?' data-i="'+x[2]+'"':'')+'>'+esc(x[1])+'</button>').join('')+'</div>';
}
function hideMenu(){root.querySelector('.njc-overlay').hidden=true;}
function clearKeys(){key={left:false,right:false,jump:false,run:false,down:false,pressed:false};}
function showLevels(){
 if(!active)return;const record=stateFor(pet.id);
 let grid='<div class="njc-grid">';
 for(let w=0;w<8;w++){
  const win=LEVELS[w*4],complete=record.clears;
  grid+='<div class="njc-world"><h3>'+String(w+1)+' · '+esc(win.region)+'</h3>';
  for(let i=0;i<4;i++){
   const ix=w*4+i,unlocked=ix===0||!!complete[ix-1]||ix<=record.highest,
   done=!!complete[ix];
   grid+='<button data-c="level" data-i="'+ix+'" '+(unlocked?'':'disabled')+'>'+
    (w+1)+'—'+(i+1)+' <small>'+esc(LEVELS[ix].name)+'</small> '+(done?'✓':unlocked?'▶':'🔒')+'</button>';
  }
  grid+='</div>';
 }
 grid+='</div>';
 show('Jelajah Klasik · 32 Stage',
 '<p>Delapan wilayah, 32 lokasi dan tantangan berbeda. Pilih level yang terbuka. Kendali mengikuti DNA platformer NES: <b>A</b> lompat (tahan untuk lebih tinggi), <b>B</b> berlari, <b>↓</b> portal. Ada musuh, blok rahasia, batu elemen, jalur bonus, serta pintasan antar dunia.</p>'+
 '<p class="njc-note">Peta dan visual dirancang asli untuk NUSAJIWA. Mode 15 level sebelumnya tetap tersedia.</p>'+grid,
 [['rom','📼 Buka ROM asli (file pribadi)'],['close',returnTarget==='habitat'?'Kembali ke Habitat 3D':'Kembali ke Petualangan 15 Level']]);
}
function open(p,source='adventure'){
 const candidate=p||(()=>{try{const a=window.NUSAJIWA_TAMAGOTCHI?.getSave();return a?.pets?.[a.active];}catch(_){return null}})();
 if(!candidate||candidate.stage===0||candidate.sick||candidate.sleep||candidate.retired)return false;
 returnTarget=source==='habitat'?'habitat':'adventure';
 makeUI();pet={...candidate,type:persona(candidate)};
 store=load();stateFor(pet.id);
 active=true;root.hidden=false;document.body.classList.add('njc-playing');
 resize();showLevels();window.NUSAJIWA_CLASSIC3D?.init?.(root);
 last=0;buffer=0;cancelAnimationFrame(raf);raf=requestAnimationFrame(loop);
 return true;
}
function close(){active=false;playing=false;window.NUSAJIWA_CLASSIC3D?.close?.();
 cancelAnimationFrame(raf);raf=0;last=0;buffer=0;
 clearKeys();status=null;pet=null;
 if(root)root.hidden=true;document.body.classList.remove('njc-playing');
 if(returnTarget==='habitat'){
  const sanctuary=document.getElementById('nj35');
  if(sanctuary)sanctuary.hidden=false;
  window.NJ35?.returnTo3D?.();
 }else window.NUSAJIWA_ADVENTURE?.open?.();
}
function hint(text,seconds=1.7){message=text;messageUntil=(status?.elapsed||0)+seconds;
 if(root)root.querySelector('#njcNotice').textContent=text;}
function start(n){
 if(!Number.isInteger(n)||n<0||n>=MAX||!pet)return false;
 const record=stateFor(pet.id);
 if(n>0&&!record.clears[n-1]&&n>record.highest)return false;
 level=plan(n);
 window.NUSAJIWA_CLASSIC3D?.init?.(root);
 status={index:n, x:2.1,y:0,vx:0,vy:0,grounded:true,elapsed:0,remaining:level.clock,
  cameraX:0,facing:1,score:0,coins:0,lives:3,power:0,shield:0,invincible:0,spin:0,
  lastFeet:0,pendingJump:false,jumpBuffer:0,coyote:.10,support:null,bonus:false,bonusTimer:0,bonusReturn:0,hiddenCount:0,
  fire:[],released:false,secretFlag:false,boss:level.boss,world:level.world,
  completed:false,stop:false,gravityScale:1,worldTime:0};
 window.NUSAJIWA_CLASSIC124?.start?.(status,level);
 window.NUSAJIWA_NES127?.start?.(status,level);
 window.NUSAJIWA_STAGE130?.start?.(status,level);
 key.pressed=false;playing=true;hideMenu();hint((level.world+1)+'—'+(level.section+1)+' · '+level.region+' / '+level.name,2.4);
 updateHud();last=0;buffer=0;return true;
}
function pause(){if(!active||!playing)return;
 show('Permainan dijeda','<p>A lompat • B berlari • tahan A untuk lompatan tinggi • ↓ masuk portal atau ruang bonus.</p>',
  [['resume','▶ Lanjutkan'],['retry','↻ Ulang Stage'],['levels','Pilih Stage'],['close','Keluar Mode Klasik']]);
}
function die(reason){
 if(!status||status.stop)return;
 // A lost life clears transient collectibles and invulnerability, not campaign progress.
 window.NUSAJIWA_NES127?.resetLife?.(status);
 status.lives--;status.vx=0;status.vy=0;status.invincible=0;
 if(status.lives<=0){
  status.stop=true;show('Permainan berakhir','<p>'+esc(reason)+'. Kembali ke peta atau coba stage yang sama.</p>',
   [['retry','↻ Coba Lagi'],['levels','Pilih Stage'],['close','Kembali']]);
  return;
 }
 const checkpoint=window.NUSAJIWA_CLASSIC124?.respawn?.(status,level);
 status.x=checkpoint??2.1;status.y=0;status.cameraX=checkpoint?Math.max(0,checkpoint-6):0;status.power=0;status.shield=0;status.invincible=1.2;
 status.jumpBuffer=0;status.coyote=.10;status.grounded=true;status.support=null;
 window.NUSAJIWA_STAGE130?.resetLife?.(status,level);
 status.remaining=level.clock;status.bonus=false;status.bonusTimer=0;
 hint(reason+' · ♥ '+status.lives,1.9);
}
function damage(){
 if(window.NUSAJIWA_NES127?.isProtected?.(status))return;
 if(status.invincible>0||status.stop)return;
 if(status.power>0){status.power=0;status.invincible=1.5;hint('Perisai Jiwa terpakai!',1.1);}
 else die('Terkena rintangan');
}
function addCoin(amount=1){
 status.coins+=amount;status.score+=amount*100;
 if(status.coins>=100){status.coins-=100;status.lives++;hint('100 Jiwa · nyawa tambahan!',2);}
}
function finish(){
 if(!status||status.stop)return;
 status.stop=true;const index=status.index,r=stateFor(pet.id),first=!r.clears[index];
 r.clears[index]=true;r.highest=Math.max(r.highest,index+1);
 r.best[index]=Math.max(r.best[index]||0,status.score);
 r.totalCoins=(r.totalCoins||0)+status.coins;
 if(status.secretFlag)r.hidden[index]=true;
 window.NUSAJIWA_CLASSIC124?.finish?.(status,r,index);
 save();
 // Existing Tamagotchi rewards deliberately accept levels 0..14 ONLY.
 // Do not fabricate XP/element reward by mapping unrelated levels onto that key.
 show('Segel wilayah berhasil!','<p>Stage '+(level.world+1)+'—'+(level.section+1)+' selesai. Skor '+
  status.score+' · Jiwa '+status.coins+' · '+(status.secretFlag?'❖ Rahasia ditemukan':'Jalur biasa')+'. '+
  (first?'Stage berikutnya dibuka.':'Rekor disimpan.')+
  '</p><p class="njc-note">Progres kampanye klasik tersimpan sendiri; progres dan hadiah petualangan 15 level tetap aman.</p>',
  [[index<31?'next':'levels',index<31?'▶ Lanjut Stage':'✓ Kembali ke Peta'],
   ['retry','↻ Main Lagi'],['levels','Peta 32 Stage'],['close','Habitat / Petualangan']]);
}
function jumpTo(index){
 const r=stateFor(pet.id);r.highest=Math.max(r.highest,index);save();
 hint('Jalur portal ditemukan!',2);start(index);
}
function enterSecret(){
 if(!status)return;
 status.secretFlag=true;status.bonus=true;status.bonusTimer=14;status.bonusReturn=Math.max(3,status.x);
 status.vx=0;status.vy=0;status.y=2.3;
 hint('❖ Ruang Jiwa Tersembunyi: kumpulkan hadiah!',2);
}
function pickPipe(){
 if(!status||status.stop)return;
 if(status.bonus){status.bonus=false;status.x=status.bonusReturn+5;status.y=0;return;}
 const portal=level.pipes.find(p=>Math.abs(status.x-p.x)<.95);
 if(!portal)return;
 if(portal.warp){
  show('Gerbang Jalur Pintas',
   '<p>Anda menemukan portal lintas dunia. Pilih lokasi tujuan atau kembali ke rute utama.</p>',
   portal.warp.map(i=>['warp','Dunia '+(Math.floor(i/4)+1)+' → Stage 1',i])
   .concat([['resume','Tetap di jalur utama']]));
 }else{status.x=Math.min(level.length-12,status.x+13);addCoin(6);
  status.secretFlag=true;hint('Ruang rahasia ✧ +6 Jiwa!',1.6);}
}
function enemiesAt(x){return level.enemies.filter(e=>e.alive&&Math.abs(e.x-x)<1)}
function update(dt){
 const s=status,l=level;
 if(!s||s.stop)return;
 s.elapsed+=dt;s.worldTime+=dt;s.remaining-=dt;s.invincible=Math.max(0,s.invincible-dt);
 if(s.remaining<=0){die('Waktu habis');return;}
 window.NUSAJIWA_NES127?.before?.(s,l,key,dt);
 window.NUSAJIWA_STAGE130?.carry?.(s,l,dt);
 if(key.down){key.down=false;pickPipe();if(!playing)return;}
 // NJ129: short jump input buffering and coyote time make touch controls fair.
 if(key.pressed){key.pressed=false;s.jumpBuffer=.12;}
 else s.jumpBuffer=Math.max(0,(s.jumpBuffer||0)-dt);
 s.coyote=s.grounded?.10:Math.max(0,(s.coyote||0)-dt);
 if(s.jumpBuffer>0){
  if(s.bonus&&s.grounded){s.vy=8.6;s.grounded=false;s.jumpBuffer=0;s.coyote=0;}
  else if(l.type==='water'){s.vy=Math.max(s.vy,4.8);s.grounded=false;s.jumpBuffer=0;}
  else if(s.grounded||s.coyote>0){
   s.vy=key.run?9.9:8.8;s.grounded=false;s.jumpBuffer=0;s.coyote=0;
  }
 }
 const dir=(key.right?1:0)-(key.left?1:0),water=l.type==='water';
 const max=water?3.8:(key.run?8.2:5.4),accel=s.grounded?27:17;
 if(!window.NUSAJIWA_STAGE130?.move?.(s,l,key,dt)){
  if(dir){s.vx+=dir*accel*dt;s.vx=clamp(s.vx,-max,max);s.facing=dir;}
  else{s.vx*=(s.grounded?.76:.93);if(Math.abs(s.vx)<.08)s.vx=0}
 }
 window.NUSAJIWA_CLASSIC124?.motion?.(s,l,key,dt);
 const oldX=s.x,oldY=s.y,oldTop=s.y+(s.power?1.55:1.16);
 s.x=clamp(s.x+s.vx*dt,.34,l.length+.1);
 // Strong velocity-dependent jump and early button release dampening.
 const gravity=water?10.8:25.5;
 if(!key.jump&&s.vy>0&&!water)s.vy-=31*dt;
 s.vy-=gravity*dt;s.vy=Math.max(s.vy,water?-5:-15);
 s.y+=s.vy*dt;
 if(s.bonus){s.bonusTimer-=dt;if(s.bonusTimer<=0){s.bonus=false;s.x=s.bonusReturn+5;s.y=0}}
 const foot=s.y,wasGrounded=s.grounded;s.grounded=false;s.support=null;
 if(s.vy<=0){
  if(isGround(l,s.x)&&oldY>=-.09&&foot<=0){s.y=0;s.vy=0;s.grounded=true;}
  for(let i=0;i<l.platforms.length;i++){
   const p=l.platforms[i],at=window.NUSAJIWA_STAGE130?.platformPosition?.(p,s.elapsed)||
    {x:p.x+(p.kind==='suspended'?Math.sin(s.elapsed*1.3+p.x):0),
     y:p.y+(p.kind==='sway'?Math.sin(s.elapsed*1.2+p.x)*.45:0)};
   if(Math.abs(s.x-at.x)<p.w/2+.26&&oldY>=at.y-.08&&foot<=at.y){
    s.y=at.y;s.vy=0;s.grounded=true;s.support=i;
   }
  }
  for(const tube of l.pipes){
   const x=tube.x;
   if(Math.abs(s.x-x)<.79&&oldY>=tube.h-.06&&foot<=tube.h){
    s.y=tube.h;s.vy=0;s.grounded=true;
   }
  }
 }
 // NJ129: rune/stone/power blocks also have solid tops and sides.
 window.NUSAJIWA_NES127?.resolveBlocks?.(s,l,oldX,oldY);
 window.NUSAJIWA_STAGE130?.bounce?.(s,l,hint);
 // Solid wall collision with portal pillars until player jumps onto them.
 for(const tube of l.pipes){
  const dx=s.x-tube.x;
  if(Math.abs(dx)<.70&&Math.min(oldY,s.y)<tube.h-.10&&Math.max(oldY,s.y)<tube.h+.20){
   if(oldX<tube.x){s.x=tube.x-.70;}else if(oldX>tube.x){s.x=tube.x+.70;}
   else s.x=oldX;
   s.vx=0;
  }
 }
 if(s.vy>0){
  const top=s.y+(s.power?1.55:1.16);
  for(const b of l.blocks){
   if(b.destroyed)continue;
   if(Math.abs(s.x-b.x)<.59&&oldTop<=b.y-.35&&top>=b.y-.4){
    s.y=b.y-.4-(s.power?1.55:1.16);s.vy=0;
    if(b.kind==='stone'&&s.power>0){b.used=true;b.destroyed=true;s.score+=40;hint('Batu pecah!');}
    else if(!b.used){
     if(b.kind==='hidden')b.reveal=true;
     b.used=true;
     if(b.content==='coin'){addCoin(1);hint('✧ Jiwa +1');}
     else if(b.content==='life'){s.lives++;hint('Rahasia: nyawa tambahan!');s.secretFlag=true;}
     else if(b.content==='power'){
      if(!window.NUSAJIWA_NES127?.hitBlock?.(s,l,b,hint)){
       s.power=Math.min(2,s.power+1);hint('Perisai Jiwa naik!');
      }
     }
    }
    break;
   }
  }
 }
 if(s.y< -3.4){die('Terjatuh');return}
 for(const c of l.coins){if(!c.got&&Math.hypot(s.x-c.x,s.y+.72-c.y)<.69){c.got=true;addCoin();}}
 for(const z of l.secret){
  if(z.got)continue;
  if(Math.abs(s.x-z.x)<.47&&s.y>z.y-.9&&s.y<z.y){
   z.got=true;s.secretFlag=true;
   if(z.type==='life'){s.lives++;hint('1 jiwa kehidupan tersembunyi!');}
   else if(z.type==='vine'){show('Akar Langit Rahasia',
     '<p>Sebuah jalur rahasia tersembunyi di balik akar. Masuki tantangan bonus?</p>',
     [['secret','❖ Masuk Ruang Rahasia'],['resume','Teruskan Level']]);}
   else{enterSecret();}
  }
 }
 if(!playing)return;
 window.NUSAJIWA_STAGE130?.bossMotion?.(s,l,dt,damage,hint);
 if(s.stop)return;
 for(const e of l.enemies){
  if(!e.alive)continue;
  if(e.type==='fish'||e.type==='jelly'){
   e.y=1.2+Math.sin(s.elapsed*1.5+e.phase)*1.0+(e.type==='jelly'?.4:0);
   e.x=e.base+Math.sin(s.elapsed*(.65+e.phase*.03))*1.15;
  }else{
   e.prevX=e.x;
   if(e.type==='shell'&&Math.abs(e.vx)>2){
    // Kicked shells do NOT turn around at their original walking patrol.
    e.x+=e.vx*dt;
    if(e.x<.55){e.x=.55;e.vx=Math.abs(e.vx);}
    else if(e.x>l.length-.55){e.x=l.length-.55;e.vx=-Math.abs(e.vx);}
    for(const tube of l.pipes){
     const left=tube.x-.76,right=tube.x+.76;
     if(e.prevX<=left&&e.x>left){e.x=left;e.vx=-Math.abs(e.vx);break;}
     if(e.prevX>=right&&e.x<right){e.x=right;e.vx=Math.abs(e.vx);break;}
    }
   }else{
    e.x+=e.vx*dt;
    if(e.x<=e.start||e.x>=e.end)e.vx*=-1;
   }
  }
  if(Math.abs(s.x-e.x)<.56&&Math.abs((s.y+.55)-(e.y+.15))<.69){
   if(window.NUSAJIWA_NES127?.touchEnemy?.(s,l,e,hint))break;
   if(!water&&oldY>e.y+.38&&s.vy<-.4&&!e.shell){
    if(window.NUSAJIWA_NES127?.stomp?.(s,l,e,hint)){s.vy=6.6;break;}
    if(e.type==='shelled'){e.shell=true;e.vx=0;e.y=.22;hint('Cangkang terpental!');}
    else{e.alive=false;s.score+=150;}
    s.vy=6.6;break;
   }
   if(e.shell){
    if(window.NUSAJIWA_NES127?.kickShell?.(s,l,e,hint)){s.vy=4.4;break;}
    e.vx=s.facing*9;e.shell=false;e.type='shell';s.vy=4.4;s.score+=60;
   }else if(s.invincible===0)damage();
  }
 }
 if(l.boss){
  const e=l.boss;e.phase+=dt;
  if(e.hp>0&&Math.abs(s.x-e.x)<.9&&Math.abs(s.y+.6-(1+(e.bob||0)))<1.1){
   if(oldY>1.25&&s.vy<0){
    window.NUSAJIWA_STAGE130?.bossHit?.(s,l,'stomp',hint);s.vy=7;
   }else if(window.NUSAJIWA_NES127?.isProtected?.(s)){
    window.NUSAJIWA_STAGE130?.bossHit?.(s,l,'surya',hint);
   }else if(s.invincible===0)damage();
  }
 }
 window.NUSAJIWA_NES127?.after?.(s,l,dt,hint);
 window.NUSAJIWA_STAGE130?.update?.(s,l,dt,damage,hint);
 if(s.stop)return;
 window.NUSAJIWA_CLASSIC124?.update?.(s,l,dt,hint,addCoin);
 if(s.bonus&&Math.floor(s.elapsed*2.5)!==Math.floor((s.elapsed-dt)*2.5)){addCoin(2);s.score+=30;}
 if(s.x>=l.length-3.2&&(!l.boss||l.boss.hp<=0))finish();
 s.cameraX=clamp(s.x-6,0,Math.max(0,l.length-viewWidth));
 updateHud();
}
function updateHud(){
 if(!root||!status)return;
 root.querySelector('#njcStage').textContent=(level.world+1)+'—'+(level.section+1);
 root.querySelector('#njcCoin').textContent='✧ '+String(status.coins).padStart(2,'0');
 root.querySelector('#njcLife').textContent='♥ '+status.lives;
 root.querySelector('#njcTime').textContent=String(Math.max(0,Math.ceil(status.remaining)));
 root.querySelector('#njcWorld').textContent=(level.nj124?.locale||level.region).toUpperCase()+' · '+level.name.toUpperCase();
}
function resize(){
 if(!canvas)return;
 const rect=canvas.getBoundingClientRect(),dpr=Math.min(2,window.devicePixelRatio||1);
 const w=Math.max(320,Math.round(rect.width||window.innerWidth)),h=Math.max(210,Math.round(rect.height||window.innerHeight));
 canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx?.setTransform(dpr,0,0,dpr,0,0);
 pixelScale=clamp(w/22,22,40);viewWidth=w/pixelScale;
}
function render(){
 if(window.NUSAJIWA_CLASSIC3D?.frame?.(level,status,pet))return;
 if(!ctx||!canvas)return;
 const w=canvas.width/Math.min(2,window.devicePixelRatio||1),
 h=canvas.height/Math.min(2,window.devicePixelRatio||1),camera=status?.cameraX||0,
 p=pixelScale,s=status,l=level||LEVELS[0],bg=l.colors,type=l.type;
 const X=x=>(x-camera)*p,Y=y=>h-90-y*p,fill=(c,x,y,ww,hh)=>{ctx.fillStyle=c;ctx.fillRect(x,y,ww,hh)};
 const night=type==='night'||type==='underground'||type==='castle';
 fill(night?'#13263b':type==='water'?'#2b89aa':bg.sky,0,0,w,h);
 // Original region parallax instead of Mario backgrounds.
 for(let k=0;k<17;k++){
  const wx=k*220-(camera*p*.15)%220;
  ctx.fillStyle=night?'#253c53':bg.far;ctx.globalAlpha=.43;
  ctx.beginPath();ctx.moveTo(wx-80,h-115);
  ctx.lineTo(wx+50,h-190-(k%3)*32);ctx.lineTo(wx+150,h-116);
  ctx.closePath();ctx.fill();ctx.globalAlpha=1;
 }
 window.NUSAJIWA_CLASSIC124?.drawBackdrop?.(ctx,l,s,X,Y,p,w,h);
 if(type==='water'){
  fill('#7ad2df30',0,h*.12,w,h*.84);
  for(let i=0;i<10;i++){const x=(i*131-camera*p*.25)%w;
   for(let j=0;j<6;j++){ctx.strokeStyle='#d5fbff55';ctx.beginPath();
    ctx.arc((x+w)%w,h-70-j*70+(i%3)*9,4+j,0,6.283);ctx.stroke();}}
 }
 const from=Math.floor(camera-2),to=Math.ceil(camera+viewWidth+3);
 for(let i=from;i<=to;i++){
  if(i<0||i>=l.length)continue;
  const visible=isGround(l,i+.5),baseY=Y(0);
  if(visible){
   fill(bg.land,X(i),baseY,p+1,h-baseY);
   fill(type==='castle'?'#e0ab72':'#b7cf98',X(i),baseY-6,p+1,7);
   if(i%3===0)fill('#172d3144',X(i)+5,baseY+10,p*.42,p*.16);
  }else{
   fill('#10263d66',X(i),baseY,p+1,h-baseY);
  }
 }
 for(const pform of l.platforms){
  const at=window.NUSAJIWA_STAGE130?.platformPosition?.(pform,s?.elapsed||0)||
   {x:pform.x+(pform.kind==='suspended'?Math.sin((s?.elapsed||0)*1.3+pform.x):0),
    y:pform.y+(pform.kind==='sway'?Math.sin((s?.elapsed||0)*1.2+pform.x)*.45:0)};
  fill('#aa9265',X(at.x-pform.w/2),Y(at.y),pform.w*p,.17*p);
  fill('#e4ce95',X(at.x-pform.w/2),Y(at.y),pform.w*p,.075*p);
 }
 for(const tube of l.pipes){
  const tx=X(tube.x-.6),ty=Y(tube.h);
  fill(tube.secret?'#7a70b2':'#4d7d79',tx,ty,p*1.2,(tube.h+.15)*p);
  fill(tube.secret?'#b6a4d3':'#b2ca9c',tx-p*.14,ty-.18*p,p*1.48,.27*p);
  fill('#162e2f',tx+.28*p,ty+.15*p,.57*p,.12*p);
  if(tube.secret){ctx.fillStyle='#ffe4a9';ctx.font='bold '+Math.round(p*.36)+'px system-ui';
   ctx.fillText('❖',tx+p*.39,ty+p*.82);}
 }
 for(const b of l.blocks){
  if(b.kind==='hidden'&&!b.reveal)continue;
  if(b.destroyed)continue;
  fill(b.used?'#75868a':b.kind==='stone'?'#798e97':b.kind==='power'?'#d5a65d':'#a9ac8a',
   X(b.x-.45),Y(b.y+.4),.9*p,.8*p);
  ctx.font='bold '+Math.floor(p*.43)+'px system-ui';ctx.fillStyle='#213d42';
  if(!b.used&&b.kind!=='stone')ctx.fillText(b.kind==='power'?'✧':'◇',X(b.x-.18),Y(b.y-.18));
 }
 window.NUSAJIWA_CLASSIC124?.drawForeground?.(ctx,l,s,X,Y,p);
 for(const c of l.coins){if(c.got)continue;ctx.fillStyle='#ffe3a1';ctx.beginPath();
  ctx.ellipse(X(c.x),Y(c.y),p*.15,p*.23,0,0,6.283);ctx.fill();}
 window.NUSAJIWA_STAGE130?.draw2D?.(ctx,s,l,X,Y,p);
 for(const e of l.enemies){if(!e.alive)continue;const yy=Y(e.y+.2),xx=X(e.x);
  ctx.fillStyle=e.type==='fish'?'#f4a96e':e.type==='jelly'?'#d5a4df':
   e.type==='shelled'||e.shell?'#678c84':'#ac6a61';
  ctx.beginPath();ctx.ellipse(xx,yy,.35*p,.34*p,0,0,6.283);ctx.fill();
  fill('#fff8d3',xx-.16*p,yy-.12*p,.075*p,.085*p);
  fill('#fff8d3',xx+.12*p,yy-.12*p,.075*p,.085*p);}
 for(const z of l.secret){if(z.got)continue;
  // Hidden entrances are discoverable through collisions and exploration.
  if(z.type==='vine'&&s&&Math.abs(s.x-z.x)<4){
   ctx.fillStyle='#bfe0a0';ctx.font='bold '+Math.round(p*.40)+'px system-ui';
   ctx.fillText('✧',X(z.x),Y(z.y));}
 }
 if(l.boss?.hp>0){const e=l.boss,xx=X(e.x),yy=Y(.98+(e.bob||0));
  ctx.fillStyle='#644953';ctx.beginPath();ctx.ellipse(xx,yy,p*.65,p*.89,0,0,6.283);ctx.fill();
  fill('#f2dfad',xx-.27*p,yy-.20*p,.12*p,.12*p);
  fill('#f2dfad',xx+.16*p,yy-.20*p,.12*p,.12*p);
  fill('#d8b48a',xx-.38*p,yy-.78*p,.75*p,.17*p);
  ctx.fillStyle='#ffeac2';ctx.font='bold '+Math.round(p*.30)+'px system-ui';
  ctx.fillText('♥ '+e.hp,xx-p*.35,yy-p*1.10);
 }
 if(l.boss?.orbs)for(const orb of l.boss.orbs){
  ctx.fillStyle='#ffac6a';ctx.beginPath();
  ctx.arc(X(orb.x),Y(orb.y),p*.19,0,Math.PI*2);ctx.fill();
 }
 const gateX=X(l.length-2);
 fill(l.boss?.hp>0?'#85666d':'#edd3a0',gateX,Y(2.9),.13*p,3*p);
 fill('#2d6a5b',gateX,Y(2.85),.76*p,.51*p);
 ctx.font='bold '+Math.round(p*.49)+'px system-ui';ctx.fillStyle='#ffefca';
 ctx.fillText('✧',gateX+.12*p,Y(2.52));
 if(s&&!s.stop&&(!s.invincible||Math.floor(s.elapsed*12)%2===0)){
  const xx=X(s.x),yy=Y(s.y+.66),size=s.power?1.1:.84;
  ctx.save();ctx.translate(xx,yy);
  if(s.facing<0)ctx.scale(-1,1);
  ctx.fillStyle=pet?.type==='spirit'?'#e4dcd7':pet?.type==='bird'?'#deb668':
   pet?.type==='tiger'?'#cb8b5e':'#8acfaa';
  ctx.beginPath();ctx.ellipse(0,0,p*.39*size,p*.49*size,0,0,6.283);ctx.fill();
  if(pet?.type==='bird'){
   ctx.beginPath();ctx.ellipse(-p*.37,p*.02,p*.22,p*.18,-.35,0,6.283);ctx.fill();
  }
  if(pet?.type==='spirit'){
   ctx.beginPath();ctx.moveTo(-p*.31,p*.39);ctx.lineTo(-p*.22,p*.58);
   ctx.lineTo(0,p*.42);ctx.lineTo(p*.28,p*.60);ctx.lineTo(p*.32,p*.31);ctx.fill();
  }
  if(pet?.type==='tiger'){
   fill('#5e4337',-p*.28,-p*.26,.11*p,.14*p);
   fill('#5e4337',p*.19,-p*.26,.11*p,.14*p);
  }
  fill('#243d42',p*.08,-p*.16,p*.072,p*.082);
  fill('#243d42',p*.26,-p*.16,p*.042,p*.082);
  if(s.power){ctx.strokeStyle='#e8d49a';ctx.lineWidth=2.4;ctx.beginPath();
   ctx.ellipse(0,0,p*.44*size,p*.55*size,0,0,6.283);ctx.stroke();}
  if(!s.grounded){ctx.globalAlpha=.65;fill('#fff3be',-.14*p,.34*p,.31*p,.07*p);}
  ctx.restore();
 }
 window.NUSAJIWA_NES127?.draw2D?.(ctx,s,X,Y,p);
 if(s?.bonus){
  fill('#14273fdf',w*.18,h*.12,w*.64,h*.18);
  ctx.fillStyle='#ffe7a9';ctx.font='bold '+Math.round(Math.max(14,p*.36))+'px system-ui';
  ctx.fillText('❖ RUANG BONUS · '+Math.ceil(s.bonusTimer)+'s',w*.25,h*.23);
 }
 if(s?.stop||!playing){ctx.fillStyle='#081d2440';ctx.fillRect(0,0,w,h);}
}
function loop(now){
 if(!active){raf=0;return}if(!last)last=now;
 const dt=Math.min(.07,(now-last)/1000);last=now;
 if(playing&&!document.hidden){
  buffer+=dt;let steps=0;
  while(buffer>=TICK&&steps++<5&&playing){update(TICK);buffer-=TICK}
  if(steps>=5)buffer=0;
 }
 render();raf=requestAnimationFrame(loop);
}
function keyboard(ev,down){
 if(!active||window.NUSAJIWA_ROM_REF?.isOpen?.())return;const target=ev.target;
 if(target?.tagName==='INPUT'||target?.tagName==='TEXTAREA')return;
 const codes={ArrowLeft:'left',KeyA:'left',ArrowRight:'right',KeyD:'right',
 ArrowUp:'jump',Space:'jump',KeyZ:'jump',KeyK:'jump',KeyX:'run',KeyJ:'run',
 ShiftLeft:'run',ShiftRight:'run',ArrowDown:'down',KeyS:'down'};
 const mapped=codes[ev.code];
 if(!mapped&&ev.code!=='Escape')return;
 ev.preventDefault();ev.stopImmediatePropagation();
 if(ev.code==='Escape'&&down){if(playing)pause();else close();}
 else if(mapped)setKey(mapped,down);
}
document.addEventListener('keydown',e=>keyboard(e,true),true);
document.addEventListener('keyup',e=>keyboard(e,false),true);
window.addEventListener('resize',resize,{passive:true});
document.addEventListener('visibilitychange',()=>{if(active&&playing&&document.hidden)pause()});
window.addEventListener('blur',()=>{if(active&&playing)pause()});
window.NUSAJIWA_CLASSIC=Object.freeze({version:'9.12.NJ132',worldDesign:'NJ124-Worlds',renderSystem:'NJ125-Three-WebGL',open,close,levels:LEVELS.map(l=>({
 index:l.index,world:l.world+1,stage:l.section+1,region:l.region,type:l.type,
 location:l.place,challenge:l.name,length:l.length,secretEntrances:l.secret.length,
 shortcuts:l.pipes.filter(p=>p.warp).length})),
 previewPlan:idx=>{const l=LEVELS[idx];return l?{
 id:idx,world:l.world+1,stage:l.section+1,type:l.type,
 gaps:l.gaps.map(g=>g.slice()),portals:l.pipes.map(p=>({x:p.x,secret:p.secret,warp:p.warp})),
 enemies:l.enemies.length,platforms:l.platforms.length,blocks:l.blocks.length,
 shortcuts:l.pipes.filter(p=>p.warp).length,
 bonuses:l.secret.length,boss:!!l.boss,clock:l.clock,
  choreography:l.nj130?.signature||null,pads:l.nj130?.pads?.length||0,
  sentries:l.nj130?.sentries?.length||0}:null;},
 getStatus:()=>status?{index:status.index,x:status.x,y:status.y,coins:status.coins,
 lives:status.lives,shield:status.power,time:status.remaining,
 bonus:status.bonus,secret:status.secretFlag,playing}:null,
 getSave:()=>JSON.parse(JSON.stringify(store||load()))});
})();
