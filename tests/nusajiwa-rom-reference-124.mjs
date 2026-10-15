import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Script} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const js=read('nj124-rom-reference.js'),css=read('nj124-rom-reference.css');
const classic=read('nj123-classic.js'),html=read('index.html');
const events={};
const win={addEventListener(k,fn){events[k]=fn}};
const doc={addEventListener(){}};
new Script(js).runInNewContext({window:win,document:doc,Math,Date,Uint8Array});
test('The ROM mode is optional and cannot publish ROM bytes, tracks or sprites',()=>{
 assert.ok(win.NUSAJIWA_ROM_REF);
 assert.equal(win.NUSAJIWA_ROM_REF.getStatus().active,false);
 assert.equal(win.NUSAJIWA_ROM_REF.getStatus().romLoaded,false);
 assert.ok(js.includes('new window.jsnes.Browser'));
 assert.ok(js.includes('browser.loadROM(rom)'));
 assert.ok(js.includes("file.arrayBuffer()"));
 assert.ok(js.includes("JSZip.loadAsync"));
 assert.ok(js.includes("bytes[0]!==0x4e"));
 assert.ok(js.includes("bytes[3]!==0x1a"));
 for(const value of ['fetch(', 'XMLHttpRequest', 'indexedDB', 'localStorage.setItem',
  '.nes?rom=', 'roms/','Mario.png','mario_sprite','base64,']){
  assert.ok(!js.includes(value),'Disallowed ROM transfer or Nintendo asset: '+value);
 }
});
test('NES ZIP and NES file both have strict input types and 3MB max bound',()=>{
 assert.ok(js.includes("file.size>3_000_000"));
 assert.ok(js.includes("/\\.zip$/i.test(file.name)"));
 assert.ok(js.includes("/\\.nes$/i.test(file.name)"));
 assert.ok(js.includes("candidates.length!==1"));
 assert.ok(js.includes("zip.files"));
});
test('Physical A/B/Dpad and START/SELECT controls are wired and target same NES controller',()=>{
 for(const key of ['left','right','up','down','start','select','a','b'])
  assert.ok(js.includes('data-nes="'+key+'"'),'missing control '+key);
 assert.ok(js.includes('browser.nes.buttonDown(1,value)'));
 assert.ok(js.includes('browser.nes.buttonUp(1,value)'));
 assert.ok(css.includes('@media(max-width:690px)'));
 assert.ok(css.includes('touch-action:none'));
});
test('Game only loads emulator after explicit local file and preserves game UI on exit',()=>{
 assert.ok(js.includes("el.async=true"));
 assert.ok(js.includes("fileControl.addEventListener('change'"));
 assert.ok(js.includes("browser?.destroy?.()"));
 assert.ok(classic.includes("['rom','📼 Buka ROM asli (file pribadi)']"));
 assert.ok(classic.includes('window.NUSAJIWA_ROM_REF?.open?.();'));
 assert.ok(classic.includes('window.NUSAJIWA_ROM_REF?.isOpen?.()'));
 assert.ok(html.includes('nj124-rom-reference.js?v=9.3.124'));
 assert.ok(html.indexOf('nj123-classic.js')<html.indexOf('nj124-rom-reference.js'));
});
test('GH Pages includes reference player code but never the uploaded cartridge',()=>{
 const pages=read('.github/workflows/pages.yml'),qa=read('.github/workflows/tamagotchi-quality.yml');
 assert.ok(pages.includes('node --check nj124-rom-reference.js'));
 assert.ok(pages.split('\n').some(line=>line.includes('nj124-rom-reference.js')&&line.includes('nj124-rom-reference.css')&&line.includes('_site/')));
 assert.ok(qa.includes("      - 'nj124-rom-reference.js'"));
 assert.ok(qa.includes('node --check nj124-rom-reference.js'));
 const rel=JSON.parse(read('release.json'));
 assert.equal(rel.runtime.identities,300);
 assert.equal(rel.runtime.levels,15);
 assert.equal(rel.merged_gameplay_improvements.filter(x=>x.patch==='NJ124').length,1);
});
