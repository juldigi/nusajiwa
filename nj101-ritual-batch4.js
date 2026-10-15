/* NJ101 · Batch 04: five HAND-DIRECTED procedural character reconstructions.
 * Barong Ket, Rangda, Kuda Sembrani, Kuda Kepang, Singo Barong Reog.
 * Cultural archetypes: museum mask/performance records; fantasy egg and growth
 * are explicitly gameplay inventions, not facts about ceremonial objects.
 * Existing previous rig hidden per target. No save/progression mutation. */
(function(){
'use strict';
if(window.NUSAJIWA_SCULPT101)return;
const IDS=['barong','rangda','sembrani','kuda_lumping','singa_barong_reog'];
const SOURCES=Object.freeze({
 barong:'https://www.maskmuseum.org/mask/bali-barong-ket/',
 rangda:'https://www.maskmuseum.org/mask/bali-rangda/',
 sembrani:'https://kebudayaan.kemdikbud.go.id/ditkma/buku-seri-pengenalan-budaya-nusantara-2019-2/',
 kuda_lumping:'https://www.indonesia.travel/id/id/travel-ideas/culture/kesenian-kuda-lumping',
 singa_barong_reog:'https://visitponorogo.id/tours/monumen-reog-ponorogo'
});
window.NUSAJIWA_SCULPT101_IDS=Object.freeze(IDS.slice());
window.NUSAJIWA_SCULPT101_SOURCES=SOURCES;
window.NUSAJIWA_SCULPT101=function(group,body,M,id,phase,T,ell,tube){
 if(!IDS.includes(id)||!group||!body||!M||!T||!ell||!tube)return false;
 const s=Math.min(7,Math.max(0,Math.trunc(Number(phase)||0)));
 const host=s===0?group:body;
 // Whole-rig replacement. Never let a generic previous-phase/sculpt poke through.
 if(s===0){for(const node of group.children)node.visible=false;}
 else for(const node of body.children)node.visible=false;
 const rig=new T.Group();rig.name='NJ101_'+id+'_F'+s;host.add(rig);
 const tag=n=>id+'-F'+s+'-'+n;
 const E=(n,x,y,z,a,b,c,m)=>{const q=ell(rig,x,y,z,a,b,c,m);q.name=tag(n);return q};
 const L=(n,pts,r,m)=>{const q=tube(rig,pts,r,m);q.name=tag(n);return q};
 const C=(n,x,y,z,r,h,m,rz=0)=>{
  const q=new T.Mesh(new T.ConeGeometry(r,h,9),m);
  q.name=tag(n);q.position.set(x,y,z);q.rotation.z=rz;rig.add(q);return q;
 };
 const pair=f=>{f(-1);f(1)};
 const F=(n,vertices,m,depth=.06)=>{
  // Triangulated, independently authored XY silhouette with shallow relief.
  // A real mesh, not a billboard sprite; a primitive ExtrudeGeometry preserves
  // the flat bamboo horse's appearance as a ritual performance prop.
  const sh=new T.Shape();sh.moveTo(vertices[0][0],vertices[0][1]);
  for(let k=1;k<vertices.length;k++)sh.lineTo(vertices[k][0],vertices[k][1]);
  sh.closePath();
  const q=new T.Mesh(new T.ExtrudeGeometry(sh,{depth,bevelEnabled:true,
   bevelThickness:.012,bevelSize:.015,bevelSegments:1,steps:1}),m);
  q.name=tag(n);q.position.z=0;rig.add(q);return q;
 };
 const eye=(n,x,y,z,m=M.eye)=>{
  E(n+'-socket',x,y,z-.025,.095,.087,.054,M.dark);
  E(n+'-highlight',x,y,z,.066,.069,.038,M.white);
  E(n+'-pupil',x,y,z+.036,.034,.043,.017,m);
 };
 const forehead=(n,y,z,count,wide)=>{
  for(let j=0;j<count;j++){
   const a=(j-(count-1)/2)/Math.max(1,count-1);
   E(n+'-stone-'+j,a*wide,y+.12*(1-a*a),z,.049,.065,.025,j%2?M.gold:M.light);
  }
 };
 const fringe=(n,nStrands,x0,ytop,ybottom,z,m)=>{
  for(let k=0;k<nStrands;k++){
   const x=(k-(nStrands-1)/2)*x0/(nStrands-1);
   L(n+'-lock-'+k,[[x,ytop,z],[x*1.12,ytop-.35,z-.16],
    [x*1.19+(k%3-1)*.065,ybottom+(k%4)*.06,z-.21]],.017+(k%3)*.005,m);
  }
 };
 const progress=[0,.46,.59,.73,.86,1,1.11,1.19][s];
 if(s===0){
  // Eggs are merely a metaphor for the game: ceremonial performances don't hatch.
  E('fictional-seal-shell',0,1.14,0,.48+.04*IDS.indexOf(id),.79,.48,M.main);
  for(let k=0;k<5;k++){
   const angle=-.85+k*.43,xx=Math.sin(angle)*.37,yy=1.18+Math.cos(angle)*.36;
   E('source-inspired-egg-relief-'+k,xx,yy,.41,.063,.072,.036,k%2?M.gold:M.dark);
  }
  if(id==='kuda_lumping'){
   F('woven-flat-horse-egg-signet',[[-.22,.95],[-.12,1.36],[.12,1.45],
    [.18,1.31],[.10,1.10],[.24,.91]],M.gold,.023);
  }else if(id==='singa_barong_reog'){
   for(let j=0;j<7;j++){let a=j*Math.PI/6;
    L('mini-dadak-fan-spoke-'+j,[[0,1.15,.44],
      [Math.cos(a)*.36,1.12+Math.sin(a)*.43,.43]],.019,M.gold);}
  }else if(id==='sembrani'){
   pair(d=>L('paired-wing-sigil-'+d,[[0,1.31,.44],
    [d*.23,1.48,.43],[d*.35,1.60,.34]],.034,M.gold));
  }else if(id==='rangda'){
   L('mask-tongue-symbol',[[0,1.43,.48],[0,1.17,.52],[.07,1.01,.51]],.034,M.pink);
  }else{
   E('barong-jaw-signet',0,1.25,.49,.23,.13,.043,M.dark);
  }
  rig.userData={id,phase:s,fictionalLifecycle:true,sculpt:'NJ101',culturalSource:SOURCES[id]};
  return true;
 }
 if(id==='barong'){
  // Barong Ket: TWO-PERFORMER quadrupedal costume with heavy dorsal cloth,
  // beast mask (ox/tiger composite), moving lower jaw, floral ornament and fur.
  const w=.33+.20*progress,back=.66+.31*progress;
  E('four-legged-barong-two-performer-covered-torso',0,1.10,-.22,w,.46,back,M.main);
  E('raised-starched-cloth-back',0,1.46,-.26,w*.97,.28,back*.90,M.dark);
  E('ornate-curtain-apron',0,.81,-.08,w*.82,.27,back*.74,M.gold);
  for(let j=0;j<6+s;j++){
   const z=-.77+j*1.13/(6+s);
   L('painted-barong-curtain-hem-'+j,[[-w,.80,z],
    [0,.68+(j%2)*.08,z+.07],[w,.81,z]],.023,j%2?M.gold:M.light);
  }
  pair(d=>{for(const z of [-.65,.30]){
   L('two-performer-visible-short-legs-'+d+'-'+z,[[d*w*.70,.91,z],
     [d*(w*.77),.50,z+.05],[d*(w*.80),.22,z+.14]],.088,M.dark);
   E('thick-ceremonial-paw-'+d+'-'+z,d*(w*.80),.19,z+.18,.17,.13,.19,M.main);
  }});
  E('carved-red-balinese-animal-mask-head',0,1.64,.57,.39+.07*progress,.34,.35,M.main);
  E('barong-flared-bull-tiger-cheeks',0,1.49,.76,.37,.21,.29,M.light);
  E('large-nasal-bridge',0,1.57,.99,.15,.14,.12,M.gold);
  E('separately-hinged-lower-mask-jaw',0,1.31,.91,.32,.14,.23,M.dark);
  eye('barong-wide-mask-eye-left',-.21,1.71,.87,M.eye);
  eye('barong-wide-mask-eye-right',.21,1.71,.87,M.eye);
  pair(d=>{
   C('barong-upper-teeth-tusk-'+d,d*.21,1.32,1.04,.058,.23,M.white);
   E('rolled-scroll-ceremonial-ear-'+d,d*.45,1.79,.49,.23,.16,.11,M.gold);
   L('barong-coiled-ornament-'+d,[[d*.42,1.86,.69],[d*.53,1.98,.57],
     [d*.48,2.08,.45]],.056,M.gold);
  });
  forehead('barong-floral-forehead',1.97,.86,5,.59);
  const rows=s<3?1:s<5?2:3;
  for(let row=0;row<rows;row++){
   for(let j=0;j<9+s;j++){
    const x=(j-(8+s)/2)*2*w/(9+s);
    L('long-ceremonial-hair-'+row+'-'+j,
      [[x,1.59-row*.13,-.28+row*.23],
       [x*1.08,1.09,-.35+row*.23],
       [x*1.11,.38-(j%3)*.045,-.41+row*.23]],.015+(j%3)*.007,M.light);
   }
  }
  if(s>=4)E('performance-guardian-chest-plate',0,1.18,.76,.19,.31,.08,M.gold);
  if(s>=5)pair(d=>E('decorated-textile-hornless-shoulder'+d,d*.39,1.76,-.18,.16,.27,.12,M.gold));
  if(s===6)fringe('elder-ritual-extended-braid',9,.84,1.67,.18,.12,M.dark);
  if(s===7)pair(d=>L('guardian-aura-ribbon-'+d,[[d*.43,1.79,-.16],
    [d*.86,2.15,-.32],[d*1.01,2.07,-.47]],.061,M.gold));
 }else if(id==='rangda'){
  // Rangda: upright ceremonial character, elaborate mask and hair;
  // NOT the four-legged Barong or a generic Western horned witch.
  const headY=1.75+.13*progress;
  E('upright-draped-rangda-ceremonial-body',0,.93,-.12,.33+.18*progress,.84,.35,M.main);
  E('rangda-gold-vertical-ornamental-panel',0,.93,.25,.16,.64,.075,M.gold);
  for(let j=0;j<4+s;j++){const x=(j-(3+s)/2)*.077;
   L('ceremonial-dress-stripe-'+j,[[x,1.49,.19],
     [x*1.08,.89,.30],[x*1.26,.24,.33]],.024,j%2?M.dark:M.light);
  }
  pair(d=>{
   L('long-theatrical-posed-arm-'+d,[[d*.29,1.47,.0],
     [d*.43,1.04,.14],[d*.50,.62,.31]],.075,M.main);
   for(let k=0;k<4;k++)L('Rangda-elongated-fingernail-'+d+'-'+k,
    [[d*(.47+k*.025),.65,.31],[d*(.56+k*.03),.43-(k%2)*.06,.39]],.016,M.white);
  });
  E('Rangda-sacred-mask-face',0,headY,.16,.34,.35,.26,M.main);
  E('Rangda-large-brow-ridges',0,headY+.20,.35,.32,.10,.11,M.gold);
  E('long-hooked-nose',0,headY-.01,.45,.12,.15,.12,M.light);
  E('wide-open-mouth',0,headY-.23,.41,.21,.10,.09,M.dark);
  pair(d=>{
   eye('rangda-bulging-eye-'+d,d*.185,headY+.09,.402,M.eye);
   C('large-balinese-curved-fang-'+d,d*.14,headY-.32,.49,.065,.23,M.white, d*.25);
   E('large-bali-carved-ear-disc-'+d,d*.43,headY+.06,.09,.16,.23,.10,M.gold);
  });
  L('long-leather-mask-tongue',[[0,headY-.26,.48],[0,headY-.52,.59],
    [.08,headY-.85-.045*s,.48]],.053,M.pink);
  forehead('mask-crown-ornament',headY+.35,.33,5,.64);
  fringe('thick-black-horsehair',9+s*2,.91,headY+.34,.21,-.10,M.black);
  if(s>=3){pair(d=>L('checkered-ceremonial-band-'+d,[[d*.35,headY+.15,-.13],
    [d*.51,1.20,-.30],[d*.56,.33,-.27]],.042,M.gold));}
  if(s>=5)for(let j=-2;j<=2;j++)C('Rangda-ornate-headpiece-'+j,
    j*.135,headY+.53,.03,.058,.20+(2-Math.abs(j))*.09,M.gold);
  if(s>=6)pair(d=>L('elder-widow-robe-flare-'+d,[[d*.32,1.24,-.28],
    [d*.61,.84,-.34],[d*.72,.24,-.46]],.059,M.light));
  if(s===7)fringe('legend-hair-outer-contour',19,1.43,headY+.69,.17,-.37,M.dark);
 }else if(id==='sembrani'){
  // Mythical WINGED HORSE in three dimensions, not a flat kuda lumping prop.
  const len=.59+.26*progress,h=.83+.10*progress;
  E('round-horse-barrel-torso',0,h,-.17,.42,.40,len,M.main);
  E('distinct-upright-horse-shoulder',0,1.02,.25,.33,.35,.40,M.light);
  L('sloping-horse-neck',[[0,1.01,.22],[0,1.49,.48],[0,1.68,.62]],.22,M.main);
  E('long-horse-head',0,1.70,.66,.23,.29,.29,M.main);
  E('long-elegant-equine-muzzle',0,1.52,.91,.17,.15,.28,M.light);
  pair(d=>{
   C('two-pointed-horse-ears-'+d,d*.17,2.00,.53,.087,.25,M.main,d*.19);
   E('calm-spirited-horse-eye-'+d,d*.183,1.77,.81,.051,.063,.028,M.eye);
   for(const z of [-.54,.34]){
    L('four-jointed-horse-leg-'+d+'-'+z,[[d*.30,.73,z],
      [d*.35,.39,z+.06],[d*.33,.16,z+.16]],.084,M.main);
    E('single-ungulate-hoof-'+d+'-'+z,d*.33,.14,z+.20,.15,.11,.18,M.dark);
   }
  });
  const mane=5+s*2;
  for(let j=0;j<mane;j++){
   const t=j/mane;
   L('flowing-horse-mane-'+j,[[0,1.89-t*.38,.48-t*.26],
     [(j%3-1)*.07,2.01-t*.33,.20-t*.22],
     [(j%4-2)*.067,1.96-t*.31,-.11-t*.19]],.020,M.gold);
  }
  L('long-free-horse-tail',[[0,1.05,-len-.11],
    [.17,1.16,-len-.31],[.29,.82,-len-.53]],.081,M.main);
  if(s>=2){
   pair(d=>{
    const span=.42+(s-2)*.15;
    L('functional-feathered-wing-leading-bone-'+d,[[d*.29,1.23,-.11],
     [d*(.33+span*.45),1.54,-.21],[d*(.43+span),1.80,-.33]],.078,M.gold);
    for(let j=0;j<3+s;j++){
     const t=j/(3+s);
     E('overlapping-primary-feather-'+d+'-'+j,
      d*(.36+t*span),1.43-t*.23,-.32-t*.11,.075,.14+t*.13,.055,j%2?M.white:M.light);
    }
   });
  }
  if(s>=4)E('cultural-invented-bridle-center-ornament',0,1.84,.90,.09,.06,.03,M.gold);
  if(s===6)pair(d=>L('elder-long-wing-filament-'+d,[[d*.51,1.66,-.29],
    [d*1.13,1.98,-.41],[d*1.26,1.93,-.45]],.023,M.light));
  if(s===7)pair(d=>L('legend-three-dimensional-feather-bloom-'+d,
   [[d*.32,1.32,-.15],[d*1.09,2.25,-.38],[d*1.48,2.39,-.45]],.069,M.white));
 }else if(id==='kuda_lumping'){
  // Critical: Kuda Kepang is a woven BAMBOO PROP, not a living quadruped.
  // 2.5D thin EXTRUDED flat silhouette; only the artistic game interpretation animates.
  const x=.65+.18*progress;
  const silhouette=[[-x,.41],[-.58,1.01],[-.35,1.24],
   [-.19,1.29],[-.03,1.41],[.08,1.69],[.19,1.85],
   [.32,1.67],[.46,1.73],[.59,1.58],[.45,1.29],
   [.24,1.17],[.11,.91],[.28,.56],[.23,.38],
   [-.02,.48],[-.35,.38],[-.50,.48]];
  F('thin-flat-woven-bamboo-horse-effigy',silhouette,M.main,.055);
  F('separate-thin-horse-cheek-ornament',[[.20,1.56],[.40,1.53],
   [.38,1.39],[.21,1.40]],M.gold,.070);
  E('painted-bamboo-eye',.34,1.59,.088,.061,.055,.026,M.eye);
  for(let i=0;i<7+s*2;i++){
   const t=i/(7+s*2),y=.49+t*.69;
   L('visible-bamboo-lattice-warp-'+i,[[-.49+(i%3)*.02,y,.082],
     [-.15,y+.046,.087],[.20-t*.12,y+.12,.088]],.010+(i%2)*.005,i%3?M.light:M.dark);
  }
  for(let i=0;i<7+s;i++){
   const t=i/(7+s),xx=-.49+t*.74;
   L('woven-bamboo-weft-'+i,[[xx,.48,.085],[xx+.067,.84,.09],
     [xx+.19,1.13,.085]],.011,M.gold);
  }
  for(let j=0;j<4+s;j++){
   L('fiber-horse-mane-'+j,[[.07+j*.034,1.71-j*.035,.035],
    [-(j*.034),1.93-j*.036,.03],
    [-(j*.05),1.92-j*.043,-.02]],.014,M.black);
  }
  for(let j=0;j<6+s;j++){
   L('woven-horse-fiber-tail-'+j,[[-x+.06,.94,.05],
    [-x-.16-(j%3)*.06,.91-j*.058,-.02],
    [-x-.24-(j%3)*.07,.77-j*.058,-.04]],.012,M.dark);
  }
  if(s>=3){
   F('decorative-performance-saddle-stripe',[[-.28,1.11],[-.02,1.17],
    [.15,1.03],[.06,.93],[-.29,1.01]],M.gold,.07);
  }
  if(s>=5)pair(d=>L('handheld-prop-stitched-bottom-edge-'+d,
   [[d*.02,.42,.07],[d*.29,.44,.07],[d*.43,.49,.07]],.022,M.light));
  if(s>=6)F('older-artisan-woven-apron',[[-.16,.91],[.09,.92],
   [.22,.71],[-.18,.69]],M.dark,.065);
  if(s===7)pair(d=>L('fantasy-legend-ribbon-from-prop-'+d,
   [[d*.19,1.18,.07],[d*.57,1.27,.01],[d*.78,1.52,-.05]],.038,M.gold));
 }else if(id==='singa_barong_reog'){
  // Reog Ponorogo: the THRUSTING tiger mask under the
  // vertically enormous DADAK MERAK peacock fan. NOT the Balinese Barong Ket.
  E('reog-carved-tiger-mask-base',0,1.27,.43,.33+.07*progress,.34,.30,M.main);
  E('broad-tiger-cheek-white-muzzle',0,1.10,.66,.30,.15,.24,M.light);
  E('predatory-nasal-leather-pad',0,1.20,.88,.12,.095,.074,M.dark);
  E('open-maw-for-cokotan',0,.98,.75,.26,.09,.16,M.dark);
  eye('tiger-left-eye',-.17,1.36,.69,M.eye);
  eye('tiger-right-eye',.17,1.36,.69,M.eye);
  pair(d=>{
   E('round-tiger-ear'+d,d*.31,1.55,.39,.135,.14,.09,M.main);
   C('tiger-visible-canine'+d,d*.15,.94,.81,.047,.17,M.white);
   for(let j=0;j<3;j++)L('tiger-mask-stripe'+d+'-'+j,[[d*.12,1.61-j*.13,.70],
      [d*.29,1.47-j*.11,.59],[d*.33,1.38-j*.09,.45]],.035,M.dark);
  });
  E('tiger-mask-forehead-bridge',0,1.48,.67,.25,.12,.14,M.gold);
  const fan=1.0+.20*progress,fanTop=2.20+.16*progress;
  // Deep embossed fan segments. Peacock eyespots form strongly recognisable arc.
  const count=7+2*s;
  for(let k=0;k<count;k++){
   const a=(k/(count-1)-.5)*Math.PI*.94;
   const edgeX=Math.sin(a)*fan,edgeY=fanTop+Math.cos(a)*fan*.32;
   const lowX=Math.sin(a)*.18;
   L('dadak-merak-fan-spoke-'+k,[[lowX,1.57,-.17],
     [edgeX*.76,edgeY-.29,-.20],[edgeX,edgeY,-.22]],.022,M.dark);
   E('individual-peacock-plume-'+k,edgeX,edgeY,-.21,
     .11,.20,.052,k%3?M.main:M.light);
   E('peacock-iridescent-eye-ring-'+k,edgeX,edgeY+.019,-.151,
     .069,.101,.033,M.gold);
   E('dark-peacock-pupil-'+k,edgeX,edgeY+.033,-.113,
     .035,.060,.024,M.eye);
  }
  for(let i=0;i<5+s;i++){
   const xx=(i-(4+s)/2)*.117;
   L('tiger-mask-reog-hair-curtain-'+i,[[xx,1.66,.26],
    [xx*1.14,1.17,.10],[xx*1.22,.56-(i%3)*.04,.0]],.025,M.black);
  }
  // Cokotan/handle sculpture is a costume/performer component, not a giant torso.
  E('flat-cokotan-lifting-wood-handle',0,.77,.27,.26,.06,.18,M.dark);
  if(s>=3)E('Reog-Ponorogo-inscription-panel',0,1.85,-.18,.35,.15,.085,M.gold);
  if(s>=6)pair(d=>L('mature-fan-peacock-outer-plume'+d,
   [[d*.43,2.14,-.20],[d*.98,2.72,-.20],[d*1.29,2.88,-.22]],.050,M.main));
  if(s===7)for(let k=-2;k<=2;k++)L('legend-dadak-merak-high-prong-'+k,
    [[k*.16,2.51,-.17],[k*.26,2.90,-.22],[k*.31,3.16,-.25]],.036,M.gold);
 }
 // Stage-specific GAME-ONLY marks, always behind the primary culturally distinct rig.
 if(s===1)E('infant-motif-relief',0,.16,-.24,.075,.047,.052,M.gold);
 if(s===2)pair(d=>E('juvenile-motif-growth-'+d,d*.17,.21,-.22,.06,.11,.056,M.light));
 if(s===3)L('child-tactile-form-growth',[[-.14,.37,-.29],
   [0,.27,-.31],[.14,.37,-.29]],.027,M.dark);
 if(s===4)pair(d=>L('adolescent-tassel-extension-'+d,[[d*.18,.44,-.28],
   [d*.32,.38,-.37]],.039,M.gold));
 if(s===5)E('adult-original-finish',0,.15,-.27,.13,.034,.072,M.dark);
 if(s===6)pair(d=>E('elder-age-stitch-'+d,d*.18,.25,-.31,.09,.059,.057,M.light));
 if(s===7)pair(d=>L('legend-local-fantasy-ribbon-'+d,[[d*.25,.34,-.40],
   [d*.45,.67,-.45],[d*.62,.91,-.52]],.042,M.gold));
 rig.userData={id,phase:s,source:SOURCES[id],artisticEvolution:'game-fiction',
  fullReplacement:true,culturalForm:['ritual beast costume','ritual woman mask',
    'mythic horse','flat woven bamboo horse property','tiger-mask-peacock-fan'][IDS.indexOf(id)]};
 body.userData.NJ101={id,phase:s,rig:'NJ101',noSaveChanges:true};
 return true;
};
})();