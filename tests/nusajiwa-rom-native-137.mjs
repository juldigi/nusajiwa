import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Script} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const src=read('nj124-rom-reference.js');
const events={},win={addEventListener(name,fn){events[name]=fn}};
const doc={addEventListener(){}};
new Script(src).runInNewContext({window:win,document:doc,Math,Date,Uint8Array,Map,Set});
const rom=win.NUSAJIWA_ROM_REF;
test('NJ137 emulator is a true locally loaded NES, not a fabricated platformer',()=>{
 assert.equal(rom.version,'9.17.NJ137');
 assert.equal(rom.getStatus().romLoaded,false);
 assert.ok(src.includes('new window.jsnes.Browser'));
 assert.ok(src.includes('browser.loadROM(rom)'));
 assert.ok(src.includes('browser.nes.buttonDown(1,value)'));
 assert.ok(src.includes('browser.nes.buttonUp(1,value)'));
});
test('NJ137 only accepts valid local .nes and enforces cartridge size',async()=>{
 const valid=new Uint8Array(32);valid.set([0x4e,0x45,0x53,0x1a]);
 const file=(name,bytes,size=bytes.length)=>({name,size,arrayBuffer:async()=>bytes.buffer});
 const got=await rom.readNES(file('mine.nes',valid));
 assert.equal(got[0],0x4e);assert.equal(got[3],0x1a);
 await assert.rejects(()=>rom.readNES(file('other.nes',new Uint8Array(20))),/header iNES/);
 await assert.rejects(()=>rom.readNES(file('my.rom',valid)),/Pilih berkas/);
 await assert.rejects(()=>rom.readNES(file('too_big.nes',valid,3000001)),/terlalu besar/);
});
test('NJ137 direct authentic NES entry exists beside separate 32-stage 3D adaptation',()=>{
 const home=read('script_32.js'),pet=read('tamagotchi-3d.js');
 assert.ok(home.includes('id="nj35NESOriginal"'));
 assert.ok(home.includes("if(a.id==='nj35NESOriginal')"));
 assert.ok(home.includes("NUSAJIWA_ROM_REF?.open?.({source:'habitat'})"));
 assert.ok(home.includes('id="nj35Classic32"'));
 assert.ok(pet.includes("['nesOriginal','🎮 NES Asli · ROM Pribadi'"));
 assert.ok(pet.includes("if(a==='nesOriginal'){"));
});
test('NJ137 volatile session, finger ownership, 3D transparency and safe fallback',()=>{
 assert.ok(src.includes('function releaseInputs()'));
 assert.ok(src.includes('held.get(control)||new Set()'));
 assert.ok(src.includes('window.addEventListener(\'blur\''));
 assert.ok(src.includes('browser?.stop?.();stopProjection();'));
 assert.ok(src.includes('browser?.destroy?.();browser=null;loadedName='));
 assert.ok(src.includes('new THREE.CanvasTexture(source)'));
 assert.ok(src.includes('new THREE.PerspectiveCamera('));
 assert.ok(src.includes('texture.needsUpdate=true'));
 assert.ok(src.includes('Proyeksi 3D belum mengubah level atau Mario menjadi mesh 3D'));
 for(const prohibited of ['localStorage.setItem(', 'indexedDB', 'XMLHttpRequest', 'fetch(', 'roms/']){
  assert.ok(!src.includes(prohibited),'ROM transport/persistence forbidden: '+prohibited);
 }
});
test('NJ137 styles, cache invalidation, original game catalog and save continuity',()=>{
 const html=read('index.html'),css=read('css_34.css'),romcss=read('nj124-rom-reference.css');
 assert.ok(html.includes('nj124-rom-reference.js?v=9.3.124&amp;nj138=1'));
 assert.ok(html.includes('script_32.js?v=9.14.134&amp;folklore=95&amp;nj137=1'));
 assert.ok(css.includes('NJ137 · make genuine ROM'));
 assert.ok(romcss.includes('NJ137 ROM-first UI'));
 const rel=JSON.parse(read('release.json'));
 assert.equal(rel.runtime.identities,300);
 assert.equal(rel.version,'8.3');
 assert.equal(rel.merged_gameplay_improvements.filter(x=>x.patch==='NJ137').length,1);
});

test('NJ137 performance hotfix: WebGL resizes only for logical dimension changes',()=>{
 const js=read('nj124-rom-reference.js');
 assert.ok(js.includes('p.sizeW!==w||p.sizeH!==h'));
 assert.ok(js.includes('p.sizeW=w;p.sizeH=h;'));
 assert.ok(js.includes("if(displayMode!=='3d')return;"));
});

test('NJ138: iNES header parser reports mapper and pattern tile count',()=>{
 const win2={addEventListener(){}},doc2={addEventListener(){}};
 new Script(src).runInNewContext({window:win2,document:doc2,Math,Date,Uint8Array,Map,Set});
 const api=win2.NUSAJIWA_ROM_REF,bytes=new Uint8Array(16+32768+8192);
 bytes.set([0x4e,0x45,0x53,0x1a,2,1,0,0]);
 const info=api.parseRomInfo(bytes);
 assert.equal(info.format,'iNES 1.0');assert.equal(info.mapper,0);
 assert.equal(info.prgBytes,32768);assert.equal(info.chrBytes,8192);
 assert.equal(info.chrTileCount,512);assert.equal(info.mirroring,'Horizontal');
 assert.equal(info.complete,true);
 assert.throws(()=>api.parseRomInfo(new Uint8Array(16)),/Header iNES/);
});
