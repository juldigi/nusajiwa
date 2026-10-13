'use strict';
/* NUSAJIWA 1.3 — Premium Flagship Pass.
   Focus: flagship atmosphere, richer biomes, and premium illustration pass for the remaining hero species. */
(function(){
const css=`
:root{--nj13-gold:#f4d89b;--nj13-cream:#fff5de;--nj13-shadow:rgba(0,0,0,.34)}
.home-screen .home-content,.home-bottom,.scene-title,.map-container,.nest-stage,.modal-pane,.nj10-journal{position:relative;z-index:4}
.nj13-scene{overflow:hidden}
.nj13-depth,.nj13-mist,.nj13-frame,.nj13-glowband{position:absolute;inset:0;pointer-events:none}
.nj13-glowband{background:radial-gradient(circle at 50% 18%,rgba(255,238,180,.12),transparent 30%),radial-gradient(circle at 50% 80%,rgba(255,222,140,.05),transparent 22%);mix-blend-mode:screen;z-index:0}
.nj13-frame{border:1px solid rgba(255,234,182,.10);border-radius:42px;inset:17% 9% 18% 9%;box-shadow:0 0 0 1px rgba(255,255,255,.03) inset,0 0 60px rgba(255,229,161,.04) inset;background:linear-gradient(180deg,rgba(255,255,255,.03),transparent 22%,transparent 78%,rgba(255,255,255,.02));z-index:1}
.nj13-depth{z-index:1;opacity:.95}
.nj13-depth svg{width:100%;height:100%}
.nj13-mist{background:radial-gradient(ellipse at 30% 70%,rgba(255,243,214,.10),transparent 30%),radial-gradient(ellipse at 80% 62%,rgba(255,242,214,.08),transparent 26%),linear-gradient(180deg,transparent,rgba(255,255,255,.04) 50%,transparent 85%);filter:blur(12px);animation:nj13mist 8s ease-in-out infinite alternate;z-index:2}
@keyframes nj13mist{0%{transform:translate3d(-6px,0,0)}100%{transform:translate3d(10px,-8px,0)}}
.nj13-orbs{position:absolute;inset:0;z-index:2;pointer-events:none}
.nj13-orbs i{position:absolute;width:10px;height:10px;border-radius:50%;left:var(--x);top:var(--y);background:radial-gradient(circle,#fff3bf,#f4ca73 60%,transparent 70%);opacity:.42;filter:blur(.2px);box-shadow:0 0 18px rgba(255,227,145,.38);animation:nj13orb 7s ease-in-out infinite alternate;animation-delay:var(--d)}
@keyframes nj13orb{0%{transform:translate3d(0,0,0) scale(.7)}100%{transform:translate3d(12px,-20px,0) scale(1.08);opacity:.12}}
.nj13-stage-label{position:absolute;left:50%;top:126px;transform:translateX(-50%);z-index:6;padding:10px 18px;border-radius:999px;background:linear-gradient(180deg,rgba(12,46,65,.82),rgba(8,32,46,.82));border:1px solid rgba(244,216,155,.34);color:#f5ddb0;font-size:11px;letter-spacing:2px;text-transform:uppercase;box-shadow:0 14px 28px rgba(0,0,0,.25);backdrop-filter:blur(12px)}
.nj13-stage-label b{color:#fff6e5}
.pet-spot::before{content:'';position:absolute;width:84%;height:84%;border-radius:50%;background:radial-gradient(circle,rgba(255,229,153,.10),transparent 60%);filter:blur(24px);opacity:.75;z-index:0}
.pet-spot .creature-wrap{position:relative;z-index:2}
.pet-spot .spark{filter:drop-shadow(0 0 10px rgba(255,235,175,.45))}
.nj13-home-plaque{display:inline-flex;align-items:center;gap:8px;margin:12px auto 0;padding:7px 14px;border-radius:999px;background:linear-gradient(180deg,rgba(255,255,255,.10),rgba(255,255,255,.02));border:1px solid rgba(244,216,155,.25);color:#fae4b3;font-size:11px;letter-spacing:1.5px;box-shadow:0 10px 24px rgba(0,0,0,.18)}
.nj13-home-plaque em{font-style:normal;color:#fff6de}
.story-ribbon,.care-bar,.game-dock,.hud-money,.icon-glass,.starter,.egg-choice,.shelf-pet,.region-pin,.book-card,.modal-pane,.nj10-journal,.map-wrap,.nest-stage{box-shadow:0 20px 46px rgba(0,0,0,.30),inset 0 1px 0 rgba(255,255,255,.06)}
.modal-pane,.nj10-journal,.story-scroll,.book-page,.photo-panel{background:linear-gradient(180deg,rgba(10,40,56,.94),rgba(8,30,42,.90));border-color:rgba(244,216,155,.28)}
.scene-title h1,.hero-name{color:var(--nj13-cream)}
.nj13-biome-chip{display:inline-flex;align-items:center;gap:7px;margin-top:10px;padding:7px 14px;border-radius:999px;background:linear-gradient(180deg,rgba(5,28,39,.52),rgba(10,43,57,.58));border:1px solid rgba(244,216,155,.20);font-size:11px;color:#f5dfb4;box-shadow:0 8px 18px rgba(0,0,0,.18)}
.nj13-biome-chip span{font-size:13px}
@media (max-width:700px){.nj13-stage-label{top:104px;font-size:10px;padding:8px 14px}.nj13-frame{inset:20% 5% 20% 5%;border-radius:28px}}
`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
})();

