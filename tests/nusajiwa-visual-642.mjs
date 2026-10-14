import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const html=read('index.html'),css=read('css_35.css'),js=read('script_34.js');
const bridge=read('nj42-bridge.js'),bridgeCss=read('nj42-bridge.css');
const tama=read('tamagotchi-3d.js'),release=JSON.parse(read('release.json'));
test('Native user-edited v6.42 assets replace prior 6.42 approximation without duplicated visual runtimes',()=>{
 for(const f of ['css_35.css','nj42-bridge.css','script_34.js','nj42-bridge.js']){
  const hits=html.match(new RegExp(f.replaceAll('.','\\.'),'g'))||[];
  assert.equal(hits.length,1,'expected exactly one '+f);
 }
 assert.ok(!html.includes('./nj642-living.js'),'avoid two simultaneous UI controllers');
 assert.ok(!html.includes('./nj642-living.css'),'avoid two conflicting styles');
 assert.ok(html.indexOf('./script_34.js')>html.indexOf('./nusajiwa-adventure.js'));
 assert.ok(html.indexOf('./nj42-bridge.js')>html.indexOf('./script_34.js'));
 assert.ok(css.includes('#nj35.njx .nj-top'));
 assert.ok(css.includes('#nj35.njx .nj-controls'));
 assert.ok(css.includes('#nj35.njx .nj-bottom'));
 assert.ok(js.includes('Masuk ke suaka'));
 assert.ok(bridgeCss.includes('body.nj42-sanctuary #njt{display:none!important;'));
});
test('Source preserving reversible switch keeps Tamagotchi, 3D data and 15-level adventure',()=>{
 assert.ok(bridge.includes("setMode('tamagotchi',true)"));
 assert.ok(bridge.includes("setMode('sanctuary',true)"));
 assert.ok(bridge.includes('window.NUSAJIWA_VISUAL_642='));
 assert.ok(bridge.includes("'nj42-living'"),'guard classic keyboard interactions when sanctuary in view');
 assert.ok(!bridge.includes('localStorage.clear('));
 assert.ok(!bridge.includes('nusajiwa-3d-signature-pets-v36'));
 assert.ok(tama.includes("document.body.classList.contains('nj42-living')"));
 assert.deepEqual(release.persistent_keys,['nusajiwa-tama-v70','nusajiwa-adventure-v1','nusajiwa-3d-signature-pets-v36']);
 assert.equal(release.runtime.identities,300);
 assert.equal(release.runtime.levels,15);
 assert.equal(release.runtime.worlds,3);
 assert.equal(release.visual_ui.default_mode,'living');
});
test('Pages publishes exact authored source files with syntax + full gameplay checks',()=>{
 const pages=read('.github/workflows/pages.yml'),quality=read('.github/workflows/tamagotchi-quality.yml');
 for(const f of [pages,quality]){
  for(const js of ['script_34.js','nj42-bridge.js'])
   assert.ok(f.includes('node --check '+js),'Missing syntax CI: '+js);
 }
 for(const asset of ['css_35.css','nj42-bridge.css','script_34.js','nj42-bridge.js'])
  assert.ok(pages.includes(asset),'Not copied to Pages: '+asset);
 assert.ok(quality.includes("'css_35.css'"));
 assert.ok(quality.includes("'nj42-bridge.css'"));
});
