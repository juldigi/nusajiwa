/* NJ100 · Batch 03, five individually reconstructed Nusantara mythic identities.
 * Based on iconographic motifs (Kutai emblem, Garuda sculpture, Balinese water
 * serpents and Javanese Anantaboga). Game phases are NOT historic life cycles.
 * Native + prior procedural geometry are masked only for these five IDs. */
(function(){
'use strict';
if(window.NUSAJIWA_SCULPT100)return;
const IDS=['lembuswana','garuda','naga_basuki','naga_antaboga','ular_naga'];
const META={
 lembuswana:{region:'Kutai, Kalimantan Timur',label:'cow–elephant–bird–rooster hybrid with scales and crown',
  source:'https://p2k.stekom.ac.id/ensiklopedia/Lembuswana'},
 garuda:{region:'Nusantara, Hindu iconography',label:'eagle head/beak/wings/tail and human arms/legs',
  source:'https://www.museumnasional.or.id/4378/'},
 naga_basuki:{region:'Bali',label:'serpent associated with water flowing from mountains to the sea',
  source:'https://www.indonesia.travel/id/id/news-update/penjor-simbol-manifestasi-istana-tuhan'},
 naga_antaboga:{region:'Jawa and Bali',label:'crowned serpent king, also depicted in human form in wayang',
  source:'https://news.detik.com/berita/d-5228149/antaboga-dewa-ular-naga-dalam-dunia-wayang-jawa'},
 ular_naga:{region:'Bali, Taksaka motif',label:'curved serpent with head and curled mane represented in penjor',
  source:'https://www.indonesia.travel/id/id/news-update/penjor-simbol-manifestasi-istana-tuhan'}
};
window.NUSAJIWA_SCULPT100_IDS=Object.freeze(IDS.slice());
window.NUSAJIWA_SCULPT100_META=Object.freeze(META);
window.NUSAJIWA_SCULPT100=function(group,body,M,id,phase,T,ell,tube){
 if(!IDS.includes(id)||!group||!body||!M||!T||!ell||!tube)return false;
 const s=Math.max(0,Math.min(7,Math.floor(Number(phase)||0)));
 const host=s===0?group:body;
 if(s===0){for(const child of group.children)child.visible=false;}
 else for(const child of body.children)child.visible=false;
 const sculpt=new T.Group();sculpt.name='NJ100_'+id+'_F'+s;host.add(sculpt);
 const p=id+'-F'+s+'-',pair=(fn)=>{fn(-1);fn(1)};
 const E=(n,x,y,z,a,b,c,m)=>{const o=ell(sculpt,x,y,z,a,b,c,m);o.name=p+n;return o};
 const L=(n,pts,r,m)=>{const o=tube(sculpt,pts,r,m);o.name=p+n;return o};
 const K=(n,x,y,z,rad,h,m,rz=0)=>{const o=new T.Mesh(new T.ConeGeometry(rad,h,9),m);
  o.name=p+n;o.position.set(x,y,z);o.rotation.z=rz;sculpt.add(o);return o};
 const loft=(n,sections,m)=>{
  const positions=[],indices=[],N=20;
  for(const [y,rx,rz,cx=0,cz=0] of sections)for(let k=0;k<N;k++){
   const a=k*2*Math.PI/N;positions.push(cx+rx*Math.cos(a),y,cz+rz*Math.sin(a));
  }
  for(let j=0;j<sections.length-1;j++)for(let k=0;k<N;k++){
   const a=j*N+k,b=j*N+(k+1)%N,c=(j+1)*N+k,d=(j+1)*N+(k+1)%N;
   indices.push(a,c,b,b,c,d);
  }
  const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(positions,3));
  g.setIndex(indices);g.computeVertexNormals();
  const o=new T.Mesh(g,m);o.name=p+n;sculpt.add(o);return o;
 };
 const eyes=(label,y,z,dx=.17)=>pair(d=>{
   E(label+'-upper-eye-shadow-'+d,d*dx,y+.04,z-.018,.075,.045,.054,M.dark);
   E(label+'-iris-'+d,d*dx,y,z,.065,.072,.045,M.gold);
   E(label+'-dark-pupil-'+d,d*dx,y,z+.036,.028,.041,.025,M.eye);
 });
 const stageSize=[0,.54,.68,.83,.96,1.05,1.13,1.24][s];
 if(s===0){
  const index=IDS.indexOf(id);
  E('mythic-symbolic-egg',0,1.16,.0,.52+.035*index,.78,.48,M.main);
  const emblems=[
   [[-.23,1.20,.44],[0,1.54,.47],[.23,1.20,.44]],
   [[-.29,1.16,.39],[0,1.49,.47],[.29,1.16,.39]],
   [[-.20,.89,.41],[.19,1.19,.46],[-.08,1.48,.42]],
   [[-.26,1.42,.37],[0,1.15,.50],[.26,1.42,.37]],
   [[-.24,.90,.42],[0,1.22,.52],[.27,1.49,.36]]
  ];
  L('species-carved-emblem',emblems[index],.043,M.gold);
  for(let j=0;j<7;j++)E('original-seal-scale-'+j,(j-3)*.07,1.04+(j%3)*.20,
    .42+(j%2)*.02,.040,.066,.022,j%2?M.dark:M.light);
  sculpt.userData={id,phase:s,rebuilt:true,source:META[id].source,fictionalLifecycle:true};
  return true;
 }
 if(id==='lembuswana'){
  const length=.41+stageSize*.37;
  E('bull-body-with-scaled-dragon-hide',0,.95,-.18,.42+stageSize*.14,.40+stageSize*.13,length,M.main);
  E('deep-bovine-chest',0,1.02,.36,.36,.35,.30,M.light);
  E('elephant-like-bull-head',0,1.46,.57,.31+.03*stageSize,.29,.29,M.main);
  E('broad-elephant-forehead',0,1.61,.67,.28,.17,.18,M.light);
  eyes('head-forward-eye',1.51,.83,.21);
  const trunkLength=.31+stageSize*.18;
  L('prominent-long-elephant-trunk',[[0,1.42,.84],[0,1.20,1.09],
   [.08,1.12-trunkLength,1.17]],.12,M.main);
  if(s>=2)pair(d=>L('elephant-short-curved-tusk-'+d,
   [[d*.22,1.30,.86],[d*.31,1.17,1.07],[d*.38,1.34,1.12]],.048,M.white));
  pair(d=>{for(const [i,z] of [[0,.43],[1,-length*.75]]){
   L('bovine-rooster-shank-'+d+'-'+i,[[d*.32,.76,z],[d*.38,.31,z+.06]],.116,M.dark);
   for(let t=0;t<3;t++)L('chicken-like-separated-toe-'+d+'-'+i+'-'+t,
    [[d*.38,.24,z+.13],[d*(.44+(t-1)*.09),.13,z+.26]],.043,M.gold);
  }});
  const scales=3+s*2;
  for(let j=0;j<scales;j++){const zz=-length*.8+j*(length*1.6)/Math.max(1,scales-1);
   E('individual-dragon-scale-'+j,(j%2?.15:-.15),1.37,zz,.12,.038,.085,M.gold);
  }
  if(s>=3)pair(d=>{
   const span=.32+(s-2)*.18;
   L('Kutai-garuda-wing-humerus-'+d,[[d*.27,1.43,-.25],[d*span,1.77,-.45],
    [d*(span+.29),1.87,-.62]],.080,M.main);
   for(let j=0;j<3+s;j++){
    E('layered-feather-'+d+'-'+j,d*(span*.61+j*.071),1.59-j*.06,
      -.48-j*.030,.080,.24,.068,j%2?M.gold:M.light);
   }
  });
  if(s>=5)for(let j=-2;j<=2;j++)K('royal-kutai-crown-prong-'+j,
   j*.12,1.91+(2-Math.abs(j))*.025,.48,.064,.23+(2-Math.abs(j))*.05,M.gold);
  if(s===6)pair(d=>E('elder-wing-shoulder-feather-'+d,d*.46,1.66,-.30,.19,.29,.12,M.dark));
  if(s===7)pair(d=>L('legend-swept-crown-wing-'+d,
   [[d*.49,1.72,-.34],[d*1.06,2.12,-.53],[d*1.46,2.04,-.82]],.10,M.gold));
 }
 else if(id==='garuda'){
  // Museum Nasional bird-headed + HUMAN-armed/human-legged Garuda, not ordinary eagle.
  loft('anthropomorphic-human-torso',[[.72,.21+.08*stageSize,.21,0,-.10],
    [1.06,.28+.10*stageSize,.24,0,-.12],[1.58,.33+.08*stageSize,.24,0,-.11]],M.main);
  E('curved-bird-chest-feathers',0,1.31,.24,.26,.26,.17,M.light);
  E('eagle-neck',0,1.73,.01,.19,.27,.21,M.main);
  E('eagle-head',0,1.96,.19,.29+.035*stageSize,.25,.25,M.main);
  E('long-ridged-beak-base',0,1.84,.45,.15,.13,.24,M.gold);
  K('forward-curving-eagle-hook',0,1.73,.66,.09,.18,M.gold,.19);
  eyes('eagle-staring-eye',2.01,.407,.17);
  pair(d=>{
   // Two human arms separate from wing anatomy.
   L('human-shoulder-elbow-wrist-'+d,[[d*.31,1.53,0],[d*.46,1.07,.15],
    [d*.39,.73,.27]],.093,M.main);
   E('human-palm-with-five-finger-silhouette-'+d,d*.39,.67,.29,.11,.15,.077,M.light);
   for(let j=0;j<4;j++)L('human-finger-'+d+'-'+j,
    [[d*(.35+j*.025),.59,.30],[d*(.37+j*.034),.46-(j%2)*.025,.33]],.018,M.main);
   L('human-leg-'+d,[[d*.16,.70,-.08],[d*.21,.34,.05],
    [d*.23,.16,.24]],.115,M.main);
   E('human-sandal-foot-'+d,d*.25,.13,.32,.17,.10,.21,M.dark);
   const spread=.38+.14*s;
   L('eagle-wing-leading-bone-'+d,[[d*.26,1.52,-.27],[d*spread,1.91,-.39],
    [d*(spread+.38),1.83,-.45]],.088,M.dark);
   const f=2+s;
   for(let j=0;j<f;j++){
    const xx=.24+(j+.5)/f*(spread+.42);
    E('individual-wing-flight-feather-'+d+'-'+j,d*xx,1.51-j*.052,-.43,
      .085,.18+.05*((j+1)%3),.071,j%2?M.light:M.main);
   }
  });
  for(let j=-2;j<=2;j++)E('eagle-tail-feather-'+j,j*.095,.69,-.45,
    .065,.11,.27+j*.014,M.dark);
  if(s>=4)for(let j=-1;j<=1;j++)K('royal-feathered-crest-'+j,j*.10,2.19,.05,.063,.19,M.gold);
  if(s>=6)pair(d=>E('elder-etched-bicep-band-'+d,d*.43,1.24,.18,.12,.045,.08,M.gold));
  if(s===7)pair(d=>L('legend-wing-extension-'+d,[[d*.62,1.79,-.39],
   [d*1.24,2.26,-.48],[d*1.51,2.17,-.66]],.091,M.main));
 }
 else{
  // Three sacred serpent interpretations with NON-IDENTICAL trajectories, headgear and jaws.
  const isBasuki=id==='naga_basuki',isAnanta=id==='naga_antaboga',isTaksaka=id==='ular_naga';
  const points=[],count=20+s*3;
  for(let k=0;k<=count;k++){
   const t=k/count,a=t*Math.PI*(isBasuki?2.5:isAnanta?4.1:3.25);
   const r=(isBasuki?.55:isAnanta?.46:.37)*(.66+stageSize*.28)*(1-t*.19);
   const x=Math.sin(a)*r+(isTaksaka?t*.27:0);
   const z=Math.cos(a)*r*.77-.19;
   const y=.33+t*(isTaksaka?1.18:.82);
   points.push([x,y,z]);
  }
  const last=points.at(-1),neckX=last[0],neckZ=last[2];
  points.push([neckX*.80,1.41,neckZ+.25],[0,1.70,.43]);
  L(isBasuki?'long-river-to-mountain-serpent-backbone':isAnanta?
    'subterranean-crowned-king-coil':'penjor-curved-taksaka-shoulder',points,
    .115+stageSize*.07,M.main);
  E('serpent-head-unwinged',0,1.75,.52,.25+.035*stageSize,.23,.31,M.main);
  E('elongated-serpent-snout',0,1.64,.78,.16,.11,.33,M.light);
  eyes('serpent-raised-mask-eye',1.81,.78,.18);
  pair(d=>L('head-mystical-whisker-'+d,[[d*.19,1.65,.83],[d*.37,1.56,.97],
   [d*(.41+(s>=5?.11:0)),1.36,1.07]],.029,M.gold));
  const scales=4+s*2;
  for(let j=0;j<scales;j++){
   const k=Math.round((j+.5)/scales*(count-3));
   const spot=points[k];
   E('rhythmic-raised-scale-'+j,spot[0],spot[1]+.14,spot[2],
     .080,.041,.085,isBasuki?M.light:isAnanta?M.gold:M.dark);
  }
  if(isBasuki){
   // Bali mountain-sea-water iconography rather than Western winged dragon.
   pair(d=>L('Basuki-flowing-water-crest-'+d,[[d*.12,1.88,.54],
    [d*.21,2.06,.35],[d*.34,2.14,.16]],.055,M.light));
   for(let j=0;j<3+s;j++)L('river-wave-vein-'+j,[[Math.sin(j)*.16,.68+(j%3)*.12,-.20],
    [Math.sin(j+.4)*.35,.48,-.35],[Math.sin(j+1)*.50,.24,-.43]],.022,M.glow);
   if(s>=5)K('Basuki-ceremonial-water-halo-spire',0,2.20,.15,.08,.24,M.gold);
   if(s===7)pair(d=>L('legend-water-mountain-serpent-feeler-'+d,
    [[d*.16,2.00,.40],[d*.51,2.37,.21],[d*.75,2.61,.02]],.078,M.light));
  }else if(isAnanta){
   // Wayang Antaboga as crowned snake king. Ritual human form is indicated late.
   for(let j=0;j<(s<=3?1:3);j++){
    E('royal-wayang-triple-jamang-tier-'+j,0,2.06+j*.090,.30,
      .24-j*.045,.056,.17-j*.020,M.gold);
   }
   for(let j=-2;j<=2;j++)K('king-serpent-crown-tip-'+j,j*.089,
    2.36-(Math.abs(j)*.044),.28,.048,.18+(2-Math.abs(j))*.06,M.gold);
   if(s>=4)pair(d=>L('seventh-earth-serpent-guardian-shoulder-'+d,
    [[d*.15,1.60,.41],[d*.36,1.29,.27],[d*.41,.97,.17]],.051,M.gold));
   if(s>=6)E('old-earth-guardian-forehead-jewel',0,1.97,.81,.11,.12,.043,M.gold);
   if(s===7){
    loft('fictional-human-serpent-guardian-transition',[[.89,.16,.13,0,.07],
     [1.13,.25,.18,0,.07],[1.43,.19,.16,0,.10]],M.light);
    pair(d=>L('deity-crowned-human-hand-'+d,[[d*.16,1.40,.10],
     [d*.37,1.10,.20],[d*.42,.82,.26]],.057,M.gold));
   }
  }else if(isTaksaka){
   // Penjor head and flowing curled foliage mane, distinctly asymmetric arch.
   const mane=3+s*2;
   for(let j=0;j<mane;j++){
    const x=(j-(mane-1)/2)*.068;
    L('Taksaka-penjor-curled-hair-'+j,[[x,1.98,.39],
      [x*1.52,2.24,-.02],[x*1.73,2.22+(j%3)*.12,-.25]],.020,M.dark);
   }
   pair(d=>E('long-palm-leaf-ear-'+d,d*.28,1.86,.35,.17,.08,.15,M.gold));
   if(s>=3)L('penjor-single-high-arched-sanggah-tip',[[0,1.92,.29],
    [.17,2.29,.14],[.22,2.48,-.14]],.055,M.gold);
   if(s>=6)pair(d=>L('taksaka-elder-tail-return-'+d,[[d*.25,.76,-.34],
    [d*.49,1.08,-.62],[d*.59,1.33,-.71]],.071,M.main));
   if(s===7)L('legend-penjor-raised-serpent-mane',[[.18,2.14,-.12],
    [.57,2.48,-.28],[.79,2.77,-.42]],.078,M.gold);
  }
 }
 // Phase-varying morphology, not only an increased uniform scale.
 if(s===1)E('young-recessed-novel-mark',0,.22,-.18,.065,.045,.065,M.gold);
 if(s===2)pair(d=>E('sprouting-age-fin-'+d,d*.16,.29,-.14,.075,.10,.055,M.light));
 if(s===3)L('juvenile-first-extended-crease',[[-.18,.44,-.14],[0,.35,-.23],
  [.18,.44,-.14]],.026,M.gold);
 if(s===4)pair(d=>L('adolescence-lengthening-tip-'+d,[[d*.16,.51,-.16],
  [d*.34,.47,-.25]],.036,M.dark));
 if(s===5)E('adult-joint-ornament',0,.23,-.26,.14,.045,.075,M.gold);
 if(s===6)pair(d=>E('elder-carved-age-pattern-'+d,d*.21,.34,-.28,.080,.060,.070,M.light));
 if(s===7)pair(d=>L('legend-exclusive-cultural-frame-'+d,[[d*.25,.42,-.37],
  [d*.46,.74,-.43],[d*.69,1.04,-.55]],.051,M.gold));
 sculpt.userData={id,phase:s,rebuilt:true,sculpted:true,fictionalLifecycle:true,
  region:META[id].region,identity:META[id].label,source:META[id].source};
 body.userData.NJ100={id,phase:s,saveUntouched:true,geometry:'fully-reconstructed'};
 return true;
};
})();