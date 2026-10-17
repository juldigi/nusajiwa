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
 ular_naga:{tradition:'Nusantara / Taksaka motif',design:'curved serpent, swept mane, paired tendrils'}
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
 // Light ventral scutes follow the underside of the body in connected segments.
 for(let i=2;i<=25;i++){
  const t=i/30,x=path[i][0],z=path[i][2],y=path[i][1]-.105*size;
  E('individual-overlapping-ventral-scute-'+i,x,y,z,.095*size,.036*size,.070*size,belly);
 }
 // Discrete keeled scales sit on the upper flanks, rather than random decorative dots.
 for(let i=2;i<=27;i++){
  const t=i/30,p=path[i],r=.17*size*(1-t*.52);
  for(const side of [-1,1]){
   const x=p[0]+side*r*.72,y=p[1]+r*.48,z=p[2];
   E('overlapping-keeled-dorsal-scale-'+i+'-'+side,x,y,z,.058*size,.039*size,.073*size,i%3===0?gold:dark);
  }
 }
 // Head sits at the forward end; muzzle, jaw, brow and eyes have distinct anatomy.
 const hx=path[30][0],hy=path[30][1],hz=path[30][2]+.10*size;
 E('broad-reptilian-cranium',hx,hy+.12*size,hz,.32*size,.23*size,.31*size,main);
 E('elongated-blunt-muzzle',hx,hy+.035*size,hz+.28*size,.245*size,.115*size,.30*size,main);
 E('defined-lower-jaw',hx,hy-.075*size,hz+.29*size,.23*size,.055*size,.25*size,belly);
 for(const d of [-1,1]){
  E('raised-brow-ridge-'+d,hx+d*.155*size,hy+.20*size,hz+.12*size,.12*size,.055*size,.16*size,dark);
  E('amber-eye-'+d,hx+d*.205*size,hy+.145*size,hz+.22*size,.064*size,.065*size,.045*size,gold);
  E('vertical-reptile-pupil-'+d,hx+d*.213*size,hy+.145*size,hz+.258*size,.019*size,.043*size,.014*size,eye);
  E('nostril-'+d,hx+d*.105*size,hy+.045*size,hz+.515*size,.022*size,.018*size,.018*size,dark);
  // Two sensory whiskers taper away from the muzzle; curve differs by identity.
  L('sensory-whisker-'+d,[[hx+d*.19*size,hy+.02*size,hz+.28*size],
    [hx+d*.38*size,hy+.015*size,hz+.36*size],
    [hx+d*.48*size,hy+.09*size,hz+.48*size]],.018*size,gold);
 }
 // Four weight-bearing limbs emerge from the trunk for adult and legendary stages.
 if(s>=3){
  for(const z of [-.80,.06]){
   for(const d of [-1,1]){
    const x=(Math.sin((z+1.85)/3.02*Math.PI*2)*.68*coil)*size+d*.11*size;
    const shoulderY=.40*size;
    L('fore-or-hind-limb-'+z+'-'+d,[[x,shoulderY,path[Math.max(0,Math.min(30,Math.round((z+1.85)/3.02*30)))]?.[2]||z],
      [x+d*.14*size,.22*size,z+.06*size],[x+d*.19*size,.105*size,z+.13*size]],.075*size,main);
    E('three-clawed-foot-'+z+'-'+d,x+d*.19*size,.09*size,z+.16*size,.12*size,.055*size,.12*size,belly);
    for(let claw=0;claw<3;claw++)C('curved-ivory-claw-'+z+'-'+d+'-'+claw,
      x+d*(.13+claw*.06)*size,.055*size,z+(.19+claw*.035)*size,.025*size,.085*size,white,d*.12,Math.PI);
   }
  }
 }
 // Crown / mane / crest is identity-specific; all remain serpent silhouettes, not Western dragons.
 if(isBasuki){
  for(let j=0;j<9;j++){
   const t=j/8,p=path[Math.round(12+t*15)];
   C('flowing-water-crest-spine-'+j,p[0],p[1]+.20*size,p[2],.065*size,.24*size,gold,Math.sin(t*2)*.12);
  }
  if(s>=4)L('mountain-to-sea-water-halo',[[hx-.52*size,hy+.36*size,hz-.1],[hx-.25*size,hy+.56*size,hz-.2],[hx+.18*size,hy+.53*size,hz-.2],[hx+.52*size,hy+.32*size,hz-.1]],.026*size,belly);
 }else if(isAnanta){
  for(let d of [-1,1]){
   C('swept-royal-horn-'+d,hx+d*.22*size,hy+.39*size,hz-.02*size,.10*size,.39*size,gold,d*.38);
   L('crown-branch-'+d,[[hx+d*.12*size,hy+.31*size,hz],[hx+d*.23*size,hy+.52*size,hz-.04*size],[hx+d*.33*size,hy+.59*size,hz-.10*size]],.027*size,gold);
  }
  for(let j=0;j<5;j++)E('crown-jewel-'+j,hx+(j-2)*.09*size,hy+.36*size,hz+.02*size,.035*size,.045*size,.025*size,j%2?belly:gold);
  for(let j=0;j<8;j++){
   const p=path[12+j*2];
   C('royal-hood-ridge-'+j,p[0],p[1]+.17*size,p[2],.05*size,.20*size,gold,Math.sin(j)*.15);
  }
 }else{
  for(let j=0;j<11;j++){
   const p=path[12+j];
   C('swept-taksaka-mane-spine-'+j,p[0],p[1]+.19*size,p[2],.06*size,.23*size,j%2?gold:dark,Math.sin(j*.6)*.23);
  }
  for(let d of [-1,1]){
   C('paired-temple-fin-'+d,hx+d*.23*size,hy+.20*size,hz-.12*size,.11*size,.32*size,gold,d*.7);
  }
 }
 // Tail tip is lifted and differentiated by stage; it is never a detached spike.
 L('tapered-flexible-tail-tip',[path[24],path[27],path[29],[
   path[30][0]-.12*size, path[30][1]+.18*size,path[30][2]+.42*size]],.055*size,main);
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
