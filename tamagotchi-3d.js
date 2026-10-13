/* NUSAJIWA 7.0 — classic digital-pet gameplay over the existing 300-model WebGL world.
   Additive migration: existing signature pets, codex and lore sources are preserved. */
(function(){
'use strict';
const API=window.NJ35, SCENE=document.getElementById('nj35');
if(!API||!SCENE||document.getElementById('njt'))return;
const KEY='nusajiwa-tama-v70', LIST=API.creatures||[];
const STAGES=['Telur','Bayi','Balita','Anak','Remaja','Dewasa','Tua','Legenda'];
const CLOCKS=[0,0,90,360,900,2520,5760,Infinity];
const XP=[0,8,24,49,81,125,180,260];
const ACTIONS=[
 ['feed','Makan','feed','🍚'],['light','Lampu','sleep','☾'],['game','Main','play','✦'],
 ['medicine','Obat','medicine','✚'],['toilet','Toilet','clean','♒'],['status','Status','status','♥'],
 ['discipline','Didik','bond','!'],['codex','Kodex','book','▤'],['collection','Suaka','paw','◈']
];
function esc(x){return String(x==null?'':x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function clamp(n,a=0,b=4){return Math.max(a,Math.min(b,Number(n)||0));}
const find=id=>LIST.find(x=>x.id===id);
function progress(){try{return API.getGameProgress()}catch(_){return {pets:{},spirit:0,stones:{}}}}
function pressNative(sel){const b=SCENE.querySelector(sel);if(b){b.click();return true}return false}
function blank(){return {version:1,active:null,pets:{},album:[],selected:0,reads:[],sound:true,lastTick:Date.now(),introduced:false};}
function load(){try{
 const v=JSON.parse(localStorage.getItem(KEY)||'null');
 if(!v||v.version!==1||typeof v.pets!=='object'||!v.pets)return blank();
 const o=Object.assign(blank(),v);
 // Former versions listed the same Rote snake-neck species twice under separate IDs.
 // Move care history to the canonical Rote record; never label it as Cuora.
 if(o.pets.kura_rote){
  const legacy=o.pets.kura_rote,canon=o.pets.kura_leher_ular_rote;
  if(!canon||(Number(legacy.age)||0)>(Number(canon.age)||0)){
   o.pets.kura_leher_ular_rote={...legacy,id:'kura_leher_ular_rote'};
  }
  if(o.active==='kura_rote')o.active='kura_leher_ular_rote';
  delete o.pets.kura_rote;
 }
 o.selected=clamp(o.selected,0,8);o.reads=Array.isArray(o.reads)?o.reads:[];o.album=Array.isArray(o.album)?o.album.slice(-40):[];
 return o;
}catch(_){return blank();}}
let store=load(),screen='home',query='',filter='all',focused='',mini=null,lastInteract=0,toastTimeout=0,panelCursor=0,pendingGeneration=null;
function newLife(id,stage){return {id,stage:clamp(stage,0,7),born:Date.now(),age:0,weight:5,hunger:3,happy:3,discipline:1,health:4,
 dirty:0,sick:false,sleep:false,lightsOff:false,attention:false,callAt:0,missed:0,mistakes:0,
 count:{hunger:0,happy:0,toilet:0,mischief:0},meals:0,games:0,studied:0,character:'Penjelajah',retired:false};}
function save(){try{localStorage.setItem(KEY,JSON.stringify(store))}catch(_){if(window.console)console.warn('NUSAJIWA: local save unavailable')}}
function synchronize(){
 const raw=progress();let changed=false;
 Object.entries(raw.pets||{}).forEach(([id,p])=>{
  if(!find(id))return;
  if(!store.pets[id]){store.pets[id]=newLife(id,p.phase);changed=true;}
  else if(p.phase>store.pets[id].stage){store.pets[id].stage=p.phase;changed=true;}
 });
 if(!store.pets[store.active]){store.active=Object.keys(store.pets)[0]||null;changed=true;}
 if(changed)save();
}
synchronize();
function active(){return store.pets[store.active]||null}
function breed(){return find(store.active)||{name:'Sahabat Nusantara',origin:'Indonesia'}}
function nativePick(id){
 const idx=LIST.findIndex(c=>c.id===id);
 if(idx<0)return;
 if(typeof API.selectTamaSpecies==='function'){API.selectTamaSpecies(id);return;}
 let saved={};try{saved=JSON.parse(localStorage.getItem('nusajiwa-3d-ui-v36')||'{}')}catch(_){}
 if(saved.index===idx)return;
 const b=document.createElement('button');b.dataset.njpick=String(idx);b.type='button';b.hidden=true;
 SCENE.append(b);b.click();b.remove();
}
const began3D=Date.now();
function check3d(){
 const hint=$('#njtRenderHint');if(!hint)return;
 if(API.is3D?.()){hint.hidden=true;return;}
 const fallback=SCENE.querySelector('.nj-fallback');
 const elapsed=Date.now()-began3D;
 if(fallback||elapsed>16000){
  hint.hidden=false;
  hint.innerHTML='Mode 3D belum tersedia.<small>Periksa koneksi, muat ulang game, atau mainkan versi klasik melalui Pengaturan.</small>';
 }else{
  hint.hidden=false;hint.textContent='✧ Menyiapkan dunia 3D…';
 }
}
function heart(n){return '<span class="njt-hearts">'+Array.from({length:4},(_,i)=>'<span class="'+(i<clamp(n)?'filled':'')+'">♥</span>').join('')+'</span>'}
function aged(p){return p?(p.age<1440?Math.floor(p.age/60)+' jam':Math.floor(p.age/1440)+' hari'):'—'}
function character(p){return p.mistakes>=8?'Nakal':p.discipline>=3&&p.mistakes<=2?'Teladan':p.studied>=6?'Cendekia':p.games>=9?'Ceria':'Penjelajah'}
function call(p,message){if(!p.attention){p.attention=true;p.callAt=Date.now();p.missed=0;}p.reason=message;}
function pacify(p){p.attention=false;p.callAt=0;p.missed=0;p.reason=''}
function needs(now=Date.now()){
 const mins=Math.min(720,Math.max(0,(now-(store.lastTick||now))/60000));
 if(mins<.016)return;
 store.lastTick=now;
 for(const p of Object.values(store.pets)){
  if(p.retired||p.stage===0)continue;
  p.age+=mins;
  p.count=p.count||{hunger:0,happy:0,toilet:0};
  p.count.hunger+=mins;p.count.happy+=mins;p.count.toilet+=mins;p.count.mischief=(p.count.mischief||0)+mins;
  let d=Math.floor(p.count.hunger/43);p.count.hunger%=43;p.hunger=clamp(p.hunger-d);
  d=Math.floor(p.count.happy/61);p.count.happy%=61;p.happy=clamp(p.happy-d);
  d=Math.floor(p.count.toilet/108);p.count.toilet%=108;p.dirty=clamp(p.dirty+d);
  const night=new Date(now).getHours()>=21||new Date(now).getHours()<7;
  if(night&&p.lightsOff)p.sleep=true;
  if(!night&&p.sleep){p.sleep=false;p.lightsOff=false;if(p.id===store.active)API.setTamaMood?.('idle',800);}
  if(p.hunger<=1)call(p,'Aku lapar…');
  else if(p.dirty>=2)call(p,'Tolong bersihkan toilet.');
  else if(p.happy<=1)call(p,'Ayo bermain!');
  else if(night&&!p.lightsOff)call(p,'Aku mengantuk. Matikan lampu.');
  else if(!night&&!p.sleep&&!p.attention&&p.hunger>=2&&p.happy>=2&&p.dirty<2&&p.count.mischief>=205){p.count.mischief%=205;call(p,'Aku ingin perhatian!');}
  if(p.attention&&p.callAt&&now-p.callAt>150*60000){
   const count=Math.min(3,Math.floor((now-p.callAt)/(150*60000)));
   if(count>p.missed){p.mistakes+=count-p.missed;p.missed=count;}
  }
  if((p.dirty>=3||p.hunger===0)&&p.mistakes>=3)p.sick=true;
  if(p.sick)p.health=clamp(p.health-mins/320);
  if(p.sick&&p.health===0&&p.age>1440){p.retired=true;p.character=character(p);store.album.push({id:p.id,name:find(p.id)?.name||p.id,age:p.age,character:p.character,date:now,mistakes:p.mistakes,reason:'Pulang ke alam'});store.album=store.album.slice(-40);}
  if(p.stage>=6&&p.age>10*24*60){
   p.retired=true;p.character=character(p);
   store.album.push({id:p.id,name:find(p.id)?.name||p.id,age:p.age,character:p.character,date:now,mistakes:p.mistakes});
   store.album=store.album.slice(-40);
  }
 }
 save();
}
const element=document.createElement('div');
element.id='njt';
element.innerHTML='<div class="njt-shell">'+
 '<div class="njt-top"><div class="njt-brand"><small>THE LIVING LEGENDS</small><strong>NUSA<span>JIWA</span></strong><i>TAMAGOTCHI 3D</i></div>'+
 '<div class="njt-top-tools"><button data-tama="help" aria-label="Petunjuk">?</button><button data-tama="sound" aria-label="Pengaturan suara">♪</button></div></div>'+
 '<div class="njt-window"><div class="njt-glass"></div><div class="njt-render-hint" id="njtRenderHint" aria-live="polite">✧ Menyiapkan dunia 3D…</div><div class="njt-status-strip"><span id="njtCreatureName"></span><span id="njtAge"></span></div><div class="njt-thought" id="njtThought"></div><div class="njt-age-track" id="njtAgeTrack"></div><div class="njt-alert" id="njtAlert" aria-live="polite"></div></div>'+
 '<div class="njt-console"><div class="njt-console-label"><span>✦ PILIH TINDAKAN</span><span id="njtPrompt">A PILIH · B OK · C KEMBALI</span></div>'+
 '<div class="njt-menu" id="njtMenu"></div><div class="njt-three-buttons">'+
 '<button data-tama="a" aria-label="Tombol A, pilih ikon"><i>A</i><small>PILIH</small></button>'+
 '<button data-tama="b" aria-label="Tombol B, OK"><i>B</i><small>OK</small></button>'+
 '<button data-tama="c" aria-label="Tombol C, kembali"><i>C</i><small>KEMBALI</small></button></div>'+
 '<div class="njt-foot"><span>1990s soul · 3D world</span><span id="njtClock"></span></div></div></div>'+
 '<div class="njt-panel" id="njtPanel" hidden></div><div class="njt-toast" id="njtToast" role="status"></div>';
SCENE.append(element);SCENE.classList.add('njt-on');
const $=q=>element.querySelector(q);
function beep(f=460){
 if(!store.sound)return;
 try{const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return;let ctx=beep.ctx||(beep.ctx=new Audio());
 if(ctx.state==='suspended')ctx.resume();const oscillator=ctx.createOscillator(),gain=ctx.createGain();
 oscillator.type='sine';oscillator.frequency.setValueAtTime(f,ctx.currentTime);oscillator.frequency.exponentialRampToValueAtTime(f*1.15,ctx.currentTime+.12);
 gain.gain.setValueAtTime(.001,ctx.currentTime);gain.gain.exponentialRampToValueAtTime(.038,ctx.currentTime+.025);gain.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.16);
 oscillator.connect(gain);gain.connect(ctx.destination);oscillator.start();oscillator.stop(ctx.currentTime+.17);}catch(_){}
}
function toast(msg){
 const el=$('#njtToast');el.textContent=msg;el.classList.add('show');
 clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>el.classList.remove('show'),2600);
}
function growth(p){
 const e=progress().pets?.[p.id];if(!e)return;
 if(e.phase>p.stage){p.stage=e.phase;p.character=character(p);save();toast('✦ Berevolusi menjadi '+STAGES[p.stage]);}
 if(p.stage===0||p.stage>=6||p.age<CLOCKS[p.stage+1])return;
 if(p.sick||p.hunger===0||p.happy===0)return;
 if(p.stage>=4&&p.mistakes>9&&p.discipline<2)return;
 if(e.xp<XP[e.phase+1])return;
 nativePick(p.id);
 pressNative('#nj37Evolve');
 const next=progress().pets?.[p.id]?.phase;
 if(next>p.stage){p.stage=next;p.character=character(p);save();toast('✦ Evolusi: '+STAGES[next]);}
}
function hatch(){
 const p=active();if(!p||p.stage!==0)return;
 nativePick(p.id);pressNative('#nj37Evolve');
 let next=progress().pets?.[p.id]?.phase||0;
 if(next>0){p.stage=next;p.born=Date.now();p.age=0;p.character='Penjelajah';save();beep(850);toast('Telur menetas! Selamat datang ♡')}
 else toast('Pilih telur dari Suaka terlebih dahulu.');
 render();
}
function exportWholeGame(){
 const content={format:'NUSAJIWA_TAMAGOTCHI_3D_BACKUP',version:7,savedAt:new Date().toISOString(),
  classic:localStorage.getItem('nusajiwa-save-v1'),tamagotchi:store,signature:progress()};
 try{const blob=new Blob([JSON.stringify(content,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;
  a.download='NUSAJIWA_TAMAGOTCHI_3D_FULL_BACKUP.json';document.body.append(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),8000);toast('Progres lengkap telah diekspor.');}
 catch(_){toast('Tidak dapat mengekspor file di browser ini.');}
}
function importWholeGame(){
 const input=document.createElement('input');input.type='file';input.accept='.json,application/json';input.hidden=true;
 document.body.append(input);
 input.addEventListener('change',async()=>{
  const file=input.files?.[0];input.remove();if(!file)return;
  if(file.size>3000000){toast('File cadangan maksimal 3 MB.');return;}
  try{
   const raw=JSON.parse(await file.text());
   if(raw?.format!=='NUSAJIWA_TAMAGOTCHI_3D_BACKUP'||raw.version!==7||
      raw.signature?.version!==1||typeof raw.signature.pets!=='object'||
      raw.tamagotchi?.version!==1||typeof raw.tamagotchi.pets!=='object')throw Error('Format cadangan tidak sesuai.');
   if(!Object.keys(raw.signature.pets).every(id=>!!find(id))||
      !Object.keys(raw.tamagotchi.pets).every(id=>!!find(id)))throw Error('Ada makhluk yang tidak dikenal.');
   if(!confirm('Pulihkan cadangan NUSAJIWA lengkap? Progres di perangkat ini akan ditimpa.'))return;
   localStorage.setItem(API.saveKey,JSON.stringify(raw.signature));
   localStorage.setItem(KEY,JSON.stringify(raw.tamagotchi));
   if(raw.classic&&typeof raw.classic==='string')localStorage.setItem('nusajiwa-save-v1',raw.classic);
   location.reload();
  }catch(err){toast('Impor gagal: '+err.message);}
 },{once:true});
 input.click();
}
function select(id){
 if(!find(id))return;
 nativePick(id);
 if(!progress().pets?.[id])pressNative('#nj35Adopt');
 if(!progress().pets?.[id]){toast('Jiwa belum cukup. Jelajah Nusantara untuk mendapatkannya.');return;}
 if(store.pets[id]?.retired){pendingGeneration=id;screen='generation';render();return;}
 if(!store.pets[id])store.pets[id]=newLife(id,progress().pets[id].phase);
 store.active=id;screen='home';save();render();toast(find(id).name+' kini sahabatmu!');
}
function nativeCare(kind){pressNative('[data-njcare="'+kind+'"]')}
function care(kind,mode){
 const p=active();if(!p||p.retired){toast('Pilih sahabat baru melalui Suaka.');return}
 if(p.stage===0){hatch();return}
 if(p.sleep&&kind!=='light'&&kind!=='medicine'){toast('Ia sedang tidur. Nyalakan lampu dahulu.');return}
 if(Date.now()-lastInteract<650)return;lastInteract=Date.now();
 if(kind==='feed'){
  if(p.hunger>=4){toast('Perutnya sudah kenyang.');return;}
  p.hunger=clamp(p.hunger+(mode==='snack'?1:2));p.weight+=mode==='snack'?2:1;
  if(mode==='snack')p.happy=clamp(p.happy+1);
  p.meals++;nativeCare('feed');toast(mode==='snack'?'Camilannya enak!':'Nyam! Sudah kenyang.');
 }else if(kind==='toilet'){
  if(p.dirty===0){toast('Toilet sudah bersih.');return}
  p.dirty=0;p.health=clamp(p.health+1);nativeCare('clean');toast('Habitat kembali bersih.');
 }else if(kind==='medicine'){
  if(!p.sick){toast('Sahabatmu sehat, belum perlu obat.');return}
  p.sick=false;p.health=clamp(p.health+2);nativeCare('bond');toast('Sudah membaik. ♡');
 }else if(kind==='light'){
  p.lightsOff=(mode==='off');p.sleep=p.lightsOff;
  if(p.sleep){nativeCare('sleep');API.setTamaMood?.('sleep',0);toast('Selamat tidur… zzz');}
  else{API.setTamaMood?.('idle',800);toast('Lampu menyala, selamat pagi!');}
 }else if(kind==='discipline'){
  if(mode==='praise'){p.happy=clamp(p.happy+1);if(p.attention&&p.hunger>=2&&p.happy>=2)p.discipline=clamp(p.discipline+1);toast('Ia senang mendapat pujian.');}
  else if(p.attention&&p.reason==='Aku ingin perhatian!'&&p.hunger>=2&&p.happy>=2&&p.dirty<2){p.discipline=clamp(p.discipline+1);toast('Ia belajar memahami aturan.');}
  else{p.happy=clamp(p.happy-1);p.mistakes++;toast('Teguran tanpa alasan membuatnya sedih.');}
  nativeCare('bond');
 }
 if(p.hunger>=2&&p.happy>=2&&p.dirty<2&&p.attention)pacify(p);
 save();growth(p);render();
}
function beginMini(){
 if(!active()||active().stage===0){hatch();return}
 if(active().sleep){toast('Tunggu sampai sahabat bangun.');return}
 mini={round:0,score:0,answer:Math.floor(Math.random()*2)};screen='minigame';render();
}
function guess(v){
 if(!mini)return;
 if(mini.answer===v){mini.score++;beep(750)}else beep(250);
 mini.round++;
 if(mini.round<5){mini.answer=Math.floor(Math.random()*2);render();return}
 const p=active(),win=mini.score>=3;p.games++;p.happy=clamp(p.happy+(win?2:1));p.weight=Math.max(3,p.weight-1);
 if(win){nativeCare('play');pacify(p)}
 save();toast(win?'✦ Kamu menang! Bahagia +2':'Mainnya seru! Ayo coba lagi.');
 screen='home';mini=null;growth(p);render();
}
function thought(p){
 if(!p)return 'Pilih makhluk pertamamu untuk memulai.';
 if(p.retired)return 'Satu kisah selesai. Lihat Album Kenangan.';
 if(p.stage===0)return 'Aku masih telur. Tekan B untuk menetas! 🥚';
 if(p.sick)return 'Aku kurang sehat… ✚';
 if(p.sleep)return 'Zzz… selamat tidur. ☾';
 if(p.attention)return p.reason||'Aku membutuhkanmu!';
 if(p.dirty>0)return 'Tolong bersihkan toiletnya.';
 return ['Hai, Penjaga! ♡','Ayo bermain!','Nusantara indah sekali ✦','Kita tumbuh bersama!'][Math.floor(Date.now()/18000)%4];
}
function show(key){
 panelCursor=0;
 if(!active()&&!['starter','collection','codex','help','settings','status'].includes(key))key='collection';
 if(key==='feed')screen='food';
 else if(key==='light')screen='light';
 else if(key==='game'){beginMini();return}
 else if(key==='medicine'||key==='toilet'){care(key);screen='home';return}
 else if(key==='status')screen='status';
 else if(key==='discipline')screen='discipline';
 else if(key==='codex'){screen='codex';focused=store.active||LIST[0]?.id||'';query='';}
 else if(key==='collection'||key==='starter'){screen=key;query='';}
 else if(key==='help'||key==='settings')screen=key;
 else if(key==='expedition'||key==='evolution'){
  pressNative('[data-njtab="'+(key==='expedition'?'explore':'ritual')+'"]');screen='home';
 }
 render();
}
function option(title,body){return '<div class="njt-panel-card" role="dialog" aria-modal="true" aria-labelledby="njtTitle"><header><h2 id="njtTitle">'+title+'</h2><button data-tama="back" aria-label="Tutup">✕</button></header><div class="njt-panel-content">'+body+'</div></div>'}
function choices(rows){return '<div class="njt-option-list">'+rows.map(r=>'<button data-tama="'+r[0]+'">'+r[1]+(r[2]?'<small>'+r[2]+'</small>':'')+'</button>').join('')+'</div>'}
function statusContent(p){
 if(!p)return '<p>Belum ada sahabat. Pilih telur di Suaka.</p><button class="njt-primary" data-tama="collection">Cari makhluk</button>';
 return '<div class="njt-status-grid">'+[['Kenyang',p.hunger],['Bahagia',p.happy],['Disiplin',p.discipline],['Kesehatan',p.health]].map(([k,v])=>'<div><span>'+k+'</span>'+heart(v)+'</div>').join('')+'</div>'+
 '<div class="njt-info-list">'+[
 ['Fase',STAGES[p.stage]],['Umur',aged(p)],['Berat',Math.round(p.weight)+' g (fantasi)'],
 ['Toilet',p.dirty+' kotoran'],['Sakit',p.sick?'Ya':'Tidak'],['Kesalahan rawat',p.mistakes],
 ['Kepribadian',character(p)],['Pengetahuan',p.studied+' entri · '+store.reads.length+'/'+LIST.length+' Kodex']
 ].map(([k,v])=>'<div><span>'+k+'</span><b>'+v+'</b></div>').join('')+'</div>'+
 (p.stage===0?'<button class="njt-primary" data-tama="hatch">🥚 Tetaskan telur</button>':'')+
 (p.retired?'<button class="njt-primary" data-tama="collection">Mulai generasi baru</button>':'')+
 choices([['expedition','🧭 Jelajah & Batu Elemen'],['evolution','✦ Evolusi & Ritual Legenda']]);
}
function drawPanel(){
 const box=$('#njtPanel'),p=active();
 if(screen==='home'){box.hidden=true;box.innerHTML='';return}
 box.hidden=false;
 let title='',content='';
 if(screen==='food'){title='🍙 Beri Makan';content='<p>Isi perutnya secukupnya. Camilan menambah kebahagiaan tetapi juga berat badan.</p>'+
 choices([['meal','🍚 Makanan utama','Kenyang +2, berat +1'],['snack','🍡 Camilan','Kenyang +1, bahagia +1, berat +2']]);}
 else if(screen==='light'){title='☾ Lampu & Tidur';content='<p>Padamkan lampu saat istirahat seperti Tamagotchi klasik. Nyalakan saat ingin bermain lagi.</p>'+
 choices([['lightOff','☾ Matikan lampu','Sahabat beristirahat'],['lightOn','☀ Nyalakan lampu','Sahabat bangun']]);}
 else if(screen==='status'){title='♥ Buku Kesehatan';content=statusContent(p);}
 else if(screen==='discipline'){title='! Disiplin & Kasih Sayang';content='<p>Hargai panggilan sahabatmu. Tegur hanya saat merengek tanpa kebutuhan nyata.</p>'+
 choices([['praise','♡ Puji sahabat','Membantu kedekatan'],['scold','! Beri teguran','Hanya jika ada alasan']]);}
 else if(screen==='minigame'&&mini){title='✦ Tebak Arah';content='<p>Tebak ke mana cahaya akan pergi. Menangkan 3 dari 5 ronde!</p>'+
 '<div class="njt-mini-score">RONDE '+(mini.round+1)+'/5 · BENAR '+mini.score+'</div>'+
 '<div class="njt-guess-mark">✧ ? ✧</div><div class="njt-guess"><button data-tama="left">◀ KIRI</button><button data-tama="right">KANAN ▶</button></div>';}
 else if(screen==='codex'){
  title='▤ Ensiklopedia Hidup';
  const f=find(focused)||LIST[0],fact=window.NJ45_CODEX?.[f?.id];
  let intro=f?'<small>LEMBAR PENGETAHUAN</small><h3>'+esc(f.name)+'</h3><p>⌖ '+esc(f.origin)+'</p>':'';
  if(fact)intro+='<p><b>Ciri khas:</b> '+esc(fact.morphology)+'</p><p><b>Konteks:</b> '+esc(fact.habitat)+'</p><span class="njt-verified">✓ Profil bersumber</span>';
  else intro+='<p>Profil awal. Detail dan sumber lanjutan tersedia melalui arsip 3D; sebagian informasi masih perlu kurasi.</p>';
  content='<p>Fakta fauna, mitologi, dan folklor dipisahkan dari evolusi fantasi. Setiap halaman baru yang pertama kali dibaca bersama sahabat memberi +6 XP dan +5 Jiwa. '+store.reads.length+'/'+LIST.length+' halaman telah dibuka.</p>'+
    '<div class="njt-codex-focus">'+intro+'<button class="njt-primary" data-tama="read">Buka Fakta & Sumber ↗</button></div>'+
    '<input id="njtSearch" type="search" placeholder="Cari '+LIST.length+' makhluk dan wilayah..." value="'+esc(query)+'" autocomplete="off">'+
    '<div class="njt-pick-grid">'+LIST.filter(r=>(r.name+' '+r.origin).toLocaleLowerCase('id').includes(query.toLocaleLowerCase('id'))).slice(0,65).map(r=>
      '<button data-tama="focus" data-id="'+esc(r.id)+'" class="'+(focused===r.id?'selected':'')+'">'+esc(r.name)+'</button>').join('')+'</div>';
 }
 else if(screen==='starter'){
  title='✦ Telur Pertamamu';
  const starters=['komodo','tiger','kuyang'];
  content='<p>Pilih satu jiwa Nusantara untuk memulai perjalanan klasik merawat sahabat 3D dari telur.</p>'+
    '<div class="njt-starter-eggs">'+starters.map(id=>{const r=find(id);return r?'<button type="button" data-tama="choose" data-id="'+esc(id)+'"><span class="njt-egg">🥚</span><b>'+esc(r.name)+'</b><small>'+esc(r.origin)+'</small></button>':''}).join('')+'</div>'+
    '<p class="njt-starter-note">Rawat, bermain, dan saksikan evolusi. Makhluk lain dapat dicari dari Suaka dan Kodex.</p>'+
    choices([['collection','◈ Lihat semua '+LIST.length+' makhluk'],['help','? Cara bermain']]);
 }
 else if(screen==='generation'){
  title='✧ Telur Generasi Baru';
  const rec=find(pendingGeneration);
  content='<p>Perjalanan '+esc(rec?.name||'sahabat')+' terdahulu tercatat di Album Kenangan. Mulai lagi dengan telur yang baru?</p>'+
    '<p>Fase, XP, dan batu elemen Legenda pada makhluk ini kembali ke awal. Koleksi makhluk lain, total batu, dan Album Kenangan tidak berubah.</p>'+
    choices([['restart','🥚 Mulai generasi baru'],['collection','Kembali ke Suaka']]);
 }
 else if(screen==='collection'){
  title='◈ Suaka · '+Object.keys(store.pets).length+' Sahabat';
  const list=LIST.filter(r=>(r.name+' '+r.origin).toLocaleLowerCase('id').includes(query.toLocaleLowerCase('id'))&&
       (filter!=='owned'||!!store.pets[r.id])).slice(0,70);
  content='<p>Pilih dari '+LIST.length+' identitas makhluk berbeda. Delapan fase dan batu elemen bukan makhluk tambahan.</p>'+
   '<div class="njt-filter"><button data-tama="filter" data-filter="all" class="'+(filter==='all'?'chosen':'')+'">Semua</button>'+
   '<button data-tama="filter" data-filter="owned" class="'+(filter==='owned'?'chosen':'')+'">Milikku</button></div>'+
   '<input id="njtSearch" type="search" placeholder="Cari nama / asal..." value="'+esc(query)+'" autocomplete="off">'+
   '<div class="njt-pick-grid">'+list.map(r=>'<button data-tama="choose" data-id="'+esc(r.id)+'" class="'+(store.active===r.id?'selected':'')+'">'+esc(r.name)+
   '<small>'+(store.pets[r.id]?'♥ '+STAGES[store.pets[r.id].stage]:'✦ Adopsi telur')+'</small></button>').join('')+'</div>'+
   '<button class="njt-secondary" data-tama="album">▤ Album Kenangan ('+store.album.length+')</button>';
 }
 else if(screen==='album'){title='▤ Album Kenangan';content='<p>Semua sahabat yang telah menyelesaikan siklus kehidupan tersimpan dalam album.</p>'+
  (!store.album.length?'<p>Belum ada generasi yang selesai.</p>':'<div class="njt-info-list">'+store.album.slice().reverse().map(x=>
    '<div><span>'+esc(x.name)+' · '+esc(x.character)+'</span><b>'+Math.floor(x.age/1440)+' hari</b></div>').join('')+'</div>')+
   '<button class="njt-primary" data-tama="collection">Kembali ke Suaka</button>';}
 else if(screen==='help'){title='? Cara Bermain';content='<p><b>Tamagotchi tahun 1990-an dalam dunia 3D.</b> Pilih satu telur, lalu rawat dan amati tumbuh menjadi legenda Nusantara.</p>'+
 '<ol><li>Tombol <b>A</b>: berpindah ikon, <b>B</b>: OK, <b>C</b>: kembali.</li><li>Perhatikan kenyang, senang, kedisiplinan, sakit, dan toilet.</li>'+
 '<li>Jika ia memanggil, berikan perhatian. Jangan memarahi tanpa alasan.</li><li>Matikan lampu saat istirahat. Bermain tebak arah untuk menaikkan kebahagiaan.</li>'+
 '<li>Pertumbuhan membutuhkan waktu nyata, pengalaman, perawatan, dan batu elemen untuk Legenda.</li>'+
 '<li>Ensiklopedia memuat fakta/kisah dan sumber, berbeda dari evolusi fantasi.</li></ol>'+
 '<p>Saat game ditutup, kebutuhan bergerak perlahan sampai maksimum 12 jam per pembaruan. Simpanan permainan berada di browser perangkat ini.</p>'+
 choices([['settings','⚙ Pengaturan & backup'],['back','Mulai bermain']]);}
 else if(screen==='settings'){title='⚙ Pengaturan';content='<p>Progres 3D dan Kodex yang sudah ada tetap dipertahankan.</p>'+
 choices([['sound','♪ Suara '+(store.sound?'aktif':'mati')],['export','↓ Ekspor progres lengkap'],
 ['import','↑ Impor progres lengkap'],['quality','◈ Kualitas render'],['legacy','↗ Mode permainan klasik']]);}
 box.innerHTML=option(title,content);
 markPanelCursor();
}
function panelButtons(){return [...$('#njtPanel').querySelectorAll('button[data-tama]')].filter(b=>b.dataset.tama!=='back'&&!b.disabled)}
function markPanelCursor(){
 if(screen==='home')return;
 const a=panelButtons();if(!a.length)return;
 panelCursor=((panelCursor%a.length)+a.length)%a.length;
 a.forEach((b,i)=>{b.classList.toggle('njt-focused',i===panelCursor);b.setAttribute('aria-current',i===panelCursor?'true':'false')});
}
function render(){
 const p=active();
 if(store.active&&!SCENE.querySelector('#nj35Side.open'))nativePick(store.active);
 const same=store.active&&API.getCurrentId?.()===store.active;
 API.setTamaEnvironment?.({dirty:same?(p?.dirty||0):0,sick:same&&!!p?.sick,sleep:same&&!!p?.sleep,attention:same&&!!p?.attention});
 check3d();
 $('#njtMenu').innerHTML=ACTIONS.map((a,i)=>'<button class="njt-menu-item '+(store.selected===i?'selected':'')+'" data-tama="menu" data-value="'+a[0]+'" aria-pressed="'+(store.selected===i)+'"><span class="njt-menu-art '+a[2]+'">'+a[3]+'</span><small>'+a[1]+'</small></button>').join('');
 $('#njtCreatureName').textContent=p?breed().name+' · '+STAGES[p.stage]:'Pilih telur pertamamu';
 $('#njtAge').textContent=p?aged(p)+' · '+Math.round(p.weight)+' g':'✦ NUSANTARA';
 $('#njtThought').textContent=thought(p);
 $('#njtAgeTrack').innerHTML=p&&!p.retired&&p.stage>0&&p.stage<6?'<span>'+STAGES[p.stage]+'</span><i><b style="width:'+Math.min(100,Math.round(p.age/CLOCKS[p.stage+1]*100))+'%"></b></i><span>'+STAGES[p.stage+1]+'</span>':'<span>'+(p?'♡ '+character(p):LIST.length+' identitas hidup')+'</span>';
 $('#njtAlert').textContent=p?.sick?'✚':p?.attention?'!':'';
 $('#njtClock').textContent=new Date().toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'});
 $('#njtPrompt').textContent=screen==='home'?'A PILIH · B OK · C KEMBALI':'B OK · C KEMBALI';
 element.classList.toggle('njt-sleep',!!p?.sleep);element.classList.toggle('njt-sick',!!p?.sick);element.classList.toggle('njt-retired',!!p?.retired);
 drawPanel();
}
function back(){
 if(screen!=='home'){screen='home';query='';render();return}
 show(active()?'status':'collection');
}
function buttonA(){if(screen!=='home'){const b=panelButtons();if(b.length){panelCursor=(panelCursor+1)%b.length;markPanelCursor();b[panelCursor].scrollIntoView({block:'nearest',behavior:'smooth'});beep(390)}return;}store.selected=(store.selected+1)%ACTIONS.length;beep(390);save();render()}
function buttonB(){
 beep(610);
 if(screen!=='home'){const b=panelButtons();if(b.length)b[panelCursor]?.click();else back();return}
 if(active()?.stage===0){hatch();return}
 show(ACTIONS[store.selected][0]);
}
element.addEventListener('click',ev=>{
 const b=ev.target.closest('button');if(!b||!b.dataset.tama)return;
 const a=b.dataset.tama;
 if(a==='a'){buttonA();return}
 if(a==='b'){buttonB();return}
 if(a==='c'||a==='back'){back();return}
 if(a==='menu'){store.selected=ACTIONS.findIndex(x=>x[0]===b.dataset.value);save();beep();show(b.dataset.value);return}
 if(a==='help'||a==='settings'||a==='collection'){show(a);return}
 if(a==='sound'){store.sound=!store.sound;save();render();toast(store.sound?'Suara aktif':'Suara mati');return}
 if(a==='meal'||a==='snack'){care('feed',a);screen='home';render();return}
 if(a==='lightOff'||a==='lightOn'){care('light',a==='lightOff'?'off':'on');screen='home';render();return}
 if(a==='praise'||a==='scold'){care('discipline',a);screen='home';render();return}
 if(a==='left'||a==='right'){guess(a==='left'?0:1);return}
 if(a==='hatch'){hatch();screen='home';render();return}
 if(a==='expedition'||a==='evolution'){show(a);return}
 if(a==='choose'){select(b.dataset.id);return}
 if(a==='restart'){
  const id=pendingGeneration;
  if(!id||!store.pets[id]?.retired||typeof API.restartTamaGeneration!=='function'){toast('Generasi belum siap.');return;}
  nativePick(id);
  if(!API.restartTamaGeneration(id)){toast('Tidak dapat memulai generasi.');return;}
  store.pets[id]=newLife(id,0);store.active=id;pendingGeneration=null;screen='home';save();render();toast('Telur generasi baru telah tiba!');return;
 }
 if(a==='filter'){filter=b.dataset.filter;panelCursor=0;drawPanel();return}
 if(a==='focus'){focused=b.dataset.id;panelCursor=0;drawPanel();return}
 if(a==='read'){
   const id=focused;if(!id)return;
   const firstRead=!store.reads.includes(id);
   if(firstRead){
    store.reads.push(id);
    const p=active();
    if(p&&p.stage>0&&!p.retired){
     p.studied++;
     API.rewardTamaCodexReading?.(p.id,6,5);
     toast('✧ Pengetahuan baru! +6 XP dan +5 Jiwa');
    }else toast('✧ Halaman pengetahuan ditemukan!');
   }
   save();screen='home';render();nativePick(id);pressNative('[data-njtab="archive"]');return;
 }
 if(a==='album'){screen='album';render();return}
 if(a==='export'){exportWholeGame();return}
 if(a==='import'){importWholeGame();return}
 if(a==='quality'){pressNative('#nj35Quality');toast('Kualitas render diperbarui.');return}
 if(a==='legacy'){pressNative('#nj35Legacy');return}
});
element.addEventListener('input',e=>{
 if(e.target.id!=='njtSearch')return;
 query=e.target.value;const pos=e.target.selectionStart;drawPanel();const el=$('#njtSearch');
 if(el){el.focus();try{el.setSelectionRange(pos,pos)}catch(_){}}
});
document.addEventListener('keydown',e=>{
 if(!document.body.classList.contains('nj35-playing')||e.target.matches('input,textarea,select')||e.metaKey||e.ctrlKey)return;
 if(e.key==='ArrowLeft'||e.key.toLowerCase()==='a'){e.preventDefault();buttonA()}
 else if(e.key==='Enter'||e.key===' '){e.preventDefault();buttonB()}
 else if(e.key==='Escape'||e.key==='Backspace'){e.preventDefault();back()}
});
document.addEventListener('visibilitychange',()=>{if(!document.hidden){needs();synchronize();if(active())growth(active());render()}});
window.addEventListener('pageshow',()=>{needs();synchronize();render()});
setInterval(()=>{if(!document.hidden){needs();synchronize();if(active())growth(active());render()}},60000);
setInterval(()=>{if(!document.hidden)check3d()},1800);
needs();if(active()){nativePick(store.active);if(active().sleep)API.setTamaMood?.('sleep',0);}pressNative('#nj35ZoomIn');pressNative('#nj35ZoomIn');render();
if(!active())show('starter');
else if(!store.introduced){store.introduced=true;save();show('help');}
window.NUSAJIWA_TAMAGOTCHI={version:'7.2',creatureCount:LIST.length,getSave:()=>JSON.parse(JSON.stringify(store)),refresh:()=>{synchronize();render()},open:show};
})();