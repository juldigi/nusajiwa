'use strict';
/* NUSAJIWA 0.10 — Living World: hand-illustrated creature series & meaningful daily rituals.
   Additive enhancement. Does not change save version or bypass earlier exploration systems. */
const NJ10={version:'1.1',build:'Living World',phase:['Telur','Bayi','Balita','Anak','Remaja','Dewasa','Tua','Legend']};
const nj10OldPetSVG=petSVG;
function nj10Grad(){return `<defs>
 <radialGradient id="nj10Fur" cx=".29" cy=".12" r=".98"><stop stop-color="#ffe1a4"/><stop offset=".38" stop-color="#e49a51"/><stop offset=".72" stop-color="#b4683d"/><stop offset="1" stop-color="#683c36"/></radialGradient>
 <linearGradient id="nj10Shade" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#593d42"/><stop offset=".4" stop-color="#40333d"/><stop offset="1" stop-color="#1c2731"/></linearGradient>
 <radialGradient id="nj10Ivory" cx=".4" cy=".2" r=".9"><stop stop-color="#ffefc5"/><stop offset=".7" stop-color="#e1cba2"/><stop offset="1" stop-color="#ae8a69"/></radialGradient>
 <linearGradient id="nj10Gold" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff1bf"/><stop offset=".36" stop-color="#e9c482"/><stop offset=".76" stop-color="#a77749"/><stop offset="1" stop-color="#5f514e"/></linearGradient>
 <linearGradient id="nj10Azure" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#baf0e4"/><stop offset=".3" stop-color="#52b6ad"/><stop offset=".75" stop-color="#246a82"/><stop offset="1" stop-color="#182f5c"/></linearGradient>
 <linearGradient id="nj10Royal" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fce6b3"/><stop offset=".36" stop-color="#caba87"/><stop offset=".7" stop-color="#9b835b"/><stop offset="1" stop-color="#524f51"/></linearGradient>
 <radialGradient id="nj10Eye"><stop stop-color="#ffe9a1"/><stop offset=".6" stop-color="#8c7740"/><stop offset="1" stop-color="#2f2730"/></radialGradient>
 <filter id="nj10Bloom" x="-.6" y="-.6" width="2.2" height="2.2"><feGaussianBlur stdDeviation="6"/></filter>
 <pattern id="nj10Stripes" patternUnits="userSpaceOnUse" width="26" height="24" patternTransform="rotate(-26)"><path d="M5 -4Q15 8 3 27" fill="none" stroke="#3d3034" stroke-width="8" opacity=".8"/></pattern>
 </defs>`;}
