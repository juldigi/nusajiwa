/* NJ105 — Batch 08: source-aware urban legends / regional spirits.
 * FIVE individually reconstructed 3D characters × EIGHT fantasy game phases.
 * These are FOLKLORE STORIES, not scientifically established apparitions.
 * Red dress, urban narrative and sacred sea queens are NOT interchangeable.
 * Stage zero is a symbolic game seal, NOT literal reproduction or birth. */
(function(){
'use strict';
if(window.NUSAJIWA_SCULPT105)return;
const IDS=['nenek_pakande','si_manis_jembatan_ancol','hantu_jeruk_purut','nyi_roro_kidul','dewi_lanjar'];
const META={
 nenek_pakande:{region:'Bugis, Sulawesi Selatan',identity:'Elderly hunched Bugis woman, white hair in bun, plaid sarong, walking stick; child-eating figure in cautionary folk story.',source:'https://rri.co.id/makassar/wawancara/1358077/pesan-moral-dibalik-cerita-rakyat-nene-pakande'},
 si_manis_jembatan_ancol:{region:'Jakarta / Betawi',identity:'Human young woman with flowing hair near Ancol bridge; costume varies: white in 1990s film and red in newer interpretations.',source:'https://www.liputan6.com/showbiz/read/4100566/si-manis-jembatan-ancol-tak-lagi-seksi-dan-bergaun-putih-ini-alasannya'},
 hantu_jeruk_purut:{region:'TPU Jeruk Purut, Jakarta',identity:'Urban story of headless robed pastor carrying own head, accompanied by dark dog. Fictional folklore, NOT a historical assertion.',source:'https://www.youtube.com/watch?v=f3hBxmqQn0M'},
 nyi_roro_kidul:{region:'Pantai Selatan Jawa',identity:'South Sea royal lady wearing emerald green and gold in some coastal traditions; human regal form, not mermaid.',source:'https://jantra.kemdikbud.go.id/index.php/jantra/article/download/69/46/98'},
 dewi_lanjar:{region:'Pantai Slamaran, Pekalongan, Jawa Tengah',identity:'Legendary sovereign of Java north sea, tied to Pekalongan Slamaran and batik-making; distinct from South Sea queen.',source:'https://download.garuda.kemdikbud.go.id/article.php?article=814715&title=Netlore+Tourism+in+Pekalongan&val=12747'}
};
window.NUSAJIWA_SCULPT105_IDS=Object.freeze(IDS.slice());
window.NUSAJIWA_SCULPT105_META=Object.freeze(META);
window.NUSAJIWA_SCULPT105=function(group,body,M,id,phase,T,ell,tube){
 if(!IDS.includes(id)||!group||!body||!M||!T||!ell||!tube)return false;
 const s=Math.max(0,Math.min(7,Math.floor(Number(phase)||0)));
 const rootParent=s===0?group:body;
 if(s===0){for(const n of group.children)n.visible=false;}
 else {for(const n of body.children)n.visible=false;}
 const rig=new T.Group();rig.name='NJ105_'+id+'_F'+s;rootParent.add(rig);
 const p=n=>id+'-F'+s+'-'+n;
 const E=(n,x,y,z,rx,ry,rz,m)=>{const o=ell(rig,x,y,z,rx,ry,rz,m);o.name=p(n);return o};
 const L=(n,pts,r,m)=>{const o=tube(rig,pts,r,m);o.name=p(n);return o};
 const pair=f=>{f(-1);f(1)};
 const K=(n,x,y,z,r,h,m,rz=0)=>{
  const o=new T.Mesh(new T.ConeGeometry(r,h,9),m);
  o.name=p(n);o.position.set(x,y,z);o.rotation.z=rz;rig.add(o);return o;
 };
 const R=(n,x,y,z,r,wire,m,aroundY=false)=>{
  const o=new T.Mesh(new T.TorusGeometry(r,wire,8,30),m);
  o.name=p(n);o.position.set(x,y,z);if(aroundY)o.rotation.x=Math.PI/2;rig.add(o);return o;
 };
 const loft=(n,rings,m,segments=20)=>{
  const vertices=[],triangles=[];
  for(const [y,w,d,cx=0,cz=0] of rings)for(let k=0;k<segments;k++){
   const a=k*2*Math.PI/segments;vertices.push(cx+w*Math.cos(a),y,cz+d*Math.sin(a));
  }
  for(let j=0;j<rings.length-1;j++)for(let k=0;k<segments;k++){
   const a=j*segments+k,b=j*segments+(k+1)%segments,c=(j+1)*segments+k,d=(j+1)*segments+(k+1)%segments;
   triangles.push(a,c,b,b,c,d);
  }
  const geom=new T.BufferGeometry();
  geom.setAttribute('position',new T.Float32BufferAttribute(vertices,3));
  geom.setIndex(triangles);geom.computeVertexNormals();
  const o=new T.Mesh(geom,m);o.name=p(n);rig.add(o);return o;
 };
 const eye=(n,y,z,dx=.15,size=.064)=>pair(d=>{
  E(n+'-sunken-socket-'+d,d*dx,y,z-.04,size*1.3,size*1.05,.06,M.dark);
  E(n+'-visible-eyeball-'+d,d*dx,y,z,size,size*.81,.03,M.white);
  E(n+'-iris-'+d,d*dx,y,z+.035,size*.52,size*.57,.016,M.eye);
 });
 const hair=(n,up,low,span,nstrands,color=M.black)=>{
  for(let i=0;i<nstrands;i++){
   const x=(i-(nstrands-1)/2)*span/nstrands;
   L(n+'-strand-'+i,[[x,up,-.10],[x*1.22,up-.34,-.20],
     [x*1.52+(i%3-1)*.07,low+(i%4)*.055,-.24]],.018+(i%3)*.005,color);
  }
 };
 const rings=(n,k,y,z,spread,m)=>{for(let i=0;i<k;i++){
  const x=(i-(k-1)/2)*spread/Math.max(1,k-1);
  E(n+'-inlay-'+i,x,y+(i%3)*.040,z,.046,.076,.025,i%2?m:M.gold);
 }};
 const scale=[0,.51,.67,.81,.94,1.07,1.14,1.23][s];
 const red=new T.MeshStandardMaterial({color:'#873747',roughness:.83,side:T.DoubleSide});
 const emer=new T.MeshStandardMaterial({color:'#17694e',roughness:.76,metalness:.09,side:T.DoubleSide});
 const sea=new T.MeshStandardMaterial({color:'#396a79',roughness:.68,side:T.DoubleSide});
 const cloth=new T.MeshStandardMaterial({color:'#8b775e',roughness:.91,side:T.DoubleSide});
 const check=new T.MeshStandardMaterial({color:'#474645',roughness:.92,side:T.DoubleSide});
 if(s===0){
  const i=IDS.indexOf(id),w=.47+(i%3)*.06;
  E('symbolic-identity-seal-not-canonical-egg',0,1.12,0,w,.79,.45,
    id==='nyi_roro_kidul'?emer:id==='si_manis_jembatan_ancol'?red:M.main);
  const motifs=[
   [[-.23,1.49,.39],[0,1.22,.50],[.23,1.49,.39]],
   [[-.22,1.48,.41],[0,.96,.49],[.22,1.48,.41]],
   [[-.20,1.44,.40],[0,1.31,.49],[.20,1.44,.40]],
   [[-.27,1.27,.39],[0,1.62,.45],[.27,1.27,.39]],
   [[-.27,.98,.40],[0,1.50,.45],[.27,.98,.40]]
  ];
  L('culture-specific-glyph',motifs[i],.039,M.gold);
  for(let j=0;j<6;j++)E('symbolic-embossed-rim-'+j,
   (j-2.5)*.105,1.10+(j%3)*.14,.45,.031,.053,.019,M.light);
  if(id==='hantu_jeruk_purut')R('empty-neck-urban-emblem',0,1.40,.47,.12,.031,M.dark);
  if(id==='nenek_pakande')L('walking-stick-emblem',[[-.21,.89,.43],[-.17,1.50,.41],
   [-.03,1.55,.39]],.035,M.dark);
  rig.userData={id,phase:s,source:META[id].source,fictionalStages:true,rebuilt:true};
  return true;
 }
 switch(id){
 case 'nenek_pakande':{
  // RRI ethnographic description: white bun, hunched elderly posture, plaid sarong & cane.
  // No Wewe breast silhouette, no Western witch's pointed hat.
  const faceY=1.61+.11*scale;
  loft('Bugis-old-womans-plaid-sarong',[[.18,.32,.29,.03,-.07],[.46,.29,.27,.04,-.07],
   [.92,.25,.22,.09,-.14],[1.36,.24,.20,.16,-.16]],check);
  E('emphatically-hunched-old-back',.04,1.27,-.26,.35,.30,.32,cloth);
  E('thin-weathered-elder-face',.18,faceY,.16,.26,.34,.23,M.light);
  E('high-angled-old-nose',.19,faceY-.055,.39,.083,.13,.11,M.main);
  E('broad-toothless-wary-mouth',.18,faceY-.22,.376,.13,.04,.03,M.dark);
  pair(d=>{
   E('sunken-asymmetric-old-cheek-'+d,.18+d*.20,faceY-.13,.33,.12,.11,.06,M.main);
   L('elder-low-reaching-arm-'+d,[[d*.28+.09,1.30,-.05],
    [d*(.42+.09*scale)+.05,.82,.10],[d*(.48+.1*scale),.47,.22]],.063,M.light);
   for(let j=0;j<3;j++)L('arthritic-fingers-'+d+'-'+j,
    [[d*.48,.45,.25],[d*(.51+j*.035),.34-(j%2)*.032,.28]],.016,M.dark);
  });
  E('white-hair-bun-on-back-of-head',.12,faceY+.30,-.19,.22,.20,.18,M.white);
  hair('grey-Bugis-elder-wisps',faceY+.20,faceY-.35,.58,5+s,M.light);
  // Distinct plaid: crossing threads, not a generic robe.
  for(let i=0;i<6+s;i++){
   const x=(i-(5+s)/2)*.51/(6+s);
   L('sarong-vertical-thread-'+i,[[x,.97,.20],[x*1.20,.56,.26],
    [x*1.30,.20,.27]],.012,i%2?M.light:M.gold);
  }
  for(let j=0;j<4+s;j++){
   const yy=.24+j*.78/(4+s);
   L('plaid-sarong-horizontal-thread-'+j,[[-.26,yy,.22],[0,yy,.29],
    [.27,yy,.22]],.014,j%2?M.dark:M.gold);
  }
  L('separate-wooden-walking-stick',[[.48,.10,.45],[.43,.68,.44],
   [.39,1.34,.42],[.26,1.39,.42]],.052,cloth);
  if(s>=3)E('elder-forward-shoulder-pinch',.14,1.37,-.15,.27,.16,.21,M.dark);
  if(s>=5)pair(d=>L('elder-crows-foot-line-'+d,
   [[.18+d*.14,faceY+.09,.36],[.18+d*.22,faceY+.04,.31]],.018,M.dark));
  if(s===6)hair('extra-aged-white-locks',faceY+.25,.48,.64,12,M.light);
  if(s===7)pair(d=>L('imaginary-story-shadow-from-cane-'+d,[[d*.22,.47,-.17],
   [d*.45,.73,-.23],[d*.63,.99,-.30]],.035,M.gold));
  break;
 }
 case 'si_manis_jembatan_ancol':{
  // Urban-legend woman in red (modern depiction); deliberately NOT kuntilanak
  // in a white shroud. Garment is urban dress with sash and hem detail.
  const y=1.79+.08*scale;
  loft('modern-red-Ancol-dress-with-defined-waist',[[.12,.37+.12*scale,.34],
   [.41,.39,.29],[.89,.26,.23],[1.27,.23,.19],[1.53,.22,.18]],red);
  E('human-youthful-face-not-zombie-mask',0,y,.18,.24,.31,.22,M.light);
  E('prominent-natural-human-nose',0,y-.035,.383,.075,.093,.06,M.main);
  E('faint-calm-lips',0,y-.20,.37,.105,.033,.027,M.pink);
  eye('Ancol-gaze',y+.06,.371,.14,.053);
  E('carefully-combed-parting',0,y+.25,-.11,.29,.14,.27,M.black);
  hair('long-straight-Ancol-hair',y+.27,.56, .61,7+s);
  pair(d=>{
   L('natural-sleeved-urban-human-arm-'+d,[[d*.23,1.49,-.01],
    [d*.34,1.07,.11],[d*.38,.65,.19]],.070,red);
   E('relaxed-ordinary-fingers-'+d,d*.38,.60,.19,.090,.13,.083,M.light);
   L('fashionable-open-scarf-tail-'+d,[[d*.20,1.51,-.10],
    [d*.37,1.08,-.14],[d*.48,.44,-.20]],.045,M.light);
  });
  E('sash-knotted-at-waist',0,1.09,.22,.25,.065,.08,M.light);
  for(let k=0;k<5+s;k++){
   const x=(k-(4+s)/2)*.46/(5+s);
   L('red-cloth-cut-and-seam-'+k,[[x*.8,1.05,.21],[x,.63,.23],
    [x*1.16,.19,.25]],.013,M.dark);
  }
  // Bridge ironwork is a tiny prop behind figure, NOT ghost anatomy.
  pair(d=>L('Ancol-cast-iron-bridge-reference-'+d,[[d*.33,.20,-.43],
   [d*.43,.75,-.43],[d*.49,.82,-.43]],.035,check));
  if(s>=3)pair(d=>E('young-long-hair-framing-ear-'+d,d*.27,y-.03,.03,
    .080,.27,.08,M.black));
  if(s>=5)L('iconic-wind-caught-red-scarf',[[.22,1.50,-.14],
   [.55,1.72,-.30],[.89,1.64,-.48]],.065,red);
  if(s===6)pair(d=>L('sombre-wind-whipped-hair-'+d,[[d*.21,y+.27,-.20],
   [d*.50,1.31,-.38],[d*.69,.64,-.41]],.045,M.black));
  if(s===7)pair(d=>L('legend-Ancol-river-mist-'+d,[[d*.30,.45,-.36],
   [d*.60,.65,-.53],[d*.74,.98,-.63]],.049,M.light));
  break;
 }
 case 'hantu_jeruk_purut':{
  // Horror URBAN LEGEND: headless dark-robed pastor carrying his head, black dog.
  // No neck mounted human skull; both body and dog in one diorama-like sculpt.
  loft('dark-religious-robe-human-body-no-head',[[.18,.37+.07*scale,.29],
   [.72,.28+.05*scale,.27],[1.14,.28,.24],[1.48,.25,.19]],M.black);
  E('flat-neck-void-not-an-attached-skull',0,1.52,0,.135,.055,.135,M.dark);
  R('void-at-neck-rim',0,1.53,0,.13,.029,M.light,true);
  pair(d=>L('sleeves-of-headless-robed-figure-'+d,[[d*.23,1.40,-.05],
   [d*.36,1.01,.10],[d*.42,.70,.24]],.080,M.black));
  // One head at a HAND LEVEL, NO attached head on neck.
  E('detached-human-head-held-in-left-hand',-.45,.67,.27,.24,.28,.23,M.light);
  E('pastors-closed-eyelids-on-carried-head',-.45,.72,.49,.15,.025,.03,M.dark);
  E('pastors-hair-on-held-head',-.45,.88,.13,.25,.12,.22,M.black);
  E('holding-head-clutch',-.43,.49,.32,.11,.11,.11,M.light);
  // Separate quadruped BLACK DOG, not a wolf with magical wings.
  const dogX=.69+scale*.08,dogY=.40;
  E('separate-black-dog-low-barrel',dogX,dogY,-.20,.26+.065*scale,.22,.40,M.black);
  E('black-dog-head-with-forward-muzzle',dogX,.55,.20,.21,.23,.23,M.dark);
  E('black-dog-dropped-snout',dogX,.46,.39,.17,.085,.14,M.black);
  pair(d=>{
   K('two-pointed-alert-dog-ears-'+d,dogX+d*.15,.81,.15,.070,.19,M.black,d*.20);
   E('dog-tiny-eye-'+d,dogX+d*.145,.59,.38,.047,.047,.027,M.gold);
   for(const zz of [-.41,.08]){
    L('black-dog-four-paws-'+d+'-'+zz,[[dogX+d*.18,.36,zz],
      [dogX+d*.18,.18,zz+.04]],.062,M.black);
    E('little-black-dog-foot-'+d+'-'+zz,dogX+d*.18,.12,zz+.12,.09,.075,.12,M.dark);
   }
  });
  L('dog-tail-curved-near-gravestones',[[dogX,.47,-.53],
    [dogX+.14,.67,-.69],[dogX+.18,.72,-.79]],.045,M.black);
  if(s>=2){
   // Headless cloak split hem does NOT reveal human skull.
   pair(d=>L('split-robe-fold-'+d,[[d*.22,.92,.20],[d*.30,.50,.25],
    [d*.35,.18,.31]],.021,M.dark));
  }
  if(s>=4)E('pastor-robe-collar-tab',0,1.43,.17,.078,.035,.04,M.white);
  if(s>=5)L('old-graveyard-iron-arch-background',[[-.73,.14,-.47],
   [-.72,1.18,-.47],[-.57,1.43,-.47]],.043,check);
  if(s===6)pair(d=>L('weathered-robe-ragged-edge-'+d,[[d*.28,.48,.04],
   [d*.46,.20,-.11],[d*.49,.10,-.20]],.036,M.dark));
  if(s===7)pair(d=>L('legend-night-cemetery-shadow-'+d,[[d*.21,.36,-.38],
   [d*.51,.63,-.54],[d*.69,.94,-.59]],.037,M.dark));
  break;
 }
 case 'nyi_roro_kidul':{
  // South-Java sea queen is HUMAN and regal, NOT fish-tailed mermaid.
  const y=1.79+.10*scale;
  loft('south-sea-emerald-green-court-dress',[[.12,.40+.13*scale,.35],
   [.47,.38+.06*scale,.32],[1.04,.28,.26],
   [1.46,.26,.23],[1.66,.23,.20]],emer);
  E('ratu-kidul-calm-royal-face',0,y,.15,.26,.32,.22,M.light);
  E('natural-royal-nose',0,y-.04,.39,.08,.105,.060,M.main);
  eye('royal-calm-gaze',y+.065,.37,.155,.055);
  E('closed-aristocratic-mouth',0,y-.20,.385,.115,.027,.027,M.pink);
  E('South-Sea-queen-hair-band',0,y+.29,-.10,.30,.13,.25,M.black);
  hair('sleek-royal-dark-hair',y+.24,.81,.59,7+s);
  pair(d=>{
   L('court-dress-sleeve-'+d,[[d*.26,1.48,.02],
    [d*.42,1.07,.10],[d*.46,.70,.19]],.079,emer);
   E('bare-human-royal-hand-'+d,d*.46,.65,.18,.092,.12,.083,M.light);
   L('South-Sea-green-gold-cloth-cape-'+d,[[d*.23,1.47,-.18],
    [d*.56,.91,-.31],[d*.65,.28,-.49]],.054,M.gold);
  });
  for(let i=0;i<7+s;i++){
   const k=(i-(6+s)/2)*.46/(7+s);
   L('sophisticated-green-javanese-skirt-fold-'+i,
    [[k*.73,1.29,.20],[k,.71,.29],[k*1.21,.16,.32]],.016,M.gold);
  }
  if(s>=3)rings('royal-court-waist-ornament',5,1.08,.267,.45,M.gold);
  if(s>=4){
   for(let i=-2;i<=2;i++)K('Southern-sea-crown-prong-'+i,i*.12,y+.38,
    -.03,.047,.15+(2-Math.abs(i))*.068,M.gold);
  }
  if(s>=5)pair(d=>L('ratu-kidul-waves-passing-behind-court-'+d,
   [[d*.32,.27,-.40],[d*.66,.49,-.52],[d*.87,.38,-.62]],.051,sea));
  if(s===6)E('elder-royal-court-headdress-panel',0,y+.44,-.14,.20,.08,.14,M.gold);
  if(s===7)pair(d=>L('legend-South-Sea-royal-tide-'+d,[[d*.35,.55,-.49],
   [d*.91,.91,-.64],[d*1.18,1.41,-.83]],.065,emer));
  break;
 }
 case 'dewi_lanjar':{
  // NORTH SEAS queen, Pekalongan weaving/Jlamprang: not southern queen clone.
  const y=1.73+.09*scale;
  loft('north-coast-Pekalongan-royal-batik-wrap',[[.16,.36+.10*scale,.34],
   [.57,.34,.31],[1.15,.26,.24],[1.51,.24,.19]],sea);
  E('Dewi-Rara-Kuning-human-north-coast-face',0,y,.17,.23,.29,.21,M.light);
  E('slender-young-human-nose',0,y-.04,.38,.07,.095,.059,M.main);
  E('serene-closed-human-lips',0,y-.19,.376,.10,.032,.024,M.pink);
  eye('Pekalongan-royal-human-gaze',y+.05,.363,.135,.048);
  E('smooth-bound-Java-hair-bun',0,y+.20,-.19,.24,.16,.21,M.black);
  E('round-hair-back-bun',0,y+.17,-.31,.19,.18,.13,M.black);
  pair(d=>{
   L('functional-loose-batik-sleeve-'+d,[[d*.24,1.39,-.01],
    [d*.39,1.04,.13],[d*.43,.69,.20]],.075,sea);
   E('two-human-hands-north-coast-'+d,d*.43,.66,.18,.086,.12,.08,M.light);
   L('Pekalongan-scarf-strong-outline-'+d,[[d*.25,1.42,-.18],
    [d*.48,.98,-.27],[d*.52,.40,-.35]],.052,M.light);
  });
  // Jlamprang: geometric batik diamonds arranged in distinct repeated diamonds.
  for(let row=0;row<2+Math.floor(s/2);row++)for(let k=-2;k<=2;k++){
   const x=k*.105,y0=.43+row*.22,z=.307-(Math.abs(k)*.014);
   L('Pekalongan-batik-jlamprang-diamond-'+row+'-'+k,
    [[x,y0+.06,z],[x+.047,y0,z],[x,y0-.06,z],[x-.047,y0,z],[x,y0+.06,z]],
    .013,M.gold);
  }
  // Unique NORTH COAST fishery / fishermen motif; no seahorse, fish tail or Trident.
  pair(d=>L('north-coast-fishnet-in-cape-'+d,[[d*.23,.89,-.28],
   [d*.46,.64,-.36],[d*.54,.36,-.43]],.021,M.gold));
  if(s>=3)E('Slamaran-coast-shell-emblem',0,1.05,.25,.14,.11,.07,M.gold);
  if(s>=4)R('small-north-coast-Batik-crown',0,y+.29,-.06,.23,.032,M.gold);
  if(s>=5)for(let j=-2;j<=2;j++){
   L('north-coast-rolling-waves-'+j,[[j*.13,.29,-.39],
    [j*.18,.39,-.50],[j*.20,.32,-.63]],.032,sea);
  }
  if(s===6)pair(d=>L('mature-north-coast-robe-trailing-'+d,
   [[d*.27,.71,-.34],[d*.58,.47,-.44],[d*.76,.29,-.60]],.048,sea));
  if(s===7)pair(d=>L('legend-Slamaran-blue-tide-'+d,
   [[d*.19,.37,-.40],[d*.71,.90,-.60],[d*.97,1.05,-.79]],.065,M.gold));
  break;
 }
 }
 // Development markers represent game phase, not asserted folkloric genealogy.
 if(s===1)E('game-baby-unique-mark',0,.21,-.26,.074,.046,.064,M.gold);
 if(s===2)pair(d=>E('game-juvenile-asymmetry-'+d,d*.13,.27,-.29,.072,.088,.052,M.light));
 if(s===3)L('game-child-articulated-detail',[[-.14,.36,-.32],
    [0,.29,-.36],[.14,.36,-.32]],.026,M.gold);
 if(s===4)pair(d=>L('game-teen-accent-'+d,[[d*.14,.48,-.31],[d*.28,.40,-.38]],.030,M.gold));
 if(s===5)E('game-adult-cultural-detail',0,.22,-.31,.13,.044,.077,M.dark);
 if(s===6)pair(d=>E('game-elder-emblem-'+d,d*.19,.27,-.37,.079,.061,.066,M.light));
 if(s===7)pair(d=>L('legend-fantasy-shadow-not-source-claim-'+d,
    [[d*.18,.35,-.49],[d*.40,.64,-.57],[d*.58,.86,-.69]],.046,M.gold));
 rig.userData={id,phase:s,source:META[id].source,culturalRegion:META[id].region,
  artisticInterpretation:true,lifecycle:'fictional game',noPriorRigOverlap:true};
 body.userData.NJ105={id,phase:s,reconstructed:true,saveUnaffected:true};
 return true;
};
})();