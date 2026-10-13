'use strict';
/* The painted character poses are displayed as production art in the actual habitat.
   Earlier animation modules retain action-based frame switching. */
(function(){
 const biome={tiger:'rimba',komodo:'bara',cendrawasih:'rimba',lembuswana:'kabut',kuyang:'rembulan',anoa:'kabut',maleo:'bara',bekantan:'rimba'};
 const original=window.render;
 if(typeof original!=='function')return;
 function refresh(){
  const p=typeof current==='function'?current():null;
  const home=document.querySelector('.home-screen');
  if(!home)return;
  const key=biome[p?.species]||'rimba';
  home.style.setProperty('--nj-biome','url("assets/land_'+key+'.jpg")');
  const spot=home.querySelector('.pet-spot');
  if(!spot||!p)return;
  if(p.phase===0)return;
  if(['tiger','komodo','lembuswana'].includes(p.species)){
    /* The animation system already injects the frame asset; avoid double artwork. */
    const existing=spot.querySelector('img[src*="anim_"]');
    if(existing){existing.classList.add('nj30-painted-frame');return;}
    const svg=spot.querySelector('.creature-wrap');
    if(svg && !spot.querySelector('.nj30-pet-art')){
      svg.style.opacity='0';
      const frame=document.createElement('span');frame.className='nj30-pet-art';
      const im=document.createElement('img');im.alt='Karakter '+p.species+' bergaya ilustrasi';im.src='assets/anim_'+p.species+'_0.png';
      im.onerror=()=>{frame.remove();svg.style.opacity='1'};
      frame.append(im);spot.append(frame);
    }
  }
 }
 const obs=new MutationObserver(()=>{if(window.__nj30busy)return;window.__nj30busy=true;requestAnimationFrame(()=>{window.__nj30busy=false;refresh()})});
 const root=document.getElementById('main');if(root)obs.observe(root,{childList:true,subtree:false});
 refresh();
})();