
'use strict';
/* NUSAJIWA 1.5 • Living Forms & Species Sanctuaries
   Additive to 1.4: 8-stage species silhouettes, 8 elemental legend forms,
   species-specific habitat landmarks and interactive evolution atlas.
   Save schema unchanged; no forced stage changes or rewards. */

const NJ15_STAGE_NOTES=[
 ['Cikal Jiwa','Cangkang bertekstur khas, menyimpan asal dan potensi tiap makhluk.'],
 ['Bayi','Siluet membulat; mahkota kecil, wajah lembut, dan tanda pertama kehidupan.'],
 ['Balita','Corak tubuh muncul, kaki semakin kuat, dan hiasan awal mulai terlihat.'],
 ['Anak','Crest serta bagian tubuh khas spesies mulai berkembang.'],
 ['Remaja','Proporsi memanjang, tanduk / bulu / sisik tumbuh semakin jelas.'],
 ['Dewasa','Struktur dan corak utama mencapai bentuk paling matang.'],
 ['Tua','Warna perak, guratan waktu, dan tanda kebijaksanaan berkembang.'],
 ['Legend','Wujud fantasi terakhir berubah mengikuti satu dari delapan batu elemen.']
];
const NJ15_SPECIES_LORE={
 komodo:[
 'Telur bermotif bebatuan vulkanik; awal kisah penjaga Nusa Tenggara.',
 'Kepala membulat, pipi lembut, dan tonjolan kecil di punggung.',
 'Sisik muda mulai membentuk pola; ekor membantu menjaga keseimbangan.',
 'Deret sisik punggung dan cakar semakin jelas saat menjelajah.',
 'Tubuh memanjang, guratan sisik menguat, dan ekor bertambah tegas.',
 'Komodo penjaga berwujud kokoh dengan sisik pelindung dan moncong matang.',
 'Sisik menjadi lebih pucat; guratan kuno muncul pada punggung dan wajah.',
 'Sisik purba berubah menjadi zirah elemental; mahkota, ekor, dan aura mengikuti batu.'
 ],
 tiger:[
 'Telur jingga dengan guratan belang yang mengingatkan pada rimba Sumatra.',
 'Telinga membulat, pipi halus, dan corak lembut seperti anak harimau.',
 'Belang mungil bertambah jelas; kaki pendek mulai lincah.',
 'Pola belang tubuh bertumbuh dan gerakan ekor makin aktif.',
 'Siluet remaja lebih panjang; corak gelap serta bahu menguat.',
 'Harimau penjaga menampilkan belang matang, tatapan cerah, dan tubuh tangguh.',
 'Bulu memucat di bagian wajah; guratan kebijaksanaan menandai usia.',
 'Belang terjalin dengan energi elemen dan mahkota penjaga legenda.'
 ],
 cendrawasih:[
 'Telur lembut bernuansa langit Papua dan kilau bulu emas.',
 'Jambul halus dan sayap mungil terbentuk untuk pertama kalinya.',
 'Bulu-bulu bahu bertumbuh; warna lembut mulai berlapis.',
 'Ekor hias pendek muncul, menandai pertumbuhan sayap dan tubuh.',
 'Jambul memanjang; bulu samping menjadi lebih berlapis.',
 'Helai ekor panjang serta sayap utama membentuk siluet penuh.',
 'Ujung bulu berubah keperakan, memunculkan kesan penjaga langit tua.',
 'Sayap dan jambul terurai sebagai pita energi elemental fantasi.'
 ],
 lembuswana:[
 'Telur berhias simbol sungai dan kerajaan Kutai dalam dunia fantasi.',
 'Tanduk muda dan sayap mungil mulai muncul dari bentuk bayi.',
 'Ciri hewan gabungan mulai terlihat pada ekor, kepala, dan badan.',
 'Sayap kecil bertambah lebar, sementara tanduk dan hiasan berkembang.',
 'Sayap, tanduk, dan tubuh bersisik menjadi lebih tegas.',
 'Wujud penjaga sungai tampil penuh, dengan kilau ornamen emas.',
 'Ujung tanduk memucat dan guratan riwayat muncul di dada.',
 'Kekuatan batu membentuk mahkota dan sayap energi pada penjaga Kutai fantasi.'
 ],
 kuyang:[
 'Telur bercahaya malam, lambang awal wujud fantasi ramah keluarga.',
 'Jiwa mungil melayang dengan wajah lembut dan kilau kecil.',
 'Lingkaran cahaya serta rambut halus bertambah terlihat.',
 'Jejak cahaya membentuk sayap kabut tipis di kanan dan kiri.',
 'Jubah sukma memanjang dan ornamen bulan terbentuk.',
 'Aura ungu semakin stabil dengan corak gaib yang artistik.',
 'Pita cahaya memucat, menjadi wujud arif penjaga malam.',
 'Sayap kabut, mahkota, dan bintang-bintang berubah sesuai energi batu.'
 ],
 anoa:[
 'Telur hijau bernuansa lembah Sulawesi.',
 'Kaki pendek, telinga lembut, dan cikal tanduk tampak samar.',
 'Tanduk kecil tumbuh dan warna bulu mulai menguat.',
 'Siluet tubuh lebih kokoh, kaki serta tanduk berkembang.',
 'Tanduk memanjang dan garis tubuh menjadi lebih mantap.',
 'Anoa penjaga memiliki tanduk matang serta kaki kuat.',
 'Ujung tanduk dan bagian wajah memucat bersama usia.',
 'Tanduk penjaga memantulkan energi batu dalam wujud fantasi.'
 ],
 maleo:[
 'Telur bercorak pasir hangat dan hutan Sulawesi.',
 'Sayap kecil dan jambul awal tampak di balik kepala.',
 'Bulu sayap tumbuh, dada membulat, dan kaki mulai lincah.',
 'Jambul lebih tegak dan ujung ekor lebih tegas.',
 'Sayap remaja memanjang dengan lapisan warna yang jelas.',
 'Wujud dewasa memiliki jambul khas dan bulu pelindung matang.',
 'Lapisan bulu terlihat keperakan seperti terkena cahaya waktu.',
 'Jambul dan ekor berubah menjadi hiasan elemen yang bercahaya.'
 ],
 bekantan:[
 'Telur dengan tekstur sungai dan rimbun Kalimantan.',
 'Pipi membulat, telinga halus, dan muka mungil.',
 'Ekor makin lentur dan corak wajah mulai muncul.',
 'Rambut bahu, ekor, dan hidung fantasi berkembang.',
 'Tubuh lebih jenjang dengan wajah dan ekor yang matang.',
 'Wujud dewasa memiliki corak cokelat-hangat khas penjaga rimba.',
 'Rambut wajah memucat, tanda usia dan pengalaman bertambah.',
 'Makhluk legenda tampil dengan mahkota serta ornamen batu terpilih.'
 ]
};
const NJ15_ANATOMY={
 komodo: {body:[173,169],face:[268,146],crest:[269,89],back:[158,111],tail:[79,176],kind:'reptile'},
 tiger: {body:[172,177],face:[271,149],crest:[275,85],back:[160,122],tail:[64,157],kind:'mammal'},
 cendrawasih:{body:[181,178],face:[226,124],crest:[225,65],back:[133,125],tail:[177,240],kind:'bird'},
 maleo:{body:[177,177],face:[225,120],crest:[228,68],back:[132,132],tail:[115,187],kind:'bird'},
 lembuswana:{body:[179,175],face:[267,138],crest:[268,79],back:[149,125],tail:[61,157],kind:'myth'},
 kuyang:{body:[182,156],face:[181,120],crest:[181,62],back:[132,133],tail:[177,230],kind:'spirit'},
 anoa:{body:[171,175],face:[271,144],crest:[273,75],back:[160,125],tail:[80,164],kind:'mammal'},
 bekantan:{body:[176,175],face:[267,141],crest:[265,86],back:[159,119],tail:[66,146],kind:'mammal'}
};
function nj15Star(x,y,r,fill='#ffe5af'){
 return `<path d="M${x} ${y-r}q2 ${r-3} ${r} ${r}q${-r+3} 2 ${-r} ${r}q-2 ${-r+3} ${-r} ${-r}q${r-3} -2 ${r} ${-r}Z" fill="${fill}"/>`;
}
function nj15BodyMarkings(kind,body,phase){
 const [x,y]=body;const color=phase===6?'#faf0d9':phase===7?'#f9e4a9':phase<=2?'#ffefce':'#e5c99d';
 const c=phase===6?'.70':'.45';
 const marks=kind==='bird'?
   `<path d="M${x-27} ${y-18}q23-15 48 0M${x-19} ${y-6}q19-10 37 0M${x-11} ${y+7}q12-8 26 0" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" opacity="${c}"/>`:
   kind==='reptile'?Array.from({length:8},(_,i)=>`<path d="M${x-46+(i%4)*26} ${y-26+Math.floor(i/4)*19}l8-5 8 6-8 5Z" fill="${color}" opacity="${c}"/>`).join(''):
   kind==='spirit'?`<circle cx="${x}" cy="${y-5}" r="22" stroke="${color}" stroke-width="1.5" stroke-dasharray="2 6" fill="none" opacity=".6"/>`:
   `<path d="M${x-35} ${y-17}q27-16 57 2m-49 18q23-12 43 0" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" opacity="${c}"/>`;
 return marks;
}
function nj15EarlyStage(p,a){const s=p.phase,[hx,hy]=a.face,[cx,cy]=a.crest,[bx,by]=a.body;
 if(s===1){
  const tuft=a.kind==='reptile'?`<path d="M${cx-18} ${cy+24}l5-9 7 6 5-12 7 13" fill="none" stroke="#d8c79e" stroke-width="3"/>`:a.kind==='bird'?`<path d="M${cx-8} ${cy+16}q-11-23 0-31l12 28q4-30 17-34l-7 38" fill="#f8e0a8" stroke="#9c794e" stroke-width="2"/>`:a.kind==='spirit'?nj15Star(cx,cy-2,15,'#ebc8ff'):`<path d="M${cx-14} ${cy+20}q-11-23-3-33l13 20 12-26q12 18 4 33" fill="#f3d4a4" stroke="#9d815c" stroke-width="2.5"/>`;
  return `${tuft}<path d="M${bx-43} ${by+34}Q${bx-28} ${by+4} ${bx} ${by+10}Q${bx+37} ${by+5} ${bx+43} ${by+33}Q${bx+11} ${by+53} ${bx-43} ${by+34}Z" fill="#fff3d9" fill-opacity=".17" stroke="#f5dfae" stroke-opacity=".4" stroke-width="2"/><ellipse cx="${hx-18}" cy="${hy+31}" rx="10" ry="5" fill="#f3a3a2" opacity=".65"/><ellipse cx="${hx+16}" cy="${hy+31}" rx="9" ry="5" fill="#f3a3a2" opacity=".42"/>${nj15Star(hx-38,hy-24,7)}`;
 }
 if(s===2){
  const smallCrest=a.kind==='reptile'?`<path d="M${cx-18} ${cy+20}l3-8 7 6 5-10 7 13" fill="none" stroke="#b6b997" stroke-width="3"/>`:a.kind==='bird'?`<path d="M${cx-11} ${cy+29}Q${cx-17} ${cy-16} ${cx-7} ${cy-10}L${cx} ${cy+19}Q${cx+8} ${cy-22} ${cx+16} ${cy-12}L${cx+10} ${cy+30}" fill="#efd5a6" opacity=".72" stroke="#b18d5a" stroke-width="2"/>`:
      a.kind==='mammal'?`<path d="M${cx-20} ${cy+23}q-19-20-12-28l18 15m30 13q13-31 24-25l-14 31" fill="#e7d6b7" opacity=".7"/>`:
      `<path d="M${cx-16} ${cy+22}l-7-26 16 15 10-23 13 34" fill="#f8dcac" opacity=".72"/>`;
  return `${smallCrest}${nj15BodyMarkings(a.kind,a.body,2)}${nj15Star(bx-58,by-45,5,'#ffebc5')}`;
 }
 if(s===3){
  const developing=a.kind==='bird'?`<g class="nj-tail"><path d="M${bx-38} ${by+11}Q${bx-66} ${by+76} ${bx-90} ${by+88}Q${bx-59} ${by+56} ${bx-26} ${by+26}" fill="#b8dec0" fill-opacity=".67" stroke="#8cb39a" stroke-width="2"/></g>`:
   a.kind==='spirit'?`<path d="M${bx-59} ${by+17}q-30 26-18 52 19-19 44-24m85-28q30 24 18 52-19-19-44-24" fill="#d1a9ff" fill-opacity=".28" stroke="#f5ddff" stroke-opacity=".5" stroke-width="2"/>`:
   `<path d="M${bx-52} ${by-24}l-15-16 5 27 14 10m64-25 9-24 11 30-12 15" fill="#e6ce9d" fill-opacity=".45" stroke="#ebd8b9" stroke-opacity=".6" stroke-width="2"/>`;
  return `${developing}${nj15BodyMarkings(a.kind,a.body,3)}${a.kind==='reptile'?'':`<path d="M${cx-21} ${cy+25}q14-25 21-27 12 10 19 31" fill="none" stroke="#f6e7be" stroke-width="3" stroke-opacity=".68"/>`}`;
 }
 if(s===4){
  const matureCrest=a.kind==='reptile'?'':a.kind==='bird'?`<path d="M${cx-12} ${cy+30}Q${cx-28} ${cy-32} ${cx-9} ${cy-20}L${cx+3} ${cy+12}Q${cx+22} ${cy-44} ${cx+38} ${cy-26}L${cx+15} ${cy+35}" fill="#f7deb0" fill-opacity=".65" stroke="#bc9a66" stroke-width="2.3"/>`:
   a.kind==='mammal'?`<path d="M${cx-31} ${cy+42}Q${cx-48} ${cy+4} ${cx-43} ${cy-12}L${cx-25} ${cy+14}M${cx+25} ${cy+41}Q${cx+47} ${cy+1} ${cx+36} ${cy-12}L${cx+16} ${cy+16}" fill="none" stroke="#f4deab" stroke-width="7" stroke-linecap="round" stroke-opacity=".69"/>`:
   `<path d="M${cx-32} ${cy+33}l-25-29 25 5-4-37 35 32 26-34 0 36 28-14-17 36" fill="#ecd39b" fill-opacity=".5" stroke="#e8c38f" stroke-width="2"/>`;
  return `${matureCrest}${nj15BodyMarkings(a.kind,a.body,4)}<path d="M${bx-48} ${by-33}q32-23 59 0" fill="none" stroke="#f4ddaf" stroke-width="3" stroke-opacity=".57"/>`;
 }
 if(s===5){
  const adult=a.kind==='bird'?`<g class="nj-tail"><path d="M${bx-47} ${by+10}Q${bx-88} ${by+90} ${bx-106} ${by+104}Q${bx-65} ${by+78} ${bx-18} ${by+24}" fill="#e0d49b" opacity=".72" stroke="#9fbaac" stroke-width="2"/><path d="M${bx+41} ${by+15}q52 88 79 100q-53-31-90-87" fill="#90c9bb" opacity=".65"/></g>`:
  a.kind==='spirit'?`<path d="M${bx-68} ${by+13}q-37 25-22 73 37-28 61-44m93-29q38 25 23 73-37-28-61-44" fill="#c9a6f2" fill-opacity=".32" stroke="#eddbff" stroke-opacity=".54" stroke-width="2"/>`:
  `<path d="M${bx-45} ${by-20}Q${bx-30} ${by-54} ${bx-8} ${by-36}Q${bx+11} ${by-58} ${bx+31} ${by-31}" fill="none" stroke="#f9e7b9" stroke-width="5" stroke-opacity=".38" stroke-linecap="round"/>`;
  return `${adult}${nj15BodyMarkings(a.kind,a.body,5)}${a.kind==='reptile'?'':`<path d="M${cx-25} ${cy+27}q22-27 48 0" fill="none" stroke="#f8e4bb" stroke-width="4" stroke-opacity=".62"/>`}`;
 }
 if(s===6){
  const elder=a.kind==='reptile'?`<path d="M${bx-30} ${by-38}q30-11 58-1" stroke="#cfd6b9" stroke-width="5" fill="none" opacity=".55"/>`:a.kind==='bird'?`<path d="M${cx-27} ${cy+27}Q${cx-37} ${cy-44} ${cx-21} ${cy-50}L${cx} ${cy+7}Q${cx+12} ${cy-63} ${cx+36} ${cy-40}L${cx+19} ${cy+27}" fill="none" stroke="#f5eee0" stroke-width="5" stroke-linecap="round" opacity=".9"/>`:
   a.kind==='spirit'?`<path d="M${bx-66} ${by+11}Q${bx-95} ${by+35} ${bx-78} ${by+94}M${bx+66} ${by+11}Q${bx+95} ${by+35} ${bx+78} ${by+94}" stroke="#f3e4fc" stroke-width="9" stroke-opacity=".5" fill="none" stroke-linecap="round"/>`:
   `<path d="M${cx-22} ${cy+29}Q${cx-53} ${cy-38} ${cx-30} ${cy-45}L${cx-12} ${cy+5}M${cx+24} ${cy+29}Q${cx+59} ${cy-37} ${cx+39} ${cy-47}L${cx+12} ${cy+7}" fill="none" stroke="#f0e8d9" stroke-width="6" stroke-linecap="round" opacity=".83"/>`;
  return `${elder}${nj15BodyMarkings(a.kind,a.body,6)}<path d="M${hx-32} ${hy+31}q17-3 29 8m28-8q17-2 30 8" fill="none" stroke="#f3f0e5" stroke-width="3" stroke-linecap="round" opacity=".88"/>${nj15Star(bx-45,by-35,8,'#e9f3ec')}`;
 }
 return '';
}
function nj15ElementForm(p,a){
 const element=p.legend||'fire';const stone=STONES[element]||STONES.fire;
 const accent=stone.aura;const [cx,cy]=a.crest,[bx,by]=a.body,[tx,ty]=a.tail;
 let anatomy='';
 switch(element){
 case 'fire': anatomy=`<path d="M${cx-40} ${cy+28}Q${cx-65} ${cy-20} ${cx-17} ${cy-62}Q${cx-31} ${cy-10} ${cx-4} ${cy-33}Q${cx+16} ${cy-75} ${cx+42} ${cy-29}Q${cx+29} ${cy-35} ${cx+22} ${cy+31}Z" fill="#f6b761" fill-opacity=".56" stroke="#ffe0a6" stroke-width="2"/><path d="M${tx-15} ${ty}q-34-44-16-78 8 30 29 27 17-29 18-42 23 50 0 88" fill="#fa9860" opacity=".58"/>`; break;
 case 'water': anatomy=`<path d="M${cx-36} ${cy+19}Q${cx-76} ${cy-5} ${cx-72} ${cy-53}Q${cx-35} ${cy-43} ${cx-22} ${cy-9}Q${cx+15} ${cy-59} ${cx+45} ${cy-39}Q${cx+41} ${cy-6} ${cx+35} ${cy+19}Z" fill="#97e9fa" fill-opacity=".4" stroke="#c0faff" stroke-width="2"/><path d="M${bx-75} ${by+12}q-34-43-9-78 4 33 31 41m107 38q34-43 9-78-4 33-31 41" fill="none" stroke="#a8e8f6" stroke-width="8" stroke-linecap="round" opacity=".65"/>`;break;
 case 'wind': anatomy=`<path d="M${bx-44} ${by-9}Q${bx-112} ${by-66} ${bx-126} ${by-118}Q${bx-65} ${by-100} ${bx-11} ${by-19}M${bx+36} ${by-12}Q${bx+94} ${by-66} ${bx+110} ${by-119}Q${bx+60} ${by-108} ${bx+6} ${by-19}" fill="#b5f1da" fill-opacity=".36" stroke="#deffed" stroke-width="2"/><path d="M${tx} ${ty}q-45-15-68-48" fill="none" stroke="#b1ebd3" stroke-width="7" opacity=".72"/>`;break;
 case 'diamond': anatomy=`<path d="M${cx-41} ${cy+17}L${cx-53} ${cy-31} ${cx-22} ${cy-67} ${cx+5} ${cy-23} ${cx+31} ${cy-72} ${cx+61} ${cy-24} ${cx+37} ${cy+19}Z" fill="#bfcffd" fill-opacity=".45" stroke="#f4fbff" stroke-width="2"/><path d="M${bx-74} ${by-14}l-20-34 19-38 23 41Zm137-8 19-35-18-41-23 44Z" fill="#a6b9ed" fill-opacity=".6" stroke="#e8ecff" stroke-width="2"/>`;break;
 case 'nature': anatomy=`<path d="M${cx-16} ${cy+21}q-12-45-40-64m38 27q-43-33-47-70m45 50q38-42 46-70m-32 82q37-20 52-58" fill="none" stroke="#b6e4ac" stroke-width="10" stroke-linecap="round" opacity=".8"/><path d="M${bx-59} ${by-33}q-37-30-50-12 18 30 51 24m96-14q37-30 50-12-18 30-51 24" fill="#8bcda1" fill-opacity=".8"/>`;break;
 case 'shadow': anatomy=`<path d="M${bx-18} ${by-17}Q${bx-130} ${by-120} ${bx-101} ${by-6}Q${bx-86} ${by-48} ${bx-30} ${by-2}M${bx+18} ${by-17}Q${bx+130} ${by-120} ${bx+101} ${by-6}Q${bx+86} ${by-48} ${bx+30} ${by-2}" fill="#9d83cb" fill-opacity=".49" stroke="#d5c2fa" stroke-width="2"/><circle cx="${cx}" cy="${cy-39}" r="27" fill="#b8a5df" opacity=".45"/><circle cx="${cx+10}" cy="${cy-46}" r="27" fill="#172333"/>`;break;
 case 'thunder': anatomy=`<path d="M${cx-46} ${cy+21}l11-57-22 3 32-52-1 39 29-12-19 50m32-2 20-56-24 8 34-51-2 38 24-12-24 52" fill="#ffe29a" fill-opacity=".7" stroke="#fff3c3" stroke-width="2"/><path d="M${bx-72} ${by-18}l-29-27 10 32-22 22m182-28 29-27-10 32 22 22" fill="none" stroke="#f7d879" stroke-width="7" opacity=".72"/>`;break;
 case 'spirit': anatomy=`<ellipse cx="${cx}" cy="${cy-31}" rx="55" ry="34" stroke="#ffd0f4" stroke-width="2" stroke-dasharray="5 8" fill="none" opacity=".77"/><path d="M${bx-62} ${by-17}Q${bx-110} ${by-87} ${bx-127} ${by-20}Q${bx-97} ${by+1} ${bx-65} ${by+17}M${bx+62} ${by-17}Q${bx+110} ${by-87} ${bx+127} ${by-20}Q${bx+97} ${by+1} ${bx+65} ${by+17}" fill="#f4b8eb" fill-opacity=".27" stroke="#ffe2f8" stroke-width="2"/>`;break;
 }
 const pearl=Array.from({length:8},(_,i)=>{const ang=i*Math.PI/4,rx=bx+Math.cos(ang)*112,ry=by+Math.sin(ang)*100;return nj15Star(rx.toFixed(1),ry.toFixed(1),i%2?5:7,accent);}).join('');
 return `<g class="nj15-element-body" style="--nj15-glow:${accent}">${anatomy}${pearl}<circle cx="${bx}" cy="${by-8}" r="20" fill="${accent}" fill-opacity=".17" stroke="${accent}" stroke-opacity=".6" stroke-width="2"/><path d="M${bx} ${by-23}l11 15-11 15-11-15Z" fill="${accent}" fill-opacity=".76" stroke="#fff6dc" stroke-width="1.5"/></g>`;
}
function nj15SpeciesSignature(p,a){
 const [cx,cy]=a.crest,[bx,by]=a.body,s=p.phase;
 if(s<3)return '';
 switch(p.species){
 case 'komodo':return `<g opacity="${s===3?.25:.48}">${Array.from({length:s>=5?8:5},(_,i)=>`<path d="M${bx-65+i*17} ${by-40-Math.sin(i/7*Math.PI)*7}l4 -${4+(s>=5?2:0)} 6 8Z" fill="#435b45" stroke="#798c69" stroke-width=".8"/>`).join('')}</g>`;
 case 'tiger':return `<g opacity="${s>=5?.65:.34}"><path d="M${bx-43} ${by-25}q9-14 17-15m19 13q13-16 18-15m29 23q10-10 19-15" fill="none" stroke="#382f36" stroke-width="5" stroke-linecap="round"/></g>`;
 case 'cendrawasih':return `<g class="nj-wing"><path d="M${bx-54} ${by-12}q-44 -69-76-66 30 55 65 80m86-24q44-69 76-66-30 55-65 80" fill="#88dcc9" fill-opacity="${s>=5?.65:.36}" stroke="#e0e9b7" stroke-width="2"/></g>`;
 case 'maleo':return `<path d="M${cx-20} ${cy+18}q-7-42 2-56l16 13 8-25 15 26 7-12q9 32-4 56" fill="#f7e0b0" fill-opacity="${s>=5?.72:.46}" stroke="#99876b" stroke-width="2"/>`;
 case 'lembuswana':return `<g class="nj-wing"><path d="M${bx-30} ${by-23}Q${bx-110} ${by-105} ${bx-133} ${by-94}Q${bx-109} ${by-21} ${bx-48} ${by+7}m83-29Q${bx+110} ${by-105} ${bx+133} ${by-94}Q${bx+109} ${by-21} ${bx+48} ${by+7}" fill="#eee4bb" fill-opacity="${s>=5?.65:.35}" stroke="#f6e6b6" stroke-width="2"/></g>`;
 case 'kuyang':return `<path d="M${bx-16} ${by+42}Q${bx-61} ${by+117} ${bx-25} ${by+104}L${bx} ${by+73}Q${bx+24} ${by+118} ${bx+41} ${by+102}L${bx+16} ${by+42}" fill="#d8adff" fill-opacity="${s>=5?.40:.22}" stroke="#f5daff" stroke-opacity=".66" stroke-width="2"/>`;
 case 'anoa':return `<path d="M${cx-19} ${cy+38}Q${cx-30} ${cy-28} ${cx-16} ${cy-47}Q${cx+1} ${cy-41} ${cx+6} ${cy+39}M${cx+13} ${cy+38}Q${cx+38} ${cy-30} ${cx+29} ${cy-52}Q${cx+8} ${cy-31} ${cx-1} ${cy+39}" fill="#f3e6ce" fill-opacity="${s>=5?.75:.47}" stroke="#f5ebd1" stroke-width="2"/>`;
 case 'bekantan':return `<path d="M${cx-6} ${cy+29}Q${cx+1} ${cy+57} ${cx+17} ${cy+74}Q${cx+39} ${cy+53} ${cx+23} ${cy+29}" fill="#e3ab7b" fill-opacity="${s>=5?.8:.46}" stroke="#b67960" stroke-width="2"/>`;
 }
 return '';
}
function nj15Komodo(p){
 const stage=p.phase,old=stage>=6,young=stage<=2;
 const moss=old?'#8c9788':'#647e63',deep=old?'#57665b':'#344a3b',copper=old?'#b4b8a2':'#a6ad83';
 const scaly=Array.from({length:66},(_,i)=>{
   const col=i%11,row=Math.floor(i/11),x=115+col*12+(row%2)*5,y=152+row*10;
   const f=((x-177)/87)**2+((y-178)/48)**2;
   if(f>1)return '';
   return `<ellipse cx="${x}" cy="${y}" rx="${2.5+(i%3)*.4}" ry="${1.7+(i%2)*.35}" fill="${i%4===0?'#e2daa8':'#294d3f'}" opacity="${i%4===0?.27:.33}"/>`;
 }).join('');
 const ridges=Array.from({length:10},(_,i)=>{
   const x=108+i*15,ty=135-Math.sin(i/9*Math.PI)*13;
   return `<path d="M${x-5} ${ty+9}l${3} -${5+(stage>=4?3:0)} 6 ${5+(stage>=4?3:0)}Z" fill="${deep}" opacity=".85"/>`;
 }).join('');
 const eyeR=young?7:5.5;
 return `<svg viewBox="0 0 360 300" role="img" aria-label="Komodo fantasi bergaya ilustrasi, ${PHASES[stage]}">
 <defs><radialGradient id="nj15kSkin" cx=".3" cy=".1" r=".95"><stop stop-color="#d5d2a4"/><stop offset=".28" stop-color="${copper}"/><stop offset=".61" stop-color="${moss}"/><stop offset="1" stop-color="${deep}"/></radialGradient><linearGradient id="nj15kJaw" x1="0" x2=".55" y1="0" y2="1"><stop stop-color="#ddd2a7"/><stop offset="1" stop-color="#8a957c"/></linearGradient><linearGradient id="nj15kTail" x1="0" x2="0" y1="0" y2="1"><stop stop-color="#809879"/><stop offset="1" stop-color="#314b3b"/></linearGradient><radialGradient id="nj15kEye"><stop stop-color="#f7e9a2"/><stop offset=".65" stop-color="#b78a42"/><stop offset="1" stop-color="#473d2d"/></radialGradient><clipPath id="nj15kBodyClip"><path d="M95 155Q124 122 193 128Q252 129 267 160Q271 203 208 221Q145 228 102 202Q84 188 95 155Z"/></clipPath></defs>
 <g transform="translate(180 153) scale(${young?.86:stage===3?.94:stage>=6?1.04:1}) translate(-180 -153)">
 <ellipse cx="179" cy="263" rx="115" ry="10" fill="#061c1c" opacity=".22"/>
 <g class="nj-tail"><path d="M108 169Q68 166 39 151Q20 142 17 128Q50 140 71 134Q88 130 116 147L151 165Z" fill="url(#nj15kTail)" stroke="#405346" stroke-width="4"/><path d="M111 172Q71 164 41 149" fill="none" stroke="#cad2a3" stroke-width="3" opacity=".28"/></g>
 <path d="M123 197Q108 219 103 250Q120 264 144 253L157 212m76-11q15 24 16 51 22 15 43-2l-23-66" fill="url(#nj15kSkin)" stroke="#445746" stroke-width="4" stroke-linejoin="round"/>
 <path d="M104 248l-17 8 16 4m16-6-7 11m24-12 0 11m131-13 8 11m-20-11 0 12m-10-15-8 10" fill="none" stroke="#dfdab8" stroke-width="3" stroke-linecap="round"/>
 <path d="M95 155Q124 122 193 128Q252 129 267 160Q271 203 208 221Q145 228 102 202Q84 188 95 155Z" fill="url(#nj15kSkin)" stroke="#4b5b49" stroke-width="4"/>
 <g clip-path="url(#nj15kBodyClip)">${scaly}<path d="M109 187Q167 220 250 191Q235 217 193 220Q129 219 109 187Z" fill="url(#nj15kJaw)" opacity=".66"/></g>
 ${ridges}
 <path d="M234 142Q252 111 282 121Q310 124 319 150L333 161Q343 173 329 188Q311 199 273 195Q247 192 229 168Z" fill="url(#nj15kSkin)" stroke="#52614c" stroke-width="4"/>
 <path d="M259 167Q288 177 331 167Q338 179 321 189Q293 197 268 186Z" fill="url(#nj15kJaw)" opacity=".9"/>
 <path d="M258 124q20-16 44 7" stroke="#e6daa9" stroke-width="4" fill="none" opacity=".58" stroke-linecap="round"/>
 <ellipse class="nj-blink" cx="286" cy="144" rx="${eyeR+2}" ry="${eyeR+2.4}" fill="#34483c"/><ellipse cx="286" cy="144" rx="${eyeR}" ry="${eyeR+1}" fill="url(#nj15kEye)"/><path d="M286 ${137-(young?1:0)}q-3 7 0 14q3-7 0-14" fill="#1c2b29"/><circle cx="284" cy="141" r="2.1" fill="#fff1d2"/>
 <path d="M278 131q8-4 16 0" stroke="#314c3d" stroke-width="3" fill="none"/><ellipse cx="323" cy="165" rx="3" ry="2.5" fill="#405247"/><path d="M285 187Q308 191 327 184" fill="none" stroke="#56624f" stroke-width="2.3" stroke-linecap="round"/>
 <g fill="#e9e2bb" opacity=".23"><circle cx="243" cy="157" r="4"/><circle cx="250" cy="169" r="3"/><circle cx="265" cy="177" r="3.5"/></g>
 </g></svg>`;
}

