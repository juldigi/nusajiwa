'use strict';
/* NUSAJIWA 1.2 — Premium art uplift.
   Focus: richer UI material, cinematic atmosphere, and hand-illustrated renderers
   for every remaining species while keeping save data and gameplay intact. */
(function(){
const css=`
:root{--nj12-gold:#f3d698;--nj12-ink:#071a24;--nj12-panel:rgba(7,35,49,.78);--nj12-panel2:rgba(11,50,69,.78);--nj12-line:rgba(243,214,152,.34)}
.game{background:radial-gradient(circle at 50% 14%,#113349 0%,#081f30 34%,#05131d 72%,#030c14 100%)}
.game::after{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at 50% 0%,rgba(255,227,160,.10),transparent 35%),linear-gradient(180deg,transparent,rgba(0,0,0,.18) 72%,rgba(0,0,0,.36));mix-blend-mode:screen;z-index:3}
.hud{background:linear-gradient(180deg,rgba(4,22,34,.86),rgba(4,22,34,.18) 70%,transparent)}
.hud-logo,.scene-title h1,.hero-name{letter-spacing:1.4px;text-shadow:0 8px 30px rgba(0,0,0,.38),0 0 18px rgba(247,210,144,.07)}
.hud-money,.icon-glass,.game-dock,.story-ribbon,.care-bar,.mini-stat,.nj10-journal,.modal-pane,.map-wrap,.book-card,.creature-shelf,.nest-stage,.island,.ritual-card,.relic-card,.scene-chip,.place-card,.panel,.region-card{background-image:linear-gradient(180deg,rgba(255,255,255,.045),rgba(255,255,255,0));box-shadow:0 18px 50px rgba(0,0,0,.28),inset 0 1px 0 rgba(255,255,255,.06)}
.hud-money,.icon-glass{background-color:rgba(6,39,54,.72)}
.game-dock{background:linear-gradient(180deg,rgba(8,31,44,.95),rgba(5,23,34,.90));border:1px solid rgba(243,214,152,.40);box-shadow:0 16px 60px rgba(0,0,0,.45), inset 0 0 0 1px rgba(255,255,255,.04)}
.game-dock button.selected{background:linear-gradient(180deg,rgba(36,91,110,.95),rgba(18,54,70,.96));box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 8px 18px rgba(8,13,16,.18)}
.story-ribbon,.care-bar,.modal-pane,.nj10-journal,.map-wrap,.nest-stage{position:relative;overflow:hidden}
.story-ribbon::before,.care-bar::before,.modal-pane::before,.nj10-journal::before,.map-wrap::before,.nest-stage::before{content:'';position:absolute;inset:0;pointer-events:none;background:linear-gradient(120deg,rgba(255,255,255,.07),transparent 18% 76%,rgba(255,232,186,.05));mix-blend-mode:screen}
.home-screen::after,.screen::after{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at 15% 20%,rgba(239,200,113,.06),transparent 18%),radial-gradient(circle at 86% 24%,rgba(97,183,204,.05),transparent 16%),radial-gradient(circle at 50% 75%,rgba(255,236,176,.04),transparent 28%);z-index:1}
.pet-spot{filter:drop-shadow(0 34px 45px rgba(1,10,14,.42))}
.pet-ground{width:72%;height:18%;bottom:8%;background:radial-gradient(ellipse,rgba(16,56,63,.50),rgba(2,18,27,.55) 48%,transparent 72%);filter:blur(8px)}
.pet-spot .creature-wrap{filter:drop-shadow(0 20px 18px rgba(0,20,29,.42)) drop-shadow(0 0 32px rgba(251,217,139,.16))}
.pet-spot .aura{opacity:.5;filter:blur(34px)}
.pet-spot .aura-ring{border-style:solid;opacity:.24;box-shadow:0 0 28px rgba(255,221,151,.18), inset 0 0 18px rgba(255,243,209,.08)}
.speech{background:linear-gradient(180deg,#fff7e8,#f1e2bf);border:1px solid rgba(211,170,110,.82);box-shadow:0 14px 26px rgba(0,0,0,.24)}
.mini-stat{background:linear-gradient(180deg,rgba(8,33,45,.88),rgba(7,28,37,.76));border-color:rgba(255,241,192,.20)}
.care-tool{background:linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.01));border-color:rgba(244,216,155,.28);box-shadow:inset 0 1px 0 rgba(255,255,255,.05)}
.care-tool:hover{background:linear-gradient(180deg,rgba(60,101,117,.52),rgba(29,59,74,.55));transform:translateY(-1px)}
.scene-title .eyebrow,.chapter-kicker,.hud-logo small{color:#f1d49a;opacity:.95}
.scene-title p,.hero-sub{color:#efe4cd}
.section-label{letter-spacing:2px}
.starter,.egg-choice,.shelf-pet,.region-pin,.mini-pill,.book-tab,.tab-button,.action-button,.journey-option,.garden-tool,.expedition-option,.story-artifact,.story-portal,.library-row{box-shadow:0 10px 24px rgba(0,0,0,.16)}
.starter,.egg-choice,.shelf-pet,.region-pin,.mini-pill,.book-tab,.tab-button,.action-button,.journey-option,.garden-tool,.expedition-option{background-image:linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,0))}
.nj10-daily-medallion,.scroll-circle{box-shadow:0 0 0 6px rgba(255,226,167,.05),0 10px 28px rgba(0,0,0,.24), inset 0 1px 0 rgba(255,255,255,.08)}
.nj10-quest,.story-scroll,.book-page,.photo-panel{background:linear-gradient(180deg,rgba(9,40,56,.92),rgba(8,31,43,.84));border:1px solid rgba(243,214,152,.25);box-shadow:0 16px 34px rgba(0,0,0,.25)}
.nj10-meter,.progress-bar,.tiny-progress .line{background:rgba(255,255,255,.12)}
.nj10-meter span,.progress-bar span,.tiny-progress .line i{background:linear-gradient(90deg,#f9ebb0,#e9c77d 45%,#b98c50)}
.book-line,.orn-line{background:linear-gradient(90deg,transparent,rgba(243,214,152,.45),transparent)}
.floating-hint,.book-index-mini a,.library-note{color:#f3e4c7}
.starter-list,.creature-shelf,.adoption-rail{gap:14px}
.starter,.egg-choice,.shelf-pet{border-radius:24px;border-color:rgba(243,214,152,.33)}
.map-wrap{background:radial-gradient(circle at 50% 65%,rgba(47,114,126,.92),rgba(17,58,77,.92) 46%,rgba(7,38,53,.98));}
.map-wrap:after{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at 22% 20%,rgba(255,239,190,.10),transparent 18%),radial-gradient(circle at 75% 35%,rgba(255,221,144,.08),transparent 16%),linear-gradient(180deg,transparent,rgba(0,0,0,.18));}
.region-pin{background:linear-gradient(180deg,rgba(31,72,92,.96),rgba(8,40,54,.98));border-color:rgba(243,214,152,.70)}
.nj12-brand{position:absolute;left:50%;top:98px;transform:translateX(-50%);z-index:3;padding:8px 15px;border-radius:999px;background:linear-gradient(180deg,rgba(11,42,59,.72),rgba(8,31,44,.78));border:1px solid rgba(243,214,152,.30);box-shadow:0 12px 28px rgba(0,0,0,.22);font-size:11px;letter-spacing:2px;color:#f5ddb1;text-transform:uppercase;backdrop-filter:blur(10px)}
.nj12-brand b{color:#fff7e2}
.nj12-fireflies{position:absolute;inset:0;z-index:2;pointer-events:none;overflow:hidden}
.nj12-fireflies i{position:absolute;width:4px;height:4px;border-radius:50%;background:#ffe9ac;box-shadow:0 0 18px 5px rgba(255,230,158,.55);opacity:.72;animation:nj12float 6s ease-in-out infinite alternate;left:var(--x);top:var(--y);animation-delay:var(--d)}
@keyframes nj12float{0%{transform:translate3d(0,0,0) scale(.9)}100%{transform:translate3d(16px,-18px,0) scale(1.15);opacity:.2}}
.nj12-hero-frame{position:absolute;inset:18% 10% 17% 10%;border-radius:42px;border:1px solid rgba(246,220,158,.16);box-shadow:0 0 0 1px rgba(255,255,255,.03) inset;pointer-events:none;z-index:1;background:linear-gradient(180deg,rgba(255,255,255,.04),transparent 28%,transparent 72%,rgba(255,255,255,.02))}
@media (max-width:700px){.nj12-brand{top:82px;font-size:10px;padding:7px 12px}.nj12-hero-frame{inset:21% 6% 20% 6%;border-radius:28px}}
`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
})();

