import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const js=read('nj125-classic-3d.js'),classic=read('nj123-classic.js');
test('Original 3D pet identity takes priority over generic substitute in Classic32',()=>{
 assert.ok(js.includes("NJ35?.getAdventureAvatar?.(pet?.id)"));
 assert.ok(js.includes("original?.isObject3D"));
 assert.ok(js.includes('original.traverse(o=>'));
 assert.ok(js.includes('bounds.expandByObject(o)'));
 assert.ok(js.includes("pet?.id==='jenglot'"));
 assert.ok(js.includes("kind:'NUSAJIWA-original'"));
 const before=js.indexOf('function makeHero(pet,materials)');
 const native=js.indexOf('NJ35?.getAdventureAvatar?.(pet?.id)',before);
 const fallback=js.indexOf("const kind=pet?.type||'forest'",before);
 assert.ok(native>before&&fallback>native,'Original species mesh must load before fallback');
});
test('GPU materials and cloned native geometry registered for disposal; resize is throttled',()=>{
 assert.ok(js.includes('if(o.geometry)geo.push(o.geometry)'));
 assert.ok(js.includes('mats.push(m)'));
 assert.ok(js.includes('if(w!==lastCanvasWidth||h!==lastCanvasHeight)'));
 assert.ok(js.includes('lastCanvasWidth=0;lastCanvasHeight=0;'));
 assert.ok(js.includes('renderer.setSize(w,h,false)'));
});
test('Feature is additive, preserving 32 original stage mechanics and Save schema',()=>{
 assert.ok(classic.includes("KEY='nusajiwa-classic-32-v1'"));
 assert.ok(classic.includes('const LEVELS=Array.from({length:MAX}'));
 assert.ok(classic.includes('TICK=1/60'));
 assert.ok(classic.includes('window.NUSAJIWA_CLASSIC3D?.frame?.(level,status,pet)'));
 const release=JSON.parse(read('release.json'));
 assert.equal(release.runtime.identities,300);
 const patch=release.merged_gameplay_improvements.find(x=>x.patch==='NJ126');
 assert.equal(patch.status,'MERGED');
 assert.ok(read('ROM_AUDIT_2026-10-15.md').includes('NROM'));
 assert.ok(read('ROM_AUDIT_2026-10-15.md').includes('40.976 byte'));
});
test('Existing browser Pages assets and original emulator independence are preserved',()=>{
 const pages=read('.github/workflows/pages.yml'),index=read('index.html');
 assert.ok(pages.includes('nj125-classic-3d.js _site/'));
 assert.ok(index.indexOf('nj125-classic-3d.js')<index.indexOf('nj123-classic.js'));
 const rom=read('nj124-rom-reference.js');
 assert.ok(rom.includes("file.arrayBuffer()"));
 assert.ok(rom.includes('JSZip.loadAsync'));
 assert.ok(!rom.includes('localStorage.setItem'));
});