const nj15PrevPetSVG=petSVG;
petSVG=function(p,small=false){
 const base=p?.species==='komodo'&&p.phase>0?nj15Komodo(p):nj15PrevPetSVG(p,small);
 if(!p||p.phase===0||!NJ15_ANATOMY[p.species]||!base)return base;
 const a=NJ15_ANATOMY[p.species];const s=p.phase;
 const scale=s===1?.77:s===2?.83:s===3?.90:s===4?.97:s===5?1.02:s===6?1.05:1.1;
 const ornaments=`<g class="nj15-stage-morph nj15-stage-${s}" transform="translate(180 150) scale(${scale}) translate(-180 -150)">${nj15SpeciesSignature(p,a)}${s===7?nj15ElementForm(p,a):nj15EarlyStage(p,a)}</g>`;
 return base.replace(/<\/svg>\s*$/,ornaments+'</svg>');
};

/* A different landmark silhouette for each playable character, not just biomes. */
function nj15Landmark(species){
 const trunk='#10272d',jade='#23504a',sand='#cbb48a';
 switch(species){
 case 'tiger':return `<g opacity=".77"><path d="M0 850V250q78-47 137-158v235q81-46 114-138-19 164-163 259V850ZM1200 850V245q-79-36-125-144v234q-86-43-117-127 20 167 159 248V850Z" fill="${trunk}"/><g fill="${jade}"><path d="M104 412q-93-130-48-182 96 65 97 143m-6 102q54-155 122-145-11 119-122 164M1081 443q86-132 37-185-94 66-97 149m12 84q-43-148-116-130 27 107 115 130"/></g></g>`;
 case 'komodo':return `<g opacity=".78"><path d="M0 850V697l162-96 96 55 151-132 114 87 158-87 104 100 160-107 115 96 140-76V850Z" fill="#3b373a"/><path d="M0 850V774l218-40 154 31 201-63 183 64 169-53 275 57V850Z" fill="#62504c"/><path d="M366 850l22-115 28-13 21 128m478 0 36-116 21-13 19 129" fill="#957361"/></g>`;
 case 'cendrawasih':return `<g opacity=".72"><path d="M0 850V500Q188 443 339 351Q203 501 0 579M1200 850V522Q1061 463 901 344Q1011 505 1200 604" fill="none" stroke="${trunk}" stroke-width="36" stroke-linecap="round"/><g fill="#3e7769"><path d="M110 535Q49 390 98 322q94 80 88 146M241 461q-12-160 80-202 32 102-36 187m798 91q61-145 12-213-94 80-88 146M960 465q12-160-80-202-32 102 36 187"/></g></g>`;
 case 'maleo':return `<g opacity=".77"><path d="M0 850V690q194-78 345-13 130-85 264-25 202-95 321-22 156-61 270-9V850Z" fill="#6d574c"/><ellipse cx="235" cy="738" rx="86" ry="30" fill="#bc9c73"/><ellipse cx="975" cy="725" rx="101" ry="34" fill="#bc9c73"/><path d="M125 718q63-63 119-17m658 3q62-53 127-18" fill="none" stroke="#dec6a1" stroke-width="8"/></g>`;
 case 'lembuswana':return `<g opacity=".65"><path d="M0 850V707Q283 666 548 710T1200 710V850Z" fill="#225d64"/><path d="M0 754Q284 707 548 750T1200 752" fill="none" stroke="#a5caba" stroke-width="5" opacity=".56"/><path d="M76 650V373l72-84 77 84v277m773 0V373l72-84 77 84v277" stroke="#c6a16e" stroke-width="13" fill="none"/><path d="M64 379l84-102 90 102m747 0 85-102 90 102" fill="none" stroke="#ead1a0" stroke-width="7"/></g>`;
 case 'kuyang':return `<g opacity=".8"><path d="M76 850V560Q197 423 279 299Q211 511 167 850M1145 850V560Q1004 423 930 299Q1008 511 1054 850" fill="#192443"/><g fill="#6a65a4" opacity=".50"><circle cx="165" cy="365" r="11"/><circle cx="1027" cy="413" r="13"/><circle cx="128" cy="518" r="8"/><circle cx="1080" cy="549" r="8"/></g></g>`;
 case 'anoa':return `<g opacity=".80"><path d="M0 850V664l150-130 100 72 87-138 144 155 120-87 125 107 104-116 154 121 116-44V850Z" fill="#243d3b"/><path d="M0 850V756l172-61 168 48 177-77 169 75 194-65 320 75V850Z" fill="#42675a"/><g fill="#6d9780"><ellipse cx="252" cy="748" rx="92" ry="24"/><ellipse cx="982" cy="736" rx="118" ry="27"/></g></g>`;
 case 'bekantan':return `<g opacity=".77"><path d="M0 850V719Q252 671 545 718T1200 707V850Z" fill="#19515b"/><path d="M0 755Q260 709 550 756T1200 743" fill="none" stroke="#9ccab3" stroke-width="4" opacity=".6"/><path d="M60 850V362q43 25 113 13-83 61-79 148m1050 327V360q-43 27-113 15 83 61 79 148" fill="none" stroke="#183e39" stroke-width="27" stroke-linecap="round"/><g fill="#3e7660"><path d="M128 458q-113-87-90-177 85 30 124 129m861 43q109-87 90-177-85 30-124 129"/></g></g>`;
 default:return '';
 }
}
const nj15PrevScenery=scenery;
scenery=function(key){let s=nj15PrevScenery(key);if(!NJ15_ANATOMY[key])return s;
 const layer=`<div class="nj15-landscape" aria-hidden="true"><svg viewBox="0 0 1200 850" preserveAspectRatio="xMidYMid slice">${nj15Landmark(key)}</svg></div>`;
 return s.replace(/<\/div>\s*$/,layer+'</div>');};

