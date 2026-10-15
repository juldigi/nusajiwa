import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const js=read('nj100-myth-batch3.js'),engine=read('script_32.js'),html=read('index.html');
const win={};runInNewContext(js,{window:win});
const ids=Array.from(win.NUSAJIWA_SCULPT100_IDS),sculpt=win.NUSAJIWA_SCULPT100;
const T={Group:class{constructor(){this.children=[];this.userData={};this.visible=true;}add(v){this.children.push(v)}},
 Mesh:class{constructor(g){this.geometry=g;this.position={set(){}};this.rotation={x:0,y:0,z:0};this.visible=true;}},
 ConeGeometry:class{},BufferGeometry:class{setAttribute(k,x){this.attr=x}setIndex(x){this.indices=x}computeVertexNormals(){}},
 Float32BufferAttribute:class{constructor(x,n){this.array=x;this.n=n}}};
const e=(g,...args)=>{const t=new T.Mesh();t.args=args;g.add(t);return t};
const l=(g,pts,rad)=>{const t=new T.Mesh();t.pts=pts;t.rad=rad;g.add(t);return t};
const M={main:{},dark:{},light:{},white:{},gold:{},black:{},pink:{},eye:{},glow:{}};
test('Exactly five documented catalogued identities, no added ID or cross-batch intersection',()=>{
 assert.equal(ids.length,5);assert.equal(new Set(ids).size,5);
 const a=engine.indexOf('const CREATURES=['),b=engine.indexOf('\n];',a);
 const roster=runInNewContext(engine.slice(a,b+3)+';CREATURES');
 assert.equal(roster.length,300);
 const batches=JSON.parse(read('release.json')).merged_morphology_batches;
 const prev=new Set(batches.filter(x=>x.batch==='nj98'||x.batch==='nj99').flatMap(x=>x.identity_ids));
 for(const id of ids){
  assert.equal(roster.filter(x=>x[0]===id).length,1,id);
  assert.ok(!prev.has(id),'batch overlap '+id);
  assert.ok(win.NUSAJIWA_SCULPT100_META[id]?.source.startsWith('https://'));}
});
test('Five identities × 8 stages use unique, finite, visible new meshes and mask old geometry',()=>{
 let n=0;
 for(const id of ids){
  const unique=new Set();
  for(let s=0;s<8;s++){
   const g=new T.Group(),b=new T.Group(),native={visible:true},overlay={visible:true};
   g.add(b);b.add(native);b.add(overlay);if(s===0)g.add({visible:true});
   assert.ok(sculpt(g,b,M,id,s,T,e,l),id+'/'+s);
   const rig=(s===0?g:b).children.at(-1);
   assert.equal(rig.userData.id,id);assert.equal(rig.userData.phase,s);
   assert.ok(rig.children.length>=(s===0?9:12),'insufficient identity anatomy '+id+'/'+s);
   if(s===0)assert.equal(b.visible,false);else{assert.equal(native.visible,false);assert.equal(overlay.visible,false);}
   const sig=rig.children.map(o=>o.name.slice((id+'-F'+s+'-').length)).sort().join('|');
   assert.ok(!unique.has(sig),'geometry-topology duplicate '+id+'/'+s);unique.add(sig);
   for(const obj of rig.children){if(obj.pts)assert.ok(obj.pts.flat().every(Number.isFinite),'nonfinite spline '+id+'/'+s);
    if(obj.geometry?.attr)assert.ok(obj.geometry.attr.array.every(Number.isFinite),'nonfinite loft '+id+'/'+s);}
   n++;
  }
  assert.equal(unique.size,8);
 }
 assert.equal(n,40);
});
test('Iconographic markers distinguish indigenous forms and avoid generic western dragons',()=>{
 const expected={
 lembuswana:['long-elephant-trunk','individual-dragon-scale','Kutai-garuda-wing-humerus','royal-kutai-crown-prong','chicken-like-separated-toe'],
 garuda:['anthropomorphic-human-torso','human-shoulder-elbow-wrist','human-leg','eagle-head','individual-wing-flight-feather'],
 naga_basuki:['long-river-to-mountain-serpent-backbone','Basuki-flowing-water-crest','river-wave-vein'],
 naga_antaboga:['subterranean-crowned-king-coil','royal-wayang-triple-jamang-tier','king-serpent-crown-tip'],
 ular_naga:['penjor-curved-taksaka-shoulder','Taksaka-penjor-curled-hair','penjor-single-high-arched-sanggah-tip']
 };
 for(const [id,parts] of Object.entries(expected)){
  const g=new T.Group(),b=new T.Group();g.add(b);b.add({visible:true});assert.ok(sculpt(g,b,M,id,5,T,e,l));
  const names=b.children.at(-1).children.map(v=>v.name).join('|');
  for(const x of parts)assert.ok(names.includes(x),'missing '+id+'/'+x);
 }
});
test('Other IDs untouched and production load/deploy contracts include NJ100',()=>{
 const g=new T.Group(),b=new T.Group(),base={visible:true};g.add(b);b.add(base);
 assert.equal(sculpt(g,b,M,'wewe',5,T,e,l),false);assert.equal(base.visible,true);
 assert.ok(engine.includes('window.NUSAJIWA_SCULPT100?.(group,body,M,r[0],renderPhase,THREE,ell,tube);'));
 assert.ok(html.includes('./nj100-myth-batch3.js'));
 assert.ok(html.indexOf('./nj100-myth-batch3.js')<html.indexOf('./script_32.js'));
 const p=read('.github/workflows/pages.yml'),q=read('.github/workflows/tamagotchi-quality.yml');
 assert.ok(p.includes('node --check nj100-myth-batch3.js'));assert.ok(p.split('\n').some(line=>line.includes('cp nj98-mistis-batch1.js')&&line.includes('nj100-myth-batch3.js')&&line.includes('_site/')));
 assert.ok(q.includes("      - 'nj100-myth-batch3.js'"));
});