function nj13BiomeClass(key){return ({komodo:'bara',tiger:'bara',kuyang:'rembulan',cendrawasih:'kabut',maleo:'kabut',bekantan:'kabut',anoa:'rimba',lembuswana:'rimba'})[key]||'rimba';}
function nj13DepthSVG(kind){
 if(kind==='bara') return `<svg viewBox="0 0 1200 850" preserveAspectRatio="none" aria-hidden="true"><g opacity=".55"><path d="M0 850L0 670Q140 620 270 640T520 635Q654 618 780 650T1200 625V850Z" fill="#1a2027"/><path d="M0 850L0 720Q130 694 255 703T536 697Q664 686 783 711T1200 698V850Z" fill="#223339" opacity=".74"/></g><g opacity=".72"><path d="M78 760l68-180 55 180ZM196 760l74-154 42 154ZM960 760l58-182 64 182ZM1084 760l51-151 37 151Z" fill="#3d2f34"/><path d="M126 642q16-59 60-95 28 44 30 84m836-11q16-59 61-95 28 44 29 84" stroke="#fbbe72" stroke-opacity=".26" stroke-width="6" fill="none" stroke-linecap="round"/></g></svg>`;
 if(kind==='rembulan') return `<svg viewBox="0 0 1200 850" preserveAspectRatio="none" aria-hidden="true"><g opacity=".55"><path d="M0 850V665Q159 597 297 645T563 651Q718 610 850 641T1200 620V850Z" fill="#1b2245"/><path d="M0 850V722Q146 688 280 705T545 700Q695 675 860 703T1200 700V850Z" fill="#2c2d61" opacity=".75"/></g><g opacity=".55"><circle cx="244" cy="150" r="42" fill="#cbe0ff"/><circle cx="259" cy="146" r="43" fill="#233255"/><path d="M128 754q41-88 94-144 18 67 41 117m728 28q49-93 94-154 19 65 39 109" stroke="#d0b5ff" stroke-opacity=".24" stroke-width="18" stroke-linecap="round" fill="none"/></g></svg>`;
 return `<svg viewBox="0 0 1200 850" preserveAspectRatio="none" aria-hidden="true"><g opacity=".65"><path d="M0 850V676Q149 610 299 650T595 647Q737 616 866 645T1200 633V850Z" fill="#10292d"/><path d="M0 850V726Q157 699 321 707T619 704Q773 688 911 710T1200 705V850Z" fill="#18423f" opacity=".76"/></g><g opacity=".78"><path d="M84 762V375l-52-54 66 18 13-89 30 121 57-31-48 76v346Z" fill="#12393c"/><path d="M1130 772V363l-58-52 69 17 12-84 30 114 54-27-43 73v368Z" fill="#12393c"/><g fill="#274d47" opacity=".85"><ellipse cx="191" cy="714" rx="119" ry="24"/><ellipse cx="1016" cy="722" rx="136" ry="26"/></g></g></svg>`;
}
const nj13PrevScenery=scenery;
scenery=function(key){
 let base=nj13PrevScenery(key);
 const kind=nj13BiomeClass(key);
 const orbs='<div class="nj13-orbs">'+Array.from({length:8},(_,i)=>`<i style="--x:${12+i*10}% ; --y:${20+(i%4)*14}% ; --d:${(i*.36).toFixed(2)}s"></i>`).join('')+'</div>';
 const overlay=`<div class="nj13-glowband"></div><div class="nj13-depth">${nj13DepthSVG(kind)}</div><div class="nj13-mist"></div>${orbs}<div class="nj13-frame"></div>`;
 base=base.replace('<div class="scene-bg">',`<div class="scene-bg nj13-scene ${kind}">`);
 base=base.replace(/<\/div>$/ , overlay+'</div>');
 return base;
};

