/* NUSAJIWA NJ89 · 10 individual folklore creatures × 8 evolution phases.
   Narrative anchors are historically informed, but evolutionary sequences are
   ORIGINAL FICTIONAL GAME DESIGN, not documented folklore lifecycles.
   0: canonical egg + unique crest; 1–4: anatomy replacement;
   5: preserve native detailed adult sculpture; 6–7: anatomy extensions. */
(function(){
'use strict';
if(window.NUSAJIWA_MORPH89)return;
const IDS=['leak','genderuwo','jenglot','begu_ganjang','buto_ijo',
 'babi_ngepet','ahool','bunian','siluman_harimau','naga_antaboga'];
window.NUSAJIWA_MORPH89_IDS=Object.freeze(IDS.slice());
window.NUSAJIWA_MORPH89=function(group,body,M,id,phase,T,ell,tube){
 if(!IDS.includes(id)||!group||!body||!T||!ell||!tube)return false;
 const s=Math.max(0,Math.min(7,Math.floor(Number(phase)||0)));
 const root=new T.Group();root.name='nj89_'+id+'_phase_'+s;
 const e=(name,x,y,z,w,h,d,m)=>{const o=ell(root,x,y,z,w,h,d,m);o.name=name;return o};
 const l=(name,pts,r,m)=>{const o=tube(root,pts,r,m);o.name=name;return o};
 const cone=(name,x,y,z,r,h,m)=>{const o=new T.Mesh(new T.ConeGeometry(r,h,7),m);o.name=name;o.position.set(x,y,z);root.add(o);return o};
 const pairs=fn=>{fn(-1);fn(1)};
 const wing=(name,points,m)=>{const sh=new T.Shape();sh.moveTo(...points[0]);for(const p of points.slice(1))sh.lineTo(...p);sh.closePath();
  const o=new T.Mesh(new T.ShapeGeometry(sh),m);o.name=name;o.position.z=-.1;root.add(o);return o};
 const prefix=(n)=>id+'-'+s+'-'+n;
 if(s===0){
  // Existing egg material remains; specific mark echoes the future silhouette.
  const seal=new T.Mesh(new T.TorusGeometry(.19,.037,8,24),M.gold);
  seal.name=prefix('individual-egg-emblem');seal.position.set(0,1.23,.65);root.add(seal);
  const glyphs={
   leak:[[0,1.34,.64],[-.14,1.10,.67],[.14,1.10,.67]],
   genderuwo:[[-.16,1.34,.62],[.16,1.34,.62],[0,1.1,.67]],
   jenglot:[[0,1.40,.63],[-.08,1.12,.67],[.08,1.12,.67]],
   begu_ganjang:[[0,.99,.63],[0,1.22,.67],[0,1.44,.63]],
   buto_ijo:[[-.15,1.08,.63],[0,1.38,.67],[.15,1.08,.63]],
   babi_ngepet:[[-.16,1.20,.64],[0,1.10,.67],[.16,1.20,.64]],
   ahool:[[-.24,1.22,.61],[0,1.42,.63],[.24,1.22,.61]],
   bunian:[[-.16,1.06,.64],[0,1.39,.65],[.16,1.06,.64]],
   siluman_harimau:[[-.16,1.35,.62],[0,1.08,.67],[.16,1.35,.62]],
   naga_antaboga:[[0,1.41,.64],[-.18,1.16,.63],[.18,1.16,.63]]
  };
  glyphs[id].forEach((p,i)=>e(prefix('egg-identity-relief-'+i),...p,.06,.08,.02,M.main));
  group.add(root);
 }else{
  if(s<=4)body.children.forEach(x=>x.visible=false);
  body.add(root);
  switch(id){
  case 'leak': {
   // Leyak mask transformation. Deliberately distinct from Rangda.
   if(s<=4){
    const w=.18+.07*s;
    e(prefix('levitating-face'),0,1.51,.12,w,.24+.075*s,.25,M.main);
    e(prefix('crown-of-dark-hair'),0,1.80+.085*s,-.08,w*1.2,.16,.20,M.dark);
    pairs(d=>{
      e(prefix('cheek-mask-'+d),d*w*.62,1.50,.35,.10,.13,.06,M.gold);
      e(prefix('shining-mask-eye-'+d),d*w*.44,1.62,.39,.065,.075,.04,M.eye);
      l(prefix('levitating-black-tress-'+d),[[d*.23,1.77,.0],[d*(.30+s*.06),1.20,-.15],[d*(.34+s*.12),.83-s*.05,-.27]],.025+s*.005,M.black);
    });
    if(s>=2)l(prefix('tongue-changing-shape'),[[0,1.32,.43],[.04,1.0,.52],[.08,.71-s*.06,.40]],.047,M.pink);
    if(s>=3)pairs(d=>l(prefix('ritual-ribbon-imagination-'+d),[[d*.20,1.37,0],[d*.56,.94,-.12],[d*.76,.33,-.29]],.058,M.gold));
    if(s===4)pairs(d=>cone(prefix('high-brow-emblem-'+d),d*.22,2.25,.0,.12,.37,M.dark));
   }else{
    pairs(d=>l(prefix('adult-leyak-trailing-ribbon-'+d),[[d*.28,1.81,0],[d*(.59+.17*(s-5)),1.21,-.26],
      [d*(.71+.29*(s-5)),.40,-.35]],.06+s*.006,M.gold));
    if(s>=6)for(let i=0;i<5+(s-6)*4;i++){const a=i*2.4;
      l(prefix('transforming-orbit-'+i),[[Math.sin(a)*.27,1.62,-.10],[Math.sin(a)*.59,.99,Math.cos(a)*.33],
         [Math.sin(a)*.76,.38,Math.cos(a)*.48]],.042,M.dark);}
    if(s===7)pairs(d=>e(prefix('echo-mask-'+d),d*.82,1.85,-.26,.23,.34,.14,M.main));
   }
   break;
  }
  case 'genderuwo': {
   // Thick hair, substantial shoulders and conspicuously long arms; NO horns.
   if(s<=4){
    const w=.22+s*.11,h=.35+s*.13,y=.91+s*.10;
    e(prefix('bulky-hairy-torso'),0,y,0,w,h,.42,M.dark);
    e(prefix('large-heavy-head'),0,y+h*.94,.14,w*.67,.26+s*.04,.30,M.main);
    pairs(d=>{
      l(prefix('long-haired-arm-'+d),[[d*w*.74,y+.24,0],[d*(w+.14),y-.31,.05],[d*(w+.26),.23,.21]],.095+s*.018,M.dark);
      e(prefix('broad-foot-'+d),d*w*.51,.16,.27,.16+s*.023,.14,.21,M.dark);
      e(prefix('faint-eye-'+d),d*w*.27,y+h*.94,.42,.06,.06,.04,M.gold);
    });
    for(let i=0;i<5+s*6;i++){const a=i*2.4;
      e(prefix('bristled-fur-'+i),Math.sin(a)*w*.80,y-.22+(i%7)*h*.20,
        Math.cos(a)*.36,.06,.13+s*.023,.055,M.black);}
   }else{
    for(let i=0;i<14+(s-5)*12;i++){const a=i*2.4;
      e(prefix('expanded-heavy-mane-'+i),Math.sin(a)*(.51+(s-5)*.1),.69+(i%8)*.23,
        Math.cos(a)*.44,.075,.21+(s-5)*.055,.07,M.dark);}
    if(s>=6)pairs(d=>l(prefix('extra-long-forearm-'+d),[[d*.68,1.52,.04],[d*1.05,.89,.14],
       [d*(1.18+(s-6)*.32),.34,.18]],.16,M.main));
    if(s===7)pairs(d=>e(prefix('wide-hair-hood-'+d),d*.86,2.23,-.14,.43,.35,.24,M.black));
   }
   break;
  }
  case 'jenglot': {
   // Tiny, shriveled specimen-like figure, never an adult-sized humanoid.
   // Native Jenglot sculptor already scales anatomy to 0.52 on the parent
   // body. Do not apply an additional 0.52 to this overlay.
   if(s<=4){
    e(prefix('desiccated-seated-torso'),0,1.02,0,.115+s*.03,.31+s*.048,.16,M.dark);
    e(prefix('shrunken-head'),0,1.69+s*.04,.10,.18+s*.029,.24+s*.02,.21,M.main);
    pairs(d=>{
      l(prefix('folded-thin-arm-'+d),[[d*.18,1.32,0],[d*.30,1.01,.20],[d*.25,.66,.33]],.048,M.dark);
      l(prefix('bony-folded-leg-'+d),[[d*.11,.71,0],[d*.24,.43,.14],[d*.27,.26,.27]],.055,M.dark);
      e(prefix('sunken-eye-'+d),d*.12,1.77+s*.04,.34,.04,.04,.025,M.gold);
    });
    for(let i=0;i<3+s*5;i++){const x=(i-(3+s*5-1)/2)*.05;
      l(prefix('long-black-hair-'+i),[[x,1.93+s*.05,.0],[x*1.3,1.38,-.06],[x*1.6,.75-(i%4)*.1,-.12]],.024,M.black);}
    if(s>=3)pairs(d=>cone(prefix('tiny-curved-fang-'+d),d*.08,1.52,.36,.022,.14,M.white));
   }else{
    for(let i=0;i<8+(s-5)*8;i++){const x=(i-(8+(s-5)*8-1)/2)*.055;
      l(prefix('mature-specimen-hair-'+i),[[x,2.12,.0],[x*1.4,1.27,-.06],[x*1.6,.37-(i%3)*.07,-.17]],.023,M.black);}
    if(s>=6)pairs(d=>l(prefix('exceptional-long-nails-'+d),[[d*.20,.66,.22],[d*.29,.40,.33],[d*.41,.11,.44]],.016,M.white));
    if(s===7)e(prefix('spread-specimen-hair-mat'),0,.29,-.27,.84,.11,.42,M.dark);
   }
   break;
  }
  case 'begu_ganjang': {
   // Elongated, attenuated shadow; variable depictions in Batak oral myth.
   if(s<=4){
    const h=.25+s*.34,top=1.18+h;
    e(prefix('extremely-narrow-shade'),0,1.04+h*.47,0,.14+s*.014,h*.89,.15,M.dark);
    e(prefix('small-long-spirit-head'),0,top,.12,.17,.22,.17,M.black);
    pairs(d=>{
      l(prefix('reaching-long-arm-'+d),[[d*.16,top-.24,0],[d*(.25+s*.025),1.28,.07],
        [d*(.32+s*.05),.23,.16]],.05,M.dark);
      l(prefix('trailing-long-leg-'+d),[[d*.09,.96,0],[d*.14,.40,.02],[d*.13,.08,.12]],.06,M.black);
    });
    for(let i=0;i<s;i++)l(prefix('shadow-near-ground-'+i),[[0,.12,-.05],
     [(i-(s-1)/2)*.22,.21,-.15],[(i-(s-1)/2)*.33,.08,-.29]],.05,M.main);
   }else{
    for(let i=0;i<3+(s-5)*4;i++){const x=(i-(3+(s-5)*4-1)/2)*.12;
      l(prefix('mature-mist-column-'+i),[[x,3.18,-.18],[x*1.8,1.71,-.25],[x*3,.12,-.28]],.056,M.dark);}
    if(s>=6)pairs(d=>l(prefix('extended-spectral-arm-'+d),[[d*.22,3.10,0],[d*.42,1.45,-.08],[d*.54,-.04,.14]],.07,M.main));
    if(s===7)e(prefix('legend-silhouette-veil'),0,3.75,-.31,.38,1.03,.08,M.glow);
   }
   break;
  }
  case 'buto_ijo': {
   // Giant green ogre with broad nose and short tusks. No horns or wings.
   if(s<=4){
    const w=.25+s*.14;
    e(prefix('powerful-green-body'),0,.90+s*.09,-.06,w,.41+s*.15,.50,M.main);
    e(prefix('huge-rounded-head'),0,1.46+s*.14,.21,w*.78,.31+s*.046,.46,M.main);
    e(prefix('green-wide-nose'),0,1.43+s*.14,.59,w*.32,.14,.17,M.light);
    pairs(d=>{
      l(prefix('muscular-arm-'+d),[[d*w*.77,1.28+s*.08,0],[d*(w+.15),.79,.13],
         [d*(w+.17),.34,.26]],.12+s*.032,M.main);
      e(prefix('heavy-toed-foot-'+d),d*w*.57,.16,.27,.22+s*.023,.15,.30,M.dark);
      e(prefix('deep-black-eye-'+d),d*w*.35,1.60+s*.13,.54,.07,.085,.05,M.eye);
    });
    if(s>=3)pairs(d=>cone(prefix('short-mouth-tusk-'+d),d*.25,1.27+s*.14,.73,.07,.20,M.white));
    if(s===4)e(prefix('heavy-belly-fold'),0,.74,.37,.55,.22,.28,M.light);
   }else{
    pairs(d=>{
      e(prefix('broad-giant-shoulder-'+d),d*(.72+(s-5)*.11),1.80,-.15,.25+(s-5)*.08,.35,.27,M.main);
      e(prefix('widened-giant-knuckle-'+d),d*(.91+(s-5)*.12),.55,.29,.26,.24,.26,M.main);
    });
    if(s>=6)e(prefix('giant-hunched-back'),0,1.67,-.48,.77,.52,.34,M.dark);
    if(s===7)pairs(d=>e(prefix('legend-heavy-forearm-'+d),d*1.24,.90,.01,.34,.83,.30,M.main));
   }
   break;
  }
  case 'babi_ngepet': {
   // Quadruped pig. No fabricated human face or dorsal dragon spikes.
   if(s<=4){
    const width=.22+s*.11,length=.33+s*.15;
    e(prefix('low-pig-barrel'),0,.67,-.12,width,.33+s*.065,length,M.dark);
    e(prefix('pig-head'),0,.85,.38+s*.12,.32+s*.04,.28+s*.03,.37,M.main);
    e(prefix('flat-round-snout'),0,.62,.76+s*.14,.20+s*.025,.13,.11,M.light);
    pairs(d=>{
      e(prefix('pig-nostril-'+d),d*.10,.64,.86+s*.14,.04,.04,.028,M.dark);
      e(prefix('soft-porcine-ear-'+d),d*(.22+s*.03),1.15+s*.05,.35,.12,.21,.15,M.main);
      for(const z of [-.35,.38])e(prefix('short-hoof-'+d+'-'+z),d*width*.80,.25,z,.12,.25,.14,M.dark);
    });
    if(s>=2)l(prefix('naturally-curled-pig-tail'),[[0,.72,-length-.16],[.19,.88,-length-.32],
       [.25,1.02,-length-.37],[.13,1.06,-length-.37]],.058,M.main);
    if(s===4)e(prefix('shoulder-roll'),0,1.03,.16,.46,.22,.41,M.main);
   }else{
    pairs(d=>e(prefix('floppy-grown-pig-ear-'+d),d*.48,1.26,.64,.20+.07*(s-5),.27,.17,M.main));
    if(s>=6){
      e(prefix('mature-wide-hog-cheeks'),0,.75,1.01,.44,.28,.34,M.light);
      l(prefix('long-curled-tail'),[[0,.73,-.94],[.36,.78,-1.27],[.45,1.01,-1.35],[.24,1.10,-1.35]],.089,M.main);
    }
    if(s===7)for(let i=0;i<5;i++){const a=i*1.2566;
      e(prefix('fantasy-fortune-coin-'+i),Math.sin(a)*1.1,.63+Math.cos(a)*.46,-.15,.13,.13,.04,M.gold);}
   }
   break;
  }
  case 'ahool': {
   // Bat membranes, digit bones, large ears; cryptid is NOT proven to exist.
   if(s<=4){
    const span=.18+s*.32;
    e(prefix('small-furred-bat-body'),0,1.16,0,.20+s*.045,.40+s*.06,.30,M.dark);
    e(prefix('wide-bat-face'),0,1.71+s*.07,.20,.20+s*.03,.25,.25,M.main);
    pairs(d=>{
      cone(prefix('pointed-bat-ear-'+d),d*.20,2.01+s*.07,.10,.13,.30,M.dark);
      e(prefix('night-animal-eye-'+d),d*.13,1.76+s*.07,.44,.065,.075,.04,M.eye);
      wing(prefix('finger-web-membrane-'+d),[[d*.17,1.39],[d*span,1.94],[d*span*.87,1.16],
        [d*span*.66,1.34],[d*span*.38,1.02]],M.main);
      l(prefix('wing-long-finger-'+d),[[d*.15,1.42,-.06],[d*span,1.94,-.10]],.026,M.dark);
      e(prefix('bat-claw-'+d),d*.17,.58,.18,.12,.17,.14,M.dark);
    });
   }else{
    pairs(d=>{
      l(prefix('adult-bat-wing-elongation-'+d),[[d*.21,1.66,-.06],
       [d*(1.65+(s-5)*.37),2.13+(s-5)*.31,-.10]],.035,M.dark);
      if(s>=6)wing(prefix('aged-extended-leather-membrane-'+d),[[d*.30,1.66],
       [d*(2.03+(s-6)*.60),2.35],[d*1.63,.95],[d*.99,1.22],[d*.62,.75]],M.main);
    });
    if(s===7)e(prefix('colossal-bat-chest'),0,1.34,-.31,.47,.74,.37,M.dark);
   }
   break;
  }
  case 'bunian': {
   // Human appearance and concealment; no pointy ears or Western-elf anatomy.
   if(s<=4){
    const h=.40+s*.17,w=.18+s*.052;
    const o=new T.Mesh(new T.CylinderGeometry(w*.68,w*1.15,h,10),M.main);
    o.name=prefix('human-proportioned-robes');o.position.set(0,.42+h*.30,0);root.add(o);
    e(prefix('recognizable-human-face'),0,.72+h*.88,.04,.18+s*.028,.23+s*.015,.23,M.light);
    e(prefix('human-hair-or-headcloth'),0,.89+h*.93,-.07,.21+s*.03,.11,.22,M.dark);
    pairs(d=>{
      l(prefix('modest-human-sleeve-'+d),[[d*w*.80,.63+h*.80,0],[d*.40,.64,.14],[d*.39,.28,.16]],.063+s*.008,M.main);
      e(prefix('human-shoe-'+d),d*.15,.11,.15,.15,.12,.20,M.dark);
      l(prefix('traditional-robe-fold-'+d),[[d*.15,.71+h*.54,.27],[d*.21,.58,.39],
        [d*.25,.18,.30]],.026,M.gold);
    });
    if(s===3)e(prefix('forest-concealment-haze'),0,.32,-.19,.41,.15,.23,M.glow);
    if(s===4)pairs(d=>e(prefix('low-moving-cloak-'+d),d*.39,.24,-.11,.18,.30,.16,M.main));
   }else{
    pairs(d=>l(prefix('woven-cloth-trail-'+d),[[d*.20,1.48,.28],[d*.42,.92,.35],
      [d*(.56+(s-5)*.15),.14,-.12]],.052,M.gold));
    if(s>=6)pairs(d=>e(prefix('partly-hidden-human-outline-'+d),d*.45,.77,-.25,.19+(s-6)*.13,.64,.15,M.glow));
    if(s===7)e(prefix('hidden-community-illusion'),0,1.14,-.54,.66,.96,.065,M.glow);
   }
   break;
  }
  case 'siluman_harimau': {
   // Distinct metamorphosis: cub → biped hybrid → quadrupedal tiger.
   if(s===1){
    e(prefix('crouching-striped-cub-body'),0,.73,0,.33,.29,.46,M.main);
    e(prefix('big-feline-cub-head'),0,1.17,.36,.29,.27,.32,M.light);
    pairs(d=>e(prefix('round-tiger-cub-ear-'+d),d*.23,1.40,.19,.13,.17,.10,M.dark));
   }else if(s<=4){
    const w=.19+s*.092;
    e(prefix('hybrid-crouched-cat-body'),0,1.02,-.18,w,.35+s*.075,.58,M.main);
    e(prefix('shaping-tiger-head'),0,1.46+s*.095,.50,.32+s*.035,.32,.39,M.main);
    e(prefix('distinct-pale-tiger-jaw'),0,1.30+s*.08,.80,.23,.16,.23,M.white);
    pairs(d=>{
      e(prefix('cat-triangle-ear-'+d),d*.31,1.89+s*.075,.39,.14,.21,.15,M.dark);
      for(const z of [-.42,.42])e(prefix('growing-striped-paw-'+d+'-'+z),
        d*.35,.30,z,.16+s*.017,.26,.19,M.main);
    });
    l(prefix('curved-juvenile-tiger-tail'),[[0,1.12,-.75],[.37,1.26,-1.10],
      [.53,1.49,-1.28]],.09+s*.012,M.main);
    if(s===4)pairs(d=>e(prefix('remnant-upright-shoulder-'+d),d*.49,1.40,-.03,.18,.24,.19,M.light));
   }
   if(s<=4){
    for(const z of [-.32,.09,.43])pairs(d=>l(prefix('recognizable-black-tiger-stripe-'+d+'-'+z),
      [[d*.19,1.35,z-.16],[d*.39,1.14,z],[d*.31,.96,z+.15]],.036,M.dark));
   }else{
    for(const z of [-.69,-.27,.12,.46])pairs(d=>l(prefix('mature-tiger-stripe-'+d+'-'+z),
      [[d*.20,1.41,z-.15],[d*.48,1.20,z],[d*.43,1.0,z+.17]],.041,M.dark));
    if(s>=6)pairs(d=>e(prefix('tiger-guardian-front-paw-'+d),d*.50,.40,.42,.24+(s-6)*.06,.33,.25,M.main));
    if(s===7){e(prefix('second-tiger-shadow-silhouette'),0,1.29,-.85,.82,.49,.21,M.glow);
      l(prefix('guardian-long-tail'),[[0,1.05,-.85],[.57,1.50,-1.43],[.27,1.92,-1.68]],.16,M.gold);}
   }
   break;
  }
  case 'naga_antaboga': {
   // Crowned earth serpent from wayang; no Western dragon wings or limbs.
   if(s<=4){
    const radius=.08+s*.22,pts=[];
    for(let i=0;i<=26;i++){const t=i/26,a=t*Math.PI*(1.15+s*.46);
      pts.push([Math.sin(a)*(radius+.13),.42+t*.11,Math.cos(a)*(radius*.77+.14)-.18]);}
    pts.push([0,.86,.23],[0,1.19+s*.14,.37],[0,1.46+s*.18,.54]);
    l(prefix('legless-coiled-serpent'),pts,.11+s*.028,M.main);
    e(prefix('single-royal-serpent-head'),0,1.51+s*.18,.56,.23+s*.046,.22+s*.024,.30,M.main);
    e(prefix('royal-serpent-snout'),0,1.40+s*.18,.85,.20,.11,.20,M.light);
    pairs(d=>{
      e(prefix('naga-snake-eye-'+d),d*(.16+s*.025),1.56+s*.18,.77,.06,.067,.039,M.gold);
      l(prefix('serpent-whisker-'+d),[[d*.14,1.39+s*.18,.94],[d*.33,1.30+s*.18,1.13],
        [d*.46,1.35+s*.18,1.23]],.024,M.gold);
    });
    if(s>=2)for(let i=0;i<3+s;i++){const a=i*1.37;
      e(prefix('earth-scale-'+i),Math.sin(a)*radius*.70,.61,Math.cos(a)*radius*.54,.11,.047,.14,M.light);}
    if(s>=3)for(let i=-2;i<=2;i++)cone(prefix('wayang-jamang-crown-'+i),i*.113,
      2.09+s*.18,.55,.058,.28+(2-Math.abs(i))*.06,M.gold);
   }else{
    const count=5+(s-5)*4;
    for(let i=0;i<count;i++){const a=i/count*Math.PI*2;
      e(prefix('enlarged-serpent-coil-scute-'+i),Math.sin(a)*(.91+.12*(s-5)),
        .58,Math.cos(a)*(.73+.12*(s-5))-.16,.13,.052,.13,M.gold);}
    if(s>=6)l(prefix('second-earth-serpent-coil'),[[-.82,.40,-.30],[-1.13,.77,.10],
      [-.51,1.07,-.51],[.53,.90,-.62],[1.18,.61,-.12]],.16,M.main);
    if(s===7){
      l(prefix('legend-great-serpent-arch'),[[-1.25,.60,-.39],[-1.67,1.13,-.56],
        [0,1.64,-.82],[1.74,1.12,-.47],[1.24,.46,-.10]],.21,M.main);
      for(let i=-4;i<=4;i++)cone(prefix('magnified-antaboga-jamang-'+i),
        i*.17,2.77-Math.abs(i)*.04,.66,.07,.37+(4-Math.abs(i))*.075,M.gold);
    }
   }
   break;
  }
  }

  // Phase-specific structural silhouette features: not size-only progression.
  // These are deliberately different bones, folds, membranes, coils or
  // posture silhouettes. No franchise-style shared generic mutation table.
  if(s>=1&&s<=4){
   switch(id){
   case 'leak':
    if(s===1)e(prefix('split-immature-leak-mask'),0,1.29,.34,.12,.18,.055,M.light);
    if(s===2)pairs(d=>l(prefix('growing-ear-ribbon-'+d),[[d*.25,1.78,.16],[d*.40,1.53,-.11],[d*.55,1.12,-.31]],.042,M.dark));
    if(s===3)e(prefix('hovering-lower-jaw'),0,1.08,.32,.22,.13,.15,M.main);
    if(s===4)pairs(d=>e(prefix('full-face-side-tendril-'+d),d*.55,1.44,-.13,.16,.56,.16,M.dark));
    break;
   case 'genderuwo':
    if(s===1)e(prefix('rounded-infant-neck-fur'),0,1.39,-.12,.31,.22,.25,M.black);
    if(s===2)pairs(d=>e(prefix('crawling-heavy-palm-'+d),d*.49,.25,.24,.22,.14,.20,M.main));
    if(s===3)pairs(d=>e(prefix('hunched-shoulder-fur-'+d),d*.58,1.71,-.19,.27,.40,.26,M.black));
    if(s===4)e(prefix('wide-adolescent-back-mane'),0,1.81,-.40,.82,.50,.23,M.dark);
    break;
   case 'jenglot':
    if(s===1)e(prefix('short-folded-specimen-cloth'),0,.57,-.03,.23,.16,.21,M.dark);
    if(s===2)e(prefix('early-tangled-hair-topknot'),0,2.11,-.10,.24,.19,.21,M.black);
    if(s===3)pairs(d=>l(prefix('dry-long-claw-'+d),[[d*.24,.76,.28],[d*.30,.41,.36],[d*.39,.22,.43]],.017,M.white));
    if(s===4)e(prefix('full-specimen-hair-fan'),0,1.25,-.28,.56,.89,.15,M.black);
    break;
   case 'begu_ganjang':
    if(s===1)e(prefix('compressed-first-shadow-cocoon'),0,1.18,-.18,.26,.22,.14,M.dark);
    if(s===2)l(prefix('first-curved-shadow-spine'),[[0,2.12,-.21],[.16,1.71,-.30],[0,.84,-.14]],.079,M.dark);
    if(s===3)pairs(d=>e(prefix('forked-long-veil-'+d),d*.24,1.44,-.26,.15,.75,.12,M.main));
    if(s===4)e(prefix('great-elongated-shadow-cap'),0,2.99,-.18,.43,.26,.19,M.black);
    break;
   case 'buto_ijo':
    if(s===1)e(prefix('infant-round-lower-jaw'),0,1.22,.56,.24,.22,.23,M.light);
    if(s===2)pairs(d=>e(prefix('crouched-massive-front-palm-'+d),d*.55,.22,.46,.24,.17,.27,M.main));
    if(s===3)e(prefix('broad-giant-brow-ridge'),0,2.14,.49,.55,.14,.23,M.dark);
    if(s===4)pairs(d=>e(prefix('heavy-green-back-shoulder-'+d),d*.77,1.66,-.29,.31,.39,.27,M.main));
    break;
   case 'babi_ngepet':
    if(s===1)e(prefix('piglet-round-jowl'),0,.60,.80,.30,.20,.19,M.main);
    if(s===2)pairs(d=>e(prefix('first-short-trotter-'+d),d*.27,.23,.48,.16,.21,.19,M.light));
    if(s===3)e(prefix('pig-hanging-cheek'),0,.62,.95,.40,.26,.18,M.light);
    if(s===4)e(prefix('arched-heavy-pig-haunch'),0,1.13,-.56,.47,.31,.39,M.main);
    break;
   case 'ahool':
    if(s===1)pairs(d=>e(prefix('folded-pup-wing-crest-'+d),d*.31,1.48,-.16,.19,.41,.12,M.dark));
    if(s===2)pairs(d=>l(prefix('first-independent-wing-joint-'+d),[[d*.19,1.45,-.08],[d*.50,1.70,-.14],[d*.83,1.55,-.19]],.048,M.dark));
    if(s===3)pairs(d=>cone(prefix('prehensile-wing-thumb-claw-'+d),d*1.04,1.76,-.12,.075,.24,M.dark));
    if(s===4)pairs(d=>wing(prefix('second-scalloped-membrane-'+d),[[d*.42,1.29],[d*1.31,1.13],[d*1.62,1.51],[d*.91,1.62]],M.dark));
    break;
   case 'bunian':
    if(s===1)e(prefix('short-human-child-hood'),0,1.37,-.18,.25,.29,.24,M.main);
    if(s===2)pairs(d=>e(prefix('human-shoulder-shawl-'+d),d*.33,1.35,-.16,.15,.39,.15,M.gold));
    if(s===3)l(prefix('long-human-garment-fold'),[[0,1.31,.34],[.12,.83,.41],[0,.21,.34]],.052,M.gold);
    if(s===4)pairs(d=>e(prefix('forest-concealment-cloak-panel-'+d),d*.41,.83,-.25,.17,.69,.14,M.main));
    break;
   case 'siluman_harimau':
    if(s===1)pairs(d=>e(prefix('cub-padded-tiger-front-paw-'+d),d*.23,.36,.44,.17,.16,.19,M.light));
    if(s===2)pairs(d=>e(prefix('human-like-hybrid-upper-arm-'+d),d*.43,1.33,-.08,.14,.37,.14,M.light));
    if(s===3)pairs(d=>l(prefix('hybrid-long-reaching-claw-'+d),[[d*.41,1.28,0],[d*.65,.93,.14],[d*.67,.61,.30]],.090,M.main));
    if(s===4)e(prefix('developed-tiger-chest'),0,1.17,.40,.49,.37,.37,M.light);
    break;
   case 'naga_antaboga':
    if(s===1)e(prefix('newborn-serpent-belly-plate'),0,1.37,.69,.16,.16,.04,M.light);
    if(s===2)for(let i=0;i<4;i++)e(prefix('first-belly-scale-'+i),0,1.03+i*.16,.56,.15,.10,.04,M.light);
    if(s===3)pairs(d=>e(prefix('early-royal-neck-frill-'+d),d*.29,1.68,.39,.15,.36,.13,M.gold));
    if(s===4)pairs(d=>l(prefix('serpent-royal-crown-fillet-'+d),[[d*.31,2.50,.49],[d*.56,2.71,.46],[d*.59,2.91,.42]],.053,M.gold));
    break;
   }
  }
 }
 root.userData={identity:id,stage:s,geometryBranch:s===0?'egg-signature':s<=4?'anatomy-replacement':'preserved-native-plus-custom-anatomy',interpretation:'fictional-evolution'};
 body.userData.nj89={identity:id,stage:s,nativePreserved:s>=5};
 return true;
};
})();