'use strict';
/* NUSAJIWA 2.1: accessible companion portrait, detailed vitals, and tap-to-bond. */
(function(){
 const button=document.createElement('button');button.type='button';button.className='nj21-profile-button';button.id='nj21-profile-trigger';button.innerHTML='<b>✦ Sahabatku</b>Lihat kondisi jiwa';button.setAttribute('aria-label','Lihat kondisi dan profil makhluk yang sedang dirawat');document.body.appendChild(button);
 const originalRender=render;
 render=function(){originalRender();const pet=current();button.dataset.hide=(!pet||page!=='home')?'yes':'no';};
 function statBar(label,n){const v=Math.max(0,Math.min(100,Number(n)||0));return '<div class="nj21-stat"><span>'+label+'</span><span class="nj21-stat-track"><i style="--progress:'+v+'%"></i></span><b>'+Math.round(v)+'%</b></div>';}
 function showProfile(){const p=current();if(!p)return;const spec=SPECIES[p.species]||{};const stats=p.stats||{};const element=p.legend&&STONES[p.legend]?STONES[p.legend].name:'Belum terbangkitkan';
 const html='<section class="nj21-profile"><div class="nj21-kicker">✦ NUSAJIWA · CATATAN PENJAGA ✦</div><h2>'+escapeHTML(displayName(p))+'</h2><p>'+escapeHTML(spec.name||p.species)+' · '+escapeHTML(PHASES[p.phase]||'')+'</p><div class="nj21-portrait">'+petSVG(p,true)+'</div>'+statBar('Kedekatan',stats.bond)+statBar('Energi',stats.energy)+statBar('Kenyang',stats.hunger)+statBar('Kebersihan',stats.clean)+statBar('Bahagia',stats.happy)+'<div class="nj21-info"><div><small>TAHAP KEHIDUPAN</small>'+escapeHTML(PHASES[p.phase])+' / Legend</div><div><small>RESONANSI LEGENDA</small>'+escapeHTML(element)+'</div></div><p class="nj21-hint">Rawat sahabatmu secara konsisten. Ikatan dan kebiasaan sehari-hari memengaruhi perjalanan menuju wujud Legend.</p><button class="primary-button" data-action="close">Kembali ke dunia ✦</button></section>';
 showModal(html);
 }
 button.addEventListener('click',showProfile);
 const prevCare=care;care=function(a){prevCare(a);};
 const prevSwitch=switchPage;switchPage=function(n){prevSwitch(n);button.dataset.hide=(!current()||n!=='home')?'yes':'no';};
 render();
})();
document.title='NUSAJIWA — The Living Legends | Companion Edition 2.1';