function nj10Tiger(p){const stage=p.phase;const mature=stage>=4;const leg=stage===7;
 const cheeks=stage<3?'<ellipse cx="261" cy="181" rx="10" ry="5" fill="#e9a292" opacity=".62"/>':'';
 const rays=leg?`<circle cx="172" cy="151" r="135" stroke="${STONES[p.legend]?.aura||'#ffdf87'}" stroke-width="2" stroke-dasharray="3 10" fill="none" opacity=".9"/><circle cx="172" cy="151" r="147" fill="none" stroke="#ffcb85" stroke-width="1" opacity=".35"/>`:'';
 const whiskers=Array.from({length:3},(_,i)=>`<path d="M289 ${189+i*5}q${24+i*5} ${-17+i*5} ${47+i*3} ${-10+i*3}M249 ${192+i*4}q-23 ${-10+i*5}-44 ${-5+i*3}"/>`).join('');
 const shadows=Array.from({length:8},(_,i)=>`<path d="M${118+i*15} ${114+(i%3)*9}q-3 ${15+(i%3)*5} ${-11+(i%2)*12} ${22+(i%3)*8}"/>`).join('');
 return `<svg viewBox="0 0 360 300" role="img" aria-label="Harimau Sumatra fantasi, tahap ${PHASES[stage]}">${nj10Grad()}${rays}<g transform="translate(178 150) scale(${stage<=1?.79:stage<=3?.9:mature?1.05:1}) translate(-178 -150)">
 <ellipse cx="182" cy="255" rx="113" ry="12" fill="#071e23" opacity=".27"/>
 <g class="nj-tail"><path d="M105 189C31 177 26 115 69 93Q91 83 89 114Q60 112 67 137Q75 163 126 164" fill="none" stroke="#42363b" stroke-width="20" stroke-linecap="round"/><path d="M107 186C50 176 40 129 68 110" fill="none" stroke="#d18d58" stroke-width="10" stroke-linecap="round"/><path d="M54 120l16 10M60 144l18 5" stroke="#332e38" stroke-width="7" stroke-linecap="round"/></g>
 <path d="M106 199l-10 46q3 11 29 7l15-53M213 198l9 47q8 11 30 5l-11-65" fill="url(#nj10Fur)" stroke="#503e40" stroke-width="4" stroke-linejoin="round"/>
 <path d="M100 242l26 3m100-1 25 0" stroke="#f7d3a1" stroke-width="5" stroke-linecap="round"/>
 <path d="M95 133Q137 105 205 130Q253 145 252 192Q238 228 170 229Q111 225 91 184Q79 154 95 133Z" fill="url(#nj10Fur)" stroke="#583b40" stroke-width="4"/>
 <path d="M99 160Q135 180 168 176Q212 174 239 184Q219 215 179 218Q127 218 100 194Z" fill="url(#nj10Ivory)" opacity=".83"/>
 <path d="M110 128q19 12 4 50m38-60q14 24-8 40m33-38q16 13 6 47m34-37q12 14 2 33M98 174q13-8 24 1m31 17q-4 19-15 24m75-23q-2 18-11 24" fill="none" stroke="#362b32" stroke-width="9" stroke-linecap="round" opacity=".84"/>
 <g><path d="M226 121Q232 92 252 92Q280 90 294 110Q318 125 313 161L303 189Q289 206 255 201Q225 198 221 171Z" fill="url(#nj10Fur)" stroke="#553b3d" stroke-width="4"/>
 <path d="M233 113L232 75Q249 74 261 97l14-3q11-23 25-18l1 44" fill="url(#nj10Fur)" stroke="#513639" stroke-width="4"/><path d="M241 91q6-5 12 9m32-1q8-13 12-9" stroke="#dd9b85" stroke-width="7" fill="none"/>
 <path d="M232 115l10 22m40-22-12 22m20-22-5 30" stroke="#372c34" stroke-width="7" fill="none" stroke-linecap="round"/>
 <path d="M236 157q19-13 31 5q19-18 36-6l9 27q-10 24-38 23-34-1-43-20Z" fill="url(#nj10Ivory)"/>
 <path d="M240 152q8-7 16 2m26-2q8-8 17 0" stroke="#3d3038" stroke-width="3" fill="none" stroke-linecap="round"/>
 <ellipse class="nj-blink" cx="251" cy="152" rx="8" ry="9" fill="url(#nj10Eye)"/><ellipse class="nj-blink" cx="290" cy="152" rx="8" ry="9" fill="url(#nj10Eye)"/><ellipse cx="252" cy="152" rx="2.4" ry="7" fill="#201c28"/><ellipse cx="291" cy="152" rx="2.4" ry="7" fill="#201c28"/><circle cx="249" cy="148" r="2.1" fill="#fff"/><circle cx="287" cy="148" r="2.1" fill="#fff"/>
 <path d="M266 178q8-4 16 0l-8 9Z" fill="#674450"/><path d="M274 185q-1 9-7 10m7-10q1 9 7 10" fill="none" stroke="#674450" stroke-width="2.2" stroke-linecap="round"/>
 <g fill="none" stroke="#f2e4c9" stroke-width="1.7" opacity=".85">${whiskers}</g>${cheeks}</g>
 <g fill="none" stroke="#e0b87c" stroke-width="2.4" opacity=".45"><path d="M106 131q39-17 68-5m39 12q10 10 17 24"/></g>
 </g></svg>`;
}
function nj10Bird(p){const stage=p.phase;const accent=stage===7?(STONES[p.legend]?.aura||'#dbeac3'):'#86dbc7';
 let tail=Array.from({length:11},(_,i)=>{const x=121+i*10;const spread=(i-5);const tipX=189+spread*21,tipY=276+Math.abs(spread)*.5;return `<path d="M${x} 179Q${x+spread*4} 226 ${tipX} ${tipY}Q${tipX-12} 223 ${x+11} 168" fill="${i%3===0?'url(#nj10Gold)':i%3===1?'url(#nj10Azure)':'url(#nj10Shade)'}" opacity="${.67+i%3*.1}" stroke="#d7d5ae" stroke-opacity=".26" stroke-width="1"/>`}).join('');
 const edges=Array.from({length:13},(_,i)=>{const y=132+i*5.8;return `<path d="M141 ${y}q-41 ${10+i*.1}-68 ${-i*.8-15}l${30+i*.3} 29" fill="none" stroke="${i%3===0?'#d9c184':'#49acb4'}" stroke-width="${3+i*.2}" opacity=".64"/>`}).join('');
 return `<svg viewBox="0 0 360 300" role="img" aria-label="Cenderawasih fantasi, tahap ${PHASES[stage]}">${nj10Grad()}
 ${stage===7?`<circle cx="179" cy="158" r="132" stroke="${accent}" stroke-width="2" stroke-dasharray="7 9" fill="none" opacity=".84"/>`:''}
 <g transform="translate(180 151) scale(${stage<3?.78:stage<=4?.94:1.06}) translate(-180 -151)">
 <ellipse cx="181" cy="271" rx="75" ry="8" fill="#00151f" opacity=".23"/> <g class="nj-tail">${tail}</g>
 <path d="M140 160Q89 119 52 132Q68 166 105 188Q67 200 36 190Q69 227 127 211Q170 196 171 181" fill="url(#nj10Azure)" stroke="#295768" stroke-width="3"/>
 <g class="nj-wing">${edges}<path d="M110 168Q118 124 158 133Q171 170 145 201Q119 209 110 168Z" fill="url(#nj10Gold)" opacity=".88"/><path d="M112 165q18 9 28 25m-23-40q15 8 32 30" stroke="#fff1cd" stroke-width="2.4" fill="none" opacity=".56"/></g>
 <path d="M145 137Q137 103 171 90Q205 86 226 132Q243 171 206 207Q172 226 150 189Z" fill="url(#nj10Gold)" stroke="#765f53" stroke-width="4"/>
 <path d="M158 146Q182 132 212 147Q225 180 202 203Q165 204 158 178Z" fill="url(#nj10Azure)" opacity=".88"/>
 <path d="M193 103Q201 66 227 67Q245 86 233 120Q251 129 248 159Q240 187 212 183Q184 177 185 139Z" fill="url(#nj10Shade)" stroke="#645a5e" stroke-width="3.7"/>
 <path d="M205 111q-4-47 9-70m7 74q12-59 29-65m-21 71q36-47 45-36" fill="none" stroke="url(#nj10Gold)" stroke-width="5" stroke-linecap="round"/>
 <path d="M208 111Q229 98 247 116Q251 138 232 149Q214 149 201 130Z" fill="url(#nj10Azure)"/>
 <path d="M246 132l41 13-41 13Q261 146 246 132Z" fill="url(#nj10Ivory)" stroke="#9e7e60" stroke-width="2"/>
 <ellipse class="nj-blink" cx="233" cy="123" rx="7" ry="8" fill="#ffeba9"/><circle cx="235" cy="124" r="4" fill="#252d42"/><circle cx="234" cy="121" r="1.6" fill="#fff"/>
 <path d="M171 205l-7 39m26-40 3 40" stroke="#b58d66" stroke-width="5" stroke-linecap="round"/><path d="m162 243-16 5m16-5 8 4m22-4-10 6m10-6 11 3" stroke="#b58d66" stroke-width="3" fill="none" stroke-linecap="round"/>
 <g fill="#ffdd91" opacity=".8"><circle cx="139" cy="169" r="3"/><circle cx="138" cy="181" r="2"/><circle cx="205" cy="174" r="3"/></g>
 </g></svg>`;
}
function nj10Lembuswana(p){const stage=p.phase;const glow=stage===7?`<circle cx="180" cy="148" r="129" fill="none" stroke="${STONES[p.legend]?.aura||'#f2d68b'}" stroke-width="2" stroke-dasharray="5 12" opacity=".9"/>`:'';
 const feather=Array.from({length:7},(_,i)=>`<path d="M${137-i*6} ${146-i*6}Q${83-i*10} ${97-i*6} ${54-i*4} ${70-i*6}Q${75-i*5} ${128-i*7} ${120-i*2} ${161-i*3}Z" fill="${i%2?'url(#nj10Gold)':'url(#nj10Ivory)'}" stroke="#b38a55" stroke-width="1.2" opacity="${.48+i*.055}"/>`).join('');
 return `<svg viewBox="0 0 360 300" role="img" aria-label="Lembuswana fantasi, tahap ${PHASES[stage]}">${nj10Grad()}${glow}<g transform="translate(179 151) scale(${stage<=1?.72:stage<=3?.83:stage>=6?1.05:.96}) translate(-179 -151)">
 <ellipse cx="181" cy="261" rx="113" ry="11" fill="#071c25" opacity=".28"/>
 <path d="M111 202q-18 30-17 48 7 12 29 4l27-51m74-5 13 55q14 11 28-1l-7-63" fill="url(#nj10Gold)" stroke="#7d684c" stroke-width="4"/>
 <path d="M94 249l27 2m119 0 22-2" fill="none" stroke="#f3d4a3" stroke-width="6" stroke-linecap="round"/>
 <g class="nj-wing">${feather}</g>
 <path d="M91 134Q129 101 198 125Q246 138 247 185Q233 219 174 225Q109 223 85 180Z" fill="url(#nj10Royal)" stroke="#6b675b" stroke-width="4"/>
 <path d="M108 185Q166 199 232 185Q222 213 177 217Q128 216 108 185" fill="url(#nj10Ivory)" opacity=".78"/>
 ${Array.from({length:25},(_,i)=>{const x=109+(i%8)*15,y=139+Math.floor(i/8)*16;return `<path d="M${x} ${y}q8-6 14 1" fill="none" stroke="#ffe6b2" stroke-width="2.5" opacity=".33"/>`}).join('')}
 <g class="nj-tail"><path d="M86 165Q30 121 45 92Q53 127 96 142" fill="none" stroke="#a9834f" stroke-width="18" stroke-linecap="round"/><path d="M44 90l19-35 8 33 23-22 4 48" fill="url(#nj10Gold)" stroke="#7c6a55" stroke-width="3"/></g>
 <path d="M226 130Q220 94 244 84Q281 72 301 100Q320 137 301 168Q300 195 267 201Q224 196 221 163Z" fill="url(#nj10Royal)" stroke="#665f56" stroke-width="4"/>
 <path d="M235 103q-29-34-26-63 16 12 41 51M278 91q26-39 30-57 13 41-8 82" fill="url(#nj10Gold)" stroke="#9a794e" stroke-width="4" stroke-linecap="round"/>
 <path d="M245 106Q241 59 251 46Q277 62 268 102" fill="url(#nj10Ivory)" stroke="#7c795f" stroke-width="4"/>
 <path d="M271 91q23-24 37-20 5 27-24 45" fill="url(#nj10Ivory)" stroke="#7c795f" stroke-width="3"/>
 <ellipse cx="266" cy="142" rx="24" ry="29" fill="url(#nj10Ivory)" opacity=".83"/>
 <path d="M294 139q18 7 12 36Q305 195 286 216Q277 220 272 209Q288 188 280 164" fill="url(#nj10Ivory)" stroke="#8a735e" stroke-width="4"/>
 <ellipse class="nj-blink" cx="257" cy="135" rx="9" ry="10" fill="url(#nj10Eye)"/><ellipse cx="260" cy="136" rx="3.1" ry="8.4" fill="#26303a"/><circle cx="256" cy="132" r="3" fill="#fff"/>
 <path d="M234 154q-16 24-3 42" fill="none" stroke="#c6ad7c" stroke-width="6" stroke-linecap="round"/>
 <path d="M230 91q-15-9-28 7m83 0q8-18 23-12" fill="none" stroke="#fff2c5" stroke-width="3" opacity=".6"/>
 <g fill="#f7dea1" opacity=".67"><path d="m160 133 5-12 5 12-5 12Z"/><circle cx="192" cy="156" r="3"/><circle cx="154" cy="187" r="3"/></g>
 </g></svg>`;
}
petSVG=function(p,small=false){
 if(!p||p.phase===0)return nj10OldPetSVG(p,small);
 const f={tiger:nj10Tiger,cendrawasih:nj10Bird,lembuswana:nj10Lembuswana}[p.species];
 return f?f(p):nj10OldPetSVG(p,small);
};

