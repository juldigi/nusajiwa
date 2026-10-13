
(function(){'use strict';
const species=['komodo','tiger','cendrawasih','lembuswana','kuyang','anoa','maleo','bekantan'];
const runes=['✦','✧','☾','☀','❖','❀','✺','◈','✳','✵','♢','☼'];
let busy=false;
function paint(){const root=document.getElementById('nj31-results');if(!root||busy)return;busy=true;try{const cards=root.querySelectorAll('.nj31-card');cards.forEach(card=>{if(card.dataset.nj32Painted)return;const button=card.querySelector('[data-nj31-adopt]');if(!button)return;const key=button.dataset.nj31Adopt||'';const [base,num]=key.split('-');const n=Number(num);if(!species.includes(base)||!Number.isInteger(n))return;
const portrait=document.createElement('div');portrait.className='nj32-portrait';portrait.dataset.rune=runes[n%runes.length];portrait.style.setProperty('--nj32-shift',((n*37+species.indexOf(base)*19)%130-65)+'deg');
try{const pet=virtualPet(base,n===0?3:5);portrait.innerHTML=petSVG(pet,true);}catch(e){portrait.textContent=card.querySelector('.nj31-icon')?.textContent||'✦';}
const icon=card.querySelector('.nj31-icon');if(icon)icon.replaceWith(portrait);else card.prepend(portrait);
const index=document.createElement('span');index.className='nj32-index';index.textContent='#'+String(species.indexOf(base)*38+n+1).padStart(3,'0');card.append(index);
card.style.setProperty('--nj32-hue',String((n*29+species.indexOf(base)*43)%360));
const palette=document.createElement('span');palette.className='nj32-palette';for(let k=0;k<3;k++){const dot=document.createElement('i');dot.style.setProperty('--c',String((n*29+species.indexOf(base)*43+k*34)%360));palette.append(dot);}card.append(palette);
card.dataset.nj32Painted='1';});}finally{busy=false;}}
const observer=new MutationObserver(m=>{if(m.some(x=>[...x.addedNodes].some(n=>n.nodeType===1&&(n.id==='nj31-results'||n.querySelector?.('#nj31-results,.nj31-card')||n.matches?.('.nj31-card')))))paint();});
observer.observe(document.body,{subtree:true,childList:true});
document.addEventListener('click',e=>{if(e.target.closest('[data-nj31-open],[data-nj31-more],[data-nj31-filter]'))requestAnimationFrame(paint);});
document.addEventListener('input',e=>{if(e.target.id==='nj31-search')requestAnimationFrame(paint);});
})();