/* Evolution Atlas — one actual usable interface, previews never mutate save state. */
let nj15SelectedStage=0,nj15AtlasOpen=false,nj15PreviewElement='fire';
function nj15AtlasPreview(p,phase){return {...p,phase,legend:phase===7?(nj15PreviewElement||p.legend||chosenStone||'fire'):null};}
function nj15AtlasHTML(){const p=current();if(!p)return '';
 const cur=nj15SelectedStage; const active=p.phase;
 const preview=nj15AtlasPreview(p,cur);const future=cur>active;const alternate=cur===7&&!!p.legend&&preview.legend!==p.legend;
 const note=NJ15_STAGE_NOTES[cur];
 const list=PHASES.map((phase,i)=>{
 const acquired=i<=active;const chosen=i===cur;
 return `<button type="button" class="nj15-phase-card ${acquired?'acquired':'future'} ${chosen?'on':''}" data-nj15="stage" data-stage="${i}" aria-label="${phase}, ${acquired?'terbuka':'pratinjau'}" aria-pressed="${chosen?'true':'false'}"><span class="nj15-card-no">${String(i+1).padStart(2,'0')}</span><span class="nj15-card-sigil">${i===0?'◉':i===7?'✶':i===6?'☼':i===5?'✤':i===4?'❖':i===3?'✦':i===2?'◈':'◇'}</span><b>${phase}</b><small>${acquired?'Ditemukan':'Belum dicapai'}</small></button>`;}).join('');
 const stone=STONES[preview.legend];
 const label=cur===7?(stone?.name||'Ritual Legend'):note[0];
 const lore=NJ15_SPECIES_LORE[p.species]?.[cur]||note[1];
 const elements=cur!==7?'':`<div class="nj15-element-zone"><span>JALUR ELEMEN · PILIH PRATINJAU</span><div class="nj15-element-picks">${Object.entries(STONES).map(([id,v])=>`<button type="button" data-nj15="element" data-element="${id}" class="${id===preview.legend?'chosen':''}" title="${escapeHTML(v.name)}" aria-pressed="${id===preview.legend}">${v.icon}</button>`).join('')}</div></div>`;
 return `<div class="nj15-atlas" role="group" aria-label="Kitab Wujud"><div class="nj15-atlas-kicker">✦ NUSAJIWA · KITAB EVOLUSI ✦</div><h2>Delapan Wujud Jiwa</h2><p class="nj15-atlas-lead">${escapeHTML(SPECIES[p.species].name)} · ${escapeHTML(SPECIES[p.species].origin)} · setiap fase mempunyai ciri visualnya sendiri.</p><div class="nj15-atlas-grid"><div class="nj15-atlas-hero"><span class="nj15-atlas-index">BAB ${cur+1} / 8 ${future?'· PRATINJAU':'· TERBUKA'}</span><div class="nj15-atlas-pet">${creatureView(preview)}</div><div class="nj15-atlas-milestone"><h3>${PHASES[cur]}</h3><small>${label}</small></div></div><div class="nj15-atlas-insight"><span class="nj15-atlas-heading">PERUBAHAN FISIK</span><p>${escapeHTML(lore)}</p>${elements}<div class="nj15-atlas-trait"><b>Identitas:</b> ${escapeHTML(SPECIES[p.species].nickname)}</div><div class="nj15-atlas-trait"><b>Status:</b> ${future?'Pratinjau konsep — belum diperoleh':alternate?'Pratinjau jalur alternatif · tidak mengganti Legend':cur===active?'Tahap makhlukmu sekarang':'Tahap yang telah dilewati'}</div>${cur===7?`<div class="nj15-atlas-trait"><b>Elemen:</b> ${escapeHTML(stone?.name||'Batu Api Purba')}</div>`:''}<div class="nj15-atlas-tip">${future?'Bentuk ini merupakan pratinjau. Rawat sahabatmu untuk membuka fase tersebut.':alternate?'Ini hanya simulasi cabang lain. Legend aslimu tetap menggunakan batu yang sudah dipilih.':cur===7?'Legenda telah terbangkitkan. Pilihan batu menentukan ciri akhir.':'Kisah pertumbuhan terekam dalam progres sahabatmu.'}</div><div class="nj15-atlas-controls"><button data-nj15="previous" ${cur===0?'disabled':''}>← Sebelumnya</button><button data-nj15="next" ${cur===7?'disabled':''}>Berikutnya →</button></div></div></div><div class="nj15-atlas-heading">JEJAK PERTUMBUHAN</div><div class="nj15-stage-strip">${list}</div><p class="nj15-atlas-footer">Keterangan: Semua bentuk evolusi elemental adalah fantasi. Data fauna dan cerita budaya tersedia terpisah di Kodex.</p></div>`;
}
function nj15OpenAtlas(stage){if(!current())return toast('Pilih telur pertama dahulu.');nj15SelectedStage=Math.max(0,Math.min(7,Number.isFinite(stage)?stage:current().phase));nj15AtlasOpen=true;nj15PreviewElement=current().legend||chosenStone||'fire';showModal(nj15AtlasHTML());const pane=document.querySelector('.modal-pane');if(pane)pane.classList.add('nj15-atlas-pane');}
function nj15RefreshAtlas(){const pane=document.querySelector('.modal-pane');if(!pane)return;const atlas=pane.querySelector('.nj15-atlas');if(!atlas)return;atlas.outerHTML=nj15AtlasHTML();const strip=pane.querySelector('.nj15-stage-strip');const card=pane.querySelector('.nj15-phase-card.on');if(strip&&card&&strip.scrollWidth>strip.clientWidth){const x=card.offsetLeft-strip.offsetLeft-(strip.clientWidth-card.clientWidth)/2;strip.scrollLeft=x;}pane.scrollTop=0;}
const nj15PrevCloseModal=closeModal;
closeModal=function(){nj15AtlasOpen=false;nj15PrevCloseModal();};
const nj15PrevHome=home;
home=function(){let h=nj15PrevHome();if(!current())return h;
 h=h.replace(/<div class="nj12-brand">[\s\S]*?<\/div>/,'').replace(/<div class="nj13-stage-label">[\s\S]*?<\/div>/,'').replace(/<div class="nj13-home-plaque">[\s\S]*?<\/div>/,'').replace(/<div class="nj13-biome-chip">[\s\S]*?<\/div>/,'');
 const row='<button class="nj15-atlas-entry" type="button" data-nj15="atlas" aria-label="Lihat delapan fase evolusi">✧ <span>Kitab Evolusi</span> <small>8 Wujud →</small></button>';
 h=h.replace(/(<div class="hero-sub">[\s\S]*?<\/div>)/,'$1'+row);
 return h;
};
document.addEventListener('click',e=>{const button=e.target.closest('[data-nj15]');if(!button)return;e.preventDefault();e.stopImmediatePropagation();const cmd=button.dataset.nj15;if(cmd==='atlas')nj15OpenAtlas(current()?.phase||0);else if(cmd==='element'){if(STONES[button.dataset.element]){nj15PreviewElement=button.dataset.element;nj15RefreshAtlas();}}else if(cmd==='stage'){nj15SelectedStage=Math.max(0,Math.min(7,+button.dataset.stage));nj15RefreshAtlas();}else if(cmd==='next'||cmd==='previous'){nj15SelectedStage=Math.max(0,Math.min(7,nj15SelectedStage+(cmd==='next'?1:-1)));nj15RefreshAtlas();}},true);
document.addEventListener('keydown',e=>{if(!nj15AtlasOpen)return;if(!document.querySelector('.nj15-atlas'))return;if(e.key==='Escape'){closeModal();return;}if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();nj15SelectedStage=Math.max(0,Math.min(7,nj15SelectedStage+(e.key==='ArrowRight'?1:-1)));nj15RefreshAtlas();}},true);

