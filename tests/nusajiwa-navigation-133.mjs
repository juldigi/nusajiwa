import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const file=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
test('NJ133: 3D Jelajah tab exposes visible, clearly named direct Classic32 action',()=>{
 const js=file('script_32.js');
 assert.ok(js.includes('id="nj35Classic32"'));
 assert.ok(js.includes('▶ MAIN KLASIK · 32 STAGE'));
 assert.ok(js.includes('id="nj35Adventure15"'));
 assert.ok(js.includes("if(a.id==='nj35Classic32'){nj133Launch('classic');return}"));
 assert.ok(js.includes("if(a.id==='nj35Adventure15'){nj133Launch('adventure');return}"));
 assert.ok(js.includes("else if(mode==='explore')h='<section class=\"nj133-play-choices\""));
});
test('NJ133: 3D selection carries current pet ID; navigation escapes photo mode',()=>{
 const js=file('script_32.js');
 assert.ok(js.includes('const id=record()[0];'));
 assert.ok(js.includes('state=save?.pets?.[id]||null'));
 assert.ok(js.includes('if(!state&&owned&&Number(owned.phase)>0)state={id,stage:owned.phase}'));
 assert.ok(js.includes("api.open(p,'habitat')"));
 assert.ok(js.includes("nj133ExitPhoto();let t=a.dataset.njtab"));
 assert.ok(js.includes("closeSide();sceneEl.hidden=true;"));
});
test('NJ133: main Tamagotchi game choices include a direct 32-stage button',()=>{
 const js=file('tamagotchi-3d.js');
 assert.ok(js.includes("['classic32','🎮 Main Klasik · 32 Stage'"));
 assert.ok(js.includes("if(a==='classic32'){"));
 assert.ok(js.includes("window.NUSAJIWA_CLASSIC?.open?.({...p},'habitat')"));
});
test('NJ133: Classic32 returns to habitat from direct launch and preserves older route',()=>{
 const js=file('nj123-classic.js');
 assert.ok(js.includes("function open(p,source='adventure')"));
 assert.ok(js.includes("returnTarget=source==='habitat'?'habitat':'adventure'"));
 assert.ok(js.includes("if(returnTarget==='habitat'){"));
 assert.ok(js.includes("window.NJ35?.returnTo3D?.()"));
 assert.ok(js.includes("}else window.NUSAJIWA_ADVENTURE?.open?.();"));
 assert.ok(js.includes("returnTarget==='habitat'?'Kembali ke Habitat 3D':'Kembali ke Petualangan 15 Level'"));
});
test('NJ133: entry UI stays above fold and uses accessible tappable buttons',()=>{
 const css=file('css_34.css'),html=file('index.html');
 assert.ok(css.includes('NJ133 · unambiguous'));
 assert.ok(css.includes('min-height:52px'));
 assert.match(html,/css_34\.css\?v=9\.\d+\.\d+/,'Updated UI stylesheet remains cache-busted');
 assert.ok(html.includes('tamagotchi-3d.js?v=9.13.133'));
 assert.match(html,/nj123-classic\.js\?v=9\.\d+\.\d+/,'Active Classic32 runtime must remain cache-busted');
 const ledger=JSON.parse(file('release.json'));
 assert.equal(ledger.version,'8.3');
 assert.equal(ledger.runtime.identities,300);
 assert.equal(ledger.merged_gameplay_improvements.filter(x=>x.patch==='NJ133').length,1);
});
