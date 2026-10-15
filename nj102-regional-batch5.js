/* NJ102 · Batch 05 · Four source-informed tradition/legend 3D rebuilds.
 * Unique morphological rigs replace all former visible parts for target IDs.
 * Egg, youth-to-Legend phases are FICTIONAL Tamagotchi mechanics, never a
 * claim that ceremonial masks, architectural carvings or legends reproduce.
 * See published notes and attributed metadata for each identity. */
(function(){
'use strict';
if(window.NUSAJIWA_SCULPT102)return;
const IDS=['bujang_ganong','warak_ngendog','boraspati_tano','kebo_iwa'];
const META={
 bujang_ganong:{region:'Reog Ponorogo, Jawa Timur',description:'lively dancer in giant-nosed red comic mask; large eyes, horsehair, acrobatic posture',source:'https://ponorogo.go.id/pemain-reog/'},
 warak_ngendog:{region:'Dugderan, Semarang',description:'four-legged dragon-head Buraq-goat composite, colourful curly wool and symbolic egg',source:'https://semarang.pom.go.id/berita/warak-quiz-adopsi-mainan-khas-semarang'},
 boraspati_tano:{region:'Batak Toba/Sumatra Utara',description:'flat protective tokay-gecko earth deity motif carved on Batak architecture',source:'https://indonesiamuseum.org/en/articles/carved-batak-wood-betel-lime-container'},
 kebo_iwa:{region:'Bali',description:'very large human builder/hero capable of digging giant wells, never buffalo monster',source:'https://repo.undiksha.ac.id/7263/9/1712021181-LAMPIRAN.pdf'}
};
window.NUSAJIWA_SCULPT102_IDS=Object.freeze(IDS.slice());
window.NUSAJIWA_SCULPT102_META=Object.freeze(META);
window.NUSAJIWA_SCULPT102=function(group,body,M,id,phase,T,ell,tube){
 if(!IDS.includes(id)||!group||!body||!M||!T||!ell||!tube)return false;
 const s=Math.max(0,Math.min(7,Math.floor(Number(phase)||0)));
 const host=s===0?group:body;
 if(s===0){for(const c of group.children)c.visible=false;}
 else for(const c of body.children)c.visible=false;
 const root=new T.Group();root.name='NJ102_'+id+'_F'+s;host.add(root);
 const prefix=id+'-F'+s+'-';
 const E=(n,x,y,z,a,b,c,m)=>{const q=ell(root,x,y,z,a,b,c,m);q.name=prefix+n;return q};
 const L=(n,pts,r,m)=>{const q=tube(root,pts,r,m);q.name=prefix+n;return q};
 const K=(n,x,y,z,rr,hh,m,rz=0)=>{const q=new T.Mesh(new T.ConeGeometry(rr,hh,8),m);
  q.name=prefix+n;q.position.set(x,y,z);q.rotation.z=rz;root.add(q);return q};
 const P=(n,vertices,m,depth=.075)=>{const shape=new T.Shape();
  shape.moveTo(vertices[0][0],vertices[0][1]);
  for(const v of vertices.slice(1))shape.lineTo(v[0],v[1]);
  shape.closePath();
  const geom=new T.ExtrudeGeometry(shape,{depth,steps:1,bevelEnabled:true,bevelSize:.015,bevelThickness:.012,bevelSegments:1});
  const mesh=new T.Mesh(geom,m);mesh.name=prefix+n;root.add(mesh);return mesh;
 };
 const pair=fn=>{fn(-1);fn(1)};
 const dotEyes=(n,y,z,dx=.16)=>pair(d=>{
  E(n+'-socket-'+d,d*dx,y,z-.025,.086,.086,.048,M.dark);
  E(n+'-white-'+d,d*dx,y,z,.07,.066,.032,M.white);
  E(n+'-pupil-'+d,d*dx,y,z+.034,.039,.041,.018,M.eye);
 });
 const age=[0,.48,.64,.79,.94,1.08,1.16,1.24][s];
 if(s===0){
  E('symbolic-game-not-actual-birth-egg',0,1.15,0,.48+IDS.indexOf(id)*.042,.79,.46,M.main);
  for(let k=0;k<7;k++){
   const j=k-3;
   E('identity-engraving-'+k,j*.093,1.11+.12*Math.cos(j*.62),.465,.032,.062,.021,k%2?M.gold:M.dark);
  }
  if(id==='warak_ngendog')E('Dugderan-egg-glyph',0,.85,.47,.16,.17,.025,M.gold);
  else if(id==='boraspati_tano')P('Batak-gecko-engraved-seal',
   [[-.28,1.03],[-.1,1.37],[.14,1.29],[.24,1.02],[0,.90]],M.gold,.03);
  else if(id==='bujang_ganong')E('Ganong-big-nose-glyph',0,1.32,.50,.14,.21,.09,M.gold);
  else pair(d=>E('Kebo-Iwa-giant-human-hand-glyph-'+d,d*.23,1.21,.44,.10,.13,.036,M.gold));
  root.userData={id,phase:s,rebuilt:true,fictionalLifecycle:true,source:META[id].source};
  return true;
 }
 if(id==='bujang_ganong'){
  // Upstanding acrobatic performer with red mask, long prominent nose,
  // large comical eyes and large teeth (NOT imposing a monster/giant torso).
  const head=1.68+.13*age;
  E('short-muscular-nimble-human-dancer-torso',0,.99,-.10,.25+.05*age,.41,.24,M.main);
  E('short-dancer-garment',0,.61,.01,.27,.24,.26,M.dark);
  pair(d=>{
   L('outstretched-acrobat-arm-'+d,[[d*.25,1.28,0],
    [d*(.40+.10*age),1.10,.16],[d*(.49+.12*age),1.23,.24]],.067,M.main);
   E('acrobat-gloved-hand-'+d,d*(.49+.12*age),1.24,.25,.095,.12,.075,M.light);
   L('springy-bent-reog-dancer-leg-'+d,[[d*.15,.66,-.08],[d*.31,.40,.02],
    [d*.26,.16,.20]],.10,M.main);
   E('broad-flat-dancer-foot-'+d,d*.27,.14,.28,.16,.10,.18,M.dark);
  });
  E('comical-painted-red-ganong-mask',0,head,.16,.30,.32,.23,M.main);
  E('extremely-long-curved-Ganong-nose',0,head-.045,.48,.12,.20,.18,M.light);
  dotEyes('large-mischievous-reog-eyes',head+.10,.38,.18);
  E('wide-open-tooth-grin',0,head-.24,.37,.23,.096,.064,M.dark);
  for(let i=0;i<5;i++)E('large-Ganong-teeth-without-fangs-'+i,
   (i-2)*.068,head-.24,.436,.028,.055,.022,M.white);
  E('dancer-horsehair-scalloped-scalp',0,head+.28,-.12,.35,.14,.25,M.black);
  for(let i=0;i<7+s*2;i++){const x=(i-(6+s*2)/2)*.58/(7+s*2);
   L('black-white-ganong-wig-hair-'+i,[[x,head+.29,-.13],
    [x*1.30,head-.04,-.22],[x*1.60,head-.41-(i%3)*.06,-.18]],.021,i%3===0?M.white:M.black);
  }
  if(s>=3)pair(d=>L('trailing-Reog-costume-fringe-'+d,
   [[d*.19,.68,-.21],[d*.31,.42,-.21],[d*.38,.18,-.18]],.052,M.gold));
  if(s>=5)E('Ganong-paton-mask-ornament',0,head+.28,.28,.13,.065,.063,M.gold);
  if(s===6)pair(d=>L('elder-wig-loosened-hair-'+d,
   [[d*.25,head+.31,-.24],[d*.50,head-.10,-.28],[d*.61,.71,-.38]],.047,M.black));
  if(s===7)pair(d=>L('legend-fantasy-acrobatic-movement-'+d,
   [[d*.35,1.20,-.15],[d*.71,1.54,-.24],[d*.84,1.93,-.41]],.053,M.gold));
 }else if(id==='warak_ngendog'){
  // Warak symbolises Semarang's hybrid Dugderan mascot with dragon head,
  // four sturdy legs, playful goat-like curly coat and a symbolic egg.
  const len=.54+.26*age,w=.34+.15*age;
  E('fourlegged-hybrid-Buraq-goat-torso',0,.97,-.17,w,.42,len,M.main);
  E('dorsal-camel-like-hump',0,1.38,-.24,.22,.23,.35,M.light);
  E('long-dragon-neck',0,1.48,.36,.19,.37,.21,M.main);
  E('Semarang-Chinese-dragon-head',0,1.78,.57,.26,.27,.29,M.light);
  E('broad-round-dragon-snout',0,1.66,.83,.22,.13,.23,M.main);
  dotEyes('round-dragon-guardian-eye',1.85,.81,.18);
  pair(d=>{
   L('short-upturned-dragon-moustache-'+d,[[d*.20,1.70,.88],
    [d*.40,1.67,1.02],[d*.47,1.83,1.13]],.038,M.gold);
   K('warak-short-dragon-ear-'+d,d*.19,2.08,.48,.082,.25,M.gold,d*.24);
   for(const zz of [-.53,.35]){
    L('all-four-strong-goat-like-legs-'+d+'-'+zz,[[d*w*.71,.74,zz],
     [d*w*.76,.37,zz+.06],[d*w*.78,.17,zz+.13]],.11,M.dark);
    E('simple-cloven-goat-hoof-'+d+'-'+zz,d*w*.78,.13,zz+.18,.13,.095,.18,M.main);
   }
  });
  for(let j=0;j<15+s*3;j++){
   const a=j*2.39996,x=Math.sin(a)*w*.86,
    z=-.21+Math.cos(a)*len*.79,y=1.18+(j%4)*.069;
   E('colorful-curled-goat-wool-'+j,x,y,z,.075,.095,.087,
    j%4===0?M.gold:j%3===0?M.light:j%2===0?M.dark:M.main);
  }
  E('small-Dugderan-symbolic-egg-by-tail',0,.41,-len-.15,.15+.03*age,.18,.13,M.gold);
  L('sculpted-waraks-curved-tail',[[0,.95,-len],[.17,1.09,-len-.28],
    [.24,1.22,-len-.33]],.055,M.dark);
  if(s>=4)for(let j=-2;j<=2;j++)E('multicultural-costume-frontal-tassel-'+j,
   j*.095,1.40,.53,.051,.16,.045,M.gold);
  if(s===6)pair(d=>L('elder-wool-braided-crest-'+d,[[d*.20,2.07,.44],
   [d*.33,2.35,.37],[d*.45,2.39,.26]],.041,M.dark));
  if(s===7)pair(d=>L('legend-Dugderan-fan-flourish-'+d,
   [[d*.30,1.39,-.34],[d*.75,1.86,-.46],[d*.98,2.02,-.55]],.055,M.gold));
 }else if(id==='boraspati_tano'){
  // Important: a mostly FLAT architectural/gecko ornament is the indigenous
  // Batak form; no Western lizard humanoid / firebreathing fantasy dragon.
  const w=.28+.13*age,top=1.72+.11*age;
  P('flat-Batak-gorga-gecko-relief-backplate',
   [[-.32,.36],[-.29,1.52],[-.16,1.90],[.16,1.90],
    [.29,1.52],[.32,.36],[0,.16]],M.dark,.075);
  E('ornamental-tokay-gecko-head',0,top,.19,.26,.25,.12,M.main);
  E('long-reptile-ornamental-torso',0,1.08,.17,.20+.03*age,.53,.13,M.main);
  pair(d=>{
   E('paired-gecko-adhesive-eyes-'+d,d*.14,top+.035,.29,.073,.083,.049,M.gold);
   L('gecko-front-splayed-wall-leg-'+d,[[d*.14,1.43,.20],
    [d*w,1.38,.22],[d*(w+.22),1.57,.25]],.071,M.main);
   L('gecko-hind-splayed-wall-leg-'+d,[[d*.16,.83,.18],
    [d*w,.74,.23],[d*(w+.25),.51,.28]],.071,M.main);
   for(const y of [1.57,.51]){
    for(let k=0;k<3;k++)L('wide-gecko-toe-'+d+'-'+y+'-'+k,
     [[d*(w+.20),y,.28],[d*(w+.25+k*.06),y+.02+(k-1)*.09,.28]],.018,M.gold);
   }
  });
  L('undulating-flat-reptile-tail',[[0,.66,.20],
    [.09,.43,.21],[.18,.20,.19],[.08,.12,.22]],.095,M.main);
  for(let j=0;j<6+s;j++){
   const y=.77+j*.094;
   E('carved-earth-batik-gorga-scale-'+j,(-1)**j*.10,y,.29,.053,.052,.023,j%2?M.gold:M.light);
  }
  if(s>=3)pair(d=>L('Batak-gorga-twin-outer-border-'+d,[[d*.32,1.72,-.02],
    [d*.42,1.18,-.03],[d*.35,.43,-.03]],.031,M.gold));
  if(s>=5)E('earth-deity-protective-motif',0,1.26,.32,.14,.11,.03,M.gold);
  if(s===6)pair(d=>E('weathered-earth-gorga-engraving-'+d,d*.27,1.28,.24,.046,.22,.035,M.light));
  if(s===7)for(let j=-2;j<=2;j++)L('fictional-mythic-earth-symbol-from-relief-'+j,
   [[j*.11,1.85,-.07],[j*.18,2.06,-.13],[j*.21,2.19,-.16]],.037,M.gold);
 }else if(id==='kebo_iwa'){
  // Strong human Bali hero (builder/well-digger), NOT buffalo head, not orc.
  const top=1.66+.17*age,w=.36+.22*age;
  E('big-powerful-human-builder-torso',0,1.02,0,w,.59,.35,M.main);
  E('rounded-work-worn-human-stomach',0,.84,.24,w*.80,.30,.23,M.light);
  E('recognizably-human-head',0,top,.17,.27+.05*age,.31,.24,M.light);
  E('broad-human-nose',0,top-.045,.412,.086,.13,.094,M.main);
  dotEyes('wise-human-eyes',top+.08,.38,.17);
  E('not-animal-bearded-human-chin',0,top-.23,.32,.18,.10,.10,M.dark);
  E('sculpted-Balinese-headwrap',0,top+.27,-.07,.31,.15,.26,M.dark);
  pair(d=>{
   L('powerful-giant-engineer-arm-'+d,[[d*w*.83,1.42,-.05],
    [d*(w+.20),.85,.07],[d*(w+.24),.39,.29]],.12+.045*age,M.main);
   E('large-human-digging-hand-'+d,d*(w+.24),.35,.30,.18,.21,.19,M.light);
   for(let k=0;k<4;k++)L('giant-articulated-human-finger-'+d+'-'+k,
    [[d*(w+.18+k*.032),.27,.32],[d*(w+.20+k*.045),.13+(k%2)*.04,.35]],.025,M.main);
   L('powerful-human-builder-leg-'+d,[[d*.24,.72,-.08],
    [d*.29,.33,.04],[d*.30,.14,.20]],.16,M.main);
   E('large-human-sandal-foot-'+d,d*.32,.12,.28,.22,.11,.27,M.dark);
  });
  E('wrapped-human-sarong-waist-band',0,.56,.08,w*.91,.15,.30,M.dark);
  for(let j=-3;j<=3;j++)L('Bali-building-work-cloth-stripe-'+j,
   [[j*.12,.57,.29],[j*.16,.38,.28],[j*.17,.18,.23]],.019,j%2?M.gold:M.light);
  if(s>=3){
   // A tool from his legendary well-digging skill, held in right hand.
   L('long-well-digging-wooden-tool-shaft',[[w+.16,.25,.40],
    [w+.30,.77,.48],[w+.36,1.26,.50]],.047,M.dark);
   E('stone-digging-tool-head',w+.38,1.25,.49,.12,.11,.19,M.gold);
  }
  if(s>=5)pair(d=>E('battle-free-builder-shoulder-mark-'+d,d*.39,1.54,.03,.16,.12,.09,M.gold));
  if(s===6)pair(d=>L('elder-deeper-human-face-crease-'+d,[[d*.21,top-.05,.36],
   [d*.24,top-.17,.35]],.019,M.dark));
  if(s===7)pair(d=>L('fictional-guardian-well-water-arc-'+d,
   [[d*.25,.34,-.22],[d*.58,.66,-.31],[d*.78,.99,-.42]],.049,M.gold));
 }
 // Game-stage exclusive physical landmarks, no universal demon horns/dragon wings.
 if(s===1)E('infant-origination-mark',0,.20,-.32,.067,.052,.052,M.gold);
 if(s===2)pair(d=>E('juvenile-relief-balance-'+d,d*.14,.23,-.31,.079,.095,.058,M.light));
 if(s===3)L('child-new-form-line',[[-.14,.32,-.31],[0,.27,-.37],[.14,.32,-.31]],.029,M.gold);
 if(s===4)pair(d=>L('teen-new-identity-border-'+d,[[d*.18,.45,-.27],[d*.31,.31,-.37]],.026,M.gold));
 if(s===5)E('mature-source-ornament',0,.19,-.34,.14,.045,.071,M.dark);
 if(s===6)pair(d=>E('elder-age-relief-'+d,d*.17,.24,-.31,.087,.076,.060,M.light));
 if(s===7)pair(d=>L('legend-metaphorical-cultural-aura-'+d,[[d*.15,.35,-.35],
   [d*.44,.60,-.47],[d*.61,.83,-.60]],.053,M.gold));
 root.userData={id,phase:s,artisticEvolution:'game-fiction',reconstructed:true,
  source:META[id].source,origin:META[id].region,identity:META[id].description};
 body.userData.NJ102={id,phase:s,previousArtHidden:true,saveUntouched:true};
 return true;
};
})();