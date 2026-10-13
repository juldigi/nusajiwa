'use strict';
/* NUSAJIWA 0.6 | Sungai Cahaya — an actual 2D canvas conservation game.
   Mobile gestures, pointer controls, keyboard, pause on background, protected daily rewards.
   Nothing here represents capturing wild protected animals. The river is a fantasy realm. */
const RIVER_SEED = [
  {title:'Tepi Mahakam',desc:'Menjaga air berarti menjaga rumah banyak kehidupan.'},
  {title:'Sungai yang Hidup',desc:'Tumbuhan tepian sungai membantu menjaga tanah dan tempat berlindung satwa.'},
  {title:'Penjaga Rimba',desc:'Bekantan dapat ditemukan di hutan bakau dan tepian sungai Borneo.'}
];
let river06=null, riverRaf06=0;
function today06(){const t=new Date();return t.getFullYear()+'-'+String(t.getMonth()+1).padStart(2,'0')+'-'+String(t.getDate()).padStart(2,'0');}
function journal06(){
  if(!state.journal06||state.journal06.day!==today06())state.journal06={day:today06(),care:0,harvest:0,river:0,claimed:false};
  return state.journal06;
}
const oldHome06=home;
home=function(){
  let html=oldHome06();if(!current())return html;
  const hour=new Date().getHours(),dark=hour<6||hour>=18;
  const ambience=dark?'🌙 Malam Nusantara':hour<11?'☀ Pagi Nusantara':hour<16?'☀ Siang Nusantara':'🌤 Senja Nusantara';
  html=html.replace('<div class="home-bottom">',
    `<div class="sanctuary-nodes" aria-label="Tempat petualangan kecil">
      <button class="sanctuary-node river-node" data-river06="open" aria-label="Naik perahu di Sungai Cahaya"><span>🛶</span><b>Sungai Cahaya</b><small>Game perahu ↗</small></button>
      <button class="sanctuary-node journal-node" data-river06="journal" aria-label="Buka Gulungan Penjaga"><span>📜</span><b>Gulungan Penjaga</b><small>Misi harian ↗</small></button>
      <span class="sanctuary-clock">${ambience}</span>
    </div><div class="home-bottom">`);
  return html.replace('class="screen home-screen"','class="screen home-screen'+(dark?' moonlit06':' morning06')+'"');
};

function openJournal06(){
  if(!current())return;
  const j=journal06();
  const entries=[
    {name:'Rawat sahabatmu',desc:'Lakukan tiga interaksi perawatan.',value:j.care,target:3,icon:'♡'},
    {name:'Rawat Taman Jiwa',desc:'Petik cahaya dari satu tanaman.',value:j.harvest,target:1,icon:'🌿'},
    {name:'Jaga Sungai Cahaya',desc:'Selesaikan satu patroli sungai.',value:j.river,target:1,icon:'💧'}
  ];
  const ready=entries.every(x=>x.value>=x.target)&&!j.claimed;
  showModal(`<div class="river-journal"><div class="chapter-kicker">✦ CATATAN HARI INI ✦</div><h2>Gulungan Penjaga</h2><p>Satu halaman baru setiap hari. Lakukan kebaikan kecil untuk sahabat dan alam fantasi Nusajiwa.</p>
  <div class="journal-book06">${entries.map(x=>`<div class="journal-line06"><span>${x.icon}</span><div><b>${x.name}</b><small>${x.desc}</small></div><em class="${x.value>=x.target?'complete':''}">${Math.min(x.value,x.target)}/${x.target}</em></div>`).join('')}</div>
  <p class="journal-hint06">${j.claimed?'✦ Hadiah hari ini telah diambil.':'Hadiah saat selesai: 20 Mutiara dan 1 Giok (fantasi).'}</p>
  ${ready?'<button class="primary-button" data-river06="claim">Terima berkah hari ini ✦</button>':'<button class="secondary-button" data-river06="close-journal">Kembali ke habitat</button>'}</div>`);
}
function journalCare06(){const j=journal06();j.care=Math.min(3,j.care+1);save();}
const oldCare06=care;
care=function(action){const p=current();if(!p)return oldCare06(action);const before=p.touches||0;oldCare06(action);if((p.touches||0)>before)journalCare06();};
const oldPlant06=touchPlot05;
touchPlot05=function(i){const before=gardenState05()[i]?.lastHarvest;oldPlant06(i);const after=gardenState05()[i]?.lastHarvest;if(after&&after===today06()&&after!==before){const j=journal06();j.harvest=1;save();}};

