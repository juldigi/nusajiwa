import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const engine=readFileSync(new URL('../script_32.js',import.meta.url),'utf8');
const first=engine.indexOf('function nj88Morph('),end=engine.indexOf('\nfunction makeAvatar(',first);
const source=engine.slice(first,end);
assert.ok(first>0&&end>first,'Batch 8.8 must load before makeAvatar');
const T={Group:class{constructor(){this.children=[];this.userData={}}add(x){this.children.push(x)}},Mesh:class{constructor(){this.position={set(){}};this.rotation={z:0};this.visible=true}},ConeGeometry:class{},TorusGeometry:class{}};
const el=(g,...args)=>{const x={name:'',visible:true,args};g.add(x);return x};
const morph=new Function('THREE','ell','tube',source+';return nj88Morph')(T,el,el);
test('Twenty-four distinctive folklore morphology stages preserve native identities',()=>{
 for(const id of ['pocong','kuntilanak','tuyul']){
  const signatures=[];
  for(let s=0;s<8;s++){
   const group=new T.Group(),body=new T.Group(),original={visible:true};body.add(original);
   morph(group,body,{white:{},dark:{},gold:{},light:{}},id,s);
   const g=(s?body:group).children.at(-1);
   assert.equal(g.userData.identity,id);assert.equal(g.userData.stage,s);
   assert.equal(g.userData.culturalStatus,'invented-game-evolution');
   if(s){assert.equal(original.visible,false);assert.ok(g.children.length>1)}
   signatures.push(g.children.map(x=>x.name).sort().join('|'));
  }
  assert.equal(new Set(signatures).size,8,'Stages must differ beyond scaling for '+id);
 }
});
test('Other creatures are left intact and runtime integration stays active',()=>{
 const body=new T.Group(),group=new T.Group(),original={visible:true};body.add(original);
 morph(group,body,{white:{},dark:{},gold:{},light:{}},'garuda',7);
 assert.equal(original.visible,true);assert.equal(group.children.length,0);
 assert.ok(engine.includes(" nj88Morph(group,body,M,r[0],renderPhase);"));
});