function nj12Defs(){return `<defs>
 <radialGradient id="nj12Warm" cx=".28" cy=".14" r="1"><stop stop-color="#ffe4b4"/><stop offset=".32" stop-color="#ebb06a"/><stop offset=".7" stop-color="#a16a49"/><stop offset="1" stop-color="#4c3840"/></radialGradient>
 <radialGradient id="nj12Ivory" cx=".38" cy=".18" r=".9"><stop stop-color="#fff5d6"/><stop offset=".6" stop-color="#ead9b8"/><stop offset="1" stop-color="#c5a686"/></radialGradient>
 <linearGradient id="nj12Deep" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#203a46"/><stop offset=".45" stop-color="#254d5d"/><stop offset="1" stop-color="#091821"/></linearGradient>
 <linearGradient id="nj12Leaf" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#d4f0ce"/><stop offset=".35" stop-color="#7bc6a8"/><stop offset=".75" stop-color="#2d8477"/><stop offset="1" stop-color="#17474a"/></linearGradient>
 <linearGradient id="nj12Magma" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ffe0ab"/><stop offset=".3" stop-color="#e9b05f"/><stop offset=".62" stop-color="#cc7e3e"/><stop offset="1" stop-color="#563941"/></linearGradient>
 <linearGradient id="nj12Night" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ffe6c8"/><stop offset=".28" stop-color="#dd7fa2"/><stop offset=".72" stop-color="#6c4c92"/><stop offset="1" stop-color="#1d2b53"/></linearGradient>
 <linearGradient id="nj12Ash" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ffeccb"/><stop offset=".35" stop-color="#cfbe9b"/><stop offset=".75" stop-color="#817a74"/><stop offset="1" stop-color="#424b53"/></linearGradient>
 <radialGradient id="nj12Eye"><stop stop-color="#ffedb8"/><stop offset=".6" stop-color="#967944"/><stop offset="1" stop-color="#2b2431"/></radialGradient>
 <filter id="nj12Bloom" x="-.5" y="-.5" width="2" height="2"><feGaussianBlur stdDeviation="5"/></filter>
 </defs>`;}

