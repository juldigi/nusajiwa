import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const engine=read('script_32.js'),visual=read('nj95-visual-audit.js'),m40=read('nj90-forty.js'),html=read('index.html');
const start=engine.indexOf('const CREATURES=['),end=engine.indexOf('\n];',start);
const roster=runInNewContext(engine.slice(start,end+3)+';CREATURES');
const spiritual=roster.filter(x=>x[2]!=='Fauna'&&x[2]!=='Fauna domestik');
const ctx={window:{}};runInNewContext(m40,ctx);
const morph=ctx.window.NUSAJIWA_MORPH40;
const T={Group:class{constructor(){this.children=[];this.userData={}}add(x){this.children.push(x)}},
 Mesh:class{constructor(){this.position={set(){},z:0};this.rotation={x:0,y:0,z:0};this.visible=true;this.name=''}},
 TorusGeometry:class{},ConeGeometry:class{},ShapeGeometry:class{},
 Shape:class{moveTo(){}lineTo(){}closePath(){}}
};
const primitive=(g,...args)=>{const q=new T.Mesh();q.args=args;g.add(q);return q};
const M={main:{},light:{},dark:{},white:{},gold:{},pink:{},black:{},glow:{}};
test('Every non-fauna mystical, ritual and folklore creature is included in opt-in visual roster',()=>{
 assert.equal(roster.length,300);assert.equal(spiritual.length,61);
 assert.equal(new Set(spiritual.map(x=>x[0])).size,61);
 const folklore=new Set(spiritual.map(x=>x[0]));
 for(const batch of JSON.parse(read('release.json')).merged_morphology_batches.filter(x=>!['nj94','nj96'].includes(x.batch)))
 for(const id of batch.identity_ids)assert.ok(folklore.has(id),id);
 for(const id of ['si_manis_jembatan_ancol','dewi_lanjar','keong_mas','kuda_lumping',
  'singa_barong_reog','gatotkaca','bima_wayang','buto_cakil'])assert.ok(folklore.has(id),id);
});
test('Poppo juveniles are actual flying heads, not opaque full-size human ghost bodies',()=>{
 for(let s=1;s<=4;s++){
  const body=new T.Group(),group=new T.Group();
  body.add({name:'native',visible:true});
  assert.ok(morph(group,body,M,'poppo',s,T,primitive,primitive));
  const root=body.children.at(-1),names=root.children.map(c=>c.name).join(' | ');
  assert.ok(names.includes('poppo-floating-juvenile-head'));
  assert.ok(!names.includes('spectral-shoulderless-core'));
  assert.equal(body.children[0].visible,false);
 }
});
test('Nyai Blora youth is a woman-snake, not a stock crowned serpent head',()=>{
 for(let s=1;s<=4;s++){
  const body=new T.Group(),g=new T.Group();body.add({visible:true});
  assert.ok(morph(g,body,M,'nyai_blora',s,T,primitive,primitive));
  const names=body.children.at(-1).children.map(o=>o.name).join('|');
  assert.ok(names.includes('juvenile-serpent-woman-face'));
  assert.ok(!names.includes('rising-unwinged-naga-head'));
 }
});
test('Sundel Bolong has open rear aperture, without occluding ball geometry',()=>{
 const body=new T.Group(),g=new T.Group();
 assert.ok(morph(g,body,M,'sundel_bolong',5,T,primitive,primitive));
 const names=body.children.at(-1).children.map(o=>o.name).join('|');
 assert.ok(names.includes('posterior-gown-open-aperture-rim'));
 assert.ok(!names.includes('posterior-gown-void'));
 assert.ok(!names.includes('posterior-gown-rim'));
 assert.ok(engine.includes('nj611PerforatedBackPanel'));
});
test('Jeruk Purut has headless adult source sculpt distinct from Si Manis',()=>{
 assert.ok(engine.includes('function nj56Specter(g,M,headless=false)'));
 assert.ok(engine.includes('hantu_jeruk_purut:(g,M)=>nj56Specter(g,M,true)'));
 assert.ok(engine.includes('g.userData.folkloreForm=\'headless-cleric-Jeruk-Purut-urban-legend\''));
});
test('The real production model bridge inspects 8 stages from 4 angles without changing saved XP',()=>{
 assert.ok(engine.includes('function makeAvatar(r, portraitMode=false, auditPhase=null)'));
 assert.ok(engine.includes('renderPhase=auditPhase===null?(portraitMode?5:gamePet()?.phase??5):'));
 assert.ok(!engine.includes('const renderPhase=auditPhase===null?(renderPhase)'));
 assert.ok(engine.includes('const living=auditPhase===null?'));
 assert.ok(engine.includes('decorateStage(group,body,living,M,r)'));
 assert.ok(engine.includes('window.NUSAJIWA_FOLKLORE_VISUAL_QA='));
 assert.ok(engine.includes('nj95Preview=makeAvatar(row,false,s)'));
 assert.ok(engine.includes('visibleBounds.union(new THREE.Box3().setFromObject(o))'));
 assert.equal(/localStorage\s*\.\s*(setItem|removeItem|clear|getItem)\s*\(/.test(visual),false);
 assert.ok(visual.includes("searchParams.delete('audit')"));
 assert.ok(visual.includes('Foto PNG'));
 assert.ok(visual.includes('Belakang'));
 assert.ok(visual.includes('Periksa 8 fase'));
});
test('GitHub Pages packages opt-in audit UI and QA is included in full test suite',()=>{
 assert.ok(html.includes('./nj95-visual-audit.js'));
 assert.ok(html.indexOf('./script_32.js')<html.indexOf('./nj95-visual-audit.js'));
 assert.ok(read('.github/workflows/pages.yml').includes('node --check nj95-visual-audit.js'));
 assert.ok(read('.github/workflows/pages.yml').includes('nj95-visual-audit.js nj642-living.js pages-fixes.js'));
 assert.ok(read('.github/workflows/tamagotchi-quality.yml').includes('nj95-visual-audit.js'));
});
