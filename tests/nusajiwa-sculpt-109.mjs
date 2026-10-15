import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const code=read('nj109-fauna-batch12.js'),engine=read('script_32.js'),html=read('index.html');
const ctx={window:{}};runInNewContext(code,ctx);
const ids=Array.from(ctx.window.NUSAJIWA_SCULPT109_IDS),sculpt=ctx.window.NUSAJIWA_SCULPT109,meta=ctx.window.NUSAJIWA_SCULPT109_META;
const T={DoubleSide:'double',
 Group:class{constructor(){this.children=[];this.userData={};this.visible=true;}add(c){this.children.push(c)}},
 Mesh:class{constructor(g,m){this.geometry=g;this.material=m;this.visible=true;this.position={set(){}};this.rotation={x:0,y:0,z:0};this.scale={set(){}};}},
 ConeGeometry:class{constructor(r,h){this.radius=r;this.height=h}},
 RingGeometry:class{}, MeshStandardMaterial:class{constructor(o){this.parameters=o}}
};
const ell=(g,...args)=>{const o=new T.Mesh();o.params=args;g.add(o);return o};
const tube=(g,pts,r,m)=>{const o=new T.Mesh();o.points=pts;o.r=r;g.add(o);return o};
const M={main:{},light:{},dark:{},white:{},gold:{},black:{},glow:{},pink:{},eye:{}};
test('5 non-overlapping existing 300 catalog fauna; sources and conservation anatomy documented',()=>{
 const a=engine.indexOf('const CREATURES=['),b=engine.indexOf('\n];',a);
 const roster=runInNewContext(engine.slice(a,b+3)+';CREATURES');
 assert.equal(roster.length,300);
 assert.equal(ids.length,5);assert.equal(new Set(ids).size,5);
 const rel=JSON.parse(read('release.json'));
 assert.equal(rel.runtime.identities,300);assert.equal(rel.runtime.levels,15);
 for(const id of ids){
  assert.equal(roster.filter(row=>row[0]===id&&row[2]==='Fauna').length,1);
  assert.ok(meta[id]?.source.startsWith('https://'));
  assert.ok(meta[id]?.taxon.includes(' '));
 }
 const prior=new Set(rel.merged_morphology_batches.filter(b=>b.batch!=='nj109').flatMap(b=>b.identity_ids||[]));
 for(const id of ids)assert.equal(prior.has(id),false,'already in earlier reconstruction '+id);
 const batch109=rel.merged_morphology_batches.find(b=>b.batch==='nj109');
 assert.ok(batch109,'NJ109 must remain in release ledger');
 assert.deepEqual(Array.from(batch109.identity_ids),ids);
});
test('40 distinct morphology builds hide legacy models and have finite geometry coordinates',()=>{
 let total=0;
 for(const id of ids){
  const signatures=new Set();
  for(let s=0;s<8;s++){
   const group=new T.Group(),body=new T.Group(),base={visible:true},overlay={visible:true};
   group.add(body);body.add(base);body.add(overlay);
   if(s===0)group.add({visible:true});
   assert.equal(sculpt(group,body,M,id,s,T,ell,tube),true,id+'/'+s);
   const rig=(s===0?group:body).children.at(-1);
   assert.equal(rig.userData.id,id);assert.equal(rig.userData.phase,s);
   assert.ok(rig.children.length>=(s===0?7:22),id+'/'+s+' insufficient sculpt elements');
   if(s===0)assert.equal(body.visible,false);
   else {assert.equal(base.visible,false);assert.equal(overlay.visible,false);}
   const fingerprint=rig.children.map(c=>
    c.name.replace(id+'-F'+s+'-','')+'|'+(c.params?
      c.params.slice(0,6).map(x=>typeof x==='number'?x.toFixed(3):'').join(','):
      c.points?c.points.map(v=>v.map(x=>x.toFixed(3)).join(',')).join(';'):'')).sort().join('|');
   assert.equal(signatures.has(fingerprint),false,'phase unchanged in anatomy '+id+'/'+s);
   signatures.add(fingerprint);
   for(const c of rig.children){
    if(c.params)assert.ok(c.params.slice(0,6).filter(x=>typeof x==='number').every(Number.isFinite));
    if(c.points)assert.ok(c.points.flat().every(Number.isFinite));
   }
   total++;
  }
  assert.equal(signatures.size,8);
 }
 assert.equal(total,40);
});
test('All five identifiable taxa have correct distinguishing sculpt anatomy at adult and elder',()=>{
 const markers={
 rangkong_papan:['helmeted-hornbill-solid-high-casque','paired-extraordinary-elongated-central-white-tail','bare-throat-not-feathers','distinct-black-band-on-central-tail'],
 merpati_mahkota_biru:['big-ground-pigeon-plump-body','rich-maroon-chestnut-shoulder-bib','separate-open-lacy-crest-spine','goura-bright-red-eye'],
 kura_leher_ular_rote:['flattened-grey-olive-oval-carapace','long-side-neck-vertebral-snake-line','four-curved-chelid-toe','neck-wart-like-tubercle'],
 kucing_merah_borneo:['long-low-smooth-unspotted-Bornean-bay-cat-torso','very-long-bay-cat-tail','white-ventral-stripe-on-tail','small-rounded-dark-backed-ear'],
 kukang_sumatra:['stocky-round-Sumatran-slow-loris-torso','thick-dark-circumocular-mask','prehensile-thumb-opposable-grip-palm','brown-dorsal-back-stripe']
 };
 for(const [id,anchors] of Object.entries(markers)){
  const g=new T.Group(),b=new T.Group();g.add(b);b.add({visible:true});
  assert.equal(sculpt(g,b,M,id,5,T,ell,tube),true);
  const names=b.children.at(-1).children.map(c=>c.name).join('|');
  for(const x of anchors)assert.ok(names.includes(x),id+' missing '+x);
  const rig=b.children.at(-1);
  assert.ok(rig.children.some(c=>c.material?.parameters?.color||c.params?.at(-1)?.parameters?.color),'species-specific physical colour');
  assert.equal(rig.userData.fictionalLegend,false);
 }
});
test('Legend is explicitly fictional; no effects on other species or gameplay/save',()=>{
 const g=new T.Group(),b=new T.Group(),base={visible:true};g.add(b);b.add(base);
 assert.equal(sculpt(g,b,M,'komodo',5,T,ell,tube),false);
 assert.equal(base.visible,true);assert.equal(b.children.length,1);
 for(const id of ids){const gp=new T.Group(),bb=new T.Group();gp.add(bb);bb.add({visible:true});
  sculpt(gp,bb,M,id,7,T,ell,tube);
  assert.equal(bb.children.at(-1).userData.fictionalLegend,true);}
 assert.ok(!code.includes('localStorage.'));
 assert.ok(engine.includes('window.NUSAJIWA_SCULPT109?.(group,body,M,r[0],renderPhase,THREE,ell,tube);'));
 assert.ok(html.indexOf('nj109-fauna-batch12.js')<html.indexOf('script_32.js'));
});
test('Public bundle and both continuous tests/deploy contracts include new sculpt module',()=>{
 const pg=read('.github/workflows/pages.yml'),qa=read('.github/workflows/tamagotchi-quality.yml');
 assert.ok(pg.includes('node --check nj109-fauna-batch12.js'));
 assert.ok(pg.split('\n').some(l=>l.includes('cp nj98-mistis-batch1.js')&&l.includes('nj109-fauna-batch12.js')&&l.includes('_site/')));
 assert.ok(qa.includes("      - 'nj109-fauna-batch12.js'"));
 assert.ok(qa.includes('node --check nj109-fauna-batch12.js'));
});
