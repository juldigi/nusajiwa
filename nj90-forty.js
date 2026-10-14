/* NUSAJIWA NJ90–NJ93. Forty verified catalogue IDs / eight fantasy game stages.
 * Folklore does not claim real eggs, aging or evolution for these figures.
 * Native sculpture remains in every mature phase; save schema is unchanged. */
(function(){
'use strict';
if(window.NUSAJIWA_MORPH40)return;
const CATALOG=[["banaspati","fire","orb","flame","Jawa"],["palasik","spirit","head","entrails","Minangkabau"],["sundel_bolong","spirit","rearhole","hair","Jawa"],["wewe","spirit","hair","arms","Jawa"],["kuyang","spirit","head","entrails","Kalimantan"],["orang_bati","bat","wing","claw","Seram"],["rangda","mask","fang","tongue","Bali"],["barong","beast","mane","mask","Bali"],["hantu_jeruk_purut","spirit","headless","cloak","Jakarta"],["macan_putih","tiger","stripes","tail","Jawa"],["lembuswana","hybrid","trunk","wing","Kutai"],["naga_basuki","serpent","coil","water","Bali"],["garuda","bird","wing","claw","Nusantara"],["hanoman","ape","tail","crown","Wayang"],["jatayu","bird","beak","wing","Wayang"],["sembrani","horse","muzzle","wing","Jawa"],["makara_candi","serpent","snout","scale","Jawa"],["warak_ngendog","hybrid","snout","egg","Semarang"],["boraspati_tano","lizard","toes","scale","Batak"],["batara_kala","mask","brow","fang","Wayang"],["dewi_sri","human","rice","crown","Jawa/Sunda"],["nyi_roro_kidul","human","water","crown","Pesisir Selatan Jawa"],["putri_mandalika","human","textile","water","Lombok"],["jaka_tarub","human","cloth","sandal","Jawa"],["kebo_iwa","giant","fist","shoulder","Bali"],["bujang_ganong","mask","mask","hair","Ponorogo"],["ebu_gogo","ape","hair","arms","Flores"],["timun_mas","human","gourd","pouch","Jawa"],["nyai_blora","serpent","coil","hair","Jawa"],["hantu_banyu","spirit","water","cloak","Kalimantan"],["ular_naga","serpent","coil","crown","Nusantara"],["suanggi","spirit","cloak","shadow","Maluku"],["orang_pendek","ape","hair","arms","Sumatra"],["cindaku","tiger","stripes","tail","Kerinci"],["poppo","spirit","head","entrails","Sulawesi Selatan"],["parakang","spirit","shadow","claw","Sulawesi Selatan"],["bedawang_nala","turtle","shell","coil","Bali"],["naga_padoha","serpent","coil","scale","Batak Toba"],["nenek_pakande","spirit","elder","hair","Bugis"],["nawang_wulan","human","cloth","crown","Jawa"]];
const REBUILD=new Set(["hantu_jeruk_purut","macan_putih","timun_mas","nyai_blora","hantu_banyu","ular_naga","suanggi","orang_pendek","cindaku","nenek_pakande","nawang_wulan","orang_bati","lembuswana","naga_basuki","poppo","parakang","bedawang_nala","naga_padoha"]);
window.NUSAJIWA_MORPH40_IDS=Object.freeze(CATALOG.map(r=>r[0]));
window.NUSAJIWA_MORPH40_CATALOG=Object.freeze(CATALOG);
window.NUSAJIWA_MORPH40=function(group,body,M,id,phase,T,ell,tube){
 const entry=CATALOG.find(x=>x[0]===id);
 if(!entry||!group||!body||!M||!T)return false;
 const s=Math.min(7,Math.max(0,Math.floor(Number(phase)||0))),
  [_,family,f1,f2]=entry,root=new T.Group();root.name='nj90_'+id+'_stage_'+s;
 const tag=x=>id+'_'+s+'_'+x;
 const e=(n,x,y,z,a,b,c,m)=>{const q=ell(root,x,y,z,a,b,c,m);q.name=tag(n);return q};
 const t=(n,p,r,m)=>{const q=tube(root,p,r,m);q.name=tag(n);return q};
 const c=(n,x,y,z,r,h,m)=>{const q=new T.Mesh(new T.ConeGeometry(r,h,8),m);q.name=tag(n);
  q.position.set(x,y,z);root.add(q);return q};
 const pair=f=>{f(-1);f(1)};
 const wing=(n,bat)=>pair(d=>{
  const reach=.31+s*.17,shape=new T.Shape();
  shape.moveTo(0,0);shape.lineTo(d*reach,.33);shape.lineTo(d*reach*.76,-.27);
  shape.lineTo(d*reach*.53,-.09);shape.lineTo(d*.18,-.35);shape.closePath();
  const m=new T.Mesh(new T.ShapeGeometry(shape),bat?M.dark:M.main);
  m.position.set(0,1.50,-.17);m.name=tag(n+'-wing-web-'+d);root.add(m);
  t(n+'-wing-radius-'+d,[[0,1.5,-.16],[d*reach,1.83,-.15]],.026,M.gold);
  if(!bat)for(let j=0;j<3;j++)e(n+'-primary-feather-'+d+'-'+j,d*(reach*.55+j*.10),
    1.31-j*.07,-.10,.075,.23,.05,M.light);
 });
 const coil=n=>{
  const points=[];for(let i=0;i<=24;i++){const a=i/24*Math.PI*3.2;
   points.push([Math.sin(a)*(.27+s*.063),.32+i/24*.21,Math.cos(a)*(.34+s*.045)-.15]);}
  points.push([0,1.04,.39],[0,1.70,.65]);
  t(n+'-undulating-snake-backbone',points,.13,M.main);
 };
 const hair=(n,k)=>{for(let j=0;j<k;j++){const x=(j-(k-1)/2)*(.60/Math.max(1,k-1));
  t(n+'-hair-filament-'+j,[[x,2.21,-.1],[x*1.3,1.32,-.18],[x*1.6,.52-(j%3)*.1,-.20]],.025,M.black);}};
 const crown=n=>{for(let j=-2;j<=2;j++)c(n+'-crown-spike-'+j,j*.13,2.39-Math.abs(j)*.05,.28,
  .065,.25+(2-Math.abs(j))*.07,M.gold);};
 const scales=n=>{for(let j=0;j<Math.min(9,3+s);j++){const a=j*2.4;
  e(n+'-scale-'+j,Math.sin(a)*.49,.95+(j%4)*.19,Math.cos(a)*.30,.085,.057,.09,M.gold);}};
 const trail=n=>{for(let j=0;j<Math.min(7,2+s);j++){const x=(j-3)*.16;
  t(n+'-veil-fold-'+j,[[x,1.48,-.12],[x*1.4,.99,-.21],[x*1.8,.23,-.26]],.036,M.main);}};
 function feature(f){
 switch(f){
 case 'orb':e('fire-orb',0,1.39,.23,.32,.33,.30,M.glow);break;
 case 'flame':for(let j=0;j<Math.min(9,s+3);j++){const a=j*2.4;c('fire-tongue-'+j,
  Math.sin(a)*.34,1.39+Math.cos(a)*.32,.24,.09,.39,M.gold);}break;
 case 'head':e('disconnected-human-flying-head',0,1.87,.25,.36,.39,.27,M.light);break;
 case 'entrails':for(let j=0;j<Math.min(8,s+2);j++){const a=j*2.4;
  t('viscera-strand-'+j,[[Math.sin(a)*.14,1.5,.04],[Math.sin(a)*.28,.94,-.08],
  [Math.sin(a+.7)*.35,.35-(j%2)*.09,-.20]],.038,M.pink);}break;
 case 'rearhole':e('posterior-gown-rim',0,1.3,-.46,.13+s*.015,.19+s*.015,.025,M.dark);
  e('posterior-gown-void',0,1.3,-.50,.105+s*.013,.17+s*.013,.019,M.black);break;
 case 'hair':hair('character-long-hair',Math.min(10,s+3));break;
 case 'arms':pair(d=>t('long-bent-guardian-arm-'+d,
  [[d*.27,1.43,.09],[d*.49,.80,.18],[d*.39,.36,.30]],.078,M.main));break;
 case 'wing':wing('anatomical-flight-structure',family==='bat');break;
 case 'claw':pair(d=>{for(let j=0;j<3;j++)c('distinct-clawed-finger-'+d+'-'+j,
  d*(.29+j*.07),.52,.48,.047,.22,M.white);});break;
 case 'fang':pair(d=>c('forward-curving-fang-'+d,d*.25,1.47,.75,.083,.30,M.white));break;
 case 'tongue':t('long-rangda-tongue',[[0,1.66,.66],[0,1.23,.85],[.1,.66,.91]],.073,M.pink);break;
 case 'mane':for(let j=0;j<Math.min(9,s+3);j++){const a=j*2.4;
  e('barong-ornamental-fur-'+j,Math.sin(a)*.54,1.15+(j%4)*.21,Math.cos(a)*.38,.11,.23,.13,M.light);}break;
 case 'mask':e('puppet-performer-mask',0,1.86,.70,.39,.33,.23,M.gold);break;
 case 'headless':e('headless-clerical-collar',0,1.99,.12,.24,.1,.19,M.white);
  e('dark-neckline-recess',0,1.93,.20,.16,.035,.08,M.black);break;
 case 'cloak':e('shrouded-cloak-back',0,1.02,-.32,.52,.79,.20,M.dark);trail('cloak');break;
 case 'stripes':for(const z of [-.53,-.12,.31])pair(d=>t('tiger-side-stripe-'+z+'-'+d,
  [[d*.25,1.34,z-.17],[d*.5,1.14,z],[d*.46,1.00,z+.14]],.044,M.dark));break;
 case 'tail':t('curved-feline-or-simian-tail',[[0,1.08,-.64],[.34,1.24,-1.02],
    [.53,1.56,-1.34]],.12,M.main);break;
 case 'trunk':t('lembuswana-elephant-trunk',[[0,1.82,.64],[0,1.41,.92],[.13,1.00,1.03],
   [.19,.81,1.07]],.12,M.main);
   pair(d=>c('lembuswana-tusk-'+d,d*.29,1.27,.88,.078,.32,M.white));crown('kutai');break;
 case 'coil':coil('serpent-specific-coil');break;
 case 'water':pair(d=>t('water-current-'+d,[[d*.25,1.43,.36],[d*.52,1.1,.22],
  [d*.65,.42,.11]],.052,M.glow));break;
 case 'beak':e('jatayu-hooked-raptor-beak',0,1.81,.83,.19,.25,.32,M.gold);break;
 case 'muzzle':e('sembrani-long-horse-face',0,1.68,.88,.24,.23,.42,M.light);
   pair(d=>e('equine-ear-'+d,d*.19,2.17,.48,.11,.24,.13,M.main));break;
 case 'snout':t('makara-or-waraks-long-snout',[[0,1.63,.45],[0,1.26,.86],
  [.13,1.09,1.05]],.13,M.main);break;
 case 'scale':scales('carved-scale-pattern');break;
 case 'egg':e('ceremonial-ngendog-egg',.77,.40,.29,.16,.24,.15,M.white);break;
 case 'toes':pair(d=>{for(let j=0;j<4;j++)t('batak-gecko-foot-digits-'+d+'-'+j,
  [[d*.22,.73,.21],[d*.43,.47,.29],[d*(.56+j*.05),.29,.45]],.043,M.main);});break;
 case 'brow':e('wayang-kala-massive-brow',0,2.06,.47,.52,.18,.20,M.dark);break;
 case 'rice':for(let j=0;j<Math.min(8,s+3);j++){const y=.55+j*.19;
   t('rice-stem-'+j,[[.28,.33,-.01],[.49,y,.09],[.52,y+.17,.15]],.022,M.gold);
   e('paddy-grain-'+j,.53,y+.15,.15,.06,.1,.035,M.light);}break;
 case 'crown':crown('regional-headwear');break;
 case 'textile':e('sasak-tenun-front-cloth',0,.80,.37,.32,.61,.12,M.main);
  for(let j=0;j<5;j++)t('woven-ikat-stripe-'+j,[[(-.25+j*.12),1.20,.47],
   [(-.25+j*.12),.38,.47]],.018,M.gold);break;
 case 'cloth':pair(d=>t('human-selendang-fold-'+d,[[d*.22,1.48,.30],
   [d*.42,.92,.33],[d*.56,.28,.19]],.071,M.gold));break;
 case 'sandal':pair(d=>e('bare-human-sandal-'+d,d*.20,.15,.23,.15,.10,.22,M.dark));break;
 case 'fist':pair(d=>e('kebo-iwa-massive-fist-'+d,d*.75,.74,.21,.29,.32,.28,M.main));break;
 case 'shoulder':pair(d=>e('giant-wide-shoulder-'+d,d*.55,1.80,-.17,.36,.40,.27,M.main));break;
 case 'gourd':e('timun-mas-cucumber',.46,.72,.34,.14,.28,.17,M.main);break;
 case 'pouch':e('timun-mas-escape-pouch',-.43,.75,.30,.23,.25,.16,M.gold);break;
 case 'shadow':e('shapechanging-shadow-silhouette',.52,1.12,-.28,.25,.58,.10,M.glow);break;
 case 'shell':e('bedawang-cosmic-turtle-shell',0,1.16,-.28,.79,.36,.69,M.main);
  scales('cosmic-shell-scutes');break;
 case 'elder':e('elderly-bugis-human-face',0,1.82,.35,.31,.36,.26,M.light);
  e('older-jutting-chin',0,1.49,.62,.17,.17,.14,M.light);break;
 default:throw Error('missing detail cue '+f);
 }
 }
 const buildJuvenile=()=>{
  // Replace 18 stage-agnostic adult rigs during juvenile phases 1-4.
  // Prior phase-aware bespoke originals remain untouched throughout.

  switch(family){
  case 'bat':{
   // Orang Bati: start as a winged crouching humanoid, not a giant feathered bird.
   e('juvenile-seram-compact-humanoid',0,1.01,-.07,.19+s*.065,.35+s*.07,.25,M.main);
   e('juvenile-seram-short-faced-head',0,1.63,.22,.22+s*.035,.22,.23,M.light);
   pair(d=>{
     const r=.29+s*.26,shape=new T.Shape();
     shape.moveTo(d*.19,1.42);shape.lineTo(d*r,1.80+s*.09);
     shape.lineTo(d*(r+.15),1.25);shape.lineTo(d*(r*.57),1.02);shape.closePath();
     const w=new T.Mesh(new T.ShapeGeometry(shape),M.dark);
     w.position.set(0,0,-.11);w.name=tag('juvenile-seram-bat-membrane-'+d);root.add(w);
     t('membrane-finger-bone-'+d,[[d*.19,1.42,-.1],[d*r,1.80+s*.09,-.1]],.024,M.light);
     e('splayed-bat-foot-'+d,d*.18,.27,.18,.12,.21,.16,M.dark);
   });
   if(s>=3)pair(d=>c('growing-membrane-thumb-claw-'+d,d*(.38+s*.19),
     1.47,-.08,.052,.21,M.white));
   break;
  }
  case 'hybrid':{
   // Four legs + muzzle; the stage-gated wing and trunk ornaments come later.
   e('young-quadruped-chimera-chest',0,.92,-.11,.30+s*.06,.32+s*.055,.48+s*.06,M.main);
   e('young-hybrid-given-head',0,1.48,.51,.24+s*.035,.24,.29,M.light);
   pair(d=>{
    for(const z of [-.39,.37])e('distinct-ceremonial-fourleg-'+d+'-'+z,
      d*.30,.33,z,.11,.28,.14,M.dark);
   });
   if(s>=2)e('early-celebratory-collar',0,1.34,.16,.32,.11,.16,M.gold);
   if(s>=3)pair(d=>{
     e('new-shoulder-wing-muscle-'+d,d*.35,1.29,-.28,.20,.22,.14,M.main);
     t('first-structural-hybrid-feather-'+d,[[d*.35,1.36,-.28],
       [d*(.37+s*.12),1.83,-.30]],.053,M.gold);
   });
   break;
  }
  case 'turtle':{
   // Bedawang Nala is a cosmic turtle, not an ordinary humanoid.
   e('juvenile-cosmic-tortoise-shell',0,.80,-.16,.35+s*.065,.26+s*.039,.46+s*.05,M.dark);
   e('juvenile-wide-tortoise-head',0,.70,.58,.23+s*.026,.20,.25,M.main);
   pair(d=>{for(const z of [-.37,.31])e('supporting-tortoise-foot-'+d+'-'+z,
       d*.39,.25,z,.13,.23,.16,M.light);});
   if(s>=2)e('small-island-on-shell',0,1.10,-.22,.28+s*.038,.15,.32,M.gold);
   if(s>=3)pair(d=>t('individual-shell-seam-'+d,[[d*.18,1.14,-.43],
      [d*.32,1.16,-.18],[d*.22,1.14,.19]],.035,M.light));
   break;
  }
  case 'tiger':e('young-quad-body',0,.80,-.12,.40+.07*s,.38,.68,M.main);
    e('distinct-cat-head',0,1.22,.54,.30,.30,.31,M.light);
    pair(d=>{for(const z of [-.37,.37])e('young-tiger-paw-'+d+'-'+z,d*.32,.25,z,.14,.23,.18,M.main);});break;
  case 'serpent':coil('juvenile-reptile');
    e('rising-unwinged-naga-head',0,1.80,.78,.28,.23,.35,M.main);break;
  case 'human':e('juvenile-person-garment',0,1.00,0,.30,.59,.28,M.main);
    e('juvenile-person-head',0,1.76,.14,.29,.30,.24,M.light);
    pair(d=>t('juvenile-person-arm-'+d,[[d*.25,1.42,0],[d*.36,.88,.16],[d*.39,.54,.21]],.06,M.main));break;
  case 'ape':e('short-upright-body',0,1.02,-.03,.29,.46,.27,M.main);
    e('short-hominid-head',0,1.79,.15,.32,.33,.25,M.light);
    pair(d=>t('short-long-ape-arm-'+d,[[d*.28,1.4,.04],[d*.49,.79,.15],[d*.44,.38,.19]],.085,M.dark));break;
  case 'spirit':e('spectral-shoulderless-core',0,1.05,-.06,.29,.55,.20,M.dark);
    if(id!=='hantu_jeruk_purut')e('spectral-human-face',0,1.75,.17,.32,.36,.24,M.light);trail('early-spirit');break;
  }
 };
 if(s===0){
  const ring=new T.Mesh(new T.TorusGeometry(.18,.04,8,24),M.gold);
  ring.name=tag('species-egg-crest');ring.position.set(0,1.22,.64);root.add(ring);
  const serial=CATALOG.findIndex(x=>x[0]===id),n=4+serial%4;
  for(let i=0;i<n;i++){const a=i*6.283/n+serial*.22;
   e('relief-mark-'+i,Math.sin(a)*.19,1.23+Math.cos(a)*.16,.68,.028,.05,.026,M.dark);}
  if(['bird','bat','hybrid','horse'].includes(family))pair(d=>t('folded-egg-wing-'+d,
    [[d*.05,1.21,.7],[d*.23,1.42,.68],[d*.31,1.29,.67]],.03,M.main));
  if(family==='serpent')t('egg-serpent-symbol',[[0,1.07,.7],[.18,1.21,.72],[-.11,1.34,.74]],.035,M.main);
  group.add(root);
 }else{
  const reconstruct=REBUILD.has(id)&&s<=4;
  if(reconstruct)body.children.forEach(child=>child.visible=false);
  body.add(root);
  if(reconstruct)buildJuvenile();

  feature(f1);feature(f2);
  // Individual anatomical keys beyond family and the two baseline motifs.
  // These are geometry (not CSS filters, not scale-only). Characters used as
  // ceremonial objects remain objects rather than claimed biological beasts.
  if(id==='banaspati'){
    if(s>=3)pair(d=>c('isolated-ember-sculpt-'+d,d*.48,1.72,-.11,.10,.54,M.gold));
    if(s===7)e('legend-pyre-second-heart',0,1.63,-.23,.58,.78,.23,M.glow);
  }else if(id==='palasik'){
    t('minang-floating-black-hair-column',[[0,2.12,-.19],[.21,1.41,-.23],
      [.29,.78,-.32]],.057,M.black);
    if(s>=6)e('late-palasik-hair-root',0,2.18,-.12,.42,.21,.25,M.black);
  }else if(id==='sundel_bolong'){
    pair(d=>t('hanging-shroud-edge-'+d,[[d*.27,1.61,-.35],
      [d*.39,.92,-.49],[d*.42,.22,-.58]],.046,M.white));
    if(s===7)e('sundel-open-rear-gown-hem',0,.45,-.49,.48,.21,.18,M.white);
  }else if(id==='wewe'){
    pair(d=>t('wewe-embracing-hand-'+d,[[d*.31,1.54,-.05],
      [d*.70,1.10,.09],[d*.50,.50,.23]],.061,M.dark));
    if(s===7)e('wewe-sheltering-night-shawl',0,.98,-.39,.65,.83,.17,M.black);
  }else if(id==='kuyang'){
    t('kuyang-separate-organ-tail',[[0,1.46,.09],[-.23,.91,-.14],
      [-.46,.29,-.23]],.041,M.pink);
    if(s===7)e('kuyang-floating-dark-scalp',0,2.22,-.12,.51,.25,.25,M.black);
  }else if(id==='orang_bati'){
    pair(d=>t('independent-wing-finger-'+d,[[d*.18,1.47,-.14],
      [d*(.51+s*.16),1.88,-.19]],.040,M.dark));
    if(s===7)pair(d=>e('legend-leather-wing-shoulder-'+d,d*.54,1.44,-.26,.36,.47,.20,M.dark));
  }else if(id==='rangda'){
    t('rangda-ritual-extended-tongue',[[0,1.59,.76],[0,1.06,.87],
      [.12,.38,.88]],.071,M.pink);
    if(s>=6)pair(d=>c('rangda-mask-side-fang-'+d,d*.26,1.44,.71,.054,.35,M.white));
  }else if(id==='barong'){
    if(s>=2)for(let j=0;j<3+s;j++)e('barong-bushy-parade-tuft-'+j,
      Math.sin(j*2.4)*.49,1.44+(j%4)*.24,Math.cos(j*2.4)*.36,.11,.18,.13,M.main);
    if(s===7)e('barong-ceremonial-full-blanket',0,1.31,-.45,.77,.46,.27,M.dark);
  }else if(id==='hantu_jeruk_purut'){
    e('empty-head-neck-recess',0,1.80,.21,.21,.08,.13,M.black);
    pair(d=>t('distinct-urban-white-sleeve-'+d,[[d*.24,1.41,.17],
      [d*.42,.88,.25],[d*.48,.39,.21]],.072,M.white));
  }else if(id==='macan_putih'){
    pair(d=>{for(let j=0;j<4;j++)t('striped-white-guardian-flank-'+d+'-'+j,
      [[d*.23,1.31,-.59+j*.26],[d*.45,1.10,-.48+j*.26],
      [d*.37,1.01,-.40+j*.26]],.022,M.dark);});
    if(s===7)e('guardian-white-shoulder-fur',0,1.28,-.16,.72,.32,.49,M.white);
  }else if(id==='lembuswana'){
    t('kutai-guardian-elephant-trunk',[[0,1.65,.72],[0,1.22,1.02],
      [.18,.83,1.13]],.11,M.main);
    pair(d=>c('kutai-short-ivory-tusk-'+d,d*.27,1.29,.82,.055,.26,M.white));
    if(s===7)e('legend-huge-kutai-saddle-cloth',0,1.38,-.25,.78,.31,.38,M.gold);
  }else if(id==='naga_basuki'){
    pair(d=>t('balinese-basuki-water-crest-'+d,[[d*.17,1.94,.65],
      [d*.35,2.26,.58],[d*.31,2.57,.43]],.055,M.gold));
    if(s>=6)t('second-balinese-water-coil',[[-.84,.41,-.24],[-1.10,.89,-.43],
      [0,1.22,-.72],[1.14,.73,-.24]],.154,M.main);
  }else if(id==='garuda'){
    pair(d=>{for(let j=0;j<4;j++)t('garuda-independent-pinions-'+d+'-'+j,
       [[d*.25,1.42,-.22],[d*(.70+j*.16),1.96+j*.08,-.31],
       [d*(.89+j*.16),1.34-j*.05,-.30]],.059,M.gold);});
    if(s===7)e('garuda-heroic-chest-jewel',0,1.19,.42,.21,.28,.07,M.gold);
  }else if(id==='hanoman'){
    t('wayang-hanoman-simian-tail',[[0,.84,-.30],[.32,.96,-.73],
      [.54,1.53,-.93],[.33,1.85,-.90]],.085,M.white);
    if(s>=6)pair(d=>e('hanoman-gold-armband-'+d,d*.51,1.32,.12,.12,.17,.11,M.gold));
  }else if(id==='jatayu'){
    c('jatayu-hook-bill',0,1.71,.66,.12,.29,M.gold).rotation.x=.46;
    if(s>=6)pair(d=>t('jatayu-huge-last-feathers-'+d,[[d*.33,1.44,-.20],
      [d*1.19,2.16,-.24],[d*1.37,1.49,-.26]],.079,M.main));
  }else if(id==='sembrani'){
    t('sembrani-flowing-mane',[[0,1.97,.16],[0,1.78,-.19],
      [.19,1.16,-.42]],.068,M.gold);
    if(s>=6)pair(d=>t('winged-horse-longest-plumes-'+d,[[d*.21,1.34,-.23],
      [d*1.18,2.21,-.26],[d*1.40,1.81,-.28]],.062,M.white));
  }else if(id==='makara_candi'){
    t('candi-makara-ornamental-snout',[[0,1.51,.62],[0,1.14,1.03],
      [.17,1.47,1.22]],.12,M.main);
    if(s>=6)pair(d=>e('architectural-candi-makara-scroll-'+d,d*.59,1.48,-.30,.23,.44,.14,M.gold));
  }else if(id==='warak_ngendog'){
    e('dugderan-separate-festival-egg',.66,.39,.11,.18,.23,.17,M.white);
    if(s===7)pair(d=>e('warak-banner-side-'+d,d*.66,1.36,-.26,.23,.38,.14,M.gold));
  }else if(id==='boraspati_tano'){
    pair(d=>t('boraspati-house-guardian-spread-toes-'+d,
      [[d*.22,.78,.37],[d*.46,.34,.49],[d*.66,.14,.68]],.047,M.light));
    if(s>=6)e('batak-house-lizard-brow-relief',0,1.73,.45,.30,.11,.19,M.gold);
  }else if(id==='batara_kala'){
    e('kala-enormous-mouth-recess',0,1.55,.52,.41,.22,.15,M.dark);
    if(s>=6)pair(d=>c('kala-devouring-side-fang-'+d,d*.25,1.33,.74,.074,.33,M.white));
  }else if(id==='dewi_sri'){
    pair(d=>t('dewi-sri-grown-rice-cluster-'+d,[[d*.25,.43,.04],
      [d*.44,1.18,.17],[d*.61,1.99,.23]],.039,M.gold));
    if(s===7)e('abundant-rice-goddess-stole',0,1.44,-.22,.59,.17,.26,M.main);
  }else if(id==='nyi_roro_kidul'){
    pair(d=>t('southern-ocean-queen-scarf-'+d,[[d*.21,1.39,-.21],
      [d*.49,.88,-.41],[d*.71,.29,-.62]],.066,M.main));
    if(s===7)e('queen-ocean-horizon',0,.28,-.39,.79,.13,.43,M.glow);
  }else if(id==='putri_mandalika'){
    e('mandalika-sasak-twist-textile',0,.81,.30,.34,.43,.11,M.gold);
    if(s>=6)for(let j=0;j<4;j++)t('nyale-mandalika-sea-thread-'+j,
     [[0,.83,.0],[Math.sin(j*2.39)*.30,.38,-.32],[Math.sin(j*2.39)*.53,.14,-.43]],.037,M.light);
  }else if(id==='jaka_tarub'){
    e('javanese-country-headcloth',0,2.01,-.06,.31,.11,.27,M.dark);
    if(s===7)e('folk-hunter-staff',.57,1.05,.12,.06,1.03,.06,M.main);
  }else if(id==='kebo_iwa'){
    pair(d=>e('bali-kebo-iwa-massive-arm-fist-'+d,d*.73,.71,.18,.29,.29,.30,M.main));
    if(s===7)e('giant-earth-strong-back',0,1.38,-.52,.68,.49,.26,M.dark);
  }else if(id==='bujang_ganong'){
    e('reog-bujang-ganong-painted-red-mask',0,1.80,.60,.30,.29,.19,M.main);
    pair(d=>t('bujang-wide-dancer-hair-'+d,[[d*.19,2.06,-.12],
      [d*.45,1.64,-.28],[d*.67,1.14,-.32]],.061,M.black));
  }else if(id==='ebu_gogo'){
    e('ebu-gogo-flattened-wide-nose',0,1.64,.45,.18,.11,.14,M.dark);
    if(s>=6)for(let j=0;j<6;j++)e('flores-hominin-hair-'+j,
      Math.sin(j*2.39)*.29,1.15+(j%4)*.20,Math.cos(j*2.39)*.28,.05,.17,.06,M.dark);
  }else if(id==='timun_mas'){
    e('heroine-golden-cucumber',.47,.63,.22,.15,.30,.16,M.gold);
    if(s===7)for(let j=0;j<4;j++)e('fantasy-magic-cucumber-seed-'+j,
      .46+Math.sin(j*Math.PI/2)*.27,.53+Math.cos(j*Math.PI/2)*.25,.39,.055,.09,.035,M.gold);
  }else if(id==='nyai_blora'){
    e('serpent-woman-longface',0,1.82,.27,.26,.31,.19,M.light);
    if(s>=6)pair(d=>t('siluman-ular-loose-hair-'+d,
      [[d*.19,2.12,-.07],[d*.40,1.37,-.29],[d*.43,.74,-.32]],.059,M.black));
  }else if(id==='hantu_banyu'){
    pair(d=>t('borneo-river-phantom-waterfall-'+d,
      [[d*.22,1.48,-.17],[d*.49,.78,-.31],[d*.60,.12,-.48]],.091,M.glow));
    if(s===7)e('hantu-banyu-river-current-back',0,.72,-.43,.70,.55,.14,M.main);
  }else if(id==='ular_naga'){
    pair(d=>t('taksaka-naga-side-whisker-'+d,[[d*.18,1.65,.90],
      [d*.39,1.51,1.13],[d*.65,1.50,1.31]],.046,M.gold));
    if(s===7)e('taksaka-jade-forehead',0,2.10,1.01,.12,.14,.075,M.gold);
  }else if(id==='suanggi'){
    e('eastern-suanggi-changing-shadow-mouth',0,1.54,.41,.22,.18,.16,M.dark);
    if(s>=6)pair(d=>t('regional-suanggi-shadow-fingers-'+d,
      [[d*.24,1.49,-.10],[d*.50,.70,-.31],[d*.73,.24,-.41]],.076,M.dark));
  }else if(id==='orang_pendek'){
    e('sumatran-orang-pendek-flat-broad-nose',0,1.61,.40,.25,.12,.13,M.light);
    if(s>=6)pair(d=>t('orang-pendek-forest-forearm-'+d,
      [[d*.24,1.40,-.10],[d*.43,.76,.18],[d*.56,.21,.23]],.121,M.dark));
  }else if(id==='cindaku'){
    if(s>=3)e('cindaku-hybrid-hunchback',0,1.41,-.31,.52,.34,.28,M.main);
    if(s===7)t('kerinci-cindaku-spirit-tiger-tail',[[0,1.08,-.72],
      [.48,1.48,-1.22],[.21,1.89,-1.43]],.151,M.main);
  }else if(id==='poppo'){
    e('poppo-detached-head-high',0,1.91,.28,.31,.32,.25,M.main);
    if(s>=6)t('flying-poppo-hair-stream',[[0,2.11,-.10],
      [.41,1.52,-.30],[.61,.81,-.43]],.074,M.black);
  }else if(id==='parakang'){
    pair(d=>t('parakang-shapeshift-arm-'+d,[[d*.23,1.43,-.03],
      [d*.47,.86,-.28],[d*.64,.27,.13]],.064,M.dark));
    if(s===7)e('parakang-multi-shadow-veil',0,.85,-.42,.69,.69,.08,M.glow);
  }else if(id==='bedawang_nala'){
    for(let j=0;j<5;j++)e('bedawang-distinct-continental-scute-'+j,
      Math.sin(j*1.257)*.38,1.29,Math.cos(j*1.257)*.31,.16,.07,.16,M.gold);
    if(s===7)e('bedawang-island-platform',0,1.56,-.22,.63,.17,.49,M.gold);
  }else if(id==='naga_padoha'){
    t('batak-primordial-underworld-scroll',[[-.74,.44,-.31],[-1.03,.70,-.45],
      [0,1.07,-.68],[.90,.74,-.19]],.135,M.dark);
    if(s===7)e('cosmic-padoha-earth-stone',0,.29,-.37,.83,.12,.49,M.gold);
  }else if(id==='nenek_pakande'){
    e('bugis-elder-ogress-jaw',0,1.48,.55,.27,.23,.17,M.light);
    if(s>=6)pair(d=>t('nenek-pakande-straggly-grey-hair-'+d,
     [[d*.22,2.15,-.13],[d*.48,1.39,-.21],[d*.52,.75,-.34]],.061,M.white));
  }else if(id==='nawang_wulan'){
    pair(d=>t('nawang-wulan-lifted-selendang-'+d,[[d*.19,1.42,-.18],
      [d*.63,1.55,-.36],[d*(.77+s*.05),1.07,-.54]],.064,M.gold));
    if(s===7)e('nawang-wulan-celestial-robe',0,.78,-.46,.72,.64,.18,M.light);
  }
  // Anatomically different development at EVERY phase; not only material or scaling.
  if(s===1){e('infant-neck-fold',0,1.49,.16,.24,.13,.15,M.light);}
  if(s===2)pair(d=>e('emerging-scapular-joint-'+d,d*.31,1.34,.05,.14,.21,.16,M.main));
  if(s===3)pair(d=>t('developing-independent-limb-'+d,
   [[d*.29,1.44,.04],[d*.48,.91,.09],[d*.54,.58,.20]],.07,M.main));
  if(s===4){e('adolescent-wide-back-contour',0,1.27,-.39,.54,.41,.21,M.main);
   if(['bird','bat','horse','hybrid'].includes(family))wing('adolescent-wing',family==='bat');}
  if(s===5)e('adult-native-rig-accent',0,1.55,-.20,.39,.13,.26,M.gold);
  if(s===6){scales('older-secondary-bony-growth');
   pair(d=>t('older-extended-arm-'+d,[[d*.42,1.35,-.08],[d*.67,.87,-.11],[d*.77,.48,-.13]],.073,M.main));}
  if(s===7){if(['bird','bat','horse','hybrid'].includes(family))wing('legend-expanded-wing',family==='bat');
   else if(['serpent','turtle','lizard'].includes(family))coil('legend-secondary-expanded-coil');
   else if(['tiger','ape','giant','beast'].includes(family))pair(d=>e('legend-massive-guardian-forearm-'+d,
       d*.75,1.15,-.16,.36,.61,.25,M.main));
   else {e('legend-expanded-shroud',0,1.08,-.46,.79,.86,.19,M.main);trail('legend-trailed-veil');}
   c('legend-tall-crest',0,2.60,-.11,.17,.52,M.gold);}
 }
 root.userData={identity:id,phase:s,region:entry[4],fantasyLifecycle:true,
  stagePolicy:s===0?'symbol-egg':s<=4&&REBUILD.has(id)?'specific-juvenile-reconstruction':'native-sculpt-preserved-and-refined'};
 body.userData.nj90={id,phase:s,retainNative:s>=5};
 return true;
};
})();