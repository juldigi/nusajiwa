import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const js=read('nj98-mistis-batch1.js'),engine=read('script_32.js'),index=read('index.html');
const window={};runInNewContext(js,{window});
const ids=Array.from(window.NUSAJIWA_SCULPT98_IDS),sculpt=window.NUSAJIWA_SCULPT98;
const M={main:{},dark:{},light:{},white:{},gold:{},pink:{},eye:{},black:{}};
const T={
 Group:class{constructor(){this.children=[];this.userData={};this.visible=true;this.name='';}add(o){this.children.push(o)}},
 Mesh:class{constructor(g,m){this.geometry=g;this.material=m;this.visible=true;this.rotation={x:0,y:0,z:0};this.position={set(){}};this.name='';}},
 TorusGeometry:class{},ConeGeometry:class{},
 BufferGeometry:class{setAttribute(k,v){this.attr=v}setIndex(v){this.indices=v}computeVertexNormals(){}},
 Float32BufferAttribute:class{constructor(a,size){this.array=a;this.itemSize=size;}}
};
const ell=(root,...args)=>{const a=new T.Mesh();a.dummy=args;root.add(a);return a};
const tube=(root,coords,r,mat)=>{const a=new T.Mesh();a.points=coords;a.radius=r;root.add(a);return a};
test('NJ98 exactly eight non-Fauna unique identities inside canonical 300, sources documented',()=>{
 const a=engine.indexOf('const CREATURES=['),b=engine.indexOf('\n];',a);
 const roster=runInNewContext(engine.slice(a,b+3)+';CREATURES');
 assert.equal(roster.length,300);
 assert.equal(new Set(roster.map(x=>x[0])).size,300);
 assert.equal(ids.length,8);assert.equal(new Set(ids).size,8);
 for(const id of ids){
  assert.equal(roster.filter(row=>row[0]===id&&row[2]!=='Fauna').length,1,id);
  assert.ok(window.NUSAJIWA_SCULPT98_DETAILS[id]?.source.startsWith('https://'));
 }
 const release=JSON.parse(read('release.json'));
 assert.equal(release.runtime.identities,300);
 assert.equal(release.merged_morphology_batches.filter(b=>b.batch==='nj98').length,1);
 assert.deepEqual(Array.from(release.merged_morphology_batches.find(b=>b.batch==='nj98').identity_ids),ids);
});
test('All eight stages of each character create DIFFERENT mesh identities and mask older rigs',()=>{
 let generated=0;
 for(const id of ids){
  const signatures=new Set();
  for(let stage=0;stage<8;stage++){
   const group=new T.Group(),body=new T.Group(),original={visible:true,name:'source-sculpt'};
   const oldOverlay={visible:true,name:'previous-layer'};
   group.add(body);body.add(original);body.add(oldOverlay);
   if(stage===0){group.add({visible:true,name:'original-egg'});}
   assert.equal(sculpt(group,body,M,id,stage,T,ell,tube),true,id+'/'+stage);
   const rig=(stage===0?group:body).children.at(-1);
   assert.equal(rig.userData.id,id);
   assert.equal(rig.userData.phase,stage);
   assert.equal(rig.userData.reconstructed,true);
   assert.ok(rig.children.length>=(stage===0?4:6),'not enough differentiable parts for '+id+'/'+stage);
   if(stage===0){
    // Entire body ancestor is masked for symbolic eggs; descendant visibility
    // flags are intentionally unchanged so old source meshes can be reused.
    assert.equal(body.visible,false,'old adult ancestor must be hidden in egg phase');
    assert.equal(group.children[1].visible,false,'old egg must be hidden');
   }else{
    assert.equal(original.visible,false,'source adult must not overlap '+id+'/'+stage);
    assert.equal(oldOverlay.visible,false,'previous overlay must not overlap '+id+'/'+stage);
   }
   const names=rig.children.map(n=>n.name.slice((id+'-F'+stage+'-').length)).sort();
   const signature=names.join('|');
   assert.equal(signatures.has(signature),false,'identical component topology '+id+'/'+stage);
   signatures.add(signature);
   for(const child of rig.children){
    if(child.points)assert.ok(child.points.flat().every(Number.isFinite),'invalid spline coordinates '+id+'/'+stage);
    if(child.geometry?.attr)assert.ok(child.geometry.attr.array.every(Number.isFinite),'invalid loft '+id+'/'+stage);
   }
   generated++;
  }
  assert.equal(signatures.size,8,'8 unique stage structures for '+id);
 }
 assert.equal(generated,64);
});
test('Source-backed cultural identities stay structurally different, not generic horns / repaint',()=>{
 const anchor={
  kuyang:['flying-female-cranium','hanging-symbolic-viscera','floating-wet-hair'],
  leak:['rising-transforming-face','circular-staring-mask','extended-ceremonial-tongue'],
  kuntilanak:['billowing-white-dress','straight-long-black-hair','floating-dress-sleeved-arm'],
  pocong:['continuous-seamed-kafan','tight-neck-binding','top-knotted-kafan-tip'],
  genderuwo:['low-heavy-rough-torso','extremely-long-brachiated-arm','individual-shaggy-shoulder-fur'],
  tuyul:['round-bald-child-head','short-pot-bellied-child-body','crooked-smirk'],
  wewe:['weathered-sunken-elder-face','distinct-covered-elongated-chest-drape','stringy-grey-hair'],
  jenglot:['desiccated-tiny-ribcage','long-specimen-fingernail','sparse-parchment-hair']
 };
 for(const [id,list] of Object.entries(anchor)){
  const group=new T.Group(),body=new T.Group();
  group.add(body);body.add({visible:true});
  assert.ok(sculpt(group,body,M,id,5,T,ell,tube));
  const names=body.children.at(-1).children.map(c=>c.name).join('|');
  for(const x of list)assert.ok(names.includes(x),id+' missing '+x);
 }
 assert.ok(!js.includes('wolf-snout'),'Genderuwo must not be wolf hybrid');
 assert.ok(js.includes('NO torso, arms, or wings'));
 assert.ok(js.includes('NOT a texture swap'));
});
test('Other character IDs untouched; load before engine and include in both CI and Pages bundle',()=>{
 const g=new T.Group(),b=new T.Group(),o={visible:true};g.add(b);b.add(o);
 assert.equal(sculpt(g,b,M,'garuda',5,T,ell,tube),false);
 assert.equal(o.visible,true);assert.equal(b.children.length,1);
 assert.ok(engine.includes('window.NUSAJIWA_SCULPT98?.(group,body,M,r[0],renderPhase,THREE,ell,tube);'));
 assert.ok(index.includes('./nj98-mistis-batch1.js'));
 assert.ok(index.indexOf('./nj98-mistis-batch1.js')<index.indexOf('./script_32.js'));
 const p=read('.github/workflows/pages.yml'),q=read('.github/workflows/tamagotchi-quality.yml');
 assert.ok(p.includes('node --check nj98-mistis-batch1.js'));
 assert.ok(p.split('\n').some(line=>line.includes('cp nj98-mistis-batch1.js')&&line.includes('nj99-folklore-batch2.js')&&line.includes('_site/')));
 assert.ok(q.includes('node --check nj98-mistis-batch1.js'));
 assert.ok(q.includes("      - 'nj98-mistis-batch1.js'"));
});