function nj13Tiger(p){const s=p.phase,legend=s===7,aura=legend?(STONES[p.legend]?.aura||'#ffd684'):'#f2c16c';
 return `<svg viewBox="0 0 360 300" role="img" aria-label="Harimau Sumatra flagship, tahap ${PHASES[s]}">${nj12Defs()}${legend?`<circle cx="180" cy="150" r="135" fill="none" stroke="${aura}" stroke-width="2" stroke-dasharray="4 10" opacity=".86"/>`:''}<g transform="translate(180 151) scale(${s<=1?.78:s<=3?.9:s>=5?1.06:1}) translate(-180 -151)">
 <ellipse cx="183" cy="258" rx="110" ry="12" fill="#071921" opacity=".27"/>
 <path d="M103 186Q42 178 37 122Q39 98 61 95Q81 99 86 122Q71 130 70 147Q74 169 111 173" fill="none" stroke="#42363b" stroke-width="18" stroke-linecap="round"/>
 <path d="M106 184Q64 176 53 133" fill="none" stroke="#d19057" stroke-width="8" stroke-linecap="round"/>
 <path d="M111 197l-12 48q5 12 30 6l19-54m95 1 10 49q8 12 30 6l-11-66" fill="url(#nj12Warm)" stroke="#5d4243" stroke-width="4" stroke-linejoin="round"/>
 <path d="M93 132Q135 101 207 124Q257 139 258 188Q242 225 169 229Q105 225 90 184Q83 154 93 132Z" fill="url(#nj12Warm)" stroke="#5d4042" stroke-width="4"/>
 <path d="M102 164Q135 179 170 176Q215 173 242 185Q220 216 176 218Q126 219 99 192Z" fill="url(#nj12Ivory)" opacity=".84"/>
 <g fill="none" stroke="#3d3034" stroke-width="9" stroke-linecap="round" opacity=".82"><path d="M110 128q19 12 6 46"/><path d="M150 119q12 27-8 43"/><path d="M182 123q14 20 5 47"/><path d="M218 130q14 13 7 39"/><path d="M102 170q12-7 25 1"/><path d="M153 192q-2 17-13 22"/><path d="M216 193q-2 18-12 24"/></g>
 <path d="M223 123Q229 92 250 91Q281 89 296 110Q318 126 313 160L302 188Q286 206 253 201Q225 198 220 170Z" fill="url(#nj12Warm)" stroke="#5d4042" stroke-width="4"/>
 <path d="M232 112L232 77Q249 76 261 98l14-3q11-22 25-18l1 43" fill="url(#nj12Warm)" stroke="#5a3e40" stroke-width="4"/>
 <path d="M240 92q6-7 13 8m31-1q8-12 12-9" stroke="#e4a48f" stroke-width="7" fill="none"/>
 <path d="M236 156q19-13 31 4q18-17 35-6l9 28q-12 24-40 22-30 0-41-19Z" fill="url(#nj12Ivory)"/>
 <ellipse class="nj-blink" cx="251" cy="152" rx="8.2" ry="9.5" fill="url(#nj12Eye)"/><ellipse class="nj-blink" cx="289" cy="152" rx="8.2" ry="9.5" fill="url(#nj12Eye)"/><ellipse cx="251" cy="152" rx="2.5" ry="7" fill="#1e2030"/><ellipse cx="289" cy="152" rx="2.5" ry="7" fill="#1e2030"/><circle cx="248" cy="148" r="2.2" fill="#fff"/><circle cx="286" cy="148" r="2.2" fill="#fff"/>
 <path d="M266 178q8-4 16 0l-8 9Z" fill="#6e4853"/><path d="M274 186q0 8-7 10m7-10q1 8 7 10" fill="none" stroke="#6e4853" stroke-width="2" stroke-linecap="round"/>
 <g fill="none" stroke="#f2e5ca" stroke-width="1.6" opacity=".9"><path d="M290 190q25-17 48-11"/><path d="M287 195q28-6 46 4"/><path d="M248 193q-24-14-47-7"/><path d="M247 198q-28-5-46 7"/></g>
 <g fill="#f6d892" opacity=".7"><path d="M115 116l7-11 7 11-7 11Z"/><circle cx="146" cy="143" r="2.5"/><circle cx="193" cy="141" r="2.5"/></g>
 </g></svg>`;}

