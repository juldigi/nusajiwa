/* NJ95 | Opt-in production WebGL model audit at ?audit=folklore.
 * No animal adoptions, XP changes, or localStorage mutation. */
(function(){
'use strict';
if(new URLSearchParams(location.search).get('audit')!=='folklore')return;
const style=document.createElement('style');
style.textContent=`
#nj95audit{position:fixed;z-index:2147483600;right:12px;top:12px;width:min(355px,calc(100vw - 24px));
max-height:calc(100dvh - 24px);overflow:auto;background:rgba(9,23,31,.96);backdrop-filter:blur(15px);
color:#f4f4ec;border:1px solid #c9ae6d77;border-radius:15px;padding:13px;box-shadow:0 18px 40px #0008;
font:13px/1.45 system-ui,-apple-system,sans-serif}#nj95audit h2{font-size:15px;margin:0 0 5px}
#nj95audit small{color:#bdd0ce}#nj95audit label{color:#e8ce8e;font-weight:650}
#nj95audit .row{display:flex;gap:5px;flex-wrap:wrap;margin:7px 0}
#nj95audit button,#nj95audit select{border:1px solid #a7a69a66;border-radius:7px;
padding:7px 8px;background:#193138;color:#fff;cursor:pointer;font:inherit}
#nj95audit button.on{background:#6a592b}#nj95audit select{width:100%}
#nj95audit pre{font:11px/1.45 ui-monospace,monospace;white-space:pre-wrap;max-height:150px;
overflow:auto;background:#101a21;padding:8px;border-radius:7px}
@media(max-width:680px){#nj95audit{top:auto;bottom:7px;max-height:45dvh;padding:9px}
#nj95audit button{padding:5px 6px}#nj95audit .row{margin:4px 0}}`;
document.head.appendChild(style);
const root=document.createElement('aside');root.id='nj95audit';root.setAttribute('aria-label','Audit visual 3D makhluk Nusantara');
root.innerHTML=`<h2>Audit Visual · Mistis & Folklore</h2><small>61 identitas · 8 fase · 4 sudut. Render produksi, bukan gambar rekaan.</small>
<div class="row"><select id="nj95id" aria-label="Pilih identitas makhluk"></select></div>
<label>Fase 0–7</label><div class="row" id="nj95stages"></div>
<label>Sudut</label><div class="row" id="nj95angles"></div>
<div class="row"><button id="nj95png">Foto PNG</button><button id="nj95scan">Periksa 8 fase</button><button id="nj95exit">Tutup</button></div>
<pre id="nj95report">Mempersiapkan WebGL…</pre>
<small>Audit otomatis memeriksa dimensi dan jumlah mesh; ketepatan seni perlu dinilai melalui gambar nyata.</small>`;
document.body.appendChild(root);
const by=id=>root.querySelector('#'+id);
let selected='',phase=5,angle=0;
const api=()=>window.NUSAJIWA_FOLKLORE_VISUAL_QA;
const showInfo=v=>by('nj95report').textContent=typeof v==='string'?v:JSON.stringify(v,null,2);
function highlight(container,value){for(const b of by(container).querySelectorAll('button'))b.classList.toggle('on',b.dataset.value===String(value));}
function redraw(){if(!api()?.ready())return showInfo('3D belum aktif, tunggu koneksi engine.');
 const stats=api().preview(selected,phase);api().angle(angle);showInfo(stats);
 highlight('nj95stages',phase);highlight('nj95angles',angle);
}
for(let s=0;s<8;s++){
 const b=document.createElement('button');b.textContent=s;b.dataset.value=String(s);
 b.addEventListener('click',()=>{phase=s;redraw()});by('nj95stages').appendChild(b);
}
for(const [d,label] of [[0,'Depan'],[90,'Kanan'],[180,'Belakang'],[270,'Kiri']]){
 const b=document.createElement('button');b.textContent=label;b.dataset.value=String(d);
 b.addEventListener('click',()=>{angle=d;api()?.angle(angle);highlight('nj95angles',angle)});
 by('nj95angles').appendChild(b);
}
by('nj95id').addEventListener('change',e=>{selected=e.target.value;redraw()});
by('nj95png').addEventListener('click',()=>{
 const data=api()?.capture();if(!data)return showInfo('Foto belum tersedia.');
 const a=document.createElement('a');a.href=data;a.download='NUSAJIWA_'+selected+'_F'+phase+'_'+angle+'deg.png';
 document.body.appendChild(a);a.click();a.remove();
});
by('nj95scan').addEventListener('click',async()=>{
 if(!api()?.ready())return;
 const results=[];
 for(let s=0;s<8;s++){results.push(api().preview(selected,s));await new Promise(r=>setTimeout(r,15));}
 api().preview(selected,phase);api().angle(angle);
 showInfo({id:selected,phases:results,review:'Structural-only; manually inspect PNG images'});
});
by('nj95exit').addEventListener('click',()=>{api()?.reset();root.remove();style.remove();
 const url=new URL(location.href);url.searchParams.delete('audit');history.replaceState(null,'',url.pathname+url.search+url.hash);});
function init(){if(!api()?.ready()){setTimeout(init,600);return;}
 const roster=api().catalog();for(const x of roster){const op=document.createElement('option');op.value=x.id;
 op.textContent=x.name+' · '+x.category;by('nj95id').appendChild(op);}
 if(roster.length!==61)showInfo('Audit katalog menemukan '+roster.length+' non-fauna; cek daftar versi.');
 selected=roster[0]?.id;redraw();
}
init();
})();