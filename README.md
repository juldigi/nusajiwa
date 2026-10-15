# NUSAJIWA · Tamagotchi 3D Nusantara

**Versi 8.3 — Tamagotchi 3D × Jelajah Evolusi (15 level / 3 dunia), kendali responsif, efek interaktif, dan Kodex Nusantara.**

Main: https://juldigi.github.io/nusajiwa/
Atlas: https://juldigi.github.io/nusajiwa/atlas-evolusi.html

## Cara bermain

- Pilih satu makhluk berbeda di Suaka dan tetaskan telurnya.
- Kontrol ala Tamagotchi: A memilih, B mengonfirmasi, C kembali. Ikon diatur menjadi dua baris dengan area sentuh lebih besar untuk iPhone.
- Sediakan makanan utama atau camilan. Mainkan Tebak Arah dan Jejak Nusantara, bersihkan toilet, obati saat sakit, ajari disiplin dan matikan lampu saat tidur.
- Pantau indikator empat hati untuk lapar, senang, kedisiplinan dan kesehatan. Tumpukan kotoran, tanda sakit, dan panggilan sahabat divisualisasikan pada habitat 3D tanpa menimpa anatomi karakter. Ada kesalahan asuh, umur, berat fantasi dan album kenangan.
- Pertumbuhan mengikuti waktu, kondisi perawatan dan pengalaman (XP) dari mesin 3D sebelumnya. Sistem delapan fase tetap dipertahankan, dan legenda terkait batu elemen.
- Kebutuhan tetap berubah ketika game ditutup, maksimal 12 jam per pembaruan agar ketidakhadiran sangat lama tidak memberi penalti tanpa batas.
- Kodex menjadi ikon tersendiri di konsol permainan. Membaca entri baru bersama sahabat memberi hadiah satu kali (+6 XP & +5 Jiwa) serta mengisi jurnal. Sumber ensiklopedia dapat diperiksa; fantasi 3D dipisahkan dari fakta fauna dan tradisi.
- Setelah akhir siklus kehidupan, pemain dapat mengawali telur generasi baru dari spesies yang sama. Album Kenangan dipertahankan.
- Cadangan dari menu Pengaturan mencakup data Tamagotchi, 3D dan save klasik jika tersedia.

## 🎮 Jelajah Evolusi · Rimba Sumatra, Tanah Jawa & Rimba Kalimantan (8.3)

- Pada habitat Tamagotchi, tekan ikon **Main → Jelajah Evolusi**. Untuk memulai, tetaskan telur dan pastikan sahabat sedang bangun dan sehat.
- Mode platformer memakai **arena 3D dengan gerakan 2.5D** menggunakan Three.js/WebGL. Apabila tidak tersedia, terdapat gambar 2D fallback dengan fisika dan level yang sama. Ini adalah platformer orisinal yang terinspirasi genre konsol klasik, bukan replika Mario Nintendo.
- **World 1 Rimba Sumatra (5 level)**: Gerbang Rimba, Sungai Berliku, Hutan Berkabut, Gua Tersembunyi, dan Ujian Penjaga Rimba.
- **World 2 Tanah Jawa (5 level baru)**: Lereng Gunung Api, Teras Sawah, Aliran Batu, Lorong Candi, dan Penjaga Gerbang Batu. World 2 terbuka setelah level kelima World 1 tuntas. Arsitektur dan ornamen Jawa di sini adalah desain fantasi, bukan rekonstruksi situs sejarah.
- **World 3 Rimba Kalimantan (5 level baru)**: Danau Kabut, Akar Raksasa, Tebing Embun, Sungai Hitam, dan Gerbang Hutan Hujan. World 3 terbuka setelah menyelesaikan World 2, dan memperkenalkan zona hembusan angin/arus yang menggeser pemain dengan gaya terkendali. Level terakhir membutuhkan tiga segel untuk membuka gerbang; bukan penggambaran sebuah ritual nyata. Lingkungan merupakan interpretasi fantasi hutan hujan, bukan replika bangunan atau lanskap budaya tertentu.
- Gerakan: ◀ / ▶ (iPhone) atau ← / → (desktop); lompat ↑ / Spasi; kemampuan khusus ✦ / X; jeda Ⅱ / Escape. Kamera mengikuti karakter, termasuk pada mode potret dan lanskap.
- **Karakter yang aktif di Tamagotchi adalah karakter yang bermain**. Avatar 3D dicoba mengambil klon dari geometri 3D pet asli; jika belum tersedia, tampil model 3D sederhana berdasarkan tipe kemampuan. Replika model belum diuji secara visual pada seluruh 300 identitas.
- Kategori kemampuan awal: Harimau (lari kilat), burung/rangkong (lompat kedua), Kuyang/jenis melayang (melayang), dan sisanya dorongan lompat. Ini adalah prototipe gameplay; karakter unik lainnya membutuhkan penyesuaian kemampuan individual.
- Seluruh lima belas level menyediakan Jiwa, rintangan, dua checkpoint, tiga nyawa, batu elemen tersembunyi, gerbang akhir dan nilai bintang. Level Jawa dan Kalimantan memiliki penjaga bergerak. Final World 2 merupakan **ujian penjaga gerbang non-kekerasan**: pemain harus menyentuh ketiga segel batu sebelum gerbang terbuka. Progres, skor terbaik dan batu tersimpan **per identitas pet**.
- Menamatkan level pertama kali menghadiahkan XP serta Jiwa ke **penyimpanan 3D pet yang sama**; batu elemen dikreditkan pada inventaris evolusi 3D jika ditemukan (sekali per level dan pet). Main ulang mendapat hadiah kecil maksimum sekali per hari, untuk menghindari farming XP tanpa batas.
### Pembaruan gameplay 8.2

