import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const window={};
runInNewContext(read('nj97-render-guard.js'),{window,Math,Number,Object});
const guard=window.NUSAJIWA_RENDER97;
const engine=read('script_32.js'),html=read('index.html');
const start=engine.indexOf('const CREATURES=['),end=engine.indexOf('\n];',start);
const catalog=runInNewContext(engine.slice(start,end+3)+';CREATURES');
class Vector3{
 constructor(x=0,y=0,z=0){this.x=x;this.y=y;this.z=z}
}
class Box3{
 constructor(min=new Vector3(Infinity,Infinity,Infinity),max=new Vector3(-Infinity,-Infinity,-Infinity)){this.min=min;this.max=max}
 makeEmpty(){this.min=new Vector3(Infinity,Infinity,Infinity);this.max=new Vector3(-Infinity,-Infinity,-Infinity);return this}
 isEmpty(){return this.min.x>this.max.x||this.min.y>this.max.y||this.min.z>this.max.z}
 clone(){return new Box3(new Vector3(this.min.x,this.min.y,this.min.z),new Vector3(this.max.x,this.max.y,this.max.z))}
 applyMatrix4(){return this} // Identity matrix fixture only: production uses Three.js.
 union(b){for(const k of ['x','y','z']){this.min[k]=Math.min(this.min[k],b.min[k]);this.max[k]=Math.max(this.max[k],b.max[k]);}return this}
 getSize(v){for(const k of ['x','y','z'])v[k]=this.max[k]-this.min[k];return v}
 getCenter(v){for(const k of ['x','y','z'])v[k]=(this.max[k]+this.min[k])/2;return v}
}
const T={Vector3,Box3};
const mesh=(name,min,max,visible=true,parent=null)=>({isMesh:true,name,visible,parent,matrixWorld:{},
 geometry:{boundingBox:new Box3(new Vector3(...min),new Vector3(...max))}});
test('Every catalogue identity can use stable device-aware fitting in eight stages',()=>{
 assert.equal(catalog.length,300);assert.equal(new Set(catalog.map(x=>x[0])).size,300);
 let count=0;
 for(const row of catalog)for(let phase=0;phase<8;phase++){
  const w=(.85+(phase%3)*.55),h=.4+phase*.34,depth=.6+phase*.15;
  const m={width:w,height:h,depth,centerX:0,centerY:h/2,centerZ:0};
  for(const [aspect,mode] of [[.44,'live'],[1.5,'live'],[180/136,'portrait']]){
   const f=guard.framing(m,aspect,1,mode);
   assert.ok(Number.isFinite(f.distance)&&f.distance>=4.6&&f.distance<=30,row[0]);
   assert.ok(Number.isFinite(f.targetY));
  }
  count++;
 }
 assert.equal(count,2400);
});
test('Visible bounds discard hidden adult sculpture; avoid false giant egg framing',()=>{
 const root={userData:{},visible:true,updateMatrixWorld(){},traverse(fn){for(const item of [visible,hidden])fn(item)}};
 const visible=mesh('phase-juvenile',[-.55,.2,-.4],[.55,1.8,.35],true,root);
 const hiddenParent={visible:false,parent:root};
 const hidden=mesh('hidden-original-adult',[-18,-9,-9],[18,9,9],true,hiddenParent);
 const result=guard.prepare(root,T,'pocong',2);
 assert.equal(result.meshTotal,2);
 assert.equal(result.meshVisible,1);
 assert.equal(result.invalid,0);
 assert.equal(result.width,1.1);
 assert.equal(result.height,1.6);
 assert.equal(root.userData.visualMetrics.id,'pocong');
 assert.ok(result.warnings.length===0);
});
test('No all-species horns, airborne gems or ring of crystals can hide identity anatomy',()=>{
 const a=engine.indexOf('function decorateStage('),b=engine.indexOf('function rebuildAvatar(',a),part=engine.slice(a,b);
 assert.doesNotMatch(part,/if\(phase===4\).*bud/);
 assert.doesNotMatch(part,/for\(let j=0;j<8;j\+{1}\)/);
 assert.ok(part.includes("r.position.y=.055+k*.028"));
 assert.ok(engine.includes("if(!nj97LegacyFolk||renderPhase<=4)nj77Morph("));
 assert.ok(engine.includes("if(!nj97LegacyFolk||renderPhase>=5)window.NUSAJIWA_MORPH40?.("));
});
test('Real main view, iPhone and portraits use the same production-model metrics',()=>{
 assert.ok(engine.includes('window.NUSAJIWA_RENDER97?.prepare(group,THREE,r[0],renderPhase)'));
 assert.ok(engine.includes('window.NUSAJIWA_RENDER97?.framing(observed?.userData.visualMetrics,ratio,zoom'));
 assert.ok(engine.includes('window.NUSAJIWA_RENDER97?.framing(g.userData.visualMetrics,180/136,1'));
 assert.ok(html.includes('./nj97-render-guard.js'));
 assert.ok(html.indexOf('./nj97-render-guard.js')<html.indexOf('./script_32.js'));
 assert.ok(read('.github/workflows/pages.yml').includes('nj97-render-guard.js nj95-visual-audit.js'));
 assert.ok(read('.github/workflows/pages.yml').includes('node --check nj97-render-guard.js'));
 assert.ok(read('.github/workflows/tamagotchi-quality.yml').includes('node --check nj97-render-guard.js'));
});
test('All-300 WebGL audit is optional and never writes local storage',()=>{
 const qa=read('nj95-visual-audit.js');
 assert.ok(engine.includes('window.NUSAJIWA_ALL_MODEL_QA='));
 assert.ok(engine.includes('window.NUSAJIWA_FOLKLORE_VISUAL_QA='));
 assert.ok(engine.includes('nj95Preview=makeAvatar(row,false,s)'));
 assert.ok(qa.includes("['folklore','all'].includes(auditMode)"));
 assert.ok(qa.includes('NUSAJIWA_ALL_MODEL_QA'));
 assert.equal(/localStorage\s*\.\s*(setItem|removeItem|clear)\s*\(/.test(qa),false);
});