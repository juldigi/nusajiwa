import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const main=read('script_32.js'),style=read('css_34.css');
test('NJ134 bottom navigation says Main and distinguishes it from care interactivity',()=>{
 assert.match(main,/data-njtab="explore"[^>]*>.*?<small>Main<\/small>/);
 assert.match(main,/data-njcare="play"[^>]*>.*?<small>Hibur<\/small>/);
 assert.ok(main.includes('MAIN KLASIK · 32 STAGE'));
 assert.ok(main.includes('Jelajah Evolusi · 15 Stage'));
});
test('NJ134 progressive disclosure hides expedition until requested, with explicit mode hierarchy',()=>{
 assert.ok(main.includes('<details class="nj134-expedition">'));
 assert.ok(main.includes('<summary><span>Ekspedisi & Batu Elemen</span>'));
 assert.ok(main.includes("</div></div></details>';"));
 assert.ok(!main.includes('<details class="nj134-expedition" open'));
 assert.ok(main.includes('id="nj35Classic32"'));
 assert.ok(main.includes('id="nj35Adventure15"'));
});
test('NJ134 panels have reversible scrim, inert and ARIA with keyboard escape',()=>{
 assert.ok(main.includes('id="nj134Backdrop" hidden'));
 assert.ok(main.includes("$('#nj35Side').inert=true;"));
 assert.ok(main.includes("panel.classList.add('open');panel.inert=false;panel.setAttribute('aria-hidden','false');"));
 assert.ok(main.includes("panel.classList.remove('open');panel.setAttribute('aria-hidden','true');panel.inert=true;"));
 assert.ok(main.includes("if(e.target?.id==='nj134Backdrop'){closeSide();return;}"));
 assert.ok(main.includes("if(e.key==='Escape'){closeSide();e.preventDefault()}"));
 assert.ok(main.includes("x.setAttribute('aria-current',current?'page':'false')"));
});
test('NJ134 UI has mobile bottom sheet, large targets and preserves 3D',()=>{
 assert.ok(style.includes('.nj-side[data-panel="explore"]{top:clamp(175px,25dvh,280px)'));
 assert.ok(style.includes('min-height:68px!important'));
 assert.ok(style.includes('min-width:44px'));
 assert.ok(style.includes('.nj134-expedition>summary'));
 assert.ok(style.includes('#nj35ZoomIn,#nj35.njx #nj35ZoomOut{display:none!important}'));
 assert.ok(!style.includes('#nj35 .nj-scene{display:none'));
});
test('NJ134 visual layer recognizes the reorganized play hub',()=>{
 const layer=read('script_34.js');
 assert.ok(layer.includes("['explore', '#nj38QuestBoard', 'Main & Ekspedisi']"));
 assert.ok(layer.includes("root.classList.add('njx')"));
 const html=read('index.html');
 for(const x of ['script_32.js?v=9.14.134','script_34.js?v=9.14.134',
 'css_34.css?v=9.14.134'])assert.ok(html.includes(x));
 const release=JSON.parse(read('release.json'));
 assert.equal(release.version,'8.3');
 assert.equal(release.runtime.identities,300);
 assert.equal(release.merged_gameplay_improvements.filter(x=>x.patch==='NJ134').length,1);
});
