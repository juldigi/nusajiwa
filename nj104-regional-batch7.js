/* NJ104 · Batch 07 · regional spectres, shapechangers and cryptids.
 * Six existing catalogue identities × eight individual 3D life-stage rigs.
 * Oral accounts are variable, cryptids unproven, and evolution is game-only.
 * Last stage module masks earlier adult and competing morphology constructs. */
(function(){
'use strict';
if(window.NUSAJIWA_SCULPT104)return;
const IDS=['suanggi','orang_pendek','cindaku','orang_bati','poppo','parakang'];
const META={
 suanggi:{region:'Maluku dan Indonesia Timur',identity:'Variable traditions: shifting humanlike night apparition / floating flame; NOT one biological species',source:'https://amp.kompas.com/hype/read/2025/08/25/091844866/deretan-hantu-nusantara-yang-belum-muncul-di-film-horor-indonesia'},
 orang_pendek:{region:'Sumatra, Kerinci',identity:'Reported short upright muscular forest cryptid, powerful legs and broad mouth; unverified',source:'https://www.theguardian.com/science/blog/2011/sep/09/orang-pendek-quest-sumatra'},
 cindaku:{region:'Kerinci, Jambi',identity:'Human to tiger guardian linked to land and boundary; differs from general Sumatra siluman',source:'https://tunawisma.com/cindaku-kerinci/'},
 orang_bati:{region:'Seram, Maluku',identity:'Human-shaped winged nighttime figure, not a scientific bat species',source:'https://inet.detik.com/science/d-5995200/legenda-orang-bati-manusia-setengah-kelelawar-yang-misterius'},
 poppo:{region:'Bugis–Makassar, Sulawesi Selatan',identity:'Flying detached head with dangling inner organs in one recorded account; not Kuyang',source:'https://www.detik.com/sulsel/budaya/d-7047817/mengenal-poppo-mitos-manusia-jadi-jadian-dalam-kepercayaan-bugis-makassar'},
 parakang:{region:'Sulawesi Selatan',identity:'Shapechanger: unnaturally proportioned animal, plant, or human in different tellings',source:'https://boneterkini.id/legenda-parakang-manusia-jadi-jadian-asal-sulawesi-selatan/'}
};
window.NUSAJIWA_SCULPT104_IDS=Object.freeze(IDS.slice());
window.NUSAJIWA_SCULPT104_META=Object.freeze(META);
window.NUSAJIWA_SCULPT104=function(group,body,M,id,phase,T,ell,tube){
 if(!IDS.includes(id)||!group||!body||!M||!T||!ell||!tube)return false;
 const s=Math.max(0,Math.min(7,Math.trunc(Number(phase)||0))),host=s===0?group:body;
 if(s===0){for(const obj of group.children)obj.visible=false;}else{for(const obj of body.children)obj.visible=false;}
 const rig=new T.Group();rig.name='NJ104_'+id+'_F'+s;host.add(rig);
 const p=n=>id+'-F'+s+'-'+n;
 const E=(n,x,y,z,w,h,d,m)=>{const o=ell(rig,x,y,z,w,h,d,m);o.name=p(n);return o};
 const L=(n,pts,r,m)=>{const o=tube(rig,pts,r,m);o.name=p(n);return o};
 const C=(n,x,y,z,r,h,m,rz=0)=>{const o=new T.Mesh(new T.ConeGeometry(r,h,8),m);o.name=p(n);
  o.position.set(x,y,z);o.rotation.z=rz;rig.add(o);return o};
 const W=(n,points,m,z=-.16)=>{const shape=new T.Shape();
  shape.moveTo(points[0][0],points[0][1]);
  points.slice(1).forEach(pt=>shape.lineTo(pt[0],pt[1]));shape.closePath();
  const o=new T.Mesh(new T.ShapeGeometry(shape),m);o.name=p(n);o.position.z=z;rig.add(o);return o};
 const pair=fn=>{fn(-1);fn(1)};
 const eye=(n,y,z,span=.16)=>pair(d=>{
  E(n+'-socket-'+d,d*span,y,z-.028,.080,.080,.050,M.dark);
  E(n+'-gloss-'+d,d*span,y,z,.063,.066,.034,M.light);
  E(n+'-pupil-'+d,d*span,y,z+.035,.037,.041,.020,M.eye);
 });
 const stripes=(n,len,w,height,zfront)=>{
  for(let j=0;j<4+s;j++){const z=-len*.77+j*len*1.58/(4+s);
   pair(d=>L(n+'-'+d+'-'+j,[[d*.20,height+.10,z-.12],
     [d*w,height,z],[d*w*.90,height-.14,z+.11]],.024+(j%3)*.004,M.dark));}
 };
 const age=[0,.48,.62,.78,.93,1.04,1.13,1.22][s];
 if(s===0){
  const i=IDS.indexOf(id);
  E('regional-symbolic-seal-egg',0,1.13,0,.47+i*.032,.79-(i%2)*.05,.47,M.main);
  const glyph=[
   [[-.23,1.09,.43],[0,1.50,.47],[.23,1.09,.43]],
   [[-.20,1.51,.40],[0,1.19,.52],[.20,1.51,.40]],
   [[-.26,1.13,.42],[0,1.36,.50],[.26,1.13,.42]],
   [[-.29,1.34,.41],[0,1.60,.43],[.29,1.34,.41]],
   [[-.17,1.59,.38],[0,1.24,.50],[.17,1.59,.38]],
   [[-.29,1.55,.37],[0,1.08,.52],[.29,1.55,.37]]
  ];
  L('species-specific-embossed-symbol',glyph[i],.044,M.gold);
  for(let j=0;j<8;j++)E('asymmetric-shell-carving-'+j,
   (j-3.5)*.075,.87+(j%4)*.17,.45-(j%2)*.022,.036,.053,.020,j%3===0?M.dark:M.light);
  if(id==='orang_bati')pair(d=>W('symbolic-human-wings-'+d,
   [[d*.07,1.20],[d*.31,1.48],[d*.34,1.08]],M.gold,.38));
  if(id==='poppo')for(let j=-1;j<=1;j++)L('detached-head-sigil-'+j,
   [[j*.075,1.12,.48],[j*.12,.91,.47]],.022,M.pink);
  rig.userData={id,phase:s,rebuilt:true,fictionalGameStage:true,source:META[id].source};
  return true;
 }
 if(id==='poppo'){
  // South Sulawesi head with stylized entrails: no full adult body.
  // Short cloth/headwrap and clustered tendrils set it apart from long-haired Kuyang.
  const y=1.55+.18*age;
  E('Bugis-floating-oval-head-no-torso',0,y,.09,.32,.37,.28,M.light);
  E('prominent-Bugis-cheek-and-jaw',0,y-.20,.25,.27,.15,.18,M.main);
  E('small-pressed-human-mouth',0,y-.24,.44,.12,.038,.024,M.dark);
  eye('spectral-sunken-eyes',y+.08,.388,.175);
  E('dark-back-hair-bun',0,y+.16,-.20,.28,.29,.14,M.black);
  E('short-folded-Bugis-style-headcloth',0,y+.35,-.04,.34,.12,.30,M.dark);
  pair(d=>{
   L('headcloth-fold-trim-'+d,[[d*.30,y+.35,.03],[d*.35,y+.22,.12],
    [d*.26,y+.02,-.06]],.026,M.gold);
   E('protruding-human-ear-'+d,d*.31,y-.015,.06,.11,.12,.10,M.main);
  });
  const count=3+Math.floor(s*.9);
  for(let j=0;j<count;j++){const angle=j*2.4,xx=Math.sin(angle)*.14,zz=Math.cos(angle)*.10;
   L('grouped-symbolic-innards-'+j,[[xx,y-.36,zz],
     [xx*1.19,y-.66,zz-.12],
     [Math.sin(angle+.46)*(.17+age*.12),y-.83-age*.30+(j%3)*.09,zz-.18]],
     .034+(j%3)*.008,j%3===0?M.pink:M.dark);
  }
  for(let j=0;j<3+s;j++){const x=(j-(s+2)/2)*.56/(3+s);
   L('short-loose-hair-tuft-'+j,[[x,y+.36,-.12],
    [x*1.3,y+.07,-.20],[x*1.43,y-.21-(j%3)*.06,-.15]],.019,M.black);
  }
  if(s>=3)pair(d=>E('marked-cheek-fold-'+d,d*.27,y-.09,.30,.060,.086,.055,M.dark));
  if(s>=5)E('deep-floating-neck-hollow',0,y-.40,.02,.14,.10,.12,M.dark);
  if(s===6)pair(d=>L('aged-headcloth-knot-tail-'+d,[[d*.29,y+.26,-.17],
   [d*.47,y-.05,-.20],[d*.51,y-.44,-.26]],.036,M.dark));
  if(s===7)pair(d=>L('legend-flying-circular-shadow-'+d,[[d*.29,y+.28,-.19],
   [d*.64,y+.52,-.37],[d*.75,y+.18,-.42]],.055,M.gold));
 }else if(id==='parakang'){
  // Human, then distorted dog/cat-like animal, then tree is GAME choice
  // explicitly illustrating reported metamorphic VARIETY, not fixed life cycle.
  const human=s<=2,dog=s>=3&&s<=5,tree=s===6;
  if(human){
   const hy=1.58+age*.19;
   E('parakang-daytime-human-torso',0,1.02,-.06,.26+.07*age,.48,.25,M.main);
   E('parakang-real-human-face',0,hy,.13,.28,.29,.23,M.light);
   eye('sharp-staring-human-eyes',hy+.08,.365,.16);
   E('slightly-reddened-human-nose',0,hy-.05,.38,.095,.09,.07,M.pink);
   E('untidy-matted-human-hair',0,hy+.26,-.06,.32,.15,.26,M.black);
   pair(d=>{
    L('human-arm-waiting-to-transform-'+d,[[d*.27,1.31,0],[d*.38,.76,.15],
     [d*.44,.42,.18]],.085,M.main);
    L('human-leg-before-shift-'+d,[[d*.14,.65,0],[d*.19,.35,.06],
     [d*.20,.15,.20]],.100,M.main);
    E('grounded-human-foot-'+d,d*.21,.13,.26,.15,.10,.19,M.dark);
   });
   if(s===2)pair(d=>L('first-faulty-limb-contour-'+d,[[d*.38,.83,.13],
    [d*.44,.60,.08],[d*.47,.35,.18]],.031,M.dark));
  }else if(dog){
   const length=.53+age*.28,width=.28+age*.13;
   E('incorrectly-shaped-mimic-dog-body',0,.84,-.17,width,.30,length,M.dark);
   E('low-front-dog-shoulder',0,.91,.30,.30,.28,.31,M.main);
   E('uneven-mimic-canine-face',0,1.06,.62,.25,.26,.24,M.main);
   E('nonmatching-elongate-dog-muzzle',0,.96,.83,.18,.12,.27,M.light);
   eye('humanlike-canine-mimic-eyes',1.14,.83,.14);
   pair(d=>{
    C('ordinary-short-pointed-ear-'+d,d*.18,1.31,.54,.10,.22,M.dark,d*.18);
    L('too-short-front-leg-'+d,[[d*width,.69,.30],[d*width*.94,.38,.36],
     [d*width*.97,.17,.45]],.076,M.main);
    L('unnaturally-tall-hind-leg-'+d,[[d*width*.75,1.07,-length*.69],
     [d*(width+.15),.52,-length*.64],[d*(width+.15),.16,-length*.56]],.102,M.main);
    E('uneven-front-paw-'+d,d*width*.98,.14,.48,.13,.10,.18,M.dark);
    E('overextended-hind-paw-'+d,d*(width+.15),.13,-length*.53,.15,.10,.18,M.dark);
   });
   if(s===3)E('failing-mid-morph-human-chest-echo',0,1.01,-.29,.17,.24,.12,M.light);
   if(s===4)pair(d=>E('uneven-morph-hip-hump-'+d,d*.25,1.22,-.56,.13,.17,.21,M.main));
   if(s===5)E('adult-no-tail-identity-absence-accent',0,.81,-length-.09,.13,.08,.05,M.dark);
  }else if(tree){
   E('two-handed-tree-mimic-trunk',0,.98,-.04,.23,.79,.22,M.dark);
   E('irregular-knotted-tree-crown',0,1.76,-.06,.36,.22,.34,M.main);
   pair(d=>L('only-two-branches-resembling-arms-'+d,[[d*.17,1.43,0],
    [d*.43,1.76,-.09],[d*.69,1.87,-.18]],.090,M.main));
   for(let j=0;j<9;j++)L('two-handed-bark-ridge-'+j,
    [[Math.sin(j*2.4)*.15,1.62,Math.cos(j*2.4)*.14],
     [Math.sin(j*2.4)*.21,.97,Math.cos(j*2.4)*.17],
     [Math.sin(j*2.4)*.19,.30,Math.cos(j*2.4)*.16]],.015,M.gold);
   E('concealed-face-in-bark',0,1.37,.20,.17,.22,.035,M.dark);
  }else{
   // Legend is artistic duality of human/plant/mimic forms.
   E('two-formed-legend-human-shadow',0,1.18,.01,.25,.68,.20,M.dark);
   E('legend-faint-human-face',0,1.87,.19,.23,.29,.19,M.light);
   eye('identity-between-human-and-animal',1.92,.36,.14);
   pair(d=>{
    L('tree-animal-transforming-branch-arm-'+d,[[d*.21,1.52,-.05],
     [d*.48,1.28,-.15],[d*.68,1.51,-.25]],.11,M.main);
    L('mismatched-mimic-leg-'+d,[[d*.15,.73,-.13],[d*.28,.29,-.16],
     [d*.43,.14,.21]],.12,M.dark);
   });
   L('tree-root-canine-wisp',[[0,.54,-.20],[.38,.29,-.51],[.58,.26,-.76]],.082,M.gold);
  }
 }else if(id==='suanggi'){
  // A nocturnal shifting person / hovering fire according to some Eastern oral tellings.
  // Always keep actual human face/body so it is NOT Banaspati fire elemental clone.
  const transformed=s>=4,hy=1.70+age*.21;
  if(!transformed){
   E('eastern-night-shrouded-human-body',0,1.00,-.09,.29,.74,.26,M.main);
   E('anxious-human-face-in-night-cloak',0,hy,.14,.26,.32,.22,M.light);
   E('long-dark-shadow-hood',0,hy+.25,-.12,.32,.22,.25,M.black);
   eye('suanggi-human-eyes',hy+.075,.34,.15);
   pair(d=>L('outstretched-human-night-arm-'+d,[[d*.27,1.37,0],
    [d*.39,.88,.12],[d*.43,.47,.22]],.080,M.main));
   pair(d=>E('human-standing-sandal-'+d,d*.18,.16,.26,.15,.11,.17,M.dark));
  }else{
   E('human-figure-in-ember-shadow',0,1.06,-.12,.28,.71,.24,M.dark);
   E('distinct-human-flying-head',0,hy,.16,.28,.32,.24,M.main);
   E('face-not-entirely-fireball',0,hy-.08,.35,.20,.20,.06,M.light);
   eye('glowing-spectral-eye',hy+.09,.38,.16);
   pair(d=>L('flowing-cloak-shaped-arm-'+d,[[d*.27,1.38,-.01],
    [d*(.40+age*.14),.84,.08],[d*(.50+age*.18),.33,-.11]],.095,M.dark));
  }
  for(let j=0;j<3+s*2;j++){const a=j*2.39996;
   L('shifting-suanggi-fire-wisp-'+j,[[Math.sin(a)*.26,.37,-.15],
    [Math.sin(a+.3)*(.38+age*.10),1.00+(j%3)*.12,-.27],
    [Math.sin(a+.7)*(.47+age*.18),1.62+(j%4)*.19,-.31]],.031+(j%2)*.014,
    j%2?M.glow:M.gold);
  }
  if(s>=3)pair(d=>L('distant-night-ember-hand-'+d,[[d*.27,1.30,-.08],
   [d*.52,1.05,-.15],[d*.68,.69,-.26]],.038,M.gold));
  if(s===6)E('elder-smoky-veil-behind-human',0,1.37,-.39,.48,.73,.12,M.dark);
  if(s===7)pair(d=>L('legend-eastern-fire-halo-ribbon-'+d,
   [[d*.31,hy+.18,-.22],[d*.76,hy+.53,-.34],[d*.88,hy+.35,-.51]],.053,M.gold));
 }else if(id==='orang_bati'){
  // Human body, two thick-shouldered bat wings (vs Ahool's bat HEAD and limbs).
  const hy=1.76+age*.16,arm=.26+age*.20,span=.75+age*.63;
  E('Seram-humanlike-upright-chest',0,1.08,-.04,.30+age*.11,.59,.24,M.main);
  E('Seram-humanlike-winged-face',0,hy,.14,.28,.31,.23,M.light);
  E('upright-human-forehead-no-bat-ear',0,hy+.25,.08,.29,.13,.22,M.dark);
  eye('humanlike-night-glance',hy+.06,.36,.16);
  E('humanlike-flat-mouth',0,hy-.19,.39,.12,.036,.026,M.dark);
  pair(d=>{
   L('human-reaching-forearm-'+d,[[d*.29,1.40,.03],[d*arm,.86,.18],
    [d*(arm+.10),.46,.27]],.086,M.main);
   E('humanlike-handed-fingers-'+d,d*(arm+.10),.43,.28,.11,.14,.10,M.light);
   L('biped-ground-leg-'+d,[[d*.18,.71,-.09],[d*.23,.39,.09],
    [d*.27,.16,.27]],.12,M.main);
   E('standing-humanlike-foot-'+d,d*.27,.13,.33,.16,.11,.24,M.dark);
   W('shoulder-rooted-leather-wing-web-'+d,[
    [d*.25,1.45],[d*(span*.57),2.04],[d*span,2.25],
    [d*(span*.92),1.67],[d*(span*.80),1.48],
    [d*(span*.66),1.71],[d*(span*.46),1.33]
   ],M.dark,-.14);
   for(const [j,tx,ty] of [[0,span,2.25],[1,span*.92,1.67],[2,span*.80,1.48],[3,span*.46,1.33]]){
    L('long-fingered-wing-branch-'+d+'-'+j,[[d*.27,1.48,-.08],
     [d*(span*.58),1.79,-.13],[d*tx,ty,-.14]],.025,M.main);
   }
  });
  for(let j=0;j<5+s;j++){
   const x=(j-(4+s)/2)*.64/(5+s);
   L('short-dry-man-hair-'+j,[[x,hy+.26,-.10],[x*1.25,hy+.10,-.24],
    [x*1.34,hy-.13,-.27]],.019,M.black);
  }
  if(s>=3)pair(d=>E('developed-wing-scapula-'+d,d*.31,1.43,-.27,.18,.20,.13,M.dark));
  if(s===6)pair(d=>L('elder-wing-web-scar-'+d,
   [[d*(span*.59),1.94,-.13],[d*(span*.68),1.70,-.14],[d*(span*.82),1.50,-.14]],.031,M.light));
  if(s===7)pair(d=>W('legend-expanded-human-wing-tip-'+d,[
    [d*(span*.75),2.13],[d*(span+.45),2.62],
    [d*(span+.27),1.95],[d*span,1.83]
   ],M.main,-.18));
 }else if(id==='orang_pendek'){
  // Powerfully built short, fully upright cryptid—NOT Ebu Gogo tiny glutton.
  const hy=1.37+age*.11,w=.30+age*.15;
  E('compact-Sumatra-powerful-biped-torso',0,.89,-.05,w,.47,.31,M.main);
  E('unusually-heavy-short-broad-shoulder',0,1.23,-.14,w*1.15,.21,.29,M.dark);
  E('conical-rounded-hairy-head',0,hy+.05,.12,.26+age*.07,.29,.26,M.main);
  E('thick-heavy-brow',0,hy+.13,.36,.25,.09,.095,M.dark);
  E('short-flat-humanlike-nose',0,hy-.03,.41,.10,.066,.07,M.light);
  E('large-short-forest-mouth',0,hy-.18,.36,.14,.045,.033,M.dark);
  eye('forest-cryptid-round-eyes',hy+.08,.365,.15);
  pair(d=>{
   L('long-strong-upright-hominid-arm-'+d,[[d*w*.93,1.18,-.05],
    [d*(w+.18),.75,.09],[d*(w+.16),.35,.16]],.10+age*.015,M.main);
   E('powerful-vegetation-gripping-hand-'+d,d*(w+.16),.32,.20,.15,.14,.13,M.dark);
   L('short-stout-walking-leg-'+d,[[d*.19,.63,-.07],[d*.22,.29,.04],
    [d*.22,.15,.21]],.13,M.main);
   E('flat-weightbearing-foot-'+d,d*.23,.13,.27,.19,.09,.23,M.dark);
  });
  for(let j=0;j<12+s*3;j++){const a=j*2.39996;
   E('short-dense-black-body-fur-'+j,Math.sin(a)*w*.85,
    .72+(j%5)*.13,Math.cos(a)*.21-.12,.059,.11,.055,j%3?M.dark:M.black);
  }
  if(s>=3)pair(d=>L('wide-powerful-shoulder-fur-'+d,
    [[d*w*.82,1.33,-.05],[d*(w+.08),1.04,-.12],[d*(w+.13),.89,-.16]],.050,M.black));
  if(s>=5)E('fully-mature-overhanging-chest',0,1.06,.21,w*.78,.20,.12,M.light);
  if(s===6)pair(d=>E('elder-deep-brow-fold-'+d,d*.18,hy+.19,.34,.093,.065,.045,M.dark));
  if(s===7)pair(d=>L('legend-forest-sentinel-camouflage-'+d,
   [[d*.28,.97,-.20],[d*.48,1.17,-.35],[d*.61,1.44,-.43]],.042,M.gold));
 }else if(id==='cindaku'){
  // Cindaku has a PLACE-GUARDIAN premise, not just another tiger monster:
  // step 1–2 human > transitional soil-touching posture > tiger with paws
  // at stages 5–7. This is a game interpretation of Kerinci myth.
  if(s<=2){
   const hy=1.72+age*.10;
   E('Kerinci-tiger-guardian-human-form',0,1.04,-.04,.28,.52,.24,M.main);
   E('noncat-human-guardian-face',0,hy,.13,.28,.30,.23,M.light);
   E('Kerinci-cloth-headwrap',0,hy+.28,-.10,.31,.14,.25,M.dark);
   eye('guardian-human-eyes',hy+.08,.35,.16);
   pair(d=>{
    L('human-proportioned-arms-before-soil-contact-'+d,[[d*.26,1.35,0],
     [d*.40,.83,.10],[d*.43,.44,.21]],.078,M.main);
    L('human-walking-knee-before-shift-'+d,[[d*.17,.72,-.06],
     [d*.20,.34,.06],[d*.20,.16,.22]],.105,M.main);
    E('ordinary-human-foot-'+d,d*.22,.13,.27,.17,.10,.20,M.dark);
   });
   if(s===2)pair(d=>E('spirit-striped-clothing-not-body-fur-'+d,
    d*.21,1.21,.19,.045,.20,.025,M.gold));
  }else{
   const intermediate=s<=4,len=.46+age*.35,wide=.30+age*.17;
   E('soilbound-guardian-crouched-tiger-torso',0,.87,-.18,wide,.34+age*.10,len,M.main);
   E('tiger-guardian-scapular-crest',0,1.14,.24,.32,.20,.27,M.dark);
   E('tiger-guardian-head',0,1.38,.53,.30,.29,.32,M.main);
   E('forward-tiger-cheekpads',0,1.23,.76,.28,.17,.19,M.light);
   E('distinct-muzzle-and-nose',0,1.27,.99,.15,.09,.12,M.pink);
   eye('guardian-tiger-eyes',1.50,.76,.18);
   pair(d=>{
    C('rounded-tiger-ear-'+d,d*.25,1.68,.48,.13,.22,M.dark,d*.17);
    for(const [j,z] of [[0,.36],[1,-len*.70]]){
     L('four-soil-contact-cat-legs-'+d+'-'+j,[[d*wide*.82,.72,z],
       [d*wide*.90,.34,z+.04],[d*wide*.92,.15,z+.15]],.09+age*.025,M.main);
     E('five-toed-guardian-motif-paw-'+d+'-'+j,d*wide*.90,.13,z+.25,
       .17,.11,.19,M.light);
     for(let k=0;k<(s===7?5:4);k++)
      E('separate-cat-toe-'+d+'-'+j+'-'+k,
       d*(wide*.90+(k-2)*.052),.125,z+.39,.037,.042,.057,M.main);
    }
   });
   stripes('land-bound-distinct-Kerinci-tiger-stripe',len,wide,1.14,.36);
   L('arched-heavy-hind-tail',[[0,.98,-len-.10],[.24,1.19,-len-.46],
    [.42,1.06,-len-.74],[.51,.88,-len-.85]],.081,M.main);
   // Anatomically meaningful transition: remaining human upper arms
   // are visible only before the complete tiger stance.
   if(intermediate){
    pair(d=>L('transition-clawing-human-upper-arm-'+d,[[d*.32,1.03,.31],
     [d*.44,.71,.45],[d*.46,.46,.57]],.071,M.light));
    E('chest-lowering-to-native-Kerinci-soil',0,.52,.32,.23,.10,.20,M.gold);
   }
   if(s>=5)E('earth-contact-breastbone-guardian',0,.61,.32,.21,.095,.16,M.gold);
   if(s===6)pair(d=>L('elder-tiger-guardian-cheek-stripe-'+d,
    [[d*.20,1.48,.72],[d*.28,1.31,.76]],.03,M.dark));
   if(s===7)pair(d=>L('fictional-legend-boundary-vine-'+d,
    [[d*.31,.36,-.48],[d*.66,.53,-.64],[d*.79,.83,-.74]],.045,M.gold));
  }
 }
 // Additional level-specific articulated landmarks, not a universal monster template.
 if(s===1)E('first-age-identity-seam',0,.18,-.17,.073,.045,.062,M.gold);
 if(s===2)pair(d=>E('juvenile-geometry-seam-'+d,d*.15,.29,-.19,.058,.087,.048,M.light));
 if(s===3)L('adolescent-rising-joint',[[-.16,.34,-.23],[0,.30,-.26],[.16,.34,-.23]],.025,M.dark);
 if(s===4)pair(d=>L('changing-posture-limb-seam-'+d,[[d*.16,.40,-.23],[d*.30,.29,-.30]],.023,M.gold));
 if(s===5)E('adult-full-identity-mark',0,.19,-.25,.13,.055,.075,M.dark);
 if(s===6)pair(d=>E('weathered-elder-crease-'+d,d*.18,.24,-.24,.08,.071,.06,M.light));
 if(s===7)pair(d=>L('fictional-legend-cultural-storyline-'+d,[[d*.15,.33,-.35],
   [d*.45,.61,-.40],[d*.61,.86,-.48]],.045,M.gold));
 rig.userData={id,phase:s,modelRebuilt:true,onlyVisibleAnatomy:true,
  region:META[id].region,source:META[id].source,culturalAnchor:META[id].identity,
  stageMeaning:'fictional-game-evolution'};
 body.userData.NJ104={id,phase:s,saveDataUnchanged:true};
 return true;
};
})();