function nj13Bird(p){const s=p.phase,legend=s===7,aura=legend?(STONES[p.legend]?.aura||'#d5efc0'):'#87dbc9';
 const tail=Array.from({length:12},(_,i)=>{const x=121+i*10,spread=i-5,tipX=190+spread*21,tipY=276+Math.abs(spread)*.7;return `<path d="M${x} 178Q${x+spread*4} 225 ${tipX} ${tipY}Q${tipX-12} 220 ${x+11} 168" fill="${i%3===0?'url(#nj12Ivory)':i%3===1?'url(#nj12Leaf)':'url(#nj12Night)'}" opacity="${.66+i%3*.08}" stroke="#f2eac9" stroke-opacity=".22" stroke-width="1"/>`;}).join('');
 return `<svg viewBox="0 0 360 300" role="img" aria-label="Cenderawasih flagship, tahap ${PHASES[s]}">${nj12Defs()}${legend?`<circle cx="179" cy="155" r="132" fill="none" stroke="${aura}" stroke-width="2" stroke-dasharray="7 9" opacity=".84"/>`:''}<g transform="translate(180 151) scale(${s<3?.8:s<=4?.96:1.08}) translate(-180 -151)">
 <ellipse cx="181" cy="272" rx="76" ry="8" fill="#00141d" opacity=".24"/> <g class="nj-tail">${tail}</g>
 <path d="M142 160Q88 118 53 132Q70 164 105 188Q67 199 36 190Q68 226 128 210Q170 197 171 180" fill="url(#nj12Leaf)" stroke="#2f6670" stroke-width="3.2"/>
 <path d="M110 167Q119 123 158 133Q172 170 146 201Q117 208 110 167Z" fill="url(#nj12Ivory)" opacity=".92" stroke="#958867" stroke-width="1.8"/>
 <path d="M145 137Q137 103 170 89Q206 86 226 132Q244 171 206 207Q172 226 149 189Z" fill="url(#nj12Ivory)" stroke="#7b665b" stroke-width="4"/>
 <path d="M158 146Q183 132 211 147Q225 180 201 203Q166 204 158 178Z" fill="url(#nj12Leaf)" opacity=".92"/>
 <path d="M193 103Q201 67 227 67Q245 85 233 120Q251 129 248 159Q240 187 212 183Q184 177 185 139Z" fill="#1e283a" stroke="#61616d" stroke-width="3.6"/>
 <path d="M206 110q-2-43 13-69m8 74q10-60 27-65m-25 73q27-38 44-39" fill="none" stroke="url(#nj12Ivory)" stroke-width="4.8" stroke-linecap="round" opacity=".88"/>
 <path d="M208 111Q229 98 247 116Q251 138 232 149Q214 149 201 130Z" fill="#e8f6ec" opacity=".95"/>
 <path d="M246 132l41 13-41 13Q261 146 246 132Z" fill="#efd39f" stroke="#9e7e60" stroke-width="2"/>
 <ellipse class="nj-blink" cx="233" cy="123" rx="7" ry="8" fill="url(#nj12Eye)"/><circle cx="235" cy="124" r="4" fill="#252d42"/><circle cx="234" cy="121" r="1.6" fill="#fff"/>
 <path d="M171 205l-7 39m26-40 3 40" stroke="#b58d66" stroke-width="5" stroke-linecap="round"/>
 <path d="m162 243-16 5m16-5 8 4m22-4-10 6m10-6 11 3" stroke="#b58d66" stroke-width="3" fill="none" stroke-linecap="round"/>
 <g fill="#ffebb5" opacity=".84"><circle cx="139" cy="170" r="3"/><circle cx="138" cy="181" r="2"/><circle cx="205" cy="174" r="3"/><circle cx="186" cy="98" r="2.2"/></g>
 </g></svg>`;}

