/* NJ99 · Folklore Batch 02 · 8 DIFFERENT reconstructed creatures / 8 phases.
 * In every targeted identity/stage hide previous sculpt and construct a visible
 * 3D rig. No generic adult overlay; evolution and elemental marks are game fiction.
 * Beliefs, narratives and local depictions have regional variations. */
(function(){
'use strict';
if(window.NUSAJIWA_SCULPT99)return;
const IDS=['banaspati','buto_ijo','palasik','sundel_bolong','babi_ngepet','begu_ganjang','bunian','hantu_banyu'];
const META={
 banaspati:{home:'Jawa',motif:'roaming flame / fiery apparition; folklore has several descriptions',source:'https://kebudayaan.kemdikbud.go.id/ditkma/buku-seri-pengenalan-budaya-nusantara-2019-2/'},
 buto_ijo:{home:'Jawa',motif:'giant green human-shaped antagonist in Javanese tales',source:'https://kebudayaan.kemdikbud.go.id/ditkma/buku-seri-pengenalan-budaya-nusantara-2019-2/'},
 palasik:{home:'Minangkabau',motif:'flying separated head in one version of the oral tale',source:'https://download.garuda.kemdikbud.go.id/article.php?article=1648087&title=Visualisasi+Karakter+Pocong+Kuntilanak+dan+Tuyul+pada+Film+Animasi+Keluarga+Hantu+Indonesia&val=14938'},
 sundel_bolong:{home:'Jawa',motif:'female spectral silhouette with aperture in upper back',source:'https://www.liputan6.com/regional/read/5997583/legenda-urban-mitos-sundel-bolong-sosok-hantu-wanita-nusantara-pendobrak-patriarki'},
 babi_ngepet:{home:'Jawa',motif:'magical black/grey pig in Javanese narrative',source:'https://kebudayaan.kemdikbud.go.id/ditkma/jejak-tradisi-nasional-2/'},
 begu_ganjang:{home:'Batak',motif:'attenuated towering shade; local depictions vary',source:'https://kebudayaan.kemdikbud.go.id/ditkma/jejak-tradisi-nasional-2/'},
 bunian:{home:'Sumatra',motif:'humanlike concealed forest inhabitants; not Western elves',source:'https://kebudayaan.kemdikbud.go.id/ditkma/jejak-tradisi-nasional-2/'},
 hantu_banyu:{home:'Kalimantan',motif:'water apparition rather than fish-tailed merfolk',source:'https://kebudayaan.kemdikbud.go.id/ditkma/jejak-tradisi-nasional-2/'}
};
window.NUSAJIWA_SCULPT99_IDS=Object.freeze(IDS.slice());
window.NUSAJIWA_SCULPT99_META=Object.freeze(META);
window.NUSAJIWA_SCULPT99=function(group,body,M,id,phase,T,ell,tube){
 if(!IDS.includes(id)||!group||!body||!M||!T||!ell||!tube)return false;
 const s=Math.max(0,Math.min(7,Math.floor(Number(phase)||0)));
 const host=s===0?group:body;
 if(s===0){for(const o of group.children)o.visible=false;}
 else for(const o of body.children)o.visible=false;
 const root=new T.Group();root.name='NJ99_'+id+'_F'+s;host.add(root);
 const prefix=id+'-F'+s+'-';
 const E=(n,x,y,z,rx,ry,rz,m)=>{const o=ell(root,x,y,z,rx,ry,rz,m);o.name=prefix+n;return o};
 const L=(n,p,r,m)=>{const o=tube(root,p,r,m);o.name=prefix+n;return o};
 const cone=(n,x,y,z,rr,h,m,rotZ=0)=>{const o=new T.Mesh(new T.ConeGeometry(rr,h,9),m);
  o.position.set(x,y,z);o.rotation.z=rotZ;o.name=prefix+n;root.add(o);return o};
 const pair=(f)=>{f(-1);f(1)};
 const circle=(n,x,y,z,r,t,m,axis='z')=>{
  const o=new T.Mesh(new T.TorusGeometry(r,t,8,28),m);o.name=prefix+n;
  o.position.set(x,y,z);if(axis==='y')o.rotation.x=Math.PI/2;root.add(o);return o;
 };
 const loft=(n,rings,m,opt={})=>{
  const count=24,positions=[],faces=[];
  for(const [y,w,d,cx=0,cz=0] of rings)for(let k=0;k<count;k++){
   const a=k*2*Math.PI/count;positions.push(cx+Math.cos(a)*w,y,cz+Math.sin(a)*d);
  }
  for(let j=0;j<rings.length-1;j++)for(let k=0;k<count;k++){
   // Back hole: physically omit strips in upper rear section (no dark opaque plug).
   const theta=(k+.5)*2*Math.PI/count;
   const yy=(rings[j][0]+rings[j+1][0])/2;
   if(opt.backAperture&&yy>opt.backAperture[0]&&yy<opt.backAperture[1] &&
     Math.abs(theta-Math.PI*1.5)<.58)continue;
   const a=j*count+k,b=j*count+(k+1)%count,c=(j+1)*count+k,d=(j+1)*count+(k+1)%count;
   faces.push(a,c,b,b,c,d);
  }
  const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(positions,3));
  g.setIndex(faces);g.computeVertexNormals();
  const o=new T.Mesh(g,m);o.name=prefix+n;root.add(o);return o;
 };
 const eyes=(tag,x,y,z,w,mat=M.eye)=>pair(d=>{
  E(tag+'-socket-'+d,x+d*w,y,z-.045,.090,.075,.055,M.dark);
  E(tag+'-eyeball-'+d,x+d*w,y,z,.060,.052,.029,M.light);
  E(tag+'-pupil-'+d,x+d*w,y,z+.035,.032,.039,.016,mat);
 });
 const hair=(tag,k,y,xscale,lo,mat=M.black)=>{
  for(let i=0;i<k;i++){const x=(i-(k-1)/2)*xscale/Math.max(1,k-1);
   L(tag+'-'+i,[[x,y,-.12],[x*1.38,y-.38,-.24],
     [x*1.61,lo+(i%4)*.065,-.22]],.018+(i%3)*.006,mat);}
 };
 const size=[0,.52,.67,.83,.99,1.10,1.15,1.23][s];
 if(s===0){
  const index=IDS.indexOf(id),w=.45+(index%3)*.07;
  E('egg-unique-profile',0,1.15,.0,w,.78-(index%2)*.06,.48,M.main);
  L('egg-ancestral-sigil',[[0,1.50,.43],
    [((index%4)-1.5)*.11,1.21,.51],
    [((index%3)-1)*.16,.96,.43]],.046,M.gold);
  for(let j=0;j<5;j++)E('engraved-origin-mark-'+j,
   (j-2)*.08,1.02+(j%3)*.18,.44-(j%2)*.035,.037,.052,.020,j%2?M.dark:M.light);
  if(id==='sundel_bolong')circle('open-back-egg-crest',0,1.24,-.47,.18,.039,M.gold);
  if(id==='begu_ganjang')L('elongation-seal',[[0,.66,.22],[0,1.08,.49],[0,1.80,.17]],.025,M.black);
  if(id==='banaspati')for(let j=-1;j<=1;j++)cone('fire-egg-triangle-'+j,j*.14,1.63,.04,.085,.23,M.gold);
  root.userData={id,phase:s,rebuilt:true,fictionalLifecycle:true,source:META[id].source};
  return true;
 }
 switch(id){
 case 'banaspati':{
  // Flame-like spectral entity; no solid human hero body or random horns.
  const radius=.23+size*.26;
  E('innermost-spectral-core',0,1.39,.02,radius,.36+size*.17,radius*.88,M.glow);
  E('dense-inner-charcoal-ember',0,1.39,.19,radius*.66,.27,.20,M.dark);
  eyes('two-ember-eyes',0,1.52,.41,.14,M.gold);
  const n=5+s*2;
  for(let i=0;i<n;i++){const a=i*2*Math.PI/n;
   const x=Math.cos(a)*(radius*.75),z=Math.sin(a)*radius*.75;
   L('dancing-fire-tongue-'+i,[[x,1.18,z],[x*1.19,1.53,z*1.28],
    [x*(1.50+(s%3)*.09),1.80+.09*s+(i%3)*.13,z*.76]],.040+(i%3)*.016,
    i%2?M.gold:M.glow);
  }
  if(s>=3){pair(d=>L('splitting-lateral-fire-'+d,
    [[d*.24,1.53,-.04],[d*(.43+size*.25),1.83,-.14],[d*(.60+size*.40),2.12,-.31]],.065,M.gold));}
  if(s>=5)E('older-asymmetric-fire-mask',0,1.54,.42,.17,.24,.06,M.dark);
  if(s===6)for(let j=-1;j<=1;j++)L('elder-dark-smoke-'+j,
   [[j*.20,1.72,-.25],[j*.34,2.07,-.33],[j*.39,2.34,-.39]],.046,M.dark);
  if(s===7)for(let j=0;j<6;j++){const a=j*Math.PI/3;
   L('legend-six-fold-surge-'+j,[[Math.sin(a)*.34,1.41,Math.cos(a)*.28],
    [Math.sin(a)*.66,2.06,Math.cos(a)*.40],
    [Math.sin(a)*.84,2.49,Math.cos(a)*.55]],.071,M.gold);}
  break;}
 case 'buto_ijo':{
  // Javanese green giant, muscular mass, no Tolkien-orc spikes.
  const w=.32+size*.32,head=1.69+size*.17;
  loft('massive-forward-bent-buto-torso',[[.40,.22,.30,0,-.05],[.76,w*.69,.38,0,-.13],
   [1.30,w,.46,0,-.20],[1.67,w*.75,.29,0,-.17]],M.main);
  E('enormous-broad-javanese-giant-head',0,head,.16,.33+size*.14,.34+.03*size,.28,M.main);
  E('giant-heavy-bridged-nose',0,head-.055,.47,.18,.14,.18,M.light);
  E('wide-heavy-lower-jaw',0,head-.21,.43,.28,.15,.18,M.dark);
  pair(d=>{
   E('thick-slanted-brow-'+d,d*.20,head+.16,.44,.16,.078,.10,M.dark);
   E('black-deep-eye-'+d,d*.20,head+.10,.49,.067,.062,.04,M.eye);
   L('giant-shoulder-and-low-fist-'+d,[[d*w*.90,1.54,-.02],[d*(w+.19),.89,.12],
    [d*(w+.18),.30,.24]],.13+size*.06,M.main);
   E('enormous-four-knuckle-fist-'+d,d*(w+.18),.29,.30,.21,.20,.23,M.light);
   L('massive-planting-leg-'+d,[[d*.28,.66,-.15],[d*.34,.27,.10]],.17+size*.045,M.dark);
   E('large-bare-giant-foot-'+d,d*.36,.12,.31,.27,.12,.35,M.main);
  });
  if(s>=3)pair(d=>cone('upturned-short-mouth-tusk-'+d,d*.21,head-.23,.57,.052,.21,M.white,.12*d));
  if(s>=4)E('giant-lower-belly-sag',0,.81,.34,w*.77,.27,.18,M.light);
  if(s>=5)E('wrinkled-nasal-bridge',0,head+.03,.59,.07,.087,.05,M.dark);
  if(s===6)pair(d=>L('elder-forearm-scar-'+d,[[d*(w+.23),.94,.26],
   [d*(w+.19),.70,.29]],.035,M.dark));
  if(s===7)pair(d=>E('legend-two-ton-shoulder-'+d,d*(w+.14),1.44,-.20,.26,.36,.25,M.dark));
  break;}
 case 'palasik':{
  // One documented variant: floating head. Unlike Kuyang: tight hair and scarf-like
  // spectral neck bindings, distinct narrow face and compact shallow veil.
  const hy=1.58+.11*size;
  E('minang-floating-rounder-human-face',0,hy,.13,.28+size*.075,.30+size*.055,.26,M.light);
  E('narrow-kite-shaped-chin',0,hy-.24,.24,.18,.15,.17,M.main);
  E('small-wedge-nose',0,hy-.04,.402,.070,.12,.09,M.light);
  eyes('hidden-terrifying-eyes',0,hy+.085,.38,.16,M.eye);
  E('compressed-closed-mouth',0,hy-.22,.39,.12,.038,.027,M.dark);
  E('close-fitting-head-hair',0,hy+.28,-.09,.34,.17,.29,M.black);
  hair('short-lateral-palasik-hair',4+s,hy+.34,.51,hy-.31-s*.025);
  const n=2+Math.floor(s*.76);
  for(let j=0;j<n;j++)L('palasik-hidden-neck-shadow-'+j,
   [[(j-n/2)*.055,hy-.27,-.05],
    [(j-n/2)*.090,hy-.55,-.15],
    [(j-n/2)*.12,hy-.68-.039*s,-.24]],.030,M.dark);
  pair(d=>L('minang-styled-imaginary-spirit-cloth-'+d,
   [[d*.14,hy-.25,.09],[d*(.30+size*.12),hy-.49,-.04],
   [d*(.36+size*.13),hy-.74,-.19]],.045,M.main));
  if(s>=3)circle('detached-ring-outline',0,hy-.33,.0,.20,.028,M.gold,'y');
  if(s>=5)pair(d=>E('palasik-sun-hollow-cheek-'+d,d*.26,hy-.13,.31,.07,.08,.055,M.dark));
  if(s===6)pair(d=>L('elder-hair-delamination-'+d,
   [[d*.25,hy+.30,-.12],[d*.53,hy-.06,-.19],[d*.62,.82,-.20]],.035,M.black));
  if(s===7)for(let j=-2;j<=2;j++)L('legend-head-spiral-'+j,
   [[j*.13,hy+.36,-.14],[j*.21,hy+.76,-.28],[j*.25,hy+.88,-.31]],.040,M.black);
  break;}
 case 'sundel_bolong':{
  // Structurally open rear aperture; no fake black ellipse occluding opaque gown.
  const crown=1.86+size*.13,r=.30+size*.11;
  const rings=[[.14,r+.19,.31,0,-.08],[.61,r+.12,.29,0,-.06],
   [.98,r+.02,.28,0,-.04],[1.14,.29,.27,0,-.08],
   [1.31,.28,.28,0,-.06],[1.47,.28,.24,0,-.05],[1.69,.22,.17,0,-.04]];
  loft('perforated-back-dress-real-mesh-gap',rings,M.white,{backAperture:[1.02,1.54]});
  // Ring lies in the rear-facing plane; keep it open and unfilled.
  const rr=.21+size*.020;
  for(let j=0;j<=18;j++){
   const theta=j/18*Math.PI*2;
   const x=rr*Math.cos(theta),y=1.29+.25*Math.sin(theta);
   if(j>0){const t=(j-1)/18*Math.PI*2;
    L('stitches-around-empty-aperture-'+j,
     [[rr*Math.cos(t),1.29+.25*Math.sin(t),-.31],
      [x,y,-.31]],.021,j%3===0?M.dark:M.light);}
  }
  E('distinct-not-kuntilanak-face',0,crown,.19,.24,.32,.24,M.light);
  E('sorrowful-mouth',0,crown-.20,.425,.115,.031,.026,M.dark);
  eyes('soft-eyes-at-front',0,crown+.08,.410,.15,M.eye);
  E('long-windblown-hair-crown',0,crown+.30,-.14,.33,.16,.27,M.black);
  hair('sundel-back-hair-curtain',5+s,crown+.33,.55,.70-(s>=5?.15:0));
  pair(d=>{
   L('slender-sleeved-arm-'+d,[[d*.26,1.47,.03],[d*(.37+size*.08),.90,.14],
    [d*(.43+size*.07),.41,.19]],.074,M.white);
   E('pale-wrist-'+d,d*(.43+size*.07),.40,.20,.080,.12,.074,M.light);
  });
  if(s>=3)pair(d=>L('rear-fabric-curtain-separated-'+d,
   [[d*.30,1.61,-.23],[d*.44,1.04,-.28],[d*.51,.48,-.32]],.047,M.white));
  if(s===6)pair(d=>L('aged-dress-hem-'+d,[[d*.30,.71,-.24],
   [d*.48,.34,-.31],[d*.58,.20,-.38]],.040,M.light));
  if(s===7)pair(d=>L('legend-back-hair-parting-'+d,
   [[d*.30,crown+.34,-.12],[d*.62,1.56,-.32],[d*.78,.94,-.41]],.071,M.black));
  break;}
 case 'babi_ngepet':{
  // TRUE boar quadruped; no human torso/face and no dragon dorsal ridges.
  const x=.30+size*.15,zlen=.38+size*.31;
  E('wide-low-porcine-barrel',0,.74,-.13,x,.34+size*.07,zlen,M.dark);
  E('pig-wide-forward-cheek-head',0,.86,zlen*.60,.26+size*.08,.26,.29+size*.08,M.main);
  E('distinct-flat-cartilage-snout',0,.70,zlen*.60+.30,.24,.12,.17,M.light);
  pair(d=>{
   E('two-pig-nostrils-'+d,d*.12,.71,zlen*.60+.46,.045,.035,.022,M.dark);
   E('large-flopping-soft-ear-'+d,d*(.27+size*.11),1.19,zlen*.55,.13,.18,.12,M.main);
   E('dark-pig-eye-'+d,d*.25,.97,zlen*.70,.047,.055,.03,M.eye);
   for(const [j,z] of [[0,zlen*.44],[1,-zlen*.66]]){
    L('short-true-pig-leg-'+d+'-'+j,[[d*x*.83,.59,z],
     [d*x*.88,.31,z+.03],[d*x*.87,.17,z+.10]],.090,M.main);
    E('cloven-hoof-'+d+'-'+j,d*x*.88,.15,z+.18,.13,.11,.16,M.dark);
   }
  });
  if(s>=2)L('curling-spiral-tail',[[0,.81,-zlen-.17],
   [.18,1.00,-zlen-.27],[.27,1.13,-zlen-.29],[.17,1.16,-zlen-.30]],.055,M.main);
  if(s>=3)E('raised-porcine-spinal-shoulder',0,1.11,.17,.27,.14,.33,M.main);
  if(s>=5)pair(d=>cone('developed-short-boar-tusk-'+d,d*.24,.65,zlen*.62+.36,.048,.16,M.white,.4*d));
  if(s===6)E('elder-low-heavy-cheek-fold',0,.83,zlen*.71+.11,.34,.13,.17,M.light);
  if(s===7)for(let j=0;j<5;j++){const a=j*2*Math.PI/5;
    L('legend-dusk-pig-trail-'+j,[[Math.sin(a)*.27,.82,-zlen*.65],
      [Math.sin(a)*.43,.77,-zlen-.55],[Math.sin(a)*.56,.88,-zlen-.79]],.051,M.dark);}
  break;}
 case 'begu_ganjang':{
  // Strongly tall-and-thin apparition, not a horizontally scaled child.
  const height=1.88+size*1.41,rootW=.15+size*.060;
  loft('height-stretched-minimal-torso',[[.31,rootW*.60,.16,0,0],
    [.96,rootW*.67,.17,0,-.06],[1.51,rootW,.16,0,-.06],
    [height-.35,rootW*.70,.16,0,-.10]],M.dark, {});
  E('small-tall-spirit-face',0,height,.10,.20,.28,.19,M.black);
  eyes('deep-shade-eye',0,height+.035,.27,.11,M.gold);
  pair(d=>{
   L('implausibly-long-Batak-shadow-arm-'+d,[[d*.19,height-.27,0],
    [d*(.28+size*.07),height*.48,.06],[d*(.37+size*.06),.20,.16]],.043,M.dark);
   L('spindly-ground-anchored-foot-'+d,[[d*.10,.68,0],[d*.14,.19,.11],[d*.21,.11,.24]],.045,M.black);
  });
  for(let j=0;j<4+s;j++){
   const x=(j-(3+s)/2)*.064;
   L('vertical-nocturnal-column-'+j,[[x,height+.20,-.18],[x*1.27,height*.62,-.24],
     [x*1.56,.12,-.28]],.019,M.dark);
  }
  if(s>=3)pair(d=>L('lengthening-secondary-reaching-hand-'+d,
   [[d*.19,height-.28,-.06],[d*.34,height*.29,-.10],[d*.47,.12,-.24]],.033,M.main));
  if(s===6)E('older-collapsed-head-neck',0,height-.25,-.08,.23,.13,.19,M.dark);
  if(s===7)pair(d=>L('legend-extra-tall-drift-'+d,[[d*.16,height+.17,-.19],
    [d*.20,height+.66,-.25],[d*.43,height+.93,-.28]],.048,M.glow));
  break;}
 case 'bunian':{
  // Human ears and proportions. Invisibility conveyed by loose drapery, no elf ears.
  const crown=1.51+size*.33;
  loft('woven-human-fabric-robe',[[.13,.31+size*.10,.25,0,0],
   [.58,.29+size*.03,.25,0,-.05],[1.18,.24+size*.03,.21,0,0],
   [1.50,.22,.19,0,0]],M.main);
  E('natural-human-face',0,crown,.15,.24,.27,.22,M.light);
  E('real-human-rounded-nose',0,crown-.055,.345,.078,.09,.076,M.main);
  eyes('ordinary-human-eye',0,crown+.060,.328,.135,M.eye);
  E('human-mouth',0,crown-.17,.333,.10,.028,.028,M.dark);
  E('simple-headcloth-or-hair',0,crown+.22,-.08,.28,.15,.23,M.dark);
  pair(d=>{
   E('normal-rounded-human-ear-'+d,d*.24,crown,.05,.068,.10,.065,M.light);
   L('covered-human-sleeve-'+d,[[d*.23,1.40,0],
     [d*.35,.93,.08],[d*.35,.42,.17]],.068,M.main);
   E('hand-next-to-robe-'+d,d*.35,.37,.17,.087,.13,.083,M.light);
   E('human-foot-'+d,d*.16,.15,.21,.15,.12,.19,M.dark);
  });
  for(let j=0;j<4+s;j++){const x=(j-(3+s)/2)*.085;
   L('woven-robe-vertical-fold-'+j,[[x*.73,1.13,.21],
    [x,.64,.25],[x*1.25,.20,.27]],.015,j%3===0?M.gold:M.light);}
  if(s>=3)pair(d=>L('modest-mantle-flap-'+d,[[d*.24,1.33,-.16],
    [d*.36,.65,-.23],[d*.41,.31,-.24]],.052,M.dark));
  if(s===6)pair(d=>E('elder-unadorned-coat-cuff-'+d,d*.35,.46,.13,.12,.11,.10,M.light));
  if(s===7)for(let j=-1;j<=1;j++)L('legend-mist-concealment-fold-'+j,
   [[j*.27,1.50,-.37],[j*.52,1.15,-.44],[j*.62,.44,-.52]],.058,M.glow);
  break;}
 case 'hantu_banyu':{
  // Flowing water apparition, never a stock fish tail or mermaid.
  const crest=1.58+size*.20;
  loft('tapered-swirling-water-body',[[.20,.35+size*.12,.32,0,-.07],
   [.57,.28+size*.09,.28,.07,-.13],[.98,.23+size*.12,.26,-.07,-.10],
   [1.41,.26,.20,0,-.05]],M.glow);
  E('semi-submerged-humanoid-water-face',0,crest,.17,.24,.29,.21,M.main);
  eyes('water-filled-deep-eye',0,crest+.05,.345,.14,M.dark);
  E('smooth-faceless-water-chin',0,crest-.18,.29,.16,.14,.15,M.light);
  pair(d=>{
   L('waterfall-ribbon-arm-'+d,[[d*.24,1.41,-.06],
    [d*(.35+size*.12),.90,.07],[d*(.45+size*.18),.25,.25]],.093,M.glow);
   L('parallel-water-current-'+d,[[d*.21,1.21,-.18],
    [d*(.42+size*.12),.57,-.21],[d*(.58+size*.18),.10,-.31]],.055,M.light);
  });
  for(let j=0;j<4+s;j++){const x=(j-(3+s)/2)*.11;
   L('streaming-body-current-'+j,[[x*.72,1.43,-.17],
   [x,1.02,-.26],[x*1.39,.55,-.35],[x*1.64,.17-(j%2)*.07,-.45]],.028,M.glow);}
  if(s>=3)pair(d=>E('river-spray-shoulder-'+d,d*.32,1.27,-.14,.21,.15,.16,M.light));
  if(s===6)pair(d=>L('elder-wave-crest-'+d,[[d*.22,crest+.26,-.21],
   [d*.41,crest+.46,-.24],[d*.63,crest+.51,-.30]],.052,M.main));
  if(s===7)pair(d=>L('legend-cascading-arch-'+d,[[d*.30,crest+.27,-.23],
   [d*.76,crest+.72,-.31],[d*1.04,1.63,-.46]],.088,M.glow));
  break;}
 }
 // Per-phase topology distinctions appear as anatomy marks, never arbitrary horns.
 if(s===1)E('infant-identity-grain',0,.18,-.12,.080,.060,.055,M.gold);
 if(s===2)pair(d=>E('juvenile-detail-fold-'+d,d*.13,.28,-.14,.065,.08,.045,M.light));
 if(s===3)L('child-structural-crease',[[-.17,.37,-.19],[0,.30,-.22],[.17,.37,-.19]],.022,M.dark);
 if(s===4)pair(d=>L('adolescent-growth-seam-'+d,[[d*.13,.43,-.15],[d*.29,.37,-.19]],.024,M.light));
 if(s===5)E('mature-structural-marker',0,.14,-.11,.17,.053,.075,M.dark);
 if(s===6)pair(d=>E('age-weathered-mark-'+d,d*.17,.20,-.12,.09,.061,.062,M.dark));
 if(s===7)pair(d=>L('legend-local-mythic-echo-'+d,[[d*.15,.29,-.22],[d*.40,.55,-.29],[d*.51,.79,-.36]],.042,M.gold));
 root.userData={id,phase:s,rebuilt:true,sculpted:true,fictionalLifecycle:true,
  culturalOrigin:META[id].home,identity:META[id].motif,source:META[id].source};
 body.userData.NJ99={id,phase:s,primaryGeometry:'NJ99',saveUntouched:true};
 return true;
};
})();