/* NUSAJIWA NJ90–NJ93. Forty verified catalogue IDs / eight fantasy game stages.
 * Folklore does not claim real eggs, aging or evolution for these figures.
 * Native sculpture remains in every mature phase; save schema is unchanged. */
(function(){
'use strict';
if(window.NUSAJIWA_MORPH40)return;
const CATALOG=[["banaspati","fire","orb","flame","Jawa"],["palasik","spirit","head","entrails","Minangkabau"],["sundel_bolong","spirit","rearhole","hair","Jawa"],["wewe","spirit","hair","arms","Jawa"],["kuyang","spirit","head","entrails","Kalimantan"],["orang_bati","bat","wing","claw","Seram"],["rangda","mask","fang","tongue","Bali"],["barong","beast","mane","mask","Bali"],["hantu_jeruk_purut","spirit","headless","cloak","Jakarta"],["macan_putih","tiger","stripes","tail","Jawa"],["lembuswana","hybrid","trunk","wing","Kutai"],["naga_basuki","serpent","coil","water","Bali"],["garuda","bird","wing","claw","Nusantara"],["hanoman","ape","tail","crown","Wayang"],["jatayu","bird","beak","wing","Wayang"],["sembrani","horse","muzzle","wing","Jawa"],["makara_candi","serpent","snout","scale","Jawa"],["warak_ngendog","hybrid","snout","egg","Semarang"],["boraspati_tano","lizard","toes","scale","Batak"],["batara_kala","mask","brow","fang","Wayang"],["dewi_sri","human","rice","crown","Jawa/Sunda"],["nyi_roro_kidul","human","water","crown","Pesisir Selatan Jawa"],["putri_mandalika","human","textile","water","Lombok"],["jaka_tarub","human","cloth","sandal","Jawa"],["kebo_iwa","giant","fist","shoulder","Bali"],["bujang_ganong","mask","mask","hair","Ponorogo"],["ebu_gogo","ape","hair","arms","Flores"],["timun_mas","human","gourd","pouch","Jawa"],["nyai_blora","serpent","coil","hair","Jawa"],["hantu_banyu","spirit","water","cloak","Kalimantan"],["ular_naga","serpent","coil","crown","Nusantara"],["suanggi","spirit","cloak","shadow","Maluku"],["orang_pendek","ape","hair","arms","Sumatra"],["cindaku","tiger","stripes","tail","Kerinci"],["poppo","spirit","head","entrails","Sulawesi Selatan"],["parakang","spirit","shadow","claw","Sulawesi Selatan"],["bedawang_nala","turtle","shell","coil","Bali"],["naga_padoha","serpent","coil","scale","Batak Toba"],["nenek_pakande","spirit","elder","hair","Bugis"],["nawang_wulan","human","cloth","crown","Jawa"]];
const REBUILD=new Set(["hantu_jeruk_purut","macan_putih","timun_mas","nyai_blora","hantu_banyu","ular_naga","suanggi","orang_pendek","cindaku","nenek_pakande","nawang_wulan"]);
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
  // Replaces generic geometry ONLY for the 11 never-bespoke juveniles.
  switch(family){
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