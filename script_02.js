'use strict';
// NUSAJIWA v0.3: an actual side-scrolling playable encounter. No dashboard travel shortcuts.
const JOURNAL_KEY='nusajiwa-field-guide-v03';
let journey=null;
let journeyFrames=0;
let journeyRAF=0;
let journeyLast=0;
const WALK_SPEED=245;
const TRACK_LENGTH=2200;
const REGION_COLORS={
 sumatra:['#123e4b','#437a68','#91ab7c','#1e514a'],
 java:['#332e45','#bd836a','#d6b884','#493d43'],
 kalimantan:['#173b51','#4c8976','#afbd87','#285653'],
 sulawesi:['#234d61','#6b978d','#b5c9a2','#38685b'],
 nusa:['#366677','#dba477','#ead39c','#71664d'],
 papua:['#285477','#79a8ae','#b7cc9d','#376658']
};
const FIELD_LORE={
 sumatra:{title:'Jejak Penghuni Rimba',text:'Hutan Sumatra adalah rumah bagi banyak satwa endemik, termasuk Harimau Sumatra. Menjaga tutupan hutan berarti menjaga habitat mereka.'},
 java:{title:'Batuan dari Gunung Api',text:'Obsidian adalah kaca vulkanik alami yang terbentuk saat lava mendingin sangat cepat. Ia bukan batu permata yang tumbuh sebagai kristal.'},
 kalimantan:{title:'Kisah di Tepian Mahakam',text:'Lembuswana dikenal dalam warisan budaya Kutai Kartanegara. Wujud fantasi di permainan ini bukan pengganti simbol tradisionalnya.'},
 sulawesi:{title:'Rahasia Endemisme',text:'Sulawesi menjadi rumah bagi satwa endemik seperti anoa, babirusa, maleo, dan tarsius. Informasi lengkapnya akan hadir di Kodex.'},
 nusa:{title:'Pulau Komodo',text:'Komodo adalah spesies kadal yang hidup alami di beberapa pulau Nusa Tenggara Timur. Bentuk elemental hanyalah fantasi NUSAJIWA.'},
 papua:{title:'Tarian Cenderawasih',text:'Burung-burung cenderawasih terdiri dari berbagai spesies, terkenal karena bulu dan perilaku pertunjukan yang beragam.'}
};
const OLD_PET_SVG=petSVG;
function specialEvolutionOrnament(p){
  if(p.phase===0)return '';
  const color=p.phase===7?(STONES[p.legend]?.aura||'#ffeab1'):'#ffecbe';
  if(p.phase<=2)return `<g opacity=".84"><circle cx="136" cy="190" r="7" fill="#ffb7a6"/><circle cx="226" cy="190" r="7" fill="#ffb7a6"/><path d="M167 258q15 9 30 0" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round"/></g>`;
  if(p.phase===3)return '<g opacity=".65" fill="#fff4b7"><circle cx="112" cy="93" r="4"/><circle cx="251" cy="77" r="3"/><path d="M192 50l5 14 14 5-14 5-5 14-5-14-14-5 14-5Z"/></g>';
  if(p.phase===4)return '<g opacity=".75" fill="#f8d8a0"><path d="M90 124l18-31 12 28Z"/><path d="M218 91l16-30 15 32Z"/><circle cx="278" cy="91" r="4"/></g>';
  if(p.phase===5)return '<g opacity=".62" fill="none" stroke="#eedaa5" stroke-width="2"><path d="M80 226Q45 142 103 93M288 95Q344 158 298 225" stroke-dasharray="5 9"/></g>';
  if(p.phase===6)return '<g opacity=".85"><path d="M114 95q25-23 45-16m42-3q30-13 50 13" stroke="#e2e5d2" fill="none" stroke-width="8" stroke-linecap="round"/><path d="M68 186q-20-44 6-80M293 91q24 18 20 59" fill="none" stroke="#c8d5c6" stroke-width="4"/></g>';
  if(p.phase===7){
    const a=p.legend;
    const elemental={
      fire:'<path d="M65 220q-21-53 19-91-9 45 19 47-3-46 26-77-11 56 14 71M235 126q9-45 34-65-10 44 28 69 13 33-4 65"/>',
      water:'<path d="M73 177q-12-39 24-53-9 29 22 35m152-28q39 17 22 50-18-18-33 7M115 260q55 23 128 0"/>',
      wind:'<path d="M54 126q55-58 102-17M211 87q72-33 112 25M63 244q32 30 81 20M255 240q46 11 72-36"/>',
      diamond:'<path d="M73 108l33-49 31 52-19 49-45-8ZM251 83l28-41 35 41-11 45-51-2ZM160 255l22-29 30 26-25 36Z"/>',
      nature:'<path d="M85 225q-35-49 6-95 7 35 28 33 5-43 37-50-4 57-31 75M248 127q15-38 52-40-17 31-5 67-12 34-44 29"/>',
      shadow:'<path d="M78 92q-52 70 15 117-61 0-59-56t44-61ZM296 90q55 51 19 116-36 47-81 40 71-41 62-156Z"/>',
      thunder:'<path d="M107 42L84 103h33l-33 77 65-98h-36l21-40ZM259 64l-25 65h34l-37 91 77-109h-42l21-47Z"/>',
      spirit:'<path d="M91 230q-61-70-14-138 28-43 59-35M243 58q58-8 78 53 24 74-41 124"/>'
    };
    return `<defs><filter id="legendGlow"><feGaussianBlur stdDeviation="5"/></filter></defs><g fill="none" stroke="${color}" stroke-width="8" opacity=".22" filter="url(#legendGlow)">${elemental[a]||elemental.spirit}</g><g fill="${a==='diamond'?'#e0f0ff':'none'}" stroke="${color}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" opacity=".9">${elemental[a]||elemental.spirit}</g><g fill="${color}" opacity=".8"><circle cx="93" cy="73" r="5"/><circle cx="301" cy="203" r="4"/><path d="M181 24l8 19 19 8-19 8-8 19-8-19-19-8 19-8Z"/></g>`;
  }
  return '';
}
// Eight growth stages are visibly differentiated (not only labels or the size of the base illustration).
petSVG=function(p,small=false){
  let svg=OLD_PET_SVG(p,small);
  if(!p)return svg;
  const growth=['1','.69','.79','.91','.98','1.045','1.1','1.16'][p.phase]||'1';
  svg=svg.replace(/scale\((?:\.84|1\.09|1)\)/,'scale('+growth+')');
  const ornament=specialEvolutionOrnament(p);
  return svg.replace('</svg>',ornament+'</svg>');
};
const OLD_EXPLORE=explore;
explore=function(){return OLD_EXPLORE().replace('Sentuh satu pulau untuk memulai perjalanan dan menemukan mineral yang tersimpan.','Pilih pulau untuk berjalan, mengumpulkan mineral, dan menemukan kisah rahasia secara langsung.').replace('Setiap perjalanan membutuhkan 10 Mutiara · Temukan 3 mineral · +30 pengalaman','GERAKKAN SAHABATMU ◀ ▶ · KUMPULKAN 3 MINERAL · TEMUKAN GERBANG PULANG');};
const OLD_HOME=home;
home=function(){
  const original=OLD_HOME();
  if(!current())return original;
  return original.replace('<div class="home-content">', '<div class="habitat-foreground" aria-label="Objek habitat yang dapat dimainkan"><button class="habitat-butterfly" data-adventure="butterfly" title="Sentuh kupu-kupu" aria-label="Ajak kupu-kupu bermain">🦋</button><button class="habitat-pond" data-adventure="pond" title="Percikan air" aria-label="Main di air">💧</button><button class="habitat-seed" data-adventure="seed" title="Temukan biji rimba" aria-label="Temukan biji rimba">✦</button></div><div class="home-content">');
};
let habitatCooldown=0;
function habitatObject(kind){
  const p=current();if(!p)return;
  const now=Date.now();if(now-habitatCooldown<3500){toast('Sahabatmu masih bermain.');return;}habitatCooldown=now;
  const effects={butterfly:{stat:'happy',val:6,glyph:'🦋',speech:'Seekor kupu-kupu menghampiri!',xp:4},pond:{stat:'clean',val:5,glyph:'💧',speech:'Percikan air segar!',xp:3},seed:{stat:'smart',val:4,glyph:'🌱',speech:'Ada jejak tumbuhan rimba!',xp:3}};
  const e=effects[kind];if(!e)return;
  p.stats[e.stat]=cap(p.stats[e.stat]+e.val);p.stats.bond=cap(p.stats.bond+2);
  if(p.phase<7)applyXP(p,e.xp);
  save();render();burst(e.glyph,40+Math.random()*35,61);
  toast(e.speech);sound(420,700);
}
const TRAVEL_OBJECT_X=[310,600,990,1290,1580,1830];
const STORY_OBJECT_X=[780,1660];
function prng(i){let x=Math.sin((i+1)*91.7)*43758.5453;return x-Math.floor(x);}
function playExpedition(region){
  if(journey)return;
  const r=REGIONS[region];const p=current();
  if(!r||!p)return;
  if(state.pearls<r.cost){toast('Kamu membutuhkan '+r.cost+' Mutiara untuk membuka rute.');return;}
  if(p.stats.energy<10){toast('Energi sahabatmu rendah. Istirahat dahulu.');return;}
  journey={region,x:130,v:0,jump:0,jumpSpeed:0,ground:0,dir:1,camera:0,keys:{left:false,right:false},items:TRAVEL_OBJECT_X.map((x,i)=>({x,found:false,material:r.loot[(i+Math.floor(prng(Date.now()%999)*3))%r.loot.length]})),stories:STORY_OBJECT_X.map((x,i)=>({x,read:false})),loots:[],endX:2155,started:performance.now(),toast:'Kumpulkan mineral di jalan menuju gerbang cahaya.',toastUntil:performance.now()+4500,sourceCurrent:current()?.id,completed:false};
  const root=document.getElementById('modalRoot');
  root.innerHTML=`<div class="journey-stage" role="dialog" aria-label="Ekspedisi ${escapeHTML(r.name)}" aria-modal="true">
    <canvas id="journeyCanvas" width="960" height="540" aria-label="Lintasan petualangan. Gerak dengan tombol kiri dan kanan."></canvas>
    <div class="journey-fade"></div>
    <div class="journey-title"><small>✦ JEJAK NUSANTARA</small><strong>${escapeHTML(r.name)}</strong></div>
    <div class="journey-top"><div class="journey-counter">💠 <span id="foundCount">0</span>/3 &nbsp; <span class="journey-score-note">mineral ditemukan</span></div><button class="journey-exit" data-journey="exit">✕ Keluar</button></div>
    <div id="journeyMessage" class="journey-message" role="status">${journey.toast}</div>
    <div class="journey-controls" aria-label="Kontrol berjalan"><div class="journey-dpad"><button data-journey="left" aria-label="Jalan ke kiri">◀</button><button data-journey="right" aria-label="Jalan ke kanan">▶</button></div><div class="journey-actions"><button data-journey="look" aria-label="Amati tanda di sekitar">✧<small>Amati</small></button><button data-journey="jump" aria-label="Lompat">↑<small>Lompat</small></button></div></div>
    <div class="journey-tip">Geser ◀ ▶ untuk berjalan · Lompat untuk melewati batang pohon · Dekati cahaya untuk mengumpulkan mineral</div>
  </div>`;
  modalOpen=true;
  const canvas=document.getElementById('journeyCanvas');journey.ctx=canvas.getContext('2d');resizeJourneyCanvas();
  const petMarkup=petSVG(p).replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" ');
  const petImg=new Image();petImg.onload=()=>{if(journey)journey.image=petImg;};petImg.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(petMarkup);
  journeyLast=performance.now();journeyRAF=requestAnimationFrame(frameJourney);
  const text=document.getElementById('journeyMessage');if(text)text.classList.add('show');
  sound(320,470);
}
function bubble(text,ms=2700){if(!journey)return;journey.toast=text;journey.toastUntil=performance.now()+ms;const e=document.getElementById('journeyMessage');if(e){e.textContent=text;e.classList.add('show');}}
function adventureJump(){if(journey&&journey.jump<1&&journey.jumpSpeed===0){journey.jumpSpeed=530;sound(500,700);}}
function adventureLook(){
  if(!journey)return;
  const found=journey.stories.find(x=>!x.read&&Math.abs(journey.x-x.x)<135);
  if(found){found.read=true;const r=FIELD_LORE[journey.region];state.fieldNotes=state.fieldNotes||{};state.fieldNotes[journey.region]={title:r.title,story:r.text,discovered:Date.now()};save();bubble('📜 '+r.title+': '+r.text,10000);sound(340,720);return;}
  if(Math.abs(journey.x-journey.endX)<125&&journey.loots.length>=3){finishAdventure(true);return;}
  bubble('Dekati prasasti bercahaya untuk mengungkap kisah wilayah ini.',2300);
}
function resizeJourneyCanvas(){
  const j=journey;if(!j)return;
  const canvas=document.getElementById('journeyCanvas');if(!canvas)return;
  const ratio=Math.min(1.6,window.devicePixelRatio||1);
  const w=Math.max(320,Math.round(canvas.clientWidth||window.innerWidth));
  const h=Math.max(400,Math.round(canvas.clientHeight||window.innerHeight));
  j.pixelRatio=ratio;j.screenW=w;j.screenH=h;
  canvas.width=Math.round(w*ratio);canvas.height=Math.round(h*ratio);
}
window.addEventListener('resize',resizeJourneyCanvas);
function frameJourney(now){
  if(!journey)return;
  const dt=Math.min(.05,(now-journeyLast)/1000||.016);journeyLast=now;
  const j=journey;journeyFrames++;
  let move=(j.keys.right?1:0)-(j.keys.left?1:0);
  if(move)j.dir=move;
  j.v=move*WALK_SPEED;
  j.x=Math.max(75,Math.min(TRACK_LENGTH-38,j.x+j.v*dt));
  if(j.jumpSpeed||j.jump){j.jump+=j.jumpSpeed*dt;j.jumpSpeed-=1390*dt;if(j.jump<=0){j.jump=0;j.jumpSpeed=0;}}
  j.camera+=(Math.max(0,Math.min(TRACK_LENGTH-(j.screenW||960),j.x-(j.screenW||960)*.35))-j.camera)*Math.min(1,dt*5);
  j.items.forEach(o=>{if(!o.found&&Math.abs(j.x-o.x)<48&&j.jump<92){o.found=true;j.loots.push(o.material);sound(520,850);burst(MATERIALS[o.material][0],52,48);bubble('✦ '+MATERIALS[o.material][1]+' berhasil ditemukan!');const count=document.getElementById('foundCount');if(count)count.textContent=Math.min(3,j.loots.length);}});
  for(const obstacle of [540,1200,1690]){if(Math.abs(j.x-obstacle)<15&&j.jump<40&&j.v>0){j.x=obstacle-15;j.v=0;if(jumpAutoEnable())adventureJump();bubble('Ada batang pohon! Tekan ↑ Lompat untuk melewatinya.',1700);break;}if(Math.abs(j.x-obstacle)<15&&j.jump<40&&j.v<0){j.x=obstacle+15;j.v=0;break;}}
  if(Math.abs(j.x-j.endX)<63&&j.loots.length>=3){finishAdventure(true);return;}
  if(Math.abs(j.x-j.endX)<63&&j.loots.length<3&&performance.now()>(j.warnTime||0)+2000){bubble('Gerbang memerlukan sedikitnya 3 mineral ✨');j.warnTime=performance.now();}
  drawAdventure(now);
  if(j.toastUntil<now){const box=document.getElementById('journeyMessage');if(box)box.classList.remove('show');}
  journeyRAF=requestAnimationFrame(frameJourney);
}
// Never auto-teleport over an obstacle; the player chooses to jump.
function jumpAutoEnable(){return false;}
function adventureText(ctx,text,x,y,size=20,color='#f7e6b7',align='center') {ctx.save();ctx.font=`700 ${size}px system-ui`;ctx.textAlign=align;ctx.shadowColor='#000a';ctx.shadowBlur=9;ctx.fillStyle=color;ctx.fillText(text,x,y);ctx.restore();}
function drawAdventure(now){
 const j=journey;if(!j)return;const ctx=j.ctx,W=j.screenW||960,H=j.screenH||540,cam=j.camera,pal=REGION_COLORS[j.region],p=now*.001;
 ctx.setTransform(j.pixelRatio||1,0,0,j.pixelRatio||1,0,0);ctx.clearRect(0,0,W,H);
 const gradient=ctx.createLinearGradient(0,0,0,H);gradient.addColorStop(0,pal[0]);gradient.addColorStop(.72,pal[1]);gradient.addColorStop(1,pal[2]);ctx.fillStyle=gradient;ctx.fillRect(0,0,W,H);
 ctx.save();ctx.globalAlpha=.45;ctx.fillStyle='#ffefd0';ctx.beginPath();ctx.arc(730-cam*.012,100,56,0,Math.PI*2);ctx.fill();ctx.restore();
 ctx.save();ctx.translate(0,Math.max(0,H-540)*.66);
 // Sky and hills scroll more slowly than the ground (parallax), so traversing visibly changes the world.
 for(let layer=0;layer<3;layer++){
   ctx.beginPath();const par=.13+layer*.2,base=210+layer*49;
   ctx.moveTo(0,H);ctx.lineTo(0,base);
   for(let k=0;k<=25;k++){const xx=k*43,world=xx+cam*par;const wav=Math.sin(world*.008+layer*.9)*29+Math.sin(world*.015+layer)*20;ctx.lineTo(xx,base+wav);}
   ctx.lineTo(W,H);ctx.fillStyle=[pal[0],pal[3],pal[2]][layer];ctx.globalAlpha=[.44,.67,.45][layer];ctx.fill();ctx.globalAlpha=1;
 }
 // Trees, giant flora, boulders, floating insects — drawn at positions in the world, not repeated cards.
 for(let k=0;k<32;k++){
   const worldX=90+k*83+prng(k+8)*33,screenX=worldX-cam*.74;
   if(screenX< -180||screenX>W+180)continue;
   const height=72+prng(k+30)*103;
   ctx.save();ctx.translate(screenX,355);ctx.scale(.85+prng(k+7)*.6,1);
   ctx.fillStyle=pal[3];ctx.fillRect(-7,-height,14,height+80);
   if(j.region==='nusa'){
     // Coconut-palm silhouettes rather than northern pine trees in Nusa Tenggara.
     ctx.strokeStyle=pal[3];ctx.lineWidth=7;
     for(let f=0;f<6;f++){const a=f*Math.PI/3;ctx.beginPath();ctx.moveTo(0,-height);ctx.quadraticCurveTo(Math.cos(a)*32,-height-39,Math.cos(a)*67,-height-16+Math.sin(a)*35);ctx.stroke();}
   }else if(j.region==='java'){
     ctx.fillStyle=pal[0];ctx.beginPath();ctx.moveTo(-38,-height+24);ctx.lineTo(0,-height-45);ctx.lineTo(43,-height+24);ctx.fill();
   }else{
     for(let c=0;c<4;c++){ctx.beginPath();ctx.arc((c-1.5)*22,-height+(c%2)*21,38,0,Math.PI*2);ctx.fillStyle=pal[3];ctx.fill();}
   }ctx.restore();
 }
 // Walkable ground / thick soil.
 const soil=ctx.createLinearGradient(0,352,0,H);soil.addColorStop(0,pal[3]);soil.addColorStop(.18,'#1e403b');soil.addColorStop(1,'#092f32');ctx.fillStyle=soil;ctx.fillRect(0,370,W,Math.max(170,H-370));
 ctx.fillStyle='#98af78';ctx.fillRect(0,367,W,6);ctx.fillStyle='#88b779aa';
 for(let i=0;i<100;i++){const x=i*27-cam%27;const blade=3+prng(i+4)*8;ctx.fillRect(x,370-blade,2,blade);}
 for(let i=0;i<50;i++){const x=(i*53-cam*.91)%(W+90),y=411+prng(i+301)*125;ctx.fillStyle=i%3?'#7197823d':'#ffe2a132';ctx.beginPath();ctx.ellipse(x<0?x+W+90:x,y,5,2,0,0,Math.PI*2);ctx.fill();}
 // Fallen logs are tiny platformer obstacles, not a random-claim travel button.
 for(const x of [540,1200,1690]){const sx=x-cam;if(sx<-150||sx>W+150)continue;ctx.fillStyle='#4d3f36';ctx.beginPath();ctx.roundRect(sx-15,337,34,39,7);ctx.fill();ctx.strokeStyle='#d5ae75';ctx.lineWidth=4;ctx.stroke();ctx.beginPath();ctx.ellipse(sx,353,6,11,0,0,Math.PI*2);ctx.stroke();}
 // Rock collectibles: six physical objects to approach, each tracked once.
 j.items.forEach((o,i)=>{if(o.found)return;const x=o.x-cam;if(x<-60||x>W+60)return;const bob=Math.sin(p*2.5+i)*7;ctx.save();ctx.translate(x,307+bob);ctx.shadowBlur=29;ctx.shadowColor='#ffdc83';ctx.fillStyle=i%2?'#95ebe3':'#ffe4a2';ctx.beginPath();ctx.moveTo(0,-29);ctx.lineTo(17,-9);ctx.lineTo(11,17);ctx.lineTo(-11,17);ctx.lineTo(-17,-9);ctx.closePath();ctx.fill();ctx.strokeStyle='#fffbe2';ctx.lineWidth=2;ctx.stroke();ctx.shadowBlur=0;ctx.fillStyle='#ffffff9a';ctx.beginPath();ctx.moveTo(0,-20);ctx.lineTo(9,-7);ctx.lineTo(-5,6);ctx.closePath();ctx.fill();ctx.restore();});
 j.stories.forEach((o,i)=>{const x=o.x-cam;if(x< -70||x>W+70)return;ctx.fillStyle=o.read?'#47605b':'#c1a276';ctx.fillRect(x-13,295,26,74);ctx.fillStyle='#e9c27b';ctx.beginPath();ctx.arc(x,288,21,0,Math.PI*2);ctx.fill();adventureText(ctx,o.read?'✓':'?',x,295,22,'#214e50');if(Math.abs(j.x-o.x)<135&&!o.read)adventureText(ctx,'AMATI ✧',x,251,13);});
 // Glowing finish portal.
 {const x=j.endX-cam;if(x>-130&&x<W+120){ctx.save();ctx.translate(x,285);ctx.shadowColor='#ffde8e';ctx.shadowBlur=30;ctx.strokeStyle=j.loots.length>=3?'#ffe09c':'#708991';ctx.lineWidth=9;ctx.beginPath();ctx.ellipse(0,0,49,84,0,0,Math.PI*2);ctx.stroke();ctx.strokeStyle='#ffd38d';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(0,0,30,70,0,0,Math.PI*2);ctx.stroke();ctx.restore();adventureText(ctx,j.loots.length>=3?'GERBANG PULANG':'3 MINERAL DIBUTUHKAN',x,181,13);}}
 // Main character follows thumb/keyboard input and jumps.
 const petScreen=j.x-cam,foot=366-j.jump,walk=j.v!==0?Math.sin(p*14)*3:Math.sin(p*2.3)*3;
 ctx.save();ctx.globalAlpha=.45;ctx.fillStyle='#071d27';ctx.beginPath();ctx.ellipse(petScreen,380,44-Math.min(j.jump,60)*.13,8,0,0,Math.PI*2);ctx.fill();ctx.restore();
 if(j.image?.complete){ctx.save();ctx.translate(petScreen,foot+walk);ctx.scale(j.dir<0?-1:1,1);ctx.drawImage(j.image,-72,-108,144,120);ctx.restore();}else adventureText(ctx,'🥚',petScreen,foot-25,56);
 for(let i=0;i<26;i++){let x=(i*157+Math.sin(p*.3+i)*25-cam*(.1+prng(i)*.5))%(W+55);if(x<0)x+=W+55;const y=100+prng(i+97)*300+Math.sin(p*1.3+i)*14;ctx.fillStyle=i%3?'#ffeaa654':'#fff6bd9c';ctx.beginPath();ctx.arc(x,y,1+prng(i+11)*2.1,0,Math.PI*2);ctx.fill();}
 ctx.restore();
}
function finishAdventure(won=false){
 if(!journey)return;
 const j=journey;journey=null;cancelAnimationFrame(journeyRAF);
 modalOpen=false;document.getElementById('modalRoot').innerHTML='';
 if(!won){toast('Ekspedisi dibatalkan. Mineral belum disimpan.');return;}
 const region=REGIONS[j.region];const p=state.pets.find(v=>v.id===j.sourceCurrent);
 const unique=[...j.loots];unique.forEach(it=>state.inventory[it]=(state.inventory[it]||0)+1);
 const pearls=15+Math.min(15,unique.length*3);state.pearls=state.pearls-region.cost+pearls;
 state.regionVisits[j.region]=(state.regionVisits[j.region]||0)+1;
 if(p){p.stats.energy=cap(p.stats.energy-8);p.stats.happy=cap(p.stats.happy+6);p.stats.bond=cap(p.stats.bond+2);p.affinity.wind=(p.affinity.wind||0)+1;if(p.phase<7)applyXP(p,20+unique.length*3);}
 eventLog('Menyelesaikan petualangan '+region.name+' dengan '+unique.length+' temuan.');
 save();render();sound(440,920);burst('✦');
 showModal('<div class="chapter-kicker">✦ MISI EKSPEDISI SELESAI ✦</div><h2>Gerbang Pulang Terbuka</h2><p>Kamu dan '+escapeHTML(p?.name||'sahabatmu')+' sudah menyelesaikan rute '+escapeHTML(region.name)+' secara langsung!</p><div class="loot-row">'+unique.map(it=>'<span>'+MATERIALS[it][0]+' '+MATERIALS[it][1]+'</span>').join('')+'</div><p><b>+'+(20+unique.length*3)+' XP</b> • <b>+'+(pearls-region.cost)+' ✧ bersih</b></p><p class="modal-disclaimer">Penemuan mineral telah tersimpan. Coba cari prasasti pada kunjungan berikutnya.</p><button class="primary-button" data-action="close">Kembali ke Dunia Nusantara</button>');
}
const touchJourneyPointers=new Map();
function stopJourneyInputs(){if(journey){journey.keys.left=false;journey.keys.right=false;}touchJourneyPointers.clear();}
document.addEventListener('click',(e)=>{
 const habitat=e.target.closest('[data-adventure]');
 if(habitat){e.preventDefault();e.stopImmediatePropagation();habitatObject(habitat.dataset.adventure);return;}
 const travel=e.target.closest('[data-action="travel"]');
 if(travel){e.preventDefault();e.stopImmediatePropagation();playExpedition(travel.dataset.region);return;}
 const journeyAction=e.target.closest('[data-journey]');
 if(journeyAction){e.preventDefault();e.stopImmediatePropagation();const a=journeyAction.dataset.journey;if(a==='exit')finishAdventure(false);else if(a==='jump')adventureJump();else if(a==='look')adventureLook();return;}
},true);
document.addEventListener('pointerdown',e=>{
 const button=e.target.closest('[data-journey="left"],[data-journey="right"]');
 if(!button||!journey)return;
 e.preventDefault();const dir=button.dataset.journey;touchJourneyPointers.set(e.pointerId,dir);journey.keys[dir]=true;button.setPointerCapture?.(e.pointerId);
},{passive:false});
function releasePointer(e){if(!journey)return;const dir=touchJourneyPointers.get(e.pointerId);if(dir){touchJourneyPointers.delete(e.pointerId);journey.keys[dir]=[...touchJourneyPointers.values()].includes(dir);}}
document.addEventListener('pointerup',releasePointer);
document.addEventListener('pointercancel',releasePointer);
window.addEventListener('blur',stopJourneyInputs);
document.addEventListener('keydown',e=>{if(!journey||journey.manualPause08)return;if(['ArrowLeft','ArrowRight','ArrowUp','KeyA','KeyD','Space','KeyE','Escape'].includes(e.code))e.preventDefault();if(e.code==='ArrowLeft'||e.code==='KeyA')journey.keys.left=true;if(e.code==='ArrowRight'||e.code==='KeyD')journey.keys.right=true;if(e.code==='ArrowUp'||e.code==='Space')adventureJump();if(e.code==='KeyE')adventureLook();if(e.code==='Escape'){e.stopImmediatePropagation();finishAdventure(false);}},true);
document.addEventListener('keyup',e=>{if(!journey)return;if(e.code==='ArrowLeft'||e.code==='KeyA')journey.keys.left=false;if(e.code==='ArrowRight'||e.code==='KeyD')journey.keys.right=false;},true);
const OLD_CODEX=codex;
codex=function(){
 const original=OLD_CODEX(),notes=Object.values(state.fieldNotes||{});
 if(!notes.length)return original;
 const fragment='<aside class="field-journal"><span>✦ CATATAN PENJELAJAH</span><div>'+notes.map(n=>'<article><b>'+escapeHTML(n.title)+'</b><p>'+escapeHTML(n.story)+'</p></article>').join('')+'</div></aside>';
 return original.replace('<div class="library-note">',fragment+'<div class="library-note">');
};
const OLD_SETTINGS=settingsModal;
settingsModal=function(){OLD_SETTINGS();const pane=document.querySelector('.modal-pane');if(pane)pane.innerHTML=pane.innerHTML.replace('Versi 0.2 — Prototype','Versi 0.3 — Alpha Petualangan 2D');};
// Supports shorter screens via responsive stage and prefers-reduced-motion, while gameplay remains operable.
