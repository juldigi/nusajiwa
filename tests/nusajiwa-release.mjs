import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';

const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const manifest=JSON.parse(read('release.json'));
const html=read('index.html'),adventure=read('nusajiwa-adventure.js');
const refs=[...html.matchAll(/<(?:script|link)\b[^>]*?\b(?:src|href)="(\.\/[^"]+)"/g)].map(x=>x[1].split('?')[0].slice(2));

test('Release ledger identifies the one currently merged product version',()=>{
 assert.equal(manifest.version,'8.3');
 assert.match(html,/<title>NUSAJIWA 8\.3 /);
 assert.match(adventure,/window\.NUSAJIWA_ADVENTURE=\{version:'8\.3'/);
 assert.equal(manifest.runtime.levels,15);
 assert.equal(manifest.runtime.worlds,3);
 assert.equal(manifest.runtime.identities,300);
 assert.equal(manifest.branch,'main');
 assert.ok(manifest.release_history.at(-1).version===manifest.version);
 assert.ok(manifest.release_history.every(r=>r.status==='merged'));
 assert.ok(manifest.unmerged_work.some(x=>x.name==='local-morphology-8.6'&&x.status==='NOT_MERGED'),
  'Do not misrepresent unmerged character patches as deployed');
});

test('Every script and stylesheet loads exactly once and in correct lifecycle order',()=>{
 assert.equal(new Set(refs).size,refs.length,'Repeated CSS or JS can overlay prior work');
 assert.ok(refs.every(path=>existsSync(new URL('../'+path,import.meta.url))),'Every HTML asset must exist');
 const pos=p=>refs.indexOf(p);
 assert.ok(pos('script_32.js')>=0);
 assert.ok(pos('script_33.js')>pos('script_32.js'));
 assert.ok(pos('tamagotchi-3d.js')>pos('script_32.js'));
 assert.ok(pos('nusajiwa-adventure.js')>pos('tamagotchi-3d.js'));
 assert.doesNotMatch(html,/position:fixed;right:12px;bottom:78px/,'Floating Atlas must not obstruct the pet');
});

test('Public CI never deploys without full regression suite and immutable release stamp',()=>{
 const pipeline=read('.github/workflows/pages.yml');
 assert.match(pipeline,/node --test tests\/\*\.mjs/);
 assert.match(pipeline,/Validate deployment asset references/);
 assert.match(pipeline,/cp release\.json _site\//);
 assert.match(pipeline,/build-info\.json/);
 assert.match(pipeline,/GITHUB_SHA/);
 assert.match(pipeline,/cancel-in-progress: true/);
 assert.deepEqual(manifest.persistent_keys,[
  'nusajiwa-tama-v70','nusajiwa-adventure-v1','nusajiwa-3d-signature-pets-v36'
 ]);
});