function startRiver06(mode='normal'){
  if(!current())return toast('Tetaskan telur dahulu untuk membuka Sungai Cahaya.');
  if(journey||groveOpen05||river06)return;
  // Close any open menu and create an immersive full-screen overlay, not a dashboard.
  closeModal();modalOpen=true;
  const mount=document.getElementById('modalRoot');
  mount.innerHTML=`<section class="river-world06" role="dialog" aria-modal="true" aria-label="Petualangan perahu di Sungai Cahaya">
    <canvas id="riverCanvas06" aria-label="Sungai fantasi. Gerakkan perahu mengumpulkan cahaya dan membersihkan sampah."></canvas>
    <div class="river-fog06"></div>
    <div class="river-head06"><button data-river06="exit" aria-label="Keluar dari Sungai Cahaya">❮</button><div><small>✦ PETUALANGAN 2D ✦</small><h2>Sungai Cahaya</h2></div><button data-river06="pause" aria-label="Jeda permainan">Ⅱ</button><span id="riverTime06">45s</span></div>
    <div class="river-goals06"><span id="riverSeeds06">✧ 0/6 cahaya</span><span id="riverClean06">❧ 0/3 sungai bersih</span><span id="riverHearts06">♡ ♡ ♡</span></div>
    <div class="river-story06" id="riverStory06">Pulihkan cahaya sungai. Ambil ✧ dan bersihkan ♻, hindari batu!</div>
    <div class="river-control06"><button data-river06="left" aria-label="Arahkan perahu ke kiri">◀</button><span>Geser pada sungai atau tekan ◀ ▶</span><button data-river06="right" aria-label="Arahkan perahu ke kanan">▶</button></div>
  </section>`;
  const canvas=document.getElementById('riverCanvas06');
  const r={ctx:canvas.getContext('2d'),canvas,width:390,height:844,scale:1,
    x:.5,vx:0,targetX:.5,keys:{left:false,right:false},objects:[],glows:[],
    collected:0,cleaned:0,hearts:3,remaining:mode==='relax'?65:45,duration:mode==='relax'?65:45,mode,elapsed:0,spawn:0.5,last:performance.now(),
    seed:Math.random()*100,ended:false,paused:false,img:null,px:0,spawnCount:0};
  river06=r;resizeRiver06();
  let svg=petSVG(current());
  // SVG string is generated by the current game character renderer; data URI is local, no server requests.
  if(!svg.includes('xmlns='))svg=svg.replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" ');
  const img=new Image();img.onload=()=>{if(river06===r)r.img=img;};img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
  riverRaf06=requestAnimationFrame(frameRiver06);
  sound(390,600);
}
function resizeRiver06(){
  const r=river06;if(!r)return;
  const rect=r.canvas.getBoundingClientRect();
  r.width=Math.max(280,rect.width||innerWidth);r.height=Math.max(390,rect.height||innerHeight);
  r.scale=Math.min(2,window.devicePixelRatio||1);
  r.canvas.width=Math.round(r.width*r.scale);r.canvas.height=Math.round(r.height*r.scale);
  r.ctx.setTransform(r.scale,0,0,r.scale,0,0);
}
function randRiver06(r){r.seed=(r.seed*9301+49297)%233280;return r.seed/233280;}
function spawnRiver06(r){
  const typeRoll=randRiver06(r);
  const cycle=['glow','trash','glow','rock','glow','trash','lotus'];
  const type=cycle[r.spawnCount++%cycle.length];
  const lane=.18+randRiver06(r)*.64;
  r.objects.push({x:lane,y:-35,type,phase:randRiver06(r)*6.28,velocity:(r.height/5)*(r.mode==='relax'?.65:.85)+randRiver06(r)*25});
}
function frameRiver06(time){
  const r=river06;if(!r||r.ended)return;
  const dt=Math.min(.05,Math.max(0,(time-r.last)/1000));r.last=time;
  if(!document.hidden&&!r.paused){updateRiver06(dt);drawRiver06(time);}
  if(river06===r&&!r.ended)riverRaf06=requestAnimationFrame(frameRiver06);
}
function updateRiver06(dt){
  const r=river06;if(!r||r.ended)return;
  if(r.paused)return;
  r.elapsed+=dt;r.remaining=Math.max(0,r.duration-r.elapsed);
  const step=dt*0.77;
  if(r.keys.left)r.targetX-=step;
  if(r.keys.right)r.targetX+=step;
  r.targetX=Math.min(.88,Math.max(.12,r.targetX));
  r.x+=(r.targetX-r.x)*Math.min(1,dt*9);
  r.spawn-=dt;
  if(r.spawn<=0){spawnRiver06(r);r.spawn=.48+randRiver06(r)*.21;}
  const yBoat=r.height*.77;
  for(let i=r.objects.length-1;i>=0;i--){
    const obj=r.objects[i];obj.y+=obj.velocity*dt;obj.phase+=dt*2.5;
    // Boat hull occupies the lower center of the canvas.
    if(Math.abs(obj.y-yBoat)<33&&Math.abs(obj.x*r.width-r.x*r.width)<33){
      r.objects.splice(i,1);
      if(obj.type==='glow'){r.collected++;bubbleRiver06('+1 cahaya ✧');sound(550,800);}
      else if(obj.type==='trash'){r.cleaned++;bubbleRiver06('Sungai kembali bersih!');sound(480,690);}
      else if(obj.type==='lotus'){r.hearts=Math.min(3,r.hearts+1);bubbleRiver06('Teratai memulihkan perahu ♡');}
      else{r.hearts--;bubbleRiver06('Hati-hati batu sungai!');sound(290,170);}
      if(r.hearts<=0)return finishRiver06(false,'Perahu lelah. Sungai bisa dijelajahi kembali.');
      if(r.collected>=6&&r.cleaned>=3)return finishRiver06(true);
    } else if(obj.y>r.height+48)r.objects.splice(i,1);
  }
  const t=document.getElementById('riverTime06'),s=document.getElementById('riverSeeds06'),c=document.getElementById('riverClean06'),h=document.getElementById('riverHearts06');
  if(t)t.textContent=Math.ceil(r.remaining)+'s';
  if(s)s.textContent='✧ '+Math.min(6,r.collected)+'/6 cahaya';
  if(c)c.textContent='♻ '+Math.min(3,r.cleaned)+'/3 sampah';
  if(h)h.textContent='♡ '.repeat(r.hearts).trim();
  if(r.remaining<=0)finishRiver06(false,'Waktu patroli berakhir. Coba lagi untuk menyelamatkan sungai.');
}
let riverBubbleTimer06=0;
function bubbleRiver06(message){
  const el=document.getElementById('riverStory06');if(!el)return;
  el.textContent=message;el.classList.add('river-feedback06');clearTimeout(riverBubbleTimer06);
  riverBubbleTimer06=setTimeout(()=>{const el=document.getElementById('riverStory06');if(el){el.textContent='✧ Cahaya • ♻ Bersihkan • ◇ Hindari batu';el.classList.remove('river-feedback06');}},1400);
}
function pathRiver06(ctx,points,fill,stroke=null,sw=1){ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=sw;ctx.stroke();}}
function drawRiver06(t){
  const r=river06;if(!r)return;const ctx=r.ctx,w=r.width,h=r.height,sec=t/1000;
  ctx.clearRect(0,0,w,h);
  const sky=ctx.createLinearGradient(0,0,0,h);sky.addColorStop(0,'#0a2b42');sky.addColorStop(.4,'#185466');sky.addColorStop(1,'#146579');ctx.fillStyle=sky;ctx.fillRect(0,0,w,h);
  // Fireflies and tropical mountains create a layered 2D game stage.
  ctx.save();for(let i=0;i<19;i++){const xx=(i*79+42)%w,yy=(i*137+21)%(h*.65);ctx.fillStyle=`rgba(255,236,174,${.15+.42*(.5+.5*Math.sin(sec*1.3+i))})`;ctx.beginPath();ctx.arc(xx,yy,1.1+1.7*(.5+.5*Math.sin(sec+i)),0,6.3);ctx.fill();}ctx.restore();
  ctx.fillStyle='#113d4e';ctx.beginPath();ctx.moveTo(0,h*.33);for(let x=0;x<=w;x+=12)ctx.lineTo(x,h*.32+Math.sin(x/w*16+2)*25);ctx.lineTo(w,h);ctx.lineTo(0,h);ctx.fill();
  const river=ctx.createLinearGradient(0,h*.26,w,h);river.addColorStop(0,'#167587');river.addColorStop(.5,'#278c99');river.addColorStop(1,'#11465d');
  pathRiver06(ctx,[[w*.22,0],[w*.78,0],[w*1.06,h],[w*-.06,h]],river);
  // Animated water current and expanding depth bands.
  ctx.save();ctx.beginPath();ctx.moveTo(w*.22,0);ctx.lineTo(w*.78,0);ctx.lineTo(w*1.06,h);ctx.lineTo(-w*.06,h);ctx.closePath();ctx.clip();
  for(let i=0;i<37;i++){let y=((i*70+sec*72)%(h+100))-70;let x=w*(.24+((i*17)%52)/100);const spread=(y/h)*w*.26;ctx.strokeStyle=`rgba(190,244,226,${.07+.07*(i%3)})`;ctx.lineWidth=i%4===0?3:1;ctx.beginPath();ctx.moveTo(x-spread*.3,y);ctx.quadraticCurveTo(x+12,y+5,x+39+spread*.3,y);ctx.stroke();}ctx.restore();
  // Mangrove banks, mangrove root suggestions, and grasses. All imaginary scenery.
  for(const side of [0,1]){
    ctx.save();if(side) {ctx.translate(w,0);ctx.scale(-1,1);}
    pathRiver06(ctx,[[0,0],[w*.22,0],[w*.08,h],[0,h]],'#194b3b','#7bb08a',2);
    for(let i=0;i<13;i++){
      const y=((i*83+sec*92)%(h+120))-60;const bx=w*(.06-.025*(y/h));
      ctx.strokeStyle='#285a44';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(bx-22,y+44);ctx.lineTo(bx+4,y-18);ctx.stroke();
      ctx.fillStyle=i%3?'#24745b':'#39916b';
      for(let leaf=0;leaf<4;leaf++){ctx.beginPath();ctx.ellipse(bx-8+leaf*9,y-13-leaf%2*13,22,11,leaf*.9,0,Math.PI*2);ctx.fill();}
    }ctx.restore();
  }
  // Objects are independent game entities with distinct shapes; no emoji-only UI.
  for(const obj of r.objects){
    const x=obj.x*w,y=obj.y,osc=Math.sin(obj.phase)*3;
    ctx.save();ctx.translate(x,y+osc);ctx.shadowBlur=13;
    if(obj.type==='glow'){
      ctx.shadowColor='#ffdb82';ctx.fillStyle='#ffe29a';ctx.beginPath();for(let k=0;k<8;k++){const ang=k*Math.PI/4;const radius=k%2?9:21;const px=Math.cos(ang)*radius,py=Math.sin(ang)*radius;if(!k)ctx.moveTo(px,py);else ctx.lineTo(px,py);}ctx.closePath();ctx.fill();ctx.fillStyle='#fffef2';ctx.beginPath();ctx.arc(0,0,5,0,7);ctx.fill();
    } else if(obj.type==='trash'){
      ctx.shadowColor='#ff9869';pathRiver06(ctx,[[-16,-12],[14,-12],[13,16],[-14,16]],'#db9274','#f8c5a8',2);ctx.fillStyle='#ffe4b0';ctx.fillRect(-8,-5,16,5);ctx.font='bold 17px system-ui';ctx.textAlign='center';ctx.fillStyle='#603d2e';ctx.fillText('♻',0,13);
    } else if(obj.type==='rock'){
      ctx.shadowColor='#243544';pathRiver06(ctx,[[-23,13],[-16,-8],[-2,-20],[18,-10],[24,13]],'#6c8890','#a6b5aa',2);pathRiver06(ctx,[[-16,-8],[-2,-20],[5,-3]],'#a1b5bb');
    } else {
      ctx.shadowColor='#ffa5d2';ctx.fillStyle='#b9d8ae';ctx.beginPath();ctx.ellipse(0,7,19,8,0,0,6.29);ctx.fill();for(let n=0;n<6;n++){ctx.save();ctx.rotate(n*Math.PI/3);ctx.fillStyle='#f6b6cf';ctx.beginPath();ctx.ellipse(0,-13,8,13,0,0,6.29);ctx.fill();ctx.restore();}ctx.fillStyle='#ffeea2';ctx.beginPath();ctx.arc(0,0,5,0,7);ctx.fill();
    }ctx.restore();
  }
  // Canoe and companion. More action than a static avatar card.
  const px=r.x*w,py=h*.77;
  ctx.save();ctx.translate(px,py+Math.sin(sec*3)*3);
  ctx.shadowColor='#032935';ctx.shadowBlur=24;ctx.shadowOffsetY=11;
  ctx.fillStyle='#0e3b43';ctx.beginPath();ctx.ellipse(0,12,44,19,0,0,7);ctx.fill();ctx.shadowBlur=0;ctx.shadowOffsetY=0;
  ctx.fillStyle='#db9559';ctx.beginPath();ctx.moveTo(-32,-8);ctx.quadraticCurveTo(-45,20,0,38);ctx.quadraticCurveTo(43,20,32,-8);ctx.closePath();ctx.fill();ctx.lineWidth=4;ctx.strokeStyle='#ffe1aa';ctx.stroke();
  ctx.fillStyle='#624839';ctx.beginPath();ctx.ellipse(0,-12,29,15,0,0,7);ctx.fill();
  if(r.img){ctx.drawImage(r.img,-32,-79,64,65);}else{ctx.font='41px system-ui';ctx.textAlign='center';ctx.fillText('🐾',0,-32);}
  ctx.fillStyle='#ffe6b0';ctx.font='bold 12px system-ui';ctx.textAlign='center';ctx.fillText('✦',0,24);
  ctx.restore();
}
function stopRiver06(){
  if(!river06)return;
  river06.ended=true;cancelAnimationFrame(riverRaf06);riverRaf06=0;
  clearTimeout(riverBubbleTimer06);river06=null;
  document.getElementById('modalRoot').innerHTML='';modalOpen=false;
}
function closeRiver06(){if(!river06)return;stopRiver06();render();}
function finishRiver06(won,why){
  const r=river06;if(!r||r.ended)return;
  const collected=r.collected,cleaned=r.cleaned,hearts=r.hearts;
  const duration=r.elapsed,mode=r.mode;
  state.riverRecords07=state.riverRecords07||{attempts:0,wins:0,best:null};
  const rec=state.riverRecords07;rec.attempts++;
  if(won){rec.wins++;if(mode==='normal'&&(rec.best===null||duration<rec.best))rec.best=Math.round(duration*10)/10;}
  stopRiver06();
  const j=journal06(),p=current();
  let first=false;
  if(won){
    j.river=1;
    state.river06=state.river06||{day:'',wins:0};
    if(state.river06.day!==today06()){state.river06={day:today06(),wins:0};}
    first=state.river06.wins<1;state.river06.wins++;
    if(first){state.inventory.pearl=(state.inventory.pearl||0)+2;state.pearls+=12;
      if(p){p.stats.happy=cap(p.stats.happy+10);p.stats.bond=cap(p.stats.bond+5);p.affinity.water=(p.affinity.water||0)+6;}}
    else state.pearls+=2;
    eventLog('Sungai Cahaya pulih: '+collected+' titik cahaya dan '+cleaned+' serpihan dibersihkan.');
  }
  save();render();
  showModal(`<div class="river-finish06"><div class="chapter-kicker">✦ ${won?'MISI BERHASIL':'PETUALANGAN BELUM BERAKHIR'} ✦</div><h2>${won?'Sungai Kembali Bersinar':'Cahaya Menunggu Lagi'}</h2><span class="river-finish-emblem06">${won?'🛶':'🌙'}</span>
    <p>${escapeHTML(why||'Cahaya dan tepian sungai kini lebih terjaga. Terima kasih sudah ikut merawat dunia imajinasi ini.')}</p>
    <div class="loot-row"><span>✧ ${collected} cahaya</span><span>♻ ${cleaned} temuan</span><span>♡ ${Math.max(0,hearts)} hati</span></div>
    <p>${won?(first?'Hadiah harian pertama: +12 Mutiara, +2 Mutiara Laut, +6 afinitas Air.':'Patroli ulang: +2 Mutiara. Hadiah utama hanya sekali sehari.'):'Tanpa hukuman permanen. Main kembali kapan saja.'}</p>
    <div class="river-lesson06"><b>📖 Catatan Kodex</b><p>Bekantan hidup di hutan rawa, bakau, dan kawasan tepian sungai Borneo. Sungai dalam permainan ini merupakan dunia fantasi dan tidak menggambarkan satu habitat sebenarnya.</p><small>Fauna nyata · Nasalis larvatus · lihat entri Bekantan di Kodex.</small></div>
    <p>Patroli selesai: ${Math.round(duration)} detik · ${mode==='relax'?'Santai':'Normal'}${rec.best!==null?' · Rekor normal: '+rec.best+' detik':''}</p><div class="ritual-buttons"><button class="secondary-button" data-river06="retry">Main lagi</button><button class="primary-button" data-river06="finish-close">Ke habitat ✦</button></div></div>`);
  if(won)burst('✦',50,48);
}
function claimJournal06(){
  const j=journal06();if(j.claimed||j.care<3||j.harvest<1||j.river<1)return toast('Selesaikan semua tugas dahulu.');
  j.claimed=true;state.pearls+=20;state.inventory.jade=(state.inventory.jade||0)+1;
  eventLog('Gulungan Penjaga hari ini selesai.');save();closeModal();render();
  burst('🌿');toast('Berkah Penjaga: +20 Mutiara dan +1 Giok!');
}
function riverPointer06(event){
  const r=river06;if(!r)return;
  const rect=r.canvas.getBoundingClientRect();
  r.targetX=Math.min(.88,Math.max(.12,(event.clientX-rect.left)/Math.max(1,rect.width)));
}
document.addEventListener('click',function(e){
  const t=e.target.closest('[data-river06]');if(!t)return;
  e.preventDefault();e.stopImmediatePropagation();
  switch(t.dataset.river06){
    case 'open':riverIntro07();break;
    case 'normal':startRiver06('normal');break;
    case 'relax':startRiver06('relax');break;
    case 'retry':riverIntro07();break;
    case 'pause':pauseRiver07();break;
    case 'resume':resumeRiver07();break;
    case 'journal':openJournal06();break;
    case 'claim':claimJournal06();break;
    case 'close-journal':case 'finish-close':closeModal();render();break;
    case 'exit':closeRiver06();break;
  }
},true);
document.addEventListener('pointerdown',e=>{
  if(!river06)return;
  const b=e.target.closest('[data-river06]');
  if(b&&['left','right'].includes(b.dataset.river06)){
    river06.keys[b.dataset.river06]=true;
    try{b.setPointerCapture(e.pointerId);}catch(_err){}
    e.preventDefault();return;
  }
  if(e.target.id==='riverCanvas06'){riverPointer06(e);river06.dragId=e.pointerId;try{e.target.setPointerCapture(e.pointerId);}catch(_err){}e.preventDefault();}
});
document.addEventListener('pointermove',e=>{if(river06&&river06.dragId===e.pointerId)riverPointer06(e);});
function releaseRiver06(e){
  if(!river06)return;
  if(e.target.closest('[data-river06="left"]'))river06.keys.left=false;
  if(e.target.closest('[data-river06="right"]'))river06.keys.right=false;
  if(river06.dragId===e.pointerId)river06.dragId=null;
}
document.addEventListener('pointerup',releaseRiver06);document.addEventListener('pointercancel',releaseRiver06);
document.addEventListener('keydown',e=>{
  if(!river06)return;
  if(['ArrowLeft','ArrowRight','KeyA','KeyD','Escape'].includes(e.code)){
    e.preventDefault();e.stopImmediatePropagation();
    if(e.code==='Escape'){if(river06.paused)resumeRiver07();else pauseRiver07();}
    else if(e.code==='ArrowLeft'||e.code==='KeyA')river06.keys.left=true;
    else river06.keys.right=true;
  }
},true);
document.addEventListener('keyup',e=>{if(!river06)return;if(['ArrowLeft','KeyA'].includes(e.code))river06.keys.left=false;if(['ArrowRight','KeyD'].includes(e.code))river06.keys.right=false;},true);
window.addEventListener('resize',resizeRiver06);
window.addEventListener('blur',()=>{if(river06){river06.keys.left=false;river06.keys.right=false;river06.dragId=null;}});
const prevSettings06=settingsModal;
settingsModal=function(){prevSettings06();const node=document.querySelector('.modal-disclaimer');if(node)node.textContent='NUSAJIWA Alpha 0.7 · prototipe game 2D. Save lokal (tidak ada sinkronisasi akun). Satwa asli, mitologi, dan fantasi dibedakan di Kodex.';};
function riverIntro07(){
  if(!current())return;
  const rec=state.riverRecords07;
  showModal(`<div class="chapter-kicker">✦ PATROLI PENJAGA ✦</div><h2>Sungai Cahaya</h2><p>Bawa sahabatmu menyusuri sungai. Kumpulkan 6 cahaya dan bersihkan 3 sampah sebelum waktu habis.</p><div class="river-guide07"><span>✧<b>Ambil cahaya</b></span><span>♻<b>Bersihkan sampah</b></span><span>◇<b>Hindari batu</b></span><span>❀<b>Pulihkan hati</b></span></div><p>Geser perahu di air, tahan tombol ◀ ▶, atau gunakan panah pada keyboard. Tombol Ⅱ menjeda permainan.</p><div class="ritual-buttons"><button class="secondary-button" data-river06="relax">Santai · 65 detik</button><button class="primary-button" data-river06="normal">Normal · 45 detik</button></div><p>${rec?rec.wins+' patroli berhasil dari '+rec.attempts+' permainan.':'Petualangan pertamamu menunggu.'} Hadiah utama hanya sekali sehari untuk kedua mode.</p><button class="guardian-skip" data-river06="close-journal">Kembali</button>`);
}
function pauseRiver07(){
  const r=river06;if(!r||r.paused)return;
  r.paused=true;r.keys.left=false;r.keys.right=false;r.dragId=null;
  const pane=document.createElement('div');pane.id='riverPause07';pane.className='river-pause07';
  pane.innerHTML='<div><div class="chapter-kicker">✦ ISTIRAHAT SEJENAK ✦</div><h2>Sungai Menunggumu</h2><p>Waktu berhenti selama jeda. Siap melanjutkan patroli?</p><button class="primary-button" data-river06="resume">Lanjutkan</button><button class="secondary-button" data-river06="exit">Ke habitat</button></div>';
  document.querySelector('.river-world06')?.append(pane);
}
function resumeRiver07(){if(!river06)return;river06.paused=false;river06.last=performance.now();document.getElementById('riverPause07')?.remove();}
document.addEventListener('visibilitychange',()=>{if(document.hidden)pauseRiver07();});
window.addEventListener('blur',pauseRiver07);
// Re-render game after all extensions were registered.
render();
