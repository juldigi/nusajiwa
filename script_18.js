'use strict';
/* NUSAJIWA 2.0: polished firefly chase, performance fixes, sprite mode correctness */
(function(){const css=`
.nj20-field{position:fixed;inset:0;z-index:900;overflow:hidden;background:radial-gradient(ellipse at 48% 70%,#204f4a 0%,#0b292e 44%,#05131d 100%);color:#fff3d6;touch-action:manipulation}
.nj20-field::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 70% 28%,#a3d59d23,transparent 32%),radial-gradient(ellipse at 10% 80%,#e5b76116,transparent 35%);pointer-events:none}
.nj20-field::after{content:'';position:absolute;inset:auto -20% -14%;height:42%;background:radial-gradient(ellipse,#172f32 25%,transparent 68%);pointer-events:none}
.nj20-top{position:absolute;top:calc(env(safe-area-inset-top,0px) + 24px);left:18px;right:18px;display:flex;justify-content:space-between;align-items:center;z-index:3;gap:12px}
.nj20-counter{background:#071b25b8;border:1px solid #e6ca8766;border-radius:18px;padding:12px 16px;box-shadow:0 8px 30px #0005;backdrop-filter:blur(12px);font-size:13px;letter-spacing:.5px}
.nj20-counter strong{font-size:22px;color:#ffe4a1;display:block;font-weight:600}
.nj20-exit{background:#173039cf;color:#fff3db;border:1px solid #c9b67a88;border-radius:50px;padding:12px 16px;font-size:13px;font-weight:700}
.nj20-instructions{position:absolute;top:22%;left:8%;right:8%;text-align:center;z-index:1;pointer-events:none;text-shadow:0 4px 24px #000b}
.nj20-instructions h2{font:normal clamp(29px,7vw,52px) Georgia,serif;margin:0 0 8px;color:#ffecbf}
.nj20-instructions p{font-size:13px;opacity:.82;line-height:1.5}
.nj20-firefly{position:absolute;z-index:4;left:var(--x);top:var(--y);width:66px;height:66px;border:0;border-radius:50%;background:radial-gradient(circle,#fffbd8 0 7%,#f5f7ac 9% 13%,#fff6b870 20%,#f5d36b00 68%);filter:drop-shadow(0 0 12px #fce99f);animation:nj20Flit 1.5s ease-in-out infinite alternate;touch-action:manipulation;cursor:pointer}
.nj20-firefly::after{content:'✦';font-size:27px;color:#fff8b3;text-shadow:0 0 8px #fff4b0,0 0 23px #f8d95d;position:absolute;inset:0;display:grid;place-items:center}
.nj20-firefly:focus-visible{outline:2px solid white;outline-offset:3px}
@keyframes nj20Flit{from{transform:translate(-50%,-50%) translate(-9px,6px) scale(.87)}to{transform:translate(-50%,-50%) translate(12px,-11px) scale(1.08)}}
.nj20-ambient{position:absolute;inset:0;pointer-events:none;overflow:hidden}
.nj20-ambient i{position:absolute;left:var(--x);top:var(--y);width:3px;height:3px;border-radius:50%;background:#fff4ad;box-shadow:0 0 13px 4px #ebd97799;animation:nj20Glint var(--d) ease-in-out infinite alternate;opacity:.15}
@keyframes nj20Glint{to{opacity:.9;transform:translateY(-20px) scale(1.4)}}
.nj20-progress{position:absolute;bottom:calc(env(safe-area-inset-bottom,0px) + 33px);left:10%;width:80%;z-index:3;height:7px;background:#ffffff30;border-radius:9px;overflow:hidden;border:1px solid #fff5b533}
.nj20-progress b{display:block;height:100%;width:var(--pct);background:linear-gradient(90deg,#a6dcac,#ffe4a0);border-radius:9px;transition:width .2s}
@media(prefers-reduced-motion:reduce){.nj20-firefly,.nj20-ambient i{animation:none}}
`;let s=document.createElement('style');s.textContent=css;document.head.appendChild(s);})();
const nj20OldGameStart=gameStart,nj20OldMiniHit=miniHit,nj20OldFinish=finishMini;
function nj20Ambient(){let out='';for(let i=0;i<38;i++){const x=(i*37+17)%99,y=(i*61+23)%97;out+=`<i style="--x:${x}%;--y:${y}%;--d:${1.5+(i%5)*.6}s;animation-delay:-${i%7}s"></i>`;}return out;}
function nj20Draw(){if(!minigame)return;let remaining=Math.max(0,Math.ceil((minigame.expires-Date.now())/1000));const n=minigame.score;const x=15+Math.random()*70,y=38+Math.random()*43;
 document.getElementById('modalRoot').innerHTML=`<section class="nj20-field" role="dialog" aria-modal="true" aria-label="Permainan tangkap kunang-kunang"><div class="nj20-ambient">${nj20Ambient()}</div><div class="nj20-top"><div class="nj20-counter"><strong>✦ ${n} / 7</strong> Cahaya ditemukan</div><div class="nj20-counter"><strong id="game-time">${remaining}</strong> Detik</div><button class="nj20-exit" data-action="mini-quit">Keluar ✕</button></div><div class="nj20-instructions"><h2>Jejak Cahaya</h2><p>Sentuh kunang-kunang untuk mengumpulkan energi jiwa.</p></div><button class="nj20-firefly" style="--x:${x}%;--y:${y}%;animation-delay:-${Math.random().toFixed(2)}s" data-action="mini-hit" aria-label="Tangkap kunang-kunang ke-${n+1}"></button><div class="nj20-progress" style="--pct:${n/7*100}%"><b></b></div></section>`;modalOpen=true;
}
gameStart=function(){if(!current())return toast('Pilih telur dahulu.');if(minigame)return;minigame={score:0,tries:0,expires:Date.now()+24000};nj20Draw();clearInterval(miniTimer);miniTimer=setInterval(()=>{if(!minigame){clearInterval(miniTimer);return;}if(Date.now()>minigame.expires){finishMini();return;}const el=document.getElementById('game-time');if(el)el.textContent=Math.max(0,Math.ceil((minigame.expires-Date.now())/1000));},150);};
miniHit=function(){if(!minigame||Date.now()>minigame.expires)return;minigame.score++;burst('✦',50,48);sound(580,940);if(minigame.score>=7)finishMini(true);else nj20Draw();};
// A quit should never silently grant rewards: explicit exit confirms before leaving.
const nj20OldHandle=handleClick;
handleClick=function(e){const t=e.target.closest('[data-action]');if(t?.dataset.action==='mini-quit'&&minigame){e.preventDefault();e.stopPropagation();clearInterval(miniTimer);minigame=null;modalOpen=false;document.getElementById('modalRoot').innerHTML='';return;}return nj20OldHandle(e);};
// Correct the quality switch: 'illustrated' means opt-in vector fallback, not automatic.
const nj20PrevPetSVG=petSVG;
petSVG=function(p,small=false){if(nj19ArtMode()==='illustrated')return nj19PrevSVG(p,small);return nj20PrevPetSVG(p,small);};
const nj20PrevSettings=settingsModal;
settingsModal=function(){nj20PrevSettings();const pane=document.querySelector('.modal-pane');if(!pane)return;const el=pane.querySelector('.nj19-art-toggle small');if(el)el.textContent='Otomatis menggunakan ilustrasi PNG jika aset tersedia; Vektor memakai desain evolusi asli. Semua spesies tetap dapat dimainkan.';const note=[...pane.querySelectorAll('p')].find(e=>e.textContent.includes('NUSAJIWA 1.9'));if(note)note.textContent='NUSAJIWA 2.0 · Living Gameplay. Aset karakter resolusi tinggi masih dalam proses integrasi; mode vektor tersedia untuk semua evolusi.';};
document.title='NUSAJIWA — The Living Legends | Living Gameplay 2.0';