function nj12Komodo(p){const s=p.phase,adult=s>=4,legend=s===7;const aura=legend?(STONES[p.legend]?.aura||'#f7d98d'):'#ffb56c';
 return `<svg viewBox="0 0 360 300" role="img" aria-label="Komodo fantasi premium, tahap ${PHASES[s]}">${nj12Defs()}${legend?`<circle cx="179" cy="150" r="136" fill="none" stroke="${aura}" stroke-width="2" stroke-dasharray="5 11" opacity=".85"/>`:''}<g transform="translate(180 154) scale(${s<=1?.74:s<=3?.86:adult?1.02:.95}) translate(-180 -154)">
 <ellipse cx="182" cy="260" rx="110" ry="12" fill="#091820" opacity=".27"/>
 <path d="M95 178Q56 176 34 156Q42 196 83 202Q54 222 28 220Q57 244 113 224" fill="none" stroke="#5c403f" stroke-width="16" stroke-linecap="round"/>
 <path d="M104 180Q72 178 48 165" fill="none" stroke="#c98954" stroke-width="8" stroke-linecap="round"/>
 <path d="M115 201l-16 42q4 11 28 7l22-45m96-3 13 48q12 9 27 1l-10-61" fill="url(#nj12Magma)" stroke="#64484a" stroke-width="4" stroke-linejoin="round"/>
 <path d="M97 140Q140 109 211 121Q262 134 266 178Q247 223 170 228Q108 224 88 184Q81 156 97 140Z" fill="url(#nj12Ash)" stroke="#5a4d50" stroke-width="4"/>
 <path d="M118 191Q177 200 246 186Q232 215 171 217Q127 217 118 191" fill="url(#nj12Ivory)" opacity=".72"/>
 ${Array.from({length:18},(_,i)=>{const x=112+(i%6)*23,y=144+Math.floor(i/6)*18;return `<ellipse cx="${x}" cy="${y}" rx="7" ry="5" fill="#f8e0b5" opacity=".15"/>`;}).join('')}
 <path d="M214 122Q220 88 245 82Q286 77 307 105Q322 129 312 166Q304 194 276 205Q237 209 220 177Z" fill="url(#nj12Ash)" stroke="#5d5255" stroke-width="4"/>
 <path d="M227 105q-5-35 13-55 17 13 17 44m28-12q15-18 32-13 1 25-20 33" fill="none" stroke="#ecd7b3" stroke-width="4" stroke-linecap="round" opacity=".7"/>
 <path d="M233 146Q250 137 272 143Q286 167 268 188Q241 190 232 171Z" fill="url(#nj12Ivory)" opacity=".88"/>
 <ellipse cx="250" cy="151" rx="10" ry="12" fill="url(#nj12Eye)"/><ellipse cx="283" cy="150" rx="10" ry="12" fill="url(#nj12Eye)"/>
 <ellipse class="nj-blink" cx="250" cy="151" rx="4" ry="8" fill="#1f2230"/><ellipse class="nj-blink" cx="283" cy="150" rx="4" ry="8" fill="#1f2230"/><circle cx="247" cy="147" r="2" fill="#fff"/><circle cx="280" cy="146" r="2" fill="#fff"/>
 <path d="M285 167q18 2 23 14-7 9-18 8" fill="#c66b55" opacity=".72"/><path d="M290 173q17-1 30 5" stroke="#e54a62" stroke-width="3" stroke-linecap="round"/>
 <path d="M130 120q14-13 27-6m72-2q9-11 25-9" fill="none" stroke="#f6e7c8" stroke-width="3" opacity=".5"/>
 <path d="M149 109l12-17 10 16m24-11 10-18 11 15m26-8 12-16 12 17" fill="none" stroke="#f3d28e" stroke-width="4" stroke-linecap="round" opacity=".7"/>
 </g></svg>`;}

