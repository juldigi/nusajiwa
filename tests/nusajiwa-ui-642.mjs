import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const html=read('index.html');
const css=read('css_35.css'),behavior=read('script_34.js');
const bridgeCss=read('nj42-bridge.css'),bridgeJs=read('nj42-bridge.js');
const page=read('.github/workflows/pages.yml');
test('Original NUSAJIWA 6.42 Living Sanctuary visual/behavior source is present, not replaced by a dashboard mock',()=>{
 for(const v of ['#nj35.njx .nj-top','#nj35.njx .nj-creature-info','#nj35.njx .nj-controls',
   '#nj35.njx .nj-bottom','#nj35.njx .nj-side','#nj35.njx .njx-title','#nj35.njx [data-panel="roster"]'])
  assert.ok(css.includes(v),'missing original edited style '+v);
 for(const v of ["root.classList.add('njx')",'Masuk ke suaka',"className = 'njx-menu'","function celebrate("])
  assert.ok(behavior.includes(v),'missing original edited interaction '+v);
 assert.match(behavior,/searchParams|URLSearchParams/,'audit guard must not block visual QA');
});
test('Only sanctuary view reveals edited original layout; classic 90s Tamagotchi remains one tap away',()=>{
 assert.match(bridgeCss,/body\.nj42-sanctuary #njt\{display:none!important/);
 for(const cls of ['nj-top','nj-creature-info','nj-controls','nj-bottom'])
  assert.ok(bridgeCss.includes('#nj35.njx .'+cls),'missing restore '+cls);
 assert.match(bridgeJs,/Mainkan Tamagotchi 90-an/);
 assert.match(bridgeJs,/✦ Suaka/);
 assert.match(bridgeJs,/nj42-display-choice/);
 assert.match(bridgeJs,/sessionStorage\.setItem/);
 assert.match(bridgeJs,/IS_AUDIT/);
 assert.doesNotMatch(bridgeJs,/localStorage\s*\.\s*(clear|removeItem|setItem)\s*\(/);
});
test('UI layers load after core gameplay and design is not eclipsed by the 90s console',()=>{
 const pos=f=>html.indexOf('./'+f);
 for(const f of ['css_35.css','nj42-bridge.css','script_34.js','nj42-bridge.js'])assert.ok(pos(f)>=0,f);
 assert.ok(pos('tamagotchi-3d.css')<pos('css_35.css'));
 assert.ok(pos('css_35.css')<pos('nj42-bridge.css'));
 assert.ok(pos('nusajiwa-adventure.js')<pos('script_34.js'));
 assert.ok(pos('script_34.js')<pos('nj42-bridge.js'));
 assert.ok(html.includes('NUSAJIWA'));
 for(const f of ['css_35.css','nj42-bridge.css','script_34.js','nj42-bridge.js'])
  assert.ok(page.includes(f),'GitHub Pages must publish '+f);
 for(const f of ['script_34.js','nj42-bridge.js'])
  assert.ok(page.includes('node --check '+f),'syntax gate missing for '+f);
});
test('Character/game save schema stays unchanged for 300 characters & 15 levels',()=>{
 const m=JSON.parse(read('release.json'));
 assert.equal(m.runtime.identities,300);
 assert.equal(m.runtime.levels,15);
 assert.equal(m.runtime.worlds,3);
 assert.deepEqual(m.persistent_keys,['nusajiwa-tama-v70','nusajiwa-adventure-v1','nusajiwa-3d-signature-pets-v36']);
 assert.equal(m.ui_release?.source,'NUSAJIWA_6_42_Rev9_Selective_Morph_Merge.zip');
 assert.equal(m.ui_release?.status,'MERGED');
 assert.equal(m.ui_release?.default_mode,'sanctuary');
});
