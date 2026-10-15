/* NUSAJIWA NJ120 — Fauna aquatica, five original 3D sculpt rigs × 8 stages.
 * Five morphologies are unlike one another and sourced to wildlife authorities:
 * Carettochelys insculpta leather-backed, pig-snouted turtle with clawed paddles;
 * Mola mola vertically compressed disk with dorsal/anal fins and NO caudal tail;
 * Rhincodon typus giant filter-feeder shark with white spots/ridges/crescent tail;
 * Hippocampus bargibanti gorgonian-clinging, knobbly tiny curled seahorse;
 * Mobula alfredi diamond-shaped reef manta, Y shoulders and feeding head-lobes.
 * Mammalian-style fantasy "Legend" effects are GAME ONLY; save IDs unchanged.
 */
(function(){
'use strict';
if(window.NUSAJIWA_SCULPT120)return;
const IDS=['labi_moncong_babi_papua','mola_mola','hiu_paus','kuda_laut_kerdil','pari_manta'];
const META={
 labi_moncong_babi_papua:{latin:'Carettochelys insculpta',source:'https://www.dcceew.gov.au/environment/biodiversity/threatened/nominations/ineligible-species/carettochelys-insculpta'},
 mola_mola:{latin:'Mola mola',source:'https://ocean.si.edu/ocean-life/fish/mola-mola-oceans-gentle-giant'},
 hiu_paus:{latin:'Rhincodon typus',source:'https://www.fisheries.noaa.gov/new-england-mid-atlantic/atlantic-highly-migratory-species/shark-identification-cooperative-shark-0'},
 kuda_laut_kerdil:{latin:'Hippocampus bargibanti',source:'https://australian.museum/learn/animals/fishes/pygmy-seahorse-hippocampus-bargibanti-whitley-1970/'},
 pari_manta:{latin:'Mobula alfredi',source:'https://www.mantatrust.org/what-are-mobulids'}
};
window.NUSAJIWA_SCULPT120_IDS=Object.freeze(IDS.slice());
window.NUSAJIWA_SCULPT120_META=Object.freeze(META);
window.NUSAJIWA_SCULPT120=function(group,body,M,id,phase,T,ell,tube){
 if(!IDS.includes(id)||!group||!body||!M||!T||!ell||!tube)return false;
 const s=Math.min(7,Math.max(0,Math.floor(Number(phase)||0)));
 const host=s===0?group:body;
 if(s===0){for(const prev of group.children)prev.visible=false;}
 else for(const prev of body.children)prev.visible=false;
 const rig=new T.Group();rig.name='NJ120_'+id+'_F'+s;host.add(rig);
 const p=n=>id+'-F'+s+'-'+n,pair=f=>{f(-1);f(1)};
 const E=(n,x,y,z,a,b,c,m)=>{const q=ell(rig,x,y,z,a,b,c,m);q.name=p(n);return q};
 const L=(n,points,r,m)=>{const q=tube(rig,points,r,m);q.name=p(n);return q};
 const K=(n,x,y,z,r,h,m,rx=0,rz=0)=>{
  const q=new T.Mesh(new T.ConeGeometry(r,h,9),m);
  q.name=p(n);q.position.set(x,y,z);q.rotation.x=rx;q.rotation.z=rz;rig.add(q);return q;
 };
 const F=(n,xy,m,depth=.09)=>{
  const sh=new T.Shape();sh.moveTo(...xy[0]);for(const vertex of xy.slice(1))sh.lineTo(...vertex);sh.closePath();
  const q=new T.Mesh(new T.ExtrudeGeometry(sh,{depth,bevelEnabled:true,bevelThickness:.011,
   bevelSize:.014,bevelSegments:1,steps:1}),m);q.name=p(n);rig.add(q);return q;
 };
 const surface=(n,points,faces,m)=>{
  const geo=new T.BufferGeometry();
  geo.setAttribute('position',new T.Float32BufferAttribute(points.flat(),3));
  geo.setIndex(faces.flat());geo.computeVertexNormals();
  const q=new T.Mesh(geo,m);q.name=p(n);rig.add(q);return q;
 };
 const g=[0,.49,.61,.76,.91,1.02,1.13,1.24][s];
 if(s===0){
  E('biological-egg-with-species-science-glyph',0,1.16,0,.46+IDS.indexOf(id)*.023,.77,.45,M.main);
  for(let j=0;j<7;j++)E('natural-ovum-mark-'+j,(j-3)*.081,1.12+(j%3)*.13,.43,.037,.048,.020,j%2?M.gold:M.dark);
  if(id==='mola_mola')K('tiny-disc-ovum-mark',0,1.64,.41,.11,.24,M.gold);
  if(id==='hiu_paus')pair(d=>L('paired-shark-chequer-glyph-'+d,[[d*.23,1.49,.33],[d*.25,1.19,.42],[d*.14,.85,.32]],.028,M.white));
  if(id==='pari_manta')pair(d=>L('manta-wing-ovum-glyph-'+d,[[0,1.32,.48],[d*.24,1.46,.43],[d*.31,1.17,.34]],.032,M.gold));
  if(id==='kuda_laut_kerdil')L('pigmy-curled-tail-egg-glyph',[[0,1.42,.43],[.13,1.20,.48],[.09,1.05,.43],[-.06,1.08,.42]],.032,M.gold);
  if(id==='labi_moncong_babi_papua')pair(d=>E('two-flippers-shell-relief-'+d,d*.28,1.19,.39,.11,.05,.023,M.gold));
  rig.userData={id,phase:s,source:META[id].source,sculpted:true};
  return true;
 }
 if(id==='labi_moncong_babi_papua'){
  // Real pig-nosed freshwater turtle: NO hard scutes or tortoise-type legs.
  const width=.31+.20*g,len=.35+.22*g;
  E('whole-smooth-leather-shell-no-scutes',0,.88,-.17,width,.22,len,M.main);
  E('pale-soft-shell-plastron',0,.67,-.14,width*.88,.14,len*.91,M.light);
  E('broad-low-freshwater-turtle-head',0,.79,.39,.22+.045*g,.19,.26,M.main);
  E('long-soft-tubular-pig-snout',0,.78,.66,.10,.095,.24,M.light);
  E('round-snout-tip-two-nostrils',0,.77,.85,.14,.085,.07,M.main);
  pair(d=>{
   E('nostril-at-end-of-fleshy-snout-'+d,d*.076,.79,.91,.025,.021,.016,M.dark);
   E('round-side-pig-turtle-eye-'+d,d*.19,.88,.59,.05,.063,.03,M.eye);
   for(const [i,z] of [[0,.17],[1,-.48]]){
    L('long-water-paddle-flipper-bone-'+d+'-'+i,
     [[d*(width*.77),.72,z],[d*(width+.15),.54,z+.10],
      [d*(width+.37),.40,z+.29]],.075,M.main);
    E('oval-soft-webbed-swimming-paddle-'+d+'-'+i,
      d*(width+.24),.48,z+.21,.23,.057,.34,M.main);
    for(let k=0;k<2;k++)K('exactly-two-clawed-flipper-'+d+'-'+i+'-'+k,
      d*(width+.24+(k-.5)*.15),.45,z+.46,.039,.16,M.white,Math.PI/2);
   }
  });
  const pits=5+s*2;
  for(let j=0;j<pits;j++){
   const a=j*2*Math.PI/pits;
   E('leathery-shell-micro-pit-'+j,Math.cos(a)*width*.71,1.08,
     -.17+Math.sin(a)*len*.74,.044,.019,.044,M.dark);
  }
  if(s<=2){
   L('young-shallow-shell-dorsal-keel',[[0,1.10,-.17-len*.78],
    [0,1.12,-.17],[0,1.06,-.17+len*.74]],.022,M.light);
   for(let j=-2;j<=2;j++)K('juvenile-marginal-scallop-'+j,j*width*.31,
    .91,-.17-len*.87,.035,.10,M.dark);
  }
  if(s>=4)pair(d=>L('adult-smooth-shell-edge-'+d,[[d*width*.84,.76,-.17-len*.74],
    [d*width*.95,.72,-.17],[d*width*.84,.76,-.17+len*.78]],.024,M.dark));
  if(s===6)pair(d=>E('aged-flipper-fold-'+d,d*(width+.30),.48,.41,.13,.033,.12,M.light));
  if(s===7)pair(d=>L('fictional-guardian-river-current-'+d,[[d*.24,.49,-.41],
    [d*.68,.76,-.53],[d*.91,1.00,-.61]],.043,M.gold));
 }
 else if(id==='mola_mola'){
  // Body is an almost vertical disk, with a CLAVUS rather than a tail fin.
  const r=.41+.22*g,y=1.17,high=.45+.30*g;
  F('deep-ovate-vertical-ocean-sunfish-disk',[[-r*.98,y-.44*high],
    [-r*1.16,y+.12*high],[-r*.77,y+.76*high],[-r*.20,y+high],
    [r*.49,y+.88*high],[r*.81,y+.56*high],[r*.85,y-.58*high],
    [r*.21,y-high],[-r*.48,y-.85*high]],M.main,.15);
  E('sunfish-silver-belly-on-disc',-r*.31,y-.22,.17,r*.29,high*.37,.040,M.light);
  E('large-upturned-sunfish-eye',-r*.84,y+.21,.20,.067,.072,.048,M.eye);
  E('tiny-fused-parrot-beak-mouth',-r*1.12,y-.12,.11,.064,.050,.052,M.dark);
  F('very-tall-sunfish-dorsal-propulsion-fin',[[0,y+high*.80],[r*.24,y+high+.30+.19*g],
    [r*.56,y+high+.35+.19*g],[r*.64,y+high*.80]],M.dark,.09);
  F('tall-opposed-anal-propulsion-fin',[[0,y-high*.84],
    [r*.25,y-high-.28-.19*g],[r*.57,y-high-.32-.19*g],[r*.65,y-high*.79]],M.dark,.09);
  F('true-clavus-rudder-not-caudal-tail',[[r*.76,y+high*.64],
    [r*1.16,y+high*.61],[r*1.24,y],[r*1.15,y-high*.60],
    [r*.76,y-high*.64]],M.light,.095);
  E('very-small-sunfish-pectoral-fin',-r*.12,y+.04,.25,.11,.08,.16,M.light);
  E('small-round-gill-opening',-r*.31,y-.07,.26,.026,.039,.024,M.dark);
  for(let i=0;i<4+s;i++){
   const t=i/(3+s);
   E('clavus-individual-rounded-lobe-'+i,r*1.12,y+(-.54+t*1.09)*high,
     .10,.062,.050,.041,M.dark);
  }
  if(s<=2)for(let j=0;j<8;j++){
   const a=j*2*Math.PI/8;
   K('juvenile-spiny-sunfish-tubercle-'+j,Math.cos(a)*r*.81,
     y+Math.sin(a)*high*.91,.12,.033,.13,M.light,0,Math.cos(a)*.55);
  }
  if(s>=3)for(let j=0;j<5+s;j++){
   const a=j*2*Math.PI/(5+s);
   E('adult-rubbery-unscaled-skin-bump-'+j,Math.cos(a)*r*.62,
     y+Math.sin(a)*high*.57,.185,.033,.026,.027,M.dark);
  }
  if(s>=5)for(let j=0;j<4;j++){
   L('dorsal-fin-ray-'+j,[[r*.20,y+high*.86,.11],
    [r*(.23+j*.095),y+high+.30,.11]],.013,M.light);
   L('anal-fin-ray-'+j,[[r*.20,y-high*.86,.11],
    [r*(.23+j*.092),y-high-.28,.11]],.013,M.light);
  }
  if(s===7)pair(d=>L('fictional-legend-sunfish-current-'+d,
   [[r*.32,y+d*high*.65,-.09],[r*.68,y+d*(high+.36),-.22],
    [r*1.07,y+d*(high+.49),-.32]],.036,M.gold));
 }
 else if(id==='hiu_paus'){
  // Whale shark: flat broad head, terminal mouth and spotted grid, NO teeth smile.
  const length=.66+.40*g,width=.32+.11*g;
  E('great-plankton-filtering-shark-barrel',0,.98,-.18,width,.29,length,M.dark);
  E('extremely-broad-flat-whale-shark-head',0,1.01,.54,.34+.07*g,.19,.40,M.main);
  E('flat-broad-terminal-mouth',0,.93,.89,.35+.035*g,.045,.055,M.dark);
  pair(d=>{
   E('tiny-eye-near-mouth-corner-'+d,d*.33,1.05,.74,.037,.043,.022,M.eye);
   // Five large gill-slits, just behind the skull.
   for(let j=0;j<5;j++)L('five-gill-slits-'+d+'-'+j,
    [[d*width*.88,1.18,.35-j*.073],
     [d*width*.91,.90,.32-j*.074]],.018,M.light);
   for(let i=0;i<3;i++)L('shark-three-body-ridges-'+d+'-'+i,
    [[d*(.22+.040*i),1.22,-.13],
     [d*(.23+.045*i),1.17,-.55],
     [d*(.20+.030*i),1.12,-length*.90]],.025,M.main);
   L('huge-paired-whale-shark-pectoral-'+d,[[d*.23,.94,.11],
    [d*(.48+.27*g),.74,-.12],[d*(.77+.26*g),.68,-.29]],.095,M.main);
   E('flattened-pectoral-fin-web-'+d,d*(.52+.12*g),.77,-.19,
    .28,.051,.34,M.main);
  });
  K('prominent-shark-first-dorsal-fin',0,1.43,-.36,.16,.36,M.main);
  K('small-second-dorsal-fin',0,1.26,-length*.78,.093,.16,M.main);
  L('caudal-peduncle-rear',[[0,1.00,-length*.88],
    [0,1.00,-length- .35]],.091,M.dark);
  // Opposed unequal lobes; correctly DIFFERENT from mola clavus.
  L('large-lunate-caudal-tail-upper',[[0,1,-length-.29],
    [0,1.20,-length-.53],[0,1.46,-length-.68]],.083,M.main);
  L('short-lunate-caudal-tail-lower',[[0,1,-length-.32],
    [0,.80,-length-.47],[0,.68,-length-.55]],.070,M.main);
  const cols=4+s,lines=4+Math.floor(s/2);
  for(let row=0;row<lines;row++)for(let col=0;col<cols;col++){
   const z=.35-row*(length*1.30)/lines;
   const xx=(col-(cols-1)/2)*width*1.6/cols;
   E('individual-white-checkerboard-spot-'+row+'-'+col,
    xx,1.24+(col%2)*.012,z,.028,.022,.033,M.white);
  }
  for(let i=0;i<4;i++)L('whale-shark-crosswise-broken-line-'+i,
    [[-width*.70,1.245,.10-i*.26],
      [0,1.26,.10-i*.26],[width*.70,1.245,.10-i*.26]],.014,M.light);
  if(s>=5)pair(d=>E('adult-deeply-folded-fin-shoulder-'+d,d*.28,1.02,-.12,
    .15,.13,.22,M.main));
  if(s===7)pair(d=>L('fictional-legend-whale-shark-streamline-'+d,
   [[d*.38,1.11,-.19],[d*.70,1.37,-.53],[d*.95,1.52,-.72]],.043,M.gold));
 }
 else if(id==='kuda_laut_kerdil'){
  // Pygmy seahorse: short snout, bulbous body tubercles, prehensile tail,
  // rounded coronet, and species-appropriate gorgonian attachment.
  const center=1.25,headY=1.72+.13*g;
  E('pygmy-round-robust-seahorse-trunk',0,center,-.03,.23+.04*g,.40+.04*g,.22,M.main);
  E('tiny-seahorse-back-curvature',-.16,1.34,-.15,.10,.33,.13,M.dark);
  L('elongated-ventral-pygmy-neck',[[0,1.47,.12],
    [0,1.66,.19],[.08,headY-.10,.25]],.105,M.main);
  E('short-blunt-seahorse-face',.08,headY,.20,.15,.16,.14,M.main);
  L('very-short-pygmy-tubular-snout',[[.12,headY-.06,.28],
    [.20,headY-.07,.37]],.041,M.light);
  E('tiny-protruding-seahorse-eye',.17,headY+.035,.29,.032,.037,.025,M.eye);
  E('rounded-bumpy-pygmy-coronet',.04,headY+.17,.15,.11,.085,.086,M.gold);
  // Adult seahorse prehensile tail coils completely back on itself.
  L('tight-prehensile-curled-tail',[[0,.95,-.06],[.19,.80,-.12],
    [.27,.62,-.06],[.12,.47,.06],[-.02,.54,.12],
    [.04,.68,.09]],.070,M.main);
  const tcount=7+s*3;
  for(let j=0;j<tcount;j++){
   const a=j*2.4;
   E('individual-camouflage-bulbous-tubercle-'+j,
    Math.sin(a)*.22,1.14+(j%7)*.091,
    Math.cos(a)*.16,.062,.065,.063,j%3?M.gold:M.light);
  }
  for(let j=0;j<3+s;j++)K('reduced-spine-became-tubercle-'+j,
    -.15,1.02+j*.09,-.16,.038,.080,M.light,0,-.10);
  E('minute-dorsal-fin',-.15,1.35,-.18,.060,.12,.027,M.dark);
  if(s>=3){
   // Coral is a detachable world prop-like perch, deliberately smaller than animal.
   L('gorgonian-perch-stalk',[[.20,.13,-.31],[.27,.42,-.35],
    [.17,.72,-.26]],.033,M.dark);
   for(let j=-2;j<=2;j++)L('branched-gorgonian-support-'+j,
    [[.23,.36,-.34],[.23+j*.086,.51,-.38],
     [.28+j*.11,.70+(j%2)*.065,-.39]],.016,M.gold);
  }
  if(s>=5)E('mature-male-trunk-brooding-panel',0,1.04,.18,.14,.17,.045,M.light);
  if(s===7)pair(d=>L('fictional-coral-guardian-whorl-'+d,
   [[d*.18,1.39,-.15],[d*.43,1.61,-.22],
    [d*.49,1.92,-.31]],.033,M.gold));
 }
 else if(id==='pari_manta'){
  // Reef manta Mobula alfredi, actual wing SURFACES on XZ plane.
  // Three pairs of appendages: pectoral wings, paired cephalic lobes, pelvic.
  const span=.55+.42*g;
  E('reef-manta-flattened-central-diamond',0,1.10,0,.35,.085,.53,M.dark);
  pair(d=>{
   surface('true-three-dimensional-diamond-wing-'+d,[
    [d*.15,1.12,.47],[d*.38,1.15,.27],
    [d*span,1.10,-.10],[d*.70,1.05,-.33],
    [d*.33,1.09,-.47]
   ],[[0,1,2],[0,2,3],[0,3,4]],M.main);
   L('manta-long-wing-leading-edge-'+d,[[d*.15,1.13,.45],
    [d*.45,1.16,.20],[d*span,1.10,-.10]],.043,M.dark);
   // Mouth-channel cephalic lobes differ from stingray horn fantasies.
   L('feeding-rolled-cephalic-head-lobe-'+d,[[d*.19,1.12,.48],
    [d*.27,1.13,.68],[d*.29,1.11,.79]],.067,M.main);
   E('laterally-set-reef-manta-eye-'+d,d*.27,1.14,.44,.048,.043,.047,M.eye);
   // Five underside gill slits on each side, away from dorsal shoulder Y mark.
   for(let j=0;j<5;j++)L('five-ventral-gill-openings-'+d+'-'+j,
    [[d*.13,1.02,.14-j*.11],[d*.26,1.02,.12-j*.11]],.015,M.light);
   for(let j=0;j<4+s;j++){
    const t=j/(4+s);
    E('underside-manta-individual-spots-'+d+'-'+j,
     d*(.15+t*.28),1.01,-.14-(j%4)*.076,.027,.020,.034,M.white);
   }
   L('characteristic-Y-shaped-reef-manta-shoulder-'+d,[[0,1.22,.24],
    [d*.21,1.22,.08],[d*.45,1.18,-.03]],.036,M.white);
  });
  E('broad-open-filter-feeding-terminal-mouth',0,1.11,.55,.17,.033,.04,M.dark);
  L('slender-nonstinging-reef-manta-tail',[[0,1.07,-.47],
   [0,1.06,-.76],[.06,1.04,-1.11-.22*g]],.035,M.dark);
  E('small-reef-manta-dorsal-fin',0,1.18,-.47,.08,.115,.12,M.main);
  if(s<=2)pair(d=>E('developing-small-juvenile-wingtip-'+d,d*span,1.11,-.08,
    .085,.045,.075,M.main));
  if(s>=5)pair(d=>L('adult-swept-back-lateral-pectoral-ray-'+d,[[d*.19,1.10,-.04],
    [d*.50,1.10,-.23],[d*.68,1.08,-.31]],.026,M.light));
  if(s===7)pair(d=>L('fictional-legend-reef-wave-'+d,[[d*.24,1.10,.16],
   [d*(span+.19),1.32,-.18],[d*(span+.30),1.48,-.43]],.039,M.gold));
 }
 // Physically different stage accessory topology — no scale-only replacements.
 if(s===1)E('infant-subtle-morph-seal',0,.12,-.43,.065,.042,.055,M.light);
 if(s===2)pair(d=>E('juvenile-independent-morph-mark-'+d,d*.15,.23,-.45,.064,.071,.059,M.light));
 if(s===3)L('young-structural-articulation',[[-.13,.35,-.47],[0,.28,-.49],
  [.13,.35,-.47]],.024,M.dark);
 if(s===4)pair(d=>L('adolescent-appendage-mark-'+d,[[d*.16,.40,-.48],
  [d*.34,.31,-.55]],.030,M.gold));
 if(s===5)E('mature-morph-sign',0,.16,-.47,.14,.043,.059,M.dark);
 if(s===6)pair(d=>E('aged-anatomy-crease-'+d,d*.12,.23,-.47,.077,.060,.059,M.light));
 if(s===7)pair(d=>L('game-fiction-legend-trace-'+d,[[d*.17,.29,-.48],
  [d*.37,.53,-.52],[d*.53,.81,-.65]],.038,M.gold));
 rig.userData={id,phase:s,latin:META[id].latin,source:META[id].source,
  geometry:'species-specific-NJ120',adultBiologyRespected:true,
  fantasyEvolution:s===7,saveUnchanged:true};
 body.userData.NJ120={id,phase:s,oldMeshesHidden:true};
 return true;
};
})();