function nj12Anoa(p){const s=p.phase,legend=s===7;const ring=legend?`<circle cx="180" cy="150" r="136" fill="none" stroke="${STONES[p.legend]?.aura||'#9de6c8'}" stroke-width="2" stroke-dasharray="8 10" opacity=".82"/>`:'';
 return `<svg viewBox="0 0 360 300" role="img" aria-label="Anoa fantasi premium, tahap ${PHASES[s]}">${nj12Defs()}${ring}<g transform="translate(180 152) scale(${s<=1?.7:s<=3?.82:s>=5?1.03:.95}) translate(-180 -152)">
 <ellipse cx="181" cy="260" rx="111" ry="11" fill="#071a20" opacity=".28"/>
 <path d="M108 201l-13 46q2 12 26 7l21-55m103-4 12 53q10 12 27 5l-10-62" fill="url(#nj12Deep)" stroke="#314e57" stroke-width="4"/>
 <path d="M95 141Q135 104 207 121Q258 134 262 182Q247 220 168 225Q104 221 86 182Q78 158 95 141Z" fill="url(#nj12Deep)" stroke="#33505a" stroke-width="4"/>
 <path d="M105 184Q168 200 240 184Q228 214 172 216Q120 216 105 184" fill="#d9e6dc" opacity=".24"/>
 <path d="M227 123Q227 92 246 84Q282 70 304 102Q316 120 313 154Q304 193 271 201Q229 196 223 163Z" fill="url(#nj12Deep)" stroke="#35525c" stroke-width="4"/>
 <path d="M240 106Q235 48 250 35Q271 53 265 106m15-5Q292 45 313 34Q319 73 290 110" fill="none" stroke="#f4e5c1" stroke-width="4.5" stroke-linecap="round"/>
 <path d="M231 140Q248 131 274 139Q284 168 264 187Q241 189 230 170Z" fill="#f2ead9" opacity=".9"/>
 <ellipse class="nj-blink" cx="250" cy="145" rx="9" ry="10" fill="url(#nj12Eye)"/><ellipse class="nj-blink" cx="284" cy="143" rx="9" ry="10" fill="url(#nj12Eye)"/><ellipse cx="250" cy="145" rx="3" ry="7" fill="#212734"/><ellipse cx="284" cy="143" rx="3" ry="7" fill="#212734"/><circle cx="247" cy="141" r="2.1" fill="#fff"/><circle cx="281" cy="139" r="2.1" fill="#fff"/>
 <path d="M262 168q10-4 16 0l-8 8Z" fill="#826a66"/><path d="M270 176q-2 10-7 10m7-10q1 10 7 10" fill="none" stroke="#826a66" stroke-width="2" stroke-linecap="round"/>
 <path d="M111 131q18 7 26 24m34-35q11 13 10 35m39-34q8 15 2 32" fill="none" stroke="#628493" stroke-width="6" stroke-linecap="round" opacity=".55"/>
 <path d="M84 171Q46 151 41 111Q64 119 93 147" fill="none" stroke="#33505a" stroke-width="16" stroke-linecap="round"/><path d="M82 172Q55 155 46 132" fill="none" stroke="#86b69e" stroke-width="8" stroke-linecap="round"/>
 </g></svg>`;}

