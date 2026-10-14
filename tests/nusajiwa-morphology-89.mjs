import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const source=read('nj89-ten.js'),engine=read('script_32.js'),html=read('index.html');
const context={window:{}};runInNewContext(source,context);
const ids=Array.from(context.window.NUSAJIWA_MORPH89_IDS),morph=context.window.NUSAJIWA_MORPH89;
const T={Group:class{constructor(){this.children=[];this.userData={};this.scale={setScalar(){}}}add(x){this.children.push(x)}},
 Mesh:class{constructor(){this.position={set(){},z:0};this.rotation={x:0,z:0};this.scale={setScalar(){}};this.visible=true;this.name=''}},
 TorusGeometry:class{},ConeGeometry:class{},ShapeGeometry:class{},CylinderGeometry:class{},
 Shape:class{moveTo(){}lineTo(){}closePath(){}}
};
const fake=(g,...params)=>{const o=new T.Mesh();o.params=params;g.add(o);return o};
const M={main:{},dark:{},light:{},white:{},gold:{},black:{},pink:{},eye:{},glow:{}};
test('Batch contains exactly ten valid unique names from the 300-identity catalogue',()=>{
 assert.equal(ids.length,10);assert.equal(new Set(ids).size,10);
 const start=engine.indexOf('const CREATURES=['),end=engine.indexOf('\n];',start);
 assert.ok(start>=0&&end>start);
 const rows=runInNewContext(engine.slice(start,end+3)+';CREATURES');
 assert.equal(rows.length,300);for(const id of ids)assert.equal(rows.filter(x=>x[0]===id).length,1);
});
test('Eighty unique anatomy constructions, four replacements per identity and mature rigs preserved',()=>{
 const all=new Set();
 for(const id of ids){
  const one=new Set();
  for(let stage=0;stage<8;stage++){
   const group=new T.Group(),body=new T.Group(),base={name:'native',visible:true};body.add(base);
   assert.equal(morph(group,body,M,id,stage,T,fake,fake),true);
   const node=(stage===0?group:body).children.at(-1);
   assert.equal(node.userData.stage,stage);assert.equal(node.userData.identity,id);
   assert.equal(node.userData.interpretation,'fictional-evolution');
   assert.ok(node.children.length>=2,'Detailed silhouette needed: '+id+'/'+stage);
   if(stage>0&&stage<=4)assert.equal(base.visible,false,'Must replace generic adult: '+id+'/'+stage);
   if(stage>=5)assert.equal(base.visible,true,'Keep native sculptor: '+id+'/'+stage);
   const signature=node.children.map(z=>z.name.replace(id+'-'+stage+'-','')).sort().join('|');
   assert.ok(!one.has(signature),id+' stages have identical anatomy after removing phase labels');one.add(signature);
   const unique=id+'/'+signature;assert.ok(!all.has(unique));all.add(unique);
  }
  assert.equal(one.size,8);
 }
 assert.equal(all.size,80);
});
test('Unrelated species remain unchanged; browser and Pages load the module in correct order',()=>{
 const group=new T.Group(),body=new T.Group(),base={visible:true};body.add(base);
 assert.equal(morph(group,body,M,'garuda',5,T,fake,fake),false);
 assert.equal(base.visible,true);assert.equal(body.children.length,1);
 assert.ok(engine.includes('window.NUSAJIWA_MORPH89?.(group,body,M,r[0],portraitMode?5:gamePet()?.phase??5,THREE,ell,tube);'));
 assert.ok(html.indexOf('./nj89-ten.js')>0&&html.indexOf('./nj89-ten.js')<html.indexOf('./script_32.js'));
 const pages=read('.github/workflows/pages.yml');
 assert.ok(pages.includes('cp index.html atlas-evolusi.html script_*.js nj89-ten.js'));
});

test('Jenglot keeps native miniature body size; the phase overlay is not doubly scaled',()=>{
 assert.match(engine,/function nj610Jenglot\\(g,M\\)\\{[\\s\\S]*?g\\.scale\\.setScalar\\(\\.52\\)/);
 const jenglot=source.slice(source.indexOf("case 'jenglot':"),source.indexOf("case 'begu_ganjang':"));
 assert.doesNotMatch(jenglot,/root\\.scale\\.setScalar\\(\\.52\\)/);
});
test('Phase anatomy is not simply inherited primitive sizes',()=>{
 const specials=['second-scalloped-membrane','crawling-heavy-palm','specimen-hair',
  'broad-giant-brow-ridge','human-like-hybrid-upper-arm','early-royal-neck-frill'];
 for(const marker of specials)assert.ok(source.includes(marker),'Missing distinct phase-specific part: '+marker);
});
