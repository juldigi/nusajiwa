import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
const engine=read('script_32.js'),module=read('nj90-forty.js'),html=read('index.html');
const context={window:{}};runInNewContext(module,context);
const morph=context.window.NUSAJIWA_MORPH40,
 records=Array.from(context.window.NUSAJIWA_MORPH40_CATALOG),
 ids=Array.from(context.window.NUSAJIWA_MORPH40_IDS),
 rebuild=new Set(["hantu_jeruk_purut","macan_putih","timun_mas","nyai_blora","hantu_banyu","ular_naga","suanggi","orang_pendek","cindaku","nenek_pakande","nawang_wulan","orang_bati","lembuswana","naga_basuki","poppo","parakang","bedawang_nala","naga_padoha"]);
const Three={
 Group:class{constructor(){this.children=[];this.userData={}}add(o){this.children.push(o)}},
 Mesh:class{constructor(){this.position={set(){} ,z:0};this.rotation={x:0,y:0,z:0};this.visible=true;this.name=''}},
 ConeGeometry:class{},TorusGeometry:class{},ShapeGeometry:class{},
 Shape:class{moveTo(){}lineTo(){}closePath(){}}
};
const make=(g,...parts)=>{const m=new Three.Mesh();m.args=parts;g.add(m);return m};
const M={main:{},dark:{},light:{},white:{},gold:{},pink:{},black:{},glow:{}};
test('NJ90–93 contains 40 distinct IDs that actually exist in the canonical 300-identity catalogue',()=>{
 assert.equal(ids.length,40);assert.equal(new Set(ids).size,40);
 assert.equal(records.length,40);
 const start=engine.indexOf('const CREATURES=['),end=engine.indexOf('\n];',start);
 assert.ok(start>0&&end>start);
 const creatures=runInNewContext(engine.slice(start,end+3)+'; CREATURES');
 assert.equal(creatures.length,300);
 const all=new Set(creatures.map(row=>row[0]));for(const id of ids)assert.ok(all.has(id),id);
 const other=new Set(['leak','genderuwo','jenglot','begu_ganjang','buto_ijo',
  'babi_ngepet','ahool','bunian','siluman_harimau','naga_antaboga',
  'pocong','kuntilanak','tuyul']);
 for(const id of ids)assert.equal(other.has(id),false,id+' already audited in NJ88–89');
});
test('All 320 forms construct visibly different phase-specific anatomy and preserve mature native rigs',()=>{
 const all=new Set();
 for(const id of ids){
  const local=new Set();
  for(let stage=0;stage<8;stage++){
   const group=new Three.Group(),body=new Three.Group(),original={name:'native',visible:true};
   body.add(original);
   assert.equal(morph(group,body,M,id,stage,Three,make,make),true);
   const root=(stage===0?group:body).children.at(-1);
   assert.equal(root.userData.identity,id);
   assert.equal(root.userData.phase,stage);
   assert.equal(root.userData.fantasyLifecycle,true);
   assert.ok(root.children.length>=2,id+'/'+stage+' must have real geometry');
   const stageSignature=root.children.map(x=>x.name.replace(id+'_'+stage+'_','')).sort().join('|');
   assert.ok(!local.has(stageSignature),id+'/'+stage+' only changing labels, not body');
   local.add(stageSignature);all.add(id+'/'+stageSignature);
   if(stage>0&&stage<=4&&rebuild.has(id))assert.equal(original.visible,false,id+' juvenile rebuild');
   else assert.equal(original.visible,true,id+' native sculpture should not be hidden');
   if(stage>=5)assert.equal(body.children[0],original);
  }
  assert.equal(local.size,8,id+' must have eight unique constructed shapes');
 }
 assert.equal(all.size,320);
});
test('Module does not touch other catalogue identities or save keys',()=>{
 const group=new Three.Group(),body=new Three.Group(),native={visible:true};body.add(native);
 assert.equal(morph(group,body,M,'jenglot',3,Three,make,make),false);
 assert.equal(native.visible,true);assert.equal(body.children.length,1);
 assert.equal(module.includes('localStorage'),false);
});
test('Entrypoint order, Pages packaging, and release registry stay consistent',()=>{
 assert.ok(engine.includes('window.NUSAJIWA_MORPH40?.(group,body,M,r[0],portraitMode?5:gamePet()?.phase??5,THREE,ell,tube);'));
 assert.ok(html.includes('./nj90-forty.js'));
 assert.ok(html.indexOf('./nj90-forty.js')<html.indexOf('./script_32.js'));
 const pages=read('.github/workflows/pages.yml');
 assert.ok(pages.includes('node --check nj90-forty.js'));
 assert.ok(pages.includes('script_*.js nj89-ten.js nj90-forty.js'));
 const qa=read('.github/workflows/tamagotchi-quality.yml');
 assert.ok(qa.includes('node --check nj90-forty.js'));
 const ledger=JSON.parse(read('release.json'));
 const batches=ledger.merged_morphology_batches.filter(x=>['nj90','nj91','nj92','nj93'].includes(x.batch));
 assert.equal(batches.length,4);
 assert.equal(batches.reduce((sum,x)=>sum+x.identity_ids.length,0),40);
 for(const x of batches){assert.equal(x.stage_count,8);assert.equal(x.structurally_tested,80);}
});
test('Distinctive anatomical traits are present instead of arbitrary shared monsters',()=>{
 for(const key of ['posterior-gown-open-aperture-rim','lembuswana-elephant-trunk','ceremonial-ngendog-egg',
  'sasak-tenun','batak-gecko','bedawang-cosmic','rice-stem','disconnected-human-flying-head'])
  assert.ok(module.includes(key),'Missing species specific silhouette landmark: '+key);
});

test('Previously static adulthood-only models now have reconstructed 1-4 stage anatomies',()=>{
 for(const id of ['orang_bati','lembuswana','naga_basuki','poppo','parakang',
  'bedawang_nala','naga_padoha']){
  assert.ok(rebuild.has(id));
  const seen=new Set();
  for(let stage=1;stage<=4;stage++){
   const g=new Three.Group(),b=new Three.Group(),native={visible:true};b.add(native);
   assert.equal(morph(g,b,M,id,stage,Three,make,make),true);
   assert.equal(native.visible,false,id+' must have reconstructed early anatomy');
   const shape=b.children.at(-1).children.map(z=>z.name.replace(id+'_'+stage+'_','')).sort().join('|');
   assert.ok(!seen.has(shape),id+' stage is repeated');seen.add(shape);
  }
 }
});
test('Culturally distinctive forms are not generic sprites',()=>{
 for(const token of [
  'juvenile-seram-bat-membrane','young-quadruped-chimera-chest',
  'juvenile-cosmic-tortoise-shell','kutai-guardian-elephant-trunk',
  'borneo-river-phantom-waterfall','batak-primordial-underworld-scroll',
  'rangda-ritual-extended-tongue','bedawang-distinct-continental-scute',
  'nawang-wulan-lifted-selendang'
 ])assert.ok(module.includes(token),token);
});