- **Animasi responsif:** karakter petualangan 3D memperoleh gerakan berlari, bob tubuh, kemiringan lompat, perubahan pose saat di udara, serta artikulasi anggota badan yang diberi nama pada rig asli. Efek visual juga ditampilkan pada mode 2D jika WebGL tidak tersedia. Artikulasi spesifik untuk seluruh 300 makhluk masih memerlukan pengembangan lebih lanjut.
- **Tombol lebih nyaman:** percepatan gerak halus, lompatan dengan tinggi yang bergantung pada lama tombol ditekan, *jump buffer* sekitar 140 ms, dan toleransi lompatan di ujung platform (*coyote time*) sekitar 120 ms.
- **Umpan balik premium:** debu saat melompat/mendarat, kilau Jiwa dan batu evolusi, efek saat menyentuh checkpoint, terkena bahaya, atau mengaktifkan segel. Mode 3D menggunakan objek partikel yang sudah dibuat sebelumnya agar tidak menambah objek di tiap frame.
- **Efek suara opsional:** tombol suara kecil tersedia di header Adventure. Synth Web Audio baru diaktifkan melalui sentuhan/keyboard; pengaturan disimpan dan mode tetap bisa dimainkan tanpa audio.
- **Optimasi iPhone:** render WebGL habitat dihentikan sementara saat Adventure menggunakan layar dan dilanjutkan setelah kembali ke Tamagotchi. Resolusi Adventure tetap dibatasi untuk mengurangi beban GPU.
- **Pengujian tambahan:** simulasi sentuhan iPhone, gerakan berlari, lompatan, pause/resume, penyimpanan audio, serta verifikasi bahwa animasi dan kode lama tetap valid.

- Hadiah XP mempercepat syarat pengalaman evolusi tetapi **tidak mengabaikan usia dan standar pengasuhan**. Pemain tetap dapat menikmati Tamagotchi, mini-game Tebak Arah, dan Kodex tanpa harus menamatkan platformer.
- Ekspor/impor cadangan lengkap sekarang menyertakan progres adventure ketika data tersedia. Data lama tetap digunakan dan tidak dihapus.

### Batasan pilot Adventure

World 1, 2 dan 3 telah diimplementasikan secara kode; empat dunia lain dari rencana tujuh dunia **belum dibangun**. Lima belas level memakai desain arena prosedural bergaya petualangan, belum memiliki aset lingkungan/boss khusus seperti game konsol komersial. Kemampuan dan animasi 300 makhluk belum semuanya dikurasi satu-satu. Validasi gerakan dan visual di Safari iPhone nyata tetap diperlukan.

### Pembaruan gameplay 8.3

- Menambahkan World 3 dengan lima level, medan hutan hujan, hembusan angin ringan, guardian non-kekerasan, batu elemen, dan progres terpisah per karakter.
- Hadiah Tamagotchi diperluas dari level 0–9 ke 0–14 dengan pembatas anti-*farming* yang sama, termasuk bonus pengetahuan pada level final 14. Penyimpanan adventure `nusajiwa-adventure-v1` tidak diubah sehingga progres dua world lama tetap terbaca.
- Menghapus pemanggilan CSS ganda dan tautan Atlas yang sebelumnya melayang di atas area bermain; Kodex tetap di dalam menu permainan.
- Pembaruan baru ini **belum menggantikan** pekerjaan model individu yang belum dirilis. Verifikasi grafis Safari iPhone tetap diperlukan.

