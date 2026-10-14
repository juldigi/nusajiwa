import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const html=read('index.html'),css=read('nj642-living.css'),js=read('nj642-living.js');
const tama=read('tamagotchi-3d.js'),release=JSON.parse(read('release.json'));
test('6.42 visual layer uses single copy and loads on top of all 8.3 gameplay components',()=>{
 for(const file of ['nj642-living.js','nj642-living.css']){
  const occurrences=html.match(new RegExp(file.replaceAll('.','\\.'),'g'))||[];
  assert.equal(occurrences.length,1,file+' repeated');
 }
 assert.ok(html.indexOf('nj642-living.js')>html.indexOf('tamagotchi-3d.js'));
 assert.ok(html.indexOf('nj642-living.js')>html.indexOf('nusajiwa-adventure.js'));
 assert.ok(css.includes('body.nj42-living #njt{display:none!important}'));
 assert.ok(css.includes('body.nj42-retro #njt{display:grid!important}'));
 assert.ok(css.includes('body.nj42-living #nj35.njx .nj-top'));
 assert.ok(css.includes('body.nj42-living #nj35.njx .nj-controls'));
 assert.ok(css.includes('body.nj42-living #nj35.njx .nj-bottom'));
});
test('Switch is reversible and never replaces progression, catalog or game saves',()=>{
 assert.ok(js.includes("apply('retro',true)"));
 assert.ok(js.includes("apply('living',true)"));
 assert.ok(js.includes("window.NUSAJIWA_VISUAL_642="));
 assert.ok(js.includes('localStorage.setItem(KEY,mode)'));
 assert.ok(!js.includes("localStorage.clear("));
 assert.ok(!js.includes("nusajiwa-3d-signature-pets-v36"));
 assert.ok(tama.includes("document.body.classList.contains('nj42-living')"));
 assert.deepEqual(release.persistent_keys,[
  'nusajiwa-tama-v70','nusajiwa-adventure-v1','nusajiwa-3d-signature-pets-v36']);
 assert.equal(release.runtime.identities,300);
 assert.equal(release.runtime.levels,15);
 assert.equal(release.visual_ui.default_mode,'living');
});
test('Pages and quality runners check and publish the v6.42 visual bridge',()=>{
 const pages=read('.github/workflows/pages.yml'),quality=read('.github/workflows/tamagotchi-quality.yml');
 for(const file of [pages,quality])assert.ok(file.includes('node --check nj642-living.js'));
 assert.ok(pages.includes('nj642-living.js pages-fixes.js css_*.css nj642-living.css'));
 assert.ok(quality.includes("'nj642-living.css'"));
});