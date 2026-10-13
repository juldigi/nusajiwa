'use strict';
/* NUSAJIWA Alpha 0.4: a story inside the playable world, not a mission dashboard.
 * Overlay only; v0.1–v0.3 local save remains compatible.
 */
const STORY_QUESTS = {
  sumatra: {
    guardian: 'Penjaga Akar', icon: '🌱', glyph: 'ᨑ',
    intro: 'Jejak kaki tampak di tanah lembap. Rimba ini rumah, bukan sekadar tempat lewat.',
    question: 'Apa yang paling membantu satwa liar tetap hidup di hutan?',
    options: ['Menjaga habitat yang saling terhubung', 'Membawa pulang setiap hewan liar', 'Menebang pohon agar jalur terbuka'], correct: 0,
    success: 'Akar dan pepohonan berbisik. Kamu memilih menjaga rumah para penghuni rimba.',
    error: 'Dengarkan kembali suara hutan. Rumah satwa tidak seharusnya diambil.',
    souvenir: 'Embun Rimba'
  },
  java: {
    guardian: 'Perawat Kawah', icon: '🌋', glyph: 'ꦗ',
    intro: 'Di antara kabut kawah, sebongkah kaca hitam menyimpan kisah api yang membeku.',
    question: 'Obsidian terbentuk ketika…',
    options: ['Pasir berubah menjadi emas', 'Lava mendingin sangat cepat', 'Awan menyentuh permukaan danau'], correct: 1,
    success: 'Kilau obsidian menyala. Kamu memahami rahasia batuan gunung api.',
    error: 'Perhatikan kilap dan asal batu hitam ini. Ia berasal dari lava.',
    souvenir: 'Serpih Kawah'
  },
  kalimantan: {
    guardian: 'Sahabat Mahakam', icon: '🛶', glyph: '✺',
    intro: 'Arus sungai membawa dongeng lama tentang penjaga yang hidup dalam ingatan.',
    question: 'Lembuswana dalam NUSAJIWA sebaiknya dipahami sebagai…',
    options: ['Spesies hewan yang baru ditemukan', 'Bukti ilmiah ada hewan ajaib di sungai', 'Figur dalam warisan mitologi Kutai'], correct: 2,
    success: 'Sang penjaga mengangguk. Cerita dan kenyataan harus dihormati pada tempatnya.',
    error: 'Bedakan tokoh budaya dari satwa nyata. Buka Kodex jika ragu.',
    souvenir: 'Riak Mahakam'
  },
  sulawesi: {
    guardian: 'Pengawal Lembah', icon: '🪶', glyph: '✧',
    intro: 'Di tengah lembah, suara burung langka menggema dari arah pepohonan.',
    question: 'Manakah contoh fauna khas yang hidup alami di Sulawesi?',
    options: ['Anoa dan maleo', 'Panda dan koala', 'Beruang kutub dan penguin'], correct: 0,
    success: 'Lembah terasa lebih hidup. Nama-nama satwa endemik kini kamu kenali.',
    error: 'Pikirkan satwa yang habitat alaminya memang berada di Sulawesi.',
    souvenir: 'Bulu Lembah'
  },
  nusa: {
    guardian: 'Penjaga Savana', icon: '☀️', glyph: '☼',
    intro: 'Angin kering membawa jejak kadal raksasa yang nyata, bukan sekadar legenda.',
    question: 'Komodo di alam liar hidup secara alami terutama di…',
    options: ['Kutub Selatan', 'Nusa Tenggara Timur', 'Pegunungan Himalaya'], correct: 1,
    success: 'Savana berkilau. Kamu mengenali rumah alami sang komodo.',
    error: 'Carilah kepulauan di bagian tenggara Indonesia.',
    souvenir: 'Butir Savana'
  },
  papua: {
    guardian: 'Penjaga Awan', icon: '🦜', glyph: '❋',
    intro: 'Di tepian hutan awan terdengar sayap berdesir dan panggilan burung yang indah.',
    question: 'Mengapa beberapa cenderawasih terkenal dalam dunia nyata?',
    options: ['Karena bisa berubah menjadi batu', 'Karena hidup di bawah tanah', 'Karena pertunjukan dan hiasan bulunya'], correct: 2,
    success: 'Awan membuka jalan. Kamu menghargai keindahan burung di alamnya.',
    error: 'Perhatikan burung di habitat asli dan perilaku pertunjukannya.',
    souvenir: 'Nada Langit'
  }
};
const STORY_REGIONS=Object.keys(STORY_QUESTS);
function sealState(){
  if(!state.storySeals||typeof state.storySeals!=='object'||Array.isArray(state.storySeals))state.storySeals={};
  if(!Array.isArray(state.memoryDays))state.memoryDays=[];
  if(!Array.isArray(state.storyLog))state.storyLog=[];
}
function sealCount(){sealState();return STORY_REGIONS.filter(id=>state.storySeals[id]).length;}
const previousHome04=home;
home=function(){
  const s=previousHome04(); if(!current())return s;
  const count=sealCount();
  const subtitle=count===6?'Enam penjaga telah kembali':'Jejak Penjaga · '+count+'/6 tanda ditemukan';
  const artifact='<button class="story-artifact" data-story="journal" aria-label="Buka Kitab Penjaga" title="Kitab Penjaga"><span class="story-artifact-icon">📜</span><span>Kitab<br>Penjaga</span></button>';
  const portal='<button class="story-portal" data-story="memory" aria-label="Mainkan ritual Cahaya Sukma" title="Ritual Cahaya Sukma"><span class="portal-core">✧</span><b>Cahaya Sukma</b><small>'+subtitle+'</small></button>';
  return s.replace('<div class="home-content">',artifact+portal+'<div class="home-content">');
};
const previousExplore04=explore;
explore=function(){
  const s=previousExplore04();
  const icons=STORY_REGIONS.map((id,i)=>'<span title="'+escapeHTML(REGIONS[id].name)+'" class="'+(state.storySeals?.[id]?'seal-ink':'seal-dim')+'">'+(state.storySeals?.[id]?STORY_QUESTS[id].icon:'✧')+'</span>').join('');
  return s.replace('<div class="floating-hint">','<div class="expedition-sigil-ribbon" aria-label="Tanda enam penjaga">'+icons+'<small>Jejak Penjaga '+sealCount()+'/6</small></div><div class="floating-hint">');
};
function bookOfGuardians(){
  sealState();
  const count=sealCount();
  const lines=STORY_REGIONS.map(id=>{
    const q=STORY_QUESTS[id],has=!!state.storySeals[id];
    return '<div class="scroll-region '+(has?'collected':'')+'"><span class="scroll-seal">'+(has?q.icon:'✧')+'</span><div><strong>'+escapeHTML(REGIONS[id].name)+'</strong><small>'+(has?escapeHTML(q.souvenir)+' · tanda terjaga':'Tanda belum ditemukan · temui penjaga di ekspedisi')+'</small></div></div>';
  }).join('');
  showModal('<div class="story-scroll"><div class="chapter-kicker">✦ ENAM PENJAGA NUSANTARA ✦</div><h2>Kitab Penjaga</h2><p>Di setiap pulau ada penjaga fantasi ciptaan NUSAJIWA. Jelajahi hingga bertemu dengannya, dekati, lalu pilih <b>Amati</b> untuk mendengar pesannya.</p><div class="scroll-circle">'+(count===6?'✹':'✧')+'<span>'+count+' / 6</span></div><div class="scroll-regions">'+lines+'</div><p class="story-footnote">Tokoh Penjaga adalah karakter orisinal game, bukan makhluk atau tradisi yang diklaim autentik. Informasi fauna dan budaya terpisah di Kodex.</p><button class="primary-button" data-story="book-close">Kembali ke dunia ✦</button></div>');
}
const previousPlayExpedition04=playExpedition;
playExpedition=function(region){
  previousPlayExpedition04(region);
  if(journey){journey.guardian={x:1075,cleared:false,paused:false};journey.guardianPromptAt=0;}
};
const previousAdventureLook04=adventureLook;
adventureLook=function(){
  if(journey && journey.guardian && Math.abs(journey.x-journey.guardian.x)<155){
    if(!journey.guardian.cleared) return guardianDialog();
    return bubble('✦ Penjaga sudah menitipkan tanda. Lanjutkan perjalanan ke gerbang!',2600);
  }
  previousAdventureLook04();
};
let guardianChoicesOpen=false;
function guardianDialog(){
  if(!journey||!journey.guardian||guardianChoicesOpen)return;
  const q=STORY_QUESTS[journey.region];if(!q)return;
  journey.paused=true;journey.keys.left=journey.keys.right=false;
  guardianChoicesOpen=true;
  const dialog='<div class="guardian-dialog" role="dialog" aria-modal="true" aria-label="Pesan dari '+escapeHTML(q.guardian)+'"><div class="guardian-moon">'+q.icon+'</div><div class="chapter-kicker">✦ PERTEMUAN DI TANAH NUSANTARA ✦</div><h2>'+escapeHTML(q.guardian)+'</h2><p>'+escapeHTML(q.intro)+'</p><h3>'+escapeHTML(q.question)+'</h3><div class="guardian-answers">'+q.options.map((ans,i)=>'<button data-story="guardian-answer" data-choice="'+i+'">'+escapeHTML(ans)+'</button>').join('')+'</div><button class="guardian-skip" data-story="guardian-later">Nanti saja · lanjut menjelajah</button><small class="guardian-annotation">Pertanyaan edukasi · jawaban salah dapat dicoba ulang.</small></div>';
  const stage=document.querySelector('.journey-stage');if(stage)stage.insertAdjacentHTML('beforeend',dialog);
  sound(370,620);
}
function exitGuardianDialog(){
  document.querySelector('.guardian-dialog')?.remove();
  guardianChoicesOpen=false;
  if(journey){journey.paused=false;journeyLast=performance.now();}
}
function chooseGuardian(n){
  if(!journey||!guardianChoicesOpen)return;
  const q=STORY_QUESTS[journey.region];
  if(n!==q.correct){
    const dlg=document.querySelector('.guardian-dialog');
    dlg?.querySelector('.guardian-feedback')?.remove();
    dlg?.querySelector('.guardian-answers')?.insertAdjacentHTML('afterend','<p class="guardian-feedback">'+escapeHTML(q.error)+'</p>');
    sound(260,210);return;
  }
  journey.guardian.cleared=true;
  exitGuardianDialog();
  bubble('✦ '+q.success+' · Selesaikan ekspedisi untuk menyimpan tanda.',5200);
  sound(450,980);burst(q.icon,50,38);
}
const previousDrawAdventure04=drawAdventure;
drawAdventure=function(t){
  previousDrawAdventure04(t);
  const j=journey;if(!j||!j.guardian)return;
  const ctx=j.ctx,x=j.guardian.x-j.camera,y=322,now=t*.001;
  if(x<-140||x>j.screenW+140)return;
  ctx.save();ctx.setTransform(j.pixelRatio||1,0,0,j.pixelRatio||1,0,0);
  const s=j.guardian.cleared?0.65:1;
  ctx.translate(x,y);ctx.scale(s,s);
  ctx.shadowColor=j.guardian.cleared?'#89cfc7':'#fbe29b';ctx.shadowBlur=27;
  ctx.fillStyle='#123d4a';ctx.strokeStyle='#dfc88e';ctx.lineWidth=4;
  ctx.beginPath();ctx.ellipse(0,-49,48,66,0,0,Math.PI*2);ctx.fill();ctx.stroke();
  ctx.fillStyle='#f4d8a3';ctx.beginPath();ctx.ellipse(0,-67,28,31,0,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#213a48';ctx.beginPath();ctx.arc(-9,-71,3.5,0,Math.PI*2);ctx.arc(9,-71,3.5,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle='#254d55';ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,-62,7,.14*Math.PI,.86*Math.PI);ctx.stroke();
  ctx.font='36px system-ui';ctx.textAlign='center';ctx.fillText(STORY_QUESTS[j.region].icon,0,-100+Math.sin(now*1.9)*5);
  ctx.fillStyle='#fff2c8';ctx.font='bold 13px system-ui';ctx.shadowColor='#001b26';ctx.shadowBlur=8;
  if(!j.guardian.cleared){ctx.fillText('✧ PENJAGA ✧',0,-151);if(Math.abs(j.x-j.guardian.x)<170)ctx.fillText('AMATI ↗',0,-173);}
  else ctx.fillText('TERJAGA ✓',0,-151);
  ctx.restore();
};
// Pause simulation while a guardian speaks, including the animation frame clock.
const previousFrameJourney04=frameJourney;
frameJourney=function(t){
  if(journey?.paused){journeyLast=t;journeyRAF=requestAnimationFrame(frameJourney);return;}
  previousFrameJourney04(t);
};
const previousFinishAdventure04=finishAdventure;
finishAdventure=function(won=false){
  const j=journey;
  if(!j)return;
  if(guardianChoicesOpen)exitGuardianDialog();
  const clear=!!(won && j.guardian?.cleared && j.loots?.length>=3);
  const region=j.region;
  previousFinishAdventure04(won);
  if(!clear)return;
  sealState();
  const already=!!state.storySeals[region],q=STORY_QUESTS[region];
  if(!already){
    state.storySeals[region]={at:Date.now(),souvenir:q.souvenir};
    state.pearls+=12;
    state.storyLog.unshift(q.guardian+' menitipkan '+q.souvenir+'.');
    if(state.storyLog.length>40)state.storyLog.length=40;
    eventLog('Tanda Penjaga '+REGIONS[region].name+' berhasil diselamatkan.');
    save();render();
  }
  const pane=document.querySelector('.modal-pane');
  if(pane){const extra='<div class="guardian-reward"><span>✹</span><div><b>'+(already?'Tanda penjaga telah tersimpan':'Tanda baru: '+escapeHTML(q.souvenir))+'</b><small>'+(already?'Perjalanan ini menambah pengalaman, tetapi tanda hanya diperoleh sekali.':'+12 Mutiara · '+sealCount()+'/6 tanda terkumpul')+'</small></div></div>';
    const last=pane.querySelector('.primary-button');if(last)last.insertAdjacentHTML('beforebegin',extra);else pane.insertAdjacentHTML('beforeend',extra);
  }
};
let memoryRun=null;
let memoryTimers=[];
const MEMORY_SIGILS=[{id:'sun',glyph:'☀',caption:'Surya',audio:500},{id:'rain',glyph:'💧',caption:'Tirta',audio:630},{id:'wind',glyph:'❋',caption:'Bayu',audio:760},{id:'leaf',glyph:'❧',caption:'Rimba',audio:890}];
function memoryTimer(fn,delay){const id=setTimeout(fn,delay);memoryTimers.push(id);return id;}
function stopMemory(){memoryTimers.forEach(clearTimeout);memoryTimers=[];memoryRun=null;}
const previousCloseModal04=closeModal;
closeModal=function(){stopMemory();previousCloseModal04();};
function startMemory(){
  if(!current())return toast('Tetaskan telur pertama dahulu.');
  if(!sealCount())return bookOfGuardians();
  stopMemory();
  const seed=Date.now();
  memoryRun={round:1,seed,sequence:[],index:0,watching:true,done:false};
  showModal('<div class="memory-stage"><div class="chapter-kicker">✦ RITUAL CAHAYA SUKMA ✦</div><h2>Ingat Nyala Alam</h2><p id="memoryTip">Perhatikan urutan cahaya, lalu ulangi dengan menyentuh keempat simbol.</p><div id="memoryProgress" class="memory-progress">Babak 1 / 3</div><div class="memory-wheel">'+MEMORY_SIGILS.map((v,i)=>'<button class="memory-sigil" data-story="memory-press" data-memory="'+i+'" disabled aria-label="'+v.caption+'"><strong>'+v.glyph+'</strong><small>'+v.caption+'</small></button>').join('')+'</div><div id="memoryFeedback" role="status" class="memory-feedback">Amati cahaya…</div><button class="guardian-skip" data-story="memory-exit">Kembali ke habitat</button></div>');
  memoryTimer(()=>nextMemoryRound(),600);
}
function nextMemoryRound(){
  if(!memoryRun)return;
  const m=memoryRun;m.watching=true;m.index=0;
  m.sequence=Array.from({length:m.round+1},(_,i)=>Math.floor((Math.sin(m.seed*.00001+i*88.4+m.round*27.8)*10000)%1*4+4)%4);
  const progress=document.getElementById('memoryProgress');if(progress)progress.textContent='Babak '+m.round+' / 3';
  const msg=document.getElementById('memoryFeedback');if(msg)msg.textContent='Ingat urutannya…';
  document.querySelectorAll('[data-story="memory-press"]').forEach(el=>el.disabled=true);
  m.sequence.forEach((v,i)=>{
    memoryTimer(()=>{
      if(!memoryRun)return;
      const el=document.querySelector('[data-memory="'+v+'"]');el?.classList.add('lit');sound(MEMORY_SIGILS[v].audio,MEMORY_SIGILS[v].audio+120);
    },i*880+300);
    memoryTimer(()=>document.querySelector('[data-memory="'+v+'"]')?.classList.remove('lit'),i*880+810);
  });
  memoryTimer(()=>{
    if(!memoryRun)return;m.watching=false;
    document.querySelectorAll('[data-story="memory-press"]').forEach(el=>el.disabled=false);
    const msg=document.getElementById('memoryFeedback');if(msg)msg.textContent='Giliranmu! Ulangi '+m.sequence.length+' cahaya.';
  },m.sequence.length*880+400);
}
function pressMemory(i){
  const m=memoryRun;if(!m||m.watching||m.done)return;
  const el=document.querySelector('[data-memory="'+i+'"]');el?.classList.add('lit');memoryTimer(()=>el?.classList.remove('lit'),300);
  if(m.sequence[m.index]!==i){
    stopMemory();
    const msg=document.getElementById('memoryFeedback');if(msg)msg.textContent='Cahaya terlepas. Coba lagi; tidak ada hadiah yang hilang.';
    document.querySelectorAll('[data-story="memory-press"]').forEach(btn=>btn.disabled=true);
    document.querySelector('.memory-stage')?.insertAdjacentHTML('beforeend','<button class="primary-button" data-story="memory-retry">Ulangi ritual ↺</button>');
    sound(270,180);return;
  }
  sound(MEMORY_SIGILS[i].audio,MEMORY_SIGILS[i].audio+140);
  m.index++;
  if(m.index<m.sequence.length)return;
  m.watching=true;
  if(m.round<3){m.round++;const msg=document.getElementById('memoryFeedback');if(msg)msg.textContent='Satu babak terselesaikan! ✦';memoryTimer(nextMemoryRound,1300);return;}
  m.done=true;
  sealState();
  const today=new Date().toLocaleDateString('en-CA');
  const fresh=!state.memoryDays.includes(today);
  if(fresh){state.memoryDays.push(today);state.pearls+=25;state.inventory.spirit=(state.inventory.spirit||0)+1;const p=current();if(p){p.stats.bond=cap(p.stats.bond+8);p.affinity.spirit=(p.affinity.spirit||0)+6;if(p.phase<7)applyXP(p,25);}eventLog('Ritual Sukma selesai: +25 Mutiara dan Fragmen Jiwa.');save();}
  document.querySelectorAll('[data-story="memory-press"]').forEach(btn=>btn.disabled=true);
  document.querySelector('.memory-stage .guardian-skip')?.remove();
  const msg=document.getElementById('memoryFeedback');if(msg)msg.textContent='Ritual selesai! Cahaya alam kembali seimbang. ✧';
  document.querySelector('.memory-stage')?.insertAdjacentHTML('beforeend','<div class="memory-prize">✦ '+(fresh?'+25 Mutiara · +1 Fragmen Jiwa · +25 XP':'Hadiah harian sudah diambil; kembali besok untuk hadiah baru.')+'</div><button class="primary-button" data-story="memory-exit">Kembali ke habitat</button>');
  burst('✦');sound(450,1050);stopMemory();
}
const previousCodex04=codex;
codex=function(){
  const s=previousCodex04(); const n=sealCount();if(n<1)return s;
  const stamps=STORY_REGIONS.filter(id=>state.storySeals[id]).map(id=>'<span>'+STORY_QUESTS[id].icon+' '+escapeHTML(STORY_QUESTS[id].souvenir)+'</span>').join('');
  return s.replace('<div class="library-note">','<div class="guardian-codex"><h3>✦ Jejak Para Penjaga</h3><p>Enam penjaga merupakan tokoh fantasi orisinal NUSAJIWA. Kamu sudah membuka '+n+' dari 6 tanda kenangan.</p><div>'+stamps+'</div></div><div class="library-note">');
};
const previousSettings04=settingsModal;
settingsModal=function(){
  previousSettings04();
  const pane=document.querySelector('.modal-pane');
  if(pane)pane.innerHTML=pane.innerHTML.replace('Versi 0.3 — Alpha Petualangan 2D','Versi 0.4 — Alpha Kisah Para Penjaga');
};
// Capture before the generic handler so NPC choices and memory actions never trigger game navigation.
document.addEventListener('click',function(e){
  const target=e.target.closest('[data-story]');if(!target)return;
  e.preventDefault();e.stopImmediatePropagation();
  switch(target.dataset.story){
    case 'journal':bookOfGuardians();break;
    case 'book-close':closeModal();break;
    case 'memory':startMemory();break;
    case 'guardian-answer':chooseGuardian(Number(target.dataset.choice));break;
    case 'guardian-later':exitGuardianDialog();break;
    case 'memory-press':pressMemory(Number(target.dataset.memory));break;
    case 'memory-exit':closeModal();break;
    case 'memory-retry':startMemory();break;
  }
},true);
// Friendly keyboard shortcuts inside the sequence puzzle.
document.addEventListener('keydown',e=>{
  if(memoryRun && /^[1-4]$/.test(e.key)){e.preventDefault();pressMemory(Number(e.key)-1);}
},true);
