import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const win={};runInNewContext(read('nj120-aquatic-batch13.js'),{window:win});
const ids=Array.from(win.NUSAJIWA_SCULPT120_IDS),sculpt=win.NUSAJIWA_SCULPT120;
const T={
 Group:class{constructor(){this.children=[];this.visible=true;this.userData={}}add(x){this.children.push(x)}},
 Mesh:class{constructor(g,m){this.geometry=g;this.material=m;this.visible=true;this.position={set(){}};this.rotation={x:0,y:0,z:0}}},
 ConeGeometry:class{},ExtrudeGeometry:class{constructor(shape,options){this.shape=shape;this.options=options}},
 Shape:class{constructor(){this.pos=[]}moveTo(x,y){this.pos.push(x,y)}lineTo(x,y){this.pos.push(x,y)}closePath(){}},
 BufferGeometry:class{setAttribute(k,x){this.vertices=x}setIndex(x){this.indices=x}computeVertexNormals(){}},
 Float32BufferAttribute:class{constructor(x,n){this.array=x;this.itemSize=n}}
};
const E=(g,...data)=>{const x=new T.Mesh();x.data=data;g.add(x);return x};
const L=(g,points,r)=>{const x=new T.Mesh();x.points=points;g.add(x);return x};
const M={main:{},dark:{},light:{},white:{},gold:{},pink:{},eye:{},black:{},glow:{}};
function build(id,s){
 const group=new T.Group(),body=new T.Group(),old={visible:true},overlay={visible:true};group.add(body);body.add(old);body.add(overlay);
 if(s===0)group.add({visible:true});
 const ok=sculpt(group,body,M,id,s,T,E,L),root=(s===0?group:body).children.at(-1);
 return {ok,group,body,old,overlay,root,names:root.children.map(x=>x.name).join('|')};
}
test('Only five new aquatic IDs from immutable 300 catalog; no collision with NJ109',()=>{
 assert.deepEqual(ids,['labi_moncong_babi_papua','mola_mola','hiu_paus','kuda_laut_kerdil','pari_manta']);
 const e=read('script_32.js'),a=e.indexOf('const CREATURES=['),b=e.indexOf('\n];',a);
 const rows=runInNewContext(e.slice(a,b+3)+';CREATURES');assert.equal(rows.length,300);
 assert.equal(new Set(rows.map(r=>r[0])).size,300);
 const m=JSON.parse(read('release.json'));
 const former=new Set(m.merged_morphology_batches.filter(z=>z.batch!=='nj120').flatMap(z=>z.identity_ids||[]));
 for(const id of ids){assert.equal(rows.filter(z=>z[0]===id&&z[2]==='Fauna').length,1,id);
  assert.equal(former.has(id),false,'overwritten previous batch: '+id);
  assert.ok(win.NUSAJIWA_SCULPT120_META[id].source.startsWith('https://'));}
 assert.equal(m.runtime.identities,300);
 assert.ok(m.merged_morphology_batches.some(x=>x.batch==='nj120'&&x.constructions===40));
});
test('Forty individual constructions hide older rigs and use finite coordinates and surfaces',()=>{
 let count=0;
 for(const id of ids){
  const seen=new Set();
  for(let s=0;s<8;s++){
   const x=build(id,s);assert.ok(x.ok,id+'/'+s);
   assert.equal(x.root.userData.id,id);assert.equal(x.root.userData.phase,s);
   assert.ok(x.root.children.length>=(s===0?8:13),id+'/'+s+' needs detailed geometry');
   if(s===0)assert.equal(x.body.visible,false);
   else{assert.equal(x.old.visible,false);assert.equal(x.overlay.visible,false);}
   const key=x.root.children.map(o=>o.name.slice((id+'-F'+s+'-').length)).sort().join('|');
   assert.ok(!seen.has(key),'duplicate phase anatomy '+id+'/'+s);seen.add(key);
   for(const o of x.root.children){
    if(o.points)assert.ok(o.points.flat().every(Number.isFinite));
    if(o.geometry?.shape)assert.ok(o.geometry.shape.pos.every(Number.isFinite));
    if(o.geometry?.vertices)assert.ok(o.geometry.vertices.array.every(Number.isFinite));
   }
   count++;
  }
  assert.equal(seen.size,8);
 }
 assert.equal(count,40);
});
test('Species differences nonnegotiable: no turtle scutes, mola clavus, shark tail, seahorse coil, manta cephalic lobes',()=>{
 const idsAndParts={
 labi_moncong_babi_papua:['whole-smooth-leather-shell-no-scutes','exactly-two-clawed-flipper','nostril-at-end-of-fleshy-snout'],
 mola_mola:['deep-ovate-vertical-ocean-sunfish-disk','very-tall-sunfish-dorsal-propulsion-fin','true-clavus-rudder-not-caudal-tail'],
 hiu_paus:['great-plankton-filtering-shark-barrel','flat-broad-terminal-mouth','individual-white-checkerboard-spot','large-lunate-caudal-tail-upper'],
 kuda_laut_kerdil:['tight-prehensile-curled-tail','individual-camouflage-bulbous-tubercle','very-short-pygmy-tubular-snout'],
 pari_manta:['true-three-dimensional-diamond-wing','feeding-rolled-cephalic-head-lobe','characteristic-Y-shaped-reef-manta-shoulder']
 };
 for(const [id,parts] of Object.entries(idsAndParts)){
  const output=build(id,5);for(const key of parts)assert.ok(output.names.includes(key),id+' missing '+key);
 }
 const p=build('labi_moncong_babi_papua',5).names;
 assert.ok(!p.includes('vertebral-scute')&&!p.includes('hard-carapace-plate'));
 const mola=build('mola_mola',5).names;assert.ok(!mola.includes('forked-tail'));
 const manta=build('pari_manta',5).root.children;
 assert.ok(manta.some(x=>x.geometry?.vertices&&x.name.includes('true-three-dimensional-diamond-wing')));
 assert.ok(!build('kuda_laut_kerdil',5).names.includes('long-horse-muzzle'));
});
test('Unrelated NJ109 not touched; asset included in both Actions build and QA',()=>{
 const g=new T.Group(),b=new T.Group(),native={visible:true};g.add(b);b.add(native);
 assert.equal(sculpt(g,b,M,'kucing_merah_borneo',5,T,E,L),false);assert.equal(native.visible,true);
 const e=read('script_32.js'),html=read('index.html');
 assert.ok(e.includes('window.NUSAJIWA_SCULPT120?.(group,body,M,r[0],renderPhase,THREE,ell,tube);'));
 assert.ok(html.indexOf('nj120-aquatic-batch13.js')>0&&html.indexOf('nj120-aquatic-batch13.js')<html.indexOf('script_32.js'));
 const pg=read('.github/workflows/pages.yml'),qa=read('.github/workflows/tamagotchi-quality.yml');
 assert.ok(pg.includes('node --check nj120-aquatic-batch13.js')&&pg.split('\n').some(line=>line.includes('cp nj120-aquatic-batch13.js')&&line.includes('_site/')));
 assert.ok(qa.includes("      - 'nj120-aquatic-batch13.js'")&&qa.includes('node --check nj120-aquatic-batch13.js'));
});
