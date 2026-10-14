import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const source=read('nj96-fauna.js'),engine=read('script_32.js'),html=read('index.html');
const window={};
runInNewContext(source,{window});
const ids=Array.from(window.NUSAJIWA_MORPH96_IDS),morph=window.NUSAJIWA_MORPH96;
const T={
 Group:class{constructor(){this.children=[];this.userData={};this.visible=true;}add(o){this.children.push(o);}},
 Mesh:class{constructor(){this.position={set(){},z:0};this.rotation={x:0,y:0,z:0};this.visible=true;this.name='';}},
 ConeGeometry:class{}
};
const prim=(g,...args)=>{const o=new T.Mesh();o.params=args;g.add(o);return o};
const M={main:{},dark:{},light:{},white:{},gold:{},pink:{},black:{}};
const roster=(()=>{
 const st=engine.indexOf('const CREATURES=['),en=engine.indexOf('\n];',st);
 assert.ok(st>0&&en>st,'missing static 300-creature catalogue');
 return runInNewContext(engine.slice(st,en+3)+';CREATURES');
})();
test('NJ96 ten distinct existing identities, no added species, no batch overlaps',()=>{
 assert.equal(roster.length,300);
 assert.equal(new Set(roster.map(x=>x[0])).size,300);
 assert.equal(ids.length,10);
 assert.equal(new Set(ids).size,10);
 const ledger=JSON.parse(read('release.json'));
 const previous=new Set(ledger.merged_morphology_batches.filter(x=>x.batch!=='nj96').flatMap(x=>x.identity_ids));
 for(const id of ids){assert.equal(roster.filter(x=>x[0]===id&&x[2]==='Fauna').length,1,id);
  assert.ok(!previous.has(id),'duplicate sculpt batch: '+id);
  assert.ok(/^https:\/\//.test(window.NUSAJIWA_MORPH96_SOURCES[id]),'missing zoological source '+id);
 }
 assert.equal(ledger.merged_morphology_batches.filter(x=>x.batch==='nj96').length,1);
 assert.equal(ledger.runtime.identities,300);
});
test('All 80 stages have identifiable morphology and proper adult preservation',()=>{
 let count=0;
 for(const id of ids){
  const signatures=new Set();
  for(let p=0;p<8;p++){
   const group=new T.Group(),body=new T.Group(),native={name:'native-adult',visible:true};
   body.add(native);
   assert.equal(morph(group,body,M,id,p,T,prim,prim),true);
   const root=(p===0?group:body).children.at(-1);
   assert.equal(root.userData.identity,id);assert.equal(root.userData.stage,p);
   assert.ok(root.children.length>=(p>=5?2:4),'insufficient model anatomy '+id+'/'+p);
   assert.equal(native.visible,p===0||p>=5,'native incorrectly masked '+id+'/'+p);
   assert.equal(root.userData.nativeAdultPreserved,p>=5);
   const signature=root.children.map(o=>o.name).sort().join('|');
   assert.ok(!signatures.has(signature),'duplicate stage geometry '+id+'/'+p);
   signatures.add(signature);count++;
  }
  assert.equal(signatures.size,8);
 }
 assert.equal(count,80);
});
test('Species landmarks are distinct and avoid common identity mistakes',()=>{
 const expected={
  elang_jawa:'vertical-javan-eagle-crest',
  rusa_bawean:'fawn-white-back-spot',
  tarsius:'tarsier-enormous-fixed-eyeball',
  babirusa:'male-upper-canine-through-snout',
  rangkong_badak:'upturned-rhino-hornbill-casque',
  kasuari:'cassowary-two-wattles',
  penyu_hijau:'green-turtle-elongated-front-flipper',
  duyung:'dugong-horizontal-fluke',
  arwana:'arowana-two-mandibular-barbels',
  kakatua_raja:'palm-cockatoo-red-bare-cheek'
 };
 for(const [id,needle] of Object.entries(expected)){
  assert.ok(source.includes(needle),'missing '+id+': '+needle);
 }
 assert.ok(!source.includes('dugong-vertical-tail'),'dugong must not have fish tail');
 assert.ok(!source.includes('dugong-dorsal-fin'),'dugong must lack dorsal fin');
 assert.ok(source.includes('eggs for mammals')===false || source.includes('fantasy game stages'));
});
test('Unlisted ID unaffected and full production bridge/deploy includes NJ96',()=>{
 const g=new T.Group(),b=new T.Group(),native={visible:true};b.add(native);
 assert.equal(morph(g,b,M,'unknown-nj96',2,T,prim,prim),false);
 assert.equal(b.children.length,1);assert.equal(native.visible,true);
 assert.ok(engine.includes('window.NUSAJIWA_MORPH96?.(group,body,M,r[0],renderPhase,THREE,ell,tube);'));
 assert.ok(html.includes('./nj96-fauna.js'));
 assert.ok(html.indexOf('./nj96-fauna.js')<html.indexOf('./script_32.js'));
 for(const name of ['.github/workflows/pages.yml','.github/workflows/tamagotchi-quality.yml']){
  assert.ok(read(name).includes('node --check nj96-fauna.js'),name);
 }
 assert.ok(read('.github/workflows/pages.yml').includes('nj96-fauna.js nj97-render-guard.js nj95-visual-audit.js nj642-living.js pages-fixes.js'));
});