import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const src=read('nj106-folktales-batch9.js'),engine=read('script_32.js'),html=read('index.html');
const win={};runInNewContext(src,{window:win});
const ids=Array.from(win.NUSAJIWA_SCULPT106_IDS),build=win.NUSAJIWA_SCULPT106;
const M={main:{},dark:{},light:{},white:{},gold:{},pink:{},eye:{},black:{},glow:{}};
const T={DoubleSide:2,
 Group:class{constructor(){this.children=[];this.visible=true;this.userData={};}add(o){this.children.push(o)}},
 Mesh:class{constructor(g,m){this.geometry=g;this.material=m;this.visible=true;this.position={set(){}};this.rotation={x:0,y:0,z:0}}},
 MeshStandardMaterial:class{constructor(o){this.options=o}},
 ConeGeometry:class{},BufferGeometry:class{setAttribute(n,x){this.attribute=x}setIndex(x){this.tris=x}computeVertexNormals(){}},
 Float32BufferAttribute:class{constructor(x,n){this.array=x;this.n=n}}};
const E=(r,...a)=>{const o=new T.Mesh();o.args=a;r.add(o);return o};
const L=(r,pts,radius,m)=>{const o=new T.Mesh();o.points=pts;r.add(o);return o};
const make=(id,s)=>{const group=new T.Group(),body=new T.Group(),native={visible:true},prior={visible:true};
 group.add(body);body.add(native);body.add(prior);if(s===0)group.add({visible:true});
 const ok=build(group,body,M,id,s,T,E,L);
 return {ok,group,body,native,prior,rig:(s===0?group:body).children.at(-1)};};
test('NJ106 exactly five existing human/transformational folklore identities; 300 total preserved',()=>{
 assert.deepEqual(ids,['jaka_tarub','nawang_wulan','timun_mas','keong_mas','putri_mandalika']);
 const a=engine.indexOf('const CREATURES=['),b=engine.indexOf('\n];',a);
 const roster=runInNewContext(engine.slice(a,b+3)+';CREATURES');
 assert.equal(roster.length,300);assert.equal(new Set(roster.map(x=>x[0])).size,300);
 const ledger=JSON.parse(read('release.json'));
 assert.equal(ledger.runtime.identities,300);assert.equal(ledger.runtime.levels,15);
 const b106=ledger.merged_morphology_batches.find(x=>x.batch==='nj106');
 assert.ok(b106);assert.deepEqual(Array.from(b106.identity_ids),ids);
 const done=new Set(ledger.merged_morphology_batches.filter(x=>/^nj(98|99|100|101|102|103|104|105)$/.test(x.batch)).flatMap(b=>b.identity_ids));
 for(const id of ids){
  assert.equal(roster.filter(row=>row[0]===id&&row[2]!=='Fauna').length,1,id);
  assert.equal(done.has(id),false,'premature duplicate '+id);
  assert.ok(win.NUSAJIWA_SCULPT106_META[id]?.source.startsWith('https://'));
 }
});
test('All 40 stages have distinguishable geometry and mask older parts',()=>{
 let n=0;
 for(const id of ids){
  const signatures=new Set();
  for(let s=0;s<8;s++){
   const {ok,rig,group,body,native,prior}=make(id,s);
   assert.equal(ok,true,id+'/'+s);
   assert.equal(rig.userData.id,id);assert.equal(rig.userData.phase,s);
   assert.ok(rig.children.length>=(s===0?8:16),'too few parts '+id+'/'+s);
   if(s===0){assert.equal(body.visible,false);assert.equal(group.children[1].visible,false)}
   else {assert.equal(native.visible,false);assert.equal(prior.visible,false)}
   const sig=rig.children.map(x=>x.name.replace(id+'-F'+s+'-','')).sort().join('|');
   assert.ok(!signatures.has(sig),'topology identical '+id+'/'+s);
   signatures.add(sig);
   for(const o of rig.children){
    if(o.points)assert.ok(o.points.flat().every(Number.isFinite),'spline coordinate finite');
    if(o.geometry?.attribute)assert.ok(o.geometry.attribute.array.every(Number.isFinite),'loft finite');
   }
   n++;
  }
  assert.equal(signatures.size,8);
 }
 assert.equal(n,40);
});
test('Folktale-specific body shapes and symbolic props are physically present in adult rig',()=>{
 const anchors={
  jaka_tarub:['Javanese-village-farmer-wrap-torso','Jaka-Tarub-wooden-field-hoe-handle','hidden-pink-celestial-selendang-under-rice'],
  nawang_wulan:['celestial-human-woman-oval-human-face','two-pink-celestial-flying-selendang-streamers','one-grain-rice-cooking-clay-pot'],
  timun_mas:['quick-running-young-Javanese-girl-wrap-torso','four-legend-gifts-shrimp-paste','four-legend-gifts-salt','Timun-Mas-striding-shin'],
  keong_mas:['released-Daha-princess-Candra-Kirana-oval-human-face','symbolic-golden-shell-kept-as-relic','Candra-Kirana-small-crown-point'],
  putri_mandalika:['Sasak-Lombok-royal-princess-wrap-torso','symbolic-Lombok-multicolor-nyale-worm','woven-Sasak-songket-dress-stripe']
 };
 for(const [id,parts] of Object.entries(anchors)){
  const n=make(id,5).rig.children.map(x=>x.name).join('|');
  for(const marker of parts)assert.ok(n.includes(marker),id+' missing '+marker);
 }
 const snail=make('keong_mas',2).rig.children.map(x=>x.name).join('|');
 const human=make('keong_mas',5).rig.children.map(x=>x.name).join('|');
 const hybrid=make('keong_mas',4).rig.children.map(x=>x.name).join('|');
 assert.ok(snail.includes('actual-grounded-golden-snail-coiled-shell'));
 assert.ok(!snail.includes('released-Daha-princess'));
 assert.ok(hybrid.includes('half-released-Candra-Kirana'));
 assert.ok(human.includes('released-Daha-princess'));
 assert.ok(!human.includes('actual-grounded-golden-snail-coiled-shell'));
 assert.ok(!make('nawang_wulan',5).rig.children.map(x=>x.name).join('|').includes('eagle-wing'));
});
test('No changes to other characters, engine file presence and Pages/CI assets',()=>{
 const g=new T.Group(),b=new T.Group(),source={visible:true};g.add(b);b.add(source);
 assert.equal(build(g,b,M,'kuyang',5,T,E,L),false);assert.equal(source.visible,true);
 assert.ok(engine.includes('window.NUSAJIWA_SCULPT106?.(group,body,M,r[0],renderPhase,THREE,ell,tube);'));
 assert.ok(html.indexOf('./nj106-folktales-batch9.js')<html.indexOf('./script_32.js'));
 const pages=read('.github/workflows/pages.yml'),quality=read('.github/workflows/tamagotchi-quality.yml');
 assert.ok(pages.includes('node --check nj106-folktales-batch9.js'));
 assert.ok(pages.split('\n').some(l=>l.includes('cp nj98-mistis-batch1.js')&&l.includes('nj106-folktales-batch9.js')&&l.includes('_site/')));
 assert.ok(quality.includes("      - 'nj106-folktales-batch9.js'"));
 assert.ok(quality.includes('node --check nj106-folktales-batch9.js'));
});
