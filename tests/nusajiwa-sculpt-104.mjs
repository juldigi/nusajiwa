import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const source=read('nj104-regional-batch7.js'),engine=read('script_32.js'),html=read('index.html');
const win={};runInNewContext(source,{window:win});
const ids=Array.from(win.NUSAJIWA_SCULPT104_IDS),build=win.NUSAJIWA_SCULPT104;
const M={main:{},dark:{},light:{},white:{},gold:{},pink:{},eye:{},black:{},glow:{}};
const T={
 Group:class{constructor(){this.children=[];this.userData={};this.visible=true}add(x){this.children.push(x)}},
 Mesh:class{constructor(g,m){this.geometry=g;this.material=m;this.visible=true;this.position={z:0,set(){}};this.rotation={x:0,y:0,z:0}}},
 ConeGeometry:class{},
 Shape:class{constructor(){this.points=[]}moveTo(...p){this.points.push(p)}lineTo(...p){this.points.push(p)}closePath(){}},
 ShapeGeometry:class{constructor(shape){this.shape=shape}}
};
const ell=(r,...a)=>{const o=new T.Mesh();o.args=a;r.add(o);return o};
const tube=(r,pts,rad)=>{const o=new T.Mesh();o.pts=pts;o.rad=rad;r.add(o);return o};
const get=(id,s)=>{const g=new T.Group(),b=new T.Group(),old={visible:true},second={visible:true};g.add(b);b.add(old);b.add(second);
 if(s===0)g.add({visible:true});const ok=build(g,b,M,id,s,T,ell,tube);
 return {ok,g,b,old,second,rig:(s===0?g:b).children.at(-1)};};
test('Six folklore IDs remain distinct entries in the stable catalogue of 300, all cited',()=>{
 assert.deepEqual(ids,['suanggi','orang_pendek','cindaku','orang_bati','poppo','parakang']);
 const a=engine.indexOf('const CREATURES=['),b=engine.indexOf('\n];',a);
 const catalogue=runInNewContext(engine.slice(a,b+3)+';CREATURES');
 assert.equal(catalogue.length,300);assert.equal(new Set(catalogue.map(x=>x[0])).size,300);
 const rel=JSON.parse(read('release.json'));
 assert.equal(rel.runtime.identities,300);assert.equal(rel.runtime.levels,15);
 const recent=rel.merged_morphology_batches.find(x=>x.batch==='nj104');
 assert.ok(recent);assert.deepEqual(Array.from(recent.identity_ids),ids);
 const earlier=new Set(rel.merged_morphology_batches.filter(x=>/^nj(98|99|100|101|102|103)$/.test(x.batch))
  .flatMap(x=>x.identity_ids));
 for(const id of ids){
  assert.equal(catalogue.filter(x=>x[0]===id&&x[2]!=='Fauna').length,1,id);
  assert.equal(earlier.has(id),false,'Prior full reconstruction already included '+id);
  assert.ok(win.NUSAJIWA_SCULPT104_META[id].source.startsWith('https://'));
 }
});
test('All 48 construction stages have different topology, mask previous sculpt and contain finite geometry',()=>{
 let count=0;
 for(const id of ids){
  const sigs=new Set();
  for(let s=0;s<8;s++){
   const {ok,g,b,old,second,rig}=get(id,s);assert.equal(ok,true,id+'/'+s);
   assert.equal(rig.userData.id,id);assert.equal(rig.userData.phase,s);
   assert.ok(rig.children.length>=(s===0?9:10),'Too few parts '+id+'/'+s);
   if(s===0){assert.equal(b.visible,false);assert.equal(g.children[1].visible,false)}
   else {assert.equal(old.visible,false);assert.equal(second.visible,false)}
   const sign=rig.children.map(x=>x.name.replace(id+'-F'+s+'-','')).sort().join('|');
   assert.equal(sigs.has(sign),false,'Unchanged stage topology '+id+'/'+s);sigs.add(sign);
   for(const part of rig.children){
    if(part.pts)assert.ok(part.pts.flat().every(Number.isFinite),'Nonfinite spline '+id+'/'+s);
    if(part.geometry?.shape)assert.ok(part.geometry.shape.points.flat().every(Number.isFinite),'Nonfinite wing membrane');
   }count++;
  }
  assert.equal(sigs.size,8);
 }
 assert.equal(count,48);
});
test('Regional identity-specific adult anchors differentiate every shape and transformation',()=>{
 const marks={
  suanggi:['human-figure-in-ember-shadow','distinct-human-flying-head','shifting-suanggi-fire-wisp'],
  orang_pendek:['compact-Sumatra-powerful-biped-torso','short-stout-walking-leg','short-dense-black-body-fur'],
  cindaku:['soilbound-guardian-crouched-tiger-torso','four-soil-contact-cat-legs','earth-contact-breastbone-guardian'],
  orang_bati:['Seram-humanlike-upright-chest','shoulder-rooted-leather-wing-web','biped-ground-leg'],
  poppo:['Bugis-floating-oval-head-no-torso','short-folded-Bugis-style-headcloth','grouped-symbolic-innards'],
  parakang:['incorrectly-shaped-mimic-dog-body','unnaturally-tall-hind-leg','too-short-front-leg']
 };
 for(const [id,markers] of Object.entries(marks)){
  const s=id==='parakang'?5:5;
  const {rig}=get(id,s),parts=rig.children.map(x=>x.name).join('|');
  for(const marker of markers)assert.ok(parts.includes(marker),id+' needs '+marker);
 }
 const animal=get('parakang',5).rig.children.map(c=>c.name).join('|');
 const tree=get('parakang',6).rig.children.map(c=>c.name).join('|');
 assert.ok(tree.includes('two-handed-tree-mimic-trunk'));
 assert.ok(!tree.includes('mimic-dog-body'));
 assert.ok(animal.includes('mimic-dog-body'));
 assert.ok(get('cindaku',1).rig.children.some(c=>c.name.includes('guardian-human-form')));
 assert.ok(get('cindaku',5).rig.children.some(c=>c.name.includes('four-soil-contact-cat-legs')));
 assert.ok(!get('poppo',5).rig.children.some(c=>c.name.includes('full-human-torso')));
});
test('Nonselected identity untouched; engine, release, GH Pages and CI asset contracts sound',()=>{
 const g=new T.Group(),b=new T.Group(),original={visible:true};g.add(b);b.add(original);
 assert.equal(build(g,b,M,'kuyang',5,T,ell,tube),false);
 assert.equal(original.visible,true);assert.equal(b.children.length,1);
 assert.ok(engine.includes('window.NUSAJIWA_SCULPT104?.(group,body,M,r[0],renderPhase,THREE,ell,tube);'));
 assert.ok(html.includes('./nj104-regional-batch7.js'));
 assert.ok(html.indexOf('./nj104-regional-batch7.js')<html.indexOf('./script_32.js'));
 const pages=read('.github/workflows/pages.yml'),quality=read('.github/workflows/tamagotchi-quality.yml');
 assert.ok(pages.includes('node --check nj104-regional-batch7.js'));
 assert.ok(pages.split('\n').some(x=>x.includes('cp nj98-mistis-batch1.js')&&x.includes('nj104-regional-batch7.js')&&x.includes('_site/')));
 assert.ok(quality.includes("      - 'nj104-regional-batch7.js'"));
 assert.ok(quality.includes('node --check nj104-regional-batch7.js'));
});
