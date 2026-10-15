import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const source=read('nj107-mythic-batch10.js'),engine=read('script_32.js'),html=read('index.html');
const context={window:{}};runInNewContext(source,context);
const ids=Array.from(context.window.NUSAJIWA_SCULPT107_IDS);
const morph=context.window.NUSAJIWA_SCULPT107;
const T={
 Group:class{constructor(){this.children=[];this.userData={};this.visible=true;this.name='';}add(o){this.children.push(o)}},
 Mesh:class{constructor(geometry,material){this.geometry=geometry;this.material=material;this.visible=true;
  this.position={set(){},z:0};this.rotation={x:0,y:0,z:0};}},
 ConeGeometry:class{},
 BufferGeometry:class{setAttribute(k,v){this.attrs=v}setIndex(v){this.indices=v}computeVertexNormals(){}},
 Float32BufferAttribute:class{constructor(data,n){this.array=data;this.n=n}},
 ExtrudeGeometry:class{constructor(shape,options){this.shape=shape;this.options=options}},
 Shape:class{constructor(){this.steps=[]}moveTo(x,y){this.steps.push([x,y])}lineTo(x,y){this.steps.push([x,y])}closePath(){}}
};
const E=(g,...params)=>{const m=new T.Mesh();m.args=params;g.add(m);return m};
const L=(g,p,r)=>{const m=new T.Mesh();m.points=p;m.radius=r;g.add(m);return m};
const M={main:{},dark:{},light:{},white:{},gold:{},pink:{},eye:{},black:{},glow:{}};
const roster=()=>{const a=engine.indexOf('const CREATURES=['),b=engine.indexOf('\n];',a);
 return runInNewContext(engine.slice(a,b+3)+';CREATURES')};
test('NJ107 five catalogued mythology/temple identities, no new species or overlap in NJ98..106',()=>{
 assert.deepEqual(ids,['jatayu','bedawang_nala','hanoman','makara_candi','naga_padoha']);
 const rows=roster();assert.equal(rows.length,300);assert.equal(new Set(rows.map(x=>x[0])).size,300);
 const m=JSON.parse(read('release.json'));
 const prev=new Set(m.merged_morphology_batches.filter(b=>/^nj(98|99|100|101|102|103|104|105|106)$/.test(b.batch)).flatMap(b=>b.identity_ids));
 for(const id of ids){assert.equal(rows.filter(x=>x[0]===id).length,1);
  assert.ok(!prev.has(id),'previously reconstructed: '+id);
  assert.ok(context.window.NUSAJIWA_SCULPT107_SOURCES[id]?.startsWith('https://'));}
 const batch=m.merged_morphology_batches.find(b=>b.batch==='nj107');
 assert.ok(batch);assert.equal(batch.identity_delta,0);
 assert.deepEqual(Array.from(batch.identity_ids),ids);
 assert.equal(m.runtime.identities,300);assert.equal(m.runtime.levels,15);
});
test('Every character x every eight phases hides legacy layers and creates finite distinct geometry',()=>{
 let total=0;
 for(const id of ids){
  const signature=new Set();
  for(let s=0;s<8;s++){
   const g=new T.Group(),b=new T.Group(),native={visible:true},old={visible:true};
   g.add(b);b.add(native);b.add(old);if(s===0)g.add({visible:true});
   assert.equal(morph(g,b,M,id,s,T,E,L),true,id+'/'+s);
   const rig=(s===0?g:b).children.at(-1);
   assert.equal(rig.userData.id,id);assert.equal(rig.userData.phase,s);
   assert.ok(rig.children.length>=(s===0?9:14),'too few parts '+id+'/'+s);
   if(s===0){assert.equal(b.visible,false);assert.equal(g.children[1].visible,false);}
   else{assert.equal(native.visible,false);assert.equal(old.visible,false);}
   const names=rig.children.map(x=>x.name.slice((id+'-F'+s+'-').length)).sort().join('|');
   assert.ok(!signature.has(names),'identical phase topology '+id+'/'+s);signature.add(names);
   for(const part of rig.children){
    if(part.points)assert.ok(part.points.flat().every(Number.isFinite),'invalid tube '+id+'/'+s);
    if(part.geometry?.shape)assert.ok(part.geometry.shape.steps.flat().every(Number.isFinite),'invalid extrude '+id+'/'+s);
    if(part.geometry?.attrs)assert.ok(part.geometry.attrs.array.every(Number.isFinite),'invalid loft '+id+'/'+s);
   }
   total++;
  }
  assert.equal(signature.size,8);
 }
 assert.equal(total,40);
});
test('Indigenous myth identities have unique sculptural anchors rather than western monster templates',()=>{
 const must={
 jatayu:['wayang-vulture-head-not-human','separate-layered-flight-feather','raptor-foot-talons','strong-projecting-upper-beak'],
 bedawang_nala:['cosmic-curved-turtle-carapace','specific-hexagonal-shell-panel','flame-in-open-Bedawang-mouth','coiling-guardian-Basuki-Anantaboga'],
 hanoman:['vanara-warrior-humanlike-torso','Hanoman-black-simian-nose','very-long-curling-Hanoman-tail','independent-monkey-finger'],
 makara_candi:['stone-cut-temple-Makara-base-silhouette','NOT-a-real-tusk-curving-makara-elephant-trunk','temple-stone-vegetal-relief-scroll'],
 naga_padoha:['very-thick-subterranean-Batak-world-serpent-body','restraining-deak-parujar-world-binding','deep-earth-Batak-carved-scale']
 };
 for(const [id,anchors] of Object.entries(must)){
  const group=new T.Group(),body=new T.Group();group.add(body);body.add({visible:true});
  assert.ok(morph(group,body,M,id,5,T,E,L));
  const names=body.children.at(-1).children.map(c=>c.name).join('|');
  for(const anchor of anchors)assert.ok(names.includes(anchor),id+' missing '+anchor);
  if(id==='makara_candi'){
   const stone=body.children.at(-1).children.find(x=>x.name.endsWith('stone-cut-temple-Makara-base-silhouette'));
   assert.ok(stone.geometry instanceof T.ExtrudeGeometry);
  }
 }
});
test('Engine, pages, quality and unrelated species remain compatible',()=>{
 const g=new T.Group(),b=new T.Group(),old={visible:true};g.add(b);b.add(old);
 assert.equal(morph(g,b,M,'leak',5,T,E,L),false);
 assert.equal(old.visible,true);assert.equal(b.children.length,1);
 assert.ok(engine.includes('window.NUSAJIWA_SCULPT107?.(group,body,M,r[0],renderPhase,THREE,ell,tube);'));
 assert.ok(html.indexOf('./nj107-mythic-batch10.js')<html.indexOf('./script_32.js'));
 const pg=read('.github/workflows/pages.yml'),qa=read('.github/workflows/tamagotchi-quality.yml');
 assert.ok(pg.includes('node --check nj107-mythic-batch10.js'));
 assert.ok(pg.split('\n').some(line=>line.includes('cp nj98-mistis-batch1.js')&&line.includes('nj107-mythic-batch10.js')&&line.includes('_site/')));
 assert.ok(qa.includes('node --check nj107-mythic-batch10.js'));
 assert.ok(qa.includes("      - 'nj107-mythic-batch10.js'"));
});
