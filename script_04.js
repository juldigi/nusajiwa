'use strict';
/* NUSAJIWA 0.5 — nature garden, additional Indonesian fauna, and resonance-driven legend routes.
   Additive only: preserves the `nusajiwa-save-v1` save used by all previous alphas. */
const NEW_FAUNA={
  anoa:{name:'Anoa',nickname:'Rusa Kerbau dari Sulawesi',type:'fauna',origin:'Sulawesi',latin:'Bubalus spp. (kelompok anoa)',tag:'Fauna endemik',base:'#715d53',dark:'#463f45',belly:'#b0a38a',rarity:'Langka',age:'Satwa nyata',fact:'Anoa adalah kelompok kerbau liar bertubuh relatif kecil yang hidup secara alami di Sulawesi dan pulau sekitarnya. Anoa dataran rendah dan anoa pegunungan dikenal sebagai dua jenis yang biasa dibedakan.',culture:'Desain karakter ini merupakan penyederhanaan fantasi, bukan panduan identifikasi jenis anoa atau proses evolusi biologis.',source:'IUCN Red List — Lowland Anoa',sourceUrl:'https://doi.org/10.2305/IUCN.UK.2016-2.RLTS.T3126A46364222.en',legend:{}},
  maleo:{name:'Maleo',nickname:'Penjaga Telur Hangat',type:'fauna',origin:'Sulawesi',latin:'Macrocephalon maleo',tag:'Burung endemik',base:'#313e53',dark:'#1d2733',belly:'#ecd0af',rarity:'Langka',age:'Satwa nyata',fact:'Maleo adalah burung endemik Sulawesi. Telurnya ditimbun di pasir pantai hangat atau tanah yang dipanaskan aktivitas geotermal. Anak maleo menetas dalam keadaan berbulu dan relatif mandiri.',culture:'Telur dan proses pertumbuhan dalam NUSAJIWA adalah mekanisme fantasi virtual pet; perlindungan lokasi peneluran sangat penting bagi maleo di alam nyata.',source:'Bird Conservation International — Maleo nesting grounds',sourceUrl:'https://www.cambridge.org/core/journals/bird-conservation-international/article/assessments-of-maleo-macrocephalon-maleo-nesting-grounds-in-southeast-sulawesi-reveal-severely-threatened-populations/5A75811EDFEB2D91AE6F6ED17F686D3D',legend:{}},
  bekantan:{name:'Bekantan',nickname:'Pengelana Rimba Bakau',type:'fauna',origin:'Kalimantan (Borneo)',latin:'Nasalis larvatus',tag:'Primata khas Borneo',base:'#ce9366',dark:'#7b4e48',belly:'#e8c5a0',rarity:'Langka',age:'Satwa nyata',fact:'Bekantan adalah primata yang hidup secara alami di Borneo, termasuk Kalimantan. Bekantan jantan dewasa biasanya memiliki hidung besar yang khas, dan kelompoknya sering menempati hutan rawa dan tepian sungai.',culture:'Evolusi elemental dalam game tidak menggambarkan perubahan biologis bekantan di alam liar.',source:'IUCN Red List — Proboscis Monkey',sourceUrl:'https://www.iucnredlist.org/search?query=Nasalis%20larvatus&searchType=species',legend:{}}
};
for(const [id,entry] of Object.entries(NEW_FAUNA)){
  for(const [stone,n] of Object.entries(STONES))entry.legend[stone]=entry.name+' '+({fire:'Bara',water:'Tirta',wind:'Bayu',diamond:'Intan',nature:'Rimba',shadow:'Gerhana',thunder:'Halilintar',spirit:'Sukma'}[stone]);
  SPECIES[id]=entry;
}
const prevPetSVG05=petSVG;
function animal05(p){
  if(p.phase===0)return prevPetSVG05(p);
  const dat=SPECIES[p.species],phase=p.phase,base=phase===7?(STONES[p.legend]?.aura||dat.base):dat.base,dark=dat.dark,belly=dat.belly;
  const eyes=`<ellipse cx="232" cy="146" rx="8" ry="10" fill="#fff6dc"/><circle cx="234" cy="148" r="4" fill="#1f3038"/><circle cx="236" cy="146" r="1.5" fill="#fff"/>`;
  let shape='';
  if(p.species==='anoa')shape=`<g><path d="M95 195Q58 175 67 152" stroke="${dark}" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M120 201l-7 60h28l18-57M216 203l7 58h30l5-60" fill="${base}" stroke="${dark}" stroke-width="5"/><ellipse cx="167" cy="172" rx="88" ry="57" fill="${base}" stroke="${dark}" stroke-width="6"/><ellipse cx="166" cy="197" rx="59" ry="23" fill="${belly}" opacity=".72"/><path d="M208 141q-12-49 3-85 14 51 16 60m21 12q35-44 28-68-26 38-43 47" fill="${belly}" stroke="${dark}" stroke-width="5" stroke-linejoin="round"/><path d="M207 124q48-42 87 12 22 44-25 67l-52-10Z" fill="${base}" stroke="${dark}" stroke-width="6"/><ellipse cx="277" cy="185" rx="24" ry="17" fill="${belly}"/>${eyes}<circle cx="288" cy="186" r="4" fill="${dark}"/><path d="M208 125l-18-24q-12-8-16 9l25 33" fill="${base}" stroke="${dark}" stroke-width="5"/></g>`;
  if(p.species==='maleo')shape=`<g><path d="M119 163q-45-61-70-37 15 55 90 73" fill="${dark}" stroke="${dark}" stroke-width="4"/><path d="M146 222l-12 42h31m43-42 11 42h28" fill="none" stroke="#ce9e7b" stroke-width="7" stroke-linecap="round"/><ellipse cx="163" cy="170" rx="75" ry="77" fill="${base}" stroke="${dark}" stroke-width="6"/><ellipse cx="166" cy="198" rx="47" ry="43" fill="${belly}"/><path d="M128 151q-24 29 1 56l29-40Z" fill="${dark}"/><path d="M196 141Q206 86 241 103Q281 119 262 165l-38 31-45-25Z" fill="${base}" stroke="${dark}" stroke-width="6"/><path d="M213 117Q203 43 235 36q27 27 12 80" fill="${dark}" stroke="#d3b88c" stroke-width="4"/><path d="M261 145l53 12-46 14" fill="#e9ac74" stroke="${dark}" stroke-width="3"/>${eyes}<path d="M190 117q18-22 38-15" stroke="#e8d4aa" stroke-width="4" fill="none"/></g>`;
  if(p.species==='bekantan')shape=`<g><path d="M99 191Q27 160 61 114q25-26 26 3-20 37 33 49" stroke="${dark}" stroke-width="18" fill="none" stroke-linecap="round"/><path d="M116 203l-18 55h33l30-51m54-1 23 53h29l-11-61" fill="${base}" stroke="${dark}" stroke-width="6" stroke-linecap="round"/><ellipse cx="169" cy="170" rx="88" ry="61" fill="${base}" stroke="${dark}" stroke-width="6"/><ellipse cx="167" cy="184" rx="57" ry="38" fill="${belly}" opacity=".86"/><path d="M191 119Q195 79 237 84q53 0 59 58l-18 54q-44 35-84-12Z" fill="${base}" stroke="${dark}" stroke-width="6"/><ellipse cx="242" cy="154" rx="44" ry="43" fill="${belly}"/><ellipse cx="189" cy="132" rx="17" ry="21" fill="${dark}"/><ellipse cx="190" cy="135" rx="8" ry="11" fill="${belly}"/>${eyes}<path d="M273 146q32 27 12 57-18 18-35-1 14-21 5-48" fill="#be8068" stroke="${dark}" stroke-width="4"/><path d="M244 203q16 12 33-1" fill="none" stroke="${dark}" stroke-width="4" stroke-linecap="round"/></g>`;
  if(!shape)return prevPetSVG05(p);
  const scale=phase<=1?.68:phase===2?.77:phase===3?.84:phase===4?.92:phase===5?1:phase===6?1.06:1.12;
  const glow=phase===7?`<circle cx="184" cy="159" r="134" fill="none" stroke="${STONES[p.legend]?.aura||'#edc9a1'}" stroke-width="3" stroke-dasharray="7 10" opacity=".82"/>`:'';
  const juvenile=phase<=2?'<g fill="#fdaaa9" opacity=".65"><circle cx="218" cy="168" r="9"/><circle cx="280" cy="180" r="6"/></g>':'';
  const elder=phase===6?'<path d="M109 95q31-17 52-7M248 92q20-8 31 8" stroke="#ece9dc" stroke-width="7" fill="none" opacity=".8"/>':'';
  const w=phase>=4&&phase<7?'<g opacity=".6" stroke="#ffe4b5" fill="none" stroke-width="2"><path d="M81 152q14-63 52-73M262 82q33 16 47 51"/></g>':'';
  return `<svg viewBox="0 0 360 300" role="img" aria-label="Karakter fantasi 2D ${escapeHTML(dat.name)}, ${PHASES[phase]}"><g transform="translate(180 152) scale(${scale}) translate(-180 -152)">${glow}${shape}${juvenile}${elder}${w}</g></svg>`;
}
petSVG=function(p,small=false){
  if(!p)return '';
  let svg=['anoa','maleo','bekantan'].includes(p.species)?animal05(p):prevPetSVG05(p,small);
  if(p.phase===0)return svg;
  const morph=p.phase===1?'<g class="morph-cheeks" opacity=".8"><circle cx="124" cy="208" r="11" fill="#f8a4ad"/><circle cx="230" cy="210" r="11" fill="#f8a4ad"/></g>':
    p.phase===2?'<g fill="#fef3c9" opacity=".83"><circle cx="91" cy="79" r="5"/><circle cx="273" cy="89" r="5"/><circle cx="180" cy="42" r="6"/></g>':
    p.phase===3?'<g fill="none" stroke="#bce7ab" stroke-width="5" opacity=".7"><path d="M76 236q-22-27-7-42m222 17q33-12 37-38"/></g>':
    p.phase===4?'<g fill="#eecb9a" opacity=".7"><path d="m82 75 8-23 8 23 25 8-25 8-8 24-8-24-25-8Z"/></g>':
    p.phase===5?'<path d="M63 260q130 28 245 0" stroke="#fce0a7" opacity=".58" stroke-width="3" fill="none" stroke-dasharray="4 13"/>':
    p.phase===6?'<g fill="none" stroke="#f4e8d0" opacity=".75"><path d="M89 90q21-20 42-17M243 70q23-10 42 7" stroke-width="8"/></g>':
    p.phase===7?'<g fill="#fff5d5" opacity=".9"><path d="m181 19 9 22 22 9-22 9-9 22-9-22-22-9 22-9Z"/></g>':'';
  if(p.guardianAscension&&p.phase===7){
    svg=svg.replace('</svg>',`<g class="guardian-crest"><circle cx="181" cy="151" r="141" stroke="#f7d178" stroke-width="5" fill="none" stroke-dasharray="15 9" opacity=".7"/><path d="M181 8l12 20 23 3-17 15 2 22-20-10-20 10 2-22-17-15 23-3Z" fill="#fde7a1"/></g></svg>`);
  }
  return svg.replace('</svg>',`${morph}</svg>`);
};
const previousDisplayName05=displayName;
displayName=function(p){return p?.guardianAscension&&p.phase===7?'Pramana '+SPECIES[p.species].name:previousDisplayName05(p);};

