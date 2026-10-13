'use strict';
/* NUSAJIWA 1.4 — Animation Flagship Pass.
   Focus: creature life, interaction response, and more cinematic evolution moments. */
(function(){
const css=`
:root{--nj14-gold:#f4d89b;--nj14-cream:#fff7e3;--nj14-sky:#0f2d3a}
.pet-spot{transform-origin:center center}
.pet-spot .creature-wrap{animation:nj14Breath 3.8s ease-in-out infinite,nj14Float 5.6s ease-in-out infinite;will-change:transform,filter}
.pet-spot svg .nj-tail{transform-origin:30% 62%;animation:nj14Tail 2.9s ease-in-out infinite alternate;transform-box:fill-box}
.pet-spot svg .nj-wing{transform-origin:42% 56%;animation:nj14Wing 3.6s ease-in-out infinite alternate;transform-box:fill-box}
.pet-spot svg .guardian-crest,.pet-spot .aura-ring{animation:nj14Halo 18s linear infinite}
.pet-spot svg .nj-blink{transform-origin:center center;animation:nj14Blink 6.6s infinite}
.pet-spot svg .nj-head{animation:nj14Head 4.6s ease-in-out infinite;transform-box:fill-box;transform-origin:center center}
.pet-spot svg [fill*="url(#nj12Eye)"],.pet-spot svg [fill*="url(#nj10Eye)"]{filter:drop-shadow(0 0 4px rgba(255,240,188,.22))}
@keyframes nj14Breath{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(3px) scale(1.014)}}
@keyframes nj14Float{0%,100%{filter:drop-shadow(0 18px 18px rgba(0,17,24,.36)) drop-shadow(0 0 26px rgba(248,219,140,.11))}50%{filter:drop-shadow(0 26px 24px rgba(0,17,24,.42)) drop-shadow(0 0 34px rgba(248,219,140,.18))}}
@keyframes nj14Tail{0%{transform:rotate(-4deg) translateX(0)}100%{transform:rotate(7deg) translateX(2px)}}
@keyframes nj14Wing{0%{transform:rotate(-1deg) translateY(0)}100%{transform:rotate(4deg) translateY(-2px)}}
@keyframes nj14Halo{from{transform:rotate(0)}to{transform:rotate(360deg)}}
@keyframes nj14Blink{0%,44%,48%,52%,100%{transform:scaleY(1)}46%,50%{transform:scaleY(.12)}}
@keyframes nj14Head{0%,100%{transform:rotate(0deg) translateY(0)}50%{transform:rotate(.8deg) translateY(-1px)}}
.pet-spot.nj14-react-feed .creature-wrap{animation:nj14Hop .55s ease, nj14Breath 3.8s ease-in-out infinite .55s, nj14Float 5.6s ease-in-out infinite .55s}
.pet-spot.nj14-react-play .creature-wrap{animation:nj14Happy .75s ease, nj14Breath 3.8s ease-in-out infinite .75s, nj14Float 5.6s ease-in-out infinite .75s}
.pet-spot.nj14-react-bond .creature-wrap{animation:nj14Heart .85s ease, nj14Breath 3.8s ease-in-out infinite .85s, nj14Float 5.6s ease-in-out infinite .85s}
.pet-spot.nj14-react-rest .creature-wrap{animation:nj14Rest .75s ease, nj14Breath 3.8s ease-in-out infinite .75s, nj14Float 5.6s ease-in-out infinite .75s}
.pet-spot.nj14-react-wash .creature-wrap{animation:nj14Wash .9s ease, nj14Breath 3.8s ease-in-out infinite .9s, nj14Float 5.6s ease-in-out infinite .9s}
@keyframes nj14Hop{0%{transform:translateY(0) scale(1)}35%{transform:translateY(-13px) scale(1.02)}100%{transform:translateY(0) scale(1)}}
@keyframes nj14Happy{0%{transform:translateY(0) rotate(0)}30%{transform:translateY(-8px) rotate(-1.5deg)}60%{transform:translateY(-2px) rotate(1.5deg)}100%{transform:translateY(0) rotate(0)}}
@keyframes nj14Heart{0%{transform:scale(1)}38%{transform:scale(1.05)}70%{transform:scale(.98)}100%{transform:scale(1)}}
@keyframes nj14Rest{0%{transform:translateY(0)}50%{transform:translateY(5px) scale(.99)}100%{transform:translateY(0)}}
@keyframes nj14Wash{0%{transform:translateY(0) rotate(0)}25%{transform:translateY(-4px) rotate(-1deg)}50%{transform:translateY(0) rotate(1deg)}75%{transform:translateY(-3px) rotate(-.8deg)}100%{transform:translateY(0) rotate(0)}}
.nj14-sparkle-layer{position:absolute;inset:0;pointer-events:none;z-index:4}
.nj14-sparkle{position:absolute;left:var(--x);top:var(--y);color:#ffefb8;font-size:var(--s);opacity:0;animation:nj14Spark .9s ease-out forwards;filter:drop-shadow(0 0 8px rgba(255,236,174,.45))}
@keyframes nj14Spark{0%{transform:translate3d(0,0,0) scale(.5);opacity:0}20%{opacity:1}100%{transform:translate3d(var(--dx),var(--dy),0) scale(1.2);opacity:0}}
.nj14-evolution{position:relative;max-width:min(92vw,560px);padding:22px 22px 18px;text-align:center}
.nj14-evolution:before{content:'';position:absolute;inset:0;border-radius:28px;padding:1px;background:linear-gradient(180deg,rgba(255,236,187,.65),rgba(255,236,187,.12));-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none}
.nj14-evo-kicker{font-size:11px;letter-spacing:3px;color:#f1d49a;text-transform:uppercase;font-weight:800}
.nj14-evo-title{font:400 clamp(28px,5vw,40px) Marcellus,serif;color:#fff7e5;margin:8px 0 4px;text-shadow:0 8px 26px rgba(0,0,0,.30)}
.nj14-evo-sub{font-size:13px;color:#e8dbc0;line-height:1.6;max-width:420px;margin:0 auto 14px}
.nj14-evo-orbit{position:relative;margin:18px auto 10px;width:min(300px,72vw);aspect-ratio:1;display:grid;place-items:center}
.nj14-evo-orbit:before{content:'';position:absolute;inset:10%;border-radius:50%;background:radial-gradient(circle,var(--nj14-aura,rgba(255,227,152,.24)),transparent 64%);filter:blur(12px);animation:nj14PulseAura 2.6s ease-in-out infinite}
.nj14-evo-orbit:after{content:'';position:absolute;inset:5%;border-radius:50%;border:1px solid rgba(255,236,187,.34);box-shadow:0 0 0 12px rgba(255,240,204,.03),inset 0 0 26px rgba(255,240,204,.04);animation:nj14Halo 20s linear infinite}
.nj14-evo-runes{position:absolute;inset:0;border-radius:50%;pointer-events:none}
.nj14-evo-runes i{position:absolute;left:50%;top:50%;width:26px;height:26px;margin:-13px;border-radius:50%;display:grid;place-items:center;color:#ffe8b3;background:linear-gradient(180deg,rgba(255,255,255,.10),rgba(255,255,255,.02));border:1px solid rgba(255,230,180,.28);box-shadow:0 8px 16px rgba(0,0,0,.20);transform:rotate(var(--r)) translateY(-122px) rotate(calc(var(--r)*-1));font-size:13px}
.nj14-evo-card{display:grid;gap:10px;grid-template-columns:repeat(2,minmax(0,1fr));margin:14px 0 18px}
.nj14-evo-mini{padding:12px 10px;border-radius:18px;background:linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.02));border:1px solid rgba(244,216,155,.18);color:#f4e0bb}
.nj14-evo-mini b{display:block;color:#fff7e2;font-size:15px;margin-top:4px}
@keyframes nj14PulseAura{0%,100%{transform:scale(.96);opacity:.6}50%{transform:scale(1.04);opacity:.92}}
@media(max-width:700px){.nj14-evo-card{grid-template-columns:1fr}.nj14-evolution{padding:20px 16px 16px}.nj14-evo-sub{font-size:12px}}
`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
})();

