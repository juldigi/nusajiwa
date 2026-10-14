/* NJ98 · Batch 01 · Eight individually re-sculpted folklore identities.
 * 8 stage-specific 3D constructions per identity. NOT a texture swap, scale-only
 * evolution, or an additive overlay on a generic adult.
 * Cultural identity motifs are sourced; egg/growth/Legend are GAME FICTION.
 * WebGL native geometry; no save schema, network, or UI modifications. */
(function(){
'use strict';
if(window.NUSAJIWA_SCULPT98)return;
const IDS=['kuyang','leak','kuntilanak','pocong','genderuwo','tuyul','wewe','jenglot'];
const STAGES=['Segel','Bayi','Balita','Anak','Remaja','Dewasa','Tua','Legenda'];
const DETAILS={
 kuyang:{home:'Kalimantan',identity:'kepala perempuan melayang, rambut, untaian anatomi simbolis',
  source:'https://journal.uinjkt.ac.id/index.php/mimbar/article/view/41528'},
 leak:{home:'Bali',identity:'transformasi wajah dan raut teatrikal, bukan topeng Rangda yang disalin',
  source:'https://digilib.uin-suka.ac.id/id/eprint/40661/'},
 kuntilanak:{home:'Nusantara',identity:'sosok perempuan, kain panjang dan rambut; variasi lokal',
  source:'https://doi.org/10.30998/jurnaldesain.v7i1.5468'},
 pocong:{home:'Jawa/Nusantara',identity:'kafan membungkus tubuh, simpul dan ikatan',
  source:'https://doi.org/10.30998/jurnaldesain.v7i1.5468'},
 genderuwo:{home:'Jawa',identity:'figur berbulu berbadan besar dalam cerita lisan; interpretasi berbeda',
  source:'https://p2k.stekom.ac.id/ensiklopedia/Genderuwo'},
 tuyul:{home:'Jawa',identity:'figur bertubuh kecil mirip anak, kepala botak',
  source:'https://doi.org/10.30998/jurnaldesain.v7i1.5468'},
 wewe:{home:'Jawa',identity:'figur perempuan tua, rambut acak, postur merangkul dan dada memanjang',
  source:'https://desapetir.gunungkidulkab.go.id/first/artikel/284-TRADISI-SOSOK-WEWE-GOMBEL'},
 jenglot:{home:'Jawa',identity:'figur kecil mengering, rambut dan kuku panjang, representasi cerita',
  source:'https://kebudayaan.kemdikbud.go.id/ditkma/buku-seri-pengenalan-budaya-nusantara-2019-2/'}
};
window.NUSAJIWA_SCULPT98_IDS=Object.freeze(IDS.slice());
window.NUSAJIWA_SCULPT98_DETAILS=Object.freeze(DETAILS);
window.NUSAJIWA_SCULPT98=function(group,body,M,id,phase,T,ell,tube){
 if(!IDS.includes(id)||!group||!body||!M||!T||!ell||!tube)return false;
 const s=Math.min(7,Math.max(0,Math.floor(Number(phase)||0)));
 // For every targeted ID, hide ALL previous production sculpt layers.
 // A single purpose-built rig is visible instead of multiple overlay shells.
 const host=s===0?group:body;
 if(s===0){for(const o of group.children)o.visible=false;}
 else {for(const o of body.children)o.visible=false;}
 const rig=new T.Group();rig.name='NJ98_'+id+'_F'+s;host.add(rig);
 const prefix=id+'-F'+s+'-';
 const E=(n,x,y,z,a,b,c,m)=>{const o=ell(rig,x,y,z,a,b,c,m);
  o.name=prefix+n;return o};
 const L=(n,pts,r,m)=>{const o=tube(rig,pts,r,m);o.name=prefix+n;return o};
 const K=(n,x,y,z,rad,h,m,rx=0,rz=0)=>{
  const o=new T.Mesh(new T.ConeGeometry(rad,h,9),m);
  o.name=prefix+n;o.position.set(x,y,z);o.rotation.x=rx;o.rotation.z=rz;rig.add(o);return o;
 };
 const R=(n,x,y,z,rad,wire,m,rx=0)=>{
  const o=new T.Mesh(new T.TorusGeometry(rad,wire,7,26),m);
  o.name=prefix+n;o.position.set(x,y,z);o.rotation.x=rx;rig.add(o);return o;
 };
 const pair=fn=>{fn(-1);fn(1)};
 const cloth=(name,rings,m,segments=16)=>{
  // Ring-loft with explicit changing cross sections and natural normals.
  const pos=[],idx=[];
  for(const [y,rx,rz,cx,cz] of rings)for(let i=0;i<segments;i++){
   const a=i*Math.PI*2/segments;
   pos.push((cx||0)+Math.cos(a)*rx,y,(cz||0)+Math.sin(a)*rz);
  }
  for(let j=0;j<rings.length-1;j++)for(let i=0;i<segments;i++){
   const a=j*segments+i,b=j*segments+(i+1)%segments,c=(j+1)*segments+i,d=(j+1)*segments+(i+1)%segments;
   idx.push(a,c,b,b,c,d);
  }
  const geo=new T.BufferGeometry();
  geo.setAttribute('position',new T.Float32BufferAttribute(pos,3));geo.setIndex(idx);
  geo.computeVertexNormals();
  const mesh=new T.Mesh(geo,m);mesh.name=prefix+name;rig.add(mesh);
  return mesh;
 };
 const eyes=(tag,x,y,z,dx,size,mat=M.eye)=>{
  pair(d=>{
   E(tag+'-sunken-orbit-'+d,x+d*dx,y,z-.04,size*1.30,size*.98,.055,M.dark);
   E(tag+'-sclera-'+d,x+d*dx,y,z,size,size*.78,.035,M.light);
   E(tag+'-iris-'+d,x+d*dx,y,z+.038,size*.48,size*.53,.019,mat);
   E(tag+'-glint-'+d,x+d*dx-.01,y+.015,z+.052,.012,.012,.009,M.white);
  });
 };
 const strands=(tag,n,capY,side,low,m=M.black)=>{
  for(let j=0;j<n;j++){
   const a=j/(Math.max(1,n-1))*Math.PI*1.65+.40;
   const x=Math.cos(a)*side,z=Math.sin(a)*-.18-.12, sway=(j%3-1)*.12;
   L(tag+'-strand-'+j,[[x*.77,capY,z],[x*1.16+sway,capY-.33,-.25],
     [x*1.23+sway,low+(j%4)*.07,-.12-(j%3)*.065]],.018+(j%3)*.006,m);
  }
 };
 const fingers=(tag,side,ox,oy,oz,m=M.dark)=>{
  for(let j=0;j<3;j++)L(tag+'-finger-'+side+'-'+j,[[ox,oy,oz],
    [ox+side*(.09+j*.037),oy-.09-(j%2)*.03,oz+.06+j*.025]],.018,m);
 };
 if(s===0){
  // Distinct symbolic seals; no claim that ghostly figures are egg-laying.
  const forms={
   kuyang:[.53,.82,.48],leak:[.61,.68,.51],kuntilanak:[.46,.89,.46],pocong:[.48,.94,.43],
   genderuwo:[.68,.72,.56],tuyul:[.57,.74,.48],wewe:[.47,.89,.53],jenglot:[.43,.78,.45]
  };
  const [w,h,d]=forms[id];
  E('symbolic-identity-egg',0,1.14,0,w,h,d,M.main);
  const glyph={
   kuyang:[[-.22,1.41,.39],[0,1.62,.45],[.22,1.41,.39]],
   leak:[[-.24,1.29,.43],[0,1.58,.48],[.24,1.29,.43]],
   kuntilanak:[[-.19,1.49,.40],[0,1.63,.45],[.19,1.49,.40]],
   pocong:[[0,1.77,.37],[0,1.40,.44],[0,1.02,.43]],
   genderuwo:[[-.29,1.45,.45],[0,1.24,.51],[.29,1.45,.45]],
   tuyul:[[-.19,1.25,.42],[0,1.49,.48],[.19,1.25,.42]],
   wewe:[[-.26,1.62,.41],[0,1.31,.48],[.26,1.62,.41]],
   jenglot:[[-.11,1.71,.37],[0,1.30,.43],[.11,1.71,.37]]
  };
  L('individual-raised-crest',glyph[id],.037,M.gold);
  if(id==='pocong'){R('tied-kafan-upper',0,1.53,0,.405,.035,M.white,Math.PI/2);
   R('tied-kafan-lower',0,.82,0,.40,.032,M.white,Math.PI/2);}
  else if(id==='kuyang'||id==='wewe'||id==='kuntilanak')
   pair(d=>L('hair-etched-in-shell-'+d,[[d*.17,1.62,.39],[d*.30,1.17,.37],[d*.25,.74,.30]],.025,M.dark));
  else if(id==='genderuwo'||id==='jenglot')
   for(let i=0;i<7;i++){const x=(i-3)*.085;L('carved-fur-fossil-'+i,
     [[x,1.57,.34],[x*1.23,1.22,.49],[x*.96,.93,.42]],.014,M.dark);}
  else if(id==='leak')pair(d=>K('ritual-eye-knot-'+d,d*.21,1.36,.42,.09,.19,M.dark));
  else pair(d=>R('small-seal-ring-'+d,d*.18,1.23,.42,.072,.018,M.dark));
  rig.userData={id,phase:s,stage:STAGES[s],reconstructed:true,fantasyEvolution:true,source:DETAILS[id].source};
  return true;
 }
 const young=s<=2,mid=s<=4,adult=s>=5;
 const scale=[0,.56,.68,.83,.97,1.08,1.12,1.20][s];
 const ageMark=s===6?'elder':s===7?'legend':s===5?'adult':s===4?'adolescent':s===3?'child':s===2?'juvenile':'infant';
 switch(id){
 case 'kuyang':{
  // Flying head: NO torso, arms, or wings. Symbolic strands below the neck.
  const headY=1.54+(mid?.13:.20),headW=.26+scale*.14;
  E('flying-female-cranium',0,headY,.04,headW,.32+scale*.12,.32,M.light);
  E('jaw-taper',0,headY-.27,.17,headW*.73,.19,.21,M.main);
  E('narrow-bridge-nose',0,headY-.07,.39,.065,.14,.10,M.light);
  E('lips-held-tight',0,headY-.26,.392,.12,.029,.026,M.dark);
  eyes('sorrowful-eye',0,headY+.08,.365,.18,.062,M.eye);
  pair(d=>E('prominent-cheekbone-'+d,d*.23,headY-.12,.27,.12,.11,.09,M.main));
  E('widows-peak-haircap',0,headY+.32,-.11,headW*1.19,.19,.32,M.black);
  strands('floating-wet-hair',4+s*2,headY+.40,headW*1.13,headY-.34-s*.075);
  const n=[0,2,3,4,5,6,8,10][s];
  for(let j=0;j<n;j++){const a=j*2.39996,yy=headY-.37;
   L('hanging-symbolic-viscera-'+j,[[Math.sin(a)*.13,yy,-.03],[Math.sin(a)*(.19+s*.01),
     yy-.22,Math.cos(a)*.14-.1],[Math.sin(a+.41)*(.25+s*.015),
     yy-.47-.045*s+(j%3)*.06,Math.cos(a)*.12-.18]],.030+(j%3)*.004,j%2?M.pink:M.dark);
  }
  if(s>=3)pair(d=>L('long-levitating-temple-vein-'+d,
    [[d*.19,headY+.14,.40],[d*.24,headY-.13,.38],[d*.20,headY-.33,.31]],.018,M.dark));
  if(s>=5)E('adult-hollow-neck-shadow',0,headY-.48,.03,.13,.09,.12,M.dark);
  if(s===6)pair(d=>L('aged-separate-thick-lock-'+d,[[d*.30,headY+.40,-.17],
   [d*.58,headY-.10,-.25],[d*.67,.58,-.22]],.043,M.black));
  if(s===7)for(let j=-1;j<=1;j++)L('legend-crescent-hair-'+j,
   [[j*.14,headY+.45,-.18],[j*.24,headY+.80,-.31],[j*.44,headY+1.05,-.36]],.052,M.black);
  break;}
 case 'leak':{
  // Balinese narrative mask study, not Rangda costume or demonic horns.
  const faceY=1.52+(adult?.12:0),w=.28+scale*.08;
  if(s<=2){
   cloth('early-human-ritual-cloth',[[.23,.23,.18,0,0],[.85,.31,.23,0,0],
    [1.45,.22,.19,0,0]],M.main);
   pair(d=>L('human-arm-'+d,[[d*.21,1.37,0],[d*.32,.94,.12],[d*.38,.51,.18]],.06,M.light));
  } else{
   cloth('ritual-shadow-torso',[[.24,.28,.26,0,-.09],[.85,.34,.27,0,-.11],
    [1.33,.29,.22,0,-.09],[1.62,.20,.19,0,-.06]],M.dark);
   pair(d=>L('taut-fingered-arm-'+d,[[d*.27,1.31,0],[d*(.41+scale*.07),.86,.16],
    [d*(.49+scale*.11),.45,.29]],.065,M.main));
  }
  E('rising-transforming-face',0,faceY,.18,w,.33+scale*.06,.25,M.light);
  E('mask-wide-arched-nose',0,faceY-.01,.43,.10,.15,.12,M.main);
  eyes('circular-staring-mask',0,faceY+.11,.405,.19,.078+scale*.011,M.eye);
  pair(d=>{
   L('arched-brow-drawn-like-mask-'+d,[[d*.09,faceY+.29,.43],[d*.20,faceY+.32,.43],
    [d*.30,faceY+.26,.35]],.036,M.black);
   E('coiled-cheek-flange-'+d,d*(w+.045),faceY-.11,.21,.12,.18,.11,M.dark);
  });
  E('open-fanged-mouth',0,faceY-.25,.43,.16,.085,.056,M.dark);
  if(s>=3)pair(d=>K('upper-canine-in-mouth-'+d,d*.115,faceY-.29,.51,.042,.18,M.white,Math.PI));
  if(s>=4)L('extended-ceremonial-tongue',[[0,faceY-.27,.52],[0,faceY-.51,.54],
    [.07,faceY-.74-(s-4)*.10,.46]],.050,M.pink);
  strands('ritual-black-hair',5+s,faceY+.32,w,faceY-.32-(s>=5?.20:0));
  if(s>=5)pair(d=>L('Balinese-style-ornamental-spiral-'+d,
   [[d*.34,faceY+.20,-.10],[d*.55,faceY+.43,-.11],[d*.50,faceY+.66,-.20]],.045,M.gold));
  if(s>=6)for(let j=0;j<5;j++)L('elder-curl-flame-hair-'+j,
   [[(j-2)*.15,faceY+.52,-.19],[(j-2)*.21,faceY+.92,-.20],
    [(j-2)*.26,faceY+1.15,-.28]],.035,M.black);
  if(s===7)pair(d=>L('legend-swirling-mask-hem-'+d,
   [[d*.34,1.31,-.04],[d*.79,.82,-.27],[d*1.04,.46,-.43]],.070,M.dark));
  break;}
 case 'kuntilanak':{
  // Textile is actual lofted cloth with separated hair mass; NOT a Sadako clone.
  const cy=1.68+scale*.21,hem=.30+scale*.40;
  cloth('billowing-white-dress',[[.13,hem,.32,0,-.11],[.48,hem*.79,.31,.08*(s>=4),-.06],
   [1.12,.24+scale*.11,.24,0,0],[1.55,.25+scale*.05,.20,0,0]],M.white);
  E('gentle-pale-neck',0,1.56,.08,.13,.21,.14,M.light);
  E('long-oval-spectral-face',0,cy,.17,.24,.32,.22,M.light);
  E('pale-nose',0,cy-.055,.385,.066,.10,.045,M.white);
  E('closed-unmoving-lips',0,cy-.22,.373,.108,.025,.023,M.dark);
  eyes('distant-gaze',0,cy+.055,.354,.14,.05,M.eye);
  E('heavy-center-part',0,cy+.26,-.06,.29,.17,.23,M.black);
  strands('straight-long-black-hair',6+s*2,cy+.30,.23,.65-s*.035);
  pair(d=>{
   L('floating-dress-sleeved-arm-'+d,[[d*.26,1.41,.03],
    [d*(.36+scale*.12),.97,.11],[d*(.40+scale*.14),.42,.18]],.074,M.white);
   E('pale-hand-under-sleeve-'+d,d*(.40+scale*.14),.39,.17,.10,.15,.10,M.light);
  });
  for(let j=0;j<5+s;j++){const x=(j-(4+s)/2)*hem*.22;
   L('cloth-longitudinal-seam-'+j,[[x*.54,1.32,.20],
    [x*.91,.74,.27],[x, .18,.25-(j%2)*.08]],.011,M.light);}
  if(s===3||s===4)pair(d=>L('youth-growing-side-lock-'+d,
   [[d*.21,cy+.19,.05],[d*.34,1.32,.05],[d*.45,.84,-.12]],.055,M.black));
  if(s===6)pair(d=>L('frayed-shawl-tail-'+d,[[d*.25,1.40,-.02],
    [d*.48,.66,-.20],[d*.67,.24,-.32]],.039,M.white));
  if(s===7)pair(d=>cloth('legend-wide-wind-veil-'+d,[[.27,.17,.09,d*.66,-.19],
    [.85,.18,.10,d*.79,-.29],[1.34,.08,.08,d*.36,-.19]],M.white,12));
  break;}
 case 'pocong':{
  // Shroud uninterrupted; bound wrists cannot sprout uncovered arms.
  const shoulder=.26+scale*.11,hh=1.78+scale*.36;
  cloth('continuous-seamed-kafan',[[.19,.18+.06*scale,.22,0,0],
    [.38,.28+scale*.05,.26,0,0],[.89,shoulder+.05,.31,0,0],
    [1.49,shoulder,.28,0,0],[hh-.20,.25+.035*scale,.26,0,0]],M.white);
  E('tied-round-head-shroud',0,hh-.05,.03,.30+.02*scale,.31+.02*scale,.28,M.white);
  E('subtle-recessed-face-in-shroud',0,hh-.09,.279,.17,.20,.035,M.light);
  pair(d=>E('under-kafan-eye-shade-'+d,d*.093,hh+.00,.311,.040,.027,.012,M.dark));
  for(const [nm,y,r] of [['neck',hh-.31,.265],['ankles',.31,.25]]){
   R('tight-'+nm+'-binding',0,y,0,r,.033,M.light,Math.PI/2);
   pair(d=>L(nm+'-tie-tail-'+d,[[d*.09,y,.22],[d*.17,y-.12,.31],
     [d*(.20+s*.008),y-.24-(s>=5?.10:0),.25]],.028,M.white));
  }
  R('top-knot-loop',0,hh+.23,0,.085,.042,M.white,Math.PI/2);
  K('top-knotted-kafan-tip',0,hh+.42,0,.10,.30,M.white);
  for(let j=0;j<9+s;j++){const a=j*Math.PI*2/(9+s),x=Math.cos(a),z=Math.sin(a);
   L('pleat-in-true-kafan-'+j,[[x*.20,hh-.31,z*.20],[x*(shoulder+.015),1.12,z*.28],
     [x*(.27+scale*.04),.38,z*.27]],.010+(j%3)*.004,M.light);}
  if(s>=4)pair(d=>E('compressed-hand-shape-inside-wrap-'+d,d*.21,1.14,.22,.075,.18,.08,M.light));
  if(s===6)pair(d=>L('aged-fabric-fray-'+d,[[d*.28,.63,-.01],
    [d*.39,.43,-.07],[d*.42,.17,-.14]],.022,M.light));
  if(s===7)pair(d=>L('windy-kafan-hem-'+d,[[d*.27,.47,-.11],
    [d*.48,.39,-.29],[d*.66,.34,-.48]],.040,M.white));
  break;}
 case 'genderuwo':{
  // Hunched long-armed biped. No wolf snout, horns, or fake superhero abs.
  const torsoW=.28+scale*.29,top=1.57+scale*.25;
  cloth('low-heavy-rough-torso',[[.42,.20+.1*scale,.23,0,0],
   [.72,torsoW*.75,.32,0,-.12],[1.10,torsoW,.38,0,-.16],
   [top,torsoW*1.11,.33,0,-.25]],M.dark);
  E('dense-forward-shoulder-hump',0,top-.05,-.28,torsoW*1.22,.30,.34,M.black);
  E('broad-human-like-furred-face',0,top+.23,.16,.28+scale*.12,.29+scale*.05,.28,M.dark);
  E('wide-flat-human-nose',0,top+.15,.41,.13,.10,.11,M.main);
  E('large-heavy-brow',0,top+.33,.36,.28,.085,.10,M.black);
  eyes('small-deep-set-eyes',0,top+.27,.435,.18,.043,M.gold);
  E('prominent-jaw-but-not-wolf-muzzle',0,top+.01,.35,.28,.12,.13,M.main);
  pair(d=>{
   const sx=d*(torsoW*.87),reach=.52+scale*.20;
   L('extremely-long-brachiated-arm-'+d,[[sx,top-.17,-.05],
    [d*(torsoW+.22),1.01,.06],[d*reach,.27,.26]],.11+scale*.04,M.dark);
   E('long-heavy-knuckle-'+d,d*reach,.22,.27,.17,.13,.20,M.main);
   fingers('earth-heavy',d,d*reach,.22,.31,M.black);
   L('thick-short-support-leg-'+d,[[d*.24,.69,-.11],[d*.29,.26,.12]],.14,M.dark);
   E('wide-flat-foot-'+d,d*.31,.17,.29,.22,.14,.31,M.main);
  });
  for(let j=0;j<14+s*3;j++){const a=j*2.39996,x=Math.cos(a)*torsoW*.94;
   const y=.74+(j%7)*.16,z=Math.sin(a)*.27-.13;
   K('individual-shaggy-shoulder-fur-'+j,x,y,z,.060+(j%3)*.015,.20+.035*(j%4),M.black,.18,(j%2?.2:-.2));}
  if(s>=3)pair(d=>L('coarse-forearm-hair-'+d,[[d*(torsoW+.14),1.16,.12],
   [d*(torsoW+.32),.71,.22],[d*(torsoW+.34),.54,.15]],.063,M.black));
  if(s===6)E('elder-creased-heavy-belly',0,.88,.22,torsoW*.82,.22,.15,M.main);
  if(s===7)pair(d=>E('legend-risen-shoulder-ridge-'+d,d*.65,top+.08,-.30,.28,.40,.16,M.black));
  break;}
 case 'tuyul':{
  // Bald childlike body with large cranium; explicitly no elfin ears or horns.
  const h=.27+scale*.22,headY=1.32+scale*.24;
  E('short-pot-bellied-child-body',0,.87,0,.23+scale*.12,h+.11,.25+scale*.12,M.main);
  E('round-bald-child-head',0,headY,.13,.30+scale*.11,.29+scale*.08,.27+scale*.04,M.light);
  E('rounded-muzzle-free-nose',0,headY-.06,.43,.080,.068,.068,M.main);
  eyes('side-glancing-mischief',0,headY+.07,.398,.17,.069,M.eye);
  E('crooked-smirk',.05,headY-.20,.411,.14,.036,.026,M.dark);
  E('protruding-belly',0,.82,.27,.23+scale*.08,.19,.18,M.light);
  pair(d=>{
   E('round-nonpointed-ear-'+d,d*(.31+scale*.10),headY,.12,.10,.16,.09,M.main);
   L('short-sneaking-arm-'+d,[[d*.25,1.09,.0],[d*(.35+scale*.11),.75,.19],
    [d*(.42+scale*.11),.50,.30]],.064,M.main);
   fingers('nimble',d,d*(.42+scale*.11),.51,.30,M.dark);
   L('crooked-small-shin-'+d,[[d*.18,.57,-.04],[d*.25,.31,.09]],.093,M.main);
   E('bare-short-toed-foot-'+d,d*.25,.17,.24,.18,.11,.23,M.main);
  });
  if(s>=2)pair(d=>E('permanent-low-brow-'+d,d*.17,headY+.19,.37,.13,.055,.08,M.dark));
  if(s===3)E('child-enlarged-head-to-body-ratio',0,headY+.18,-.07,.31,.14,.21,M.light);
  if(s===4)pair(d=>L('adolescent-sneaking-gesture-'+d,[[d*.40,.75,.18],
   [d*.52,.96,.26],[d*.58,1.07,.28]],.042,M.main));
  if(s===6)pair(d=>L('elder-face-deep-crease-'+d,[[d*.27,headY-.02,.40],
   [d*.31,headY-.13,.35]],.025,M.dark));
  if(s===7)pair(d=>L('legend-mischief-reaching-arm-'+d,[[d*.30,1.09,-.03],
   [d*.69,.99,.11],[d*.88,1.38,.33]],.075,M.main));
  break;}
 case 'wewe':{
  // Elderly guardian/abductor story, never a witch hat or bat wings.
  // Famous elongated breasts represented as FULLY COVERED pendant drapery.
  const ky=1.72+scale*.23;
  cloth('worn-elder-womans-robe',[[.18,.38,.34,0,0],[.72,.35,.31,0,-.08],
   [1.28,.25,.25,0,-.16],[1.66,.32,.27,0,-.20]],M.main);
  E('curved-hunch-shoulders',0,1.61,-.23,.39,.24,.32,M.dark);
  E('weathered-sunken-elder-face',0,ky,.21,.24,.32,.22,M.light);
  E('prominent-long-bridged-nose',0,ky-.10,.42,.082,.15,.11,M.main);
  E('downturned-toothless-mouth',0,ky-.24,.397,.12,.043,.033,M.dark);
  eyes('wrinkled-staring-eyes',0,ky+.04,.391,.14,.059,M.eye);
  pair(d=>{
   L('crows-feet-creases-'+d,[[d*.17,ky+.12,.40],[d*.27,ky+.09,.33]],.025,M.dark);
   L('drooping-reaching-arm-'+d,[[d*.33,1.46,-.05],
    [d*(.50+scale*.09),.90,.13],[d*(.55+scale*.09),.34,.32]],.068,M.light);
   fingers('weathered-hand',d,d*(.55+scale*.09),.34,.33);
  });
  E('thin-grey-hairstack',0,ky+.31,-.08,.30,.18,.24,M.light);
  strands('stringy-grey-hair',5+s*2,ky+.40,.29,ky-.36-s*.04,M.black);
  // Juvenile phases do NOT have adult secondary anatomy.
  if(s>=4){
   const drop=s===4?.24:s===5?.41:s===6?.49:.62;
   pair(d=>L('distinct-covered-elongated-chest-drape-'+d,
    [[d*.14,1.43,.27],[d*.19,1.16,.39],
     [d*.20,1.16-drop,.31]],.13,M.main));
  }
  if(s===6)for(let j=0;j<3;j++)L('old-long-neck-wrinkle-'+j,
   [[-.15,1.53-j*.055,.28],[0,1.50-j*.055,.32],[.15,1.53-j*.055,.28]],.015,M.dark);
  if(s===7)pair(d=>L('legend-wrapping-shelter-shawl-'+d,
   [[d*.22,1.66,-.28],[d*.71,1.31,-.38],[d*.93,.58,-.44]],.09,M.dark));
  break;}
 case 'jenglot':{
  // The source adult used g.scale=.52. Keep that miniature parent scaling.
  // Specimen: dehydrated, unnaturally long hair/nails, folded limbs.
  const headY=1.57+scale*.14;
  cloth('desiccated-tiny-ribcage',[[.53,.095,.12,0,0],
   [.95,.13,.13,0,0],[1.27,.16,.13,0,-.04]],M.dark,12);
  E('shrunken-parchment-skull',0,headY,.14,.19+scale*.04,.24+scale*.05,.18,M.main);
  E('bone-pointed-chin',0,headY-.21,.23,.11,.11,.12,M.light);
  E('dry-closed-jaw',0,headY-.16,.325,.11,.027,.020,M.dark);
  eyes('hollow-specimen-orbit',0,headY+.07,.285,.12,.043,M.eye);
  pair(d=>{
   L('bony-folded-shoulder-arm-'+d,[[d*.14,1.20,.0],[d*.26,.90,.11],
    [d*.23,.70,.28]],.040,M.dark);
   L('mummified-knee-'+d,[[d*.10,.55,.01],[d*.23,.36,.19],[d*.19,.20,.31]],.053,M.dark);
   for(let k=0;k<3;k++)L('long-specimen-fingernail-'+d+'-'+k,
    [[d*(.21+k*.026),.70,.29],[d*(.29+k*.030),.52-(k%2)*.08,.34]],.013,M.white);
  });
  E('old-hair-scalp',0,headY+.24,-.05,.22,.14,.18,M.black);
  strands('sparse-parchment-hair',4+s*2,headY+.29,.22,.54-(s>=5?.19:0));
  if(s>=3)pair(d=>K('pointed-remnant-tooth-'+d,d*.06,headY-.22,.34,.019,.08,M.white,Math.PI));
  if(s===6)pair(d=>L('elder-specimen-bent-spine-'+d,[[d*.08,1.31,-.17],
   [d*.09,.95,-.20],[d*.07,.63,-.12]],.035,M.light));
  if(s===7)for(let j=0;j<5;j++)L('legend-mummified-hair-radiant-'+j,
    [[(j-2)*.06,headY+.33,-.09],[(j-2)*.11,headY+.76,-.20],
     [(j-2)*.19,headY+.96,-.31]],.027,M.black);
  break;}
 }
 // Small phase-specific 3D landmarks enhance anatomy, not a scale-only switch.
 if(s===1){E('infant-identifying-body-mark',0,.19,.0,.075,.055,.08,M.gold);}
 if(s===2){pair(d=>E('juvenile-asymmetric-marks-'+d,d*.12,.31,-.10,.060,.10,.06,M.dark));}
 if(s===3){L('child-three-part-anatomical-crease',[[-.11,.29,-.16],[0,.33,-.20],[.11,.29,-.16]],.026,M.main);}
 if(s===4){pair(d=>L('adolescent-articulated-tip-'+d,[[d*.19,.34,-.17],[d*.30,.27,-.22]],.030,M.gold));}
 if(s===5){E('mature-age-subtle-finish',0,.17,-.18,.12,.043,.09,M.dark);}
 if(s===6){E('aged-surface-marker',0,.19,-.20,.16,.054,.075,M.light);}
 if(s===7){pair(d=>L('legend-imaginary-local-aura-'+d,[[d*.19,.27,-.19],
    [d*.42,.49,-.26],[d*.59,.75,-.42]],.032,M.gold));}
 rig.userData={id,phase:s,stage:STAGES[s],reconstructed:true,fantasyEvolution:true,
  identity:DETAILS[id].identity,home:DETAILS[id].home,source:DETAILS[id].source,
  nativeReplaced:true,sculpted:true};
 body.userData.NJ98={id,phase:s,source:DETAILS[id].source,primaryGeometry:'NJ98'};
 return true;
};
})();