function nj13Lembuswana(p){const s=p.phase,legend=s===7,aura=legend?(STONES[p.legend]?.aura||'#f0d790'):'#f4d28d';
 const feather=Array.from({length:8},(_,i)=>`<path d="M${137-i*6} ${146-i*6}Q${83-i*10} ${97-i*6} ${54-i*4} ${70-i*6}Q${75-i*5} ${128-i*7} ${120-i*2} ${161-i*3}Z" fill="${i%2?'url(#nj12Ivory)':'url(#nj12Leaf)'}" stroke="#b38a55" stroke-width="1.1" opacity="${.44+i*.06}"/>`).join('');
 return `<svg viewBox="0 0 360 300" role="img" aria-label="Lembuswana flagship, tahap ${PHASES[s]}">${nj12Defs()}${legend?`<circle cx="180" cy="148" r="129" fill="none" stroke="${aura}" stroke-width="2" stroke-dasharray="5 12" opacity=".9"/>`:''}<g transform="translate(179 151) scale(${s<=1?.74:s<=3?.84:s>=6?1.06:.97}) translate(-179 -151)">
 <ellipse cx="181" cy="261" rx="113" ry="11" fill="#071c25" opacity=".28"/>
 <path d="M111 202q-18 30-17 48 7 12 29 4l27-51m74-5 13 55q14 11 28-1l-7-63" fill="url(#nj12Ivory)" stroke="#7d684c" stroke-width="4"/>
 <path d="M94 249l27 2m119 0 22-2" fill="none" stroke="#f3d4a3" stroke-width="6" stroke-linecap="round"/>
 <g class="nj-wing">${feather}</g>
 <path d="M91 134Q129 101 198 125Q246 138 247 185Q233 219 174 225Q109 223 85 180Z" fill="url(#nj12Ash)" stroke="#6b675b" stroke-width="4"/>
 <path d="M108 185Q166 199 232 185Q222 213 177 217Q128 216 108 185" fill="url(#nj12Ivory)" opacity=".80"/>
 ${Array.from({length:28},(_,i)=>{const x=109+(i%8)*15,y=139+Math.floor(i/8)*16;return `<path d="M${x} ${y}q8-6 14 1" fill="none" stroke="#ffe6b2" stroke-width="2.3" opacity=".30"/>`;}).join('')}
 <g class="nj-tail"><path d="M86 165Q30 121 45 92Q53 127 96 142" fill="none" stroke="#a9834f" stroke-width="18" stroke-linecap="round"/><path d="M44 90l19-35 8 33 23-22 4 48" fill="url(#nj12Ivory)" stroke="#7c6a55" stroke-width="3"/></g>
 <path d="M226 130Q220 94 244 84Q281 72 301 100Q320 137 301 168Q300 195 267 201Q224 196 221 163Z" fill="url(#nj12Ash)" stroke="#665f56" stroke-width="4"/>
 <path d="M235 103q-29-34-26-63 16 12 41 51M278 91q26-39 30-57 13 41-8 82" fill="url(#nj12Ivory)" stroke="#9a794e" stroke-width="4" stroke-linecap="round"/>
 <path d="M245 106Q241 59 251 46Q277 62 268 102" fill="#f4e2ba" stroke="#7c795f" stroke-width="4"/>
 <path d="M271 91q23-24 37-20 5 27-24 45" fill="#f4e2ba" stroke="#7c795f" stroke-width="3"/>
 <ellipse cx="266" cy="142" rx="24" ry="29" fill="url(#nj12Ivory)" opacity=".85"/>
 <path d="M294 139q18 7 12 36Q305 195 286 216Q277 220 272 209Q288 188 280 164" fill="url(#nj12Ivory)" stroke="#8a735e" stroke-width="4"/>
 <ellipse class="nj-blink" cx="257" cy="135" rx="9" ry="10" fill="url(#nj12Eye)"/><ellipse cx="260" cy="136" rx="3.1" ry="8.4" fill="#26303a"/><circle cx="256" cy="132" r="3" fill="#fff"/>
 <path d="M234 154q-16 24-3 42" fill="none" stroke="#c6ad7c" stroke-width="6" stroke-linecap="round"/>
 <path d="M230 91q-15-9-28 7m83 0q8-18 23-12" fill="none" stroke="#fff2c5" stroke-width="3" opacity=".6"/>
 <g fill="#f7dea1" opacity=".67"><path d="m160 133 5-12 5 12-5 12Z"/><circle cx="192" cy="156" r="3"/><circle cx="154" cy="187" r="3"/></g>
 </g></svg>`;}

