# NUSAJIWA · Tamagotchi 3D Nusantara

**Versi 8.3 — Tamagotchi 3D × Jelajah Evolusi (15 level / 3 dunia), kendali responsif, efek interaktif, dan Kodex Nusantara.**

Main: https://juldigi.github.io/nusajiwa/
Atlas: https://juldigi.github.io/nusajiwa/atlas-evolusi.html

## Cara bermain

- Pilih satu makhluk berbeda di Suaka dan tetaskan telurnya.
- Kontrol ala Tamagotchi: A memilih, B mengonfirmasi, C kembali. Ikon diatur menjadi dua baris dengan area sentuh lebih besar untuk iPhone.
- Sediakan makanan utama atau camilan. Bermain tebak arah, bersihkan toilet, obati saat sakit, ajari disiplin dan matikan lampu saat tidur.
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
