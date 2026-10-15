/* NUSAJIWA NJ125 · Klasik 32 — actual Three.js WebGL world-space renderer.
 * User-supplied NES reference informed campaign structure. The source ROM,
 * cartridge bytes, Nintendo backgrounds/sprites/music are NOT bundled or
 * uploaded. Original NUSAJIWA world and assets, orthographic 2.5D controls,
 * actual meshes and dynamic 3D camera replace the prior 2D-only scene.
 * The original classic physics/save and 15-stage adventure are unaffected.
 * Gracefully falls back to the older 2D Canvas on no WebGL/no CDN.
 */
(function(){
'use strict';
if(window.NUSAJIWA_CLASSIC3D)return;
const IMPORTS=[
 'https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.module.js',
 'https://unpkg.com/three@0.160.1/build/three.module.js'
];
const clamp=(x,min,max)=>Math.max(min,Math.min(max,x));
const color=(v,alt)=>typeof v==='string'?v:alt;
let THREE=null,renderer=null,scene=null,camera=null,canvas=null,host=null,oldCanvas=null;
let pending=null,active=false,broken=false,stageKey='',geo=[],mats=[],objects=[],decor=[];
let player=null,coins=[],enemies=[],blocks=[],pipes=[],secret=[],platforms=[],boss=null,gate=null;
let worldLabel='',frameCount=0,quality='standard',lastRun=null,lastCanvasWidth=0,lastCanvasHeight=0;
const create=async()=>{
 if(THREE)return THREE;
 for(const url of IMPORTS){
  try{return THREE=await import(url);}catch(e){console.warn('NJ125 Three.js unavailable at '+url,e)}
 }
 throw Error('WebGL/Three.js asset unavailable');
};
const mat=(hex,metal=0,rough=.80,extra={})=>{
 const m=new THREE.MeshStandardMaterial({color:hex,metalness:metal,roughness:rough,...extra});
 mats.push(m);return m;
};
const make=(shape,material,parent=scene)=>{
 geo.push(shape);const mesh=new THREE.Mesh(shape,material);parent.add(mesh);
 mesh.receiveShadow=false;mesh.castShadow=false;objects.push(mesh);return mesh;
};
const box=(material,x,y,z,sx,sy,sz,parent=scene)=>{
 const mesh=make(new THREE.BoxGeometry(sx,sy,sz),material,parent);
 mesh.position.set(x,y,z);return mesh;
};
const ell=(material,x,y,z,sx,sy,sz,parent=scene)=>{
 const mesh=make(new THREE.SphereGeometry(1,12,9),material,parent);
 mesh.scale.set(sx,sy,sz);mesh.position.set(x,y,z);return mesh;
};
const cyl=(material,x,y,z,r1,r2,h,parent=scene,seg=12)=>{
 const mesh=make(new THREE.CylinderGeometry(r1,r2,h,seg),material,parent);
 mesh.position.set(x,y,z);return mesh;
};
const cone=(material,x,y,z,rad,h,parent=scene,seg=9)=>{
 const mesh=make(new THREE.ConeGeometry(rad,h,seg),material,parent);
 mesh.position.set(x,y,z);return mesh;
};
const tube=(material,pts,r,parent=scene)=>{
 const curve=new THREE.CatmullRomCurve3(pts.map(p=>new THREE.Vector3(...p)));
 return make(new THREE.TubeGeometry(curve,Math.max(12,pts.length*5),r,6,false),material,parent);
};
const pair=cb=>{cb(-1);cb(1);};
function clearStage(){
 if(scene){for(const child of scene.children.slice())scene.remove(child);}
 for(const g of geo)g.dispose?.();for(const m of mats)m.dispose?.();
 geo=[];mats=[];objects=[];decor=[];player=null;coins=[];enemies=[];blocks=[];
 pipes=[];secret=[];platforms=[];boss=null;gate=null;stageKey='';
}
function setSize(){
 if(!renderer||!host)return;
 const rect=host.getBoundingClientRect(),w=Math.max(300,rect.width||window.innerWidth),
   h=Math.max(220,rect.height||window.innerHeight);
 if(w!==lastCanvasWidth||h!==lastCanvasHeight){
  renderer.setSize(w,h,false);lastCanvasWidth=w;lastCanvasHeight=h;
 }
 const aspect=w/h;
 const worldHeight=clamp(h/49,8.5,15.0);
 const worldWidth=clamp(w/38,17,32);
 // Orthographic perspective: true 3D geometry but a precise side-view axis.
 camera.left=-worldWidth/2;camera.right=worldWidth/2;
 camera.top=worldHeight/2;camera.bottom=-worldHeight/2;
 camera.updateProjectionMatrix();
 if(canvas){canvas.style.width='100%';canvas.style.height='100%';}
 return {w,h,aspect,worldWidth,worldHeight};
}
async function init(root){
 if(!root||!root.querySelector)return false;
 active=true;host=root.querySelector('.njc-screen');oldCanvas=root.querySelector('#njcCanvas');
 if(!host||!oldCanvas)return false;
 if(renderer&&canvas)return true;
 if(pending)return pending;
 pending=(async()=>{
  try{
   const T=await create();
   if(!active)return false;
   const dest=document.createElement('canvas');
   dest.className='njc-real-three';
   dest.setAttribute('aria-label','NUSAJIWA Klasik 32 Stage · lingkungan 3D');
   dest.style.cssText='position:absolute;inset:0;width:100%;height:100%;z-index:1;pointer-events:none';
   host.insertBefore(dest,oldCanvas.nextSibling);
   canvas=dest;
   renderer=new T.WebGLRenderer({canvas:dest,antialias:false,alpha:false,
    powerPreference:'low-power',preserveDrawingBuffer:false});
   renderer.setPixelRatio(Math.min(1.4,window.devicePixelRatio||1));
   renderer.outputColorSpace=T.SRGBColorSpace;
   renderer.toneMapping=T.ACESFilmicToneMapping;
   renderer.toneMappingExposure=1.45;
   scene=new T.Scene();camera=new T.OrthographicCamera(-12,12,7,-7,.08,180);
   setSize();
   dest.addEventListener('webglcontextlost',e=>{
    e.preventDefault();broken=true;dest.style.display='none';
    oldCanvas.style.visibility='visible';
   });
   oldCanvas.style.visibility='hidden';
   oldCanvas.style.pointerEvents='none';
   return true;
  }catch(e){
   console.warn('NJ125 WebGL fallback to proven 2D mode:',e);
   broken=true;
   oldCanvas.style.visibility='visible';
   canvas?.remove();canvas=null;renderer?.dispose?.();renderer=null;
   return false;
  }finally{pending=null;}
 })();
 return pending;
}
function reset(){
 if(!scene)return;
 clearStage();scene.background=new THREE.Color('#c1d6cc');
}
function stageColors(level){
 const biome=level?.nj124?.element||level?.type||'ground';
 const palettes={
 roots:['#a1d8b0','#2b7056','#446b4d','#a1c88f','#ffd48c'],
 forest:['#8dcdbb','#316950','#5b7950','#a3cb8e','#f1d688'],
 canopy:['#b3dbc3','#407b69','#56764f','#bdd69b','#f5d492'],
 swamp:['#82b2a7','#245d53','#475b55','#a3b9a1','#ffe1a2'],
 cave:['#647a85','#263a4b','#53616d','#b8a891','#e4cba0'],
 limestone:['#9db9b4','#4c716d','#859184','#cfbda0','#fff0bd'],
 mangrove:['#7ebcb1','#2e736c','#67816e','#c2b59e','#ffe5a5'],
 coast:['#8fd6df','#327fa9','#bdad86','#d7c898','#f8e6ac'],
 reef:['#3f9daf','#23698c','#488a83','#b0dcd0','#ffdc9c'],
 cliff:['#a7cad6','#5d8192','#797c7d','#b5ad9b','#f8d6a7'],
 cloud:['#c4dbe1','#6f8ba0','#9295a1','#efe8cf','#fff2c2'],
 wind:['#9bc7d1','#5f8892','#777c89','#d1d1b6','#eee7b4'],
 volcano:['#b9a7aa','#835457','#74585d','#ce8863','#ffbe84'],
 lava:['#986971','#743b3f','#746061','#bb967a','#ffb66c'],
 savanna:['#e4cda1','#bb9971','#927f5b','#d0b475','#fff0bb'],
 sands:['#e7d3a1','#bfac80','#9c8562','#dcc18c','#f7e5a9'],
 temple:['#b1cbb9','#667d7a','#858c80','#cbb690','#f6d2a0'],
 stone:['#98b3b3','#586d7a','#777e7b','#b7ae9b','#efd6b5'],
 stairs:['#a4c5b8','#6a8573','#8a8d83','#a7c49d','#f7d9a1'],
 bridge:['#aac9b7','#55766c','#9b846c','#c2ad84','#e9c893'],
 boss:['#7c91a2','#3e5367','#78808a','#bfa47b','#f1c58c'],
 highland:['#b3cede','#748a9c','#737b86','#c0b99d','#f6e0b2'],
 ground:['#a1d2c4','#537c6a','#688574','#b8cb9f','#f5ddb0'],
 water:['#55a2b8','#347b95','#558c87','#a4d3bf','#e2e4bb']
 };
 const c=palettes[biome]||palettes[level.type]||palettes.ground;
 return {biome,sky:c[0],far:c[1],soil:c[2],top:c[3],accent:c[4]};
}
function environment(level){
 const c=stageColors(level),T=THREE;
 scene.background=new T.Color(c.sky);
 scene.fog=new T.Fog(c.sky,23,70);
 scene.add(new T.HemisphereLight(0xf2f9ee,0x38504f,2.4));
 const sun=new T.DirectionalLight(0xffdfb4,2.5);
 sun.position.set(-4,13,10);scene.add(sun);
 const soil=mat(c.soil),grass=mat(c.top),rock=mat(c.far),
   white=mat(0xf1eee1),gold=mat(c.accent,.13,.46),
   leaf=mat(0x357d65),dark=mat(0x293f43),blue=mat(0x3c9ab0,.12,.28,
    {transparent:true,opacity:.78});
 // Side-view bottom level segments; actual depth and exposed side walls.
 const holes=level.gaps||[];
 for(let x=0;x<level.length;x+=1.2){
  if(holes.some(([a,b])=>x+.6>a-.1&&x+.6<b+.1))continue;
  box(soil,x+.60,-1.50,0,1.21,2.96,3.45);
  box(grass,x+.60,-.047,0,1.22,.15,3.50);
  if(Math.floor(x*10)%6===0){
   const stone=box(rock,x+.30,-.22,1.83,.26,.20,.14);
   stone.rotation.z=.12;
  }
 }
 const isCave=['cave','limestone','stone'].includes(c.biome)||level.type==='underground';
 if(isCave){
  for(let x=0;x<level.length;x+=3.8){
   box(rock,x+.8,7.05,-.12,3.8,1.3,4.4);
   if(x%7.6<3.8)cone(rock,x,5.98,-.4,.36,.75);
  }
 }
 // World-space mountains: not an image plane, produces real parallax with 3D depth.
 for(let i=0;i<Math.ceil(level.length/11)+4;i++){
  const x=i*11-10,hill=2.6+(i%4)*.60;
  cone(rock,x,hill*.43,-12,1.65+(i%3)*.53,hill*2.4,scene,10);
  if(i%3===0)ell(white,x+1.4,7.5+(i%3)*.4,-15,1.1,.29,.43);
 }
 const decoLimit=Math.min(100,Math.floor(level.length/2.4));
 for(let i=0;i<decoLimit;i++){
  const x=2.2+i*2.4,y=0,z=-3.4-(i%3)*.65;
  if(['coast','reef','water','mangrove','swamp'].includes(c.biome)){
   cyl(rock,x,.35,z,.22,.40,.78);
   if(i%2===0)tube(blue,[[x,.45,z],[x-.19,.73,z],[x+.17,1.22,z]],.055);
  }else if(['boss','temple','stone','stairs','cave','limestone'].includes(c.biome)){
   if(i%3!==0)continue;
   box(rock,x,1.25,z,.46,2.50,.47);
   box(gold,x,2.52,z,.81,.13,.65);
   box(rock,x,.13,z,.90,.25,.80);
  }else if(['lava','savanna','sands','volcano'].includes(c.biome)){
   cone(rock,x,.72,z,.44,1.44);
   if(i%3===0)ell(gold,x,.31,z,.33,.11,.31);
  }else{
   cyl(rock,x,1.05,z,.16,.23,2.05);
   cone(leaf,x,2.34,z,.72,1.25);
   if(i%3===0)cone(grass,x+.23,2.48,z-.30,.56,1.10);
  }
 }
 // Water is a real transparent mesh, not only a flat cyan 2D fill.
 if(level.type==='water'||['reef','coast','swamp'].includes(c.biome)){
  const surface=box(blue,level.length/2,.58,1.85,level.length,1.13,3.5);
  surface.userData.isWater=true;decor.push(surface);
 }
 return {c,soil,grass,rock,white,gold,leaf,dark,blue};
}
function makeHero(pet,materials){
 // NJ126: Reuse the real, already-sculpted and evolved 3D creature from NJ35.
 // Only the currently adopted pet is cloned. The habitat original is NEVER moved.
 // If the habitat has not loaded 3D, the existing safe fallback remains available.
 let original=null;
 try{original=window.NJ35?.getAdventureAvatar?.(pet?.id)||null;}
 catch(e){console.warn('Native pet not yet available in Classic32',e)}
 if(original?.isObject3D){
  const bounds=new THREE.Box3();bounds.makeEmpty();
  original.updateMatrixWorld(true);
  original.traverse(o=>{
   if(!o.isMesh)return;
   for(let p=o;p;p=p.parent){if(p.visible===false)return}
   bounds.expandByObject(o);
  });
  if(!bounds.isEmpty()){
   const size=new THREE.Vector3(),center=new THREE.Vector3();
   bounds.getSize(size);bounds.getCenter(center);
   const miniature=pet?.id==='jenglot';
   const limitHeight=miniature?1.00:1.52,limitWidth=miniature?.62:1.14;
   const fitScale=Math.min(limitHeight/Math.max(.1,size.y),
      limitWidth/Math.max(.1,size.x),2.8);
   const mount=new THREE.Group(),fitted=new THREE.Group();
   scene.add(mount);mount.add(fitted);fitted.add(original);
   fitted.scale.setScalar(fitScale);
   fitted.position.set(-center.x*fitScale,-bounds.min.y*fitScale,
      -center.z*fitScale);
   // NJ35.getAdventureAvatar creates independent geometry/material clones.
   // Register them in NJ125 cleanup arrays to avoid GPU memory leaks.
   original.traverse(o=>{
    if(o.geometry)geo.push(o.geometry);
    if(o.material)for(const m of Array.isArray(o.material)?o.material:[o.material])mats.push(m);
   });
   const shade=make(new THREE.CircleGeometry(.4,20),
    mat(0x213434,0,1,{transparent:true,opacity:.23}),mount);
   shade.rotation.x=-Math.PI/2;shade.position.set(0,.010,.24);
   shade.userData.heroShadow=true;
   mount.userData={kind:'NUSAJIWA-original',nativeAvatar:true,
    species:pet.id,shadow:shade,phase:pet.stage??pet.phase??null};
   return mount;
  }
 }
 const g=new THREE.Group();scene.add(g);
 const kind=pet?.type||'forest';
 const coat=kind==='bird'?mat(0xceac6c):kind==='spirit'?mat(0xcbdcd1):
   kind==='tiger'?mat(0xc88e5c):mat(0x62a984);
 const face=mat(0xf5dcaa),ink=mat(0x132f33);
 if(kind==='bird'){
  ell(coat,0,.73,0,.29,.42,.31,g);
  ell(face,0,1.25,.15,.28,.28,.26,g);
  cone(materials.gold,0,1.18,.44,.13,.30,g).rotation.x=Math.PI/2;
  pair(d=>{
   const wing=ell(coat,d*.35,.89,-.10,.29,.10,.43,g);
   wing.rotation.z=-d*.34;
   cyl(ink,d*.17,.22,0,.083,.09,.30,g);
  });
 }else if(kind==='spirit'){
  ell(coat,0,.80,0,.31,.49,.27,g);
  ell(face,0,1.33,.08,.25,.32,.22,g);
  pair(d=>{
   ell(materials.white,d*.25,.57,.05,.10,.28,.09,g);
   ell(ink,d*.105,1.39,.29,.041,.043,.023,g);
  });
 }else if(kind==='tiger'){
  ell(coat,0,.69,0,.40,.33,.27,g);
  ell(coat,0,1.26,.18,.34,.28,.29,g);
  pair(d=>{
   ell(ink,d*.21,1.50,.13,.11,.11,.10,g);
   ell(ink,d*.15,1.29,.45,.041,.041,.023,g);
   ell(face,d*.27,.24,.13,.11,.24,.12,g);
  });
  for(let i=-1;i<=1;i++)tube(ink,[[i*.18,1.41,.38],[i*.27,1.19,.37]],.029,g);
 }else{
  ell(coat,0,.71,0,.29,.39,.24,g);
  ell(face,0,1.28,.14,.31,.26,.25,g);
  pair(d=>{
   ell(coat,d*.29,.55,.02,.12,.24,.10,g);
   ell(coat,d*.14,.22,.08,.11,.20,.12,g);
   ell(ink,d*.14,1.31,.37,.052,.052,.026,g);
  });
 }
 const shadow=make(new THREE.CircleGeometry(.40,20),mat(0x213434,0,1,
  {transparent:true,opacity:.27}),g);
 shadow.rotation.x=-Math.PI/2;shadow.position.set(0,.010,.30);
 shadow.userData.heroShadow=true;g.userData.shadow=shadow;
 g.userData.kind=kind;
 return g;
}
function build(level,pet){
 if(!THREE||!renderer)return false;
 reset();
 stageKey=level.index+':'+(pet?.id||'default');
 const m=environment(level);
 const plant=mat(0x467960),enemy=mat(0xa96654),shell=mat(0x5e917c),
  aqua=mat(0xe49c66),violet=mat(0xa98fc0),ink=mat(0x223a42),
  glass=mat(0xc4e4c4,.10,.32);
 for(const p of level.platforms){
  const group=new THREE.Group();scene.add(group);
  box(m.rock,0,-.05,0,p.w,.24,2.2,group);
  box(m.gold,0,.075,0,p.w,.11,2.24,group);
  platforms.push({p,group});
 }
 for(const t of level.pipes){
  const g=new THREE.Group();scene.add(g);
  const material=t.secret?violet:plant;
  cyl(material,0,t.h/2,0,.57,.57,t.h,g);
  cyl(t.secret?m.gold:glass,0,t.h+.075,0,.72,.72,.20,g);
  cyl(ink,0,t.h+.17,0,.49,.49,.02,g);
  box(m.dark,0,t.h/2,.56,.23,t.h,.08,g);
  g.position.set(t.x,0,.02);pipes.push({ref:t,group:g});
 }
 for(const b of level.blocks){
  const g=new THREE.Group();scene.add(g);
  const cube=box(b.kind==='stone'?m.rock:b.kind==='power'?m.gold:plant,0,0,0,.91,.82,1.10,g);
  const seal=box(b.kind==='stone'?m.dark:m.white,0,.0,.58,.24,.20,.045,g);
  seal.rotation.z=Math.PI/4;
  g.position.set(b.x,b.y+.28,0);
  blocks.push({ref:b,group:g,cube});
 }
 for(const c of level.coins){
  const g=new THREE.Group();scene.add(g);
  const ring=make(new THREE.TorusGeometry(.22,.075,8,18),m.gold,g);
  ring.position.z=.15;
  g.position.set(c.x,c.y,0);coins.push({ref:c,group:g,ring});
 }
 for(const z of level.secret){
  const o=new THREE.Group();scene.add(o);
  const ball=ell(m.gold,0,.08,0,.15,.20,.15,o);
  const out=make(new THREE.TorusGeometry(.30,.035,7,24),m.white,o);
  out.rotation.x=.15;
  o.position.set(z.x,z.y,-.14);secret.push({ref:z,group:o,out});
 }
 for(const e of level.enemies){
  const g=new THREE.Group();scene.add(g);
  const material=e.type==='fish'?aqua:e.type==='jelly'?violet:
   e.type==='shelled'?shell:enemy;
  ell(material,0,.38,0,.34,.37,.29,g);
  if(e.type==='fish'){cone(material,-.39,.40,0,.25,.41,g).rotation.z=Math.PI/2;}
  if(e.type==='jelly')pair(d=>tube(violet,[[d*.20,.20,0],[d*.19,-.17,0]],.04,g));
  if(e.type==='shelled')ell(shell,0,.58,-.10,.29,.26,.28,g);
  pair(d=>{ell(m.white,d*.15,.47,.26,.058,.07,.032,g);
    ell(ink,d*.15,.48,.29,.031,.044,.016,g)});
  g.position.set(e.x,0,.04);enemies.push({ref:e,group:g});
 }
 if(level.boss){
  const g=new THREE.Group();scene.add(g);
  const torso=ell(m.rock,0,1.08,0,.69,.85,.55,g);
  pair(d=>ell(m.gold,d*.28,1.32,.45,.105,.12,.07,g));
  const head=cone(m.gold,0,2.05,0,.25,.61,g);
  g.position.set(level.boss.x,0,0);boss={ref:level.boss,group:g,torso,head};
 }
 gate=new THREE.Group();scene.add(gate);
 box(m.rock,0,1.7,0,.35,3.4,.55,gate);
 box(m.gold,.26,3.14,0,.77,.24,.55,gate);
 ell(m.gold,.27,2.83,.29,.20,.23,.07,gate);
 gate.position.set(level.length-2,0,0);
 player=makeHero(pet,m);
 worldLabel=level.region+' / '+level.name;
 lastRun=null;setSize();return true;
}
function frame(level,status,pet){
 if(!active||broken||!THREE||!renderer||!scene||!level||!status)return false;
 const id=level.index+':'+(pet?.id||'default');
 if(id!==stageKey){
  try{build(level,pet);}catch(e){
   console.warn('NJ125 stage build error; Canvas fallback',e);broken=true;
   if(canvas)canvas.style.display='none';
   if(oldCanvas)oldCanvas.style.visibility='visible';
   return false;
  }
 }
 setSize();
 const t=Number(status.elapsed)||0,px=Number(status.x)||0,py=Number(status.y)||0;
 player.position.set(px,py,.13);
 player.rotation.y=status.facing<0?Math.PI*.52:-Math.PI*.52;
 // Animated actual 3D anatomical rig; bounce reflects source collision state.
 player.rotation.z=status.grounded?Math.sin(t*11)*Math.min(.065,Math.abs(status.vx||0)*.014):
  clamp(-(status.vy||0)*.013,-.16,.16);
 if(player.userData.shadow)player.userData.shadow.position.set(0,.015-py,0);
 player.visible=status.invincible<=0||Math.floor(t*14)%2===0;
 for(const item of coins){
  item.group.visible=!item.ref.got;
  item.ring.rotation.y=t*2.4+item.ref.x*.13;
  item.group.position.y=item.ref.y+Math.sin(t*2+item.ref.x*.20)*.055;
 }
 for(const item of enemies){
  item.group.visible=!!item.ref.alive;
  item.group.position.x=item.ref.x;
  item.group.position.y=item.ref.y;
  item.group.rotation.z=item.ref.type==='fish'?.09*Math.sin(t*3):.035*Math.sin(t*4);
 }
 for(const x of blocks)x.group.visible=!(x.ref.kind==='hidden'&&!x.ref.reveal)&&
  !(x.ref.used&&x.ref.kind!=='stone');
 for(const x of secret){
  x.group.visible=!x.ref.got&&x.ref.type!=='life';
  x.out.rotation.y=t*1.5;
 }
 for(const x of platforms){
  x.group.position.set(x.p.x+(x.p.kind==='suspended'?Math.sin(t*1.3+x.p.x):0),
   x.p.y+(x.p.kind==='sway'?Math.sin(t*1.2+x.p.x)*.45:0),-.03);
 }
 if(boss){boss.group.visible=boss.ref.hp>0;boss.group.rotation.y=Math.sin(t*.8)*.12;}
 const worldWidth=(camera.right-camera.left),posX=clamp(status.cameraX+worldWidth/2,
   worldWidth/2-1,Math.max(worldWidth/2,level.length-worldWidth/2));
 // Stable fixed side camera at slight depth angle gives genuine volumetric scenery.
 const targetY=(level.type==='water'?2.4:2.6)+clamp(py*.11,0,1);
 const posY=targetY+2.25;
 camera.position.set(posX,posY,19);
 camera.lookAt(posX,targetY,0);
 camera.updateProjectionMatrix();
 try{renderer.render(scene,camera);}catch(e){
  console.warn('NJ125 draw context failed; use Canvas fallback',e);
  broken=true;if(oldCanvas)oldCanvas.style.visibility='visible';
  if(canvas)canvas.style.display='none';return false;
 }
 frameCount++;
 return true;
}
function close(){
 active=false;lastRun=null;broken=false;stageKey='';clearStage();
 renderer?.dispose?.();renderer?.forceContextLoss?.();renderer=null;
 lastCanvasWidth=0;lastCanvasHeight=0;
 canvas?.remove();canvas=null;
 if(oldCanvas){oldCanvas.style.visibility='visible';oldCanvas.style.pointerEvents='';}
 host=null;oldCanvas=null;scene=null;camera=null;pending=null;
}
window.addEventListener('resize',()=>{if(active&&renderer)setSize()},{passive:true});
document.addEventListener('visibilitychange',()=>{if(active&&document.hidden){
  // Classical engine already pauses; stop screen redraw to preserve mobile GPU.
 }});
window.NUSAJIWA_CLASSIC3D=Object.freeze({
 version:'NJ125.0',init,build,frame,close,isReady:()=>!!(renderer&&THREE&&!broken),
 diagnostic:()=>({active,ready:!!renderer,broken,stageKey,worldLabel,
  renderedFrames:frameCount,meshes:objects.length,mode:renderer?'three-webgl':'2d-fallback',
  cartridgeBundled:false,saveSchemaChanged:false,quality})
});
})();