const nj13PrevPetSVG=petSVG;
petSVG=function(p,small=false){
 if(!p||p.phase===0)return nj13PrevPetSVG(p,small);
 const m={tiger:nj13Tiger,cendrawasih:nj13Bird,lembuswana:nj13Lembuswana};
 return m[p.species]?m[p.species](p):nj13PrevPetSVG(p,small);
};

const nj13PrevHome=home;
home=function(){
 let html=nj13PrevHome();
 if(!current())return html;
 const p=current();
 const biomeLabel={bara:['🌋','Belantara Bara'],rembulan:['🌙','Rembulan Mistika'],kabut:['☁','Kabut Kepulauan'],rimba:['🌿','Rimba Purba']}[nj13BiomeClass(p.species)]||['🌿','Rimba Purba'];
 html=html.replace(/<div class="hero-sub">([\s\S]*?)<\/div>/,`<div class="hero-sub">$1</div><div class="nj13-home-plaque">✦ <em>premium flagship pass</em> · living world 1.3</div><div class="nj13-biome-chip"><span>${biomeLabel[0]}</span>${biomeLabel[1]}</div>`);
 if(!html.includes('nj13-stage-label')) html=html.replace('<div class="home-content">','<div class="nj13-stage-label">nusajiwa <b>flagship pass</b></div><div class="home-content">');
 return html;
};

const nj13PrevSettings=settingsModal;
settingsModal=function(){nj13PrevSettings();const pane=document.querySelector('.modal-pane');if(!pane)return;pane.querySelectorAll('p').forEach(el=>{if(el.textContent.includes('1.2')||el.textContent.includes('Premium Art Uplift')||el.textContent.includes('1.1'))el.textContent='NUSAJIWA 1.3 · Premium Flagship Pass · Beta playable. Atmosfer habitat, renderer spesies utama, dan material UI dipoles agar terasa seperti vertical slice game premium. Progres tetap tersimpan lokal; cadangkan melalui Ekspor Save.';});};

document.title='NUSAJIWA — The Living Legends | Living World 1.3';
render();