### Mini-game Jejak Nusantara (penambahan setelah 8.3)

- Masuk **Main → Jejak Nusantara**. Pemain melihat urutan simbol Jejak 🐾, Daun 🌿 dan Jiwa ✦, lalu menekan **Sudah hafal** untuk menyembunyikannya sebelum menjawab.
- Ada **3 putaran** yang semakin panjang: 2, 3, lalu 4 simbol. Benar minimal dua putaran meningkatkan kebahagiaan sebanyak 2; hasil lain menambah 1. Satu sesi selesai dihitung sebagai satu kegiatan bermain, bukan progres legenda otomatis.
- Tidak ada penghitung waktu tersembunyi, sehingga permainan mudah dipahami anak dan nyaman dengan tombol A/B/C atau sentuhan iPhone. Tombol C membatalkan sesi tanpa hadiah.
- Fitur memakai save Tamagotchi yang sudah ada dan tidak membuat format penyimpanan baru. Kode dan simulasi interaksi diuji pada `tests/nusajiwa-play-smoke.mjs`. Ini bukan klaim validasi Safari fisik.

### Morfologi folklor khusus — batch nj88

- `pocong`, `kuntilanak`, dan `tuyul` telah ditambah ciri siluet sesuai identitas pada 8 fase (24 konstruksi geometri diuji dengan stub Three.js). Transformasi antar fase adalah **interpretasi game**, bukan siklus hidup tradisi.
- Cakupan ini belum berarti seluruh 300 makhluk sudah memperoleh 2.400 model khusus, dan batch lokal nj80–nj86 yang belum terintegrasi tidak dihitung sebagai rilis. Tampilan visual di Safari iPhone belum diverifikasi.

## 300 identitas makhluk

Katalog sekarang memiliki tepat **300 ID dan 300 nama unik**. Fase evolusi dan batu elemen bukan makhluk tambahan. Dua ID lama untuk satu spesies Kura-kura Leher Ular Rote telah dikoreksi: satu identitas tetap Kura-kura Rote, satu identitas menjadi Kura-kura Kotak Ambon (Cuora amboinensis), dengan model dasar spesifik dan Kodex bersumber IUCN. Progres pemeliharaan ID duplikat lama dimigrasikan ke identitas Rote yang tetap berlaku.

## Arsitektur

- Mesin 3D, 300 identitas dan habitat: script_32.js.
- Kodex tersumber dan literatur: script_33.js.
- Mesin Tamagotchi, jam, perawatan, minigame, input A/B/C, backup: tamagotchi-3d.js.
- Skin konsol retro dan tampilan iPhone: tamagotchi-3d.css.
- Mode side-scrolling, fisika lompat, visual Three.js/fallback, penyimpanan level dan input sentuh: nusajiwa-adventure.js dan nusajiwa-adventure.css.
- Entry point dan urutan pemuatan: index.html.
- Regression checks: tests/nusajiwa-tamagotchi.mjs, tests/nusajiwa-play-smoke.mjs, tests/nusajiwa-adventure.mjs, dan workflow tamagotchi-quality.yml.
- Deployment otomatis ke GitHub Pages: .github/workflows/pages.yml.

Progress Tamagotchi v7 memakai kunci browser nusajiwa-tama-v70 dan tidak menimpa save 3D lama, nusajiwa-3d-signature-pets-v36.

## Batasan kualitas yang belum selesai

Walaupun semua 300 makhluk kini **berbeda secara identitas**, belum semua model memiliki geometri 3D khusus atau metamorfosis bentuk delapan fase yang spesifik dan selesai diaudit. Sejumlah entri masih memakai primitive prosedural bersama. Pola perkembangan berdasarkan mutu pengasuhan yang menyebabkan bentuk dewasa bercabang serta riset seluruh profil ensiklopedia belum lengkap. Verifikasi langsung iPhone dan performa pada berbagai perangkat masih diperlukan. Render 3D memakai Three.js dari CDN sehingga sambungan internet diperlukan pada pemuatan awal.

Versi 8.3 adalah rilis tiga-world platformer dengan animasi dan umpan balik interaktif, terintegrasi dengan Tamagotchi dan Kodex, bukan klaim bahwa seluruh 2.400 bentuk evolusi, tujuh dunia, atau seluruh kemampuan unik telah disempurnakan.

