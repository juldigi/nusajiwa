/* NJ103 · Batch 06: individual, non-generic folklore/cryptid procedural sculpts.
 * Five regional identities x 8 fantasy phases, with PRIOR models entirely hidden.
 * Original cryptid reports are NOT zoological facts; age/egg/legend are game fiction.
 * Render meshes are WebGL geometry (not flat illustrations or CSS model swaps). */
(function(){
'use strict';
if(window.NUSAJIWA_SCULPT103)return;
const IDS=['ahool','nyai_blora','macan_putih','siluman_harimau','ebu_gogo'];
const META={
 ahool:{origin:'Jawa Barat',evidence:'Large batlike cryptid in reports; nocturnal call, gray fur, wide membranous wings. Existence unconfirmed.',source:'https://ndl.ethernet.edu.et/bitstream/123456789/46979/1/George%20M.%20Eberhart.pdf'},
 nyai_blora:{origin:'Jawa',evidence:'Snake-woman silhouette is an ARTISTIC interpretation; specific canonical Nyai Blora anatomy unverified.',source:'https://repositori.kemendikdasmen.go.id/1425/1/Analisis%20Tema%2CAmanat%2C%26%20nilai%20Budaya%20Sastra%20Nusantara%20Di%20Sumatra%20Selatan%20%281994%29.pdf'},
 macan_putih:{origin:'Jawa',evidence:'Mystical white tiger theme. No claim that ceremonial crown or antlers are traditional.',source:'https://budaya-indonesia.org/index.php/Siluman-Harimau-1'},
 siluman_harimau:{origin:'Sumatra',evidence:'Human-to-tiger transformation tales; distinct from ordinary tiger or Kerinci Cindaku identity.',source:'https://repositori.kemendikdasmen.go.id/1425/1/Analisis%20Tema%2CAmanat%2C%26%20nilai%20Budaya%20Sastra%20Nusantara%20Di%20Sumatra%20Selatan%20%281994%29.pdf'},
 ebu_gogo:{origin:'Flores, Nage tradition',evidence:'Small hair-covered humanlike figures, wide flat nose, large mouth, quick-footed movement; not verified as surviving hominins.',source:'https://borobudurwriters.id/film/ebu-gogo-antara-mitos-dan-sains/'}
};
window.NUSAJIWA_SCULPT103_IDS=Object.freeze(IDS.slice());
window.NUSAJIWA_SCULPT103_META=Object.freeze(META);
window.NUSAJIWA_SCULPT103=function(group,body,M,id,stage,T,ell,tube){
 if(!IDS.includes(id)||!group||!body||!M||!T||!ell||!tube)return false;
 const s=Math.max(0,Math.min(7,Math.trunc(Number(stage)||0)));
 if(s===0){for(const o of group.children)o.visible=false;}else{for(const o of body.children)o.visible=false;}
 const host=s===0?group:body,root=new T.Group();root.name='NJ103_'+id+'_F'+s;host.add(root);
 const key=n=>id+'-F'+s+'-'+n;
 const E=(name,x,y,z,w,h,d,m)=>{const q=ell(root,x,y,z,w,h,d,m);q.name=key(name);return q;};
 const L=(name,points,r,m)=>{const q=tube(root,points,r,m);q.name=key(name);return q;};
 const K=(name,x,y,z,r,h,m,rz=0)=>{const q=new T.Mesh(new T.ConeGeometry(r,h,8),m);
  q.name=key(name);q.position.set(x,y,z);q.rotation.z=rz;root.add(q);return q;};
 const W=(name,coords,m)=>{
  const shape=new T.Shape();shape.moveTo(coords[0][0],coords[0][1]);
  coords.slice(1).forEach(v=>shape.lineTo(v[0],v[1]));shape.closePath();
  const q=new T.Mesh(new T.ShapeGeometry(shape),m);q.name=key(name);q.position.z=-.11;root.add(q);return q;
 };
 const pair=f=>{f(-1);f(1)};
 const eyes=(name,y,z,wide=.17)=>pair(d=>{
  E(name+'-orbit-'+d,d*wide,y,z-.047,.076,.081,.057,M.dark);
  E(name+'-globe-'+d,d*wide,y,z,.057,.059,.033,M.light);
  E(name+'-iris-'+d,d*wide,y,z+.037,.033,.037,.017,M.eye);
 });
 const scratches=(name,coords,n,m)=>{for(let j=0;j<n;j++){
  const zz=coords[2]+(j-(n-1)/2)*.085;
  L(name+'-'+j,[[coords[0],coords[1]+.10,zz-.08],
    [coords[0]+.16,coords[1],zz],[coords[0]+.13,coords[1]-.11,zz+.06]],.022,m);
 }};
 const age=[0,.51,.65,.77,.89,1,1.09,1.17][s];
 if(s===0){
  // Symbolic eggs unique to the creature. Mystical ghosts/cryptids do NOT canonically hatch.
  const index=IDS.indexOf(id),w=.45+index*.035;
  E('identity-ritual-egg-only-in-game',0,1.13,0,w,.79-(index%2)*.05,.47,M.main);
  const symbols=[
   [[-.22,1.38,.42],[0,1.62,.45],[.23,1.36,.41]], // bat
   [[-.23,1.11,.43],[0,1.46,.47],[.20,1.68,.38]], // snake
   [[-.24,1.47,.41],[0,1.29,.50],[.24,1.47,.41]], // tiger
   [[-.26,1.17,.43],[0,1.53,.47],[.26,1.17,.43]], // transform
   [[-.20,1.53,.42],[0,1.20,.49],[.20,1.53,.42]]  // human
  ];
  L('regional-identity-egg-relief',symbols[index],.039,M.gold);
  for(let j=0;j<7;j++){
   const x=(j-3)*.084;
   E('not-generic-crest-dot-'+j,x,.98+(j%4)*.15,.46-(j%2)*.022,.037,.052,.021,j%2?M.dark:M.light);
  }
  if(id==='ahool')pair(d=>W('mini-wing-bat-engraving-'+d,
   [[d*.08,1.19],[d*.35,1.48],[d*.28,1.22],[d*.17,1.06]],M.gold));
  if(id==='nyai_blora')L('woven-snake-egg-sigil',[[0,.78,.37],[.25,1.00,.42],
   [-.20,1.22,.49],[.15,1.56,.40]],.025,M.dark);
  root.userData={id,phase:s,fictionalEvolution:true,source:META[id].source,sculpted:true};
  return true;
 }
 if(id==='ahool'){
  // Bat biology: long fingerbones and scalloped MEMBRANES, no feathered eagle wings.
  const wingtip=.83+age*.91,core=.24+age*.14,hy=1.76+age*.14;
  E('grey-furred-bat-core',0,1.18,.02,core,.38+age*.23,.29,M.dark);
  E('flattened-primate-like-bat-face',0,hy,.20,.24+age*.10,.28,.23,M.main);
  E('flattened-not-canine-bat-nose',0,hy-.08,.405,.12,.075,.073,M.light);
  eyes('huge-black-night-eye',hy+.045,.406,.16);
  pair(d=>{
   K('triangular-naked-bat-ear-'+d,d*.27,hy+.35,.12,.095,.29,M.dark,d*.15);
   // Native shape membrane is anatomically tethered to wing finger skeleton.
   W('large-five-lobed-bat-wing-web-'+d,[
    [d*.21,1.49],[d*(wingtip*.51),1.93],[d*wingtip,2.14],
    [d*(wingtip*.89),1.62],[d*(wingtip*.75),1.50],
    [d*(wingtip*.61),1.65],[d*(wingtip*.43),1.30],[d*(wingtip*.30),1.48]
   ],M.main);
   const targets=[[wingtip,2.14],[wingtip*.89,1.62],[wingtip*.75,1.50],[wingtip*.43,1.30]];
   for(let j=0;j<targets.length;j++)L('bat-finger-bone-'+d+'-'+j,
     [[d*.18,1.52,-.08],[d*(wingtip*.50),1.66,-.09],
      [d*targets[j][0],targets[j][1],-.11]],.026+(j===0?.01:0),M.dark);
   L('bat-hind-limb-'+d,[[d*.16,.93,-.06],[d*.30,.49,.09],[d*.28,.27,.19]],.082,M.dark);
   E('backward-grasping-bat-foot-'+d,d*.30,.25,.22,.11,.13,.14,M.light);
  });
  for(let k=0;k<8+s*2;k++){const a=k*2.39996;
   E('individual-coarse-grey-fur-tuft-'+k,Math.sin(a)*core*.74,
     .90+(k%5)*.16,Math.cos(a)*.20-.12,.048,.12,.050,k%3===0?M.light:M.dark);
  }
  if(s>=3)pair(d=>L('growing-wing-claw-hook-'+d,
   [[d*(wingtip*.48),1.91,-.07],[d*(wingtip*.54),2.04,.02],
    [d*(wingtip*.59),2.09,.01]],.031,M.light));
  if(s===6)pair(d=>L('weathered-membrane-margins-'+d,
   [[d*(wingtip*.60),1.59,-.12],[d*(wingtip*.77),1.49,-.13],
    [d*(wingtip*.91),1.64,-.12]],.037,M.dark));
  if(s===7)pair(d=>W('legend-extra-shadow-wing-lobe-'+d,[
   [d*(wingtip*.51),1.91],[d*(wingtip+ .42),2.37],
   [d*(wingtip+.16),1.87],[d*(wingtip*.74),1.72]],M.dark));
 }else if(id==='nyai_blora'){
  // Interpretative woman-serpent form; not the same crowned naga model as Antaboga.
  // Triangular human shoulders, pale human face; continuous coiling snake waist and tail.
  const coilRadius=.25+age*.43,n=16+s*2;
  const pts=[];
  for(let j=0;j<=n;j++){
   const t=j/n,a=t*Math.PI*(2.35+age*.52);
   pts.push([Math.sin(a)*coilRadius*(1-t*.20),.31+t*.18,
    Math.cos(a)*coilRadius*.75-.17]);
  }
  L('long-coiled-snake-tail-replacing-human-legs',pts,.10+age*.073,M.main);
  L('continuous-rising-snake-pelvis',[[0,.46,-.09],[.09,.78,0],[0,1.08,.04]],.20,M.main);
  E('woman-serpent-human-bust',0,1.22,.05,.23+age*.09,.36,.23,M.light);
  E('human-not-lizard-head',0,1.85,.16,.24,.31,.22,M.light);
  E('human-nose-and-strong-cheekbone',0,1.81,.40,.095,.12,.064,M.main);
  eyes('human-guardian-eyes',1.96,.387,.14);
  E('straight-heavy-black-hair-cap',0,2.09,-.06,.31,.16,.24,M.black);
  for(let j=0;j<7+s;j++){const x=(j-(6+s)/2)*.65/(7+s);
   L('long-human-dark-hair-'+j,[[x,2.16,-.07],
     [x*1.24,1.78,-.24],[x*1.39,1.05-(j%3)*.06,-.27]],.025,M.black);
  }
  pair(d=>{
   L('two-human-fingers-arm-'+d,[[d*.22,1.43,.02],[d*.39,1.06,.16],
    [d*.45,.72,.28]],.069,M.light);
   for(let k=0;k<3;k++)L('serpent-womans-long-human-finger-'+d+'-'+k,
    [[d*.45,.74,.29],[d*(.47+k*.035),.57+(k%2)*.04,.35]],.015,M.main);
  });
  for(let j=0;j<5+s*2;j++){
   const p=pts[Math.min(n,2+j*2)];
   E('raised-overlapping-snake-tail-scale-'+j,p[0],p[1]+.14,p[2],
    .070,.040,.087,j%3===0?M.gold:M.dark);
  }
  if(s>=3)pair(d=>L('snake-transforming-shoulder-pattern-'+d,
   [[d*.23,1.36,.22],[d*.31,1.14,.25],[d*.30,.97,.29]],.018,M.gold));
  if(s>=5)E('old-serpent-belly-scales-not-crown',0,1.01,.24,.13,.26,.07,M.gold);
  if(s===6)pair(d=>L('elder-serpent-tongue-hair-'+d,
   [[d*.23,2.13,-.19],[d*.44,1.44,-.29],[d*.54,.91,-.35]],.048,M.black));
  if(s===7)L('legend-extended-serpentine-branch',[[0,.34,-.54],
   [.51,.26,-.89],[.85,.47,-1.15],[.74,.80,-1.28]],.085,M.main);
 }else if(id==='macan_putih'||id==='siluman_harimau'){
  const metamorph=id==='siluman_harimau',human=metamorph&&s<=3;
  const hybrid=metamorph&&s===4;
  if(human){
   // Do not treat siluman as newly identified tiger species.
   const top=1.75+age*.19,torso=.24+age*.12;
   E('Sumatra-shapechanger-human-torso',0,1.07,.03,torso,.53,.26,M.main);
   E('shapechanger-expressive-human-face',0,top,.14,.28,.32,.24,M.light);
   E('human-not-tiger-nose',0,top-.08,.39,.075,.10,.057,M.light);
   eyes('alert-human-eyes',top+.09,.39,.17);
   E('Sumatran-cloth-headband',0,top+.28,-.02,.30,.12,.27,M.dark);
   pair(d=>{
    L('human-long-arm-'+d,[[d*torso,1.38,0],[d*(torso+.20),.90,.11],
     [d*(torso+.22),.48,.19]],.086,M.main);
    L('human-bent-shin-'+d,[[d*.16,.67,-.10],
     [d*.19,.34,.10],[d*.20,.16,.22]],.100,M.main);
    E('human-standing-foot-'+d,d*.20,.13,.27,.16,.10,.22,M.dark);
   });
   for(let j=0;j<s*3;j++){const d=j%2?-1:1,y=.91+(j%4)*.13;
    L('growing-tiger-identity-stripe-'+j,
     [[d*.17,y+.12,.22],[d*.29,y,.23],[d*.19,y-.09,.24]],.021,M.dark);}
   if(s>=2)pair(d=>E('human-claw-emerging-on-hand-'+d,d*(torso+.22),
    .43,.23,.07,.09,.08,M.gold));
   if(s===3){
    pair(d=>K('hybrid-ear-begins-under-hair-'+d,d*.24,top+.36,-.06,.10,.22,M.main));
    L('transformation-growing-tail',
     [[0,.82,-.22],[.25,.93,-.54],[.43,1.16,-.71]],.070,M.main);
   }
  }else{
   const len=.48+age*.34,wide=.35+age*.14,front=.61+age*.23;
   E(hybrid?'half-crouching-tiger-hybrid-torso':'true-fourlegged-white-tiger-body',
    0,.95,-.15,wide,.35+age*.13,len,metamorph?M.main:M.white);
   E('curved-feline-spine-and-shoulder',0,1.25,.13,.31,.20,.42,metamorph?M.light:M.white);
   E('feline-round-head',0,1.50,front*.74,.32+age*.028,.31,.31,metamorph?M.main:M.white);
   E('broad-cat-cheeks',0,1.33,front*.74+.22,.26,.16,.20,M.light);
   E('pink-feline-triangular-nose',0,1.35,front+.15,.12,.085,.085,M.pink);
   eyes('large-living-feline-eye',1.60,front*.74+.25,.18);
   pair(d=>{
    K('rounded-living-tiger-ears-'+d,d*.26,1.84,front*.74-.04,.13,.22,M.dark,d*.18);
    for(const zz of [-.46,.35]){
     L('four-jointed-actual-tiger-leg-'+d+'-'+zz,
      [[d*wide*.81,.94,zz],[d*wide*.97,.54,zz+.05],
       [d*wide*.95,.20,zz+.14]],.11,M.main);
     E('grounded-cat-paw-'+d+'-'+zz,d*wide*.95,.15,zz+.21,.17,.10,.20,M.light);
     for(let k=0;k<3;k++)
      E('nonhuman-paw-toe-'+d+'-'+zz+'-'+k,
      d*(wide*.95+(k-1)*.07),.14,zz+.36,.039,.042,.06,M.main);
    }
    for(let j=0;j<4+s;j++){
     const z=-len*.80+j*len*1.65/(4+s);
     L('individual-true-tiger-broken-stripe-'+d+'-'+j,[[d*.16,1.29,z-.13],
      [d*wide,1.16,z],[d*wide*.90,.98,z+.10]],.025,M.dark);
    }
    L('feline-white-whiskers-'+d,[[d*.15,1.33,front+.11],
     [d*.42,1.36,front+.37]],.019,M.white);
   });
   L('striped-muscular-tiger-tail',[[0,1.01,-len-.18],
    [.20,1.18,-len-.49],[.40,1.08,-len-.73],[.50,.93,-len-.87]],.080,M.main);
   if(metamorph){
    if(hybrid){
     pair(d=>L('last-visible-humanlike-front-palm-'+d,
      [[d*.27,1.24,.27],[d*.39,.87,.45],[d*.51,.65,.59]],.080,M.light));
    }
    if(s>=5)pair(d=>E('former-human-temple-mark-'+d,d*.26,1.59,front*.74+.03,
      .065,.084,.040,M.gold));
    if(s===7)L('legend-transformation-double-tail-echo',[[0,.91,-len-.15],
      [-.18,1.19,-len-.60],[-.57,1.38,-len-.79]],.052,M.dark);
   }else{
    if(s>=3)pair(d=>E('white-tiger-heavy-shoulder-fur-'+d,d*.37,1.24,.12,
      .14,.17,.20,M.white));
    if(s>=5)E('white-tiger-chin-maned-muzzle',0,1.28,front+.22,.23,.11,.18,M.white);
    if(s===6)pair(d=>L('weathered-white-tiger-facial-ridge-'+d,
     [[d*.20,1.66,front*.74+.19],[d*.28,1.51,front*.74+.17]],.030,M.dark));
    if(s===7)for(let j=-2;j<=2;j++)
     E('legend-white-tiger-extra-neck-fur-'+j,j*.13,1.39,-.10,
       .065,.16,.10,M.light);
   }
  }
 }else if(id==='ebu_gogo'){
  // Nage oral traditions: short hairy humanoid, wide nose / mouth.
  // NOT an ape with fully quadruped locomotion or authenticated hominin taxon.
  const headY=1.47+age*.13,torso=.21+age*.10;
  E('small-compact-hairy-humanlike-body',0,.92,.02,torso,.43,.23,M.main);
  E('large-flat-faced-Flores-humanoid',0,headY,.16,.28+age*.05,.27,.23,M.light);
  E('not-monkey-short-wide-flat-nose',0,headY-.05,.39,.17,.073,.09,M.main);
  E('very-wide-mouth',0,headY-.18,.38,.19,.054,.034,M.dark);
  eyes('Nage-wide-awake-humanlike-eye',headY+.09,.368,.16);
  E('messy-matted-hair-cap',0,headY+.24,-.05,.32,.15,.26,M.dark);
  for(let j=0;j<8+s*2;j++){
   const a=j*2.39996,x=Math.sin(a)*torso*.91,z=Math.cos(a)*.17;
   E('individually-bunched-body-hair-'+j,x,.75+(j%5)*.17,z,
     .048,.12,.054,j%3===0?M.dark:M.main);
  }
  pair(d=>{
   L('short-quick-runner-arm-'+d,[[d*torso,.98,.01],[d*(torso+.14),.68,.14],
     [d*(torso+.15),.43,.25]],.087,M.main);
   E('broad-humanlike-hand-'+d,d*(torso+.15),.41,.25,.09,.11,.085,M.light);
   L('bent-running-leg-'+d,[[d*.14,.57,-.08],
     [d*.25,.31,.05],[d*.24,.17,.25]],.098,M.main);
   E('broad-short-runner-foot-'+d,d*.24,.13,.27,.16,.09,.23,M.dark);
  });
  for(let j=0;j<5+s;j++){
   const x=(j-(4+s)/2)*.58/(5+s);
   L('unkempt-Flores-head-hair-'+j,[[x,headY+.26,-.12],
     [x*1.32,headY-.07,-.17],[x*1.61,headY-.36-(j%4)*.036,-.19]],.018,M.black);
  }
  if(s>=3)pair(d=>L('quick-footed-running-ankle-fur-'+d,
   [[d*.24,.36,.01],[d*.30,.24,.11],[d*.31,.12,.20]],.028,M.dark));
  if(s>=5)E('old-growth-low-shoulders',0,1.19,-.08,.31,.15,.20,M.dark);
  if(s===6)pair(d=>L('older-heavy-face-creases-'+d,
   [[d*.19,headY-.09,.37],[d*.24,headY-.17,.34]],.021,M.dark));
  if(s===7)pair(d=>L('legend-story-only-cave-fiber-stole-'+d,
   [[d*.24,1.17,-.18],[d*.40,.81,-.29],[d*.50,.42,-.29]],.035,M.gold));
 }
 // Visible variation is structural beyond uniform scaling: each level also
 // changes joints/crests/cloth, without inventing universal bat wings/horns.
 if(s===1)E('baby-small-incomplete-identity-mark',0,.18,-.20,.080,.047,.068,M.gold);
 if(s===2)pair(d=>E('juvenile-asymmetrical-body-fold-'+d,d*.17,.27,-.20,.073,.095,.062,M.light));
 if(s===3)L('child-new-joint-arc',[[-.16,.32,-.23],[0,.26,-.27],[.16,.32,-.23]],.030,M.dark);
 if(s===4)pair(d=>L('adolescent-extra-contour-'+d,[[d*.16,.44,-.20],[d*.30,.33,-.31]],.030,M.gold));
 if(s===5)E('adult-fully-grown-landmark',0,.21,-.24,.14,.048,.084,M.dark);
 if(s===6)pair(d=>E('elder-thickened-joint-fur-'+d,d*.18,.22,-.24,.08,.062,.08,M.light));
 if(s===7)pair(d=>L('legend-game-ornamental-ribbon-'+d,
   [[d*.19,.33,-.33],[d*.45,.62,-.41],[d*.63,.87,-.52]],.040,M.gold));
 root.userData={id,phase:s,sculpted:true,soleVisibleRig:true,storyVariation:true,
  reference:META[id].source,folkloreNote:META[id].evidence,
  evolutionaryPhases:'fictional-game-progression'};
 body.userData.NJ103={id,phase:s,noSaveChanges:true};
 return true;
};
})();