function nj12Maleo(p){const s=p.phase,legend=s===7;return `<svg viewBox="0 0 360 300" role="img" aria-label="Maleo fantasi premium, tahap ${PHASES[s]}">${nj12Defs()}${legend?`<circle cx="181" cy="152" r="134" fill="none" stroke="${STONES[p.legend]?.aura||'#f0db9b'}" stroke-width="2" stroke-dasharray="6 9" opacity=".82"/>`:''}<g transform="translate(180 152) scale(${s<3?.76:s<=4?.92:1.05}) translate(-180 -152)">
 <ellipse cx="182" cy="267" rx="77" ry="9" fill="#05151b" opacity=".23"/>
 <path d="M149 161Q97 118 60 132Q77 162 114 188Q80 198 47 191Q77 223 136 211Q177 200 181 182" fill="url(#nj12Leaf)" stroke="#36636c" stroke-width="3.2"/>
 <path d="M110 168Q118 126 161 133Q173 171 146 204Q117 210 110 168Z" fill="url(#nj12Ivory)" opacity=".94" stroke="#9a8864" stroke-width="2"/>
 <path d="M145 139Q136 106 171 92Q211 88 231 131Q248 169 209 207Q172 226 149 191Z" fill="url(#nj12Ash)" stroke="#6b605d" stroke-width="4"/>
 <path d="M157 144Q182 134 211 147Q224 178 201 202Q166 204 157 179Z" fill="url(#nj12Leaf)" opacity=".88"/>
 <path d="M193 104Q200 71 228 69Q246 78 246 103Q248 123 239 136Q247 143 247 161Q238 188 210 184Q183 177 185 139Z" fill="#1e2b36" stroke="#5b6470" stroke-width="3.7"/>
 <ellipse cx="226" cy="92" rx="18" ry="14" fill="#f7eac6" stroke="#ab976e" stroke-width="3"/>
 <path d="M208 111Q229 99 247 116Q251 138 233 149Q214 149 201 130Z" fill="#eef4df" opacity=".92"/>
 <path d="M246 132l40 13-40 14Q261 147 246 132Z" fill="#edd3a0" stroke="#8f7759" stroke-width="2"/>
 <ellipse class="nj-blink" cx="232" cy="123" rx="7" ry="8" fill="url(#nj12Eye)"/><circle cx="234" cy="124" r="4" fill="#232b3b"/><circle cx="233" cy="121" r="1.6" fill="#fff"/>
 <path d="M171 205l-6 39m25-40 4 40" stroke="#b58d66" stroke-width="5" stroke-linecap="round"/>
 <path d="M163 242l-16 5m16-5 8 4m22-3-10 6m10-6 11 3" stroke="#b58d66" stroke-width="3" fill="none" stroke-linecap="round"/>
 ${Array.from({length:9},(_,i)=>`<circle cx="${138+i*9}" cy="${171+(i%3)*7}" r="${i%2?2.5:2}" fill="${i%2?'#fbe1a2':'#c4f1d5'}" opacity=".75"/>`).join('')}
 </g></svg>`;}

