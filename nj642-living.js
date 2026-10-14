/* NUSAJIWA NJ642 visual integration — v6.42 Living Sanctuary is the default
   while the v8.3 Tamagotchi remains available without clearing any save.
   No independent game clock, 3D renderer, or persistence format is introduced. */
(function(){
'use strict';
const ROOT_ID='nj35',KEY='nusajiwa-ui-mode-nj642';
let mode=null,ready=false,watch=null;
const params=new URLSearchParams(location.search);
const explicit=params.get('view')||params.get('ui');
function initialMode(){
 if(explicit==='retro'||explicit==='tamagotchi')return 'retro';
 if(explicit==='living'||explicit==='642')return 'living';
 try{return localStorage.getItem(KEY)==='retro'?'retro':'living'}catch(_){return 'living'}
}
function apply(next,remember){
 mode=next==='retro'?'retro':'living';
 document.body.classList.toggle('nj42-living',mode==='living');
 document.body.classList.toggle('nj42-retro',mode==='retro');
 const root=document.getElementById(ROOT_ID);
 if(root){
  root.classList.add('njx');
  root.dataset.visualVersion='6.42';
  if(mode==='retro'){
   const panel=root.querySelector('#nj35Side');
   if(panel?.classList.contains('open'))panel.querySelector('.nj-close')?.click();
  }
 }
 const living=document.getElementById('nj42LivingSwitch');
 const retro=document.getElementById('nj42RetroSwitch');
 if(living)living.setAttribute('aria-pressed',String(mode==='retro'));
 if(retro)retro.setAttribute('aria-pressed',String(mode==='living'));
 if(remember)try{localStorage.setItem(KEY,mode)}catch(_){}
 document.dispatchEvent(new CustomEvent('nusajiwa:visual-mode',{detail:{mode}}));
}
function enhance(){
 const root=document.getElementById(ROOT_ID);
 if(!root||ready)return false;
 ready=true;root.classList.add('njx');
 root.dataset.visualVersion='6.42';
 const tools=root.querySelector('.nj-topright')||root.querySelector('.nj-top');
 if(tools&&!document.getElementById('nj42LivingSwitch')){
  const b=document.createElement('button');
  b.id='nj42LivingSwitch';b.type='button';b.className='nj-chip nj42-switch';
  b.title='Beralih ke Tamagotchi 3D';b.setAttribute('aria-label','Buka mode Tamagotchi 3D');
  b.textContent='◈ Tama';
  b.addEventListener('click',e=>{e.stopPropagation();apply('retro',true)});
  tools.appendChild(b);
 }
 const retroTools=document.querySelector('#njt .njt-top-tools');
 if(retroTools&&!document.getElementById('nj42RetroSwitch')){
  const b=document.createElement('button');
  b.id='nj42RetroSwitch';b.type='button';b.textContent='✦ Suaka';
  b.title='Buka desain Living Sanctuary 6.42';
  b.setAttribute('aria-label','Buka tampilan Living Sanctuary');
  b.addEventListener('click',e=>{e.stopPropagation();apply('living',true)});
  retroTools.prepend(b);
 }
 const list=[
  ['roster','.nj-roster-summary','Koleksi'],
  ['explore','#nj38QuestBoard','Jelajah'],
  ['ritual','.nj-stage-track','Altar evolusi'],
  ['archive','.nj-codex-facts','Kodex'],
  ['journal','.nj61-journal-list','Catatan penemuan']
 ];
 const panel=root.querySelector('#nj35Side'),inside=root.querySelector('#nj35SideBody');
 function updatePanel(){
  if(!panel||!inside)return;
  let kind='',title='Menu';
  for(const item of list){if(inside.querySelector(item[1])){kind=item[0];title=item[2];break}}
  if(panel.dataset.panel!==kind)panel.dataset.panel=kind;
  if(panel.dataset.title!==title)panel.dataset.title=title;
 }
 updatePanel();
 if(inside){
  let busy=false;
  const mo=new MutationObserver(()=>{if(busy)return;busy=true;try{updatePanel()}finally{busy=false}});
  mo.observe(inside,{childList:true,subtree:false});
 }
 root.querySelectorAll('.nj-action').forEach(b=>{
  const label=b.querySelector('small')?.textContent?.trim()||'Interaksi';
  if(!b.hasAttribute('aria-label'))b.setAttribute('aria-label',label);
  if(!b.hasAttribute('title'))b.title=label;
 });
 // Restore the editing-design in-page menu without duplicating game navigation.
 const bar=root.querySelector('.nj-topright')||root.querySelector('.nj-top');
 if(bar&&!document.getElementById('nj42MenuButton')){
  const b=document.createElement('button');
  b.id='nj42MenuButton';b.type='button';b.className='nj-chip';
  b.setAttribute('aria-label','Pilihan tampilan');b.setAttribute('aria-expanded','false');
  b.textContent='⋯';bar.appendChild(b);
  const menu=document.createElement('div');menu.id='nj42Menu';menu.hidden=true;
  menu.setAttribute('role','menu');
  menu.innerHTML='<button type="button" role="menuitem" data-action="quality">Kualitas grafis</button>'+
   '<a role="menuitem" href="./atlas-evolusi.html">Atlas evolusi</a>'+
   '<button type="button" role="menuitem" data-action="retro">Konsol Tamagotchi</button>';
  root.appendChild(menu);
  const close=()=>{menu.hidden=true;b.setAttribute('aria-expanded','false')};
  b.addEventListener('click',e=>{e.stopPropagation();menu.hidden=!menu.hidden;b.setAttribute('aria-expanded',String(!menu.hidden))});
  menu.addEventListener('click',e=>{
   const a=e.target.closest('[data-action]');if(!a)return;
   close();
   if(a.dataset.action==='quality')root.querySelector('#nj35Quality')?.click();
   if(a.dataset.action==='retro')apply('retro',true);
  });
  document.addEventListener('click',e=>{if(!menu.hidden&&!menu.contains(e.target)&&e.target!==b)close()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
 }
 apply(mode,false);
 return true;
}
mode=initialMode();
document.body.classList.add(mode==='retro'?'nj42-retro':'nj42-living');
function attempt(){
 if(enhance()){watch?.disconnect();watch=null;return true}
 return false;
}
if(!attempt()){
 watch=new MutationObserver(attempt);
 watch.observe(document.documentElement,{subtree:true,childList:true});
}
window.NUSAJIWA_VISUAL_642={
 version:'6.42-bridge',
 getMode:()=>mode,
 setMode:(m)=>apply(m,true),
 isActive:()=>ready&&document.getElementById(ROOT_ID)?.classList.contains('njx')===true
};
})();