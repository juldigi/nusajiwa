import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const source=read('nj94-fauna.js'),engine=read('script_32.js'),html=read('index.html');
const win={};runInNewContext(source,{window:win});
const ids=Array.from(win.NUSAJIWA_MORPH94_IDS),morph=win.NUSAJIWA_MORPH94;
const T={Group:class{constructor(){this.children=[];this.userData={}}add(x){this.children.push(x)}},
 Mesh:class{constructor(){this.position={set(){},z:0};this.rotation={x:0,y:0,z:0};this.visible=true;this.name=''}},
 MeshStandardMaterial:class{constructor(config){this.config=config}},
 TorusGeometry:class{},ConeGeometry:class{},ShapeGeometry:class{},
 Shape:class{moveTo(){}lineTo(){}closePath(){}}
};
const prim=(g,...args)=>{const mesh=new T.Mesh();mesh.params=args;g.add(mesh);return mesh};
const M={main:{},light:{},dark:{},white:{},gold:{},pink:{},eye:{},black:{},glow:{}};
test('Ten NJ94 fauna are pre-existing and not duplicated in previous 53 curation IDs',()=>{
 assert.deepEqual(ids,['komodo','tiger','cendrawasih','anoa','maleo','bekantan','orangutan','badak_jawa','gajah_sumatra','jalak_bali']);
 const start=engine.indexOf('const CREATURES=['),end=engine.indexOf('\n];',start);
 assert.ok(start>=0&&end>start);
 const records=runInNewContext(engine.slice(start,end+3)+';CREATURES');
 assert.equal(records.length,300);
 const batches=JSON.parse(read('release.json')).merged_morphology_batches;
 assert.equal(batches.filter(z=>z.batch==='nj94').length,1);
 const previous=new Set(batches.filter(z=>z.batch!=='nj94').flatMap(z=>z.identity_ids));
 for(const id of ids){assert.equal(records.filter(r=>r[0]===id).length,1);assert.ok(!previous.has(id),'duplicate curation '+id);}
});
test('All 80 stages have distinct structures and hide generic adult rig only on juvenile phases',()=>{
 let total=0;
 for(const id of ids){
  const designs=new Set();
  for(let stage=0;stage<8;stage++){
   const group=new T.Group(),body=new T.Group(),native={name:'native',visible:true};body.add(native);
   assert.equal(morph(group,body,M,id,stage,T,prim,prim),true);
   const root=(stage===0?group:body).children.at(-1);
   assert.equal(root.userData.identity,id);
   assert.equal(root.userData.stage,stage);
   assert.ok(root.children.length>=3,'insufficient anatomy '+id+'/'+stage);
   assert.equal(native.visible,stage===0||stage>=5,'wrong native visibility '+id+'/'+stage);
   const partSet=root.children.map(x=>x.name).sort().join('|');
   assert.ok(!designs.has(partSet),'repeated same anatomy: '+id+'/'+stage);
   designs.add(partSet);total++;
  }
  assert.equal(designs.size,8);
 }
 assert.equal(total,80);
});
test('Zoological trait audits: rhinoceros one horn, Orangutan tailless, Maleo precocial and Jalak blue',()=>{
 for(const phrase of ['monitor-reptile-body','narrow-feline-black-stripe','developing-courtship-plume',
  'paired-anoa-upright-horn','fully-feathered-precocial-body','newborn-blue-faced-bekantan',
  'tailless-bornean-orangutan-core','single-short-javan-horn',
  'single-flexible-elephant-trunk','brilliant-blue-eye-skin','long-white-lace-crest']){
   assert.ok(source.includes(phrase),'missing species trait '+phrase);
 }
 assert.ok(!source.includes('single-small-muzzle-horn-in-game'),'avoid duplicated native rhino horn');
 assert.ok(source.includes('MeshStandardMaterial({color:0x2096d0'));
});
test('Unlisted IDs unaffected; module loads before engine and is included in Pages bundle',()=>{
 const group=new T.Group(),body=new T.Group(),native={visible:true};body.add(native);
 assert.equal(morph(group,body,M,'not_in_nj94',3,T,prim,prim),false);
 assert.equal(body.children.length,1);assert.equal(native.visible,true);
 assert.ok(engine.includes('window.NUSAJIWA_MORPH94?.(group,body,M,r[0],portraitMode?5:gamePet()?.phase??5,THREE,ell,tube);'));
 assert.ok(html.includes('./nj94-fauna.js'));
 assert.ok(html.indexOf('./nj94-fauna.js')<html.indexOf('./script_32.js'));
 const workflow=read('.github/workflows/pages.yml');
 assert.ok(workflow.includes('node --check nj94-fauna.js'));
 assert.ok(workflow.includes('nj94-fauna.js pages-fixes.js'));
});
