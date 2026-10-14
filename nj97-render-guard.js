/* NUSAJIWA NJ97 — one production-model visibility, diagnostic and framing contract.
   Important: this is a renderer/scene repair, not a claim of 300 hand-sculpted GLB.
   No localStorage mutation; no artist mesh is removed or scaled independently. */
(function(){
'use strict';
if(window.NUSAJIWA_RENDER97)return;
const N=n=>Number.isFinite(n);
const clamp=(x,a,b)=>Math.min(b,Math.max(a,x));
const imageUnits={live:0.83,portrait:0.95,audit:0.83};
function inspect(model,T,stage,identity){
 const out={id:identity,phase:stage,meshTotal:0,meshVisible:0,invalid:0,
  width:0,height:0,depth:0,centerX:0,centerY:1,centerZ:0,
  hasGeometry:false,renderer:'source-production',mutatedSave:false};
 if(!model||!T?.Box3||!T?.Vector3)return out;
 model.updateMatrixWorld?.(true);
 const volume=new T.Box3();volume.makeEmpty();
 model.traverse(obj=>{
  if(!obj.isMesh)return;
  out.meshTotal++;
  for(let p=obj;p;p=p.parent)if(p.visible===false)return;
  const geo=obj.geometry;
  if(!geo||!obj.matrixWorld){out.invalid++;return}
  if(!geo.boundingBox)geo.computeBoundingBox?.();
  const rect=geo.boundingBox;
  if(!rect){out.invalid++;return}
  const b=rect.clone().applyMatrix4(obj.matrixWorld);
  const vals=[b.min.x,b.min.y,b.min.z,b.max.x,b.max.y,b.max.z];
  if(!vals.every(N)||b.isEmpty()){out.invalid++;return}
  // Do not count the invisible source adult, empty stage shells or CSS overlays.
  out.meshVisible++;volume.union(b);
 });
 if(!volume.isEmpty()){
  const size=new T.Vector3(),center=new T.Vector3();
  volume.getSize(size);volume.getCenter(center);
  out.width=+size.x.toFixed(3);out.height=+size.y.toFixed(3);out.depth=+size.z.toFixed(3);
  out.centerX=+center.x.toFixed(3);out.centerY=+center.y.toFixed(3);out.centerZ=+center.z.toFixed(3);
  out.hasGeometry=out.meshVisible>0;
 }
 out.warnings=[];
 if(!out.hasGeometry)out.warnings.push('Model kosong, terpotong atau semua mesh tersembunyi');
 if(out.invalid)out.warnings.push(out.invalid+' geometri tidak valid');
 if(out.width>9||out.height>9||out.depth>12)out.warnings.push('Dimensi model terlalu besar untuk habitat');
 if(out.width<.13||out.height<.13)out.warnings.push('Model terlalu kecil / geometri nyaris datar');
 if(out.meshVisible>720)out.warnings.push('Detail sangat berat untuk iPhone');
 return out;
}
function framing(bounds,aspect,zoom=1,mode='live'){
 const a=clamp(Number(aspect)||1,.30,2.6);
 const scale=imageUnits[mode]??imageUnits.live;
 const width=clamp(Number(bounds?.width)||1.55,.25,25)*scale;
 const height=clamp(Number(bounds?.height)||2.15,.25,25)*scale;
 const depth=clamp(Number(bounds?.depth)||1.4,.25,25)*scale;
 const tanHalf=Math.tan(37*Math.PI/360);
 // 58% of vertical and 77% of horizontal viewing room; explicit safe margins.
 const vertical=height/(2*tanHalf*.58);
 const horizontal=width/(2*tanHalf*a*.77);
 const distance=clamp(Math.max(4.6,vertical,horizontal,depth*.85),4.6,30)*clamp(zoom,.55,2.7);
 return {distance:+distance.toFixed(3),
  targetX:clamp(Number(bounds?.centerX)||0,-1.0,1.0)*scale,
  targetY:clamp(Number(bounds?.centerY)||1, .25,3.2)*scale,
  targetZ:clamp(Number(bounds?.centerZ)||0,-.9,.9)*scale,
  aspect:a,scale};
}
function prepare(model,T,id,stage){
 const result=inspect(model,T,stage,id);
 if(model?.userData)model.userData.visualMetrics=result;
 return result;
}
window.NUSAJIWA_RENDER97=Object.freeze({version:'97.0',inspect,prepare,framing});
})();