function nj14SpeciesTone(p){const k=p?.species;return ({komodo:'rgba(255,172,96,.26)',tiger:'rgba(255,189,108,.26)',kuyang:'rgba(214,167,255,.24)',cendrawasih:'rgba(153,236,211,.25)',maleo:'rgba(243,226,160,.24)',bekantan:'rgba(249,190,132,.22)',anoa:'rgba(156,224,198,.22)',lembuswana:'rgba(246,214,142,.25)'})[k]||'rgba(255,227,152,.24)';}
function nj14Reaction(action){
 requestAnimationFrame(()=>{
  const spot=document.querySelector('.pet-spot');
  if(!spot)return;
  const map={feed:'nj14-react-feed',play:'nj14-react-play',bond:'nj14-react-bond',rest:'nj14-react-rest',wash:'nj14-react-wash'};
  const cls=map[action]||'nj14-react-bond';
  Object.values(map).forEach(c=>spot.classList.remove(c));
  void spot.offsetWidth; spot.classList.add(cls);
  let layer=spot.querySelector('.nj14-sparkle-layer');
  if(!layer){layer=document.createElement('div');layer.className='nj14-sparkle-layer';spot.appendChild(layer);}
  layer.innerHTML='';
  const icons={feed:'✦',play:'✧',bond:'♡',rest:'☾',wash:'✺'};
  const pts=[[24,44,-14,-24],[73,28,12,-18],[58,68,8,-24],[31,64,-8,-10],[67,52,10,-8]];
  pts.forEach((v,i)=>{const el=document.createElement('span');el.className='nj14-sparkle';el.textContent=icons[action]||'✦';el.style.cssText=`--x:${v[0]}%;--y:${v[1]}%;--dx:${v[2]}px;--dy:${v[3]}px;--s:${14+(i%3)*5}px;animation-delay:${i*0.05}s`;layer.appendChild(el);});
  clearTimeout(spot._nj14t); spot._nj14t=setTimeout(()=>{spot.classList.remove(cls); if(layer)layer.innerHTML='';},950);
 });
}
const nj14PrevCare=care;
care=function(action){nj14PrevCare(action); nj14Reaction(action);};

