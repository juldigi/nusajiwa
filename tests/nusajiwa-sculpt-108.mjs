import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const src=read('nj108-wayang-batch11.js'),engine=read('script_32.js'),html=read('index.html');
const ctx={window:{}};runInNewContext(src,ctx);
const ids=Array.from(ctx.window.NUSAJIWA_SCULPT108_IDS),sculpt=ctx.window.NUSAJIWA_SCULPT108;
const T={Group:class{constructor(){this.children=[];this.visible=true;this.userData={};}add(x){this.children.push(x)}},
 Mesh:class{constructor(geo,mat){this.geometry=geo;this.material=mat;this.visible=true;
  this.position={set(){}};this.rotation={x:0,y:0,z:0};}},
 ConeGeometry:class{},TorusGeometry:class{},
 BufferGeometry:class{setAttribute(k,v){this.attribute=v}setIndex(v){this.indices=v}computeVertexNormals(){}},
 Float32BufferAttribute:class{constructor(a,n){this.array=a;this.itemSize=n}}};
const e=(g,...a)=>{const o=new T.Mesh();o.args=a;g.add(o);return o};
const t=(g,p,r)=>{const o=new T.Mesh();o.points=p;g.add(o);return o};
const M={main:{},light:{},dark:{},white:{},gold:{},pink:{},black:{},glow:{},eye:{}};
test('NJ108 five unique wayang identities among exactly 300 and no prior unique batch overlap',()=>{
 assert.deepEqual(ids,['dewi_sri','batara_kala','gatotkaca','bima_wayang','buto_cakil']);
 const a=engine.indexOf('const CREATURES=['),b=engine.indexOf('\n];',a);
 const roster=runInNewContext(engine.slice(a,b+3)+';CREATURES');
 assert.equal(roster.length,300);assert.equal(new Set(roster.map(x=>x[0])).size,300);
 const m=JSON.parse(read('release.json'));
 const prev=m.merged_morphology_batches.filter(b=>/^nj(98|99|100|101|102|103|104|105|106|107)$/.test(b.batch));
 for(const id of ids){
  assert.equal(roster.filter(x=>x[0]===id).length,1);
  assert.equal(prev.some(b=>b.identity_ids.includes(id)),false);
  assert.ok(ctx.window.NUSAJIWA_SCULPT108_SOURCES[id]?.startsWith('https://'));
 }
 assert.equal(m.runtime.identities,300);assert.equal(m.runtime.levels,15);
 assert.deepEqual(Array.from(m.merged_morphology_batches.find(b=>b.batch==='nj108').identity_ids),ids);
});
test('40 complete separate phase rigs mask older meshes and create distinct valid parts',()=>{
 let n=0;
 for(const id of ids){
  const seen=new Set();
  for(let s=0;s<8;s++){
   const g=new T.Group(),b=new T.Group(),a={visible:true},c={visible:true};g.add(b);b.add(a);b.add(c);
   if(s===0)g.add({visible:true});
   assert.equal(sculpt(g,b,M,id,s,T,e,t),true,id+'/'+s);
   const rig=(s===0?g:b).children.at(-1);
   assert.equal(rig.userData.id,id);assert.equal(rig.userData.phase,s);
   assert.ok(rig.children.length>=(s===0?8:14),'too few structural parts '+id+'/'+s);
   if(s===0){assert.equal(b.visible,false);assert.equal(g.children[1].visible,false);}
   else{assert.equal(a.visible,false);assert.equal(c.visible,false);}
   const sig=rig.children.map(x=>x.name.slice((id+'-F'+s+'-').length)).sort().join('|');
   assert.equal(seen.has(sig),false,'same phase topology '+id+'/'+s);seen.add(sig);
   for(const x of rig.children){
    if(x.points)assert.ok(x.points.flat().every(Number.isFinite),'invalid spline '+id+'/'+s);
    if(x.geometry?.attribute)assert.ok(x.geometry.attribute.array.every(Number.isFinite),'invalid cloth');
   }
   n++;
  }
  assert.equal(seen.size,8);
 }
 assert.equal(n,40);
});
test('Five strong identity anchors, Gatotkaca no biological wings, Cakil distinguished from ogres',()=>{
 const identity={
  dewi_sri:['recognizably-human-goddess-face','paired-handheld-paddy-stem','multiple-golden-rice-grain'],
  batara_kala:['massive-wayang-Kala-bulging-mask-head','wayang-praba-not-horns','thick-uncut-Kala-face-beard-hair'],
  gatotkaca:['Kotang-Antrakusuma-flight-vest','Padakacarma-golden-warrior-sandal','no-wing-human-sleeved-hero-arm'],
  bima_wayang:['very-broad-strong-Werkudara-shoulder-torso','real-curved-Pancanaka-thumb-nail','black-gold-Poleng-checker'],
  buto_cakil:['lean-angular-not-huge-Cakil-torso','extended-far-forward-LOWER-jaw','one-LOWER-long-upward-tooth','Cakil-keris-luk-wavy-blade']
 };
 for(const [id,anchors] of Object.entries(identity)){
  const g=new T.Group(),b=new T.Group();g.add(b);b.add({visible:true});
  assert.equal(sculpt(g,b,M,id,5,T,e,t),true);
  const names=b.children.at(-1).children.map(x=>x.name).join('|');
  for(const a of anchors)assert.ok(names.includes(a),id+' lacks '+a);
  if(id==='gatotkaca')assert.ok(!names.includes('biological-wing'));
 }
});
test('Unlisted characters, load order, quality and Pages assets remain intact',()=>{
 const g=new T.Group(),b=new T.Group(),native={visible:true};g.add(b);b.add(native);
 assert.equal(sculpt(g,b,M,'hanoman',5,T,e,t),false);
 assert.equal(native.visible,true);
 assert.ok(engine.includes('window.NUSAJIWA_SCULPT108?.(group,body,M,r[0],renderPhase,THREE,ell,tube);'));
 assert.ok(html.indexOf('./nj108-wayang-batch11.js')<html.indexOf('./script_32.js'));
 const p=read('.github/workflows/pages.yml'),q=read('.github/workflows/tamagotchi-quality.yml');
 assert.ok(p.includes('node --check nj108-wayang-batch11.js'));
 assert.ok(p.split('\n').some(x=>x.includes('cp nj98-mistis-batch1.js')&&x.includes('nj108-wayang-batch11.js')&&x.includes('_site/')));
 assert.ok(q.includes('node --check nj108-wayang-batch11.js'));
 assert.ok(q.includes("      - 'nj108-wayang-batch11.js'"));
});
