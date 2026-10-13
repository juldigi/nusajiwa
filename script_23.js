'use strict';
(function(){
  const SPECIES_ANIM=['tiger','komodo','lembuswana'];
  const FRAMES={idle:[0,3,0,4],walk:[1,2,1,0],run:[2,1,2],sit:[3],lie:[4],play:[5,2,5,0],eat:[6,6,0],drink:[7,7,0],clean:[8,8,0],sleep:[9],bond:[0,3,0],learn:[3,0]};
  const MESSAGES={feed:'Nyam! 🍉',play:'Ayo bermain! ✨',clean:'Segar sekali! 🫧',sleep:'Selamat tidur 🌙',learn:'Aku makin pintar! ✦',bond:'Aku sayang kamu! ♡'};
  const preload={};
  function asset(species,n){return 'assets/anim_'+species+'_'+n+'.png'}
  function preloadAssets(species){if(preload[species])return;preload[species]=true;for(let n=0;n<10;n++){const i=new Image();i.decoding='async';i.src=asset(species,n)}}
  let stateMotion={name:'idle',expires:0},lastFrame=-1,lastSpecies='',lastRender=0,raf=0;
  function setMotion(name,ms){stateMotion={name,expires:performance.now()+ms};lastFrame=-1;}
  function activeMotion(){return performance.now()<stateMotion.expires?stateMotion.name:'idle'}
  function tick(t){raf=0;if(document.hidden)return;const pet=typeof current==='function'?current():null;
    if(!pet||!SPECIES_ANIM.includes(pet.species)||pet.phase<3)return;
    const fig=document.querySelector('.pet-spot .nj24-figure');if(!fig)return;
    preloadAssets(pet.species);
    const motion=activeMotion(), seq=FRAMES[motion]||FRAMES.idle;
    const frame=seq[Math.floor(t/(motion==='idle'?1550:motion==='walk'?420:motion==='sleep'?2400:310))%seq.length];
    if(lastSpecies!==pet.species||lastFrame!==frame||fig.dataset.motion!==motion){
      lastFrame=frame;lastSpecies=pet.species;fig.dataset.motion=motion;
      const old=fig.querySelector('img');const nextSrc=asset(pet.species,frame);
      if(old && !old.src.endsWith(nextSrc) && !old.src.includes(nextSrc+'?')){
        if(matchMedia('(prefers-reduced-motion: reduce)').matches){old.src=nextSrc;}
        else {const next=document.createElement('img');next.className='nj25-incoming';next.alt=old.alt;next.draggable=false;next.src=nextSrc;next.onerror=()=>next.remove();fig.appendChild(next);
          requestAnimationFrame(()=>{next.classList.add('nj25-visible');old.classList.add('nj25-outgoing')});
          setTimeout(()=>{if(old.isConnected)old.remove();next.classList.remove('nj25-incoming','nj25-visible')},205);
          fig.querySelectorAll('img').forEach((im,i)=>{if(i<fig.querySelectorAll('img').length-2)im.remove()});
        }
      }
    }
    raf=requestAnimationFrame(tick);
  }
  function start(){/* v2.7 centralized animation scheduler */}
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&raf){cancelAnimationFrame(raf);raf=0}else start()});
  const oldRender=render;render=function(){const ret=oldRender.apply(this,arguments);lastFrame=-1;start();return ret};
  const oldCare=care;care=function(action){const motion={feed:'eat',play:'play',clean:'clean',sleep:'sleep',learn:'learn',bond:'bond'}[action]||'idle';setMotion(motion,action==='sleep'?3000:1900);const r=oldCare.apply(this,arguments);const fig=document.querySelector('.pet-spot .nj24-figure');if(fig&&MESSAGES[action]){const label=document.createElement('span');label.className='nj25-pet-message';label.textContent=MESSAGES[action];fig.appendChild(label);setTimeout(()=>label.remove(),1650)}start();return r};
  document.addEventListener('click',e=>{const spot=e.target.closest('.pet-spot');if(!spot)return;const pet=typeof current==='function'?current():null;if(!pet||!SPECIES_ANIM.includes(pet.species)||pet.phase<3)return;setMotion('bond',1350);start()});
  document.addEventListener('pointerdown',e=>{const spot=e.target.closest('.pet-spot');if(!spot)return;const pet=typeof current==='function'?current():null;if(!pet||!SPECIES_ANIM.includes(pet.species)||pet.phase<3)return;spot.querySelector('.nj24-figure')?.style.setProperty('filter','drop-shadow(0 0 24px #ffd478aa)');},{passive:true});
  document.addEventListener('pointerup',()=>{document.querySelectorAll('.nj24-figure').forEach(el=>el.style.removeProperty('filter'))},{passive:true});
  start();
})();
