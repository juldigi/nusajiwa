'use strict';
(function(){
 const ids=['tiger','komodo','lembuswana'];
 const options=[['idle','Diam'],['walk','Jalan'],['run','Lari'],['sit','Duduk'],['play','Main'],['sleep','Tidur']];
 let mode='idle',expires=0,enabled=true;
 const previous=creatureView;
 creatureView=function(p,small=false){const result=previous.apply(this,arguments);if(!p||small||p.phase<3||!ids.includes(p.species))return result;
 const now=performance.now(),selected=now<expires?mode:'idle';
 return result.replace(/data-motion="[^"]*"/,'data-motion="'+selected+'"');};
 function apply(name,ms){mode=name;expires=performance.now()+ms;const fig=document.querySelector('.pet-spot .nj24-figure');if(fig){fig.dataset.motion=name;const frame={idle:0,walk:1,run:2,sit:3,play:5,sleep:9}[name]??0;/* frame updates handled by v2.7 scheduler */} document.querySelectorAll('.nj26-motion-panel button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.motionChoice===name)));}
 const priorRender=render;render=function(){const result=priorRender.apply(this,arguments);const pet=current();if(!pet||pet.phase<3||!ids.includes(pet.species))return result;
 const spot=document.querySelector('.pet-spot');if(!spot||spot.querySelector('.nj26-motion-panel'))return result;
 const panel=document.createElement('div');panel.className='nj26-motion-panel';panel.setAttribute('aria-label','Pilihan gerakan karakter');panel.setAttribute('role','group');
 options.forEach(([key,label])=>{const btn=document.createElement('button');btn.type='button';btn.dataset.motionChoice=key;btn.textContent=label;btn.setAttribute('aria-pressed',String(key==='idle'));btn.addEventListener('click',e=>{e.stopPropagation();apply(key,key==='idle'?0:8000)});panel.appendChild(btn)});
 spot.appendChild(panel);return result};
 document.addEventListener('click',e=>{if(e.target.closest('.nj26-motion-panel'))e.stopPropagation()},true);
 document.addEventListener('visibilitychange',()=>{if(document.hidden){mode='idle';expires=0}});
 try{render()}catch(e){console.warn('NJ26 motion controls unavailable',e)}
})();