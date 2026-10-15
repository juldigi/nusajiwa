import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const js=read('nj102-regional-batch5.js'),engine=read('script_32.js'),html=read('index.html');
const w={};runInNewContext(js,{window:w});
const ids=Array.from(w.NUSAJIWA_SCULPT102_IDS),sculpt=w.NUSAJIWA_SCULPT102;
const T={Group:class{constructor(){this.children=[];this.userData={};this.visible=true}add(q){this.children.push(q)}},
 Mesh:class{constructor(g,m){this.geometry=g;this.material=m;this.visible=true;this.rotation={z:0};this.position={set(){}};}},
 ConeGeometry:class{},ExtrudeGeometry:class{constructor(shape,settings){this.shape=shape;this.settings=settings}},
 Shape:class{constructor(){this.points=[]}moveTo(x,y){this.points.push([x,y])}lineTo(x,y){this.points.push([x,y])}closePath(){}}
};
const E=(g,...args)=>{const t=new T.Mesh();t.args=args;g.add(t);return t};
const L=(g,pts,r)=>{const t=new T.Mesh();t.pts=pts;g.add(t);return t};
const M={main:{},light:{},dark:{},white:{},gold:{},pink:{},eye:{},black:{},glow:{}};
test('NJ102 rebuilds four existing, unique Indonesian cultural identities without modifying 300 IDs',()=>{
 assert.deepEqual(ids,['bujang_ganong','warak_ngendog','boraspati_tano','kebo_iwa']);
 const a=engine.indexOf('const CREATURES=['),b=engine.indexOf('\n];',a);
 const roster=runInNewContext(engine.slice(a,b+3)+';CREATURES');
 assert.equal(roster.length,300);assert.equal(new Set(roster.map(x=>x[0])).size,300);
 const m=JSON.parse(read('release.json'));
 assert.equal(m.runtime.identities,300);assert.equal(m.runtime.levels,15);
 for(const id of ids){assert.equal(roster.filter(r=>r[0]===id).length,1);
  assert.ok(w.NUSAJIWA_SCULPT102_META[id]?.source.startsWith('https://'));}
 assert.equal(m.merged_morphology_batches.at(-1).batch,'nj102');
 assert.deepEqual(Array.from(m.merged_morphology_batches.at(-1).identity_ids),ids);
});
test('Thirty-two fully reconstructed phases mask prior meshes and offer distinct phase topology',()=>{
 let n=0;
 for(const id of ids){
  const forms=new Set();
  for(let stage=0;stage<8;stage++){
   const g=new T.Group(),b=new T.Group(),old={visible:true},prev={visible:true};
   g.add(b);b.add(old);b.add(prev);if(stage===0)g.add({visible:true});
   assert.equal(sculpt(g,b,M,id,stage,T,E,L),true,id+'/'+stage);
   const rig=(stage===0?g:b).children.at(-1);
   assert.equal(rig.userData.id,id);assert.equal(rig.userData.phase,stage);
   assert.ok(rig.children.length>=(stage===0?8:18),id+' missing parts at '+stage);
   if(stage===0){assert.equal(b.visible,false);assert.equal(g.children[1].visible,false)}
   else{assert.equal(old.visible,false);assert.equal(prev.visible,false);}
   const name=rig.children.map(c=>c.name.replace(id+'-F'+stage+'-','')).sort().join('|');
   assert.equal(forms.has(name),false,'same geometry '+id+'/'+stage);forms.add(name);
   for(const obj of rig.children){
    if(obj.pts)assert.ok(obj.pts.flat().every(Number.isFinite));
    if(obj.geometry?.shape)assert.ok(obj.geometry.shape.points.flat().every(Number.isFinite));
   }
   n++;
  }
  assert.equal(forms.size,8);
 }
 assert.equal(n,32);
});
test('Four truly distinct silhouettes: red nose mask, hybrid mascot, gecko relief, human giant',()=>{
 const anchor={
  bujang_ganong:['comical-painted-red-ganong-mask','extremely-long-curved-Ganong-nose','springy-bent-reog-dancer-leg'],
  warak_ngendog:['fourlegged-hybrid-Buraq-goat-torso','Semarang-Chinese-dragon-head','colorful-curled-goat-wool','small-Dugderan-symbolic-egg-by-tail'],
  boraspati_tano:['flat-Batak-gorga-gecko-relief-backplate','gecko-front-splayed-wall-leg','carved-earth-batik-gorga-scale'],
  kebo_iwa:['big-powerful-human-builder-torso','recognizably-human-head','long-well-digging-wooden-tool-shaft']
 };
 for(const [id,keys] of Object.entries(anchor)){
  const g=new T.Group(),b=new T.Group();g.add(b);b.add({visible:true});sculpt(g,b,M,id,5,T,E,L);
  const parts=b.children.at(-1).children;
  const names=parts.map(t=>t.name).join('|');
  for(const key of keys)assert.ok(names.includes(key),id+' lacks '+key);
  if(id==='boraspati_tano'){
   const panel=parts.find(p=>p.name.endsWith('flat-Batak-gorga-gecko-relief-backplate'));
   assert.ok(panel.geometry instanceof T.ExtrudeGeometry);
   assert.ok(panel.geometry.settings.depth<.1);
  }
  if(id==='kebo_iwa')assert.equal(names.includes('buffalo-horn'),false);
 }
});
test('Engine, Pages, prior character model and release invariants remain intact',()=>{
 const g=new T.Group(),b=new T.Group(),native={visible:true};g.add(b);b.add(native);
 assert.equal(sculpt(g,b,M,'rangda',5,T,E,L),false);
 assert.equal(native.visible,true);
 assert.ok(engine.includes('window.NUSAJIWA_SCULPT102?.(group,body,M,r[0],renderPhase,THREE,ell,tube);'));
 assert.ok(html.indexOf('nj102-regional-batch5.js')<html.indexOf('script_32.js'));
 const pages=read('.github/workflows/pages.yml'),q=read('.github/workflows/tamagotchi-quality.yml');
 assert.ok(pages.includes('node --check nj102-regional-batch5.js'));
 assert.ok(pages.split('\n').some(l=>l.includes('cp nj98-mistis-batch1.js')&&l.includes('nj102-regional-batch5.js')&&l.includes('_site/')));
 assert.ok(q.includes('node --check nj102-regional-batch5.js'));
 assert.ok(q.includes("      - 'nj102-regional-batch5.js'"));
});