/* Update the 1.4 reaction names; old actions are "clean" and "sleep". */
const nj15PrevReaction=nj14Reaction;
nj14Reaction=function(action){nj15PrevReaction(action==='clean'?'wash':action==='sleep'?'rest':action);};

/* Post 1.4 evolution scene includes a guide to the new visual atlas. */
const nj15PrevEvolution=showEvolution;
showEvolution=function(p){nj15PrevEvolution(p);const card=document.querySelector('.nj14-evolution');if(card){const b=card.querySelector('button[data-action="close"]');if(b)b.insertAdjacentHTML('beforebegin','<button class="nj15-evolution-link" data-nj15="atlas" type="button">Lihat garis evolusi lengkap →</button>');}};

const nj15PrevSettings=settingsModal;
settingsModal=function(){nj15PrevSettings();const pane=document.querySelector('.modal-pane');if(!pane)return;pane.querySelectorAll('p').forEach(el=>{if(el.textContent.includes('NUSAJIWA 1.4')||el.textContent.includes('Animation Flagship Pass'))el.textContent='NUSAJIWA 1.5 · Living Forms. Delapan fase dengan ciri morfologi khas, variasi Legend berdasar delapan batu, Kitab Evolusi interaktif, dan lingkungan khusus tiap makhluk. Save lama tetap kompatibel.';});};