/* Resonance is determined by care history (elemental affinity), temperament, and bond.
   Stone acquisition alone is not enough to ascend. */
const RESONANCE_TRAIT={fire:'energy',water:'clean',wind:'happy',diamond:'smart',nature:'hunger',shadow:'smart',thunder:'happy',spirit:'bond'};
const RESONANCE_ADVICE={fire:'Istirahat dan jelajah untuk menyalakan keberanian.',water:'Mandikan dan rawat kejernihan air.',wind:'Bermain serta menangkap kunang-kunang.',diamond:'Belajar agar kecerdasan bertumbuh.',nature:'Memberi makan dan merawat Taman Jiwa.',shadow:'Belajar dan jelajahi jejak malam.',thunder:'Bermain dan tantang petualangan.',spirit:'Sayangi sahabat dan jalani ritual Sukma.'};
function resonance05(p,kind){if(!p)return 0;const att=Math.max(0,Number(p.affinity?.[kind])||0),trait=Math.max(0,Number(p.stats?.[RESONANCE_TRAIT[kind]])||0),bond=Math.max(0,Number(p.stats?.bond)||0);return Math.min(100,Math.round(att*4+trait*.56+bond*.20));}
const prevEvolve05=evolve;
evolve=function(){let html=prevEvolve05(),p=current();if(!p||!STONES[chosenStone])return html;const r=resonance05(p,chosenStone),allowed=p.phase===6&&p.stats.bond>=55&&(state.stones[chosenStone]||0)>0&&r>=70;
  const fragment=`<div class="resonance-panel"><div class="resonance-head"><span>✦ Resonansi ${escapeHTML(STONES[chosenStone].name)}</span><b>${r}/70</b></div><div class="resonance-track"><i style="width:${Math.min(100,r/70*100)}%"></i></div><p>${r>=70?'Energi dan kepribadianmu telah menyatu dengan batu.':escapeHTML(RESONANCE_ADVICE[chosenStone])} Jalur Legend dipengaruhi cara merawat sejak kecil.</p></div>`;
  html=html.replace('<div class="ritual-recipe">',fragment+'<button class="resonance-training-button" data-living="train">✦ Latih energi ${escapeHTML(STONES[chosenStone].name)} ↗</button><div class="ritual-recipe">');
  if(!allowed)html=html.replace(/(<button class="primary-button" data-action="legend"[^>]*)(>)/,'$1 disabled$2');
  const gates=sealCount()===6;
  const secret=(gates&&p.phase===6&&p.stats.bond>=85&&p.stats.smart>=65&&(state.stones.spirit||0)>0);
  html=html.replace('<div class="ritual-status">',`<div class="ancestral-path ${gates?'unsealed':''}"><span class="ancestral-icon">✹</span><div><strong>${gates?'Ascension Rahasia: Jiwa Pramana':'? ? ? Jejak Legenda Rahasia'}</strong><small>${gates?'Kedekatan 85 · Cerdas 65 · Batu Sukma · Enam Tanda Penjaga':'Temui keenam Penjaga di seluruh Nusantara untuk mengungkap jalan tersembunyi.'}</small></div>${gates?`<button data-living="ascend" ${secret?'':'disabled'}>Bangkit</button>`:''}</div><div class="ritual-status">`);
  return html;
};
const previousLegend05=legend;
legend=function(id){const p=current();if(p&&resonance05(p,id)<70)return toast('Resonansi belum cukup. '+RESONANCE_ADVICE[id]);previousLegend05(id);};
function ascendPramana05(){const p=current();if(!p||p.phase!==6||sealCount()!==6||p.stats.bond<85||p.stats.smart<65||(state.stones.spirit||0)<1){toast('Syarat Jiwa Pramana belum terpenuhi.');return;}
  state.stones.spirit--;p.phase=7;p.legend='spirit';p.guardianAscension=true;eventLog(p.name+' menemukan Legenda Pramana.');save();render();showEvolution(p);
}

