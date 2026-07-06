# Product Requirements Document (PRD)
## Project Name: ridhoi.id (Interactive Pixel Art Portfolio)
## Client/Product Owner: Muhammad Ridhoi (Doy)
## Target Platform: Web Browser (Desktop & Mobile)
## Framework/Engine: Kaboom.js + HTML/CSS/Vanilla JS

### 1. Latar Belakang & Tujuan (Objective)
Project ini bertujuan untuk merombak ulang website portofolio ridhoi.id menjadi pengalaman web interaktif bergaya retro pixel game (2D Top-Down RPG). Pengunjung tidak sekadar men-scroll halaman web tradisional, melainkan menggerakkan karakter (player) untuk bereksplorasi dan berinteraksi dengan objek/NPC guna menemukan informasi seputar profil, proyek, tulisan, dan kontak.

### 2. Spesifikasi Teknis (Tech Stack)
- **Game Engine:** Kaboom.js (dipilih karena ringan, performa tinggi di browser, dan mudah diintegrasikan dengan DOM HTML).
- **Styling & UI:** CSS3 Flexbox/Grid untuk UI overlay (misal: kotak dialog, progress bar, tombol).
- **Asset Management:** Gambar berformat .png (sprite sheet) dengan `image-rendering: pixelated`, Audio .mp3 / .m4a / .wav low-bitrate untuk sound effect dan BGM chiptune.
- **Deployment:** Static hosting (Vercel/Netlify atau web server saat ini yang melayani domain tersebut).

### 3. Alur Pengalaman Pengguna (User Flow)
1. **Booting Screen:** Halaman hitam dengan teks blinking "PRESS START" atau logo game.
2. **Spawning:** Karakter utama muncul di tengah ruangan (Ruang Kerja/Kamar).
3. **Exploration:** Pengguna menggunakan tombol panah / WASD (Desktop) atau virtual d-pad/tap-to-move (Mobile) untuk berkeliling.
4. **Interaction:** Saat menabrak objek spesifik dan menekan tombol aksi (atau mendekatinya), akan muncul UI Box (Dialog/Inventory style) yang berisi data dinamis.
5. **External Links:** Beberapa data dalam UI Box akan mengarah ke tab baru (misal: link baca artikel atau link repository).

### 4. Kebutuhan Fitur & Sistem (Core Features)
#### A. Sistem Pergerakan (Movement System)
- **Desktop:** Dukungan input WASD atau Tombol Panah.
- **Mobile:** Dukungan Touch/Tap ke titik tujuan (pathfinding sederhana) ATAU Virtual Joystick/D-pad di layar (layar bagian bawah).
- **Collision Detection:** Karakter tidak bisa menembus dinding, meja, atau objek solid lainnya.

#### B. Interaksi & UI Dialog (Interaction System)
- Muncul indikator ikon kecil (contoh: tanda seru !) di atas objek jika karakter berada dalam jarak interaksi.
- **Dialog Box:** Kotak dialog ala RPG (Background biru dongker `#0c102b`, border putih solid, font Press Start 2P atau VT323).
- **Typing Effect:** Teks muncul huruf demi huruf saat dialog dibuka.

### 5. Pemetaan Konten & Level Design (Map Content)
Peta terdiri dari satu ruangan (atau satu area kecil) yang didesain menyerupai ruang kerja/studio dengan nuansa yang dekat dengan aktivitas kreatif di Yogyakarta. Terdapat 4 titik interaksi utama:

1. **Interaksi "Tentang Saya"**
   - **Objek/NPC:** Sebuah buku harian di atas meja kopi atau NPC mentor/kucing.
   - **Konten UI yang Muncul:**
     - Teks profil: "Muhammad Ridhoi (Doy). Writer, Web Developer, dan Social Media Specialist."
     - Detail pelengkap: Lulusan Bahasa dan Sastra Indonesia Universitas Airlangga, dengan kepribadian INFP-T.
     - Visual: Avatar/Foto pixelated.

2. **Interaksi "Project (Development & Tech)"**
   - **Objek:** Meja dengan Setup Komputer/Laptop dan layar monitor yang menyala (animasi).
   - **Konten UI yang Muncul:** Menu list atau grid berisi proyek teknis.
   - **Data:** Web development (PHP/Python), setup server/VPS bot Telegram, pengelolaan domain, serta integrasi Gemini API/Google AI Studio.

3. **Interaksi "Tulisan (Writing & Content)"**
   - **Objek:** Rak buku besar bergaya klasik kayu.
   - **Konten UI yang Muncul:** Daftar portofolio kepenulisan (Bisa di-scroll).
   - **Data:** Artikel SEO, tulisan di platform komunitas (Mojok, IDN Times, artikel advokasi/Komunitas Kretek), proyek kreatif mandiri (Nganjuk story project), dll. Terdapat tombol "Baca" yang mengarah ke link eksternal.

4. **Interaksi "Kontak"**
   - **Objek:** Papan pengumuman (notice board) atau burung hantu/burung pos di dekat jendela.
   - **Konten UI yang Muncul:** Tautan ke Email, LinkedIn, GitHub, dan Instagram.

### 6. Kebutuhan Aset (Asset Requirements)
- **Tilemap (16x16 px atau 32x32 px):** Lantai kayu/keramik, dinding bata/polos, meja, rak buku, PC, tanaman hias, jendela.
- **Player Sprite:** Karakter utama dengan animasi idle dan walking (4 arah: atas, bawah, kiri, kanan).
- **Audio:**
  - 1 BGM ambient/lo-fi chiptune pelan.
  - SFX Langkah kaki pelan.
  - SFX Blip saat teks dialog muncul dan SFX Select/Click saat interaksi.

### 7. Fase Pengembangan (Milestones)
- **Sprint 1:** Setup engine Kaboom.js, rendering map statis, pergerakan karakter (desktop & mobile support), deteksi tabrakan.
- **Sprint 2:** Sistem interaksi (trigger event), integrasi UI DOM CSS untuk Dialog Box dan Content Menu.
- **Sprint 3:** Pengisian database/content JSON (memasukkan data portofolio asli), polishing animasi, implementasi SFX/BGM.
- **Sprint 4:** QA Testing (optimasi performa loading, tes responsivitas di berbagai ukuran layar HP), Deployment awal.
