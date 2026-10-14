import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const source=read('nj99-folklore-batch2.js'),engine=read('script_32.js'),html=read('index.html');
const ctx={window:{}};runInNewContext(source,ctx);
const ids=Array.from(ctx.window.NUSAJIWA_SCULPT99_IDS),sculpt=ctx.window.NUSAJIWA_SCULPT99;
const T={Group:class{constructor(){this.children=[];this.userData={};this.visible=true;}add(x){this.children.push(x)}},
 Mesh:class{constructor(g,m){this.geometry=g;this.material=m;this.visible=true;this.position={set(){}};this.rotation={x:0,z:0};}},
 ConeGeometry:class{},TorusGeometry:class{},
 BufferGeometry:class{setAttribute(k,v){this.attr=v}setIndex(x){this.faces=x}computeVertexNormals(){}},
 Float32BufferAttribute:class{constructor(arr,n){this.array=arr;this.n=n}}};
const fake=(g,...args)=>{const o=new T.Mesh();o.primitiveArgs=args;g.add(o);return o};
const tube=(g,p,r,m)=>{const o=new T.Mesh();o.points=p;g.add(o);return o};
const M={main:{},dark:{},light:{},white:{},gold:{},pink:{},eye:{},black:{},glow:{}};
test('Eight exact non-fauna identities, never 8 new creatures; 300 roster unchanged',()=>{
 const a=engine.indexOf('const CREATURES=['),b=engine.indexOf('\n];',a);
 const roster=runInNewContext(engine.slice(a,b+3)+';CREATURES');
 assert.equal(roster.length,300);assert.equal(ids.length,8);assert.equal(new Set(ids).size,8);
 for(const id of ids){assert.equal(roster.filter(x=>x[0]===id&&x[2]!=='Fauna').length,1);
  assert.ok(ctx.window.NUSAJIWA_SCULPT99_META[id]?.source.startsWith('https://'));}
 const release=JSON.parse(read('release.json'));
 assert.equal(release.runtime.identities,300);
 const b99=release.merged_morphology_batches.find(x=>x.batch==='nj99');
 assert.ok(b99);assert.deepEqual(Array.from(b99.identity_ids),ids);
 const b98=release.merged_morphology_batches.find(x=>x.batch==='nj98');
 assert.equal(ids.filter(x=>b98.identity_ids.includes(x)).length,0);
});
test('64 stage constructions hide previous art, differ structurally and contain valid 3D geometry',()=>{
 let total=0;
 for(const id of ids){
  const shapes=new Set();
  for(let s=0;s<8;s++){
   const g=new T.Group(),b=new T.Group(),old={visible:true},prev={visible:true};g.add(b);b.add(old);b.add(prev);
   if(s===0)g.add({visible:true});
   assert.equal(sculpt(g,b,M,id,s,T,fake,tube),true,id+'/'+s);
   const node=(s===0?g:b).children.at(-1);
   assert.equal(node.userData.id,id);
   assert.equal(node.userData.phase,s);
   assert.ok(node.children.length>=(s===0?7:8),id+' phase '+s+' too few parts');
   if(s===0)assert.equal(b.visible,false);else{assert.equal(old.visible,false);assert.equal(prev.visible,false)}
   const shape=node.children.map(n=>n.name.slice((id+'-F'+s+'-').length)).sort().join('|');
   assert.ok(!shapes.has(shape),'same anatomy stage: '+id+'/'+s);shapes.add(shape);
   for(const c of node.children){
    if(c.points)assert.ok(c.points.flat().every(Number.isFinite),'invalid spline '+id+'/'+s);
    if(c.geometry?.attr)assert.ok(c.geometry.attr.array.every(Number.isFinite),'invalid loft '+id+'/'+s);
   }
   total++;
  }
  assert.equal(shapes.size,8);
 }
 assert.equal(total,64);
});
test('Eight regional silhouettes are genuinely different: water/fire/pig/hole/human/giant',()=>{
 const signatures={
 banaspati:['innermost-spectral-core','dancing-fire-tongue'],
 buto_ijo:['massive-forward-bent-buto-torso','enormous-broad-javanese-giant-head'],
 palasik:['minang-floating-rounder-human-face','palasik-hidden-neck-shadow'],
 sundel_bolong:['perforated-back-dress-real-mesh-gap','stitches-around-empty-aperture'],
 babi_ngepet:['wide-low-porcine-barrel','distinct-flat-cartilage-snout','cloven-hoof'],
 begu_ganjang:['height-stretched-minimal-torso','implausibly-long-Batak-shadow-arm'],
 bunian:['woven-human-fabric-robe','normal-rounded-human-ear'],
 hantu_banyu:['tapered-swirling-water-body','waterfall-ribbon-arm']
 };
 for(const [id,must] of Object.entries(signatures)){
  const g=new T.Group(),b=new T.Group();g.add(b);b.add({visible:true});
  sculpt(g,b,M,id,5,T,fake,tube);
  const root=b.children.at(-1),names=root.children.map(c=>c.name).join(' ');
  for(const n of must)assert.ok(names.includes(n),id+' missing '+n);
  if(id==='sundel_bolong'){
   const mesh=root.children.find(c=>c.name.includes('perforated-back-dress-real-mesh-gap'));
   assert.ok(mesh.geometry.faces.length<((7-1)*24*6),'No real aperture in cloth triangulation');
  }
 }
});
test('Unlisted identities unchanged; integrated into live engine, browser and deployment',()=>{
 const g=new T.Group(),b=new T.Group(),orig={visible:true};g.add(b);b.add(orig);
 assert.equal(sculpt(g,b,M,'leak',5,T,fake,tube),false);
 assert.equal(orig.visible,true);
 assert.ok(engine.includes('window.NUSAJIWA_SCULPT99?.(group,body,M,r[0],renderPhase,THREE,ell,tube);'));
 assert.ok(html.includes('./nj99-folklore-batch2.js'));
 assert.ok(html.indexOf('./nj99-folklore-batch2.js')<html.indexOf('./script_32.js'));
 const p=read('.github/workflows/pages.yml'),q=read('.github/workflows/tamagotchi-quality.yml');
 assert.ok(p.includes('node --check nj99-folklore-batch2.js'));
 assert.ok(p.includes('cp nj98-mistis-batch1.js nj99-folklore-batch2.js _site/'));
 assert.ok(q.includes('node --check nj99-folklore-batch2.js'));
});