function nj12Bekantan(p){const s=p.phase,legend=s===7;return `<svg viewBox="0 0 360 300" role="img" aria-label="Bekantan fantasi premium, tahap ${PHASES[s]}">${nj12Defs()}${legend?`<circle cx="180" cy="150" r="134" fill="none" stroke="${STONES[p.legend]?.aura||'#f2c983'}" stroke-width="2" stroke-dasharray="6 11" opacity=".82"/>`:''}<g transform="translate(180 150) scale(${s<=1?.72:s<=3?.84:s>=5?1.04:.96}) translate(-180 -150)">
 <ellipse cx="183" cy="264" rx="104" ry="10" fill="#08151b" opacity=".24"/>
 <path d="M65 188Q51 151 71 125Q92 108 115 117Q142 134 132 169Q123 196 92 203" fill="none" stroke="#5b413f" stroke-width="16" stroke-linecap="round"/>
 <path d="M126 201l-10 47q6 10 27 5l19-50m89-2 17 46q12 9 27 1l-12-56" fill="url(#nj12Warm)" stroke="#654447" stroke-width="4"/>
 <path d="M99 137Q139 104 204 121Q249 134 254 180Q239 218 172 223Q111 220 94 184Q85 157 99 137Z" fill="url(#nj12Warm)" stroke="#69484a" stroke-width="4"/>
 <path d="M110 181Q167 199 232 184Q223 213 174 215Q127 215 110 181" fill="url(#nj12Ivory)" opacity=".76"/>
 <path d="M223 124Q220 92 247 84Q286 74 304 104Q319 130 309 165Q294 198 265 203Q227 198 219 167Z" fill="url(#nj12Warm)" stroke="#6b4748" stroke-width="4"/>
 <ellipse cx="265" cy="162" rx="24" ry="18" fill="#e2b07b" opacity=".85"/>
 <path d="M261 122Q238 117 236 137Q242 160 269 159Q290 157 292 142Q286 120 261 122Z" fill="url(#nj12Ivory)" opacity=".9"/>
 <ellipse class="nj-blink" cx="248" cy="134" rx="8" ry="9" fill="url(#nj12Eye)"/><ellipse class="nj-blink" cx="282" cy="134" rx="8" ry="9" fill="url(#nj12Eye)"/><ellipse cx="248" cy="134" rx="2.8" ry="7" fill="#1f2332"/><ellipse cx="282" cy="134" rx="2.8" ry="7" fill="#1f2332"/><circle cx="246" cy="131" r="2" fill="#fff"/><circle cx="280" cy="131" r="2" fill="#fff"/>
 <path d="M256 151q8 19 8 33Q255 203 282 205Q310 191 301 170Q295 154 275 151Z" fill="#db936e" opacity=".92" stroke="#955f56" stroke-width="2"/>
 <path d="M258 173q13 1 18 10" fill="none" stroke="#b96d5c" stroke-width="2" stroke-linecap="round"/>
 <path d="M121 128q18 10 10 43m34-49q14 18-2 42m35-30q6 15-1 33" fill="none" stroke="#513b41" stroke-width="7" stroke-linecap="round" opacity=".7"/>
 </g></svg>`;}

