/* NUSAJIWA 3.8 — Signature 3D Sanctuary / all changes additive; original v3.4 save & field guide preserved */
(async function(){
'use strict';
const CREATURES=[
 ["rangkong_papan", "Rangkong Papan", "Fauna", "Sumatra dan Kalimantan", "bird", "#232725"],
 ["julang_emas", "Julang Emas", "Fauna", "Sumatra dan Kalimantan", "bird", "#292622"],
 ["enggang_klihingan", "Enggang Klihingan", "Fauna", "Kalimantan", "bird", "#282a29"],
 ["kangkareng_hitam", "Kangkareng Hitam", "Fauna", "Sumatra dan Kalimantan", "bird", "#202323"],
 ["pelatuk_ayam", "Pelatuk Ayam", "Fauna", "Sumatra dan Kalimantan", "bird", "#332b2a"],
 ["pelatuk_kuduk_kuning", "Pelatuk Kuduk Kuning", "Fauna", "Sumatra dan Kalimantan", "bird", "#3d3930"],
 ["burung_gosong_maluku", "Gosong Maluku", "Fauna", "Maluku", "bird", "#42362f"],
 ["sempidan_biru", "Sempidan Biru", "Fauna", "Sumatra dan Kalimantan", "bird", "#253c50"],
 ["sempidan_sumatra", "Sempidan Sumatra", "Fauna", "Sumatra", "bird", "#493a37"],
 ["poksai_jambul", "Poksai Jambul", "Fauna", "Sumatra", "bird", "#786b53"],
 ["ciung_batu_sumatra", "Ciung Batu Sumatra", "Fauna", "Sumatra", "bird", "#303f4c"],
 ["cica_daun_besar", "Cica Daun Besar", "Fauna", "Sumatra dan Kalimantan", "bird", "#477c45"],
 ["takur_tenggeret", "Takur Tenggeret", "Fauna", "Jawa dan Bali", "bird", "#4d7651"],
 ["takur_ungkut_ungkut", "Takur Ungkut-ungkut", "Fauna", "Jawa dan Sumatra", "bird", "#518259"],
 ["kedasi_hitam", "Kedasi Hitam", "Fauna", "Sumatra dan Kalimantan", "bird", "#303333"],
 ["cekakak_sungai", "Cekakak Sungai", "Fauna", "Jawa, Sumatra dan Kalimantan", "kingfisher", "#377d8d"],
 ["raja_udang_biru", "Raja-udang Biru", "Fauna", "Jawa dan Sumatra", "kingfisher", "#286d9c"],
 ["cekakak_jawa", "Cekakak Jawa", "Fauna", "Jawa", "kingfisher", "#427e9b"],
 ["burung_madu_sepah_raja", "Burung-madu Sepah Raja", "Fauna", "Sumatra dan Kalimantan", "bird", "#554e3b"],
 ["burung_madu_kelapa", "Burung-madu Kelapa", "Fauna", "Jawa dan Sumatra", "bird", "#777247"],
 ["cipoh_kacat", "Cipoh Kacat", "Fauna", "Jawa, Sumatra dan Kalimantan", "bird", "#657a3f"],
 ["merbah_cerukcuk", "Merbah Cerukcuk", "Fauna", "Jawa dan Sumatra", "bird", "#766f56"],
 ["cucak_kutilang", "Cucak Kutilang", "Fauna", "Jawa dan Sumatra", "bird", "#4a5147"],
 ["cucak_rawa", "Cucak Rawa", "Fauna", "Sumatra dan Kalimantan", "bird", "#716d4b"],
 ["trulek_jawa", "Trulek Jawa", "Fauna", "Jawa", "bird", "#74654f"],
 ["belibis_kembang", "Belibis Kembang", "Fauna", "Jawa dan Sumatra", "bird", "#8b614a"],
 ["itik_benjut", "Itik Benjut", "Fauna", "Sumatra, Jawa dan Kalimantan", "bird", "#686d61"],
 ["mandar_besar", "Mandar Besar", "Fauna", "Sumatra dan Kalimantan", "bird", "#393d3b"],
 ["ayam_hutan_merah", "Ayam Hutan Merah", "Fauna", "Sumatra dan Jawa", "bird", "#7d4332"],
 ["kakatua_koki", "Kakatua Koki", "Fauna", "Papua", "bird", "#e9e2cc"],
 ["nuri_kepala_hitam", "Nuri Kepala Hitam", "Fauna", "Papua", "bird", "#35784b"],
 ["nuri_pelangi", "Nuri Pelangi", "Fauna", "Papua dan Maluku", "bird", "#477d48"],
 ["perkici_pelangi", "Perkici Pelangi", "Fauna", "Indonesia timur", "bird", "#4d8b62"],
 ["kasturi_ternate", "Kasturi Ternate", "Fauna", "Maluku Utara", "bird", "#8c3e42"],
 ["kasturi_raja", "Kasturi Raja", "Fauna", "Maluku", "bird", "#ae3f3e"],
 ["betet_biasa", "Betet Biasa", "Fauna", "Jawa dan Bali", "bird", "#65964e"],
 ["serindit_melayu", "Serindit Melayu", "Fauna", "Sumatra dan Kalimantan", "bird", "#6d9b55"],
 ["serindit_sulawesi", "Serindit Sulawesi", "Fauna", "Sulawesi", "bird", "#629a56"],
 ["nuri_tanimbar", "Nuri Tanimbar", "Fauna", "Kepulauan Tanimbar", "bird", "#b64b4b"],
 ["nuri_maluku", "Nuri Maluku", "Fauna", "Maluku", "bird", "#b74444"],
 ["merpati_mahkota_biru", "Mambruk Ubiaat", "Fauna", "Papua", "bird", "#4b6f8e"],

 ["hiu_martil_bergerigi", "Hiu Martil Bergerigi", "Fauna", "Laut tropis Indonesia", "shark", "#697b8c"],
 ["burung_madu_sriganti", "Burung-madu Sriganti", "Fauna", "Berbagai pulau Indonesia", "bird", "#77814b"],
 ["kepodang_kuduk_hitam", "Kepodang Kuduk Hitam", "Fauna", "Sumatra, Jawa dan Kalimantan", "bird", "#dfba53"],
 ["kancil_jawa", "Kancil Jawa", "Fauna", "Jawa", "deer", "#8e7153"],
 ["kukabura_perut_merah", "Kukabura Perut Merah", "Fauna", "Papua", "kingfisher", "#5c7c89"],

 ["biawak_togian", "Biawak Togian", "Fauna", "Kepulauan Togean, Sulawesi", "monitor", "#59745c"],
 ["labi_moncong_babi_papua", "Labi-Labi Moncong Babi Papua", "Fauna", "Papua", "pignose", "#7b9c8c"],
 ["kura_leher_ular_rote", "Kura-Kura Leher Ular Rote", "Fauna", "Pulau Rote, Nusa Tenggara Timur", "snakeneck", "#7e9768"],
 ["kura_papua_leher_panjang", "Kura-Kura Papua Leher Panjang", "Fauna", "Papua", "snakeneck", "#6b8867"],
 ["penyu_tempayan", "Penyu Tempayan", "Fauna", "Perairan Indonesia", "loggerhead", "#ae8863"],
 ["penyu_lekang", "Penyu Lekang", "Fauna", "Perairan Indonesia", "ridley", "#7c956a"],
 ["penyu_pipih", "Penyu Pipih", "Fauna", "Perairan sekitar Papua dan Australia", "flatback", "#a5a078"],

 ["kuskus_tembung", "Kuskus Tembung", "Fauna", "Sulawesi", "n46GreyCuscus", "#827c65"],
 ["kuskus_yaben", "Kuskus Yaben", "Fauna", "Papua", "n46GreyCuscus", "#b2a58d"],
 ["kuskus_siku_putih", "Kuskus Siku Putih", "Fauna", "Papua", "n46GreyCuscus", "#b1a59b"],
 ["kuskus_gunung", "Kuskus Gunung", "Fauna", "Papua", "n46GreyCuscus", "#807a6f"],
 ["kuskus_selatan", "Kuskus Selatan", "Fauna", "Papua", "n46GreyCuscus", "#a89982"],
 ["kuskus_pontai", "Kuskus Pontai", "Fauna", "Papua", "n46GreyCuscus", "#d0b89b"],
 ['anoa_gunung', 'Anoa Gunung', 'Fauna', 'Sulawesi', 'anoa', '#625c4c'],
 ['kangkareng_sulawesi', 'Kangkareng Sulawesi', 'Fauna', 'Sulawesi', 'hornbill', '#383e40'],
 ['kukang_sumatra', 'Kukang Sumatra', 'Fauna', 'Sumatra', 'n37Tarsier', '#a47d58'],
 ['kucing_emas', 'Kucing Emas Asia', 'Fauna', 'Sumatra', 'n46LeopardCat', '#bb8b4b'],
 ['beruk_mentawai', 'Beruk Mentawai', 'Fauna', 'Kepulauan Mentawai', 'n37Gibbon', '#554b46'],
 ['berang_gunung', 'Berang-Berang Gunung', 'Fauna', 'Sumatra', 'n46SulawesiCivet', '#654f3b'],
 ['kucing_batu', 'Kucing Batu', 'Fauna', 'Sumatra dan Kalimantan', 'n46LeopardCat', '#776b53'],

 ['kuskus_peleng','Kuskus Peleng','Fauna','Pulau Peleng, Sulawesi Tengah','n46GreyCuscus','#8b765d'],
 ['kuskus_obi','Kuskus Obi','Fauna','Pulau Obi, Maluku Utara','n46GreyCuscus','#b2a08c'],
 ['kuskus_matabiru','Kuskus Mata Biru','Fauna','Maluku Utara','n46GreyCuscus','#8d8172'],
 ['kuskus_gebe','Kuskus Gebe','Fauna','Pulau Gebe, Maluku Utara','n46GreyCuscus','#9c8973'],
 ['kuskus_bohai','Kuskus Bohai','Fauna','Papua','n46GreyCuscus','#53473c'],
 ['kuskus_schamscham','Kuskus Scham-Scham','Fauna','Waigeo, Papua Barat Daya','n46GreyCuscus','#c9b5a0'],

 ['kuskus_beruang_sulawesi','Kuskus Beruang Sulawesi','Fauna','Sulawesi','n46GreyCuscus','#756a57'],
 ['kucing_tandang','Kucing Tandang','Fauna','Sumatra dan Kalimantan','n46LeopardCat','#786956'],
 ['kucing_merah_borneo','Kucing Merah Borneo','Fauna','Kalimantan','n46LeopardCat','#b56a43'],
 ['kuskus_talaud','Kuskus Talaud','Fauna','Kepulauan Talaud, Sulawesi Utara','n46GreyCuscus','#77796e'],
 ['krabuku_sangihe','Krabuku Sangihe','Fauna','Pulau Sangihe','n37Tarsier','#a29b70'],
 ['lutung_budeng','Lutung Budeng','Fauna','Jawa dan Bali','n37Gibbon','#3e4444'],
 ['komodo','Komodo','Fauna','Nusa Tenggara Timur','reptile','#718e69'],
 ['tiger','Harimau Sumatra','Fauna','Sumatra','tiger','#ce853f'],
 ['cendrawasih','Cendrawasih','Fauna','Papua','paradise','#f3b95b'],
 ['lembuswana','Lembuswana','Folklor','Kutai, Kalimantan Timur','lembuswana','#ddbd70'],
 ['kuyang','Kuyang','Folklor','Kalimantan','kuyang','#a4a8ad'],
 ['anoa','Anoa','Fauna','Sulawesi','anoa','#766753'],
 ['maleo','Maleo','Fauna','Sulawesi','maleo','#2d323c'],
 ['bekantan','Bekantan','Fauna','Kalimantan','bekantan','#a77849'],
 ['garuda','Garuda','Mitologi','Tradisi Nusantara','garuda','#caa34b'],
 ['naga_basuki','Naga Basuki','Mitologi','Bali','naga','#628f7d'],
 ['barong','Barong Ket','Tradisi','Bali','barong','#e8bd76'],
 ['rangda','Rangda','Tradisi','Bali','rangda','#aca49f'],
 ['leak','Leak','Folklor','Bali','leak','#b27d6c'],
 ['kuntilanak','Kuntilanak','Cerita rakyat','Berbagai daerah','kuntilanak','#d3d5cd'],
 ['pocong','Pocong','Cerita rakyat','Berbagai daerah','pocong','#c5c9b3'],
 ['genderuwo','Genderuwo','Cerita rakyat','Jawa','genderuwo','#654a42'],
 ['tuyul','Tuyul','Cerita rakyat','Jawa','tuyul','#97a989'],
 ['wewe','Wewe Gombel','Cerita rakyat','Jawa','wewe','#a19582'],
 ['jenglot','Jenglot','Cerita rakyat','Jawa','jenglot','#836e63'],
 ['banaspati','Banaspati','Folklor','Jawa','banaspati','#f18e45'],
 ['sembrani','Kuda Sembrani','Mitologi','Jawa','sembrani','#e7ddd0'],
 ['buto_ijo','Buto Ijo','Cerita rakyat','Jawa','buto','#547c58'],
 ['palasik','Palasik','Cerita rakyat','Minangkabau','palasik','#999ba7'],
 ['babi_ngepet','Babi Ngepet','Cerita rakyat','Jawa','babi','#494347'],
 ['ahool','Ahool','Kriptid','Jawa Barat','ahool','#544956'],
 ['bunian','Orang Bunian','Folklor','Sumatra','bunian','#9cafbd'],
 ['begu_ganjang','Begu Ganjang','Folklor','Batak, Sumatra Utara','begu','#32313d'],
 ['nyai_blora','Siluman Ular','Folklor','Jawa','naga','#729777'],
 ['hantu_banyu','Hantu Banyu','Folklor','Kalimantan','water','#85b9bb'],
 ['naga_antaboga','Antaboga','Mitologi','Tradisi Jawa dan Bali','naga','#b9c7aa'],
 ['macan_putih','Macan Putih','Folklor','Jawa','tiger','#efe8d3'],
 ['kuda_lumping','Kuda Kepang','Tradisi','Jawa','sembrani','#bd8058'],
 ['ular_naga','Naga Taksaka','Mitologi','Tradisi Nusantara','naga','#889a87'],
 ['sundel_bolong','Sundel Bolong','Cerita rakyat','Jawa','kuntilanak','#bfbcbc'],
 ['siluman_harimau','Siluman Harimau','Folklor','Sumatra','tiger','#d39e58']
,
 ["orangutan", "Orangutan Kalimantan", "Fauna", "Kalimantan", "orangutan", "#b66e45"],
 ["badak_jawa", "Badak Jawa", "Fauna", "Jawa", "rhino", "#858177"],
 ["gajah_sumatra", "Gajah Sumatra", "Fauna", "Sumatra", "elephant", "#8f9995"],
 ["jalak_bali", "Jalak Bali", "Fauna", "Bali", "starling", "#f2eee5"],
 ["elang_jawa", "Elang Jawa", "Fauna", "Jawa", "eagle", "#7e603f"],
 ["rusa_bawean", "Rusa Bawean", "Fauna", "Jawa Timur", "deer", "#b69b7a"],
 ["tarsius", "Tarsius Sulawesi", "Fauna", "Sulawesi", "tarsier", "#a28d75"],
 ["babirusa", "Babirusa Sulawesi", "Fauna", "Sulawesi", "babirusa", "#8c7e78"],
 ["rangkong_badak", "Rangkong Badak", "Fauna", "Kalimantan & Sumatra", "hornbill", "#42352e"],
 ["kasuari", "Kasuari Gelambir Ganda", "Fauna", "Papua", "cassowary", "#1d414f"],
 ["penyu_hijau", "Penyu Hijau", "Fauna", "Perairan Indonesia", "turtle", "#769582"],
 ["duyung", "Duyung", "Fauna", "Perairan Indonesia", "dugong", "#8d9796"],
 ["arwana", "Arwana Asia", "Fauna", "Kalimantan & Sumatra", "arowana", "#c89658"],
 ["kakatua_raja", "Kakatua Raja", "Fauna", "Papua", "cockatoo", "#343436"],
 ["merak_hijau", "Merak Hijau", "Fauna", "Jawa", "peafowl", "#3f9e88"],
 ["owa_jawa", "Owa Jawa", "Fauna", "Jawa Barat", "gibbon", "#8e9694"],
 ["banteng_jawa","Banteng Jawa","Fauna","Jawa & Kalimantan","banteng","#8e5639"],
 ["trenggiling","Trenggiling Sunda","Fauna","Sumatra, Jawa, Kalimantan","pangolin","#8c774e"],
 ["binturong","Binturong","Fauna","Sumatra & Kalimantan","binturong","#504e50"],
 ["kancil","Kancil","Fauna","Sumatra & Kalimantan","kancil","#bc9a69"],
 ["kukang_jawa","Kukang Jawa","Fauna","Jawa","loris","#9d8063"],
 ["kucing_bakau","Kucing Bakau","Fauna","Sumatra & Jawa","fishing_cat","#8c8c6a"],
 ["nuri_bayan","Nuri Bayan","Fauna","Maluku & Papua","eclectus","#468e66"],
 ["kuau_raja","Kuau Raja","Fauna","Sumatra","argus","#a47e4b"],
 ["pari_manta","Pari Manta Karang","Fauna","Perairan Indonesia","manta","#486973"],
 ["ikan_napoleon","Ikan Napoleon","Fauna","Terumbu karang Indonesia","wrasse","#428b86"],
 ["ebu_gogo","Ebu Gogo","Folklor","Flores, Nusa Tenggara Timur","ebu_gogo","#876c56"],
 ["suanggi","Suanggi","Folklor","Maluku dan Indonesia Timur","suanggi","#735d7b"],
 ["orang_pendek","Orang Pendek","Kriptid","Sumatra","orang_pendek","#796f4f"],
 ["kebo_iwa","Kebo Iwa","Legenda","Bali","kebo_iwa","#ae916c"],
["beruang_madu", "Beruang Madu", "Fauna", "Kalimantan & Sumatra", "sun_bear", "#5c4c3f"],
["tapir_asia", "Tapir Asia", "Fauna", "Sumatra", "tapir", "#777879"],
["lutung_jawa", "Lutung Jawa", "Fauna", "Jawa", "langur", "#505458"],
["siamang", "Siamang", "Fauna", "Sumatra", "siamang", "#323132"],
["kuskus_beruang", "Kuskus Beruang", "Fauna", "Sulawesi", "bear_cuscus", "#8a7760"],
["pesut_mahakam", "Pesut Mahakam", "Fauna", "Sungai Mahakam, Kalimantan Timur", "irrawaddy_dolphin", "#94a5a0"],
["rangkong_gading", "Rangkong Gading", "Fauna", "Sumatra & Kalimantan", "helmeted_hornbill", "#514334"],
["kakatua_jambul_kuning", "Kakatua Kecil Jambul Kuning", "Fauna", "Nusa Tenggara & Sulawesi", "yellow_cockatoo", "#e7e5db"],
["walabi_papua", "Walabi Lincah Papua", "Fauna", "Papua", "agile_wallaby", "#a2896b"],
["kanguru_pohon_kelabu", "Kanguru Pohon Kelabu", "Fauna", "Papua", "tree_kangaroo", "#8f7964"],
["kura_ambon", "Kura-kura Kotak Ambon", "Fauna", "Maluku dan Sulawesi", "amboina_box_turtle", "#465b3e"],
["buaya_muara", "Buaya Muara", "Fauna", "Berbagai pesisir Indonesia", "saltwater_crocodile", "#637364"],
["elang_flores", "Elang Flores", "Fauna", "Nusa Tenggara", "flores_eagle", "#8a745c"],
["ikan_belida", "Ikan Belida", "Fauna", "Sumatra & Kalimantan", "knifefish", "#a9a277"],
["mola_mola", "Ikan Mola-Mola", "Fauna", "Laut Bali & Nusa Tenggara", "sunfish", "#a1a7a4"],
["hiu_paus", "Hiu Paus", "Fauna", "Laut Indonesia", "whale_shark", "#4e6b82"],
["pari_totol_biru", "Pari Totol Biru", "Fauna", "Perairan Indonesia", "blue_spotted_ray", "#60888d"],
["bekisar", "Ayam Bekisar", "Fauna", "Jawa Timur", "bekisar", "#b78b55"],
["kupu_raja", "Kupu-Kupu Sayap Burung Raja", "Fauna", "Papua & Maluku", "birdwing", "#e4b562"],
["kumbang_atlas", "Kumbang Tanduk Atlas", "Fauna", "Sumatra & Jawa", "atlas_beetle", "#755b44"],
["biawak_biru", "Biawak Pohon Biru", "Fauna", "Pulau Batanta, Raja Ampat", "blue_monitor", "#357a9a"],
["musang_pandan", "Musang Pandan", "Fauna", "Sumatra, Jawa & Kalimantan", "palm_civet", "#79705c"],
["rusa_timor", "Rusa Timor", "Fauna", "Nusa Tenggara", "rusa_timor", "#aa8156"],
["ikan_badut", "Ikan Badut", "Fauna", "Terumbu Karang Indonesia", "clownfish", "#f0a045"],
["cindaku", "Cindaku Kerinci", "Folklor", "Kerinci, Jambi", "cindaku", "#a67b4d"],
 ["gelatik_jawa", "Gelatik Jawa", "Fauna", "Jawa & Bali", "java_sparrow", "#8b929c"],
 ["julang_sulawesi", "Julang Sulawesi", "Fauna", "Sulawesi", "sulawesi_hornbill", "#c9a27a"],
 ["beo_nias", "Beo Nias", "Fauna", "Pulau Nias, Sumatra", "nias_myna", "#555858"],
 ["kakatua_maluku", "Kakatua Maluku", "Fauna", "Maluku", "salmon_cockatoo", "#f2d7ce"],
 ["ayam_hutan_hijau", "Ayam Hutan Hijau", "Fauna", "Jawa, Bali & Nusa Tenggara", "green_junglefowl", "#356e5f"],
 ["bidadari_hal", "Burung Bidadari Halmahera", "Fauna", "Halmahera, Maluku Utara", "standardwing", "#836d4c"],
 ["serak_jawa", "Serak Jawa", "Fauna", "Jawa & Sumatra", "barn_owl", "#c7b391"],
 ["landak_jawa", "Landak Jawa", "Fauna", "Jawa", "porcupine", "#7c7264"],
 ["musang_air", "Musang Air", "Fauna", "Sumatra & Kalimantan", "otter_civet", "#626966"],
 ["kuskus_tutul", "Kuskus Tutul", "Fauna", "Papua", "spotted_cuscus", "#e4d0b9"],
 ["kuda_laut_kerdil", "Kuda Laut Kerdil", "Fauna", "Perairan Sulawesi", "pygmy_seahorse", "#dc8f9b"],
 ["hiu_berjalan_hal", "Hiu Berjalan Halmahera", "Fauna", "Maluku Utara", "walking_shark", "#b58e6a"],
 ["udang_mantis", "Udang Mantis Merak", "Fauna", "Perairan Indonesia", "peacock_mantis", "#438d87"],
 ["ketam_kenari", "Ketam Kenari", "Fauna", "Kepulauan Maluku & Papua", "coconut_crab", "#6a86a4"],
 ["belangkas", "Belangkas", "Fauna", "Pesisir Indonesia", "horseshoe_crab", "#8e7153"],
 ["labi_moncong_babi", "Labi-labi Moncong Babi", "Fauna", "Papua Selatan", "pig_nose_turtle", "#919d8b"],
 ["sanca_hijau", "Sanca Hijau", "Fauna", "Papua", "green_python", "#66b975"],
 ["kobra_jawa", "Kobra Jawa", "Fauna", "Jawa & Nusa Tenggara", "javan_cobra", "#7d786c"],
 ["bunglon_surai", "Bunglon Surai", "Fauna", "Jawa & Bali", "crested_lizard", "#8eaa68"],
 ["katak_terbang", "Katak Terbang Wallace", "Fauna", "Sumatra & Kalimantan", "flying_frog", "#70ab76"],
 ["kodok_merah", "Kodok Merah Jawa", "Fauna", "Jawa Barat", "javan_red_toad", "#aa554e"],
 ["tuntong_laut", "Tuntong Laut", "Fauna", "Sumatra & Kalimantan", "river_terrapin", "#717b68"],
 ["paruh_kodok", "Burung Paruh Kodok Jawa", "Fauna", "Pulau Jawa", "frogmouth", "#99866d"],
 ["warak_ngendog", "Warak Ngendog", "Warisan budaya", "Semarang, Jawa Tengah", "warak", "#d36c55"],
 ["jatayu", "Jatayu", "Mitologi wayang", "Jawa & Bali", "jatayu", "#98734f"],
 ["orang_bati", "Orang Bati", "Kriptid", "Pulau Seram, Maluku", "bat_winged", "#715e64"],
 ["poppo", "Poppo", "Folklor", "Bugis–Makassar, Sulawesi Selatan", "floating_head", "#9a768d"],
 ["parakang", "Parakang", "Folklor", "Sulawesi Selatan", "shapeshifter", "#8b7564"],
 ["bedawang_nala", "Bedawang Nala", "Mitologi", "Tradisi Jawa dan Bali", "world_turtle", "#8a9271"],
 ["boraspati_tano", "Boraspati ni Tano", "Motif tradisi", "Batak, Sumatra Utara", "lizard_ornament", "#a18d68"],
 ["singa_barong_reog", "Singo Barong Reog", "Tradisi", "Ponorogo, Jawa Timur", "dadak_merak", "#a47753"],
 ["bujang_ganong", "Bujang Ganong", "Tradisi", "Ponorogo, Jawa Timur", "red_reog_mask", "#ba584f"],
 ["hanoman", "Hanoman", "Mitologi wayang", "Pewayangan Jawa dan Bali", "white_simian", "#e0d6c2"],
 ["makara_candi", "Makara Candi", "Motif tradisi", "Percandian Jawa", "makara", "#719295"],
 ["naga_padoha", "Naga Padoha", "Mitologi", "Batak Toba, Sumatra Utara", "batak_underworld_serpent", "#916b60"],
 ["yaki", "Yaki (Monyet Hitam Sulawesi)", "Fauna", "Sulawesi Utara", "crested_macaque", "#45434b"],
 ["orangutan_tapanuli", "Orangutan Tapanuli", "Fauna", "Batang Toru, Sumatra Utara", "tapanuli_orangutan", "#aa673d"],
 ["badak_sumatra", "Badak Sumatra", "Fauna", "Sumatra", "two_horned_rhino", "#7e726c"],
 ["kelinci_belang", "Kelinci Belang Sumatra", "Fauna", "Pegunungan Bukit Barisan, Sumatra", "striped_rabbit", "#aa8b70"],
 ["anjing_kintamani", "Anjing Kintamani Bali", "Fauna domestik", "Bali", "kintamani_dog", "#e5d9c4"],
 ["kalong_besar", "Kalong Besar", "Fauna", "Sumatra & Jawa", "large_fruit_bat", "#6f5b52"],
 ["tikus_flores", "Tikus Raksasa Flores", "Fauna", "Pulau Flores, Nusa Tenggara Timur", "flores_rat", "#997e67"],
 ["raja_udang_meninting", "Raja Udang Meninting", "Fauna", "Kepulauan Indonesia", "kingfisher", "#368b9f"],
 ["bangau_bluwok", "Bangau Bluwok", "Fauna", "Pesisir Sumatra dan Jawa", "milky_stork", "#c4c1ba"],
 ["gosong_maluku", "Burung Gosong Maluku", "Fauna", "Maluku", "moluccan_megapode", "#7a6356"],
 ["gurita_peniru", "Gurita Peniru", "Fauna", "Perairan Sulawesi", "mimic_octopus", "#b3876b"],
 ["gurita_cincin_biru", "Gurita Cincin Biru", "Fauna", "Perairan Indo-Pasifik, termasuk Indonesia", "blue_ring_octopus", "#afaa7f"],
 ["cumi_karang", "Cumi-cumi Karang", "Fauna", "Perairan Indonesia", "reef_squid", "#d6a48d"],
 ["ikan_mandarin", "Ikan Mandarin", "Fauna", "Terumbu Indonesia", "mandarinfish", "#4b9e94"],
 ["ular_laut_belang", "Ular Laut Belang", "Fauna", "Perairan Indo-Pasifik", "sea_krait", "#9da692"],
 ["bilou", "Bilou Mentawai", "Fauna", "Kepulauan Mentawai, Sumatra Barat", "mentawai_gibbon", "#3f4146"],
 ["simakobu", "Simakobu", "Fauna", "Kepulauan Mentawai, Sumatra Barat", "pig_tailed_langur", "#6c6258"],
 ["joja_mentawai", "Joja Mentawai", "Fauna", "Kepulauan Mentawai, Sumatra Barat", "mentawai_langur", "#6d6963"],
 ["bokkoi", "Bokkoi Mentawai", "Fauna", "Siberut, Mentawai", "mentawai_macaque", "#7a6653"],
 ["kucing_merah_kalimantan", "Kucing Merah Kalimantan", "Fauna", "Kalimantan", "borneo_bay_cat", "#b46f4f"],
 ["macan_dahan_sunda", "Macan Dahan Sunda", "Fauna", "Sumatra dan Kalimantan", "clouded_leopard", "#ad9678"],
 ["kambing_hutan_sumatra", "Kambing Hutan Sumatra", "Fauna", "Sumatra", "serow", "#78736a"],
 ["kijang_muncak", "Kijang Muncak", "Fauna", "Sumatra, Jawa dan Kalimantan", "muntjac", "#ad825a"],
 ["mambruk_victoria", "Mambruk Victoria", "Fauna", "Papua bagian utara", "victoria_crowned_pigeon", "#648d9b"],
 ["namdur_polos", "Namdur Polos", "Fauna", "Papua", "bowerbird", "#897a55"],
 ["kakatua_putih", "Kakatua Putih", "Fauna", "Maluku Utara", "umbrella_cockatoo", "#e2e0d5"],
 ["elang_bondol", "Elang Bondol", "Fauna", "Pesisir dan perairan Indonesia", "brahminy_kite", "#aa6b50"],
 ["paok_pancawarna", "Paok Pancawarna", "Fauna", "Jawa dan Bali", "javan_banded_pitta", "#6b92a0"],
 ["coelacanth_sulawesi", "Coelacanth Sulawesi", "Fauna", "Sulawesi Utara dan Maluku Utara", "coelacanth", "#6084a0"],
 ["capungan_banggai", "Capungan Banggai", "Fauna", "Kepulauan Banggai, Sulawesi Tengah", "banggai_cardinalfish", "#c8af9a"],
 ["penyu_sisik", "Penyu Sisik", "Fauna", "Terumbu karang Indonesia", "hawksbill_turtle", "#a48d5e"],
 ["buntal_landak", "Ikan Buntal Landak", "Fauna", "Terumbu tropis Indonesia", "porcupinefish", "#b0a373"],
 ["ikan_kakatua", "Ikan Kakatua", "Fauna", "Terumbu Indonesia", "parrotfish", "#48a49b"],
 ["kepiting_biola", "Kepiting Biola", "Fauna", "Pesisir berlumpur Indonesia", "fiddler_crab", "#c8865f"],
 ["nudibranch", "Siput Laut Nudibranch", "Fauna", "Terumbu Indo-Pasifik", "nudibranch", "#a46bb0"],
 ["teripang_nanas", "Teripang Nanas", "Fauna", "Perairan Indonesia", "sea_cucumber", "#a68b68"],
 ["udang_pistol", "Udang Pistol", "Fauna", "Pesisir tropis Indonesia", "pistol_shrimp", "#b77e61"],
 ["kobra_raja", "Ular Kobra Raja", "Fauna", "Sumatra dan Kalimantan", "king_cobra", "#6d7a56"],
 ["buaya_papua", "Buaya Air Tawar Papua", "Fauna", "Papua", "new_guinea_crocodile", "#74866b"],
 ["nenek_pakande", "Nenek Pakande", "Folklor", "Bugis, Sulawesi Selatan", "pakande", "#94879b"],
 ["dingiso", "Dingiso Papua", "Fauna", "Pegunungan Papua", "dingiso", "#515057"],
 ["musang_sulawesi", "Musang Sulawesi", "Fauna", "Sulawesi", "sulawesi_civet", "#967d61"],
 ["babi_sulawesi", "Babi Hutan Sulawesi", "Fauna", "Sulawesi", "sulawesi_pig", "#6c6253"],
 ["tupai_terbang_merah", "Tupai Terbang Merah", "Fauna", "Sumatra, Jawa, Kalimantan", "flying_squirrel", "#a85743"],
 ["rusa_sambar", "Rusa Sambar", "Fauna", "Sumatra dan Kalimantan", "sambar", "#8f6447"],
 ["kucing_hutan_jawa", "Kucing Hutan Sunda", "Fauna", "Jawa, Bali, Sumatra, Kalimantan", "leopard_cat", "#ae8755"],
 ["kuskus_kelabu", "Kuskus Kelabu", "Fauna", "Maluku dan Papua", "grey_cuscus", "#9f9e93"],
 ["celepuk_siau", "Celepuk Siau", "Fauna", "Pulau Siau, Sulawesi Utara", "siau_owl", "#8e7357"],
 ["cendrawasih_wilson", "Cenderawasih Wilson", "Fauna", "Waigeo–Batanta, Raja Ampat", "wilson_bird", "#a53238"],
 ["cendrawasih_raja", "Cenderawasih Raja", "Fauna", "Papua dan pulau sekitarnya", "king_bird", "#bf3435"],
 ["elang_laut_putih", "Elang Laut Perut Putih", "Fauna", "Pesisir Indonesia", "sea_eagle", "#6b7888"],
 ["bangau_tongtong", "Bangau Tongtong", "Fauna", "Sumatra, Jawa, Kalimantan", "lesser_adjutant", "#777d78"],
 ["penyu_belimbing", "Penyu Belimbing", "Fauna", "Perairan Indonesia", "leatherback", "#333e4d"],
 ["manta_oseanik", "Pari Manta Oseanik", "Fauna", "Laut lepas Indonesia", "ocean_manta", "#394857"],
 ["kuda_laut_kuda", "Kuda Laut Kuda", "Fauna", "Perairan tropis Indonesia", "seahorse_kuda", "#c7a570"],
 ["ikan_terbang", "Ikan Terbang", "Fauna", "Perairan Indonesia", "flying_fish", "#689ba2"],
 ["moray_raksasa", "Belut Moray Raksasa", "Fauna", "Terumbu Indonesia", "giant_moray", "#768b6b"],
 ["lepu_batu", "Ikan Lepu Batu", "Fauna", "Terumbu Indonesia", "stonefish", "#84745b"],
 ["paus_sperma", "Paus Sperma", "Fauna", "Laut dalam Indonesia", "sperm_whale", "#576477"],
 ["lumba_hidung_botol", "Lumba-lumba Hidung Botol Indo-Pasifik", "Fauna", "Perairan pesisir Indonesia", "bottlenose", "#809aa8"],
 ["kupu_raja_brooke", "Kupu-kupu Raja Brooke", "Fauna", "Sumatra dan Kalimantan", "brooke_birdwing", "#214c47"],
 ["dewi_sri", "Dewi Sri", "Mitologi", "Tradisi agraris Jawa dan Sunda", "dewi_sri", "#a7a05e"],
 ["nyi_roro_kidul", "Nyi Roro Kidul", "Folklor", "Pesisir selatan Jawa", "roro_kidul", "#3d8d8a"],
 ["batara_kala", "Batara Kala", "Mitologi", "Pewayangan Jawa", "batara_kala", "#80634d"],
 ["putri_mandalika", "Putri Mandalika", "Folklor", "Sasak, Lombok, NTB", "mandalika", "#4c94a5"],
 ["linsang_belang", "Linsang Belang", "Fauna", "Sumatra dan Kalimantan", "n47Linsang", "#bba477"],
 ["musang_akar", "Musang Akar", "Fauna", "Sumatra dan Kalimantan", "n47PalmCivet", "#9a855f"],
 ["bajing_sulawesi", "Bajing Tanah Sulawesi", "Fauna", "Sulawesi", "n47SulawesiSquirrel", "#b65038"],
 ["landak_sumatra", "Landak Sumatra", "Fauna", "Sumatra", "n47Porcupine", "#5c4d47"],
 ["rangkong_perut_putih", "Kangkareng Perut Putih", "Fauna", "Sumatra dan Kalimantan", "n47PiedHornbill", "#ddd5b3"],
 ["kucica_hutan", "Kucica Hutan", "Fauna", "Sumatra dan Kalimantan", "n47Shama", "#bd6f44"],
 ["tokhtor_sumatra", "Tokhtor Sumatra", "Fauna", "Pegunungan Bukit Barisan", "n47GroundCuckoo", "#67836e"],
 ["cenderawasih_merah", "Cenderawasih Merah", "Fauna", "Raja Ampat, Papua Barat Daya", "n47RedBird", "#c64d4d"],
 ["puyuh_sengayan", "Puyuh Sengayan", "Fauna", "Sumatra", "n47CrestedPartridge", "#4f5971"],
 ["paok_schneider", "Paok Schneider", "Fauna", "Pegunungan Sumatra", "n47MountainPitta", "#8b644f"],
 ["katak_mutiara", "Katak Pohon Mutiara", "Fauna", "Jawa", "n47TreeFrog", "#bd795e"],
 ["cecak_terbang", "Cecak Terbang", "Fauna", "Sumatra dan Kalimantan", "n47FlyingLizard", "#8a9768"],
 ["kadal_lidah_biru", "Kadal Lidah Biru", "Fauna", "Papua dan Maluku", "n47BlueTongue", "#9b8870"],
 ["sanca_batik", "Sanca Batik", "Fauna", "Sumatra, Jawa, Kalimantan", "n47ReticulatedPython", "#998b64"],
 ["ular_terbang_surga", "Ular Terbang Surga", "Fauna", "Sumatra dan Kalimantan", "n47FlyingSnake", "#81a65e"],
 ["kerapu_macan", "Kerapu Macan", "Fauna", "Terumbu karang Indonesia", "n47Grouper", "#a69360"],
 ["pari_elang_totol", "Pari Elang Totol", "Fauna", "Laut Indonesia", "n47EagleRay", "#415c77"],
 ["hiu_karang_hitam", "Hiu Karang Sirip Hitam", "Fauna", "Terumbu Indonesia", "n47BlacktipShark", "#7a99a5"],
 ["kima_raksasa", "Kima Raksasa", "Fauna", "Terumbu karang Indonesia", "n47GiantClam", "#5d9e9c"],
 ["bintang_laut_biru", "Bintang Laut Biru", "Fauna", "Perairan dangkal Indonesia", "n47BlueStarfish", "#367cb5"],
 ["ubur_ubur_totol", "Ubur-Ubur Totol", "Fauna", "Perairan Papua", "n47Jellyfish", "#8ac4c4"],
 ["ikan_gergaji_hijau", "Ikan Gergaji Hijau", "Fauna", "Perairan pesisir Indonesia", "n47Sawfish", "#728c76"],
 ["gatotkaca", "Gatotkaca", "Pewayangan", "Tradisi Jawa dan Bali", "n47Gatotkaca", "#b88a58"],
 ["bima_wayang", "Bima (Werkudara)", "Pewayangan", "Tradisi Jawa", "n47Bima", "#536474"],
 ["buto_cakil", "Buto Cakil", "Pewayangan", "Tradisi pewayangan Jawa", "n47Cakil", "#8b7557"],
 ["si_manis_jembatan_ancol", "Si Manis Jembatan Ancol", "Folklor", "Jakarta", "nj56Specter", "#d9c6ba"],
 ["hantu_jeruk_purut", "Hantu Jeruk Purut", "Folklor", "Jakarta", "nj56Specter", "#7b9a88"],
 ["dewi_lanjar", "Dewi Lanjar", "Folklor", "Pekalongan, Jawa Tengah", "nj56Queen", "#79b3ae"],
 ["jaka_tarub", "Jaka Tarub", "Folklor", "Jawa Tengah", "nj56Hero", "#a18a68"],
 ["nawang_wulan", "Nawang Wulan", "Folklor", "Tradisi Jawa", "nj56Queen", "#bd99c9"],
 ["timun_mas", "Timun Mas", "Folklor", "Jawa Tengah", "nj56Hero", "#d4ac64"],
 ["keong_mas", "Keong Mas", "Folklor", "Jawa Timur", "nj56Shell", "#d3aa53"]
];

const NJ65_IDS=new Set(["rangkong_papan", "julang_emas", "enggang_klihingan", "kangkareng_hitam", "pelatuk_ayam", "pelatuk_kuduk_kuning", "burung_gosong_maluku", "sempidan_biru", "sempidan_sumatra", "poksai_jambul", "ciung_batu_sumatra", "cica_daun_besar", "takur_tenggeret", "takur_ungkut_ungkut", "kedasi_hitam", "cekakak_sungai", "raja_udang_biru", "cekakak_jawa", "burung_madu_sepah_raja", "burung_madu_kelapa", "cipoh_kacat", "merbah_cerukcuk", "cucak_kutilang", "cucak_rawa", "trulek_jawa", "belibis_kembang", "itik_benjut", "mandar_besar", "ayam_hutan_merah", "kakatua_koki", "nuri_kepala_hitam", "nuri_pelangi", "perkici_pelangi", "kasturi_ternate", "kasturi_raja", "betet_biasa", "serindit_melayu", "serindit_sulawesi", "nuri_tanimbar", "nuri_maluku", "merpati_mahkota_biru"]);
const NJ46_IDS=new Set(["dingiso", "musang_sulawesi", "babi_sulawesi", "tupai_terbang_merah", "rusa_sambar", "kucing_hutan_jawa", "kuskus_kelabu", "celepuk_siau", "cendrawasih_wilson", "cendrawasih_raja", "elang_laut_putih", "bangau_tongtong", "penyu_belimbing", "manta_oseanik", "kuda_laut_kuda", "ikan_terbang", "moray_raksasa", "lepu_batu", "paus_sperma", "lumba_hidung_botol", "kupu_raja_brooke", "dewi_sri", "nyi_roro_kidul", "batara_kala", "putri_mandalika"]);
const NJ49_IDS=new Set(["kuskus_beruang_sulawesi", "kucing_tandang", "kucing_merah_borneo", "kuskus_talaud", "krabuku_sangihe", "lutung_budeng"]);
const NJ47_IDS=new Set(["linsang_belang", "musang_akar", "bajing_sulawesi", "landak_sumatra", "rangkong_perut_putih", "kucica_hutan", "tokhtor_sumatra", "cenderawasih_merah", "puyuh_sengayan", "paok_schneider", "katak_mutiara", "cecak_terbang", "kadal_lidah_biru", "sanca_batik", "ular_terbang_surga", "kerapu_macan", "pari_elang_totol", "hiu_karang_hitam", "kima_raksasa", "bintang_laut_biru", "ubur_ubur_totol", "ikan_gergaji_hijau", "gatotkaca", "bima_wayang", "buto_cakil"]);
const NJ42_IDS=new Set(["bilou", "simakobu", "joja_mentawai", "bokkoi", "kucing_merah_kalimantan", "macan_dahan_sunda", "kambing_hutan_sumatra", "kijang_muncak", "mambruk_victoria", "namdur_polos", "kakatua_putih", "elang_bondol", "paok_pancawarna", "coelacanth_sulawesi", "capungan_banggai", "penyu_sisik", "buntal_landak", "ikan_kakatua", "kepiting_biola", "nudibranch", "teripang_nanas", "udang_pistol", "kobra_raja", "buaya_papua", "nenek_pakande"]);
const NJ42_SOURCES={"bilou": "https://ksdae.kehutanan.go.id/kawasan-konservasi/100241003/", "simakobu": "https://ksdae.kehutanan.go.id/kawasan-konservasi/100241003/", "joja_mentawai": "https://ksdae.kehutanan.go.id/kawasan-konservasi/100241003/", "bokkoi": "https://www.tamannasionalsiberut.org/2023/01/empat-primata-endemik-kepulauan-mentawai.html", "kucing_merah_kalimantan": "https://www.catsg.org/living-species-baycat", "macan_dahan_sunda": "https://www.catsg.org/living-species-sundacloudedleopard", "mambruk_victoria": "https://collections.museumsvictoria.com.au/specimens/420347", "kakatua_putih": "https://ksdae.kehutanan.go.id/kawasan-konservasi/100246046/", "coelacanth_sulawesi": "https://www.nature.com/articles/s41598-025-90287-7", "capungan_banggai": "https://www.fisheries.noaa.gov/species/banggai-cardinalfish", "penyu_sisik": "https://www.wwf.id/id/blog/penyu", "nenek_pakande": "https://portalbpsdm.jambiprov.go.id/artikel/buku-sastra/legenda-nenek-pakande-hantu-bugis-pemakan-anak-yang-melegenda-dari-sulawesi-selatan/"};
const NJ41_IDS=new Set(["orang_bati", "poppo", "parakang", "bedawang_nala", "boraspati_tano", "singa_barong_reog", "bujang_ganong", "hanoman", "makara_candi", "naga_padoha", "yaki", "orangutan_tapanuli", "badak_sumatra", "kelinci_belang", "anjing_kintamani", "kalong_besar", "tikus_flores", "raja_udang_meninting", "bangau_bluwok", "gosong_maluku", "gurita_peniru", "gurita_cincin_biru", "cumi_karang", "ikan_mandarin", "ular_laut_belang"]);
const NJ41_SOURCES={"orang_bati": "https://tirto.id/makhluk-mitologi-indonesia-yang-melegenda-g9nQ", "poppo": "https://www.detik.com/sulsel/budaya/d-7047817/mengenal-poppo-mitos-manusia-jadi-jadian-dalam-kepercayaan-bugis-makassar", "parakang": "https://budaya-indonesia.org/Legenda-Poppo-dan-Parakang", "bedawang_nala": "https://sonobudoyo.jogjaprov.go.id/id/tulisan/read/bedawang-nala", "boraspati_tano": "https://www.metmuseum.org/art/collection/search/315889", "singa_barong_reog": "https://www.indonesia.travel/id/id/destination/java/east-java/reog-ponorogo", "bujang_ganong": "https://www.indonesia.travel/id/id/destination/java/east-java/reog-ponorogo", "hanoman": "https://sonobudoyo.jogjaprov.go.id/id/tulisan/read/mengenal-tokoh-pewayangan-sang-hanoman-part-1", "makara_candi": "https://kebudayaan.kemdikbud.go.id/bkborobudur/makara-sebagai-hiasan-di-pintu-masuk-candi/", "naga_padoha": "https://australian.museum/learn/cultures/international-collection/indonesia/creation-story-from-lake-toba-sumatra-indonesia/", "orangutan_tapanuli": "https://iucn.org/news/species/201711/new-orangutan-species-described-indonesia", "kelinci_belang": "https://www.nature.com/articles/s41598-025-85212-x", "tikus_flores": "https://ejournal.brin.go.id/treubia/article/view/10225", "gurita_peniru": "https://onlinelibrary.wiley.com/doi/10.1111/j.1095-8312.2007.00948.x"};
const NJ40_IDS=new Set(["gelatik_jawa", "julang_sulawesi", "beo_nias", "kakatua_maluku", "ayam_hutan_hijau", "bidadari_hal", "serak_jawa", "landak_jawa", "musang_air", "kuskus_tutul", "kuda_laut_kerdil", "hiu_berjalan_hal", "udang_mantis", "ketam_kenari", "belangkas", "labi_moncong_babi", "sanca_hijau", "kobra_jawa", "bunglon_surai", "katak_terbang", "kodok_merah", "tuntong_laut", "paruh_kodok", "warak_ngendog", "jatayu"]);
const NJ40_SOURCES={"warak_ngendog": "https://semarang.pom.go.id/berita/warak-quiz-adopsi-mainan-khas-semarang", "jatayu": "https://sonobudoyo.jogjaprov.go.id/id/tulisan/read/jatayu-burung-penjaga-kebenaran-dalam-kisah-ramayana-dan-imajinasi-budaya-jawa", "katak_terbang": "https://amphibiansoftheworld.amnh.org/Amphibia/Anura/Rhacophoridae/Rhacophorinae/Rhacophorus/Rhacophorus-nigropalmatus", "hiu_berjalan_hal": "https://repository.ipb.ac.id/handle/123456789/98245", "labi_moncong_babi": "https://panduanhewan.org/id/spesies/labi-labi-moncong-babi/"};
const NJ39_IDS=new Set(["beruang_madu", "tapir_asia", "lutung_jawa", "siamang", "kuskus_beruang", "pesut_mahakam", "rangkong_gading", "kakatua_jambul_kuning", "walabi_papua", "kanguru_pohon_kelabu", "kura_rote", "buaya_muara", "elang_flores", "ikan_belida", "mola_mola", "hiu_paus", "pari_totol_biru", "bekisar", "kupu_raja", "kumbang_atlas", "biawak_biru", "musang_pandan", "rusa_timor", "ikan_badut", "cindaku"]);
const NJ39_SOURCES={"pesut_mahakam": "https://iucn-csg.org/irrawaddy-dolphins-pesut-in-indonesias-mahakam-river/", "kura_rote": "https://www.wwf.id/id/blog/kura-kura-leher-ular", "kuskus_beruang": "https://animaldiversity.org/accounts/Ailurops_ursinus/", "cindaku": "https://www.detik.com/sumut/berita/d-6578609/7-mitos-seram-gunung-kerinci-dijaga-oleh-manusia-harimau", "rangkong_gading": "https://www.birdlife.org/wp-content/uploads/2022/09/SOWB2022_EN_compressed.pdf"};
Object.assign(NJ39_SOURCES,NJ40_SOURCES,NJ41_SOURCES,NJ42_SOURCES);
const NJ36_PROFILES={"komodo":["Savana vulkanik Nusa Tenggara","Tubuh rendah kokoh, sisik kasar, cakar kuat dan lidah bercabang."],"tiger":["Rimba Sumatra","Kucing besar bermotif belang gelap, kaki berotot dan telapak bercakar."],"cendrawasih":["Kanopi Papua","Bulu hias menjuntai dan sayap pertunjukan; mengacu pada kelompok burung surga."],"lembuswana":["Sungai Mahakam, Kutai","Sosok hibrida berbelalai, bertaring, bersayap dan bermahkota pada seni Kutai."],"kuyang":["Cerita rakyat Kalimantan","Kepala melayang dengan rambut panjang dan sulur abstrak; adaptasi non-grafis."],"anoa":["Pegunungan Sulawesi","Bovidae endemik dengan tubuh padat, tanduk relatif kecil dan ramping."],"maleo":["Pesisir Sulawesi","Burung khas dengan tonjolan kepala, kaki panjang dan telur berukuran besar."],"bekantan":["Tepian sungai Kalimantan","Primata berwarna tembaga dengan hidung besar dan ekor panjang."],"garuda":["Motif seni Nusantara","Burung mitologis bersayap lebar, jambul keemasan dan dada berhias."],"naga_basuki":["Legenda Bali","Naga panjang dengan ornamen pelindung; rupa bervariasi dalam seni Bali."],"barong":["Seni pertunjukan Bali","Figur pelindung berkepala singa dengan mahkota dan bulu hias."],"rangda":["Seni pertunjukan Bali","Figur bertaring, bermata besar dan berambut panjang; bukan potret ritual."],"leak":["Legenda Bali","Kisah perubahan rupa dalam tradisi tutur; visual ini interpretasi fantasi."],"kuntilanak":["Cerita rakyat berbagai daerah","Sosok perempuan berpakaian putih dan berambut panjang dalam cerita rakyat."],"pocong":["Cerita rakyat berbagai daerah","Sosok terbungkus kain kafan dengan ikatan pada ujungnya."],"genderuwo":["Cerita rakyat Jawa","Makhluk besar dan berbulu dalam kisah lisan Jawa."],"tuyul":["Cerita rakyat Jawa","Makhluk kecil berwujud anak dalam kisah-kisah rakyat."],"wewe":["Cerita rakyat Jawa","Sosok perempuan dengan rambut panjang dan lengan memanjang."],"jenglot":["Folklor populer Jawa","Sosok mungil berambut lebat, berkuku panjang dalam cerita populer."],"banaspati":["Cerita rakyat Jawa","Entitas api melayang, dikisahkan muncul seperti bola atau lidah api."],"sembrani":["Cerita mitologis Jawa","Kuda terbang bersayap besar; fantasi dalam tradisi tutur."],"buto_ijo":["Cerita rakyat Jawa","Raksasa hijau bertubuh besar dengan taring menonjol."],"palasik":["Folklor Minangkabau","Kepala melayang dalam variasi cerita rakyat Minangkabau."],"babi_ngepet":["Cerita rakyat Jawa","Sosok babi yang terkait cerita perubahan wujud manusia."],"ahool":["Kisah kriptid Jawa Barat","Kisah makhluk kelelawar besar; tidak diakui sebagai spesies ilmiah."],"bunian":["Folklor Sumatra","Orang halus tak kasatmata dalam cerita rakyat; visual simbolis."],"begu_ganjang":["Cerita Batak","Sosok tinggi menjulang dalam ragam kisah lisan Batak."],"nyai_blora":["Cerita siluman Jawa","Sosok hibrida manusia-ular dalam fiksi folklor; identitas bukan tunggal."],"hantu_banyu":["Cerita rakyat Kalimantan","Roh air dalam kisah lokal; digambarkan menggunakan sulur air bercahaya."],"naga_antaboga":["Mitologi Jawa dan Bali","Naga pelindung dunia bawah pada representasi tradisional."],"macan_putih":["Cerita rakyat Jawa","Macan putih sebagai figur gaib dalam beberapa tradisi lisan."],"kuda_lumping":["Seni pertunjukan Jawa","Properti kuda anyaman pada tari tradisional, bukan hewan hidup."],"ular_naga":["Mitologi Nusantara","Naga bersisik dengan detail tanduk dan kumis; rupa dapat bervariasi."],"sundel_bolong":["Cerita rakyat Jawa","Sosok perempuan berpakaian putih; lambang cerita ditampilkan non-grafis."],"siluman_harimau":["Folklor Sumatra","Kisah perubahan rupa manusia dan harimau, bukan jenis fauna ilmiah."]};

/* v6.4 — metadata identitas tambahan; referensi taksonomi awal, belum audit editorial menyeluruh. */
NJ36_PROFILES["hiu_martil_bergerigi"]=["Laut tropis Indonesia","Hiu dengan kepala melebar seperti palu dan lekukan tepi khas."];
NJ36_PROFILES["burung_madu_sriganti"]=["Berbagai pulau Indonesia","Burung kecil pemakan nektar; jantan memiliki bagian tenggorokan metalik."];
NJ36_PROFILES["kepodang_kuduk_hitam"]=["Sumatra, Jawa dan Kalimantan","Burung kuning mencolok dengan garis hitam dari mata ke tengkuk."];
NJ36_PROFILES["kancil_jawa"]=["Jawa","Mamalia kecil berkuku, sering diasosiasikan dengan tokoh kancil dalam dongeng."];
NJ36_PROFILES["kukabura_perut_merah"]=["Papua","Burung pekakak berparuh besar dan bagian perut kemerahan."];
NJ36_PROFILES["orangutan"]=["Hutan hujan Borneo", "Kera besar berbulu jingga kemerahan, bertangan panjang, dikenal hidup di pepohonan."];
NJ36_PROFILES["badak_jawa"]=["Ujung Kulon, Banten", "Badak bercula satu dengan lipatan kulit menyerupai pelat pada tubuhnya."];
NJ36_PROFILES["gajah_sumatra"]=["Hutan Sumatra", "Gajah Asia subspesies Sumatra dengan telinga lebar, belalai panjang dan tubuh besar."];
NJ36_PROFILES["jalak_bali"]=["Hutan Bali Barat", "Burung putih berjambul, memiliki kulit biru di sekitar mata dan ujung sayap hitam."];
NJ36_PROFILES["elang_jawa"]=["Kanopi Pulau Jawa", "Burung pemangsa berjambul dengan sayap lebar, cakar kuat dan pola bulu cokelat-putih."];
NJ36_PROFILES["rusa_bawean"]=["Pulau Bawean, Laut Jawa", "Rusa kecil dengan kaki ramping, moncong panjang dan ranggah pada jantan."];
NJ36_PROFILES["tarsius"]=["Hutan Sulawesi", "Primata kecil bermata besar, jari-jari panjang, telinga terbuka dan ekor panjang."];
NJ36_PROFILES["babirusa"]=["Hutan Sulawesi", "Babi liar dengan taring khas; pada jantan taring atas melengkung melintasi moncong."];
NJ36_PROFILES["rangkong_badak"]=["Hutan Sumatra dan Kalimantan", "Burung rangkong besar dengan paruh melengkung dan balung merah-kuning di atasnya."];
NJ36_PROFILES["kasuari"]=["Hutan Papua", "Burung besar yang tidak terbang, tubuh gelap, leher biru dan dua gelambir merah."];
NJ36_PROFILES["penyu_hijau"]=["Laut Indonesia", "Reptil laut bercangkang oval dengan sirip depan lebar dan paruh tanpa gigi."];
NJ36_PROFILES["duyung"]=["Perairan lamun Indonesia", "Mamalia laut herbivor bertubuh torpedo, bermoncong tumpul dan berekor bercagak."];
NJ36_PROFILES["arwana"]=["Sungai Sumatra dan Kalimantan", "Ikan bertubuh panjang bersisik besar, sirip belakang memanjang dan sungut pada bibir."];
NJ36_PROFILES["kakatua_raja"]=["Hutan Papua", "Kakatua hitam berjambul tinggi, berpipi merah dan berparuh besar."];
NJ36_PROFILES["merak_hijau"]=["Savana dan hutan terbuka Jawa", "Burung dengan leher hijau metalik dan bulu ekor hias berbintik mata pada jantan."];
NJ36_PROFILES["owa_jawa"]=["Hutan Jawa Barat", "Kera kecil tak berekor dengan lengan sangat panjang dan wajah berbingkai bulu."];
NJ36_PROFILES["banteng_jawa"]=["Hutan dataran rendah Indonesia","Sapi liar berotot dengan kaki bawah lebih terang, tanduk tebal melengkung, serta kepala panjang."];
NJ36_PROFILES["trenggiling"]=["Hutan dataran rendah dan semak tropis","Mamalia pemakan semut dengan sisik keratin saling bertumpuk, moncong panjang, dan ekor tebal."];
NJ36_PROFILES["binturong"]=["Tajuk hutan Sumatra dan Kalimantan","Karnivora berbulu panjang dan gelap, berkumis terang, memiliki ekor prehensil yang melingkar."];
NJ36_PROFILES["kancil"]=["Hutan tropis dataran rendah","Pelanduk kecil bertubuh ramping dengan empat kaki halus, kaki bercelah, dan moncong sempit."];
NJ36_PROFILES["kukang_jawa"]=["Hutan Jawa yang berkanopi rapat","Primata nokturnal bermata besar dengan pola topeng wajah gelap dan genggaman tangan kuat."];
NJ36_PROFILES["kucing_bakau"]=["Rawa dan tepi perairan","Kucing liar kekar dengan garis-bintik di tubuh, kaki kuat, dan ekor relatif pendek."];
NJ36_PROFILES["nuri_bayan"]=["Hutan kepulauan Indonesia Timur","Burung paruh bengkok berwarna mencolok dengan sayap melengkung dan ekor panjang; jantan dan betina memiliki warna berbeda."];
NJ36_PROFILES["kuau_raja"]=["Lantai hutan hujan Sumatra","Burung hutan jantan dengan bulu sayap sangat panjang, dihias banyak ocelli seperti mata."];
NJ36_PROFILES["pari_manta"]=["Laut tropis Indonesia","Ikan pari raksasa dengan sirip dada sangat lebar menyerupai sayap, celah mulut depan dan sirip kepala."];
NJ36_PROFILES["ikan_napoleon"]=["Terumbu karang tropis","Ikan karang berukuran besar, berkepala menonjol, bibir tebal dan tubuh kehijauan."];
NJ36_PROFILES["ebu_gogo"]=["Cerita lisan masyarakat Nage, Flores","Sosok kecil berbulu dengan wajah lebar dan kaki besar. Figur folklor; bukan rekonstruksi Homo floresiensis."];
NJ36_PROFILES["suanggi"]=["Tradisi lisan Indonesia Timur","Figur magis yang memiliki rupa berbeda menurut daerah. Visual ini simbol bayangan bersayap, bukan wujud baku."];
NJ36_PROFILES["orang_pendek"]=["Kisah kriptid hutan Sumatra","Sosok kecil seperti primata yang diceritakan berjalan tegak; belum terbukti sebagai spesies biologis."];
NJ36_PROFILES["kebo_iwa"]=["Legenda dan cerita rakyat Bali","Tokoh raksasa bertubuh tegap dalam kisah Bali; pemodelan ini representasi imajinatif, bukan potret tunggal."];
NJ36_PROFILES["beruang_madu"]=["Hutan tropis Kalimantan dan Sumatra","Beruang berukuran relatif kecil dengan telapak bercakar, moncong pendek dan bercak dada terang berbentuk bulan sabit."];
NJ36_PROFILES["tapir_asia"]=["Hutan tropis dataran rendah Sumatra","Badan depan dan belakang gelap, bagian tengah keputihan seperti selimut, belalai pendek yang lentur dan kaki berkuku."];
NJ36_PROFILES["lutung_jawa"]=["Hutan dataran rendah dan pegunungan Jawa","Primata ramping berekor sangat panjang, berbulu gelap, berwajah kecil dan hidup dalam kelompok."];
NJ36_PROFILES["siamang"]=["Kanopi hutan hujan Sumatra","Owa terbesar, tubuh hitam dengan lengan sangat panjang dan kantung tenggorokan yang menggembung saat bersuara."];
NJ36_PROFILES["kuskus_beruang"]=["Kanopi Sulawesi dan kepulauan Talaud","Marsupial arboreal berbulu tebal, berekor panjang yang dapat mencengkeram, wajah pendek dan tangan penggenggam."];
NJ36_PROFILES["pesut_mahakam"]=["Sungai Mahakam di Kalimantan Timur","Populasi lumba-lumba Irrawaddy air tawar dengan kepala tumpul tanpa paruh panjang dan sirip punggung kecil."];
NJ36_PROFILES["rangkong_gading"]=["Hutan primer Sumatra dan Kalimantan","Rangkong besar dengan bagian balung kepala padat, paruh panjang serta bulu ekor tengah memanjang."];
NJ36_PROFILES["kakatua_jambul_kuning"]=["Hutan dan tepi hutan Indonesia bagian tengah","Kakatua putih dengan jambul kuning yang dapat ditegakkan dan paruh bengkok kelabu."];
NJ36_PROFILES["walabi_papua"]=["Savana dan semak terbuka Papua","Marsupial darat dengan kaki belakang kuat, kepala kecil, telinga tegak serta ekor panjang untuk keseimbangan."];
NJ36_PROFILES["kanguru_pohon_kelabu"]=["Hutan hujan Papua","Kanguru pohon bertubuh relatif kekar dengan anggota tubuh mencengkeram cabang dan ekor panjang sebagai penyeimbang."];
NJ36_PROFILES["kura_ambon"]=["Perairan tenang dan lahan basah di Maluku dan Sulawesi","Cuora amboinensis: kura-kura kotak bertempurung cokelat gelap, plastron berengsel dan tiga garis kuning khas di sisi kepala. Berbeda dari kura-kura leher ular Rote. Status IUCN: Terancam (EN, asesmen 2020)."];
NJ39_SOURCES["kura_ambon"]="https://doi.org/10.2305/IUCN.UK.2020-2.RLTS.T5958A3078812.en";
NJ36_PROFILES["kura_rote"]=["Lahan basah Pulau Rote, NTT","Kura-kura air tawar endemik Rote, memiliki leher sangat panjang yang ditekuk ke samping, tempurung pipih oval."];
NJ36_PROFILES["buaya_muara"]=["Mangrove, estuari, dan aliran sungai pesisir","Reptil predator dengan moncong lebar, tubuh bersisik berpelat dan ekor panjang sangat kuat."];
NJ36_PROFILES["elang_flores"]=["Hutan Flores dan Kepulauan Nusa Tenggara","Burung pemangsa besar dengan dada lebih terang, paruh melengkung dan sayap lebar."];
NJ36_PROFILES["ikan_belida"]=["Sungai dan danau air tawar Sumatra dan Kalimantan","Ikan pipih memanjang dengan sirip anal sangat panjang yang bergelombang sepanjang bagian bawah tubuh."];
NJ36_PROFILES["mola_mola"]=["Perairan laut tropis lepas","Ikan bertubuh sangat tinggi dan pipih dengan sirip punggung dan anal panjang, serta ekor tereduksi."];
NJ36_PROFILES["hiu_paus"]=["Laut tropis, termasuk perairan Papua","Ikan terbesar dengan kepala lebar, mulut di depan dan corak bintik putih di punggung."];
NJ36_PROFILES["pari_totol_biru"]=["Dasar perairan terumbu karang","Pari pipih dengan cakram melebar, ekor ramping panjang dan pola totol biru cerah di bagian punggung."];
NJ36_PROFILES["bekisar"]=["Unggas domestik hasil persilangan","Ayam bekisar merupakan hibrida ayam hutan hijau dengan ayam domestik; jantan memiliki bulu hias dan kokok khas."];
NJ36_PROFILES["kupu_raja"]=["Hutan tropis Papua dan Maluku","Kupu-kupu sayap burung dengan bentang sayap sangat lebar dan pola kontras kuning-hitam."];
NJ36_PROFILES["kumbang_atlas"]=["Hutan tropis Indonesia","Kumbang tanduk jantan memiliki tiga tanduk kepala dan dada yang membentuk capit bercabang."];
NJ36_PROFILES["biawak_biru"]=["Hutan pohon Pulau Batanta, Raja Ampat","Biawak pohon berwarna biru kehijauan dengan tubuh ramping, jari bercakar dan ekor sangat panjang."];
NJ36_PROFILES["musang_pandan"]=["Hutan serta lanskap perkebunan Nusantara","Musang bermoncong lancip, tubuh panjang dengan totol belang punggung dan ekor cincin."];
NJ36_PROFILES["rusa_timor"]=["Savana dan hutan terbuka Nusa Tenggara","Rusa bertubuh ramping dengan kaki panjang dan ranggah bercabang pada individu jantan."];
NJ36_PROFILES["ikan_badut"]=["Terumbu karang Indonesia","Ikan anemon berwarna jingga dengan garis putih kontras dan sirip membulat, hidup berasosiasi dengan anemon laut."];
NJ36_PROFILES["cindaku"]=["Kisah rakyat Kerinci di sekitar Gunung Kerinci","Figur penjaga batas hutan dari cerita Kerinci, dikaitkan dengan manusia yang dapat berubah menjadi harimau. Rupa 3D hanyalah interpretasi simbolis."];

// NUSAJIWA 4.6: source-linked starter identification profiles (not conservation status verification).
NJ36_PROFILES["dingiso"]=["Hutan pegunungan tinggi Papua tengah", "Kanguru pohon gelap berperut cerah, ekor tebal, tungkai belakang kuat"];
NJ39_SOURCES["dingiso"]="https://www.mammaldiversity.org/taxon/1000259/";
NJ36_PROFILES["musang_sulawesi"]=["Hutan hujan primer Sulawesi", "Musang arboreal berekor bergelang pucat dan bercak punggung samar"];
NJ39_SOURCES["musang_sulawesi"]="https://animaldiversity.org/accounts/Macrogalidia_musschenbroekii/";
NJ36_PROFILES["babi_sulawesi"]=["Hutan dan mosaik habitat Sulawesi", "Babi liar Sulawesi; moncong kuat dan tonjolan wajah pada jantan"];
NJ39_SOURCES["babi_sulawesi"]="https://animaldiversity.org/accounts/Sus_celebensis/";
NJ36_PROFILES["tupai_terbang_merah"]=["Hutan berkanopi Asia Tenggara", "Tupai pohon besar dengan selaput luncur lebar dan ekor berbulu panjang"];
NJ39_SOURCES["tupai_terbang_merah"]="https://www.departments.bucknell.edu/biology/resources/msw3/browse.asp?id=12400394";
NJ36_PROFILES["rusa_sambar"]=["Hutan tropis dan area berhutan Asia Selatan–Tenggara", "Rusa besar berleher kuat, telinga besar dan ranggah bercabang pada jantan"];
NJ39_SOURCES["rusa_sambar"]="https://animaldiversity.org/accounts/Rusa_unicolor/";
NJ36_PROFILES["kucing_hutan_jawa"]=["Hutan, semak dan habitat mosaik Sunda", "Kucing liar kecil berbintik dan berekor belang, berbeda dari macan dahan"];
NJ39_SOURCES["kucing_hutan_jawa"]="https://www.catsg.org/living-species-leopardcat";
NJ36_PROFILES["kuskus_kelabu"]=["Hutan tropis Maluku dan Papua", "Marsupial malam bermuka bulat, bulu kelabu, ekor dapat mencengkeram"];
NJ39_SOURCES["kuskus_kelabu"]="https://animaldiversity.org/accounts/Phalanger_orientalis/";
NJ36_PROFILES["celepuk_siau"]=["Hutan Pulau Siau", "Burung hantu kecil bermata besar, cakram muka bundar, dan jumbai telinga"];
NJ39_SOURCES["celepuk_siau"]="https://www.birdlife.org/birds/list-of-owl-species/";
NJ36_PROFILES["cendrawasih_wilson"]=["Hutan pulau Raja Ampat, Papua Barat Daya", "Burung jantan berbulu merah-kuning-hijau dengan mahkota biru dan ekor berbentuk spiral"];
NJ39_SOURCES["cendrawasih_wilson"]="https://www.birdlife.org/";
NJ36_PROFILES["cendrawasih_raja"]=["Hutan dataran rendah Papua", "Burung surga mungil merah-putih dengan dua kawat ekor melengkung"];
NJ39_SOURCES["cendrawasih_raja"]="https://birdnet.cornell.edu/taxonomy/species/Cicinnurus%20regius";
NJ36_PROFILES["elang_laut_putih"]=["Pesisir, pulau dan perairan tropis", "Elang besar berkepala dan berperut putih, sayap lebar keabu-abuan"];
NJ39_SOURCES["elang_laut_putih"]="https://www.birdlife.org/";
NJ36_PROFILES["bangau_tongtong"]=["Rawa, pesisir dan lahan basah tropis", "Bangau sangat besar berkepala nyaris gundul, berparuh panjang dan berkaki tinggi"];
NJ39_SOURCES["bangau_tongtong"]="https://www.birdlife.org/";
NJ36_PROFILES["penyu_belimbing"]=["Samudra tropis dan pantai peneluran", "Penyu besar bercangkang kulit lunak dengan tujuh tonjolan memanjang"];
NJ39_SOURCES["penyu_belimbing"]="https://www.fisheries.noaa.gov/species/leatherback-turtle";
NJ36_PROFILES["manta_oseanik"]=["Perairan pelagis Samudra Hindia dan Pasifik", "Pari raksasa bermulut depan dengan dua sirip kepala dan sayap pipih lebar"];
NJ39_SOURCES["manta_oseanik"]="https://biogeodb.stri.si.edu/sftep/en/thefishes/species/268";
NJ36_PROFILES["kuda_laut_kuda"]=["Estuari, padang lamun dan terumbu tropis", "Kuda laut moncong panjang bertubuh beruas, ekor menggulung, jantan berkantong anakan"];
NJ39_SOURCES["kuda_laut_kuda"]="https://www.fishbase.se/summary/Hippocampus-kuda";
NJ36_PROFILES["ikan_terbang"]=["Laut tropis dan subtropis", "Ikan laut bersirip dada sangat lebar yang dapat meluncur di atas permukaan air"];
NJ39_SOURCES["ikan_terbang"]="https://biogeodb.stri.si.edu/sftep/en/thefishes/taxon/858";
NJ36_PROFILES["moray_raksasa"]=["Terumbu karang dan celah bebatuan", "Moray besar berbadan panjang, totol gelap dan rahang bergigi runcing"];
NJ39_SOURCES["moray_raksasa"]="https://biogeodb.stri.si.edu/sftep/en/thefishes/species/2506";
NJ36_PROFILES["lepu_batu"]=["Dasar karang berbatu tropis", "Ikan penyamar menyerupai batu dengan duri punggung berbahaya"];
NJ39_SOURCES["lepu_batu"]="https://www.fishbase.org/summary/5825";
NJ36_PROFILES["paus_sperma"]=["Perairan laut dalam dan samudra", "Paus bergigi berukuran besar dengan kepala persegi panjang dan lubang napas asimetris"];
NJ39_SOURCES["paus_sperma"]="https://animaldiversity.org/accounts/Physeteridae/";
NJ36_PROFILES["lumba_hidung_botol"]=["Perairan pesisir dan teluk dangkal", "Lumba-lumba berparuh jelas, tubuh abu-abu ramping dan sirip punggung melengkung"];
NJ39_SOURCES["lumba_hidung_botol"]="https://animaldiversity.org/accounts/Tursiops_aduncus/";
NJ36_PROFILES["kupu_raja_brooke"]=["Hutan tropis Sunda", "Sayap hitam dengan pola hijau zamrud tajam khas kupu-kupu sayap-burung"];
NJ39_SOURCES["kupu_raja_brooke"]="https://doi.org/10.2305%2FIUCN.UK.2018-1.RLTS.T91184152A91184305.en";
NJ36_PROFILES["dewi_sri"]=["Tradisi padi dan pertanian Nusantara", "Figur simbolis bermahkota padi dan jubah; tidak memiliki anatomi zoologis"];
NJ39_SOURCES["dewi_sri"]="https://indonesiamuseum.org/id/articles/traditional-agricultural-rituals-and-rice-goddess-worship";
NJ36_PROFILES["nyi_roro_kidul"]=["Mitos dan ragam cerita Jawa mengenai Laut Selatan", "Sosok ratu legenda berbusana hijau kebiruan, mahkota dan motif ombak; visual game interpretatif"];
NJ39_SOURCES["nyi_roro_kidul"]="https://ejournal.undip.ac.id/index.php/sabda/article/view/67485";
NJ36_PROFILES["batara_kala"]=["Cerita wayang dan tradisi ruwatan", "Raksasa wayang bermahkota besar, bertaring dan berpakaian simbolis; bukan spesies zoologis"];
NJ39_SOURCES["batara_kala"]="https://sonobudoyo.jogjaprov.go.id/id/tulisan/read/mengenal-tokoh-pewayangan-sang-hanoman-part-2";
NJ36_PROFILES["putri_mandalika"]=["Tradisi Sasak dan festival Bau Nyale", "Putri legenda dengan selendang berombak; nyale cacing laut bagian dari kisah bukan perubahan biologis"];
NJ39_SOURCES["putri_mandalika"]="https://www.indonesia.travel/id/id/events/event-detail/makna-di-balik-festival-bau-nyale-di-mandalika-lombok";


/* NUSAJIWA 4.8 — editorial accuracy pass: taxonomy and distinct conservation evidence */
NJ36_PROFILES["babirusa"]=["Hutan hujan Sulawesi, termasuk kawasan tepi sungai dan rawa", "Babirusa Sulawesi (Babyrousa celebensis) memiliki taring atas jantan yang menembus kulit moncong dan melengkung ke atas; IUCN: Rentan (VU). Ancaman utama meliputi perburuan serta kehilangan habitat. Jangan disamakan dengan babirusa Maluku (B. babyrussa) atau babirusa Togian (B. togeanensis)."];
NJ39_SOURCES["babirusa"]="https://www.iucn-wpsg.org/sulawesi-babirusa-detailed";
NJ36_PROFILES["tarsius"]=["Hutan Sulawesi", "Primata nokturnal bertubuh kecil dengan mata sangat besar dan jari panjang. Identifikasi spesies perlu mengikuti taksonomi terbaru karena tarsius Sulawesi terdiri dari beberapa spesies, bukan satu identitas tunggal."];
NJ39_SOURCES["tarsius"]="https://doi.org/10.2305/IUCN.UK.2008.RLTS.T21491A9288932.en";
/* NUSAJIWA 4.7 — newly identified records and source lookup */
NJ36_PROFILES["linsang_belang"]=["Hutan Asia Tenggara di Sumatra dan Kalimantan","Karnivora ramping bercorak pita/bercak, kepala mungil dan ekor panjang bercincin."];
NJ39_SOURCES["linsang_belang"]="https://www.gbif.org/species/search?q=Prionodon%20linsang";
NJ36_PROFILES["musang_akar"]=["Kanopi hutan tropis","Musang arboreal ramping dengan garis gelap memanjang di punggung dan ekor relatif panjang."];
NJ39_SOURCES["musang_akar"]="https://www.gbif.org/species/search?q=Arctogalidia%20trivirgata";
NJ36_PROFILES["bajing_sulawesi"]=["Hutan Sulawesi","Tupai tanah berbulu kemerahan, telinga relatif besar dan ekor lebat memanjang."];
NJ39_SOURCES["bajing_sulawesi"]="https://www.gbif.org/species/search?q=Rubrisciurus%20rubriventer";
NJ36_PROFILES["landak_sumatra"]=["Hutan Sumatra","Landak besar dengan duri tegak putih gelap dan badan rendah berbulu kasar."];
NJ39_SOURCES["landak_sumatra"]="https://www.gbif.org/species/search?q=Hystrix%20sumatrae";
NJ36_PROFILES["rangkong_perut_putih"]=["Hutan dan tepi hutan Asia Tenggara","Rangkong hitam-putih dengan perut putih dan balung menonjol di atas paruh."];
NJ39_SOURCES["rangkong_perut_putih"]="https://www.gbif.org/species/search?q=Anthracoceros%20albirostris";
NJ36_PROFILES["kucica_hutan"]=["Hutan tropis dan kawasan bersemak","Burung kicau dengan punggung gelap, perut jingga dan ekor hitam-putih panjang."];
NJ39_SOURCES["kucica_hutan"]="https://www.gbif.org/species/search?q=Kittacincla%20malabarica";
NJ36_PROFILES["tokhtor_sumatra"]=["Hutan perbukitan Sumatra, lantai hutan","Burung darat berekor panjang; kulit sekitar mata biru-ungu, sayap kehijauan dan tubuh bawah tembaga."];
NJ39_SOURCES["tokhtor_sumatra"]="https://doi.org/10.2305/IUCN.UK.2025-2.RLTS.T22724459A266075416.en";
NJ36_PROFILES["cenderawasih_merah"]=["Hutan pulau-pulau Waigeo dan Batanta","Burung hias merah dengan hiasan bulu samping, kepala kontras dan dua helaian ekor memanjang."];
NJ39_SOURCES["cenderawasih_merah"]="https://www.gbif.org/species/search?q=Paradisaea%20rubra";
NJ36_PROFILES["puyuh_sengayan"]=["Lantai hutan hujan Sumatra","Burung puyuh kecil dengan jambul tegak pada jantan dan tubuh padat dekat tanah."];
NJ39_SOURCES["puyuh_sengayan"]="https://www.gbif.org/species/search?q=Rollulus%20rouloul";
NJ36_PROFILES["paok_schneider"]=["Hutan pegunungan Sumatra","Burung lantai hutan dengan warna cokelat hangat, pita wajah, kepala bergaris dan kaki kuat."];
NJ39_SOURCES["paok_schneider"]="https://www.gbif.org/species/search?q=Hydrornis%20schneideri";
NJ36_PROFILES["katak_mutiara"]=["Vegetasi hutan Jawa","Katak arboreal kecil dengan tonjolan butiran seperti mutiara dan ujung jari melebar."];
NJ39_SOURCES["katak_mutiara"]="https://www.gbif.org/species/search?q=Nyctixalus%20margaritifer";
NJ36_PROFILES["cecak_terbang"]=["Batang pepohonan tropis","Kadal kecil dengan lipatan selaput di sisi tubuh yang membuka seperti sayap dan ekor panjang."];
NJ39_SOURCES["cecak_terbang"]="https://www.gbif.org/species/search?q=Draco%20volans";
NJ36_PROFILES["kadal_lidah_biru"]=["Hutan terbuka dan semak-semak Indonesia Timur","Skink bertubuh panjang kokoh, kaki pendek, sisik mengilap dan lidah berwarna biru."];
NJ39_SOURCES["kadal_lidah_biru"]="https://www.gbif.org/species/search?q=Tiliqua%20gigas";
NJ36_PROFILES["sanca_batik"]=["Hutan, rawa dan kawasan dekat air","Ular besar panjang dengan pola retikulat geometris dan kepala sempit."];
NJ39_SOURCES["sanca_batik"]="https://www.gbif.org/species/search?q=Malayopython%20reticulatus";
NJ36_PROFILES["ular_terbang_surga"]=["Kanopi hutan Asia Tenggara","Ular ramping berpola kontras yang mampu meratakan tubuh saat meluncur antarpohon."];
NJ39_SOURCES["ular_terbang_surga"]="https://www.gbif.org/species/search?q=Chrysopelea%20paradisi";
NJ36_PROFILES["kerapu_macan"]=["Terumbu karang dan perairan tropis dangkal","Ikan bertubuh kekar dengan mulut lebar dan bercak cokelat tak beraturan."];
NJ39_SOURCES["kerapu_macan"]="https://www.gbif.org/species/search?q=Epinephelus%20fuscoguttatus";
NJ36_PROFILES["pari_elang_totol"]=["Perairan pesisir dan terumbu tropis","Pari bersayap meruncing dan berpola bintik terang dengan ekor seperti cambuk."];
NJ39_SOURCES["pari_elang_totol"]="https://www.gbif.org/species/search?q=Aetobatus%20ocellatus";
NJ36_PROFILES["hiu_karang_hitam"]=["Perairan karang dangkal Indo-Pasifik","Hiu ramping dengan ujung sirip hitam terutama sirip punggung dan sirip ekor."];
NJ39_SOURCES["hiu_karang_hitam"]="https://www.gbif.org/species/search?q=Carcharhinus%20melanopterus";
NJ36_PROFILES["kima_raksasa"]=["Terumbu karang dangkal Indo-Pasifik","Kerang raksasa bercangkang berlipat tebal dan mantel bermotif warna biru-hijau."];
NJ39_SOURCES["kima_raksasa"]="https://www.fisheries.noaa.gov/species/true-giant-clam";
NJ36_PROFILES["bintang_laut_biru"]=["Terumbu Indo-Pasifik","Ekinodermata berbentuk bintang lima lengan memanjang dengan permukaan biru."];
NJ39_SOURCES["bintang_laut_biru"]="https://www.gbif.org/species/search?q=Linckia%20laevigata";
NJ36_PROFILES["ubur_ubur_totol"]=["Laguna dan perairan tropis","Ubur-ubur dengan payung bertotol transparan dan lengan mulut pendek berumbai."];
NJ39_SOURCES["ubur_ubur_totol"]="https://www.gbif.org/species/search?q=Mastigias%20papua";
NJ36_PROFILES["ikan_gergaji_hijau"]=["Perairan pantai, estuari dan dasar berpasir","Ikan bertubuh mirip pari dengan moncong memanjang bergigi di kedua sisi."];
NJ39_SOURCES["ikan_gergaji_hijau"]="https://www.gbif.org/species/search?q=Pristis%20zijsron";
NJ36_PROFILES["gatotkaca"]=["Lakon pewayangan Jawa dan tradisi epik","Kesatria gagah bermahkota, bersayap simbolis dan berbusana perang; bukan spesies zoologi."];
NJ39_SOURCES["gatotkaca"]="https://sonobudoyo.jogjaprov.go.id/id/profil";
NJ36_PROFILES["bima_wayang"]=["Lakon Mahabharata dalam pewayangan","Tokoh Pandawa bertubuh tegap, lengan berotot, kuku Pancanaka dan busana khas."];
NJ39_SOURCES["bima_wayang"]="https://sonobudoyo.jogjaprov.go.id/id/profil";
NJ36_PROFILES["buto_cakil"]=["Pertunjukan wayang dan tari tradisional","Tokoh raksasa ramping berahang menonjol dan taring melengkung; interpretasi visual game."];
NJ39_SOURCES["buto_cakil"]="https://sonobudoyo.jogjaprov.go.id/id/profil";
const sceneEl=document.createElement('section');sceneEl.id='nj35';sceneEl.setAttribute('aria-label','NUSAJIWA Dunia 3D');
sceneEl.innerHTML=`<div class="nj-art"></div><canvas class="nj-scene" id="nj35Canvas" aria-label="Dunia suaka 3D yang dapat diputar dengan sentuhan"></canvas><div class="nj-grain"></div>
<header class="nj-top"><div class="nj-brand"><span class="seal"></span><div><strong>NUSAJIWA</strong><small>LIVING SANCTUARY · PREMIUM EDITION</small></div></div><div class="nj-topright"><span class="nj-chip highlight" id="nj35Pearls"><span class="nj-chip-icon nj-icon-spirit"></span><b>0 JIWA</b></span><button class="nj-chip" id="nj35Quality" title="Kualitas grafis"><span class="nj-chip-icon nj-icon-settings"></span><span>AUTO</span></button><button class="nj-chip nj-photo-toggle" id="nj36Photo" title="Foto tanpa antarmuka"><span class="nj-chip-icon nj-icon-camera"></span><span>FOTO</span></button><button class="nj-chip" id="nj35Legacy" title="Buka permainan versi klasik"><span class="nj-chip-icon nj-icon-book"></span><span>2D</span></button></div></header>
<div class="nj-guide"><div class="nj-eyebrow">✧ KEPULAUAN JIWA · SUAKA HIDUP</div><h1>Nusantara<br><em>yang hidup.</em></h1><p>Rawat makhluknya, jaga keseimbangannya, dan jelajahi ensiklopedia hidup Nusantara melalui dunia 3D yang terasa seperti game premium.</p></div>
<div class="nj-creature-info" id="nj35Info"></div>
<div class="nj-care-caption">RAWAT · BERINTERAKSI</div><div class="nj-controls" aria-label="Interaksi"><button class="nj-action" data-njcare="feed"><span class="nj-action-icon nj-icon-feed"></span><small>Makan</small></button><button class="nj-action" data-njcare="play"><span class="nj-action-icon nj-icon-play"></span><small>Main</small></button><button class="nj-action" data-njcare="bond"><span class="nj-action-icon nj-icon-bond"></span><small>Elus</small></button><button class="nj-action" data-njcare="clean"><span class="nj-action-icon nj-icon-clean"></span><small>Mandi</small></button><button class="nj-action" data-njcare="sleep"><span class="nj-action-icon nj-icon-sleep"></span><small>Tidur</small></button></div>
<div class="nj-ribbon"><button id="nj35Prev" class="nj-mini-btn" aria-label="Makhluk sebelumnya">❮</button><button id="nj35Next" class="nj-mini-btn" aria-label="Makhluk berikutnya">❯</button><button id="nj35ZoomIn" class="nj-mini-btn" aria-label="Perbesar">＋</button><button id="nj35ZoomOut" class="nj-mini-btn" aria-label="Perkecil">－</button><button id="nj36Center" class="nj-mini-btn" aria-label="Reset kamera">⌖</button></div>
<div class="nj-photo-tip" id="nj36PhotoTip" hidden>MODE FOTO · Seret untuk memutar · <button id="nj36Capture">Simpan JPG</button><button id="nj36PhotoExit">Keluar</button></div><div class="nj-bottom"><button data-njtab="world" class="active"><span class="nj-nav-icon nj-icon-world"></span><small>Dunia</small></button><button data-njtab="roster"><span class="nj-nav-icon nj-icon-paw"></span><small>Makhluk</small></button><button data-njtab="explore"><span class="nj-nav-icon nj-icon-compass"></span><small>Jelajah</small></button><button data-njtab="ritual"><span class="nj-nav-icon nj-icon-evolution"></span><small>Evolusi</small></button><button data-njtab="archive"><span class="nj-nav-icon nj-icon-book"></span><small>Kodex</small></button></div>
<aside class="nj-side" id="nj35Side" aria-label="Panel jelajah makhluk"><button class="nj-close" id="nj35Close" aria-label="Tutup">✕</button><div id="nj35SideBody"></div></aside><div class="nj-toast" id="nj35Toast" role="status"></div><div class="nj-label3d">◈ WEBGL INTERAKTIF · 6.33</div><div id="nj37Growth" class="nj-growth" aria-live="polite"></div>`;
document.body.append(sceneEl);document.body.classList.add('nj35-playing');document.title='NUSAJIWA — Tamagotchi 3D | Legenda Nusantara';
const $=(q)=>sceneEl.querySelector(q), canvas=$('#nj35Canvas');
let rosterSearch='',rosterFilter='all',index=1, three=null, THREE=null, world=null, avatar=null, shadow=null, fx=[], lights=[], sparkle=[], tick=0,actionName='idle',actionUntil=0, sceneDisposed=false,quality='auto',viewZone='sumatra',zoom=1,rotation=0,pitch=.19,customPet=null,lastInfo='',sideOpen=false,lastFrame=0,renderWait=0;
let fpsSamples=0,slowTicks=0,frameScale=1,nightTime=false;
let fbx=false; // false indicates procedural geometry, not imported OEM/hand-authored GLB
const respectMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
const regions=[['sumatra','Sumatra','Lembah rimba berkabut'],['java','Jawa','Candi batu dan bunga api'],['kalimantan','Kalimantan','Sungai tropis dan rawa'],['sulawesi','Sulawesi','Bukit batu dan savana'],['nusa','Nusa Tenggara','Padang savana emas'],['papua','Papua','Hutan lembap pegunungan'],['laut','Laut Nusantara','Terumbu karang dan kehidupan laut']];
const rateQuality=()=>{let d=Math.min(devicePixelRatio||1,1.7);if(quality==='hemat')d=1;if(quality==='tinggi')d=Math.min(devicePixelRatio||1,2);if(quality==='auto'&&innerWidth<630)d=Math.min(d,1.3);if(quality==='auto')d*=frameScale;return Math.max(.65,d)};
const UI_SAVE='nusajiwa-3d-ui-v36';
const savedUI=(()=>{try{return JSON.parse(localStorage.getItem(UI_SAVE)||'{}')}catch(e){return {}}})();
if(['auto','tinggi','hemat'].includes(savedUI.quality))quality=savedUI.quality;
if(regions.some(r=>r[0]===savedUI.region))viewZone=savedUI.region;
if(Number.isInteger(savedUI.index) && savedUI.index>=0 && savedUI.index<CREATURES.length)index=savedUI.index;nightTime=!!savedUI.nightTime;
function persistUI(){try{localStorage.setItem(UI_SAVE,JSON.stringify({quality,region:viewZone,index,nightTime}))}catch(e){}}
// Signature companions are saved separately. Classic 2D pet data is never overwritten.
const NJ36_PETS_KEY='nusajiwa-3d-signature-pets-v36';
const NJ36_STAGES=['Telur','Bayi','Balita','Anak','Remaja','Dewasa','Tua','Legenda'];
const NJ36_XP=[0,8,24,49,81,125,180,260];
const NJ36_ELEMENTS=['api','air','angin','tanah','cahaya','bayangan'];
const NJ36_REGION_ELEMENT={sumatra:'tanah',java:'api',kalimantan:'air',sulawesi:'angin',nusa:'cahaya',papua:'bayangan',laut:'air'};
const newEmpty=()=>({version:1,pets:{},stones:Object.fromEntries(NJ36_ELEMENTS.map(x=>[x,0])),chosen:'cahaya',selectedElement:'cahaya',spirit:120,expeditions:0,daily:{},lastCareTick:Date.now(),updatedAt:Date.now()});
function cleanNovel(raw){
 const out=newEmpty();if(!raw||raw.version!==1||typeof raw.pets!=='object')return out;
 // 7.1: Preserve old saves from the duplicate Kura Rote entry by canonicalizing to the
 // existing Rote snake-neck ID, prioritizing the pet with the most progress.
 if(raw.pets?.kura_rote){
  const legacy=raw.pets.kura_rote,canon=raw.pets.kura_leher_ular_rote;
  if(!canon||(Number(legacy.xp)||0)>(Number(canon.xp)||0))
    raw.pets.kura_leher_ular_rote={...legacy,species:'kura_leher_ular_rote'};
 }
 for(const c of CREATURES){const old=raw.pets?.[c[0]];if(!old)continue;
  const p={species:c[0],phase:Math.max(0,Math.min(7,Number(old.phase)||0)),xp:Math.max(0,Math.min(100000,Number(old.xp)||0)),legend:NJ36_ELEMENTS.includes(old.legend)?old.legend:null,stats:{}};
  for(const k of ['happy','energy','bond','hunger','clean'])p.stats[k]=Math.max(0,Math.min(100,Number(old.stats?.[k])||0));out.pets[c[0]]=p;
 }
 for(const k of NJ36_ELEMENTS)out.stones[k]=Math.max(0,Math.min(999,Math.floor(Number(raw.stones?.[k])||0)));
 out.chosen=NJ36_ELEMENTS.includes(raw.chosen)?raw.chosen:'cahaya';out.selectedElement=out.chosen;out.spirit=Number.isFinite(Number(raw.spirit))&&raw.spirit!=null?Math.max(0,Number(raw.spirit)):120;out.expeditions=Math.max(0,Number(raw.expeditions)||0);out.daily=raw.daily&&typeof raw.daily==='object'?raw.daily:{};out.lastCareTick=Math.max(0,Number(raw.lastCareTick)||Date.now());out.updatedAt=Number(raw.updatedAt)||Date.now();return out;
}
let novelState;try{novelState=cleanNovel(JSON.parse(localStorage.getItem(NJ36_PETS_KEY)||'null'))}catch(e){novelState=newEmpty()}
function saveNovel(){novelState.updatedAt=Date.now();try{localStorage.setItem(NJ36_PETS_KEY,JSON.stringify(novelState))}catch(e){notify('Penyimpanan tidak tersedia pada browser ini')}}
function novelAdopt(){const r=record();if(novelState.pets[r[0]])return;
 novelState.pets[r[0]]={species:r[0],phase:0,xp:0,legend:null,stats:{happy:74,energy:80,bond:8,hunger:75,clean:85}};
 saveNovel();rebuildAvatar();drawInfo();notify('Telur '+r[1]+' disambut di suaka. Ketuk Tetaskan!')}
function novelCare(kind){const p=novelState.pets[record()[0]];if(!p||p.phase===0){notify('Tetaskan telur untuk mulai merawat.');return false}
 const delta={feed:[18,0,1,0,3,9],play:[-4,22,-12,1,1,16],bond:[0,9,0,7,0,10],clean:[0,4,-2,2,23,12],sleep:[-6,4,24,1,-2,8]}[kind];
 if(!delta)return false;
 const keys=['hunger','happy','energy','bond','clean'];keys.forEach((k,i)=>{p.stats[k]=Math.max(0,Math.min(100,p.stats[k]+delta[i]))});p.xp+=delta[5];saveNovel();return true;
}
function novelEvolve(){const p=novelState.pets[record()[0]];if(!p)return;
 if(p.phase===7){notify('Tahap Legenda sudah tercapai.');return}
 if(p.phase===0){p.phase=1;p.xp=Math.max(p.xp,8);saveNovel();rebuildAvatar();notify('Telur menetas — selamat datang '+record()[1]);return}
 const need=NJ36_XP[p.phase+1];if(p.xp<need){notify('Perlu '+(need-p.xp)+' XP lagi. Rawat dan bermain dahulu.');return}
 if(p.phase===6){const elem=novelState.chosen;if(!novelState.stones[elem]){notify('Temukan batu '+elem+' dengan menyentuh kristal di habitat.');return}novelState.stones[elem]--;p.legend=elem}
 p.phase++;p.stats.happy=Math.min(100,p.stats.happy+16);saveNovel();rebuildAvatar();notify('✧ Evolusi: '+record()[1]+' · '+NJ36_STAGES[p.phase]);
}
function showNovelRitual(){const p=novelState.pets[record()[0]],target=p?.phase??0;
 const box=$('#nj35SideBody');if(!box)return;
 box.innerHTML='<div class="nj-eyebrow">❖ JEJAK DELAPAN FASE</div><h2>Ritual Pertumbuhan</h2><p>'+record()[1]+' · '+(p?NJ36_STAGES[p.phase]:'Belum dipelihara')+'. Setiap makhluk memiliki perkembangan mandiri pada perangkat ini.</p>'+
 '<div class="nj-phase-row">'+NJ36_STAGES.map((v,i)=>'<span class="'+(i<=target&&p?'lit':'')+'">'+v+'</span>').join('')+'</div>'+
 (p?'<p>XP '+p.xp+' '+(p.phase<7?'/ '+NJ36_XP[p.phase+1]:'· Legenda')+'</p>':'<p>Undang makhluk ini melalui halaman suaka untuk membuka pertumbuhannya.</p>')+
 '<h3>Batu Elemen</h3><p>Sentuh kristal pada setiap habitat untuk menemukan elemennya, satu kali per kawasan setiap hari.</p><div class="nj-stones">'+NJ36_ELEMENTS.map(e=>'<button class="'+(novelState.chosen===e?'chosen':'')+'" data-njstone="'+e+'">'+e.toUpperCase()+' <b>'+novelState.stones[e]+'</b></button>').join('')+'</div>'+
 (p?'<button class="nj-ritual-action" data-njevolve="1">'+(p.phase===0?'TETASKAN TELUR':p.phase===7?'SUDAH LEGENDA':'EVOLUSIKAN · '+(NJ36_XP[p.phase+1]||0)+' XP')+'</button>':'');
}


// 3.7 extends the existing 3.6 signature save. No migration or reset.
const NJ37_STAGES=NJ36_STAGES, NJ37_THRESHOLDS=NJ36_XP;
const NJ37_STONES=NJ36_REGION_ELEMENT;
const NJ37_LABELS={api:'Api',air:'Air',angin:'Angin',tanah:'Tanah',cahaya:'Cahaya',bayangan:'Bayangan'};
const nj37=novelState;
function save3d(){saveNovel()}
function petIs3d(){return !!nj37.pets[record()[0]]}
function gamePet(){return nj37.pets[record()[0]]||(matchesActive()?selectedPet():null)}
function petStatus(){return petIs3d()?'3D':matchesActive()?'Klasik':'Pratinjau'}
function adopt3d(){const first=Object.keys(nj37.pets).length===0,cost=first?0:40;
 if(nj37.pets[record()[0]])return;
 if(nj37.spirit<cost){notify('Butuh '+cost+' Jiwa. Cari kristal saat jelajah.');return}
 nj37.spirit-=cost;novelAdopt();save3d();}
function evolve3d(){if(!petIs3d()){notify('Undang makhluk ini dahulu.');return}
 const prev=nj37.pets[record()[0]]?.phase;novelState.chosen=nj37.selectedElement;
 novelEvolve();if(prev===0&&nj37.pets[record()[0]]?.phase===1)questTrack('hatch');drawInfo();}
function export3d(){try{save3d();const blob=new Blob([JSON.stringify(nj37,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='NUSAJIWA_3D_Suaka_Backup.json';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),5000);notify('Progres 3D berhasil diekspor.')}catch(e){notify('Ekspor tidak tersedia pada perangkat ini')}}
async function import3d(file){if(!file)return;if(file.size>2500000){notify('Ukuran backup terlalu besar.');return;}
 try{const raw=JSON.parse(await file.text());if(raw.version!==1||!raw.pets||typeof raw.pets!=='object')throw Error('Format salah');
 if(!Object.keys(raw.pets).every(id=>CREATURES.some(r=>r[0]===id)))throw Error('Karakter tidak dikenali');
 if(!confirm('Ganti progres 3D saat ini dengan backup? Progres Arsip 2D tidak berubah.'))return;
 Object.assign(nj37,cleanNovel(raw));save3d();rebuildAvatar();drawInfo();openSide('archive');notify('Progres 3D berhasil diimpor.');
 }catch(e){notify('Backup tidak valid: '+e.message)}}
function care3d(k){const p=nj37.pets[record()[0]];if(!p){notify('Undang ke suaka dahulu.');return}
 if(performance.now()-nj37Cool<600)return;
 if(p.stats.energy<6&&k==='play'){notify('Sahabatmu perlu tidur dulu.');return}
 if(!novelCare(k))return;
 nj37Cool=performance.now();nj37.spirit+=1;
 actionName=k;actionUntil=performance.now()+1400;burst3D(k);
 save3d();questTrack('care');drawInfo();
 notify(p.phase<7&&p.xp>=NJ37_THRESHOLDS[p.phase+1]?'✧ Pengalaman cukup! Buka ritual.':({feed:'Kenyang dan bahagia',play:'Bermain di suaka',bond:'Ikatan menguat',clean:'Bersih dan segar',sleep:'Energi pulih'})[k]);}

let nj38Quest=null;
const nj38Runes=['❖','✶','◈','✧'];
function showQuestBoard(){const dst=$('#nj38QuestBoard');if(!dst)return;
 const q=nj38Quest;
 if(!q){dst.innerHTML='<p class="nj38-quest-info">Hafalkan tiga simbol, lalu sentuh ulang urutannya. Berhasil: hadiah ekspedisi + bonus 6 Jiwa dan 8 XP.</p>';return;}
 if(q.status==='memorize'){
  dst.innerHTML='<p class="nj38-quest-info">HAFALKAN POLA • '+q.path.length+' SIMBOL</p><div class="nj38-seq">'+q.path.map(n=>nj38Runes[n]).join(' ')+'</div><p class="nj38-small">Simbol akan disembunyikan sebentar lagi.</p>';return;
 }
 if(q.status==='failed'){dst.innerHTML='<p class="nj38-quest-info">Pola belum tepat. Coba lagi, tanpa penalti.</p><button class="nj38-retry" id="nj38Retry">ULANGI POLA ↻</button>';return;}
 dst.innerHTML='<p class="nj38-quest-info">ULANGI POLA • '+q.step+'/'+q.path.length+'</p><div class="nj38-runes">'+nj38Runes.map((s,i)=>'<button data-nj38rune="'+i+'" aria-label="Simbol '+(i+1)+'">'+s+'</button>').join('')+'</div><p class="nj38-small">Ketuk simbol berurutan untuk menyelaraskan kristal.</p>';
}
function startQuest(){
 const p=nj37.pets[record()[0]],key=dailyKey()+':'+viewZone;
 if(!p||p.phase===0){notify('Adopsi dan tetaskan makhluk sebelum ritual.');return;}
 if(p.stats.energy<12){notify('Energi perlu 12 poin untuk jelajah.');return;}
 if(nj37.daily[key]){notify('Wilayah ini sudah dijelajahi hari ini.');return;}
 const seed=(Date.now()^record()[0].length*137^viewZone.length*89)>>>0;
 nj38Quest={status:'memorize',path:[seed%4,(seed>>>7)%4,(seed>>>15)%4],step:0,region:viewZone};
 showQuestBoard();setTimeout(()=>{if(nj38Quest&&nj38Quest.status==='memorize'&&nj38Quest.region===viewZone){nj38Quest.status='input';showQuestBoard()}},2100);
}
function selectRune(id){const q=nj38Quest;if(!q||q.status!=='input')return;
 if(id!==q.path[q.step]){q.status='failed';showQuestBoard();return;}
 q.step++;if(q.step!==q.path.length){showQuestBoard();return;}
 const p=nj37.pets[record()[0]];nj38Quest=null;
 if(!p){notify('Karakter belum tersedia');return;}
 const regionBefore=viewZone,key=dailyKey()+':'+regionBefore;
 if(nj37.daily[key]){notify('Kristal sudah ditemukan.');return;}
 explore3d();if(nj37.daily[key]){p.xp+=8;nj37.spirit+=6;save3d();notify('✶ Resonansi sempurna · +30 Jiwa · +40 XP!')}
 if(sideOpen)openSide('explore');
}

function explore3d(){const p=nj37.pets[record()[0]];
 if(!p||p.phase===0){notify('Tetaskan sahabat dulu sebelum berekspedisi.');return}
 const key=dailyKey()+':'+viewZone;
 if(nj37.daily[key]){notify('Kristal kawasan sudah ditemukan hari ini.');return}
 if(p.stats.energy<12){notify('Energi belum cukup untuk jelajah.');return}
 p.stats.energy-=12;p.stats.hunger=Math.max(0,p.stats.hunger-6);p.xp+=32;
 const stone=NJ37_STONES[viewZone];nj37.stones[stone]++;
 nj37.spirit+=24;nj37.expeditions++;nj37.daily[key]=true;
 try{const j=JSON.parse(localStorage.getItem('nusajiwa-3d-found-v35')||'{}');j[viewZone]=dailyKey();localStorage.setItem('nusajiwa-3d-found-v35',JSON.stringify(j))}catch(e){}
 for(const k of Object.keys(nj37.daily))if(!k.startsWith(dailyKey()+':'))delete nj37.daily[k];
 save3d();questTrack('explore');rebuildBiome();burst3D('play');drawInfo();notify('✧ +24 Jiwa · +32 XP · Batu '+NJ37_LABELS[stone]);}
let nj37Cool=0;
function careClock(){const now=Date.now(),prev=nj37.lastCareTick||now,steps=Math.min(72,Math.floor(Math.max(0,now-prev)/1200000));
 if(steps<1)return;
 for(const p of Object.values(nj37.pets)){if(!p||p.phase===0)continue;
   p.stats.hunger=Math.max(0,p.stats.hunger-steps);
   p.stats.clean=Math.max(0,p.stats.clean-steps*.45);
   p.stats.happy=Math.max(0,p.stats.happy-steps*(p.stats.hunger<15?1.3:.32));
   p.stats.energy=Math.min(100,p.stats.energy+steps*.12);
 }
 nj37.lastCareTick=now;save3d();if(sceneEl&&!sceneEl.hidden)drawInfo();
}
setInterval(careClock,120000);setTimeout(careClock,900);

let iconTimer;
function notify(t){let n=$('#nj35Toast');n.textContent=t;n.classList.add('show');clearTimeout(iconTimer);iconTimer=setTimeout(()=>n.classList.remove('show'),2500)}
function record(){return CREATURES[index]||CREATURES[0]}
function selectedPet(){let legacy=null;try{legacy=typeof current==='function'?current():null}catch(e){} return legacy?.species===record()[0]?legacy:(novelState.pets[record()[0]]||legacy)}
function matchesActive(){return selectedPet()?.species===record()[0]}
function setRecord(i){index=(i+CREATURES.length)%CREATURES.length;rebuildAvatar();drawInfo();persistUI();rotation=0;zoom=1;}
function burst3D(kind){
 if(!world||!THREE)return;
 const c=kind==='clean'?0x88e7ef:kind==='feed'?0xf5af8e:kind==='sleep'?0xb4c5f8:kind==='bond'?0xf0b8c7:0xffd887;
 for(let i=0;i<10;i++){
   let a=i/10*Math.PI*2,rad=.3+Math.random()*.55;
   let mat=new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.92,depthWrite:false});
   let node=new THREE.Mesh(new THREE.OctahedronGeometry(.045+(i%3)*.018),mat);
   node.position.set(Math.cos(a)*rad,1+Math.random()*.6,Math.sin(a)*rad);
   world.scene.add(node);fx.push({node,a,age:0,speed:.7+Math.random()*.6});
 }
}
function drawInfo(){const r=record(),p=gamePet(),source=petStatus(),st=p?.stats||null,stage=p?.phase??null;
 const stats=[['Bahagia','happy'],['Energi','energy'],['Ikatan','bond']];
 $('#nj35Info').innerHTML='<span class="kind">✧ '+r[2].toUpperCase()+' · '+source.toUpperCase()+'</span><h2>'+r[1]+'</h2><span class="origin">⌖ '+r[3]+(stage!==null?' · '+NJ37_STAGES[stage]:'')+'</span><p class="nj-bio">'+getDesc(r[0])+'</p><div class="stats">'+stats.map(([n,k])=>'<div class="nj-stat"><label><span>'+n+'</span><span>'+(st?Math.round(st[k])+'%':'—')+'</span></label><i><b style="width:'+(st?.[k]||0)+'%"></b></i></div>').join('')+'</div>'+
 (petIs3d()?'<div class="nj-progress-line"><span>XP '+p.xp+' / '+(p.phase===7?'MAX':NJ37_THRESHOLDS[p.phase+1])+'</span><span>⟡ '+NJ37_STAGES[p.phase]+'</span></div><button class="nj-adopt" id="nj37Evolve">'+(p.phase===0?'✦ TETASKAN':p.phase===7?'✧ LEGENDA TERBANGUN':'✦ EVOLUSI · '+NJ37_STAGES[Math.min(7,p.phase+1)].toUpperCase())+'</button>':
 (source==='Klasik'?'<div class="nj-note">✧ Sahabat lama dari Arsip 2D tetap terlindungi.</div>':'<button class="nj-adopt" id="nj35Adopt">✦ UNDANG KE SUAKA '+(Object.keys(nj37.pets).length?'· 40 JIWA':'· GRATIS')+'</button>'));
 $('#nj35Pearls').innerHTML='<span class="nj-chip-icon nj-icon-spirit"></span><b>'+nj37.spirit.toLocaleString('id-ID')+' JIWA</b>'; 
 const n=$('#nj37Growth');if(n)n.textContent=Object.keys(nj37.pets).length+' SAHABAT · '+CREATURES.length+' IDENTITAS 3D · '+nj37.expeditions+' JELAJAH';
}


const NJ45_QUEST_KEY='nusajiwa-3d-quests-v45';
const NJ45_GOALS=[{id:'care',label:'Ritual Kedekatan',desc:'Lakukan tiga perawatan apa saja.',count:3,reward:16},{id:'explore',label:'Jejak Nusantara',desc:'Selesaikan satu ekspedisi dan temukan kristal.',count:1,reward:22},{id:'hatch',label:'Sambut Kehidupan',desc:'Tetaskan satu sahabat baru.',count:1,reward:24},{id:'read',label:'Penjaga Pengetahuan',desc:'Baca dua entri Kodex yang berbeda.',count:2,reward:18}];
const nj45Day=()=>dailyKey();
function questBlank(){return {date:nj45Day(),progress:{care:0,explore:0,hatch:0,read:0},readIds:[],claimed:{},totalClaimed:0}}
function questLoad(){try{const raw=JSON.parse(localStorage.getItem(NJ45_QUEST_KEY)||'null');if(!raw||typeof raw!=='object')return questBlank();const q=questBlank();q.totalClaimed=Math.max(0,Math.floor(Number(raw.totalClaimed)||0));if(raw.date===q.date){for(const g of NJ45_GOALS){q.progress[g.id]=Math.min(g.count,Math.max(0,Number(raw.progress?.[g.id])||0));q.claimed[g.id]=!!raw.claimed?.[g.id]}q.readIds=Array.isArray(raw.readIds)?raw.readIds.filter(x=>CREATURES.some(c=>c[0]===x)).slice(0,CREATURES.length):[]}return q}catch(_){return questBlank()}}
let nj45Quests=questLoad();
function questState(){if(nj45Quests.date!==nj45Day()){const lifetime=nj45Quests.totalClaimed;nj45Quests=questBlank();nj45Quests.totalClaimed=lifetime;questPersist()}return nj45Quests}
function questPersist(){try{localStorage.setItem(NJ45_QUEST_KEY,JSON.stringify(nj45Quests))}catch(_){}}
function questTrack(kind,id){const q=questState(),g=NJ45_GOALS.find(x=>x.id===kind);if(!g)return;
 if(kind==='read'){if(!id||q.readIds.includes(id))return;q.readIds.push(id)}
 q.progress[kind]=Math.min(g.count,(q.progress[kind]||0)+1);questPersist();
}
function questClaim(kind){const g=NJ45_GOALS.find(x=>x.id===kind),q=questState();if(!g||q.claimed[kind]||q.progress[kind]<g.count){notify('Tugas belum selesai atau hadiah sudah diambil.');return}
 q.claimed[kind]=true;q.totalClaimed++;nj37.spirit+=g.reward;questPersist();save3d();notify('✦ Hadiah '+g.reward+' Jiwa diterima!');drawInfo();openSide('explore')}
function questMarkup(){const q=questState();return '<section class="nj45-daily"><div class="nj-eyebrow">✦ RITUAL TAMAGOTCHI · HARI INI</div><h3>Jejak Harian</h3><p>Rawat, jelajahi, dan pelajari dua makhluk berbeda untuk mengumpulkan Jiwa. Progres reset pada pergantian hari lokal; hadiah hanya sekali per tugas.</p><div class="nj45-goals">'+NJ45_GOALS.map(g=>{const p=q.progress[g.id]||0,done=p>=g.count,claimed=!!q.claimed[g.id];return '<article class="nj45-goal"><div><b>'+g.label+'</b><small>'+g.desc+'</small><div class="nj45-meter"><i style="width:'+Math.round(p/g.count*100)+'%"></i></div><em>'+p+' / '+g.count+'</em></div><button '+(!done||claimed?'disabled':'')+' data-nj45claim="'+g.id+'">'+(claimed?'✓ Diambil':done?'Ambil +'+g.reward:'+'+g.reward+' Jiwa')+'</button></article>'}).join('')+'</div><p class="nj45-foot">Total hadiah yang pernah diambil: '+q.totalClaimed+' tugas.</p></section>'}
function codexMarkup(r){const item=window.NJ45_CODEX?.[r[0]];
 if(!item)return '<div class="nj45-codex-head"><span class="nj45-tag">PROFIL AWAL · BELUM DIAUDIT</span><p>Entri ini masih menggunakan ringkasan awal game. Informasi faktual, nama ilmiah, dan rujukannya perlu pemeriksaan editorial sebelum dinyatakan sebagai ensiklopedia lengkap.</p></div>';
 const f=[['Nama ilmiah / identitas',item.scientific],['Status',item.status],['Habitat / konteks',item.habitat],['Ciri fisik dan rupa',item.morphology],['Perilaku / cerita',item.behavior],['Peran ekologis',item.ecology],['Ancaman / tantangan',item.threats]];
 const esc45=x=>String(x||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 return '<div class="nj45-codex-head"><span class="nj45-tag verified">DITELITI · SUMBER TERCANTUM</span><p>Entri faktual terkurasi untuk mengenal keunikan makhluk ini. Materi game yang bersifat fantasi dipisahkan dengan jelas.</p></div><dl class="nj45-fact-list">'+f.map(([k,v])=>'<div><dt>'+esc45(k)+'</dt><dd>'+esc45(v)+'</dd></div>').join('')+'</dl><div class="nj45-culture-note"><strong>Catatan NUSAJIWA</strong><p>'+esc45(item.context)+'</p></div><h3>Sumber rujukan</h3><div class="nj45-sources">'+item.sources.map(([n,url])=>'<a target="_blank" rel="noopener noreferrer" href="'+esc45(url)+'">↗ '+esc45(n)+'</a>').join('')+'</div>';
}
// Future thumbnail renderer: captures actual procedural 3D geometry, rather than pretending static images are the live model.
const nj45Thumbs=new Map();let nj45ThumbRenderer=null,nj45ThumbScene=null,nj45ThumbCamera=null,nj45ThumbBusy=false;
function thumbnailInit(){if(!THREE||!three)return false;if(nj45ThumbRenderer)return true;
 try{nj45ThumbRenderer=new THREE.WebGLRenderer({alpha:true,antialias:false,preserveDrawingBuffer:true,powerPreference:'low-power'});nj45ThumbRenderer.setPixelRatio(1);nj45ThumbRenderer.setSize(180,136,false);nj45ThumbScene=new THREE.Scene();nj45ThumbCamera=new THREE.PerspectiveCamera(36,180/136,.1,40);nj45ThumbCamera.position.set(3.6,2.9,6.8);nj45ThumbCamera.lookAt(0,1.35,0);nj45ThumbScene.add(new THREE.HemisphereLight(0xf8e6b9,0x27535e,2.7));const lamp=new THREE.DirectionalLight(0xffe2a2,2.2);lamp.position.set(3,7,6);nj45ThumbScene.add(lamp);return true}catch(e){console.warn('Portrait renderer unavailable',e);nj45ThumbRenderer=null;return false}}
function thumbnailGenerate(id){if(nj45Thumbs.has(id))return nj45Thumbs.get(id);if(!thumbnailInit())return null;const r=CREATURES.find(x=>x[0]===id);if(!r)return null;
 let g=null;try{g=makeAvatar(r,true);g.scale.setScalar(.95);nj45ThumbScene.add(g);nj45ThumbRenderer.render(nj45ThumbScene,nj45ThumbCamera);const url=nj45ThumbRenderer.domElement.toDataURL('image/webp',.78);nj45Thumbs.set(id,url);return url}catch(e){console.warn('3D portrait skipped',id,e);return null}finally{if(g){nj45ThumbScene.remove(g);g.traverse(o=>{if(o.geometry&&o.geometry!==nj37SharedSphere)o.geometry.dispose();if(o.material&&!Array.isArray(o.material))o.material.dispose()})}}}
let nj45ThumbObserver=null;
function thumbnailHydrate(){
 if(!three||!THREE||!sideOpen)return;
 if(nj45ThumbObserver){nj45ThumbObserver.disconnect();nj45ThumbObserver=null}
 const root=$('#nj35Side');if(!root)return;
 const cells=[...root.querySelectorAll('[data-njportrait]')];
 function loadOne(cell){if(cell.dataset.ready)return;const id=cell.dataset.njportrait;
   if(nj45Thumbs.has(id)){cell.style.backgroundImage='url('+nj45Thumbs.get(id)+')';cell.classList.add('rendered');cell.dataset.ready='1';return}
   if(nj45ThumbBusy){setTimeout(()=>{if(cell.isConnected&&!cell.dataset.ready)loadOne(cell)},110);return}nj45ThumbBusy=true;
   setTimeout(()=>{try{if(!cell.isConnected||!sideOpen)return;const src=thumbnailGenerate(id);if(src){cell.style.backgroundImage='url('+src+')';cell.classList.add('rendered');cell.dataset.ready='1'}if(nj45Thumbs.size>48){const first=nj45Thumbs.keys().next().value;nj45Thumbs.delete(first)}}finally{nj45ThumbBusy=false}},45);
 }
 if(typeof IntersectionObserver==='function'){
   nj45ThumbObserver=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){loadOne(entry.target);if(entry.target.dataset.ready)nj45ThumbObserver?.unobserve(entry.target)}}},{root,rootMargin:'130px 0px',threshold:.01});
   cells.forEach(c=>nj45ThumbObserver.observe(c));
 }else cells.slice(0,8).forEach((c,i)=>setTimeout(()=>loadOne(c),i*100));
}

function creatureStageLabel(id){const p=nj37.pets[id];return p?NJ37_STAGES[p.phase]:'Belum diadopsi'}
function creatureStageClass(id){const p=nj37.pets[id];if(!p)return 'locked';if(p.phase>=7)return 'legend';if(p.phase>=4)return 'grown';return 'owned'}
function collectionProgressSummary(){
 const pets=Object.values(nj37.pets||{});const total=CREATURES.length, adopted=pets.length, legends=pets.filter(p=>p.phase>=7).length, grown=pets.filter(p=>p.phase>=4).length;
 return {total,adopted,legends,grown,completion:Math.round((adopted/Math.max(1,total))*100)};
}
function codexTone(r){return String(r[2]).startsWith('Fauna')?'Entri fauna ini menekankan pembelajaran identitas, habitat, dan ciri visual utama.':'Entri budaya ini menekankan konteks mitologi, folklor, atau tradisi serta membedakannya dari fakta zoologi.'}
function codexDeepDive(r){
 const base=(NJ36_PROFILES[r[0]]||[])[1]||'Representasi artistik untuk permainan.';
 const habitat=(NJ36_PROFILES[r[0]]||[])[0]||r[3];
 const type=r[2];
 const kindLine=String(type).startsWith('Fauna')?'Status identitas: fauna nyata Indonesia atau kawasan Nusantara yang direpresentasikan ulang dalam bentuk 3D bergaya game.':'Status identitas: tokoh budaya, tradisi, mitologi, atau folklor yang divisualkan secara interpretatif untuk dunia NUSAJIWA.';
 const careLine=String(type).startsWith('Fauna')?'Catatan pelestarian: gunakan entri ini untuk mengenali satwa, lalu rujuk sumber konservasi resmi agar pemahamanmu tidak berhenti pada visual game.':'Catatan budaya: versi cerita dapat berbeda antardaerah; game ini tidak mengklaim satu rupa atau satu versi cerita sebagai bentuk tunggal yang paling benar.';
 return {habitat,base,kindLine,careLine};
}

// NUSAJIWA 5.8: recent-release collection filters, using unique IDs from release manifests.
const NJ58_IDS_5_1 = new Set(["kuskus_peleng", "kuskus_obi", "kuskus_matabiru", "kuskus_gebe", "kuskus_bohai", "kuskus_schamscham"]);
const NJ58_IDS_5_2 = new Set(["kukang_jawa", "anoa_gunung", "kangkareng_sulawesi", "kukang_sumatra", "kucing_emas", "beruk_mentawai", "berang_gunung", "kucing_batu"]);
const NJ58_IDS_5_3 = new Set(["kuskus_tembung", "kuskus_yaben", "kuskus_siku_putih", "kuskus_gunung", "kuskus_selatan", "kuskus_pontai"]);
const NJ58_IDS_5_4 = new Set(["kodok_merah_jawa", "biawak_togian", "labi_moncong_babi_papua", "kura_leher_ular_rote", "kura_papua_leher_panjang", "penyu_tempayan", "penyu_lekang", "penyu_pipih"]);
const NJ58_IDS_5_6 = new Set(["si_manis_jembatan_ancol", "hantu_jeruk_purut", "orang_pendek", "dewi_lanjar", "jaka_tarub", "nawang_wulan", "timun_mas", "keong_mas"]);
// NUSAJIWA 6.1 — discoverable, persistent field journal (independent from pet adoption).
const NJ61_KEY='nusajiwa-field-journal-v61';
const NJ61_RARITIES=['Umum','Tidak Umum','Langka','Epik','Legendaris'];
function nj61Hash(str){let h=2166136261;for(const c of str){h=Math.imul(h^c.charCodeAt(0),16777619)}return h>>>0}
function nj61Rarity(r){const v=nj61Hash(r[0])%100;return v<46?0:v<74?1:v<90?2:v<98?3:4}
function nj61Habitat(r){if(!String(r[2]).startsWith('Fauna'))return 'Legenda Nusantara';const a=(r[3]||'').toLowerCase(),b=(r[2]||'').toLowerCase();if(/laut|pesisir|samudra|perairan|ikan|penyu|hiu|pari/.test(a+' '+b))return 'Pesisir dan Laut';if(/papua|maluku/.test(a))return 'Timur Nusantara';if(/sulawesi|togean|talaud|sangihe/.test(a))return 'Wallacea';if(/jawa|bali|sunda/.test(a))return 'Jawa dan Bali';if(/sumatra|mentawai/.test(a))return 'Sumatra';if(/kalimantan|borneo/.test(a))return 'Kalimantan';return 'Legenda Nusantara'}
function nj61Blank(){return {found:{},scans:{},bonus:{}}}
function nj61Load(){try{const j=JSON.parse(localStorage.getItem(NJ61_KEY)||'null');if(!j||typeof j!=='object')return nj61Blank();return {found:j.found&&typeof j.found==='object'?j.found:{},scans:j.scans&&typeof j.scans==='object'?j.scans:{},bonus:j.bonus&&typeof j.bonus==='object'?j.bonus:{}}}catch(_){return nj61Blank()}}
let nj61=nj61Load();
function nj61Save(){try{localStorage.setItem(NJ61_KEY,JSON.stringify(nj61))}catch(_){notify('Jurnal tidak dapat disimpan pada perangkat ini')}}
function nj61Today(){const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')}
function nj61Seen(r){return !!nj61.found[r[0]]||!!nj37.pets[r[0]]}
// v6.2: biome-directed tracking with explicit encounter odds and full journal.
const NJ62_BIOMES=['Semua Wilayah','Pesisir dan Laut','Timur Nusantara','Wallacea','Jawa dan Bali','Sumatra','Kalimantan','Legenda Nusantara'];
let nj62Biome='Semua Wilayah',nj62JournalPage=0,nj63JournalQuery='',nj63JournalOrder='recent';
function nj62Random(){if(globalThis.crypto?.getRandomValues){const a=new Uint32Array(1);crypto.getRandomValues(a);return a[0]/4294967296}return Math.random()}
function nj62Escape(v){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function nj63Streak(){
 const days=new Set(Object.keys(nj61.scans).filter(d=>/^\d{4}-\d{2}-\d{2}$/.test(d)&&Number(nj61.scans[d])>0));
 const today=new Date();today.setHours(12,0,0,0);
 const dateKey=d=>[d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');
 // A streak remains visible before today's first expedition, provided yesterday was active.
 if(!days.has(dateKey(today)))today.setDate(today.getDate()-1);
 let streak=0;
 for(let i=0;i<366&&days.has(dateKey(today));i++){streak++;today.setDate(today.getDate()-1)}
 return streak;
}
function nj63Summary(){const found=CREATURES.filter(nj61Seen);const byRegion=NJ62_BIOMES.slice(1).map(name=>({name,total:CREATURES.filter(r=>nj61Habitat(r)===name).length,found:found.filter(r=>nj61Habitat(r)===name).length}));return {found:found.length,streak:nj63Streak(),regions:byRegion,encounters:Object.values(nj61.found).reduce((n,v)=>n+Math.max(0,Number(v?.encounters)||0),0)}}
function nj61Scan(){
 const day=nj61Today(),used=Math.min(3,Number(nj61.scans[day])||0);
 if(used>=3){notify('Tiga penelusuran hari ini sudah digunakan. Kembali besok.');return}
 const biomePool=CREATURES.filter(r=>nj62Biome==='Semua Wilayah'||nj61Habitat(r)===nj62Biome);
 if(!biomePool.length){notify('Belum ada makhluk dalam wilayah ini.');return}
 const unknown=biomePool.filter(r=>!nj61Seen(r)),pool=unknown.length?unknown:biomePool;
 const rarityWeights=[50,28,14,6,2],weights=pool.map(r=>rarityWeights[nj61Rarity(r)]);
 const sum=weights.reduce((a,b)=>a+b,0);let pick=nj62Random()*sum,chosen=pool[pool.length-1];
 for(let i=0;i<pool.length;i++){pick-=weights[i];if(pick<0){chosen=pool[i];break}}
 nj61.scans[day]=used+1;
 const first=!nj61Seen(chosen),prior=nj61.found[chosen[0]];
 nj61.found[chosen[0]]={date:prior?.date||day,lastSeen:day,encounters:(Number(prior?.encounters)||0)+1,habitat:nj61Habitat(chosen),rarity:nj61Rarity(chosen)};
 if(first){nj37.spirit+=5;save3d()}
 nj61Save();setRecord(CREATURES.findIndex(r=>r[0]===chosen[0]));
 notify('Jejak '+chosen[1]+' ditemukan'+(first?' · +5 Jiwa':''));openSide('roster')
}
function nj61Markup(){
 const day=nj61Today(),used=Math.min(3,Number(nj61.scans[day])||0),count=CREATURES.filter(nj61Seen).length;
 const total=CREATURES.filter(r=>nj62Biome==='Semua Wilayah'||nj61Habitat(r)===nj62Biome).length;
 const summary=nj63Summary();
 return '<section class="nj61-field"><div class="nj61-field-head"><span>◈ JURNAL PENJELAJAH</span><strong>'+count+' / '+CREATURES.length+' teramati</strong></div><div class="nj63-summary"><span>🔥 '+summary.streak+' hari beruntun</span><span>🔎 '+summary.encounters+' perjumpaan</span></div><p>Penelusuran memilih makhluk berdasarkan wilayah dan peluang permainan. Tidak otomatis mengadopsi. Kelangkaan bukan status konservasi.</p><div class="nj61-meter"><span style="width:'+(CREATURES.length?100*count/CREATURES.length:0).toFixed(1)+'%"></span></div><label class="nj62-label" for="nj62Biome">Wilayah penelusuran</label><select id="nj62Biome" class="nj62-select">'+NJ62_BIOMES.map(b=>'<option value="'+nj62Escape(b)+'"'+(b===nj62Biome?' selected':'')+'>'+nj62Escape(b)+'</option>').join('')+'</select><small class="nj62-pool">'+total+' kandidat di wilayah ini · peluang bobot per karakter: Umum 50, Tidak Umum 28, Langka 14, Epik 6, Legendaris 2.</small><div class="nj61-field-actions"><button type="button" id="nj61Scan" '+(used>=3||!total?'disabled':'')+'>✧ Telusuri Jejak · '+(3-used)+'/3 hari ini</button><button type="button" id="nj61Journal">☷ Catatan Penemuan</button></div><div class="nj63-regions">'+summary.regions.map(x=>'<div class="nj63-region"><small>'+nj62Escape(x.name)+'</small><b>'+x.found+' / '+x.total+'</b><span><i style="width:'+(x.total?Math.round(100*x.found/x.total):0)+'%"></i></span></div>').join('')+'</div></section>'
}
function nj61Journal(){
 const found=CREATURES.filter(nj61Seen).filter(r=>(r[1]+' '+nj61Habitat(r)+' '+r[3]).toLocaleLowerCase('id').includes(nj63JournalQuery.toLocaleLowerCase('id'))).sort((a,b)=>nj63JournalOrder==='name'?a[1].localeCompare(b[1],'id'):nj63JournalOrder==='rarity'?nj61Rarity(b)-nj61Rarity(a):String(nj61.found[b[0]]?.lastSeen||nj61.found[b[0]]?.date||'').localeCompare(String(nj61.found[a[0]]?.lastSeen||nj61.found[a[0]]?.date||'')));
 const pageSize=20,pages=Math.max(1,Math.ceil(found.length/pageSize));nj62JournalPage=Math.min(Math.max(0,nj62JournalPage),pages-1);
 const items=found.slice(nj62JournalPage*pageSize,(nj62JournalPage+1)*pageSize);
 const rows=items.map(r=>'<button class="nj61-journal-item" data-nj61pick="'+nj62Escape(r[0])+'"><b>'+nj62Escape(r[1])+'</b><small>'+nj62Escape(nj61Habitat(r))+' · '+NJ61_RARITIES[nj61Rarity(r)]+' · '+(nj61.found[r[0]]?.encounters||0)+' jejak</small></button>').join('');
 $('#nj35SideBody').innerHTML='<div class="nj-eyebrow">◈ JURNAL PENJELAJAH</div><h2>Jejak Nusantara</h2><p>'+found.length+' makhluk diamati atau dipelihara. Riwayat dapat ditelusuri seluruhnya, 20 per halaman.</p><button class="nj61-back" id="nj61Back">← Kembali ke koleksi</button><div class="nj63-controls"><input id="nj63Search" aria-label="Cari jurnal" placeholder="Cari nama atau wilayah…" value="'+nj62Escape(nj63JournalQuery)+'"><select id="nj63Sort" aria-label="Urutkan jurnal"><option value="recent"'+(nj63JournalOrder==='recent'?' selected':'')+'>Terbaru</option><option value="name"'+(nj63JournalOrder==='name'?' selected':'')+'>Nama A–Z</option><option value="rarity"'+(nj63JournalOrder==='rarity'?' selected':'')+'>Kelangkaan</option></select></div><div class="nj61-journal-list">'+(rows||'<p>Belum ada jejak. Mulai penelusuran pertama.</p>')+'</div><div class="nj62-pages"><button id="nj62Prev" '+(nj62JournalPage===0?'disabled':'')+'>← Sebelumnya</button><span>Halaman '+(nj62JournalPage+1)+' / '+pages+'</span><button id="nj62Next" '+(nj62JournalPage>=pages-1?'disabled':'')+'>Berikutnya →</button></div>'
}
function openSide(mode){sideOpen=true;$('#nj35Side').classList.add('open');let h='';
 if(mode==='roster'){
 const filtered=CREATURES.map((r,i)=>[r,i]).filter(([r])=>{const text=(r[1]+' '+r[2]+' '+r[3]).normalize('NFKD').toLowerCase();return text.includes(rosterSearch.normalize('NFKD').toLowerCase())&&(rosterFilter==='owned'?!!nj37.pets[r[0]]:rosterFilter==='unowned'?!nj37.pets[r[0]]:rosterFilter==='legend'?((nj37.pets[r[0]]?.phase??-1)>=7):rosterFilter==='all'||(rosterFilter==='baru56'?NJ58_IDS_5_6.has(r[0]):rosterFilter==='baru54'?NJ58_IDS_5_4.has(r[0]):rosterFilter==='baru53'?NJ58_IDS_5_3.has(r[0]):rosterFilter==='baru52'?NJ58_IDS_5_2.has(r[0]):rosterFilter==='baru51'?NJ58_IDS_5_1.has(r[0]):rosterFilter==='baru49'?NJ49_IDS.has(r[0]):rosterFilter==='baru47'?NJ47_IDS.has(r[0]):rosterFilter==='baru46'?NJ46_IDS.has(r[0]):rosterFilter==='baru'?NJ42_IDS.has(r[0]):rosterFilter==='kemarin'?NJ41_IDS.has(r[0]):rosterFilter==='v40'?NJ40_IDS.has(r[0]):rosterFilter==='v39'?NJ39_IDS.has(r[0]):rosterFilter==='fauna'?r[2]==='Fauna':r[2]!=='Fauna'))});
 const stat=collectionProgressSummary();
 h='<div class="nj-eyebrow">✧ KATALOG DUNIA</div><h2>'+CREATURES.length+' Makhluk · Edisi 3D</h2><p>Ruang koleksi premium untuk menjelajahi identitas makhluk NUSAJIWA. Semua model folklor adalah interpretasi artistik; semua fauna tetap dibedakan dari fakta biologis.</p>'+
 '<div class="nj-roster-summary"><div class="nj-summary-card"><small>Koleksi dibuka</small><strong>'+stat.adopted+' / '+stat.total+'</strong><span>'+stat.completion+'% tuntas</span></div><div class="nj-summary-card"><small>Tahap tinggi</small><strong>'+stat.grown+'</strong><span>Dewasa ke atas</span></div><div class="nj-summary-card"><small>Legenda</small><strong>'+stat.legends+'</strong><span>Sahabat puncak</span></div></div>'+
 nj61Markup()+
 '<div class="nj60-discovery"><button type="button" id="nj60Surprise">✧ Temukan Makhluk Acak</button><button type="button" id="nj60Unknown">◇ Temukan yang Belum Dipelihara</button></div>'+
 '<input id="nj36Search" class="nj-search" type="search" aria-label="Cari makhluk" placeholder="Cari nama, jenis, daerah..." value="'+rosterSearch.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;')+'">'+
 '<div class="nj-filters"><button data-njfilter="owned" class="'+(rosterFilter==='owned'?'sel':'')+'">♥ Dipelihara</button><button data-njfilter="unowned" class="'+(rosterFilter==='unowned'?'sel':'')+'">◇ Belum dipelihara</button><button data-njfilter="legend" class="'+(rosterFilter==='legend'?'sel':'')+'">✦ Legenda aktif</button><button data-njfilter="baru56" class="'+(rosterFilter==='baru56'?'sel':'')+'">✦ Folklor 5.6</button><button data-njfilter="baru54" class="'+(rosterFilter==='baru54'?'sel':'')+'">Reptil 5.4</button><button data-njfilter="baru53" class="'+(rosterFilter==='baru53'?'sel':'')+'">5.3</button><button data-njfilter="baru52" class="'+(rosterFilter==='baru52'?'sel':'')+'">5.2</button><button data-njfilter="baru51" class="'+(rosterFilter==='baru51'?'sel':'')+'">5.1</button><button data-njfilter="baru47" class="'+(rosterFilter==='baru47'?'sel':'')+'">✦ Baru 4.7</button><button data-njfilter="baru49" class="'+(rosterFilter==='baru49'?'sel':'')+'">✦ Baru 4.9</button><button data-njfilter="all" class="'+(rosterFilter==='all'?'sel':'')+'">Semua</button><button data-njfilter="fauna" class="'+(rosterFilter==='fauna'?'sel':'')+'">Fauna</button><button data-njfilter="folklor" class="'+(rosterFilter==='folklor'?'sel':'')+'">Legenda</button><button data-njfilter="baru46" class="'+(rosterFilter==='baru46'?'sel':'')+'">✦ Baru 4.6</button><button data-njfilter="baru" class="'+(rosterFilter==='baru'?'sel':'')+'">✦ Baru 4.2</button><button data-njfilter="kemarin" class="'+(rosterFilter==='kemarin'?'sel':'')+'">4.1</button><button data-njfilter="v40" class="'+(rosterFilter==='v40'?'sel':'')+'">4.0</button><button data-njfilter="v39" class="'+(rosterFilter==='v39'?'sel':'')+'">3.9</button></div>'+
 '<p class="nj-result-count">'+filtered.length+' dari '+CREATURES.length+' makhluk · status koleksi sinkron dengan progres perangkat ini</p><div class="nj-grid">'+filtered.map(([r,i])=>'<button class="nj-item '+(i===index?'active':'')+'" data-type="'+r[2]+'" data-njpick="'+i+'"><span class="nj45-portrait" data-njportrait="'+r[0]+'" style="--c:'+r[5]+'"><span class="nj45-fallback-symbol">✧</span></span><span class="nj-stage-badge '+creatureStageClass(r[0])+'">'+creatureStageLabel(r[0])+'</span><b>'+r[1]+(NJ49_IDS.has(r[0])?' <span class="nj39-new">BARU 4.9</span>':NJ47_IDS.has(r[0])?' <span class="nj39-new">BARU 4.7</span>':NJ46_IDS.has(r[0])?' <span class="nj39-new">BARU 4.6</span>':NJ42_IDS.has(r[0])?' <span class="nj39-new">BARU 4.2</span>':NJ41_IDS.has(r[0])?' <span class="nj39-new old">4.1</span>':NJ40_IDS.has(r[0])?' <span class="nj39-new old">4.0</span>':NJ39_IDS.has(r[0])?' <span class="nj39-new old">3.9</span>':'')+'</b><small>'+r[2]+' · '+r[3]+'</small><em>Lihat 3D</em></button>').join('')+'</div>';
 }
 else if(mode==='explore')h='<div class="nj-eyebrow">◈ EKSPEDISI NUSANTARA</div><h2>Jelajahi Tujuh Wilayah</h2><p>Pilih habitat, lalu kumpulkan resonansi alam. Satu kristal per habitat per hari lokal. Ekspedisi memberi +24 Jiwa, +32 XP, dan satu batu elemen.</p><div class="nj-grid">'+regions.map(([id,n,t])=>`<button class="nj-item ${id===viewZone?'active':''}" data-njregion="${id}"><b>⌖ ${n}</b><small>${t}</small><em>${nj37.daily[dailyKey()+':'+id]?'✓ Kristal ditemukan':'◇ Kristal tersedia'}</em></button>`).join('')+'</div><div class="nj38-quest"><div class="nj-eyebrow">◈ RITUAL RESONANSI</div><div id="nj38QuestBoard" class="nj38-quest-board"></div><button class="nj-ritual-primary" id="nj37Explore">✶ MULAI RITUAL · '+regions.find(r=>r[0]===viewZone)[1].toUpperCase()+'</button></div>';
 else if(mode==='ritual'){const p=gamePet();h='<div class="nj-eyebrow">❖ RITUAL KEHIDUPAN</div><h2>Jejak Delapan Fase</h2><p>Rawat sahabatmu untuk delapan tahap kehidupan. Evolusi Legenda memerlukan batu elemen dari jelajah.</p><div class="nj-stage-track">'+NJ37_STAGES.map((s,i)=>'<span class="'+(i<=(p?.phase??-1)?'done':'')+'">'+(i+1)+' · '+s+'</span>').join('')+'</div><h3>Batu Elemen</h3><div class="nj-element-grid">'+Object.keys(NJ37_LABELS).map(id=>'<button class="'+(nj37.selectedElement===id?'selected':'')+'" data-njstone="'+id+'">'+NJ37_LABELS[id]+' <b>×'+nj37.stones[id]+'</b></button>').join('')+'</div><button class="nj-ritual-primary" id="nj37Evolve">✦ '+(p?.phase===0?'TETASKAN':p?.phase===7?'SUDAH LEGENDA':'EVOLUSI SAHABAT')+'</button><p class="nj-context">Game 3D memakai save versi 3.6 yang sama; arsip 2D tidak ditimpa.</p><button class="nj-chip highlight" data-njarchive="evolve">ALTAR KLASIK ↗</button>'; }
 else {const r=record(),dd=codexDeepDive(r); h='<div class="nj-eyebrow">☷ KODEX HIDUP</div><h2>'+r[1]+'</h2><p>'+dd.habitat+'</p><div class="nj-lore-card"><strong>Ensiklopedia Ringkas</strong><p>'+dd.base+'</p><small>'+r[2].toUpperCase()+' · '+r[3]+'</small></div><div class="nj-codex-facts"><div class="nj-fact"><span>Kategori</span><b>'+r[2]+'</b></div><div class="nj-fact"><span>Asal / konteks</span><b>'+r[3]+'</b></div><div class="nj-fact"><span>Status koleksi</span><b>'+creatureStageLabel(r[0])+'</b></div></div><div class="nj-lore-card"><strong>Deep dive identitas</strong><p>'+dd.kindLine+'</p><p>'+codexTone(r)+'</p><small>'+dd.careLine+'</small></div>'+(NJ39_SOURCES[r[0]]?'<a class="nj39-source" target="_blank" rel="noopener noreferrer" href="'+NJ39_SOURCES[r[0]]+'">Referensi identitas makhluk</a>':'')+codexMarkup(r)+nj612EvidenceMarkup(r)+nj624StageMarkup(r)+'<button class="nj-chip highlight" data-njarchive="codex">Baca Kodex klasik ↗</button><h3>Pengaturan Dunia 3D</h3><div class="nj-options"><button id="nj37Quality">Kualitas · '+quality.toUpperCase()+'</button><button id="nj37Night">Waktu · '+(nightTime?'Malam':'Siang')+'</button></div><h3>Cadangkan Progres</h3><p>Ekspor progres 3D sebagai berkas JSON agar data dapat dipindah ke perangkat lain. Progres klasik tetap terpisah.</p><div class="nj-options"><button id="nj37Export">↓ Ekspor 3D</button><button id="nj37ImportBtn">↑ Impor 3D</button></div>'; }
 if(mode==='explore')h+=questMarkup();
 $('#nj35SideBody').innerHTML=h;if(mode==='explore')showQuestBoard();if(mode==='roster')setTimeout(thumbnailHydrate,90);
}
function closeSide(){sideOpen=false;$('#nj35Side').classList.remove('open')}
function return3D(){back.hidden=true;sceneEl.hidden=false;document.body.classList.add('nj35-playing');drawInfo();resize();}

/* 7.2 — visual feedback for the classic pet's needs in the actual 3D habitat.
   No allocation per animation frame; only reconstructs when care state changes. */
let njtLiving={dirty:0,sick:false,sleep:false,attention:false};
let njtLivingSignature='',njtLivingDecor=null;
function njtClearDecor(){
 if(!njtLivingDecor)return;
 njtLivingDecor.parent?.remove(njtLivingDecor);
 njtLivingDecor.traverse(o=>{
  if(o.geometry)o.geometry.dispose();
  if(o.material){(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>m.dispose?.())}
 });
 njtLivingDecor=null;
}
function njtApplyLiving(force=false){
 if(!THREE||!world?.avatarRoot)return false;
 const signature=[njtLiving.dirty,njtLiving.sick,njtLiving.sleep,njtLiving.attention].join(':');
 if(!force&&signature===njtLivingSignature)return true;
 njtLivingSignature=signature;
 njtClearDecor();
 const group=new THREE.Group();group.name='Tamagotchi_3D_Needs';world.avatarRoot.add(group);njtLivingDecor=group;
 function orb(x,y,z,sx,sy,sz,color){
  const node=new THREE.Mesh(new THREE.SphereGeometry(1,12,9),new THREE.MeshStandardMaterial({color,roughness:.82}));
  node.scale.set(sx,sy,sz);node.position.set(x,y,z);group.add(node);return node;
 }
 function bar(x,y,z,w,h,d,color){
  const node=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),new THREE.MeshBasicMaterial({color,depthTest:false}));
  node.position.set(x,y,z);node.renderOrder=21;group.add(node);return node;
 }
 for(let i=0;i<Math.min(4,njtLiving.dirty);i++){
  const x=.87+i*.41,z=.72+(i%2)*.35;
  orb(x,.025,z,.19,.10,.16,0x765438);
  orb(x,.13,z,.15,.105,.14,0x856143);
  orb(x,.23,z,.09,.075,.09,0xa07851);
  orb(x+.045,.33,z,.025,.025,.024,0xe7c99a);
 }
 if(njtLiving.sick){
  for(let i=0;i<3;i++){
   const x=-.84+i*.62;
   bar(x,2.66,-.1,.085,.39,.07,0x9de5c7);
   bar(x,2.66,-.08,.33,.085,.07,0x9de5c7);
  }
 }
 if(njtLiving.attention&&!njtLiving.sleep){
  const sign=new THREE.Group();sign.position.set(-.85,2.53,.45);group.add(sign);
  const amber=new THREE.MeshBasicMaterial({color:0xffce73,depthTest:false});
  const rod=new THREE.Mesh(new THREE.CapsuleGeometry(.065,.32,3,8),amber);rod.renderOrder=23;rod.position.y=.19;sign.add(rod);
  const dot=new THREE.Mesh(new THREE.SphereGeometry(.075,10,8),amber);dot.renderOrder=23;dot.position.y=-.15;sign.add(dot);
 }
 if(world.sun)world.sun.intensity=njtLiving.sleep?1.08:(nightTime?1.75:3.3);
 if(world.accent)world.accent.intensity=njtLiving.sleep?11:(nightTime?19:(viewZone==='kalimantan'?31:27));
 return true;
}
function njtSetLiving(st){
 const dirty=Math.min(4,Math.max(0,Math.floor(Number(st?.dirty)||0)));
 njtLiving={dirty,sick:!!st?.sick,sleep:!!st?.sleep,attention:!!st?.attention};
 return njtApplyLiving();
}
function njtCodexRecord(id){
 const r=CREATURES.find(row=>row[0]===id);if(!r)return null;
 const d=NJ36_PROFILES[id]||[];
 return {id:r[0],name:r[1],category:r[2],origin:r[3],
  habitat:d[0]||r[3],summary:d[1]||'Identitas dan representasi visual masih menjalani kurasi.',
  sourceUrl:NJ39_SOURCES[id]||'',reviewed:!!window.NJ45_CODEX?.[id]};
}
function njtRewardCodexReading(id,experience=6,spirit=5){
 const p=nj37.pets[id];if(!p||p.phase===0)return false;
 p.xp=Math.max(0,Math.min(100000,p.xp+Math.min(12,Math.max(0,Number(experience)||0))));
 nj37.spirit+=Math.min(10,Math.max(0,Number(spirit)||0));
 save3d();drawInfo();return true;
}
function njtRestartGeneration(id){
 if(!CREATURES.some(c=>c[0]===id)||!nj37.pets[id])return false;
 const p=nj37.pets[id];p.phase=0;p.xp=0;p.legend=null;
 p.stats={happy:74,energy:80,bond:8,hunger:75,clean:85};
 save3d();
 if(record()[0]===id){rebuildAvatar();drawInfo();}
 return true;
}

window.NJ35={version:'7.4',saveKey:NJ36_PETS_KEY,getCurrentId:()=>record()[0],selectTamaSpecies:(id)=>{const pos=CREATURES.findIndex(c=>c[0]===id);if(pos<0)return false;if(pos!==index)setRecord(pos);return true;},setTamaEnvironment:njtSetLiving,restartTamaGeneration:njtRestartGeneration,rewardTamaCodexReading:njtRewardCodexReading,getTamaCodexProfile:njtCodexRecord,setTamaMood:(mode,ms=1600)=>{if(!['idle','feed','play','clean','bond','sleep','sick'].includes(mode))return false;actionName=mode;actionUntil=ms===0?Infinity:performance.now()+Math.max(0,Math.min(9000,ms));return true;},getTamaRenderStatus:()=>({creature:record()[0],quality,webgl:!!three,phase:gamePet()?.phase??null}),getSignaturePets:()=>Object.keys(novelState.pets),returnTo3D:return3D,creatures:CREATURES.map(r=>({id:r[0],name:r[1],category:r[2],origin:r[3]})),getGameProgress:()=>JSON.parse(JSON.stringify(nj37)),getMode:()=>quality,is3D:()=>!!three,edition58:()=>({total:CREATURES.length,releases:{"5.1": 6, "5.2": 8, "5.3": 6, "5.4": 8, "5.6": 8}}),edition47:()=>({newIds:[...NJ47_IDS],total:CREATURES.length,modelsReady:[...NJ47_IDS].every(id=>typeof nj47Sculptors[id]==='function')}),edition46:()=>({newIds:[...NJ46_IDS],total:CREATURES.length,modelsReady:[...NJ46_IDS].every(id=>typeof nj46Sculptors[id]==='function')}),edition42:()=>({newIds:[...NJ42_IDS],total:CREATURES.length,modelsReady:[...NJ42_IDS].every(x=>typeof nj42Sculptors[x]==='function')})};
const back=document.createElement('button');back.textContent='◈ Kembali ke Dunia 3D';back.id='nj35Return';back.style.cssText='position:fixed;right:16px;top:max(86px,env(safe-area-inset-top));z-index:45;background:#103641;color:#f2d28b;border:1px solid #dcbd7a;padding:13px 18px;border-radius:27px;box-shadow:0 8px 30px #0017;font-weight:700;cursor:pointer';back.addEventListener('click',return3D);back.hidden=true;document.body.append(back);
const input3d=document.createElement('input');input3d.type='file';input3d.accept='application/json,.json';input3d.id='nj37ImportFile';input3d.hidden=true;document.body.append(input3d);input3d.addEventListener('change',e=>import3d(e.target.files?.[0]));
// Controls stay functional on touch and mouse, including the fallback when WebGL isn't available.
sceneEl.addEventListener('input',e=>{if(e.target?.id==='nj63Search'){nj63JournalQuery=e.target.value;nj62JournalPage=0;const start=e.target.selectionStart;nj61Journal();const input=$('#nj63Search');input?.focus();try{input?.setSelectionRange(start,start)}catch(_){}}});
sceneEl.addEventListener('change',e=>{if(e.target?.id==='nj63Sort'){nj63JournalOrder=e.target.value;nj62JournalPage=0;nj61Journal()}if(e.target?.id==='nj62Biome'){nj62Biome=NJ62_BIOMES.includes(e.target.value)?e.target.value:'Semua Wilayah';openSide('roster')}});
sceneEl.addEventListener('click',e=>{
 let a=e.target.closest('button');if(!a)return;
 if(a.id==='nj61Scan'){nj61Scan();return}
 if(a.id==='nj62Prev'){nj62JournalPage--;nj61Journal();return}
 if(a.id==='nj62Next'){nj62JournalPage++;nj61Journal();return}
 if(a.id==='nj61Journal'){nj61Journal();return}
 if(a.id==='nj61Back'){openSide('roster');return}
 if(a.dataset.nj61pick){const i=CREATURES.findIndex(r=>r[0]===a.dataset.nj61pick);if(i>=0){setRecord(i);closeSide()}return}
 if(a.id==='nj60Surprise'||a.id==='nj60Unknown'){
  const pool=a.id==='nj60Unknown'?CREATURES.filter(r=>!nj37.pets[r[0]]):CREATURES;
  if(!pool.length){notify('Semua makhluk sudah menjadi sahabatmu!');return}
  const chosen=pool[Math.floor(Math.random()*pool.length)];const pos=CREATURES.findIndex(r=>r[0]===chosen[0]);
  setRecord(pos);closeSide();notify('Makhluk ditemukan: '+chosen[1]);return;
 }
 if(a.dataset.nj45claim){questClaim(a.dataset.nj45claim);return}
 if(a.dataset.njstone){novelState.chosen=a.dataset.njstone;saveNovel();showNovelRitual();return}
 if(a.dataset.njevolve){novelEvolve();drawInfo();showNovelRitual();return}
 if(a.dataset.njfilter){rosterFilter=a.dataset.njfilter;openSide('roster');$('#nj35Side').scrollTop=0;return}
 if(a.dataset.njpick!=null){setRecord(Number(a.dataset.njpick));closeSide();return}
 if(a.dataset.njregion){nj38Quest=null;viewZone=a.dataset.njregion;changeRegion();persistUI();closeSide();return}
 if(a.dataset.njarchive){toggleArchive(a.dataset.njarchive);return}
 if(a.dataset.njtab){let t=a.dataset.njtab;sceneEl.querySelectorAll('[data-njtab]').forEach(x=>x.classList.toggle('active',x.dataset.njtab===t));if(t==='archive')questTrack('read',record()[0]);if(t==='world')closeSide();else openSide(t);return}
 if(a.id==='nj35Close'){closeSide();return}
 if(a.id==='nj35Adopt'){adopt3d();return}
 if(a.id==='nj37Evolve'){evolve3d();if(sideOpen)openSide('ritual');return}
 if(a.id==='nj37Explore'){startQuest();return}
 if(a.id==='nj38Retry'){startQuest();return}
 if(a.dataset.nj38rune!==undefined){selectRune(Number(a.dataset.nj38rune));return}
 if(a.id==='nj36Center'){rotation=0;pitch=.19;zoom=1;notify('Kamera kembali ke posisi awal');return}
 if(a.id==='nj36Photo'||a.id==='nj36PhotoExit'){sceneEl.classList.toggle('nj-photo-mode');$('#nj36PhotoTip').hidden=!sceneEl.classList.contains('nj-photo-mode');return}
 if(a.id==='nj36Capture'){if(three){three.render(world.scene,world.camera);try{const link=document.createElement('a');link.href=canvas.toDataURL('image/png');link.download='NUSAJIWA_'+record()[0]+'_3D.png';document.body.append(link);link.click();link.remove();notify('Foto dunia 3D disimpan')}catch(err){notify('Screenshot tidak tersedia pada browser ini')}}return}
 if(a.id==='nj37Quality'){$('#nj35Quality').click();openSide('archive');return}
 if(a.id==='nj37Night'){nightTime=!nightTime;changeRegion();persistUI();openSide('archive');notify('Atmosfer: '+(nightTime?'Malam':'Siang'));return}
 if(a.id==='nj37Export'){export3d();return}
 if(a.id==='nj37ImportBtn'){document.querySelector('#nj37ImportFile').click();return}
 if(a.id==='nj35Legacy'){toggleArchive();return}
 if(a.id==='nj35Quality'){let q=['auto','tinggi','hemat'];quality=q[(q.indexOf(quality)+1)%q.length];a.innerHTML='<span class="nj-chip-icon nj-icon-settings"></span><span>'+({auto:'AUTO',tinggi:'TINGGI',hemat:'HEMAT'}[quality])+'</span>'; if(three){three.setPixelRatio(rateQuality());three.shadowMap.enabled=quality!=='hemat'}resize();persistUI();notify('Kualitas: '+quality);return}
 if(a.id==='nj35Prev'){setRecord(index-1);return}if(a.id==='nj35Next'){setRecord(index+1);return}
 if(a.id==='nj35ZoomIn'){zoom=Math.max(.66,zoom-.12);return}if(a.id==='nj35ZoomOut'){zoom=Math.min(1.75,zoom+.12);return}
 if(a.dataset.njcare){let k=a.dataset.njcare;
 if(petIs3d()){care3d(k);return}
 if(!matchesActive()){notify('Undang makhluk ini terlebih dahulu agar bisa dirawat.');return}
 try{if(novelState.pets[record()[0]]){if(!novelCare(k))return;actionName=k;actionUntil=performance.now()+1300;burst3D(k);notify(({feed:'Sahabatmu menikmati makanan',play:'Ayo bermain!',bond:'Ikatan kalian menguat',clean:'Segar dan bersih',sleep:'Saatnya beristirahat'})[k]);drawInfo();return;}if(typeof care==='function'){actionName=k;actionUntil=performance.now()+1300;burst3D(k);care(k);notify(({feed:'Sahabatmu menikmati makanan',play:'Ayo bermain!',bond:'Ikatan kalian menguat',clean:'Segar dan bersih',sleep:'Saatnya beristirahat'})[k]);drawInfo()}}catch(err){notify('Perawatan belum dapat dijalankan')};return}
});
sceneEl.addEventListener('input',e=>{if(e.target.id==='nj36Search'){const start=e.target.selectionStart||0;rosterSearch=e.target.value;openSide('roster');const input=$('#nj36Search');if(input){input.focus();input.setSelectionRange(start,start)}}});
// Avoid overlaying old starter modal: onboarding through the original engine remains accessible.
const getDesc=(id)=>NJ36_PROFILES[id]?.[1]||'Adaptasi artistik untuk permainan, bukan ilustrasi ilmiah.';
let hold=null,secondPointers=new Map(),pinchPrevious=null,lastTap=0;
canvas.addEventListener('pointerdown',e=>{secondPointers.set(e.pointerId,{x:e.clientX,y:e.clientY});hold={id:e.pointerId,x:e.clientX,y:e.clientY,rotation,pitch,start:performance.now()};try{canvas.setPointerCapture(e.pointerId)}catch(_){} if(secondPointers.size>1)pinchPrevious=null;});
canvas.addEventListener('pointermove',e=>{if(!secondPointers.has(e.pointerId))return;secondPointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(secondPointers.size>1){let ps=[...secondPointers.values()],now=Math.hypot(ps[0].x-ps[1].x,ps[0].y-ps[1].y);if(pinchPrevious!==null)zoom=Math.min(1.8,Math.max(.62,zoom-(now-pinchPrevious)*.008));pinchPrevious=now;return}if(!hold)return;let dx=e.clientX-hold.x,dy=e.clientY-hold.y;rotation=hold.rotation+dx*.007;pitch=Math.min(.62,Math.max(-.08,hold.pitch+dy*.003));});
canvas.addEventListener('pointerup',e=>{secondPointers.delete(e.pointerId);pinchPrevious=null;if(hold&&Math.abs(e.clientX-hold.x)+Math.abs(e.clientY-hold.y)<13){
 let hit=true;
 if(three&&avatar){let box=canvas.getBoundingClientRect(),cursor=new THREE.Vector2((e.clientX-box.left)/box.width*2-1,-((e.clientY-box.top)/box.height*2-1));let ray=new THREE.Raycaster();ray.setFromCamera(cursor,world.camera);hit=ray.intersectObject(avatar,true).length>0}
 if(three&&world?.crystal){const b=canvas.getBoundingClientRect(),mouse=new THREE.Vector2((e.clientX-b.left)/b.width*2-1,-((e.clientY-b.top)/b.height*2-1));const ra=new THREE.Raycaster();ra.setFromCamera(mouse,world.camera);if(ra.intersectObject(world.crystal,true).length){harvestStone();hold=null;return}}
 if(hit){if(performance.now()-lastTap<290){rotation=0;pitch=.19;zoom=1;notify('Kamera direset');lastTap=0;hold=null;return}lastTap=performance.now();actionName='bond';actionUntil=performance.now()+900;burst3D('bond');if(petIs3d())care3d('bond');else if(matchesActive()&&typeof care==='function')care('bond');notify('✧ '+record()[1]+' merespons sentuhanmu');drawInfo()}
 }hold=null;});
canvas.addEventListener('pointercancel',e=>{secondPointers.delete(e.pointerId);hold=null;pinchPrevious=null});
canvas.addEventListener('wheel',e=>{e.preventDefault();zoom=Math.min(1.75,Math.max(.62,zoom+Math.sign(e.deltaY)*.09))},{passive:false});
sceneEl.addEventListener('keydown',e=>{if(e.key==='Escape')closeSide();if(e.key==='ArrowLeft')setRecord(index-1);if(e.key==='ArrowRight')setRecord(index+1)});
function resize(){if(!three)return;const w=canvas.clientWidth,h=canvas.clientHeight;if(w<=0||h<=0)return;three.setSize(w,h,false);world.camera.aspect=w/h;world.camera.updateProjectionMatrix()}
function addBaseGeometry(){
 const T=THREE,W=world;const grass=W.mats.grass,stone=W.mats.stone,gold=W.mats.gold,dark=W.mats.dark;
 const floor=new T.Mesh(new T.CylinderGeometry(5.1,5.7,.6,48),[W.mats.earth,grass,stone]);floor.position.y=-.52;floor.receiveShadow=true;W.scene.add(floor);W.scenery.push(floor);
 const rim=new T.Mesh(new T.TorusGeometry(5.13,.075,8,60),gold);rim.rotation.x=Math.PI/2;rim.position.y=-.22;W.scene.add(rim);W.scenery.push(rim);
 const pool=new T.Mesh(new T.CircleGeometry(2.2,48),W.mats.water);pool.rotation.x=-Math.PI/2;pool.position.set(2.7,-.196,-1.9);W.scene.add(pool);W.scenery.push(pool);
 for(let i=0;i<21;i++){let a=i*2.399,rr=3.7+Math.sin(i*8)*.6,x=Math.sin(a)*rr,z=Math.cos(a)*rr,ht=.28+(.23*Math.sin(i*5+3));const rock=new T.Mesh(new T.DodecahedronGeometry(ht,0),stone);rock.position.set(x,-.11,z);rock.rotation.set(i*.3,i*.5,0);rock.castShadow=true;W.scene.add(rock);W.scenery.push(rock)}
 // stylised Candi gate provides place identity instead of a generic sci-fi pedestal
 const temple=new T.Group();temple.position.set(-2.8,0,-2.45);for(let q of [-1,1]){let pillar=rect(.61,2.7,.68,stone);pillar.position.set(q*.94,1.06,0);temple.add(pillar);for(let j=0;j<4;j++){let band=rect(.70,.09,.77,j%2?stone:gold);band.position.set(q*.94,.4+j*.52,.0);temple.add(band)}let cap=new T.Mesh(new T.ConeGeometry(.6,.83,4),stone);cap.rotation.y=Math.PI/4;cap.position.set(q*.94,2.76,0);temple.add(cap)}let bridge=rect(2.38,.36,.85,stone);bridge.position.y=2.55;temple.add(bridge);temple.rotation.y=.18;W.scene.add(temple);W.scenery.push(temple);
 for(let i=0;i<22;i++){let a=i*2.4,r=3+Math.sin(i*1.9)*1.2;if(Math.cos(a)<-.45)continue;let x=Math.sin(a)*r,z=Math.cos(a)*r;let stem=new T.Mesh(new T.CylinderGeometry(.065,.10,.32,5),W.mats.trunk);stem.position.set(x,.03,z);let leaves=new T.Mesh(new T.ConeGeometry(.28,.75,5),W.mats.leaves);leaves.position.set(x,.57,z);W.scene.add(stem,leaves);W.scenery.push(stem,leaves)}
 for(let i=0;i<52;i++){let x=Math.sin(i*16.29)*3.9,z=Math.cos(i*11.6)*3.9;const seed=new T.Mesh(new T.TetrahedronGeometry(.022+(.013*(i%3))),i%3?W.mats.gold:W.mats.emissive);seed.position.set(x,.2+((i*13)%5)*.24,z);W.scene.add(seed);W.fireflies.push({node:seed,phase:i*2.45,seed:i})}
}
function rect(w,h,d,m){let x=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);x.castShadow=true;x.receiveShadow=true;return x}
function makeWorld(){let T=THREE;let W={};W.scene=new T.Scene();W.scene.fog=new T.FogExp2(0x26463e,.022);W.scene.background=null;W.camera=new T.PerspectiveCamera(37,1,.1,100);
 let r=new T.WebGLRenderer({canvas,alpha:true,antialias:quality!=='hemat',powerPreference:'high-performance',premultipliedAlpha:true});r.setClearColor(0x000000,0);r.outputColorSpace=T.SRGBColorSpace;r.toneMapping=T.ACESFilmicToneMapping;r.toneMappingExposure=1.33;r.shadowMap.enabled=quality!=='hemat';r.shadowMap.type=T.PCFSoftShadowMap;r.setPixelRatio(rateQuality());three=r;
 const mat=(color,metalness=0,roughness=.72,emissive=0)=>new T.MeshStandardMaterial({color,metalness,roughness,emissive,emissiveIntensity:emissive?.15:0,flatShading:false,side:T.DoubleSide});
 W.mats={grass:mat(0x47775e),stone:mat(0x7b7a70),gold:mat(0xcbb77d,.58,.35),dark:mat(0x24413e),earth:mat(0x6e6554),water:new T.MeshPhysicalMaterial({color:0x4aa6a7,metalness:.15,roughness:.17,transparent:true,opacity:.73,clearcoat:1,clearcoatRoughness:.16}),trunk:mat(0x665640),leaves:mat(0x1e6655),emissive:mat(0xdff5b2,.15,.4,0x42662e)};
 let amb=new T.HemisphereLight(0xf1fff2,0x647c70,2.25);W.scene.add(amb);
 let sun=new T.DirectionalLight(0xffe3b2,3.3);sun.position.set(-6,12,7);sun.castShadow=true;sun.shadow.mapSize.set(innerWidth<700?512:1024,innerWidth<700?512:1024);sun.shadow.camera.left=-9;sun.shadow.camera.right=9;sun.shadow.camera.top=9;sun.shadow.camera.bottom=-9;sun.shadow.bias=-.0009;W.scene.add(sun);W.sun=sun;let portraitFill=new T.DirectionalLight(0xd6eeff,1.25);portraitFill.position.set(3,5,9);W.scene.add(portraitFill);W.portraitFill=portraitFill;
 let accent=new T.PointLight(0xb1f8e5,27,15);accent.position.set(2.7,3,-1);W.scene.add(accent);W.accent=accent;
 W.avatarRoot=new T.Group();W.scene.add(W.avatarRoot);W.scenery=[];W.fireflies=[];world=W;addBaseGeometry();rebuildAvatar();changeRegion();resize();
}
NJ36_PROFILES["gelatik_jawa"]=["Padang rumput dan mosaik pertanian Jawa", "Burung kecil berkepala hitam, pipi putih dan paruh merah tebal."];
NJ36_PROFILES["julang_sulawesi"]=["Kanopi hutan Sulawesi", "Rangkong endemik dengan paruh panjang dan balung besar bernuansa merah-kuning."];
NJ36_PROFILES["beo_nias"]=["Hutan Pulau Nias", "Beo berbulu hitam mengilap, balung kulit kuning di sekitar kepala dan paruh cerah."];
NJ36_PROFILES["kakatua_maluku"]=["Hutan Pulau Seram", "Kakatua besar berwarna putih-merah muda dan berjambul rona salmon."];
NJ36_PROFILES["ayam_hutan_hijau"]=["Hutan terbuka dan savana Jawa-Bali", "Ayam liar dengan bulu berkilau hijau, dada gelap dan bulu ekor jantan melengkung."];
NJ36_PROFILES["bidadari_hal"]=["Kanopi hutan Halmahera", "Cenderawasih jantan dengan sayap hias dan bulu mirip panji yang mengulur jauh dari tubuh."];
NJ36_PROFILES["serak_jawa"]=["Lahan terbuka dan tepi hutan", "Burung hantu dengan wajah berbentuk hati, mata gelap, dan sayap berujung lembut."];
NJ36_PROFILES["landak_jawa"]=["Hutan dan semak Pulau Jawa", "Hewan pengerat bertubuh padat dengan duri panjang berwarna kontras hitam-putih."];
NJ36_PROFILES["musang_air"]=["Rawa dan tepian sungai hutan tropis", "Mamalia semiakuatik dengan badan panjang, moncong berkumis dan kaki mendukung pergerakan di air."];
NJ36_PROFILES["kuskus_tutul"]=["Hutan Papua", "Marsupial arboreal bermuka membulat, corak bercak tubuh dan ekor mencengkeram."];
NJ36_PROFILES["kuda_laut_kerdil"]=["Terumbu karang dan kipas laut", "Kuda laut mungil bertubuh bergelombang, moncong tabung, dan ekor melingkar."];
NJ36_PROFILES["hiu_berjalan_hal"]=["Terumbu dangkal Halmahera", "Hiu kecil berpola totol yang bergerak di dasar dengan sirip dada dan perut yang kuat."];
NJ36_PROFILES["udang_mantis"]=["Lubang karang laut tropis", "Krustasea beruas dengan mata bertangkai dan sepasang lengan pemukul kuat."];
NJ36_PROFILES["ketam_kenari"]=["Hutan pulau dan wilayah pesisir", "Kepiting darat raksasa berkaki panjang dengan capit besar tidak simetris."];
NJ36_PROFILES["belangkas"]=["Pantai berpasir dan dasar laut dangkal", "Artropoda berkarapas seperti tapal kuda dan berekor runcing panjang."];
NJ36_PROFILES["labi_moncong_babi"]=["Sungai dan rawa air tawar Papua Selatan", "Kura-kura air tawar bercangkang rendah, sirip lebar dan hidung seperti moncong babi."];
NJ36_PROFILES["sanca_hijau"]=["Hutan hujan Papua", "Ular hijau yang menggulung di dahan, dengan kepala memanjang dan bercak pucat di punggung."];
NJ36_PROFILES["kobra_jawa"]=["Lahan rendah Pulau Jawa", "Ular kobra dengan tudung lebar di belakang kepala saat mempertahankan diri."];
NJ36_PROFILES["bunglon_surai"]=["Pepohonan dan semak", "Kadal arboreal berekor panjang dengan deretan surai runcing di punggung."];
NJ36_PROFILES["katak_terbang"]=["Kanopi lembap hutan Sumatra-Borneo", "Katak pohon dengan selaput jari lebar yang membantunya melayang antarcabang."];
NJ36_PROFILES["kodok_merah"]=["Aliran air pegunungan Jawa Barat", "Kodok berukuran kecil dengan bagian tubuh gelap dan bintik merah-jingga."];
NJ36_PROFILES["tuntong_laut"]=["Muara dan sungai wilayah pesisir", "Kura-kura sungai berukuran besar dengan tempurung oval dan kaki kuat."];
NJ36_PROFILES["paruh_kodok"]=["Hutan Pulau Jawa", "Burung nokturnal berkepala besar, berkedok kamuflase kayu dan bermulut sangat lebar."];
NJ36_PROFILES["warak_ngendog"]=["Tradisi Dugderan Semarang", "Makhluk rekaan berwajah mirip naga, badan dan kaki seperti kambing, dengan telur sebagai simbol tradisi Dugderan."];
NJ36_PROFILES["jatayu"]=["Wayang Ramayana Nusantara", "Burung gagah dalam pewayangan Ramayana dengan sayap terbentang dan paruh kuat; melambangkan keberanian dan pengorbanan."];
NJ36_PROFILES["orang_bati"]=["Cerita rakyat Seram", "Sosok bertubuh menyerupai manusia atau primata dengan sayap kelelawar, dalam cerita setempat. Tidak ada bukti zoologis keberadaannya."];
NJ36_PROFILES["poppo"]=["Kisah lisan Bugis–Makassar", "Dalam sejumlah kisah dipercaya terbang pada malam hari; representasi kepala melayang dilukiskan tanpa unsur grafis. Variasi cerita berbeda menurut penutur."];
NJ36_PROFILES["parakang"]=["Kepercayaan Bugis–Makassar", "Tokoh jadi-jadian dengan ragam wujud hewan atau manusia dalam cerita; pemodelan berupa dua siluet perubahan rupa."];
NJ36_PROFILES["bedawang_nala"]=["Mitologi penyangga bumi", "Kura-kura kosmis raksasa yang dikisahkan menyangga daratan atau pulau; figur sakral lintas versi mitologi."];
NJ36_PROFILES["boraspati_tano"]=["Ornamen budaya Batak", "Figur pelindung atau penguasa tanah yang pada artefak Batak divisualkan seperti cicak/kadal; motif berloreng dan ekor bercabang."];
NJ36_PROFILES["singa_barong_reog"]=["Pertunjukan Reog Ponorogo", "Kepala harimau dalam topeng caplokan dengan kipas bulu merak raksasa Dadak Merak; bukan Barong Ket Bali."];
NJ36_PROFILES["bujang_ganong"]=["Pertunjukan Reog Ponorogo", "Tokoh patih muda berwajah topeng merah dan hidung besar; populer karena gerakan lincah dan akrobatik."];
NJ36_PROFILES["hanoman"]=["Wayang Ramayana Nusantara", "Tokoh kera putih tangguh dalam kisah Ramayana dan tradisi wayang Nusantara, sering ditampilkan bermahkota dan berekor panjang."];
NJ36_PROFILES["makara_candi"]=["Ragam hias candi", "Motif hibrida air dalam arsitektur candi: kepala mirip gajah dan belalai, unsur ikan atau buaya, ditempatkan di gerbang dan tangga."];
NJ36_PROFILES["naga_padoha"]=["Kosmologi Batak Toba", "Naga dunia bawah yang bergeliat dan berkaitan dengan terbentuknya daratan dalam kisah penciptaan Batak; interpretasi merujuk ukiran singa Batak."];
NJ36_PROFILES["yaki"]=["Hutan Sulawesi Utara", "Primata berbulu gelap dengan surai tegak, wajah relatif tak berbulu, serta tubuh ramping; berbeda dari lutung Jawa."];
NJ36_PROFILES["orangutan_tapanuli"]=["Hutan Batang Toru", "Pongo tapanuliensis, spesies orangutan tersendiri dari orangutan Kalimantan; lengan panjang dan rambut kemerahan."];
NJ36_PROFILES["badak_sumatra"]=["Rimba Sumatra", "Badak bercula dua, tubuh relatif kecil, dan rambut kasar; berbeda dari badak Jawa yang hanya bercula satu."];
NJ36_PROFILES["kelinci_belang"]=["Hutan dataran tinggi Sumatra", "Nesolagus netscheri memiliki tubuh pendek dan belang gelap memanjang melintasi bulu."];
NJ36_PROFILES["anjing_kintamani"]=["Anjing lokal Bali", "Anjing ras lokal dengan telinga tegak, bulu lebat dan ekor melengkung di punggung. Populasi domestik, bukan spesies liar endemik."];
NJ36_PROFILES["kalong_besar"]=["Tepi hutan tropis", "Kelelawar pemakan buah berukuran besar dengan wajah mirip rubah dan selaput sayap lebar; berbeda dari kriptid Ahool."];
NJ36_PROFILES["tikus_flores"]=["Hutan Flores", "Papagomys armandvillei merupakan tikus berukuran besar asli Flores dengan ekor panjang dan moncong pengerat."];
NJ36_PROFILES["raja_udang_meninting"]=["Tepi aliran sungai", "Burung kecil dengan paruh panjang runcing, bagian atas berwarna biru dan dada kekuningan."];
NJ36_PROFILES["bangau_bluwok"]=["Rawa dan hutan mangrove", "Bangau putih pucat dengan sayap berujung gelap, kaki panjang dan paruh memanjang."];
NJ36_PROFILES["gosong_maluku"]=["Pasir pantai dan semak Maluku", "Burung megapoda berkaki kuat yang memanfaatkan pasir hangat untuk pengeraman, tidak sama dengan Maleo Sulawesi."];
NJ36_PROFILES["gurita_peniru"]=["Dasar pasir laut Sulawesi", "Gurita dengan delapan lengan bergaris yang dapat mengubah postur tubuh menyerupai hewan laut lain ketika berperilaku defensif."];
NJ36_PROFILES["gurita_cincin_biru"]=["Terumbu dan dasar laut tropis", "Gurita kecil dengan motif cincin biru mencolok. Satwa ini sangat berbisa di alam; jangan disentuh."];
NJ36_PROFILES["cumi_karang"]=["Perairan pesisir dan terumbu", "Cephalopoda bermantel torpedo dengan sirip lebar, lengan pendek dan dua tentakel penangkap yang panjang."];
NJ36_PROFILES["ikan_mandarin"]=["Terumbu dangkal Nusantara", "Ikan kecil dengan sirip kipas, garis warna cerah dan bentuk tubuh rendah berlapis warna."];
NJ36_PROFILES["ular_laut_belang"]=["Pantai berbatu dan perairan pesisir", "Ular laut bercorak pita gelap terang dengan ekor pipih untuk berenang; tidak sama dengan ular kobra darat."];
NJ36_PROFILES["bilou"]=["Primata endemik Mentawai", "Hylobates klossii: owa bertubuh relatif kecil, berbulu hitam dan berlengan panjang. Tidak berekor."];
NJ36_PROFILES["simakobu"]=["Primata endemik Mentawai", "Simias concolor: monyet berhidung pesek dengan ekor pendek melengkung menyerupai ekor babi."];
NJ36_PROFILES["joja_mentawai"]=["Primata endemik Mentawai", "Lutung Mentawai berwajah kontras dan berekor panjang; dapat dibedakan dari Simakobu dan Bilou."];
NJ36_PROFILES["bokkoi"]=["Primata endemik Mentawai", "Beruk Mentawai: monyet berwarna kecokelatan dengan rambut mahkota dan pipi tebal."];
NJ36_PROFILES["kucing_merah_kalimantan"]=["Kucing liar langka", "Catopuma badia adalah kucing liar Borneo bertubuh ramping dan berekor panjang; bukan kucing domestik."];
NJ36_PROFILES["macan_dahan_sunda"]=["Kucing hutan besar", "Neofelis diardi dikenal dari corak bulu menyerupai awan serta ekor panjang yang membantu keseimbangan."];
NJ36_PROFILES["kambing_hutan_sumatra"]=["Mamalia pegunungan", "Serow Sumatra bertubuh kekar, berbulu gelap, berjambul dan memiliki sepasang tanduk pendek mengarah ke belakang."];
NJ36_PROFILES["kijang_muncak"]=["Mamalia hutan", "Kijang kecil dengan telinga tegak, kaki ramping, serta tanduk pendek pada jantan. Berbeda dari kancil tanpa tanduk."];
NJ36_PROFILES["mambruk_victoria"]=["Burung tanah Papua", "Goura victoria: merpati tanah besar dengan kipas mahkota berbulu berhias ujung putih."];
NJ36_PROFILES["namdur_polos"]=["Burung pembangun pondok", "Burung namdur dikenal membangun arena bercabang untuk atraksi kawin; bentuk pondok merupakan perilaku, bukan bagian tubuh."];
NJ36_PROFILES["kakatua_putih"]=["Burung Maluku Utara", "Cacatua alba: kakatua putih dengan jambul lebar yang membuka seperti payung, berbeda dari kakatua Maluku berona salmon."];
NJ36_PROFILES["elang_bondol"]=["Burung pemangsa", "Elang bondol dewasa mempunyai kepala dan dada putih serta sayap berwarna cokelat kemerahan."];
NJ36_PROFILES["paok_pancawarna"]=["Burung lantai hutan", "Burung paok kecil berwarna-warni dengan paruh runcing, sering bergerak dekat lantai hutan."];
NJ36_PROFILES["coelacanth_sulawesi"]=["Ikan laut dalam", "Latimeria menadoensis adalah ikan bersirip cuping yang dilaporkan di perairan Indonesia; bukan dinosaurus dan bukan spesies punah."];
NJ36_PROFILES["capungan_banggai"]=["Ikan endemik Banggai", "Pterapogon kauderni bercorak pita hitam-putih, sirip panjang, dan ekor bercabang dalam."];
NJ36_PROFILES["penyu_sisik"]=["Reptil laut", "Penyu sisik memiliki paruh melengkung dan sisik karapas yang tumpang tindih; berbeda dari penyu hijau."];
NJ36_PROFILES["buntal_landak"]=["Ikan berduri", "Buntal landak dapat mengembangkan tubuh dan mempunyai duri pelindung; tidak untuk disentuh di habitat liar."];
NJ36_PROFILES["ikan_kakatua"]=["Ikan pemakan alga", "Ikan kakatua menggunakan gigi yang menyatu seperti paruh untuk mengikis permukaan karang dan alga."];
NJ36_PROFILES["kepiting_biola"]=["Krustasea mangrove", "Kepiting biola jantan memiliki satu capit berukuran jauh lebih besar dibanding capit lainnya."];
NJ36_PROFILES["nudibranch"]=["Moluska laut", "Nudibranch adalah kelompok siput laut tanpa cangkang dewasa dengan antena sensorik dan insang terbuka; terdapat banyak spesies."];
NJ36_PROFILES["teripang_nanas"]=["Ekinodermata laut", "Teripang nanas memiliki tubuh memanjang dan tonjolan kulit besar menyerupai duri pendek."];
NJ36_PROFILES["udang_pistol"]=["Krustasea laut", "Udang pistol menghasilkan bunyi letupan kuat dengan menjentikkan capit khusus yang tidak simetris."];
NJ36_PROFILES["kobra_raja"]=["Reptil hutan", "Ophiophagus hannah adalah ular berbisa besar dengan tudung di leher; berbeda dari Kobra Jawa dari genus Naja."];
NJ36_PROFILES["buaya_papua"]=["Reptil air tawar", "Buaya air tawar Papua berciri moncong relatif lebih ramping, berbeda dari buaya muara."];
NJ36_PROFILES["nenek_pakande"]=["Cerita rakyat Bugis", "Dalam cerita lisan Bugis, digambarkan sebagai perempuan tua bungkuk berambut putih. Sosok folklor, bukan makhluk zoologis; divisualkan tanpa kekerasan."];
let nj37SharedSphere=null;
const ell=(g,x,y,z,w,h,d,m)=>{nj37SharedSphere ||= new THREE.SphereGeometry(1,16,11);let o=new THREE.Mesh(nj37SharedSphere,m);o.position.set(x,y,z);o.scale.set(w,h,d);o.castShadow=true;g.add(o);return o};
const cylinder=(g,ax,ay,az,bx,by,bz,r1,r2,m,n=9)=>{let A=new THREE.Vector3(ax,ay,az),B=new THREE.Vector3(bx,by,bz),dif=B.clone().sub(A),mesh=new THREE.Mesh(new THREE.CylinderGeometry(r2,r1,dif.length(),n),m);mesh.position.copy(A.clone().add(B).multiplyScalar(.5));mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),dif.normalize());mesh.castShadow=true;g.add(mesh);return mesh};
function tube(g,points,r,m){let path=new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)));let t=new THREE.Mesh(new THREE.TubeGeometry(path,Math.max(16,points.length*6),r,7,false),m);t.castShadow=true;g.add(t);return t}
function mats(r){const c=new THREE.Color(r[5]),std=(x,metal=0,rough=.7)=>new THREE.MeshStandardMaterial({color:x,metalness:metal,roughness:rough,side:THREE.DoubleSide});return {main:std(c),light:std(c.clone().lerp(new THREE.Color('#f6e2bf'),.41)),dark:std(c.clone().multiplyScalar(.43)),black:std('#262b2c'),white:std('#fdf3de'),gold:std('#f0c87d',.24,.43),pink:std('#c88c88'),eye:std('#151e21',.05,.13),glow:new THREE.MeshStandardMaterial({color:c,emissive:c,emissiveIntensity:1.1,transparent:true,opacity:.8})}}
function eyes(g,M,x,y,z,spacing=.3,size=.08){for(let i of [-1,1]){ell(g,x+i*spacing,y,z,size,size*.86,.045,M.white);ell(g,x+i*spacing,y,z+.036,size*.48,size*.65,.035,M.eye);ell(g,x+i*spacing-.015,y+.023,z+.063,.018,.018,.01,M.white)}}
function paws(g,M,z=0,long=false){for(let x of [-.46,.46])for(let p of [-.48,.52]){cylinder(g,x,.76,p+z,x*1.1,.16,p+z,.16,.115,M.main);ell(g,x*1.1,.16,p+z,.17,.13,.21,M.dark)}}
function cat(g,M,r){ell(g,0,.93,0,.72,.55,.96,M.main);ell(g,0,.97,.05,.55,.44,.8,M.light);paws(g,M);const head=ell(g,0,1.52,.76,.53,.47,.48,M.main);ell(g,0,1.32,1.16,.39,.25,.33,M.white);ell(g,0,1.47,1.33,.13,.10,.13,M.pink);eyes(g,M,0,1.63,1.177,.24,.11);
 for(let s of [-1,1]){ell(g,s*.40,1.87,.65,.21,.27,.18,M.main);ell(g,s*.40,1.87,.78,.105,.15,.04,M.dark)}
 tube(g,[[0,1.05,-.82],[.36,1.3,-1.15],[.59,1.48,-1.33],[.45,1.66,-1.52]],.125,M.main);
 // Tiger stripes as independent geometry, including face and tail
 if(r[0]!=='macan_putih')for(let z of [-.75,-.39,-.06,.28,.58]){for(let sx of [-1,1]){const path=[[sx*.39,1.3,z-.11],[sx*.61,1.13,z],[sx*.58,1.02,z+.13]];tube(g,path,.038,M.dark)}}
 for(let sx of [-1,1])tube(g,[[sx*.33,1.75,.92],[sx*.21,1.66,1.1]],.03,M.dark);
}
function lizard(g,M){ell(g,0,.50,0,.65,.37,1.13,M.main);ell(g,0,.53,1.1,.62,.25,.49,M.main);ell(g,0,.39,1.49,.49,.16,.38,M.light);eyes(g,M,0,.66,1.45,.39,.085);for(let sx of [-1,1])for(let z of [-.64,.64]){cylinder(g,sx*.47,.50,z,sx*1.02,.15,z+.17,.19,.11,M.main);ell(g,sx*1.09,.14,z+.28,.22,.08,.15,M.dark)}
 let tail=[];for(let i=0;i<=10;i++){let t=i/10;tail.push([Math.sin(t*2.3)*.40, .45-.25*t,-.95-2.6*t])}tube(g,tail,.22,M.main);
 for(let i=0;i<12;i++){let z=-.92+i*.17;ell(g,0,.82,z,.10,.09,.12,M.dark)}
}
function bird(g,M,kind){ell(g,0,.87,0,.47,.6,.48,M.main);ell(g,0,1.47,.30,.35,.38,.32,M.main);ell(g,0,1.59,.57,.27,.25,.19,M.light);let beak=new THREE.Mesh(new THREE.ConeGeometry(.12,.45,7),M.gold);beak.rotation.x=Math.PI/2;beak.position.set(0,1.45,.80);g.add(beak);eyes(g,M,0,1.65,.68,.24,.066);
 for(let sx of [-1,1]){
  let wing=new THREE.Group();wing.name=sx===-1?'wingL':'wingR';wing.position.set(sx*.35,1.18,-.12);g.add(wing);
  for(let j=0;j<6;j++){let f=ell(wing,sx*(.15+j*.18),j*.088,0,.16,.33+.045*j,.12,j%2?M.light:M.main);f.rotation.z=sx*(.55+j*.13)}
  cylinder(g,sx*.19,.46,.12,sx*.22,.04,.27,.055,.037,M.dark);for(let toe of [-1,0,1])cylinder(g,sx*.22,.04,.23,sx*.22+toe*.11,.02,.52,.033,.022,M.gold)
 }
 if(kind==='paradise'){for(let sx of [-1,1])tube(g,[[sx*.14,.80,-.22],[sx*.23,.63,-.70],[sx*.56,.47,-1.60],[sx*.78,.45,-2.18]],.035,M.gold);for(let i=0;i<5;i++){let feather=ell(g,(i-2)*.16,.65,-.55-i*.10,.09,.13,.43,M.gold);feather.rotation.x=.5}}
 if(kind==='maleo'){ell(g,0,1.90,.39,.17,.37,.21,M.black);ell(g,0,.94,.48,.36,.30,.19,M.white)}
}
function bovine(g,M,kind){ell(g,0,.89,0,.74,.66,1.04,M.main);paws(g,M,0,true);ell(g,0,1.55,.88,.47,.48,.49,M.main);ell(g,0,1.36,1.26,.40,.25,.35,M.light);eyes(g,M,0,1.67,1.18,.3,.09);
 for(let sx of [-1,1]){tube(g,[[sx*.28,1.83,.8],[sx*.37,2.27,.9],[sx*.49,2.50,1.02]],.075,M.gold);ell(g,sx*.42,1.65,.78,.23,.16,.13,M.dark)}
 tube(g,[[0,1.13,-.87],[.15,.85,-1.18],[.18,.6,-1.28]],.095,M.dark);
 if(kind==='lembuswana'){
  tube(g,[[0,1.44,1.40],[0,1.03,1.62],[.02,.56,1.67],[.16,.46,1.77]],.175,M.main);
  for(let sx of [-1,1]){for(let j=0;j<5;j++){const f=ell(g,sx*(.53+j*.12),1.65+j*.10,-.1,.13,.46,.30,j%2?M.gold:M.light);f.rotation.z=sx*(.45+j*.12)}tube(g,[[sx*.20,1.19,1.4],[sx*.37,.92,1.58]],.045,M.white)}
 }
}
function monkey(g,M){ell(g,0,1.10,0,.48,.70,.39,M.main);ell(g,0,1.8,.12,.46,.49,.39,M.main);ell(g,0,1.66,.47,.37,.32,.25,M.light);eyes(g,M,0,1.90,.48,.28,.095);ell(g,0,1.72,.69,.18,.33,.25,M.pink);for(let sx of [-1,1]){ell(g,sx*.48,1.85,.03,.17,.21,.16,M.dark);cylinder(g,sx*.29,1.34,0,sx*.58,.67,.32,.13,.095,M.main);cylinder(g,sx*.21,.69,-.05,sx*.29,.10,.34,.16,.11,M.main)}tube(g,[[0,.67,-.32],[.45,.48,-.66],[.60,.90,-.83],[.38,1.19,-.98]],.10,M.main)}
function humanoid(g,M,kind){let h=kind==='begu'?3.1:(kind==='tuyul'?.95:kind==='jenglot'?1.05:2.1);const s=h/2.1;g.scale.setScalar(s);
 const dress=['kuntilanak','wewe','rangda','leak','bunian','pocong'].includes(kind);if(dress){const cone=new THREE.Mesh(new THREE.ConeGeometry(kind==='pocong'?.39:.64,1.8,12,1),kind==='kuntilanak'||kind==='pocong'?M.white:M.main);cone.rotation.z=Math.PI;cone.position.y=.93;g.add(cone)}else{ell(g,0,.95,0,.51,.82,.31,M.main);for(let sx of [-1,1])cylinder(g,sx*.25,.65,0,sx*.27,.12,0,.18,.12,M.main)}
 ell(g,0,2.15,.04,.41,.46,.39,kind==='kuntilanak'||kind==='pocong'?M.white:M.main);
 for(let sx of [-1,1]){cylinder(g,sx*.48,1.5,.02,sx*.71,.65,.25,.14,.08,M.main);eyes(g,M,0,2.2,.415,.21,.082)}
 if(kind==='pocong'){tube(g,[[-.33,2.02,.05],[0,2.02,.38],[.33,2.02,.05]],.065,M.dark);ell(g,0,2.75,.05,.13,.17,.10,M.white);}
 if(['kuntilanak','wewe','rangda','leak'].includes(kind)){for(let sx of [-1,1])for(let i=0;i<5;i++){tube(g,[[sx*(.05+i*.085),2.5,.04],[sx*(.14+i*.093),2.04,.14],[sx*(.2+i*.06),1.18,.06]],.07,M.black)}}
 if(['rangda','leak'].includes(kind)){for(let sx of [-1,1]){let horn=new THREE.Mesh(new THREE.ConeGeometry(.18,.58,7),M.gold);horn.position.set(sx*.25,2.65,0);g.add(horn)}tube(g,[[0,1.98,.48],[0,1.7,.55],[.13,1.52,.59]],.07,M.pink);}
 if(kind==='genderuwo'||kind==='buto'){for(let sx of [-1,1]){let f=new THREE.Mesh(new THREE.ConeGeometry(.14,.3,5),M.white);f.position.set(sx*.17,1.92,.40);f.rotation.x=Math.PI;g.add(f)}}
 if(kind==='bunian'){const halo=new THREE.Mesh(new THREE.TorusGeometry(.62,.035,8,32),M.glow);halo.position.set(0,2.45,0);g.add(halo)}
}
function floating(g,M,kind){if(kind==='banaspati'){let orb=ell(g,0,1.3,0,.75,.77,.7,M.glow);for(let i=0;i<15;i++){const a=(i/15)*Math.PI*2,cone=new THREE.Mesh(new THREE.ConeGeometry(.18,.66,5),i%2?M.gold:M.main);cone.position.set(Math.sin(a)*.59,1.3+Math.cos(a)*.61,0);cone.rotation.z=-a;g.add(cone)}return}
 ell(g,0,1.95,0,.47,.48,.42,M.main);eyes(g,M,0,2.02,.40,.23,.09);ell(g,0,2.43,.05,.51,.27,.38,M.black);
 for(let j=0;j<7;j++){let a=(j/7)*Math.PI*2,tubePts=[[Math.cos(a)*.25,1.67,Math.sin(a)*.25],[Math.cos(a)*.35,1.23,Math.sin(a)*.40],[Math.cos(a+.5)*.59,.73,Math.sin(a+.5)*.50]];tube(g,tubePts,.045,j%3?M.main:M.pink)}
 if(kind==='kuyang')for(let side of [-1,1])ell(g,side*.30,1.8,.25,.09,.18,.10,M.light);
}
function dragon(g,M){const p=[];for(let j=0;j<23;j++){let t=j/22;p.push([Math.sin(t*9)*(.9-t*.3),1+Math.sin(t*5)*.34,t*4-2])};const body=tube(g,p,.25,M.main);for(let j=0;j<18;j++){let x=p[j][0],y=p[j][1];let spine=new THREE.Mesh(new THREE.ConeGeometry(.15,.28,5),M.gold);spine.position.set(x,y+.28,p[j][2]);g.add(spine)}
 ell(g,p[22][0],p[22][1],p[22][2],.42,.32,.49,M.main);for(let sx of [-1,1]){tube(g,[[p[22][0]+sx*.21,p[22][1]+.17,p[22][2]],[p[22][0]+sx*.26,p[22][1]+.50,p[22][2]+.1]],.07,M.gold)}eyes(g,M,p[22][0],p[22][1]+.10,p[22][2]+.36,.25,.085);
}
function boar(g,M){ell(g,0,.72,0,.77,.65,.93,M.main);ell(g,0,.92,.92,.61,.51,.54,M.main);ell(g,0,.63,1.32,.44,.26,.28,M.light);eyes(g,M,0,1.08,1.31,.42,.1);paws(g,M);for(let sx of [-1,1]){const tusk=new THREE.Mesh(new THREE.ConeGeometry(.11,.37,7),M.white);tusk.position.set(sx*.46,.89,1.44);g.add(tusk)}tube(g,[[0,.8,-.82],[.14,.6,-1.18],[.29,.7,-1.30]],.11,M.main)}
function bat(g,M){ell(g,0,1.2,0,.41,.47,.34,M.main);ell(g,0,1.71,.09,.32,.31,.28,M.main);eyes(g,M,0,1.71,.34,.20,.075);for(let sx of [-1,1]){let ear=new THREE.Mesh(new THREE.ConeGeometry(.17,.5,7),M.main);ear.position.set(sx*.23,2.12,0);g.add(ear);
 const shape=new THREE.Shape();shape.moveTo(0,0);shape.lineTo(.75,.20);shape.lineTo(1.55,.03);shape.quadraticCurveTo(1.42,-.29,1.16,-.28);shape.quadraticCurveTo(.93,-.60,.74,-.35);shape.quadraticCurveTo(.45,-.63,.38,-.28);shape.lineTo(0,0);let geom=new THREE.ShapeGeometry(shape,8),wing=new THREE.Mesh(geom,M.dark);wing.scale.set(sx,1,1);wing.position.set(sx*.31,1.50,.0);wing.rotation.x=-.4;g.add(wing)}
}
// VERSION 3.6 — Individually art-directed landmark silhouettes.
// Shared primitives are reused for performance; each named being has a distinct sculpt pass.
function fin(g,M,x,y,z,s=.18){const a=new THREE.Mesh(new THREE.ConeGeometry(s,s*2.7,7),M.gold);a.position.set(x,y,z);a.rotation.z=-x*.5;g.add(a);return a}
function seedGem(g,M,x,y,z,s=.10){const a=new THREE.Mesh(new THREE.OctahedronGeometry(s,0),M.glow);a.position.set(x,y,z);g.add(a);return a}
function whiskers(g,M,y,z){for(let sx of [-1,1])for(let j=0;j<2;j++)tube(g,[[sx*.18,y,z],[sx*.42,y+.09-j*.13,z+.21],[sx*.67,y+.12-j*.18,z+.25]],.019,M.gold)}
function crest(g,M,y,count=5){for(let j=0;j<count;j++){const x=(j-(count-1)/2)*.15;fin(g,M,x,y-Math.abs(x)*.12,.30,.075)}}
function scales(g,M,n=36,y=1.30,z=0){for(let j=0;j<n;j++){let a=j*2.39996,rad=Math.sqrt((j+.5)/n);const e=ell(g,Math.sin(a)*rad*.52,y-Math.abs(Math.sin(a))*rad*.11,z+Math.cos(a)*rad*.73,.049,.023,.073,j%4?M.light:M.gold);e.rotation.y=a}}
function claw(g,M,x,y,z){for(let k=-1;k<=1;k++)cylinder(g,x+k*.065,y,z,x+k*.08,y-.05,z+.2,.023,.004,M.white,6)}
function braid(g,M,x,y,z,long=1){tube(g,[[x,y,z],[x*1.3,y-.45*long,z-.05],[x*1.7,y-1.0*long,z+.04]],.07,M.dark)}
function plume(g,M,x,y,z,sign=1){const wing=new THREE.Group();wing.name=sign<0?'signatureWingL':'signatureWingR';wing.position.set(x,y,z);g.add(wing);for(let j=0;j<9;j++){const el=ell(wing,sign*(.15+j*.13),.08+j*.09,-j*.08,.1,.38+j*.018,.095,j%3?M.main:M.gold);el.rotation.z=sign*(.65+j*.08)}return wing}
function band(g,M,y,r=.49){const ring=new THREE.Mesh(new THREE.TorusGeometry(r,.022,6,48),M.gold);ring.position.y=y;ring.rotation.x=Math.PI/2;g.add(ring);return ring}
function mane(g,M,x=0,y=1.52,z=.79){for(let j=0;j<20;j++){let a=j*Math.PI*2/20;const f=ell(g,x+Math.sin(a)*.48,y+Math.cos(a)*.47,z-.07,.10,.19,.13,j%3===0?M.gold:M.light);f.rotation.z=a}}
function slenderHorse(g,M){
 ell(g,0,1.21,-.06,.55,.49,1.00,M.main);
 for(let sx of [-1,1])for(let zz of [-.65,.57]){cylinder(g,sx*.39,.99,zz,sx*.44,.22,zz+.06,.13,.09,M.main);ell(g,sx*.45,.15,zz+.13,.13,.10,.22,M.dark)}
 ell(g,0,1.65,.63,.27,.54,.29,M.main);ell(g,0,2.02,.78,.27,.37,.31,M.main);ell(g,0,1.90,1.05,.22,.18,.28,M.light);eyes(g,M,0,2.10,.99,.20,.068);
 for(let sx of [-1,1]){fin(g,M,sx*.22,2.42,.67,.12);claw(g,M,sx*.45,.19,.59)}
 tube(g,[[0,1.27,-.90],[.26,1.16,-1.18],[.48,.82,-1.63],[.45,.52,-1.82]],.09,M.dark);
 for(let j=0;j<7;j++)ell(g,0,1.9+j*.058,.44-j*.14,.12,.16,.16,M.dark);
}
function wovenHorse(g,M){
 // Woven flat hobby-horse performance prop, not a real galloping animal.
 const shape=new THREE.Shape();shape.moveTo(-.72,.40);shape.lineTo(-.72,1.15);shape.quadraticCurveTo(-.53,1.5,-.28,1.55);
 shape.lineTo(.21,1.48);shape.lineTo(.36,2.38);shape.lineTo(.67,2.46);shape.lineTo(.84,2.12);shape.lineTo(.64,1.91);
 shape.lineTo(.56,1.16);shape.lineTo(.92,.75);shape.lineTo(.65,.42);shape.quadraticCurveTo(0,.1,-.72,.40);
 const plane=new THREE.Mesh(new THREE.ExtrudeGeometry(shape,{depth:.10,bevelEnabled:true,bevelThickness:.045,bevelSize:.035,bevelSegments:2,steps:1}),M.main);plane.position.set(0,0,.08);plane.castShadow=true;g.add(plane);
 for(let j=0;j<18;j++){let yy=.55+j*.063;tube(g,[[-.51,yy,.25],[0,yy+.07*Math.sin(j*2),.24],[.52,yy,.25]],.014,j%3?M.gold:M.dark)}
 ell(g,.53,2.18,.24,.087,.09,.034,M.white);ell(g,.53,2.18,.278,.036,.047,.02,M.eye);
 for(let j=0;j<7;j++)tube(g,[[.25,2.15-j*.08,.21],[.04,2.08-j*.12,.23],[-.14,2.02-j*.10,.23]],.026,M.dark);
}
function serpentWoman(g,M){
 const points=[];for(let j=0;j<=24;j++){const u=j/24,a=u*Math.PI*2.7;points.push([Math.sin(a)*(.82-u*.35),.29+u*.12,Math.cos(a)*(.78-u*.23)])}
 tube(g,points,.24,M.main);ell(g,0,1.23,0,.38,.62,.27,M.light);ell(g,0,1.95,.15,.36,.38,.31,M.main);
 eyes(g,M,0,2.05,.43,.19,.075);for(let sx of [-1,1]){braid(g,M,sx*.25,2.25,0,.70);tube(g,[[sx*.32,1.45,0],[sx*.62,.96,.18]],.095,M.main)}
 crest(g,M,2.41,5);scales(g,M,20,.44,0);
}
function waterWraith(g,M){
 for(let j=0;j<8;j++){const ang=j*2.4,r=.33+(j%3)*.07;tube(g,[[Math.sin(ang)*r,.16,Math.cos(ang)*r],[Math.sin(ang+.3)*r,1.00,Math.cos(ang)*r],[Math.sin(ang+.7)*r*.5,1.91,Math.cos(ang+.4)*r*.5]],.07,j%3?M.main:M.glow)}
 ell(g,0,2.03,.11,.34,.37,.32,M.light);eyes(g,M,0,2.13,.42,.17,.063);
 for(let k=0;k<9;k++){const a=k*2.399;const t=ell(g,Math.sin(a)*.55,.45+(k%3)*.42,Math.cos(a)*.30,.08,.20,.08,M.glow);t.rotation.z=a}
}
const sculptSignatures={
 komodo(g,M){for(let j=0;j<50;j++){let z=-.85+(j%17)*.13,x=Math.sin(j*2.4)*.53;ell(g,x,.79-Math.abs(x)*.22,z,.053,.022,.067,j%3?M.light:M.dark)}for(let sx of [-1,1])for(let z of [-.65,.65])claw(g,M,sx*.88,.13,z+.17);tube(g,[[0,.30,1.78],[0,.26,2.06]],.02,M.pink)},
 tiger(g,M){for(let j=-3;j<=3;j++){tube(g,[[j*.10,1.65,.92],[j*.13,1.54,1.10]],.024,M.dark)}for(let sx of [-1,1])claw(g,M,sx*.50,.20,.70);mane(g,M,0,1.51,.73)},
 cendrawasih(g,M){for(let sx of [-1,1]){plume(g,M,sx*.27,1.38,-.15,sx);tube(g,[[sx*.15,.65,-.21],[sx*.31,.48,-.85],[sx*.67,.40,-1.82],[sx*.87,.65,-2.44]],.025,M.gold)}crest(g,M,2.00,3)},
 lembuswana(g,M){crest(g,M,2.11,7);scales(g,M,38,1.37,0);for(let sx of [-1,1]){tube(g,[[sx*.2,1.35,1.35],[sx*.34,1.18,1.67],[sx*.25,1.52,1.79]],.068,M.white);plume(g,M,sx*.65,1.64,-.11,sx)}},
 kuyang(g,M){for(let j=0;j<12;j++){const a=j*2.4;braid(g,M,Math.sin(a)*.34,2.3,Math.cos(a)*.2,.8+(j%3)*.2)}for(let k=0;k<6;k++)seedGem(g,M,Math.sin(k*2.4)*.27,.55+k%3*.17,Math.cos(k*2.4)*.29,.045)},
 anoa(g,M){for(let sx of [-1,1])tube(g,[[sx*.23,1.95,.76],[sx*.31,2.19,.51],[sx*.32,2.45,.42]],.08,M.dark);for(let i=0;i<12;i++)ell(g,Math.sin(i*4)*.49,1.41,Math.cos(i*4)*.52,.09,.035,.13,M.dark)},
 maleo(g,M){ell(g,0,2.00,.32,.24,.29,.19,M.dark);const v=ell(g,0,2.30,.29,.20,.10,.19,M.gold);v.rotation.x=-.15;for(let sx of [-1,1]){ell(g,sx*.23,1.46,.46,.13,.12,.11,M.gold)}},
 bekantan(g,M){ell(g,0,1.72,.71,.16,.36,.17,M.pink);ell(g,0,1.53,.86,.17,.11,.12,M.light);for(let sx of [-1,1])for(let i=0;i<4;i++)ell(g,sx*.29,1.20+i*.11,-.25,.15,.068,.07,M.gold)},
 garuda(g,M){for(let sx of [-1,1])plume(g,M,sx*.42,1.44,-.13,sx);crest(g,M,2.10,7);for(let j=0;j<9;j++)ell(g,(j-4)*.085,1.31,.36,.05,.16,.06,M.gold)},
 naga_basuki(g,M){crest(g,M,1.95,5);whiskers(g,M,1.54,2.40);for(let i=0;i<8;i++)seedGem(g,M,Math.sin(i*2.4)*.63,1.57,Math.cos(i*2.4)*.30,.065)},
 barong(g,M){mane(g,M,0,1.60,.84);for(let sx of [-1,1]){fin(g,M,sx*.33,2.34,.75,.14);ell(g,sx*.29,1.74,1.17,.14,.16,.09,M.gold)}crest(g,M,2.34,9)},
 rangda(g,M){for(let sx of [-1,1])for(let j=0;j<4;j++)braid(g,M,sx*(.16+j*.085),2.47,.16,1.40);for(let sx of [-1,1]){cylinder(g,sx*.14,1.91,.52,sx*.13,1.52,.54,.045,.009,M.white)}crest(g,M,2.73,7)},
 leak(g,M){for(let sx of [-1,1]){fin(g,M,sx*.34,2.63,.16,.13);for(let i=0;i<3;i++)braid(g,M,sx*(.18+i*.13),2.35,0,.68)}tube(g,[[0,1.94,.48],[.12,1.65,.59],[.31,1.52,.56]],.06,M.pink)},
 kuntilanak(g,M){for(let sx of [-1,1])for(let j=0;j<6;j++)braid(g,M,sx*(.09+j*.074),2.55,.12,1.28);ell(g,0,1.79,.35,.27,.17,.07,M.white);band(g,M,1.43,.45)},
 pocong(g,M){band(g,M,2.54,.22);band(g,M,.39,.35);tube(g,[[0,2.61,.1],[.14,2.80,.05]],.085,M.white);for(let sx of [-1,1])ell(g,sx*.16,1.88,.26,.14,.08,.06,M.light)},
 genderuwo(g,M){for(let j=0;j<42;j++){const a=j*2.399,r=.65*Math.sqrt((j+1)/42),h=.65+(j%6)*.22;fin(g,M,Math.sin(a)*r,h,Math.cos(a)*.2,.045)}for(let sx of [-1,1])claw(g,M,sx*.70,.65,.28);for(let sx of [-1,1])fin(g,M,sx*.23,2.54,.05,.14)},
 tuyul(g,M){for(let sx of [-1,1]){ell(g,sx*.39,1.89,.00,.22,.18,.14,M.light)}ell(g,0,2.59,.2,.47,.28,.31,M.light);ell(g,0,2.69,.39,.07,.05,.04,M.glow)},
 wewe(g,M){for(let sx of [-1,1]){tube(g,[[sx*.45,1.62,0],[sx*.64,.84,.20],[sx*.76,.12,.29]],.13,M.main);claw(g,M,sx*.76,.12,.31)}for(let j=0;j<8;j++)braid(g,M,(j-3.5)*.085,2.52,.0,1.08)},
 jenglot(g,M){for(let sx of [-1,1]){tube(g,[[sx*.23,1.26,0],[sx*.41,.70,.29],[sx*.58,.32,.41]],.048,M.dark);claw(g,M,sx*.58,.30,.44)}for(let j=0;j<10;j++)braid(g,M,(j-4.5)*.07,2.48,.03,1.45);ell(g,0,1.25,-.2,.33,.49,.22,M.dark)},
 banaspati(g,M){for(let j=0;j<14;j++){let a=j*2.4,r=.58+.12*(j%3);const v=fin(g,M,Math.cos(a)*r,1.35+Math.sin(a)*r,0,.09);v.rotation.z=-a}for(let j=0;j<7;j++)seedGem(g,M,Math.sin(j*3)*.5,1.21+Math.cos(j*3)*.33,.55,.07)},
 sembrani(g,M){for(let sx of [-1,1])plume(g,M,sx*.52,1.40,-.15,sx);crest(g,M,2.43,5);for(let j=0;j<6;j++)ell(g,0,2.04-j*.11,.39-j*.12,.10,.15,.16,j%2?M.white:M.gold)},
 buto_ijo(g,M){ell(g,0,1.04,.18,.77,.87,.53,M.main);for(let sx of [-1,1]){fin(g,M,sx*.25,2.60,0,.20);cylinder(g,sx*.15,1.85,.46,sx*.14,1.65,.55,.07,.004,M.white)}band(g,M,.94,.67)},
 palasik(g,M){for(let j=0;j<10;j++){const a=j*2.4;braid(g,M,Math.sin(a)*.37,2.31,Math.cos(a)*.25,.50)}for(let j=0;j<5;j++)seedGem(g,M,(j-2)*.16,.65+j%2*.15,0,.075)},
 babi_ngepet(g,M){for(let j=0;j<11;j++)fin(g,M,0,1.56,-.75+j*.17,.085);ell(g,0,.61,1.51,.36,.23,.14,M.pink);for(let sx of [-1,1])ell(g,sx*.14,.64,1.64,.057,.058,.02,M.dark)},
 ahool(g,M){for(let sx of [-1,1]){claw(g,M,sx*.28,.57,.24);fin(g,M,sx*.25,2.10,.03,.09)}for(let j=0;j<8;j++)ell(g,(j-3.5)*.08,1.02,.35,.04,.11,.06,M.light)},
 bunian(g,M){for(let j=0;j<6;j++){const a=j*2.4;seedGem(g,M,Math.sin(a)*.55,1.1+j%3*.34,Math.cos(a)*.55,.12)}crest(g,M,2.52,5);band(g,M,1.20,.63)},
 begu_ganjang(g,M){for(let sx of [-1,1]){tube(g,[[sx*.43,1.55,0],[sx*.67,.86,.09],[sx*.60,-.13,.16]],.11,M.dark);claw(g,M,sx*.6,.05,.18)}for(let j=0;j<7;j++)braid(g,M,(j-3)*.10,2.53,.05,1.7)},
 nyai_blora(g,M){scales(g,M,31,.54,.04);crest(g,M,2.40,5);for(let sx of [-1,1])braid(g,M,sx*.31,2.23,0,1.04)},
 hantu_banyu(g,M){for(let j=0;j<9;j++){const a=j*2.4;seedGem(g,M,Math.sin(a)*.57,.48+j%3*.39,Math.cos(a)*.39,.09)}for(let sx of [-1,1])tube(g,[[sx*.27,1.47,0],[sx*.40,.88,.16],[sx*.58,.30,.36]],.09,M.glow)},
 naga_antaboga(g,M){for(let j=0;j<11;j++)ell(g,Math.sin(j*2.4)*.72,1.25+Math.cos(j*2.4)*.30,.05,.05,.14,M.white);whiskers(g,M,1.55,2.34);for(let j=0;j<5;j++)seedGem(g,M,(j-2)*.15,1.92,.72,.09)},
 macan_putih(g,M){for(let z of [-.70,-.28,.17,.56])for(let sx of [-1,1])tube(g,[[sx*.34,1.36,z-.10],[sx*.62,1.17,z],[sx*.58,1.0,z+.1]],.039,M.dark);crest(g,M,2.15,3);for(let sx of [-1,1])claw(g,M,sx*.5,.20,.7)},
 kuda_lumping(g,M){for(let j=0;j<9;j++){let a=j*2.399;seedGem(g,M,Math.sin(a)*.45,.5+j%4*.23,.32,.044)}for(let sx of [-1,1])tube(g,[[sx*.64,.45,.24],[sx*.83,.21,.28]],.027,M.gold)},
 ular_naga(g,M){for(let i=0;i<9;i++){const a=i*2.4;ell(g,Math.sin(a)*.65,1.14+Math.cos(a)*.3,-.6+(i%4)*.42,.10,.055,.13,M.dark)}for(let sx of [-1,1])fin(g,M,sx*.23,1.96,2.12,.12);whiskers(g,M,1.51,2.37)},
 sundel_bolong(g,M){for(let sx of [-1,1])for(let j=0;j<4;j++)braid(g,M,sx*(.12+j*.12),2.55,.06,1.22);const gap=new THREE.Mesh(new THREE.TorusGeometry(.24,.051,8,40),M.dark);gap.position.set(0,1.37,-.42);g.add(gap);for(let j=0;j<5;j++)seedGem(g,M,Math.sin(j*2.4)*.55,.69+j%3*.33,Math.cos(j*2.4)*.41,.045)},
 siluman_harimau(g,M){for(let j=-3;j<=3;j++)tube(g,[[j*.11,1.69,.86],[j*.12,1.56,1.07]],.027,M.dark);const mask=ell(g,0,1.91,1.03,.27,.22,.17,M.light);mask.rotation.x=.14;crest(g,M,2.33,5);for(let j=0;j<7;j++)seedGem(g,M,Math.sin(j*2.4)*.55,.80+j%3*.40,Math.cos(j*2.4)*.54,.065)}
};


// 3.7 fauna collection — silhouettes deliberately key to each species' morphology.
function nj37Elephant(g,M){ell(g,0,1.05,0,.89,.78,1.14,M.main);ell(g,0,1.64,1,.71,.73,.73,M.main);for(let s of [-1,1]){ell(g,s*.67,1.69,.94,.18,.48,.39,M.light);for(let z of [-.69,.70]){cylinder(g,s*.55,.94,z,s*.54,.13,z,.21,.21,M.main);ell(g,s*.54,.12,z+.1,.23,.11,.28,M.dark)}tube(g,[[s*.34,1.51,1.50],[s*.44,1.12,1.70],[s*.34,.97,1.73]],.06,M.white)}tube(g,[[0,1.50,1.63],[0,.89,2.06],[.17,.38,2.10],[.29,.34,2.02]],.20,M.main);eyes(g,M,0,1.80,1.50,.39,.075);tube(g,[[0,1.10,-1.08],[0,.63,-1.33]],.08,M.dark)}
function nj37Rhino(g,M){ell(g,0,.94,0,.91,.75,1.20,M.main);ell(g,0,1.30,.87,.62,.61,.62,M.main);ell(g,0,.99,1.42,.55,.29,.49,M.light);for(let s of [-1,1])for(let z of [-.73,.68]){cylinder(g,s*.59,.71,z,s*.57,.11,z,.22,.24,M.main);ell(g,s*.58,.10,z,.23,.1,.26,M.dark)}eyes(g,M,0,1.58,1.38,.49,.084);const horn=new THREE.Mesh(new THREE.ConeGeometry(.18,.64,11),M.gold);horn.rotation.x=.26;horn.position.set(0,1.45,1.82);g.add(horn);for(let z of [-.85,.04,.69]){tube(g,[[-.66,1.18,z],[0,1.45,z+.08],[.66,1.18,z]],.034,M.dark)}}
function nj37Deer(g,M){ell(g,0,1.12,-.08,.52,.45,.93,M.main);for(let s of [-1,1])for(let z of [-.61,.63]){cylinder(g,s*.35,1.01,z,s*.40,.13,z+.08,.08,.085,M.dark);ell(g,s*.40,.10,z+.11,.11,.10,.16,M.dark)}ell(g,0,1.65,.63,.26,.59,.33,M.main);ell(g,0,2.07,.81,.32,.33,.32,M.main);ell(g,0,1.93,1.13,.24,.15,.36,M.light);eyes(g,M,0,2.17,1.00,.26,.067);for(let s of [-1,1]){ell(g,s*.36,2.27,.65,.20,.12,.12,M.light);tube(g,[[s*.22,2.35,.78],[s*.43,2.86,.67],[s*.52,3.17,.58]],.056,M.gold);tube(g,[[s*.40,2.78,.66],[s*.67,3.00,.80]],.047,M.gold)}tube(g,[[0,1.18,-.91],[0,.85,-1.16]],.08,M.dark)}
function nj37Tarsier(g,M){ell(g,0,1.02,0,.29,.45,.26,M.main);ell(g,0,1.69,.18,.48,.43,.42,M.main);for(let s of [-1,1]){ell(g,s*.26,1.73,.51,.20,.21,.09,M.gold);ell(g,s*.26,1.73,.57,.12,.13,.06,M.eye);ell(g,s*.43,1.92,.10,.18,.18,.08,M.light);for(let y of [.82,1.3]){cylinder(g,s*.21,y,0,s*.55,y-.45,.27,.055,.039,M.main);claw(g,M,s*.55,y-.45,.27)}}ell(g,0,1.48,.59,.12,.10,.10,M.pink);tube(g,[[0,.85,-.25],[.5,.41,-.65],[.65,.70,-1.20],[.34,1.08,-1.58]],.05,M.dark)}
function nj37Turtle(g,M){ell(g,0,.48,0,.86,.27,1.04,M.main);const shell=new THREE.Mesh(new THREE.SphereGeometry(1,14,9),M.dark);shell.position.set(0,.72,0);shell.scale.set(.86,.52,1.03);g.add(shell);for(let j=0;j<15;j++){let a=j*2.4,r=Math.sqrt((j+.5)/15);const plate=ell(g,Math.sin(a)*r*.64,.96-r*.18,Math.cos(a)*r*.83,.17,.06,.19,j%3?M.gold:M.light);plate.rotation.y=a}ell(g,0,.55,1.24,.32,.24,.48,M.main);eyes(g,M,0,.62,1.66,.23,.065);for(let s of [-1,1])for(let z of [-.63,.60]){const flipper=ell(g,s*.94,.40,z,.65,.13,.28,M.main);flipper.rotation.y=s*.40}ell(g,0,.45,-1.16,.15,.12,.35,M.main)}
function nj37Dugong(g,M){ell(g,0,.80,0,.77,.54,1.39,M.main);ell(g,0,.81,1.19,.68,.47,.61,M.main);ell(g,0,.64,1.64,.44,.27,.30,M.light);for(let s of [-1,1]){ell(g,s*.37,1.01,1.61,.065,.053,.025,M.eye);let fl=ell(g,s*.71,.43,.10,.58,.10,.28,M.dark);fl.rotation.y=s*.33;const tail=ell(g,s*.48,.51,-1.54,.57,.09,.28,M.main);tail.rotation.y=s*.44}ell(g,0,.51,-1.38,.18,.12,.42,M.main)}
function nj37Fish(g,M){ell(g,0,1.04,0,.29,.36,1.35,M.main);ell(g,0,.96,1.03,.34,.36,.50,M.main);eyes(g,M,0,1.17,1.28,.29,.082);for(let j=0;j<22;j++){let z=-1.12+(j%11)*.20,x=(j<11?-1:1)*.20;const sc=ell(g,x,1.05+(j%3)*.10,z,.07,.085,.095,j%3?M.gold:M.light);sc.rotation.y=(j%3)*.5}for(let s of [-1,1]){const f=ell(g,s*.25,.96,-.44,.32,.08,.45,M.gold);f.rotation.y=s*.4;let tail=ell(g,s*.31,.97,-1.48,.23,.30,.30,M.gold);tail.rotation.y=s*.35}for(let j=0;j<8;j++)fin(g,M,0,1.35,-.89+j*.24,.047);for(let s of [-1,1])tube(g,[[s*.09,.95,1.46],[s*.15,.85,1.73]],.025,M.dark)}
function nj37Bird(g,M,typ){bird(g,M,typ);if(typ==='cassowary'){for(const o of g.children){if(o.name==='wingL'||o.name==='wingR'){o.scale.setScalar(.14);o.position.y=.95}}ell(g,0,.93,0,.56,.73,.55,M.main);for(let s of [-1,1])cylinder(g,s*.20,.69,0,s*.21,.05,.16,.075,.056,M.main);ell(g,0,1.66,.31,.22,.55,.21,M.light);const casque=new THREE.Mesh(new THREE.ConeGeometry(.18,.58,8),M.gold);casque.position.set(0,2.39,.29);casque.rotation.z=.15;g.add(casque);for(let s of [-1,1])tube(g,[[s*.13,1.49,.31],[s*.16,1.04,.41]],.047,M.pink)}
 if(typ==='hornbill'){const beak=ell(g,0,1.54,.95,.24,.19,.59,M.gold);beak.rotation.x=-.36;ell(g,0,1.91,.72,.24,.17,.39,M.gold);for(let j=0;j<7;j++)ell(g,(j-3)*.09,1.10,-.35,.06,.25,.29,M.light)}
 if(typ==='starling'){for(let s of [-1,1]){ell(g,s*.28,1.74,.49,.14,.13,.06,M.glow);ell(g,s*.28,1.78,.53,.075,.08,.04,M.eye)}for(let j=0;j<8;j++)fin(g,M,(j-3.5)*.058,2.00,.19,.038)}
 if(typ==='eagle'){for(let s of [-1,1])plume(g,M,s*.39,1.29,0,s);for(let j=0;j<6;j++)fin(g,M,(j-2.5)*.07,2.10,.10,.05);for(let s of [-1,1])claw(g,M,s*.22,.05,.26)}
 if(typ==='cockatoo'){for(let j=0;j<6;j++)fin(g,M,(j-2.5)*.095,2.15,.32,.115);ell(g,0,1.36,.76,.22,.25,.27,M.dark);for(let s of [-1,1])ell(g,s*.34,1.69,.52,.13,.18,.05,M.pink)}
 if(typ==='peafowl'){for(let j=0;j<15;j++){const a=-Math.PI*.90+j*Math.PI*1.8/14;const f=ell(g,Math.sin(a)*1.18,1.38+Math.cos(a)*1.03,-.67,.16,.44,.12,M.gold);f.rotation.z=-a;ell(g,Math.sin(a)*1.18,1.38+Math.cos(a)*1.02,-.52,.09,.11,.05,M.glow)}for(let j=0;j<5;j++)fin(g,M,(j-2)*.08,2.19,.30,.06)}
}
function nj37Gibbon(g,M,orangutan=false){ell(g,0,1.23,0,.48,.66,.36,M.main);ell(g,0,1.83,.22,.43,.44,.38,M.main);ell(g,0,1.70,.53,.32,.31,.15,M.light);eyes(g,M,0,1.95,.56,.23,.094);for(let s of [-1,1]){ell(g,s*.42,1.89,.14,.17,.16,.14,M.main);tube(g,[[s*.43,1.55,0],[s*.65,.68,.18],[s*.58,.18,.30]],orangutan?.16:.13,M.main);ell(g,s*.60,.18,.34,.15,.15,.17,M.dark);cylinder(g,s*.29,.76,.0,s*.35,.14,.21,.18,.11,M.main)}if(orangutan){for(let j=0;j<11;j++){const a=j*2.4;const f=ell(g,Math.sin(a)*.36,1.36+Math.cos(a)*.47,-.28,.10,.18,.10,M.light);f.rotation.z=a}}}
function nj37Babirusa(g,M){boar(g,M);for(let s of [-1,1]){tube(g,[[s*.26,.87,1.34],[s*.39,1.41,1.68],[s*.38,1.92,1.54]],.085,M.gold);tube(g,[[s*.39,.67,1.33],[s*.49,1.11,1.48]],.061,M.light)}for(let j=0;j<10;j++)ell(g,Math.sin(j*2.3)*.6,1.33,-.78+j*.12,.08,.06,.09,M.dark)}

// NUSAJIWA 3.8: 14 independently composed silhouettes, creative interpretations.
function s38Banteng(g,M){
 ell(g,0,1.24,-.05,.78,.64,1.03,M.main);ell(g,0,1.52,.63,.63,.67,.51,M.main);ell(g,0,1.37,1.02,.42,.40,.42,M.main);
 for(let s of [-1,1]){for(let z of [-.64,.64]){cylinder(g,s*.50,.94,z,s*.52,.14,z,.15,.10,M.main);ell(g,s*.52,.12,z,.18,.10,.24,M.dark)}
  ell(g,s*.37,1.81,.99,.26,.15,.18,M.light);eyes(g,M,0,1.59,1.30,.31,.084);
  tube(g,[[s*.31,1.85,.88],[s*.65,2.10,.77],[s*.83,2.48,.73],[s*.71,2.63,.68]],.10,M.white)
 }
 ell(g,0,1.19,1.33,.33,.18,.27,M.dark);tube(g,[[0,1.12,-1.05],[.09,.9,-1.3]],.09,M.dark)
}
function s38Pangolin(g,M){
 ell(g,0,.70,0,.49,.37,1.01,M.main);ell(g,0,.62,.97,.24,.24,.58,M.main);
 const plates=new THREE.Group();g.add(plates);
 for(let row=0;row<10;row++)for(let side=-2;side<=2;side++){
  const a=side*.36,z=-.8+row*.19;
  const piece=new THREE.Mesh(new THREE.ConeGeometry(.145,.28,5),row%2?M.gold:M.dark);
  piece.rotation.x=-.78;piece.rotation.z=a;piece.position.set(Math.sin(a)*.47,.94+Math.cos(a)*.16,z);plates.add(piece)
 }
 for(let s of [-1,1])for(let z of [-.62,.54]){ell(g,s*.43,.32,z,.21,.13,.17,M.main);claw(g,M,s*.52,.17,z+.14)}
 tube(g,[[0,.77,-.91],[.13,.60,-1.53],[.19,.52,-2.06],[.24,.31,-2.52]],.20,M.main);
 for(let i=0;i<13;i++){let z=-1.05-i*.11;let p=ell(g,.16,.57-i*.018,z,.16,.04,.12,M.gold);p.rotation.z=.18}
 eyes(g,M,0,.76,1.38,.20,.055)
}
function s38Binturong(g,M){
 ell(g,0,.88,0,.63,.50,1.11,M.main);ell(g,0,1.04,1.04,.49,.43,.48,M.main);ell(g,0,.84,1.37,.30,.18,.27,M.light);
 for(let s of [-1,1]){for(let z of [-.68,.63]){cylinder(g,s*.44,.72,z,s*.57,.14,z+.07,.20,.17,M.main);ell(g,s*.58,.12,z+.09,.21,.11,.22,M.dark)}
  ell(g,s*.41,1.32,1.01,.19,.22,.16,M.dark);ell(g,s*.43,1.47,1.03,.1,.20,.10,M.light);
  for(let j=-1;j<=1;j++)tube(g,[[s*.22,.88,1.54],[s*.5,.94+j*.10,1.65],[s*.75,1.0+j*.18,1.54]],.015,M.white)
 }
 eyes(g,M,0,1.10,1.43,.30,.07);
 tube(g,[[0,.96,-.99],[.22,.82,-1.49],[.58,1.19,-1.99],[.36,1.67,-2.21],[-.07,1.82,-1.94]],.15,M.dark);
 for(let i=0;i<16;i++){let x=Math.sin(i*2.4)*.4,z=(i%8)*.26-.75;ell(g,x,1.26+Math.cos(i*2.4)*.1,z,.08,.17,.10,i%3?M.dark:M.light)}
}
function s38Kancil(g,M){
 ell(g,0,1.02,-.14,.39,.42,.77,M.main);ell(g,0,1.41,.51,.18,.39,.22,M.main);ell(g,0,1.66,.74,.31,.24,.27,M.main);ell(g,0,1.49,1.01,.22,.18,.27,M.light);
 for(let s of [-1,1]){for(let z of [-.61,.51]){cylinder(g,s*.27,.87,z,s*.27,.09,z,.071,.045,M.dark);ell(g,s*.28,.08,z+.04,.09,.07,.13,M.black)}
  ell(g,s*.26,1.87,.62,.13,.26,.13,M.main);eyes(g,M,0,1.73,.94,.25,.047)}
 for(let j=0;j<10;j++)ell(g,Math.sin(j*2.4)*.28,1.20,-.56+j*.12,.045,.021,.06,M.light);
 ell(g,0,1.37,1.27,.10,.08,.09,M.black)
}
function s38Loris(g,M){
 ell(g,0,1.13,0,.44,.55,.40,M.main);ell(g,0,1.92,.26,.55,.46,.48,M.light);
 for(let s of [-1,1]){
  ell(g,s*.25,1.94,.60,.25,.27,.12,M.dark);ell(g,s*.25,1.94,.70,.155,.18,.09,M.gold);ell(g,s*.25,1.94,.75,.091,.115,.06,M.eye);
  ell(g,s*.41,2.20,.29,.19,.22,.13,M.main);
  tube(g,[[s*.38,1.52,-.01],[s*.54,1.06,.38],[s*.44,.58,.51]],.13,M.main);claw(g,M,s*.44,.55,.54);
  tube(g,[[s*.20,.76,0],[s*.33,.34,.13]],.16,M.main)
 }
 tube(g,[[0,2.32,.30],[0,1.94,.78],[0,1.69,.76]],.035,M.dark);ell(g,0,1.77,.78,.09,.06,.09,M.pink)
}
function s38FishingCat(g,M){
 ell(g,0,.91,0,.59,.45,.90,M.main);ell(g,0,1.28,.70,.41,.39,.39,M.main);ell(g,0,1.09,1.02,.32,.22,.32,M.light);
 for(let s of [-1,1]){for(let z of [-.57,.55]){cylinder(g,s*.42,.80,z,s*.47,.16,z+.07,.14,.11,M.main);claw(g,M,s*.47,.11,z+.17)}
  ell(g,s*.29,1.59,.66,.17,.20,.10,M.dark);eyes(g,M,0,1.42,1.02,.25,.07);
  for(let j=0;j<5;j++){const z=-.75+j*.35;ell(g,s*(.40+(j%2)*.035),1.15,z,.058,.05,.13,M.dark)}
  for(let j=0;j<3;j++)ell(g,s*.22,1.61,.94-j*.16,.06,.045,.06,M.dark)
 }
 tube(g,[[0,.94,-.87],[.28,.87,-1.10],[.40,.67,-1.29]],.12,M.main)
}
function s38Eclectus(g,M){
 ell(g,0,1.23,0,.39,.56,.45,M.main);ell(g,0,1.74,.26,.33,.39,.30,M.main);
 ell(g,0,1.62,.56,.22,.16,.18,M.gold);ell(g,0,1.48,.62,.17,.14,.19,M.dark);
 for(let s of [-1,1]){eyes(g,M,0,1.89,.48,.26,.061);let wing=new THREE.Group();wing.name=s<0?'wingL':'wingR';wing.position.set(s*.34,1.38,-.05);g.add(wing);
  for(let j=0;j<11;j++){let f=ell(wing,s*(.12+j*.075),-.02+j*.03,-j*.07,.11,.31,.07,j%3?M.main:M.gold);f.rotation.z=s*(.26+j*.045)}
  cylinder(g,s*.17,.83,.01,s*.20,.24,.12,.06,.04,M.dark);claw(g,M,s*.20,.22,.17)
 }
 for(let j=-3;j<=3;j++)ell(g,j*.075,1.03,-.71,.08,.12,.49,j%2?M.dark:M.gold)
}
function s38Argus(g,M){
 ell(g,0,1.14,0,.42,.54,.48,M.main);ell(g,0,1.65,.28,.31,.34,.25,M.main);eyes(g,M,0,1.72,.48,.24,.064);
 const beak=new THREE.Mesh(new THREE.ConeGeometry(.11,.32,7),M.gold);beak.rotation.x=Math.PI/2;beak.position.set(0,1.54,.61);g.add(beak);
 for(let s of [-1,1]){cylinder(g,s*.21,.73,.02,s*.21,.12,.13,.072,.038,M.dark);claw(g,M,s*.21,.11,.17);
  const f=new THREE.Group();f.name=s<0?'wingL':'wingR';f.position.set(s*.36,1.42,-.08);g.add(f);
  for(let j=0;j<13;j++){const blade=ell(f,s*(.12+j*.13),-.05-j*.045,-j*.12,.095,.26,.07,j%3===0?M.gold:M.main);blade.rotation.z=s*.3;
   ell(f,s*(.13+j*.13),-.05-j*.045,-j*.12+.065,.034,.06,.014,M.eye)}
 }
 for(let i=-4;i<=4;i++){const plume=ell(g,i*.14,.93,-.70,.075,.12,.92,i%2?M.gold:M.main);plume.rotation.x=.25;
  ell(g,i*.14,.97,-1.55,.044,.08,.04,M.eye)}
}
function s38Manta(g,M){
 ell(g,0,.94,0,.67,.18,.79,M.main);ell(g,0,.81,.56,.40,.1,.40,M.light);
 const shape=new THREE.Shape();shape.moveTo(0,.08);shape.bezierCurveTo(1,.67,2.50,.02,2.85,-.65);shape.quadraticCurveTo(2.10,-.49,1.68,-.27);shape.quadraticCurveTo(.58,-.20,0,-.22);shape.lineTo(0,.08);
 for(let s of [-1,1]){const fin=new THREE.Mesh(new THREE.ShapeGeometry(shape,16),M.main);fin.position.set(0,.96,0);fin.scale.x=s;fin.rotation.x=Math.PI/2;fin.castShadow=true;g.add(fin);
  ell(g,s*.56,.95,.20,.61,.075,.30,M.main);ell(g,s*.38,.82,.63,.10,.08,.27,M.light);
  ell(g,s*.39,1.08,.56,.07,.05,.06,M.eye)
 }
 tube(g,[[0,.91,-.55],[0,.85,-1.0],[0,.79,-1.77]],.046,M.dark)
}
function s38Napoleon(g,M){
 ell(g,0,.94,0,.59,.77,1.19,M.main);ell(g,0,1.21,1.0,.56,.56,.60,M.main);
 ell(g,0,1.65,1.14,.48,.36,.35,M.light);ell(g,0,.88,1.47,.44,.21,.33,M.light);
 for(let s of [-1,1]){eyes(g,M,0,1.31,1.38,.44,.10);ell(g,s*.56,1.0,.18,.34,.14,.41,M.gold)}
 for(let j=0;j<13;j++){const z=-.94+j*.16;const f=new THREE.Mesh(new THREE.ConeGeometry(.11,.31,6),j%3?M.main:M.gold);f.position.set(0,1.62+Math.cos(j*.16)*.08,z);g.add(f)}
 ell(g,0,1,-1.23,.09,.54,.52,M.gold);
 for(let j=0;j<40;j++){const a=j*2.399;ell(g,Math.sin(a)*.51,1+Math.cos(a)*.59,-.7+(j%12)*.17,.037,.033,.06,M.light)}
}
function s38EbuGogo(g,M){
 ell(g,0,1.10,0,.52,.75,.41,M.main);ell(g,0,1.91,.25,.49,.45,.44,M.main);ell(g,0,1.72,.55,.40,.21,.22,M.light);
 for(let s of [-1,1]){ell(g,s*.23,1.78,.63,.085,.09,.07,M.white);ell(g,s*.23,1.78,.70,.045,.065,.04,M.eye);
  ell(g,s*.44,1.94,.26,.18,.23,.12,M.main);
  tube(g,[[s*.43,1.46,0],[s*.60,.94,.22],[s*.61,.48,.46]],.16,M.main);claw(g,M,s*.61,.44,.50);
  cylinder(g,s*.20,.61,0,s*.29,.10,.20,.21,.15,M.main);ell(g,s*.28,.10,.42,.22,.09,.31,M.dark)
 }
 ell(g,0,1.85,.75,.18,.13,.16,M.dark);
 for(let j=0;j<19;j++){const a=j*2.399;ell(g,Math.sin(a)*.45,1.10+Math.cos(a)*.65,-.13,.06,.15,.11,j%3?M.dark:M.main)}
}
function s38Suanggi(g,M){
 // Shadowy, non-graphic regional interpretation; no definitive single folkloric form.
 const head=ell(g,0,1.85,.15,.40,.48,.35,M.main);ell(g,0,1.66,.44,.33,.32,.11,M.dark);
 for(let s of [-1,1]){ell(g,s*.22,1.88,.43,.12,.10,.05,M.glow);
  const side=new THREE.Group();side.name=s<0?'wingL':'wingR';side.position.set(s*.30,1.75,.05);g.add(side);
  for(let j=0;j<8;j++){const v=ell(side,s*(.16+j*.13),.23-j*.05,-j*.06,.11,.28,.06,j%3?M.dark:M.main);v.rotation.z=s*.52}
 }
 for(let j=0;j<11;j++){let a=j*2.4;let w=ell(g,Math.sin(a)*.37,1.47-j%3*.18,Math.cos(a)*.29,.05,.36,.07,j%2?M.dark:M.glow);w.rotation.z=Math.sin(a)*.19}
 const ring=new THREE.Mesh(new THREE.TorusGeometry(.69,.035,8,55),M.gold);ring.position.y=1.55;ring.rotation.x=Math.PI/2;g.add(ring)
}
function s38OrangPendek(g,M){
 ell(g,0,.98,-.03,.58,.70,.43,M.main);ell(g,0,1.73,.28,.42,.41,.37,M.main);ell(g,0,1.62,.59,.32,.21,.16,M.light);
 for(let s of [-1,1]){ell(g,s*.25,1.79,.58,.08,.10,.05,M.eye);ell(g,s*.39,1.93,.20,.16,.19,.13,M.dark);
  tube(g,[[s*.48,1.32,0],[s*.58,.77,.21],[s*.62,.27,.44]],.19,M.main);claw(g,M,s*.63,.23,.44);
  cylinder(g,s*.24,.69,-.1,s*.25,.12,.22,.24,.17,M.main);ell(g,s*.25,.10,.31,.22,.09,.30,M.dark)
 }
 for(let j=0;j<24;j++){let a=j*2.4;ell(g,Math.sin(a)*.51,1.05+Math.cos(a)*.56,-.20,.065,.17,.08,M.dark)}
}
function s38KeboIwa(g,M){
 ell(g,0,1.11,0,.68,.92,.54,M.main);ell(g,0,2.17,.23,.54,.52,.45,M.main);ell(g,0,1.93,.66,.42,.27,.14,M.light);
 for(let s of [-1,1]){ell(g,s*.27,2.24,.61,.10,.11,.06,M.white);ell(g,s*.28,2.23,.66,.05,.06,.03,M.eye);
  tube(g,[[s*.6,1.72,0],[s*.86,.99,.24],[s*.88,.56,.55]],.25,M.main);ell(g,s*.88,.49,.55,.23,.16,.26,M.dark);
  cylinder(g,s*.33,.63,-.03,s*.39,.09,.14,.29,.20,M.main);ell(g,s*.4,.08,.20,.25,.12,.32,M.dark);
  const br=new THREE.Mesh(new THREE.BoxGeometry(.23,.60,.31),M.gold);br.position.set(s*.83,.93,.22);br.rotation.z=s*.17;g.add(br)
 }
 for(let j=-2;j<=2;j++){const crown=new THREE.Mesh(new THREE.ConeGeometry(.11,.45-Math.abs(j)*.06,6),M.gold);crown.position.set(j*.18,2.74-Math.abs(j)*.07,.18);g.add(crown)}
 const sarong=new THREE.Mesh(new THREE.CylinderGeometry(.59,.80,.75,12),M.dark);sarong.position.set(0,.58,-.01);g.add(sarong)
}
const nj38Sculptors={banteng_jawa:s38Banteng,trenggiling:s38Pangolin,binturong:s38Binturong,kancil:s38Kancil,kukang_jawa:s38Loris,kucing_bakau:s38FishingCat,nuri_bayan:s38Eclectus,kuau_raja:s38Argus,pari_manta:s38Manta,ikan_napoleon:s38Napoleon,ebu_gogo:s38EbuGogo,suanggi:s38Suanggi,orang_pendek:s38OrangPendek,kebo_iwa:s38KeboIwa};

/* NUSAJIWA 3.9 — 25 individually authored, fauna/folklore-specific 3D builds.
   Stylized geometry; not scientific specimens, not interchangeable recolors. */
function s39SunBear(g,M){
 ell(g,0,1.08,-.1,.72,.78,.88,M.main);ell(g,0,1.76,.70,.53,.48,.50,M.main);
 ell(g,0,1.45,1.01,.39,.30,.13,M.gold);ell(g,0,1.45,1.135,.19,.13,.05,M.light);
 for(let s of [-1,1]){ell(g,s*.40,2.06,.60,.20,.19,.14,M.main);ell(g,s*.4,2.06,.72,.11,.11,.035,M.pink);
  eyes(g,M,0,1.83,1.092,.28,.07);
  for(let z of [-.61,.56]){cylinder(g,s*.48,.80,z,s*.53,.14,z+.13,.22,.15,M.main);claw(g,M,s*.53,.11,z+.30)} }
 ell(g,0,1.68,1.18,.28,.18,.22,M.light);ell(g,0,1.64,1.36,.13,.08,.07,M.dark);
 for(let s of [-1,1])tube(g,[[s*.21,1.47,1.04],[s*.04,1.32,1.12]],.021,M.gold);
}
function s39Tapir(g,M){
 ell(g,0,1.10,-.07,.72,.76,1.16,M.dark);ell(g,0,1.32,-.25,.76,.78,.54,M.light);
 ell(g,0,1.34,.90,.50,.53,.57,M.dark);
 tube(g,[[0,1.37,1.20],[0,1.13,1.62],[.03,.85,1.81]],.22,M.dark);
 for(let s of [-1,1]){ell(g,s*.45,1.74,1.02,.19,.27,.13,M.dark);ell(g,s*.45,1.78,1.14,.09,.16,.05,M.pink);eyes(g,M,0,1.49,1.37,.33,.055);
  for(let z of [-.72,.67]){cylinder(g,s*.46,.78,z,s*.50,.13,z+.05,.16,.11,z<0?M.light:M.dark);ell(g,s*.5,.12,z+.11,.22,.105,.22,M.dark)} }
 ell(g,0,.97,-1.11,.19,.17,.24,M.dark);
}
function s39Lutung(g,M){
 ell(g,0,1.19,0,.38,.59,.34,M.main);ell(g,0,1.87,.27,.36,.35,.30,M.main);
 ell(g,0,1.80,.54,.27,.23,.12,M.dark);ell(g,0,1.85,.66,.22,.16,.04,M.light);eyes(g,M,0,1.92,.72,.19,.053);
 for(let s of [-1,1]){ell(g,s*.34,2.04,.21,.10,.15,.10,M.dark);
  tube(g,[[s*.35,1.53,.00],[s*.56,.98,.20],[s*.42,.39,.51]],.14,M.main);claw(g,M,s*.42,.34,.58);
  tube(g,[[s*.17,.75,-.11],[s*.28,.31,.10]],.15,M.main);ell(g,s*.28,.13,.16,.16,.11,.19,M.dark)}
 tube(g,[[0,1.02,-.28],[.34,.88,-.72],[.62,1.15,-1.22],[.38,1.64,-1.61],[-.04,1.84,-1.39]],.088,M.main);
 for(let j=0;j<10;j++){let a=j*2.4;ell(g,Math.sin(a)*.22,2.15,Math.cos(a)*.17,.08,.11,.07,M.light)}
}
function s39Siamang(g,M){
 ell(g,0,1.30,0,.47,.67,.35,M.main);ell(g,0,2.10,.15,.43,.40,.37,M.main);
 ell(g,0,2.04,.52,.28,.25,.12,M.dark);ell(g,0,1.91,.62,.19,.23,.12,M.light);eyes(g,M,0,2.13,.63,.22,.064);
 ell(g,0,1.63,.45,.31,.28,.22,M.light);ell(g,0,1.61,.65,.22,.24,.08,M.dark);
 for(let s of [-1,1]){tube(g,[[s*.40,1.69,.06],[s*.70,.96,.03],[s*.90,.25,.35]],.21,M.main);ell(g,s*.89,.16,.38,.22,.13,.20,M.dark);
  for(let j=-1;j<=1;j++)tube(g,[[s*.88+j*.045,.17,.47],[s*.94+j*.055,.02,.59]],.026,M.main);
  cylinder(g,s*.28,.82,0,s*.35,.14,.11,.18,.12,M.main)}
}
function s39Cuscus(g,M){
 ell(g,0,1.28,0,.52,.62,.54,M.main);ell(g,0,1.92,.32,.40,.41,.37,M.main);
 ell(g,0,1.84,.63,.29,.26,.13,M.light);ell(g,0,1.69,.74,.12,.09,.12,M.pink);
 for(let s of [-1,1]){ell(g,s*.35,2.16,.21,.15,.17,.13,M.main);eyes(g,M,0,1.96,.73,.25,.07);
  tube(g,[[s*.45,1.58,.07],[s*.65,1.11,.41],[s*.53,.66,.63]],.16,M.main);claw(g,M,s*.53,.60,.68);
  tube(g,[[s*.26,.79,-.12],[s*.39,.25,.23]],.16,M.main)}
 tube(g,[[0,1.10,-.42],[.36,.92,-.79],[.61,1.20,-1.24],[.26,1.51,-1.40],[-.08,1.38,-1.17]],.135,M.main);
 for(let j=0;j<20;j++){const a=j*2.4;ell(g,Math.sin(a)*.49,1.37+Math.cos(a)*.42,-.12,.066,.11,.09,M.light)}
}
function s39Pesut(g,M){
 ell(g,0,1.08,.05,.62,.45,1.43,M.main);ell(g,0,1.13,1.03,.49,.47,.62,M.main);
 ell(g,0,.94,1.38,.39,.25,.50,M.light);ell(g,0,1.08,1.68,.22,.16,.29,M.main);
 for(let s of [-1,1]){ell(g,s*.43,1.22,1.33,.064,.082,.055,M.eye);
  let flipper=ell(g,s*.62,.79,.06,.62,.095,.22,M.main);flipper.rotation.z=s*.26}
 let fin=ell(g,0,1.48,-.40,.17,.23,.35,M.main);fin.rotation.x=-.35;
 tube(g,[[0,1.04,-1.13],[0,.99,-1.72]],.22,M.main);
 for(let s of [-1,1]){let tail=ell(g,s*.40,1,-1.77,.52,.065,.25,M.main);tail.rotation.y=-s*.3}
}
function s39HelmetHornbill(g,M){
 ell(g,0,1.32,-.07,.42,.62,.52,M.main);ell(g,0,1.89,.30,.28,.37,.32,M.main);ell(g,0,1.96,.60,.23,.29,.20,M.light);
 const bill=new THREE.Mesh(new THREE.ConeGeometry(.21,.80,9),M.gold);bill.rotation.x=Math.PI/2;bill.position.set(0,1.80,1.00);g.add(bill);
 ell(g,0,2.23,.63,.30,.20,.32,M.dark);ell(g,0,2.24,.87,.26,.09,.17,M.gold);
 for(let s of [-1,1]){eyes(g,M,0,1.99,.69,.24,.067);
  const wing=new THREE.Group();wing.name=s<0?'wingL':'wingR';wing.position.set(s*.35,1.49,-.12);g.add(wing);
  for(let i=0;i<10;i++){const f=ell(wing,s*(.10+i*.12),-.06+i*.02,-i*.10,.1,.31,.08,i%3===0?M.light:M.dark);f.rotation.z=s*(.3+i*.06)}
  cylinder(g,s*.17,.89,0,s*.20,.30,.15,.054,.034,M.dark);claw(g,M,s*.20,.25,.21)}
 for(let i=-2;i<=2;i++){let feather=ell(g,i*.12,1.11,-.57,.11,.08,1.01,i%2?M.dark:M.light);feather.rotation.x=.16}
}
function s39YellowCockatoo(g,M){
 ell(g,0,1.18,0,.42,.60,.48,M.white);ell(g,0,1.78,.29,.31,.36,.29,M.white);
 ell(g,0,1.70,.58,.20,.18,.22,M.dark);ell(g,0,1.55,.62,.17,.09,.12,M.dark);
 for(let i=-3;i<=3;i++){let plume=ell(g,i*.07,2.25+Math.cos(i*.4)*.08,.22,.085,.38,.065,M.gold);plume.rotation.z=-i*.17;}
 for(let s of [-1,1]){eyes(g,M,0,1.86,.54,.22,.066);
  const w=new THREE.Group();w.name=s<0?'wingL':'wingR';w.position.set(s*.37,1.33,-.05);g.add(w);
  for(let i=0;i<11;i++){const f=ell(w,s*(.11+i*.09),-.03+i*.055,-i*.05,.12,.28,.07,i%4===0?M.gold:M.white);f.rotation.z=s*.25}
  cylinder(g,s*.19,.78,.12,s*.19,.22,.17,.061,.04,M.dark);claw(g,M,s*.19,.20,.2)}
 for(let i=-3;i<=3;i++)ell(g,i*.085,1.04,-.62,.08,.10,.71,M.white);
}
function s39Wallaby(g,M){
 ell(g,0,1.08,-.24,.51,.65,.62,M.main);ell(g,0,1.70,.16,.32,.42,.32,M.main);
 ell(g,0,1.66,.45,.25,.19,.23,M.light);ell(g,0,1.48,.64,.10,.10,.11,M.dark);eyes(g,M,0,1.84,.49,.21,.062);
 for(let s of [-1,1]){ell(g,s*.27,2.05,.04,.15,.42,.13,M.main);ell(g,s*.27,2.05,.14,.08,.31,.06,M.pink);
  tube(g,[[s*.40,1.04,-.29],[s*.59,.50,-.14],[s*.40,.18,.50]],.24,M.main);ell(g,s*.4,.11,.52,.18,.09,.38,M.dark);
  tube(g,[[s*.26,1.49,.25],[s*.36,.86,.48]],.105,M.main);claw(g,M,s*.36,.80,.53)}
 tube(g,[[0,.95,-.72],[0,.76,-1.33],[.13,.40,-1.93],[.40,.19,-2.40]],.16,M.main);
 ell(g,0,1.10,.43,.23,.27,.18,M.light)
}
function s39TreeKangaroo(g,M){
 ell(g,0,1.16,-.08,.51,.61,.55,M.main);ell(g,0,1.72,.38,.36,.38,.34,M.main);ell(g,0,1.60,.63,.31,.23,.16,M.light);
 for(let s of [-1,1]){ell(g,s*.32,1.97,.29,.17,.18,.13,M.main);eyes(g,M,0,1.77,.68,.20,.06);
  tube(g,[[s*.42,1.44,.05],[s*.63,.86,.34],[s*.48,.49,.54]],.17,M.main);claw(g,M,s*.48,.43,.55);
  tube(g,[[s*.40,.88,-.22],[s*.65,.41,-.22],[s*.47,.15,.35]],.23,M.main);ell(g,s*.45,.12,.39,.23,.13,.27,M.dark)}
 tube(g,[[0,1.09,-.63],[.31,.82,-1.09],[.60,.81,-1.67],[.34,1.12,-2.09],[-.08,1.44,-2.37]],.14,M.main);
 for(let k=0;k<9;k++)ell(g,0,1.20-k*.11,-.61+k*.08,.16,.038,.10,M.gold)
}
function s39RoteTurtle(g,M){
 ell(g,0,.67,-.11,.79,.38,1.04,M.dark);ell(g,0,.45,-.02,.68,.17,.87,M.light);
 for(let i=0;i<24;i++){let a=i*2.4,x=Math.sin(a)*.65,z=Math.cos(a)*.80-.10;let shell=ell(g,x,.92+Math.cos(a)*.05,z,.15,.09,.18,i%3?M.main:M.gold);shell.rotation.y=a}
 tube(g,[[0,.61,.66],[0,.58,1.12],[.08,.65,1.47],[.13,.83,1.74]],.13,M.main);
 ell(g,.13,.83,1.78,.19,.17,.21,M.main);eyes(g,M,.11,.92,1.91,.13,.036);
 for(let s of [-1,1])for(let z of [-.63,.64]){ell(g,s*.66,.32,z,.31,.16,.19,M.main);claw(g,M,s*.88,.18,z+.13)}
 tube(g,[[0,.51,-1.02],[.15,.44,-1.27]],.08,M.main)
}
function s39Crocodile(g,M){
 ell(g,0,.56,0,.72,.37,1.21,M.main);ell(g,0,.50,1.16,.62,.23,.55,M.main);ell(g,0,.39,1.57,.58,.13,.68,M.light);
 for(let s of [-1,1]){ell(g,s*.38,.68,1.43,.16,.18,.22,M.main);ell(g,s*.43,.80,1.57,.09,.06,.07,M.eye);
  for(let z of [-.68,.68]){tube(g,[[s*.49,.58,z],[s*.94,.28,z+.18],[s*1.05,.14,z+.33]],.19,M.main);claw(g,M,s*1.03,.12,z+.36)} }
 for(let i=0;i<16;i++){const z=-.85+i*.11;for(let s of [-1,0,1]){const plate=new THREE.Mesh(new THREE.ConeGeometry(.09,.18,5),M.dark);plate.position.set(s*.23,.89-Math.abs(s)*.06,z);g.add(plate)}}
 for(let i=0;i<9;i++){const x=-.42+i*.105;const tooth=new THREE.Mesh(new THREE.ConeGeometry(.035,.13,5),M.white);tooth.rotation.x=Math.PI;tooth.position.set(x,.37,1.82);g.add(tooth)}
 tube(g,[[0,.52,-1.12],[.1,.45,-1.72],[.14,.33,-2.37],[0,.26,-3]],.25,M.main)
}
function s39FloresEagle(g,M){
 ell(g,0,1.24,0,.45,.62,.42,M.main);ell(g,0,1.85,.31,.30,.39,.29,M.light);eyes(g,M,0,2.01,.53,.23,.066);
 const beak=new THREE.Mesh(new THREE.ConeGeometry(.11,.34,7),M.dark);beak.rotation.x=Math.PI/2;beak.position.set(0,1.79,.70);g.add(beak);
 for(let s of [-1,1]){const w=new THREE.Group();w.name=s<0?'wingL':'wingR';w.position.set(s*.35,1.55,-.12);g.add(w);
  for(let i=0;i<14;i++){const f=ell(w,s*(.10+i*.14),.04-i*.033,-i*.065,.11,.34,.07,i%3?M.main:M.light);f.rotation.z=s*(.35+i*.055)}
  cylinder(g,s*.20,.78,.11,s*.21,.27,.15,.081,.05,M.gold);claw(g,M,s*.21,.24,.20)}
 for(let i=-3;i<=3;i++)ell(g,i*.09,.95,-.55,.09,.11,.63,i%2?M.dark:M.main);
 for(let j=0;j<22;j++)ell(g,Math.sin(j*2.4)*.32,1.18+Math.cos(j*2.4)*.32,.23,.055,.09,.035,M.light)
}
function s39Knifefish(g,M){
 ell(g,0,1.04,0,.28,.45,1.65,M.main);ell(g,0,1.15,1.18,.24,.29,.48,M.main);
 ell(g,0,.96,1.57,.20,.13,.33,M.light);eyes(g,M,0,1.22,1.52,.18,.049);
 const fin=new THREE.Shape();fin.moveTo(0,-1.65);fin.bezierCurveTo(.24,-1.2,.51,-.50,.33,.38);fin.quadraticCurveTo(.20,1.10,.01,1.68);fin.lineTo(0,-1.65);
 const sail=new THREE.Mesh(new THREE.ShapeGeometry(fin,20),M.gold);sail.rotation.x=-Math.PI/2;sail.position.set(0,.67,0);g.add(sail);
 for(let j=0;j<21;j++){const z=-1.3+j*.145;ell(g,Math.sin(j*3)*.21,1.25-Math.cos(j)*.1,z,.018,.11,.055,j%3?M.gold:M.light)}
 tube(g,[[0,1.01,-1.39],[0,.94,-1.99],[.1,.92,-2.26]],.09,M.main)
}
function s39Sunfish(g,M){
 ell(g,0,1.24,0,.24,.97,1.08,M.main);ell(g,0,1.08,.93,.19,.31,.23,M.light);
 const top=new THREE.Mesh(new THREE.ConeGeometry(.26,.86,7),M.main);top.position.set(0,2.20,-.14);g.add(top);
 const bottom=new THREE.Mesh(new THREE.ConeGeometry(.23,.70,7),M.main);bottom.rotation.z=Math.PI;bottom.position.set(0,.25,-.12);g.add(bottom);
 for(let s of [-1,1]){let blade=ell(g,s*.16,1.29,.25,.38,.09,.41,M.light);blade.rotation.z=s*.15;ell(g,s*.20,1.54,.79,.07,.075,.07,M.eye)}
 for(let i=-3;i<=3;i++)ell(g,i*.085,1.15,-1.09,.06,.12,.12,M.gold);
 ell(g,0,1.08,1.17,.08,.065,.09,M.dark)
}
function s39WhaleShark(g,M){
 ell(g,0,1.03,0,.68,.38,1.41,M.main);ell(g,0,.94,1.18,.68,.24,.74,M.light);
 ell(g,0,.84,1.71,.57,.12,.22,M.main);for(let s of [-1,1]){ell(g,s*.48,1.16,1.49,.065,.051,.051,M.eye);
  const fin=ell(g,s*.83,.81,-.09,.82,.065,.27,M.main);fin.rotation.z=s*.22;
  for(let j=0;j<5;j++)tube(g,[[s*.50,.85,.89-j*.10],[s*.56,.81,.84-j*.10]],.012,M.dark)}
 let dorsal=new THREE.Mesh(new THREE.ConeGeometry(.24,.60,5),M.main);dorsal.position.set(0,1.50,-.53);dorsal.rotation.x=-.16;g.add(dorsal);
 tube(g,[[0,1.02,-1.26],[0,1.02,-1.94]],.21,M.main);
 for(let s of [-1,1])ell(g,s*.24,1.09,-2.07,.27,.11,.58,M.main);
 for(let j=0;j<90;j++){const u=(j%18)/17*2.2-1.10,x=Math.sin(j*2.399)*.59,z=u;ell(g,x,1.32-Math.abs(x)*.19,z,.034,.017,.046,M.white)}
}
function s39BlueSpotRay(g,M){
 ell(g,0,.93,0,.52,.13,.78,M.main);ell(g,0,.84,.45,.33,.07,.31,M.light);
 const shape=new THREE.Shape();shape.moveTo(0,.80);shape.bezierCurveTo(1.05,.51,1.68,.02,1.92,-.72);shape.quadraticCurveTo(.82,-.39,0,-.58);shape.lineTo(0,.80);
 for(let s of [-1,1]){const fl=new THREE.Mesh(new THREE.ShapeGeometry(shape,18),M.main);fl.position.set(0,.96,-.08);fl.rotation.x=Math.PI/2;fl.scale.x=s;g.add(fl);
  for(let j=0;j<17;j++){let a=j*2.399,r=.29+(j%6)*.16,x=s*(.24+r*Math.abs(Math.sin(a))),z=-.08+r*Math.cos(a);ell(g,x,.98,z,.052,.01,.044,M.gold)}}
 for(let s of [-1,1])ell(g,s*.26,1.04,.60,.045,.035,.03,M.eye);
 tube(g,[[0,.91,-.65],[0,.85,-1.54],[.12,.79,-2.23]],.050,M.main)
}
function s39Bekisar(g,M){
 ell(g,0,1.25,-.02,.41,.57,.49,M.main);ell(g,0,1.77,.29,.27,.34,.30,M.main);
 const bill=new THREE.Mesh(new THREE.ConeGeometry(.085,.30,6),M.gold);bill.rotation.x=Math.PI/2;bill.position.set(0,1.71,.60);g.add(bill);
 let comb=ell(g,0,2.21,.27,.10,.35,.07,M.pink);comb.rotation.z=-.24;
 for(let s of [-1,1]){eyes(g,M,0,1.89,.52,.22,.055);ell(g,s*.27,1.68,.31,.12,.19,.09,M.pink);
  let w=new THREE.Group();w.name=s<0?'wingL':'wingR';w.position.set(s*.34,1.39,-.15);g.add(w);
  for(let j=0;j<9;j++){let f=ell(w,s*(.05+j*.11),-.11+j*.045,-j*.07,.12,.24,.06,j%2?M.main:M.gold);f.rotation.z=s*.3}
  cylinder(g,s*.19,.84,.1,s*.20,.22,.16,.062,.04,M.dark);claw(g,M,s*.20,.18,.23)}
 for(let j=-3;j<=3;j++){const f=ell(g,j*.17,1.2,-.76,.11,.16,1.01,j%2?M.gold:M.dark);f.rotation.x=-.35}
}
function s39BirdwingButterfly(g,M){
 ell(g,0,1.13,0,.12,.48,.12,M.main);ell(g,0,1.60,.18,.15,.17,.15,M.dark);
 for(let s of [-1,1]){for(let i=0;i<2;i++){const shape=new THREE.Shape();shape.moveTo(0,0);shape.bezierCurveTo(s*(.78+i*.20),.48,s*(1.65+i*.08),1.13-i*.33,s*(1.74+i*.09),.12-i*.28);shape.quadraticCurveTo(s*.82,-.63,0,-.19);shape.lineTo(0,0);
  let wing=new THREE.Mesh(new THREE.ShapeGeometry(shape,20),i===0?M.gold:M.main);wing.position.set(0,1.45-i*.42,0);wing.name=s<0?'wingL':'wingR';wing.material.side=THREE.DoubleSide;g.add(wing);
  for(let j=0;j<5;j++)ell(g,s*(.65+j*.19),1.82-i*.34-j*.075,.034,.07,.055,.03,M.dark)}
  tube(g,[[s*.05,1.69,.20],[s*.30,2.07,.28],[s*.46,2.16,.18]],.025,M.dark)}
 for(let i=0;i<8;i++)ell(g,0,.90-i*.09,-.02,.10-i*.007,.05,.08,M.main)
}
function s39AtlasBeetle(g,M){
 ell(g,0,.72,-.15,.57,.37,.80,M.main);ell(g,0,.66,.58,.48,.32,.52,M.dark);
 ell(g,0,.68,1.03,.33,.27,.31,M.main);ell(g,0,.58,1.25,.20,.12,.17,M.dark);
 for(let s of [-1,1]){const elytra=ell(g,s*.30,.95,-.24,.30,.17,.63,M.gold);elytra.rotation.y=s*.17;
  for(let z of [-.59,.1,.62]){tube(g,[[s*.36,.62,z],[s*.76,.29,z+.05],[s*.88,.16,z+.27]],.065,M.dark);claw(g,M,s*.88,.13,z+.28)}
  tube(g,[[s*.24,.91,1.11],[s*.47,1.28,1.55],[s*.40,1.55,1.70]],.065,M.dark)}
 tube(g,[[0,.95,1.23],[0,1.40,1.68],[0,1.68,1.74]],.11,M.gold);eyes(g,M,0,.84,1.20,.22,.035)
}
function s39BlueMonitor(g,M){
 ell(g,0,.58,-.13,.45,.31,.97,M.main);ell(g,0,.62,.91,.35,.24,.56,M.main);ell(g,0,.50,1.32,.35,.14,.38,M.light);
 for(let s of [-1,1]){eyes(g,M,0,.70,1.30,.27,.054);
  for(let z of [-.67,.61]){tube(g,[[s*.34,.57,z],[s*.70,.32,z+.13],[s*.80,.18,z+.25]],.115,M.main);claw(g,M,s*.81,.15,z+.34)}}
 tube(g,[[0,.58,-1.03],[.14,.52,-1.65],[.31,.39,-2.23],[.06,.27,-2.95]],.17,M.main);
 for(let j=0;j<63;j++){let x=Math.sin(j*2.4)*.37,y=.86-Math.abs(x)*.25,z=-.86+(j%21)*.085;ell(g,x,y,z,.032,.027,.044,M.gold)}
 tube(g,[[0,.42,1.55],[0,.38,1.80]],.018,M.pink)
}
function s39Civet(g,M){
 ell(g,0,1.00,0,.45,.41,.98,M.main);ell(g,0,1.30,.86,.35,.29,.37,M.main);
 ell(g,0,1.15,1.11,.25,.15,.25,M.light);eyes(g,M,0,1.37,1.19,.27,.057);
 for(let s of [-1,1]){ell(g,s*.30,1.58,.79,.15,.23,.13,M.dark);
  for(let z of [-.67,.60]){cylinder(g,s*.36,.79,z,s*.39,.15,z+.08,.12,.11,M.main);claw(g,M,s*.40,.12,z+.18)}
  for(let j=0;j<6;j++){const z=-.70+j*.24;ell(g,s*.28,1.23,z,.077,.057,.10,M.dark)}
  tube(g,[[s*.13,1.06,1.23],[s*.38,1.09,1.45]],.021,M.white)}
 tube(g,[[0,1.01,-.88],[.25,.93,-1.38],[.50,1.2,-1.86],[.43,1.46,-2.22]],.15,M.main);
 for(let j=0;j<4;j++)ell(g,.42+(j%2)*.08,1.16+j*.08,-1.84-j*.13,.13,.05,.14,M.dark)
}
function s39TimorDeer(g,M){
 ell(g,0,1.19,-.1,.49,.49,.82,M.main);ell(g,0,1.48,.54,.22,.46,.24,M.main);
 ell(g,0,1.83,.79,.32,.29,.33,M.main);ell(g,0,1.60,1.00,.23,.21,.31,M.light);eyes(g,M,0,1.89,1.01,.22,.052);
 for(let s of [-1,1]){ell(g,s*.28,2.10,.62,.13,.29,.09,M.light);
  for(let z of [-.65,.52]){cylinder(g,s*.31,.92,z,s*.31,.11,z,.073,.045,M.main);ell(g,s*.31,.10,z+.08,.095,.06,.13,M.dark)}
  tube(g,[[s*.19,2.04,.75],[s*.39,2.37,.66],[s*.49,2.83,.49],[s*.76,3.05,.36]],.061,M.gold);
  for(let j=0;j<3;j++)tube(g,[[s*(.38+j*.04),2.37+j*.15,.60],[s*(.56+j*.10),2.47+j*.14,.76]],.040,M.gold)}
 tube(g,[[0,1.14,-.83],[.06,.94,-1.01]],.053,M.main)
}
function s39Clownfish(g,M){
 ell(g,0,1.00,0,.43,.47,1.16,M.main);ell(g,0,.96,.95,.36,.35,.41,M.main);
 ell(g,0,.92,1.27,.23,.18,.25,M.gold);for(let s of [-1,1])ell(g,s*.36,1.15,1.11,.050,.060,.04,M.eye);
 for(let z of [-.72,.05,.83]){let band=ell(g,0,1.01,z,.45,.46,.10,M.white);band.scale.z=.075;let trim=ell(g,0,1.01,z+.08,.46,.47,.025,M.dark)}
 let dorsal=ell(g,0,1.53,-.19,.09,.36,1.01,M.main);dorsal.rotation.x=-.11;
 for(let s of [-1,1]){let fin=ell(g,s*.49,1.02,.26,.34,.09,.39,M.gold);fin.rotation.y=s*.2}
 let caudal=ell(g,0,1.02,-1.19,.075,.48,.50,M.gold);caudal.rotation.x=.16;
 for(let j=0;j<7;j++)ell(g,0,1.47-.13*j,-.96,.018,.04,.16,M.dark)
}
function s39Cindaku(g,M){
 // Interpretative guardian of Kerinci; not a claim of canonical single form.
 ell(g,0,1.20,-.06,.59,.77,.43,M.main);ell(g,0,2.03,.27,.48,.43,.43,M.main);
 ell(g,0,1.78,.62,.37,.22,.24,M.light);ell(g,0,1.72,.87,.20,.12,.17,M.dark);
 for(let s of [-1,1]){const ear=ell(g,s*.38,2.32,.20,.21,.27,.17,M.main);ear.rotation.z=-s*.35;
  ell(g,s*.37,2.34,.37,.11,.15,.045,M.gold);ell(g,s*.24,2.07,.65,.10,.10,.045,M.gold);ell(g,s*.23,2.06,.71,.048,.058,.035,M.eye);
  tube(g,[[s*.49,1.60,.02],[s*.72,.89,.31],[s*.68,.39,.52]],.19,M.main);claw(g,M,s*.67,.33,.56);
  cylinder(g,s*.29,.74,0,s*.36,.12,.11,.21,.13,M.main);ell(g,s*.36,.12,.22,.23,.10,.28,M.dark);
  for(let j=0;j<4;j++){const yy=1.82-j*.24;tube(g,[[s*.40,yy,-.18],[s*.54,yy-.11,.03],[s*.44,yy-.17,.21]],.034,M.dark)}
  tube(g,[[s*.16,2.18,.54],[s*.19,2.06,.70]],.028,M.dark)}
 tube(g,[[0,1.04,-.46],[.32,.91,-.85],[.55,1.13,-1.31],[.49,1.38,-1.52]],.135,M.main);
 for(let j=0;j<9;j++){let a=j*2.4;ell(g,Math.sin(a)*.46,1.42+Math.cos(a)*.28,-.14,.07,.12,.07,M.gold)}
}
/* NUSAJIWA 4.0 — twenty-five creature-specific sculpt functions. Each uses distinct anatomy,
   not a palette-only mutation. The references describe identities, not exact morphology. */
const nj40Fin=(g,M,x,y,z,w,h,side=1,color=M.main)=>{const o=ell(g,x,y,z,w,h,.075,color);o.rotation.z=side*.32;return o;};
const nj40Feather=(g,M,side,x,y,z,n=9,reach=1)=>{const pivot=new THREE.Group();pivot.name=side<0?'wingL':'wingR';pivot.position.set(x,y,z);g.add(pivot);for(let j=0;j<n;j++){let f=ell(pivot,side*(.11+j*.095)*reach,.05-j*.012,-j*.08*reach,.11,.29+.02*(j%3),.074,j%3?M.main:M.light);f.rotation.z=side*(.36+j*.07)}return pivot};
const nj40Quills=(g,M,n=32)=>{for(let j=0;j<n;j++){let a=j*2.399,r=.40+(j%4)*.075;let x=Math.sin(a)*r,y=1.27+Math.cos(a)*.37,z=-.16-(j%7)*.12;cylinder(g,x,y,z,x*1.42,y+.23+(j%3)*.06,z-.33,.044,.004,j%5?M.white:M.dark,6)}};
function nj40Gelatik(g,M){ // Compact finch; emphatic scarlet bill, dark cap, pale cheeks
 ell(g,0,1.05,0,.39,.49,.50,M.main);ell(g,0,1.43,.34,.29,.31,.32,M.black);
 ell(g,0,1.21,.40,.24,.19,.21,M.white);for(let s of [-1,1]){ell(g,s*.21,1.45,.57,.14,.17,.06,M.white);eyes(g,M,0,1.53,.59,.235,.054);nj40Feather(g,M,s,s*.29,1.15,-.05,7,.66);
 cylinder(g,s*.15,.76,.05,s*.18,.24,.17,.041,.023,M.pink);ell(g,s*.18,.23,.22,.12,.063,.13,M.pink)}ell(g,0,1.34,.72,.13,.15,.16,M.pink);for(let j=-2;j<=2;j++)ell(g,j*.074,.93,-.53,.067,.08,.52,M.black);
}
function nj40Julang(g,M){ // Large Sulawesi hornbill and tall crimson-yellow casque
 ell(g,0,1.09,-.13,.50,.68,.59,M.black);ell(g,0,1.75,.40,.30,.45,.28,M.black);ell(g,0,1.48,.45,.24,.28,.21,M.white);
 const bill=ell(g,0,1.75,.93,.21,.15,.59,M.gold);bill.rotation.x=.18;
 ell(g,0,2.14,.69,.25,.23,.26,M.pink);ell(g,0,2.26,.62,.20,.14,.16,M.gold);eyes(g,M,0,1.95,.67,.24,.059);
 for(let s of [-1,1]){nj40Feather(g,M,s,s*.38,1.30,-.10,11,1.05);cylinder(g,s*.22,.79,-.1,s*.25,.28,.1,.068,.036,M.dark)}
 for(let j=-3;j<=3;j++){const a=ell(g,j*.10,1.05,-.58,.09,.12,.78,j%3?M.main:M.white);a.rotation.x=-.12}
}
function nj40BeoNias(g,M){ // Dark myna: prominent yellow naked side head patches, bright beak
 ell(g,0,1.11,-.03,.37,.56,.44,M.black);ell(g,0,1.56,.33,.30,.35,.27,M.black);eyes(g,M,0,1.69,.59,.24,.071);
 for(let s of [-1,1]){const patch=ell(g,s*.27,1.74,.40,.14,.09,.10,M.gold);patch.rotation.z=s*.40;nj40Feather(g,M,s,s*.30,1.21,-.1,8,.74);cylinder(g,s*.16,.70,0,s*.17,.22,.16,.045,.029,M.gold)}
 ell(g,0,1.52,.69,.12,.09,.25,M.gold);for(let i=-3;i<=3;i++)ell(g,i*.068,.89,-.54,.058,.10,.59,M.black)
}
function nj40KakatuaMaluku(g,M){ // Salmon-pink, broad swept backward crest, charcoal bill
 ell(g,0,1.10,-.12,.43,.59,.44,M.white);ell(g,0,1.64,.24,.32,.37,.30,M.white);
 ell(g,0,1.53,.58,.19,.16,.18,M.dark);ell(g,0,1.43,.62,.14,.09,.14,M.dark);eyes(g,M,0,1.76,.51,.26,.055);
 for(let j=-4;j<=4;j++){let f=ell(g,j*.064,2.08+Math.cos(j*.35)*.09,.10,.085,.35,.060,M.pink);f.rotation.z=-j*.19;f.rotation.x=-.35}
 for(let s of [-1,1]){nj40Feather(g,M,s,s*.36,1.32,-.06,9,.89);cylinder(g,s*.20,.73,-.08,s*.18,.17,.16,.066,.045,M.dark)}
 for(let j=-2;j<=2;j++)ell(g,j*.086,.95,-.54,.075,.10,.72,M.white)
}
function nj40AyamHutan(g,M){ // Green junglefowl: sweeping sickle tail, green neck scales
 ell(g,0,1.06,0,.50,.46,.69,M.dark);ell(g,0,1.58,.38,.28,.43,.29,M.main);ell(g,0,1.69,.57,.18,.29,.15,M.gold);
 for(let j=0;j<10;j++)ell(g,Math.sin(j*2.4)*.26,1.43+Math.cos(j*2.4)*.25,.33,.12,.13,.055,M.light);
 const comb=ell(g,0,2.08,.44,.11,.22,.10,M.pink);comb.rotation.x=.3;eyes(g,M,0,1.79,.66,.22,.052);
 ell(g,0,1.59,.73,.09,.075,.22,M.gold);for(let s of [-1,1]){nj40Feather(g,M,s,s*.42,1.20,-.06,7,.75);cylinder(g,s*.23,.78,.05,s*.22,.16,.13,.072,.045,M.dark)}
 for(let j=0;j<7;j++){let feather=ell(g,Math.sin(j)*.28,1.29+(j%2)*.12,-.91-j*.10,.08,.17,1.01,j%2?M.black:M.main);feather.rotation.x=-.65}
}
function nj40Bidadari(g,M){ // Halmahera standardwing male: four streaming wire filaments with pennants
 ell(g,0,1.01,-.05,.38,.46,.43,M.main);ell(g,0,1.46,.36,.26,.30,.26,M.main);ell(g,0,1.50,.56,.18,.16,.08,M.light);eyes(g,M,0,1.56,.61,.20,.055);
 ell(g,0,1.37,.70,.12,.07,.16,M.dark);
 for(let s of [-1,1]){nj40Feather(g,M,s,s*.35,1.20,-.08,12,1.20);for(let j=0;j<2;j++){const x=s*(.43+j*.20);tube(g,[[x,1.1,-.16],[x*1.35,1.47,-.70],[x*1.6,1.35,-1.16]],.019,M.black);ell(g,x*1.6,1.35,-1.24,.18,.055,.10,M.gold)}
 cylinder(g,s*.16,.77,.1,s*.19,.24,.19,.051,.033,M.dark)}
 for(let j=-2;j<=2;j++)ell(g,j*.088,.98,-.43,.069,.10,.59,M.main)
}
function nj40SerakJawa(g,M){ // Heart-shaped facial disk and feather fringes
 ell(g,0,1.02,0,.58,.68,.54,M.light);ell(g,0,1.65,.40,.46,.47,.34,M.white);
 for(let s of [-1,1]){ell(g,s*.20,1.74,.68,.25,.33,.08,M.gold);ell(g,s*.20,1.74,.75,.19,.26,.045,M.white);ell(g,s*.20,1.76,.81,.064,.075,.030,M.dark);
 nj40Feather(g,M,s,s*.45,1.26,-.16,9,.75);cylinder(g,s*.21,.69,.06,s*.20,.16,.22,.061,.045,M.gold)}
 ell(g,0,1.60,.85,.10,.14,.13,M.gold);for(let j=0;j<14;j++)ell(g,Math.sin(j*2.4)*.46,1.61+Math.cos(j*2.4)*.44,.55,.085,.13,.060,M.light)
}
function nj40Landak(g,M){ // Ground porcupine: tapered snout and radial quills
 ell(g,0,.75,-.1,.65,.49,.93,M.dark);ell(g,0,.69,.81,.40,.30,.56,M.main);ell(g,0,.56,1.32,.20,.12,.20,M.pink);
 for(let s of [-1,1]){ell(g,s*.36,.86,.72,.12,.18,.12,M.main);ell(g,s*.33,.75,1.12,.065,.055,.05,M.eye);
 for(let z of [-.64,.54]){ell(g,s*.52,.26,z,.24,.22,.20,M.dark)}}nj40Quills(g,M,65);ell(g,0,.87,-.96,.18,.13,.43,M.dark)
}
function nj40MusangAir(g,M){ // Elongated otter civet: whiskered muzzle, webbed feet
 ell(g,0,.70,-.12,.44,.40,1.18,M.main);ell(g,0,.62,1.03,.33,.29,.53,M.main);ell(g,0,.55,1.43,.27,.16,.22,M.light);
 for(let s of [-1,1]){ell(g,s*.27,.77,1.21,.06,.055,.047,M.eye);for(let z of [-.66,.64]){ell(g,s*.40,.27,z,.20,.15,.30,M.dark);ell(g,s*.41,.16,z+.18,.23,.08,.25,M.light)}
 for(let i=-1;i<=1;i++)tube(g,[[s*.16,.56,1.58],[s*.40,.57+i*.09,1.83]],.009,M.white)}
 tube(g,[[0,.70,-1.05],[.17,.56,-1.63],[.18,.46,-2.27]],.16,M.main)
}
function nj40KuskusTutul(g,M){ // Pale arboreal cuscus, prominent ear and mottled fur
 ell(g,0,1.12,-.05,.53,.61,.52,M.white);ell(g,0,1.77,.35,.36,.39,.33,M.white);ell(g,0,1.61,.63,.26,.22,.17,M.light);ell(g,0,1.51,.80,.12,.06,.08,M.pink);
 for(let s of [-1,1]){ell(g,s*.33,1.98,.26,.18,.21,.17,M.light);ell(g,s*.31,1.80,.66,.067,.07,.034,M.eye);
 cylinder(g,s*.38,1.28,.04,s*.57,.59,.42,.14,.10,M.white);ell(g,s*.57,.51,.50,.19,.13,.17,M.dark);cylinder(g,s*.24,.69,-.11,s*.30,.22,.07,.14,.1,M.white)}
 tube(g,[[0,.95,-.51],[.40,.85,-.97],[.69,1.09,-1.42],[.46,1.52,-1.56],[.02,1.59,-1.32]],.13,M.pink);
 for(let i=0;i<34;i++){let a=i*2.4,xx=Math.sin(a)*.42,y=1.12+Math.cos(a)*.47,z=-.35+(i%7)*.14;ell(g,xx,y,z,.09,.057,.13,M.dark)}
}
function nj40KudaLaut(g,M){ // Pygmy seahorse: upright head, tubular snout, prehensile spiral tail
 ell(g,0,1.30,0,.23,.57,.36,M.main);ell(g,0,1.90,.27,.32,.30,.25,M.main);tube(g,[[0,1.89,.49],[0,1.79,.89]],.092,M.main);
 for(let s of [-1,1]){ell(g,s*.27,2.01,.31,.083,.078,.068,M.eye)}
 tube(g,[[0,.95,-.14],[.16,.59,-.35],[.39,.40,-.33],[.46,.66,-.18],[.27,.77,-.16]],.11,M.main);
 for(let j=0;j<15;j++)ell(g,Math.sin(j*2.4)*.21,1.12+(j%7)*.14,Math.cos(j*2.4)*.28,.066,.070,.06,M.pink);
 let dorsal=ell(g,0,1.37,-.43,.19,.29,.055,M.gold);dorsal.rotation.x=.26;
 for(let i=0;i<8;i++)cylinder(g,0,1.02+i*.12,.24,.0,1.1+i*.13,.38,.07,.009,M.light)
}
function nj40HiuJalan(g,M){ // Halmahera walking shark: fin-tread, spotted narrow body
 ell(g,0,.82,0,.39,.29,1.32,M.main);ell(g,0,.72,1.02,.40,.21,.67,M.light);ell(g,0,.72,1.47,.34,.13,.28,M.main);
 for(let s of [-1,1]){ell(g,s*.25,.86,1.38,.064,.046,.06,M.eye);
 const fin=ell(g,s*.54,.61,-.21,.59,.080,.28,M.main);fin.rotation.z=s*.31;const pelvic=ell(g,s*.40,.62,-.91,.42,.08,.25,M.main);pelvic.rotation.z=s*.26}
 tube(g,[[0,.80,-1.10],[.07,.82,-1.75],[.24,.89,-2.36]],.16,M.main);
 for(let i=0;i<2;i++){let dors=new THREE.Mesh(new THREE.ConeGeometry(.16,.38,5),M.main);dors.position.set(0,1.11,-.12-i*.64);g.add(dors)}
 for(let j=0;j<46;j++){let a=j*2.399,x=Math.sin(a)*.30,z=-.87+(j%16)*.15;ell(g,x,1.05-Math.abs(x)*.3,z,.048,.018,.05,M.dark)}
}
function nj40MantisShrimp(g,M){ // Stomatopod: raised eyes on stalks, segmented abdomen, hammer claws
 for(let i=0;i<7;i++){let z=.42-i*.29;ell(g,0,.77,z,.35-i*.035,.25-i*.013,.24,i%3?M.main:M.gold)}
 ell(g,0,.87,.82,.36,.27,.34,M.main);
 for(let s of [-1,1]){cylinder(g,s*.16,1.04,1.05,s*.25,1.40,1.22,.06,.036,M.light);ell(g,s*.25,1.45,1.23,.13,.115,.12,M.eye);
 cylinder(g,s*.27,.82,.82,s*.50,.72,1.19,.11,.07,M.pink);const hammer=ell(g,s*.56,.63,1.30,.24,.22,.23,M.gold);hammer.rotation.z=s*.24;
 for(let i=0;i<4;i++)cylinder(g,s*.19,.59,.55-i*.26,s*.61,.21,.55-i*.26,.05,.025,M.light)}
 for(let i=-2;i<=2;i++)ell(g,i*.16,.74,-1.70,.17,.075,.28,i%2?M.main:M.light)
}
function nj40KetamKenari(g,M){ // Giant terrestrial coconut crab: asymmetrical giant pinchers
 ell(g,0,.82,0,.67,.45,.69,M.main);ell(g,0,.64,.15,.47,.25,.39,M.dark);
 for(let s of [-1,1]){ell(g,s*.43,1.05,.34,.20,.18,.19,M.gold);ell(g,s*.39,1.15,.47,.10,.09,.07,M.eye);
 for(let j=0;j<4;j++){let z=.47-j*.35;const k=s*(.60+j*.09);cylinder(g,s*.45,.72,z,k,.56,z-.12,.14,.10,M.main);cylinder(g,k,.56,z-.12,s*(1.01+j*.07),.19,z-.33,.10,.033,M.dark)}
 cylinder(g,s*.40,.74,.52,s*.73,.64,1.0,.22,.15,M.main);ell(g,s*.87,.65,1.20,s<0?.47:.30,.27,.35,M.main);
 for(let t of [-1,1]){let jaw=ell(g,s*(.87+t*.16),.67,1.51,.16,.09,.23,M.dark);jaw.rotation.z=t*.24}}
}
function nj40Belangkas(g,M){ // Horseshoe crab dome with shield rim and needle telson
 const shell=ell(g,0,.59,.24,.97,.35,1.00,M.main);const rim=new THREE.Mesh(new THREE.TorusGeometry(.90,.09,7,44),M.gold);rim.position.set(0,.52,.23);rim.rotation.x=Math.PI/2;rim.scale.set(1,1.08,1);g.add(rim);
 ell(g,0,.52,-.79,.62,.16,.46,M.dark);tube(g,[[0,.53,-.96],[0,.43,-1.87],[0,.32,-3.06]],.072,M.dark);
 for(let s of [-1,1]){ell(g,s*.54,.83,.56,.076,.046,.05,M.eye);for(let i=0;i<5;i++){let z=.72-i*.26;cylinder(g,s*.42,.40,z,s*(.85+i*.042),.21,z-.19,.057,.028,M.dark)}}
 for(let i=0;i<8;i++)ell(g,Math.sin(i*2.4)*.48,.93,Math.cos(i*2.4)*.48,.036,.022,.056,M.gold)
}
function nj40LabiPapua(g,M){ // Pig-nosed river turtle: flat soft shell, flippers and unmistakable nose
 ell(g,0,.72,0,.91,.27,1.08,M.main);ell(g,0,.68,1.05,.46,.30,.52,M.light);ell(g,0,.63,1.52,.22,.12,.26,M.pink);
 for(let s of [-1,1]){ell(g,s*.125,.66,1.76,.057,.045,.042,M.dark);ell(g,s*.29,.78,1.38,.072,.055,.046,M.eye);
 for(let z of [-.56,.57]){let fl=ell(g,s*.99,.55,z,.80,.086,.28,M.main);fl.rotation.z=s*.20;for(let k=0;k<3;k++)ell(g,s*(1.55+k*.07),.52,z+(k-1)*.1,.10,.05,.075,M.light)}}
 for(let i=0;i<5;i++)tube(g,[[-.67,.83,-.78+i*.37],[0,1.00,-.78+i*.37],[.67,.83,-.78+i*.37]],.019,M.dark)
}
function nj40SancaHijau(g,M){ // Emerald tree python coiled over branch and high alert head
 cylinder(g,-1.2,.70,-.38,1.2,.67,-.38,.13,.13,M.dark);let knots=[];for(let j=0;j<=25;j++){let a=j/25*Math.PI*4.2;knots.push([Math.cos(a)*(.55+.07*Math.sin(a)),.92+.30*Math.sin(a*.53),Math.sin(a)*.52]);}tube(g,knots,.16,M.main);
 tube(g,[[knots[25][0],knots[25][1],knots[25][2]],[.20,1.82,.64],[0,1.95,1.05]],.16,M.main);
 ell(g,0,1.94,1.17,.38,.16,.46,M.main);ell(g,0,1.83,1.44,.32,.075,.28,M.light);eyes(g,M,0,2.02,1.49,.25,.056);
 for(let j=0;j<17;j++){const v=knots[j];ell(g,v[0],v[1]+.14,v[2],.062,.026,.08,M.white)}
}
function nj40KobraJawa(g,M){ // Broad hood with striking ocelli, low coiled body
 tube(g,[[0,.52,-1.26],[.72,.51,-.96],[.90,.53,-.18],[.3,.50,.39],[0,.77,.36],[0,1.68,.42]],.24,M.main);
 const hood=ell(g,0,1.52,.28,.72,.79,.14,M.dark);for(let s of [-1,1]){ell(g,s*.43,1.63,.41,.25,.36,.045,M.light);ell(g,s*.43,1.62,.46,.12,.17,.035,M.dark)}
 ell(g,0,1.94,.54,.37,.18,.33,M.main);ell(g,0,1.84,.83,.31,.09,.22,M.light);eyes(g,M,0,2.06,.76,.22,.065);
 tube(g,[[0,1.79,.97],[0,1.65,1.21]],.028,M.pink);for(let s of [-1,1])tube(g,[[0,1.65,1.21],[s*.15,1.6,1.34]],.019,M.pink)
}
function nj40Bunglon(g,M){ // Long-necked lizard with conspicuous sawtooth dorsal crest and turret eyes
 ell(g,0,1.01,0,.34,.28,.88,M.main);tube(g,[[0,1.10,.62],[0,1.34,1.14],[0,1.39,1.42]],.21,M.main);
 ell(g,0,1.35,1.49,.26,.17,.36,M.main);
 for(let s of [-1,1]){ell(g,s*.23,1.45,1.56,.13,.12,.10,M.light);ell(g,s*.29,1.48,1.63,.066,.067,.05,M.eye);
 for(let z of [-.64,.49]){cylinder(g,s*.25,1.0,z,s*.57,.57,z+.2,.089,.052,M.main);for(let q=-1;q<=1;q++)cylinder(g,s*.57,.57,z+.2,s*.61+q*.10,.51,z+.42,.033,.012,M.dark)}}
 tube(g,[[0,1.06,-.68],[.32,.98,-1.24],[.63,1.05,-1.73],[.46,1.24,-2.05]],.145,M.main);
 for(let j=0;j<13;j++){const z=-.80+j*.17;const spine=new THREE.Mesh(new THREE.ConeGeometry(.10,.25,5),M.gold);spine.position.set(0,1.31,z);g.add(spine)}
}
function nj40KatakTerbang(g,M){ // Broad foot webs explicitly sculpted, huge membranes
 ell(g,0,.69,0,.64,.38,.52,M.main);ell(g,0,.71,.55,.54,.33,.43,M.main);eyes(g,M,0,.98,.87,.33,.12);
 for(let s of [-1,1]){cylinder(g,s*.53,.67,.31,s*1.04,.42,.51,.12,.08,M.main);cylinder(g,s*.33,.50,-.30,s*.68,.20,-.78,.20,.10,M.main);
 for(let n=0;n<2;n++){const X=s*(1.02-n*.35),Z=n?-0.79:0.54;for(let i=0;i<4;i++){const toeX=X+s*(i-1.5)*.13;const toeZ=Z+.23;const finger=cylinder(g,X,.34,Z,toeX,.18,toeZ,.045,.017,M.gold);
 if(i<3){const membrane=ell(g,(X+toeX)*.5,.20,(Z+toeZ)*.5,.085,.018,.23,M.light);membrane.rotation.y=s*.18;}}}}
 for(let j=0;j<12;j++){const a=j*2.399;ell(g,Math.sin(a)*.49,.93,Math.cos(a)*.40,.064,.02,.075,M.gold)}
}
function nj40KodokMerah(g,M){ // Small dark-brown toad with dorsal red stipples and squat silhouette
 ell(g,0,.54,0,.63,.37,.53,M.dark);ell(g,0,.54,.46,.50,.31,.40,M.main);eyes(g,M,0,.78,.70,.34,.10);
 for(let s of [-1,1]){ell(g,s*.55,.37,-.29,.31,.23,.31,M.main);cylinder(g,s*.43,.49,.39,s*.89,.22,.73,.10,.055,M.main);
 for(let i=0;i<3;i++)cylinder(g,s*.90,.20,.69,s*(.88+i*.13),.13,.90,.028,.008,M.dark)}
 for(let i=0;i<35;i++){const a=i*2.39,x=Math.sin(a)*(.33+(i%3)*.05),z=Math.cos(a)*(.30+(i%4)*.05);ell(g,x,.84-Math.abs(x)*.19,z,.048,.032,.061,i%4?M.pink:M.gold)}
}
function nj40Tuntong(g,M){ // Large river terrapin with shield profile and broad head
 ell(g,0,.61,0,.91,.45,1.14,M.main);ell(g,0,.49,0,.75,.22,.95,M.light);ell(g,0,.68,1.05,.48,.28,.55,M.main);
 ell(g,0,.53,1.52,.29,.11,.27,M.light);eyes(g,M,0,.76,1.48,.33,.08);
 for(let s of [-1,1])for(let z of [-.68,.65]){ell(g,s*.73,.28,z,.37,.19,.32,M.dark);for(let k=0;k<3;k++)ell(g,s*(.87+k*.09),.17,z+.22,.095,.055,.10,M.gold)}
 for(let j=0;j<13;j++){let a=j*2.4,x=Math.sin(a)*.68,z=Math.cos(a)*.83;ell(g,x,.93,z,.16,.035,.20,j%3?M.gold:M.dark)}
 tube(g,[[0,.44,-1.10],[0,.36,-1.31]],.13,M.main)
}
function nj40ParuhKodok(g,M){ // Frogmouth bird: exceptionally wide gape, bark camouflage, resting posture
 ell(g,0,.97,0,.55,.56,.52,M.dark);ell(g,0,1.59,.31,.47,.37,.42,M.main);ell(g,0,1.52,.62,.45,.17,.23,M.light);
 const upper=ell(g,0,1.52,.82,.40,.06,.33,M.dark);const lower=ell(g,0,1.40,.81,.36,.05,.31,M.gold);
 for(let s of [-1,1]){eyes(g,M,0,1.75,.65,.35,.083);nj40Feather(g,M,s,s*.46,1.15,-.14,9,.83);cylinder(g,s*.19,.61,.02,s*.22,.22,.19,.06,.039,M.dark)}
 for(let j=0;j<30;j++){const a=j*2.399,x=Math.sin(a)*.43,z=-.5+(j%8)*.13,y=1.20+Math.cos(a)*.31;ell(g,x,y,z,.054,.08,.10,j%4?M.light:M.gold)}
 for(let i=-2;i<=2;i++)ell(g,i*.10,1.11,-.50,.08,.11,.77,M.main)
}
function nj40Warak(g,M){ // Semarang Dugderan cultural chimera: dragon head, four goat legs and an egg
 ell(g,0,1.19,-.12,.61,.48,1.00,M.main);ell(g,0,1.46,.56,.34,.47,.30,M.main);
 ell(g,0,1.64,1.00,.43,.33,.44,M.gold);ell(g,0,1.41,1.35,.36,.17,.33,M.pink);eyes(g,M,0,1.80,1.35,.30,.082);
 for(let s of [-1,1]){ell(g,s*.44,1.76,.92,.16,.18,.14,M.dark);tube(g,[[s*.33,1.47,1.13],[s*.42,1.21,1.44]],.060,M.white);
 for(let z of [-.67,.55]){cylinder(g,s*.42,1.02,z,s*.49,.14,z+.09,.13,.09,M.main);ell(g,s*.49,.15,z+.10,.18,.09,.20,M.dark)}}
 for(let j=-3;j<=3;j++){const crest=new THREE.Mesh(new THREE.ConeGeometry(.11,.35,6),j%2?M.pink:M.gold);crest.position.set(j*.16,1.89-Math.abs(j)*.03,.75);g.add(crest)}
 for(let j=0;j<18;j++){const a=j*2.4;ell(g,Math.sin(a)*.58,1.56+Math.cos(a)*.24,-.62+(j%6)*.22,.09,.12,.10,j%3?M.gold:M.pink)}
 ell(g,.25,.46,-.05,.29,.37,.27,M.white);const band=new THREE.Mesh(new THREE.TorusGeometry(.25,.03,7,30),M.gold);band.rotation.x=Math.PI/2;band.position.set(.25,.42,-.05);g.add(band)
}
function nj40Jatayu(g,M){ // Wayang Jatayu: weathered vulture hero, broad fans, long beak, ornate jamang
 ell(g,0,1.09,0,.56,.66,.55,M.main);ell(g,0,1.81,.41,.38,.42,.39,M.light);
 const bill=ell(g,0,1.67,.84,.18,.19,.45,M.gold);bill.rotation.x=.25;
 for(let s of [-1,1]){eyes(g,M,0,1.91,.70,.31,.083);nj40Feather(g,M,s,s*.51,1.38,-.08,15,1.50);cylinder(g,s*.19,.66,.08,s*.24,.14,.17,.067,.045,M.gold);
 for(let i=-1;i<=1;i++)cylinder(g,s*.24,.13,.21,s*.28+i*.10,.07,.42,.04,.018,M.dark)}
 for(let j=-3;j<=3;j++){const crown=new THREE.Mesh(new THREE.ConeGeometry(.064,.28,6),M.gold);crown.position.set(j*.12,2.31-Math.abs(j)*.06,.34);g.add(crown)}
 ell(g,0,2.18,.35,.39,.08,.19,M.gold);for(let j=-4;j<=4;j++)ell(g,j*.10,.88,-.53,.11,.13,1.03,j%3?M.main:M.gold);
}
/* NUSAJIWA 4.1 — twenty-five distinct handcrafted Three.js procedural builds.
 * Cultural characters are illustrative, not authoritative ritual reconstructions.
 * The Babylonian-looking generic monster shortcut is deliberately avoided.
 */
const nj41Disk=(g,M,x,y,z,r,thick,material=M.gold)=>{const mesh=new THREE.Mesh(new THREE.CylinderGeometry(r,r,thick,28),material);mesh.position.set(x,y,z);mesh.rotation.x=Math.PI/2;g.add(mesh);return mesh};
const nj41Wing=(g,M,s,anchorX,anchorY,anchorZ,num=9,length=1,colour=M.main)=>{const p=new THREE.Group();p.name=s<0?'wingL':'wingR';p.position.set(anchorX,anchorY,anchorZ);g.add(p);for(let i=0;i<num;i++){let f=ell(p,s*(.15+i*.12)*length,(i%2)*.045-i*.016,-i*.078,.115,.27+i%3*.023,.075,i%4?colour:M.gold);f.rotation.z=s*(.5+i*.07)}return p};
const nj41Spine=(g,M,x,y,z,h,material=M.gold)=>cylinder(g,x,y,z,x,y+h,z-.06,.064,.006,material,7);
const nj41Arm=(g,M,x,y,z,dx,dy,dz,mat=M.main)=>{cylinder(g,x,y,z,dx,dy,dz,.13,.085,mat);ell(g,dx,dy,dz,.15,.16,.13,mat)};
const nj41Legs=(g,M,w=.42,h=1.05)=>{for(const s of [-1,1])for(const z of [-.53,.55]){cylinder(g,s*w,h,z,s*(w+.07),.15,z+.06,.16,.10,M.main);ell(g,s*(w+.07),.16,z+.1,.22,.11,.24,M.dark)}};
const nj41Face=(g,M,x,y,z,w=.31)=>{ell(g,x,y,z,w,.35,.23,M.light);eyes(g,M,x,y+.10,z+.2,w*.62,.067);ell(g,x,y-.16,z+.21,.13,.064,.06,M.dark)};
function nj41OrangBati(g,M){ // Seram cryptid — winged primate humanoid, not zoological fact
 ell(g,0,1.26,0,.42,.72,.35,M.dark);ell(g,0,2.03,.30,.34,.36,.32,M.main);nj41Face(g,M,0,2.00,.54,.24);
 for(const s of [-1,1]){ell(g,s*.32,2.26,.22,.15,.20,.08,M.dark);nj41Arm(g,M,s*.40,1.62,0,s*.66,.72,.23,M.dark);cylinder(g,s*.21,.76,-.03,s*.26,.17,.30,.15,.10,M.main);for(let q=-1;q<=1;q++)cylinder(g,s*.26,.15,.30,s*(.29+q*.11),.10,.49,.026,.006,M.gold)}
 const wingmat=M.dark;for(const s of [-1,1]){const p=nj41Wing(g,M,s,s*.41,1.87,-.14,11,1.45,wingmat);for(let j=0;j<7;j++)ell(p,s*(.52+j*.16),-.23,-j*.08,.14,.27,.050,M.pink)}
}
function nj41Poppo(g,M){ // South Sulawesi floating-head narrative, non-graphic luminous ribbons
 ell(g,0,1.72,0,.47,.59,.47,M.light);ell(g,0,2.24,-.13,.50,.29,.43,M.dark);nj41Face(g,M,0,1.76,.30,.36);
 for(let i=0;i<20;i++){let a=i*2.4,x=Math.sin(a)*.40,z=Math.cos(a)*.35-.08;tube(g,[[x,2.28,z],[x*1.15,1.82,z],[x*1.37,1.42-(i%5)*.07,z-.12]],.033,M.dark)}
 for(let i=0;i<5;i++){let x=(i-2)*.12;tube(g,[[x,1.27,0],[x*1.2,1.00,.12],[x*.8,.62+(i%2)*.08,-.12]],.052,i%2?M.pink:M.gold)}
 const halo=new THREE.Mesh(new THREE.TorusGeometry(.96,.027,6,58),M.gold);halo.position.set(0,1.58,-.27);halo.rotation.x=.2;g.add(halo)
}
function nj41Parakang(g,M){ // Shapeshifter — split human silhouette and uncanny goat shadow, no claim of fixed form
 ell(g,-.34,1.25,0,.35,.60,.29,M.main);ell(g,-.34,1.96,.16,.28,.33,.28,M.dark);nj41Face(g,M,-.34,1.97,.34,.22);
 for(const s of [-1,1]){nj41Arm(g,M,-.34+s*.29,1.59,-.03,-.34+s*.47,.87,.12,M.dark);cylinder(g,-.34+s*.17,.80,0,-.34+s*.23,.14,.14,.13,.07,M.main)}
 ell(g,.63,.92,-.25,.54,.37,.58,M.dark);ell(g,.63,1.13,.32,.29,.29,.35,M.light);for(let s of [-1,1]){ell(g,.63+s*.2,1.28,.52,.09,.14,.08,M.gold);cylinder(g,.63+s*.33,.72,-.48,.63+s*.38,.16,-.39,.12,.08,M.dark)}
 for(let i=0;i<11;i++){let a=i*2.4;ell(g,-.02+Math.sin(a)*.55,.8+Math.cos(a)*.45,.22,.042,.060,.042,M.gold)}
}
function nj41Bedawang(g,M){ // NUSAJIWA 6.22: articulated cosmic tortoise, not a generic pet turtle
 // Sonobudoyo: island-bearing tortoise. UGM Jurnal Filsafat: fire tongue and serpent coils
 // occur in Balinese meru ornamentation; island shape, scutes and motion are artistic choices.
 const shell=new THREE.Group();shell.name='nj622Shell';g.add(shell);
 ell(shell,0,.72,0,1.02,.37,1.16,M.dark);
 ell(shell,0,1.01,0,.91,.43,1.02,M.main);
 for(let row=0;row<3;row++)for(let col=-2;col<=2;col++){
   const z=(row-1)*.50,x=col*.29;
   if((x/.90)**2+(z/1.03)**2>.87)continue;
   const y=1.35-.16*((x/.90)**2+(z/1.03)**2);
   const scute=ell(shell,x,y,z,.15,.026,.20,(row+col)%3?M.light:M.gold);
   scute.rotation.y=(row-1)*.14;
 }
 const head=new THREE.Group();head.name='nj622Head';head.position.set(0,.69,1.02);g.add(head);
 ell(head,0,.03,.22,.38,.27,.42,M.light);
 ell(head,0,-.06,.48,.27,.13,.25,M.main);
 eyes(head,M,0,.14,.48,.25,.066);
 // Symbolic fiery tongue: ornament, not a claim that a living animal breathes fire.
 const tongue=new THREE.Mesh(new THREE.ConeGeometry(.070,.23,7),M.gold);
 tongue.name='nj622FireTongue';tongue.rotation.x=Math.PI/2;tongue.position.set(0,-.13,.77);head.add(tongue);
 const flame=new THREE.Mesh(new THREE.ConeGeometry(.037,.13,6),M.pink);
 flame.rotation.x=Math.PI/2;flame.position.set(0,-.12,.84);head.add(flame);
 for(const side of [-1,1])for(const front of [-1,1]){
   const pivot=new THREE.Group();pivot.name='nj622Leg'+(front>0?'F':'B')+(side>0?'R':'L');
   pivot.position.set(side*.79,.44,front*.75);g.add(pivot);
   ell(pivot,side*.17,-.17,front*.08,.36,.22,.32,M.dark);
   ell(pivot,side*.23,-.32,front*.22,.29,.105,.28,M.main);
   for(let j=-1;j<=1;j++)ell(pivot,side*(.24+j*.07),-.33,front*.44,.065,.045,.12,M.gold);
 }
 const tail=new THREE.Group();tail.name='nj622Tail';tail.position.set(0,.57,-1.03);g.add(tail);
 tube(tail,[[0,0,0],[.06,-.10,-.29],[.03,-.18,-.54]],.11,M.dark);
 // A pair of stylised restraining coils around the lower shell, without naming them
 // as a specific independent naga character. They are static sculptural motifs.
 for(let k=0;k<2;k++){
   const path=[];for(let i=0;i<=32;i++){
     const a=i/32*Math.PI*2,rad=1.02+k*.055;
     path.push([Math.sin(a)*rad,.49+k*.13+.035*Math.sin(a*3),Math.cos(a)*(1.12+k*.03)]);
   }
   const coil=tube(g,path,.044,k?M.gold:M.light);coil.name='nj622SerpentMotif'+k;
 }
 const island=new THREE.Group();island.name='nj622Island';g.add(island);
 const land=new THREE.Mesh(new THREE.CylinderGeometry(.76,.87,.24,11),M.gold);
 land.position.set(0,1.53,-.05);island.add(land);
 for(let i=0;i<7;i++){
   const a=i*Math.PI*2/7;ell(island,Math.sin(a)*.63,1.50,Math.cos(a)*.65,.17,.12,.17,M.light);
 }
 for(let i=0;i<5;i++){
   const hill=new THREE.Mesh(new THREE.ConeGeometry(.13+(i%2)*.06,.26+(i%3)*.10,6),M.main);
   hill.position.set((i-2)*.25,1.78+(i%3)*.04,(i%2)*.29-.17);island.add(hill);
 }
 g.userData.nj622Rig='bedawang-articulated';
}
function nj41Boraspati(g,M){ // Batak lizard motif: striped torso, forked tail, protecting-house relief aesthetic
 ell(g,0,.86,0,.42,.30,.83,M.main);ell(g,0,.89,.74,.30,.22,.44,M.main);eyes(g,M,0,1.0,1.02,.22,.055);
 for(const s of [-1,1])for(const z of [-.47,.49]){cylinder(g,s*.29,.84,z,s*.83,.58,z+.29,.090,.055,M.gold);for(let j=-1;j<=1;j++)cylinder(g,s*.83,.58,z+.29,s*(.92+j*.09),.53,z+.47,.03,.010,M.light)}
 tube(g,[[0,.87,-.65],[.10,.75,-1.2],[.04,.58,-1.57]],.13,M.main);for(let s of [-1,1])tube(g,[[.04,.58,-1.55],[s*.30,.53,-1.91]],.074,M.gold);
 for(let i=0;i<8;i++){let z=-.52+i*.18;ell(g,0,1.12,z,.36,.035,.045,i%2?M.gold:M.dark)}
}
function nj41SingaBarong(g,M){ // Reog Ponorogo: tiger head, immense peacock Dadak Merak fan
 ell(g,0,1.02,0,.54,.67,.49,M.dark);ell(g,0,1.66,.38,.55,.43,.37,M.main);
 for(const s of [-1,1]){ell(g,s*.32,1.90,.34,.19,.25,.18,M.main);ell(g,s*.30,1.73,.72,.12,.11,.062,M.gold);eyes(g,M,0,1.76,.70,.34,.080);ell(g,s*.18,1.44,.75,.19,.14,.11,M.white)}
 ell(g,0,1.50,.82,.15,.12,.13,M.dark);for(let i=-3;i<=3;i++)ell(g,i*.10,1.35,.83,.052,.11,.050,M.white);
 for(let i=0;i<29;i++){let theta=-Math.PI*.92+i/28*Math.PI*.84;let x=Math.sin(theta)*1.93,y=2.42+Math.cos(theta)*1.31;
 const p=ell(g,x,y,-.30,.14,.43,.065,i%4?M.main:M.gold);p.rotation.z=-theta;
 ell(g,x,y+.26,-.20,.092,.11,.042,M.gold);ell(g,x,y+.26,-.145,.035,.051,.014,M.eye)}
 const crown=new THREE.Mesh(new THREE.TorusGeometry(1.60,.11,7,52,Math.PI*1.35),M.gold);crown.rotation.z=-.16;crown.position.set(0,2.22,-.28);g.add(crown)
}
function nj41BujangGanong(g,M){ // Ponorogo's red-faced comic, agile Reog mask with large nose
 ell(g,0,.96,0,.40,.56,.37,M.dark);ell(g,0,1.61,.31,.49,.49,.39,M.pink);eyes(g,M,0,1.78,.66,.29,.10);
 ell(g,0,1.55,.88,.18,.28,.33,M.pink);ell(g,0,1.28,.71,.30,.12,.19,M.dark);for(let s of [-1,1]){ell(g,s*.19,1.15,.70,.092,.11,.05,M.white);nj41Arm(g,M,s*.39,1.21,0,s*.82,.54,.26,M.main);cylinder(g,s*.20,.61,.04,s*.30,.13,.18,.15,.09,M.main)}
 for(let i=0;i<20;i++){const a=i*2.4;ell(g,Math.sin(a)*.46,2.00+Math.cos(a)*.28,.18,.075,.16,.092,M.dark)}
}
function nj41Hanoman(g,M){ // Indonesian wayang Hanoman, white simian with crown and long curl-tail
 ell(g,0,1.03,0,.40,.61,.34,M.white);ell(g,0,1.72,.34,.36,.37,.36,M.white);nj41Face(g,M,0,1.68,.62,.28);
 for(let s of [-1,1]){ell(g,s*.35,1.89,.41,.17,.17,.13,M.white);nj41Arm(g,M,s*.39,1.43,0,s*.60,.62,.31,M.white);cylinder(g,s*.22,.65,.02,s*.29,.15,.17,.15,.08,M.white);ell(g,s*.30,.12,.33,.19,.09,.23,M.gold)}
 tube(g,[[0,.86,-.34],[.42,.60,-.84],[.82,.82,-1.20],[.74,1.34,-1.24],[.38,1.44,-1.13]],.085,M.white);
 ell(g,0,2.12,.30,.38,.10,.22,M.gold);for(let j=-2;j<=2;j++)nj41Spine(g,M,j*.14,2.13,.28,.32-Math.abs(j)*.055,M.gold);
 ell(g,0,.80,.25,.42,.09,.34,M.gold)
}
function nj41Makara(g,M){ // archaeological makara: fish body, elephant head and winding trunk
 ell(g,0,.88,-.35,.49,.42,1.22,M.main);ell(g,0,1.17,.71,.42,.40,.55,M.dark);ell(g,0,.98,1.05,.42,.18,.40,M.gold);eyes(g,M,0,1.37,1.10,.28,.065);
 tube(g,[[0,1.00,1.25],[0,.65,1.64],[.15,.49,1.81],[.37,.64,1.82]],.14,M.light);
 for(let s of [-1,1]){ell(g,s*.42,1.12,.87,.29,.19,.23,M.main);cylinder(g,s*.27,.98,1.06,s*.38,.70,1.38,.11,.016,M.white);
 const fin=ell(g,s*.52,.83,-.60,.52,.09,.43,M.gold);fin.rotation.z=s*.23}
 const tail=ell(g,0,.77,-1.45,.07,.44,.52,M.gold);tail.rotation.x=-.23;
 for(let i=0;i<9;i++)nj41Spine(g,M,0,1.31,-1.03+i*.19,.15,M.light)
}
function nj41NagaPadoha(g,M){ // NUSAJIWA 6.22: independently moving underworld-serpent segments
 // Australian Museum: Naga Padoha inhabits underworld waters, shifts cause earthquakes.
 // Metropolitan Museum: a Toba singa ornament can suggest a composite serpent/buffalo/horse head.
 // This segmented body and its ornamentation are an artistic reading, not a canonical depiction.
 const segments=[];
 for(let i=0;i<21;i++){
   const u=i/20,z=1.01-i*.136,x=.49*Math.sin(i*.28),y=.68-.12*u;
   const tangent=.49*.28*Math.cos(i*.28);
   const part=new THREE.Group();part.name='nj622Coil'+String(i).padStart(2,'0');
   part.position.set(x,y,z);part.rotation.y=-Math.atan2(tangent,.136);g.add(part);
   const radius=.255*(1-.63*u),length=.205*(1-.27*u);
   ell(part,0,0,0,radius,radius*.83,length,M.main);
   if(i%3===0){
     const scale=ell(part,0,radius*.74,0,radius*.57,.035,length*.56,i%2?M.gold:M.light);
     scale.name='nj622DorsalPlate';
   }
   segments.push({part,baseX:x,baseY:y,baseYaw:part.rotation.y,index:i});
 }
 const head=new THREE.Group();head.name='nj622PadohaHead';head.position.set(0,1.05,1.17);g.add(head);
 ell(head,0,.06,.10,.48,.34,.49,M.dark);
 ell(head,0,-.11,.47,.40,.18,.36,M.main);
 ell(head,0,-.20,.57,.31,.09,.24,M.light);
 eyes(head,M,0,.20,.47,.29,.082);
 for(const side of [-1,1]){
   // Horn-like features are a stylised echo of Batak singa carving, not a zoological trait.
   tube(head,[[side*.32,.24,.10],[side*.54,.55,-.01],[side*.61,.85,-.07]],.075,M.gold);
   tube(head,[[side*.27,-.10,.61],[side*.53,-.12,.83]],.035,M.gold);
 }
 const brow=ell(head,0,.32,.25,.38,.07,.24,M.gold);brow.name='nj622SingaBrow';
 // Restrained earth motif: small plates, not a literal sword or invented historical artifact.
 for(let i=0;i<3;i++){
   const slab=new THREE.Mesh(new THREE.BoxGeometry(.22,.055,.16),i%2?M.gold:M.dark);
   slab.name='nj622EarthMotif';slab.position.set(-.12+i*.13,.92,-.34-i*.27);
   slab.rotation.y=i*.21;g.add(slab);
 }
 g.userData.nj622Segments=segments;
 g.userData.nj622Rig='padoha-segmented';
}
function nj41Yaki(g,M){ // Sulawesi crested black macaque with prominent raised hair crest
 ell(g,0,1.08,0,.46,.59,.43,M.black);ell(g,0,1.73,.40,.39,.40,.40,M.black);ell(g,0,1.59,.73,.32,.21,.18,M.dark);eyes(g,M,0,1.82,.73,.30,.080);
 for(let i=-4;i<=4;i++)nj41Spine(g,M,i*.069,2.04,.38,.22-Math.abs(i)*.028,M.dark);
 for(let s of [-1,1]){nj41Arm(g,M,s*.44,1.37,0,s*.57,.33,.32,M.black);cylinder(g,s*.24,.73,-.10,s*.32,.16,.13,.16,.10,M.black)}
 ell(g,0,1.48,.88,.16,.07,.09,M.dark)
}
function nj41Tapanuli(g,M){ // long-haired orangutan with narrow face and lanky long arms
 ell(g,0,1.11,0,.48,.56,.44,M.main);ell(g,0,1.79,.33,.32,.41,.29,M.main);ell(g,0,1.67,.57,.27,.29,.13,M.light);eyes(g,M,0,1.83,.70,.22,.071);
 for(let s of [-1,1]){cylinder(g,s*.42,1.32,.03,s*.78,.33,.13,.17,.09,M.main);ell(g,s*.83,.27,.24,.17,.13,.16,M.dark);cylinder(g,s*.26,.66,-.10,s*.30,.14,.15,.18,.12,M.main);
 for(let i=0;i<5;i++)ell(g,s*.36,1.25-i*.20,.29,.05,.17,.055,M.light)}
 for(let i=0;i<22;i++){let a=i*2.399,x=Math.sin(a)*.42,y=1.25+Math.cos(a)*.45;ell(g,x,y,-.12+(i%5)*.10,.05,.13,.085,M.gold)}
}
function nj41BadakSumatra(g,M){ // two distinct horns, shaggy small-bodied rhino
 ell(g,0,1.03,-.15,.66,.47,.99,M.main);ell(g,0,1.11,.72,.52,.34,.49,M.main);ell(g,0,.88,1.21,.38,.22,.50,M.dark);eyes(g,M,0,1.32,1.15,.37,.075);
 nj41Spine(g,M,0,1.07,1.39,.56,M.gold);nj41Spine(g,M,0,1.39,.80,.25,M.gold);
 for(let s of [-1,1]){ell(g,s*.52,1.37,.67,.19,.23,.14,M.main);ell(g,s*.57,1.44,.70,.10,.12,.048,M.pink);for(const z of [-.73,.61]){cylinder(g,s*.51,.80,z,s*.58,.16,z+.10,.18,.11,M.dark)}}
 for(let i=0;i<46;i++){const a=i*2.4,x=Math.sin(a)*.52,z=-.84+i%16*.10;ell(g,x,1.40-Math.abs(x)*.32,z,.035,.12,.04,M.gold)}
}
function nj41KelinciBelang(g,M){ // Sumatran striped rabbit, continuous streaks and long upright ears
 ell(g,0,.67,-.10,.44,.36,.66,M.main);ell(g,0,.88,.63,.38,.35,.43,M.main);eyes(g,M,0,1.01,.92,.28,.078);
 for(let s of [-1,1]){let ear=ell(g,s*.27,1.51,.39,.14,.45,.12,M.dark);ear.rotation.z=s*.20;ell(g,s*.28,1.52,.48,.07,.32,.04,M.pink);
 for(const z of [-.50,.31])ell(g,s*.37,.25,z,.23,.17,.21,M.main)}
 for(let j=-3;j<=3;j++){const z=j*.23-.18;tube(g,[[-.39,.83,z-.07],[0,.98,z],[.39,.83,z+.11]],.038,M.dark)}
 ell(g,0,.62,-.75,.21,.20,.20,M.white)
}
function nj41Kintamani(g,M){ // recognisable curled spitz tail, erect ears, white coat
 ell(g,0,1.04,0,.52,.50,.81,M.white);ell(g,0,1.47,.60,.35,.36,.44,M.white);ell(g,0,1.38,.92,.27,.23,.36,M.light);
 for(let s of [-1,1]){let ear=new THREE.Mesh(new THREE.ConeGeometry(.18,.47,6),M.white);ear.position.set(s*.28,1.94,.57);g.add(ear);eyes(g,M,0,1.58,.89,.30,.065);
 for(const z of [-.53,.56])cylinder(g,s*.38,.88,z,s*.42,.15,z,.14,.08,M.white)}
 ell(g,0,1.35,1.16,.12,.075,.09,M.dark);tube(g,[[0,1.26,-.70],[.37,1.55,-1.04],[.44,1.93,-1.14],[.19,2.06,-.98],[-.08,1.95,-.79]],.15,M.white)
}
function nj41Kalong(g,M){ // real large fruit bat, long wings and fox-like face
 ell(g,0,1.05,0,.38,.49,.37,M.dark);ell(g,0,1.62,.37,.35,.31,.32,M.main);ell(g,0,1.51,.66,.19,.17,.25,M.gold);eyes(g,M,0,1.66,.65,.23,.078);
 for(let s of [-1,1]){const ear=new THREE.Mesh(new THREE.ConeGeometry(.14,.32,6),M.dark);ear.position.set(s*.22,1.96,.29);g.add(ear);
 const p=nj41Wing(g,M,s,s*.37,1.42,-.06,15,1.72,M.dark);for(let i=0;i<5;i++){let f=ell(p,s*(.34+i*.30),-.21-i*.025,-i*.15,.26,.32,.04,M.main);f.rotation.z=s*.30}
 cylinder(g,s*.22,.75,-.01,s*.40,.19,.20,.073,.031,M.dark)}
}
function nj41TikusFlores(g,M){ // Flores giant rat, heavy rodent, blunt head, long bald tail
 ell(g,0,.73,-.25,.54,.42,.91,M.main);ell(g,0,.72,.72,.38,.30,.52,M.main);ell(g,0,.57,1.18,.23,.15,.30,M.light);
 for(let s of [-1,1]){ell(g,s*.35,.97,.70,.18,.20,.08,M.pink);ell(g,s*.29,.81,1.06,.058,.064,.04,M.eye);for(let z of [-.73,.62])ell(g,s*.40,.22,z,.22,.11,.24,M.dark);
 for(let i=-1;i<=1;i++)tube(g,[[s*.08,.58,1.38],[s*.35,.59+i*.08,1.61]],.012,M.white)}
 tube(g,[[0,.66,-1.05],[.28,.52,-1.52],[.37,.36,-2.20],[.54,.43,-2.49]],.081,M.pink);
 for(let i=0;i<8;i++)ell(g,0,1.04,-.64+i*.20,.30,.023,.053,M.dark)
}
function nj41RajaUdang(g,M){ // small brilliant kingfisher with giant dagger beak
 ell(g,0,1.10,0,.34,.41,.43,M.main);ell(g,0,1.53,.32,.29,.30,.29,M.main);ell(g,0,1.32,.45,.24,.24,.14,M.gold);eyes(g,M,0,1.64,.52,.21,.059);
 cylinder(g,0,1.45,.59,0,1.40,1.15,.082,.007,M.dark);
 for(let s of [-1,1]){nj41Wing(g,M,s,s*.26,1.12,-.10,9,.72,M.main);cylinder(g,s*.19,.77,-.03,s*.18,.26,.13,.047,.025,M.gold)}
 for(let i=-2;i<=2;i++)ell(g,i*.078,.98,-.53,.055,.10,.58,M.main)
}
function nj41Bangau(g,M){ // long-legged milky stork, narrow curved black beak
 ell(g,0,1.54,-.12,.42,.46,.52,M.white);tube(g,[[0,1.68,.26],[0,1.96,.49],[0,2.21,.47]],.15,M.white);ell(g,0,2.25,.57,.23,.20,.27,M.white);
 cylinder(g,0,2.19,.74,0,1.94,1.22,.070,.006,M.dark);eyes(g,M,0,2.30,.76,.18,.056);
 for(let s of [-1,1]){nj41Wing(g,M,s,s*.35,1.60,-.17,11,.94,M.dark);cylinder(g,s*.23,1.13,.0,s*.22,.14,.10,.053,.031,M.pink)}
 for(let j=-2;j<=2;j++)ell(g,j*.089,1.43,-.53,.08,.08,.59,M.dark)
}
function nj41Gosong(g,M){ // Moluccan megapode / scrubfowl, stout legs and broad tail
 ell(g,0,1.12,0,.44,.43,.52,M.dark);ell(g,0,1.58,.39,.28,.30,.24,M.main);ell(g,0,1.51,.61,.13,.12,.20,M.gold);eyes(g,M,0,1.69,.57,.24,.063);
 for(let s of [-1,1]){nj41Wing(g,M,s,s*.35,1.22,-.08,9,.65,M.main);cylinder(g,s*.21,.77,0,s*.23,.20,.08,.097,.051,M.gold);
 for(let j=-1;j<=1;j++)cylinder(g,s*.23,.17,.21,s*.23+j*.11,.12,.46,.045,.016,M.gold)}
 for(let i=-2;i<=2;i++)ell(g,i*.086,1.09,-.51,.07,.09,.61,M.dark)
}
function nj41GuritaPeniru(g,M){ // mimic octopus: eight expressive arms, banded stripes, bulb mantle
 ell(g,0,1.43,-.10,.45,.53,.49,M.main);ell(g,0,.97,.45,.30,.28,.28,M.main);eyes(g,M,0,1.07,.65,.23,.078);
 for(let j=0;j<8;j++){let a=j*Math.PI/4;const pts=[[Math.cos(a)*.13,.82,.22+Math.sin(a)*.12],[Math.cos(a)*.49,.46,Math.sin(a)*.48],[Math.cos(a)*1.12,.46+Math.sin(j)*.12,Math.sin(a)*.98],[Math.cos(a)*1.34,.76,Math.sin(a)*1.2]];tube(g,pts,.091,M.main);
 for(let q=1;q<=3;q++){let v=pts[1],b=pts[2],f=q/4;ell(g,v[0]*(1-f)+b[0]*f,v[1]*(1-f)+b[1]*f+.09,v[2]*(1-f)+b[2]*f,.054,.026,.072,q%2?M.gold:M.dark)}}
 for(let k=0;k<5;k++)ell(g,Math.sin(k*2.4)*.35,1.52,Math.cos(k*2.4)*.35,.055,.055,.054,M.gold)
}
function nj41GuritaBiru(g,M){ // small octopus with conspicuous cobalt rings on each arm
 ell(g,0,1.29,-.05,.37,.47,.40,M.light);ell(g,0,.92,.43,.30,.27,.30,M.main);eyes(g,M,0,1.04,.68,.20,.069);
 for(let j=0;j<8;j++){const a=j*Math.PI/4;const pts=[[.12*Math.cos(a),.82,.19],[.43*Math.cos(a),.55,.43*Math.sin(a)],[1.0*Math.cos(a),.42,1.01*Math.sin(a)],[1.24*Math.cos(a),.70,1.28*Math.sin(a)]];tube(g,pts,.078,M.main);
 for(let i=1;i<=3;i++){let f=i/4,pt=pts[1].map((v,k)=>v+(pts[2][k]-v)*f);ell(g,pt[0],pt[1]+.062,pt[2],.059,.036,.060,M.gold)}}
 for(let a=0;a<18;a++){let x=Math.sin(a*2.4)*.31,z=Math.cos(a*2.4)*.31;ell(g,x,1.41,z,.044,.02,.044,M.gold)}
}
function nj41Cumi(g,M){ // squid with two long feeding tentacles and eight shorter arms
 ell(g,0,1.15,-.32,.37,.38,.84,M.main);ell(g,0,1.15,.50,.31,.25,.32,M.light);eyes(g,M,0,1.24,.74,.21,.071);
 for(let s of [-1,1]){const fin=ell(g,s*.39,1.11,-.79,.44,.050,.47,M.gold);fin.rotation.z=s*.21;
 for(let j=0;j<5;j++)tube(g,[[s*.11,1.00,.70],[s*(.13+j*.045),.67,1.01],[s*(.16+j*.056),.45,1.21]],.036,M.light);
 tube(g,[[s*.13,1.05,.70],[s*.47,.48,1.34],[s*.61,.67,2.06]],.043,M.main)}
 for(let j=-3;j<=3;j++)ell(g,j*.068,1.36,-.87,.060,.079,.51,j%2?M.main:M.gold)
}
function nj41Mandarin(g,M){ // mandarin dragonet: tall fan fins, bright striped body
 ell(g,0,.85,0,.39,.37,1.04,M.main);ell(g,0,.81,.82,.36,.30,.44,M.main);eyes(g,M,0,1.0,1.13,.30,.080);
 for(let s of [-1,1]){const wing=ell(g,s*.47,.76,.18,.54,.057,.46,M.gold);wing.rotation.z=s*.27;for(let i=0;i<4;i++)tube(g,[[s*.30,.83,-.05],[s*(.66+i*.1),.72,.48]],.020,M.light)}
 for(let j=0;j<10;j++){let z=-.94+j*.21;let spine=new THREE.Mesh(new THREE.ConeGeometry(.10,.46,5),j%2?M.gold:M.light);spine.position.set(0,1.37,z);g.add(spine)}
 for(let j=0;j<13;j++)tube(g,[[-.26,.88,-1+j*.15],[0,1.06,-.96+j*.17],[.29,.89,-.95+j*.17]],.030,j%2?M.gold:M.dark)
}
function nj41UlarLaut(g,M){ // alternating banded sea krait with paddle-like tail
 const pts=[];for(let i=0;i<=38;i++){let u=i/38,theta=u*10;pts.push([Math.sin(theta)*.67,.82+.18*Math.sin(theta*.72),1.26-3.36*u])}tube(g,pts,.17,M.main);
 for(let i=0;i<25;i++){let p=pts[Math.floor(i*1.45)];ell(g,p[0],p[1],p[2],.19,.19,.090,i%2?M.dark:M.gold)}
 ell(g,0,1.03,1.37,.32,.17,.43,M.main);eyes(g,M,0,1.12,1.68,.25,.066);
 const tail=pts[pts.length-1];const paddle=ell(g,tail[0],tail[1],tail[2]-.26,.36,.060,.36,M.gold);paddle.rotation.y=.22
}
/* NUSAJIWA v4.2 | twenty-five authored, differentiated silhouette builders.
   Each is an artistically stylised procedural model, not a taxidermic scan.
   Helpers build topology. Every model has a distinct authoring function. */
const n42Curve=(g,p,r,m)=>tube(g,p,r,m);
const n42Fin=(g,M,x,y,z,w,h,mat=M.light,turn=0)=>{const a=new THREE.Mesh(new THREE.ConeGeometry(w,h,5),mat);a.position.set(x,y,z);a.rotation.z=turn;g.add(a);return a};
const n42Limb=(g,M,s,y,z,leg=false)=>{cylinder(g,s*.34,y,z,s*(leg?.39:.65),leg?.13:.52,z+(leg?.09:.2),leg?.13:.12,leg?.075:.065,M.main);ell(g,s*(leg?.39:.65),leg?.13:.52,z+(leg?.12:.2),.13,.09,.13,M.dark)};
const n42Tail=(g,M,p,r=.075,mat=M.main)=>n42Curve(g,p,r,mat);
const n42Wing=(g,M,s,span=1,col=M.main,y=1.45)=>{const pivot=new THREE.Group();pivot.name=s<0?'wingL':'wingR';pivot.position.set(s*.32,y,.0);g.add(pivot);for(let i=0;i<9;i++){const f=ell(pivot,s*(.18+i*.15)*span,.14+i*.045,-.06-i*.055,.12,.27+(i%3)*.085,.065,i%3===0?M.gold:col);f.rotation.z=s*(.55+i*.075)}return pivot};
const n42Feet=(g,M,spread=.23)=>{for(let s of [-1,1]){cylinder(g,s*spread,.66,0,s*spread,.12,.08,.066,.046,M.dark);for(let j=-1;j<=1;j++)cylinder(g,s*spread,.10,.11,s*(spread+j*.075),.07,.34,.021,.011,M.gold)}};
const n42Ear=(g,M,s,x=.26,y=1.93,z=.25,l=.3)=>{const e=ell(g,s*x,y,z,.11,l,.13,M.main);e.rotation.z=s*.22;ell(g,s*x,y,z+.10,.058,l*.70,.045,M.pink)};
const n42Spot=(g,M,x,y,z,r=.065)=>ell(g,x,y,z,r,.022,r,M.gold);
function n42Bilou(g,M){ // jet-black small gibbon: extremely long arms; no tail
 ell(g,0,1.11,0,.38,.64,.34,M.dark);ell(g,0,1.84,.27,.32,.36,.31,M.dark);ell(g,0,1.80,.49,.24,.25,.095,M.black);eyes(g,M,0,1.92,.53,.20,.065);
 for(const s of [-1,1]){cylinder(g,s*.36,1.53,.0,s*.66,.25,.19,.11,.075,M.dark);ell(g,s*.68,.22,.21,.15,.12,.14,M.black);cylinder(g,s*.19,.66,-.08,s*.25,.14,.08,.14,.07,M.main)}
 for(let i=-3;i<=3;i++)ell(g,i*.06,2.11,.16,.063,.11,.075,M.dark);
}
function n42Simakobu(g,M){ // short pig-tail and snub nose are distinctive
 ell(g,0,1.02,-.15,.51,.63,.40,M.main);ell(g,0,1.78,.28,.40,.39,.34,M.main);ell(g,0,1.75,.54,.31,.24,.11,M.black);ell(g,0,1.63,.69,.17,.10,.13,M.dark);eyes(g,M,0,1.86,.58,.25,.073);
 for(const s of [-1,1]){n42Limb(g,M,s,1.35,0);n42Limb(g,M,s,.74,.09,true);ell(g,s*.30,2.0,.25,.17,.20,.08,M.dark)}
 n42Tail(g,M,[[0,1.0,-.47],[.18,.81,-.77],[.29,.99,-.88]],.088,M.dark);
}
function n42Joja(g,M){ // light sideburns and very long tail
 ell(g,0,1.12,0,.39,.59,.35,M.dark);ell(g,0,1.77,.28,.36,.36,.34,M.dark);ell(g,0,1.73,.55,.29,.25,.11,M.light);eyes(g,M,0,1.85,.62,.21,.072);
 for(const s of [-1,1]){ell(g,s*.30,1.69,.50,.12,.29,.085,M.white);n42Limb(g,M,s,1.24,.05);n42Limb(g,M,s,.75,-.04,true)}
 n42Tail(g,M,[[0,.92,-.37],[.30,.62,-.88],[.51,.82,-1.42],[.35,1.1,-1.75],[.08,1.11,-1.91]],.086,M.dark);
}
function n42Bokkoi(g,M){ // cheek tufts, pale crown, ground-biased macaque stance
 ell(g,0,1.06,-.14,.53,.48,.48,M.main);ell(g,0,1.59,.43,.36,.36,.38,M.main);ell(g,0,1.53,.68,.28,.21,.13,M.pink);eyes(g,M,0,1.72,.73,.25,.075);
 for(let s of [-1,1]){ell(g,s*.39,1.52,.44,.18,.25,.13,M.dark);n42Limb(g,M,s,1.06,-.07);n42Limb(g,M,s,.74,-.1,true)}
 for(let j=-3;j<=3;j++)ell(g,j*.086,1.98,.22,.090,.095,.085,M.gold);
 n42Tail(g,M,[[0,.94,-.47],[.13,.70,-.91],[.26,.66,-1.18]],.11,M.main);
}
function n42BayCat(g,M){ // Borneo bay cat; slender, long tail, bright chest
 ell(g,0,.89,0,.48,.43,.85,M.main);ell(g,0,1.03,.66,.32,.32,.43,M.main);ell(g,0,.88,1.02,.32,.23,.29,M.light);eyes(g,M,0,1.22,.95,.25,.070);
 for(let s of [-1,1]){n42Ear(g,M,s,.25,1.32,.72,.13);for(const z of [-.54,.54]){cylinder(g,s*.36,.8,z,s*.43,.13,z+.09,.11,.09,M.main);ell(g,s*.43,.13,z+.09,.15,.07,.18,M.dark)}
 for(let j=-1;j<=1;j++)n42Curve(g,[[s*.25,1.03,1.07],[s*(.29+j*.02),.93,1.32]],.009,M.gold)}
 n42Tail(g,M,[[0,.82,-.78],[.30,.83,-1.18],[.45,1.03,-1.55],[.26,1.35,-1.84]],.08,M.main);
}
function n42Clouded(g,M){ // big cloud-shaped markings and unusually long counterbalance tail
 ell(g,0,.96,0,.66,.53,1.06,M.main);ell(g,0,1.41,.76,.45,.42,.49,M.main);eyes(g,M,0,1.54,1.07,.32,.077);ell(g,0,1.19,1.22,.28,.20,.27,M.light);
 for(let s of [-1,1]){n42Ear(g,M,s,.32,1.72,.73,.15);for(let z of [-.65,.56])n42Limb(g,M,s,.73,z,true)}
 for(let s of [-1,1])for(let j=0;j<5;j++){let z=-.79+j*.35;n42Curve(g,[[s*.35,1.32,z-.12],[s*.54,1.41,z],[s*.54,1.16,z+.17],[s*.40,1.16,z+.22]],.045,M.dark)}
 n42Tail(g,M,[[0,1.0,-.91],[.45,1.07,-1.45],[.56,1.27,-1.93],[.23,1.65,-2.31],[-.10,1.78,-2.34]],.16,M.main);
 for(let j=0;j<5;j++)n42Spot(g,M,.38+j*.008,1.16+j*.10,-1.68-j*.13,.11);
}
function n42Serow(g,M){ // stocky mountain serow; short backward horns & mane ridge
 ell(g,0,.94,-.12,.59,.69,.86,M.dark);ell(g,0,1.43,.68,.44,.47,.45,M.main);ell(g,0,1.23,1.02,.39,.28,.36,M.light);eyes(g,M,0,1.58,.94,.29,.070);
 for(let s of [-1,1]){n42Ear(g,M,s,.37,1.67,.69,.13);n42Curve(g,[[s*.25,1.73,.75],[s*.31,2.08,.54],[s*.30,2.30,.30]],.067,M.gold);for(let z of [-.57,.61]){cylinder(g,s*.42,.7,z,s*.42,.12,z,.17,.11,M.main);ell(g,s*.42,.12,z,.18,.11,.21,M.black)}}
 for(let j=0;j<6;j++)n42Fin(g,M,0,1.67,-.44+j*.24,.12,.29,M.light);
}
function n42Muntjac(g,M){ // small muntjac: tear ducts, tiny antlers, compact legs
 ell(g,0,.84,-.15,.44,.43,.76,M.main);ell(g,0,1.30,.57,.28,.48,.28,M.main);ell(g,0,1.53,.82,.31,.30,.31,M.light);eyes(g,M,0,1.65,1.06,.25,.070);
 for(let s of [-1,1]){n42Ear(g,M,s,.42,1.87,.68,.19);n42Curve(g,[[s*.19,1.82,.69],[s*.26,2.13,.64],[s*.38,2.29,.47]],.041,M.gold);n42Spot(g,M,s*.28,1.43,1.03,.042);for(const z of [-.52,.44])cylinder(g,s*.3,.65,z,s*.36,.10,z+.08,.090,.064,M.main)}
 ell(g,0,.92,-.88,.19,.25,.18,M.white);
}
function n42Mambruk(g,M){ // massive ground pigeon, lacy fan coronet
 ell(g,0,1.0,-.22,.54,.67,.57,M.main);ell(g,0,1.62,.20,.36,.40,.34,M.main);eyes(g,M,0,1.72,.46,.25,.06);n42Fin(g,M,0,1.48,.55,.09,.29,M.black,Math.PI/2);
 for(let s of [-1,1]){const w=ell(g,s*.49,1.03,-.10,.21,.46,.35,M.dark);w.rotation.z=s*.23}
 for(let j=-6;j<=6;j++){let x=j*.082,top=2.35-Math.abs(j)*.065;n42Curve(g,[[0,1.94,.16],[x*.7,top-.10,.14],[x,top,.18]],.025,M.gold);ell(g,x,top,.19,.055,.035,.048,M.white)}
 n42Feet(g,M,.25);for(let j=-2;j<=2;j++)n42Fin(g,M,j*.13,.80,-.73,.12,.47,M.main,.08);
}
function n42Namdur(g,M){ // bowerbird with its bower of woven twigs, not a generic bird
 ell(g,0,1.1,0,.38,.48,.44,M.main);ell(g,0,1.46,.33,.26,.29,.28,M.main);eyes(g,M,0,1.54,.52,.20,.056);n42Fin(g,M,0,1.38,.66,.09,.34,M.dark,Math.PI/2);
 for(let s of [-1,1]){n42Wing(g,M,s,.48,M.main,1.23);cylinder(g,s*.18,.75,0,s*.24,.12,.18,.048,.028,M.dark)}
 for(let j=0;j<9;j++){const a=j*Math.PI/9;let x=Math.cos(a)*.65;n42Curve(g,[[x*.9,.05,-.58],[x*.8,.65,-.65],[x*.40,1.2,-.72],[-x*.12,1.45,-.72]],.018,j%3?M.dark:M.gold)}
 for(let j=0;j<8;j++)ell(g,-.57+j*.16,.055,-.40+(j%3)*.10,.056,.035,.055,j%2?M.gold:M.white);
}
function n42WhiteCockatoo(g,M){ // all white, retractable semicircle umbrella crest
 ell(g,0,1.0,-.1,.39,.59,.45,M.white);ell(g,0,1.60,.24,.32,.35,.33,M.white);eyes(g,M,0,1.70,.49,.22,.060);
 n42Fin(g,M,0,1.55,.65,.13,.49,M.black,Math.PI/2);for(let s of [-1,1]){n42Wing(g,M,s,.74,M.white,1.24);cylinder(g,s*.17,.6,-.1,s*.19,.11,.11,.052,.031,M.dark)}
 for(let j=-5;j<=5;j++){let a=j*.18,f=ell(g,Math.sin(a)*.55,2.02+Math.cos(a)*.10,.09,.07,.33,.065,M.white);f.rotation.z=-a*.85}
 for(let j=-2;j<=2;j++)ell(g,j*.13,.68,-.61,.074,.11,.50,M.gold);
}
function n42ElangBondol(g,M){ // white head + rust body, hooked beak, raptorial talons
 ell(g,0,1.09,-.12,.45,.56,.46,M.main);ell(g,0,1.63,.34,.37,.37,.33,M.white);eyes(g,M,0,1.74,.64,.26,.073);
 n42Fin(g,M,0,1.46,.77,.12,.35,M.gold,Math.PI/2);
 for(let s of [-1,1]){n42Wing(g,M,s,1.30,M.main,1.45);cylinder(g,s*.20,.74,-.02,s*.21,.18,.22,.083,.047,M.gold);for(let j=-1;j<=1;j++)cylinder(g,s*.21,.16,.21,s*(.21+j*.13),.09,.51,.025,.009,M.black)}
 for(let j=-4;j<=4;j++){const t=ell(g,j*.10,.85,-.70,.08,.08,.50,M.main);t.rotation.x=-.21}
}
function n42Paok(g,M){ // stocky multicolor forest pitta, low perching feet
 ell(g,0,.92,0,.46,.40,.52,M.main);ell(g,0,1.28,.29,.36,.34,.29,M.dark);ell(g,0,1.10,.53,.35,.25,.24,M.pink);eyes(g,M,0,1.38,.53,.27,.062);
 n42Fin(g,M,0,1.14,.78,.09,.34,M.black,Math.PI/2);
 for(let s of [-1,1]){ell(g,s*.40,1.0,-.04,.15,.23,.40,M.gold);ell(g,s*.47,.95,-.27,.08,.17,.27,M.dark);cylinder(g,s*.20,.65,.0,s*.20,.12,.15,.062,.038,M.pink)}
 for(let j=-3;j<=3;j++)ell(g,j*.08,.78,-.66,.075,.08,.33,M.dark);
}
function n42Coelacanth(g,M){ // thick lobed paired fins, triphycercal tail, scale pattern
 ell(g,0,.95,0,.50,.45,1.23,M.main);ell(g,0,1.01,.98,.43,.37,.43,M.main);eyes(g,M,0,1.16,1.31,.27,.076);ell(g,0,.80,1.38,.29,.115,.35,M.dark);
 for(let s of [-1,1]){let w=ell(g,s*.55,.75,.38,.57,.18,.37,M.light);w.rotation.z=s*.38;ell(g,s*.44,.65,-.61,.37,.13,.32,M.gold)}
 for(let i=0;i<17;i++){const z=-1.06+i*.13;n42Spot(g,M,.36*Math.cos(i*2.4),1.22,z,.045)}
 for(let j=-1;j<=1;j++)n42Fin(g,M,j*.13,.89,-1.44,.25,.76,j===0?M.main:M.light,j*.18);
 n42Fin(g,M,0,1.48,-.38,.25,.70,M.dark);
}
function n42Banggai(g,M){ // dramatic black bars, elongated fin rays, split tail
 ell(g,0,1.12,0,.22,.43,.73,M.light);ell(g,0,1.17,.58,.20,.29,.22,M.light);eyes(g,M,0,1.28,.75,.15,.052);
 for(let j=0;j<3;j++){const z=-.35+j*.37;ell(g,0,1.12,z,.235,.43,.055,M.black)}
 for(let s of [-1,1]){n42Fin(g,M,s*.12,1.65,-.18,.16,.83,M.dark,s*.10);const side=ell(g,s*.25,1.08,-.22,.07,.37,.55,M.main);side.rotation.z=s*.25}
 for(let s of [-1,1]){const t=ell(g,s*.23,1.11,-.96,.035,.50,.36,M.gold);t.rotation.z=s*.28}
 for(let i=0;i<12;i++)n42Spot(g,M,(i%2?-.22:.22),1.0+(i%4)*.11,-.59+(i%6)*.23,.020);
}
function n42Hawksbill(g,M){ // turtle with overlapping serrated scutes and hawk beak
 ell(g,0,.68,0,.89,.36,1.05,M.main);ell(g,0,.99,0,.79,.36,.88,M.dark);
 for(let i=0;i<22;i++){const a=i*2.399,r=.65*Math.sqrt((i+.5)/22),x=Math.sin(a)*r,z=Math.cos(a)*r;let scale=ell(g,x,1.30-r*.27,z,.18,.045,.22,i%3?M.main:M.gold);scale.rotation.y=a}
 ell(g,0,.65,1.08,.34,.25,.35,M.light);eyes(g,M,0,.74,1.33,.24,.064);n42Fin(g,M,0,.48,1.42,.12,.32,M.dark,Math.PI/2);
 for(let s of [-1,1])for(let zz of [-.70,.66]){let f=ell(g,s*.89,.50,zz,.58,.10,.35,M.main);f.rotation.y=s*.28}
 n42Tail(g,M,[[0,.58,-.86],[.04,.38,-1.28]],.10,M.dark);
}
function n42PorcupineFish(g,M){ // puffed fish covered in prominent spines
 ell(g,0,1.06,0,.71,.72,.88,M.gold);ell(g,0,1.00,.72,.36,.25,.42,M.main);eyes(g,M,0,1.25,1.10,.30,.085);
 for(let i=0;i<56;i++){const z=(i%11)/5-1,phi=i*2.399;let r=Math.sqrt(Math.max(.08,1-z*z));let x=Math.cos(phi)*r*.70,y=1.06+Math.sin(phi)*r*.69,zp=z*.84;const spine=n42Fin(g,M,x*1.12,1.06+(y-1.06)*1.13,zp*1.15,.07,.30,M.light);spine.rotation.z=-Math.atan2(x,y-1.06)}
 for(let s of [-1,1]){let fin=ell(g,s*.67,.95,-.10,.09,.34,.23,M.main);fin.rotation.z=s*.2}
 ell(g,0,1.0,-1.00,.28,.08,.40,M.main);
}
function n42Parrotfish(g,M){ // prominent fused parrot-beak teeth and turquoise fin fan
 ell(g,0,1.01,0,.37,.47,1.12,M.main);ell(g,0,1.10,.89,.37,.30,.39,M.main);eyes(g,M,0,1.28,1.21,.29,.069);ell(g,0,.88,1.32,.30,.22,.17,M.gold);
 for(let s of [-1,1]){const beak=ell(g,s*.14,.93,1.41,.15,.13,.19,M.white);beak.rotation.y=s*.3;let side=ell(g,s*.36,.96,-.15,.09,.33,.51,M.gold);side.rotation.z=s*.37}
 for(let j=0;j<13;j++)n42Fin(g,M,0,1.48,-.90+j*.15,.08,.31,M.gold,j%2*.14);
 const tail=ell(g,0,1.03,-1.22,.10,.56,.52,M.gold);tail.rotation.x=.10;
 for(let i=0;i<17;i++)n42Spot(g,M,Math.sin(i*2.4)*.30,1.14+Math.cos(i*1.7)*.25,-.9+(i%6)*.29,.039);
}
function n42FiddlerCrab(g,M){ // one huge asymmetric claw and one small claw
 ell(g,0,.53,-.10,.77,.24,.54,M.main);eyes(g,M,0,.81,.29,.42,.056);
 for(let s of [-1,1]){for(let j=0;j<4;j++){let z=-.45+j*.27;n42Curve(g,[[s*.56,.46,z],[s*1.04,.36,z+.11],[s*1.20,.10,z+.23]],.057,M.dark)}
 n42Curve(g,[[s*.46,.60,.37],[s*.83,.67,.65]],.11,M.main);
 const size=s<0?.49:.21;ell(g,s*(s<0?1.20:1.0),.69,.81,size,size*.7,size*.8,s<0?M.gold:M.light);
 n42Curve(g,[[s*(s<0?1.13:.96),.78,.86],[s*(s<0?1.50:1.14),.99,1.04]],s<0?.10:.038,M.dark)}
}
function n42Nudibranch(g,M){ // sea slug with gill rosette, rhinophore antennae, wavy mantle
 ell(g,0,.28,0,.65,.24,1.25,M.main);ell(g,0,.40,0,.49,.20,1.10,M.light);
 for(let i=0;i<32;i++){let a=i*2.399,x=Math.sin(a)*.61,z=Math.cos(a)*1.05;n42Spot(g,M,x,.44,z,.065)}
 for(let s of [-1,1]){n42Curve(g,[[s*.22,.44,.75],[s*.22,.81,.90],[s*.30,.96,.95]],.075,M.gold);ell(g,s*.30,.94,.95,.09,.12,.08,M.dark)}
 for(let i=0;i<10;i++){const a=i*6.283/10;n42Curve(g,[[0,.42,-.61],[Math.sin(a)*.22,.77,-.60+Math.cos(a)*.22],[Math.sin(a)*.30,.96,-.62+Math.cos(a)*.30]],.035,i%2?M.gold:M.pink)}
}
function n42SeaCucumber(g,M){ // spiky elongated echinoderm, blunt ends
 ell(g,0,.43,0,.60,.39,1.26,M.main);for(let ring=0;ring<11;ring++)for(let j=0;j<8;j++){let a=j*Math.PI/4+ring*.12;const z=-1.1+ring*.22,x=Math.sin(a)*.52,y=.43+Math.cos(a)*.34;n42Fin(g,M,x,y,z,.09,.30,(ring+j)%3?M.gold:M.dark,-Math.atan2(x,y-.43))}
 for(let j=0;j<8;j++){let a=j*6.283/8;n42Curve(g,[[0,.43,1.12],[Math.sin(a)*.20,.43+Math.cos(a)*.20,1.34]],.040,M.light)}
}
function n42PistolShrimp(g,M){ // segmented abdomen, unequal snapping claw, six leg pairs
 ell(g,0,.62,-.04,.33,.31,.72,M.main);ell(g,0,.69,.54,.36,.32,.33,M.main);eyes(g,M,0,.85,.82,.27,.060);
 for(let j=0;j<6;j++){let z=-.45+j*.22;ell(g,0,.62,z,.33,.29,.11,j%2?M.gold:M.main);for(let s of [-1,1])n42Curve(g,[[s*.25,.60,z],[s*.54,.28,z+.11],[s*.73,.12,z+.18]],.031,M.dark)}
 for(let s of [-1,1]){n42Curve(g,[[s*.31,.65,.56],[s*.66,.55,.95]],.10,M.main);ell(g,s*(s<0?.93:.72),.51,1.06,s<0?.30:.16,.19,.29,s<0?M.gold:M.main);n42Curve(g,[[s*(s<0?1.02:.76),.50,1.25],[s*(s<0?1.29:.93),.42,1.39]],.055,M.dark)}
 for(let s of [-1,1])n42Curve(g,[[s*.08,.83,.76],[s*.16,1.18,1.10],[s*.19,1.33,1.30]],.016,M.gold);
 for(let j=-2;j<=2;j++)n42Fin(g,M,j*.13,.58,-.79,.09,.31,M.light,j*.10);
}
function n42KingCobra(g,M){ // raised hood plus long coiled body, hood spectacle markings
 const coils=[];for(let i=0;i<=35;i++){let t=i/35*Math.PI*3.5;coils.push([Math.sin(t)*.82,.42+Math.sin(t*.5)*.15,-.3+Math.cos(t)*.58])}n42Curve(g,coils,.19,M.main);
 n42Curve(g,[[0,.52,.30],[0,1.02,.72],[0,1.70,.88],[0,2.13,.92]],.17,M.main);ell(g,0,1.58,.80,.52,.68,.18,M.dark);ell(g,0,1.53,.99,.32,.56,.10,M.main);ell(g,0,2.10,.96,.36,.23,.33,M.main);eyes(g,M,0,2.18,1.20,.28,.072);
 for(let s of [-1,1]){ell(g,s*.32,1.64,.91,.060,.30,.06,M.gold);ell(g,s*.20,1.66,1.06,.09,.13,.032,M.light)}
 n42Curve(g,[[0,1.96,1.22],[0,1.76,1.49]],.025,M.pink);
}
function n42PapuanCroc(g,M){ // freshwater crocodile has slender snout, dorsal osteoderms
 ell(g,0,.64,0,.54,.30,1.27,M.main);ell(g,0,.64,1.15,.36,.20,.49,M.main);ell(g,0,.53,1.61,.27,.13,.49,M.light);eyes(g,M,0,.79,1.30,.29,.060);
 for(let s of [-1,1])for(let z of [-.72,.61]){n42Limb(g,M,s,.60,z,true);for(let j=-1;j<=1;j++)n42Curve(g,[[s*.48,.13,z+.17],[s*(.56+j*.08),.11,z+.33]],.024,M.gold)}
 for(let i=0;i<22;i++){let z=-1.12+i*.105;n42Fin(g,M,0,.96,z,.10,.20,M.dark)}
 n42Tail(g,M,[[0,.58,-1.07],[.14,.43,-1.58],[.37,.28,-2.22],[.32,.20,-2.62]],.19,M.main);
}
function n42NenekPakande(g,M){ // Bugis folklore: hunched elder with white hair and cane; no graphic content
 ell(g,0,1.10,-.12,.53,.72,.36,M.dark);ell(g,0,1.70,.47,.42,.45,.39,M.light);ell(g,0,2.01,.28,.45,.32,.42,M.white);
 ell(g,0,1.71,.78,.36,.24,.18,M.pink);eyes(g,M,0,1.80,.89,.27,.075);ell(g,0,1.57,.98,.14,.12,.15,M.light);
 for(let s of [-1,1]){ell(g,s*.32,2.0,.30,.17,.34,.14,M.white);n42Curve(g,[[s*.4,1.34,.09],[s*.48,.65,.38],[s*.63,.48,.67]],.080,M.main);cylinder(g,s*.23,.65,-.13,s*.30,.10,.02,.13,.080,M.dark)}
 n42Curve(g,[[-.61,.72,.59],[-.84,.82,1.12],[-.78,1.15,1.14],[-.63,1.29,1.10]],.06,M.gold);
 for(let j=0;j<18;j++){let a=j*2.399;ell(g,Math.sin(a)*.48,2.05+Math.cos(a)*.25,.12,.08,.14,.09,M.white)}
}
/* NUSAJIWA 4.6 — 25 individually composed silhouettes based on zoological or story traits.
   Shared primitive helpers ≠ duplicate model. These are stylized works, not scans. */
const n46Curve=(g,p,r,m)=>tube(g,p,r,m);
const n46Eye=(g,M,x,y,z)=>eyes(g,M,x,y,z,.23,.067);
const n46Wing=(g,M,s,span=1)=>n42Wing(g,M,s,span,M.main,1.32);
const n46Leg=(g,M,s,z=0,height=.85)=>{cylinder(g,s*.32,height,z,s*.38,.14,z+.09,.12,.075,M.main);ell(g,s*.38,.13,z+.16,.19,.10,.23,M.dark)};
const n46Flipper=(g,M,s,x,y,z,w=.65)=>{let f=ell(g,s*x,y,z,w,.10,.31,M.main);f.rotation.z=s*.30;return f};
function n46Dingiso(g,M){ // alpine black-and-white kangaroo; thick tail, powerful feet, snow-white throat
 ell(g,0,1.10,-.11,.52,.70,.45,M.black);ell(g,0,1.13,.25,.39,.53,.23,M.white);ell(g,0,1.81,.35,.40,.39,.37,M.black);ell(g,0,1.72,.59,.31,.22,.12,M.white);n46Eye(g,M,0,1.91,.64);
 for(let s of [-1,1]){n42Ear(g,M,s,.33,2.16,.22,.24);cylinder(g,s*.32,1.41,.03,s*.54,.69,.34,.12,.083,M.main);ell(g,s*.51,.65,.36,.18,.14,.20,M.dark);n46Leg(g,M,s,-.16,.76);ell(g,s*.35,.16,.51,.18,.10,.37,M.dark)}
 n46Curve(g,[[0,1.0,-.50],[.25,.74,-.92],[.48,.58,-1.38],[.38,.55,-1.84]],.18,M.black);
 for(let j=0;j<7;j++)ell(g,(j-3)*.08,1.36,.53,.063,.11,.035,M.white);
}
function n46SulawesiCivet(g,M){ // tail rings & civet mask; dorsal twin spots
 ell(g,0,.88,0,.50,.42,.91,M.main);ell(g,0,1.17,.68,.34,.32,.45,M.main);ell(g,0,1.17,1.02,.28,.20,.29,M.light);n46Eye(g,M,0,1.36,1.07);
 for(let s of [-1,1]){n42Ear(g,M,s,.28,1.45,.76,.16);n46Leg(g,M,s,-.56);n46Leg(g,M,s,.56);for(let j=0;j<6;j++)ell(g,s*.36,1.19,-.79+j*.29,.07,.034,.08,M.dark);ell(g,s*.18,1.26,1.10,.12,.07,.05,M.dark)}
 n46Curve(g,[[0,.83,-.83],[.24,1.05,-1.19],[.37,1.13,-1.53],[.26,1.41,-1.93]],.11,M.main);
 for(let i=0;i<5;i++)ell(g,.25+i*.02,1.01+i*.08,-1.2-i*.16,.11,.052,.12,i%2?M.gold:M.black);
}
function n46SulawesiPig(g,M){ // Sulawesi warty pig: forehead warts and pointed forehead crest
 ell(g,0,.86,-.10,.74,.52,1.0,M.main);ell(g,0,1.10,.83,.55,.49,.50,M.main);ell(g,0,.93,1.29,.39,.25,.46,M.light);ell(g,0,.96,1.62,.26,.14,.09,M.pink);n46Eye(g,M,0,1.26,1.22);
 for(let s of [-1,1]){n46Leg(g,M,s,-.61);n46Leg(g,M,s,.55);n42Ear(g,M,s,.42,1.45,.81,.20);ell(g,s*.39,1.22,1.07,.15,.13,.16,M.dark);ell(g,s*.47,1.09,1.17,.11,.09,.12,M.dark)}
 for(let i=0;i<11;i++)n42Fin(g,M,0,1.46,-.85+i*.16,.085,.33,i%2?M.dark:M.gold);n46Curve(g,[[0,.84,-.97],[.30,.62,-1.27],[.36,.75,-1.40]],.07,M.dark);
}
function n46FlyingSquirrel(g,M){ // giant red flying squirrel: two broad patagia between front and hind feet
 ell(g,0,1.05,0,.47,.55,.60,M.main);ell(g,0,1.73,.44,.35,.36,.39,M.main);ell(g,0,1.69,.69,.26,.22,.19,M.light);n46Eye(g,M,0,1.81,.72);
 for(let s of [-1,1]){n42Ear(g,M,s,.29,1.98,.35,.17);cylinder(g,s*.30,1.47,.12,s*.92,1.54,.51,.12,.065,M.main);cylinder(g,s*.30,.72,-.34,s*.69,.28,-.75,.12,.075,M.main);let membrane=new THREE.Mesh(new THREE.ShapeGeometry((()=>{const q=new THREE.Shape();q.moveTo(0,0);q.lineTo(s*.64,.07);q.lineTo(s*.50,-.84);q.lineTo(0,-.52);q.closePath();return q})()),M.light);membrane.position.set(s*.20,1.10,.16);membrane.rotation.x=.35;g.add(membrane)}
 n46Curve(g,[[0,.99,-.53],[.48,.86,-1.05],[.65,1.16,-1.63],[.30,1.52,-2.14]],.18,M.main);
}
function n46Sambar(g,M){ // tall robust deer, large three-tined antlers
 ell(g,0,1.19,-.09,.63,.61,.93,M.main);ell(g,0,1.66,.59,.40,.52,.44,M.main);ell(g,0,1.70,1.03,.30,.31,.32,M.light);n46Eye(g,M,0,1.87,1.21);
 for(let s of [-1,1]){for(let z of [-.6,.57])cylinder(g,s*.38,.9,z,s*.46,.11,z,.13,.077,M.main);n42Ear(g,M,s,.38,2.0,.80,.22);n46Curve(g,[[s*.20,1.98,.78],[s*.45,2.34,.69],[s*.72,2.85,.62]],.062,M.gold);n46Curve(g,[[s*.47,2.39,.72],[s*.29,2.68,.94]],.038,M.gold);n46Curve(g,[[s*.58,2.61,.69],[s*.92,2.71,.86]],.033,M.gold)}
 ell(g,0,1.41,-.99,.21,.22,.24,M.dark);
}
function n46LeopardCat(g,M){ // spotted leopard cat; slimmer than clouded leopard, distinct rosette geometry
 ell(g,0,.88,0,.52,.42,.88,M.main);ell(g,0,1.35,.71,.39,.34,.39,M.main);ell(g,0,1.17,1.01,.28,.19,.24,M.white);n46Eye(g,M,0,1.48,1.00);
 for(let s of [-1,1]){n42Ear(g,M,s,.27,1.67,.78,.17);n46Leg(g,M,s,-.55);n46Leg(g,M,s,.54);for(let j=0;j<8;j++){let z=-.70+j*.20;ell(g,s*.40,1.06,z,.085,.038,.095,M.black)}}
 n46Curve(g,[[0,.84,-.73],[.26,.92,-1.1],[.38,1.20,-1.4],[.21,1.31,-1.69]],.10,M.main);
 for(let j=0;j<3;j++)ell(g,.30,1.00+j*.09,-1.24-j*.12,.1,.06,.09,M.black);
}
function n46GreyCuscus(g,M){ // pale cuscus: round marsupial body, grasping tail, opposable paws
 ell(g,0,1.06,-.12,.62,.72,.46,M.light);ell(g,0,1.75,.40,.47,.47,.40,M.main);ell(g,0,1.62,.74,.37,.29,.16,M.pink);n46Eye(g,M,0,1.82,.72);
 for(let s of [-1,1]){n42Ear(g,M,s,.43,1.95,.33,.16);cylinder(g,s*.40,1.25,.10,s*.73,.78,.32,.12,.076,M.light);cylinder(g,s*.31,.72,-.24,s*.51,.18,.08,.15,.095,M.light);for(let j=-1;j<=1;j++)cylinder(g,s*.68,.77,.38,s*(.75+j*.055),.68,.48,.027,.015,M.dark)}
 n46Curve(g,[[0,.92,-.57],[.41,1.02,-.99],[.65,1.38,-1.43],[.43,1.74,-1.51],[.19,1.8,-1.30]],.13,M.main);
}
function n46SiauOwl(g,M){ // tiny owl with horn-like ear tufts and big forward eyes
 ell(g,0,1.07,-.05,.45,.61,.42,M.main);ell(g,0,1.65,.30,.42,.40,.37,M.main);
 for(let s of [-1,1]){ell(g,s*.20,1.76,.61,.17,.17,.055,M.light);ell(g,s*.20,1.76,.65,.09,.11,.03,M.gold);ell(g,s*.20,1.76,.69,.04,.07,.025,M.black);n42Fin(g,M,s*.32,2.13,.24,.13,.49,M.dark,-s*.34);const wing=ell(g,s*.44,1.09,-.15,.18,.44,.31,M.dark);wing.rotation.z=s*.22}
 n42Fin(g,M,0,1.52,.77,.12,.29,M.gold,Math.PI/2);n42Feet(g,M,.23);
 for(let i=-3;i<=3;i++)ell(g,i*.10,.98,.39,.07,.20,.045,M.light);
}
function n46Wilson(g,M){ // turquoise bare crown, red body, curled wires of Wilson's bird-of-paradise
 ell(g,0,1.10,0,.40,.52,.43,M.main);ell(g,0,1.59,.30,.33,.36,.33,M.main);ell(g,0,1.90,.32,.26,.18,.26,M.gold);n46Eye(g,M,0,1.64,.58);n42Fin(g,M,0,1.52,.69,.10,.34,M.dark,Math.PI/2);
 for(let s of [-1,1]){n46Wing(g,M,s,1.02);cylinder(g,s*.16,.75,.04,s*.20,.10,.25,.055,.028,M.dark);n46Curve(g,[[s*.13,.92,-.40],[s*.32,.63,-.85],[s*.52,1.01,-1.30],[s*.27,1.36,-1.39],[s*.10,1.20,-1.23]],.025,M.gold)}
 for(let i=0;i<11;i++){const a=i*2.4;ell(g,Math.sin(a)*.24,1.96+Math.cos(a)*.10,.41,.045,.04,.04,M.light)}
}
function n46KingBird(g,M){ // King bird of paradise, ruby red with twin spiraled tail wires
 ell(g,0,1.14,-.01,.36,.46,.40,M.main);ell(g,0,1.58,.24,.28,.31,.28,M.main);ell(g,0,1.33,.32,.24,.29,.23,M.white);n46Eye(g,M,0,1.69,.52);
 for(let s of [-1,1]){n46Wing(g,M,s,1.1);cylinder(g,s*.15,.78,.06,s*.18,.16,.22,.057,.027,M.dark);n46Curve(g,[[s*.10,.84,-.34],[s*.31,.55,-.74],[s*.45,.71,-1.18],[s*.25,1.03,-1.22],[s*.10,.95,-1.06]],.022,M.gold)}
 n42Fin(g,M,0,1.47,.58,.07,.31,M.gold,Math.PI/2);for(let i=0;i<6;i++)ell(g,(i-3)*.09,.90,-.48,.08,.12,.29,M.light);
}
function n46SeaEagle(g,M){ // brahminy kite is in roster, this one is white-bellied sea eagle (white front, slate wings)
 ell(g,0,1.09,-.11,.48,.62,.44,M.dark);ell(g,0,1.24,.32,.38,.45,.22,M.white);ell(g,0,1.74,.40,.38,.42,.35,M.white);n46Eye(g,M,0,1.85,.68);n42Fin(g,M,0,1.63,.82,.13,.44,M.gold,Math.PI/2);
 for(let s of [-1,1]){n46Wing(g,M,s,1.65);cylinder(g,s*.21,.72,.03,s*.23,.20,.18,.09,.043,M.gold);for(let j=-1;j<=1;j++)cylinder(g,s*.23,.16,.18,s*(.23+j*.13),.08,.46,.023,.013,M.black)}
 for(let j=-4;j<=4;j++){let f=ell(g,j*.12,.77,-.66,.09,.09,.55,M.white);f.rotation.x=.25}
}
function n46LesserAdjutant(g,M){ // bangau tongtong: naked head, large stout beak, long stilt legs
 ell(g,0,1.60,-.1,.58,.63,.44,M.main);ell(g,0,2.02,.41,.25,.43,.25,M.dark);ell(g,0,2.38,.60,.23,.33,.21,M.dark);eyes(g,M,0,2.47,.78,.14,.053);ell(g,0,2.25,.99,.13,.15,.65,M.gold);
 for(let s of [-1,1]){const f=ell(g,s*.54,1.54,-.07,.19,.48,.26,M.dark);f.rotation.z=s*.20;cylinder(g,s*.21,1.29,-.13,s*.24,.21,.08,.069,.034,M.gold);cylinder(g,s*.24,.21,.08,s*.31,.07,.38,.044,.023,M.gold)}
 for(let i=0;i<5;i++)ell(g,(i-2)*.14,1.26,-.59,.065,.16,.54,M.light);
}
function n46Leatherback(g,M){ // seven ridges and no hard scutes distinguish leatherback from other turtles
 ell(g,0,.69,-.03,.99,.44,1.26,M.dark);ell(g,0,.98,0,.88,.30,1.06,M.main);ell(g,0,.67,1.16,.30,.25,.37,M.main);eyes(g,M,0,.81,1.39,.21,.058);
 for(let i=-3;i<=3;i++){let pts=[];for(let k=0;k<10;k++){let z=-.90+k*.20;pts.push([i*.19*(.80-Math.abs(z)*.10),1.23-(i*i)*.021-(z*z)*.04,z])}n46Curve(g,pts,.024,i%2?M.light:M.gold)}
 for(let s of [-1,1]){n46Flipper(g,M,s,1.05,.54,.53,.88);n46Flipper(g,M,s,.79,.48,-.75,.43)}n46Curve(g,[[0,.63,-.97],[0,.44,-1.40]],.12,M.main);
}
function n46OceanManta(g,M){ // huge rhomboid pelagic manta with paired cephalic lobes and black mouth
 ell(g,0,1.04,.0,.56,.14,1.25,M.dark);ell(g,0,1.01,.32,.43,.13,.76,M.main);
 for(let s of [-1,1]){const wing=ell(g,s*1.25,1.02,-.05,1.25,.085,.71,M.main);wing.rotation.y=-s*.17;let tip=ell(g,s*2.32,1.03,-.24,.44,.056,.19,M.dark);tip.rotation.z=s*.12;ell(g,s*.35,.98,1.08,.17,.15,.35,M.dark);ell(g,s*.29,1.12,.69,.28,.027,.25,M.white);ell(g,s*.23,1.12,1.16,.08,.045,.065,M.gold)}
 ell(g,0,.91,1.32,.28,.075,.17,M.black);n46Curve(g,[[0,1.01,-1.03],[.05,.92,-1.76],[0,.93,-2.31]],.04,M.dark);
}
function n46SeahorseKuda(g,M){ // elongated seahorse upright head with pouch, curled prehensile tail
 ell(g,0,1.31,0,.26,.64,.29,M.main);ell(g,0,1.22,.25,.34,.39,.26,M.light);ell(g,0,1.99,.22,.30,.31,.31,M.main);ell(g,0,1.97,.55,.18,.14,.42,M.main);n46Eye(g,M,0,2.08,.45);
 n46Curve(g,[[0,.88,-.01],[.20,.63,-.20],[.35,.37,-.20],[.21,.22,.04],[.06,.34,.11]],.15,M.main);
 for(let j=0;j<12;j++)n42Fin(g,M,0,1.05+j*.105,-.27,.09,.14,M.gold);
 for(let s of [-1,1]){let f=ell(g,s*.25,1.55,-.06,.09,.28,.19,M.light);f.rotation.z=s*.28}
 n42Fin(g,M,0,2.34,.14,.15,.24,M.gold);
}
function n46FlyingFish(g,M){ // distinct flying fish: huge extended pectoral fins, narrow fork tail
 ell(g,0,1.0,.0,.30,.27,1.29,M.main);ell(g,0,1.08,.93,.28,.22,.37,M.light);n46Eye(g,M,0,1.17,1.19);
 for(let s of [-1,1]){const fin=new THREE.Mesh(new THREE.ShapeGeometry((()=>{const t=new THREE.Shape();t.moveTo(0,0);t.lineTo(s*1.35,.44);t.lineTo(s*1.64,-.57);t.lineTo(s*.24,-.40);t.closePath();return t})()),M.light);fin.position.set(s*.28,1.17,.12);fin.rotation.x=-.28;g.add(fin);for(let j=1;j<5;j++)n46Curve(g,[[s*.30,1.19,.08],[s*(.50+j*.24),1.42,.07-j*.10]],.015,M.gold)}
 for(let s of [-1,1]){let tail=ell(g,s*.23,.99,-1.38,.10,.09,.65,M.gold);tail.rotation.y=s*.65}n42Fin(g,M,0,1.41,-.65,.13,.44,M.dark);
}
function n46Moray(g,M){ // heavy olive spotted eel, large gaping jaws, black spots
 const pts=[];for(let i=0;i<=29;i++){let t=i/29;pts.push([Math.sin(t*8)*(.36+t*.36),.65+.15*Math.sin(t*4),1.2-3.6*t])}n46Curve(g,pts,.27,M.main);
 ell(g,pts[0][0],.74,1.34,.34,.31,.51,M.main);ell(g,pts[0][0],.56,1.62,.31,.14,.43,M.dark);n46Eye(g,M,pts[0][0],.89,1.53);
 for(let i=0;i<34;i++){let p=pts[i%pts.length];ell(g,p[0]+Math.sin(i*2.4)*.21,p[1]+.14,p[2],.065,.038,.07,M.dark)}
 for(let i=0;i<15;i++)n42Fin(g,M,pts[i+4][0],pts[i+4][1]+.19,pts[i+4][2],.10,.20,M.dark);
}
function n46StoneFish(g,M){ // camouflage bottom-dweller, broad flattened head, dorsal venom spines
 ell(g,0,.50,-.12,.77,.31,.93,M.main);ell(g,0,.49,.78,.79,.29,.57,M.main);ell(g,0,.33,1.32,.60,.15,.26,M.dark);n46Eye(g,M,0,.72,1.20);
 for(let s of [-1,1]){let f=ell(g,s*.81,.40,.16,.54,.12,.51,M.dark);f.rotation.z=s*.23}
 for(let i=0;i<15;i++){let z=-.92+i*.16;n42Fin(g,M,Math.sin(i)*.06,.92,z,.105,.42,i%2?M.gold:M.dark)}
 for(let j=0;j<34;j++){let a=j*2.4,z=-.82+(j%10)*.18;ell(g,Math.sin(a)*.63,.73+Math.cos(a)*.08,z,.09,.09,.12,j%3?M.light:M.dark)}
}
function n46SpermWhale(g,M){ // massive squared head and asymmetric blowhole
 ell(g,0,1.05,-.21,.59,.54,1.40,M.dark);ell(g,0,1.14,.93,.61,.65,.86,M.main);ell(g,0,.78,1.48,.55,.13,.50,M.light);eyes(g,M,0,.90,1.24,.52,.066);
 for(let s of [-1,1]){let f=ell(g,s*.67,.82,.18,.62,.09,.21,M.main);f.rotation.z=s*.27;const t=ell(g,s*.35,1.00,-1.56,.50,.08,.20,M.dark);t.rotation.y=s*.23}
 ell(g,-.20,1.76,1.32,.11,.025,.17,M.black);for(let i=0;i<7;i++)ell(g,(i-3)*.12,.66,1.6,.04,.04,.04,M.white);
}
function n46Bottlenose(g,M){ // dolphin with a longer beak and tall curved dorsal fin
 ell(g,0,1.02,-.14,.43,.37,1.31,M.main);ell(g,0,1.06,1.0,.36,.31,.52,M.light);ell(g,0,.92,1.51,.19,.12,.43,M.main);n46Eye(g,M,0,1.19,1.31);
 n42Fin(g,M,0,1.49,-.45,.25,.66,M.dark,.22);
 for(let s of [-1,1]){let f=ell(g,s*.55,.84,.25,.53,.075,.22,M.main);f.rotation.z=s*.28;const t=ell(g,s*.44,.98,-1.46,.54,.055,.19,M.light);t.rotation.y=s*.31}
}
function n46BrookeBirdwing(g,M){ // striking emerald chevrons on black triangular butterfly wings
 ell(g,0,1.17,.0,.12,.62,.15,M.black);ell(g,0,1.78,.13,.15,.16,.17,M.black);n46Eye(g,M,0,1.80,.26);
 for(let s of [-1,1]){for(let k=0;k<2;k++){const w=ell(g,s*(.78+k*.36),1.54-k*.42,-.05,.88-k*.18,.14,.60-k*.06,M.black);w.rotation.z=s*(.28+k*.28)}for(let i=0;i<6;i++){const f=ell(g,s*(.44+i*.20),1.78-i*.04,.07,.10,.22,.03,M.gold);f.rotation.z=s*(.28+i*.12)}n46Curve(g,[[s*.05,1.89,.17],[s*.17,2.20,.29],[s*.30,2.34,.21]],.018,M.dark)}
}
function n46DewiSri(g,M){ // symbolic rice goddess based on agricultural motifs; not ritual replica
 ell(g,0,1.02,0,.46,.69,.36,M.gold);const robe=new THREE.Mesh(new THREE.ConeGeometry(.72,1.45,12),M.main);robe.rotation.z=Math.PI;robe.position.y=.78;g.add(robe);ell(g,0,2.02,.22,.32,.36,.31,M.light);n46Eye(g,M,0,2.09,.48);
 for(let s of [-1,1]){cylinder(g,s*.42,1.53,.0,s*.73,.79,.30,.11,.065,M.gold);n46Curve(g,[[s*.71,.79,.33],[s*.84,1.21,.50],[s*.91,1.95,.52]],.07,M.gold);for(let j=0;j<6;j++)ell(g,s*(.87+j*.018),1.1+j*.14,.54,.05,.07,.05,M.light)}
 for(let i=-3;i<=3;i++)n42Fin(g,M,i*.12,2.50,.19,.13,.39,M.gold,i*.07);
}
function n46RoroKidul(g,M){ // ocean queen in flowing teal mantle; acknowledges many story variants
 const robe=new THREE.Mesh(new THREE.ConeGeometry(.73,1.8,16),M.main);robe.rotation.z=Math.PI;robe.position.y=.94;g.add(robe);ell(g,0,1.69,.03,.35,.48,.32,M.light);ell(g,0,2.16,.24,.32,.36,.30,M.light);n46Eye(g,M,0,2.23,.49);
 for(let s of [-1,1]){cylinder(g,s*.42,1.63,.08,s*.84,.96,.35,.12,.07,M.main);for(let j=0;j<5;j++)n46Curve(g,[[s*(.08+j*.10),2.36,.09],[s*(.22+j*.12),1.69,.16],[s*(.24+j*.13),1.00,.04]],.05,M.dark)}
 for(let i=-4;i<=4;i++){const t=ell(g,i*.19,.15,-.18,.26,.15,.63,M.light);t.rotation.z=i*.13}
 for(let i=-3;i<=3;i++)n42Fin(g,M,i*.14,2.50,.18,.10,.31,M.gold,i*.12);
}
function n46BataraKala(g,M){ // wayang-inspired Kala deity, large grimacing stylised mask, ritual-neutral
 const robe=new THREE.Mesh(new THREE.ConeGeometry(.75,1.55,12),M.dark);robe.rotation.z=Math.PI;robe.position.y=.84;g.add(robe);ell(g,0,1.40,.0,.57,.68,.38,M.main);ell(g,0,2.15,.25,.51,.53,.42,M.main);ell(g,0,1.95,.61,.40,.29,.17,M.dark);
 for(let s of [-1,1]){ell(g,s*.22,2.30,.63,.15,.14,.09,M.gold);eyes(g,M,0,2.28,.71,.22,.10);cylinder(g,s*.53,1.56,0,s*.83,.58,.24,.17,.09,M.main);n46Curve(g,[[s*.35,2.50,.37],[s*.55,2.91,.28],[s*.72,3.06,.12]],.08,M.gold);n46Curve(g,[[s*.22,1.93,.69],[s*.26,1.64,.71]],.06,M.white)}
 for(let j=-3;j<=3;j++)n42Fin(g,M,j*.15,2.84,.19,.14,.44,M.gold,j*.11);
}
function n46Mandalika(g,M){ // Sasak Mandalika legend, wave ribbon / nyale symbolism as game adaptation
 const dress=new THREE.Mesh(new THREE.ConeGeometry(.60,1.62,11),M.main);dress.rotation.z=Math.PI;dress.position.y=.91;g.add(dress);ell(g,0,1.59,.0,.36,.44,.34,M.light);ell(g,0,2.11,.23,.32,.36,.31,M.light);n46Eye(g,M,0,2.20,.51);
 for(let s of [-1,1]){cylinder(g,s*.37,1.55,.1,s*.74,.87,.36,.10,.06,M.main);n46Curve(g,[[s*.71,.83,.31],[s*.97,1.0,.65],[s*1.32,1.0,.58]],.066,M.gold)}
 for(let i=0;i<8;i++){const a=i*.785;const pts=[];for(let j=0;j<8;j++){const u=j/7;pts.push([Math.cos(a)*(.72+u*.37),.28+u*.33,Math.sin(a)*(.75+u*.27)])}n46Curve(g,pts,.08,i%2?M.gold:M.light)}
 for(let j=-3;j<=3;j++)n42Fin(g,M,j*.13,2.52,.16,.09,.31,M.gold,j*.08);
}
/* NUSAJIWA 4.7 — 25 independent silhouettes (fauna + figur pewayangan).
   Anatomical/cultural visual identifiers are selectively represented in procedural meshes.
   These are game stylizations rather than scans, documentary replicas, or biology evidence. */
function n47Linsang(g,M){
 ell(g,0,.82,0,.37,.33,1.04,M.main);ell(g,0,.88,.82,.31,.29,.42,M.main);ell(g,0,.68,1.1,.24,.13,.32,M.light);n46Eye(g,M,0,1.04,1.08);
 for(let s of [-1,1]){for(let z of [-.69,.67]){cylinder(g,s*.26,.71,z,s*.28,.18,z+.1,.08,.052,M.main);ell(g,s*.28,.16,z+.13,.13,.08,.17,M.dark)}n42Ear(g,M,s,.24,1.15,.83,.16);}
 for(let z of [-.7,-.30,.1,.5])for(let s of [-1,1])ell(g,s*.3,.95,z,.11,.06,.18,M.dark);
 n46Curve(g,[[0,.79,-.94],[.22,.88,-1.3],[.32,1.08,-1.65],[.15,1.25,-2.05]],.13,M.main);
 for(let i=0;i<6;i++)ell(g,.2+i*.01,.88+i*.07,-1.28-i*.14,.115,.045,.10,i%2?M.dark:M.light);
}
function n47PalmCivet(g,M){
 ell(g,0,.86,0,.43,.39,1.06,M.main);ell(g,0,1.12,.8,.34,.27,.42,M.main);ell(g,0,1.03,1.12,.21,.11,.26,M.light);n46Eye(g,M,0,1.21,1.07);
 for(let s of [-1,1]){n42Ear(g,M,s,.25,1.35,.80,.19);for(let z of [-.58,.56])cylinder(g,s*.3,.74,z,s*.36,.11,z+.09,.083,.048,M.dark);}
 for(let x of [-.24,0,.24])n46Curve(g,[[x,1.22,-.85],[x,1.19,-.25],[x*.8,1.24,.46]],.028,M.dark);
 n46Curve(g,[[0,.90,-.94],[.19,1.0,-1.4],[.49,.96,-1.92],[.66,.78,-2.18]],.10,M.main);
}
function n47SulawesiSquirrel(g,M){
 ell(g,0,1.01,0,.37,.49,.36,M.main);ell(g,0,1.54,.3,.36,.34,.34,M.main);ell(g,0,1.42,.55,.21,.15,.2,M.light);n46Eye(g,M,0,1.62,.57);
 for(let s of [-1,1]){n42Ear(g,M,s,.23,1.84,.30,.21);cylinder(g,s*.26,.89,0,s*.42,.19,.28,.12,.062,M.main);cylinder(g,s*.32,1.23,.20,s*.43,.83,.52,.07,.04,M.main)}
 n46Curve(g,[[0,.86,-.35],[.38,.76,-.72],[.60,1.12,-1.12],[.67,1.61,-1.22],[.48,1.89,-1.05]],.20,M.main);
 for(let j=0;j<7;j++)ell(g,Math.sin(j*2.4)*.31,1.04+Math.cos(j)*.16,-.25,.075,.095,.09,M.light);
}
function n47Porcupine(g,M){
 ell(g,0,.70,0,.72,.43,1.06,M.dark);ell(g,0,.67,.92,.38,.29,.39,M.main);ell(g,0,.62,1.23,.30,.16,.33,M.light);n46Eye(g,M,0,.89,1.18);
 for(let s of [-1,1])for(let z of [-.58,.63])cylinder(g,s*.5,.60,z,s*.55,.16,z+.13,.13,.083,M.main);
 for(let j=0;j<64;j++){const a=j*2.399,r=.45+.22*Math.sin(j),z=-.95+(j%13)*.14;const origin=[Math.sin(a)*r,.88+Math.abs(Math.cos(a))*.16,z],tip=[Math.sin(a)*(1.12+(j%4)*.07),1.22+Math.abs(Math.cos(a))*.38,z-.22];cylinder(g,...origin,...tip,.043,.003,j%3?M.light:M.gold,5)}
}
function n47PiedHornbill(g,M){
 ell(g,0,1.05,0,.49,.69,.43,M.black);ell(g,0,1.13,.3,.38,.51,.28,M.white);ell(g,0,1.75,.38,.33,.33,.32,M.black);n46Eye(g,M,0,1.86,.65);
 const beak=new THREE.Mesh(new THREE.ConeGeometry(.19,.75,7),M.gold);beak.rotation.x=Math.PI/2;beak.position.set(0,1.66,1.02);g.add(beak);
 ell(g,0,1.94,.76,.24,.16,.34,M.gold);
 for(let s of [-1,1]){const wing=ell(g,s*.41,1.25,-.14,.25,.39,.65,M.black);wing.name=s<0?'wingL':'wingR';wing.rotation.z=s*.30;for(let j=0;j<5;j++)ell(g,s*(.42+j*.09),1.06,-.42,.063,.13,.33,M.white);cylinder(g,s*.18,.53,.12,s*.19,.08,.19,.05,.029,M.dark)}
 for(let j=0;j<5;j++){let f=ell(g,(j-2)*.1,.89,-.75,.08,.11,.60,j%2?M.white:M.black);f.rotation.x=.24}
}
function n47Shama(g,M){
 ell(g,0,1.10,0,.31,.40,.4,M.black);ell(g,0,1.10,.3,.26,.30,.27,M.gold);ell(g,0,1.55,.28,.28,.30,.25,M.black);n46Eye(g,M,0,1.64,.49);
 n46Curve(g,[[0,1.5,.53],[0,1.48,.84]],.033,M.gold);
 for(let s of [-1,1]){let wing=ell(g,s*.32,1.17,-.08,.17,.24,.42,M.dark);wing.rotation.z=s*.26;cylinder(g,s*.15,.77,.09,s*.20,.19,.16,.05,.028,M.dark);ell(g,s*.18,.84,.38,.14,.11,.17,M.light)}
 for(let j=-3;j<=3;j++){let f=ell(g,j*.07,.92,-.85,.062,.09,1.19,j%2?M.black:M.white);f.rotation.x=-.12}
}
function n47GroundCuckoo(g,M){
 ell(g,0,.96,0,.43,.47,.70,M.main);ell(g,0,1.24,.59,.32,.39,.28,M.light);ell(g,0,1.60,.78,.33,.30,.34,M.dark);n46Eye(g,M,0,1.64,1.06);
 for(let s of [-1,1]){ell(g,s*.22,1.62,1.04,.11,.14,.07,M.gold);const wing=ell(g,s*.43,1.09,-.10,.16,.27,.58,M.dark);wing.rotation.z=s*.17;cylinder(g,s*.29,.72,.22,s*.36,.20,.36,.055,.031,M.gold);for(let j=0;j<3;j++)cylinder(g,s*.36,.17,.35,s*.36+s*.05*j,.12,.62,.024,.012,M.dark)}
 for(let j=-3;j<=3;j++){let f=ell(g,j*.12,1.01,-1.03,.075,.11,.74,j%2?M.gold:M.dark);f.rotation.x=-.1}
 n46Curve(g,[[0,1.49,1.02],[0,1.47,1.32]],.055,M.gold);
}
function n47RedBird(g,M){
 ell(g,0,1.09,0,.35,.48,.4,M.main);ell(g,0,1.65,.22,.31,.31,.27,M.light);ell(g,0,1.61,.43,.23,.19,.17,M.dark);n46Eye(g,M,0,1.77,.42);
 for(let s of [-1,1]){const wing=ell(g,s*.40,1.26,-.22,.26,.31,.55,M.main);wing.name=s<0?'wingL':'wingR';wing.rotation.z=s*.32;for(let j=0;j<7;j++){let f=ell(g,s*(.47+j*.11),1.13+j*.02,-.20-j*.12,.105,.22,.32,j%2?M.gold:M.main);f.rotation.z=s*(.12+j*.04)}cylinder(g,s*.18,.73,0,s*.17,.07,.16,.046,.023,M.dark);}
 for(let s of [-1,1])n46Curve(g,[[s*.09,.88,-.32],[s*.22,.48,-.88],[s*.40,.21,-1.37],[s*.54,.33,-1.77]],.042,M.dark);
 n46Curve(g,[[0,1.58,.53],[0,1.54,.78]],.037,M.gold);
}
function n47CrestedPartridge(g,M){
 ell(g,0,.69,0,.51,.46,.58,M.dark);ell(g,0,.76,.39,.36,.31,.38,M.main);ell(g,0,1.22,.66,.32,.31,.26,M.main);n46Eye(g,M,0,1.29,.88);
 for(let s of [-1,1]){ell(g,s*.42,.78,-.07,.14,.30,.38,M.dark);cylinder(g,s*.20,.39,.12,s*.27,.07,.29,.055,.03,M.gold)}
 for(let j=-4;j<=4;j++){let f=new THREE.Mesh(new THREE.ConeGeometry(.035,.41,5),j%2?M.black:M.gold);f.position.set(j*.028,1.63-Math.abs(j)*.045,.53);f.rotation.z=j*.12;g.add(f)}
 ell(g,0,1.17,.96,.12,.10,.18,M.gold);
}
function n47MountainPitta(g,M){
 ell(g,0,.86,0,.42,.44,.56,M.main);ell(g,0,.90,.35,.35,.31,.29,M.light);ell(g,0,1.36,.54,.29,.28,.28,M.dark);n46Eye(g,M,0,1.45,.75);
 for(let s of [-1,1]){let w=ell(g,s*.33,.92,-.04,.15,.24,.44,M.main);w.rotation.z=s*.27;n46Curve(g,[[s*.21,1.54,.63],[s*.26,1.32,.80]],.045,M.gold);cylinder(g,s*.17,.49,.23,s*.22,.08,.31,.062,.04,M.gold)}
 n46Curve(g,[[0,1.35,.80],[0,1.30,1.03]],.045,M.gold);
 for(let j=-2;j<=2;j++)ell(g,j*.09,.72,-.48,.055,.08,.34,M.dark);
}
function n47TreeFrog(g,M){
 ell(g,0,.66,0,.58,.37,.55,M.main);ell(g,0,.90,.46,.50,.30,.41,M.main);n46Eye(g,M,0,1.07,.75);
 for(let s of [-1,1]){ell(g,s*.36,1.02,.55,.16,.16,.13,M.gold);for(let z of [-.45,.53]){cylinder(g,s*.42,.63,z,s*.93,.23,z+.33,.15,.05,M.main);for(let t=-1;t<=1;t++)ell(g,s*1.02+t*.095,.15,z+.35,.095,.065,.1,M.light)}}
 for(let j=0;j<25;j++){let a=j*2.4;ell(g,Math.sin(a)*.48,.94+Math.cos(a)*.11,-.48+(j%8)*.17,.045,.047,.051,j%3?M.light:M.gold)}
}
function n47FlyingLizard(g,M){
 ell(g,0,.64,0,.33,.24,1.10,M.main);ell(g,0,.69,.88,.28,.23,.42,M.main);n46Eye(g,M,0,.81,1.19);
 for(let s of [-1,1]){for(let z of [-.65,.6]){cylinder(g,s*.2,.59,z,s*.53,.19,z+.12,.07,.031,M.main)}
   const sh=new THREE.Shape();sh.moveTo(0,0);sh.lineTo(s*1.18,.48);sh.lineTo(s*1.22,-.21);sh.lineTo(s*.28,-.75);sh.closePath();let sail=new THREE.Mesh(new THREE.ShapeGeometry(sh),M.gold);sail.rotation.x=-.25;sail.position.set(s*.29,.78,.13);g.add(sail);
   for(let i=0;i<5;i++)n46Curve(g,[[s*.27,.8,.13],[s*(.37+i*.17),.8+(i%2)*.09,.10-i*.18]],.012,M.dark);
 }n46Curve(g,[[0,.58,-.90],[.15,.55,-1.58],[.19,.48,-2.32]],.09,M.main);
}
function n47BlueTongue(g,M){
 ell(g,0,.53,-.04,.56,.29,1.05,M.main);ell(g,0,.57,.83,.53,.24,.51,M.light);ell(g,0,.48,1.23,.40,.13,.32,M.main);n46Eye(g,M,0,.68,1.18);
 for(let s of [-1,1])for(let z of [-.71,.62]){cylinder(g,s*.43,.49,z,s*.70,.13,z+.19,.12,.061,M.main)}
 for(let i=0;i<10;i++)ell(g,0,.76,-.82+i*.20,.49,.025,.055,i%2?M.dark:M.light);
 n46Curve(g,[[0,.49,-.97],[.12,.38,-1.45],[.14,.31,-2.02]],.18,M.main);
 let tongue=ell(g,0,.40,1.69,.16,.018,.29,new THREE.MeshStandardMaterial({color:'#4378dc'}));tongue.rotation.x=.13;
}
function n47ReticulatedPython(g,M){
 let pts=[];for(let j=0;j<=42;j++){let t=j/42;pts.push([Math.sin(t*9.8)*(.53+.18*t),.40+.07*Math.sin(t*6),1.35-3.7*t])}n46Curve(g,pts,.29,M.main);
 ell(g,pts[0][0],.43,1.47,.36,.22,.52,M.main);n46Eye(g,M,pts[0][0],.55,1.67);
 for(let i=0;i<33;i++){let p=pts[i];let diamond=new THREE.Mesh(new THREE.OctahedronGeometry(.115),i%2?M.dark:M.gold);diamond.position.set(p[0],p[1]+.23,p[2]);diamond.scale.set(1,.30,1.55);g.add(diamond)}
}
function n47FlyingSnake(g,M){
 const pts=[];for(let j=0;j<=18;j++){let t=j/18;pts.push([Math.sin(t*7)*(.35+.4*t),.95+.32*Math.sin(t*6),1.3-3.1*t])}n46Curve(g,pts,.105,M.main);ell(g,pts[0][0],1.01,1.40,.20,.13,.34,M.main);n46Eye(g,M,pts[0][0],1.10,1.61);
 for(let j=2;j<15;j++){let p=pts[j],f=ell(g,p[0],p[1]-.04,p[2],.30,.035,.21,M.light);f.rotation.z=Math.sin(j*.7)*.18}
 for(let j=1;j<17;j++){let p=pts[j];ell(g,p[0],p[1]+.10,p[2],.075,.035,.075,j%3?M.dark:M.gold)}
}
function n47Grouper(g,M){
 ell(g,0,.91,0,.55,.52,1.09,M.main);ell(g,0,.87,.80,.50,.43,.49,M.main);ell(g,0,.76,1.19,.31,.20,.22,M.dark);n46Eye(g,M,0,1.12,1.14);
 for(let s of [-1,1]){let fin=ell(g,s*.52,.69,.05,.47,.045,.40,M.dark);fin.rotation.z=s*.45}
 for(let j=0;j<11;j++)n42Fin(g,M,0,1.37,-.89+j*.18,.10,.20,j%2?M.gold:M.dark);
 for(let j=0;j<45;j++){let z=-.93+(j%15)*.135,angle=j*2.4;ell(g,Math.sin(angle)*.51,.88+Math.cos(angle)*.39,z,.075,.033,.085,j%3?M.dark:M.light)}
 ell(g,0,.83,-1.24,.12,.35,.39,M.gold);
}
function n47EagleRay(g,M){
 ell(g,0,.92,0,.51,.13,1.26,M.dark);ell(g,0,.94,.66,.40,.10,.59,M.main);
 for(let s of [-1,1]){let wing=ell(g,s*1.25,.94,-.03,1.22,.055,.78,M.main);wing.rotation.y=-s*.25;for(let j=0;j<16;j++){const z=-.70+(j%8)*.21;ell(g,s*(.50+Math.floor(j/8)*.73),1.02,z,.075,.035,.086,M.light)}ell(g,s*.29,.98,1.25,.20,.07,.34,M.main)}
 n46Curve(g,[[0,.86,-1.16],[.12,.79,-1.95],[.04,.73,-3.02]],.043,M.dark);
}
function n47BlacktipShark(g,M){
 ell(g,0,.97,0,.52,.41,1.46,M.main);ell(g,0,.88,1.13,.42,.24,.56,M.light);ell(g,0,.93,1.53,.20,.09,.43,M.dark);n46Eye(g,M,0,1.14,1.47);
 for(let s of [-1,1]){let fin=ell(g,s*.63,.91,-.30,.72,.075,.29,M.dark);fin.rotation.z=s*.31;ell(g,s*.70,.92,-.52,.18,.07,.17,M.black)}
 let dorsal=new THREE.Mesh(new THREE.ConeGeometry(.28,.83,5),M.dark);dorsal.position.set(0,1.62,-.28);g.add(dorsal);ell(g,0,1.99,-.32,.14,.09,.12,M.black);
 n46Curve(g,[[0,.97,-1.31],[0,.99,-1.72]],.18,M.main);for(let s of [-1,1]){let caud=ell(g,0,.97+s*.39,-1.83,.09,.48,.21,M.dark);caud.rotation.z=s*.22}
}
function n47GiantClam(g,M){
 // Thick fluted paired shell valves, colorful mantle between them, not a generic spherical creature.
 const mantle=new THREE.MeshStandardMaterial({color:'#158f99',roughness:.25,metalness:.12,emissive:'#044d4f',emissiveIntensity:.30,side:THREE.DoubleSide});
 ell(g,0,.50,0,.95,.30,.68,M.gold);ell(g,0,.72,0,.79,.12,.52,mantle);
 for(let s of [-1,1]){let valve=ell(g,s*.56,.58,0,.55,.45,.76,M.light);valve.rotation.z=s*.32;
 for(let i=-4;i<=4;i++){const x=s*(.45+.04*Math.cos(i)),z=i*.15;n46Curve(g,[[x,.15,z],[x+s*.22,.63,z*.85],[x+s*.22,.99,z*.94]],.028,M.gold)}}
 for(let j=0;j<22;j++){let a=j*2.40;let glow=ell(g,Math.sin(a)*.61,.83,Math.cos(a)*.40,.045,.030,.045,j%2?M.light:mantle);void glow}
}
function n47BlueStarfish(g,M){
 ell(g,0,.36,0,.30,.13,.31,M.main);
 for(let k=0;k<5;k++){let a=k*Math.PI*2/5;let f=ell(g,Math.sin(a)*.48,.34,Math.cos(a)*.48,.18,.12,.73,M.main);f.rotation.y=a;for(let j=0;j<5;j++)ell(g,Math.sin(a)*(.27+j*.15),.45,Math.cos(a)*(.27+j*.15),.048,.03,.04,M.light)}
 for(let j=0;j<20;j++){let a=j*2.2;ell(g,Math.sin(a)*.25,.48,Math.cos(a)*.25,.026,.029,.026,M.gold)}
}
function n47Jellyfish(g,M){
 const gel=new THREE.MeshPhysicalMaterial({color:'#8ddfe0',transparent:true,opacity:.65,roughness:.18,metalness:.08,side:THREE.DoubleSide,depthWrite:false});
 const bell=ell(g,0,1.77,0,.79,.42,.78,gel);bell.scale.y=.46;
 for(let j=0;j<28;j++){let a=j*2.399;ell(g,Math.sin(a)*.61,1.95+Math.cos(a*.3)*.08,Math.cos(a)*.56,.07,.034,.07,j%3?M.light:M.gold)}
 for(let k=0;k<15;k++){let a=k*2.399,rad=.17+(k%5)*.12;let pts=[];for(let z=0;z<=8;z++){let t=z/8;pts.push([Math.cos(a)*rad+Math.sin(t*10+k)*.11,1.60-t*(.75+(k%4)*.11),Math.sin(a)*rad+Math.cos(t*8+k)*.10])}n46Curve(g,pts,.027,k%2?M.gold:gel)}
}
function n47Sawfish(g,M){
 ell(g,0,.85,-.08,.56,.30,1.11,M.main);ell(g,0,.88,.92,.41,.26,.55,M.main);n46Eye(g,M,0,1.05,1.17);
 for(let s of [-1,1]){let f=ell(g,s*.58,.75,-.33,.56,.08,.45,M.dark);f.rotation.z=s*.19}
 n46Curve(g,[[0,.86,1.23],[0,.84,1.77],[0,.83,2.64]],.085,M.main);
 for(let j=0;j<11;j++){let z=1.55+j*.095;for(let s of [-1,1])cylinder(g,s*.055,.82,z,s*(.22+(j%3)*.015),.81,z+.035,.018,.007,M.light,5)}
 let dorsal=new THREE.Mesh(new THREE.ConeGeometry(.19,.48,6),M.dark);dorsal.position.set(0,1.33,-.53);g.add(dorsal);
 n46Curve(g,[[0,.84,-1.13],[0,.83,-1.58]],.15,M.main);for(let s of [-1,1]){let fin=ell(g,0,.84+s*.22,-1.67,.1,.28,.18,M.dark);fin.rotation.z=s*.23}
}
function n47Gatotkaca(g,M){
 const torso=ell(g,0,1.37,0,.49,.65,.40,M.dark);ell(g,0,1.52,.30,.43,.36,.22,M.gold);ell(g,0,2.04,.18,.33,.36,.34,M.light);eyes(g,M,0,2.08,.49,.20,.077);
 const skirt=new THREE.Mesh(new THREE.ConeGeometry(.59,.82,9),M.main);skirt.rotation.z=Math.PI;skirt.position.y=.75;g.add(skirt);
 for(let s of [-1,1]){cylinder(g,s*.46,1.66,0,s*.73,.83,.18,.13,.09,M.main);cylinder(g,s*.20,.75,-.03,s*.23,.16,.15,.16,.10,M.main);for(let j=0;j<5;j++){let feather=ell(g,s*(.51+j*.16),1.57+j*.08,-.1,.10,.26+j*.04,.25,j%2?M.gold:M.light);feather.rotation.z=s*(.33+j*.1)}}
 for(let j=-3;j<=3;j++){let crown=new THREE.Mesh(new THREE.ConeGeometry(.07,.36+(3-Math.abs(j))*.08,7),M.gold);crown.position.set(j*.13,2.55-Math.abs(j)*.04,.20);g.add(crown)}
}
function n47Bima(g,M){
 ell(g,0,1.20,0,.62,.77,.37,M.main);ell(g,0,1.43,.31,.50,.51,.21,M.dark);ell(g,0,2.04,.15,.38,.43,.36,M.main);eyes(g,M,0,2.12,.49,.22,.085);
 for(let s of [-1,1]){ell(g,s*.59,1.60,.01,.27,.22,.27,M.dark);cylinder(g,s*.60,1.58,0,s*.84,.69,.27,.22,.12,M.main);cylinder(g,s*.30,.76,0,s*.34,.08,.12,.22,.13,M.main);for(let j=0;j<3;j++)cylinder(g,s*.84,.69,.27,s*.83+s*(j-1)*.08,.50,.58,.035,.01,M.gold)}
 const cloth=new THREE.Mesh(new THREE.ConeGeometry(.60,.78,10),M.dark);cloth.rotation.z=Math.PI;cloth.position.y=.74;g.add(cloth);
 n46Curve(g,[[-.20,2.45,.07],[0,2.75,.12],[.20,2.44,.07]],.072,M.gold);ell(g,0,1.44,.44,.17,.30,.06,M.gold);
}
function n47Cakil(g,M){
 ell(g,0,1.22,0,.33,.73,.29,M.main);ell(g,0,1.98,.16,.38,.43,.38,M.main);ell(g,0,1.73,.50,.40,.20,.25,M.dark);eyes(g,M,0,2.12,.52,.24,.074);
 const cloth=new THREE.Mesh(new THREE.ConeGeometry(.45,.91,7),M.dark);cloth.rotation.z=Math.PI;cloth.position.y=.78;g.add(cloth);
 for(let s of [-1,1]){cylinder(g,s*.36,1.55,0,s*.67,.66,.32,.08,.053,M.main);cylinder(g,s*.21,.77,0,s*.24,.10,.20,.13,.062,M.main);n46Curve(g,[[s*.21,1.66,.56],[s*.34,1.32,.75],[s*.26,1.05,.78]],.07,M.white);let crown=new THREE.Mesh(new THREE.ConeGeometry(.10,.50,6),M.gold);crown.position.set(s*.24,2.47,.18);g.add(crown)}
 n46Curve(g,[[0,1.74,.60],[0,1.41,.77],[.11,1.35,.91]],.093,M.main);
}
const nj47Sculptors={
 linsang_belang:n47Linsang,musang_akar:n47PalmCivet,bajing_sulawesi:n47SulawesiSquirrel,landak_sumatra:n47Porcupine,
 rangkong_perut_putih:n47PiedHornbill,kucica_hutan:n47Shama,tokhtor_sumatra:n47GroundCuckoo,cenderawasih_merah:n47RedBird,puyuh_sengayan:n47CrestedPartridge,paok_schneider:n47MountainPitta,
 katak_mutiara:n47TreeFrog,cecak_terbang:n47FlyingLizard,kadal_lidah_biru:n47BlueTongue,sanca_batik:n47ReticulatedPython,ular_terbang_surga:n47FlyingSnake,
 kerapu_macan:n47Grouper,pari_elang_totol:n47EagleRay,hiu_karang_hitam:n47BlacktipShark,kima_raksasa:n47GiantClam,bintang_laut_biru:n47BlueStarfish,ubur_ubur_totol:n47Jellyfish,ikan_gergaji_hijau:n47Sawfish,
 gatotkaca:n47Gatotkaca,bima_wayang:n47Bima,buto_cakil:n47Cakil
};

const nj46Sculptors={dingiso:n46Dingiso,musang_sulawesi:n46SulawesiCivet,babi_sulawesi:n46SulawesiPig,tupai_terbang_merah:n46FlyingSquirrel,rusa_sambar:n46Sambar,kucing_hutan_jawa:n46LeopardCat,kuskus_kelabu:n46GreyCuscus,celepuk_siau:n46SiauOwl,cendrawasih_wilson:n46Wilson,cendrawasih_raja:n46KingBird,elang_laut_putih:n46SeaEagle,bangau_tongtong:n46LesserAdjutant,penyu_belimbing:n46Leatherback,manta_oseanik:n46OceanManta,kuda_laut_kuda:n46SeahorseKuda,ikan_terbang:n46FlyingFish,moray_raksasa:n46Moray,lepu_batu:n46StoneFish,paus_sperma:n46SpermWhale,lumba_hidung_botol:n46Bottlenose,kupu_raja_brooke:n46BrookeBirdwing,dewi_sri:n46DewiSri,nyi_roro_kidul:n46RoroKidul,batara_kala:n46BataraKala,putri_mandalika:n46Mandalika};

const nj42Sculptors={
 bilou:n42Bilou,simakobu:n42Simakobu,joja_mentawai:n42Joja,bokkoi:n42Bokkoi,
 kucing_merah_kalimantan:n42BayCat,macan_dahan_sunda:n42Clouded,kambing_hutan_sumatra:n42Serow,kijang_muncak:n42Muntjac,
 mambruk_victoria:n42Mambruk,namdur_polos:n42Namdur,kakatua_putih:n42WhiteCockatoo,elang_bondol:n42ElangBondol,paok_pancawarna:n42Paok,
 coelacanth_sulawesi:n42Coelacanth,capungan_banggai:n42Banggai,penyu_sisik:n42Hawksbill,buntal_landak:n42PorcupineFish,ikan_kakatua:n42Parrotfish,
 kepiting_biola:n42FiddlerCrab,nudibranch:n42Nudibranch,teripang_nanas:n42SeaCucumber,udang_pistol:n42PistolShrimp,
 kobra_raja:n42KingCobra,buaya_papua:n42PapuanCroc,nenek_pakande:n42NenekPakande
};

const nj41Sculptors={
 orang_bati:nj41OrangBati,poppo:nj41Poppo,parakang:nj41Parakang,bedawang_nala:nj41Bedawang,boraspati_tano:nj41Boraspati,singa_barong_reog:nj41SingaBarong,bujang_ganong:nj41BujangGanong,hanoman:nj41Hanoman,makara_candi:nj41Makara,naga_padoha:nj41NagaPadoha,
 yaki:nj41Yaki,orangutan_tapanuli:nj41Tapanuli,badak_sumatra:nj41BadakSumatra,kelinci_belang:nj41KelinciBelang,anjing_kintamani:nj41Kintamani,kalong_besar:nj41Kalong,tikus_flores:nj41TikusFlores,raja_udang_meninting:nj41RajaUdang,bangau_bluwok:nj41Bangau,gosong_maluku:nj41Gosong,gurita_peniru:nj41GuritaPeniru,gurita_cincin_biru:nj41GuritaBiru,cumi_karang:nj41Cumi,ikan_mandarin:nj41Mandarin,ular_laut_belang:nj41UlarLaut
};

const nj40Sculptors={
 gelatik_jawa:nj40Gelatik,julang_sulawesi:nj40Julang,beo_nias:nj40BeoNias,kakatua_maluku:nj40KakatuaMaluku,ayam_hutan_hijau:nj40AyamHutan,bidadari_hal:nj40Bidadari,serak_jawa:nj40SerakJawa,landak_jawa:nj40Landak,musang_air:nj40MusangAir,kuskus_tutul:nj40KuskusTutul,kuda_laut_kerdil:nj40KudaLaut,hiu_berjalan_hal:nj40HiuJalan,udang_mantis:nj40MantisShrimp,ketam_kenari:nj40KetamKenari,belangkas:nj40Belangkas,labi_moncong_babi:nj40LabiPapua,sanca_hijau:nj40SancaHijau,kobra_jawa:nj40KobraJawa,bunglon_surai:nj40Bunglon,katak_terbang:nj40KatakTerbang,kodok_merah:nj40KodokMerah,tuntong_laut:nj40Tuntong,paruh_kodok:nj40ParuhKodok,warak_ngendog:nj40Warak,jatayu:nj40Jatayu
};

const nj39Sculptors={
 beruang_madu:s39SunBear,tapir_asia:s39Tapir,lutung_jawa:s39Lutung,siamang:s39Siamang,kuskus_beruang:s39Cuscus,pesut_mahakam:s39Pesut,
 rangkong_gading:s39HelmetHornbill,kakatua_jambul_kuning:s39YellowCockatoo,walabi_papua:s39Wallaby,kanguru_pohon_kelabu:s39TreeKangaroo,
 kura_rote:s39RoteTurtle,buaya_muara:s39Crocodile,elang_flores:s39FloresEagle,ikan_belida:s39Knifefish,mola_mola:s39Sunfish,
 hiu_paus:s39WhaleShark,pari_totol_biru:s39BlueSpotRay,bekisar:s39Bekisar,kupu_raja:s39BirdwingButterfly,kumbang_atlas:s39AtlasBeetle,
 biawak_biru:s39BlueMonitor,musang_pandan:s39Civet,rusa_timor:s39TimorDeer,ikan_badut:s39Clownfish,cindaku:s39Cindaku
};


// 5.0: individual species silhouettes for the six provisional 4.9 fauna.
function nj50BearCuscus(g,M){n46GreyCuscus(g,M);ell(g,0,1.09,-.1,.76,.72,.57,M.main);ell(g,0,1.78,.43,.52,.47,.44,M.main);for(const x of [-.42,.42])ell(g,x,2.09,.36,.18,.19,.12,M.dark);}
function nj50FlatCat(g,M){n46LeopardCat(g,M);ell(g,0,1.30,.88,.40,.19,.42,M.main);ell(g,0,1.27,1.15,.34,.13,.22,M.light);for(const x of [-.22,.22])ell(g,x,1.43,1.12,.08,.065,.055,M.gold);}
function nj50BayCat(g,M){n46LeopardCat(g,M);ell(g,0,.9,.01,.55,.44,.9,M.main);ell(g,0,1.34,.79,.38,.31,.39,M.main);for(const x of [-.18,.18])ell(g,x,1.43,1.11,.08,.065,.04,M.gold);}
function nj50TalaudCuscus(g,M){n46GreyCuscus(g,M);ell(g,0,1.75,.4,.47,.45,.39,M.dark);ell(g,0,1.59,.73,.34,.27,.15,M.light);for(const x of [-.44,.44])ell(g,x,1.94,.36,.16,.19,.11,M.black);}
function nj50SangiheTarsier(g,M){nj37Tarsier(g,M);ell(g,0,1.7,.48,.42,.35,.34,M.main);for(const x of [-.19,.19]){ell(g,x,1.76,.78,.16,.18,.08,M.gold);ell(g,x,1.76,.86,.065,.09,.04,M.black);}}
function nj50Budeng(g,M){nj37Gibbon(g,M,false);ell(g,0,1.78,.42,.41,.39,.35,M.dark);for(const x of [-.2,.2])ell(g,x,1.83,.72,.09,.07,.04,M.gold);ell(g,0,1.58,.75,.16,.11,.09,M.black);}
// v5.1 — island cuscus variants: six identity-specific procedural silhouettes.
function nj51IslandCuscus(g,M,variant){
 n46GreyCuscus(g,M);
 const sizes=[[.44,.43,.39],[.48,.46,.43],[.43,.43,.42],[.45,.47,.40],[.55,.48,.46],[.46,.45,.40]];
 const [rx,ry,rz]=sizes[variant];
 ell(g,0,1.74,.45,rx,ry,rz,M.main);
 for(const x of [-.23,.23])ell(g,x,1.82,.78,.10,.095,.065,variant===2?M.gold:M.dark);
 if(variant===2){for(const x of [-.23,.23])ell(g,x,1.82,.85,.055,.055,.034,M.light);}
 if(variant===4||variant===5){for(const x of [-.34,.34])ell(g,x,1.98,.39,.13,.16,.10,M.dark);ell(g,0,1.49,.82,.25,.19,.10,M.light);}
 if(variant===0||variant===3)ell(g,0,2.13,.26,.24,.10,.13,M.dark);
}
const nj51Sculptors={kuskus_peleng:(g,M)=>nj51IslandCuscus(g,M,0),kuskus_obi:(g,M)=>nj51IslandCuscus(g,M,1),kuskus_matabiru:(g,M)=>nj51IslandCuscus(g,M,2),kuskus_gebe:(g,M)=>nj51IslandCuscus(g,M,3),kuskus_bohai:(g,M)=>nj51IslandCuscus(g,M,4),kuskus_schamscham:(g,M)=>nj51IslandCuscus(g,M,5)};
NJ36_PROFILES["kuskus_peleng"]=["Pulau Peleng, Sulawesi Tengah","Strigocuscus pelengensis — kuskus pulau dengan bentuk wajah dan pola warna khas; representasi 3D merupakan interpretasi prosedural, bukan rekonstruksi anatomi ilmiah."];NJ39_SOURCES["kuskus_peleng"]="https://bbksdasulsel.ksdae.kehutanan.go.id/daftar-satwa-mamalia-dilindungi-indonesia-permen-202018-menteri-lhk";
NJ36_PROFILES["kuskus_obi"]=["Pulau Obi, Maluku Utara","Phalanger rothschildi — kuskus pulau dengan bentuk wajah dan pola warna khas; representasi 3D merupakan interpretasi prosedural, bukan rekonstruksi anatomi ilmiah."];NJ39_SOURCES["kuskus_obi"]="https://bbksdasulsel.ksdae.kehutanan.go.id/daftar-satwa-mamalia-dilindungi-indonesia-permen-202018-menteri-lhk";
NJ36_PROFILES["kuskus_matabiru"]=["Maluku Utara","Phalanger matabiru — kuskus pulau dengan bentuk wajah dan pola warna khas; representasi 3D merupakan interpretasi prosedural, bukan rekonstruksi anatomi ilmiah."];NJ39_SOURCES["kuskus_matabiru"]="https://bbksdasulsel.ksdae.kehutanan.go.id/daftar-satwa-mamalia-dilindungi-indonesia-permen-202018-menteri-lhk";
NJ36_PROFILES["kuskus_gebe"]=["Pulau Gebe, Maluku Utara","Phalanger alexandrae — kuskus pulau dengan bentuk wajah dan pola warna khas; representasi 3D merupakan interpretasi prosedural, bukan rekonstruksi anatomi ilmiah."];NJ39_SOURCES["kuskus_gebe"]="https://bbksdasulsel.ksdae.kehutanan.go.id/daftar-satwa-mamalia-dilindungi-indonesia-permen-202018-menteri-lhk";
NJ36_PROFILES["kuskus_bohai"]=["Papua","Spilocuscus rufoniger — kuskus pulau dengan bentuk wajah dan pola warna khas; representasi 3D merupakan interpretasi prosedural, bukan rekonstruksi anatomi ilmiah."];NJ39_SOURCES["kuskus_bohai"]="https://bbksdasulsel.ksdae.kehutanan.go.id/daftar-satwa-mamalia-dilindungi-indonesia-permen-202018-menteri-lhk";
NJ36_PROFILES["kuskus_schamscham"]=["Waigeo, Papua Barat Daya","Spilocuscus papuensis — kuskus pulau dengan bentuk wajah dan pola warna khas; representasi 3D merupakan interpretasi prosedural, bukan rekonstruksi anatomi ilmiah."];NJ39_SOURCES["kuskus_schamscham"]="https://bbksdasulsel.ksdae.kehutanan.go.id/daftar-satwa-mamalia-dilindungi-indonesia-permen-202018-menteri-lhk";
const nj50Sculptors={kuskus_beruang_sulawesi:nj50BearCuscus,kucing_tandang:nj50FlatCat,kucing_merah_borneo:nj50BayCat,kuskus_talaud:nj50TalaudCuscus,krabuku_sangihe:nj50SangiheTarsier,lutung_budeng:nj50Budeng};


/* NUSAJIWA 5.2 — eight new species; game-style procedural model */
const nj52Sculptors={
 kukang_jawa:(g,M)=>{nj37Tarsier(g,M);ell(g,0,1.8,.79,.33,.18,.12,M.light);},
 anoa_gunung:(g,M)=>{bovine(g,M,"anoa");},
 kangkareng_sulawesi:(g,M)=>{nj37Bird(g,M,"hornbill");},
 kukang_sumatra:(g,M)=>{nj37Tarsier(g,M);ell(g,0,1.8,.79,.33,.18,.12,M.light);},
 kucing_emas:(g,M)=>{n46LeopardCat(g,M);ell(g,0,1.35,.78,.22,.12,.12,M.light);},
 beruk_mentawai:(g,M)=>{nj37Gibbon(g,M,false);},
 berang_gunung:(g,M)=>{n46SulawesiCivet(g,M);},
 kucing_batu:(g,M)=>{n46LeopardCat(g,M);ell(g,0,1.35,.78,.22,.12,.12,M.light);},
};
NJ36_PROFILES["kukang_jawa"]=["Jawa","Nycticebus javanicus — Primata nokturnal bermata besar dengan garis wajah kontras; berbeda dari tarsius. Model 3D adalah interpretasi artistik."];NJ39_SOURCES["kukang_jawa"]="https://doi.org/10.2305/IUCN.UK.2020-2.RLTS.T39761A205911512.en";
NJ36_PROFILES["anoa_gunung"]=["Sulawesi","Bubalus quarlesi — Kerbau liar kecil hutan pegunungan Sulawesi, tanduk pendek lurus. Model 3D adalah interpretasi artistik."];NJ39_SOURCES["anoa_gunung"]="https://doi.org/10.2305/IUCN.UK.2016-2.RLTS.T3128A46364433.en";
NJ36_PROFILES["kangkareng_sulawesi"]=["Sulawesi","Rhabdotorrhinus exarhatus — Rangkong kecil berbulu hitam dengan paruh melengkung dan balung kecil. Model 3D adalah interpretasi artistik."];NJ39_SOURCES["kangkareng_sulawesi"]="https://doi.org/10.2305/IUCN.UK.2022-1.RLTS.T22682504A210091404.en";
NJ36_PROFILES["kukang_sumatra"]=["Sumatra","Nycticebus coucang — Kukang nokturnal penghuni tajuk hutan Sumatra; tidak sama dengan kukang Jawa. Model 3D adalah interpretasi artistik."];NJ39_SOURCES["kukang_sumatra"]="https://bbksdasulsel.ksdae.kehutanan.go.id/daftar-satwa-mamalia-dilindungi-indonesia-permen-202018-menteri-lhk";
NJ36_PROFILES["kucing_emas"]=["Sumatra","Catopuma temminckii — Kucing liar hutan dengan tubuh panjang, bulu bervariasi cokelat emas hingga gelap. Model 3D adalah interpretasi artistik."];NJ39_SOURCES["kucing_emas"]="https://bbksdasulsel.ksdae.kehutanan.go.id/daftar-satwa-mamalia-dilindungi-indonesia-permen-202018-menteri-lhk";
NJ36_PROFILES["beruk_mentawai"]=["Kepulauan Mentawai","Macaca pagensis — Monyet endemik Kepulauan Mentawai dengan ekor dan moncong khas makaka. Model 3D adalah interpretasi artistik."];NJ39_SOURCES["beruk_mentawai"]="https://bbksdasulsel.ksdae.kehutanan.go.id/daftar-satwa-mamalia-dilindungi-indonesia-permen-202018-menteri-lhk";
NJ36_PROFILES["berang_gunung"]=["Sumatra","Lutra sumatrana — Berang-berang berhidung berbulu, bertubuh ramping dan berselaput kaki. Model 3D adalah interpretasi artistik."];NJ39_SOURCES["berang_gunung"]="https://bbksdasulsel.ksdae.kehutanan.go.id/daftar-satwa-mamalia-dilindungi-indonesia-permen-202018-menteri-lhk";
NJ36_PROFILES["kucing_batu"]=["Sumatra dan Kalimantan","Pardofelis marmorata — Kucing liar bermotif marmer dengan ekor panjang untuk keseimbangan. Model 3D adalah interpretasi artistik."];NJ39_SOURCES["kucing_batu"]="https://bbksdasulsel.ksdae.kehutanan.go.id/daftar-satwa-mamalia-dilindungi-indonesia-permen-202018-menteri-lhk";


/* NUSAJIWA 5.3: six distinct species, procedural cuscus variants */
const nj53Sculptors={
 kuskus_tembung:(g,M)=>{nj51IslandCuscus(g,M,0);ell(g,0,2.03,.63,.18,.11,.09,M.light);},
 kuskus_yaben:(g,M)=>{nj51IslandCuscus(g,M,1);ell(g,0,1.14,.75,.22,.12,.09,M.dark);},
 kuskus_siku_putih:(g,M)=>{nj51IslandCuscus(g,M,2);ell(g,0,2.03,.63,.18,.11,.09,M.light);},
 kuskus_gunung:(g,M)=>{nj51IslandCuscus(g,M,3);ell(g,0,1.14,.75,.22,.12,.09,M.dark);},
 kuskus_selatan:(g,M)=>{nj51IslandCuscus(g,M,4);ell(g,0,2.03,.63,.18,.11,.09,M.light);},
 kuskus_pontai:(g,M)=>{nj51IslandCuscus(g,M,5);ell(g,0,1.14,.75,.22,.12,.09,M.dark);},
};
NJ36_PROFILES["kuskus_tembung"]=["Sulawesi","Strigocuscus celebensis — Kuskus kerdil penghuni pepohonan Sulawesi; berbeda dari kuskus beruang. Model artistik prosedural; profil awal belum audit lengkap."];NJ39_SOURCES["kuskus_tembung"]="https://bbksdasulsel.ksdae.kehutanan.go.id/daftar-satwa-mamalia-dilindungi-indonesia-permen-202018-menteri-lhk";
NJ36_PROFILES["kuskus_yaben"]=["Papua","Phalanger sericeus — Kuskus berbulu halus yang hidup di kawasan pegunungan Papua. Model artistik prosedural; profil awal belum audit lengkap."];NJ39_SOURCES["kuskus_yaben"]="https://bbksdasulsel.ksdae.kehutanan.go.id/daftar-satwa-mamalia-dilindungi-indonesia-permen-202018-menteri-lhk";
NJ36_PROFILES["kuskus_siku_putih"]=["Papua","Phalanger vestitus — Kuskus pohon dengan ciri rambut pucat di bagian siku. Model artistik prosedural; profil awal belum audit lengkap."];NJ39_SOURCES["kuskus_siku_putih"]="https://bbksdasulsel.ksdae.kehutanan.go.id/daftar-satwa-mamalia-dilindungi-indonesia-permen-202018-menteri-lhk";
NJ36_PROFILES["kuskus_gunung"]=["Papua","Phalanger carmelitae — Kuskus penghuni kawasan hutan pegunungan Papua. Model artistik prosedural; profil awal belum audit lengkap."];NJ39_SOURCES["kuskus_gunung"]="https://bbksdasulsel.ksdae.kehutanan.go.id/daftar-satwa-mamalia-dilindungi-indonesia-permen-202018-menteri-lhk";
NJ36_PROFILES["kuskus_selatan"]=["Papua","Phalanger intercastellanus — Kuskus pohon Papua bagian selatan; identitas spesies berbeda dari kuskus lainnya. Model artistik prosedural; profil awal belum audit lengkap."];NJ39_SOURCES["kuskus_selatan"]="https://bbksdasulsel.ksdae.kehutanan.go.id/daftar-satwa-mamalia-dilindungi-indonesia-permen-202018-menteri-lhk";
NJ36_PROFILES["kuskus_pontai"]=["Papua","Spilocuscus maculatus — Kuskus bertotol dengan ekor mencengkeram dahan. Model artistik prosedural; profil awal belum audit lengkap."];NJ39_SOURCES["kuskus_pontai"]="https://bbksdasulsel.ksdae.kehutanan.go.id/daftar-satwa-mamalia-dilindungi-indonesia-permen-202018-menteri-lhk";


/* NUSAJIWA 5.4 — eight new reptile/amphibian silhouettes, artistic rather than scientific reconstructions. */
function nj54Amphibian(g,M){ell(g,0,.55,0,.72,.34,.64,M.main);ell(g,0,.74,.48,.52,.31,.45,M.main);for(const x of [-.34,.34]){ell(g,x,.83,.77,.16,.17,.16,M.gold);ell(g,x,.85,.91,.08,.09,.07,M.eye);for(const z of [-.48,.42]){cylinder(g,x*.8,.43,z,x*1.35,.14,z+.25,.12,.08,M.main);ell(g,x*1.42,.13,z+.34,.19,.06,.19,M.light)}}for(let i=0;i<7;i++)ell(g,Math.sin(i*2.4)*.39,.81,Math.cos(i*2.4)*.35,.10,.055,.11,M.dark)}
function nj54Monitor(g,M){lizard(g,M);ell(g,0,.83,.10,.65,.31,.93,M.main);tube(g,[[0,.77,-.6],[0,.62,-1.2],[.12,.42,-1.9],[.17,.26,-2.4]],.13,M.dark);ell(g,0,1.01,.95,.30,.16,.43,M.main)}
function nj54Turtle(g,M,variant){nj37Turtle(g,M);if(variant==='pig'){ell(g,0,.97,.85,.26,.19,.35,M.light);ell(g,0,.97,1.14,.18,.12,.14,M.pink);for(const x of [-.09,.09])ell(g,x,1.01,1.26,.033,.028,.02,M.dark)}if(variant==='snake'){tube(g,[[0,.78,.52],[0,.95,.9],[0,1.2,1.3],[0,1.34,1.57]],.13,M.main);ell(g,0,1.33,1.64,.25,.13,.24,M.main);eyes(g,M,0,1.39,1.79,.16,.06)}if(variant==='flat'){ell(g,0,.89,-.04,.94,.22,1.06,M.main)}if(variant==='logger'){ell(g,0,1.06,.89,.39,.32,.42,M.main)}if(variant==='ridley'){ell(g,0,.99,0,.77,.33,.84,M.main)}}
const nj54Sculptors={
 kodok_merah:nj54Amphibian,biawak_togian:nj54Monitor,
 labi_moncong_babi_papua:(g,M)=>nj54Turtle(g,M,'pig'),
 kura_leher_ular_rote:(g,M)=>nj54Turtle(g,M,'snake'),
 kura_papua_leher_panjang:(g,M)=>nj54Turtle(g,M,'snake'),
 penyu_tempayan:(g,M)=>nj54Turtle(g,M,'logger'),
 penyu_lekang:(g,M)=>nj54Turtle(g,M,'ridley'),
 penyu_pipih:(g,M)=>nj54Turtle(g,M,'flat')
};
NJ36_PROFILES["kodok_merah"]=["Jawa","Leptophryne cruentata — Kodok kecil penghuni aliran air pegunungan Jawa; pola merah-oranye merupakan penanda visual ilustratif. Ilustrasi 3D bersifat artistik; detail konservasi belum diaudit."];NJ39_SOURCES["kodok_merah"]="https://ksdasulsel.menlhk.go.id/post/120/daftar-satwa-dilindungi-amfibi-reptil-ikan-serangga-berdasarkan-permen-202018-menteri-lhk";
NJ36_PROFILES["biawak_togian"]=["Kepulauan Togean, Sulawesi","Varanus togianus — Biawak dari kawasan Kepulauan Togean, dengan badan panjang, ekor kuat, dan lidah bercabang. Ilustrasi 3D bersifat artistik; detail konservasi belum diaudit."];NJ39_SOURCES["biawak_togian"]="https://ksdasulsel.menlhk.go.id/post/120/daftar-satwa-dilindungi-amfibi-reptil-ikan-serangga-berdasarkan-permen-202018-menteri-lhk";
NJ36_PROFILES["labi_moncong_babi_papua"]=["Papua","Carettochelys insculpta — Kura-kura air tawar dengan moncong menyerupai hidung babi dan kaki menyerupai sirip. Ilustrasi 3D bersifat artistik; detail konservasi belum diaudit."];NJ39_SOURCES["labi_moncong_babi_papua"]="https://ksdasulsel.menlhk.go.id/post/120/daftar-satwa-dilindungi-amfibi-reptil-ikan-serangga-berdasarkan-permen-202018-menteri-lhk";
NJ36_PROFILES["kura_leher_ular_rote"]=["Pulau Rote, Nusa Tenggara Timur","Chelodina mccordii — Kura-kura air tawar berleher panjang dari Pulau Rote; terancam oleh pengambilan satwa dan perubahan habitat. Ilustrasi 3D bersifat artistik; detail konservasi belum diaudit."];NJ39_SOURCES["kura_leher_ular_rote"]="https://ksdasulsel.menlhk.go.id/post/120/daftar-satwa-dilindungi-amfibi-reptil-ikan-serangga-berdasarkan-permen-202018-menteri-lhk";
NJ36_PROFILES["kura_papua_leher_panjang"]=["Papua","Chelodina novaeguineae — Kura-kura air tawar Papua dengan leher memanjang dan tempurung pipih. Ilustrasi 3D bersifat artistik; detail konservasi belum diaudit."];NJ39_SOURCES["kura_papua_leher_panjang"]="https://ksdasulsel.menlhk.go.id/post/120/daftar-satwa-dilindungi-amfibi-reptil-ikan-serangga-berdasarkan-permen-202018-menteri-lhk";
NJ36_PROFILES["penyu_tempayan"]=["Perairan Indonesia","Caretta caretta — Penyu laut berkepala relatif besar dengan rahang kuat; disebut juga loggerhead turtle. Ilustrasi 3D bersifat artistik; detail konservasi belum diaudit."];NJ39_SOURCES["penyu_tempayan"]="https://ksdasulsel.menlhk.go.id/post/120/daftar-satwa-dilindungi-amfibi-reptil-ikan-serangga-berdasarkan-permen-202018-menteri-lhk";
NJ36_PROFILES["penyu_lekang"]=["Perairan Indonesia","Lepidochelys olivacea — Penyu laut bertempurung relatif membulat, berukuran lebih kecil daripada penyu belimbing. Ilustrasi 3D bersifat artistik; detail konservasi belum diaudit."];NJ39_SOURCES["penyu_lekang"]="https://ksdasulsel.menlhk.go.id/post/120/daftar-satwa-dilindungi-amfibi-reptil-ikan-serangga-berdasarkan-permen-202018-menteri-lhk";
NJ36_PROFILES["penyu_pipih"]=["Perairan sekitar Papua dan Australia","Natator depressus — Penyu laut bercangkang rendah dan pipih, banyak ditemukan di kawasan paparan Australia dan Papua. Ilustrasi 3D bersifat artistik; detail konservasi belum diaudit."];NJ39_SOURCES["penyu_pipih"]="https://ksdasulsel.menlhk.go.id/post/120/daftar-satwa-dilindungi-amfibi-reptil-ikan-serangga-berdasarkan-permen-202018-menteri-lhk";


/* NUSAJIWA 5.6: eight distinct storytelling identities. These are artistic game interpretations. */
const NJ56_IDS=new Set(["si_manis_jembatan_ancol", "hantu_jeruk_purut", "orang_pendek", "dewi_lanjar", "jaka_tarub", "nawang_wulan", "timun_mas", "keong_mas"]);
function nj56Specter(g,M){ell(g,0,1.22,0,.51,.92,.32,M.light);ell(g,0,2.18,.10,.38,.43,.34,M.main);for(let i=0;i<9;i++)tube(g,[[Math.sin(i*2.4)*.18,2.36,.1],[Math.sin(i*2.4)*.32,1.55,.13],[Math.sin(i*2.4)*.44,.54,.16]],.025,M.dark);ell(g,-.13,2.23,.41,.065,.08,.03,M.eye);ell(g,.13,2.23,.41,.065,.08,.03,M.eye)}
function nj56Forest(g,M){ell(g,0,.96,0,.56,.8,.40,M.main);ell(g,0,1.84,.24,.48,.45,.40,M.main);for(let x of [-1,1]){ell(g,x*.54,1.15,.1,.18,.64,.18,M.dark);ell(g,x*.3,.3,0,.22,.37,.25,M.main)}eyes(g,M,0,1.88,.58,.2,.06);ell(g,0,1.65,.60,.24,.15,.18,M.light)}
function nj56Queen(g,M){ell(g,0,.96,0,.68,1.03,.46,M.main);ell(g,0,2.13,.14,.38,.40,.34,M.light);for(let i=-2;i<=2;i++)ell(g,i*.13,2.62,.08,.075,.29,.08,M.gold);for(let x of [-1,1]){ell(g,x*.7,1.37,0,.18,.66,.18,M.light);ell(g,x*.27,2.18,.45,.065,.06,.04,M.eye)}ell(g,0,1.75,.5,.24,.12,.08,M.gold)}
function nj56Hero(g,M){ell(g,0,1.12,0,.55,.73,.34,M.main);ell(g,0,2.01,.16,.37,.38,.35,M.light);for(let x of [-1,1]){ell(g,x*.70,1.27,0,.18,.62,.18,M.main);ell(g,x*.25,.36,0,.21,.42,.21,M.dark)}eyes(g,M,0,2.06,.51,.16,.05);ell(g,0,1.1,.36,.53,.10,.08,M.gold)}
function nj56Shell(g,M){ell(g,0,.62,0,.95,.68,.65,M.gold);for(let i=0;i<7;i++)tube(g,[[0,.97,0],[Math.sin(i*.9)*.44,.85,Math.cos(i*.9)*.33],[Math.sin(i*.9)*.8,.52,Math.cos(i*.9)*.58]],.035,M.dark);ell(g,0,1.1,.54,.22,.20,.20,M.light);eyes(g,M,0,1.18,.74,.11,.035)}
const NJ56_SCULPTORS={si_manis_jembatan_ancol:nj56Specter,hantu_jeruk_purut:nj56Specter,orang_pendek:nj56Forest,dewi_lanjar:nj56Queen,jaka_tarub:nj56Hero,nawang_wulan:nj56Queen,timun_mas:nj56Hero,keong_mas:nj56Shell};
NJ36_PROFILES["si_manis_jembatan_ancol"]=["Jakarta","Cerita hantu urban Jakarta yang berkembang melalui kisah lisan dan adaptasi populer." + "Visual merupakan interpretasi artistik; profil folklor awal, belum diverifikasi terhadap sumber primer."];
NJ36_PROFILES["hantu_jeruk_purut"]=["Jakarta","Legenda urban Jakarta yang dikaitkan dengan kawasan Jeruk Purut; bukan klaim kejadian nyata." + "Visual merupakan interpretasi artistik; profil folklor awal, belum diverifikasi terhadap sumber primer."];
NJ36_PROFILES["orang_pendek"]=["Kerinci, Sumatra","Kisah makhluk pendek penghuni hutan Sumatra; keberadaannya belum dibuktikan secara zoologis." + "Visual merupakan interpretasi artistik; profil folklor awal, belum diverifikasi terhadap sumber primer."];
NJ36_PROFILES["dewi_lanjar"]=["Pekalongan, Jawa Tengah","Tokoh dalam tradisi cerita rakyat pesisir utara Jawa; penggambaran bervariasi." + "Visual merupakan interpretasi artistik; profil folklor awal, belum diverifikasi terhadap sumber primer."];
NJ36_PROFILES["jaka_tarub"]=["Jawa Tengah","Tokoh cerita rakyat Jaka Tarub dan tujuh bidadari." + "Visual merupakan interpretasi artistik; profil folklor awal, belum diverifikasi terhadap sumber primer."];
NJ36_PROFILES["nawang_wulan"]=["Tradisi Jawa","Tokoh bidadari dalam kisah Jaka Tarub; interpretasi visual bersifat artistik." + "Visual merupakan interpretasi artistik; profil folklor awal, belum diverifikasi terhadap sumber primer."];
NJ36_PROFILES["timun_mas"]=["Jawa Tengah","Tokoh perempuan dalam cerita rakyat Timun Mas dan raksasa pengejarnya." + "Visual merupakan interpretasi artistik; profil folklor awal, belum diverifikasi terhadap sumber primer."];
NJ36_PROFILES["keong_mas"]=["Jawa Timur","Tokoh putri dalam kisah Keong Mas yang mengalami perubahan wujud." + "Visual merupakan interpretasi artistik; profil folklor awal, belum diverifikasi terhadap sumber primer."];


/* NUSAJIWA 6.7 — forty-four explicit bird identities; stylized anatomical families.
   Editorial colors and silhouettes are art direction, not field-guide accuracy claims.
   Prevents new 'bird' / 'kingfisher' entries from falling through to humanoid(). */
const NJ67_BIRD_DESIGNS={
 "rangkong_papan":["hornbill", "#232725", "#e5dfc8", "#e4bd64", "#aa7142"],
 "julang_emas":["hornbill", "#292622", "#d8b361", "#edc879", "#9b5235"],
 "enggang_klihingan":["hornbill", "#282a29", "#d6d4c9", "#e2b96c", "#ad6048"],
 "kangkareng_hitam":["hornbill", "#202323", "#b3b4a7", "#d8c57e", "#a76c48"],
 "pelatuk_ayam":["woodpecker", "#332b2a", "#c54a37", "#e0c5a0", "#6d4b3a"],
 "pelatuk_kuduk_kuning":["woodpecker", "#3d3930", "#e3c34c", "#f1e2b5", "#a16c43"],
 "burung_gosong_maluku":["megapode", "#42362f", "#8c5a43", "#d7ad73", "#bd6c57"],
 "sempidan_biru":["pheasant", "#253c50", "#477c94", "#d0c7ad", "#a75b4c"],
 "sempidan_sumatra":["pheasant", "#493a37", "#b58a67", "#e3caa3", "#704a44"],
 "poksai_jambul":["passerine", "#786b53", "#d1bc8b", "#bba47d", "#4c4336"],
 "ciung_batu_sumatra":["passerine", "#303f4c", "#617f8d", "#bcb7a0", "#4b5159"],
 "cica_daun_besar":["passerine", "#477c45", "#9cbf57", "#a6a069", "#d3b76a"],
 "takur_tenggeret":["barbet", "#4d7651", "#b8a14d", "#b9aa7b", "#d55d42"],
 "takur_ungkut_ungkut":["barbet", "#518259", "#e1b95b", "#c7ae6c", "#b84f43"],
 "kedasi_hitam":["passerine", "#303333", "#747b77", "#c5bda8", "#50534b"],
 "cekakak_sungai":["kingfisher", "#377d8d", "#d5a16c", "#3e555f", "#f4d8aa"],
 "raja_udang_biru":["kingfisher", "#286d9c", "#d7a36c", "#26394e", "#f2e5cf"],
 "cekakak_jawa":["kingfisher", "#427e9b", "#b78b69", "#4a3b35", "#e6d6b5"],
 "burung_madu_sepah_raja":["sunbird", "#554e3b", "#c44f43", "#282f32", "#d8b96a"],
 "burung_madu_kelapa":["sunbird", "#777247", "#b6a754", "#353a37", "#d5c6a5"],
 "cipoh_kacat":["passerine", "#657a3f", "#d4cc7e", "#b4a46a", "#3d493c"],
 "merbah_cerukcuk":["passerine", "#766f56", "#d7c5a2", "#9c9072", "#3d413e"],
 "cucak_kutilang":["passerine", "#4a5147", "#b0a58b", "#a79c81", "#222c30"],
 "cucak_rawa":["passerine", "#716d4b", "#c0b98b", "#a6a184", "#383c33"],
 "trulek_jawa":["wader", "#74654f", "#d5bda0", "#5b5248", "#e0b66d"],
 "belibis_kembang":["waterfowl", "#8b614a", "#c7a477", "#777366", "#d9a26c"],
 "itik_benjut":["waterfowl", "#686d61", "#b6b5a0", "#79776d", "#d5a26a"],
 "mandar_besar":["rail", "#393d3b", "#9a9990", "#bd9e79", "#b65e4e"],
 "ayam_hutan_merah":["junglefowl", "#7d4332", "#c68644", "#bfa476", "#b24b34"],
 "kakatua_koki":["cockatoo", "#e9e2cc", "#e3c75c", "#a7a69b", "#f2d56c"],
 "nuri_kepala_hitam":["parrot", "#35784b", "#bb523f", "#43464a", "#e0b65e"],
 "nuri_pelangi":["parrot", "#477d48", "#4c77b1", "#d3a05b", "#d86c49"],
 "perkici_pelangi":["parrot", "#4d8b62", "#3b79a4", "#d2a65b", "#c65b43"],
 "kasturi_ternate":["parrot", "#8c3e42", "#6c4e89", "#b8a05e", "#d0a65c"],
 "kasturi_raja":["parrot", "#ae3f3e", "#664c72", "#a99762", "#d0a562"],
 "betet_biasa":["parrot", "#65964e", "#86ae5e", "#d1a26b", "#c14e44"],
 "serindit_melayu":["parrot", "#6d9b55", "#8abf66", "#c7a36a", "#cf6856"],
 "serindit_sulawesi":["parrot", "#629a56", "#89b963", "#c8a46b", "#c54f4a"],
 "nuri_tanimbar":["parrot", "#b64b4b", "#5d6194", "#d1b57e", "#c76d4c"],
 "nuri_maluku":["parrot", "#b74444", "#725a82", "#d0aa63", "#cb7050"],
 "merpati_mahkota_biru":["crownedpigeon", "#4b6f8e", "#7a99b6", "#393e4d", "#b4a7a5"],
 "burung_madu_sriganti":["sunbird", "#77814b", "#d6c45e", "#373e38", "#b8a66c"],
 "kepodang_kuduk_hitam":["passerine", "#dfba53", "#252d2f", "#c6a06b", "#292f32"],
 "kukabura_perut_merah":["kingfisher", "#5c7c89", "#b87d5d", "#464c52", "#e0c6a3"],
};
const NJ67_BIRD_FAMILIES=['hornbill','woodpecker','megapode','pheasant','passerine','barbet','kingfisher','sunbird','wader','waterfowl','rail','junglefowl','cockatoo','parrot','crownedpigeon'];
function nj67Bird(g,M,r){
 const [family,baseColor,accentColor,billColor,markColor]=NJ67_BIRD_DESIGNS[r[0]];
 const mat=(color,roughness=.82)=>new THREE.MeshStandardMaterial({color,roughness,side:THREE.DoubleSide});
 const plumage=mat(baseColor),accent=mat(accentColor),bill=mat(billColor,.58),mark=mat(markColor);
 const size=family==='sunbird'?.70:family==='barbet'?.79:family==='passerine'?.86:family==='kingfisher'?.91:family==='hornbill'?1.14:family==='crownedpigeon'?1.12:family==='pheasant'?1.06:1;
 g.scale.setScalar(size);
 const longLegs=['wader','rail'].includes(family),longTail=['pheasant','woodpecker','junglefowl'].includes(family);
 const roundBody=['waterfowl','megapode','junglefowl','pheasant','crownedpigeon'].includes(family);
 ell(g,0,.98,0,roundBody?.55:.44,roundBody?.57:.51,roundBody?.68:.56,plumage);
 ell(g,0,.98,.35,roundBody?.43:.34,.39,.33,accent);
 const neck=family==='wader'?.48:family==='hornbill'?.36:.27;
 ell(g,0,1.43,.34,.28,.30+neck*.28,.29,plumage);
 ell(g,0,1.58+neck*.27,.46,.34,.34,.32,plumage);
 // Each wing has its own transform for the existing Tamagotchi wing animation.
 for(const side of [-1,1]){
   const wing=new THREE.Group();wing.name=side<0?'wingL':'wingR';wing.position.set(side*.36,1.12,-.07);g.add(wing);
   ell(wing,side*.14,-.04,-.10,.25,.36,.20,plumage);
   for(let j=0;j<5;j++){
     const feather=ell(wing,side*(.18+j*.11),-.14-j*.065,-.10-j*.035,.12,.26+j*.035,.10,j%2?accent:plumage);
     feather.rotation.z=side*(.20+j*.13);
   }
   const ankle=longLegs?.52:.31;
   cylinder(g,side*.20,.67,.05,side*.24,ankle*.15,.14,.055,.040,mark);
   for(let t=-1;t<=1;t++)cylinder(g,side*.24,ankle*.15,.14,side*.24+t*.10,.04,.39,.029,.018,bill);
 }
 const headY=1.58+neck*.27;
 eyes(g,M,0,headY+.035,.74,.25,.068);
 // Bills are species-family silhouettes, not recolored human faces.
 if(family==='sunbird'){
   tube(g,[[0,headY-.10,.73],[0,headY-.18,1.00],[0,headY-.31,1.17]],.036,bill);
 }else if(family==='parrot'||family==='cockatoo'){
   ell(g,0,headY-.14,.82,.19,.20,.22,bill);
   tube(g,[[0,headY-.12,.96],[0,headY-.25,1.06],[0,headY-.34,1.01]],.057,bill);
 }else if(family==='waterfowl'){
   ell(g,0,headY-.11,.89,.24,.075,.35,bill);
 }else{
   const length=family==='hornbill'?.90:family==='kingfisher'?.84:family==='woodpecker'?.65:family==='wader'?.56:family==='barbet'?.40:.35;
   const radius=family==='hornbill'?.22:family==='kingfisher'?.115:.13;
   const beak=new THREE.Mesh(new THREE.ConeGeometry(radius,length,9),bill);
   beak.rotation.x=Math.PI/2;beak.position.set(0,headY-.13,.76+length*.40);beak.castShadow=true;g.add(beak);
 }
 if(family==='hornbill'){
   // Raised casque and massive bill: recognizably hornbill rather than passerine.
   const casque=ell(g,0,headY+.33,.72,.24,.18,.40,mark);casque.rotation.x=-.25;
   ell(g,0,headY+.16,.86,.21,.09,.29,bill);
 }
 if(family==='woodpecker'){
   for(let i=0;i<4;i++){const crest=ell(g,0,headY+.31+i*.045,.40-i*.11,.13,.15,.08,accent);crest.rotation.x=-.30;}
   for(const side of [-1,1])for(let j=0;j<3;j++)ell(g,side*.39,1.03-j*.13,.14,.07,.06,.10,mark);
 }
 if(family==='cockatoo'){
   for(let i=-2;i<=2;i++){const crest=ell(g,i*.095,headY+.40-Math.abs(i)*.05,.43,.08,.34-Math.abs(i)*.04,.09,accent);crest.rotation.z=-i*.18;}
 }
 if(family==='crownedpigeon'){
   for(let i=-5;i<=5;i++){
     const plume=ell(g,i*.063,headY+.44+Math.cos(i*.25)*.08,.43,.035,.30,.04,accent);
     plume.rotation.z=-i*.12;
     ell(g,i*.095,headY+.71-Math.abs(i)*.012,.43,.042,.055,.04,mark);
   }
 }
 if(['pheasant','junglefowl','megapode'].includes(family)){
   for(let i=-2;i<=2;i++){
     const comb=ell(g,i*.10,headY+.34,.36,.09,.18,.09,mark);comb.rotation.z=i*.15;
   }
 }
 if(family==='barbet'){
   ell(g,0,headY+.14,.54,.25,.12,.22,mark);
   ell(g,0,headY-.13,.79,.19,.09,.09,accent);
 }
 if(family==='kingfisher'){
   ell(g,0,headY+.22,.38,.28,.12,.26,accent);
   ell(g,0,1.08,.49,.24,.27,.22,mark);
 }
 if(family==='wader'||family==='rail')ell(g,0,headY+.18,.40,.20,.08,.15,mark);
 // Tail geometry makes waterfowl, passerines and long-tailed ground birds visibly distinct.
 const tailLength=longTail?1.15:family==='waterfowl'?.38:family==='kingfisher'?.52:.69;
 for(let i=-2;i<=2;i++){
   const feather=ell(g,i*.12,.76-(longTail?.08:0),-.49-tailLength*.46,.10,longTail?.13:.10,tailLength*.57,i%2?plumage:accent);
   feather.rotation.y=i*.11;feather.rotation.x=longTail?-.18:.14;
 }
 // Distinct species marking, deterministic; visual flourish only, not taxonomic evidence.
 const marker=[...r[0]].reduce((n,c)=>(n*33+c.charCodeAt(0))>>>0,5381);
 if(marker%3===0)for(let i=-1;i<=1;i++)ell(g,i*.15,1.04,.62,.055,.15,.035,mark);
 else if(marker%3===1)ell(g,0,headY+.13,.73,.12,.10,.04,accent);
 g.userData.nj67Family=family;
}
function nj67Hammerhead(g,M){
 // A horizontal cephalofoil is the essential hammerhead silhouette.
 ell(g,0,.95,0,.44,.35,1.33,M.main);ell(g,0,.88,.87,.32,.23,.51,M.light);
 ell(g,0,1.02,1.33,.94,.13,.24,M.main);
 for(const side of [-1,1]){
   ell(g,side*.89,1.03,1.33,.15,.12,.18,M.main);
   ell(g,side*.94,1.08,1.47,.075,.065,.05,M.eye);
   const fin=ell(g,side*.62,.87,-.21,.64,.065,.32,M.main);fin.rotation.z=side*.24;
 }
 const dorsal=new THREE.Mesh(new THREE.ConeGeometry(.26,.76,6),M.dark);dorsal.position.set(0,1.55,-.27);g.add(dorsal);
 cylinder(g,0,.94,-1.15,0,.95,-1.77,.20,.11,M.main);
 for(const side of [-1,1]){const lobe=ell(g,0,.95+side*.38,-1.87,.10,.47,.21,M.main);lobe.rotation.z=side*.23;}
}
function nj67Kancil(g,M){
 // Mouse-deer have small ungulate bodies, short legs and no antlers.
 ell(g,0,.89,-.12,.42,.36,.70,M.main);
 ell(g,0,.88,.29,.32,.29,.37,M.light);
 for(const side of [-1,1])for(const z of [-.53,.44]){
   cylinder(g,side*.29,.72,z,side*.32,.13,z+.03,.071,.048,M.main);
   ell(g,side*.32,.12,z+.07,.09,.09,.15,M.dark);
 }
 ell(g,0,1.21,.55,.24,.38,.25,M.main);
 ell(g,0,1.45,.75,.27,.23,.30,M.main);
 ell(g,0,1.31,1.01,.21,.12,.25,M.light);
 eyes(g,M,0,1.50,.99,.19,.053);
 for(const side of [-1,1]){const ear=ell(g,side*.27,1.69,.68,.13,.22,.10,M.main);ear.rotation.z=side*.34;}
 ell(g,0,.94,-.80,.12,.10,.21,M.dark);
}

// NUSAJIWA 6.8: source-constrained silhouettes; folklore depictions are interpretations, not zoological facts.
const NJ68_FOLKLORE={kuyang:{origin:'Kalimantan',traits:['kepala perempuan melayang','rambut panjang','organ menjuntai','tanpa badan'],sources:['https://www.detik.com/kalimantan/budaya/d-8344109/kenapa-kuyang-digambarkan-kepala-perempuan-terbang-bawa-organ-dalam','https://www.detik.com/kalimantan/budaya/d-8153640/kuyang-folklor-hantu-dari-kalimantan']},wewe:{origin:'Jawa',traits:['perempuan berambut panjang','payudara menjuntai','sosok pengasuh dalam cerita rakyat'],sources:['https://en.wikipedia.org/wiki/Wewe_Gombel']},rangda:{origin:'Bali',traits:['topeng bermata besar','taring','lidah panjang','rambut terurai'],sources:['https://travel.okezone.com/read/2023/06/01/406/2823663/apa-perbedaan-leak-celuluk-rarung-dan-rangda-berikut-penjelasannya']}};
function nj68Kuyang(g,M){
 ell(g,0,1.96,0,.43,.49,.37,M.main);ell(g,0,1.89,.34,.34,.32,.13,M.light);eyes(g,M,0,2.04,.39,.21,.085);
 ell(g,0,2.42,-.10,.48,.30,.37,M.black);
 for(let j=0;j<15;j++){let x=(j-7)*.065;tube(g,[[x,2.45,-.11],[x*1.3,1.98,-.19],[x*1.5,1.57-(j%4)*.09,-.13]],.035,M.black)}
 for(let j=0;j<7;j++){let a=j*2.399; tube(g,[[Math.sin(a)*.16,1.60,0],[Math.sin(a)*.25,1.13,Math.cos(a)*.18],[Math.sin(a+.8)*.33,.48+(j%3)*.13,Math.cos(a+.8)*.24]],.045+(j%2)*.018,j%2?M.pink:M.dark)}
 ell(g,-.19,1.25,.05,.22,.27,.16,M.dark);ell(g,.18,1.22,.06,.21,.29,.17,M.dark);ell(g,0,1.38,.18,.15,.17,.13,M.pink);
}
function nj68Wewe(g,M){humanoid(g,M,'wewe');for(let sx of [-1,1]){let breast=ell(g,sx*.22,1.28,.46,.20,.57,.19,M.light);breast.rotation.z=sx*.12;}for(let j=0;j<7;j++)tube(g,[[(j-3)*.095,2.5,.0],[(j-3)*.12,1.8,-.05],[(j-3)*.14,.77,-.07]],.038,M.black)}
function nj68Rangda(g,M){humanoid(g,M,'rangda');ell(g,0,2.19,.43,.45,.49,.18,M.white);for(let sx of [-1,1]){ell(g,sx*.21,2.31,.58,.15,.15,.065,M.gold);cylinder(g,sx*.17,2.04,.62,sx*.21,1.78,.70,.075,.015,M.white)}tube(g,[[0,2.03,.64],[0,1.82,.84],[.07,1.48,.79]],.085,M.pink);for(let j=0;j<14;j++){let x=(j-6.5)*.085;tube(g,[[x,2.58,-.08],[x*1.45,2.05,-.12],[x*1.8,1.15-(j%3)*.10,-.18]],.047,M.black)}}
// NUSAJIWA 6.9: separate folklore silhouettes, retaining original creature IDs and save format.
const NJ69_FOLKLORE={
 barong:{origin:'Bali',interpretation:'Barong Ket performance costume, not a biological lion',traits:['four legs','two-performer long textile body','carved expressive mask','ornamented mane'],sources:['https://www.maskmuseum.org/mask/bali-barong-ket/','https://ignca.gov.in/man-and-mask/masks/masks_detail/206.html']},
 banaspati:{origin:'Jawa',interpretation:'floating-fire variant; upside-down burning humanoid is an alternative telling',traits:['free-floating fire core','irregular flame tongues','no animal face'],sources:['https://ejournal.uinsaid.ac.id/shahih/article/download/5971/2231']},
 palasik:{origin:'Minangkabau',interpretation:'flying-head telling; other local accounts vary',traits:['disembodied head','trailing viscera','no torso'],sources:['https://id.scribd.com/document/950075008/Artikel-Fiks-Isp']}
};
function nj69Barong(g,M){
 // elongated, four-legged ceremonial figure; distinguish from tiger/cat avatar.
 ell(g,0,1.12,-.32,.69,.67,1.35,M.main);
 for(let side of [-1,1])for(let z of [-1.17,.62]){cylinder(g,side*.46,.95,z,side*.49,.17,z+.02,.17,.13,M.dark);ell(g,side*.49,.14,z+.02,.22,.12,.24,M.gold)}
 for(let j=0;j<9;j++)for(let side of [-1,1]){const z=-1.36+j*.27;const tassel=ell(g,side*(.56+(j%2)*.06),.66-(j%3)*.08,z,.12,.34,.13,j%3?M.light:M.gold);tassel.rotation.z=side*.24}
 ell(g,0,1.65,.91,.59,.53,.43,M.gold);ell(g,0,1.50,1.24,.48,.34,.24,M.white);
 eyes(g,M,0,1.77,1.29,.33,.13);
 for(let side of [-1,1]){ell(g,side*.44,1.96,.87,.22,.32,.17,M.dark);tube(g,[[side*.27,1.33,1.39],[side*.37,1.17,1.47]],.06,M.white)}
 for(let j=0;j<13;j++){let a=j*Math.PI*2/13;const x=Math.sin(a)*.62,y=1.72+Math.cos(a)*.56;ell(g,x,y,.83,.12,.24,.13,j%3?M.gold:M.light)}
 tube(g,[[0,1.25,-1.5],[.15,1.02,-1.83],[.09,.78,-1.96]],.12,M.gold);
}
function nj69Banaspati(g,M){
 ell(g,0,1.45,0,.50,.58,.48,M.glow);
 for(let i=0;i<21;i++){const a=i*2.399963;const rad=.39+(i%4)*.075;const x=Math.sin(a)*rad,y=1.45+Math.cos(a)*rad;
 const flame=new THREE.Mesh(new THREE.ConeGeometry(.12+(i%3)*.035,.48+(i%5)*.13,5),i%3?M.gold:M.main);flame.position.set(x,y,Math.sin(i*1.7)*.25);flame.rotation.z=-a;g.add(flame)}
}
function nj69Palasik(g,M){
 ell(g,0,1.98,0,.46,.48,.38,M.main);ell(g,0,2.39,-.08,.47,.25,.36,M.black);eyes(g,M,0,2.02,.38,.22,.08);
 for(let j=0;j<11;j++){const x=(j-5)*.075;tube(g,[[x,2.43,-.12],[x*1.3,2.02,-.16],[x*1.45,1.58-(j%3)*.07,-.17]],.032,M.black)}
 for(let j=0;j<8;j++){let a=j*Math.PI*2/8; tube(g,[[Math.cos(a)*.19,1.59,Math.sin(a)*.16],[Math.cos(a+.3)*.24,1.14,Math.sin(a+.3)*.23],[Math.cos(a+.7)*.33,.66+(j%3)*.10,Math.sin(a+.7)*.28]],.04,j%2?M.pink:M.dark)}
 ell(g,0,1.25,.07,.17,.25,.14,M.dark);
}
// 6.10: source-informed distinct silhouettes. Folklore interpretation, not a literal verified creature.
const NJ610_FOLKLORE={
 leak:{origin:'Bali',form:'Calonarang-inspired mask interpretation; not all leak share one body',sources:['https://www.detik.com/bali/budaya/d-6431649/asal-usul-leak-bali-dan-kisah-mistisnya']},
 genderuwo:{origin:'Jawa',form:'large, hairy humanoid; descriptions vary in oral accounts',sources:[]},
 jenglot:{origin:'Indonesia, modern popular folklore',form:'miniature desiccated figure, long hair and nails; not evidence of supernatural life',sources:['https://pmc.ncbi.nlm.nih.gov/articles/PMC3329137/','https://p2k.stekom.ac.id/ensiklopedia/Jenglot']},
 begu_ganjang:{origin:'Batak, Sumatra Utara',form:'extremely tall, elongated shadow-like spirit',sources:['https://p2k.stekom.ac.id/ensiklopedia/Begu_ganjang']}
};
function nj610Leak(g,M){
 // Visually distinct from Rangda: floating mask and transformation ribbons, not a duplicate queen mask.
 ell(g,0,1.83,0,.52,.61,.29,M.dark);ell(g,0,1.83,.23,.43,.49,.15,M.main);
 for(const side of [-1,1]){ell(g,side*.23,1.98,.38,.15,.17,.08,M.gold);cylinder(g,side*.22,1.62,.37,side*.27,1.34,.44,.065,.012,M.white);
 tube(g,[[side*.39,1.9,-.06],[side*.64,1.35,-.25],[side*.44,.79,-.34]],.07,M.black)}
 tube(g,[[0,1.67,.38],[0,1.36,.54],[.08,1.10,.48]],.06,M.pink);
 for(let j=0;j<7;j++){const a=j*2.399;tube(g,[[Math.cos(a)*.24,1.43,-.05],[Math.cos(a+.3)*.40,.95,Math.sin(a)*.28],[Math.cos(a+.7)*.61,.47,Math.sin(a+.7)*.43]],.045,j%2?M.gold:M.dark)}
}
function nj610Genderuwo(g,M){
 ell(g,0,1.18,0,.73,.98,.48,M.dark);ell(g,0,2.12,.12,.52,.54,.43,M.main);
 for(const side of [-1,1]){cylinder(g,side*.64,1.60,0,side*.89,.57,.10,.22,.13,M.dark);cylinder(g,side*.37,.60,0,side*.40,.08,.12,.26,.17,M.dark);
 for(let k=0;k<3;k++)tube(g,[[side*(.79+k*.06),.54,.16],[side*(.83+k*.07),.29,.32]],.032,M.white)}
 eyes(g,M,0,2.17,.49,.26,.08);
 for(let j=0;j<92;j++){const a=j*2.39996,y=.39+(j%13)*.16,x=Math.sin(a)*(.47+.15*(j%3)/2),z=Math.cos(a)*.43;
 const hair=ell(g,x,y,z,.055,.18,.055,j%4?M.black:M.main);hair.rotation.z=Math.sin(a)*.22}
}
function nj610Jenglot(g,M){
 // A compact specimen-like pose, not a full-sized roaming humanoid.
 g.scale.setScalar(.52);ell(g,0,1.01,0,.27,.55,.20,M.dark);ell(g,0,1.77,.12,.34,.41,.26,M.main);
 for(const side of [-1,1]){tube(g,[[side*.21,1.34,0],[side*.34,.99,.20],[side*.24,.70,.29]],.065,M.dark);
 tube(g,[[side*.16,.66,0],[side*.28,.29,.11]],.085,M.dark);
 for(let k=0;k<3;k++)tube(g,[[side*(.21+k*.045),.71,.29],[side*(.23+k*.06),.47,.37]],.016,M.white);
 cylinder(g,side*.10,1.57,.33,side*.13,1.42,.36,.045,.008,M.white)}
 for(let j=0;j<15;j++){const x=(j-7)*.052;tube(g,[[x,2.07,.02],[x*1.3,1.63,-.02],[x*1.6,.81-(j%4)*.12,-.08]],.025,M.black)}
}
function nj610Begu(g,M){
 // Tall, attenuated shadow rather than standard human scaled uniformly.
 ell(g,0,2.06,0,.27,1.68,.21,M.dark);ell(g,0,3.77,.02,.28,.43,.25,M.black);
 for(const side of [-1,1]){tube(g,[[side*.21,2.92,0],[side*.41,1.72,.02],[side*.50,.53,.10]],.075,M.dark);
 tube(g,[[side*.16,1.20,0],[side*.22,.57,.04],[side*.24,.03,.11]],.09,M.dark)}
 for(let j=0;j<12;j++){const x=(j-5.5)*.042;tube(g,[[x,4.05,0],[x*1.5,3.30,-.06],[x*1.6,2.54,-.10]],.027,M.black)}
 ell(g,-.11,3.78,.24,.045,.06,.025,M.glow);ell(g,.11,3.78,.24,.045,.06,.025,M.glow);
}

// NUSAJIWA 6.11 — source-informed individual silhouettes (Javanese folklore & wayang).
// Cultural descriptions are attributed; unrecorded decorative details are game interpretations.
const NJ611_FOLKLORE={
 buto_ijo:{name:'Buto Ijo',region:'Jawa',sourceTradition:'Timun Mas',confidence:'high for size and green skin; illustrative for facial features',canonical:['raksasa bertubuh besar','kulit hijau','bertenaga kuat'],creative:['detail wajah','pakaian sederhana'],sources:['https://garuda.kemdiktisaintek.go.id/documents/detail/2458110']},
 sundel_bolong:{name:'Sundel Bolong',region:'Jawa',sourceTradition:'folklor hantu perempuan',confidence:'common contemporary retelling; not a single original depiction',canonical:['sosok perempuan','rambut hitam panjang','busana putih panjang','lubang khas di punggung'],creative:['bentuk dan ukuran rongga','animasi rambut'],sources:['https://ejournal.undip.ac.id/index.php/nusa/article/view/82983/0','https://www.liputan6.com/regional/read/5997583/legenda-urban-mitos-sundel-bolong-sosok-hantu-wanita-nusantara-pendobrak-patriarki']},
 naga_antaboga:{name:'Sang Hyang Antaboga',region:'Jawa',sourceTradition:'wayang kulit, naga penyangga bumi',confidence:'high for serpent and crown; sculptural simplification',canonical:['naga/ular kosmik','bermahkota','berkaitan dengan dunia bawah dan bumi'],creative:['pola sisik','warna permata','gerak lilitan'],sources:['https://sonobudoyo.jogjaprov.go.id/id/tulisan/read/naga','https://artgallery.yale.edu/collections/objects/293407','https://www.ngv.vic.gov.au/explore/collection/work/146203/']}
};
NJ36_PROFILES.buto_ijo=['Cerita Timun Mas, Jawa','Raksasa besar berkulit hijau. Bentuk wajah dan busana adalah interpretasi permainan; kisah memiliki beragam versi.'];
NJ36_PROFILES.sundel_bolong=['Folklor Jawa','Perempuan berambut hitam panjang dan berpakaian putih; ciri pembeda ialah lubang di punggung yang biasanya tertutup rambut. Ditampilkan secara non-grafis.'];
NJ36_PROFILES.naga_antaboga=['Wayang Jawa — Saptapratala','Naga/ular kosmik bermahkota yang melambangkan bumi dan dunia bawah; berbeda dari Basuki (air) serta Taksaka (udara).'];
function nj611ButoIjo(g,M){
 // No invented horns, wings or fire: the most stable story traits are gigantic and green.
 ell(g,0,1.25,0,.83,.96,.54,M.main);ell(g,0,1.18,.44,.59,.65,.23,M.light);
 ell(g,0,2.32,.18,.63,.58,.53,M.main);ell(g,0,2.09,.58,.54,.30,.31,M.main);
 ell(g,0,1.93,.81,.42,.13,.16,M.dark);ell(g,0,2.47,.61,.16,.14,.12,M.main);
 for(const side of [-1,1]){
  ell(g,side*.30,2.38,.64,.16,.16,.085,M.light);ell(g,side*.30,2.39,.71,.082,.092,.04,M.eye);
  ell(g,side*.34,2.55,.62,.23,.095,.11,M.dark);
  ell(g,side*.57,2.36,-.03,.18,.25,.18,M.main);
  cylinder(g,side*.78,1.78,.04,side*.91,.84,.22,.27,.20,M.main);
  ell(g,side*.91,.72,.27,.26,.24,.22,M.main);
  for(let i=-1;i<=1;i++)tube(g,[[side*(.85+i*.065),.63,.39],[side*(.88+i*.065),.45,.56]],.035,M.white);
  cylinder(g,side*.39,.79,-.06,side*.42,.18,.07,.32,.26,M.main);
  ell(g,side*.44,.15,.27,.36,.16,.40,M.dark);
  // Two short tusks, not large invented horns.
  const fang=new THREE.Mesh(new THREE.ConeGeometry(.075,.27,7),M.white);
  fang.position.set(side*.32,1.94,.80);fang.rotation.z=side*.20;g.add(fang);
 }
 ell(g,0,2.19,.75,.13,.10,.055,M.dark);ell(g,0,2.18,.81,.05,.045,.02,M.black);
 for(let j=0;j<13;j++){const a=j*2.399963;ell(g,Math.sin(a)*.53,1.1+(j%5)*.21,Math.cos(a)*.42,.047,.031,.043,M.dark)}
 const jaw=g.children.find(o=>o.position?.y===1.93);if(jaw)jaw.name='nj611Jaw';
 g.userData.nj611Morph='giant';
}
function nj611SundelBolong(g,M){
 // The back aperture is genuinely open in the upper garment (not a black decal on a solid cone).
 const skirt=new THREE.Mesh(new THREE.CylinderGeometry(.44,.76,1.14,32,1,true),M.white);
 skirt.position.y=.61;skirt.name='nj611Skirt';g.add(skirt);
 const frontShell=new THREE.Mesh(new THREE.CylinderGeometry(.34,.46,1.05,40,1,true,Math.PI+.69,Math.PI*2-1.38),M.white);
 frontShell.position.y=1.69;frontShell.name='nj611OpenBackDress';g.add(frontShell);
 ell(g,0,2.30,.07,.32,.39,.31,M.light);ell(g,0,2.67,-.10,.35,.22,.32,M.black);
 for(const side of [-1,1]){
  cylinder(g,side*.38,1.93,.04,side*.43,1.07,.10,.105,.065,M.white);
  ell(g,side*.14,2.35,.36,.055,.058,.03,M.dark);
 }
 // A shaped back panel has a genuine circular opening; no gore textures.
 const panelShape=new THREE.Shape();panelShape.moveTo(-.35,-.52);panelShape.lineTo(.35,-.52);
 panelShape.lineTo(.35,.52);panelShape.lineTo(-.35,.52);panelShape.closePath();
 const aperture=new THREE.Path();aperture.absarc(0,-.02,.285,0,Math.PI*2,true);
 panelShape.holes.push(aperture);
 const panel=new THREE.Mesh(new THREE.ShapeGeometry(panelShape,28),M.white);
 panel.position.set(0,1.58,-.405);panel.name='nj611PerforatedBackPanel';g.add(panel);
 // Hole at the back; non-graphic shadowed interior, bounded by a fabric hem.
 const opening=new THREE.Mesh(new THREE.CircleGeometry(.28,36),M.dark);
 opening.position.set(0,1.56,-.22);opening.name='nj611BackOpening';g.add(opening);
 const rim=new THREE.Mesh(new THREE.TorusGeometry(.285,.040,8,48),M.white);
 rim.position.set(0,1.56,-.44);rim.name='nj611BackRim';g.add(rim);
 const hair=new THREE.Group();hair.name='nj611HairCurtain';g.add(hair);
 for(let j=0;j<13;j++){
  const x=(j-6)*.060;
  // Part the hair around the hole to preserve the distinguishing silhouette.
  const ending=Math.abs(x)<.16?1.92:.70+(j%3)*.07;
  tube(hair,[[x*.78,2.68,-.22],[x,2.24,-.40],[x*1.18,ending,-.46]],.040,M.black);
 }
 for(const side of [-1,1])tube(g,[[side*.32,2.52,-.19],[side*.46,1.77,-.32],[side*.52,.82,-.33]],.07,M.black);
 g.userData.nj611Morph='backOpening';
}
function nj611Antaboga(g,M){
 // The coiled serpent form is based on Javanese Antaboga wayang iconography.
 // No wings/legs: distinguish Antaboga from winged Taksaka and water-associated Basuki.
 const pts=[];
 for(let i=0;i<=28;i++){const t=i/28,a=t*Math.PI*3.4;pts.push([Math.sin(a)*(1.03-.38*t),.30+t*.20,Math.cos(a)*(.78-.24*t)-.18]);}
 pts.push([.05,.66,.42],[0,.94,.52],[0,1.40,.62],[0,1.89,.72]);
 const coil=tube(g,pts,.205,M.main);coil.name='nj611SerpentCoil';
 for(let j=0;j<36;j++){
  const t=j/35,a=t*Math.PI*3.4,r=1.03-.38*t;
  const sc=ell(g,Math.sin(a)*r,.50+t*.20,Math.cos(a)*(.78-.24*t)-.18,.080,.032,.092,j%5?M.light:M.gold);
  sc.rotation.y=a;
 }
 ell(g,0,2.06,.80,.43,.36,.48,M.main);ell(g,0,1.92,1.17,.35,.16,.35,M.light);
 for(const side of [-1,1]){
  ell(g,side*.25,2.18,1.13,.12,.105,.07,M.gold);
  ell(g,side*.25,2.19,1.18,.052,.052,.03,M.eye);
  tube(g,[[side*.25,1.91,1.29],[side*.50,1.84,1.49],[side*.70,1.90,1.55]],.028,M.gold);
  const fang=new THREE.Mesh(new THREE.ConeGeometry(.043,.18,7),M.white);
  fang.position.set(side*.17,1.82,1.40);fang.rotation.x=Math.PI;g.add(fang);
 }
 // Crown/jamang is a crucial visual cue in wayang representations.
 const crown=new THREE.Group();crown.name='nj611Crown';crown.position.set(0,2.38,.71);g.add(crown);
 const circlet=new THREE.Mesh(new THREE.TorusGeometry(.32,.055,8,40),M.gold);
 circlet.rotation.x=Math.PI/2;crown.add(circlet);
 for(let j=-3;j<=3;j++){
  const spike=new THREE.Mesh(new THREE.ConeGeometry(.068,.22+(.3-Math.abs(j)*.04),6),M.gold);
  spike.position.set(j*.105,.19-Math.abs(j)*.02,.04);crown.add(spike);
 }
 ell(g,0,2.32,1.17,.09,.11,.045,M.gold);
 const neckPlate=ell(g,0,1.39,.85,.20,.50,.07,M.light);neckPlate.name='nj611BreastScales';
 g.userData.nj611Morph='crownedSerpent';
}

// NUSAJIWA 6.12 — folklore visual identity: distinguish source-supported traits
// from artistic embellishment. These are representations of narratives, not evidence of spirits.
const NJ612_FOLKLORE={
 pocong:{name:'Pocong',region:'Indonesia, khususnya tradisi Jawa',kind:'cerita hantu berkaitan dengan kain kafan',
  attested:['sosok terbungkus kain kafan','simpul pada ujung kain dalam ikonografi populer'],
  artistic:['lipatan kain','gerak melompat perlahan','bukaan wajah ilustratif'],
  sources:['https://doi.org/10.22455/2500-4247-2021-6-1-354-369','https://e-journal.metrouniv.ac.id/riayah/article/view/7415']},
 kuntilanak:{name:'Kuntilanak',region:'Indonesia; narasi Melayu Pontianak dan berbagai daerah',kind:'hantu perempuan dalam folklor',
  attested:['perempuan berambut hitam panjang','busana putih','berkaitan dengan kisah kematian saat melahirkan dalam sebagian versi'],
  artistic:['bentuk wajah','gerak melayang','rambut tersibak'],
  sources:['https://doi.org/10.1163/22134379-17601001','https://etnografia.kunstkamera.ru/en/archive/2019_1/frolova_luneva']},
 tuyul:{name:'Tuyul',region:'Jawa dan tradisi Melayu yang berkerabat',kind:'roh berwujud anak kecil dalam cerita rakyat',
  attested:['sosok kecil mirip anak','kepala botak dalam penggambaran populer','terkait cerita moralitas ekonomi'],
  artistic:['warna kulit hijau lembut','kain pinggang','gerakan mengintip'],
  sources:['https://journal.unnes.ac.id/journals/jsi/article/view/19507','https://journal.lppmunindra.ac.id/index.php/Jurnal_Desain/article/view/5468']}
};
NJ36_PROFILES.pocong=['Folklor Indonesia — cerita kain kafan','Sosok yang dalam kisah populer digambarkan terbungkus kain kafan dengan ikatan kepala dan kaki. Simpul dan gerak merupakan representasi cerita, bukan fakta gaib.'];
NJ36_PROFILES.kuntilanak=['Folklor Melayu dan Indonesia','Hantu perempuan dalam narasi yang beragam, sering digambarkan dengan rambut hitam panjang dan pakaian putih. Berbeda dari Sundel Bolong: tidak ada ciri lubang punggung.'];
NJ36_PROFILES.tuyul=['Folklor Jawa — cerita roh kecil','Sosok menyerupai anak kecil berkepala botak dalam gambaran populer; cerita terkait harta dan norma sosial. Warna kulit serta busana adalah interpretasi artistik.'];
for(const [id,entry] of Object.entries(NJ612_FOLKLORE))NJ39_SOURCES[id]=entry.sources[0];
// NUSAJIWA 6.22: source-backed story features versus game-only styling.
// Neither entry describes a scientifically established animal.
const NJ622_CULTURAL={
 bedawang_nala:{
  attested:['kura-kura kosmis dalam tradisi Jawa–Bali','menyangga pulau atau daratan','ornamen lidah api dan satu atau dua ular melilit dalam beberapa representasi Bali'],
  artistic:['bentuk pulau mini dan pegunungan poligonal','pola sisik tempurung','gerak kepala, kaki, dan ekor yang diperlambat'],
  sources:['https://sonobudoyo.jogjaprov.go.id/id/tulisan/read/bedawang-nala','https://journal.ugm.ac.id/index.php/wisdom/article/view/3432']
 },
 naga_padoha:{
  attested:['naga penghuni dunia bawah dalam kisah penciptaan Batak Toba','gerakannya dalam kisah dikaitkan dengan gempa','relief singa Batak kadang diasosiasikan dengan naga dunia bawah'],
  artistic:['susunan tubuh bersegmen dan gelombang kecil','tanduk dan alis dekoratif terinspirasi ornamen singa','lempeng tanah simbolis di dekat punggung'],
  sources:['https://australian.museum/learn/cultures/international-collection/indonesia/creation-story-from-lake-toba-sumatra-indonesia/','https://www.metmuseum.org/essays/spiritual-power-in-the-arts-of-the-toba-batak']
 }
};
for(const [id,e] of Object.entries(NJ622_CULTURAL))NJ39_SOURCES[id]=e.sources[0];
NJ36_PROFILES.bedawang_nala=['Kosmologi Jawa–Bali','Kura-kura kosmis penyangga daratan. Lidah api dan ular melilit terdapat pada beberapa ornamen Bali; pulau mini dan animasi dalam game adalah tafsir artistik.'];
NJ36_PROFILES.naga_padoha=['Kosmologi Batak Toba','Naga dunia bawah dalam kisah penciptaan yang gerakannya dikaitkan dengan gempa. Bentuk kepala dan tubuh 3D adalah interpretasi seni, bukan wujud baku.'];
function nj612EvidenceMarkup(r){
 const e=NJ612_FOLKLORE[r[0]]||NJ622_CULTURAL[r[0]]||NJ624_CULTURAL[r[0]]||NJ625_CULTURAL[r[0]]||NJ626_CULTURAL[r[0]]||NJ627_CULTURAL[r[0]]||NJ628_CULTURAL[r[0]]||NJ629_CULTURAL[r[0]];if(!e)return '';
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 return '<section class="nj612-evidence" aria-label="Catatan autentisitas folklor">'+
  '<h3>Jejak cerita & interpretasi</h3><p><b>Dalam kisah:</b> '+e.attested.map(esc).join('; ')+'.</p>'+
  '<p><b>Desain permainan:</b> '+e.artistic.map(esc).join('; ')+'.</p>'+
  '<small>Folklor memiliki banyak versi. Sumber ini membahas narasi dan representasi, bukan bukti keberadaan makhluk gaib.</small>'+
  '<div class="nj612-sources">'+e.sources.map((u,i)=>'<a target="_blank" rel="noopener noreferrer" href="'+esc(u)+'">Baca sumber '+(i+1)+' ↗</a>').join('')+'</div></section>';
}
function nj612Pocong(g,M){
 // Enclosed shroud, no visible arms/legs, knots at both ends; not a generic humanoid.
 const wrap=new THREE.Group();wrap.name='nj612Shroud';g.add(wrap);
 const shroud=new THREE.Mesh(new THREE.CylinderGeometry(.33,.42,1.71,28,1,false),M.white);
 shroud.position.y=1.24;shroud.name='nj612WrappedBody';wrap.add(shroud);
 ell(wrap,0,2.09,0,.36,.37,.34,M.white);
 ell(wrap,0,.34,0,.31,.26,.31,M.white);
 // A restrained oval opening; face detail is an illustrative device, not a canonical claim.
 ell(wrap,0,2.12,.325,.21,.245,.038,M.light);
 for(const sx of [-1,1])ell(wrap,sx*.085,2.16,.362,.024,.031,.013,M.dark);
 const knotTop=new THREE.Group();knotTop.name='nj612TopKnot';knotTop.position.y=2.42;wrap.add(knotTop);
 const tieTop=new THREE.Mesh(new THREE.TorusGeometry(.12,.047,7,24),M.white);
 tieTop.rotation.x=Math.PI/2;knotTop.add(tieTop);
 const tipTop=new THREE.Mesh(new THREE.ConeGeometry(.14,.31,9),M.white);
 tipTop.position.y=.19;knotTop.add(tipTop);
 const knotFoot=new THREE.Group();knotFoot.name='nj612FootKnot';knotFoot.position.y=.14;wrap.add(knotFoot);
 const tieFoot=new THREE.Mesh(new THREE.TorusGeometry(.18,.048,7,24),M.light);
 tieFoot.rotation.x=Math.PI/2;knotFoot.add(tieFoot);
 const tipFoot=new THREE.Mesh(new THREE.ConeGeometry(.13,.20,9),M.white);
 tipFoot.rotation.z=Math.PI;tipFoot.position.y=-.12;knotFoot.add(tipFoot);
 for(let j=0;j<6;j++){
  const a=j*Math.PI/3;
  const crease=tube(wrap,[[Math.sin(a)*.31,1.97,Math.cos(a)*.31],[Math.sin(a+.08)*.35,1.16,Math.cos(a+.08)*.39],[Math.sin(a+.13)*.38,.46,Math.cos(a+.13)*.39]],.009,M.light);
  crease.name='nj612FabricFold';
 }
 g.userData.nj612Morph='shroud';
}
function nj612Kuntilanak(g,M){
 // White dress with uninterrupted back, unlike Sundel Bolong. No fangs or graphic features.
 const dress=new THREE.Mesh(new THREE.CylinderGeometry(.28,.70,1.64,32,1,false),M.white);
 dress.position.y=.85;dress.name='nj612WhiteDress';g.add(dress);
 ell(g,0,1.79,0,.30,.41,.24,M.white);
 const face=ell(g,0,2.30,.15,.29,.37,.27,M.light);face.name='nj612Face';
 ell(g,0,2.62,-.03,.36,.23,.31,M.black);
 for(const sx of [-1,1]){
  cylinder(g,sx*.31,1.76,.02,sx*.43,.90,.12,.105,.068,M.white);
  ell(g,sx*.13,2.34,.41,.034,.034,.012,M.dark);
 }
 const hair=new THREE.Group();hair.name='nj612LongHair';g.add(hair);
 for(let j=0;j<19;j++){
  const x=(j-9)*.041;
  const front=j<4||j>14;
  const z=front?.28:-.25;
  const ending=front?1.10+(j%3)*.12:.48+(j%4)*.12;
  tube(hair,[[x*.75,2.72,-.06],[x,2.35,z],[x*1.18,ending,z+(front?.11:-.16)]],.028,M.black);
 }
 // No hole/back aperture: the two folklore identities remain visually distinct.
 g.userData.nj612Morph='longHairWhiteDress';
}
function nj612Tuyul(g,M){
 // Proportions of a small child (large bald head, short limbs), not an adult scaled down.
 g.scale.setScalar(.78);
 ell(g,0,.82,0,.38,.48,.28,M.main);
 const head=ell(g,0,1.61,.10,.57,.57,.49,M.main);head.name='nj612BaldHead';
 ell(g,0,1.46,.56,.24,.19,.13,M.light);
 for(const sx of [-1,1]){
  ell(g,sx*.27,1.67,.55,.10,.12,.055,M.white);
  ell(g,sx*.27,1.67,.605,.048,.066,.027,M.eye);
  ell(g,sx*.54,1.50,.02,.15,.19,.09,M.main);
  cylinder(g,sx*.36,1.01,.02,sx*.53,.69,.21,.13,.105,M.main);
  ell(g,sx*.55,.65,.23,.16,.13,.16,M.main);
  cylinder(g,sx*.21,.47,0,sx*.23,.12,.13,.17,.13,M.main);
  ell(g,sx*.24,.10,.25,.19,.12,.27,M.main);
 }
 // Non-explicit game-friendly waist wrap; not asserted as a historical costume.
 const wrap=new THREE.Mesh(new THREE.CylinderGeometry(.37,.43,.30,20),M.dark);
 wrap.position.y=.60;wrap.name='nj612WaistWrap';g.add(wrap);
 ell(g,0,1.27,.57,.11,.065,.04,M.dark);
 g.userData.nj612Morph='baldChild';
}
// 6.13: distinct folklore silhouettes. These are game interpretations, not verified sightings.
function nj613BabiNgepet(g,M){
 // Folklore describes a human-to-pig transformation; no invented dorsal spines.
 ell(g,0,.72,-.08,.72,.60,.95,M.dark);
 ell(g,0,.83,.78,.49,.46,.52,M.main);
 ell(g,0,.61,1.24,.37,.25,.24,M.light);
 for(const sx of [-1,1]){
   ell(g,sx*.17,.65,1.455,.075,.057,.035,M.dark);
   ell(g,sx*.29,1.12,1.13,.075,.064,.045,M.eye);
   ell(g,sx*.34,1.25,.55,.20,.30,.12,M.main);
   for(const zz of [-.58,.62]){
     cylinder(g,sx*.48,.48,zz,sx*.49,.13,zz+.06,.16,.12,M.dark);
     ell(g,sx*.49,.11,zz+.17,.17,.11,.22,M.main);
   }
 }
 tube(g,[[0,.77,-.91],[.23,.74,-1.18],[.29,.88,-1.26],[.17,.93,-1.28]],.08,M.main);
 g.userData.nj613Morph='pigTransformation';
}
function nj613Ahool(g,M){
 // Giant bat-like cryptid reported in modern stories, not a scientifically established species.
 ell(g,0,1.33,0,.36,.57,.29,M.dark);
 ell(g,0,1.92,.18,.30,.32,.29,M.main);
 for(const sx of [-1,1]){
   const ear=new THREE.Mesh(new THREE.ConeGeometry(.13,.42,8),M.dark);
   ear.position.set(sx*.23,2.32,.10);g.add(ear);
   ell(g,sx*.15,1.97,.435,.075,.075,.04,M.eye);
   // Membran wing contour with long finger-bone ribs, avoiding feathered bird anatomy.
   const wing=new THREE.Shape();wing.moveTo(0,0);
   wing.lineTo(sx*.73,.31);wing.lineTo(sx*1.72,.49);
   wing.lineTo(sx*1.49,-.08);wing.lineTo(sx*1.16,-.35);
   wing.lineTo(sx*.82,-.18);wing.lineTo(sx*.51,-.43);wing.closePath();
   const mesh=new THREE.Mesh(new THREE.ShapeGeometry(wing),M.main);
   mesh.position.set(0,1.67,-.05);mesh.material=M.main;g.add(mesh);
   for(const [x,y] of [[1.72,.49],[1.49,-.08],[1.16,-.35],[.51,-.43]])
     tube(g,[[sx*.12,1.67,.0],[sx*x,1.67+y,-.04]],.022,M.dark);
   cylinder(g,sx*.19,.98,0,sx*.32,.38,.02,.09,.065,M.dark);
 }
 g.userData.nj613Morph='giantBatCryptid';
}
// 6.14: culturally scoped silhouettes. No Western elf ears, halo or invented horns.
function nj614Bunian(g,M){
 // Malay/Minang oral accounts: human appearance, concealment, forest setting.
 const cloak=new THREE.Mesh(new THREE.CylinderGeometry(.34,.59,1.43,12),M.main);
 cloak.position.y=.89;g.add(cloak);
 ell(g,0,1.77,.02,.34,.41,.31,M.light);
 for(const sx of [-1,1]){
  cylinder(g,sx*.38,1.40,0,sx*.49,.69,.05,.115,.075,M.main);
  ell(g,sx*.24,.13,0,.14,.15,.24,M.dark);
 }
 // Traditional garment folds are stylization; invisibility is an animation, not anatomy.
 for(const sx of [-1,1])tube(g,[[sx*.20,1.43,.34],[sx*.31,.86,.43],[sx*.40,.24,.36]],.023,M.gold);
 ell(g,0,2.10,-.07,.37,.13,.30,M.dark);
 g.userData.folkloreForm='human-concealment';
}
function nj614SilumanHarimau(g,M){
 // Sumatra stories distinguish a human-to-tiger transformation from a new species.
 cat(g,M,['siluman_harimau']);
 for(const sx of [-1,1])for(const z of [-.60,-.15,.40])
  tube(g,[[sx*.31,1.35,z-.13],[sx*.60,1.17,z],[sx*.53,1.04,z+.12]],.034,M.dark);
 g.userData.folkloreForm='tiger-transformation';
}
function nj614MacanPutih(g,M){
 // White tiger of Sundanese/Javanese stories: quadruped, no crown or wings.
 cat(g,M,['macan_putih']);
 for(const sx of [-1,1])for(const z of [-.62,-.12,.40])
  tube(g,[[sx*.35,1.31,z-.10],[sx*.58,1.16,z],[sx*.55,1.06,z+.10]],.025,M.dark);
 ell(g,0,1.37,1.24,.22,.13,.20,M.white);
 g.userData.folkloreForm='white-tiger';
}
// NUSAJIWA 6.19: distinct mythic silhouettes; ornaments are game interpretations.
function nj619Lembuswana(g,M){
 // Kutai emblem: composite quadruped, elephant trunk, wings and crowned head.
 ell(g,0,1.14,-.10,.66,.54,1.04,M.main);
 ell(g,0,1.55,.73,.45,.43,.47,M.light);
 ell(g,0,1.47,1.12,.39,.30,.37,M.main);
 tube(g,[[0,1.40,1.40],[0,1.12,1.63],[.13,.87,1.67]],.16,M.light);
 for(const side of [-1,1]){
   cylinder(g,side*.48,.92,-.70,side*.52,.16,-.72,.19,.13,M.dark);
   cylinder(g,side*.48,.92,.54,side*.55,.16,.57,.18,.13,M.dark);
   ell(g,side*.42,1.71,.89,.24,.29,.10,M.gold);
   tube(g,[[side*.24,1.77,.82],[side*.36,2.06,.76],[side*.31,2.28,.70]],.075,M.gold);
   const wing=new THREE.Group();wing.name=side<0?'wingL':'wingR';wing.position.set(side*.54,1.55,-.26);g.add(wing);
   for(let i=0;i<7;i++){const feather=ell(wing,side*(.19+i*.13),.11+i*.065,-.09-i*.07,.14,.08,.34+i*.035,i%2?M.gold:M.light);feather.rotation.y=side*.25}
 }
 ell(g,0,2.05,.78,.30,.14,.22,M.gold);
 for(let j=-2;j<=2;j++)cylinder(g,j*.12,2.08,.77,j*.15,2.35-Math.abs(j)*.045,.75,.055,.015,M.gold);
 tube(g,[[0,.97,-1.00],[.12,.82,-1.39],[.28,.94,-1.67]],.11,M.dark);
 g.userData.folkloreForm='kutai-composite-winged-elephant';
}
function nj619Basuki(g,M){
 // Balinese naga: elongated coiling serpent, ceremonial crest, whiskers; no western dragon wings.
 const path=[];for(let i=0;i<=48;i++){const t=i/48,a=t*Math.PI*3.2;path.push([Math.sin(a)*(.83-.36*t),.42+.19*t,Math.cos(a)*(.76-.25*t)-.24])}
 tube(g,path,.20,M.main);
 tube(g,[[.0,.53,.10],[.02,.92,.35],[0,1.47,.59],[0,1.86,.78]],.23,M.main);
 ell(g,0,1.93,.91,.38,.30,.51,M.light);
 ell(g,0,1.79,1.33,.30,.13,.35,M.gold);
 eyes(g,M,0,2.02,1.24,.25,.07);
 for(const side of [-1,1]){
   tube(g,[[side*.23,1.82,1.32],[side*.55,1.65,1.57],[side*.71,1.53,1.49]],.035,M.gold);
   tube(g,[[side*.22,2.12,.80],[side*.36,2.37,.72],[side*.27,2.55,.68]],.075,M.gold);
 }
 for(let j=-3;j<=3;j++){const sp=new THREE.Mesh(new THREE.ConeGeometry(.065,.24-Math.abs(j)*.025,5),M.gold);sp.position.set(j*.10,2.24-Math.abs(j)*.045,.79);g.add(sp)}
 for(let i=0;i<path.length;i+=3){const pt=path[i];ell(g,pt[0],pt[1]+.17,pt[2],.07,.045,.09,M.gold)}
 g.userData.folkloreForm='balinese-coiled-naga';
}

// NUSAJIWA 6.24 — character-specific, phase-aware 3D rigs.
// Source-informed motifs are NOT a claim that mythic beings literally age or lay eggs.
const NJ624_STAGE={
 garuda:[
  'Telur simbolis bersayap: mekanik permainan, bukan siklus hidup mitologi.',
  'Bentuk kecil berkepala burung, sayap pendek dan kaki bercakar.',
  'Bulu sayap primer tumbuh; jambul kepala mulai terlihat.',
  'Dada antropomorfik terbentuk; latihan membuka sayap.',
  'Rentang sayap bertambah; bulu ekor dan gelang lengan muncul.',
  'Garuda dewasa: tubuh manusia-burung, paruh, cakar, dan sayap penuh.',
  'Garuda senior: detail bulu dan ornamen bertambah, bukan perubahan kanonis.',
  'Garuda legenda: bentuk utama tetap dikenali; batu elemen menambah efek fiksi.'
 ],
 barong:[
  'Topeng dalam wadah simbolis: bukan telur biologis Barong.',
  'Topeng kecil, badan kain pendek dan empat kaki pertunjukan.',
  'Rumbai kain pertama dan gerak rahang sederhana.',
  'Rahang bawah lebih jelas; dua bagian tubuh mulai selaras.',
  'Kain punggung memanjang, janggut dan hiasan telinga bertambah.',
  'Barong Ket dewasa: topeng merah, mata menonjol, taring, janggut, dan badan kain panjang.',
  'Bentuk senior: ornamen lebih rapat; penghormatan pada tradisi, bukan fase ritus.',
  'Barong legenda: atribut pelindung fiksi ditambahkan tanpa mengganti siluet kostum.'
 ],
 kuyang:[
  'Segel asal: telur simbolis, bukan reproduksi makhluk dalam cerita.',
  'Kepala perempuan melayang dengan rambut pendek; detail organ dibuat abstrak.',
  'Rambut memanjang, beberapa pita anatomi menggantung.',
  'Gerak kepala dan rambut terpisah; tanpa tubuh penuh.',
  'Pita anatomi bertambah, siluet kepala terbang tetap dominan.',
  'Kuyang dewasa: kepala perempuan, rambut panjang dan untaian organ simbolis.',
  'Wujud senior: gerakan lebih lambat, detail rambut bertambah; tafsir permainan.',
  'Kuyang legenda: cahaya elemen fiksi tanpa mengubah ciri kepala melayang.'
 ]
};
const NJ624_CULTURAL={
 garuda:{
  attested:['wahana Wisnu dalam tradisi Hindu','penggambaran antropomorfik maupun zoomorfik dalam seni Nusantara','wajah atau atribut burung dan sayap'],
  artistic:['proporsi tubuh manusia-burung dan jumlah bulu','delapan fase pertumbuhan dan gerak sayap','efek batu elemen'],
  sources:['https://sonobudoyo.jogjaprov.go.id/id/tulisan/read/garuda','https://www.museumnasional.or.id/3794/']
 },
 barong:{
  attested:['Barong Ket merupakan figur pertunjukan dan upacara Bali, bukan singa biologis','topeng berwajah ekspresif dengan mata menonjol, taring, rambut atau janggut','kostum badan panjang digerakkan dua penari'],
  artistic:['rig empat kaki dan mekanisme rahang simulatif','perkembangan ukuran dan rumbai dalam delapan fase','aksen cahaya elemen pada fase legenda'],
  sources:['https://www.maskmuseum.org/mask/bali-barong-ket/','https://collection.internationalfolkart.org/objects/26707/barong-ket']
 },
 kuyang:{
  attested:['figur hantu perempuan dalam kisah Kalimantan','gambaran populer kepala perempuan melayang dengan organ menjuntai','identitas dan penafsiran bervariasi antarkomunitas'],
  artistic:['organ digambar sebagai pita abstrak non-grafis','delapan fase ukuran, panjang rambut, dan gerak','cahaya elemen legenda'],
  sources:['https://journal.uinjkt.ac.id/index.php/mimbar/article/view/41528','https://www.detik.com/kalimantan/budaya/d-8344109/kenapa-kuyang-digambarkan-kepala-perempuan-terbang-bawa-organ-dalam']
 }
};
for(const [id,e] of Object.entries(NJ624_CULTURAL))NJ39_SOURCES[id]=e.sources[0];
NJ36_PROFILES.garuda=['Mitologi Hindu dalam seni Nusantara','Garuda dikenal sebagai wahana Wisnu. Bentuk antropomorfik dan zoomorfik berbeda menurut representasi; fase tumbuh di sini hanya mekanik fantasi.'];
NJ36_PROFILES.barong=['Pertunjukan dan tradisi Bali','Barong Ket ialah sosok bertopeng dengan kostum panjang, bukan spesies singa. Gerakan dua bagian tubuh dan rahang adalah simulasi pertunjukan.'];
NJ36_PROFILES.kuyang=['Folklor Kalimantan','Kisah hantu perempuan dan kepala melayang dengan organ menjuntai memiliki variasi lokal. Desain pita anatomi dan tahapan usia merupakan interpretasi game.'];
function nj624StageMarkup(r){
 const entries=NJ624_STAGE[r[0]]||NJ625_STAGE[r[0]]||NJ626_STAGE[r[0]]||NJ627_STAGE[r[0]]||NJ628_STAGE[r[0]]||NJ629_STAGE[r[0]];if(!entries)return '';
 const phase=Math.max(0,Math.min(7,Number(gamePet()?.phase)||0));
 const names=['Telur','Bayi','Balita','Anak','Remaja','Dewasa','Tua','Legenda'];
 const esc=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 return '<section class="nj612-evidence" aria-label="Panduan evolusi karakter"><h3>Delapan fase visual · '+esc(names[phase])+'</h3><p>'+esc(entries[phase])+'</p><small>Fase pertumbuhan ini fiksi game. Ciri kisah dan sumber dijelaskan terpisah di atas.</small></section>';
}
function nj624Garuda(g,M,phase){
 const grow=Math.max(1,Math.min(7,phase));
 const torso=new THREE.Group();torso.name='nj624GarudaTorso';g.add(torso);
 ell(torso,0,1.04,0,.39+.025*grow,.60,.31,M.main);
 ell(torso,0,1.44,.13,.32,.29,.24,M.light);
 const head=new THREE.Group();head.name='nj624GarudaHead';head.position.set(0,1.82,.18);torso.add(head);
 ell(head,0,.0,0,.34,.38,.32,M.main);
 const beak=new THREE.Mesh(new THREE.ConeGeometry(.14,.43,8),M.gold);beak.rotation.x=Math.PI/2;beak.position.set(0,-.06,.40);head.add(beak);
 eyes(head,M,0,.06,.32,.22,.068);
 const crestCount=Math.min(5,Math.max(1,grow-1));
 for(let i=0;i<crestCount;i++){
  const f=new THREE.Mesh(new THREE.ConeGeometry(.075,.25+i*.028,6),M.gold);
  f.position.set((i-(crestCount-1)/2)*.12,.41,.02-i*.018);head.add(f);
 }
 for(const side of [-1,1]){
  const wing=new THREE.Group();wing.name='nj624GarudaWing'+(side<0?'L':'R');wing.position.set(side*.40,1.46,-.10);torso.add(wing);
  const featherCount=Math.max(3,Math.min(11,3+grow));
  for(let j=0;j<featherCount;j++){
   const f=ell(wing,side*(.13+j*.13),.06+j*.060,-j*.038,.11,.26+j*.026,.095,j%3?M.light:M.gold);
   f.rotation.z=side*(.20+j*.10);
  }
  const leg=new THREE.Group();leg.name='nj624GarudaLeg'+(side<0?'L':'R');leg.position.set(side*.25,.67,.04);torso.add(leg);
  cylinder(leg,0,0,0,side*.07,-.49,.14,.12,.065,M.dark);
  for(let toe=-1;toe<=1;toe++)cylinder(leg,side*.07,-.48,.14,side*.07+toe*.095,-.51,.37,.037,.012,M.gold,7);
  if(grow>=4){const cuff=ell(torso,side*.35,1.20,.10,.14,.09,.16,M.gold);cuff.rotation.z=side*.22;}
 }
 if(grow>=3)for(let j=0;j<Math.min(7,grow+1);j++){
  const tail=ell(torso,(j-3)*.13,.77,-.54-j*.032,.085,.10,.42+j*.038,j%2?M.gold:M.light);tail.rotation.x=-.35;
 }
 if(grow>=6)for(let j=0;j<5;j++)ell(head,(j-2)*.10,.34,-.03,.035,.075,.08,M.white);
 g.userData.nj624Rig={kind:'garuda',phase:grow,torso,head,wings:['nj624GarudaWingL','nj624GarudaWingR']};
 g.userData.folkloreForm='garuda-anthropomorphic-bird';
}
function nj624Barong(g,M,phase){
 const grow=Math.max(1,Math.min(7,phase));
 const body=new THREE.Group();body.name='nj624BarongCloth';g.add(body);
 const length=.72+grow*.10;
 ell(body,0,1.18,-.36,.64,.53,length,M.main);
 ell(body,0,1.54,-.33,.57,.17,length*.86,M.gold);
 const head=new THREE.Group();head.name='nj624BarongMask';head.position.set(0,1.59,.66);body.add(head);
 const red=new THREE.MeshStandardMaterial({color:'#ad4337',roughness:.72,metalness:.04});
 ell(head,0,.08,.19,.52,.46,.34,red);
 ell(head,0,.18,.48,.38,.18,.15,M.light);
 eyes(head,M,0,.23,.48,.27,.115);
 for(const side of [-1,1]){
  ell(head,side*.40,.48,.06,.18,.24,.12,M.gold);
  const tusk=new THREE.Mesh(new THREE.ConeGeometry(.065,.23,7),M.white);
  tusk.rotation.x=Math.PI;tusk.position.set(side*.28,-.22,.49);head.add(tusk);
 }
 const jaw=new THREE.Group();jaw.name='nj624BarongJaw';jaw.position.set(0,-.18,.33);head.add(jaw);
 ell(jaw,0,-.10,.12,.35,.13,.20,red);
 for(let j=-2;j<=2;j++)ell(jaw,j*.12,-.21,.14,.05,.13,.045,M.white);
 const beardCount=3+grow;
 for(let j=0;j<beardCount;j++){
  const side=j-(beardCount-1)/2;
  const strand=ell(jaw,side*.08,-.27-(j%2)*.08,.12,.035,.20+(j%3)*.055,.04,M.dark);
  strand.rotation.z=side*.06;
 }
 const legs=[];
 for(const side of [-1,1])for(const front of [true,false]){
  const leg=new THREE.Group();leg.name='nj624BarongLeg'+(front?'F':'B')+(side<0?'L':'R');
  leg.position.set(side*.44,.94,front?.44:-1.04);body.add(leg);
  cylinder(leg,0,0,0,side*.04,-.72,.03,.15,.11,M.dark);
  ell(leg,side*.04,-.72,.13,.19,.12,.21,M.gold);legs.push(leg);
 }
 const fringeCount=5+grow*2;
 for(let j=0;j<fringeCount;j++)for(const side of [-1,1]){
  const z=.56-(j/(fringeCount-1))*1.86;
  const tassel=ell(body,side*.56,.82-(j%3)*.045,z,.065,.18+(j%4)*.05,.09,j%3?M.light:M.gold);
  tassel.name='nj624BarongFringe';tassel.rotation.z=side*.12;
 }
 if(grow>=5)for(let j=0;j<9;j++){
  const a=j*Math.PI*2/9;ell(head,Math.sin(a)*.56,.12+Math.cos(a)*.55,.03,.075,.16,.11,j%2?M.gold:M.white);
 }
 g.userData.nj624Rig={kind:'barong',phase:grow,body,head,jaw,legs};
 g.userData.folkloreForm='barong-ket-two-performer-costume';
}
function nj624Kuyang(g,M,phase){
 const grow=Math.max(1,Math.min(7,phase));
 const head=new THREE.Group();head.name='nj624KuyangHead';head.position.set(0,1.88,0);g.add(head);
 ell(head,0,.09,0,.38,.43,.33,M.main);
 ell(head,0,-.02,.29,.30,.29,.10,M.light);
 eyes(head,M,0,.13,.36,.21,.075);
 ell(head,0,-.18,.39,.09,.04,.045,M.dark);
 ell(head,0,.47,-.08,.45,.23,.34,M.black);
 const hair=new THREE.Group();hair.name='nj624KuyangHair';head.add(hair);
 const strands=5+grow*2;
 for(let j=0;j<strands;j++){
  const x=(j-(strands-1)/2)*(.75/strands);
  tube(hair,[[x,.50,-.07],[x*1.23,.16,-.22],[x*1.43,-.15-grow*.055,-.18]],.025+(j%3)*.005,M.black);
 }
 const tendrils=[];
 for(let j=0;j<Math.min(9,2+grow);j++){
  const a=j*2.399963;
  const node=new THREE.Group();node.name='nj624KuyangTendril'+j;
  node.position.set(Math.sin(a)*.15,1.46,Math.cos(a)*.10);g.add(node);
  const span=.31+grow*.080+(j%3)*.035;
  tube(node,[[0,0,0],[Math.sin(a)*.09,-span*.44,Math.cos(a)*.09],[Math.sin(a+.35)*.15,-span,Math.cos(a+.35)*.15]],.034,j%2?M.pink:M.dark);
  tendrils.push(node);
 }
 if(grow>=4)ell(g,0,1.43,.03,.17,.16,.12,M.dark);
 g.userData.nj624Rig={kind:'kuyang',phase:grow,head,hair,tendrils};
 g.userData.folkloreForm='kuyang-floating-head-symbolic-entrails';
}


// NUSAJIWA 6.25 — distinct, source-informed performance and folklore silhouettes.
// Reog and Rangda are modeled as performance objects/costumes, not zoological species.
// Wewe Gombel is a narrative figure; supernatural and lifecycle claims are NOT asserted.
const NJ625_STAGE={
 singa_barong_reog:[
  'Segel Dadak Merak: telur hanya wadah simbolik dalam permainan.',
  'Topeng caplokan mini dengan kipas merak kecil; bukan anak harimau biologis.',
  'Kipas merak bertambah lebar dan motif mata bulu pertama muncul.',
  'Rangka Dadak Merak lebih tegak; gerakan menunduk penari mulai tampak.',
  'Motif bulu merak bertambah dan kepala harimau makin tegas.',
  'Barongan Reog: topeng kepala harimau dan kipas Dadak Merak lebar.',
  'Versi senior: ornamen dan tekstur lebih padat, bukan tahapan upacara.',
  'Legenda Reog: kipas dan topeng tetap dikenali; efek batu elemen adalah fiksi.'
 ],
 rangda:[
  'Segel topeng Rangda: bukan telur biologis.',
  'Topeng mini dengan mata menonjol dan sedikit helaian rambut.',
  'Taring awal dan rambut topeng mulai memanjang.',
  'Lidah merah topeng dan gestur tangan mulai terlihat.',
  'Rambut serat dan detail hiasan topeng makin lengkap.',
  'Rangda pertunjukan: topeng, mata menonjol, taring, lidah, dan rambut panjang.',
  'Versi senior: hiasan topeng lebih rinci; bukan klaim perubahan ritus.',
  'Rangda legenda: siluet topeng dan rambut dipertahankan, aura elemen fiksi.'
 ],
 wewe:[
  'Segel kisah Wewe Gombel: telur simbolis, bukan siklus biologis.',
  'Sosok kecil berambut panjang dengan selendang pelindung simbolis.',
  'Rambut dan kain pelindung memanjang; wujud tetap figur perempuan.',
  'Lengan dan gerakan merangkul semakin terbaca.',
  'Jubah, rambut, dan gestur pelindung berkembang tanpa ciri Kuyang.',
  'Wewe Gombel: figur perempuan berambut panjang dan cerita perlindungan anak.',
  'Versi senior: selendang dan rambut lebih rinci; usia hanya mekanik game.',
  'Wewe legenda: gestur merangkul tetap utama; cahaya elemen adalah fiksi.'
 ]
};
const NJ625_CULTURAL={
 singa_barong_reog:{
  attested:['Reog Ponorogo adalah seni pertunjukan dan tradisi komunitas','Dadak Merak menampilkan kepala harimau dengan kipas merak besar','Barongan digerakkan penari; bukan hewan harimau-merak biologis'],
  artistic:['delapan fase topeng simbolis','jumlah bulu, pola mata, rig kipas dan gerak topeng','cahaya elemen legenda'],
  sources:['https://ich.unesco.org/en/USL/reog-ponorogo-performing-art-01969','https://ponorogo.go.id/peralatan-reog/']
 },
 rangda:{
  attested:['topeng Rangda merupakan bagian dari tradisi pertunjukan Bali','koleksi museum menunjukkan mata menonjol, taring, dan rambut serat','beberapa topeng memakai lidah panjang; variasi antarartefak nyata'],
  artistic:['bentuk tubuh kostum di bawah topeng dan gestur lengan','jumlah helai rambut dan delapan fase evolusi fiksi','gerakan rahang/lidah dan aura elemen'],
  sources:['https://www.horniman.ac.uk/object/26.7.50/3/','https://collection.moifa.org/objects/82619/dewi-durga-mask-also-used-to-portray-rangda-in-certain-danc']
 },
 wewe:{
  attested:['Wewe Gombel muncul dalam cerita lisan Jawa dengan pesan pedagogis','kajian etnografi menyoroti ajakan agar anak mengikuti nasihat orang tua','penggambaran perempuan berambut panjang memiliki variasi populer'],
  artistic:['jubah dan selendang merangkul sebagai simbol perlindungan non-grafis','delapan fase evolusi fiksi','gerakan rambut dan kain, efek batu elemen'],
  sources:['https://hiskisultra.org/jurnal/index.php/seshiski/article/view/75','https://en.wikipedia.org/wiki/Wewe_Gombel']
 }
};
for(const [id,e] of Object.entries(NJ625_CULTURAL))NJ39_SOURCES[id]=e.sources[0];
NJ36_PROFILES.singa_barong_reog=['Seni pertunjukan Ponorogo','Dadak Merak menggabungkan caplokan kepala harimau dengan kipas bulu merak. Bukan hewan biologis; delapan fase adalah permainan.'];
NJ36_PROFILES.rangda=['Topeng dan pertunjukan Bali','Topeng Rangda dapat bermata menonjol, bertaring dan berambut serat. Rincian topeng berbeda menurut artefak dan tradisi.'];
NJ36_PROFILES.wewe=['Cerita lisan Jawa','Wewe Gombel merupakan figur dalam cerita yang dapat menyampaikan pesan keselamatan anak. Anatomi dan pertumbuhan visual adalah interpretasi permainan.'];
function nj625Reog(g,M,phase){
 const grow=Math.max(1,Math.min(7,phase));
 const costume=new THREE.Group();costume.name='nj625ReogPerformer';g.add(costume);
 ell(costume,0,.79,-.36,.34,.76,.29,M.dark);
 for(const side of [-1,1]){
  const foot=new THREE.Group();foot.name='nj625ReogFoot'+(side<0?'L':'R');foot.position.set(side*.20,.45,-.27);costume.add(foot);
  cylinder(foot,0,0,0,side*.025,-.35,.03,.105,.075,M.dark);
  ell(foot,side*.025,-.36,.17,.15,.08,.20,M.gold);
 }
 const fan=new THREE.Group();fan.name='nj625ReogFan';fan.position.set(0,1.23,-.23);costume.add(fan);
 const count=9+grow*3,rad=.65+grow*.125;
 for(let i=0;i<count;i++){
  const a=-1.37+i*(2.74/(count-1));
  const x=Math.sin(a)*rad,y=Math.cos(a)*rad;
  const f=ell(fan,x*.58,y*.57,0,.09,.16,.055,i%3?M.gold:M.light);
  f.rotation.z=-a;
  const feather=ell(fan,x,y+.04,-.05,.075,.20,.045,i%2?M.light:M.gold);feather.rotation.z=-a;
  if(grow>=2){
   const eye=ell(fan,x,y+.065,.006,.05,.078,.018,M.dark);
   ell(fan,x,y+.068,.029,.025,.037,.013,M.white);
  }
 }
 const mask=new THREE.Group();mask.name='nj625ReogMask';mask.position.set(0,1.30,.44);costume.add(mask);
 ell(mask,0,.07,.07,.46,.39,.32,M.gold);
 for(const side of [-1,1]){
  ell(mask,side*.31,.24,.27,.10,.12,.07,M.dark);
  ell(mask,side*.22,.15,.34,.10,.095,.05,M.white);
  ell(mask,side*.22,.15,.385,.036,.05,.015,M.dark);
  for(let j=0;j<3;j++)ell(mask,side*(.15+j*.09),-.12,.35,.038,.09,.035,M.dark);
 }
 ell(mask,0,-.05,.39,.16,.12,.16,M.dark);
 const jaw=new THREE.Group();jaw.name='nj625ReogJaw';jaw.position.set(0,-.24,.23);mask.add(jaw);
 ell(jaw,0,-.05,.14,.30,.13,.15,M.dark);
 for(let j=-2;j<=2;j++)ell(jaw,j*.105,-.07,.29,.043,.06,.027,M.white);
 if(grow>=4)for(let j=-2;j<=2;j++)ell(fan,j*.18,rad+.19-Math.abs(j)*.035,.02,.065,.10,.045,M.gold);
 g.userData.nj625Rig={kind:'singa_barong_reog',fan,mask,jaw,costume};
 g.userData.folkloreForm='reog-dadak-merak-performance-mask-not-animal';
}
function nj625Rangda(g,M,phase){
 const grow=Math.max(1,Math.min(7,phase));
 const costume=new THREE.Group();costume.name='nj625RangdaCostume';g.add(costume);
 ell(costume,0,.92,-.04,.44,.76,.31,M.dark);
 for(const side of [-1,1]){
  const arm=new THREE.Group();arm.name='nj625RangdaArm'+(side<0?'L':'R');arm.position.set(side*.36,1.43,0);costume.add(arm);
  cylinder(arm,0,0,0,side*.22,-.50,.20,.10,.075,M.dark);
  for(let j=-1;j<=1;j++){
   const claw=new THREE.Mesh(new THREE.ConeGeometry(.033,.20,6),M.gold);
   claw.position.set(side*.22+j*.060,-.58,.26);claw.rotation.x=Math.PI;arm.add(claw);
  }
 }
 const mask=new THREE.Group();mask.name='nj625RangdaMask';mask.position.set(0,1.89,.19);costume.add(mask);
 ell(mask,0,0,.06,.39,.43,.26,M.light);
 const wig=new THREE.Group();wig.name='nj625RangdaWig';mask.add(wig);
 const hairs=7+grow*3;
 for(let j=0;j<hairs;j++){
  const a=-1.30+j*2.6/(hairs-1);
  tube(wig,[[Math.sin(a)*.27,.30,0],[Math.sin(a)*(.34+grow*.015),-.17,-.13],[Math.sin(a)*(.38+grow*.022),-.50-grow*.065,-.16]],.023,M.black);
 }
 for(const side of [-1,1]){
  ell(mask,side*.20,.10,.28,.12,.115,.08,M.white);
  ell(mask,side*.20,.10,.36,.045,.065,.022,M.dark);
  ell(mask,side*.36,.02,.12,.11,.17,.06,M.gold);
  const fang=new THREE.Mesh(new THREE.ConeGeometry(.068,.28,7),M.white);
  fang.rotation.x=Math.PI;fang.position.set(side*.22,-.24,.34);mask.add(fang);
 }
 ell(mask,0,-.11,.30,.17,.13,.12,M.dark);
 const tongue=new THREE.Group();tongue.name='nj625RangdaTongue';tongue.position.set(0,-.24,.38);mask.add(tongue);
 ell(tongue,0,-.13,.02,.09,.17+grow*.034,.032,M.pink);
 if(grow>=5)for(let j=0;j<grow-3;j++)ell(mask,(j-(grow-4)/2)*.10,.43,.09,.035,.10,.055,M.gold);
 g.userData.nj625Rig={kind:'rangda',costume,mask,wig,tongue,arms:['nj625RangdaArmL','nj625RangdaArmR']};
 g.userData.folkloreForm='rangda-ritual-mask-costume-not-biological-witch';
}
function nj625Wewe(g,M,phase){
 const grow=Math.max(1,Math.min(7,phase));
 const torso=new THREE.Group();torso.name='nj625WeweCloak';g.add(torso);
 ell(torso,0,.90,0,.38,.77,.30,M.dark);
 ell(torso,0,.49,.02,.53,.25,.38,M.main);
 // Draped shawl suggests shelter and an enveloping gesture without sexualization.
 const shawl=new THREE.Group();shawl.name='nj625WeweShawl';torso.add(shawl);
 for(const side of [-1,1]){
  const arm=new THREE.Group();arm.name='nj625WeweArm'+(side<0?'L':'R');arm.position.set(side*.30,1.40,.02);torso.add(arm);
  cylinder(arm,0,0,0,side*.22,-.40,.19,.12,.09,M.main);
  ell(arm,side*.22,-.43,.24,.12,.12,.09,M.light);
  const drape=ell(shawl,side*.40,1.07,.14,.17,.47+grow*.028,.20,M.light);drape.rotation.z=side*.17;
 }
 const head=new THREE.Group();head.name='nj625WeweHead';head.position.set(0,1.94,.09);torso.add(head);
 ell(head,0,0,.08,.30,.35,.28,M.light);
 eyes(head,M,0,.05,.33,.17,.044);
 ell(head,0,-.17,.35,.09,.026,.025,M.dark);
 const hair=new THREE.Group();hair.name='nj625WeweHair';head.add(hair);
 ell(hair,0,.27,-.08,.36,.20,.28,M.black);
 const count=5+grow*2;
 for(let j=0;j<count;j++){
  const a=-1.1+j*2.2/(count-1);
  tube(hair,[[Math.sin(a)*.23,.27,-.06],[Math.sin(a)*.30,-.10,-.15],[Math.sin(a)*.35,-.44-grow*.063,-.15]],.027,M.black);
 }
 if(grow>=4)for(let j=0;j<grow-2;j++)ell(shawl,(j-(grow-3)/2)*.13,.61,.34,.04,.11,.05,M.gold);
 g.userData.nj625Rig={kind:'wewe',torso,head,hair,shawl,arms:['nj625WeweArmL','nj625WeweArmR']};
 g.userData.folkloreForm='wewe-gombel-javanese-story-guardian-silhouette';
}

// NUSAJIWA 6.26 — narrative-specific eight-phase procedural figures.
// Evidence describes oral tradition / recorded texts, not physical proof or canonical age stages.
const NJ626_STAGE={
 nyi_roro_kidul:[
  'Segel ombak Laut Selatan; telur merupakan wadah fiksi game, bukan reproduksi tokoh legenda.',
  'Figur ratu mini dengan mahkota sederhana dan satu pita ombak; bukan putri duyung.',
  'Jubah air dan mahkota bertambah; gelombang kecil mengitari kaki.',
  'Gerak selendang dan dua pita ombak dipisah dari badan.',
  'Siluet ratu pesisir makin jelas, kain panjang serta ornamen gelombang.',
  'Ratu Laut Selatan: figur perempuan berbusana panjang, mahkota dan motif ombak simbolis.',
  'Versi senior: detail mahkota dan kain bertambah, bukan klaim usia tokoh mitos.',
  'Legenda: sosok ratu tetap manusiawi; efek batu elemen tidak menjadi ciri kisah.'
 ],
 jaka_tarub:[
  'Segel hutan dan selendang; bukan telur biologis seorang manusia.',
  'Figur anak desa kecil dengan busana sederhana dan kantong anyaman.',
  'Rambut dan busana lebih rinci; motif hutan pertama muncul.',
  'Tas anyaman dan kain selendang simbolik hadir sebagai motif cerita.',
  'Gerak tangan, keranjang, dan daun hutan mulai berbeda.',
  'Jaka Tarub: figur pemuda Jawa dengan busana desa, motif hutan dan selendang cerita.',
  'Versi senior: tekstur kain dan anyaman lebih rinci; pertumbuhan fiksi.',
  'Legenda: unsur cerita dipertahankan; batu elemen hanyalah fiksi permainan.'
 ],
 kebo_iwa:[
  'Segel batu bangunan; bukan telur biologis Kebo Iwa.',
  'Figur manusia kecil dan satu balok batu mini; tidak berkepala kerbau.',
  'Bahu dan lengan bertambah tegas; batu dengan satu pola ukir.',
  'Lengan dan balok batu bergerak terpisah; ornamen bangunan mulai muncul.',
  'Siluet figur besar, sabuk dan panel batu berornamen makin jelas.',
  'Kebo Iwa: tokoh legenda Bali, sosok kuat dengan motif batu dan pembangunan pura.',
  'Versi senior: detail ukir lebih kaya; bukan usia historis yang dibuktikan.',
  'Legenda: motif arsitektur dipertahankan, aura batu elemen hanya fantasi.'
 ]
};
const NJ626_CULTURAL={
 nyi_roro_kidul:{
  attested:['tokoh ratu atau penguasa gaib Laut Selatan dalam berbagai tradisi Jawa dan Sunda','versi legenda berbeda antarwilayah dan kelompok masyarakat','berhubungan dengan kepercayaan, ritual dan hubungan masyarakat pesisir dengan laut'],
  artistic:['mahkota geometris, pita ombak dan selendang animatif','pilihan warna busana dan jumlah ornamen','delapan fase evolusi serta batu elemen'],
  sources:['https://www.persee.fr/doc/arch_0044-8613_1997_num_53_1_3395','https://doi.org/10.30959/patanjala.v1i2.248']
 },
 jaka_tarub:{
  attested:['tokoh pemuda dalam cerita rakyat Jawa dengan episode bidadari dan selendang','kisah memiliki beragam versi serta dipentaskan dan diilustrasikan dalam seni','pengambilan selendang tanpa izin merupakan bagian konflik cerita, bukan perilaku yang dianjurkan'],
  artistic:['keranjang anyaman, daun dan selendang kecil sebagai lambang cerita','model wajah, busana dan warna yang tidak dianggap rekonstruksi sejarah','delapan fase dan batu elemen fiksi'],
  sources:['https://doi.org/10.1080/13639810600652352','https://journal.isi.ac.id/index.php/invensi/article/view/1583']
 },
 kebo_iwa:{
  attested:['tokoh Kbo Iwa dalam legenda Bali, antara lain terkait cerita asal-usul Danau Batur','Babad Purana Maospahit mengaitkan Kebo Waruga atau Kebo Iwa dengan pembangunan tempat suci','tokoh memiliki beberapa versi cerita dan tidak dapat direduksi menjadi hewan kerbau'],
  artistic:['postur tubuh besar, balok batu berukir dan gerak mengangkat','detail pakaian dan ornamen bangunan yang distilisasi','delapan fase evolusi serta batu elemen fiksi'],
  sources:['https://journal.uinjkt.ac.id/dialektika/article/view/3628','https://kebudayaan.kemdikbud.go.id/bpcbbali/pura-maospahit/']
 }
};
for(const [id,e] of Object.entries(NJ626_CULTURAL))NJ39_SOURCES[id]=e.sources[0];
NJ36_PROFILES.nyi_roro_kidul=['Mitos dan tradisi pesisir Jawa–Sunda','Ratu Laut Selatan dalam berbagai versi tradisi; gelombang dan mahkota dalam game merupakan simbol artistik, bukan potret tunggal yang kanonis.'];
NJ36_PROFILES.jaka_tarub=['Cerita rakyat Jawa','Pemuda dalam kisah bidadari dan selendang. Konflik pengambilan selendang tidak dimaksudkan sebagai teladan; figur, pakaian dan pertumbuhan adalah interpretasi game.'];
NJ36_PROFILES.kebo_iwa=['Legenda Bali','Kebo Iwa atau Kbo Iwa dikaitkan dengan kisah Danau Batur dan tradisi pembangunan. Figur manusia, bukan kerbau berkepala hewan.'];
function nj626SeaQueen(g,M,phase){
 const grow=Math.max(1,Math.min(7,Number(phase)||1));
 const robe=new THREE.Group();robe.name='nj626QueenRobe';g.add(robe);
 ell(robe,0,.93,-.05,.32+.020*grow,.72,.29,M.main);
 ell(robe,0,.45,.01,.46+.017*grow,.28,.38,M.light);
 const head=new THREE.Group();head.name='nj626QueenHead';head.position.set(0,1.90,.12);robe.add(head);
 ell(head,0,0,.05,.27,.33,.27,M.light);eyes(head,M,0,.04,.30,.15,.038);
 ell(head,0,.27,-.10,.32,.14,.23,M.dark);
 const crown=new THREE.Group();crown.name='nj626QueenCrown';head.add(crown);
 for(let j=-2;j<=2;j++){
  const tip=new THREE.Mesh(new THREE.ConeGeometry(.065,.18+grow*.027+(2-Math.abs(j))*.04,5),M.gold);
  tip.position.set(j*.105,.38+grow*.009,.01);crown.add(tip);
 }
 const veil=new THREE.Group();veil.name='nj626QueenVeil';robe.add(veil);
 for(const side of [-1,1]){
  const arm=new THREE.Group();arm.name='nj626QueenArm'+(side<0?'L':'R');arm.position.set(side*.32,1.46,.02);robe.add(arm);
  cylinder(arm,0,0,0,side*.23,-.44,.13,.09,.07,M.main);
  ell(arm,side*.23,-.45,.13,.09,.10,.07,M.light);
  const scarf=ell(veil,side*.44,1.07,-.08,.14,.43+grow*.033,.12,M.gold);scarf.rotation.z=side*.16;
 }
 const waves=[];
 for(const side of [-1,1]){
  const wave=new THREE.Group();wave.name='nj626QueenWave'+(side<0?'L':'R');wave.position.set(side*.50,.36,-.13);robe.add(wave);waves.push(wave);
  const beads=2+grow;
  for(let i=0;i<beads;i++){
   const a=i/(beads-1)*Math.PI;
   ell(wave,side*(.08+i*.065),Math.sin(a)*(.14+grow*.023),-.02,.065,.06,.10,i%2?M.light:M.gold);
  }
 }
 if(grow>=5)for(let i=0;i<grow-3;i++)ell(robe,(i-(grow-4)/2)*.16,.55,.36,.047,.11,.04,M.gold);
 g.userData.nj626Rig={kind:'nyi_roro_kidul',robe,head,crown,veil,waves};
 g.userData.folkloreForm='south-sea-queen-human-figure-with-symbolic-waves-not-mermaid';
}
function nj626JakaTarub(g,M,phase){
 const grow=Math.max(1,Math.min(7,Number(phase)||1));
 const torso=new THREE.Group();torso.name='nj626TarubTorso';g.add(torso);
 ell(torso,0,1.11,-.03,.32+.013*grow,.55,.28,M.main);
 ell(torso,0,.77,.04,.36,.17,.29,M.gold);
 for(const side of [-1,1]){
  const leg=new THREE.Group();leg.name='nj626TarubLeg'+(side<0?'L':'R');leg.position.set(side*.16,.70,-.04);torso.add(leg);
  cylinder(leg,0,0,0,side*.02,-.42,.02,.11,.09,M.dark);
  ell(leg,side*.03,-.45,.16,.14,.07,.20,M.dark);
  const arm=new THREE.Group();arm.name='nj626TarubArm'+(side<0?'L':'R');arm.position.set(side*.29,1.49,0);torso.add(arm);
  cylinder(arm,0,0,0,side*.12,-.43,.14,.09,.075,M.light);
 }
 const head=new THREE.Group();head.name='nj626TarubHead';head.position.set(0,1.89,.09);torso.add(head);
 ell(head,0,0,.03,.27,.31,.25,M.light);eyes(head,M,0,.02,.29,.14,.036);
 ell(head,0,.24,-.06,.28,.14,.24,M.dark);
 const basket=new THREE.Group();basket.name='nj626TarubBasket';basket.position.set(.42,.92,.10);torso.add(basket);
 ell(basket,0,0,0,.17,.21,.17,M.gold);
 for(let j=0;j<grow+2;j++){
  const y=-.17+j*.34/(grow+1);
  ell(basket,0,y,.16,.17,.013,.014,M.dark);
 }
 const scarf=new THREE.Group();scarf.name='nj626TarubStoryScarf';scarf.position.set(-.42,1.17,.14);torso.add(scarf);
 const cloth=ell(scarf,-.05,-.22,0,.12,.34+grow*.025,.10,M.light);cloth.rotation.z=-.16;
 const leaves=new THREE.Group();leaves.name='nj626TarubForest';torso.add(leaves);
 for(let j=0;j<grow;j++){
  const leaf=ell(leaves,-.35-j*.045,.43+(j%3)*.13,-.25,.065,.10,.02,M.gold);leaf.rotation.z=.22*j;
 }
 g.userData.nj626Rig={kind:'jaka_tarub',torso,head,basket,scarf,leaves};
 g.userData.folkloreForm='jaka-tarub-human-folktale-protagonist-shawl-story-motif';
}
function nj626KeboIwa(g,M,phase){
 const grow=Math.max(1,Math.min(7,Number(phase)||1));
 const torso=new THREE.Group();torso.name='nj626IwaTorso';g.add(torso);
 ell(torso,0,1.16,0,.39+.035*grow,.60,.33,M.main);
 ell(torso,0,.68,.03,.41,.19,.34,M.gold);
 const head=new THREE.Group();head.name='nj626IwaHead';head.position.set(0,1.98,.12);torso.add(head);
 ell(head,0,0,.04,.31,.34,.29,M.light);eyes(head,M,0,.04,.34,.16,.042);
 ell(head,0,.28,-.07,.33,.14,.24,M.dark);
 const arms=[];
 for(const side of [-1,1]){
  const arm=new THREE.Group();arm.name='nj626IwaArm'+(side<0?'L':'R');arm.position.set(side*(.37+grow*.018),1.52,.03);torso.add(arm);arms.push(arm);
  cylinder(arm,0,0,0,side*.16,-.43,.13,.15,.12,M.main);
  ell(arm,side*.17,-.46,.14,.13,.14,.13,M.light);
  const leg=new THREE.Group();leg.name='nj626IwaLeg'+(side<0?'L':'R');leg.position.set(side*.22,.69,0);torso.add(leg);
  cylinder(leg,0,0,0,side*.025,-.41,.02,.15,.12,M.dark);
  ell(leg,side*.025,-.45,.17,.18,.09,.22,M.dark);
 }
 const stone=new THREE.Group();stone.name='nj626IwaStone';stone.position.set(0,.38,.47);torso.add(stone);
 ell(stone,0,0,0,.42,.21,.21,M.dark);
 for(let j=0;j<grow+1;j++){
  ell(stone,(j-grow/2)*.10,.08,.20,.028,.065,.015,M.gold);
 }
 const belt=new THREE.Group();belt.name='nj626IwaCarving';torso.add(belt);
 for(let j=0;j<grow;j++){
  const tile=ell(belt,(j-(grow-1)/2)*.11,.67,.32,.045,.035,.02,M.light);tile.rotation.z=j*.1;
 }
 g.userData.nj626Rig={kind:'kebo_iwa',torso,head,arms,stone,belt};
 g.userData.folkloreForm='kebo-iwa-human-architect-legend-not-buffalo-animal';
}


// NUSAJIWA 6.27 — three distinct culture-referenced rigs; stage growth is GAME FICTION.
// Dewi Sri's attributes below refer to a specific bronze in Museum Sonobudoyo,
// not a claim that all local depictions share identical iconography.
const NJ627_STAGE={
 dewi_sri:[
  'Segel padi simbolis, bukan telur biologis seorang dewi.',
  'Figur kecil di atas bunga teratai dengan satu batang padi.',
  'Bakal lingkar kepala dan butir padi ditambahkan bertahap.',
  'Mahkota rambut, kalung, dan dudukan teratai mulai terbaca.',
  'Tangkai padi dan perhiasan bertambah; gerak tangan dipisahkan.',
  'Figur duduk di padmasana, padi di tangan, lingkar kepala; inspirasi dari arca Sri Sonobudoyo.',
  'Ornamen teratai dan padi lebih kaya; usia senior adalah fiksi game.',
  'Figur padi dan padmasana dipertahankan; aura batu elemen hanya fantasi.'
 ],
 batara_kala:[
  'Segel wayang simbolis; bukan telur biologis Batara Kala.',
  'Siluet wayang kecil, wajah ekspresif dan lengan yang terpisah.',
  'Topeng bergaya wayang dan mata menonjol lebih terbaca.',
  'Rahang bergerak dan tangan boneka mulai memiliki gestur.',
  'Siluet kepala besar, ornamen pinggir dan kostum panggung bertambah.',
  'Batara Kala versi wayang: wajah ekspresif dan artikulasi lakon Murwakala; bentuk spesifik adalah stilisasi game.',
  'Detail ornamen wayang lebih padat, bukan klaim usia dalam tradisi.',
  'Siluet wayang tetap khas; aura elemen tidak dianggap unsur ruwatan.'
 ],
 putri_mandalika:[
  'Segel ombak dan nyale simbolis; bukan telur biologis tokoh legenda.',
  'Figur putri kecil dengan pakaian sederhana dan garis pantai.',
  'Mahkota dan selendang mulai terbaca, ombak masih minimal.',
  'Ornamen laut dan pita nyale simbolis ditambahkan terpisah dari tubuh.',
  'Busana kerajaan dan motif laut makin kaya; tangan dapat bergerak.',
  'Putri Mandalika sebagai figur manusia, nyale terpisah sebagai lambang tradisi Bau Nyale.',
  'Motif ombak dan nyale diperinci; tidak merekayasa usia historis.',
  'Figur manusia tetap utuh; nyale tetap motif di lingkungan, bukan hadiah transformasi kematian.'
 ]
};
const NJ627_CULTURAL={
 dewi_sri:{
  attested:['Dewi Sri atau Sanghyang Pohaci dikenal dalam berbagai tradisi sebagai figur padi dan kesuburan','arca Sri perunggu koleksi Sonobudoyo menampilkan duduk di padmasana, setangkai padi atau jewawut, sirascakra dan mahkota jatamakuta','bentuk representasi Dewi Sri berbeda menurut tradisi dan medium'],
  artistic:['dudukan teratai poligonal dan padi berbutir yang bergerak','jumlah kelopak, bulir, dan perhiasan bertambah per fase','telur simbolis, umur dan elemen legenda adalah sistem game'],
  sources:['https://pameranbersama.ranggawarsitamuseum.id/arca-dewi-sri/','https://www.museumnasional.or.id/4384/']
 },
 batara_kala:{
  attested:['Batara Kala muncul dalam lakon Murwakala dan tradisi ruwatan Jawa','kajian visual wayang Batara Kala Yogyakarta mencatat banyak representasi, bukan satu bentuk baku','ruwatan mempunyai konteks sosial, simbolik, dan ritual; bukan permainan memelihara setan'],
  artistic:['proporsi wajah topeng, rahang besar dan ornamentasi wayang bergaya fantasi','sendi tangan, panel pinggir dan gerak rahang dalam Tamagotchi','fase usia dan efek elemen adalah interpretasi game'],
  sources:['https://digilib.isi.ac.id/3874/','https://doi.org/10.35312/spet.v6i1.111']
 },
 putri_mandalika:{
  attested:['Putri Mandalika merupakan tokoh legenda Sasak yang terkait dengan tradisi Bau Nyale di Lombok','dalam cerita, nyale dipahami sebagai jelmaan sang putri, sementara tradisi Bau Nyale hidup dalam masyarakat','makna legenda mencakup pengorbanan dan perdamaian dalam sejumlah penuturan'],
  artistic:['figur putri berbusana panjang, mahkota dan pita laut','nyale digambarkan sebagai motif terpisah, bukan organ atau anggota tubuh','delapan fase dan elemen legenda tidak terdapat dalam cerita asal'],
  sources:['https://kebudayaan.kemdikbud.go.id/bpnbbali/2-palelintangan-penerapan-dan-penggunaannya-dalam-kehidupan-sehari-hari/','https://doi.org/10.58258/jupe.v4i5.1297']
 }
};
for(const [id,e] of Object.entries(NJ627_CULTURAL))NJ39_SOURCES[id]=e.sources[0];
NJ36_PROFILES.dewi_sri=['Tradisi agraris Jawa dan Sunda','Dewi padi dan kesuburan; model ini merujuk salah satu arca Sri Sonobudoyo, bukan rupa tunggal yang wajib diikuti semua tradisi.'];
NJ36_PROFILES.batara_kala=['Wayang dan ruwatan Jawa','Tokoh dalam Murwakala dengan keragaman visual. Topeng, sendi, dan tahapan evolusi adalah adaptasi untuk game.'];
NJ36_PROFILES.putri_mandalika=['Legenda Sasak, Lombok','Kisah Putri Mandalika dan tradisi Bau Nyale; nyale hadir sebagai simbol terpisah, tidak dijadikan hadiah transformasi kematian.'];
function nj627Sri(g,M,phase){
 const grow=Math.max(1,Math.min(7,Number(phase)||1));
 const seat=new THREE.Group();seat.name='nj627SriPadmasana';g.add(seat);
 ell(seat,0,.42,0,.46,.13,.43,M.gold);
 const petals=5+grow;
 for(let j=0;j<petals;j++){const a=j*2*Math.PI/petals;const leaf=ell(seat,Math.cos(a)*.40,.43,Math.sin(a)*.36,.14,.09,.20,j%2?M.light:M.gold);leaf.rotation.y=-a;}
 const figure=new THREE.Group();figure.name='nj627SriFigure';g.add(figure);
 ell(figure,0,.85,-.02,.36,.37,.30,M.main);
 ell(figure,0,1.28,0,.30,.36,.25,M.light);
 const head=new THREE.Group();head.name='nj627SriHead';head.position.set(0,1.80,.09);figure.add(head);
 ell(head,0,0,0,.26,.31,.25,M.light);eyes(head,M,0,.03,.25,.14,.035);
 ell(head,0,.29,-.08,.25,.12,.19,M.dark);
 const crown=new THREE.Group();crown.name='nj627SriJatamakuta';head.add(crown);
 for(let j=0;j<grow;j++){const bead=ell(crown,(j-(grow-1)/2)*.065,.38+(j%3)*.037,0,.04,.075,.045,M.gold);bead.rotation.z=.13*j;}
 const halo=new THREE.Group();halo.name='nj627SriSirascakra';head.add(halo);
 const ring=new THREE.Mesh(new THREE.TorusGeometry(.37+.012*grow,.026,6,22),M.gold);ring.position.set(0,.02,-.13);halo.add(ring);
 const arms=[];
 for(const side of [-1,1]){const arm=new THREE.Group();arm.name='nj627SriArm'+(side<0?'L':'R');arm.position.set(side*.28,1.47,.02);figure.add(arm);arms.push(arm);
  cylinder(arm,0,0,0,side*.20,-.26,.19,.085,.06,M.main);ell(arm,side*.20,-.27,.20,.07,.08,.06,M.light);}
 const rice=new THREE.Group();rice.name='nj627SriRice';rice.position.set(-.48,1.16,.24);figure.add(rice);
 tube(rice,[[0,-.25,0],[0,.18,0],[.09,.56,0]],.025,M.gold);
 for(let j=0;j<grow+2;j++){const y=.13+j*.48/(grow+2),side=j%2?-1:1;
  tube(rice,[[.02,y,0],[side*(.10+j*.007),y+.07,.01]],.011,M.gold);
  ell(rice,side*(.10+j*.007),y+.07,.01,.033,.065,.027,M.light);}
 g.userData.nj627Rig={kind:'dewi_sri',figure,head,halo,rice,arms,seat};
 g.userData.folkloreForm='sri-sonobudoyo-inspired-seated-lotus-rice-stalk-halo';
}
function nj627Kala(g,M,phase){
 const grow=Math.max(1,Math.min(7,Number(phase)||1));
 const figure=new THREE.Group();figure.name='nj627KalaFigure';g.add(figure);
 ell(figure,0,.98,0,.40+.022*grow,.61,.15,M.dark);
 ell(figure,0,.48,.01,.41,.20,.13,M.gold);
 const head=new THREE.Group();head.name='nj627KalaMask';head.position.set(0,1.92,.06);figure.add(head);
 ell(head,0,0,0,.42,.46,.16,M.main);
 for(const side of [-1,1]){ell(head,side*.19,.12,.17,.12,.13,.045,M.white);ell(head,side*.19,.11,.215,.04,.07,.017,M.dark);}
 const jaw=new THREE.Group();jaw.name='nj627KalaJaw';jaw.position.set(0,-.21,.12);head.add(jaw);
 ell(jaw,0,-.14,.06,.31,.17,.13,M.dark);
 for(const side of [-1,1]){const fang=new THREE.Mesh(new THREE.ConeGeometry(.055,.23,5),M.white);fang.rotation.z=Math.PI;fang.position.set(side*.23,-.13,.19);jaw.add(fang);}
 const ornaments=new THREE.Group();ornaments.name='nj627KalaWayangOrnaments';head.add(ornaments);
 for(let j=0;j<grow+3;j++){const a=Math.PI*.16+j*Math.PI*.68/(grow+2);const x=Math.cos(a)*.46,y=Math.sin(a)*.49;
  const gem=ell(ornaments,x,y,-.01,.06,.12,.045,j%2?M.gold:M.light);gem.rotation.z=-a;}
 const arms=[];
 for(const side of [-1,1]){const arm=new THREE.Group();arm.name='nj627KalaArm'+(side<0?'L':'R');arm.position.set(side*.39,1.37,.01);figure.add(arm);arms.push(arm);
  cylinder(arm,0,0,0,side*.16,-.38,.07,.095,.07,M.main);ell(arm,side*.17,-.40,.08,.09,.09,.06,M.gold);}
 for(let j=0;j<grow;j++){ell(figure,(j-(grow-1)/2)*.12,.72,.18,.05,.10,.03,M.gold);}
 g.userData.nj627Rig={kind:'batara_kala',figure,head,jaw,arms,ornaments};
 g.userData.folkloreForm='murwakala-wayang-inspired-puppet-mask-not-canonical-single-design';
}
function nj627Mandalika(g,M,phase){
 const grow=Math.max(1,Math.min(7,Number(phase)||1));
 const figure=new THREE.Group();figure.name='nj627MandalikaFigure';g.add(figure);
 ell(figure,0,.93,0,.34,.61,.29,M.main);
 ell(figure,0,.44,.02,.44+.014*grow,.26,.37,M.light);
 const head=new THREE.Group();head.name='nj627MandalikaHead';head.position.set(0,1.86,.10);figure.add(head);
 ell(head,0,0,.03,.26,.32,.26,M.light);eyes(head,M,0,.03,.30,.14,.034);
 ell(head,0,.29,-.08,.28,.14,.21,M.dark);
 const crown=new THREE.Group();crown.name='nj627MandalikaCrown';head.add(crown);
 for(let j=0;j<grow;j++){const x=(j-(grow-1)/2)*.065;ell(crown,x,.37+Math.sin(j)*.04,0,.035,.065,.035,M.gold);}
 const veil=new THREE.Group();veil.name='nj627MandalikaVeil';figure.add(veil);
 for(const side of [-1,1]){const sleeve=new THREE.Group();sleeve.name='nj627MandalikaArm'+(side<0?'L':'R');sleeve.position.set(side*.32,1.43,.02);figure.add(sleeve);
  cylinder(sleeve,0,0,0,side*.16,-.38,.13,.10,.08,M.main);
  const cloth=ell(veil,side*.37,1.10,-.10,.11,.36+grow*.026,.12,M.gold);cloth.rotation.z=side*.12;}
 const sea=new THREE.Group();sea.name='nj627MandalikaSea';sea.position.set(0,.23,.38);g.add(sea);
 for(const side of [-1,1])for(let j=0;j<grow+1;j++){const a=j/(grow+1)*Math.PI;
  ell(sea,side*(.16+j*.09),Math.sin(a)*.11,-.02,.065,.045,.06,j%2?M.light:M.gold);}
 const nyale=new THREE.Group();nyale.name='nj627MandalikaNyaleSymbols';nyale.position.set(0,.13,.65);g.add(nyale);
 // These independent ribbons symbolize the Bau Nyale story; never part of the human body.
 for(let j=0;j<grow+2;j++){const side=j%2?-1:1;
  const strand=ell(nyale,side*(.08+j*.075),.02+(j%3)*.038,0,.06,.018+.005*(j%3),.025,j%2?M.gold:M.light);strand.rotation.z=side*.22;}
 g.userData.nj627Rig={kind:'putri_mandalika',figure,head,veil,sea,nyale};
 g.userData.folkloreForm='sasak-mandalika-human-figure-nyale-symbols-separate-not-body';
}


// NUSAJIWA 6.28 — Ramayana figures and Candi Makara: character-specific 8-phase procedural rigs.
// Reference iconography and narratives are recorded separately from invented pet growth and motions.
const NJ628_STAGE={
 hanoman:[
  'Segel putih dengan motif ekor melingkar; bukan telur biologis Hanoman.',
  'Figur kera putih mungil, telinga dan ekor mulai terbaca.',
  'Lengan dan kaki terpisah, ekor memanjang sebagai siluet khas.',
  'Wajah kera, jambul dan kain panggung mulai terperinci.',
  'Ekor bersegmen dan gerak kedua lengan makin jelas.',
  'Figur kera putih gagah dengan ornamen kepala dan ekor panjang; adaptasi ikonografi wayang Jawa.',
  'Penanda kematangan berupa detail kain dan perhiasan, bukan umur historis Hanoman.',
  'Identitas kera putih tetap utuh; efek elemen legenda hanya fantasi permainan.'
 ],
 jatayu:[
  'Segel sayap dan paruh simbolis; bukan telur biologis burung epik.',
  'Burung kecil dengan paruh melengkung dan sayap pendek.',
  'Bulu sayap berlapis dan cakar mulai tampak.',
  'Jamang kepala dan sayap lebar berkembang bertahap.',
  'Bulu sayap, ekor, dan gerak leher semakin kuat.',
  'Jatayu sebagai burung perkasa bersayap besar, paruh panjang dan jamang; terinspirasi topeng Jatayu Sonobudoyo.',
  'Bulu dan jamang lebih rinci; tidak mengubah kisah pengorbanan menjadi hadiah luka.',
  'Jatayu tetap berwujud burung, bukan Garuda manusia-burung; aura batu adalah fiksi game.'
 ],
 makara_candi:[
  'Segel relief batu, bukan telur makhluk hidup.',
  'Miniatur pahatan kepala makara dengan rahang terbuka.',
  'Belalai melengkung dan tanduk mulai tampak.',
  'Rahang, gigi, dan lapik arca diperjelas.',
  'Sulur dan detail ornamen pahatan semakin kaya.',
  'Makara penjaga pintu candi: mulut lebar, belalai gajah, tanduk, dan figur singa kecil sebagai rujukan salah satu arca Candi Sewu.',
  'Detail batu dan sulur lebih banyak; bukan klaim bahwa arca menua.',
  'Siluet makara arsitektural dipertahankan; gerakan dan elemen legenda murni fantasi game.'
 ]
};
const NJ628_CULTURAL={
 hanoman:{
  attested:['Hanoman atau Anoman merupakan tokoh kera dalam Ramayana yang hadir pada relief sejumlah candi Jawa','penggambaran Hanoman berubah antarperiode dan medium, termasuk tradisi wayang','kajian BRIN mencatat kehadirannya di Prambanan, Panataran, Yudha dan Sukuh'],
  artistic:['bentuk kera putih berkain, sendi lengan, ekor bersegmen dan ornamen kepala disederhanakan untuk game','delapan fase usia dan respons bermain atau tidur bukan kisah Ramayana','tidak mengklaim satu figur wayang sebagai representasi kanonis semua daerah'],
  sources:['https://ejournal.brin.go.id/panalungtik/article/view/789','https://www.metmuseum.org/art/collection/search/307902']
 },
 jatayu:{
  attested:['Jatayu merupakan burung perkasa dalam Ramayana yang menolong Sita dan melawan Rahwana','Museum Sonobudoyo mencatat topeng Jatayu berjamang, paruh panjang, mata plolon dan warna kuning keemasan','sebuah lukisan panji Bali sekitar 1900 dengan Jatayu didokumentasikan Australian Museum'],
  artistic:['sayap berlapis dan cakar dibuat sebagai rig bergerak untuk permainan','jumlah bulu dan jamang meningkat menurut fase; tidak ada evolusi telur-ke-legenda dalam kisah','luka Jatayu dalam kisah tidak diperlakukan sebagai bonus atau hadiah perkembangan'],
  sources:['https://sonobudoyo.jogjaprov.go.id/id/tulisan/read/jatayu-burung-penjaga-kebenaran-dalam-kisah-ramayana-dan-imajinasi-budaya-jawa','https://australian.museum/learn/cultures/international-collection/balinese/jatayu-bali-painting-banner-e74240/']
 },
 makara_candi:{
  attested:['makara ialah motif makhluk gabungan yang sering menjadi penjaga pintu candi dan terkait unsur air','Rijksmuseum mendokumentasikan makara dari Candi Sewu dengan belalai gajah, tanduk domba, mulut naga dan figur singa di mulut','Balai Konservasi Borobudur menjelaskan makara sebagai ornamen candi, bukan hewan biologis'],
  artistic:['makara dibentuk sebagai arca hidup berlapik batu dengan belalai, rahang, dan sulur berartikulasi','jumlah detail pahatan dan ornamen berubah menurut fase sebagai mekanik game','tidak mengklaim semua makara Jawa memiliki singa kecil atau tanduk yang sama'],
  sources:['https://www.rijksmuseum.nl/en/collection/object/Makara--00829ab352ef7422763ac9e48e187dbb','https://kebudayaan.kemdikbud.go.id/bkborobudur/makara-sebagai-hiasan-di-pintu-masuk-candi/']
 }
};
for(const [id,e] of Object.entries(NJ628_CULTURAL))NJ39_SOURCES[id]=e.sources[0];
NJ36_PROFILES.hanoman=['Ramayana dalam seni Jawa dan Bali','Tokoh kera dalam relief dan wayang Ramayana; proporsi kera putih dan rig ekor adalah interpretasi game, bukan satu bentuk baku.'];
NJ36_PROFILES.jatayu=['Ramayana dalam seni Jawa dan Bali','Burung penolong Sita; topeng Jatayu Sonobudoyo memiliki jamang dan paruh panjang. Perkembangan usia hanya fiksi game.'];
NJ36_PROFILES.makara_candi=['Ornamen percandian Jawa','Makara motif penjaga pintu dan jaladwara, bukan spesies hewan; detail arca berbeda antarperiode dan situs.'];
function nj628Hanoman(g,M,phase){
 const grow=Math.max(1,Math.min(7,Number(phase)||1));
 const torso=new THREE.Group();torso.name='nj628HanomanTorso';g.add(torso);
 ell(torso,0,1.10,0,.34+.015*grow,.55,.30,M.light);
 ell(torso,0,1.36,.23,.29,.30,.15,M.white);
 for(const side of [-1,1])ell(torso,side*.17,.55,0,.15,.36,.17,M.light);
 const head=new THREE.Group();head.name='nj628HanomanHead';head.position.set(0,1.87,.16);torso.add(head);
 ell(head,0,0,0,.28,.31,.24,M.white);ell(head,0,-.13,.22,.21,.14,.13,M.light);
 eyes(head,M,0,.08,.23,.15,.04);
 for(const side of [-1,1]){ell(head,side*.29,.035,-.01,.10,.13,.06,M.light);ell(head,side*.29,.035,.04,.047,.067,.02,M.pink);}
 const diadem=new THREE.Group();diadem.name='nj628HanomanJamang';head.add(diadem);
 for(let i=0;i<grow+1;i++){const x=(i-grow/2)*.08;const crest=ell(diadem,x,.34+Math.sin(i*.8)*.025,-.04,.045,.09,.045,i%2?M.gold:M.dark);crest.rotation.z=x*.30;}
 const arms=[];
 for(const side of [-1,1]){const arm=new THREE.Group();arm.name='nj628HanomanArm'+(side<0?'L':'R');arm.position.set(side*.35,1.48,.03);torso.add(arm);arms.push(arm);
  cylinder(arm,0,0,0,side*.13,-.48,.12,.11,.09,M.light);ell(arm,side*.14,-.49,.14,.10,.10,.08,M.white);}
 const tail=new THREE.Group();tail.name='nj628HanomanTail';tail.position.set(0,.72,-.27);torso.add(tail);
 const n=3+grow;for(let i=0;i<n;i++){const q=i/n;const a=q*Math.PI*1.23;
  const node=ell(tail,Math.sin(a)*(.16+.20*q),q*.80,Math.cos(a)*.20-.12,.08-q*.024,.12,.085,M.white);node.rotation.z=-a*.48;}
 const scarf=new THREE.Group();scarf.name='nj628HanomanCloth';torso.add(scarf);
 for(const side of [-1,1]){const cloth=ell(scarf,side*.25,.86,.06,.12,.24+grow*.016,.11,M.gold);cloth.rotation.z=side*.10;}
 g.userData.nj628Rig={kind:'hanoman',torso,head,diadem,arms,tail,scarf};
 g.userData.folkloreForm='hanoman-ramayana-javanese-white-simian-long-tail-not-generic-human';
}
function nj628Jatayu(g,M,phase){
 const grow=Math.max(1,Math.min(7,Number(phase)||1));
 const torso=new THREE.Group();torso.name='nj628JatayuBody';g.add(torso);
 ell(torso,0,1.10,0,.39+.020*grow,.49,.34,M.main);
 ell(torso,0,1.39,.18,.26,.32,.25,M.light);
 const head=new THREE.Group();head.name='nj628JatayuHead';head.position.set(0,1.88,.17);torso.add(head);
 ell(head,0,0,0,.25,.28,.25,M.gold);eyes(head,M,0,.06,.23,.15,.035);
 const beak=new THREE.Group();beak.name='nj628JatayuBeak';beak.position.set(0,-.09,.21);head.add(beak);
 const bill=new THREE.Mesh(new THREE.ConeGeometry(.115,.36,7),M.gold);bill.rotation.x=Math.PI/2;bill.position.set(0,-.065,.16);beak.add(bill);
 const crown=new THREE.Group();crown.name='nj628JatayuJamang';head.add(crown);
 for(let i=0;i<grow+2;i++){const x=(i-(grow+1)/2)*.065;const feather=ell(crown,x,.29+.05*Math.cos(i),-.06,.045,.12,.065,i%2?M.gold:M.light);feather.rotation.z=x*.2;}
 const wings=[];
 for(const side of [-1,1]){const wing=new THREE.Group();wing.name='nj628JatayuWing'+(side<0?'L':'R');wing.position.set(side*.33,1.43,-.08);torso.add(wing);wings.push(wing);
  ell(wing,side*.28,-.02,-.04,.37,.15,.17,M.dark);
  for(let j=0;j<grow+3;j++){const t=j/(grow+3);const feather=ell(wing,side*(.20+t*.54),-.16-t*.19,-.01,.075,.20+t*.06,.10,j%2?M.gold:M.light);feather.rotation.z=side*(.28+t*.35);}}
 const tail=new THREE.Group();tail.name='nj628JatayuTail';tail.position.set(0,.85,-.32);torso.add(tail);
 for(let j=0;j<grow+2;j++){const x=(j-(grow+1)/2)*.11;const feather=ell(tail,x,-.04,-.28,.075,.10,.32,M.gold);feather.rotation.y=x*.6;}
 const talons=[];for(const side of [-1,1]){const foot=new THREE.Group();foot.name='nj628JatayuClaw'+(side<0?'L':'R');foot.position.set(side*.22,.61,.04);torso.add(foot);talons.push(foot);
  cylinder(foot,0,0,0,0,-.25,.12,.065,.045,M.gold);for(let j=-1;j<=1;j++){const toe=new THREE.Mesh(new THREE.ConeGeometry(.035,.15,5),M.dark);toe.rotation.x=Math.PI/2;toe.position.set(j*.07,-.26,.22);foot.add(toe);}}
 g.userData.nj628Rig={kind:'jatayu',torso,head,beak,crown,wings,tail,talons};
 g.userData.folkloreForm='jatayu-avian-ramayana-golden-mask-long-beak-not-humanoid-garuda';
}
function nj628Makara(g,M,phase){
 const grow=Math.max(1,Math.min(7,Number(phase)||1));
 const base=new THREE.Group();base.name='nj628MakaraTempleBase';g.add(base);
 ell(base,0,.30,0,.66,.16,.46,M.dark);ell(base,0,.46,0,.57,.09,.41,M.gold);
 const head=new THREE.Group();head.name='nj628MakaraHead';head.position.set(0,1.18,0);g.add(head);
 ell(head,0,0,0,.47,.43,.38,M.main);
 for(const side of [-1,1]){ell(head,side*.26,.10,.30,.14,.13,.09,M.gold);ell(head,side*.26,.11,.39,.047,.06,.026,M.dark);}
 const jaw=new THREE.Group();jaw.name='nj628MakaraJaw';jaw.position.set(0,-.25,.22);head.add(jaw);
 ell(jaw,0,-.09,.12,.40,.17,.27,M.dark);
 for(let j=0;j<grow+3;j++){const x=(j-(grow+2)/2)*.085;const tooth=new THREE.Mesh(new THREE.ConeGeometry(.028,.12,5),M.white);tooth.rotation.z=Math.PI;tooth.position.set(x,-.02,.34);jaw.add(tooth);}
 const trunk=new THREE.Group();trunk.name='nj628MakaraTrunk';trunk.position.set(0,.24,.24);head.add(trunk);
 tube(trunk,[[0,0,0],[0,.23,.20],[.08,.44,.25],[.22,.55,.18]],.085,M.light);
 const horns=[];
 for(const side of [-1,1]){const horn=new THREE.Group();horn.name='nj628MakaraHorn'+(side<0?'L':'R');horn.position.set(side*.35,.26,-.03);head.add(horn);horns.push(horn);
  const h=new THREE.Mesh(new THREE.ConeGeometry(.105,.37,7),M.gold);h.rotation.z=side*-.47;h.position.set(side*.09,.16,0);horn.add(h);}
 const lion=new THREE.Group();lion.name='nj628MakaraMouthLion';lion.position.set(0,-.23,.42);head.add(lion);
 ell(lion,0,0,0,.16,.16,.10,M.gold);ell(lion,0,.02,.08,.11,.10,.07,M.light);eyes(lion,M,0,.05,.13,.07,.017);
 const tendrils=new THREE.Group();tendrils.name='nj628MakaraStoneScrolls';head.add(tendrils);
 for(let j=0;j<grow+2;j++){const side=j%2?-1:1;const x=side*(.27+.025*j);const y=-.06+(j%4)*.13;
  const leaf=ell(tendrils,x,y,-.16,.07,.14,.08,j%2?M.gold:M.light);leaf.rotation.z=side*.44;}
 g.userData.nj628Rig={kind:'makara_candi',base,head,jaw,trunk,horns,lion,tendrils};
 g.userData.folkloreForm='candi-sewu-architectural-makara-elephant-trunk-horns-wide-mouth-not-living-animal';
}



// NUSAJIWA 6.30: folklore-specific silhouettes; phases are creative game fiction.
const NJ630_CULTURAL={
 sembrani:{tradition:'Kuda Sembrani dalam cerita rakyat Jawa',story:'Kuda ajaib yang dalam beberapa penceritaan mampu terbang; tidak ada satu anatomi kanonis.',art:'Sayap berlapis dan hiasan pelana adalah pilihan desain permainan.',sources:[]},
 ebu_gogo:{tradition:'Cerita lisan Flores',story:'Sosok kecil mirip manusia dalam kisah masyarakat Flores; deskripsi dan penafsirannya beragam.',art:'Bentuk telinga, warna rambut, dan fase evolusi adalah interpretasi game.',sources:[]},
 kuda_lumping:{tradition:'Kesenian kuda kepang/jaran kepang Jawa',story:'Properti pertunjukan berupa kuda pipih dari anyaman, bukan hewan biologis.',art:'Properti hidup dan gerak lentur merupakan fantasi permainan.',sources:[]}
};
function nj630Sembrani(g,M,phase){
 const n=Math.max(1,Math.min(7,Number(phase)||1)),torso=new THREE.Group();torso.name='nj630HorseBody';g.add(torso);
 ell(torso,0,1.1,0,.30+n*.012,.37,.67,M.main);
 const neck=new THREE.Group();neck.name='nj630HorseNeck';neck.position.set(0,1.31,.38);torso.add(neck);ell(neck,0,.22,.06,.16,.36,.19,M.main);
 const head=new THREE.Group();head.name='nj630HorseHead';head.position.set(0,.43,.13);neck.add(head);ell(head,0,0,.08,.19,.20,.32,M.main);ell(head,0,-.12,.32,.15,.11,.17,M.light);eyes(head,M,0,.045,.30,.15,.035);
 for(const side of [-1,1]){const ear=new THREE.Mesh(new THREE.ConeGeometry(.075,.22,6),M.main);ear.position.set(side*.13,.23,-.02);head.add(ear);}
 const legs=[];for(const side of [-1,1])for(const fore of [-1,1]){const leg=new THREE.Group();leg.name='nj630HorseLeg'+side+fore;leg.position.set(side*.22,.92,fore*.43);torso.add(leg);ell(leg,0,-.29,0,.085,.35,.095,M.main);ell(leg,0,-.59,.06,.12,.11,.15,M.dark);legs.push(leg);}
 const wings=[];for(const side of [-1,1]){const wing=new THREE.Group();wing.name='nj630SembraniWing'+side;wing.position.set(side*.28,1.40,-.10);torso.add(wing);for(let i=0;i<n+2;i++){const feather=ell(wing,side*(.11+i*.065),.11+i*.045,-.06-i*.02,.12,.29+i*.035,.065,i%2?M.light:M.gold);feather.rotation.z=-side*.30;}wings.push(wing);}
 const tail=new THREE.Group();tail.name='nj630HorseTail';tail.position.set(0,1.26,-.68);torso.add(tail);for(let i=0;i<n+1;i++)ell(tail,(i-(n/2))*.03,-.21-i*.03,-.10,.04,.27,.05,M.dark);
 g.userData.nj630Rig={kind:'sembrani',torso,head,neck,legs,wings,tail};g.userData.folkloreForm='winged-horse-creative-folklore-variant';
}
function nj630Ebu(g,M,phase){
 const n=Math.max(1,Math.min(7,Number(phase)||1)),torso=new THREE.Group();torso.name='nj630EbuTorso';g.add(torso);ell(torso,0,.72,0,.22+n*.008,.32,.16,M.main);
 const head=new THREE.Group();head.name='nj630EbuHead';head.position.set(0,1.20,0);torso.add(head);ell(head,0,0,.03,.25,.29,.23,M.light);eyes(head,M,0,.02,.245,.12,.042);
 const hair=new THREE.Group();hair.name='nj630EbuHair';head.add(hair);for(let i=0;i<n+5;i++){const a=i/(n+5)*Math.PI*2;ell(hair,Math.cos(a)*.21,.13,Math.sin(a)*.15,.06,.12,.06,M.dark);}
 const arms=[],legs=[];for(const side of [-1,1]){const arm=new THREE.Group();arm.name='nj630EbuArm'+side;arm.position.set(side*.21,.93,0);torso.add(arm);ell(arm,side*.05,-.21,.02,.085,.27,.09,M.light);arms.push(arm);const leg=new THREE.Group();leg.name='nj630EbuLeg'+side;leg.position.set(side*.12,.46,0);torso.add(leg);ell(leg,0,-.20,.03,.095,.23,.10,M.main);legs.push(leg);}
 g.userData.nj630Rig={kind:'ebu_gogo',torso,head,hair,arms,legs};g.userData.folkloreForm='flores-small-humanoid-oral-tradition-not-cryptozoological-proof';
}
function nj630Lumping(g,M,phase){
 const n=Math.max(1,Math.min(7,Number(phase)||1)),board=new THREE.Group();board.name='nj630WovenHorseBoard';g.add(board);
 ell(board,0,1.01,0,.085,.48,.67,M.gold);const neck=new THREE.Group();neck.name='nj630FlatHorseNeck';neck.position.set(0,1.30,.37);board.add(neck);ell(neck,0,.19,.06,.08,.37,.15,M.gold);
 const head=new THREE.Group();head.name='nj630FlatHorseHead';head.position.set(0,.40,.13);neck.add(head);ell(head,0,0,.10,.08,.21,.27,M.main);eyes(head,M,0,.07,.29,.07,.025);
 const tassels=new THREE.Group();tassels.name='nj630KudaKepangTassels';board.add(tassels);for(let i=0;i<n+3;i++)ell(tassels,0,.63+(i%3)*.14,-.54+i*.12,.025,.08,.05,i%2?M.pink:M.light);
 const weave=new THREE.Group();weave.name='nj630KudaKepangWeave';board.add(weave);for(let i=0;i<n*3+4;i++){const row=i%(n+2),col=Math.floor(i/(n+2));ell(weave,.09, .76+row*.055,-.41+col*.13,.018,.022,.09,i%2?M.dark:M.light);}
 g.userData.nj630Rig={kind:'kuda_lumping',board,neck,head,tassels};g.userData.folkloreForm='flat-woven-performance-prop-not-living-horse';
}
for(const [id,e] of Object.entries(NJ630_CULTURAL)){if(e.sources.length)NJ39_SOURCES[id]=e.sources[0];NJ36_PROFILES[id]=[e.tradition,e.story+' Desain permainan: '+e.art];}
// NUSAJIWA 6.29 — three regional iconographies with independent 8-phase procedural rigs.
// Cultural motifs are not biological animals. Pet stages and articulated movements are game-only.
const NJ629_STAGE={
 "warak_ngendog": [
  "Segel hias Dugderan dengan motif telur dan kepala naga; bukan telur biologis Warak.",
  "Miniatur Warak berkepala naga, leher memanjang, empat kaki kecil dan telur hias terpisah.",
  "Badan seperti unta/buraq dan kaki berkuku kambing mulai jelas; sisik dan warna kertas bertambah.",
  "Kepala naga bersungut dan leher panjang; empat kaki kambing dan telur Dugderan tidak menyatu dengan tubuh.",
  "Surai warna-warni serta bentuk boneka kirab makin kompleks; kepala dapat menoleh.",
  "Warak Ngendog sebagai ikon Dugderan Semarang: kepala naga, badan panjang, kaki kambing, telur terpisah.",
  "Tekstur lipatan kertas dan ornamen kirab bertambah; bukan penuaan hewan nyata.",
  "Warak tetap ikon akulturasi Semarang; aura batu Legenda tidak mengubah bentuk menjadi naga generik."
 ],
 "boraspati_tano": [
  "Segel gorga dengan motif cicak; bukan telur biologis dewa tanah.",
  "Relief cicak kecil menempel pada papan kayu; empat kaki terbentang dan ekor terlihat.",
  "Pola garis merah-hitam-putih dan jari kaki relief mulai tampak.",
  "Motif cicak empat kaki di permukaan ukiran, dengan ekor dan pola simetris.",
  "Papan ukir gorga dan gerak ekor sangat terbatas semakin detail.",
  "Boraspati ni Tano sebagai figur kadal/cicak pada pustaha dan artefak Batak, bukan monster naga.",
  "Ukiran dan pola garis semakin halus; usia relief hanya metafora perkembangan game.",
  "Bentuk relief cicak tetap dominan; efek elemen Legenda hanya ornamen game."
 ],
 "bujang_ganong": [
  "Segel topeng merah Ganong; bukan telur biologis tokoh Reog.",
  "Topeng mini merah dengan mata bulat dan hidung besar pada figur penari kecil.",
  "Lengan dan kaki penari terpisah; rambut hitam-putih dan gigi mulai terbaca.",
  "Hidung menonjol, mata melotot, gigi tonggos, dan rambut gimbal tampil jelas.",
  "Gestur lincah, kostum penari dan rambut topeng semakin kaya.",
  "Bujang Ganong bertopeng merah, hidung besar, mata melotot, rambut hitam-putih; patih lincah dalam Reog.",
  "Detail kostum dan keluwesan gerak ditingkatkan; bukan penuaan tokoh cerita.",
  "Bujang Ganong tetap figur penari Reog, bukan raksasa bertanduk; aura batu adalah fantasi game."
 ]
};
const NJ629_CULTURAL={
 "warak_ngendog": {
  "attested": [
   "Warak Ngendog adalah figur tradisi Dugderan Semarang untuk menyambut Ramadan",
   "penggambaran yang sering dikutip memadukan kepala naga, badan buraq/unta, kaki kambing, dan telur",
   "simbol akulturasi dan kebersamaan budaya memiliki beberapa penafsiran lokal"
  ],
  "artistic": [
   "geometri 3D bersendi dengan surai kertas warna-warni dan telur yang bergerak sendiri",
   "delapan fase dan animasi pet adalah fiksi game, bukan siklus hidup Warak",
   "model mengikuti salah satu penggambaran populer, tidak menyatakan satu rupa sebagai bentuk tunggal yang sah"
  ],
  "sources": [
   "https://eprints.undip.ac.id/81040/1/Muhammad_Shaleh_Alfarisi-13060114190020-Antropologi_Sosial-Universitas_Diponegoro_PDF.pdf",
   "https://www.detik.com/jateng/sepakbola/d-6566475/wujud-dan-filosofi-warak-ngendog-makhluk-mitologi-di-jersey-baru-psis"
  ]
 },
 "boraspati_tano": {
  "attested": [
   "Boraspati ni Tano merupakan figur kedewaan tanah dalam tradisi Toba Batak",
   "figur cicak atau kadal ditampilkan pada pustaha, ornamen bangunan, dan wadah ritual",
   "koleksi Naga Morsarang di Metropolitan Museum menampilkan Boraspati ni Tano sebagai kadal pada bagian dalam tanduk"
  ],
  "artistic": [
   "papan gorga dan tubuh cicak dibuat menjadi rig bergerak dengan ekor dan kaki terbatas",
   "pola merah, putih, dan hitam mengikuti bahasa visual ornamen Batak secara sederhana, bukan salinan satu objek museum",
   "tahap usia dan gerak pet hanyalah mekanik game; motif ritual tidak digambarkan sebagai hewan biologis"
  ],
  "sources": [
   "https://www.metmuseum.org/art/collection/search/315889",
   "https://www.metmuseum.org/essays/spiritual-power-in-the-arts-of-the-toba-batak"
  ]
 },
 "bujang_ganong": {
  "attested": [
   "Bujang Ganong atau Pujangga Anom adalah tokoh patih dalam Reog Ponorogo",
   "topeng berwajah merah, berhidung besar, bermata melotot, dan berambut hitam-putih",
   "pertunjukan menekankan kelincahan, akrobatik, serta watak jenaka dan cerdik"
  ],
  "artistic": [
   "model adalah penari manusia bertopeng, bukan makhluk hantu atau raksasa bertanduk",
   "sendi tubuh, loncatan kecil, ayunan rambut, dan perubahan detail kostum dibuat untuk permainan",
   "delapan tahap dan kekuatan batu tidak ditemukan sebagai siklus hidup tokoh Reog"
  ],
  "sources": [
   "https://ponorogo.go.id/pemain-reog/",
   "https://museum.kemenbud.go.id/kajian/detail/ragam%2Btopeng%2Bjawa%2Btimur_115"
  ]
 }
};
for(const [id,e] of Object.entries(NJ629_CULTURAL))NJ39_SOURCES[id]=e.sources[0];
NJ36_PROFILES.warak_ngendog=['Dugderan Semarang','Warak ialah figur kirab dan mainan tradisi Dugderan; kepala naga, badan unta/buraq, kaki kambing dan telur adalah salah satu tafsir visual. Delapan fase hanya fantasi game.'];
NJ36_PROFILES.boraspati_tano=['Ornamen dan kosmologi Batak','Boraspati ni Tano digambarkan sebagai cicak/kadal pada pustaha, ukiran dan benda ritual. Gerakan relief dalam game tidak merepresentasikan praktik ritual.'];
NJ36_PROFILES.bujang_ganong=['Pertunjukan Reog Ponorogo','Tokoh patih jenaka dan akrobatik dengan topeng merah bermata melotot, hidung besar dan rambut hitam-putih; bukan makhluk gaib bertanduk.'];
function nj629Warak(g,M,phase){
 const grow=Math.max(1,Math.min(7,Number(phase)||1));
 const trunk=new THREE.Group();trunk.name='nj629WarakTorso';g.add(trunk);
 ell(trunk,0,1.12,-.11,.41+.016*grow,.43,.69,M.main);
 const neck=new THREE.Group();neck.name='nj629WarakNeck';neck.position.set(0,1.28,.37);trunk.add(neck);
 ell(neck,0,.29,.13,.22,.46,.23,M.light);
 const head=new THREE.Group();head.name='nj629WarakDragonHead';head.position.set(0,.72,.25);neck.add(head);
 ell(head,0,0,0,.28,.24,.33,M.main);ell(head,0,-.10,.29,.25,.12,.30,M.light);eyes(head,M,0,.075,.28,.17,.041);
 const horns=[];for(const side of [-1,1]){const horn=new THREE.Mesh(new THREE.ConeGeometry(.07,.23,6),M.gold);horn.position.set(side*.19,.26,-.07);horn.rotation.z=-side*.18;head.add(horn);horns.push(horn);
  const whisker=ell(head,side*.25,-.10,.35,.035,.17,.036,M.gold);whisker.rotation.z=side*.48;}
 const legs=[];for(const side of [-1,1])for(const fore of [-1,1]){
  const leg=new THREE.Group();leg.name='nj629WarakGoatLeg'+(side<0?'L':'R')+(fore<0?'Back':'Front');leg.position.set(side*.30,.92,fore*.40);trunk.add(leg);legs.push(leg);
  ell(leg,0,-.29,0,.105,.35,.11,M.light);ell(leg,0,-.62,.09,.13,.12,.18,M.dark);}
 const tail=new THREE.Group();tail.name='nj629WarakTail';tail.position.set(0,1.20,-.73);trunk.add(tail);
 for(let i=0;i<grow+2;i++){const t=i/(grow+2);const tuft=ell(tail,Math.sin(t*2)*.05,.13+t*.31,-t*.35,.07,.12,.09,i%2?M.gold:M.light);tuft.rotation.x=t*.2;}
 const streamers=new THREE.Group();streamers.name='nj629WarakPaperFringe';trunk.add(streamers);
 for(let i=0;i<grow+3;i++){const side=i%2?-1:1;const p=ell(streamers,side*(.23+(i%3)*.06),1.41-(i%4)*.16,-.42+i*.09,.08,.09,.07,i%3===0?M.gold:i%3===1?M.light:M.pink);p.rotation.z=side*.22;}
 const egg=new THREE.Group();egg.name='nj629WarakDugderanEgg';egg.position.set(0,.27,-.53);g.add(egg);
 ell(egg,0,0,0,.19,.26,.18,M.white);for(let i=0;i<grow;i++){const dot=ell(egg,Math.sin(i*2.4)*.13,-.06+i*.025,.14,.028,.027,.015,M.gold);}
 g.userData.nj629Rig={kind:'warak_ngendog',trunk,neck,head,legs,tail,streamers,egg};
 g.userData.folkloreForm='dugderan-semarang-dragon-head-camel-body-goat-legs-egg-separate-not-a-dragon';
}
function nj629Boraspati(g,M,phase){
 const grow=Math.max(1,Math.min(7,Number(phase)||1));
 const panel=new THREE.Group();panel.name='nj629BoraspatiGorgaPanel';g.add(panel);
 ell(panel,0,1.11,-.18,.62,.94,.14,M.dark);
 for(let i=0;i<grow+2;i++){const side=i%2?-1:1;const stripe=ell(panel,side*(.41-(i%3)*.07),.52+(i%5)*.29,-.018,.025,.11,.018,i%2?M.white:M.gold);stripe.rotation.z=side*.29;}
 const lizard=new THREE.Group();lizard.name='nj629BoraspatiGeckoRelief';lizard.position.set(0,1.13,.03);panel.add(lizard);
 ell(lizard,0,0,0,.19,.34,.09,M.light);
 const head=new THREE.Group();head.name='nj629BoraspatiHead';head.position.set(0,.43,.01);lizard.add(head);
 ell(head,0,0,0,.22,.20,.10,M.gold);eyes(head,M,0,.04,.095,.11,.025);
 const limbs=[];for(const side of [-1,1])for(const fore of [-1,1]){
  const limb=new THREE.Group();limb.name='nj629BoraspatiFoot'+(side<0?'L':'R')+(fore<0?'Low':'High');limb.position.set(side*.17,fore*.21,0);lizard.add(limb);limbs.push(limb);
  const leg=ell(limb,side*.18,fore*.09,.01,.22,.055,.06,M.light);leg.rotation.z=-side*fore*.45;
  for(let j=0;j<3+(grow>4?1:0);j++){const toe=ell(limb,side*(.29+j*.032),fore*(.07+j*.035),.02,.045,.018,.025,M.gold);toe.rotation.z=side*.2;}}
 const tail=new THREE.Group();tail.name='nj629BoraspatiTail';tail.position.set(0,-.30,.005);lizard.add(tail);
 for(let i=0;i<grow+2;i++){const q=i/(grow+2);const seg=ell(tail,Math.sin(q*1.8)*.08,-q*.48,0,.10-q*.055,.11,.055,M.light);seg.rotation.z=-q*.2;}
 const marks=new THREE.Group();marks.name='nj629BoraspatiCarvingLines';lizard.add(marks);
 for(let i=0;i<grow+2;i++){const mark=ell(marks,(i%2?-1:1)*.08,-.19+(i/(grow+2))*.50,.085,.035,.032,.012,i%2?M.dark:M.gold);mark.rotation.z=(i%2?-1:1)*.2;}
 g.userData.nj629Rig={kind:'boraspati_tano',panel,lizard,head,limbs,tail,marks};
 g.userData.folkloreForm='batak-gorga-flat-gecko-on-ritual-panel-not-free-roaming-dragon';
}
function nj629Ganong(g,M,phase){
 const grow=Math.max(1,Math.min(7,Number(phase)||1));
 const dancer=new THREE.Group();dancer.name='nj629GanongPerformer';g.add(dancer);
 ell(dancer,0,1.06,0,.32,.52,.27,M.dark);
 ell(dancer,0,.74,.11,.31,.20,.29,M.gold);
 const mask=new THREE.Group();mask.name='nj629GanongRedMask';mask.position.set(0,1.84,.15);dancer.add(mask);
 ell(mask,0,0,0,.33,.34,.22,M.main);
 for(const side of [-1,1]){ell(mask,side*.15,.09,.19,.12,.12,.06,M.white);ell(mask,side*.15,.09,.24,.06,.065,.028,M.dark);}
 const nose=new THREE.Group();nose.name='nj629GanongLongNose';nose.position.set(0,-.02,.22);mask.add(nose);
 ell(nose,0,-.07,.19,.12,.18,.23,M.main);
 const jaw=new THREE.Group();jaw.name='nj629GanongJaw';jaw.position.set(0,-.25,.13);mask.add(jaw);
 ell(jaw,0,-.03,.10,.25,.11,.12,M.main);
 for(let i=0;i<grow+2;i++){const x=(i-(grow+1)/2)*.062;ell(jaw,x,.06,.19,.026,.043,.027,M.white);}
 const hair=new THREE.Group();hair.name='nj629GanongBlackWhiteHair';mask.add(hair);
 for(let i=0;i<grow+6;i++){const side=i%2?-1:1;const strand=ell(hair,side*(.21+(i%4)*.042),.19+(i%3)*.13,-.11,.08,.15+.02*(i%3),.08,i%3===0?M.white:M.dark);strand.rotation.z=side*.23;}
 const arms=[];for(const side of [-1,1]){const arm=new THREE.Group();arm.name='nj629GanongArm'+(side<0?'L':'R');arm.position.set(side*.33,1.38,0);dancer.add(arm);arms.push(arm);
  ell(arm,side*.10,-.25,.01,.12,.34,.11,M.dark);ell(arm,side*.15,-.49,.10,.10,.11,.09,M.light);}
 const legs=[];for(const side of [-1,1]){const leg=new THREE.Group();leg.name='nj629GanongLeg'+(side<0?'L':'R');leg.position.set(side*.18,.72,0);dancer.add(leg);legs.push(leg);
  ell(leg,0,-.26,0,.15,.33,.15,M.dark);ell(leg,0,-.53,.12,.16,.11,.21,M.gold);}
 g.userData.nj629Rig={kind:'bujang_ganong',dancer,mask,nose,jaw,hair,arms,legs};
 g.userData.folkloreForm='ponorogo-reog-human-dancer-red-comic-mask-big-nose-bulging-eyes-not-horned-demon';
}

// 6.33: silhouette-first metamorphosis for three culturally distinct forms.
// Creative game interpretation, NOT an attested biological life cycle.
function nj633Metamorph(body,M,id,phase){
 const stage=Math.max(0,Math.min(7,Number(phase)||0));
 if(stage===0)return; // the shared symbolic egg is handled by makeAvatar
 const shell=new THREE.Group();shell.name='nj633_'+id+'_stage_'+stage;body.add(shell);
 const originals=body.children.filter(n=>n!==shell);
 const sphere=(x,y,z,a,b,c,mat)=>ell(shell,x,y,z,a,b,c,mat);
 if(id==='warak_ngendog'){
  if(stage<=2){ // egg-born paper lantern -> low crawling parade puppet, not a scaled camel
   originals.forEach(n=>n.visible=false);
   sphere(0,.72,0,.34,.33,.43,M.main);
   sphere(0,.94,.32,.25,.21,.31,M.light);
   for(const side of [-1,1])for(const z of [-.25,.25])sphere(side*.28,.42,z,.11,.19,.12,M.dark);
   if(stage===2){sphere(0,1.21,.40,.12,.24,.14,M.gold);sphere(0,.65,-.47,.11,.12,.28,M.pink);}
  }else if(stage===3){ // upright lantern-neck transitional form
   originals.forEach(n=>n.visible=false);
   sphere(0,.83,-.05,.34,.36,.46,M.main);
   sphere(0,1.35,.23,.16,.45,.16,M.light);
   sphere(0,1.78,.37,.26,.20,.28,M.main);
   for(const side of [-1,1])for(const z of [-.29,.29])sphere(side*.25,.42,z,.10,.27,.11,M.dark);
  }else if(stage===7){ // enormous Dugderan ceremonial crest and detached egg canopy
   for(const side of [-1,1]){
    const crest=new THREE.Mesh(new THREE.ConeGeometry(.31,.98,7),M.gold);
    crest.position.set(side*.42,2.45,-.02);crest.rotation.z=side*.36;shell.add(crest);
    sphere(side*.76,1.42,-.20,.27,.43,.14,M.pink);
   }
   sphere(0,2.78,-.12,.38,.14,.21,M.gold);
  }
 }else if(id==='boraspati_tano'){
  if(stage<=3){ // relief is carved progressively: from ritual glyph to gecko panel
   originals.forEach(n=>n.visible=false);
   sphere(0,1.08,-.18,stage===1?.34:.49,stage===1?.43:.72,.12,M.dark);
   sphere(0,1.08,.02,.11,.24,.08,M.gold);
   if(stage>=2){sphere(0,1.39,.04,.16,.13,.09,M.light);
    for(const side of [-1,1])sphere(side*.26,1.10,.035,.19,.045,.07,M.light);}
   if(stage===3){for(const side of [-1,1])for(const y of [.84,1.29])sphere(side*.32,y,.04,.14,.06,.07,M.gold);}
  }else if(stage===7){ // monument-like gorga frame, still a flat relief not a dragon
   for(const side of [-1,1]){
    sphere(side*.70,1.18,-.19,.12,1.12,.16,M.gold);
    sphere(side*.57,2.27,-.19,.21,.16,.16,M.white);
   }
   sphere(0,2.40,-.18,.76,.12,.17,M.gold);
  }
 }else if(id==='bujang_ganong'){
  if(stage<=2){ // early phases as masks on a short dancer, not adult scaled down
   originals.forEach(n=>n.visible=false);
   sphere(0,.70,0,.23,.27,.18,M.dark);
   sphere(0,1.19,.16,stage===1?.29:.36,stage===1?.27:.35,.22,M.main);
   sphere(0,1.09,.40,.11,.17,.19,M.main);
   for(const side of [-1,1])sphere(side*.17,.36,0,.10,.25,.10,M.dark);
   if(stage===2){for(const side of [-1,1])sphere(side*.36,.73,0,.11,.27,.10,M.light);}
  }else if(stage===3){ // full-bodied acrobatic adolescent, elongated mask
   originals.forEach(n=>n.visible=false);
   sphere(0,.96,0,.24,.47,.21,M.dark);
   sphere(0,1.72,.17,.30,.40,.23,M.main);
   sphere(0,1.57,.42,.12,.23,.20,M.main);
   for(const side of [-1,1]){sphere(side*.34,1.04,0,.12,.37,.12,M.light);sphere(side*.15,.40,0,.12,.33,.12,M.dark);}
  }else if(stage===7){ // dance banner / hair fan creates a distinct legendary silhouette
   for(let i=0;i<9;i++){
    const angle=(i-4)*.22;
    const plume=new THREE.Mesh(new THREE.ConeGeometry(.10,.87,6),i%2?M.white:M.dark);
    plume.position.set(Math.sin(angle)*.90,2.46+Math.cos(angle)*.25,-.19);
    plume.rotation.z=-angle;shell.add(plume);
   }
   for(const side of [-1,1])sphere(side*.69,1.12,-.14,.15,.56,.11,M.gold);
  }
 }
 body.userData.nj633Morph={identity:id,stage,geometryBranch:stage<=3?'replacement':stage===7?'legend-extension':'original-rig'};
}

/* Model khas Cuora amboinensis (IUCN T5958A3078812; TFTSG account 053):
   kotak plastron berengsel, tiga pita kuning sisi kepala, kaki berselaput,
   tempurung bervariasi menurut umur. Bukan duplikat kura-kura Rote. */
function nj70Cuora(g,M,stage){
 const hatch=stage<=2,older=stage>=6;
 const skin=new THREE.MeshStandardMaterial({color:0x40533e,roughness:.83});
 const shell=new THREE.MeshStandardMaterial({color:0x302f24,roughness:.72});
 const scute=new THREE.MeshStandardMaterial({color:0x586944,roughness:.77});
 const yellow=new THREE.MeshStandardMaterial({color:0xe1c66b,roughness:.6});
 const plastron=new THREE.MeshStandardMaterial({color:0xb2a475,roughness:.81});
 const high=hatch?.32:stage<5?.41:.51;
 ell(g,0,.59,0,.80,.21,.93,plastron);
 ell(g,0,.94,-.09,.85,high,hatch?.82:.98,shell);
 for(let j=0;j<16;j++){
  const a=j*Math.PI*2/16,x=Math.sin(a)*.64,z=Math.cos(a)*.69-.09;
  const plate=ell(g,x,1.04+high*.66-Math.abs(x)*.22,z,.15,.046,.17,j%4?scute:plastron);
  plate.rotation.y=a;
 }
 for(let j=-2;j<=2;j++)ell(g,0,1.13+high*.60-Math.abs(j)*.02,-.1+j*.25,.25,.047,.13,j%2?scute:plastron);
 // Cross-shell hinge and articulated anterior lower lobe.
 tube(g,[[-.72,.51,.25],[0,.47,.25],[.72,.51,.25]],.037,shell);
 if(stage>=3){const plate=ell(g,0,.47,.53,.67,.10,.38,plastron);plate.rotation.x=-.09;}
 for(const sx of [-1,1])for(const z of [-.55,.58]){
  cylinder(g,sx*.55,.62,z,sx*.75,.18,z+(z>0?.13:-.08),.15,.13,skin);
  ell(g,sx*.76,.16,z+(z>0?.25:-.14),.22,.10,.24,skin);
  for(let toe=-1;toe<=1;toe++)tube(g,[[sx*(.72+toe*.055),.17,z+.27],[sx*(.72+toe*.055),.12,z+.43]],.018,yellow);
 }
 ell(g,0,.82,.84,.32,.24,.40,skin);
 ell(g,0,.94,1.20,hatch?.32:.38,hatch?.28:.32,.40,skin);
 ell(g,0,.79,1.47,.21,.11,.17,plastron);
 eyes(g,M,0,1.05,1.5,.27,.066);
 // Identification marker: three lateral yellow or orange-yellow stripes on both cheeks.
 for(const sx of [-1,1])for(let k=0;k<3;k++)
  tube(g,[[sx*.18,1.15-k*.115,1.49],[sx*.32,1.07-k*.10,1.29],[sx*.35,1.00-k*.08,1.00]],hatch?.021:.029,yellow);
 if(hatch)for(const x of [-.4,0,.4])tube(g,[[x,1.16,-.77],[x,1.31,-.1],[x,1.16,.68]],.042,scute);
 if(older)for(let j=0;j<11;j++){
  const a=j*2.399;ell(g,Math.sin(a)*.62,1.13+Math.cos(a)*.13,-.31+(j%4)*.16,.077,.025,.07,plastron);
 }
 if(stage===7)for(let k=0;k<8;k++){
  const a=k*Math.PI/4,crystal=new THREE.Mesh(new THREE.OctahedronGeometry(.11),M.glow);
  crystal.position.set(Math.sin(a)*.7,1.48,Math.cos(a)*.77);g.add(crystal);
 }
}
function makeAvatar(r, portraitMode=false){const type=r[4],M=mats(r),group=new THREE.Group();group.name='NJ35_MODEL_'+r[0];let body=new THREE.Group();body.name='anatomy';group.add(body);
 if(r[0]==='kura_ambon')nj70Cuora(body,M,portraitMode?5:gamePet()?.phase??5);else if(r[0]==='sembrani')nj630Sembrani(body,M,portraitMode?5:gamePet()?.phase??5);else if(r[0]==='ebu_gogo')nj630Ebu(body,M,portraitMode?5:gamePet()?.phase??5);else if(r[0]==='kuda_lumping')nj630Lumping(body,M,portraitMode?5:gamePet()?.phase??5);else if(r[0]==='warak_ngendog')nj629Warak(body,M,portraitMode?5:gamePet()?.phase??5);else if(r[0]==='boraspati_tano')nj629Boraspati(body,M,portraitMode?5:gamePet()?.phase??5);else if(r[0]==='bujang_ganong')nj629Ganong(body,M,portraitMode?5:gamePet()?.phase??5);else if(r[0]==='hanoman')nj628Hanoman(body,M,portraitMode?5:gamePet()?.phase??5);else if(r[0]==='jatayu')nj628Jatayu(body,M,portraitMode?5:gamePet()?.phase??5);else if(r[0]==='makara_candi')nj628Makara(body,M,portraitMode?5:gamePet()?.phase??5);else if(r[0]==='dewi_sri')nj627Sri(body,M,portraitMode?5:gamePet()?.phase??5);else if(r[0]==='batara_kala')nj627Kala(body,M,portraitMode?5:gamePet()?.phase??5);else if(r[0]==='putri_mandalika')nj627Mandalika(body,M,portraitMode?5:gamePet()?.phase??5);else if(r[0]==='nyi_roro_kidul')nj626SeaQueen(body,M,portraitMode?5:gamePet()?.phase??5);else if(r[0]==='jaka_tarub')nj626JakaTarub(body,M,portraitMode?5:gamePet()?.phase??5);else if(r[0]==='kebo_iwa')nj626KeboIwa(body,M,portraitMode?5:gamePet()?.phase??5);else if(r[0]==='singa_barong_reog')nj625Reog(body,M,portraitMode?5:gamePet()?.phase??5);else if(r[0]==='rangda')nj625Rangda(body,M,portraitMode?5:gamePet()?.phase??5);else if(r[0]==='wewe')nj625Wewe(body,M,portraitMode?5:gamePet()?.phase??5);else if(r[0]==='garuda')nj624Garuda(body,M,portraitMode?5:gamePet()?.phase??5);else if(r[0]==='barong')nj624Barong(body,M,portraitMode?5:gamePet()?.phase??5);else if(r[0]==='kuyang')nj624Kuyang(body,M,portraitMode?5:gamePet()?.phase??5);else if(r[0]==='lembuswana')nj619Lembuswana(body,M);else if(r[0]==='naga_basuki')nj619Basuki(body,M);else if(r[0]==='bunian')nj614Bunian(body,M);else if(r[0]==='siluman_harimau')nj614SilumanHarimau(body,M);else if(r[0]==='macan_putih')nj614MacanPutih(body,M);else if(r[0]==='babi_ngepet')nj613BabiNgepet(body,M);else if(r[0]==='ahool')nj613Ahool(body,M);else if(r[0]==='pocong')nj612Pocong(body,M);else if(r[0]==='kuntilanak')nj612Kuntilanak(body,M);else if(r[0]==='tuyul')nj612Tuyul(body,M);else if(r[0]==='buto_ijo')nj611ButoIjo(body,M);else if(r[0]==='sundel_bolong')nj611SundelBolong(body,M);else if(r[0]==='naga_antaboga')nj611Antaboga(body,M);else if(r[0]==='leak')nj610Leak(body,M);else if(r[0]==='genderuwo')nj610Genderuwo(body,M);else if(r[0]==='jenglot')nj610Jenglot(body,M);else if(r[0]==='begu_ganjang')nj610Begu(body,M);else if(r[0]==='barong')nj69Barong(body,M);else if(r[0]==='banaspati')nj69Banaspati(body,M);else if(r[0]==='palasik')nj69Palasik(body,M);else if(r[0]==='kuyang')nj68Kuyang(body,M);else if(r[0]==='wewe')nj68Wewe(body,M);else if(r[0]==='rangda')nj68Rangda(body,M);else if(NJ67_BIRD_DESIGNS[r[0]])nj67Bird(body,M,r);else if(r[0]==='hiu_martil_bergerigi')nj67Hammerhead(body,M);else if(r[0]==='kancil_jawa')nj67Kancil(body,M);else if(NJ56_SCULPTORS[r[0]])NJ56_SCULPTORS[r[0]](body,M);else if(nj54Sculptors[r[0]])nj54Sculptors[r[0]](body,M);else if(nj53Sculptors[r[0]])nj53Sculptors[r[0]](body,M);else if(nj52Sculptors[r[0]])nj52Sculptors[r[0]](body,M);else if(nj51Sculptors[r[0]])nj51Sculptors[r[0]](body,M);else if(nj50Sculptors[r[0]])nj50Sculptors[r[0]](body,M);else if(nj47Sculptors[r[0]])nj47Sculptors[r[0]](body,M);else if(nj46Sculptors[r[0]])nj46Sculptors[r[0]](body,M);else if(nj42Sculptors[r[0]])nj42Sculptors[r[0]](body,M);else if(nj41Sculptors[r[0]])nj41Sculptors[r[0]](body,M);else if(nj40Sculptors[r[0]])nj40Sculptors[r[0]](body,M);else if(nj39Sculptors[r[0]])nj39Sculptors[r[0]](body,M);else if(nj38Sculptors[r[0]])nj38Sculptors[r[0]](body,M);else if(type==='elephant')nj37Elephant(body,M);else if(type==='rhino')nj37Rhino(body,M);else if(type==='deer')nj37Deer(body,M);else if(type==='tarsier')nj37Tarsier(body,M);else if(['turtle','pignose','snakeneck','loggerhead','ridley','flatback'].includes(type))nj37Turtle(body,M);else if(type==='dugong')nj37Dugong(body,M);else if(type==='arowana')nj37Fish(body,M);else if(['starling','eagle','hornbill','cassowary','cockatoo','peafowl'].includes(type))nj37Bird(body,M,type);else if(type==='orangutan'||type==='gibbon')nj37Gibbon(body,M,type==='orangutan');else if(type==='babirusa')nj37Babirusa(body,M);else if(type==='tiger')cat(body,M,r);else if(['reptile','monitor'].includes(type))lizard(body,M);else if(type==='bird'||type==='kingfisher')bird(body,M,type);else if(type==='paradise'||type==='maleo'||type==='garuda')bird(body,M,type);else if(type==='anoa'||type==='lembuswana')bovine(body,M,type);else if(type==='bekantan')monkey(body,M);
 else if(type==='kuyang'||type==='palasik'||type==='banaspati')floating(body,M,type);
 else if(r[0]==='nyai_blora')serpentWoman(body,M);
 else if(r[0]==='hantu_banyu')waterWraith(body,M);
 else if(type==='naga'||type==='water')dragon(body,M);
 else if(type==='barong'){cat(body,M,r);for(let sx of [-1,1])for(let j=0;j<6;j++)ell(body,sx*(.16+j*.11),1.95,.72,.11,.19,.22,j%2?M.gold:M.light);ell(body,0,1.92,.87,.28,.17,.25,M.gold)}
 else if(type==='babi')boar(body,M);else if(type==='ahool')bat(body,M);
 else if(type==='sembrani'&&r[0]==='kuda_lumping'){wovenHorse(body,M)}
 else if(type==='sembrani'){slenderHorse(body,M)}

 else humanoid(body,M,type);
 if(!['babi_ngepet','ahool','lembuswana','naga_basuki','garuda','barong','kuyang','singa_barong_reog','rangda','wewe','nyi_roro_kidul','jaka_tarub','kebo_iwa','dewi_sri','batara_kala','putri_mandalika','hanoman','jatayu','makara_candi','warak_ngendog','boraspati_tano','bujang_ganong','sembrani','ebu_gogo','kuda_lumping'].includes(r[0]) && !NJ611_FOLKLORE[r[0]] && !NJ612_FOLKLORE[r[0]] && sculptSignatures[r[0]])sculptSignatures[r[0]](body,M);
 if(type==='garuda'&&r[0]!=='garuda'){let crown=new THREE.Mesh(new THREE.ConeGeometry(.25,.54,6),M.gold);crown.position.set(0,2.05,.33);body.add(crown)}
 const living=portraitMode?null:gamePet();
 if(living)decorateStage(group,body,living,M);
 if(['warak_ngendog','boraspati_tano','bujang_ganong'].includes(r[0]))nj633Metamorph(body,M,r[0],portraitMode?5:gamePet()?.phase??5);
 group.userData={...group.userData,body,type,base:body.position.y,phase:(living?.phase??null),legend:(living?.legend??null)};
 return group;
}
// Eight stages are geometrically different; Legend form uses the chosen original stone.
function decorateStage(group,body,pet,M){
 // Each phase gains non-scale anatomy / heraldry details. The overall silhouette remains species-specific.
 if(pet.phase>=1 && pet.phase<=5){
   const phase=pet.phase,mat=phase<3?M.light:phase===3?M.gold:M.white;
   if(phase===1){for(let side of [-1,1])ell(body,side*.24,1.61,.96,.07,.09,.07,mat);}
   if(phase===2){for(let side of [-1,1]){const feather=ell(body,side*.42,1.42,-.37,.08,.15,.16,mat);feather.rotation.z=side*.42;}}
   if(phase===3){for(let k=-2;k<=2;k++){const diamond=new THREE.Mesh(new THREE.OctahedronGeometry(.052),mat);diamond.position.set(k*.19,1.62-Math.abs(k)*.04,-.43);body.add(diamond);}}
   if(phase===4){for(let side of [-1,1]){const bud=new THREE.Mesh(new THREE.ConeGeometry(.08,.21,7),mat);bud.position.set(side*.32,2.19,.34);bud.rotation.z=side*.18;body.add(bud);}}
   if(phase===5){const ring=new THREE.Mesh(new THREE.TorusGeometry(.44,.018,6,42),M.gold);ring.rotation.x=Math.PI/2;ring.position.y=2.41;body.add(ring);}
 }
 if(pet.phase===0){
  body.visible=false;
  const shell=new THREE.Mesh(new THREE.SphereGeometry(1,24,18),new THREE.MeshPhysicalMaterial({color:record()[5],roughness:.31,metalness:.14,clearcoat:.7}));
  shell.scale.set(.58,.80,.59);shell.position.y=1.18;shell.castShadow=true;group.add(shell);
  for(let j=0;j<4;j++){
   const ring=new THREE.Mesh(new THREE.TorusGeometry(.31+j*.065,.017,8,42),M.gold);
   ring.position.set(0,1.1+j*.21,0);ring.rotation.x=Math.PI/2;group.add(ring)
  }
  tube(group,[[.19,1.62,.45],[.06,1.47,.56],[.15,1.34,.56],[-.03,1.13,.58]],.016,M.white);
  // 6.24 symbolic identity-specific egg ornaments; folklore beings do not canonically hatch.
  const eggIdentity=record()[0];
  if(eggIdentity==='garuda'){
   for(const side of [-1,1])for(let j=0;j<4;j++){
    const feather=ell(group,side*(.16+j*.085),1.16+j*.10,.53-j*.08,.08,.14,.035,j%2?M.gold:M.light);
    feather.rotation.z=side*(.22+j*.10);
   }
  }else if(eggIdentity==='barong'){
   ell(group,0,1.32,.56,.23,.19,.04,M.gold);
   for(const side of [-1,1])ell(group,side*.12,1.35,.60,.06,.07,.025,M.dark);
   for(let j=0;j<5;j++)ell(group,(j-2)*.095,1.08,.57,.035,.12,.025,M.light);
  }else if(eggIdentity==='singa_barong_reog'){
   for(let j=-4;j<=4;j++)ell(group,j*.07,1.30+(.38-Math.abs(j)*.06),.54,.045,.12,.035,j%2?M.gold:M.light);
   ell(group,0,1.17,.58,.19,.11,.04,M.dark);
  }else if(eggIdentity==='rangda'){
   ell(group,0,1.32,.57,.20,.19,.035,M.light);
   for(const side of [-1,1])ell(group,side*.11,1.37,.60,.04,.05,.025,M.dark);
   ell(group,0,1.11,.61,.055,.16,.025,M.pink);
  }else if(eggIdentity==='wewe'){
   ell(group,0,1.36,.58,.19,.15,.04,M.black);
   for(const side of [-1,1])ell(group,side*.24,1.17,.54,.12,.29,.035,M.light);
  }else if(eggIdentity==='kuyang'){
   ell(group,0,1.38,.56,.19,.18,.04,M.dark);
   for(let j=0;j<7;j++)tube(group,[[(j-3)*.06,1.43,.56],[(j-3)*.075,1.21,.58],[(j-3)*.09,1.05,.51]],.014,M.black);
  }
 }else if(pet.phase===6){
  for(let j=0;j<5;j++){
   const bead=ell(group,(j-2)*.13,2.16+Math.sin(j)*.07,.48,.045,.07,.05,M.white);
   bead.rotation.z=(j-2)*.26;
  }
 }else if(pet.phase===7){
  const palette={api:'#ff9e64',air:'#72d4f1',angin:'#c2ffe2',tanah:'#a2ebae',cahaya:'#ffe5a1',bayangan:'#8c79ac',fire:'#ff9e64',water:'#72d4f1',wind:'#c2ffe2',diamond:'#e1e7ff',nature:'#a2ebae',spirit:'#c6a2ee',light:'#ffe5a1',shadow:'#8c79ac'};
  const e=pet.legend||'light',c=palette[e]||palette.light;
  const mm=new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.78,depthWrite:false});
  const glyph=new THREE.Group();glyph.name='nj-element-morph';group.add(glyph);
  for(let j=0;j<3;j++){
   const ring=new THREE.Mesh(new THREE.TorusGeometry(1+j*.12,.023,6,64),mm);
   ring.position.y=1.1+j*.34;ring.rotation.set(Math.PI/2+j*.18,j*.35,.16*j);glyph.add(ring)
  }
  for(let j=0;j<8;j++){
   const a=j*Math.PI/4,rad=e==='diamond'?1.3:1.12;
   const crystal=new THREE.Mesh(new THREE.OctahedronGeometry(.12+(.04*(j%3))),mm);
   crystal.position.set(Math.sin(a)*rad,.65+(j%3)*.42,Math.cos(a)*rad);glyph.add(crystal)
  }
  if(['fire','wind','api','angin'].includes(e))for(let sx of [-1,1]){
   const energy=new THREE.Mesh(new THREE.ConeGeometry(.14,.74,6),mm);
   energy.position.set(sx*.80,1.7,.1);energy.rotation.z=-sx*.45;glyph.add(energy)
  }
  group.userData.morph=glyph;
 }
}
function rebuildAvatar(){if(!world||!THREE)return;if(avatar){world.avatarRoot.remove(avatar);avatar.traverse(o=>{if(o.geometry&&o.geometry!==nj37SharedSphere)o.geometry.dispose();if(o.material && !Array.isArray(o.material))o.material.dispose()})}avatar=makeAvatar(record());avatar.scale.setScalar(.83);world.avatarRoot.add(avatar);actionName='idle';drawInfo()}
function clearBiome(){
 if(!world?.biome)return;
 world.scene.remove(world.biome);
 world.biome.traverse(o=>{if(o.geometry&&o.geometry!==nj37SharedSphere)o.geometry.dispose();if(o.material && !Array.isArray(o.material))o.material.dispose()});
 world.biome=null;world.crystal=null;
}
function dailyKey(){const t=new Date();return `${t.getFullYear()}-${t.getMonth()+1}-${t.getDate()}`}
function collectedToday(){try{const j=JSON.parse(localStorage.getItem('nusajiwa-3d-found-v35')||'{}');return j[viewZone]===dailyKey()}catch(e){return false}}
function rebuildBiome(){
 if(!THREE||!world)return;
 clearBiome();
 const g=new THREE.Group();g.name='Regional_Habitat_'+viewZone;world.scene.add(g);world.biome=g;
 const stone=world.mats.stone,trunk=world.mats.trunk,grass=world.mats.grass,green=world.mats.leaves,gold=world.mats.gold;
 const leafMat=new THREE.MeshStandardMaterial({color:viewZone==='nusa'?0xa1a05b:0x3f835f,roughness:.92});
 const quartz=new THREE.MeshStandardMaterial({color:viewZone==='java'?0xd68c5a:0xc9dec2,metalness:.16,roughness:.42});
 function shrub(x,z,size=1){
  cylinder(g,x,.35*size,z,x,.9*size,z,.045*size,.055*size,trunk,6);
  for(let i=0;i<5;i++){
   const a=i*2.4;
   const leaf=ell(g,x+Math.sin(a)*.17*size,.84*size+Math.sin(a)*.10*size,z+Math.cos(a)*.15*size,.3*size,.14*size,.18*size,leafMat);
   leaf.rotation.z=Math.sin(a)*.35
  }
 }
 function karst(x,z,size){const rock=new THREE.Mesh(new THREE.CylinderGeometry(.22*size,.48*size,1.4*size,7),stone);rock.position.set(x,.63*size,z);rock.rotation.set(.04,.4,.09);rock.castShadow=true;g.add(rock);const tip=new THREE.Mesh(new THREE.ConeGeometry(.23*size,.64*size,7),quartz);tip.position.set(x,1.57*size,z);g.add(tip)}
 function tree(x,z,size=1){cylinder(g,x,.70*size,z,x,1.65*size,z,.15*size,.19*size,trunk,8);for(let i=0;i<3;i++)ell(g,x+Math.sin(i*2)*.26*size,1.65*size+(i%2)*.28*size,z+Math.cos(i*2)*.20*size,.52*size,.41*size,.52*size,leafMat)}
 if(viewZone==='sumatra'){
  for(let i=0;i<6;i++){const x=-3.9+i*.89;tree(x,-3.1-i%2*.5,.80+i%3*.12)}
  for(let i=0;i<11;i++)shrub(-3.7+(i%5)*.7,2.8+(i%3)*.26,.55)
 }
 if(viewZone==='java'){
  // A volcanic relief: basalt cone, lava-lit crater, smaller stones.
  const volcano=new THREE.Mesh(new THREE.ConeGeometry(1.19,2.4,13),stone);volcano.position.set(3.35,.85,-2.95);volcano.castShadow=true;g.add(volcano);
  const crater=new THREE.Mesh(new THREE.TorusGeometry(.33,.08,8,20),gold);crater.position.set(3.35,2.11,-2.95);crater.rotation.x=Math.PI/2;g.add(crater);
  for(let i=0;i<8;i++)karst(-3.3+(i%3)*.53,3.3+(i%4)*.3,.44)
 }
 if(viewZone==='kalimantan'){
  // Mangrove roots and long hanging vines.
  for(let i=0;i<7;i++){let x=2.4+(i%4)*.48,z=-3.95+Math.floor(i/4)*.65;tree(x,z,.74);for(let k=0;k<3;k++)tube(g,[[x,1.0,z],[x+Math.sin(k*2)*.35,.4,z+Math.cos(k*2)*.4],[x+.5*Math.cos(k*2),.03,z+Math.sin(k*2)*.56]],.029,trunk)}
  for(let i=0;i<7;i++)shrub(-3.2+i*.34,-2.8+(i%3)*.23,.63)
 }
 if(viewZone==='sulawesi'){
  for(let i=0;i<12;i++){const a=i*2.4;karst(Math.sin(a)*3.6,Math.cos(a)*3.7,.42+(i%4)*.16)}
  for(let i=0;i<5;i++)shrub(-2.5+i*.62,3.2,.72)
 }
 if(viewZone==='nusa'){
  const sand=new THREE.Mesh(new THREE.RingGeometry(2.15,4.25,46),new THREE.MeshStandardMaterial({color:0xb6a06b,roughness:.95,side:THREE.DoubleSide}));sand.rotation.x=-Math.PI/2;sand.position.y=-.19;g.add(sand);
  for(let i=0;i<24;i++){let a=i*2.399,r=2.9+i%3*.43,x=Math.sin(a)*r,z=Math.cos(a)*r;const blade=new THREE.Mesh(new THREE.ConeGeometry(.04,.55+(i%4)*.14,4),leafMat);blade.position.set(x,.14,z);blade.rotation.z=Math.cos(a)*.23;g.add(blade)}
  for(let i=0;i<4;i++)karst(3.2-i*.62,-3.4+i*.24,.55)
 }
 if(viewZone==='laut'){
  const reef=new THREE.Mesh(new THREE.RingGeometry(2.22,4.33,56),new THREE.MeshStandardMaterial({color:0x4b8e91,roughness:.5,transparent:true,opacity:.82,side:THREE.DoubleSide}));reef.rotation.x=-Math.PI/2;reef.position.y=-.165;g.add(reef);
  for(let j=0;j<21;j++){const a=j*2.4,r=2.85+(j%5)*.36,x=Math.cos(a)*r,z=Math.sin(a)*r;const coral=ell(g,x,.19,z,.17,.18,.16,j%3?quartz:gold);for(let k=0;k<3;k++)cylinder(g,x,.22,z,x+Math.sin(a+k)*.20,.38+(j%3)*.10,z+Math.cos(a+k)*.20,.048,.02,j%3?quartz:gold,6);coral.castShadow=false}
  for(let i=0;i<9;i++){const z=-3.25+i*.62;const bubble=ell(g,3.6+(i%2)*.26,.58+i%3*.28,z,.055,.065,.05,quartz);bubble.castShadow=false}
 }
 if(viewZone==='papua'){
  for(let i=0;i<10;i++)tree(-3.7+(i%5)*.8,-3.3+Math.floor(i/5)*.45,.65+(i%4)*.17);
  for(let i=0;i<6;i++)karst(2.6+(i%3)*.45,-3.5+(i%2)*.28,.4)
 }
 // A single interactive collectible crystal in each region, once per region per local day.
 const point=new THREE.Group();point.name='resonance-stone';point.position.set(2.30,.37,1.58);
 const harvested=petIs3d()?!!nj37.daily[dailyKey()+':'+viewZone]:collectedToday();
 const crystal=new THREE.Mesh(new THREE.OctahedronGeometry(.31),new THREE.MeshPhysicalMaterial({color:harvested?0x75837b:0x96e4c6,metalness:.27,roughness:.14,clearcoat:1,emissive:harvested?0x12332c:0x40bba7,emissiveIntensity:harvested?.15:.54}));
 crystal.name='resonance-crystal';point.add(crystal);
 const halo=new THREE.Mesh(new THREE.TorusGeometry(.46,.015,6,38),gold);halo.rotation.x=Math.PI/2;halo.position.y=-.20;point.add(halo);
 point.userData.harvestable=true;g.add(point);world.crystal=point;
}
function harvestStone(){
 if(petIs3d()){explore3d();return}
 if(collectedToday()){notify('Kristal wilayah ini sudah ditemukan hari ini.');return}
 if(!selectedPet()){notify('Tetaskan satu sahabat sebelum mengumpulkan kristal.');return}
 try{
  if(novelState.pets[record()[0]]){const el=NJ36_REGION_ELEMENT[viewZone];novelState.stones[el]++;const j=JSON.parse(localStorage.getItem('nusajiwa-3d-found-v35')||'{}');j[viewZone]=dailyKey();localStorage.setItem('nusajiwa-3d-found-v35',JSON.stringify(j));saveNovel();notify('✧ Batu '+el+' diperoleh · 1');burst3D('play');rebuildBiome();return}
  const r=(typeof REGIONS==='object'&&REGIONS[viewZone])||null;
  if(!r){notify('Wilayah belum siap dieksplorasi');return}
  const item=r.loot[Math.floor(Math.random()*r.loot.length)];
  state.inventory[item]=(state.inventory[item]||0)+1;
  const journal=JSON.parse(localStorage.getItem('nusajiwa-3d-found-v35')||'{}');journal[viewZone]=dailyKey();
  localStorage.setItem('nusajiwa-3d-found-v35',JSON.stringify(journal));
  if(typeof save==='function')save();
  if(typeof render==='function')render();
  notify('◈ Ditemukan: '+item+' · +1 (harian)');burst3D('play');rebuildBiome();
 }catch(e){notify('Eksplorasi tidak tersimpan di browser ini')}
}
function changeRegion(){
 if(!world)return;
 const palette={sumatra:[0x47775e,0xffd69c,0x152e34],java:[0x6e7562,0xffb27a,0x2d3d44],kalimantan:[0x397c68,0xf9daa6,0x143a35],sulawesi:[0x7a8962,0xece6a4,0x303c3a],nusa:[0xaaa068,0xffcc8d,0x5d5541],papua:[0x358265,0xf4e1bc,0x143c35],laut:[0x3d7b83,0xc9eafa,0x0c344b]}[viewZone];
 world.mats.grass.color.setHex(palette[0]);world.sun.color.setHex(palette[1]);world.scene.fog.color.setHex(palette[2]);world.accent.intensity=nightTime?19:(viewZone==='kalimantan'?31:27);world.sun.intensity=nightTime?1.75:3.3;world.scene.fog.density=nightTime?.032:.022;
 rebuildBiome();njtApplyLiving(true);notify('⌖ '+regions.find(r=>r[0]===viewZone)[1]);
}
function animate(t){if(sceneDisposed)return;requestAnimationFrame(animate);if(document.hidden||sceneEl.hidden)return;if(!three)return;
 const rawDelta=(t-lastFrame)/1000||.016;const dt=Math.min(.035,rawDelta);lastFrame=t;tick+=dt;if(quality==='auto'){fpsSamples++;if(rawDelta>.038)slowTicks++;if(fpsSamples>=140){if(slowTicks>75&&frameScale>0.69){frameScale=.68;three.setPixelRatio(rateQuality());resize()}else if(slowTicks<18&&frameScale<1){frameScale=1;three.setPixelRatio(rateQuality());resize()}fpsSamples=0;slowTicks=0}}let slow=respectMotion?.18:1;
 let bob=Math.sin(tick*1.9)*.075*slow;
 if(avatar){let b=avatar.userData.body,btype=avatar.userData.type;
  const pet=gamePet();
  if(pet && (avatar.userData.phase!==pet.phase || avatar.userData.legend!==pet.legend)){rebuildAvatar();b=avatar.userData.body;}
  if(['kuyang','palasik','banaspati','ahool','bunian','kuntilanak','begu','wewe','dugong','turtle','arowana','starling','eagle','hornbill','cockatoo','peafowl'].includes(btype))bob=Math.sin(tick*2)*.16*slow;
  if(actionName==='play'&&t<actionUntil){bob+=Math.abs(Math.sin(tick*11))*.26;b.rotation.z=Math.sin(tick*9)*.10}
  else if(actionName==='sleep'&&t<actionUntil){bob-=.14;b.rotation.z=.13}else if(actionName==='bond'&&t<actionUntil){b.rotation.z=Math.sin(tick*11)*.09}else{b.rotation.z+=(-b.rotation.z)*Math.min(1,dt*5)}
  b.position.y=bob;
  // 6.24 articulated motion: stable node count, separate from generic wing/hover animations.
  const rig624=b.userData.nj624Rig;
  if(rig624){
   if(rig624.kind==='garuda'){
    for(const side of [-1,1]){
     const wing=b.getObjectByName('nj624GarudaWing'+(side<0?'L':'R'));
     if(wing)wing.rotation.z=side*(.16+Math.sin(tick*2.15)*.24*slow);
     const leg=b.getObjectByName('nj624GarudaLeg'+(side<0?'L':'R'));
     if(leg)leg.rotation.x=Math.sin(tick*.94+(side<0?0:Math.PI))*.055*slow;
    }
    rig624.head.rotation.y=Math.sin(tick*.53)*.055*slow;
    rig624.torso.rotation.y=Math.sin(tick*.37)*.035*slow;
   }else if(rig624.kind==='barong'){
    rig624.body.rotation.y=Math.sin(tick*.49)*.032*slow;
    rig624.head.rotation.y=Math.sin(tick*.65)*.07*slow;
    rig624.jaw.rotation.x=.07+Math.max(0,Math.sin(tick*1.47))*.20*slow;
    rig624.legs.forEach((leg,i)=>{leg.rotation.x=Math.sin(tick*1.04+(i%2?Math.PI:0)+(i>1?Math.PI:0))*.075*slow;});
   }else if(rig624.kind==='kuyang'){
    rig624.head.rotation.y=Math.sin(tick*.49)*.11*slow;
    rig624.head.rotation.z=Math.sin(tick*.76)*.035*slow;
    rig624.hair.rotation.y=Math.sin(tick*.83)*.05*slow;
    rig624.tendrils.forEach((node,i)=>{node.rotation.z=Math.sin(tick*1.17-i*.46)*.075*slow;});
   }
  }

  // 6.25 folklore articulation: time-only transforms, no per-frame geometry allocation.
  const rig625=b.userData.nj625Rig;
  if(rig625){
   const mood625=t<actionUntil?actionName:'idle';
   if(rig625.kind==='singa_barong_reog'){
    rig625.fan.rotation.z=Math.sin(tick*.60)*(mood625==='play'?.12:.065)*slow+(mood625==='sleep'?-.14:0);
    rig625.mask.rotation.x=Math.sin(tick*.88)*.09*slow+(mood625==='bond'?.10:0);
    rig625.jaw.rotation.x=.04+Math.max(0,Math.sin(tick*1.17))*.12*slow;
    rig625.costume.rotation.y=Math.sin(tick*.38)*.042*slow;
   }else if(rig625.kind==='rangda'){
    rig625.mask.rotation.y=Math.sin(tick*.48)*.09*slow;
    rig625.wig.rotation.z=Math.sin(tick*.77)*(mood625==='play'?.11:.055)*slow;
    rig625.tongue.rotation.x=Math.sin(tick*1.07)*.095*slow+(mood625==='sleep'?-.08:0);
    for(const side of [-1,1]){
     const arm=b.getObjectByName('nj625RangdaArm'+(side<0?'L':'R'));
     if(arm)arm.rotation.z=side*(.10+Math.sin(tick*.63+(side<0?0:Math.PI))*.07*slow);
    }
   }else if(rig625.kind==='wewe'){
    rig625.head.rotation.y=Math.sin(tick*.42)*.08*slow+(mood625==='bond'?.06:0);
    rig625.hair.rotation.z=Math.sin(tick*.63)*.035*slow;
    rig625.shawl.rotation.y=Math.sin(tick*.52)*(mood625==='play'?.11:.055)*slow;
    for(const side of [-1,1]){
     const arm=b.getObjectByName('nj625WeweArm'+(side<0?'L':'R'));
     if(arm)arm.rotation.z=side*((mood625==='bond'?.32:.16)+Math.sin(tick*.71+(side<0?0:Math.PI))*.045*slow);
    }
   }
  }
  // 6.26 narrative-specific articulation; no new mesh allocated per frame.
  const rig626=b.userData.nj626Rig;
  if(rig626){
   const mood626=t<actionUntil?actionName:'idle';
   if(rig626.kind==='nyi_roro_kidul'){
    rig626.robe.rotation.y=Math.sin(tick*.40)*.045*slow;
    rig626.head.rotation.y=Math.sin(tick*.48)*.06*slow;
    rig626.veil.rotation.z=Math.sin(tick*.77)*(mood626==='play'?.11:mood626==='sleep'?.018:.052)*slow;
    rig626.waves.forEach((w,i)=>{w.rotation.z=Math.sin(tick*.93+i*1.6)*(mood626==='bond'?.18:mood626==='play'?.14:mood626==='sleep'?.023:.095)*slow;});
   }else if(rig626.kind==='jaka_tarub'){
    rig626.torso.rotation.y=Math.sin(tick*.39)*.042*slow;
    rig626.head.rotation.y=Math.sin(tick*.55)*.068*slow;
    rig626.basket.rotation.z=Math.sin(tick*.88)*(mood626==='play'?.13:mood626==='sleep'?.012:.05)*slow;
    rig626.scarf.rotation.z=Math.sin(tick*.72)*(mood626==='bond'?.14:mood626==='sleep'?.017:.07)*slow;
   }else if(rig626.kind==='kebo_iwa'){
    rig626.torso.rotation.y=Math.sin(tick*.34)*.032*slow;
    rig626.head.rotation.y=Math.sin(tick*.41)*.06*slow;
    rig626.stone.rotation.x=Math.sin(tick*.83)*(mood626==='play'?.15:mood626==='sleep'?.008:.045)*slow;
    rig626.arms.forEach((arm,i)=>{arm.rotation.z=(i?1:-1)*(.08+Math.sin(tick*.65+i)*.05*slow+(mood626==='bond'?.10:0));});
   }
  }
  // 6.30 phase-specific folk silhouettes: no per-frame geometry allocations.
  const rig630=b.userData.nj630Rig;
  if(rig630){const mood630=t<actionUntil?actionName:'idle';
   // 6.31: explicit state-dependent posture, with bounded absolute transforms (no drift).
   const rest630=mood630==='sleep',bond630=mood630==='bond',play630=mood630==='play';
   if(rig630.kind==='sembrani'){rig630.head.rotation.x=rest630?-.13:bond630?-.07:play630?.045:0;rig630.head.rotation.y=Math.sin(tick*.62)*(mood630==='bond'?.13:mood630==='play'?.19:mood630==='sleep'?.006:.045)*slow;rig630.wings.forEach((w,i)=>{w.rotation.z=(i?1:-1)*Math.sin(tick*(mood630==='play'?2.0:.7))*(mood630==='sleep'?.012:mood630==='play'?.48:.12)*slow;});rig630.legs.forEach((l,i)=>l.rotation.x=Math.sin(tick*.85+i*1.3)*(mood630==='play'?.18:.035)*slow);rig630.tail.rotation.z=Math.sin(tick*.65)*(rest630?.008:bond630?.14:play630?.20:.07)*slow;rig630.torso.rotation.x=rest630?.035:play630?-.025:0;}
   else if(rig630.kind==='ebu_gogo'){rig630.head.rotation.x=rest630?-.16:bond630?-.08:play630?.05:0;rig630.head.rotation.y=Math.sin(tick*.59)*(mood630==='bond'?.16:mood630==='play'?.22:mood630==='sleep'?.006:.05)*slow;rig630.hair.rotation.z=Math.sin(tick*.72)*(mood630==='play'?.15:.04)*slow;rig630.arms.forEach((a,i)=>a.rotation.z=(i?1:-1)*Math.sin(tick*.9+i)*(mood630==='play'?.3:mood630==='sleep'?.008:.07)*slow);rig630.legs.forEach((l,i)=>l.rotation.x=Math.sin(tick*.8+i)*(mood630==='play'?.18:rest630?.004:.025)*slow);rig630.torso.rotation.z=bond630?Math.sin(tick*.48)*.025*slow:0;}
   else if(rig630.kind==='kuda_lumping'){rig630.board.rotation.x=rest630?.08:play630?-.045:0;rig630.board.rotation.y=Math.sin(tick*.58)*(mood630==='play'?.19:mood630==='sleep'?.009:.045)*slow;rig630.head.rotation.z=Math.sin(tick*.81)*(mood630==='bond'?.14:mood630==='play'?.18:mood630==='sleep'?.006:.05)*slow;rig630.tassels.rotation.z=Math.sin(tick*.96)*(mood630==='play'?.21:mood630==='sleep'?.008:bond630?.12:.05)*slow;}
  }
  // 6.29 ritual/performative identities: bounded transforms only, zero geometry allocations.
  const rig629=b.userData.nj629Rig;
  if(rig629){
   const mood629=t<actionUntil?actionName:'idle';
   if(rig629.kind==='warak_ngendog'){
    rig629.trunk.rotation.y=Math.sin(tick*.33)*.025*slow;
    rig629.neck.rotation.z=Math.sin(tick*.56)*(mood629==='sleep'?.007:.065)*slow;
    rig629.head.rotation.y=Math.sin(tick*.68)*(mood629==='bond'?.13:mood629==='play'?.11:mood629==='sleep'?.006:.042)*slow;
    rig629.legs.forEach((leg,i)=>{leg.rotation.x=(i%2?-1:1)*Math.sin(tick*.95+i*.65)*(mood629==='play'?.23:mood629==='sleep'?.008:.06)*slow;});
    rig629.tail.rotation.z=Math.sin(tick*.78)*(mood629==='play'?.17:mood629==='sleep'?.01:mood629==='bond'?.11:.055)*slow;
    rig629.egg.rotation.z=Math.sin(tick*.49)*(mood629==='bond'?.15:mood629==='play'?.12:mood629==='sleep'?.006:.03)*slow;
    rig629.streamers.rotation.y=Math.sin(tick*.64)*.05*slow;
   }else if(rig629.kind==='boraspati_tano'){
    rig629.lizard.rotation.z=Math.sin(tick*.33)*(mood629==='sleep'?.003:.017)*slow;
    rig629.head.rotation.z=Math.sin(tick*.49)*(mood629==='bond'?.10:mood629==='play'?.08:mood629==='sleep'?.003:.025)*slow;
    rig629.tail.rotation.z=Math.sin(tick*.72)*(mood629==='play'?.19:mood629==='sleep'?.004:mood629==='bond'?.11:.045)*slow;
    rig629.limbs.forEach((leg,i)=>{leg.rotation.z=(i%2?-1:1)*Math.sin(tick*.67+i*.4)*(mood629==='play'?.10:mood629==='sleep'?.002:.025)*slow;});
   }else if(rig629.kind==='bujang_ganong'){
    rig629.dancer.rotation.y=Math.sin(tick*.47)*.065*slow;
    rig629.mask.rotation.z=Math.sin(tick*.73)*(mood629==='play'?.14:mood629==='sleep'?.006:mood629==='bond'?.09:.045)*slow;
    rig629.nose.rotation.x=Math.sin(tick*.89)*.025*slow;
    rig629.jaw.rotation.x=Math.sin(tick*.90)*(mood629==='play'?.23:mood629==='sleep'?.007:mood629==='bond'?.14:.065)*slow;
    rig629.hair.rotation.z=Math.sin(tick*1.12)*(mood629==='play'?.19:mood629==='sleep'?.004:.045)*slow;
    rig629.arms.forEach((arm,i)=>{arm.rotation.z=(i?1:-1)*Math.sin(tick*.86+i*.65)*(mood629==='play'?.42:mood629==='sleep'?.015:mood629==='bond'?.21:.10)*slow;});
    rig629.legs.forEach((leg,i)=>{leg.rotation.x=(i?1:-1)*Math.sin(tick*.94+i*.6)*(mood629==='play'?.28:mood629==='sleep'?.007:.055)*slow;});
   }
  }
  // 6.28 individual articulations; transforms only, no geometry allocations per frame.
  const rig628=b.userData.nj628Rig;
  if(rig628){
   const mood628=t<actionUntil?actionName:'idle';
   if(rig628.kind==='hanoman'){
    rig628.torso.rotation.y=Math.sin(tick*.45)*.055*slow;
    rig628.head.rotation.y=Math.sin(tick*.68)*.075*slow;
    rig628.tail.rotation.z=Math.sin(tick*.89)*(mood628==='play'?.22:mood628==='sleep'?.018:mood628==='bond'?.16:.075)*slow;
    rig628.arms.forEach((arm,i)=>{arm.rotation.z=(i?1:-1)*(mood628==='play'?.31:mood628==='sleep'?.02:mood628==='bond'?.23:.09)*slow;});
    rig628.scarf.rotation.y=Math.sin(tick*.75)*(mood628==='sleep'?.012:.08)*slow;
   }else if(rig628.kind==='jatayu'){
    rig628.torso.rotation.y=Math.sin(tick*.33)*.035*slow;
    rig628.head.rotation.y=Math.sin(tick*.50)*.065*slow;
    rig628.wings.forEach((wing,i)=>{wing.rotation.z=(i?1:-1)*(mood628==='play'?.38:mood628==='sleep'?.018:mood628==='bond'?.23:.12)*Math.sin(tick*.88)*slow;});
    rig628.beak.rotation.x=Math.sin(tick*.95)*(mood628==='play'?.13:mood628==='sleep'?.005:mood628==='bond'?.075:.035)*slow;
    rig628.tail.rotation.y=Math.sin(tick*.65)*.065*slow;
   }else if(rig628.kind==='makara_candi'){
    rig628.head.rotation.y=Math.sin(tick*.28)*(mood628==='sleep'?.006:.027)*slow;
    rig628.jaw.rotation.x=(mood628==='play'?.19:mood628==='sleep'?.005:mood628==='bond'?.10:.045)*(1+Math.sin(tick*.75)*.30)*slow;
    rig628.trunk.rotation.z=Math.sin(tick*.68)*(mood628==='play'?.20:mood628==='sleep'?.008:mood628==='bond'?.13:.055)*slow;
    rig628.tendrils.rotation.y=Math.sin(tick*.40)*.014*slow;
   }
  }
  // 6.27 culture-specific joints. Geometry allocated at construction only.
  const rig627=b.userData.nj627Rig;
  if(rig627){
   const mood627=t<actionUntil?actionName:'idle';
   if(rig627.kind==='dewi_sri'){
    rig627.figure.rotation.y=Math.sin(tick*.34)*.032*slow;
    rig627.head.rotation.y=Math.sin(tick*.48)*.055*slow;
    rig627.rice.rotation.z=Math.sin(tick*.69)*(mood627==='play'?.18:mood627==='sleep'?.014:mood627==='bond'?.12:.055)*slow;
    rig627.arms.forEach((arm,i)=>{arm.rotation.z=(i?1:-1)*(mood627==='bond'?.20:mood627==='play'?.15:mood627==='sleep'?.025:.08)*slow;});
    rig627.halo.rotation.z=Math.sin(tick*.20)*.018*slow;
   }else if(rig627.kind==='batara_kala'){
    rig627.figure.rotation.y=Math.sin(tick*.42)*.052*slow;
    rig627.head.rotation.z=Math.sin(tick*.50)*.045*slow;
    rig627.jaw.rotation.x=(mood627==='play'?.19:mood627==='sleep'?.012:mood627==='bond'?.06:.095)*(1+Math.sin(tick*.86)*.3)*slow;
    rig627.arms.forEach((arm,i)=>{arm.rotation.z=(i?1:-1)*(mood627==='play'?.32:mood627==='sleep'?.025:mood627==='bond'?.18:.10)*slow;});
    rig627.ornaments.rotation.z=Math.sin(tick*.30)*.014*slow;
   }else if(rig627.kind==='putri_mandalika'){
    rig627.figure.rotation.y=Math.sin(tick*.35)*.038*slow;
    rig627.head.rotation.y=Math.sin(tick*.44)*.055*slow;
    rig627.veil.rotation.z=Math.sin(tick*.67)*(mood627==='play'?.14:mood627==='sleep'?.018:.065)*slow;
    rig627.sea.rotation.y=Math.sin(tick*.60)*(mood627==='bond'?.19:mood627==='play'?.15:mood627==='sleep'?.018:.075)*slow;
    rig627.nyale.rotation.z=Math.sin(tick*.55)*(mood627==='bond'?.12:mood627==='play'?.16:mood627==='sleep'?.012:.052)*slow;
   }
  }
  if(nj47Sculptors[record()[0]]){
    const id47=record()[0];
    const swimmers=['kerapu_macan','pari_elang_totol','hiu_karang_hitam','bintang_laut_biru','ubur_ubur_totol','ikan_gergaji_hijau'];
    const fliers=['rangkong_perut_putih','kucica_hutan','cenderawasih_merah','tokhtor_sumatra','paok_schneider','puyuh_sengayan'];
    if(swimmers.includes(id47)){b.position.y+=Math.sin(tick*1.4)*.085*slow;b.rotation.y=Math.sin(tick*.52)*.13*slow}
    if(fliers.includes(id47)){b.position.y+=Math.sin(tick*2.3)*.035*slow;
      for(const part of b.children){if(part.name==='wingL'||part.name==='wingR'){const sign=part.name==='wingL'?-1:1;part.rotation.z=sign*(.14+.20*Math.sin(tick*2.2)*slow)}}
    }
    if(['gatotkaca','bima_wayang','buto_cakil'].includes(id47))b.rotation.y=.085*Math.sin(tick*.36)*slow;
    if(id47==='kima_raksasa')b.position.y+=.01*Math.sin(tick*1.5)*slow;
    if(['bajing_sulawesi','katak_mutiara'].includes(id47))b.position.y+=Math.abs(Math.sin(tick*1.8))*.055*slow;
  }
  if(nj46Sculptors[record()[0]]){
    const animal=record()[0];
    if(['manta_oseanik','moray_raksasa','lepu_batu','penyu_belimbing','kuda_laut_kuda','ikan_terbang','paus_sperma','lumba_hidung_botol'].includes(animal)){
      b.position.y+=.075*Math.sin(tick*1.45)*slow;b.rotation.y+=.03*Math.sin(tick*.6)*slow;
    }
    if(['cendrawasih_wilson','cendrawasih_raja','elang_laut_putih','bangau_tongtong','celepuk_siau','kupu_raja_brooke'].includes(animal)){
      for(const w of b.children){if(w.name==='wingL'||w.name==='wingR')w.rotation.z=(w.name==='wingL'?-1:1)*(.10+.25*Math.sin(tick*2.7)*slow)}
    }
    if(['nyi_roro_kidul'].includes(animal))b.rotation.y=.08*Math.sin(tick*.44)*slow;
    if(animal==='dingiso'||animal==='tupai_terbang_merah')b.position.y+=.043*Math.abs(Math.sin(tick*2.1))*slow;
  }
  if(nj42Sculptors[record()[0]]){
    const species=record()[0];
    if(['capungan_banggai','coelacanth_sulawesi','ikan_kakatua','buntal_landak','nudibranch','teripang_nanas','penyu_sisik'].includes(species)){
      b.position.y+=Math.sin(tick*(species==='coelacanth_sulawesi'?.72:1.56))*.09*slow;
      b.rotation.y+=Math.sin(tick*.61)*.10*slow;
    }
    if(['bilou','simakobu','joja_mentawai','bokkoi'].includes(species)){
      b.rotation.y+=Math.sin(tick*.58)*.045*slow;
      b.position.y+=Math.abs(Math.sin(tick*1.2))*.035*slow;
    }
    if(['mambruk_victoria','namdur_polos','kakatua_putih','elang_bondol','paok_pancawarna'].includes(species)){
      for(const part of b.children){if(part.name==='wingL'||part.name==='wingR'){
        const sign=part.name==='wingL'?-1:1;
        part.rotation.z=sign*(.08+.19*Math.sin(tick*2.1)*slow);
      }}
    }
    if(species==='nenek_pakande')b.rotation.y+=Math.sin(tick*.34)*.07*slow;
    if(species==='kepiting_biola'||species==='udang_pistol')b.position.y+=Math.sin(tick*1.8)*.025*slow;
  }
  // 6.20: motion scoped to the two bespoke mythology models; no global avatar movement.
  if(record()[0]==='lembuswana'){
    b.rotation.y=Math.sin(tick*.32)*.065*slow;
    for(const wing of b.children){
      if(wing.name==='wingL'||wing.name==='wingR'){
        const side=wing.name==='wingL'?-1:1;
        wing.rotation.z=side*(.07+Math.sin(tick*1.35)*.11*slow);
      }
    }
  }
  if(record()[0]==='naga_basuki'){
    b.rotation.y=Math.sin(tick*.38)*.10*slow;
    b.position.y+=Math.sin(tick*.72)*.035*slow;
  }
  if(nj41Sculptors[record()[0]]){
    const rid=record()[0];
    const flyer=['orang_bati','kalong_besar','raja_udang_meninting','bangau_bluwok','gosong_maluku'].includes(rid);
    const swimmer=['gurita_peniru','gurita_cincin_biru','cumi_karang','ikan_mandarin','ular_laut_belang'].includes(rid);
    const spirit=['poppo','parakang'].includes(rid);
    if(rid==='naga_padoha'){
      // Grounded, restrained movement with a travelling wave through 21 individual sections.
      b.position.y=0;
      b.rotation.y=Math.sin(tick*.25)*.025*slow;
      const rig=b.userData.nj622Segments||[];
      for(const seg of rig){
        const phase=tick*.80-seg.index*.43;
        const strength=.020+.045*(seg.index/20);
        seg.part.position.x=seg.baseX+Math.sin(phase)*strength*slow;
        seg.part.position.y=seg.baseY+Math.sin(phase*.70)*.010*slow;
        seg.part.rotation.y=seg.baseYaw+Math.cos(phase)*.055*slow;
      }
      const head=b.getObjectByName('nj622PadohaHead');
      if(head){head.rotation.y=Math.sin(tick*.38)*.048*slow;head.rotation.x=Math.sin(tick*.57)*.013*slow;}
    }
    if(swimmer){b.position.y+=Math.sin(tick*1.85)*.09*slow;b.rotation.y=Math.sin(tick*.55)*.12*slow;}
    else if(spirit){b.position.y+=Math.sin(tick*1.2)*.10*slow;b.rotation.y=Math.sin(tick*.44)*.09*slow;}
    else if(rid==='kelinci_belang'){b.position.y+=Math.abs(Math.sin(tick*1.14))*.08*slow;}
    else if(rid==='bedawang_nala'){
      // No whole-body vertical squash or hovering; articulate four legs, neck and tail.
      b.position.y=0;
      b.scale.y=1;
      b.rotation.y=Math.sin(tick*.24)*.018*slow;
      const head=b.getObjectByName('nj622Head');
      if(head){head.rotation.y=Math.sin(tick*.52)*.050*slow;head.rotation.x=Math.sin(tick*.74)*.020*slow;}
      const tail=b.getObjectByName('nj622Tail');if(tail)tail.rotation.y=Math.sin(tick*.39)*.050*slow;
      for(const side of ['L','R'])for(const fore of ['F','B']){
        const leg=b.getObjectByName('nj622Leg'+fore+side);
        if(leg)leg.rotation.x=Math.sin(tick*.58+(side==='L'?0:Math.PI)+(fore==='F'?0:Math.PI))*.022*slow;
      }
      const shell=b.getObjectByName('nj622Shell');
      if(shell)shell.scale.y=1+Math.sin(tick*.67)*.005*slow;
    }
    if(flyer)for(const wing of b.children){if(wing.name==='wingL'||wing.name==='wingR'){
      const sign=wing.name==='wingL'?-1:1;wing.rotation.z=sign*(.08+Math.sin(tick*2.1)*.20*slow);
    }}
  }
  if(nj40Sculptors[record()[0]]){
    const id40=record()[0];
    if(['hiu_berjalan_hal','kuda_laut_kerdil','udang_mantis','belangkas','labi_moncong_babi','tuntong_laut'].includes(id40)){
      b.rotation.y=Math.sin(tick*.85)*.12*slow;
      b.position.y+=Math.sin(tick*2.2)*.075*slow;
    }else if(['sanca_hijau','kobra_jawa','bunglon_surai'].includes(id40)){
      b.rotation.y=Math.sin(tick*.70)*.065*slow;
    }else if(['ketam_kenari','katak_terbang','kodok_merah'].includes(id40)){
      b.position.y+=Math.abs(Math.sin(tick*1.4))*.06*slow;
    }
    const bird40=['gelatik_jawa','julang_sulawesi','beo_nias','kakatua_maluku','ayam_hutan_hijau','bidadari_hal','serak_jawa','paruh_kodok','jatayu'].includes(id40);
    if(bird40)for(const wing of b.children){if(wing.name==='wingL'||wing.name==='wingR'){
      const sign=wing.name==='wingL'?-1:1;
      wing.rotation.z=sign*(.07+Math.sin(tick*(id40==='jatayu'?2.0:3.1))*.23*slow);
    }}
  }
  // Distinct, low-amplitude folklore motions; no generic hopping for a grounded giant.
  const nj611Id=record()[0];
  if(nj611Id==='buto_ijo'){b.rotation.y=Math.sin(tick*.57)*.055*slow;b.position.y+=Math.sin(tick*.95)*.014*slow;}
  else if(nj611Id==='sundel_bolong'){
    b.position.y+=Math.sin(tick*1.13)*.085*slow;
    const curtain=b.getObjectByName('nj611HairCurtain');if(curtain)curtain.rotation.z=Math.sin(tick*.81)*.035*slow;
  }else if(nj611Id==='naga_antaboga'){
    b.rotation.y=Math.sin(tick*.37)*.11*slow;
    const crown=b.getObjectByName('nj611Crown');if(crown)crown.rotation.z=Math.sin(tick*.51)*.025*slow;
  }
  // 6.12: distinct idle behaviors; never stack additional geometry each frame.
  if(nj611Id==='pocong'){
    b.position.y=Math.max(0,Math.sin(tick*1.3))*.045*slow;
    b.rotation.y=Math.sin(tick*.44)*.07*slow;
  }else if(nj611Id==='kuntilanak'){
    b.position.y=Math.sin(tick*.91)*.13*slow;
    const hair=b.getObjectByName('nj612LongHair');if(hair)hair.rotation.z=Math.sin(tick*.63)*.045*slow;
  }else if(nj611Id==='tuyul'){
    b.position.y=Math.abs(Math.sin(tick*1.4))*.018*slow;
    b.rotation.y=Math.sin(tick*.88)*.16*slow;
  }
  if(['bird','kingfisher','paradise','maleo','garuda','starling','eagle','hornbill','cockatoo','peafowl'].includes(btype))for(const wing of b.children){if(wing.name==='wingL'||wing.name==='wingR'||wing.name==='signatureWingL'||wing.name==='signatureWingR'){const sign=wing.name.endsWith('L')?-1:1;wing.rotation.z=sign*(.06+Math.sin(tick*(btype==='garuda'?2.2:3.3))*.25*slow)}}
  avatar.rotation.y=Math.sin(tick*.45)*.16;avatar.scale.setScalar(.83*(pet?([.92,.46,.59,.73,.86,1,1.02,1.12][pet.phase]||1):1));if(avatar.userData.morph)avatar.userData.morph.rotation.y=tick*.19;
 }
 for(let q=fx.length-1;q>=0;q--){const f=fx[q];f.age+=dt;f.node.position.y+=dt*f.speed;f.node.position.x+=Math.cos(f.a)*dt*.17;f.node.position.z+=Math.sin(f.a)*dt*.17;f.node.material.opacity=Math.max(0,.95-f.age/1.15);if(f.age>1.15){world.scene.remove(f.node);f.node.geometry.dispose();f.node.material.dispose();fx.splice(q,1)}}
 for(let f of world.fireflies){f.node.position.y=.22+f.seed%6*.14+Math.sin(tick*(.6+f.seed%3*.33)+f.phase)*.20*slow;f.node.material.opacity=.8;}
 const W=world;if(W.crystal)W.crystal.rotation.y+=dt*.45;const tamaPortrait=sceneEl.classList.contains('njt-on')&&innerWidth<=650;let theta=rotation+.2,rad=(tamaPortrait?9.2:10)*zoom;W.camera.position.set(Math.sin(theta)*rad,(tamaPortrait?4.05:4.4)+pitch*rad,Math.cos(theta)*rad);W.camera.lookAt(0,tamaPortrait?.56:.86,0);three.render(W.scene,W.camera);
}
// Engine import: one low-cost CDN dependency; the classic game remains fully usable when offline.
async function boot3D(){let needsGPU=!!(document.createElement('canvas').getContext('webgl2')||document.createElement('canvas').getContext('webgl'));if(!needsGPU)throw new Error('WebGL tidak tersedia di perangkat ini');
 let errors=[];for(const url of ['https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.module.js','https://unpkg.com/three@0.160.1/build/three.module.js']){try{THREE=await import(url);break}catch(e){errors.push(e)}}
 if(!THREE)throw new Error('Paket 3D belum tersedia tanpa internet');makeWorld();njtApplyLiving(true);requestAnimationFrame(animate);
}
try{if(!Number.isInteger(savedUI.index)&&typeof current==='function'&&current()&&CREATURES.findIndex(r=>r[0]===current().species)>=0)index=CREATURES.findIndex(r=>r[0]===current().species)}catch(e){}
drawInfo();window.addEventListener('resize',resize,{passive:true});window.addEventListener('orientationchange',resize,{passive:true});document.addEventListener('visibilitychange',()=>{lastFrame=0});
boot3D().catch(e=>{const msg=document.createElement('div');msg.className='nj-fallback';msg.innerHTML='Dunia legenda menunggumu<small>'+e.message+'. Lanjutkan bermain melalui Arsip 2D; progresmu tetap tersimpan. Saat online, buka ulang halaman untuk merender habitat 3D.</small>';
 sceneEl.append(msg);$('#nj35Canvas').style.opacity=0;$('.nj-label3d')?.remove();});
})();
