# NUSAJIWA — sumber kesinambungan proyek
Audit repository: 16 Oktober 2026; sumber operasional adalah branch `main` dari `juldigi/nusajiwa`. Dokumen ini tidak menggantikan audit visual perangkat nyata.

## Keputusan produk terkonsolidasi
- Produk adalah GAME, bukan web dashboard. Habitat 3D ala Tamagotchi 1990-an adalah inti, disertai perawatan, tidur, kesehatan, relasi, evolusi bertahap, ensiklopedia/Kodex, dan jelajah.
- Tepat **300 identitas makhluk** Indonesia (bukan 300 varian). Bentuk, sejarah lokal, taksonomi dan evolusi tiap makhluk harus diperiksa sendiri-sendiri. Delapan tahap: telur/segel, bayi, balita, anak, remaja, dewasa, tua, legenda; bentuk antartahap berubah, tidak cukup hanya diperbesar.
- Makhluk mistis/folklore diprioritaskan; model tidak boleh generik dan narasi ensiklopedia harus membedakan cerita rakyat dari rekayasa mekanik evolusi untuk game.
- Main scene 3D harus mendominasi layar; UI premium dengan header/dock/tombol ringkas, kontras/lighting aman, Safari iPhone dan desktop responsive.
- Mode jelajah: 15 stage / 3 dunia dengan penyimpanan progres sendiri; `Klasik 32` adalah kampanye original NUSAJIWA terinspirasi dinamika platformer NES, 8 wilayah × 4 stage; tokoh utama menggunakan pet 3D aktif.
- ROM NES yang pernah diserahkan pengguna hanya untuk studi/perbandingan lokal. Jangan menerbitkan byte cartridge, sprite, audio, atau layout berhak cipta; tiru prinsip mekanik yang relevan dalam dunia Nusantara orisinal.
- Publish melalui GitHub Pages; setiap klaim deploy harus disertai commit dan status Actions. Jangan menganggap tes Node = lulus QA iPhone fisik.

## Source of truth dan status nyata
- `release.json`: produk inti **8.3**, 300 identitas katalog, 15 level/3 dunia asli.
- `nj98`–`nj120`: batch sculpt yang sudah masuk repository; validasi bentuk dan fase setiap identitas tetap merupakan pekerjaan tersendiri. Tidak ada klaim bahwa 2.400 sculpt unik telah lolos audit real-device.
- `nj123-classic.js`: mode 32 stage dengan progress per karakter di `nusajiwa-classic-32-v1`.
- `nj125-classic-3d.js`: renderer Three.js untuk mode Klasik; `nj127-rom-physics.js`: collectible/power-up asli NUSAJIWA; **NJ128**: perlindungan dan reset sementara per nyawa.
- `tamagotchi-3d.js`, `script_32.js`, `script_33.js`: pertahankan pemeliharaan pet, engine bentuk, serta Kodex.
- Pekerjaan lokal `8.6` yang pernah dilaporkan di sesi lain harus dianggap **belum tergabung** sampai dibandingkan per berkas dengan `main`. Jangan overwrite branch dari ZIP lama.

## Prioritas pekerjaan berikutnya
1. QA nyata iPhone Safari: HUD dan A/B, touch multitap, WebGL loss/recovery, loading, lighting, orientasi portrait/landscape, dan performa.
2. Audit regresi semua 32 stage, termasuk jatuh, projectile, boss, auto-pause, nyawa, localStorage, perpindahan stage, dan integritas save.
3. Audit daftar 300 nama versus sumber tradisi lokal; verifikasi identitas serta 8 evolusi tiap makhluk satu per satu, dimulai mistis/folklore.
4. Optimasi 3D: mesh/material lifetimes, distinct silhouettes, animations, LOD, color/readability. Pertahankan satu source of truth dan modul terpisah dari kode inti.
5. Setiap batch: tes sintaks + tes `node --test tests/*.mjs` + Pages workflow, cantumkan detail batas QA. Jangan salah mengklaim berhasil diuji pada iPhone fisik.