/* Persistent micro-game: living 2D sanctuary rather than a static garden dashboard. */
const GARDEN_SPECIES=[{name:'Pucuk Senja',petals:'#f9b58e',glow:'#ffd4a4',loot:'amber',icon:'🌺'},{name:'Lumut Bintang',petals:'#a3e9c0',glow:'#a6edc5',loot:'jade',icon:'🌿'},{name:'Teratai Sukma',petals:'#b9b3f8',glow:'#d5c5fb',loot:'spirit',icon:'🪷'}];
function dayKey05(){const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');}
function gardenState05(){if(!Array.isArray(state.garden)||state.garden.length!==3)state.garden=[0,1,2].map(i=>({stage:0,lastHarvest:'',touches:0}));return state.garden;}
function growPlant05(i){const v=GARDEN_SPECIES[i],plot=gardenState05()[i],level=plot.stage;const glow=v.glow;
  if(level===0)return `<g><ellipse cx="90" cy="147" rx="70" ry="22" fill="#392f2a"/><path d="M63 139q28-14 53 0" stroke="#b99165" stroke-width="4" fill="none"/></g>`;
  const h=level===1?49:level===2?82:level===3?123:138,stem=`<path d="M90 140q-8-47 0-${h}" fill="none" stroke="#75b487" stroke-width="7" stroke-linecap="round"/><path d="M90 109q-29-28-47-10 17 24 45 23m3-42q19-30 44-19-5 29-44 34" fill="#7bd398" stroke="#427f66" stroke-width="3"/>`;
  let flower='';
  if(level>=3){flower=`<g transform="translate(90 ${140-h})"><circle r="15" fill="${glow}" opacity=".65"/><g fill="${v.petals}" stroke="${glow}" stroke-width="2">${[0,60,120,180,240,300].map(a=>`<ellipse cx="0" cy="-21" rx="13" ry="24" transform="rotate(${a})"/>`).join('')}</g><circle r="13" fill="#ffdf8b"/><circle r="5" fill="#fff3c5"/></g>`;}
  return `<g><ellipse cx="90" cy="145" rx="69" ry="18" fill="#342925"/>${stem}${flower}${level===1?'<path d="M90 97q-26-26-38-8m38 7q15-28 31-24" fill="#a9e7ad"/>':''}</g>`;
}
function grovePlot05(i){const plot=gardenState05()[i],plant=GARDEN_SPECIES[i],ready=plot.stage>=3,completed=plot.lastHarvest===dayKey05(),label=completed?'Tumbuh kembali besok':plot.stage===0?'Tanam biji':plot.stage===1?'Siram tunas':plot.stage===2?'Rawat pucuk':ready?'Petik cahaya':'Sentuh bunga';
  return `<button class="grove-plot stage-${plot.stage}" data-living="plot" data-plot="${i}" aria-label="${plant.name}: ${label}"><span class="grove-title">${plant.icon} ${plant.name}</span><svg viewBox="0 0 180 168" role="img" aria-label="${label}"><circle cx="90" cy="112" r="82" fill="${plant.glow}" opacity=".08"/>${growPlant05(i)}</svg><span class="grove-plot-tip">${label}</span></button>`;
}
let groveOpen05=false;
function groveScreen05(){if(!groveOpen05)return;const p=current(),garden=gardenState05();if(!p){closeGrove05();return;}
  const root=document.getElementById('modalRoot');root.innerHTML=`<section class="grove-world" role="dialog" aria-label="Taman Jiwa" aria-modal="true"><div class="grove-sky"><div class="grove-moon">✺</div><span class="grove-hill hill-one"></span><span class="grove-hill hill-two"></span><span class="grove-hill hill-three"></span><span class="grove-fireflies">✧ ✦ ✧</span></div><div class="grove-topbar"><div><small>✦ SUAKA KEHIDUPAN ✦</small><h2>Taman Jiwa</h2><p>Rawat tiga tanaman fantasi bersama ${escapeHTML(p.name)}.</p></div><button data-living="close" aria-label="Kembali ke habitat">✕</button></div><div class="grove-companion">${petSVG(p)}<span>✦ Sahabat kebunmu ✦</span></div><div class="grove-plots">${garden.map((_,i)=>grovePlot05(i)).join('')}</div><div class="grove-ground"><div class="grove-water">◌</div><div class="grove-rushes">❧ ❧ ❧ ❧ ❧</div></div><div class="grove-footer"><span>✧ Sentuh tanaman: tanam → siram → rawat → petik</span><small>Hadiah maksimal satu panen per tanaman per hari. Semua tanaman adalah flora fantasi game.</small></div></section>`;
}
function openGrove05(){if(!current())return toast('Pilih telur dulu untuk memasuki Taman Jiwa.');if(journey)return;gardenState05();groveOpen05=true;modalOpen=true;groveScreen05();sound(340,600);}
function closeGrove05(){if(!groveOpen05)return;groveOpen05=false;closeModal();render();}
function makeGrovePlot05(i){const t=document.createElement('div');t.innerHTML=grovePlot05(i);return t.firstElementChild;}
function touchPlot05(i){if(!groveOpen05||!Number.isInteger(i)||i<0||i>2)return;const plot=gardenState05()[i],today=dayKey05();
  if(plot.stage===4&&plot.lastHarvest!==today){plot.stage=0;save();document.querySelector(`[data-living=plot][data-plot="${i}"]`)?.replaceWith(makeGrovePlot05(i));toast('Musim baru! Tanam benih kembali.');return;}
  if(plot.lastHarvest===today){toast('Bunganya beristirahat. Pulanglah besok.');return;}
  const prev=plot.stage;
  if(plot.stage<3){plot.stage++;plot.touches++;}
  else{plot.stage=4;plot.lastHarvest=today;const p=current();state.inventory[GARDEN_SPECIES[i].loot]=(state.inventory[GARDEN_SPECIES[i].loot]||0)+1;state.pearls+=8;p.stats.bond=cap(p.stats.bond+4);p.stats.happy=cap(p.stats.happy+5);p.affinity.nature=(p.affinity.nature||0)+5;if(p.phase<7)applyXP(p,14);eventLog('Memetik '+GARDEN_SPECIES[i].name+' dan menemukan '+MATERIALS[GARDEN_SPECIES[i].loot][1]+'.');}
  save();document.querySelector(`[data-living=plot][data-plot="${i}"]`)?.replaceWith(makeGrovePlot05(i));burst(prev>=3?'✨':prev===1?'💧':'🌱',35+i*15,62);sound(prev>=3?490:350,prev>=3?960:680);
  if(prev>=3)toast('+8 Mutiara · +1 '+MATERIALS[GARDEN_SPECIES[i].loot][1]+' · +14 XP!');else toast(['Benih tertanam di tanah!','Tunas menyerap air.','Bunga mulai mekar!'][prev]);
}
const previousHome05=home;
home=function(){let s=previousHome05();if(!current())return s;return s.replace('<div class="home-bottom">','<div class="home-bottom"><button class="garden-entry" data-living="open" aria-label="Masuk Taman Jiwa"><span>🌿</span> Taman Jiwa <small>↗</small></button>');};
const previousSettings05=settingsModal;
settingsModal=function(){previousSettings05();const pane=document.querySelector('.modal-pane');if(pane)pane.innerHTML=pane.innerHTML.replace('Versi 0.4 — Alpha Kisah Para Penjaga','Versi 0.5 — Alpha Dunia yang Hidup');};
// Event delegation in capture phase prevents the generic [data-action] click handler from interfering.
document.addEventListener('click',function(e){const t=e.target.closest('[data-living]');if(!t)return;e.preventDefault();e.stopImmediatePropagation();switch(t.dataset.living){case 'open':openGrove05();break;case 'close':closeGrove05();break;case 'plot':touchPlot05(Number(t.dataset.plot));break;case 'ascend':ascendPramana05();break;case 'train':startTraining05();break;case 'train-choice':chooseTraining05(t.dataset.choice);break;case 'train-close':closeTraining05();break;}},true);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&groveOpen05){e.preventDefault();e.stopImmediatePropagation();closeGrove05();}},true);
// The grove is a new saved feature, initialized lazily to avoid changing old saves during ordinary page loads.

