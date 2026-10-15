import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const js=read('nj105-urban-batch8.js'),engine=read('script_32.js'),html=read('index.html');
const win={};runInNewContext(js,{window:win});
const ids=Array.from(win.NUSAJIWA_SCULPT105_IDS),sculpt=win.NUSAJIWA_SCULPT105;
const M={main:{},dark:{},light:{},white:{},gold:{},pink:{},eye:{},black:{},glow:{}};
const T={DoubleSide:2,
 Group:class{constructor(){this.children=[];this.visible=true;this.userData={};}add(x){this.children.push(x)}},
 Mesh:class{constructor(g,m){this.geometry=g;this.material=m;this.visible=true;this.name='';this.position={set(){}};this.rotation={x:0,z:0,y:0};}},
 MeshStandardMaterial:class{constructor(opts){this.opts=opts}},
 ConeGeometry:class{},TorusGeometry:class{},
 BufferGeometry:class{setAttribute(n,att){this.att=att;}setIndex(index){this.tris=index;}computeVertexNormals(){}},
 Float32BufferAttribute:class{constructor(arr,n){this.array=arr;this.n=n}}
};
const E=(r,...args)=>{const o=new T.Mesh();o.args=args;r.add(o);return o};
const L=(r,pts,rad,mat)=>{const o=new T.Mesh();o.pts=pts;o.rad=rad;r.add(o);return o};
const preview=(id,phase)=>{const group=new T.Group(),body=new T.Group(),old={visible:true},add={visible:true};
 group.add(body);body.add(old);body.add(add);if(phase===0)group.add({visible:true});
 const ok=sculpt(group,body,M,id,phase,T,E,L);
 const rig=(phase===0?group:body).children.at(-1);
 return {group,body,old,add,ok,rig};};
test('Batch 08 models five exact existing folklore entries and zero new creatures',()=>{
 assert.deepEqual(ids,['nenek_pakande','si_manis_jembatan_ancol','hantu_jeruk_purut','nyi_roro_kidul','dewi_lanjar']);
 const a=engine.indexOf('const CREATURES=['),b=engine.indexOf('\n];',a);
 const roster=runInNewContext(engine.slice(a,b+3)+';CREATURES');
 assert.equal(roster.length,300);
 assert.equal(new Set(roster.map(x=>x[0])).size,300);
 assert.equal(ids.length,new Set(ids).size);
 const ledger=JSON.parse(read('release.json'));
 assert.equal(ledger.runtime.identities,300);assert.equal(ledger.runtime.levels,15);
 const record=ledger.merged_morphology_batches.find(b=>b.batch==='nj105');
 assert.ok(record);assert.deepEqual(Array.from(record.identity_ids),ids);
 const prior=new Set(ledger.merged_morphology_batches.filter(b=>/^nj(98|99|100|101|102|103|104)$/.test(b.batch)).flatMap(b=>b.identity_ids));
 for(const id of ids){assert.equal(roster.filter(row=>row[0]===id&&row[2]!=='Fauna').length,1);
  assert.ok(!prior.has(id),'unexpected overlap '+id);
  assert.ok(win.NUSAJIWA_SCULPT105_META[id].source.startsWith('https://')); }
});
test('All forty game-stage sculpts visibly replace legacy adult, construct real 3D geometry and vary topology',()=>{
 let tested=0;
 for(const id of ids){
  const shapes=new Set();
  for(let stage=0;stage<8;stage++){
   const {ok,group,body,old,add,rig}=preview(id,stage);
   assert.equal(ok,true,id+'/'+stage);
   assert.equal(rig.userData.id,id);assert.equal(rig.userData.phase,stage);
   assert.ok(rig.children.length>=(stage===0?8:20),'missing model detail '+id+'/'+stage);
   if(stage===0){assert.equal(body.visible,false);assert.equal(group.children[1].visible,false)}
   else {assert.equal(old.visible,false);assert.equal(add.visible,false);}
   const signature=rig.children.map(part=>part.name.replace(id+'-F'+stage+'-','')).sort().join('|');
   assert.ok(!shapes.has(signature),'duplicate stage topology '+id+'/'+stage);
   shapes.add(signature);
   for(const part of rig.children){
    if(part.pts)assert.ok(part.pts.flat().every(Number.isFinite),'invalid spline '+id+'/'+stage);
    if(part.geometry?.att)assert.ok(part.geometry.att.array.every(Number.isFinite),'invalid mesh loft '+id+'/'+stage);
   }
   tested++;
  }
  assert.equal(shapes.size,8);
 }
 assert.equal(tested,40);
});
test('Culture-specific silhouettes are explicit and never interchangeable generic ghost outfits',()=>{
 const anchors={
  nenek_pakande:['Bugis-old-womans-plaid-sarong','white-hair-bun-on-back-of-head','separate-wooden-walking-stick','plaid-sarong-horizontal-thread'],
  si_manis_jembatan_ancol:['modern-red-Ancol-dress-with-defined-waist','Ancol-cast-iron-bridge-reference','iconic-wind-caught-red-scarf'],
  hantu_jeruk_purut:['dark-religious-robe-human-body-no-head','flat-neck-void-not-an-attached-skull','detached-human-head-held-in-left-hand','separate-black-dog-low-barrel','black-dog-four-paws'],
  nyi_roro_kidul:['south-sea-emerald-green-court-dress','South-Sea-queen-hair-band','Southern-sea-crown-prong','ratu-kidul-waves-passing-behind-court'],
  dewi_lanjar:['north-coast-Pekalongan-royal-batik-wrap','Pekalongan-batik-jlamprang-diamond','Slamaran-coast-shell-emblem','north-coast-rolling-waves']
 };
 for(const [id,need] of Object.entries(anchors)){
  const {rig}=preview(id,5),names=rig.children.map(x=>x.name).join('|');
  for(const marker of need)assert.ok(names.includes(marker),id+' missing '+marker);
 }
 const pastor=preview('hantu_jeruk_purut',5).rig.children.map(x=>x.name).join('|');
 assert.ok(!pastor.includes('head-attached-at-neck'),'Pastor legend must remain headless');
 assert.ok(!preview('dewi_lanjar',5).rig.children.map(x=>x.name).join('|').includes('south-sea-emerald-green-court-dress'));
 assert.ok(!preview('nyi_roro_kidul',5).rig.children.map(x=>x.name).join('|').includes('mermaid-tail'));
});
test('Unselected IDs untouched; live engine, Pages asset copy and quality CI include module',()=>{
 const group=new T.Group(),body=new T.Group(),source={visible:true};group.add(body);body.add(source);
 assert.equal(sculpt(group,body,M,'kuyang',5,T,E,L),false);assert.equal(source.visible,true);
 assert.ok(engine.includes('window.NUSAJIWA_SCULPT105?.(group,body,M,r[0],renderPhase,THREE,ell,tube);'));
 assert.ok(html.includes('./nj105-urban-batch8.js'));
 assert.ok(html.indexOf('./nj105-urban-batch8.js')<html.indexOf('./script_32.js'));
 const pages=read('.github/workflows/pages.yml'),quality=read('.github/workflows/tamagotchi-quality.yml');
 assert.ok(pages.includes('node --check nj105-urban-batch8.js'));
 assert.ok(pages.split('\n').some(line=>line.includes('cp nj98-mistis-batch1.js')&&line.includes('nj105-urban-batch8.js')&&line.includes('_site/')));
 assert.ok(quality.includes("      - 'nj105-urban-batch8.js'"));
 assert.ok(quality.includes('node --check nj105-urban-batch8.js'));
});
