/* NUSAJIWA NJ94: ten iconic Indonesian fauna, 8 distinct 3D phase constructions.
   Mammal egg phase and legendary form are fictional Tamagotchi mechanics.
   Keep prior adult native sculpt intact, replace juvenile generic primitives. */
(function(){
'use strict';
if(window.NUSAJIWA_MORPH94)return;
const IDS=['komodo','tiger','cendrawasih','anoa','maleo','bekantan','orangutan','badak_jawa','gajah_sumatra','jalak_bali'];
const REF={
 komodo:['juvenile colored markings, tree climbing claws, forked tongue','https://nationalzoo.si.edu/animals/komodo-dragon'],
 tiger:['Sumatran tiger narrow black stripes; quadruped','https://www.worldwildlife.org/species/tiger/'],
 cendrawasih:['juveniles unlike mature courtship plumes','https://www.britannica.com/animal/bird-of-paradise'],
 anoa:['small forest buffalo with paired straight horns','https://www.iucnredlist.org/'],
 maleo:['precocial hatchling with feathers and flight','https://academic.oup.com/condor/article/127/3/duaf022/8124486'],
 bekantan:['newborn blue face; developing nose and belly','https://www.smithsonianmag.com/science-nature/endangered-proboscis-monkey-easily-identifiable-by-one-physical-trait-supersized-schnoz-180988420/'],
 orangutan:['long arms, reddish hair, grasping hands, NO tail','https://nationalzoo.si.edu/animals/orangutan'],
 badak_jawa:['single short horn can be absent in females; fine hide creases','https://asianrhinos.group/rhinos/javan/'],
 gajah_sumatra:['Asian elephant trunk, rounded ears, four pillar legs','https://www.worldwildlife.org/species/elephant/asian-elephant/'],
 jalak_bali:['blue bare eye patch, white bird, black wing tips, fine crest','https://animals.sandiegozoo.org/animals/bali-myna']
};
window.NUSAJIWA_MORPH94_IDS=Object.freeze(IDS.slice());
window.NUSAJIWA_MORPH94_REFERENCES=Object.freeze(REF);
window.NUSAJIWA_MORPH94=function(group,body,M,id,phase,T,ell,tube){
 if(!IDS.includes(id)||!group||!body||!M||!T||!ell||!tube)return false;
 const stage=Math.max(0,Math.min(7,Math.floor(Number(phase)||0)));
 const root=new T.Group();root.name='nj94_'+id+'_'+stage;
 const E=(n,x,y,z,a,b,c,m)=>{const q=ell(root,x,y,z,a,b,c,m);q.name=n;return q};
 const L=(n,pts,r,m)=>{const q=tube(root,pts,r,m);q.name=n;return q};
 const C=(n,x,y,z,r,h,m)=>{const q=new T.Mesh(new T.ConeGeometry(r,h,8),m);q.position.set(x,y,z);q.name=n;root.add(q);return q};
 const W=(n,pts,m)=>{const sh=new T.Shape();sh.moveTo(...pts[0]);for(const p of pts.slice(1))sh.lineTo(...p);sh.closePath();
  const q=new T.Mesh(new T.ShapeGeometry(sh),m);q.position.z=-.12;q.name=n;root.add(q);return q};
 const P=f=>{f(-1);f(1)};
 const BLUE=new T.MeshStandardMaterial({color:0x2096d0,roughness:.73});
 const feet=(kind,w,z)=>{
  P(d=>{for(const f of [-z,z])E(kind+'-grounded-foot-'+d+'-'+f,d*w,.30,f,.13,.28,.18,M.dark)});
 };
 const tail=(kind,depth)=>L(kind,[[0,.81,-depth],[.28,.87,-depth-.30],[.44,1.17,-depth-.63]],.09,M.main);
 if(stage===0){
  const ring=new T.Mesh(new T.TorusGeometry(.20,.035,8,28),M.gold);
  ring.position.set(0,1.22,.65);ring.name='species-egg-relief-ring';root.add(ring);
  const index=IDS.indexOf(id);
  for(let k=0;k<3;k++){const a=index*.42+k*Math.PI*2/3;
   E('species-egg-engraving-'+k,Math.sin(a)*(.15+index*.005),
     1.2+Math.cos(a)*(.17+index*.003),.67,.053,.076,.02,k===0?M.dark:M.light);}
  if(['cendrawasih','maleo','jalak_bali'].includes(id))
   P(d=>L('bird-egg-feather-symbol-'+d,[[0,1.17,.7],[d*.19,1.32,.70],[d*.27,1.22,.68]],.023,M.white));
  if(id==='komodo')L('komodo-egg-curl',[[0,1.09,.70],[.21,1.03,.70],[.12,1.24,.71]],.027,M.main);
  group.add(root);
 }else{
  if(stage<=4)body.children.forEach(ob=>ob.visible=false);
  body.add(root);
  const p=Math.min(4,stage),x=.5+p*.14;
  if(stage<=4){
   switch(id){
   case 'komodo':
    E('monitor-reptile-body',0,.70,-.1,.27+.075*p,.23+.03*p,.43+.1*p,M.main);
    E('komodo-wide-jaw',0,.69,.63+.08*p,.27+.018*p,.16,.37,M.main);
    E('komodo-flattened-snout',0,.64,1.0+.08*p,.19,.08,.21,M.light);
    feet('monitor-clawed',.40,.43);
    tail('stout-long-monitor-tail',.56+.09*p);
    P(d=>L('splayed-fore-claw-'+d,[[d*.38,.29,.50],[d*.51,.09,.64],[d*.57,.08,.70]],.020,M.dark));
    if(p===1)for(let k=0;k<5;k++)E('bright-juvenile-ocellus-'+k,(k%2?-.20:.20),.90,-.47+k*.19,.05,.034,.07,M.gold);
    if(p===2)P(d=>L('arboreal-hook-claw-'+d,[[d*.52,.18,.53],[d*.64,.25,.67],[d*.70,.42,.68]],.028,M.white));
    if(p===3)E('lizard-thick-neck-muscle',0,.88,.40,.40,.29,.33,M.dark);
    if(p===4)for(let k=0;k<12;k++)E('flat-armor-scale-'+k,Math.sin(k*2.4)*.35,.92,Math.cos(k*2.4)*.52,.065,.04,.09,M.dark);
    break;
   case 'tiger':
    E('tiger-four-legged-torso',0,.83,-.1,.30+.070*p,.31+.038*p,.48+.1*p,M.main);
    E('tiger-cheek-head',0,1.24+.05*p,.53,.29+.03*p,.25,.29,M.light);
    E('tiger-white-muzzle',0,1.04+.05*p,.86,.22,.12,.19,M.white);
    feet('feline-paws',.34,.38);
    tail('non-spiked-cat-tail',.63+.05*p);
    P(d=>{E('cat-rounded-ear-'+d,d*.28,1.50+.05*p,.35,.13,.16,.14,M.dark);
      for(const z of [-.43,-.07,.29,.48])L('narrow-feline-black-stripe-'+d+'-'+z,
       [[d*.27,1.18,z-.12],[d*.47,.92,z],[d*.34,.71,z+.10]],.028,M.black)});
    if(p===1)E('round-cub-head',0,1.37,.66,.32,.20,.23,M.light);
    if(p===2)P(d=>E('first-padded-toe-'+d,d*.33,.15,.51,.15,.11,.15,M.white));
    if(p===3)E('thick-young-cat-chest-fur',0,1.02,.44,.35,.27,.23,M.white);
    if(p===4)P(d=>E('expanded-teen-tiger-jowl-'+d,d*.34,1.27,.61,.19,.18,.13,M.light));
    break;
   case 'cendrawasih':
    E('avian-keel-chest',0,1.09,-.04,.22+.03*p,.36+.03*p,.28,M.main);
    E('bird-of-paradise-head',0,1.64+.03*p,.24,.21,.22,.22,M.light);
    C('thin-avian-bill',0,1.56+.03*p,.55,.07,.25,M.dark).rotation.x=.44;
    P(d=>{E('true-feathered-wing-'+d,d*(.29+.04*p),1.23,-.12,.16+.04*p,.31,.15,M.gold);
      L('perching-bird-toes-'+d,[[d*.11,.73,.0],[d*.16,.28,.13],[d*.22,.25,.37]],.036,M.dark)});
    if(p===1)E('nestling-down-mantle',0,1.17,-.23,.29,.25,.13,M.light);
    if(p===2)P(d=>L('first-extended-primary-'+d,[[d*.30,1.18,-.18],[d*.50,.97,-.30]],.048,M.main));
    if(p===3)P(d=>E('secondary-wing-coverts-'+d,d*.50,1.18,-.25,.18,.28,.14,M.dark));
    if(p===4)for(let k=-2;k<=2;k++)L('developing-courtship-plume-'+k,
       [[k*.07,.95,-.30],[k*.13,.52,-.59],[k*.17,.32,-.81]],.026,M.gold);
    break;
   case 'anoa':
    E('short-stocky-anoa-barrel',0,.92,-.12,.28+.075*p,.34+.04*p,.47+.08*p,M.main);
    E('sulawesi-buffalo-head',0,1.38+.04*p,.52,.26,.29,.34,M.main);
    E('broad-bovid-nose',0,1.18+.04*p,.85,.29,.14,.25,M.dark);
    feet('cloven-buffalo-hoof',.33,.38);
    P(d=>E('anoa-lateral-ear-'+d,d*.36,1.57+.04*p,.36,.18,.10,.14,M.main));
    if(p===1)E('calf-hornless-head',0,1.64,.47,.27,.19,.20,M.light);
    if(p>=2)P(d=>L('paired-anoa-upright-horn-'+d,[[d*.22,1.63+.04*p,.32],
      [d*.25,1.79+.06*p,.29],[d*.28,1.95+.10*p,.20]],.041,M.dark));
    if(p===3)E('developed-anoa-shoulder',0,1.31,-.28,.40,.27,.30,M.main);
    if(p===4)E('anoa-adolescent-neck-bulk',0,1.21,.18,.48,.31,.34,M.dark);
    break;
   case 'maleo':
    E('fully-feathered-precocial-body',0,1.02,-.01,.21+.04*p,.33+.035*p,.31,M.dark);
    E('small-megapode-head',0,1.56+.045*p,.24,.22,.21,.23,M.main);
    E('salmon-coloured-maleo-underside',0,.97,.24,.19,.27,.10,M.pink);
    C('maleo-pointed-bill',0,1.50+.045*p,.56,.08,.23,M.gold).rotation.x=.44;
    P(d=>{E('hatchling-capable-feathered-wing-'+d,d*(.24+.045*p),1.18,-.1,.13+.04*p,.32,.13,M.main);
      L('megapode-strong-walking-leg-'+d,[[d*.14,.73,.03],[d*.16,.32,.16],[d*.22,.18,.39]],.051,M.dark)});
    if(p===1)E('already-flight-ready-coverts',0,1.30,-.26,.22,.15,.13,M.light);
    if(p>=2)C('maleo-black-cranial-casque',0,1.85+.07*p,.12,.13,.17+.04*p,M.dark);
    if(p===3)P(d=>E('fully-extended-maleo-primaries-'+d,d*.46,1.16,-.25,.17,.32,.12,M.light));
    if(p===4)E('maleo-lengthening-trail-tail',0,.74,-.42,.21,.13,.34,M.dark);
    break;
   case 'bekantan':
    E('young-bekantan-round-belly-torso',0,1.05,-.04,.25+.055*p,.42+.04*p,.29,M.main);
    E('proboscis-monkey-face',0,1.67+.04*p,.14,.24+.025*p,.29,.25,M.light);
    P(d=>{L('long-riparian-monkey-arm-'+d,[[d*.29,1.42,0],[d*.42,.86,.10],[d*.44,.36,.22]],.071,M.main);
      E('webbed-foot-outline-'+d,d*.19,.26,.21,.14,.13,.24,M.dark)});
    tail('very-long-nasal-monkey-tail',.31);
    if(p===1)E('newborn-blue-faced-bekantan',0,1.73,.38,.20,.21,.06,BLUE);
    if(p>=2)E('developing-proboscis',0,1.66+.04*p,.43,.11,.13+.035*p,.12,M.light);
    if(p===3)E('leaf-eating-protruding-belly',0,.96,.27,.31,.27,.22,M.light);
    if(p===4)E('adolescent-nasal-bridge',0,1.89,.44,.14,.30,.13,M.main);
    break;
   case 'orangutan':
    E('tailless-bornean-orangutan-core',0,1.02,-.04,.28+.055*p,.44+.04*p,.29,M.main);
    E('orangutan-flat-face',0,1.72+.035*p,.20,.29,.27,.27,M.dark);
    E('orangutan-soft-muzzle',0,1.55+.035*p,.41,.20,.13,.13,M.light);
    P(d=>{L('arms-longer-than-legs-'+d,[[d*.29,1.43,0],[d*(.40+.04*p),.80,.13],
       [d*(.45+.06*p),.20,.25]],.091,M.main);
      E('orangutan-grasping-hand-'+d,d*(.48+.04*p),.21,.27,.14,.13,.16,M.dark);
      E('shorter-ape-foot-'+d,d*.19,.22,.20,.15,.15,.21,M.dark)});
    for(let k=0;k<4+p*2;k++)E('reddish-shaggy-coat-'+k,Math.sin(k*2.4)*.26,
     .78+(k%5)*.20,Math.cos(k*2.4)*.28,.052,.16,.053,M.main);
    if(p===1)E('cling-infant-round-belly',0,.93,.28,.29,.28,.22,M.light);
    if(p===2)P(d=>L('first-hooked-climber-finger-'+d,[[d*.45,.26,.28],[d*.59,.12,.35]],.025,M.dark));
    if(p===3)E('orangutan-growing-back-mane',0,1.28,-.34,.41,.48,.14,M.main);
    if(p===4)E('teen-orangutan-strong-shoulder',0,1.41,-.21,.52,.30,.26,M.main);
    break;
   case 'badak_jawa':
    E('one-horned-javan-rhino-trunk',0,.92,-.10,.32+.090*p,.39+.04*p,.55+.08*p,M.main);
    E('grey-rhinoceros-head',0,1.35+.04*p,.49,.28+.025*p,.30,.38,M.main);
    E('prehensile-upper-lip',0,1.13+.04*p,.83,.30,.13,.21,M.light);
    feet('three-toed-heavy-foot',.36,.39);
    P(d=>E('single-rhino-rounded-ear-'+d,d*.28,1.70+.04*p,.30,.13,.22,.10,M.dark));
    L('subtle-javan-neck-crease',[[-.36,1.19,-.26],[0,1.35,-.27],[.36,1.19,-.26]],.037,M.dark);
    if(p===1)E('rhino-hornless-young-calf',0,1.57,.77,.11,.08,.12,M.light);
    if(p>=2)C('single-short-javan-horn',0,1.61+.04*p,.79,.066,.14+.033*p,M.dark).rotation.x=-.32;
    if(p===3)E('rhino-shoulder-fold',0,1.24,-.22,.47,.14,.48,M.dark);
    if(p===4)for(let k=-2;k<=2;k++)L('fine-javan-hide-crease-'+k,
      [[k*.15,1.24,-.34],[k*.12,.98,-.46],[k*.15,.71,-.42]],.018,M.light);
    break;
   case 'gajah_sumatra':
    E('asian-elephant-compact-body',0,.97,-.16,.31+.08*p,.41+.04*p,.51+.07*p,M.main);
    E('asian-elephant-domed-head',0,1.52+.05*p,.43,.34,.33,.31,M.main);
    feet('pillar-elephant-leg',.34,.39);
    P(d=>E('rounded-elephant-ear-'+d,d*.43,1.51+.05*p,.27,.19+.017*p,.29,.14,M.light));
    L('single-flexible-elephant-trunk',[[0,1.43+.05*p,.69],[0,1.05,.99],
      [.07,.63,1.04],[.16,.49,1.06]],.104+.01*p,M.main);
    if(p===1)E('young-elephant-trunk-tip',.16,.50,1.07,.12,.11,.14,M.dark);
    if(p===2)P(d=>E('first-calf-ear-fold-'+d,d*.45,1.53,.25,.16,.20,.075,M.dark));
    if(p===3)E('elephant-growing-shoulder-muscle',0,1.35,-.25,.48,.28,.31,M.main);
    if(p===4)L('non-prehensile-elephant-tail',[[0,.92,-.57],[.07,.65,-.87],[.02,.38,-1.02]],.07,M.dark);
    break;
   case 'jalak_bali':
    E('white-bali-starling-breast',0,1.08,0,.20+.023*p,.32+.03*p,.28,M.white);
    E('small-white-myna-skull',0,1.61+.03*p,.24,.20,.20,.23,M.white);
    C('short-myna-beak',0,1.53+.03*p,.56,.075,.21,M.gold).rotation.x=.48;
    P(d=>{E('brilliant-blue-eye-skin-'+d,d*.14,1.66+.03*p,.43,.080,.10,.05,BLUE);
      E('snowy-myna-wing-'+d,d*(.25+.032*p),1.17,-.09,.11+.026*p,.29,.13,M.white);
      L('bali-songbird-perch-toes-'+d,[[d*.13,.74,.04],[d*.18,.38,.14],[d*.21,.30,.34]],.033,M.dark)});
    if(p===1)E('hatchling-pale-cinnamon-down',0,1.11,-.21,.22,.16,.17,M.light);
    if(p===2)P(d=>E('first-black-tipped-primary-'+d,d*.36,1.03,-.28,.14,.18,.11,M.black));
    if(p===3)for(let k=0;k<3;k++)C('white-bali-crest-bud-'+k,(k-1)*.08,1.92,.01,.048,.17+.03*k,M.white);
    if(p===4){for(let k=0;k<6;k++)L('lace-like-long-bali-crest-'+k,
      [[(k-3)*.045,1.99,-.05],[(k-3)*.060,2.14,-.20],[(k-3)*.080,2.24,-.34]],.026,M.white);
      E('contrasting-black-tail-tip',0,.67,-.43,.16,.11,.26,M.black);}
    break;
   }
  }else{
   // Keep all original detailed adult meshes and add only identity-safe parts.
   switch(id){
   case 'komodo':
    E('adult-monitor-neck-muscle',0,.79,.68,.29,.26,.28,M.dark);
    P(d=>L('komodo-characteristic-claws-'+d,[[d*.52,.31,.38],[d*.66,.13,.47]],.033,M.white));
    E('adult-flat-head-top',0,1.02,.96,.32,.15,.26,M.main);
    if(stage>=6)for(let k=0;k<10+(stage===7?10:0);k++)E('old-heavy-osteoderm-'+k,Math.sin(k*2.4)*.47,
      1.08,Math.cos(k*2.4)*.45,.082,.063,.11,M.dark);
    if(stage===7)L('legend-monitor-sweeping-tail',[[0,.82,-.88],[-.43,.74,-1.43],
       [-.06,.80,-1.80],[.36,.59,-2.02]],.16,M.main);
    break;
   case 'tiger':
    P(d=>L('adult-feline-stripe-'+d,[[d*.26,1.33,-.43],[d*.53,1.09,-.27],[d*.45,.89,-.17]],.046,M.black));
    E('adult-tiger-white-ruff',0,1.12,.72,.34,.17,.30,M.white);
    if(stage>=6)P(d=>E('older-heavy-jowl-'+d,d*.49,1.31,.41,.22,.28,.15,M.light));
    if(stage===7)L('legend-big-cat-tail',[[0,.93,-.69],[.58,1.15,-1.11],[.32,1.83,-1.44]],.14,M.main);
    break;
   case 'cendrawasih':
    E('adult-bird-of-paradise-breast-collar',0,1.42,.32,.29,.16,.12,M.gold);
    P(d=>L('species-mature-flight-feather-'+d,[[d*.25,1.27,-.14],[d*.66,1.61,-.29]],.062,M.main));
    if(stage>=6)P(d=>{for(let k=0;k<4+(stage===7?4:0);k++)L('courtship-plume-'+d+'-'+k,
     [[d*.11,.85,-.26],[d*(.32+k*.08),.42,-.55-k*.06],
      [d*(.38+k*.12),.10,-.82-k*.09]],.034,M.gold)});
    if(stage===7)P(d=>E('fantasy-display-wing-fan-'+d,d*.69,.78,-.55,.24,.44,.15,M.light));
    break;
   case 'anoa':
    P(d=>L('adult-paired-upright-buffalo-horn-'+d,[[d*.21,1.53,.38],
      [d*.27,1.89,.33],[d*.28,2.08+(stage===7?.15:0),.24]],.075,M.dark));
    E('adult-compact-anoa-shoulder',0,1.29,-.17,.45,.24,.34,M.main);
    if(stage>=6)E('old-anoa-heavy-withers',0,1.47,-.38,.55,.25,.42,M.dark);
    if(stage===7)P(d=>E('guardian-wide-anoa-forefoot-'+d,d*.42,.24,.49,.25,.19,.24,M.main));
    break;
   case 'maleo':
    C('adult-maleo-casque',0,2.11,.11,.16,.32,M.dark);
    P(d=>E('adult-black-megapode-flight-wing-'+d,d*.41,1.19,-.18,.18,.33,.14,M.main));
    E('adult-pink-maleo-belly',0,.97,.31,.22,.25,.11,M.pink);
    if(stage>=6)P(d=>E('senior-secondary-flight-coverts-'+d,d*.60,1.09,-.30,.22,.29,.11,M.dark));
    if(stage===7)L('legend-maleo-lengthened-tail',[[0,.72,-.55],[0,.44,-.87],[.15,.26,-1.05]],.13,M.main);
    break;
   case 'bekantan':
    E('adult-nose-proboscis-marker',0,1.78,.66,.13,.21,.16,M.light);
    L('long-bekantan-balancing-tail',[[0,.92,-.40],[.41,1.15,-.77],[.44,1.67,-.93]],.11,M.main);
    E('leaf-eating-rounded-belly',0,1.01,.30,.38,.34,.23,M.light);
    if(stage>=6)E('senior-bekantan-developed-nose',0,1.71,.74,.16,.30,.17,M.main);
    if(stage===7)E('guardian-bekantan-shoulder',0,1.33,-.26,.49,.36,.26,M.main);
    break;
   case 'orangutan':
    P(d=>L('adult-long-orangutan-arm-'+d,[[d*.39,1.49,0],[d*.63,.83,.16],[d*.69,.17,.26]],.13,M.main));
    E('distinct-flattened-orangutan-face',0,1.88,.44,.35,.28,.14,M.dark);
    if(stage>=6)for(let k=0;k<12+(stage===7?10:0);k++){
     const a=k*2.4;E('long-old-red-coat-'+k,Math.sin(a)*.49,.69+(k%7)*.24,Math.cos(a)*.38,
      .06,.24,.07,M.main);}
    if(stage===7)P(d=>E('possible-mature-male-cheek-flange-'+d,d*.42,1.91,.39,.20,.30,.14,M.dark));
    break;
   case 'badak_jawa':
    // Original rhino model already has one horn; never add a duplicate.
    E('rhino-muzzle-fieldmark-seam',0,1.18,1.19,.19,.075,.12,M.dark);
    E('subtle-javan-skinfold-collar',0,1.44,-.19,.65,.11,.46,M.dark);
    P(d=>L('fine-neck-hide-crease-'+d,[[d*.25,1.38,-.22],[d*.49,1.21,-.33]],.033,M.light));
    if(stage>=6)for(let k=0;k<11+(stage===7?5:0);k++)E('fine-aging-hide-mark-'+k,
       Math.sin(k*2.4)*.57,1.13,Math.cos(k*2.4)*.54,.068,.028,.09,M.light);
    if(stage===7)E('mythic-protected-rhino-mass',0,1.42,-.46,.64,.26,.38,M.main);
    break;
   case 'gajah_sumatra':
    L('elephant-long-continuous-trunk',[[0,1.66,.69],[.05,1.09,1.08],
      [.12,.49,1.18],[.29,.24,.94]],.16,M.main);
    P(d=>E('rounded-asian-ear-'+d,d*.49,1.66,.18,.23,.34,.13,M.main));
    E('asian-elephant-forehead-dome',0,1.98,.46,.43,.31,.29,M.main);
    if(stage>=6)P(d=>E('older-elephant-ear-fold-'+d,d*.54,1.54,.13,.31,.39,.11,M.dark));
    if(stage===7)E('legend-sumatran-elephant-shoulder',0,1.63,-.43,.69,.41,.33,M.main);
    break;
   case 'jalak_bali':
    P(d=>E('adult-bali-blue-bare-eyepatch-'+d,d*.16,1.80,.43,.10,.13,.045,BLUE));
    for(let k=0;k<5+(stage===7?5:0);k++)L('long-white-lace-crest-'+k,
      [[(k-2)*.06,2.09,-.11],[(k-2)*.075,2.28,-.24],
       [(k-2)*.077,2.44+(stage===7?.15:0),-.36]],.030,M.white);
    P(d=>E('contrasting-black-wing-tip-'+d,d*.53,1.04,-.20,.15,.28,.10,M.black));
    if(stage>=6)E('tail-end-black-ring',0,.47,-.61,.24,.13,.22,M.black);
    if(stage===7)E('long-pure-white-tail-fan',0,.52,-.89,.23,.17,.33,M.white);
    break;
   }
  }
 }
 root.userData={id,identity:id,stage,anatomy:stage===0?'identity-egg':stage<=4?'replaced-juvenile':stage===5?'native-adult-plus-fieldmarks':'native-elder-and-legend',fictionalLegend:stage===7};
 body.userData.nj94={id,stage,adultPreserved:stage>=5,fieldmarksReferenced:true};
 return true;
};
})();