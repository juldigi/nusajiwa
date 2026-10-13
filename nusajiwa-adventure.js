/* NUSAJIWA 8.0 — Jelajah Evolusi: playable five-stage 2.5D platform adventure.
   World mechanics and saves are original. 3D optional, 2D fallback uses same physics. */
(function(){
'use strict';
if(window.NUSAJIWA_ADVENTURE)return;
const KEY='nusajiwa-adventure-v1';
const LEVELS_PER_WORLD=5;
const LEVELS=[
 {name:'Gerbang Rimba',world:'sumatra',theme:'jungle',tag:'Lompati akar & temukan Jiwa',length:84,ground:[[0,20],[23,43],[46,66],[69,86]],ledges:[[9,1.6,4],[29,1.6,4],[52,1.8,4]],hazards:[13,32,58,75],checkpoints:[26,51],gem:39,element:'tanah',sky:0x92d9be},
 {name:'Sungai Berliku',tag:'Lewati aliran sungai dan tepian',length:88,ground:[[0,16],[19,34],[37,54],[57,71],[74,90]],ledges:[[8,1.8,4],[24,1.8,4],[43,2.0,5],[62,1.6,4]],hazards:[12,27,48,65,80],checkpoints:[23,50],gem:45,element:'air',sky:0x8bcacb},
 {name:'Hutan Berkabut',tag:'Ikuti cahaya di balik kabut',length:92,ground:[[0,18],[21,39],[42,59],[62,77],[80,94]],ledges:[[10,1.7,4],[29,2.0,5],[48,1.8,5],[68,2,4]],hazards:[13,31,52,71,85],checkpoints:[26,64],gem:69,element:'angin',sky:0xc3d6c1},
 {name:'Gua Tersembunyi',tag:'Terangi jalan menuju kristal',length:95,ground:[[0,19],[22,39],[42,61],[64,78],[81,97]],ledges:[[12,1.8,5],[29,2.0,4],[49,2,4],[70,1.8,4]],hazards:[16,35,56,74,88],checkpoints:[25,65],gem:51,element:'bayangan',sky:0x97b5bd},
 {name:'Ujian Penjaga Rimba',tag:'Lewati gerbang terakhir evolusi',length:100,ground:[[0,19],[22,39],[42,57],[60,77],[80,102]],ledges:[[10,2,5],[28,2.1,4],[47,1.9,4],[68,2.1,4],[88,1.8,4]],hazards:[15,33,51,70,90],checkpoints:[25,63],gem:88,element:'cahaya',sky:0xf4d4a0},
 {name:'Lereng Gunung Api',tag:'Melintasi lereng dan batu hangat',world:'jawa',theme:'volcano',length:86,ground:[[0,18],[21,37],[40,58],[61,74],[77,88]],ledges:[[12,1.8,4],[30,1.8,4],[48,2,4],[68,1.9,5]],hazards:[14,30,52,69,82],patrols:[[27,34,.55,1.5]],checkpoints:[24,63],gem:48,element:'api',sky:0xe4c1aa},
 {name:'Teras Sawah',tag:'Platform sawah dan jalan setapak',world:'jawa',theme:'terrace',length:90,ground:[[0,20],[23,42],[45,61],[64,78],[81,92]],ledges:[[10,1.7,5],[31,1.9,5],[52,2.0,4],[71,1.8,5]],hazards:[16,36,57,74,86],patrols:[[28,38,.55,1.6],[66,76,.55,1.9]],checkpoints:[26,66],gem:54,element:'tanah',sky:0xbad9ac},
 {name:'Aliran Batu',tag:'Menyeberang arus dan jembatan batu',world:'jawa',theme:'river',length:94,ground:[[0,19],[22,38],[41,59],[62,77],[80,96]],ledges:[[12,2,5],[30,1.9,4],[50,2.1,5],[69,2,4],[87,1.9,4]],hazards:[15,34,54,71,88],patrols:[[25,35,.55,1.8],[65,74,.55,2]],checkpoints:[24,65],gem:71,element:'air',sky:0xa5c5cb},
 {name:'Lorong Candi',tag:'Memecahkan segel batu pada lorong kuno',world:'jawa',theme:'temple',length:96,ground:[[0,20],[23,41],[44,61],[64,79],[82,98]],ledges:[[12,1.8,4],[30,2,5],[50,2.2,4],[72,1.8,5]],hazards:[16,35,56,75,91],patrols:[[26,37,.55,2.0],[67,76,.55,1.7]],checkpoints:[26,66],gem:51,element:'cahaya',sky:0xd7c5a7},
 {name:'Penjaga Gerbang Batu',tag:'Aktifkan tiga segel untuk membuka gerbang',world:'jawa',theme:'temple',length:102,ground:[[0,20],[23,40],[43,60],[63,81],[84,104]],ledges:[[13,2,5],[31,2,4],[51,1.9,5],[73,2,4],[93,1.9,4]],hazards:[17,35,55,76,91],patrols:[[27,37,.55,1.8],[47,57,.55,2.2],[69,79,.55,2.1],[87,95,.55,1.8]],checkpoints:[26,66],gem:74,element:'cahaya',sky:0xe5c5a2,sigils:[[13,1.15],[50,1.15],[91,1.15]]}
];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const day=()=>new Date().toLocaleDateString('en-CA');
const getPet=()=>{try{const s=window.NUSAJIWA_TAMAGOTCHI?.getSave();const p=s?.pets?.[s.active];return p&&!p.retired?p:null;}catch(_){return null}};
function readSave(){try{const s=JSON.parse(localStorage.getItem(KEY)||'null');if(s&&s.version===1&&s.pets&&typeof s.pets==='object')return s;}catch(_){}return {version:1,pets:{}}}
let progress=readSave();
function save(){try{localStorage.setItem(KEY,JSON.stringify(progress))}catch(_){}}
function record(id){return progress.pets[id]||(progress.pets[id]={completed:{},gems:{},best:{},plays:0})}
const safe=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const character=id=>{if(/kuyang|palasik|banaspati/.test(id))return 'spirit';if(/rangkong|hornbill|elang|kakatua|burung/.test(id))return 'bird';if(/tiger|harimau/.test(id))return 'tiger';return 'forest'};
const root=document.createElement('section');
root.id='nja';root.hidden=true;root.setAttribute('aria-label','Jelajah Evolusi NUSAJIWA');
root.innerHTML='<div class="nja-stage">'+
 '<canvas id="njaCanvas" aria-label="Arena platformer: bergerak, melompat, dan kumpulkan Jiwa"></canvas>'+
 '<header class="nja-hud"><div class="nja-title"><b>NUSAJIWA</b><small id="njaRegion">JELAJAH EVOLUSI · RIMBA SUMATRA</small></div>'+
 '<div class="nja-stats"><span id="njaStage">1—1</span><span id="njaCoins">✦ 0</span><span id="njaLives">♥ ♥ ♥</span></div>'+
 '<button type="button" data-nja="pause" class="nja-hud-btn" aria-label="Jeda petualangan">Ⅱ</button></header>'+
 '<div class="nja-message" id="njaMessage" aria-live="polite"></div>'+
 '<div class="nja-progress"><i id="njaFill"></i></div>'+
 '<div class="nja-pad"><div class="nja-dir"><button type="button" data-hold="left" aria-label="Bergerak ke kiri">◀</button>'+
 '<button type="button" data-hold="right" aria-label="Bergerak ke kanan">▶</button></div>'+
 '<div class="nja-act"><button type="button" data-hold="special" aria-label="Kemampuan khusus">✦<small>SKILL</small></button>'+
 '<button type="button" data-hold="jump" aria-label="Lompat">↑<small>LOMPAT</small></button></div></div>'+
 '<div id="njaOverlay" class="nja-overlay" role="dialog" aria-modal="true" aria-label="Menu petualangan">'+
 '<div id="njaMenu" class="nja-menu"></div></div>'+
 '</div>';
document.body.append(root);
const $=q=>root.querySelector(q),overlay=$('#njaOverlay'),menu=$('#njaMenu');
let canvas=$('#njaCanvas');
let opened=false,playing=false,mode='menu',pet=null,levelIndex=0,run=null,THREE=null,render3d=null,ctx=null,raf=0,last=0,accumulator=0,lastUi=0,returnHidden=false,importToken=0;
let input={left:false,right:false,jump:false,special:false,jumpRequest:false,specialRequest:false};
const ACTIVE_KEYS=new Set(['ArrowLeft','ArrowRight','ArrowUp','Space',' ','KeyA','KeyD','KeyW','KeyX','KeyJ','KeyK','Escape']);
function setInput(k,on){if(k==='left'||k==='right'){input[k]=on;return}
 if(k==='jump'){if(on&&!input.jump)input.jumpRequest=true;input.jump=on}
 if(k==='special'){if(on&&!input.special)input.specialRequest=true;input.special=on}}
function clearInput(){input={left:false,right:false,jump:false,special:false,jumpRequest:false,specialRequest:false}}
function present(title,body,actions){
 mode='menu';playing=false;clearInput();
 overlay.hidden=false;
 menu.innerHTML='<div class="nja-kicker">✦ THE LIVING LEGENDS</div><h1>'+safe(title)+'</h1>'+
 '<div class="nja-menu-body">'+body+'</div>'+
 '<div class="nja-menu-buttons">'+actions.map(a=>'<button type="button" data-nja="'+a[0]+'"'+(a[2]?' data-value="'+a[2]+'"':'')+'>'+a[1]+'</button>').join('')+'</div>';
}
function levelMenu(){
 const p=getPet();if(!p){present('Pilih sahabat dahulu','<p>Rawat dan tetaskan satu makhluk di habitat untuk memulai petualangan.</p>',[['exit','Kembali ke Tamagotchi']]);return;}
 pet={...p,type:character(p.id)};
 if(p.stage===0||p.sleep||p.sick){let message=p.stage===0?'Telur harus menetas terlebih dahulu.':p.sleep?'Sahabat sedang tidur. Nyalakan lampunya dahulu.':'Sahabat sedang sakit. Obati dahulu.';
 present('Sahabat perlu istirahat','<p>'+message+'</p>',[['exit','Kembali merawat']]);return;}
 const r=record(p.id);
 const entries=LEVELS.map((l,i)=>{const unlocked=i===0||!!r.completed[i-1];const title=i===0||i===LEVELS_PER_WORLD?
  '<div class="nja-world-heading"><b>'+(i===0?'🌳 WORLD 1 · RIMBA SUMATRA':'🏯 WORLD 2 · TANAH JAWA')+'</b><small>'+(i===0?'Hutan, sungai dan batu elemen':'Lereng, persawahan dan ujian segel')+'</small></div>':'';
  return title+'<button type="button" class="nja-level '+(unlocked?'':'locked')+'" data-nja="level" data-value="'+i+'" '+(unlocked?'':'disabled')+'><b>'+(Math.floor(i/LEVELS_PER_WORLD)+1)+'—'+((i%LEVELS_PER_WORLD)+1)+' · '+safe(l.name)+'</b><small>'+safe(l.tag)+'</small><em>'+(r.completed[i]?'✓ '+r.completed[i]+' ★':unlocked?'MAINKAN':'🔒 Terkunci')+'</em></button>';}).join('');
 const ability=pet.type==='spirit'?'Melayang':pet.type==='bird'?'Terbang sekali':pet.type==='tiger'?'Lari kilat':'Lompat dorong';
 present('Jelajah Evolusi','<p>Sepuluh level di dua dunia 2.5D bersama <b>'+safe(p.id.replaceAll('_',' '))+'</b>. '+(p.stage===1?'Tahap Bayi: latihan dapat dimainkan sejak dini. ':'')+'Kemampuan khusus: <b>'+ability+'</b>. Kumpulkan Jiwa, sentuh checkpoint dan capai gerbang.</p><div class="nja-levels">'+entries+'</div><p class="nja-tip">iPhone: ◀ ▶, LOMPAT, SKILL · Komputer: ← →, ↑/Spasi, X. Kualitas perawatan tetap memengaruhi evolusi.</p>',[['exit','Kembali ke Habitat']]);
}
function buildCoins(l){const coins=[];for(let x=5;x<l.length-2;x+=5){const seg=l.ground.find(g=>x>=g[0]+.5&&x<=g[1]-.5);if(seg)coins.push({x,y:1+(x%3===0?.7:0),got:false});}l.ledges.forEach(p=>coins.push({x:p[0],y:p[1]+.85,got:false}));return coins;}
function begin(n){
 if(!pet||!Number.isInteger(n)||n<0||n>=LEVELS.length||n>0&&!record(pet.id).completed[n-1])return;
 levelIndex=n;const level=LEVELS[n];const coins=buildCoins(level);
 run={level,coins,gem:{x:level.gem,y:2.1,got:false},patrols:(level.patrols||[]).map(([start,end,y,speed])=>({start,end,y,speed})),
  sigils:(level.sigils||[]).map(([x,y])=>({x,y,got:false})),gateHintAt:-20,x:2,y:0,vx:0,vy:0,grounded:true,double:false,heroFacing:1,health:3,score:0,checkpoint:2,usedCp:[],hurtUntil:0,skillUntil:0,skillCool:0,seconds:0,accum:0,cameraX:2.5,ended:false};
 mode='play';playing=true;overlay.hidden=true;clearInput();
 $('#njaRegion').textContent='JELAJAH EVOLUSI · '+(level.world==='jawa'?'TANAH JAWA':'RIMBA SUMATRA');
 try{setupVisual()}catch(e){console.warn('Adventure 3D fallback:',e);set2D()}
 announce('✦ '+level.name+' · Sampai ke gerbang!');
 last=0;accumulator=0;
 cancelAnimationFrame(raf);raf=requestAnimationFrame(loop);
}
function announce(text){const el=$('#njaMessage');el.textContent=text;el.classList.add('on');clearTimeout(announce.t);announce.t=setTimeout(()=>{if(opened)el.classList.remove('on')},2350)}
function getAbility(){return pet?.type||'forest'}
function jump(){
 if(run.grounded){run.vy=9.3;run.grounded=false;run.double=false;return}
 if(getAbility()==='bird'&&!run.double){run.vy=7.5;run.double=true;announce('↟ Kepakan sayap!');}
}
function special(){
 if(run.skillCool>0)return;
 if(getAbility()==='bird'){if(!run.grounded&&!run.double)jump();else announce('Lompat dulu untuk mengepak sayap.');return}
 if(getAbility()==='spirit'&&!run.grounded){run.skillUntil=1.55;run.skillCool=3;announce('✦ Melayang!');return}
 if(getAbility()==='tiger'){run.skillUntil=.5;run.skillCool=2.6;announce('⚡ Lari kilat!');return}
 if(!run.grounded){run.vy=Math.max(run.vy,5.1);run.skillCool=3;announce('✦ Dorongan alam!')}
}
function hurt(){
 if(run.hurtUntil>0||run.ended)return;
 run.health--;run.hurtUntil=1.15;
 if(run.health<=0){run.ended=true;playing=false;present('Coba Lagi','<p>Kamu terjatuh, tetapi perjalanan belum selesai. Checkpoint dan hadiah hanya disimpan setelah gerbang tercapai.</p>',[['retry','↻ Ulangi level'],['levels','Pilih level']]);return}
 run.x=run.checkpoint;run.y=0;run.vy=0;run.vx=0;run.grounded=true;
 announce('♥ Kembali ke checkpoint · '+run.health+' nyawa tersisa');
}
function finish(){
 if(!run||run.ended)return;run.ended=true;playing=false;clearInput();
 const r=record(pet.id);const gems=run.gem.got;const stars=clamp(1+(run.health===3?1:0)+(gems?1:0),1,3);
 const previous=Number(r.completed[levelIndex])||0,first=!previous;
 r.completed[levelIndex]=Math.max(previous,stars);r.best[levelIndex]=Math.max(Number(r.best[levelIndex])||0,run.score);
 if(gems)r.gems[levelIndex]=true;
 r.plays=(r.plays||0)+1;
 const reward=window.NUSAJIWA_TAMAGOTCHI?.awardAdventure?.({id:pet.id,level:levelIndex,stars,score:run.score,gem:gems,element:run.level.element,firstClear:first})||null;
 save();
 const earned=reward?.earned?'+'+reward.xp+' XP · +'+reward.spirit+' Jiwa'+(reward.stone?' · Batu '+run.level.element:''):'Hadiah sudah tercatat hari ini.';
 const sub='<p>Gerbang terbuka! Kamu membawa <b>'+run.score+' Jiwa</b> dan <b>'+stars+' ★</b>. '+(gems?'Batu elemen berhasil ditemukan.':'Batu rahasia belum ditemukan.')+'</p><div class="nja-reward">'+earned+'</div><p class="nja-tip">Evolusi tetap membutuhkan usia, perawatan dan XP. Hasil petualangan telah dikirim ke sahabat Tamagotchi yang sama.</p>';
 present('Level selesai! ✨',sub,[[levelIndex<LEVELS.length-1?'next':'levels',levelIndex<LEVELS.length-1?'▶ Level berikutnya':'✓ Lihat semua level'],['retry','↻ Main lagi'],['exit','♡ Kembali ke Habitat']]);
}
function physics(dt){
 const s=run;if(!s||s.ended)return;
 s.seconds+=dt;s.skillCool=Math.max(0,s.skillCool-dt);s.hurtUntil=Math.max(0,s.hurtUntil-dt);s.skillUntil=Math.max(0,s.skillUntil-dt);
 if(input.jumpRequest){jump();input.jumpRequest=false}
 if(input.specialRequest){special();input.specialRequest=false}
 const dir=(input.right?1:0)-(input.left?1:0),speed=getAbility()==='tiger'&&s.skillUntil>0?11:6.0;
 s.vx=dir*speed;if(dir)s.heroFacing=dir;
 const prevY=s.y;s.x=clamp(s.x+s.vx*dt,.2,s.level.length+.5);
 s.vy+=(-22)*(getAbility()==='spirit'&&s.skillUntil>0&&s.vy<0?.19:1)*dt;
 s.y+=s.vy*dt;s.grounded=false;
 if(s.vy<=0){const surfaces=s.level.ground.map(g=>[(g[0]+g[1])/2,0,g[1]-g[0]]).concat(s.level.ledges);
   for(const g of surfaces){if(s.x+.23<g[0]-g[2]/2||s.x-.23>g[0]+g[2]/2)continue;
    if(prevY>=g[1]-.07&&s.y<=g[1]&&s.y>=g[1]-1.4){s.y=g[1];s.vy=0;s.grounded=true;s.double=false;break;}}
 }
 if(s.y< -3.5)hurt();
 for(const h of s.level.hazards){if(Math.abs(s.x-h)<.54&&s.y<.68&&s.y>-.45)hurt()}
 for(const coin of s.coins){if(!coin.got&&Math.hypot(s.x-coin.x,s.y+.5-coin.y)<.85){coin.got=true;s.score+=5}}
 if(!s.gem.got&&Math.hypot(s.x-s.gem.x,s.y+.5-s.gem.y)<1.05){s.gem.got=true;s.score+=25;announce('◆ Batu '+s.level.element+' ditemukan!')}
 for(const cp of s.level.checkpoints){if(!s.usedCp.includes(cp)&&s.x>=cp){s.checkpoint=cp;s.usedCp.push(cp);announce('⚑ Checkpoint disimpan')}}
 const narrow=(canvas.clientWidth||window.innerWidth)/Math.max(1,canvas.clientHeight||window.innerHeight)<.8;
 const lead=narrow?1.25:3.2,minimum=narrow?3:6.6;
 s.cameraX+=(clamp(s.x+lead,minimum,s.level.length-(narrow?3:5.5))-s.cameraX)*Math.min(1,dt*5.5);
 if(s.x>=s.level.length-1){finish()}
}
function swapCanvas(){const next=canvas.cloneNode(false);canvas.replaceWith(next);canvas=next;}
function set2D(){if(render3d){render3d.dispose();render3d=null;swapCanvas()}ctx=canvas.getContext('2d',{alpha:false});if(!ctx){swapCanvas();ctx=canvas.getContext('2d',{alpha:false})}resize();}
function resize(){
 if(!opened)return;
 const box=canvas.getBoundingClientRect(),w=Math.max(240,Math.floor(box.width)),h=Math.max(180,Math.floor(box.height));
 const ratio=Math.min(1.7,window.devicePixelRatio||1);
 const cw=Math.floor(w*ratio),ch=Math.floor(h*ratio);
 if(canvas.width!==cw||canvas.height!==ch){canvas.width=cw;canvas.height=ch;}
 if(render3d)render3d.resize(w,h,ratio);
}
async function tryThree(token){
 if(THREE||!opened)return;
 for(const url of ['https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.module.js','https://unpkg.com/three@0.160.1/build/three.module.js']){
  try{const lib=await import(url);if(!opened||token!==importToken)return;THREE=lib;if(playing){try{setupVisual()}catch(err){console.warn('3D scene fallback',err);set2D()}}return}catch(e){console.warn('3D adventure asset unavailable:',e)}
 }
}
function setupVisual(){
 if(render3d){render3d.dispose();render3d=null;swapCanvas()}
 if(!THREE){set2D();return}
 if(ctx){swapCanvas();ctx=null;}
 const T=THREE,l=run.level,scene=new T.Scene();
 scene.background=new T.Color(l.sky);scene.fog=new T.Fog(l.sky,18,56);
 const camera=new T.OrthographicCamera(-8,8,4.9,-4.9,.1,100);
 camera.position.set(0,4,18);camera.lookAt(0,2.6,0);
 const renderer=new T.WebGLRenderer({canvas,antialias:false,alpha:false,powerPreference:'low-power'});
 renderer.setPixelRatio(Math.min(1.7,window.devicePixelRatio||1));renderer.outputColorSpace=T.SRGBColorSpace;
 renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.35;
 scene.add(new T.HemisphereLight(0xfaffd7,0x537d74,2.8));
 const sun=new T.DirectionalLight(0xffe6b4,2.6);sun.position.set(-6,12,10);scene.add(sun);
 const geo=[],materials=[];
 const material=(color,metalness=0)=>{const m=new T.MeshStandardMaterial({color,roughness:.7,metalness});materials.push(m);return m};
 const soil=material(0x4b6a56),grass=material(0x6fbc75),wood=material(0x7b573b),leaf=material(0x2a8059),leaf2=material(0x68a678),gold=material(0xf4d586,.25),rock=material(0x748f88),danger=material(0xe67b62),white=material(0xfbf3dc),dark=material(0x25434b),orange=material(0xd98848);
 const shapes={};
 function mesh(g,m,x,y,z,sz){geo.push(g);const o=new T.Mesh(g,m);o.position.set(x,y,z);if(sz)o.scale.set(...sz);scene.add(o);return o}
 const box=(m,x,y,z,w,h,d)=>mesh(new T.BoxGeometry(w,h,d),m,x,y,z);
 for(const g of l.ground){const w=g[1]-g[0];box(soil,(g[0]+g[1])/2,-1.12,-1.3,w,2.25,3);box(grass,(g[0]+g[1])/2,-.06,-1.1,w,.2,3.3);}
 for(const p of l.ledges){box(wood,p[0],p[1]-.18,-.65,p[2],.35,1.7);box(grass,p[0],p[1],-.65,p[2],.14,1.85)}
 for(const h of l.hazards){mesh(new T.ConeGeometry(.42,.84,4),danger,h,.42,.2).rotation.y=Math.PI/4;}
 for(let x=-3;x<l.length+9;x+=4.5){const n=1+Math.sin(x*7.1)*.23;
  const trunk=mesh(new T.CylinderGeometry(.23,.38,2.2,6),wood,x,1.1,-5);
  mesh(new T.ConeGeometry(1.7,3.8,7),x%2?leaf:leaf2,x,3.35,-5,[n,n,1]);
  const b=mesh(new T.IcosahedronGeometry(1.6,0),rock,x+2,-1.65,-9,[2.8,1.45,1.1]);b.material=rock;
  trunk.rotation.z=.03*Math.sin(x);
 }
 const collect=[];
 for(const c of run.coins){const o=mesh(new T.TorusGeometry(.23,.083,7,12),gold,c.x,c.y,-.05);collect.push({o,c})}
 const gemObj=mesh(new T.OctahedronGeometry(.4),gold,l.gem,2.1,.0);
 const checkpoints=l.checkpoints.map(x=>{box(white,x,.92,-.4,.08,1.8,.1);return mesh(new T.ConeGeometry(.28,.55,4),gold,x+.25,1.53,-.4)});
 box(gold,l.length-1,1.65,-.6,.15,3.3,.15);const portal=mesh(new T.TorusGeometry(1.17,.17,10,24),gold,l.length-1,2,-.6);
 const hero=new T.Group();scene.add(hero);
 const nativeModel=window.NJ35?.getAdventureAvatar?.(pet.id);
 if(nativeModel){
  const bounds=new T.Box3().setFromObject(nativeModel);
  const center=bounds.getCenter(new T.Vector3()),size=bounds.getSize(new T.Vector3());
  const factor=1.65/Math.max(.1,size.y);
  nativeModel.scale.multiplyScalar(factor);
  nativeModel.position.set(-center.x*factor,-bounds.min.y*factor,-center.z*factor);
  hero.add(nativeModel);
  nativeModel.traverse(o=>{
   if(o.geometry)geo.push(o.geometry);
   if(o.material)for(const m of (Array.isArray(o.material)?o.material:[o.material]))materials.push(m);
  });
 }else{
 function part(g,m,x,y,z,scale){const o=new T.Mesh(g,m);o.position.set(x,y,z);if(scale)o.scale.set(...scale);hero.add(o);geo.push(g);return o}
 const sphere=(m,x,y,z,sx,sy,sz)=>part(new T.SphereGeometry(1,11,8),m,x,y,z,[sx,sy,sz]);
 if(pet.type==='tiger'){
  sphere(orange,0,.75,0,.61,.37,.35);sphere(orange,.46,.98,.05,.29,.29,.28);
  for(const x of [-.35,.33])for(const z of [-.23,.24])sphere(orange,x,.33,z,.11,.33,.12);
  for(let i=0;i<4;i++)part(new T.BoxGeometry(.07,.27,.71),dark,-.29+i*.2,1.06,.05);
  sphere(white,.67,.84,.16,.16,.10,.2);
 }else if(pet.type==='bird'){
  sphere(orange,0,.83,0,.38,.49,.25);sphere(white,.11,1.34,0,.30,.27,.28);
  sphere(gold,.38,1.38,.13,.36,.17,.22);
  sphere(dark,-.30,.95,.06,.29,.14,.52);sphere(dark,.30,.95,.06,.29,.14,.52);
 }else if(pet.type==='spirit'){
  sphere(white,0,1.1,0,.4,.46,.35);sphere(dark,0,1.56,0,.43,.25,.4);
  for(const x of [-.22,0,.22])sphere(dark,x,.45,.06,.06,.45,.06);
 }else{
  sphere(leaf2,0,.8,0,.42,.47,.33);sphere(white,.24,1.04,.18,.28,.29,.25);
  sphere(gold,-.22,.41,.12,.14,.35,.16);
 }
 const eyes=part(new T.SphereGeometry(.055,9,6),dark,.34,1.13,.35);eyes.scale.set(1,1,.7);
 }
 function draw(){
  if(!run)return;
  const viewportW=Math.max(200,canvas.clientWidth||window.innerWidth),viewportH=Math.max(140,canvas.clientHeight||window.innerHeight),aspect=viewportW/viewportH,hh=aspect<.88?7:4.8;
  camera.left=-hh*aspect;camera.right=hh*aspect;camera.top=hh;camera.bottom=-hh;
  camera.position.set(run.cameraX,3.4,19);camera.lookAt(run.cameraX,1.6,0);camera.updateProjectionMatrix();
  hero.position.set(run.x,run.y+(pet.type==='spirit'?.08:0),1.2);hero.scale.x=run.heroFacing;
  hero.rotation.z=run.vx*.015;hero.visible=run.hurtUntil<=0||Math.floor(run.seconds*13)%2===0;
  portal.rotation.z=run.seconds*.3;
  collect.forEach(({o,c})=>{o.visible=!c.got;o.rotation.y=run.seconds*1.75});
  gemObj.visible=!run.gem.got;gemObj.rotation.y=run.seconds*1.5;
  renderer.render(scene,camera);
 }
 render3d={draw,resize(w,h,ratio){renderer.setPixelRatio(ratio);renderer.setSize(w,h,false)},
 dispose(){try{renderer.dispose();renderer.forceContextLoss?.();}catch(_){}geo.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());}};
 resize();
}
function draw2d(){
 if(!ctx||!run)return;
 const w=canvas.width,h=canvas.height;
 ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle='#92d9be';ctx.fillRect(0,0,w,h);
 const narrow=w/h<.8;const unit=Math.min(w/(narrow?9:14.8),h/9),sx=x=>w*.46+(x-run.cameraX)*unit,sy=y=>h*.66-y*unit;
 ctx.fillStyle='#b3e5cb';for(let x=0;x<run.level.length+12;x+=6){ctx.beginPath();ctx.arc(sx(x),sy(-1),unit*3,Math.PI,2*Math.PI);ctx.fill();}
 ctx.fillStyle='#3d8366';for(const g of run.level.ground){ctx.fillRect(sx(g[0]),sy(0),Math.max(0,(g[1]-g[0])*unit),h-sy(0));ctx.fillStyle='#7cbd72';ctx.fillRect(sx(g[0]),sy(.08),Math.max(0,(g[1]-g[0])*unit),unit*.25);ctx.fillStyle='#3d8366'}
 ctx.fillStyle='#896b4d';for(const p of run.level.ledges){ctx.fillRect(sx(p[0]-p[2]/2),sy(p[1]),p[2]*unit,.3*unit)}
 ctx.fillStyle='#e9876b';for(const x of run.level.hazards){ctx.beginPath();ctx.moveTo(sx(x-.45),sy(0));ctx.lineTo(sx(x),sy(.82));ctx.lineTo(sx(x+.45),sy(0));ctx.fill()}
 ctx.fillStyle='#f6d27d';for(const c of run.coins){if(c.got)continue;ctx.beginPath();ctx.arc(sx(c.x),sy(c.y),unit*.20,0,Math.PI*2);ctx.fill()}
 if(!run.gem.got){ctx.save();ctx.translate(sx(run.gem.x),sy(run.gem.y));ctx.rotate(Math.PI/4);ctx.fillRect(-unit*.25,-unit*.25,unit*.5,unit*.5);ctx.restore()}
 ctx.fillStyle='#ffecc5';ctx.fillRect(sx(run.level.length-1),sy(3),unit*.1,unit*3);
 for(const x of run.level.checkpoints){ctx.fillRect(sx(x),sy(1.5),unit*.07,unit*1.5)}
 if(run.hurtUntil<=0||Math.floor(run.seconds*13)%2===0){
 ctx.fillStyle=pet.type==='tiger'?'#df9048':pet.type==='spirit'?'#fff0ca':pet.type==='bird'?'#d8a15c':'#449a79';
 ctx.beginPath();ctx.ellipse(sx(run.x),sy(run.y+.7),unit*.39,unit*.51,0,0,Math.PI*2);ctx.fill();
 ctx.fillStyle='#193944';ctx.fillRect(sx(run.x+.16),sy(run.y+1),unit*.07,unit*.07);
 }
}
function hud(){
 $('#njaStage').textContent=(Math.floor(levelIndex/LEVELS_PER_WORLD)+1)+'—'+(levelIndex%LEVELS_PER_WORLD+1)+' · '+Math.round(run.x/run.level.length*100)+'%';
 $('#njaCoins').textContent='✦ '+run.score+(run.sigils.length?' · ◇ '+run.sigils.filter(v=>v.got).length+'/'+run.sigils.length:'');
 $('#njaLives').textContent='♥ '.repeat(run.health).trim();
 $('#njaFill').style.width=clamp(run.x/run.level.length*100,0,100)+'%';
}
function loop(t){
 if(!opened||!run){raf=0;return}
 if(!last)last=t;
 const dt=Math.min(.055,(t-last)/1000);last=t;
 if(playing&&!document.hidden){
  accumulator+=dt;let n=0;
  while(accumulator>=1/60&&n<4&&playing){physics(1/60);accumulator-=1/60;n++}
  if(n===4)accumulator=0;
 }
 if(render3d)render3d.draw();else draw2d();
 if(playing&&t-lastUi>100){hud();lastUi=t}
 raf=requestAnimationFrame(loop);
}
function pause(){if(!playing)return;playing=false;clearInput();present('Petualangan dijeda','<p>Checkpoint hanya berlaku selama level ini. Progres selesai tersimpan ketika kamu mencapai gerbang.</p>',[['resume','▶ Lanjutkan'],['retry','↻ Ulang level'],['levels','Pilih level'],['exit','Kembali ke Habitat']]);}
function exit(){
 opened=false;playing=false;clearInput();importToken++;cancelAnimationFrame(raf);raf=0;last=0;run=null;menu.innerHTML='';root.hidden=true;
 if(render3d){render3d.dispose();render3d=null}ctx=null;overlay.hidden=false;
 const scene=document.getElementById('nj35');if(scene)scene.hidden=returnHidden;
 document.body.classList.remove('nja-playing');
 window.NUSAJIWA_TAMAGOTCHI?.refresh?.();
}
function open(){
 if(opened)return;
 const p=getPet();if(!p){window.NUSAJIWA_TAMAGOTCHI?.open?.('collection');return false}
 const scene=document.getElementById('nj35');returnHidden=!!scene?.hidden;
 opened=true;root.hidden=false;
 if(scene)scene.hidden=true;
 document.body.classList.add('nja-playing');
 levelMenu();set2D();resize();const token=++importToken;tryThree(token);
 return true;
}
root.addEventListener('click',e=>{const b=e.target.closest('button[data-nja]');if(!b)return;const a=b.dataset.nja,n=Number(b.dataset.value);
 if(a==='exit')exit();
 else if(a==='pause')pause();
 else if(a==='levels')levelMenu();
 else if(a==='level')begin(n);
 else if(a==='resume'){mode='play';playing=true;overlay.hidden=true;last=0}
 else if(a==='retry')begin(levelIndex);
 else if(a==='next')begin(levelIndex+1);
});
for(const btn of root.querySelectorAll('[data-hold]')){
 const key=btn.dataset.hold;
 btn.addEventListener('pointerdown',e=>{e.preventDefault();btn.setPointerCapture?.(e.pointerId);setInput(key,true)});
 for(const type of ['pointerup','pointercancel','lostpointercapture'])btn.addEventListener(type,e=>{setInput(key,false);e.preventDefault()});
}
const keyNames={ArrowLeft:'left',KeyA:'left',ArrowRight:'right',KeyD:'right',ArrowUp:'jump',Space:'jump',KeyW:'jump',KeyX:'special',KeyJ:'special',KeyK:'jump'};
document.addEventListener('keydown',e=>{if(!opened||!ACTIVE_KEYS.has(e.code)&&!ACTIVE_KEYS.has(e.key))return;e.preventDefault();e.stopImmediatePropagation();
 if(e.key==='Escape'){if(playing)pause();else exit();return}
 if(e.repeat&&['jump','special'].includes(keyNames[e.code]))return;
 if(keyNames[e.code])setInput(keyNames[e.code],true);
},true);
document.addEventListener('keyup',e=>{if(!opened||!keyNames[e.code])return;e.preventDefault();e.stopImmediatePropagation();setInput(keyNames[e.code],false)},true);
window.addEventListener('blur',()=>{if(opened&&playing)pause()});
document.addEventListener('visibilitychange',()=>{if(opened&&playing&&document.hidden)pause()});
window.addEventListener('resize',resize,{passive:true});
window.NUSAJIWA_ADVENTURE={version:'8.0',open,close:exit,levels:LEVELS.map(l=>l.name),getSave:()=>JSON.parse(JSON.stringify(progress)),isOpen:()=>opened};
})();