/* Living ritual: a compact, real daily game loop. Only completed actions count.
  Today key is local-calendar date; a new day yields new tasks. */
const nj10Rituals=[
 {id:'care',symbol:'♡',name:'Rawat sahabat',description:'Rawat sahabatmu 3 kali',goal:3,reward:14},
 {id:'explore',symbol:'◈',name:'Jejak kepulauan',description:'Mulai satu perjalanan darat',goal:1,reward:20},
 {id:'play',symbol:'✦',name:'Cahaya permainan',description:'Temani sahabat bermain sekali',goal:1,reward:12}
];
function nj10Today(){const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');}
function nj10Daily(){let v=state.daily10;
 if(!v||v.day!==nj10Today()||!v.count||typeof v.count!=='object')v={day:nj10Today(),count:{care:0,explore:0,play:0},claimed:{}};
 state.daily10=v;return v;
}
function nj10Count(key,delta=1){if(!current())return;const d=nj10Daily();if(!(key in d.count))return;const req=nj10Rituals.find(q=>q.id===key);if(!req)return;const old=d.count[key];d.count[key]=Math.min(req.goal,Math.max(0,old+delta));if(old<req.goal&&d.count[key]===req.goal){toast('✧ Misi harian selesai: '+req.name);sound(510,790);}save();}
const nj10OldCare=care;
care=function(action){const p=current(),before=p&&JSON.stringify({stats:p.stats,xp:p.xp,touches:p.touches});nj10OldCare(action);if(p&&before!==JSON.stringify({stats:p.stats,xp:p.xp,touches:p.touches})){nj10Count('care');if(action==='play')nj10Count('play');}};
const nj10OldPlayExpedition=playExpedition;
playExpedition=function(region){const was=!!journey;nj10OldPlayExpedition(region);if(!was&&journey&&journey.region===region)nj10Count('explore');};
const nj10OldFinishMini=finishMini;
finishMini=function(won=false){const hasScore=minigame?.score||0;nj10OldFinishMini(won);if(hasScore>0)nj10Count('play');};
function nj10OpenDaily(){if(!current())return toast('Pilih telur pertama untuk membuka misi.');const d=nj10Daily();
 const cleared=nj10Rituals.filter(r=>(d.count[r.id]||0)>=r.goal).length;
 const cards=nj10Rituals.map(r=>{const cur=Math.min(r.goal,d.count[r.id]||0),ready=cur>=r.goal,claimed=!!d.claimed[r.id];return `<div class="nj10-quest ${claimed?'claimed':''}"><span class="nj10-quest-mark">${r.symbol}</span><div class="nj10-quest-body"><b>${r.name}</b><small>${r.description}</small><div class="nj10-meter"><span style="width:${cur/r.goal*100}%"></span></div><small>${cur}/${r.goal} · ✧ ${r.reward} Mutiara</small></div><button class="nj10-claim" ${(!ready||claimed)?'disabled':''} data-nj10="claim" data-quest="${r.id}">${claimed?'Selesai':ready?'Ambil ✦':'Belum'}</button></div>`}).join('');
 showModal(`<div class="nj10-journal"><div class="nj10-kicker">✦ RITUAL PENJAGA · ${escapeHTML(d.day)} ✦</div><h2>Kisah Hari Ini</h2><p class="nj10-lead">Setiap tindakan kecil menjaga ikatan. Selesaikan tiga ritual untuk menerima Mutiara.</p><div class="nj10-daily-medallion"><span>${cleared}</span><small>/ 3 ritual</small></div>${cards}<button class="nj10-trail-link" data-nj10="trail">✦ Buka Jejak Penjaga & pencapaian →</button><p class="nj10-note">Misi berubah setiap pergantian hari mengikuti tanggal perangkat. Progres tersimpan di browser ini.</p></div>`);
}
function nj10Claim(id){const req=nj10Rituals.find(r=>r.id===id),d=nj10Daily();if(!req||d.claimed[id]||(d.count[id]||0)<req.goal)return;
 d.claimed[id]=Date.now();state.pearls+=req.reward;eventLog('Misi harian '+req.name+': +'+req.reward+' Mutiara.');save();sound(490,840);burst('✦');render();nj10OpenDaily();}
const nj10OldHome=home;
home=function(){let html=nj10OldHome();if(!current())return html;
 const daily=nj10Daily();const pending=nj10Rituals.filter(r=>(daily.count[r.id]||0)>=r.goal&&!daily.claimed[r.id]).length;
 // One action replaces the shortcut; no extra dashboard panels over the world.
 html=html.replace(/<button data-trail08="open"><span>✦<\/span>Jejakku<\/button>/,`<button data-nj10="daily"><span>✧</span>Harian${pending?`<em class="nj10-badge">${pending}</em>`:''}</button>`);
 return html;
};
document.addEventListener('click',e=>{const btn=e.target.closest('[data-nj10]');if(!btn)return;e.preventDefault();e.stopImmediatePropagation();if(btn.dataset.nj10==='daily')nj10OpenDaily();if(btn.dataset.nj10==='claim')nj10Claim(btn.dataset.quest);if(btn.dataset.nj10==='trail')openTrail08();},true);
const nj10OldSettings=settingsModal;
settingsModal=function(){nj10OldSettings();const pane=document.querySelector('.modal-pane');if(!pane)return;pane.querySelectorAll('p').forEach(el=>{if(el.textContent.includes('0.9')||el.textContent.includes('Versi 0.2'))el.textContent='NUSAJIWA 1.1 · Living World · Beta playable. Progres tersimpan lokal; cadangkan melalui Ekspor Save.';});};
document.title='NUSAJIWA — The Living Legends | Living World 1.1';
render();
