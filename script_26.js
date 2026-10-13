 'use strict';
/* v2.8: emotion-driven animated pet, animation fixes, tactile responses. */
(function(){
const validIds=new Set(['tiger','komodo','lembuswana']);
const moods={happy:{label:'Bahagia',emoji:'✨',color:'#ffd48d'},sleepy:{label:'Mengantuk',emoji:'🌙',color:'#a7b8f7'},hungry:{label:'Lapar',emoji:'🍃',color:'#f6ad70'},sad:{label:'Butuh perhatian',emoji:'💗',color:'#eeb4d2'},calm:{label:'Tenang',emoji:'🌿',color:'#9de3c7'}};
function mood(p){if(!p)return 'calm';const stats=p.stats||{};const val=(...names)=>{for(const n of names)if(Number.isFinite(+stats[n]))return +stats[n];return 70};const energy=val('energy','energi'),hunger=val('hunger','fullness','kenyang'),joy=val('happy','happiness','kebahagiaan'),bond=val('bond','affection','kedekatan');if(energy<28)return 'sleepy';if(hunger<30)return 'hungry';if(joy<30||bond<25)return 'sad';if(joy>68&&energy>50)return 'happy';return 'calm'}
let previous='',lastCare=0;
function apply(){const p=typeof current==='function'?current():null;if(!p||!validIds.has(p.species)||p.phase<3)return;const spot=document.querySelector('.pet-spot');const fig=spot?.querySelector('.nj24-figure');if(!fig)return;
let badge=spot.querySelector('.nj28-mood');if(!badge){badge=document.createElement('div');badge.className='nj28-mood';badge.setAttribute('role','status');badge.setAttribute('aria-live','polite');spot.appendChild(badge)}
const m=mood(p),info=moods[m];badge.style.setProperty('--mood',info.color);if(previous!==m||badge.textContent===''){badge.textContent=info.emoji+' '+info.label;previous=m}
fig.dataset.mood=m;
if(!fig.querySelector('.nj28-shine')){const shine=document.createElement('span');shine.className='nj28-shine';shine.setAttribute('aria-hidden','true');fig.appendChild(shine)}
if(!fig.querySelector('.nj28-ground')){const ground=document.createElement('span');ground.className='nj28-ground';ground.setAttribute('aria-hidden','true');fig.appendChild(ground)}
}
let timer=0;const priorRender=render;render=function(){const r=priorRender.apply(this,arguments);requestAnimationFrame(apply);return r};
const priorCare=care;care=function(a){const r=priorCare.apply(this,arguments);lastCare=Date.now();previous='';requestAnimationFrame(apply);return r};
document.addEventListener('click',e=>{const fig=e.target.closest('.pet-spot .nj24-figure');if(!fig||e.target.closest('button'))return;const now=Date.now();if(now-lastCare<250)return;lastCare=now;const sparkle=document.createElement('span');sparkle.className='nj28-heart';sparkle.textContent=['♥','✦','♡'][Math.floor(now/700)%3];sparkle.setAttribute('aria-hidden','true');sparkle.style.left=(25+Math.random()*50)+'%';fig.appendChild(sparkle);setTimeout(()=>sparkle.remove(),1150)},{passive:true});
document.addEventListener('visibilitychange',()=>{if(document.hidden){clearInterval(timer);timer=0}else if(!timer){apply();timer=setInterval(apply,9000)}});
timer=setInterval(apply,9000);requestAnimationFrame(apply);
})();