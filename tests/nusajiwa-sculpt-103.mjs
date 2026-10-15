import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const source=read('nj103-cryptid-batch6.js'),engine=read('script_32.js'),html=read('index.html');
const w={};runInNewContext(source,{window:w});const ids=Array.from(w.NUSAJIWA_SCULPT103_IDS);
const sculpt=w.NUSAJIWA_SCULPT103;
const T={Group:class{constructor(){this.children=[];this.userData={};this.visible=true}add(x){this.children.push(x)}},
 Mesh:class{constructor(g,m){this.geometry=g;this.material=m;this.visible=true;this.name='';
  this.position={z:0,set(){}};this.rotation={z:0,y:0,x:0};}},
 ConeGeometry:class{},ShapeGeometry:class{constructor(shape){this.shape=shape}},
 Shape:class{constructor(){this.points=[]}moveTo(...p){this.points.push(p)}lineTo(...p){this.points.push(p)}closePath(){}}
};
const E=(g,...args)=>{const o=new T.Mesh();o.args=args;g.add(o);return o};
const L=(g,pts,r,m)=>{const o=new T.Mesh();o.pts=pts;o.radius=r;g.add(o);return o};
const M={main:{},dark:{},light:{},white:{},gold:{},pink:{},eye:{},black:{},glow:{}};
test('Target contains five correctly catalogued nonfauna identities, without duplicates or new species',()=>{
 assert.deepEqual(ids,['ahool','nyai_blora','macan_putih','siluman_harimau','ebu_gogo']);
 const a=engine.indexOf('const CREATURES=['),b=engine.indexOf('\n];',a);
 const roster=runInNewContext(engine.slice(a,b+3)+';CREATURES');
 assert.equal(roster.length,300);assert.equal(new Set(roster.map(r=>r[0])).size,300);
 const rel=JSON.parse(read('release.json'));
 assert.equal(rel.runtime.identities,300);assert.equal(rel.runtime.levels,15);
 const previous=new Set(rel.merged_morphology_batches.filter(b=>/^nj(98|99|100|101|102)$/.test(b.batch))
  .flatMap(b=>b.identity_ids));
 const historic=rel.merged_morphology_batches.find(b=>b.batch==='nj103');
 assert.ok(historic);
 assert.deepEqual(Array.from(historic.identity_ids),ids);
 for(const id of ids){
  assert.equal(roster.filter(r=>r[0]===id&&r[2]!=='Fauna').length,1,id);
  assert.equal(previous.has(id),false,'duplicate new priority identity '+id);
  assert.ok(w.NUSAJIWA_SCULPT103_META[id].source.startsWith('https://'));
 }
});
test('Forty original stage-specific rigs hide native and older morph overlays, finite mesh parts',()=>{
 let count=0;
 for(const id of ids){
  const signatures=new Set();
  for(let s=0;s<8;s++){
   const g=new T.Group(),b=new T.Group(),original={visible:true},overlay={visible:true};g.add(b);b.add(original);b.add(overlay);
   if(s===0)g.add({visible:true,name:'old-egg'});
   assert.equal(sculpt(g,b,M,id,s,T,E,L),true,id+'/'+s);
   const rig=(s===0?g:b).children.at(-1);
   assert.equal(rig.userData.id,id);assert.equal(rig.userData.phase,s);
   assert.ok(rig.children.length>=(s===0?9:18),'insufficient distinguishing geometry '+id+'/'+s);
   if(s===0){assert.equal(b.visible,false);assert.equal(g.children[1].visible,false)}
   else {assert.equal(original.visible,false);assert.equal(overlay.visible,false)}
   const signature=rig.children.map(o=>o.name.replace(id+'-F'+s+'-','')).sort().join('|');
   assert.equal(signatures.has(signature),false,'indistinguishable topology '+id+'/'+s);signatures.add(signature);
   for(const q of rig.children){
    if(q.pts)assert.ok(q.pts.flat().every(Number.isFinite),'nonfinite spline '+id+'/'+s);
    if(q.geometry?.shape)assert.ok(q.geometry.shape.points.flat().every(Number.isFinite),'nonfinite membrane '+id+'/'+s);
   }
   count++;
  }assert.equal(signatures.size,8);
 }
 assert.equal(count,40);
});
test('No generic silhouettes: bat membranes, human-serpent, tiger paws, human-to-tiger stages, hairy human',()=>{
 const anchors={
 ahool:['large-five-lobed-bat-wing-web','bat-finger-bone','flattened-primate-like-bat-face'],
 nyai_blora:['long-coiled-snake-tail-replacing-human-legs','woman-serpent-human-bust','human-not-lizard-head'],
 macan_putih:['true-fourlegged-white-tiger-body','four-jointed-actual-tiger-leg','individual-true-tiger-broken-stripe'],
 siluman_harimau:['true-fourlegged-white-tiger-body','former-human-temple-mark','striped-muscular-tiger-tail'],
 ebu_gogo:['small-compact-hairy-humanlike-body','not-monkey-short-wide-flat-nose','individually-bunched-body-hair']
 };
 for(const [id,parts] of Object.entries(anchors)){
  const g=new T.Group(),b=new T.Group();g.add(b);b.add({visible:true});
  sculpt(g,b,M,id,5,T,E,L);const names=b.children.at(-1).children.map(c=>c.name).join('|');
  for(const p of parts)assert.ok(names.includes(p),id+' lacks '+p);
 }
 const body=new T.Group(),g=new T.Group();g.add(body);
 sculpt(g,body,M,'siluman_harimau',2,T,E,L);
 assert.ok(body.children.at(-1).children.some(x=>x.name.includes('human-torso')));
 assert.ok(!body.children.at(-1).children.some(x=>x.name.includes('fourlegged-white-tiger')));
});
test('Five models loaded before engine; CI, Pages and untouched UI/game IDs preserved',()=>{
 const g=new T.Group(),body=new T.Group(),original={visible:true};g.add(body);body.add(original);
 assert.equal(sculpt(g,body,M,'wewe',5,T,E,L),false);
 assert.equal(original.visible,true);assert.equal(body.children.length,1);
 assert.ok(engine.includes('window.NUSAJIWA_SCULPT103?.(group,body,M,r[0],renderPhase,THREE,ell,tube);'));
 assert.ok(html.indexOf('./nj103-cryptid-batch6.js')>0&&html.indexOf('./nj103-cryptid-batch6.js')<html.indexOf('./script_32.js'));
 assert.ok(html.includes('./nj642-living.js')||html.includes('./nj42-bridge.js'));
 const pg=read('.github/workflows/pages.yml'),qa=read('.github/workflows/tamagotchi-quality.yml');
 assert.ok(pg.includes('node --check nj103-cryptid-batch6.js'));
 assert.ok(pg.split('\n').some(l=>l.includes('cp nj98-mistis-batch1.js')&&l.includes('nj103-cryptid-batch6.js')&&l.includes('_site/')));
 assert.ok(qa.includes('node --check nj103-cryptid-batch6.js'));
 assert.ok(qa.includes("      - 'nj103-cryptid-batch6.js'"));
});
