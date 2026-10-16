/* NJ124 — Local ROM reference player for user's legally obtained NES file.
 * JSNES (Apache-2.0) loads only library code from CDN; ROM stays in browser RAM.
 * No Nintendo ROM, sprite, level map, audio data or cartridge uploaded to Pages.
 * Purpose: precise side-by-side comparison, separate from original NUSAJIWA
 * 32-stage adaptation. The browser's NES emulator runs actual user-supplied bytes.
 */
(function(){
'use strict';
if(window.NUSAJIWA_ROM_REF)return;
const CDN='https://unpkg.com/jsnes@2.1.0/dist/jsnes.min.js';
const ZIPCDN='https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
const BACKUP='https://cdn.jsdelivr.net/npm/jsnes@2.1.0/dist/jsnes.min.js';
let root=null,screen=null,fileControl=null,browser=null,active=false,loading=false,loadedName='';
let returnTarget='classic',displayMode='native',held=new Map(),projection=null,projToken=0;
const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function status(message){
 const output=root?.querySelector('#njrStatus');
 if(output)output.textContent=message;
}
function ensureUI(){
 if(root)return;
 root=document.createElement('section');root.id='njromref';
 root.hidden=true;root.setAttribute('aria-label','ROM NES Lokal · Referensi Gameplay');
 root.innerHTML='<div class="njr-toolbar"><div><strong>NUSAJIWA · ROM REFERENSI</strong>'+
 '<small>Gameplay NES asli dari ROM pribadi · bukan adaptasi</small></div>'+
 '<button data-jr="close" aria-label="Kembali ke NUSAJIWA">✕</button></div>'+
 '<div class="njr-container"><div class="njr-player" id="njrPlayer"></div>'+ 
 '<div class="njr-view-switch"><button type="button" data-jr="native" aria-pressed="true">Asli 2D</button><button type="button" data-jr="3d" aria-pressed="false">Proyeksi 3D · Percobaan</button></div>'+
 '<div class="njr-setup" id="njrSetup"><h2>Jalankan ROM NES pribadi</h2>'+
 '<p>File ROM tidak diunggah ke internet dan tidak menjadi bagian situs NUSAJIWA.'+
 ' Anda dapat memilih file <b>.nes</b> atau ZIP yang berisi ROM .nes.</p>'+
 '<label class="njr-upload">PILIH BERKAS .NES / .ZIP'+
 '<input id="njrFile" type="file" accept=".nes,.zip,application/zip,application/octet-stream"></label>'+
 '<p class="njr-note">Kontrol: ← → ↑ ↓, X = A, Z = B, Enter = START. Di iPhone gunakan tombol layar.</p><p class="njr-note">Proyeksi 3D belum mengubah level atau Mario menjadi mesh 3D; gameplay selalu dijalankan emulator NES asli.</p></div>'+
 '<div id="njrStatus" role="status" aria-live="polite">Belum ada ROM yang dipilih.</div><div class="njr-tools"><button data-jr="pause">Ⅱ Jeda</button><button data-jr="resume">▶ Lanjut</button><button data-jr="reset">↺ Reset</button><button data-jr="eject">Keluarkan ROM</button></div></div>'+
 '<div class="njr-joy"><div>'+
 '<button data-nes="left" aria-label="Kiri">◀</button><button data-nes="right" aria-label="Kanan">▶</button>'+
 '<button data-nes="down" aria-label="Bawah">▼</button><button data-nes="up" aria-label="Atas">▲</button></div>'+
 '<div><button data-nes="select" aria-label="Select" class="njr-select">SELECT</button>'+
 '<button data-nes="start" aria-label="Start" class="njr-start">START</button>'+
 '<button data-nes="b" aria-label="Tombol B" class="njr-b">B</button>'+
 '<button data-nes="a" aria-label="Tombol A" class="njr-a">A</button></div></div>';
 document.body.appendChild(root);screen=root.querySelector('#njrPlayer');fileControl=root.querySelector('#njrFile');
 root.querySelector('[data-jr="close"]').addEventListener('click',close);
 root.querySelector('.njr-tools').addEventListener('click',e=>{
  const action=e.target.closest('[data-jr]')?.dataset.jr;if(!action)return;
  if(action==='pause'){releaseInputs();browser?.stop?.();status('Permainan dijeda.');}
  if(action==='resume'&&browser){browser.start?.();status('Gameplay NES aktif.');}
  if(action==='reset'&&browser){releaseInputs();browser.nes?.reset?.();browser.start?.();status('NES berhasil di-reset.');}
  if(action==='eject')eject();
 });
 root.querySelector('.njr-view-switch').addEventListener('click',e=>{
  const mode=e.target.closest('[data-jr]')?.dataset.jr;if(mode==='native'||mode==='3d')setDisplayMode(mode);
 });
 fileControl.addEventListener('change',async()=>{const file=fileControl.files?.[0];if(file)await loadLocal(file)});
 for(const b of root.querySelectorAll('[data-nes]')){
  const control=b.dataset.nes, btn=()=>window.jsnes?.Controller?.['BUTTON_'+control.toUpperCase()];
  const press=e=>{if(!active||!browser?.nes)return;
   e.preventDefault();try{b.setPointerCapture?.(e.pointerId)}catch(_){}
   const value=btn();if(value===undefined)return;
   const group=held.get(control)||new Set();
   if(!group.size)browser.nes.buttonDown(1,value);
   group.add(e.pointerId);held.set(control,group);
  };
  const lift=e=>{e.preventDefault();const group=held.get(control);
   if(!group)return;group.delete(e.pointerId);
   if(!group.size){held.delete(control);const value=btn();
    if(browser?.nes&&value!==undefined)browser.nes.buttonUp(1,value);}
  };
  b.addEventListener('pointerdown',press);
  for(const ev of ['pointerup','pointercancel','lostpointercapture'])b.addEventListener(ev,lift);
 }
}
function releaseInputs(){
 for(const [control] of held){
  const value=window.jsnes?.Controller?.['BUTTON_'+control.toUpperCase()];
  if(browser?.nes&&value!==undefined)browser.nes.buttonUp(1,value);
 }
 held.clear();
}
function stopProjection(){
 projToken++;
 if(!projection)return;
 const p=projection;projection=null;
 if(p.raf)cancelAnimationFrame(p.raf);
 p.scene?.traverse?.(o=>{o.geometry?.dispose?.();if(o.material){o.material.map?.dispose?.();o.material.dispose?.();}});
 try{p.renderer?.dispose?.();p.renderer?.forceContextLoss?.();}catch(_){}
 p.canvas?.remove?.();screen?.classList.remove('njr-projecting');
}
async function beginProjection(){
 if(!browser?.nes||!screen)return false;
 stopProjection();const token=projToken;
 const source=screen.querySelector('canvas');
 if(!source)return false;
 let THREE=null;
 for(const url of ['https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.module.js',
                   'https://unpkg.com/three@0.160.1/build/three.module.js']){
  try{THREE=await import(url);break;}catch(_){}
 }
 if(!THREE||token!==projToken||!active||!browser)return false;
 try{
  const canvas=document.createElement('canvas');canvas.className='njr-three-canvas';
  screen.appendChild(canvas);
  const renderer=new THREE.WebGLRenderer({canvas,alpha:false,antialias:false,powerPreference:'low-power'});
  renderer.setPixelRatio(Math.min(1.3,window.devicePixelRatio||1));
  const scene=new THREE.Scene();scene.background=new THREE.Color(0x061927);
  const camera=new THREE.PerspectiveCamera(42,256/240,.1,60);
  camera.position.set(0,0,21);camera.lookAt(0,0,0);
  const texture=new THREE.CanvasTexture(source);
  texture.minFilter=THREE.NearestFilter;texture.magFilter=THREE.NearestFilter;
  texture.colorSpace=THREE.SRGBColorSpace;
  const plane=new THREE.Mesh(new THREE.PlaneGeometry(15.2,14.25),
    new THREE.MeshBasicMaterial({map:texture,side:THREE.DoubleSide}));
  plane.rotation.y=-.12;scene.add(plane);
  const frame=new THREE.Mesh(new THREE.BoxGeometry(15.5,14.55,.25),
    new THREE.MeshStandardMaterial({color:0x3a5559,roughness:.7}));
  frame.position.z=-.22;frame.rotation.copy(plane.rotation);scene.add(frame);
  scene.add(new THREE.AmbientLight(0xffffff,2));
  const p={renderer,scene,camera,canvas,source,texture,raf:0};
  projection=p;screen.classList.add('njr-projecting');
  const draw=()=>{
   if(projection!==p||!active)return;
   const w=Math.max(160,screen.clientWidth||256),h=Math.max(140,screen.clientHeight||240);
   if(canvas.width!==w||canvas.height!==h){
    renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();}
   texture.needsUpdate=true;renderer.render(scene,camera);
   p.raf=requestAnimationFrame(draw);
  };
  draw();return true;
 }catch(_){stopProjection();return false;}
}
function setDisplayMode(mode){
 if(mode!=='native'&&mode!=='3d')return false;
 displayMode=mode;
 if(mode==='native'){stopProjection();status('NES asli · mode layar 2D.');}
 else if(!browser){displayMode='native';status('Pilih ROM pribadi terlebih dahulu.');}
 else{beginProjection().then(ok=>{
  if(!ok){displayMode='native';status('WebGL tidak tersedia; gameplay NES 2D tetap berjalan.');}
  else status('Proyeksi WebGL aktif. Semua logika permainan tetap dari ROM NES.');
  syncMode();
 });}
 syncMode();return displayMode===mode;
}
function syncMode(){
 root?.querySelectorAll('.njr-view-switch button').forEach(b=>
  b.setAttribute('aria-pressed',String(b.dataset.jr===displayMode)));
}
function eject(){
 releaseInputs();stopProjection();
 browser?.destroy?.();browser=null;loadedName='';
 if(screen)screen.replaceChildren();
 if(fileControl)fileControl.value='';
 if(root)root.querySelector('#njrSetup').hidden=false;
 displayMode='native';syncMode();
 status('ROM dikeluarkan. Pilih file lokal untuk memulai.');
}
function script(url,check){
 return new Promise((resolve,reject)=>{
  if(check())return resolve();
  const el=document.createElement('script');
  el.src=url;el.async=true;el.crossOrigin='anonymous';
  el.onload=()=>check()?resolve():reject(Error('Pustaka tidak tersedia setelah dimuat'));
  el.onerror=()=>reject(Error('Gagal memuat pustaka emulator'));
  document.head.appendChild(el);
 });
}
async function ensureNes(){
 if(window.jsnes?.Browser)return;
 try{await script(CDN,()=>!!window.jsnes?.Browser)}
 catch(_){await script(BACKUP,()=>!!window.jsnes?.Browser)}
}
async function readNES(file){
 if(file.size>3_000_000)throw Error('Ukuran berkas terlalu besar untuk ROM NES.');
 let bytes;
 if(/\.zip$/i.test(file.name)){
  await script(ZIPCDN,()=>!!window.JSZip?.loadAsync);
  const zip=await window.JSZip.loadAsync(await file.arrayBuffer());
  const candidates=Object.values(zip.files).filter(x=>!x.dir&&/\.nes$/i.test(x.name));
  if(candidates.length!==1)throw Error('ZIP harus berisi tepat satu file .nes.');
  bytes=await candidates[0].async('uint8array');
 }else{
  if(!/\.nes$/i.test(file.name))throw Error('Pilih berkas .nes atau .zip.');
  bytes=new Uint8Array(await file.arrayBuffer());
 }
 if(bytes.length<16||bytes[0]!==0x4e||bytes[1]!==0x45||bytes[2]!==0x53||bytes[3]!==0x1a)
  throw Error('Bukan berkas cartridge NES (header iNES tidak valid).');
 // No auto-upload, no retention, no cartridge version fingerprinting on server.
 return bytes;
}
async function loadLocal(file){
 if(loading)return false;loading=true;
 try{
  status('Membaca ROM lokal · '+file.name+' ...');
  const rom=await readNES(file);
  status('Menyiapkan mesin NES, audio, dan kontrol...');
  await ensureNes();
  releaseInputs();stopProjection();
  browser?.destroy?.();browser=null;screen.replaceChildren();
  browser=new window.jsnes.Browser({
   container:screen,
   onError:e=>status('Emulator mengalami kesalahan: '+String(e?.message||e))
  });
  browser.loadROM(rom);
  browser.fitInParent?.();
  loadedName=file.name;
  root.querySelector('#njrSetup').hidden=true;
  if(displayMode==='3d')setDisplayMode('3d');
  status('ROM aktif · '+file.name+' · '+rom.length+' byte. Tombol START untuk memulai.');
  return true;
 }catch(e){
  status('Tidak dapat memainkan ROM: '+String(e?.message||e));
  root.querySelector('#njrSetup').hidden=false;
  return false;
 }finally{loading=false;}
}
function open(options={}){
 ensureUI();active=true;root.hidden=false;
 returnTarget=options?.source==='habitat'?'habitat':'classic';
 document.body.classList.add('njr-playing');
 if(returnTarget==='habitat'){
  const home=document.getElementById('nj35');if(home)home.hidden=true;
 }
 if(browser){browser.start?.();browser.fitInParent?.();
  if(displayMode==='3d')setDisplayMode('3d');}
 return true;
}
function close(){
 if(!active)return;active=false;
 releaseInputs();browser?.stop?.();stopProjection();
 if(root)root.hidden=true;
 document.body.classList.remove('njr-playing');
 if(returnTarget==='habitat'){
  const home=document.getElementById('nj35');if(home)home.hidden=false;
  window.NJ35?.returnTo3D?.();
 }
 // ROM and game state remain only in volatile browser RAM until eject/reload.
}
window.addEventListener('blur',()=>{if(active){releaseInputs();browser?.stop?.();}});
document.addEventListener('visibilitychange',()=>{if(active&&document.hidden){releaseInputs();browser?.stop?.();}
 else if(active&&!document.hidden)browser?.start?.();});
window.addEventListener('resize',()=>{if(active)browser?.fitInParent?.()},{passive:true});
window.NUSAJIWA_ROM_REF=Object.freeze({
 version:'9.17.NJ137',open,close,eject,setDisplayMode,isOpen:()=>active,
 loadLocal,readNES,getStatus:()=>({active,romLoaded:!!browser,filename:loadedName,loading,displayMode,returnTarget}),
 privacy:'ROM is read only in the browser, never uploaded/stored or bundled'
});
})();