function nj12Kuyang(p){const s=p.phase,legend=s===7;const aura=legend?(STONES[p.legend]?.aura||'#f0c4ff'):'#c27dfa';
 return `<svg viewBox="0 0 360 300" role="img" aria-label="Kuyang fantasi premium, tahap ${PHASES[s]}">${nj12Defs()}<defs><radialGradient id="nj12Spirit"><stop stop-color="#fff2e2"/><stop offset=".3" stop-color="#f4becc"/><stop offset=".7" stop-color="#966ac6"/><stop offset="1" stop-color="#281a44"/></radialGradient></defs>${legend?`<circle cx="180" cy="148" r="137" fill="none" stroke="${aura}" stroke-width="2" stroke-dasharray="4 11" opacity=".9"/>`:''}<g transform="translate(180 149) scale(${s<=1?.68:s<=3?.8:s>=5?1.05:.94}) translate(-180 -149)">
 <ellipse cx="180" cy="247" rx="88" ry="11" fill="#06121a" opacity=".16"/>
 <path d="M184 42q46 4 69 44 12 21 5 44-10 30-41 45-28 13-62 8-35-5-58-33-15-18-15-44 0-27 18-42 22-21 53-22z" fill="#2b1c4e" opacity=".56" filter="url(#nj12Bloom)"/>
 <path d="M170 46q41-3 67 23 22 23 22 54 0 26-18 45-24 25-64 25-37 0-60-21-24-20-24-53 0-29 20-49 22-21 57-24z" fill="#2a2147"/>
 <path d="M179 58q34 0 55 17 17 15 18 39 1 27-16 44-21 21-58 21-36 0-55-21-18-19-16-46 2-25 22-39 20-15 50-15z" fill="url(#nj12Spirit)" opacity=".97"/>
 <path d="M130 84Q105 104 95 144Q78 131 73 112Q96 80 130 84Zm103 0q25 18 33 60 19-13 23-32-14-34-56-28Z" fill="#40265f" opacity=".9"/>
 <path d="M123 80Q145 44 180 39Q219 37 239 78Q223 68 204 65Q182 61 158 68Q141 72 123 80Z" fill="#21173b"/>
 <path d="M150 108q18-12 33-10 17 2 28 13m-65 22q14-10 28-9 13 0 24 10" fill="none" stroke="#6b4a74" stroke-width="3" opacity=".55"/>
 <ellipse class="nj-blink" cx="157" cy="117" rx="10" ry="11" fill="#ffedd6"/><ellipse class="nj-blink" cx="205" cy="117" rx="10" ry="11" fill="#ffedd6"/><ellipse cx="157" cy="117" rx="3.2" ry="7.8" fill="#342338"/><ellipse cx="205" cy="117" rx="3.2" ry="7.8" fill="#342338"/><circle cx="154" cy="113" r="2.2" fill="#fff"/><circle cx="202" cy="113" r="2.2" fill="#fff"/>
 <path d="M179 126q7-2 12 2l-7 9Z" fill="#9b5d73"/><path d="M184 136q-5 7-13 9m13-9q6 8 15 10" fill="none" stroke="#97556e" stroke-width="2.2" stroke-linecap="round"/>
 <path d="M133 160Q106 198 96 231Q126 213 149 191M232 160Q256 188 273 229Q241 211 217 192" fill="none" stroke="#6f53a5" stroke-width="10" stroke-linecap="round" opacity=".52"/>
 <g fill="#fbe5ff" opacity=".8"><circle cx="122" cy="122" r="3"/><circle cx="244" cy="118" r="3"/><circle cx="179" cy="77" r="2.8"/><circle cx="143" cy="175" r="2.5"/><circle cx="225" cy="174" r="2.5"/></g>
 </g></svg>`;}

const nj12PrevPetSVG=petSVG;
petSVG=function(p,small=false){
 if(!p||p.phase===0)return nj12PrevPetSVG(p,small);
 const map={komodo:nj12Komodo,anoa:nj12Anoa,maleo:nj12Maleo,bekantan:nj12Bekantan,kuyang:nj12Kuyang};
 return map[p.species]?map[p.species](p):nj12PrevPetSVG(p,small);
};

const nj12Home=home;
home=function(){
 let html=nj12Home();
 if(!current())return html;
 if(!html.includes('nj12-brand')) html=html.replace('<div class="home-content">','<div class="nj12-brand">living world <b>1.2</b> · premium art uplift</div><div class="nj12-fireflies">'+Array.from({length:10},(_,i)=>`<i style="--x:${12+i*8}% ; --y:${18+(i%5)*13}% ; --d:${(i*.41).toFixed(2)}s"></i>`).join('')+'</div><div class="nj12-hero-frame"></div><div class="home-content">');
 return html;
};

const nj12Settings=settingsModal;
settingsModal=function(){nj12Settings();const pane=document.querySelector('.modal-pane');if(!pane)return;pane.querySelectorAll('p').forEach(el=>{if(el.textContent.includes('1.1')||el.textContent.includes('Beta playable')||el.textContent.includes('0.9'))el.textContent='NUSAJIWA 1.2 · Premium Art Uplift · Beta playable. Grafis seluruh makhluk dan UI dipoles menjadi lebih premium. Progres tetap tersimpan lokal; cadangkan melalui Ekspor Save.';});};

document.title='NUSAJIWA — The Living Legends | Living World 1.2';
render();
