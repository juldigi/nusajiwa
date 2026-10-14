/* NUSAJIWA NJ96 — ten Indonesian fauna, 80 identity-specific fantasy game stages.
   Juvenile native generic rig is hidden; adult artist rig is retained.
   Biological facts are species traits; eggs for mammals and "Legend" are fiction. */
(function(){
'use strict';
if(window.NUSAJIWA_MORPH96) return;
const IDS=['elang_jawa','rusa_bawean','tarsius','babirusa','rangkong_badak',
 'kasuari','penyu_hijau','duyung','arwana','kakatua_raja'];
const SOURCES={
 elang_jawa:'https://ebird.org/species/javhae1',
 rusa_bawean:'https://doi.org/10.14203/treubia.v33i1.585',
 tarsius:'https://animaldiversity.org/accounts/Tarsius_tarsier/',
 babirusa:'https://www.iucn-wpsg.org/sulawesi-babirusa-detailed',
 rangkong_badak:'https://www.rangkong.org/faq',
 kasuari:'https://www.nationalzoo.si.edu/animals/southern-cassowary',
 penyu_hijau:'https://www.fisheries.noaa.gov/species/green-turtle',
 duyung:'https://www.dugongseagrass.org/dugong/',
 arwana:'https://www.fishbase.se/summary/Scleropages-formosus.html',
 kakatua_raja:'https://sandiegozoowildlifealliance.org/story-hub/zoonooz/palm-cockatoos'
};
window.NUSAJIWA_MORPH96_IDS=Object.freeze(IDS.slice());
window.NUSAJIWA_MORPH96_SOURCES=Object.freeze(SOURCES);
window.NUSAJIWA_MORPH96=function(group,body,M,id,phase,T,ell,tube){
 if(!IDS.includes(id)||!group||!body||!M||!T||!ell||!tube) return false;
 const p=Math.max(0,Math.min(7,Math.floor(Number(phase)||0)));
 const root=new T.Group();root.name='nj96-'+id+'-phase-'+p;
 const E=(name,x,y,z,a,b,c,mat)=>{const o=ell(root,x,y,z,a,b,c,mat);o.name=name;return o;};
 const L=(name,points,r,mat)=>{const o=tube(root,points,r,mat);o.name=name;return o;};
 const C=(name,x,y,z,r,h,mat)=>{const o=new T.Mesh(new T.ConeGeometry(r,h,9),mat);
  o.position.set(x,y,z);o.name=name;root.add(o);return o;};
 const both=(fn)=>{fn(-1);fn(1);};
 const O=(n,x,y,z,w,h,d,m)=>E(n,x,y,z,w,h,d,m);
 const varSize=.64+p*.14;
 if(p===0){
  // Egg badges are species-specific visual symbols, NOT reproductive claims for mammals.
  const i=IDS.indexOf(id),a=i*Math.PI/5;
  E('egg-species-engraving-'+id,Math.cos(a)*.19,1.19, .70, .13,.21,.033,M.dark);
  L('egg-identity-motif-'+id,[[0,1.06,.75],[Math.sin(a)*.16,1.27,.79],[Math.cos(a)*.20,1.44,.74]],.035,M.gold);
  both(d=>E('egg-identity-dots-'+d,d*.23,1.02+.02*i,.64,.04,.07,.04,M.light));
  if(['elang_jawa','rangkong_badak','kasuari','kakatua_raja'].includes(id))
   both(d=>L('avian-egg-wing-'+d,[[0,1.18,.78],[d*.18,1.38,.73],[d*.25,1.20,.72]],.026,M.white));
  if(['penyu_hijau','duyung','arwana'].includes(id))
   L('aquatic-egg-current',[[ -.23,.98,.67],[0,1.12,.78],[.23,1.00,.67]],.032,M.main);
  group.add(root);
 }else{
  if(p<=4)body.children.forEach(c=>{c.visible=false;});
  body.add(root);
  if(p<=4){
   switch(id){
    case 'elang_jawa':{
     E('javan-hawk-eagle-feathered-keel',0,1.05,0,.27*varSize,.42*varSize,.30*varSize,M.light);
     E('javan-hawk-eagle-skull',0,1.60,.22,.22,.23,.24,M.main);
     C('javan-hawk-eagle-hook-bill',0,1.54,.53,.105,.23,M.gold).rotation.x=.45;
     both(d=>{
      E('hawk-eagle-true-wing-'+d,d*(.28+.055*p),1.19,-.05,.14+.04*p,.32,.14,M.main);
      L('hawk-eagle-talons-'+d,[[d*.14,.77,.03],[d*.16,.36,.16],[d*.28,.27,.32]],.055,M.dark);
     });
     if(p===1)E('eagle-downy-pale-chick',0,1.01,.26,.24,.21,.14,M.white);
     if(p===2)both(d=>E('juvenile-pale-hawk-cheek-'+d,d*.12,1.62,.41,.09,.12,.04,M.white));
     if(p===3)both(d=>L('first-strong-flight-primaries-'+d,[[d*.39,1.23,-.21],[d*.70,.88,-.41]],.067,M.dark));
     if(p===4)for(let j=-1;j<=1;j++)L('vertical-javan-eagle-crest-'+j,[[j*.065,1.80,.12],[j*.09,2.04,.08]],.036,M.main);
     break;}
    case 'rusa_bawean':{
     E('bawean-short-stocky-deer-trunk',0,.90,-.12,.29+.038*p,.27+.032*p,.43+.055*p,M.main);
     E('bawean-fawn-long-muzzle',0,1.28,.49,.22,.21,.32,M.main);
     E('bawean-white-throat-bib',0,1.05,.74,.20,.14,.10,M.white);
     both(d=>{for(const z of [-.37,.40])L('four-bawean-slender-legs-'+d+'-'+z,[[d*.28,.68,z],[d*.31,.20,z+.04]],.072,M.dark);
      E('wide-bawean-deer-ear-'+d,d*.31,1.48,.37,.16,.13,.10,M.light);});
     if(p===1)for(let j=0;j<5;j++)E('fawn-white-back-spot-'+j,(j%2?-.20:.20),1.12,-.38+j*.17,.06,.032,.056,M.white);
     if(p===2)E('deer-young-developed-neck',0,1.12,.37,.30,.30,.25,M.main);
     if(p===3)E('yearling-white-eye-ring',0,1.42,.72,.19,.07,.045,M.white);
     if(p===4)both(d=>L('fantasy-male-deer-antler-pedicle-'+d,[[d*.17,1.53,.36],[d*.20,1.73,.36]],.039,M.dark));
     break;}
    case 'tarsius':{
     E('tarsier-small-vertical-primate',0,1.05,0,.23,.34,.24,M.main);
     E('tarsier-round-head',0,1.64,.18,.34,.29,.30,M.light);
     both(d=>{
      E('tarsier-enormous-fixed-eyeball-'+d,d*.19,1.69,.44,.145,.15,.075,M.gold);
      E('tarsier-black-pupil-'+d,d*.19,1.69,.510,.065,.076,.02,M.black);
      E('tarsier-large-soft-ear-'+d,d*.40,1.79,.05,.12,.19,.12,M.light);
      L('elongated-ankle-tarsus-'+d,[[d*.17,.75,.02],[d*.31,.33,-.02],[d*.38,.21,.22]],.064,M.main);
     });
     L('tarsier-long-unbranched-tail',[[0,.87,-.20],[.29,.65,-.63],[.55,1.15,-.96]],.046,M.dark);
     if(p===1)E('tiny-tarsier-clinging-infant',0,.91,.16,.14,.17,.11,M.light);
     if(p===2)both(d=>E('tarsier-prehensile-gripping-finger-'+d,d*.36,.25,.27,.08,.05,.11,M.dark));
     if(p===3)E('teen-tarsier-ear-rim',0,1.85,.03,.43,.05,.06,M.dark);
     if(p===4)both(d=>L('long-tarsier-jumping-calf-'+d,[[d*.15,.67,.11],[d*.36,.23,.09]],.078,M.main));
     break;}
    case 'babirusa':{
     E('babirusa-grey-hairless-suid-body',0,.91,-.12,.30+.04*p,.33+.025*p,.47+.054*p,M.main);
     E('babirusa-tapering-pig-muzzle',0,1.08,.52,.25,.22,.38,M.main);
     E('babirusa-end-on-snout',0,1.02,.87,.22,.13,.09,M.dark);
     both(d=>{for(const z of [-.36,.37])L('babirusa-slender-hoofed-leg-'+d+'-'+z,[[d*.27,.72,z],[d*.29,.18,z]],.088,M.dark);
       E('babirusa-dark-lateral-ear-'+d,d*.27,1.34,.31,.15,.15,.13,M.dark);});
     L('babirusa-thin-pig-tail',[[0,.75,-.51],[.08,.49,-.79]],.028,M.main);
     if(p===1)E('babirusa-piglet-thin-down',0,1.24,-.13,.26,.11,.28,M.light);
     if(p===2)E('babirusa-young-wrinkled-neck',0,1.27,.12,.37,.18,.21,M.dark);
     if(p===3)both(d=>L('lower-canine-beginning-'+d,[[d*.18,1.04,.68],[d*.25,1.25,.78]],.036,M.white));
     if(p===4)both(d=>L('male-upper-canine-through-snout-'+d,[[d*.15,1.18,.82],[d*.18,1.53,.82],[d*.23,1.58,.60]],.048,M.white));
     break;}
    case 'rangkong_badak':{
     E('rhinoceros-hornbill-black-bird-body',0,1.06,-.13,.27+.025*p,.37,.37,M.dark);
     E('rhinoceros-hornbill-neck',0,1.46,.24,.19,.31,.18,M.black);
     E('rhinoceros-hornbill-head',0,1.72,.37,.21,.20,.25,M.main);
     L('rhinoceros-hornbill-long-curved-bill',[[0,1.66,.57],[0,1.47,.87],[0,1.39,1.10]],.13,M.gold);
     both(d=>{E('hornbill-feathered-wing-'+d,d*(.29+.04*p),1.09,-.19,.14+.03*p,.31,.22,M.main);
      L('hornbill-perching-toes-'+d,[[d*.13,.70,.03],[d*.14,.28,.18],[d*.21,.18,.31]],.047,M.dark);});
     if(p===1)E('hornbill-juvenile-pale-throat',0,1.42,.40,.23,.13,.12,M.white);
     if(p===2)E('first-growing-yellow-casque',0,1.92,.51,.12,.13,.20,M.gold);
     if(p===3)L('upturned-rhino-hornbill-casque',[[0,1.90,.53],[0,2.12,.68],[0,2.36,.64]],.10,M.gold);
     if(p===4)E('hornbill-white-banded-tail',0,.75,-.58,.22,.09,.34,M.white);
     break;}
    case 'kasuari':{
     E('cassowary-flightless-black-barrel',0,1.08,-.10,.35+.028*p,.52+.03*p,.34+.04*p,M.black);
     L('cassowary-electric-blue-neck',[[0,1.40,.23],[0,1.91,.35],[0,2.14,.35]],.14,M.main);
     E('cassowary-blue-skull',0,2.19,.36,.18,.19,.22,M.main);
     both(d=>L('cassowary-powerful-three-toed-shank-'+d,[[d*.24,.73,-.04],[d*.25,.24,.12],[d*.32,.17,.36]],.100,M.dark));
     if(p===1)E('cassowary-striped-chick-back',0,1.35,-.12,.29,.09,.29,M.light);
     if(p===2)E('cassowary-rufous-juvenile-down',0,1.01,.24,.24,.25,.17,M.main);
     if(p===3)both(d=>L('two-red-neck-wattles-'+d,[[d*.12,1.89,.51],[d*.17,1.54,.53]],.046,M.pink));
     if(p===4){C('cassowary-adolescent-keratin-casque',0,2.48,.31,.13,.34,M.dark);
       both(d=>L('cassowary-two-wattles-'+d,[[d*.12,1.90,.52],[d*.19,1.42,.58]],.065,M.pink));}
     break;}
    case 'penyu_hijau':{
     E('green-sea-turtle-flattened-shell',0,.95,-.16,.37+.037*p,.19+.018*p,.46+.048*p,M.main);
     E('green-sea-turtle-cream-plastron',0,.74,-.16,.31,.12,.36,M.light);
     E('small-green-turtle-head',0,.84,.49,.20,.16,.22,M.main);
     both(d=>{E('green-turtle-elongated-front-flipper-'+d,d*(.46+.05*p),.67,.34,.19+.06*p,.085,.36,M.dark);
      E('short-green-turtle-hind-flipper-'+d,d*.36,.72,-.47,.19,.07,.19,M.main);});
     if(p===1)E('hatchling-dark-shell-and-pale-edge',0,1.09,-.10,.32,.065,.41,M.dark);
     if(p===2)for(let k=0;k<5;k++)E('juvenile-shell-scute-'+k,Math.sin(k*2.4)*.23,1.14,Math.cos(k*2.4)*.31,.095,.035,.13,M.gold);
     if(p===3)both(d=>L('turtle-one-visible-flipper-claw-'+d,[[d*.61,.69,.51],[d*.77,.66,.59]],.036,M.white));
     if(p===4)E('mature-turtle-shell-olive-mottling',0,1.17,-.27,.29,.035,.32,M.dark);
     break;}
    case 'duyung':{
     E('dugong-rounded-marine-mammal-body',0,1.03,-.17,.37+.04*p,.34+.025*p,.56+.08*p,M.main);
     E('dugong-downturned-broad-muzzle',0,1.13,.55,.27,.24,.29,M.light);
     both(d=>{E('dugong-paired-paddle-foreflipper-'+d,d*.41,.80,.10,.27,.065,.32,M.main);
      E('dugong-horizontal-fluke-'+d,d*.35,.97,-.95,.43,.06,.22,M.dark);});
     if(p===1)E('dugong-newborn-snug-muzzle',0,1.07,.77,.20,.16,.13,M.light);
     if(p===2)E('dugong-hair-whisker-pad',0,1.16,.82,.23,.10,.09,M.dark);
     if(p===3)both(d=>E('dugong-fluke-notch-edge-'+d,d*.54,1.00,-1.07,.27,.04,.14,M.main));
     if(p===4)E('dugong-grazing-snout-muscle',0,.99,.67,.33,.20,.24,M.main);
     // Dugongs have no dorsal fin. Never add a dorsal fin or a vertical fish tail.
     break;}
    case 'arwana':{
     E('asian-arowana-streamlined-long-fish',0,1.10,-.05,.27+.025*p,.26+.018*p,.69+.045*p,M.main);
     E('asian-arowana-upturned-jaw',0,1.15,.68,.26,.15,.19,M.light);
     both(d=>{L('arowana-two-mandibular-barbels-'+d,[[d*.09,1.17,.86],[d*.15,1.27,1.04]],.024,M.dark);
      E('arowana-lateral-pectoral-fin-'+d,d*.31,.89,.11,.16,.06,.22,M.gold);});
     E('arowana-caudad-fan-fin',0,1.07,-.87,.36,.24,.23,M.dark);
     if(p===1)E('arowana-fry-translucent-tail',0,1.05,-.87,.26,.14,.28,M.light);
     if(p===2)for(let j=0;j<5;j++)E('arowana-first-metallic-scale-'+j,(j%2?-.16:.16),1.19,-.54+j*.23,.10,.07,.08,M.gold);
     if(p===3)E('arowana-elongated-anal-fin',0,.79,-.47,.13,.06,.39,M.main);
     if(p===4)E('arowana-dorsal-fin-near-tail',0,1.40,-.52,.14,.08,.26,M.gold);
     break;}
    case 'kakatua_raja':{
     E('palm-cockatoo-black-perching-body',0,1.11,-.12,.28+.027*p,.40,.32,M.black);
     E('palm-cockatoo-head',0,1.66,.25,.26,.27,.25,M.dark);
     E('palm-cockatoo-huge-grey-beak',0,1.52,.57,.18,.24,.17,M.light);
     both(d=>{E('palm-cockatoo-red-bare-cheek-'+d,d*.235,1.63,.43,.080,.13,.04,M.pink);
      E('palm-cockatoo-heavy-black-flight-wing-'+d,d*(.31+.025*p),1.08,-.12,.17,.31,.18,M.main);
      L('palm-cockatoo-perching-foot-'+d,[[d*.16,.78,-.10],[d*.18,.34,.12],[d*.29,.26,.28]],.055,M.dark);});
     if(p===1)E('palm-cockatoo-nestling-down',0,1.19,.22,.25,.20,.14,M.light);
     if(p===2)E('palm-cockatoo-bill-gaining-depth',0,1.51,.67,.14,.18,.12,M.dark);
     if(p===3)for(let j=-1;j<=1;j++)L('palm-cockatoo-first-crest-'+j,[[j*.07,1.87,.09],[j*.13,2.04,-.04]],.045,M.main);
     if(p===4)for(let j=-2;j<=2;j++)L('palm-cockatoo-long-upright-crest-'+j,[[j*.055,1.89,.02],[j*.09,2.24+(j%2)*.08,-.17]],.049,M.dark);
     break;}
   }
  }else{
   // Preserve earlier elaborate production adult mesh. Overlays are species cues.
   switch(id){
    case 'elang_jawa':
     for(let j=-1;j<=1;j++)L('adult-javan-hawk-eagle-tall-crest-'+j,[[j*.07,1.93,.13],[j*.10,2.27,.08]],.045,M.main);
     both(d=>E('adult-eagle-feather-bars-'+d,d*.45,1.10,-.26,.20,.045,.12,M.dark));break;
    case 'rusa_bawean':
     E('adult-bawean-light-throat-bib',0,1.14,.78,.22,.15,.11,M.white);
     // Existing adult antlers are not duplicated.
     both(d=>E('adult-bawean-eye-ring-'+d,d*.15,1.49,.65,.10,.06,.04,M.light));break;
    case 'tarsius':
     both(d=>{E('adult-tarsier-oversize-eye-'+d,d*.19,1.72,.54,.13,.15,.05,M.gold);
       L('adult-tarsier-finger-'+d,[[d*.38,.33,.23],[d*.50,.20,.32]],.03,M.dark);});break;
    case 'babirusa':
     E('adult-babirusa-hairless-wrinkled-neck',0,1.24,.30,.35,.20,.21,M.dark);
     // No extra adult tusks; retain existing species-native 3D tusks.
     L('adult-babirusa-thin-tail',[[0,.74,-.53],[.07,.43,-.81]],.040,M.main);break;
    case 'rangkong_badak':
     L('adult-rhinoceros-hornbill-upturned-casque',[[0,1.96,.52],[0,2.19,.65],[0,2.40,.55]],.095,M.gold);
     E('adult-hornbill-white-tail-band',0,.69,-.54,.22,.09,.30,M.white);break;
    case 'kasuari':
     both(d=>L('adult-cassowary-two-red-wattles-'+d,[[d*.12,1.87,.48],[d*.19,1.45,.51]],.074,M.pink));
     E('adult-cassowary-unflighted-black-barrel',0,1.08,-.16,.33,.19,.40,M.black);break;
    case 'penyu_hijau':
     both(d=>E('adult-green-turtle-paddling-flipper-'+d,d*.59,.70,.23,.25,.075,.40,M.main));
     E('adult-turtle-scute-central-mosaic',0,1.14,-.11,.17,.045,.23,M.dark);break;
    case 'duyung':
     both(d=>E('adult-dugong-horizontal-tail-fluke-'+d,d*.43,.91,-.96,.40,.055,.19,M.main));
     E('adult-dugong-broad-downturned-mouth',0,1.07,.73,.27,.15,.18,M.light);break;
    case 'arwana':
     both(d=>L('adult-arowana-two-lower-jaw-barbels-'+d,[[d*.10,1.22,.78],[d*.16,1.37,.99]],.026,M.dark));
     E('adult-arowana-extended-anal-fin',0,.76,-.44,.18,.055,.33,M.gold);break;
    case 'kakatua_raja':
     both(d=>E('adult-palm-cockatoo-red-bare-cheeks-'+d,d*.24,1.75,.42,.10,.14,.045,M.pink));
     for(let j=-2;j<=2;j++)L('adult-palm-cockatoo-crest-'+j,[[j*.055,1.96,.08],[j*.095,2.32,-.17]],.045,M.dark);break;
   }
   // Elder / Legend intentionally introduce new silhouette elements, not a uniform scale.
   if(p===6){
    if(['duyung','arwana','penyu_hijau'].includes(id))both(d=>E('elder-marine-identity-fin-'+d,d*.48,.83,-.44,.22,.08,.17,M.light));
    else both(d=>E('elder-specific-side-ornament-'+d,d*.43,1.26,-.22,.16,.20,.11,M.light));
   }
   if(p===7){
    if(['elang_jawa','rangkong_badak','kasuari','kakatua_raja'].includes(id))
      both(d=>L('legend-avian-display-feather-'+d,[[d*.30,1.21,-.30],[d*.79,1.73,-.52],[d*.94,2.07,-.69]],.069,M.gold));
    else if(['duyung','arwana','penyu_hijau'].includes(id))
      both(d=>E('legend-marine-aura-fin-'+d,d*.72,.89,-.76,.30,.09,.31,M.gold));
    else both(d=>L('legend-terrestrial-guardian-ridge-'+d,[[d*.24,1.18,-.40],[d*.56,1.53,-.52],[d*.73,1.88,-.64]],.055,M.gold));
   }
  }
 }
 root.userData={identity:id,stage:p,speciesBased:true,legendIsFantasy:p===7,
  nativeAdultPreserved:p>=5,source:SOURCES[id]};
 body.userData.nj96={id,stage:p,adultPreserved:p>=5,source:SOURCES[id]};
 return true;
};
})();