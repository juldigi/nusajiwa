 'use strict';
const BADGES08=[
 {id:'hatch',icon:'🥚',name:'Sahabat Pertama',text:'Tetaskan satu telur.',goal:1,value:()=>state.pets.filter(p=>p.phase>=1).length,reward:10},
 {id:'bond',icon:'♡',name:'Ikatan Hangat',text:'Raih ikatan 60 pada satu sahabat.',goal:60,value:()=>Math.max(0,...state.pets.map(p=>p.stats.bond||0)),reward:15},
 {id:'route',icon:'◈',name:'Langkah Pertama',text:'Selesaikan satu ekspedisi darat.',goal:1,value:()=>Object.values(state.regionVisits||{}).reduce((a,b)=>a+b,0),reward:10},
 {id:'islands',icon:'✥',name:'Penjelajah Nusantara',text:'Selesaikan ekspedisi di enam wilayah.',goal:6,value:()=>Object.keys(REGIONS).filter(id=>state.regionVisits?.[id]>0).length,reward:35},
 {id:'notes',icon:'📜',name:'Pembaca Prasasti',text:'Temukan catatan lapangan dari tiga wilayah.',goal:3,value:()=>Object.keys(state.fieldNotes||{}).filter(id=>REGIONS[id]).length,reward:15},
 {id:'river',icon:'🛶',name:'Sahabat Sungai',text:'Menangkan tiga patroli Sungai Cahaya.',goal:3,value:()=>state.riverRecords07?.wins||0,reward:15},
 {id:'guardians',icon:'✹',name:'Enam Tanda Jiwa',text:'Kumpulkan keenam tanda Penjaga.',goal:6,value:()=>Object.keys(state.storySeals||{}).filter(id=>REGIONS[id]).length,reward:40},
 {id:'growth',icon:'✦',name:'Jiwa Bertumbuh',text:'Bawa satu sahabat ke tahap pertumbuhan 4.',goal:4,value:()=>Math.max(0,...state.pets.map(p=>p.phase||0)),reward:20}
];
let trailTab08='badges';
function badgeValue08(b){return Math.min(b.goal,Math.max(0,Number(b.value())||0));}
function openTrail08(tab='badges'){
 if(!current())return toast('Pilih sahabatmu terlebih dahulu.');
 trailTab08=tab;
 const claimed=state.badges08||{},ready=BADGES08.filter(b=>badgeValue08(b)>=b.goal),next=BADGES08.find(b=>badgeValue08(b)<b.goal);
 let content='';
 if(tab==='routes')content='<div class="trail-routes08">'+Object.entries(REGIONS).map(([id,r])=>{const visits=state.regionVisits?.[id]||0,note=state.fieldNotes?.[id],seal=state.storySeals?.[id];return `<article><span class="route-mark08">${seal?'✹':visits?'◈':'◇'}</span><div><h3>${escapeHTML(r.name)}</h3><p>${visits?visits+' ekspedisi selesai':'Belum dijelajahi'} · ${seal?'Tanda Penjaga ditemukan':'Tanda Penjaga menunggu'}</p>${note?'<details><summary>📜 Baca catatan lapangan</summary><p>'+escapeHTML(note.story)+'</p></details>':'<small>Dekati prasasti lalu tekan Amati untuk menemukan kisah.</small>'}</div><button class="secondary-button" data-trail08="travel" data-region="${id}">Jelajah</button></article>`;}).join('')+'</div>';
 else content='<div class="trail-badges08">'+BADGES08.map(b=>{const value=badgeValue08(b),done=value>=b.goal,taken=!!claimed[b.id];return `<article class="${done?'earned':''}"><span class="badge-icon08">${b.icon}</span><h3>${b.name}</h3><p>${b.text}</p><progress value="${value}" max="${b.goal}" aria-label="${b.name}"></progress><small>${value} / ${b.goal} · ${b.reward} Mutiara</small><button class="${done&&!taken?'primary-button':'secondary-button'}" data-trail08="claim" data-badge="${b.id}" ${!done||taken?'disabled':''}>${taken?'✦ Sudah diterima':done?'Terima hadiah':'Dalam perjalanan'}</button></article>`;}).join('')+'</div>';
 showModal(`<div class="trail-book08"><div class="chapter-kicker">✦ KISAH YANG KAMU TULIS ✦</div><h2>Jejak Penjaga</h2><p>${ready.length} dari ${BADGES08.length} pencapaian terbuka. Setiap hadiah hanya bisa diterima sekali.</p><div class="trail-next08">${next?'Tujuan berikutnya: <b>'+next.name+'</b> — '+next.text:'✹ Semua pencapaian terbuka. Terus rawat dunia Nusajiwa!'}</div><div class="book-filters"><button data-trail08="badges" class="${tab==='badges'?'chosen':''}">Pencapaian</button><button data-trail08="routes" class="${tab==='routes'?'chosen':''}">Jejak Wilayah</button></div>${content}<button class="guardian-skip" data-trail08="close">Kembali ke dunia</button></div>`);
}
function claimBadge08(id){const b=BADGES08.find(x=>x.id===id);if(!b||badgeValue08(b)<b.goal)return;state.badges08=state.badges08||{};if(state.badges08[id])return;state.badges08[id]={at:Date.now()};state.pearls+=b.reward;eventLog('Pencapaian '+b.name+' terbuka.');save();render();openTrail08(trailTab08);sound(480,820);toast('+'+b.reward+' Mutiara · '+b.name);}
const homeBefore08=home;
home=function(){return homeBefore08().replace('<div class="home-bottom">','<div class="home-bottom"><button class="trail-entry08" data-trail08="open">✥ Jejak Penjaga <small>Pencapaian & wilayah ↗</small></button>');};
const settingsBefore08=settingsModal;
settingsModal=function(){settingsBefore08();const pane=document.querySelector('.modal-pane');if(pane){pane.insertAdjacentHTML('beforeend','<button class="secondary-button" data-trail08="open">✥ Jejak Penjaga</button>');const note=pane.querySelector('.modal-disclaimer');if(note)note.textContent='NUSAJIWA Alpha 0.8 · progres lokal. Ekspor save sebelum berganti perangkat atau alamat game.';}};
document.addEventListener('click',e=>{const t=e.target.closest('[data-trail08]');if(!t||t.disabled)return;e.preventDefault();e.stopImmediatePropagation();const a=t.dataset.trail08;if(a==='open'||a==='badges')openTrail08();else if(a==='routes')openTrail08('routes');else if(a==='claim')claimBadge08(t.dataset.badge);else if(a==='close'){closeModal();render();}else if(a==='travel'){closeModal();playExpedition(t.dataset.region);}},true);
// Manual/background pause shares the existing guardian pause without dismissing its dialogue.
function pauseJourney08(){if(!journey||journey.paused)return;stopJourneyInputs();journey.paused=true;journey.manualPause08=true;const el=document.createElement('div');el.id='journeyPause08';el.className='river-pause07';el.innerHTML='<div><div class="chapter-kicker">✦ ISTIRAHAT PENJAGA ✦</div><h2>Perjalanan Dijeda</h2><p>Posisi dan temuanmu tetap di sini selama halaman terbuka.</p><button class="primary-button" data-pause08="resume">Lanjutkan</button><button class="secondary-button" data-pause08="exit">Keluar dari ekspedisi</button></div>';document.querySelector('.journey-stage')?.append(el);}
function resumeJourney08(){if(!journey?.manualPause08)return;journey.paused=false;journey.manualPause08=false;journeyLast=performance.now();stopJourneyInputs();document.getElementById('journeyPause08')?.remove();}
const expeditionBefore08=playExpedition;
playExpedition=function(region){if(river06||groveOpen05)return;expeditionBefore08(region);if(journey&&!document.querySelector('[data-pause08="pause"]'))document.querySelector('.journey-top')?.insertAdjacentHTML('beforeend','<button class="journey-exit" data-pause08="pause" aria-label="Jeda ekspedisi">Ⅱ Jeda</button>');};
document.addEventListener('click',e=>{const t=e.target.closest('[data-pause08]');if(!t)return;e.preventDefault();e.stopImmediatePropagation();if(t.dataset.pause08==='pause')pauseJourney08();else if(t.dataset.pause08==='resume')resumeJourney08();else{document.getElementById('journeyPause08')?.remove();finishAdventure(false);}},true);
document.addEventListener('keydown',e=>{if(!journey?.manualPause08)return;if(['Escape','ArrowLeft','ArrowRight','ArrowUp','KeyA','KeyD','KeyE','Space'].includes(e.code)){e.preventDefault();e.stopImmediatePropagation();if(e.code==='Escape')resumeJourney08();}},true);
document.addEventListener('visibilitychange',()=>{if(document.hidden)pauseJourney08();});window.addEventListener('blur',pauseJourney08);
render();