### Batch NJ89: 10 identitas × 8 fase

Leak (topeng transformasi melayang), Genderuwo (sosok besar berbulu), Jenglot (spesimen kecil berambut panjang), Begu Ganjang (bayangan memanjang), Buto Ijo (raksasa hijau tanpa tanduk), Babi Ngepet (wujud babi berkaki empat), Ahool (kriptid menyerupai kelelawar bermembran; keberadaannya belum terbukti), Orang Bunian (sosok manusia berbusana, bukan elf), Siluman Harimau (transformasi manusia–harimau), dan Antaboga (naga ular bermahkota tanpa kaki/sayap). Fase 1–4 menggantikan anatomi asli dengan bentuk yang berbeda; fase dewasa mempertahankan patung khusus terdahulu dan fase tua/legenda membentuk pengembangan spesifik. Semua 80 konstruksi diuji lewat simulator geometri Three-like dan Node CI, belum verifikasi WebGL nyata atau Safari iPhone.

Sumber untuk latar identitas, **bukan** fase evolusi: Begu Ganjang (https://jurnal.unimed.ac.id/2012/index.php/basastra/article/view/60953); Orang Bunian (https://openjournal.unpam.ac.id/index.php/Sasindo/article/view/30419); Antaboga (https://ejournal.unesa.ac.id/index.php/va/article/view/18220); Ahool dan status tanpa bukti ilmiah (https://www.biologyonline.com/articles/ahool). Penyimpanan lama dan katalog 300 ID tetap dipertahankan.

### NJ90–NJ93 — 40 identitas, 320 fase (2026-10-14)

Empat batch masing-masing sepuluh makhluk, dipilih **berdasarkan 300 ID yang memang ada di katalog**, bukan menambahkan duplikat. Pemilihan mengoreksi rencana sebelumnya: ID katalog Wewe Gombel adalah `wewe`; 11 usulan yang tidak ada di katalog diganti dengan identitas sah seperti Naga Padoha, Suanggi, Parakang, Nenek Pakande, Nawang Wulan, Bedawang Nala, dan lain-lain.

- NJ90: banaspati, palasik, sundel_bolong, wewe, kuyang, orang_bati, rangda, barong, hantu_jeruk_purut, macan_putih.
- NJ91: lembuswana, naga_basuki, garuda, hanoman, jatayu, sembrani, makara_candi, warak_ngendog, boraspati_tano, batara_kala.
- NJ92: dewi_sri, nyi_roro_kidul, putri_mandalika, jaka_tarub, kebo_iwa, bujang_ganong, ebu_gogo, timun_mas, nyai_blora, hantu_banyu.
- NJ93: ular_naga, suanggi, orang_pendek, cindaku, poppo, parakang, bedawang_nala, naga_padoha, nenek_pakande, nawang_wulan.

40 × delapan fase = 320 konstruksi dengan pemeriksaan 8 siluet berbeda per identitas. Sebelas karakter yang sebelumnya masih memakai bentuk generik saat fase 1–4 kini memiliki anatomi khusus; bentuk asli tahap dewasa, animasi dan struktur penyimpanan lama tidak diganti. Untuk makhluk yang sudah memiliki sculptor tiga dimensi spesifik per fase, detail khusus ditambahkan tanpa menyembunyikan karya sebelumnya. Mitologi atau ritual **bukan** laporan siklus hidup nyata; evolusi adalah mekanik permainan. Perlu review visual Safari iPhone dan pemeriksaan kesesuaian dengan referensi budaya untuk kesempurnaan akhir.

Sumber budaya: [Perda Kutai/Kukar tentang unsur lambang Lembu Suana](https://jdihdprd.kukarkab.go.id/dokumen/download/per_yMlRZ7NOVjY32); [Dinas Pariwisata Jawa Tengah — Warak Ngendog](https://visitjawatengah.jatengprov.go.id/id/artikel/dugderan-tradisi-sambut-ramadan-di-kota-semarang); [Museum Sonobudoyo — Naga, Basuki, Antaboga, Taksaka](https://sonobudoyo.jogjaprov.go.id/id/tulisan/read/naga).

#### Audit anatomi NJ90–NJ93 (lanjutan)
Perbaikan regresi: tahap 1–4 pada 18 identitas tanpa model remaja bawaan kini membangun anatomi berbeda, termasuk Orang Bati (tulang membran kelelawar), Lembuswana (hewan berkaki empat dan sayap), Naga Basuki dan Naga Padoha (tubuh ular tanpa kaki), Bedawang Nala (kura-kura kosmik) serta Poppo dan Parakang. Identitas yang sudah punya sculpt phase-aware tetap mempertahankannya. Ditambahkan 40 penanda detail karakter khusus, sementara 8 fase per makhluk diaudit secara struktural (bukan pengujian renderer WebGL nyata).

### NJ94 — 10 fauna ikon × 8 fase (80 konstruksi)

Komodo, Harimau Sumatra, Cendrawasih, Anoa, Maleo, Bekantan, Orangutan Kalimantan, Badak Jawa, Gajah Sumatra, Jalak Bali. Juvenil (1–4) memakai anatomi ulang, dewasa (5) mempertahankan model asli, tua dan legenda (6–7) menambah ciri spesifik. Telur mamalia dan legenda adalah simbol fiksi gameplay, bukan biologi. Jalak Bali memperoleh area biru di seputar mata, Bekantan bayi wajah kebiruan, Badak Jawa memakai satu tanduk native (tidak ditumpuk dua). Validasi 80 bentuk berbasis simulator geometri + CI, belum pemeriksaan visual Safari iPhone.

Rujukan: Smithsonian National Zoo [Komodo](https://nationalzoo.si.edu/animals/komodo-dragon) dan [Orangutan](https://nationalzoo.si.edu/animals/orangutan); Ornithological Applications [Maleo](https://academic.oup.com/condor/article/127/3/duaf022/8124486); IUCN SSC Asian Rhino Specialist Group [Badak Jawa](https://asianrhinos.group/rhinos/javan/); San Diego Zoo [Jalak Bali](https://animals.sandiegozoo.org/animals/bali-myna).

### NJ95 — Audit visual WebGL untuk seluruh kategori mistis, folklore, legenda, tradisi, mitologi dan pewayangan

[**Buka panel audit visual 3D (61 makhluk × 8 fase)**](https://juldigi.github.io/nusajiwa/?audit=folklore). Mode opsional `?audit=folklore` bekerja pada renderer dan *mesh game produksi yang sama*, bukan gambar tiruan atau storyboard. Pilih makhluk, fase 0–7 dan tampilan depan/kanan/belakang/kiri. Tombol **Foto PNG** menangkap frame WebGL, **Periksa 8 fase** mencatat mesh, triangle dan ukuran dimensi, lalu mengembalikan fase semula. **Tutup** mengembalikan model utama tanpa mengubah data Tamagotchi, katalog, energi, ataupun XP.

Perbaikan yang langsung digabungkan: Poppo remaja tidak memiliki torso hantu generik lagi (kepala melayang); Nyai Blora remaja berubah menjadi tubuh perempuan-ular, bukan kepala naga generik; ornament penutup hitam pada punggung berlubang Sundel Bolong diganti tepian di belakang bukaan asli; Hantu Jeruk Purut memakai patung tanpa kepala sehingga berbeda dari Si Manis Jembatan Ancol. Katalog tetap **300 ID**, seluruh kategori mistis/tradisi/motiffolklor mencakup **61 ID** (53 batch khusus terdahulu + 8 ID lain). Akses live 61×8 memberi 488 kombinasi untuk inspeksi, tetapi *bukan klaim bahwa seluruh 488 sudah dinilai artistik melalui foto*. Uji perangkat Safari iPhone dan evaluasi budaya perlu dilakukan dengan hasil capture.


### NJ96 — Sepuluh fauna spesifik × delapan fase (14 Oktober 2026)

Batch terbaru membangun **80 konstruksi 3D** untuk sepuluh identitas yang sudah ada, **tanpa menambah atau menggandakan 300 ID**: Elang Jawa (\`elang_jawa\`), Rusa Bawean (\`rusa_bawean\`), Tarsius Sulawesi (\`tarsius\`), Babirusa Sulawesi (\`babirusa\`), Rangkong Badak (\`rangkong_badak\`), Kasuari Gelambir Ganda (\`kasuari\`), Penyu Hijau (\`penyu_hijau\`), Duyung (\`duyung\`), Arwana Asia (\`arwana\`), dan Kakatua Raja (\`kakatua_raja\`).

- **Fase 0**: telur bersimbol spesies (untuk mamalia bersifat simbolis/fiktif); **fase 1–4**: anatomis spesifik menggantikan bentuk generik, bukan hanya pengubahan skala; **fase 5**: model dewasa produksi yang sudah ada tetap dipertahankan, ditambah ciri identitas; **fase 6–7**: aksesori bentuk tua dan legenda yang sengaja berbeda secara siluet. Bentuk legenda adalah fantasi permainan.
- Ciri utama: jambul tegak Elang Jawa; punggung tutul anak dan bib putih Rusa Bawean; mata besar dan tungkai panjang Tarsius; taring Babirusa jantan yang melengkung melewati moncong; balung menukik ke atas Rangkong Badak; dua gelambir merah dan casque Kasuari; sirip depan Penyu Hijau; ekor mendatar bercabang dan **tanpa sirip punggung** pada Duyung; dua sungut di rahang bawah Arwana; pipi merah, paruh besar dan jambul Kakatua Raja.
- Sumber bentuk mencakup eBird, publikasi BRIN/LIPI tentang rusa Bawean, IUCN Wild Pig Specialist Group, Rangkong Indonesia, Smithsonian National Zoo, NOAA Fisheries, serta San Diego Zoo Wildlife Alliance. URL per spesies tersedia di \`NUSAJIWA_MORPH96_SOURCES\` dalam \`nj96-fauna.js\`. Sumber hanya mendukung ciri biologis, **bukan** keabsahan fase legenda.
- Integrasi tersambung langsung ke \`makeAvatar\` melalui \`script_32.js\` dan dimuat sesudah NJ94, sebelum engine 3D. Penyimpanan Tamagotchi, progres 15 level pada tiga dunia, serta Kodex tidak dimigrasikan atau dihapus. CI memeriksa 10 identitas, 80 fase, pembeda struktur, pelestarian mesh dewasa, dan paket GitHub Pages.
- **Status kualitas**: uji bentuk oleh simulator Node dan GitHub Actions, **bukan sertifikasi akurasi artistik/WebGL Safari iPhone**. Ciri dewasa dapat bertumpuk dengan sculpt bawaan tertentu; tinjauan tangkapan layar dari empat sisi tetap diperlukan untuk penyempurnaan manual berikutnya. Hasil 80 konstruksi tidak boleh ditafsirkan sebagai 80 model studio yang sudah dipoles secara visual.


### NJ642.2 — UI/UX sumber asli v6.42 (14 Oktober 2026)

Menggabungkan `css_35.css` dan `script_34.js` dari arsip edit `NUSAJIWA_6_42_Rev9_Selective_Morph_Merge.zip` langsung ke tampilan produksi, menggantikan pendekatan 6.42 sebelumnya yang hanya meniru sebagian gaya. Desain default adalah **Living Sanctuary**: HUD tipis, serif Marcellus fallback, bilah perawatan, dock ringkas, panel Suaka/Kodex/Evolusi, layar judul dan feedback interaktif. Modul jembatan mempertahankan opsi **Mainkan Tamagotchi 90-an** dari menu kanan atas serta **✦ Suaka** untuk kembali tanpa menghapus progres. Katalog tetap 300 dan Adventure tetap 15 level/3 dunia. File `nj642-living.css/js` sebelumnya tetap ada untuk rollback tetapi **tidak dimuat** agar tidak terjadi duplikasi tombol dan tumpang tindih style. Audit WebGL opsional mengabaikan overlay UI. Pengujian visual Safari iPhone fisik masih diperlukan; lolos CI tidak berarti semua viewport telah diverifikasi.


### NJ98 — Batch 01 pemahatan ulang mistis (15 Oktober 2026)

Delapan identitas **kuyang, leak, kuntilanak, pocong, genderuwo, tuyul, wewe, dan jenglot** kini dibangun kembali lewat rig mesh prosedural 3D yang berbeda per makhluk dan fase (8 × 8 = 64 kasus). Untuk tiap identitas, layer sculpt lama disembunyikan agar tidak bertabrakan dengan anatomi baru; tidak dilakukan penghapusan file/model historis, migrasi progres, ataupun perubahan katalog 300 ID. Fase telur dan fase evolusi adalah **mekanisme fiksi game**, bukan deskripsi budaya. Model ritual dan makhluk dari kepercayaan masyarakat adalah interpretasi artistik yang mungkin memiliki representasi berbeda menurut daerah. Modul terpisah `nj98-mistis-batch1.js` dimuat sebelum engine `script_32.js`. Audit visual empat arah tersedia melalui `?audit=folklore`, namun kecocokan artistik dan Safari iPhone nyata belum terverifikasi. Pemeriksaan Node memvalidasi 64 konstruksi berbeda serta kontrak deployment, bukan menyatakan 64 patung studio sudah disahkan secara visual.


### NJ99 — Batch 02 folklor spesifik (15 Oktober 2026)

Pahat ulang geometri procedural 3D untuk 8 ID × 8 fase: Banaspati (api tidak humanoid), Buto Ijo (raksasa tanpa tanduk fantasi Barat), Palasik (kepala melayang berbeda dari Kuyang), Sundel Bolong (**jaring kain punggung berlubang nyata** bukan bola hitam tempelan), Babi Ngepet (babi berkaki empat), Begu Ganjang (postur menjulang), Orang Bunian (manusia, bukan elf), Hantu Banyu (arus air, bukan putri duyung). Modul terpisah `nj99-folklore-batch2.js`. Data pemain dan 300 ID tetap sama. Pengujian struktur otomatis belum setara verifikasi akurasi seni dari empat sudut pada Safari.


### NJ100 — Batch 03 lima identitas mitologi (15 Oktober 2026)

Lembuswana, Garuda, Naga Basuki, Antaboga, dan Taksaka mendapat total 40 rekonstruksi fase 3D khusus. Bentuk menekankan hibrida Kutai (lembu + gajah + burung + kaki ayam + sisik), Garuda kepala elang dengan tangan dan kaki manusia, Basuki yang simbolis berhubungan dengan air, Antaboga sebagai raja naga bermahkota dengan variasi wujud antropomorf dalam cerita, dan Taksaka bernuansa lengkungan penjor Bali. Seluruh telur/evolusi bersifat **fiksi gameplay**, bukan klaim asal-usul atau praktik religi. Sumber identitas tercantum di `nj100-myth-batch3.js`. Render empat sudut pada Safari belum dilakukan.


### NJ101 — Batch 04 seni pertunjukan dan folklor Jawa–Bali (15 Oktober 2026)

Lima karakter dipahat ulang melalui geometri 3D khusus untuk setiap fase: Barong Ket (`barong`, makhluk berkaki empat dan kostum dengan kepala topeng), Rangda (`rangda`, sosok tegak bertopeng, rambut ritual dan lidah memanjang), Kuda Sembrani (`sembrani`, kuda tiga dimensi dengan sayap berkembang), Kuda Kepang (`kuda_lumping`, **properti kuda pipih anyaman bambu** bukan hewan berkaki empat), dan Singo Barong Reog (`singa_barong_reog`, kepala harimau dan dadak merak bermotif bulu kipas). Sumber identitas: [Barong Ket](https://www.maskmuseum.org/mask/bali-barong-ket/), [Rangda](https://www.maskmuseum.org/mask/bali-rangda/), [Kuda Lumping](https://www.indonesia.travel/id/id/travel-ideas/culture/kesenian-kuda-lumping), [Reog Ponorogo](https://visitponorogo.id/tours/monumen-reog-ponorogo). 

Catatan: Batch NJ89/NJ90 adalah pekerjaan morfologi lama untuk sebagian ID yang sama; **NJ101 menggantikannya pada layer visual saat runtime** tanpa menambah ID ke katalog. Telur, pertumbuhan, dan legenda adalah mekanisme permainan fiksi, bukan pernyataan tentang benda seni pertunjukan atau ritual sakral. Pengujian Node menguji kontrak struktural, bukan sertifikasi rupa visual di Safari iPhone.


### NJ102 — Batch 05 ikon regional (15 Oktober 2026)

Empat makhluk/figur dalam roster yang sama memperoleh pahatan 3D baru untuk 8 fase (32 konstruksi): `bujang_ganong` topeng merah hidung besar, mata menonjol dan pose penari Reog [Pemkab Ponorogo](https://ponorogo.go.id/pemain-reog/); `warak_ngendog` berkaki empat, kepala mirip naga, bulu keriting dan telur simbolik pada tradisi Dugderan [BBPOM Semarang](https://semarang.pom.go.id/berita/warak-quiz-adopsi-mainan-khas-semarang); `boraspati_tano` simbol cicak Batak dalam bentuk **relief pipih gorga**, bukan reptil fantasi Barat [Nusantara Museum](https://indonesiamuseum.org/en/articles/carved-batak-wood-betel-lime-container); `kebo_iwa` **manusia raksasa**, sosok pelindung/penggali sumur dalam legenda Bali, **bukan makhluk berkepala kerbau** [Undiksha](https://repo.undiksha.ac.id/7263/9/1712021181-LAMPIRAN.pdf).

Batch NJ102 bersifat penggantian visual runtime atas morfologi generasi sebelumnya yang menyinggung identitas sama, dengan riwayat terdahulu tetap tersimpan dalam release ledger. Evolusi dan telur merupakan *fantasi gameplay*; keberadaan makhluk serta bentuknya di luar tradisi bukan klaim zoologi. QA otomatis belum sama dengan penilaian seni empat sisi di perangkat iPhone asli.

### NJ103 — Batch 06 kriptid dan folklor regional (15 Oktober 2026)

Five existing NUSAJIWA IDs are remade with 8 truly different geometry stages (40 constructions): Ahool/Jawa Barat (giant gray bat cryptid, with stretched bat-finger membranes), Siluman Ular/Jawa (human-faced snake-waist and long coiling tail; Nyai Blora link is a *game interpretation*, not established canonical iconography), Macan Putih/Jawa (white quadrupedal tiger, no wings or horns), Siluman Harimau/Sumatra (human shape-shifter transitioning from human to four-legged tiger; not a "new tiger species"), and Ebu Gogo/Flores (small squat humanlike runner, wide face, flat nose, large mouth and coarse hair). [Ahool source](https://ndl.ethernet.edu.et/bitstream/123456789/46979/1/George%20M.%20Eberhart.pdf), [Ebu Gogo narrative analysis](https://borobudurwriters.id/film/ebu-gogo-antara-mitos-dan-sains/), [human-tiger folktales](https://repositori.kemendikdasmen.go.id/1425/1/Analisis%20Tema%2CAmanat%2C%26%20nilai%20Budaya%20Sastra%20Nusantara%20Di%20Sumatra%20Selatan%20%281994%29.pdf).

All supernatural and cryptid forms are representations of narratives, not zoological evidence. Egg, baby, old and Legend growth morphologies are FICTIONAL game mechanics. Previous meshes are masked for selected IDs. All 300 IDs, progress saves, UI Living Sanctuary and 15 platform levels are unchanged. Node geometry/test regressions are **not** a substitute for Safari/iPhone four-view quality approval.


### NJ104 — Batch 07 rekonstruksi regional Sulawesi, Maluku dan Sumatra

Enam ID lama memperoleh rig geometri 3D unik pada delapan fase, total **48** bentuk. Poppo (kepala terbang dengan untaian anatomi bergaya tidak grafis, kain kepala Bugis untuk membedakannya dari Kuyang), Parakang (wujud manusia → hewan tiruan berkaki belakang ganjil → pohon bercabang dua → bentuk fantasi campuran), Suanggi (sosok manusia malam dengan elemen api; **bukan** elemen api murni Banaspati), Orang Bati (manusia tegak bersayap seperti kelelawar; **bukan** kelelawar bertubuh penuh seperti Ahool), Orang Pendek (kriptid pendek berotot dan berkaki dua; **bukan** Ebu Gogo Flores), dan Cindaku Kerinci (sosok manusia penjaga batas wilayah berubah menjadi harimau yang menyentuh tanah; tidak menyamakan dengan Siluman Harimau umum).

Sumber utama: [Prof Nurhayati dan Poppo](https://www.detik.com/sulsel/budaya/d-7047817/mengenal-poppo-mitos-manusia-jadi-jadian-dalam-kepercayaan-bugis-makassar); [Parakang](https://boneterkini.id/legenda-parakang-manusia-jadi-jadian-asal-sulawesi-selatan/); [Orang Bati menurut LIPI/BRIN](https://inet.detik.com/science/d-5995200/legenda-orang-bati-manusia-setengah-kelelawar-yang-misterius); [Orang Pendek wawancara saksi](https://www.theguardian.com/science/blog/2011/sep/09/orang-pendek-quest-sumatra); [Cindaku tutur masyarakat Kerinci](https://tunawisma.com/cindaku-kerinci/); [Suanggi mitos Indonesia Timur](https://amp.kompas.com/hype/read/2025/08/25/091844866/deretan-hantu-nusantara-yang-belum-muncul-di-film-horor-indonesia).

Interpretasi bentuk, telur, bayi hingga Legenda adalah *fiksi game*, bukan fakta biologi atau bentuk tradisi tunggal yang pasti. Katalog tetap 300 ID, tanpa migrasi save, tanpa perubahan Living Sanctuary, ensiklopedia atau 15 stage platformer. Automated topology/geometry tests ≠ final four-angle approval on a real iPhone browser.

