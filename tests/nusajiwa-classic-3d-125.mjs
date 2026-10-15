import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext,Script} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const source=read('nj125-classic-3d.js'),classic=read('nj123-classic.js'),
  html=read('index.html'),css=read('nj123-classic.css'),
  pages=read('.github/workflows/pages.yml'),quality=read('.github/workflows/tamagotchi-quality.yml');
test('NJ125 contains real Three WebGL geometry, orthographic camera, dynamic renderer and Canvas fallback',()=>{
 assert.doesNotThrow(()=>new Script(source));
 for(const marker of ['new T.WebGLRenderer','new T.Scene()','new T.OrthographicCamera',
  'new THREE.BoxGeometry','new THREE.SphereGeometry','new THREE.TorusGeometry',
  'new THREE.TubeGeometry','build(level,pet)','frame(level,status,pet)',
  'renderer.render(scene,camera)','oldCanvas.style.visibility']){
  assert.ok(source.includes(marker),'missing real 3D pipeline: '+marker);
 }
 assert.ok(classic.includes('NUSAJIWA_CLASSIC3D?.frame?.(level,status,pet)'));
 assert.ok(classic.includes('NUSAJIWA_CLASSIC3D?.init?.(root)'));
 assert.ok(classic.includes('NUSAJIWA_CLASSIC3D?.close?.()'));
 assert.ok(classic.includes("ctx=canvas.getContext('2d'"),'fallback Canvas removed');
});
test('True 3D scene includes terrain gaps, moving platforms, enemies, coins, pipes, boss, water and cultural biomes',()=>{
 for(const key of ['level.gaps','for(const p of level.platforms)',
  'for(const t of level.pipes)','for(const b of level.blocks)',
  'for(const c of level.coins)','for(const z of level.secret)',
  'for(const e of level.enemies)','if(level.boss)',
  'surface.userData.isWater','makeHero(pet,m)','stageColors(level)',
  'level?.nj124?.element','status.cameraX'])
  assert.ok(source.includes(key),'missing environmental system: '+key);
});
test('No Nintendo ROM distributed, no Tamagotchi or Classic save mutation from renderer',()=>{
 assert.doesNotMatch(source,/localStorage\s*\.\s*(setItem|removeItem|clear)\s*\(/);
 assert.doesNotMatch(source,/\.nes\s*\)\s*=>\s*fetch/);
 const m=JSON.parse(read('release.json'));
 assert.equal(m.runtime.identities,300);
 assert.equal(m.runtime.levels,15);
 assert.ok(m.gameplay_3d_rom_reference.renderer.includes('WebGL'));
 assert.ok(m.gameplay_3d_rom_reference.stage_data.includes('NOT exact'));
});
test('NJ125 loads before NJ123 and is shipped via Pages and CI, UI stays above 3D viewport',()=>{
 assert.ok(html.indexOf('nj125-classic-3d.js')>0);
 assert.ok(html.indexOf('nj125-classic-3d.js')<html.indexOf('nj123-classic.js'));
 assert.ok(css.includes('.njc-real-three'));
 assert.ok(css.includes('#njclassic .njc-top,#njclassic .njc-controls,#njclassic #njcNotice{z-index:4}'));
 assert.ok(pages.includes('node --check nj125-classic-3d.js'));
 assert.ok(pages.includes('nj125-classic-3d.js _site/'));
 assert.ok(quality.includes("      - 'nj125-classic-3d.js'"));
 assert.ok(quality.includes('node --check nj125-classic-3d.js'));
});
test('Independent hook loads without accessing a ROM or GPU in Node smoke context',()=>{
 const window={addEventListener(){}},document={addEventListener(){}};
 runInNewContext(source,{window,document,console});
 const api=window.NUSAJIWA_CLASSIC3D;
 assert.equal(api.isReady(),false);
 assert.equal(api.frame(null,null,null),false);
 assert.equal(api.diagnostic().cartridgeBundled,false);
});
