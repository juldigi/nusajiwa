/* NJ107 — Mythic iconography Batch 10.
 * One individually reconstructed, authoritative WebGL rig per character/stage.
 * Five identities x eight FICTIONAL Tamagotchi stages. Previous visible
 * sculptors are masked; historic and sacred identities are not biologically evolving.
 *
 * Jatayu: Sonobudoyo Museum Ramayana / Cirebon wayang.
 * Bedawang Nala: Bali Padmasana cosmic tortoise, flame-mouth and naga coils.
 * Hanoman: white vanara hero with hands, simian head, tail and ornament.
 * Makara Candi: temple-gate CARVED guardian (elephant trunk and jaws).
 * Naga Padoha: Batak Toba earth/underworld serpent (not generic western dragon).
 */
(function(){
'use strict';
if(window.NUSAJIWA_SCULPT107)return;
const IDS=['jatayu','bedawang_nala','hanoman','makara_candi','naga_padoha'];
const SOURCES={
 jatayu:'https://sonobudoyo.jogjaprov.go.id/id/tulisan/read/jatayu-burung-penjaga-kebenaran-dalam-kisah-ramayana-dan-imajinasi-budaya-jawa',
 bedawang_nala:'https://journal.unwira.ac.id/ARTEKS/id/article/view/1721',
 hanoman:'https://repositori.kemendikdasmen.go.id/7770/1/ARTI%20MAKNA%20TOKOH%20PEWAYANGAN%20RAMAYANA%20DALAM%20PEMBENTUKAN%20DAN%20PEMBINAAN%20WATAK%20SERI%20III.pdf',
 makara_candi:'https://kebudayaan.kemdikbud.go.id/bkborobudur/makara-sebagai-hiasan-di-pintu-masuk-candi/',
 naga_padoha:'https://digilib.unimed.ac.id/id/eprint/18333/3/8.%20NIM%203103121084%20BAB%20I.pdf'
};
window.NUSAJIWA_SCULPT107_IDS=Object.freeze(IDS.slice());
window.NUSAJIWA_SCULPT107_SOURCES=Object.freeze(SOURCES);
window.NUSAJIWA_SCULPT107=function(group,body,M,id,stage,T,ell,tube){
 if(!IDS.includes(id)||!group||!body||!M||!T||!ell||!tube)return false;
 const s=Math.max(0,Math.min(7,Math.floor(Number(stage)||0)));
 const host=s===0?group:body;
 if(s===0){for(const node of group.children)node.visible=false;}
 else {for(const node of body.children)node.visible=false;}
 const rig=new T.Group();rig.name='NJ107_'+id+'_F'+s;host.add(rig);
 const tag=n=>id+'-F'+s+'-'+n;
 const E=(n,x,y,z,a,b,c,mat)=>{const o=ell(rig,x,y,z,a,b,c,mat);o.name=tag(n);return o;};
 const L=(n,pts,r,mat)=>{const o=tube(rig,pts,r,mat);o.name=tag(n);return o;};
 const C=(n,x,y,z,r,h,mat,rz=0)=>{const o=new T.Mesh(new T.ConeGeometry(r,h,10),mat);o.name=tag(n);o.position.set(x,y,z);o.rotation.z=rz;rig.add(o);return o;};
 const P=(n,coords,m,depth=.080)=>{const shape=new T.Shape();shape.moveTo(...coords[0]);for(const q of coords.slice(1))shape.lineTo(...q);shape.closePath();
  const geom=new T.ExtrudeGeometry(shape,{depth,steps:1,bevelEnabled:true,bevelThickness:.014,bevelSize:.014,bevelSegments:1});
  const o=new T.Mesh(geom,m);o.name=tag(n);rig.add(o);return o;
 };
 const pair=fn=>{fn(-1);fn(1)};
 const eyes=(label,y,z,span=.17,size=.065)=>pair(d=>{
  E(label+'-socket-'+d,d*span,y,z-.035,size*1.30,size*.97,.048,M.dark);
  E(label+'-surface-'+d,d*span,y,z,size,size*.78,.033,M.white);
  E(label+'-pupil-'+d,d*span,y,z+.031,size*.49,size*.52,.017,M.eye);
 });
 const loft=(n,rings,mat)=>{
  // Multiple real 3D ring sections for sculpted garments / temple bases.
  const verts=[],indices=[],N=20;
  for(const [y,rx,rz,cx=0,cz=0] of rings)for(let k=0;k<N;k++){
   const a=2*Math.PI*k/N;verts.push(cx+rx*Math.cos(a),y,cz+rz*Math.sin(a));
  }
  for(let j=0;j<rings.length-1;j++)for(let k=0;k<N;k++){
   const a=j*N+k,b=j*N+(k+1)%N,c=(j+1)*N+k,d=(j+1)*N+(k+1)%N;
   indices.push(a,c,b,b,c,d);
  }
  const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(verts,3));
  g.setIndex(indices);g.computeVertexNormals();
  const mesh=new T.Mesh(g,mat);mesh.name=tag(n);rig.add(mesh);return mesh;
 };
 const growth=[0,.50,.63,.78,.91,1.03,1.10,1.20][s];
 if(s===0){
  const w=.47+IDS.indexOf(id)*.032;
  E('fictional-only-game-egg',0,1.15,0,w,.80,.47,M.main);
  for(let i=0;i<8;i++){const a=(i-3.5)*.27;
   E('engraved-individual-egg-pattern-'+i,Math.sin(a)*w*.80,
    1.18+Math.cos(a)*.41,.41,.05,.08,.029,i%2?M.gold:M.dark);}
  if(id==='jatayu')pair(d=>L('wayang-egg-wing-engraving-'+d,
    [[d*.06,1.08,.47],[d*.27,1.43,.46],[d*.34,1.63,.28]],.028,M.gold));
  if(id==='bedawang_nala'){E('tortoise-shell-egg-crest',0,1.48,.44,.23,.10,.044,M.dark);
    for(let i=-2;i<=2;i++)L('scale-egg-arc-'+i,[[i*.10,1.05,.47],[i*.12,1.32,.51]],.023,M.gold);}
  if(id==='hanoman')L('simian-tail-egg-sigil',[[0,.86,.43],[.24,1.15,.48],[.22,1.47,.43],[.06,1.52,.41]],.033,M.gold);
  if(id==='makara_candi')L('temple-makara-stone-scroll-symbol',[[-.26,1.28,.40],[0,1.55,.50],[.22,1.25,.42],[.05,.96,.46]],.038,M.dark);
  if(id==='naga_padoha')L('earth-serpent-egg-sigil',[[-.27,.93,.40],[.23,1.15,.46],[-.19,1.41,.43],[.12,1.64,.37]],.040,M.gold);
  rig.userData={id,phase:s,identityPreserved:true,sculpted:true,source:SOURCES[id],fantasyLifecycle:true};
  return true;
 }
 if(id==='jatayu'){
  // Wayang hero Jatayu is a mighty VULTURE-like guardian bird, distinct from
  // anthropomorphic Hindu Garuda; no human arms or human feet.
  const w=.24+growth*.13,cy=1.15+.14*growth,ws=.53+growth*.80;
  E('entire-vulture-hero-feathered-torso',0,cy,0,w,.44+.19*growth,.43,M.main);
  E('Jatayu-vulture-long-curved-neck',0,1.67,.23,.18,.34,.22,M.light);
  E('wayang-vulture-head-not-human',0,1.97,.43,.25,.26,.26,M.main);
  E('strong-projecting-upper-beak',0,1.86,.66,.14,.12,.20,M.gold);
  C('distinct-hooked-golden-vulture-tip',0,1.76,.84,.085,.21,M.gold,.31);
  eyes('Jatayu-sunkeen-hero-eye',1.98,.65,.16,.056);
  pair(d=>{
   L('visible-wing-forearm-bone-'+d,[[d*w*.77,1.47,-.05],
    [d*(ws*.67),1.77,-.19],[d*ws,1.69,-.25]],.088,M.main);
   for(let j=0;j<5+s*2;j++){
    const t=(j+.5)/(5+s*2),x=(w*.7+(ws-w*.7)*t)*d;
    const feather=E('separate-layered-flight-feather-'+d+'-'+j,x,1.41-t*.16,
      -.27-t*.07,.08,.24+.09*(1-t),.070,j%3===0?M.gold:M.light);
    feather.rotation.z=-d*.25;
   }
   L('true-bird-shank-'+d,[[d*.17,.87,-.06],[d*.24,.44,.03],[d*.29,.22,.27]],.083,M.dark);
   E('raptor-wide-grasping-foot-'+d,d*.28,.18,.32,.17,.11,.18,M.gold);
   for(let k=0;k<3;k++)L('raptor-foot-talons-'+d+'-'+k,
    [[d*(.23+k*.05),.18,.35],[d*(.24+k*.06),.09,.48]],.026,M.dark);
  });
  for(let j=-3;j<=3;j++)E('layered-wayang-tail-plume-'+j,
   j*.075,.75,-.46,.060,.12,.27+(.20-Math.abs(j)*.04),j%2?M.light:M.main);
  if(s>=3)for(let i=-2;i<=2;i++)C('slender-wayang-bird-crown-'+i,
   i*.093,2.19-Math.abs(i)*.035,.39,.045,.22+(2-Math.abs(i))*.04,M.gold);
  if(s===6){
   // Stage 6 is a story-driven ageing/wounded Jatayu, not an anatomical birth claim.
   pair(d=>L('elder-Ramayana-battle-wing-scar-'+d,[[d*.50,1.65,-.16],
    [d*.66,1.59,-.14],[d*.79,1.49,-.13]],.031,M.dark));
  }
  if(s===7)pair(d=>L('legend-wide-unbroken-wing-outline-'+d,
    [[d*.31,1.60,-.08],[d*(ws+.21),2.11,-.31],
      [d*(ws+.50),1.94,-.51]],.076,M.gold));
 }else if(id==='bedawang_nala'){
  // Source: cosmic turtle used as Bali temple/padmasana BASE, with two
  // serpent guardians and mythical flame-mouth. Neither ordinary sea turtle
  // nor generic winged dragon. Naga may be one or two in documented versions.
  const r=.46+.19*growth,depth=.67+.13*growth;
  E('massive-grounded-Bedawang-turtle-body',0,.80,-.05,r,.32,depth,M.main);
  E('cosmic-curved-turtle-carapace',0,1.09,-.21,r+.08,.31,depth+.03,M.dark);
  E('turtle-plastron-under-shell',0,.58,.04,r*.91,.15,depth*.87,M.light);
  for(let i=0;i<14+s*3;i++){
   const a=i*2.39996,xx=Math.sin(a)*r*.83,zz=Math.cos(a)*depth*.79-.18;
   E('specific-hexagonal-shell-panel-'+i,xx,1.29-(i%4)*.05,
     zz,.095,.037,.109,i%4===0?M.gold:M.main);
  }
  pair(d=>{
   for(const z of [-.50,.40]){
    L('huge-primitive-tortoise-leg-'+d+'-'+z,
      [[d*r*.70,.77,z],[d*(r+.14),.43,z+.04],[d*(r+.18),.22,z+.17]],.132,M.main);
    E('large-clawed-tortoise-foot-'+d+'-'+z,d*(r+.18),.19,z+.23,.18,.12,.22,M.dark);
   }
  });
  E('fire-mouth-horse-headed-Bedawang-face',0,.94,.75,.34,.27,.27,M.main);
  E('tortoise-horse-hybrid-elongated-nasal-mask',0,.90,.98,.20,.13,.20,M.light);
  E('visible-gaping-sacred-cosmic-mouth',0,.72,.94,.21,.13,.13,M.dark);
  E('flame-in-open-Bedawang-mouth',0,.73,1.07,.105,.085,.048,M.gold);
  eyes('Bedawang-round-wide-eyes',1.01,1.00,.22,.056);
  for(let i=-2;i<=2;i++)L('fiery-neck-mane-'+i,
    [[i*.13,1.15,.71],[i*.19,1.37,.63],[i*.22,1.56+(.06*s),.52]],.033,M.gold);
  if(s>=2){
   // Paired guardian serpents: independent continuous coils, two visible heads.
   pair(d=>{
    const pts=[],n=15+s*2;
    for(let j=0;j<=n;j++){
     const t=j/n,a=t*Math.PI*2.35;
     pts.push([d*(r+.13+Math.sin(a)*.16),.68+t*.32,
       Math.cos(a)*depth*.80-.13]);
    }
    pts.push([d*(r+.16),1.26,.42],[d*(r+.10),1.67,.61]);
    L('coiling-guardian-Basuki-Anantaboga-'+d,pts,.067+.025*growth,d<0?M.gold:M.light);
    E('raised-guardian-naga-head-'+d,d*(r+.10),1.69,.62,.17,.15,.16,d<0?M.gold:M.main);
    L('raised-naga-whisker-'+d,[[d*(r+.19),1.71,.72],
      [d*(r+.40),1.81,.82]],.023,M.gold);
   });
  }
  if(s>=5)for(let j=-2;j<=2;j++)E('architectural-Balinese-guardian-base-relief-'+j,
    j*.24,.36,-.63,.075,.09,.07,M.gold);
  if(s===7)pair(d=>L('legend-Bedawang-flame-crest-'+d,
    [[d*.20,1.35,.79],[d*.41,1.78,.74],[d*.53,2.03,.61]],.063,M.gold));
 }else if(id==='hanoman'){
  // White-furred monkey hero, HUMAN-LIKE shoulders, long tail and ceremonial
  // cloth — not a big silver gorilla, not a dog, not a generic goblin.
  const torso=.25+.10*growth,hy=1.74+.11*growth;
  loft('vanara-warrior-humanlike-torso',[[.67,.19,.19,0,-.06],
    [1.01,torso,.23,0,-.08],[1.46,torso+.04,.22,0,-.09]],M.white);
  E('white-monkey-round-skulled-head',0,hy,.17,.26+.03*growth,.27,.24,M.white);
  E('white-short-simian-protruding-muzzle',0,hy-.12,.39,.20,.13,.17,M.light);
  E('Hanoman-black-simian-nose',0,hy-.08,.53,.090,.075,.07,M.dark);
  eyes('Hanoman-patient-vanara-eyes',hy+.10,.375,.16);
  pair(d=>{
   E('Hanoman-disc-ear-'+d,d*.29,hy+.02,.10,.10,.15,.083,M.light);
   L('articulated-monkey-hero-arm-'+d,[[d*torso,1.40,-.04],
    [d*(torso+.22),1.01,.11],[d*(torso+.25),.56,.20]],.080,M.white);
   E('five-fingered-monkey-hero-hand-'+d,d*(torso+.25),.52,.22,.10,.13,.094,M.light);
   for(let k=0;k<4;k++)L('independent-monkey-finger-'+d+'-'+k,
     [[d*(torso+.18+k*.046),.49,.24],
      [d*(torso+.20+k*.052),.33+(k%2)*.04,.29]],.017,M.main);
   L('kneeling-strong-vanara-shin-'+d,[[d*.19,.70,-.05],[d*.23,.34,.09],
     [d*.25,.16,.24]],.109,M.white);
   E('monkey-hero-flat-tarsal-foot-'+d,d*.25,.13,.30,.18,.10,.22,M.light);
  });
  L('very-long-curling-Hanoman-tail',[[0,.83,-.19],[.30,.75,-.54],
    [.56,1.14,-.71],[.47,1.60,-.81],[.30,1.67,-.86]],.077,M.white);
  E('wrapped-ceremonial-wayang-waistcloth',0,.65,.15,.29,.17,.22,M.gold);
  for(let j=-3;j<=3;j++)L('wayang-ceremonial-sarong-thread-'+j,
    [[j*.078,.64,.33],[j*.085,.40,.31],[j*.09,.27,.25]],.014,j%2?M.gold:M.dark);
  if(s>=2)for(let k=-2;k<=2;k++)C('Hanoman-traditional-jamang-point-'+k,
    k*.09,hy+.35-Math.abs(k)*.028,.16,.044,.17+(2-Math.abs(k))*.05,M.gold);
  if(s>=4){
   // Gada is artistic weapon reference, not universal myth element.
   L('royal-Wayang-fantasy-gada-shaft',[[.62,.35,.24],[.69,.96,.33],[.74,1.42,.40]],.050,M.dark);
   E('Hanoman-gada-ceremonial-head',.76,1.47,.41,.16,.23,.15,M.gold);
  }
  if(s===6)pair(d=>L('elder-vanara-fur-whisker-'+d,
    [[d*.17,hy-.10,.41],[d*.32,hy-.22,.36],[d*.37,hy-.28,.25]],.023,M.white));
  if(s===7)L('legend-raised-victory-tail',[[.42,1.36,-.71],
    [.64,2.00,-.86],[.41,2.27,-.82]],.071,M.gold);
 }else if(id==='makara_candi'){
  // Temple MAKARA is an architectural guardian carving, not a live monster.
  // Borobudur design: elephant-trunk scrolls + broad beast jaws and teeth,
  // paired with Kala on gateways. Actual source via govt conservation office.
  const w=.45+.20*growth,hh=1.93+.08*growth;
  P('stone-cut-temple-Makara-base-silhouette',[
    [-w,.24],[-w*.97,1.08],[-w*.80,1.78],[-.22,hh],
    [.20,hh],[w*.80,1.77],[w,1.07],[w,.23]],M.dark,.20);
  E('central-andesite-elephant-beast-face',0,1.31,.25,.40+.07*growth,.41,.20,M.main);
  E('massive-arched-upper-stone-jaw',0,1.31,.42,.36,.20,.14,M.light);
  E('large-open-mouth-void-carved-between-jaws',0,1.00,.44,.27,.13,.08,M.dark);
  E('lower-andesite-toothed-jaw',0,.83,.39,.32,.11,.13,M.main);
  pair(d=>{
   E('Makara-large-glaring-stone-eye-'+d,d*.24,1.55,.43,.10,.13,.048,M.gold);
   E('curling-ornamental-elephant-ear-'+d,d*.49,1.48,.19,.18,.24,.12,M.light);
   for(let j=0;j<4;j++)C('temple-stone-makara-visible-tooth-'+d+'-'+j,
     d*(.08+j*.058),.96,.51,.035,.10,M.white,Math.PI);
  });
  L('NOT-a-real-tusk-curving-makara-elephant-trunk',[[0,1.52,.52],
    [0,1.24,.81],[.23,.99,.91],[.29,.72,.80],
    [.13,.67,.71]],.12,M.main);
  for(let j=0;j<5+s*2;j++){
   const a=j*2.4,x=Math.sin(a)*w*.87,yy=.42+(j%6)*.22;
   L('temple-stone-vegetal-relief-scroll-'+j,[[x,yy,.19],
    [x*.94,yy+.10,.31],[x*.70,yy+.18,.31]],.028,j%3?M.gold:M.light);
  }
  for(let j=-2;j<=2;j++)C('arched-Kala-Makara-temple-floral-crown-'+j,
    j*.17,hh+.08-Math.abs(j)*.055,.05,.069,.24+(2-Math.abs(j))*.07,M.gold);
  if(s>=4)pair(d=>P('Makara-sided-portal-guard-plate-'+d,
    [[d*.33,.37],[d*.55,.51],[d*.62,1.28],[d*.43,1.52]],M.light,.095));
  if(s===6)pair(d=>L('weathered-ancient-portal-crack-'+d,
    [[d*.37,1.49,.43],[d*.41,1.24,.44],[d*.35,.96,.43]],.023,M.dark));
  if(s===7)pair(d=>L('legend-candi-curved-vegetal-frame-'+d,
    [[d*.51,1.10,.23],[d*.82,1.52,.19],[d*.90,2.02,.08]],.062,M.gold));
 }else if(id==='naga_padoha'){
  // Batak Toba underworld/earth power. Enormous thick burrowing coil and
  // Deak Parujar's restraining bindings. No wings, feet or western fiery horns.
  const pts=[],count=30+s*2,r=.34+.25*growth;
  for(let j=0;j<=count;j++){
   const t=j/count,a=t*Math.PI*3.55,rr=r*(1-.31*t);
   pts.push([Math.sin(a)*rr,.38+.19*t,Math.cos(a)*rr-.10]);
  }
  L('very-thick-subterranean-Batak-world-serpent-body',pts,.13+.052*growth,M.dark);
  L('rising-earth-serpent-front',[[-.04,.44,.26],[.13,.80,.31],[0,1.35,.45],[0,1.72,.52]],.16,M.main);
  E('large-Naga-Padoha-serpent-head',0,1.80,.55,.28+.07*growth,.25,.30,M.main);
  E('Batak-earth-long-serpent-jaw',0,1.64,.79,.18,.13,.28,M.light);
  eyes('subterranean-staring-serpent-eyes',1.91,.82,.19);
  pair(d=>{
   L('Batak-serpent-open-whisker-'+d,[[d*.19,1.73,.88],
     [d*.33,1.68,1.04],[d*.48,1.85,1.04]],.034,M.gold);
   L('restraining-deak-parujar-world-binding-'+d,[
     [d*(r*.52),.53,-.26],[d*(r*.95),.62,.09],[d*(r*.67),.78,.33]],.062,M.gold);
  });
  for(let j=0;j<7+s*2;j++){
   const p=pts[Math.min(count,1+j*2)];
   E('deep-earth-Batak-carved-scale-'+j,p[0],p[1]+.16,
     p[2],.077,.035,.10,j%4===0?M.gold:M.main);
  }
  if(s>=3){
   for(let j=-2;j<=2;j++)L('earth-world-root-braid-'+j,[[j*.11,.52,-.46],
     [j*.16,.27,-.61],[j*.25,.13,-.70]],.037,M.dark);
  }
  if(s>=5)E('Batak-gorga-earth-protector-relief-on-brow',
    0,2.02,.78,.18,.063,.036,M.gold);
  if(s===6)pair(d=>L('elder-cosmic-rift-ground-crease-'+d,
    [[d*.22,.29,-.59],[d*.40,.17,-.79],[d*.53,.12,-.86]],.030,M.main));
  if(s===7)pair(d=>L('legend-two-world-earth-boundary-'+d,
    [[d*.34,.58,-.37],[d*.69,1.02,-.51],[d*.85,1.34,-.73]],.073,M.gold));
 }
 // Each phase has additional unique topology, NOT arbitrary western anatomy
 // (e.g. no invented horns, firebreath, humanoid feet for naga).
 if(s===1)E('juvenile-emergent-small-scar',0,.18,-.27,.072,.050,.064,M.gold);
 if(s===2)pair(d=>E('early-growing-relief-fold-'+d,d*.16,.23,-.30,.071,.086,.054,M.light));
 if(s===3)L('child-structural-crease',[[-.15,.35,-.27],[0,.29,-.29],[.15,.35,-.27]],.028,M.dark);
 if(s===4)pair(d=>L('teenage-articulated-growth-ridge-'+d,[[d*.15,.37,-.32],
  [d*.29,.28,-.42]],.028,M.gold));
 if(s===5)E('mature-source-mark',0,.19,-.31,.130,.043,.083,M.dark);
 if(s===6)pair(d=>E('old-history-texture-'+d,d*.17,.25,-.36,.09,.063,.061,M.light));
 if(s===7)pair(d=>L('fantasy-legend-local-context-outline-'+d,
   [[d*.18,.32,-.38],[d*.42,.59,-.51],[d*.63,.82,-.64]],.041,M.gold));
 rig.userData={id,phase:s,fullyRebuilt:true,regionalIconography:true,fictionalEvolution:true,
  historicReference:SOURCES[id],nativeMeshMasked:true,noSaveChange:true};
 body.userData.NJ107={id,phase:s,authority:'NJ107',noSaveChange:true};
 return true;
};
})();