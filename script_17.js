'use strict';
/* NUSAJIWA 1.9: quality/performance control for high-resolution character sprites.
   Image sprite asset paths are opt-in and only enabled when bundled. */
const NJ19_ART_ASSETS={};
const nj19PrevSVG=petSVG;
function nj19ArtMode(){try{return localStorage.getItem('nusajiwa_art_quality')||'auto'}catch(e){return 'auto'}}
function nj19HasSprite(p){return !!(p&&p.phase>=4&&NJ19_ART_ASSETS[p.species]);}
petSVG=function(p,small=false){
 const asset=nj19HasSprite(p)?NJ19_ART_ASSETS[p.species]:null;
 if(!asset||nj19ArtMode()==='illustrated')return nj19PrevSVG(p,small);
 const label=escapeHTML(displayName(p));
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 300" role="img" aria-label="${label}"><image href="${asset}" x="0" y="0" width="360" height="300" preserveAspectRatio="xMidYMid meet"/></svg>`;
};
const nj19PrevSettings=settingsModal;
settingsModal=function(){nj19PrevSettings();const pane=document.querySelector('.modal-pane');if(!pane)return;
 const el=document.createElement('div');el.className='nj19-art-toggle';el.innerHTML='<div><b>Mode ilustrasi karakter</b><small>Otomatis menggunakan sprite resolusi tinggi jika tersedia; mode vektor tetap mendukung semua tahap evolusi.</small></div><button type="button" data-nj19-art="toggle"></button>';
 pane.appendChild(el);const b=el.querySelector('button');const upd=()=>b.textContent=nj19ArtMode()==='illustrated'?'Vektor':'Otomatis';upd();
 b.addEventListener('click',()=>{try{localStorage.setItem('nusajiwa_art_quality',nj19ArtMode()==='illustrated'?'auto':'illustrated')}catch(e){}upd();render();});
 const note=document.createElement('p');note.style.cssText='font-size:11px;color:#e9d7af';note.textContent='NUSAJIWA 1.9 · Sprite pipeline ready. Tidak ada gambar yang dimasukkan sebelum aset lolos inspeksi visual, dan renderer vektor tetap menjadi fallback.';pane.appendChild(note);
};
const nj19PrevHome=home;
home=function(){let h=nj19PrevHome();if(!current())return h;return h.replace('The Living Legends · 1.8','The Living Legends · 1.9');};
document.title='NUSAJIWA — The Living Legends | Sprite Pipeline 1.9';
render();
