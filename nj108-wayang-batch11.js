/* NJ108 · Batch 11 — rice goddess and four classical wayang identities.
 * 5 independently designed characters x 8 fantasy stages, previous sculpts
 * completely masked. No universal horns, wings, Western goblin or save writes.
 * Cultural motif from BPCB, ISI, museums and Wayang Kita UGM collections.
 */
(function(){
'use strict';
if(window.NUSAJIWA_SCULPT108)return;
const IDS=['dewi_sri','batara_kala','gatotkaca','bima_wayang','buto_cakil'];
const SRC={
 dewi_sri:'https://kebudayaan.kemdikbud.go.id/bpcbyogyakarta/candi-barong/',
 batara_kala:'https://digilib.isi.ac.id/3874/',
 gatotkaca:'https://wayangmuseum75.wixsite.com/museumwayangjakarta/salinan-dari-salinan-dari-salinan-dar-20',
 bima_wayang:'https://wayangkita.sv.ugm.ac.id/werkudara/',
 buto_cakil:'https://omahwayangklaten.or.id/museum-omah-wayang-klaten/wayang/wayang-lainnya8/'
};
window.NUSAJIWA_SCULPT108_IDS=Object.freeze(IDS.slice());
window.NUSAJIWA_SCULPT108_SOURCES=Object.freeze(SRC);
window.NUSAJIWA_SCULPT108=function(group,body,M,id,stage,T,ell,tube){
 if(!IDS.includes(id)||!group||!body||!M||!T||!ell||!tube)return false;
 const s=Math.min(7,Math.max(0,Math.floor(Number(stage)||0)));
 const host=s===0?group:body;
 if(s===0){for(const q of group.children)q.visible=false;}else{for(const q of body.children)q.visible=false;}
 const root=new T.Group();root.name='NJ108_'+id+'_F'+s;host.add(root);
 const key=x=>id+'-F'+s+'-'+x,pair=fn=>{fn(-1);fn(1)};
 const E=(n,x,y,z,w,h,d,m)=>{const v=ell(root,x,y,z,w,h,d,m);v.name=key(n);return v};
 const L=(n,points,r,m)=>{const v=tube(root,points,r,m);v.name=key(n);return v};
 const C=(n,x,y,z,rr,h,m,rz=0)=>{const v=new T.Mesh(new T.ConeGeometry(rr,h,10),m);v.name=key(n);v.position.set(x,y,z);v.rotation.z=rz;root.add(v);return v};
 const O=(n,x,y,z,r,th,m)=>{const v=new T.Mesh(new T.TorusGeometry(r,th,8,26),m);v.name=key(n);v.position.set(x,y,z);root.add(v);return v};
 const eyes=(n,y,z,span=.15,sz=.058)=>pair(d=>{
  E(n+'-shadow-'+d,d*span,y,z-.037,sz*1.3,sz,.056,M.dark);
  E(n+'-light-'+d,d*span,y,z,sz,sz*.80,.026,M.light);
  E(n+'-iris-'+d,d*span,y,z+.028,sz*.55,sz*.58,.014,M.eye);
 });
 const cloth=(n,rings,m)=>{
  const points=[],idx=[],N=18;
  for(const [y,rx,rz,cx=0,cz=0] of rings)for(let k=0;k<N;k++){
   const a=2*Math.PI*k/N;points.push(cx+Math.cos(a)*rx,y,cz+Math.sin(a)*rz);
  }
  for(let j=0;j<rings.length-1;j++)for(let k=0;k<N;k++){
   const a=j*N+k,b=j*N+(k+1)%N,c=(j+1)*N+k,d=(j+1)*N+(k+1)%N;
   idx.push(a,c,b,b,c,d);
  }
  const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(points,3));
  g.setIndex(idx);g.computeVertexNormals();const mesh=new T.Mesh(g,m);mesh.name=key(n);root.add(mesh);
  return mesh;
 };
 const age=[0,.49,.63,.77,.90,1.03,1.12,1.22][s];
 if(s===0){
  const ii=IDS.indexOf(id),w=.48+.028*ii;
  E('fictional-symbolic-egg-not-canonical-birth',0,1.17,0,w,.77,.46,M.main);
  for(let j=0;j<7;j++){
   const x=(j-3)*w*.23;
   E('raised-iconography-seal-'+j,x,.99+(j%4)*.19,.44,.042,.073,.022,j%2?M.gold:M.dark);
  }
  if(id==='dewi_sri')pair(d=>L('rice-stalk-egg-sigil-'+d,[[d*.08,.74,.39],
   [d*.15,1.19,.49],[d*.28,1.63,.39]],.035,M.gold));
  if(id==='batara_kala')E('Kala-mouth-mask-egg-sigil',0,1.22,.50,.24,.11,.038,M.dark);
  if(id==='gatotkaca')L('flight-no-wings-egg-sigil',[[0,.77,.49],
   [.13,1.23,.52],[0,1.60,.39]],.042,M.gold);
  if(id==='bima_wayang')pair(d=>L('Pancanaka-pair-of-nails-on-seal-'+d,
   [[d*.12,1.01,.45],[d*.22,1.42,.46],[d*.25,1.68,.32]],.030,M.gold));
  if(id==='buto_cakil')C('forward-lower-jaw-egg-mark',0,1.27,.52,.13,.32,M.dark);
  root.userData={id,phase:s,sculpted:true,source:SRC[id],fictionalLifecycle:true};
  return true;
 }
 if(id==='dewi_sri'){
  // Human, gentle agrarian rice guardian, NOT a mermaid or western fairy.
  const hy=1.76+.15*age;
  cloth('Javanese-Sundanese-long-sarong-and-kebaya',[[.18,.42,.28,0,-.05],
   [.56,.35,.27,0,-.07],[1.20,.25,.20,0,0],[1.54,.27,.18,0,0]],M.main);
  E('recognizably-human-goddess-face',0,hy,.15,.24,.30,.21,M.light);
  E('low-styled-Javanese-hair-bun',0,hy+.24,-.13,.28,.16,.22,M.dark);
  eyes('calm-Sri-human-eyes',hy+.08,.36,.14);
  E('gentle-nose',0,hy-.04,.39,.065,.08,.055,M.light);
  pair(d=>{
   L('relaxed-forearm-holding-harvest-'+d,[[d*.24,1.40,0],
    [d*.42,1.01,.17],[d*.44,.77,.28]],.070,M.light);
   E('human-rice-picking-hand-'+d,d*.44,.75,.28,.086,.11,.078,M.light);
   L('paired-handheld-paddy-stem-'+d,[[d*.45,.77,.27],
    [d*.58,1.21,.36],[d*.65,1.71,.40]],.035,M.gold);
   for(let j=0;j<5+s;j++){
    const y=1.18+j*.49/(5+s),xx=d*(.56+j*.011);
    E('multiple-golden-rice-grain-'+d+'-'+j,xx,y,.41,.032,.070,.034,M.gold);
   }
  });
  for(let j=-3;j<=3;j++)L('Javanese-batik-parang-dress-fold-'+j,
   [[j*.082,1.02,.22],[j*.10,.64,.28],[j*.13,.23,.28]],.018,j%2?M.gold:M.light);
  if(s>=3)E('agricultural-protective-shoulder-cloth',0,1.45,-.14,.34,.13,.23,M.gold);
  if(s>=5)for(let i=-2;i<=2;i++)C('Sri-delicate-wayang-headpiece-'+i,
   i*.095,hy+.39-Math.abs(i)*.032,-.01,.045,.16+(2-Math.abs(i))*.045,M.gold);
  if(s===6)pair(d=>L('older-Sri-bundled-rice-shoots-'+d,
   [[d*.64,1.68,.41],[d*.78,1.90,.35],[d*.89,1.99,.26]],.031,M.light));
  if(s===7)pair(d=>L('game-fiction-harvest-legend-ribbon-'+d,
   [[d*.21,1.47,-.21],[d*.63,1.67,-.31],[d*.88,1.94,-.36]],.048,M.gold));
 }else if(id==='batara_kala'){
  // Ruwatan Kala figure: expansive head, beard, exaggerated facial expression,
  // tall praba and waistcloth; not a Tolkien ogre with invented horns.
  const hy=1.71+.17*age,w=.30+.19*age;
  cloth('exaggerated-gold-Kala-guardian-torso',[[.42,.23,.24,0,-.11],
   [.95,w,.35,0,-.16],[1.47,w*1.02,.31,0,-.18]],M.main);
  E('massive-wayang-Kala-bulging-mask-head',0,hy,.15,.39+.055*age,.37,.27,M.main);
  E('very-large-Kala-round-nose',0,hy-.06,.43,.13,.14,.13,M.light);
  E('wide-open-red-dark-snarling-mouth',0,hy-.25,.42,.26,.12,.070,M.dark);
  eyes('Kala-huge-sublime-staring-eyes',hy+.11,.403,.20,.089);
  pair(d=>{
   C('Kala-paired-mouth-fangs-'+d,d*.19,hy-.34,.49,.051,.21,M.white,d*.13);
   L('strong-wayang-downswept-arm-'+d,[[d*w*.83,1.37,-.05],
    [d*(w+.19),.83,.13],[d*(w+.21),.40,.29]],.12,M.main);
   E('Kala-large-clawed-humanlike-palm-'+d,d*(w+.21),.35,.30,.17,.18,.15,M.light);
   L('bulky-Kala-leg-'+d,[[d*.25,.67,-.08],[d*.32,.34,.10],[d*.34,.17,.25]],.15,M.main);
   E('Kala-ornamental-foot-'+d,d*.34,.15,.32,.20,.12,.24,M.dark);
  });
  for(let j=0;j<8+s;j++){const x=(j-(7+s)/2)*.90/(8+s);
   L('thick-uncut-Kala-face-beard-hair-'+j,[[x,hy-.12,-.02],
     [x*1.36,hy-.49,-.15],[x*1.40,hy-.86-(j%3)*.05,-.18]],.022,M.black);
  }
  for(let j=-3;j<=3;j++)C('wayang-praba-not-horns-'+j,
   j*.15,hy+.39+(3-Math.abs(j))*.045,-.17,.061,.24+(3-Math.abs(j))*.06,M.gold);
  for(let j=-3;j<=3;j++)L('Kala-uncal-ornate-kain-'+j,
   [[j*.105,.66,.20],[j*.13,.43,.26],[j*.16,.18,.19]],.029,j%2?M.gold:M.dark);
  if(s>=4)E('Batara-Kala-ruwatan-ornamental-waist-belt',0,.69,.30,.33,.12,.08,M.gold);
  if(s>=6)pair(d=>L('elder-aura-moustache-'+d,[[d*.16,hy-.23,.44],
   [d*.34,hy-.29,.33],[d*.44,hy-.49,.14]],.051,M.black));
  if(s===7)pair(d=>L('legend-Time-Kala-praba-back-curvature-'+d,
   [[d*.34,hy+.38,-.20],[d*.58,hy+.73,-.25],[d*.74,hy+.86,-.31]],.059,M.gold));
 }else if(id==='gatotkaca'){
  // *No wings.* Kotang Antrakusuma is garment attributed to flight.
  const w=.26+.14*age,hy=1.78+.12*age;
  E('muscular-human-Pringgadani-hero-torso',0,1.09,-.04,w,.55,.32,M.main);
  E('Gatotkaca-hero-human-face',0,hy,.16,.25,.28,.23,M.light);
  E('simple-sharp-hero-nose',0,hy-.05,.40,.073,.094,.064,M.main);
  eyes('Gatotkaca-serious-wayang-gaze',hy+.09,.381,.15);
  E('Kotang-Antrakusuma-flight-vest',0,1.16,.24,w*.98,.29,.12,M.gold);
  for(let j=-2;j<=2;j++)L('Kotang-specific-gold-collar-panel-'+j,
   [[j*.098,1.38,.28],[j*.11,1.24,.38],[j*.12,1.03,.34]],.022,M.dark);
  pair(d=>{
   L('no-wing-human-sleeved-hero-arm-'+d,[[d*w*.85,1.38,-.05],
    [d*(w+.21),.98,.16],[d*(w+.28),.66,.33]],.10,M.main);
   E('brajamusti-human-fist-'+d,d*(w+.28),.60,.34,.13,.15,.12,M.light);
   E('royal-gold-upper-arm-bracelet-'+d,d*(w+.18),1.05,.16,.13,.045,.090,M.gold);
   L('knees-of-human-warrior-'+d,[[d*.18,.77,-.10],[d*.24,.38,.08],
    [d*.26,.17,.29]],.122,M.main);
   E('Padakacarma-golden-warrior-sandal-'+d,d*.28,.13,.35,.20,.10,.25,M.gold);
  });
  cloth('wayang-hero-uncal-vastra-skirt',[[.38,.29,.23,0,-.14],
   [.63,.26,.23,0,-.13],[.77,.22,.22,0,-.13]],M.dark);
  for(let j=-3;j<=3;j++)L('swordless-hero-uncal-cloth-fringe-'+j,
   [[j*.08,.58,.18],[j*.12,.35,.27],[j*.13,.20,.27]],.020,M.gold);
  if(s>=2)for(let j=-2;j<=2;j++)C('Gatotkaca-royal-jamang-'+j,
   j*.094,hy+.38-Math.abs(j)*.031,.08,.047,.16+(2-Math.abs(j))*.045,M.gold);
  if(s>=3)pair(d=>L('aviator-cloak-without-biological-wing-'+d,
   [[d*.27,1.29,-.26],[d*.42,.86,-.37],[d*.51,.40,-.39]],.047,M.gold));
  if(s===6)pair(d=>E('mature-banded-golden-bracers-'+d,d*.48,.80,.26,.15,.08,.095,M.gold));
  if(s===7)for(let j=-2;j<=2;j++)L('fictional-flowering-energy-flight-not-wings-'+j,
   [[j*.18,.32,-.28],[j*.28,.61,-.43],[j*.34,.99,-.49]],.037,M.glow);
 }else if(id==='bima_wayang'){
  // Taller broad-shouldered black-faced Bima. Kuku Pancanaka grows from hand,
  // not horn/crown. Gelung, bracelets and checked poleng cloth distinctive.
  const hy=1.83+.13*age,w=.31+.17*age;
  E('very-broad-strong-Werkudara-shoulder-torso',0,1.12,0,w,.59,.35,M.main);
  E('Bima-dark-wayang-hero-face',0,hy,.15,.26,.29,.22,M.dark);
  E('powerful-human-jaw-not-demon-muzzle',0,hy-.16,.36,.21,.14,.12,M.main);
  eyes('downward-Werkudara-focussed-eyes',hy+.04,.374,.15,.058);
  L('supit-urang-wayang-Bima-curling-hair',[[0,hy+.28,-.12],
   [.18,hy+.48,-.24],[.28,hy+.62,-.34],[.14,hy+.75,-.41]],.12,M.black);
  pair(d=>{
   L('long-muscled-human-arm-'+d,[[d*w*.81,1.44,-.08],
    [d*(w+.14),.87,.12],[d*(w+.20),.49,.28]],.12,M.main);
   E('large-human-hand-of-Bima-'+d,d*(w+.20),.45,.29,.12,.17,.11,M.main);
   L('real-curved-Pancanaka-thumb-nail-'+d,[[d*(w+.16),.48,.35],
    [d*(w+.22),.42,.46],[d*(w+.26),.31,.53]],.034,M.white);
   for(let j=0;j<3;j++)L('Bima-other-finger-not-same-as-Pancanaka-'+d+'-'+j,
     [[d*(w+.11+j*.050),.37,.30],[d*(w+.13+j*.055),.23,.36]],.018,M.main);
   E('Kalatbahu-Bima-gold-shoulder-bracelet-'+d,d*(w+.04),1.37,.13,.14,.09,.13,M.gold);
   L('solid-Bima-human-leg-'+d,[[d*.23,.76,-.11],
    [d*.29,.38,.08],[d*.31,.16,.28]],.15,M.main);
   E('bare-strong-foot-'+d,d*.32,.13,.34,.20,.10,.27,M.dark);
  });
  cloth('Bima-batik-Poleng-checker-kain',[[.36,.32,.25,0,-.09],
   [.57,.32,.26,0,-.08],[.78,.25,.22,0,-.07]],M.light);
  for(let row=0;row<3;row++)for(let j=0;j<5;j++)
   E('black-gold-Poleng-checker-'+row+'-'+j,(j-2)*.124,
     .39+row*.14,.26+(j%2)*.02,.056,.054,.018,(j+row)%2?M.dark:M.gold);
  if(s>=3)E('Pancanaka-guardian-waist-belt',0,.79,.26,.30,.095,.10,M.gold);
  if(s>=5)pair(d=>L('battle-trained-human-muscle-scar-'+d,
   [[d*.24,1.38,.29],[d*.33,1.13,.33]],.017,M.dark));
  if(s===7)L('fantasy-wind-Hanuman-kinship-game-ribbon',[[0,.87,-.33],
   [.18,1.26,-.52],[.38,1.69,-.63]],.039,M.gold);
 }else if(id==='buto_cakil'){
  // Cakil is an agile non-bulky Javanese giant with markedly protruding
  // LOWER jaw, long upwards tooth and his OWN keris.
  const hy=1.68+.15*age,w=.21+.068*age;
  E('lean-angular-not-huge-Cakil-torso',0,1.01,-.04,w,.49,.22,M.main);
  E('narrow-long-wayang-Cakil-face',0,hy,.13,.24,.31,.20,M.main);
  E('extended-far-forward-LOWER-jaw',0,hy-.22,.47,.18,.12,.27,M.light);
  E('protruding-mouth-void',0,hy-.12,.39,.13,.071,.058,M.dark);
  C('one-LOWER-long-upward-tooth',.075,hy-.17,.69,.055,.30,M.white,.18);
  eyes('slitted-sneering-Cakil-eye',hy+.09,.36,.15,.048);
  E('large-hooked-Cakil-nose',0,hy-.03,.36,.095,.12,.11,M.main);
  E('greasy-wayang-hair-cap',0,hy+.29,-.13,.29,.13,.23,M.dark);
  pair(d=>{
   L('thin-jittery-elbow-arm-'+d,[[d*w,1.32,0],[d*(w+.28),1.10,.16],
    [d*(w+.37),.64,.27]],.077,M.main);
   E('long-bony-Cakil-fingered-hand-'+d,d*(w+.37),.62,.28,.087,.12,.082,M.light);
   L('long-kneed-Cakil-spring-leg-'+d,[[d*.16,.65,-.08],
    [d*.29,.39,.09],[d*.22,.16,.26]],.086,M.main);
   E('broad-stabbing-ground-foot-'+d,d*.24,.13,.34,.15,.09,.19,M.dark);
  });
  cloth('Wayang-Perang-Kembang-Cakil-waistcloth',[[.35,.26,.23,0,-.06],
    [.65,.26,.22,0,-.06]],M.dark);
  for(let i=0;i<5+s;i++)L('Cakil-wayang-ornamental-kain-fringe-'+i,
   [[(i-(4+s)/2)*.069,.62,.21],
    [(i-(4+s)/2)*.089,.32,.27]],.020,M.gold);
  if(s>=2){
   // Keris traditionally used by Cakil; blade kris bent zigzag physically.
   L('Cakil-keris-hilt',[[w+.36,.59,.25],[w+.47,.80,.33]],.056,M.dark);
   L('Cakil-keris-luk-wavy-blade',[[w+.46,.81,.34],[w+.51,1.04,.37],
    [w+.43,1.18,.39],[w+.54,1.33,.41],[w+.47,1.49,.44]],.025,M.white);
  }
  if(s>=4)pair(d=>E('asymmetric-wayang-raksasa-wristband-'+d,d*(w+.30),
   .85,.24,.075,.055,.06,M.gold));
  if(s===6)pair(d=>L('old-cackling-jaw-wrinkle-'+d,
   [[d*.13,hy-.16,.54],[d*.18,hy-.26,.49]],.021,M.dark));
  if(s===7)L('fantasy-Perang-Kembang-stab-movement',[[w+.48,1.48,.39],
   [w+.76,1.74,.42],[w+.91,1.90,.48]],.038,M.gold);
 }
 // A stage affects independently sculpted morphology AND secondary landmarks.
 if(s===1)E('younger-mythic-structural-stud',0,.19,-.27,.072,.060,.054,M.gold);
 if(s===2)pair(d=>E('juvenile-specific-seam-'+d,d*.15,.24,-.29,.080,.10,.055,M.light));
 if(s===3)L('youth-carved-identity-border',[[-.17,.39,-.28],[0,.30,-.31],[.17,.39,-.28]],.025,M.dark);
 if(s===4)pair(d=>L('adolescent-new-long-limb-ribbon-'+d,[[d*.18,.44,-.28],[d*.35,.32,-.35]],.034,M.gold));
 if(s===5)E('adult-identity-specific-relief',0,.17,-.29,.15,.040,.080,M.dark);
 if(s===6)pair(d=>E('elder-material-distinct-stud-'+d,d*.19,.21,-.32,.085,.061,.065,M.light));
 if(s===7)pair(d=>L('Legend-original-fiction-streamers-'+d,[[d*.20,.29,-.40],
   [d*.39,.51,-.47],[d*.54,.79,-.52]],.046,M.gold));
 root.userData={id,phase:s,sculpted:true,source:SRC[id],nativeReplaced:true,saveUntouched:true,
  folkloreLifecycle:'fictional-game-adaptation'};
 body.userData.NJ108={id,phase:s,authoritativeRig:'NJ108'};
 return true;
};
})();