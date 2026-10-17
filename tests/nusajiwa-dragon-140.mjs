import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
class Group{
 constructor(){this.children=[];this.visible=true;this.userData={};this.name='';}
 add(x){this.children.push(x);x.parent=this;}
}
class Mesh{
 constructor(geometry,material){this.geometry=geometry;this.material=material;this.visible=true;this.name='';this.position={set(){}};this.rotation={set(){},x:0,y:0,z:0};}
}
class ConeGeometry{constructor(radius,height,segments){this.radius=radius;this.height=height;this.segments=segments;}}
class TGroup extends Group{}
const T={Group:TGroup,Mesh,ConeGeometry};
const material={main:{},light:{},dark:{},white:{},gold:{},eye:{}};
const ell=(parent,x,y,z,sx,sy,sz,m)=>{const o=new Mesh({kind:'ell',coords:[x,y,z,sx,sy,sz]},m);parent.add(o);return o;};
const tube=(parent,points,r,m)=>{const o=new Mesh({kind:'tube',points,r},m);parent.add(o);return o;};
const window={NUSAJIWA_SCULPT100:(...args)=>{window.priorCalls++;return false;},priorCalls:0};
runInNewContext(read('nj140-dragon-morphology.js'),{window});
const ids=['naga_basuki','naga_antaboga','ular_naga'];
function build(id,phase){
 const group=new Group(),body=new Group(),old=new Mesh({},{}),overlay=new Mesh({},{});
 group.add(body);body.add(old);body.add(overlay);
 const ok=window.NUSAJIWA_SCULPT100(group,body,material,id,phase,T,ell,tube);
 const host=phase===0?group:body;
 return {ok,group,body,host,old,overlay,root:host.children.at(-1)};
}
test('NJ140 replaces only the three targeted dragon identities and delegates everything else',()=>{
 for(const id of ids)assert.equal(build(id,5).ok,true,id);
 assert.equal(window.NUSAJIWA_SCULPT100(new Group(),new Group(),material,'garuda',5,T,ell,tube),false);
 assert.equal(window.priorCalls,1);
 assert.deepEqual(Object.keys(window.NUSAJIWA_DRAGON140_META).sort(),ids.slice().sort());
});
test('Every dragon has eight distinct, finite morphology phases and suppresses the old rig',()=>{
 for(const id of ids){
  const signatures=new Set();
  for(let phase=0;phase<8;phase++){
   const x=build(id,phase);
   assert.equal(x.ok,true);
   assert.equal(x.root.name,'NJ140_'+id+'_F'+phase);
   assert.equal(x.root.userData.phase,phase);
   assert.equal(x.root.userData.anatomy,phase===0?'egg':'serpent');
   if(phase===0)assert.equal(x.body.visible,false);
   else {assert.equal(x.old.visible,false);assert.equal(x.overlay.visible,false);}
   const names=x.root.children.map(o=>o.name).sort();
   assert.ok(names.length>=12,id+'/'+phase+' should have detailed anatomy');
   signatures.add(names.join('|'));
   for(const o of x.root.children){
    const coords=o.geometry?.coords||o.points?.flat()||[];
    assert.ok(coords.every(Number.isFinite),id+'/'+phase+' contains non-finite coordinates');
   }
   if(phase>=1){
    assert.ok(names.some(n=>n.includes('continuous-tapered-serpent-trunk')));
    assert.ok(names.some(n=>n.includes('individual-overlapping-ventral-scute')));
    assert.ok(names.some(n=>n.includes('vertical-reptile-pupil')));
   }
  }
  assert.equal(signatures.size,8,id+' must visibly progress through distinct stages');
 }
});
test('Tradition-specific features are distinct; none uses a Western winged-dragon rig',()=>{
 const basuki=build('naga_basuki',7).root.children.map(x=>x.name).join('|');
 const ananta=build('naga_antaboga',7).root.children.map(x=>x.name).join('|');
 const taksaka=build('ular_naga',7).root.children.map(x=>x.name).join('|');
 assert.ok(basuki.includes('flowing-water-crest-spine'));
 assert.ok(!basuki.includes('royal-hood-ridge'));
 assert.ok(ananta.includes('royal-hood-ridge')&&ananta.includes('swept-royal-horn'));
 assert.ok(taksaka.includes('swept-taksaka-mane-spine')&&taksaka.includes('paired-temple-fin'));
 for(const name of [basuki,ananta,taksaka])assert.ok(!name.includes('dragon-wing'));
});
test('HTML loads the override after NJ100 and before the shared pet engine',()=>{
 const html=read('index.html');
 const i100=html.indexOf('nj100-myth-batch3.js');
 const i140=html.indexOf('nj140-dragon-morphology.js');
 const engine=html.indexOf('script_32.js');
 assert.ok(i100>=0&&i140>i100&&engine>i140);
 const workflow=read('.github/workflows/tamagotchi-quality.yml');
 assert.ok(workflow.includes("tests/*.mjs"));
});
