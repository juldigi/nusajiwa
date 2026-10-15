import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const js=read('nj101-ritual-batch4.js'),engine=read('script_32.js'),html=read('index.html');
const win={};runInNewContext(js,{window:win});
const ids=Array.from(win.NUSAJIWA_SCULPT101_IDS);
const sculpt=win.NUSAJIWA_SCULPT101;
const T={Group:class{constructor(){this.children=[];this.userData={};this.visible=true}add(x){this.children.push(x)}},
 Mesh:class{constructor(g,m){this.geometry=g;this.material=m;this.visible=true;this.rotation={x:0,z:0,y:0};this.position={z:0,set(){}};}},
 ConeGeometry:class{},ExtrudeGeometry:class{constructor(shape,opt){this.shape=shape;this.options=opt}},
 Shape:class{constructor(){this.steps=[]}moveTo(x,y){this.steps.push([x,y])}lineTo(x,y){this.steps.push([x,y])}closePath(){}}
};
const E=(g,...props)=>{const o=new T.Mesh();o.props=props;g.add(o);return o};
const L=(g,pts,r,m)=>{const o=new T.Mesh();o.points=pts;g.add(o);return o};
const M={main:{},light:{},dark:{},white:{},gold:{},pink:{},eye:{},black:{},glow:{}};
const catalog=()=>{const a=engine.indexOf('const CREATURES=['),b=engine.indexOf('\n];',a);
 return runInNewContext(engine.slice(a,b+3)+';CREATURES');};
test('Five identities exist within 300, current NJ101 supersedes earlier rigs without creating new IDs',()=>{
 assert.deepEqual(ids,['barong','rangda','sembrani','kuda_lumping','singa_barong_reog']);
 const rows=catalog();assert.equal(rows.length,300);
 assert.equal(new Set(rows.map(x=>x[0])).size,300);
 const m=JSON.parse(read('release.json'));
 assert.equal(m.runtime.identities,300);assert.equal(m.runtime.levels,15);
 for(const id of ids){
  assert.equal(rows.filter(x=>x[0]===id).length,1,id);
  assert.ok(win.NUSAJIWA_SCULPT101_SOURCES[id]?.startsWith('https://'));
 }
 assert.equal(m.merged_morphology_batches.filter(x=>x.batch==='nj101').length,1);
 assert.deepEqual(Array.from(m.merged_morphology_batches.find(x=>x.batch==='nj101').identity_ids),ids);
});
test('Forty complete stage-specific rigs hide their predecessors and use finite three-dimensional coordinates',()=>{
 let total=0;
 for(const id of ids){
  const signatures=new Set();
  for(let s=0;s<8;s++){
   const g=new T.Group(),body=new T.Group(),source={visible:true},overlay={visible:true};
   g.add(body);body.add(source);body.add(overlay);
   if(s===0)g.add({visible:true});
   assert.equal(sculpt(g,body,M,id,s,T,E,L),true,id+'/'+s);
   const rig=(s===0?g:body).children.at(-1);
   assert.equal(rig.userData.id,id);assert.equal(rig.userData.phase,s);
   assert.ok(rig.children.length>=(s===0?6:18),'too few visual parts: '+id+'/'+s);
   if(s===0){assert.equal(body.visible,false);assert.equal(g.children[1].visible,false)}
   else {assert.equal(source.visible,false);assert.equal(overlay.visible,false)}
   const names=rig.children.map(q=>q.name.replace(id+'-F'+s+'-','')).sort().join('|');
   assert.ok(!signatures.has(names),'identical life-phase topology '+id+'/'+s);
   signatures.add(names);
   for(const o of rig.children){
    if(o.points)assert.ok(o.points.flat().every(Number.isFinite));
    if(o.geometry?.shape)assert.ok(o.geometry.shape.steps.flat().every(Number.isFinite));
   }
   total++;
  }
  assert.equal(signatures.size,8);
 }
 assert.equal(total,40);
});
test('Distinct cultural silhouettes: Barong costume, Rangda woman, horse, bamboo hobby horse, Reog fan',()=>{
 const anchors={
  barong:['four-legged-barong-two-performer-covered-torso','carved-red-balinese-animal-mask-head','separately-hinged-lower-mask-jaw'],
  rangda:['Rangda-sacred-mask-face','long-leather-mask-tongue','Rangda-elongated-fingernail'],
  sembrani:['round-horse-barrel-torso','functional-feathered-wing-leading-bone','four-jointed-horse-leg'],
  kuda_lumping:['thin-flat-woven-bamboo-horse-effigy','visible-bamboo-lattice-warp','woven-bamboo-weft'],
  singa_barong_reog:['reog-carved-tiger-mask-base','dadak-merak-fan-spoke','peacock-iridescent-eye-ring','flat-cokotan-lifting-wood-handle']
 };
 for(const [id,parts] of Object.entries(anchors)){
  const g=new T.Group(),body=new T.Group();g.add(body);body.add({visible:true});
  assert.ok(sculpt(g,body,M,id,5,T,E,L));
  const models=body.children.at(-1).children;
  const names=models.map(q=>q.name).join('|');
  for(const x of parts)assert.ok(names.includes(x),id+' missing '+x);
  if(id==='kuda_lumping'){
   const flat=models.find(q=>q.name.endsWith('thin-flat-woven-bamboo-horse-effigy'));
   assert.ok(flat.geometry instanceof T.ExtrudeGeometry);
   assert.ok(flat.geometry.options.depth<.1);
   assert.ok(!names.includes('functional-feathered-wing-leading-bone'));
  }
 }
});
test('Nonselected entities, UI/gameplay integration and GH Pages copy all remain sound',()=>{
 const g=new T.Group(),b=new T.Group(),source={visible:true};g.add(b);b.add(source);
 assert.equal(sculpt(g,b,M,'kuyang',5,T,E,L),false);
 assert.equal(source.visible,true);assert.equal(b.children.length,1);
 assert.ok(engine.includes('window.NUSAJIWA_SCULPT101?.(group,body,M,r[0],renderPhase,THREE,ell,tube);'));
 assert.ok(html.indexOf('nj101-ritual-batch4.js')<html.indexOf('script_32.js'));
 const pg=read('.github/workflows/pages.yml'),qa=read('.github/workflows/tamagotchi-quality.yml');
 assert.ok(pg.includes('node --check nj101-ritual-batch4.js'));
 assert.ok(pg.split('\n').some(l=>l.includes('cp nj98-mistis-batch1.js')&&l.includes('nj101-ritual-batch4.js')&&l.includes('_site/')));
 assert.ok(qa.includes("      - 'nj101-ritual-batch4.js'"));
 assert.ok(qa.includes('node --check nj101-ritual-batch4.js'));
});
