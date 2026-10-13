'use strict';
/* Quality-of-life controls: persisted per-device only; no changes to game save schema. */
const nj18StorageKey='nusajiwa_motion_mode';
function nj18MotionMode(){try{return localStorage.getItem(nj18StorageKey)||'auto'}catch(e){return 'auto'}}
function nj18ApplyMotion(){document.body.classList.toggle('nj18-low-motion',nj18MotionMode()==='low')}
nj18ApplyMotion();
const nj18PriorSettings=settingsModal;
settingsModal=function(){nj18PriorSettings();const pane=document.querySelector('.modal-pane');if(!pane)return;
 const block=document.createElement('div');block.className='nj18-perf';block.innerHTML='<div><strong>Animasi perangkat</strong><br><small>Kurangi efek untuk menghemat baterai dan menjaga kelancaran.</small></div><button type="button" data-nj18-motion="toggle"></button>';
 pane.appendChild(block);const btn=block.querySelector('button');const update=()=>btn.textContent=nj18MotionMode()==='low'?'Ringan':'Otomatis';update();
 btn.addEventListener('click',()=>{try{localStorage.setItem(nj18StorageKey,nj18MotionMode()==='low'?'auto':'low')}catch(e){}nj18ApplyMotion();update()});
 const note=document.createElement('p');note.style.cssText='font-size:11px;color:#e9d7af;margin-top:10px';note.textContent='NUSAJIWA 1.8 · Interaction & Accessibility Pass. Umpan balik perawatan, fokus keyboard, dan kontrol animasi. Ilustrasi resolusi tinggi masih menunggu integrasi, sehingga visual karakter saat ini tetap memakai renderer sebelumnya.';pane.appendChild(note);
};
const nj18PriorCare=care;
care=function(action){const p=current();if(!p)return;const before=p.touches||0;nj18PriorCare(action);if((p.touches||0)===before)return;
 const msg={feed:'🍉 Kenyang bertambah',clean:'✧ Bersih dan segar',play:'✦ Semakin bahagia',sleep:'☾ Energi pulih',learn:'✧ Pengetahuan bertambah',bond:'♡ Ikatan menguat'}[action]||'✦ Jiwa bertumbuh';
 requestAnimationFrame(()=>{const spot=document.querySelector('.pet-spot');if(!spot)return;spot.querySelector('.nj18-care-feedback')?.remove();const e=document.createElement('div');e.className='nj18-care-feedback';e.setAttribute('role','status');e.textContent=msg;spot.appendChild(e);setTimeout(()=>e.remove(),980)});
};
const nj18PrevHome=home;
home=function(){let h=nj18PrevHome();if(!current())return h;return h.replace('<div class="home-content">','<div class="home-content"><div class="nj18-tag">The Living Legends · 1.8</div>');};
document.title='NUSAJIWA — The Living Legends | Interaction Pass 1.8';
render();
