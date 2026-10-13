'use strict';
/* Character Art Production 1.7: art-direction continuity, no placeholder images shipped. */
const NJ17_PREV_HOME=home;
home=function(){let html=NJ17_PREV_HOME();if(current())html=html.replace('class="pet-spot"','class="pet-spot nj17-pet"');return html;};
const NJ17_PREV_SETTINGS=settingsModal;
settingsModal=function(){NJ17_PREV_SETTINGS();const pane=document.querySelector('.modal-pane');if(pane){const n=document.createElement('p');n.style.cssText='font-size:11px;color:#e9d7af;margin-top:12px';n.textContent='NUSAJIWA 1.7 · Character Art Production. Sistem evolusi, 8 spesies dan animasi tetap aktif. Artwork ilustrasi resolusi tinggi untuk Harimau, Komodo dan Lembuswana sedang melalui produksi aset, belum dipasang ke versi ini.';pane.appendChild(n);}};
document.title='NUSAJIWA — The Living Legends | Character Art Production 1.7';
render();
