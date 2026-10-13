 'use strict';
(function(){
const IDS=new Set(['tiger','komodo','lembuswana']);
const TRACKS={idle:[0,3,0,4],walk:[1,2,1,0],run:[2,1,2],sit:[3],play:[5,2,5,0],sleep:[9],eat:[6,6,0],drink:[7,7,0],clean:[8,8,0],bond:[0,3,0]};
let selection='idle',deadline=0,loop=0,lastKey='',lastSrc='',paused=false;
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
function valid(){let pet=typeof current==='function'?current():null;return pet&&IDS.has(pet.species)&&pet.phase>=3?pet:null}
function frameSrc(id,n){return 'assets/anim_'+id+'_'+n+'.png'}
function updateButtons(){document.querySelectorAll('.nj26-motion-panel button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.motionChoice===selection&&performance.now()<deadline||b.dataset.motionChoice==='idle'&&performance.now()>=deadline)))}
function tick(t){loop=0;if(document.hidden||paused)return;const pet=valid(),fig=document.querySelector('.pet-spot .nj24-figure');if(!pet||!fig){loop=window.setTimeout(()=>{loop=0;start()},900);return}
const mode=t<deadline?selection:'idle';const frames=TRACKS[mode]||TRACKS.idle;const speed=mode==='idle'?1400:mode==='walk'?370:mode==='run'?220:mode==='sleep'?2200:350;const n=frames[Math.floor(t/speed)%frames.length];const key=pet.species+':'+mode+':'+n;
if(key!==lastKey){lastKey=key;fig.dataset.motion=mode;const img=fig.querySelector('img:not(.nj25-outgoing)');const url=frameSrc(pet.species,n);if(img&&lastSrc!==url){lastSrc=url;img.src=url;img.alt='Karakter '+pet.species+' — '+mode;img.onerror=()=>{img.onerror=null;img.src=frameSrc(pet.species,0)};}}
if(mode==='idle'&&selection!=='idle'&&t>=deadline){selection='idle';updateButtons()}
loop=window.setTimeout(()=>{loop=0;start()},reduce.matches?750:65);
}
function start(){if(!loop&&!document.hidden&&!paused)loop=requestAnimationFrame(tick)}
function select(mode){if(!TRACKS[mode])return;selection=mode;deadline=mode==='idle'?0:performance.now()+8500;lastKey='';lastSrc='';updateButtons();start()}
// Capture motion-control clicks and synchronize animation state with the existing renderer.
document.addEventListener('click',e=>{const b=e.target.closest('.nj26-motion-panel button[data-motion-choice]');if(b){select(b.dataset.motionChoice);return}const t=e.target.closest('.pet-spot');if(t&&!e.target.closest('button'))select('bond')},false);
// On re-render, restart the animation without accumulating orphaned loops.
const prevRender=render;render=function(){const out=prevRender.apply(this,arguments);lastKey='';lastSrc='';start();return out};
const prevCare=care;care=function(a){const result=prevCare.apply(this,arguments);select(({feed:'eat',play:'play',clean:'clean',sleep:'sleep',bond:'bond'})[a]||'sit');return result};
document.addEventListener('visibilitychange',()=>{if(document.hidden){if(loop){cancelAnimationFrame(loop);clearTimeout(loop);loop=0}}else start()});
window.addEventListener('pagehide',()=>{paused=true;if(loop){cancelAnimationFrame(loop);clearTimeout(loop);loop=0}});
window.addEventListener('pageshow',()=>{paused=false;start()});
start();
})();