/* NUSAJIWA 6.42 source-preserving bridge: authored UI defaults to Living Sanctuary.
   1990s Tamagotchi + 15-level platformer remain accessible without changing saves. */
(function(){
 'use strict';
 const PARAMS=new URLSearchParams(window.location.search);
 const IS_AUDIT=PARAMS.has('audit');
 const requested=PARAMS.get('ui')||PARAMS.get('view');
 const KEY='nj42-display-choice';
 let mode=IS_AUDIT?'tamagotchi':(['retro','classic','tamagotchi'].includes(requested)?'tamagotchi':
  ['sanctuary','living','642'].includes(requested)?'sanctuary':null);
 if(!mode){try{mode=sessionStorage.getItem(KEY)==='tamagotchi'?'tamagotchi':'sanctuary'}
   catch(e){mode='sanctuary'}}
 function setMode(next,persist){
  mode=['tamagotchi','retro','classic'].includes(next)?'tamagotchi':'sanctuary';
  document.body.classList.toggle('nj42-sanctuary',mode==='sanctuary');
  document.body.classList.toggle('nj42-tamagotchi',mode==='tamagotchi');
  // Retain previous integration contracts for keyboard and future UI clients.
  document.body.classList.toggle('nj42-living',mode==='sanctuary');
  document.body.classList.toggle('nj42-retro',mode==='tamagotchi');
  document.body.dataset.njUi='6.42-'+mode;
  if(persist&&!IS_AUDIT){try{sessionStorage.setItem(KEY,mode)}catch(e){}}
  const back=document.getElementById('nj42SwitchBack');
  if(back)back.setAttribute('aria-pressed',String(mode==='sanctuary'));
  const menu=document.getElementById('njxMenu');
  if(menu&&mode==='tamagotchi')menu.hidden=true;
  const root=document.getElementById('nj35');
  if(root){
   if(mode==='sanctuary')root.classList.add('njx');
   else root.querySelector('.nj-side.open .nj-close')?.click();
  }
 }
 function attach(){
  const root=document.getElementById('nj35');
  if(root&&!root.classList.contains('njx'))root.classList.add('njx');
  const menu=document.getElementById('njxMenu');
  if(menu&&!document.getElementById('nj42ModeItem')){
   const btn=document.createElement('button');
   btn.id='nj42ModeItem';btn.type='button';btn.setAttribute('role','menuitem');
   btn.setAttribute('aria-label','Beralih ke permainan Tamagotchi 90-an');
   btn.innerHTML='<span>Mainkan Tamagotchi 90-an</span><b>Mode</b>';
   btn.addEventListener('click',()=>setMode('tamagotchi',true));
   menu.appendChild(btn);
  }
  const header=document.querySelector('#njt .njt-top-tools');
  if(header&&!document.getElementById('nj42SwitchBack')){
   const back=document.createElement('button');
   back.id='nj42SwitchBack';back.type='button';back.textContent='✦ Suaka';
   back.setAttribute('aria-label','Kembali ke tampilan Living Sanctuary');
   back.addEventListener('click',()=>setMode('sanctuary',true));
   header.prepend(back);
  }
  return !!(menu&&header);
 }
 function start(){
  if(IS_AUDIT)return;
  setMode(mode,false);attach();
  if(attach())return;
  const observer=new MutationObserver(()=>{if(attach())observer.disconnect()});
  observer.observe(document.body,{childList:true,subtree:true});
  window.addEventListener('pagehide',()=>observer.disconnect(),{once:true});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
 else start();
 window.NUSAJIWA_UI42={version:'6.42',getMode:()=>mode,setMode:m=>setMode(m,true)};
 window.NUSAJIWA_VISUAL_642={
  version:'6.42-source',getMode:()=>mode==='sanctuary'?'living':'retro',
  setMode:m=>setMode(m,true),isActive:()=>document.getElementById('nj35')?.classList.contains('njx')===true
 };
})();