const nj14PrevShowEvolution=showEvolution;
showEvolution=function(p){
 if(!p)return nj14PrevShowEvolution(p);
 const aura=nj14SpeciesTone(p); const legend=p.phase===7; const glyphs=legend?[STONES[p.legend]?.icon||'✦','✧','✦','☾','✧','✦']:['✦','✧','♡','✦','☀','✧'];
 burst(legend?'✨':'✦'); sound(legend?360:420, legend?940:860);
 const title=legend?'Legenda Terbangkitkan':'Jiwa Bertumbuh';
 const desc=legend?`${escapeHTML(displayName(p))} menyatu dengan energi ${escapeHTML(STONES[p.legend]?.name||'legenda')} dan memasuki bentuk tertinggi.`:`${escapeHTML(displayName(p))} memasuki tahap ${PHASES[p.phase]}. Ikatan, wujud, dan potensinya ikut berkembang.`;
 const stats=`<div class="nj14-evo-card"><div class="nj14-evo-mini">Tahap Baru<b>${PHASES[p.phase]}</b></div><div class="nj14-evo-mini">Aura Jiwa<b>${legend?escapeHTML(STONES[p.legend]?.name||'Legend'):'Bertumbuh'}</b></div></div>`;
 const runes='<div class="nj14-evo-runes">'+glyphs.map((g,i)=>`<i style="--r:${i*(360/glyphs.length)}deg">${g}</i>`).join('')+'</div>';
 showModal(`<div class="nj14-evolution" style="--nj14-aura:${aura}"><div class="nj14-evo-kicker">✦ NUSAGEN AWAKENING ✦</div><div class="nj14-evo-title">${title}</div><p class="nj14-evo-sub">${desc}</p><div class="nj14-evo-orbit">${runes}<div class="creature-wrap" style="width:min(250px,65vw);position:relative;z-index:2">${petSVG(p)}</div></div><p class="travel-story">${escapeHTML(displayName(p))}</p>${stats}<button class="primary-button" data-action="close">Lanjutkan kisahku ✦</button></div>`);
};

const nj14PrevSettings=settingsModal;
settingsModal=function(){nj14PrevSettings();const pane=document.querySelector('.modal-pane');if(!pane)return;pane.querySelectorAll('p').forEach(el=>{if(el.textContent.includes('1.3')||el.textContent.includes('Flagship Pass')||el.textContent.includes('1.2'))el.textContent='NUSAJIWA 1.4 · Animation Flagship Pass · Beta playable. Interaksi, idle motion, dan momen evolusi dipoles agar karakter terasa lebih hidup dan ekspresif. Progres tetap tersimpan lokal; cadangkan melalui Ekspor Save.';});};

document.title='NUSAJIWA — The Living Legends | Living World 1.4';
render();