// Hatch and age-change cutscenes exit the garden cleanly before the reveal.
const previousShowEvolution05=showEvolution;
showEvolution=function(p){if(groveOpen05){groveOpen05=false;render();}previousShowEvolution05(p);};

// Expanded starting selection: original fauna, new Sulawesi/Kalimantan fauna, and two folklore paths.
starterModal=function(){showModal('<div class="chapter-kicker">✦ SELAMAT DATANG, PENJAGA ✦</div><h2>Pilih Telur Pertamamu</h2><p>Enam jiwa menunggu. Pilih sahabat pertama; yang lain bisa ditemukan di Suaka Jiwa.</p><div class="starter-list">'+['komodo','maleo','anoa','bekantan','lembuswana','kuyang'].map(id=>'<button class="starter" data-action="starter-choose" data-species="'+id+'">'+creatureView(virtualPet(id,0))+'<b>'+SPECIES[id].name+'</b><small>'+SPECIES[id].tag+'</small></button>').join('')+'</div><p class="modal-disclaimer">Wujud elemen bersifat fantasi. Fakta fauna dan mitologi tersedia terpisah di Kodex.</p>',true);};
// Base scripts render on load before extensions are registered; refresh the unopened starter.
if(!current() && document.querySelector('[data-action="starter-choose"]'))starterModal();

