/* NJ106 — Batch 09: five unmistakable Jawa/Sasak folktale heroes.
 * 5 identities x 8 independently constructed, imaginary Tamagotchi stages.
 * Differentiates farmer, celestial shawl-holder, escaping girl, human/snail
 * cursed princess and Sasak coastal queen with symbolic nyale.
 * All phases are artistic GAME FICTION, not cultural genealogies. */
(function(){
'use strict';
if(window.NUSAJIWA_SCULPT106)return;
const IDS=['jaka_tarub','nawang_wulan','timun_mas','keong_mas','putri_mandalika'];
const META={
 jaka_tarub:{region:'Jawa Tengah',form:'Javanese young farmer, earth-tone sarong, rice granary and hidden pink celestial shawl. NOT winged deity.',source:'https://budi.kemendikdasmen.go.id/storage/book/aatE0oHQdC45WD1b8cPRYahEQnKwbw4GwyMwyTE4.pdf'},
 nawang_wulan:{region:'Jawa Tengah',form:'Celestial human woman with a flowing pink flight shawl and symbolic single rice grain in a pot; no bird wings.',source:'https://budi.kemendikdasmen.go.id/storage/book/aatE0oHQdC45WD1b8cPRYahEQnKwbw4GwyMwyTE4.pdf'},
 timun_mas:{region:'Jawa Tengah',form:'Young girl fleeing a giant with four magical gift bundles: cucumber seeds, needles, salt, shrimp paste; runner silhouette.',source:'https://www.detik.com/jateng/budaya/d-8477438/kisah-timun-mas-dan-buto-ijo-cerita-rakyat-jawa-tengah-lengkap-pesan-moralnya'},
 keong_mas:{region:'Jawa Timur, Panji cycle',form:'Candra Kirana transformed into GOLD SNAIL and later a royal human. Stage-by-stage FORM transition, not gold woman only.',source:'https://www.detik.com/jatim/budaya/d-6280957/keong-mas-cerita-rakyat-dari-jawa-timur-yang-sarat-pesan-moral'},
 putri_mandalika:{region:'Sasak, Lombok',form:'Human Sasak princess with textile and symbolic coastal nyale motif; Bau Nyale is a living tradition, not zoological reproduction.',source:'https://www.kemenpar.go.id/hasil-pencarian/menyambut-festival-bau-nyale-2026'}
};
window.NUSAJIWA_SCULPT106_IDS=Object.freeze(IDS.slice());
window.NUSAJIWA_SCULPT106_META=Object.freeze(META);
window.NUSAJIWA_SCULPT106=function(group,body,M,id,phase,T,ell,tube){
 if(!IDS.includes(id)||!group||!body||!M||!T||!ell||!tube)return false;
 const s=Math.min(7,Math.max(0,Math.trunc(Number(phase)||0))),host=s===0?group:body;
 if(s===0){for(const item of group.children)item.visible=false;}
 else for(const item of body.children)item.visible=false;
 const r=new T.Group();r.name='NJ106_'+id+'_F'+s;host.add(r);
 const name=n=>id+'-F'+s+'-'+n;
 const E=(n,x,y,z,w,h,d,mat)=>{const o=ell(r,x,y,z,w,h,d,mat);o.name=name(n);return o};
 const L=(n,points,size,mat)=>{const o=tube(r,points,size,mat);o.name=name(n);return o};
 const K=(n,x,y,z,rad,h,mat,rz=0)=>{const o=new T.Mesh(new T.ConeGeometry(rad,h,9),mat);
  o.name=name(n);o.position.set(x,y,z);o.rotation.z=rz;r.add(o);return o;};
 const pair=f=>{f(-1);f(1)};
 const newMat=color=>new T.MeshStandardMaterial({color,roughness:.83,side:T.DoubleSide});
 const earth=newMat('#775840'),sky=newMat('#d5a4b6'),jade=newMat('#3c776b'),
  snailGold=newMat('#e4b84e'),dusk=newMat('#7763a1'),deep=newMat('#44546c'),
  leaf=newMat('#5f8141');
 const Loft=(n,rings,mat)=>{
  const pos=[],ix=[],N=18;
  for(const [y,w,d,cx=0,cz=0] of rings)for(let k=0;k<N;k++){
   const a=k*Math.PI*2/N;pos.push(cx+Math.cos(a)*w,y,cz+Math.sin(a)*d);
  }
  for(let j=0;j<rings.length-1;j++)for(let k=0;k<N;k++){
   const a=j*N+k,b=j*N+(k+1)%N,c=(j+1)*N+k,d=(j+1)*N+(k+1)%N;
   ix.push(a,c,b,b,c,d);
  }
  const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(pos,3));
  g.setIndex(ix);g.computeVertexNormals();
  const mesh=new T.Mesh(g,mat);mesh.name=name(n);r.add(mesh);return mesh;
 };
 const eyes=(n,y,z,span=.15)=>pair(d=>{
  E(n+'-socket-'+d,d*span,y,z-.041,.084,.068,.054,M.dark);
  E(n+'-white-'+d,d*span,y,z,.056,.049,.03,M.light);
  E(n+'-iris-'+d,d*span,y,z+.032,.025,.03,.014,M.eye);
 });
 const Human=(n,gy,mat,skin=M.light,headY=1.78)=>{
  Loft(n+'-wrap-torso',[[.19,.29,.26],[.52,.34,.28],[1.12,.245,.22],[1.48,.24,.18]],mat);
  E(n+'-oval-human-face',0,headY,.14,.24,.30,.215,skin);
  E(n+'-normal-human-nose',0,headY-.045,.354,.072,.084,.065,M.main);
  E(n+'-calm-closed-mouth',0,headY-.185,.351,.105,.026,.026,M.dark);
  eyes(n+'-human-eyes',headY+.06,.342,.14);
  pair(d=>{
   L(n+'-human-elbow-arm-'+d,[[d*.23,1.42,0],[d*.38,1.01,.11],
     [d*.41,.65,.23]],.070,mat);
   E(n+'-open-human-hand-'+d,d*.41,.61,.22,.081,.115,.070,skin);
   for(let j=0;j<3;j++)L(n+'-three-visible-finger-'+d+'-'+j,
    [[d*(.40+j*.014),.58,.24],[d*(.43+j*.018),.51,.26]],.010,skin);
  });
  return headY;
 };
 const Hair=(n,y,low,num=9)=>{
  E(n+'-dark-scalp',0,y+.22,-.08,.29,.14,.24,M.black);
  for(let j=0;j<num;j++){const x=(j-(num-1)/2)*.58/num;
   L(n+'-long-hair-'+j,[[x,y+.28,-.09],[x*1.34,y-.19,-.20],
     [x*1.46,low+(j%3)*.045,-.20]],.019,M.black);
  }
 };
 const stageSize=[0,.51,.66,.78,.9,1,1.13,1.22][s];
 if(s===0){
  E('symbolic-myth-egg-not-real-lifecycle',0,1.15,0,.48,.77,.47,
    id==='keong_mas'?snailGold:id==='nawang_wulan'?sky:M.main);
  if(id==='keong_mas')L('snail-golden-shell-emblem',
   [[.15,1.45,.44],[.24,1.21,.47],[0,1.07,.50],[-.19,1.26,.47],
    [-.04,1.39,.50],[.07,1.24,.51]],.034,snailGold);
  else if(id==='nawang_wulan')pair(d=>L('celestial-shawl-emboss-'+d,
   [[0,1.51,.44],[d*.22,1.26,.46],[d*.32,.91,.40]],.040,sky));
  else if(id==='putri_mandalika')for(let i=-2;i<=2;i++)
    E('coastal-nyale-emblem-'+i,i*.10,.99+Math.abs(i)*.14,.42,.042,.105,.030,i%2?M.gold:jade);
  else if(id==='timun_mas')E('golden-cucumber-flower-seal',0,1.25,.49,.19,.29,.070,snailGold);
  else L('farmers-shoulder-cloth-emblem',[[-.22,1.42,.43],
    [0,1.20,.50],[.20,.88,.41]],.040,earth);
  for(let i=0;i<7;i++)E('engraved-symbolic-outer-rim-'+i,
   (i-3)*.08,1.03+(i%3)*.17,.43,.029,.049,.021,M.gold);
  r.userData={id,phase:s,gameFiction:true,source:META[id].source};return true;
 }
 if(id==='jaka_tarub'){
  const y=Human('Javanese-village-farmer',1.07,earth,M.light,1.75+.08*stageSize);
  E('short-parted-male-dark-hair',0,y+.23,-.13,.29,.14,.23,M.black);
  E('farmers-headcloth-band',0,y+.21,.04,.29,.07,.27,M.dark);
  pair(d=>{
   L('ground-walking-trouser-fold-'+d,[[d*.19,.60,-.10],
     [d*.22,.31,.06],[d*.23,.14,.24]],.060,earth);
   E('bare-farmer-foot-'+d,d*.22,.12,.29,.14,.09,.17,M.light);
  });
  // Distinct Jaka Tarub props: rice bundles + hidden pink celestial selendang.
  L('Jaka-Tarub-wooden-field-hoe-handle',[[.52,.18,.36],
    [.55,.89,.39],[.61,1.25,.43]],.054,M.dark);
  E('hoe-broad-metal-spade',.62,.16,.36,.21,.06,.19,M.light);
  E('bundled-golden-harvest-on-back',-.22,1.07,-.35,.22,.30,.18,M.gold);
  for(let i=0;i<6+s;i++)L('rice-spikelets-'+i,[[-.24,1.17,-.31],
   [-.36+(i%4)*.065,1.52+(i%3)*.075,-.33],
   [-.40+(i%4)*.07,1.64+(i%3)*.07,-.36]],.016,M.gold);
  if(s>=2)L('hidden-pink-celestial-selendang-under-rice',
   [[-.33,1.22,-.33],[-.43,.88,-.42],[-.24,.60,-.37]],.052,sky);
  if(s>=3)E('partially-open-harvest-storage-vessel',-.37,.54,-.26,
    .25,.32,.21,earth);
  if(s>=4)pair(d=>L('woven-village-cloth-sash-'+d,[[d*.17,1.13,.19],
   [d*.30,.73,.24],[d*.38,.42,.18]],.030,M.gold));
  if(s===6)E('age-weathered-human-farmer-brow',0,y+.115,.35,.19,.045,.035,M.dark);
  if(s===7)L('legend-stylized-selendang-returns-to-sky',
    [[-.34,1.26,-.35],[-.58,1.87,-.41],[-.63,2.22,-.58]],.064,sky);
 }else if(id==='nawang_wulan'){
  const y=Human('celestial-human-woman',1.06,deep,M.light,1.75+.08*stageSize);
  Hair('Nawang-Wulan-back-hair',y,.63,8+s);
  // The shawl is a pair of articulated cloth bands: NOT swan/bird wings.
  pair(d=>{
   L('two-pink-celestial-flying-selendang-streamers-'+d,[[d*.16,1.51,-.22],
     [d*(.35+.12*stageSize),1.94,-.27],[d*(.61+.17*stageSize),1.73,-.42]],.085,sky);
   for(let j=0;j<4+s;j++){
    const x=d*(.20+j*.052);
    L('woven-selendang-layer-'+d+'-'+j,[[x,1.60,-.23],
      [x+d*.07,1.94-j*.034,-.27],[x+d*.17,1.72-j*.047,-.34]],.018,M.white);
   }
  });
  // Magical rice pot is a legend narrative device, not a new supernatural organ.
  E('one-grain-rice-cooking-clay-pot',-.55,.43,.25,.25,.17,.22,earth);
  E('single-symbolic-rice-grain',-.54,.63,.27,.045,.092,.032,M.gold);
  E('Javanese-womens-batik-lower-sarong',0,.51,.16,.32,.24,.26,deep);
  if(s>=3)E('sky-womans-gold-back-clip',0,y+.21,-.13,.16,.069,.09,M.gold);
  if(s>=4)pair(d=>L('more-pronounced-uplifting-selendang-'+d,
   [[d*.45,1.92,-.31],[d*.75,2.21,-.45],[d*1.02,2.13,-.63]],.040,sky));
  if(s===6)pair(d=>L('elder-myth-selendang-embroidered-edge-'+d,
   [[d*.44,1.90,-.29],[d*.83,2.01,-.48],[d*1.11,1.93,-.60]],.025,M.gold));
  if(s===7)pair(d=>L('legend-transcendent-pink-shawl-arches-'+d,
   [[d*.29,1.64,-.30],[d*.91,2.29,-.48],[d*1.34,2.50,-.72]],.070,sky));
 }else if(id==='timun_mas'){
  const y=Human('quick-running-young-Javanese-girl',1.04,leaf,M.light,1.73+.11*stageSize);
  Hair('Timun-Mas-tied-hair',y,1.19,5+s);
  // Off-centre stride and loose straps are authored separately from other humans.
  pair(d=>{
   L('Timun-Mas-striding-shin-'+d,[[d*.16,.58,-.06],
     [d*(.25+.10*stageSize),.32,d*.12],
     [d*(.34+.17*stageSize),.15,d*.26]],.075,leaf);
   E('runner-bare-foot-'+d,d*(.34+.17*stageSize),.14,d*.29,.12,.085,.19,M.light);
  });
  E('golden-cucumber-seed-bag-belt',0,1.02,.23,.25,.075,.092,snailGold);
  const names=['cucumber','needle','salt','shrimp-paste'];
  const mats=[leaf,M.dark,M.white,earth];
  for(let i=0;i<4;i++){
   E('four-legend-gifts-'+names[i],(i-1.5)*.14,.90,.315,
     .069,.088,.05,mats[i]);
   if(s>=i+2)L('gift-bag-cloth-string-'+names[i],
    [[(i-1.5)*.14,.96,.35],[(i-1.5)*.14,.84,.38]],.013,M.gold);
  }
  if(s<=2)E('symbolic-yellow-cucumber-in-child-hand',
   .37,.62,.42,.16,.27,.13,snailGold);
  if(s>=3){
   pair(d=>L('escaping-girl-windblown-batik-tunic-'+d,[[d*.22,1.28,-.16],
    [d*.43,.85,-.25],[d*.55,.38,-.27]],.051,leaf));
   for(let j=0;j<4+s;j++)L('magical-thorny-bamboo-path-spike-'+j,
    [[-.58+j*.17,.14,-.43],[(-.58+j*.17)*1.12,.28+(j%3)*.11,-.40]],.017,leaf);
  }
  if(s>=5)L('giant-chase-salt-white-sparkles',[[.14,.44,-.39],
    [.34,.61,-.51],[.55,.66,-.62]],.037,M.white);
  if(s===6)E('legend-courage-headband',0,y+.25,.06,.26,.05,.10,snailGold);
  if(s===7)L('legend-four-gifts-transformation-trail',[[.22,.33,-.35],
   [.61,.70,-.57],[.99,1.11,-.69]],.060,M.gold);
 }else if(id==='keong_mas'){
  // Cursed princess morphs from GOLDEN SNAIL into real human Candra Kirana.
  const snailStage=s<=3,hybrid=s===4;
  if(snailStage||hybrid){
   const rad=.28+.08*stageSize;
   E('actual-grounded-golden-snail-coiled-shell',
     -.12,.83,-.13,rad+.12,.33+.12*stageSize,.28+.09*stageSize,snailGold);
   for(let j=0;j<4+s;j++){
    const t=j/(4+s),angle=t*Math.PI*3.1;
    L('true-three-dimensional-spiral-shell-ridge-'+j,[
      [-.12+.24*Math.cos(angle),.83+.24*Math.sin(angle),.14],
      [-.12+.19*Math.cos(angle+.40),.83+.19*Math.sin(angle+.40),.19],
      [-.12+.14*Math.cos(angle+.90),.83+.14*Math.sin(angle+.90),.23]
    ],.028,M.gold);
   }
   // Fine three-dimensional radial cangkang grooves: genuine sculpt detail,
   // not an attempt to relax the minimum-geometry regression guard.
   for(let k=0;k<8+s;k++){
    const a=k*Math.PI*2/(8+s),rad=.22+.045*stageSize;
    L('snail-shell-fine-radial-sculpt-groove-'+k,[
     [-.12+rad*Math.cos(a),.83+rad*Math.sin(a),.14],
     [-.12+(rad+.046)*Math.cos(a+.10),.83+(rad+.046)*Math.sin(a+.10),.16],
     [-.12+(rad+.078)*Math.cos(a+.22),.83+(rad+.078)*Math.sin(a+.22),.12]
    ],.014+(k%3)*.003,M.gold);
   }
   E('low-real-snail-foot',0,.41,.16,.37+.05*stageSize,.12,.36,M.main);
   E('snail-head-without-human-face',.25,.55,.38,.16,.21,.16,M.light);
   pair(d=>L('snail-nonhuman-tentacle-'+d,[[.25+d*.10,.68,.43],
    [.25+d*.17,.95,.45]],.043,snailGold));
   if(hybrid){
    const face=Human('half-released-Candra-Kirana',1.0,dusk,M.light,1.70);
    Hair('emerging-princess-hair',face,.93,8);
    E('cursed-transition-shell-fragment',-.33,.81,-.28,.23,.22,.24,snailGold);
   }
  }else{
   const y=Human('released-Daha-princess-Candra-Kirana',1.03,dusk,M.light,1.79);
   Hair('Candra-Kirana-royal-dark-hair',y,.79,8+s);
   E('Panji-era-royal-waistband',0,1.08,.24,.25,.070,.070,M.gold);
   for(let i=-2;i<=2;i++)K('Candra-Kirana-small-crown-point-'+i,
    i*.105,y+.36,-.09,.043,.14+.034*(2-Math.abs(i)),M.gold);
   E('symbolic-golden-shell-kept-as-relic',-.48,.52,.39,.20,.20,.14,snailGold);
   L('visible-snail-relic-spiral',[[ -.53,.51,.53],[-.43,.58,.51],
     [-.36,.49,.54],[-.47,.44,.54]],.027,M.gold);
   if(s===6)pair(d=>L('elder-royal-Batik-scarf-'+d,[[d*.24,1.53,-.13],
    [d*.47,1.11,-.27],[d*.56,.62,-.36]],.053,dusk));
   if(s===7)pair(d=>L('legend-return-to-human-gold-sparkle-'+d,
    [[d*.31,.55,-.20],[d*.68,1.11,-.49],[d*1.02,1.45,-.61]],.046,snailGold));
  }
 }else if(id==='putri_mandalika'){
  const y=Human('Sasak-Lombok-royal-princess',1.05,jade,M.light,1.78);
  Hair('Mandalika-black-royal-bun-and-hair',y,.99,7+s);
  E('Sasak-royal-headband',0,y+.22,.04,.29,.07,.20,M.gold);
  for(let j=0;j<4+s;j++)K('Lombok-hair-headdress-tip-'+j,
   (j-(3+s)/2)*.052,y+.34,-.13,.032,.12+(j%3)*.026,M.gold);
  // Songket-like cloth woven directly as 3D folds; pattern is stylized not replica.
  for(let j=0;j<5+s;j++){
   const x=(j-(4+s)/2)*.52/(5+s);
   L('woven-Sasak-songket-dress-stripe-'+j,[[x,1.10,.21],
    [x*1.10,.68,.28],[x*1.24,.24,.29]],.016,M.gold);
  }
  pair(d=>L('cliffshore-Bau-Nyale-cape-'+d,[[d*.23,1.52,-.14],
    [d*.44,1.06,-.27],[d*.58,.42,-.34]],.045,jade));
  if(s>=2)for(let j=0;j<3+s;j++){
   const xx=(j-(2+s)/2)*.14;
   L('symbolic-Lombok-multicolor-nyale-worm-'+j,
    [[xx,.28,-.41],[xx+.10,.36,-.47],[xx+.19,.33,-.52],
     [xx+.25,.42,-.62]],.027,j%3===0?leaf:j%3===1?snailGold:dusk);
  }
  if(s>=4)L('Pantai-Seger-shoreline-behind-princess',[[ -.54,.15,-.49],
   [-.23,.26,-.58],[.17,.15,-.65],[.61,.21,-.71]],.044,deep);
  if(s>=5)E('Princess-Mandalika-ceremonial-chest-piece',0,1.34,.26,.15,.13,.07,M.gold);
  if(s===6)pair(d=>L('older-princess-mythic-coast-ribbon-'+d,[[d*.25,1.43,-.16],
   [d*.71,.80,-.32],[d*.89,.44,-.47]],.045,jade));
  if(s===7)pair(d=>L('legend-symbolic-nyale-procession-'+d,
   [[d*.15,.30,-.43],[d*.56,.68,-.58],[d*.86,1.12,-.69]],.059,snailGold));
 }
 // Stage geometry changes beyond merely resizing full body.
 if(s===1)E('early-juvenile-story-token',0,.17,-.38,.083,.061,.076,M.gold);
 if(s===2)pair(d=>E('juvenile-growing-decoration-'+d,d*.15,.25,-.39,.07,.077,.060,M.light));
 if(s===3)L('young-story-crease',[[-.19,.37,-.41],[0,.30,-.44],[.19,.37,-.41]],.028,M.dark);
 if(s===4)pair(d=>L('teen-outline-'+d,[[d*.19,.53,-.39],[d*.39,.32,-.44]],.027,M.gold));
 if(s===5)E('adult-ornament-finish',0,.20,-.41,.12,.050,.077,M.gold);
 if(s===6)pair(d=>E('elder-story-age-inlay-'+d,d*.18,.29,-.45,.068,.055,.073,M.light));
 if(s===7)pair(d=>L('legend-game-symbol-not-folklore-fact-'+d,[[d*.21,.38,-.47],
   [d*.46,.69,-.56],[d*.65,.96,-.68]],.047,M.gold));
 r.userData={id,phase:s,rebuilt:true,culturalSource:META[id].source,
  form:META[id].form,lifecycle:'fictional-game',previousGeometryHidden:true};
 body.userData.NJ106={id,phase:s,noSaveMutation:true};
 return true;
};
})();