const nj15CSS=`
.nj15-landscape{position:absolute;inset:0;z-index:1;pointer-events:none;opacity:.87;mix-blend-mode:normal}
.nj15-landscape svg{width:100%;height:100%;object-fit:cover}
.nj12-brand,.nj13-stage-label{display:none!important}
.nj15-atlas-entry{display:inline-flex;align-items:center;gap:8px;padding:7px 14px;margin-top:10px;background:linear-gradient(180deg,rgba(12,44,59,.82),rgba(6,31,43,.8));border:1px solid rgba(239,201,143,.48);color:#ffe2ac;box-shadow:0 10px 24px rgba(0,0,0,.24),inset 0 1px 0 rgba(255,255,255,.05);border-radius:999px;font-size:11px;letter-spacing:.5px;backdrop-filter:blur(10px)}
.nj15-atlas-entry small{font-size:10px;color:#f3d6a0}
.nj15-atlas-entry:hover,.nj15-atlas-entry:focus-visible{background:linear-gradient(180deg,rgba(28,82,103,.94),rgba(10,53,72,.88));border-color:#f0d79b}
.nj15-atlas-pane{width:min(95vw,920px)!important;max-width:920px!important;max-height:92dvh!important;overflow:auto!important;padding:clamp(17px,3vw,30px)!important;background:linear-gradient(160deg,#102d3bf7,#061c2bf9 65%,#071a26fc)!important}
.nj15-atlas{text-align:center;min-width:0;color:#ffefce}
.nj15-atlas-kicker,.nj15-atlas-heading{font-size:10px;letter-spacing:2.4px;text-transform:uppercase;font-weight:800;color:#eecb91}
.nj15-atlas h2{font:400 clamp(27px,4vw,40px) Marcellus,serif;color:#fff5da;margin:5px 0 8px}
.nj15-atlas-lead{margin:0 auto 18px;color:#d7e0d8;font-size:12px;line-height:1.5;max-width:550px}
.nj15-atlas-grid{display:grid;grid-template-columns:minmax(0,1.18fr) minmax(0,1fr);gap:18px;text-align:left;margin-bottom:22px}
.nj15-atlas-hero{position:relative;min-height:300px;padding:16px;border:1px solid rgba(244,218,159,.34);background:radial-gradient(circle at 50% 35%,rgba(155,188,168,.22),transparent 51%),linear-gradient(165deg,rgba(31,82,90,.71),rgba(8,31,45,.86));border-radius:24px;display:flex;align-items:center;justify-content:center;flex-direction:column;overflow:hidden;box-shadow:inset 0 1px 0 rgba(255,255,255,.06),0 15px 35px rgba(0,0,0,.23)}
.nj15-atlas-hero:before{content:'';position:absolute;inset:20%;border-radius:50%;border:1px solid rgba(240,215,148,.16);box-shadow:0 0 0 24px rgba(239,209,145,.025),inset 0 0 28px rgba(255,255,255,.04);pointer-events:none}
.nj15-atlas-index{align-self:flex-start;position:absolute;top:17px;left:18px;z-index:3;font-size:10px;letter-spacing:1px;color:#f2daaa;font-weight:700}
.nj15-atlas-pet{display:flex;align-items:center;justify-content:center;width:min(100%,330px);height:238px;position:relative;z-index:1}
.nj15-atlas-pet .creature-wrap{width:100%;height:100%;animation:nj14Breath 4.4s ease-in-out infinite}
.nj15-atlas-pet svg{width:100%;height:100%;overflow:visible;filter:drop-shadow(0 14px 17px rgba(0,0,0,.28))}
.nj15-atlas-milestone{z-index:2;text-align:center;position:absolute;bottom:12px}
.nj15-atlas-milestone h3{font:400 24px Marcellus,serif;margin:0 0 3px;color:#fff6e2}
.nj15-atlas-milestone small{font-size:11px;color:#f0d7a8}
.nj15-atlas-insight{padding:16px 16px 14px;border:1px solid rgba(242,217,168,.20);border-radius:22px;background:linear-gradient(180deg,rgba(28,60,72,.54),rgba(12,37,53,.43));display:flex;flex-direction:column}
.nj15-atlas-insight p{font-size:13px;line-height:1.65;color:#f1e6cd;margin:12px 0 16px}
.nj15-atlas-trait{font-size:11px;line-height:1.55;padding:9px 0;border-top:1px solid rgba(255,233,186,.14);color:#dae4db}
.nj15-atlas-trait b{color:#f1d7a1}
.nj15-atlas-tip{font-size:11px;line-height:1.5;color:#f5e1b3;opacity:.82;padding-top:12px}
.nj15-atlas-controls{display:flex;gap:9px;margin-top:auto;padding-top:18px}
.nj15-atlas-controls button{flex:1;border:1px solid rgba(241,212,151,.37);background:linear-gradient(180deg,rgba(36,84,96,.75),rgba(18,53,68,.75));border-radius:12px;padding:10px 8px;color:#fae7bf;font-size:11px;font-weight:700}
.nj15-atlas-controls button:disabled{opacity:.32;cursor:not-allowed}
.nj15-stage-strip{display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:7px;margin:12px 0 14px}
.nj15-phase-card{min-width:0;display:flex;flex-direction:column;align-items:center;gap:4px;padding:11px 3px;border-radius:15px;border:1px solid rgba(242,217,168,.19);background:linear-gradient(180deg,rgba(29,68,79,.63),rgba(10,34,49,.71));color:#e6d5b8;cursor:pointer}
.nj15-phase-card.on{border-color:#f2d69e;box-shadow:0 0 0 1px rgba(242,214,158,.3),inset 0 0 16px rgba(245,204,142,.1);background:linear-gradient(180deg,rgba(68,94,92,.88),rgba(18,53,66,.92));color:#fff2d6}
.nj15-phase-card.future{opacity:.56}
.nj15-card-no{font-size:9px;color:#c9ad7e;letter-spacing:1px}
.nj15-card-sigil{font-family:Marcellus,serif;font-size:21px;height:26px;color:#efd49d}
.nj15-phase-card b{font-size:10px;white-space:nowrap}
.nj15-phase-card small{font-size:8px;line-height:1.2;color:#d4c3a5}
.nj15-atlas-footer{font-size:10px;line-height:1.5;margin:7px auto 0;color:#b7c6c5;max-width:630px}

.nj15-element-zone{border-top:1px solid rgba(255,228,177,.18);padding-top:12px;margin:0 0 8px}
.nj15-element-zone>span{font-size:9px;letter-spacing:1.5px;color:#edcb8e;font-weight:700}
.nj15-element-picks{display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:4px;margin-top:9px}
.nj15-element-picks button{aspect-ratio:1;min-width:0;border-radius:10px;border:1px solid rgba(242,216,162,.22);background:linear-gradient(180deg,rgba(36,80,93,.55),rgba(9,38,53,.55));color:#f9e9cd;font-size:18px;padding:3px 0;display:grid;place-items:center;filter:saturate(.78)}
.nj15-element-picks button.chosen{border-color:#f9e3ad;background:linear-gradient(180deg,rgba(73,97,92,.94),rgba(20,60,71,.9));box-shadow:0 0 0 1px rgba(249,227,173,.27),inset 0 0 13px rgba(255,235,184,.1);filter:saturate(1)}

.nj15-evolution-link{width:100%;margin-bottom:12px;padding:10px;background:transparent;border:1px solid rgba(245,213,153,.37);border-radius:13px;color:#f7dca2;font-size:12px;font-weight:700}
.nj15-evolution-link:hover{background:rgba(255,236,174,.07)}
@media(max-width:680px){.nj15-atlas-grid{grid-template-columns:1fr;gap:10px}.nj15-atlas-hero{min-height:254px}.nj15-atlas-pet{height:187px;margin-top:-8px}.nj15-atlas-insight{padding:12px 13px}.nj15-atlas-insight p{margin:9px 0;font-size:12px}.nj15-atlas-controls{padding-top:12px}.nj15-stage-strip{display:flex;overflow:auto;scroll-snap-type:x mandatory;scrollbar-width:none;gap:7px;padding:2px 1px 8px}.nj15-stage-strip::-webkit-scrollbar{display:none}.nj15-phase-card{flex:0 0 76px;scroll-snap-align:center}.nj15-atlas h2{font-size:28px}.nj15-atlas-lead{font-size:11px}.nj15-atlas-pane{width:min(98vw,520px)!important;padding:16px 13px!important;border-radius:21px!important}}
@media(max-height:720px){.nj15-atlas-pane{max-height:88dvh!important}.nj15-atlas-hero{min-height:214px}.nj15-atlas-pet{height:177px}}
@media(prefers-reduced-motion:reduce){.nj15-atlas-pet .creature-wrap,.pet-spot .creature-wrap,.pet-spot svg .nj-tail,.pet-spot svg .nj-wing{animation:none!important}}
`;
const nj15Style=document.createElement('style');nj15Style.dataset.module='living15.css';nj15Style.textContent=nj15CSS;document.head.appendChild(nj15Style);
document.title='NUSAJIWA — The Living Legends | Living Forms 1.5';
render();

