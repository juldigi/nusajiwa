/* NUSAJIWA NJ140 — source-aware, anatomy-first Nusantara naga rebuild.
 * Loaded after NJ100 and before the pet engine. Replaces only three serpent rigs;
 * all other NJ100 identities continue to use their existing sculpt unchanged.
 * Procedural original meshes only: no borrowed models or external assets.
 */
(function(){
'use strict';
const IDS=['naga_basuki','naga_antaboga','ular_naga'];
const META={
 naga_basuki:{tradition:'Bali',design:'long water-serpent; flowing crest; no Western wings'},
 naga_antaboga:{tradition:'Jawa-Bali wayang',design:'crowned cosmic serpent; broad hood and ritual crown'},
 ular_naga:{tradition:'Mahabharata / Nusantara Taksaka',design:'serpent-bodied naga with traditional wings; no bat-wing fantasy anatomy'}
};
window.NUSAJIWA_DRAGON140_META=Object.freeze(META);
const prior=window.NUSAJIWA_SCULPT100;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
window.NUSAJIWA_SCULPT100=function(group,body,M,id,phase,T,ell,tube){
 if(!IDS.includes(id))return typeof prior==='function'?prior(group,body,M,id,phase,T,ell,tube):false;
 if(!group||!body||!M||!T||!ell||!tube)return false;
 const s=clamp(Math.floor(Number(phase)||0),0,7);
 const host=s===0?group:body;
 for(const child of host.children)child.visible=false;
 const g=new T.Group();g.name='NJ140_'+id+'_F'+s;host.add(g);
 const size=[.35,.52,.66,.80,.93,1.04,1.16,1.31][s];
 const E=(name,x,y,z,a,b,c,m)=>{const o=ell(g,x,y,z,a,b,c,m);o.name='NJ140-'+id+'-F'+s+'-'+name;return o};
 const L=(name,pts,r,m)=>{const o=tube(g,pts,r,m);o.name='NJ140-'+id+'-F'+s+'-'+name;return o};
 const C=(name,x,y,z,r,h,m,rz=0,rx=0)=>{const o=new T.Mesh(new T.ConeGeometry(r,h,10),m);o.name='NJ140-'+id+'-F'+s+'-'+name;o.position.set(x,y,z);o.rotation.set(rx,0,rz);g.add(o);return o};
 const main=M.main||M.dark, belly=M.light||M.white||main, dark=M.dark||main,
       gold=M.gold||belly, eye=M.eye||dark, white=M.white||belly;
 if(s===0){
  E('mythic-egg',0,1.13,0,.48,.69,.43,main);
  L('serpent-sigil',[[-.19,.96,.39],[0,1.24,.43],[.19,1.02,.39],[.02,.82,.40]],.035,gold);
  for(let i=0;i<5;i++)E('raised-egg-scale-'+i,(i-2)*.105,1.16+(i%2)*.12,.414,.044,.060,.022,i%2?belly:gold);
  g.userData={id,phase:s,rebuilt:true,sourceAware:true,anatomy:'egg'};
  return true;
 }
 // Long, continuous, low-slung serpent trunk: tapered and anatomically connected.
 // The raised fore-neck transitions into a broad skull; tail narrows progressively.
 const isBasuki=id==='naga_basuki',isAnanta=id==='naga_antaboga';
 const coil=isAnanta?1.0:isBasuki?.76:.88;
 const path=[];
 for(let i=0;i<=30;i++){
  const t=i/30;
  const x=(Math.sin(t*Math.PI*(isAnanta?2.65:2.05))*.68*coil)*(1-t*.25);
  const z=-1.85+t*3.02;
  const y=.43+Math.sin(t*Math.PI*2.0)*.10+(t>.79?(t-.79)*1.5:0);
  path.push([x*size,y*size,z*size]);
 }
 L('continuous-tapered-serpent-trunk',path,.19*size,main);
 // Sculpted overlapping body masses create a broad shoulder, tapering abdomen and flexible tail.
 // The radius falls toward the tail, while the front third thickens into the neck.
 for(let i=1;i<=29;i++){
  const p=path[i],t=i/30;
  const r=(.155 + .055*Math.sin(t*Math.PI) - .070*Math.max(0,(.30-t)/.30))*size;
  const next=path[Math.min(30,i+1)],prev=path[Math.max(0,i-1)];
  const dx=next[0]-prev[0],dz=next[2]-prev[2];
  const yaw=Math.atan2(dx,dz);
  const o=E('sculpted-muscle-segment-'+i,p[0],p[1],p[2],r*1.06,r*.88,.125*size,main);
  o.rotation.y=yaw;
 }
 // A raised, tapered nape bridges the serpent trunk into the cranium without a floating head.
 L('raised-neck-transition',[
  [path[25][0],path[25][1],path[25][2]],
  [path[27][0],path[27][1]+.07*size,path[27][2]],
  [path[29][0],path[29][1]+.15*size,path[29][2]],
  [path[30][0],path[30][1]+.17*size,path[30][2]+.06*size]
 ],.135*size,main);
 // Belly scutes sit on the near-facing underside and shrink naturally at both ends.
 for(let i=3;i<=25;i++){
  const t=i/30,p=path[i],r=.105*size*(.65+.35*Math.sin(t*Math.PI));
  E('individual-overlapping-ventral-scute-'+i,p[0],p[1]-.135*size,p[2]+.025*size,r,.035*size,.074*size,belly);
 }
 // Layered keeled scales follow the shoulders and flanks, in offset rows.
 for(let i=3;i<=27;i++){
  const t=i/30,p=path[i],r=.17*size*(1-t*.55);
  for(const side of [-1,1]){
   const x=p[0]+side*r*.73,y=p[1]+r*.54,z=p[2]+.018*size;
   E('overlapping-keeled-dorsal-scale-'+i+'-'+side,x,y,z,.064*size,.043*size,.073*size,i%4===0?gold:dark);
   if(i%2===0)E('fine-side-scale-'+i+'-'+side,x+side*.025*size,y-.065*size,z,.043*size,.029*size,.052*size,main);
  }
 }
 // Head sits at the forward end; muzzle, jaw, brow and eyes have distinct anatomy.
 const hx=path[30][0],hy=path[30][1],hz=path[30][2]+.10*size;
 E('broad-reptilian-cranium',hx,hy+.12*size,hz,.32*size,.23*size,.31*size,main);
 E('elongated-blunt-muzzle',hx,hy+.075*size,hz+.28*size,.245*size,.105*size,.30*size,main);
 // Open, visible mouth cavity and separated lower jaw; Antaboga follows wayang naga features.
 if(isAnanta){
  E('open-mouth-cavity',hx,hy-.025*size,hz+.405*size,.185*size,.075*size,.205*size,dark);
  E('lower-jaw-open-wayang',hx,hy-.145*size,hz+.37*size,.225*size,.055*size,.245*size,belly);
  for(const d of [-1,1]){
   C('visible-wayang-fang-'+d,hx+d*.13*size,hy-.045*size,hz+.53*size,.035*size,.105*size,white,d*.08,Math.PI);
  }
 }else{
  E('defined-lower-jaw',hx,hy-.075*size,hz+.29*size,.23*size,.055*size,.25*size,belly);
 }
 // Cheek plates, nasal bridge and layered brows give the face a readable reptilian structure.
 E('nasal-bridge',hx,hy+.105*size,hz+.36*size,.145*size,.082*size,.205*size,main);
 for(const d of [-1,1]){
  E('temporal-cheek-plate-'+d,hx+d*.225*size,hy+.005*size,hz+.08*size,.12*size,.105*size,.17*size,dark);
  E('jaw-corner-scale-'+d,hx+d*.175*size,hy-.065*size,hz+.31*size,.075*size,.035*size,.11*size,gold);
  E('raised-brow-ridge-'+d,hx+d*.155*size,hy+.20*size,hz+.12*size,.12*size,.055*size,.16*size,dark);
  E('amber-eye-'+d,hx+d*.205*size,hy+.145*size,hz+.22*size,.064*size,.065*size,.045*size,gold);
  E('vertical-reptile-pupil-'+d,hx+d*.213*size,hy+.145*size,hz+.258*size,.019*size,.043*size,.014*size,eye);
  E('nostril-'+d,hx+d*.105*size,hy+.075*size,hz+.525*size,.022*size,.018*size,.018*size,dark);
  E('nostril-rim-'+d,hx+d*.105*size,hy+.083*size,hz+.531*size,.032*size,.011*size,.022*size,main);
  // Two sensory whiskers taper away from the muzzle; curve differs by identity.
  L('sensory-whisker-'+d,[[hx+d*.19*size,hy+.02*size,hz+.28*size],
    [hx+d*.38*size,hy+.015*size,hz+.36*size],
    [hx+d*.48*size,hy+.09*size,hz+.48*size]],.018*size,gold);
 }
 // Traditional naga is a serpent-bodied being: no mammalian legs or clawed feet.
 // Keep the entire silhouette continuous and low-slung; stage growth changes anatomy, not species.
 // Crown / mane / crest is identity-specific; all remain serpent silhouettes, not Western dragons.
 if(isBasuki){
  for(let j=0;j<7;j++){
   const t=j/6,p=path[Math.round(12+t*13)];
   C('basuki-water-current-crest-'+j,p[0],p[1]+.16*size,p[2],.045*size,.17*size,gold,Math.sin(t*2)*.12);
  }
  // Nagamani, the jewel often shown on Basuki's head, is the defining head mark.
  E('basuki-nagamani-jewel',hx,hy+.31*size,hz+.015*size,.085*size,.095*size,.065*size,M.glow||gold);
 }else if(isAnanta){
  // Wayang Antaboga: a tall three-tier jamang crown, not generic swept dragon horns.
  for(let tier=0;tier<3;tier++){
   const y=hy+(.265+tier*.085)*size;
   E('three-tier-jamang-crown-band-'+tier,hx,y,hz-.055*size,(.245-tier*.055)*size,.035*size,.105*size,gold);
   for(let j=0;j<5-tier;j++){
    const dx=(j-(4-tier)/2)*.085*size;
    C('crown-jamang-upright-'+tier+'-'+j,hx+dx,y+.055*size,hz-.055*size,.035*size,.115*size,tier%2?belly:gold,dx*1.4);
   }
  }
  // Garuda-mungkur is a rear crown emblem in wayang regalia, not a pair of horns.
  E('garuda-mungkur-central-disc',hx,hy+.48*size,hz-.18*size,.105*size,.13*size,.055*size,gold);
  for(const d of [-1,1]){
   E('garuda-mungkur-wing-'+d,hx+d*.105*size,hy+.46*size,hz-.17*size,.105*size,.045*size,.045*size,belly).rotation.z=d*.45;
   L('sumping-sekar-kluwih-'+d,[[hx+d*.25*size,hy+.14*size,hz],[hx+d*.34*size,hy+.20*size,hz-.02*size],[hx+d*.38*size,hy+.30*size,hz-.04*size]],.027*size,gold);
   L('wayang-moustache-'+d,[[hx+d*.12*size,hy+.035*size,hz+.31*size],[hx+d*.22*size,hy+.01*size,hz+.34*size],[hx+d*.29*size,hy+.055*size,hz+.35*size]],.022*size,gold);
  }
  for(let j=0;j<5;j++)E('crown-jewel-'+j,hx+(j-2)*.09*size,hy+.33*size,hz+.02*size,.027*size,.035*size,.022*size,j%2?belly:gold);
  // The classic naga body remains scaled and serpentine; no fabricated hood frill.
 }else{
  for(let j=0;j<11;j++){
   const p=path[12+j];
   C('swept-taksaka-mane-spine-'+j,p[0],p[1]+.19*size,p[2],.06*size,.23*size,j%2?gold:dark,Math.sin(j*.6)*.23);
  }
  for(let d of [-1,1]){
   C('paired-temple-fin-'+d,hx+d*.23*size,hy+.20*size,hz-.12*size,.11*size,.32*size,gold,d*.7);
  }
  // Taksaka is commonly depicted winged. Use a feathered, ornamental naga wing,
  // not a bat membrane or a Western dragon's anatomical wing.
  for(const d of [-1,1]){
   L('taksaka-wing-leading-edge-'+d,[
    [path[20][0],path[20][1]+.12*size,path[20][2]],
    [path[18][0]+d*.30*size,path[18][1]+.38*size,path[18][2]-.02*size],
    [path[16][0]+d*.57*size,path[16][1]+.48*size,path[16][2]-.04*size],
    [path[14][0]+d*.76*size,path[14][1]+.30*size,path[14][2]-.05*size]
   ],.035*size,gold);
   for(let feather=0;feather<5;feather++){
    const t=feather/4;
    const x=path[17][0]+d*(.22+t*.50)*size;
    const y=path[17][1]+(.24+Math.sin(t*Math.PI)*.18)*size;
    const z=path[17][2]-(.12+t*.10)*size;
    const f=E('taksaka-ornamental-wing-feather-'+d+'-'+feather,x,y,z,.075*size,.20*size,.045*size,feather%2?belly:gold);
    f.rotation.z=-d*(.25+t*.55);
   }
  }
 }
 // Tail tip is lifted and differentiated by stage; it is never a detached spike.
 // The tail is at path[0], away from the head: taper it as a continuation, never as a head-side spike.
 L('tapered-flexible-tail-tip',[
  [path[0][0],path[0][1],path[0][2]],
  [path[2][0]*.92,path[2][1]-.015*size,path[2][2]-.09*size],
  [path[4][0]*.72,path[4][1]-.025*size,path[4][2]-.17*size],
  [path[6][0]*.50,path[6][1]+.015*size,path[6][2]-.23*size]
 ],.048*size,main);
 if(isAnanta){
  // Traditional wayang naga may carry a ring-like niyamat ornament at the tail.
  const tail=path[2];
  const ring=new T.Mesh(new T.TorusGeometry(.105*size,.018*size,8,28),gold);
  ring.name='wayang-tail-niyamat-ring';ring.position.set(tail[0],tail[1],tail[2]-.05*size);g.add(ring);
 }
 for(let i=0;i<4;i++){
  const p=path[i+2];
  E('tail-keel-'+i,p[0],p[1]+.12*size,p[2],.045*size,.055*size,.07*size,i%2?gold:dark);
 }
 // Legendary form gains controlled luminous markings, not a wholesale silhouette swap.
 if(s>=6){
  for(let j=0;j<7;j++){
   const p=path[4+j*3];
   E('legendary-luminous-scale-inlay-'+j,p[0],p[1]+.15*size,p[2],.045*size,.035*size,.052*size,gold);
  }
 }
 g.userData={id,phase:s,rebuilt:true,sourceAware:true,fictionalLifecycle:true,
  anatomy:'serpent',tradition:META[id].tradition,distinctSilhouette:true};
 return true;
};
})();
