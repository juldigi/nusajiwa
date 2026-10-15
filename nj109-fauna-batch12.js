/* NJ109 / fauna Batch 12 · First 5 WHOLE-rig sculpt replacements.
 * Sources: IUCN HornbillSG, Cornell BOW, KSDAE/Marwell Zoo, IUCN CatSG,
 * NParks Singapore. Phases 1-6 are stylized biological growth, phase 7
 * a clearly fictional Legend evolution. Egg of live-bearing mammals is
 * an explicitly imaginary Tamagotchi token and never zoological fact.
 * No new identity, progression, save, mini-game or UI state. */
(function(){
'use strict';
if(window.NUSAJIWA_SCULPT109)return;
const IDS=['rangkong_papan','merpati_mahkota_biru','kura_leher_ular_rote','kucing_merah_borneo','kukang_sumatra'];
const IDENT={
 rangkong_papan:{taxon:'Rhinoplax vigil',kind:'hornbill',source:'https://iucnhornbills.org/helmeted-hornbill/',
  fieldmarks:'mostly dark hornbill; solid red/yellow casque, bare red/blue wrinkled throat, white trailing wing and extremely long paired central tail'},
 merpati_mahkota_biru:{taxon:'Goura cristata',kind:'ground pigeon',source:'https://birdsoftheworld.org/bow/species/wecpig1/cur/introduction',
  fieldmarks:'large ground pigeon, lacy sky-blue crest, maroon wing panel and red eye'},
 kura_leher_ular_rote:{taxon:'Chelodina mccordi',kind:'turtle',source:'https://www.marwell.org.uk/animals/roti-island-snaked-neck-turtle/',
  fieldmarks:'low oval gray shell wider posteriorly, relatively long speckled side-folding neck, webbed four-clawed feet'},
 kucing_merah_borneo:{taxon:'Catopuma badia',kind:'small wildcat',source:'https://www.catsg.org/living-species-baycat',
  fieldmarks:'even chestnut coat, rounded ears dark behind, two pale cheek streaks, elongated body and long white-underlined tail'},
 kukang_sumatra:{taxon:'Nycticebus coucang',kind:'slow loris',source:'https://www.nparks.gov.sg/florafaunaweb/fauna/2/2/223',
  fieldmarks:'very round head, huge forward eyes inside mask, narrow snout, dark dorsal stripe, gripping digits and essentially hidden tail'}
};
const PAL={
 rangkong_papan:{coat:'#282822',light:'#f5e1b4',bone:'#ecbe5d',dark:'#100f13',mark:'#a63828',wing:'#f5f0e7',iris:'#e4c28c',legend:'#f7ddb6'},
 merpati_mahkota_biru:{coat:'#7082a5',light:'#b4d8df',bone:'#5a668d',dark:'#25385c',mark:'#814d65',wing:'#aa7581',iris:'#c12538',legend:'#d5f3f1'},
 kura_leher_ular_rote:{coat:'#656d5c',light:'#b7ae88',bone:'#928f75',dark:'#393f36',mark:'#c2b99a',wing:'#878a73',iris:'#ddbf66',legend:'#b9e9d4'},
 kucing_merah_borneo:{coat:'#965334',light:'#e8c39b',bone:'#a67f57',dark:'#433329',mark:'#52372c',wing:'#d4b38e',iris:'#d8a65a',legend:'#efca9b'},
 kukang_sumatra:{coat:'#81745c',light:'#decbb1',bone:'#a59a79',dark:'#40342f',mark:'#60452f',wing:'#d5cbb2',iris:'#d7a966',legend:'#ddd9be'}
};
window.NUSAJIWA_SCULPT109_IDS=Object.freeze(IDS.slice());
window.NUSAJIWA_SCULPT109_META=Object.freeze(IDENT);
window.NUSAJIWA_SCULPT109=function(group,body,M,id,phase,T,ell,tube){
 if(!IDS.includes(id)||!group||!body||!M||!T||!ell||!tube)return false;
 const s=Math.min(7,Math.max(0,Math.floor(Number(phase)||0))),legend=s===7;
 const host=s===0?group:body;
 // Visibility is inherited; explicit masking means neither native models nor
 // legacy morphology overlays obscure the anatomically complete NJ109 rig.
 if(s===0){for(const old of group.children)old.visible=false;}
 else {for(const old of body.children)old.visible=false;}
 const rig=new T.Group();rig.name='NJ109_'+id+'_F'+s;host.add(rig);
 const tag=n=>id+'-F'+s+'-'+n,colors=PAL[id];
 const create=(color,roughness=.86)=>new T.MeshStandardMaterial({color,roughness,metalness:0,side:T.DoubleSide});
 const P={coat:create(colors.coat),light:create(colors.light),bone:create(colors.bone),dark:create(colors.dark),
  mark:create(colors.mark),wing:create(colors.wing),iris:create(colors.iris),legend:create(colors.legend,.57)};
 const E=(n,x,y,z,a,b,c,mat=P.coat)=>{const o=ell(rig,x,y,z,a,b,c,mat);o.name=tag(n);return o};
 const L=(n,pts,r,mat=P.coat)=>{const o=tube(rig,pts,r,mat);o.name=tag(n);return o};
 const cone=(n,x,y,z,r,h,mat=P.bone,rx=0,rz=0)=>{
  const o=new T.Mesh(new T.ConeGeometry(r,h,10),mat);
  o.name=tag(n);o.position.set(x,y,z);o.rotation.x=rx;o.rotation.z=rz;rig.add(o);return o;
 };
 const pair=fn=>{fn(-1);fn(1)};
 const pinEye=(n,x,y,z,r,iris=P.iris)=>{
  E(n+'-socket',x,y,z-.038,r*1.25,r*1.27,.047,P.dark);
  E(n+'-eye',x,y,z,r,r,.035,P.light);
  E(n+'-iris',x,y,z+.033,r*.59,r*.62,.019,iris);
  E(n+'-glint',x-.017,y+.016,z+.050,r*.17,r*.19,.010,P.light);
 };
 const ovalPlate=(n,cx,y,z,rx,ry,mat)=>{
  const q=new T.Mesh(new T.RingGeometry(Math.max(.001,rx*.64),rx,36,2),mat);
  q.name=tag(n);q.position.set(cx,y,z);q.scale.set(1,ry/rx,1);rig.add(q);return q;
 };
 const growth=[0,.56,.66,.79,.92,1,1.11,1.20][s],juvenile=s<=2;
 if(s===0){
  E('fictional-game-egg-no-claim-about-mammalian-birth',0,1.12,.0,.46+.025*IDS.indexOf(id),.77,.45,P.coat);
  E('identity-egg-front-shield',0,1.14,.44,.20,.26,.035,P.light);
  const glyph={
   rangkong_papan:[[0,1.39,.46],[.19,1.19,.48],[.31,1.13,.44]],
   merpati_mahkota_biru:[[-.19,1.33,.46],[0,1.57,.42],[.20,1.32,.46]],
   kura_leher_ular_rote:[[-.23,1.03,.42],[0,1.25,.49],[.23,1.06,.42]],
   kucing_merah_borneo:[[-.21,1.41,.43],[0,1.54,.44],[.22,1.41,.43]],
   kukang_sumatra:[[-.19,1.36,.44],[0,1.13,.49],[.18,1.36,.44]]
  };
  L('species-identity-crest-not-generic',glyph[id],.031,P.dark);
  for(let j=0;j<5;j++){
   E('individual-embossed-egg-scale-'+j,(j-2)*.10,.86+(j%3)*.16,.43,.036,.051,.020,j%2?P.mark:P.bone);
  }
  rig.userData={id,phase:s,sculpted:true,fictionalEgg:true,taxon:IDENT[id].taxon};
  return true;
 }
 if(id==='rangkong_papan'){
  // Rhinoplax: NOT a rhinoceros hornbill, not a toucan. Solid casque
  // atop a medium bill. Paired central tail plumes become long with maturity.
  const wing=.30+.18*growth,cy=1.06+.07*growth;
  E('compact-dark-hornbill-body',0,cy,-.12,.32+.10*growth,.46,.51+.13*growth);
  E('cream-belly-and-flanks',0,.94,.12,.24,.27,.33,P.wing);
  E('thick-short-bird-neck',0,1.48,.24,.19,.33,.22);
  E('dark-flat-feathered-head',0,1.72,.38,.29,.23,.30);
  E('compressed-short-yellow-mandible',0,1.60,.72,.16,.08,.28,P.bone);
  E('helmeted-hornbill-solid-high-casque',0,1.83,.61,.24+.03*growth,.18+.035*growth,.26,P.mark);
  E('yellow-anterior-casque-keratin',0,1.80,.81,.18,.13,.10,P.bone);
  pair(d=>{
   pinEye('small-lateral-rhinoplax-eye-'+d,d*.21,1.72,.62,.060);
   E('bare-throat-not-feathers-'+d,d*.16,1.36,.35,.11,.17,.095,P.mark);
   L('true-perching-shank-'+d,[[d*.15,.77,-.13],[d*.18,.28,.04]],.082,P.bone);
   E('perching-foot-'+d,d*.18,.19,.20,.14,.085,.20,P.dark);
   for(let k=0;k<3;k++)L('grasping-hornbill-toe-'+d+'-'+k,
    [[d*.18,.19,.22],[d*(.22+(k-1)*.065),.14,.37]],.021,P.bone);
   E('folded-wide-hornbill-wing-'+d,d*wing,1.14,-.18,.10+.045*growth,.30,.39,P.coat);
   for(let k=0;k<5+s;k++){
    const z=.10-k*.095;
    E('real-white-wing-flight-feather-'+d+'-'+k,d*(wing+.06),1.00-.025*(k%3),z,.049,.14,.074,
     k%3===0?P.wing:P.dark);
   }
  });
  for(let j=0;j<4+s;j++){
   const x=(j-(3+s)/2)*.072;
   L('separate-back-tail-feather-'+j,[[x,.91,-.42],[x*1.1,.67,-.74],
     [x*1.13,.53,-.93-(j%3)*.10]],.033,j%2?P.wing:P.dark);
  }
  if(s>=3)pair(d=>{
   L('paired-extraordinary-elongated-central-white-tail-'+d,
    [[d*.065,.90,-.56],[d*.085,.58,-.94],[d*.075,.29,-1.35-(s-3)*.13],
     [d*.10,.28,-1.52-(s-3)*.14]],.047,P.wing);
   E('distinct-black-band-on-central-tail-'+d,d*.086,.29,-1.26-(s-3)*.12,.078,.045,.11,P.dark);
  });
  if(s>=5)E('thick-mature-solid-casque-back',0,1.90,.53,.22,.13,.23,P.mark);
  if(s===6)pair(d=>E('weathered-aging-casque-ridge-'+d,d*.17,1.91,.56,.07,.039,.16,P.bone));
  if(s===7)pair(d=>L('fantasy-legend-extended-tail-vane-'+d,
    [[d*.08,.61,-1.04],[d*.25,.30,-1.55],[d*.36,.22,-1.94]],.030,P.legend));
 }else if(id==='merpati_mahkota_biru'){
  // Goura cristata: massive ground pigeon, lace-like BLUE crown,
  // CARMINE iris, maroon wings; no hornbill casque or hooked raptor beak.
  const bodyW=.33+.12*growth,headY=1.65+.10*growth;
  E('big-ground-pigeon-plump-body',0,.89,-.10,bodyW,.46+.055*growth,.51,P.coat);
  E('rich-maroon-chestnut-shoulder-bib',0,1.10,.20,.26,.23,.26,P.mark);
  E('long-necked-ground-dove-profile',0,1.35,.14,.20,.34,.21,P.light);
  E('rounded-blue-pigeon-head',0,headY,.27,.23,.22,.21,P.coat);
  E('short-not-hooked-pigeon-bill',0,headY-.10,.51,.098,.065,.19,P.dark);
  E('pigeon-bill-tip',0,headY-.12,.64,.067,.047,.081,P.bone);
  pair(d=>{
   pinEye('goura-bright-red-eye-'+d,d*.18,headY+.02,.41,.057,P.iris);
   E('maroon-wing-panel-'+d,d*(bodyW+.015),.97,-.12,.11,.31,.38,P.mark);
   for(let j=0;j<4+s;j++){
    E('long-blue-grey-folded-primary-'+d+'-'+j,d*(bodyW+.11),.87-(j%3)*.04,
      -.31-j*.065,.043,.12,.14,P.bone);
   }
   L('heavy-ground-pigeon-leg-'+d,[[d*.15,.64,-.07],[d*.16,.26,.05]],.075,P.mark);
   E('strong-walking-pigeon-foot-'+d,d*.16,.17,.21,.14,.075,.17,P.dark);
   for(let j=0;j<3;j++)L('three-front-pigeon-toe-'+d+'-'+j,
    [[d*.16,.17,.20],[d*(.17+(j-1)*.075),.12,.34]],.020,P.mark);
  });
  E('broad-short-pigeon-tail-base',0,.82,-.52,.18,.14,.27,P.bone);
  for(let k=0;k<7;k++)E('slender-tail-vane-'+k,(k-3)*.052,.75,-.70,.046,.06,.17,P.coat);
  const n=[0,4,7,10,13,17,19,23][s];
  for(let j=0;j<n;j++){
   const a=(j/(Math.max(1,n-1))-.5)*2.45;
   const x=Math.sin(a)*(.33+.08*growth);
   L('separate-open-lacy-crest-spine-'+j,[[x*.49,headY+.18,.21],
    [x*.77,headY+.41+(j%4)*.025,.07],
    [x,headY+.63+(j%3)*.042,-.06]],.018,P.light);
   if(s>=3)E('lacy-fine-feather-tipped-fan-'+j,x,headY+.62+(j%3)*.042,-.06,
    .033,.067,.017,P.wing);
  }
  if(s>=5)pair(d=>E('adult-deep-blue-cheek-ridge-'+d,d*.16,headY-.14,.35,.14,.08,.066,P.dark));
  if(s===6)for(let j=-2;j<=2;j++)L('aged-goura-crown-extra-fine-thread-'+j,
   [[j*.11,headY+.33,.08],[j*.13,headY+.71,-.09]],.013,P.bone);
  if(s===7)pair(d=>L('imagined-legend-crest-plume-'+d,
    [[d*.20,headY+.42,.05],[d*.50,headY+.92,-.13],
     [d*.64,headY+1.00,-.22]],.028,P.legend));
 }else if(id==='kura_leher_ular_rote'){
  // Rote Island Chelodina mccordi: oval shell, broader posterior,
  // very long side-folding snakelike neck and four webbed clawed feet.
  const shell=.38+.14*growth,back=.57+.13*growth;
  E('flattened-grey-olive-oval-carapace',0,.79,-.22,shell,.24,back,P.coat);
  E('yellowish-under-shell-plastron',0,.63,-.18,shell*.89,.13,back*.87,P.light);
  E('wide-at-rear-older-than-tortoise-shell',0,.81,-.39,shell*.98,.20,back*.81,P.dark);
  for(let j=0;j<3+s;j++){
   const z=-.65+j*.12;
   L('individual-vertebral-carpacial-scute-suture-'+j,
    [[-.12,.998,z],[0,1.05,z+.04],[.12,1.005,z]],.012,P.bone);
  }
  pair(d=>{
   for(let j=0;j<4+s;j++){
    const z=-.54+j*.12;
    E('distinct-marginal-scute-'+d+'-'+j,d*shell*.95,.76,z,.077,.071,.11,P.bone);
   }
   for(const [i,z] of [[0,.26],[1,-.59]]){
    L('fully-webbed-chelid-paddle-'+d+'-'+i,
     [[d*shell*.72,.67,z],[d*(shell+.15),.39,z+.13],
      [d*(shell+.26),.27,z+.21]],.087,P.dark);
    E('thick-wide-webbing-'+d+'-'+i,d*(shell+.20),.29,z+.20,.16,.053,.16,P.coat);
    for(let toe=0;toe<4;toe++){
     L('four-curved-chelid-toe-'+d+'-'+i+'-'+toe,
      [[d*(shell+.23),.28,z+.23],[d*(shell+.33+(toe-1.5)*.045),.24,z+.39]],.013,P.bone);
    }
   }
  });
  const length=.22+growth*.46,neckY=.75+.045*growth;
  L('long-side-neck-vertebral-snake-line',[[0,neckY,.22],
   [.16,neckY+.025,.45],[.09,neckY+.055,.62+length*.45],
   [0,neckY+.06,.73+length]],.103,P.dark);
  L('underside-pale-long-neck',[[0,neckY-.065,.26],
   [.12,neckY-.045,.52],[.08,neckY-.032,.70+length*.45],
   [0,neckY-.027,.73+length]],.044,P.light);
  E('small-snake-like-chelid-head',0,neckY+.07,.83+length,.20,.13,.24,P.coat);
  E('narrow-snout-no-beak',0,neckY+.01,1.00+length,.13,.070,.12,P.light);
  pair(d=>pinEye('side-facing-ringed-turtle-eye-'+d,d*.15,neckY+.10,.93+length,.048,P.iris));
  for(let j=0;j<4+s;j++){
   const zz=.30+(j/(4+s))*length*1.35;
   E('neck-wart-like-tubercle-'+j,(j%2?.08:-.09),neckY+.12+(j%3)*.025,zz,
    .030,.024,.034,P.bone);
  }
  if(s>=4)E('nuchal-scutal-depression',0,1.027,-.31,.13,.028,.22,P.dark);
  if(s===6)pair(d=>L('elder-posterior-scute-weathering-'+d,
   [[d*.19,1.02,-.51],[d*.32,.92,-.69]],.025,P.bone));
  if(s===7)pair(d=>L('fictional-legend-head-water-ribbon-'+d,
   [[d*.12,neckY+.04,.86+length],[d*.31,neckY+.18,1.16+length],
    [d*.46,neckY+.26,1.35+length]],.027,P.legend));
 }else if(id==='kucing_merah_borneo'){
  // Catopuma badia: small long-bodied short-legged red-brown felid.
  // Not a tiger, leopard, civet, or domestic ginger tabby.
  const bodyLength=.45+.18*growth,headY=1.04+.055*growth;
  E('long-low-smooth-unspotted-Bornean-bay-cat-torso',0,.77,-.24,
    .29+.055*growth,.31,bodyLength,P.coat);
  E('plain-pale-ventral-white-belly',0,.62,-.12,.21,.14,.31,P.light);
  E('short-smooth-rounded-feline-head',0,headY,.38,.29,.27,.29,P.coat);
  E('light-feline-muzzle',0,headY-.15,.60,.19,.14,.18,P.light);
  E('small-triangular-nose',0,headY-.10,.75,.069,.058,.04,P.dark);
  pair(d=>{
   E('small-rounded-dark-backed-ear-'+d,d*.23,headY+.26,.30,.105,.135,.09,P.dark);
   E('back-of-ear-chestnut-patch-'+d,d*.24,headY+.30,.24,.059,.073,.022,P.coat);
   pinEye('small-cat-forward-eye-'+d,d*.16,headY+.07,.58,.057);
   L('white-cheek-not-tabby-stripe-'+d,
    [[d*.16,headY-.17,.62],[d*.23,headY-.22,.55],
     [d*.29,headY-.28,.43]],.026,P.light);
   L('dark-eye-corner-line-'+d,[[d*.21,headY+.10,.63],
    [d*.28,headY+.14,.52]],.019,P.dark);
   for(const [i,z] of [[0,.18],[1,-bodyLength*.70]]){
    L('four-short-flexible-feline-legs-'+d+'-'+i,
     [[d*.22,.65,z],[d*.26,.35,z+.02],
      [d*.27,.18,z+.11]],.074,P.coat);
    E('round-soft-feline-paw-'+d+'-'+i,d*.27,.14,z+.15,.12,.073,.15,P.coat);
    for(let k=0;k<3;k++)L('claw-sheath-toe-groove-'+d+'-'+i+'-'+k,
     [[d*(.20+k*.06),.16,z+.25],[d*(.21+k*.06),.14,z+.29]],.010,P.dark);
   }
  });
  const tail=bodyLength*.82+.18*growth;
  L('very-long-bay-cat-tail',[[0,.82,-bodyLength-.08],
   [.17,.81,-bodyLength-tail*.43],[.28,.94,-bodyLength-tail*.78],
   [.29,1.08,-bodyLength-tail]],.072,P.coat);
  L('white-ventral-stripe-on-tail',[[0,.77,-bodyLength-.21],
   [.18,.75,-bodyLength-tail*.48],[.30,.89,-bodyLength-tail*.83],
   [.29,1.03,-bodyLength-tail]],.023,P.light);
  if(s>=3)E('distinct-dark-M-mark-on-back-of-cat-head',0,headY+.28,.12,.19,.039,.07,P.dark);
  if(s>=5)pair(d=>L('adult-cheek-second-faint-brown-streak-'+d,
   [[d*.14,headY-.23,.64],[d*.27,headY-.29,.49]],.016,P.bone));
  if(s===6)pair(d=>E('elder-lengthened-whisker-pad-'+d,d*.20,headY-.16,.59,.077,.065,.049,P.light));
  if(s===7)pair(d=>L('fictional-legend-quiet-tail-echo-'+d,
   [[d*.25,.96,-bodyLength-tail*.82],[d*.40,1.12,-bodyLength-tail*1.13],
    [d*.47,1.30,-bodyLength-tail*1.23]],.021,P.legend));
 }else if(id==='kukang_sumatra'){
  // Nycticebus coucang is NOT a tarsier: hidden ears, no long tail,
  // stout slow-climbing body, dense brown fur, facial mask, gripping thumb.
  const headY=1.53+.075*growth,headW=.29+.075*growth;
  E('stocky-round-Sumatran-slow-loris-torso',0,.89,-.13,.31+.12*growth,.43,.31,P.coat);
  E('plush-light-grey-beige-loris-belly',0,.86,.19,.22,.27,.17,P.light);
  E('large-round-soft-furred-head',0,headY,.15,headW,.29+.03*growth,.27,P.light);
  E('brown-topped-crown-hair',0,headY+.22,-.04,.28,.13,.25,P.coat);
  E('white-narrow-interocular-blaze',0,headY+.05,.40,.064,.21,.025,P.light);
  E('tiny-loris-short-snout',0,headY-.13,.41,.11,.088,.093,P.light);
  E('moist-short-rounded-nose',0,headY-.15,.51,.048,.044,.044,P.dark);
  pair(d=>{
   E('thick-dark-circumocular-mask-'+d,d*.17,headY+.06,.347,.174,.188,.063,P.mark);
   pinEye('enormous-forward-staring-nocturnal-eye-'+d,d*.17,headY+.075,.416,.095,P.iris);
   E('short-fur-hidden-loris-ear-'+d,d*headW*.90,headY+.17,-.005,.084,.085,.073,P.coat);
   L('slow-wide-reaching-forelimb-'+d,[[d*.25,1.17,-.02],
    [d*.38,.85,.16],[d*.45,.63,.28]],.098,P.coat);
   E('prehensile-thumb-opposable-grip-palm-'+d,d*.45,.60,.28,.11,.13,.10,P.light);
   L('separated-opposable-digit-'+d,[[d*.45,.61,.31],
    [d*.30,.57,.43],[d*.24,.51,.46]],.032,P.bone);
   for(let i=0;i<3;i++)L('branch-clamping-finger-'+d+'-'+i,
    [[d*.45,.62,.31],[d*(.49+i*.038),.48-(i%2)*.035,.39]],.020,P.light);
   L('short-strong-slow-loris-hindleg-'+d,[[d*.23,.73,-.21],
    [d*.27,.38,-.06],[d*.32,.22,.16]],.109,P.coat);
   E('large-opposable-loris-foot-'+d,d*.31,.17,.22,.14,.10,.16,P.light);
  });
  L('brown-dorsal-back-stripe',[[0,1.26,-.34],
    [0,.98,-.43],[0,.67,-.39]],.046,P.mark);
  for(let j=0;j<5+s;j++){
   const a=j*2.39996;
   E('dense-silky-loris-fur-tuft-'+j,Math.sin(a)*.31,
    .85+(j%5)*.12,Math.cos(a)*.27-.15,.065,.10,.068,j%3?P.coat:P.light);
  }
  if(s>=3)pair(d=>L('outer-dark-loris-mask-fork-'+d,
   [[d*.12,headY+.25,.37],[d*.24,headY+.21,.38],
    [d*.27,headY+.10,.38]],.025,P.mark));
  if(s>=5)E('mature-dark-wide-neck-dorsal-cap',0,1.39,-.21,.16,.08,.15,P.mark);
  if(s===6)pair(d=>E('elder-grey-face-frosting-'+d,d*.26,headY-.12,.35,.061,.076,.035,P.light));
  if(s===7)pair(d=>L('fictional-legend-dawn-loris-hand-lantern-'+d,
   [[d*.37,.80,.20],[d*.53,1.04,.33],[d*.67,1.20,.48]],.027,P.legend));
 }
 rig.userData={id,phase:s,taxon:IDENT[id].taxon,source:IDENT[id].source,sculpted:true,
  speciesSignature:IDENT[id].fieldmarks,fictionalLegend:legend,gameplaySaveUnchanged:true};
 body.userData.NJ109={id,phase:s,version:109,fullReplacement:true};
 return true;
};
})();