// Elemental training: a short symbol-finding game, not a spreadsheet-style stat adjustment.
let training05=null;
const TRAINING_CHOICES=['🔥','💧','🌪️','💎','🌿','🌑','⚡','🔮'];
function startTraining05(){
  if(!current())return;
  if(training05)return;
  const p=current(),id=chosenStone,key=p.id+'/'+id;
  const last=Number(state.trains?.[key]||0),wait=Math.max(0,60000-(Date.now()-last));
  if(wait>0)return toast('Energi sedang pulih. Tunggu '+Math.ceil(wait/1000)+' detik untuk latihan berikutnya.');
  training05={id,key,round:0,correct:0,sequence:Array.from({length:4},()=>Math.floor(Math.random()*TRAINING_CHOICES.length))};
  showTraining05();sound(420,670);
}
function showTraining05(){
  if(!training05)return;
  const t=training05,correct=t.sequence[t.round],items=[correct,(correct+1)%8,(correct+3)%8,(correct+5)%8].sort((a,b)=>((a*11+t.round*3)%13)-((b*11+t.round*3)%13));
  showModal('<div class="training-world"><div class="chapter-kicker">✦ NUSAGEN • LATIHAN ELEMEN ✦</div><h2>Ritual Percikan</h2><p>Temukan lambang yang menyala di tengah lingkaran untuk menyelaraskan jiwa makhluk.</p><div class="training-orb">'+TRAINING_CHOICES[correct]+'</div><div class="training-round">Putaran '+(t.round+1)+' / 4</div><div class="training-choice-grid">'+items.map(i=>'<button data-living="train-choice" data-choice="'+i+'" aria-label="Pilih simbol '+TRAINING_CHOICES[i]+'">'+TRAINING_CHOICES[i]+'</button>').join('')+'</div><div class="training-tip">Menyelesaikan 4 putaran memberikan resonansi '+escapeHTML(STONES[t.id].name)+'.</div><button class="guardian-skip" data-living="train-close">Kembali ke altar</button></div>');
}
function chooseTraining05(choice){if(!training05)return;const t=training05,c=Number(choice);if(c!==t.sequence[t.round]){sound(350,230);toast('Bukan simbol itu. Coba lagi!');return;}
  t.correct++;t.round++;sound(400+t.round*80,700+t.round*80);
  if(t.round<4){showTraining05();return;}
  const p=current();if(p){p.affinity[t.id]=(p.affinity[t.id]||0)+10;p.stats.bond=cap(p.stats.bond+3);p.stats.energy=cap(p.stats.energy-4);if(p.phase<7)applyXP(p,12);}
  if(!state.trains)state.trains={};state.trains[t.key]=Date.now();
  state.pearls+=3;eventLog('Resonansi '+STONES[t.id].name+' diperdalam melalui Ritual Percikan.');
  save();training05=null;render();closeModal();
  showModal('<div class="training-victory"><span>✦</span><h2>Resonansi Bersinar!</h2><p>Latihan selesai! Energi '+escapeHTML(STONES[t.id].name)+' kini lebih kuat.</p><div class="loot-row"><span>+10 afinitas</span><span>+12 XP</span><span>+3 Mutiara</span></div><button class="primary-button" data-living="train-close">Kembali ke altar ✦</button></div>');
  burst(STONES[t.id].icon,50,44);
}
function closeTraining05(){training05=null;closeModal();render();}
