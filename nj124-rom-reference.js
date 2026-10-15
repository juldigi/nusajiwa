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
 '<small>Bandingkan permainan klasik dengan mode petualangan adaptasi</small></div>'+
 '<button data-jr="close" aria-label="Kembali ke mode klasik">✕</button></div>'+
 '<div class="njr-container"><div class="njr-player" id="njrPlayer"></div>'+
 '<div class="njr-setup" id="njrSetup"><h2>Jalankan ROM NES pribadi</h2>'+
 '<p>File ROM tidak diunggah ke internet dan tidak menjadi bagian situs NUSAJIWA.'+
 ' Anda dapat memilih file <b>.nes</b> atau ZIP yang berisi ROM .nes.</p>'+
 '<label class="njr-upload">PILIH BERKAS .NES / .ZIP'+
 '<input id="njrFile" type="file" accept=".nes,.zip,application/zip,application/octet-stream"></label>'+
 '<p class="njr-note">Kontrol: ← → ↑ ↓, X = A, Z = B, Enter = START. Tekan tombol pada layar untuk iPhone.</p></div>'+
 '<div id="njrStatus" role="status" aria-live="polite">Belum ada ROM yang dipilih.</div></div>'+
 '<div class="njr-joy"><div>'+
 '<button data-nes="left" aria-label="Kiri">◀</button><button data-nes="right" aria-label="Kanan">▶</button>'+
 '<button data-nes="down" aria-label="Bawah">▼</button><button data-nes="up" aria-label="Atas">▲</button></div>'+
 '<div><button data-nes="select" aria-label="Select" class="njr-select">SELECT</button>'+
 '<button data-nes="start" aria-label="Start" class="njr-start">START</button>'+
 '<button data-nes="b" aria-label="Tombol B" class="njr-b">B</button>'+
 '<button data-nes="a" aria-label="Tombol A" class="njr-a">A</button></div></div>';
 document.body.appendChild(root);screen=root.querySelector('#njrPlayer');fileControl=root.querySelector('#njrFile');
 root.querySelector('[data-jr="close"]').addEventListener('click',close);
 fileControl.addEventListener('change',async()=>{const file=fileControl.files?.[0];if(file)await loadLocal(file)});
 for(const b of root.querySelectorAll('[data-nes]')){
  const control=b.dataset.nes, btn=()=>window.jsnes?.Controller?.['BUTTON_'+control.toUpperCase()];
  const press=e=>{e.preventDefault();b.setPointerCapture?.(e.pointerId);
   const value=btn();if(browser?.nes&&value!==undefined)browser.nes.buttonDown(1,value);
  };
  const lift=e=>{e.preventDefault();const value=btn();
   if(browser?.nes&&value!==undefined)browser.nes.buttonUp(1,value);
  };
  b.addEventListener('pointerdown',press);
  for(const ev of ['pointerup','pointercancel','lostpointercapture'])b.addEventListener(ev,lift);
 }
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
  browser?.destroy?.();browser=null;screen.replaceChildren();
  browser=new window.jsnes.Browser({
   container:screen,
   onError:e=>status('Emulator mengalami kesalahan: '+String(e?.message||e))
  });
  browser.loadROM(rom);
  browser.fitInParent?.();
  loadedName=file.name;
  root.querySelector('#njrSetup').hidden=true;
  status('ROM aktif · '+file.name+' · '+rom.length+' byte. Tombol START untuk memulai.');
  return true;
 }catch(e){
  status('Tidak dapat memainkan ROM: '+String(e?.message||e));
  root.querySelector('#njrSetup').hidden=false;
  return false;
 }finally{loading=false;}
}
function open(){
 ensureUI();active=true;root.hidden=false;
 document.body.classList.add('njr-playing');
 if(browser){browser.start?.();browser.fitInParent?.();}
 return true;
}
function close(){
 if(!active)return;active=false;
 browser?.destroy?.();browser=null;loadedName='';
 if(screen)screen.replaceChildren();
 if(root){root.hidden=true;root.querySelector('#njrSetup').hidden=false;
  if(fileControl)fileControl.value='';}
 document.body.classList.remove('njr-playing');
 // Classic stage-select remains exactly where the user left it.
}
window.addEventListener('blur',()=>{if(active)browser?.stop?.()});
document.addEventListener('visibilitychange',()=>{if(active&&document.hidden)browser?.stop?.();
 else if(active&&!document.hidden)browser?.start?.();});
window.addEventListener('resize',()=>{if(active)browser?.fitInParent?.()},{passive:true});
window.NUSAJIWA_ROM_REF=Object.freeze({
 version:'9.3.NJ124',open,close,isOpen:()=>active,
 loadLocal,readNES,getStatus:()=>({active,romLoaded:!!browser,filename:loadedName,loading}),
 privacy:'ROM is read only in the browser, never uploaded/stored or bundled'
});
})();
