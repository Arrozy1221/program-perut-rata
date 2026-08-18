# Program 90 Hari — Perut Rata

Aplikasi harian untuk program menurunkan lemak perut. Dirancang untuk jadwal kerja
Senin–Jumat 08.00–17.00, badminton hari Minggu, dan latihan tanpa alat gym.

Target program: **74 kg → 65–66 kg dalam 3 bulan** (defisit sehat 0,5–0,7 kg/minggu).

---

## Bagian 1 — Cara Deploy ke Vercel

### Yang dibutuhkan
- Akun GitHub (gratis)
- Akun Vercel (gratis, bisa login pakai GitHub)

### Langkah A — Naikkan ke GitHub

```bash
cd program-perut-rata
git init
git add .
git commit -m "Program 90 hari perut rata"
git branch -M main
git remote add origin https://github.com/USERNAME/program-perut-rata.git
git push -u origin main
```

Kalau tidak mau lewat GitHub, bisa langsung:

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # produksi
```

### Langkah B — Import di Vercel

1. Buka https://vercel.com/new
2. Pilih repository `program-perut-rata`
3. **Framework Preset:** biarkan `Other`
4. **Build Command / Output Directory:** kosongkan saja — Vercel otomatis
   menyajikan folder `public/` dan menjalankan `api/` sebagai serverless function
5. Klik **Deploy**

Selesai. Aplikasi sudah bisa dibuka di `https://nama-proyek.vercel.app`.
Pada tahap ini data sudah tersimpan, tapi **masih per-perangkat**.

### Langkah C — Aktifkan sinkronisasi antar perangkat

Supaya data di HP dan laptop menyatu, butuh satu penyimpanan bersama:

1. Di dashboard Vercel, buka proyeknya → tab **Storage**
2. Pilih **Upstash for Redis** → **Create** (paket gratis sudah lebih dari cukup)
3. Hubungkan ke proyek ini. Vercel otomatis mengisi dua variabel lingkungan:
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
4. **Redeploy** proyeknya (tab Deployments → titik tiga → Redeploy)
5. Buka aplikasi → tab **Progres** → bagian **Sinkronisasi Antar Perangkat**
6. Isi kode akses bebas, misalnya `mst-2026`, lalu **Aktifkan sinkronisasi**
7. Buka aplikasi di HP, isi **kode yang sama**. Data langsung menyatu.

> Kalau langkah C dilewati, aplikasi tetap jalan normal — hanya saja
> datanya tersimpan terpisah di tiap perangkat.

### Langkah D — Pasang di layar HP

- **Android/Chrome:** buka link → menu ⋮ → *Tambahkan ke layar utama*
- **iPhone/Safari:** buka link → tombol Bagikan → *Add to Home Screen*

Setelah itu tampilannya seperti aplikasi biasa, tanpa address bar.

---

## Bagian 2 — Catatan Penggunaan Tiap Halaman

### 🏠 HARI INI

Halaman yang dibuka tiap pagi.

| Bagian | Fungsi |
|---|---|
| **Banner hitam** | Jenis latihan hari ini + persentase checklist yang sudah selesai |
| **Panah ‹ ›** | Pindah tanggal. Berguna untuk mengisi hari yang kelewat atau mengintip besok |
| **Checklist jadwal** | Ketuk untuk mencentang. Jadwal otomatis berbeda antara hari kerja, Sabtu, dan Minggu |
| **Air minum** | Ketuk gelas ke-N untuk menandai. Ketuk gelas yang sama lagi untuk membatalkan |

**Cara pakai harian:** buka pagi hari, ikuti urutan jam dari atas ke bawah,
centang setiap selesai. Tidak perlu tombol simpan — otomatis.

**Yang perlu diperhatikan:** item jam 15.30 (snack) adalah titik paling rawan.
Kalau item ini sering tidak tercentang atau berubah jadi gorengan, itu penyebab
utama kalau berat badan mandek.

---

### 🍽️ MENU

Punya dua mode, dipilih lewat tombol di atas.

#### Mode "Saran Menu"

Empat waktu makan dengan pilihan yang berputar otomatis tiap hari.

| Elemen | Arti |
|---|---|
| **↻ Ganti** | Tukar ke alternatif lain dengan kalori setara. Pakai kalau warungnya tutup atau sedang bosan |
| **📍 Beli di** | Jenis tempat yang bisa dituju di sekitar Metro Indah Mall |
| **✕ merah** | Hal yang harus dihindari pada menu itu |
| **Total Hari Ini** | Jumlah kalori & protein dari empat menu yang sedang tampil |

#### Mode "Hitung Sendiri"

Untuk hari ketika kamu makan di luar rencana — traktiran kantor, kondangan,
atau sekadar ingin tahu satu piring nasi padang itu berapa.

**Cara pakai:**
1. Cari makanannya di kotak pencarian, atau saring lewat kategori
2. Ketuk untuk menambahkan — otomatis masuk ke waktu makan sesuai jam saat itu
3. Atur porsi dengan tombol **−** dan **+** (kelipatan 0,5 porsi)
4. Waktu makannya bisa diubah lewat dropdown di sebelah kanan
5. Ketuk **−** sampai nol untuk menghapus

**Membaca hasilnya:**

| Warna kotak | Arti | Tindakan |
|---|---|---|
| 🟢 Hijau | Pas di target | Lanjutkan |
| 🟡 Kuning | Kalori kurang, atau protein kurang | Tambah lauk protein, jangan biarkan terlalu rendah |
| 🔴 Merah | Lebih dari 250 kkal di atas target | Besok kembali normal — jangan dibalas dengan puasa |

> **Catatan penting:** angka kalori di sini adalah **perkiraan porsi umum warung
> Indonesia**, bukan hasil ukur laboratorium. Porsi tiap warung berbeda-beda, jadi
> anggap ini alat pemantau tren, bukan angka mutlak. Selisih 10–15% itu wajar dan
> tidak mengubah hasil selama konsisten.

---

### 💪 LATIHAN

Program hari ini muncul paling atas, hari lain di bawahnya sebagai referensi.

| Tombol | Fungsi |
|---|---|
| **Kotak centang** | Tandai gerakan yang sudah selesai (hanya untuk hari ini) |
| **Cara →** | Buka panduan: ilustrasi posisi, otot yang dilatih, langkah-langkah, kesalahan umum, dan tautan cari video |
| **Timer** | Hitung mundur untuk gerakan berdurasi. Ada bunyi saat selesai |

**Yang otomatis terjadi:** begitu **semua** gerakan hari itu tercentang, item
"Latihan" di halaman Hari Ini ikut tercentang sendiri, persentase harian naik,
dan kotak di garis 90 hari ikut terisi.

**Untuk pemula:** buka **Cara →** sebelum mencoba gerakan yang belum pernah
dilakukan. Bagian *Kesalahan umum* lebih penting daripada bagian cara melakukan —
di situ letak penyebab cedera.

**Progresi tiap 3–4 minggu:** naikkan durasi plank (45 → 60 detik), tambah
repetisi 2–3 per gerakan, atau kurangi waktu istirahat. Kalau semua terasa mudah,
berarti sudah waktunya naik level.

---

### 📈 PROGRES

| Bagian | Fungsi |
|---|---|
| **Tiga kotak atas** | Berat terkini, total penurunan, lingkar perut terkini |
| **Catat Ukuran** | Isi berat dan/atau lingkar perut. Satu tanggal hanya menyimpan satu catatan — mengisi ulang akan menimpa |
| **Grafik** | Muncul setelah ada minimal 2 catatan berat. Garis hijau putus-putus = target |
| **Riwayat** | Semua catatan. Tombol ✕ untuk menghapus baris |
| **Pengaturan** | Tanggal mulai program dan target berat |
| **Sinkronisasi** | Kode akses untuk menyatukan data antar perangkat |
| **Cadangkan Data** | Unduh salinan `.json`, atau pulihkan dari cadangan |

**Jadwal pencatatan yang disarankan:**
- **Berat:** seminggu sekali, hari yang sama, pagi setelah bangun dan buang air,
  sebelum makan. Menimbang tiap hari bikin frustrasi karena angka naik-turun
  hanya karena kadar air.
- **Lingkar perut:** dua minggu sekali. Ukur sejajar pusar, pita mendatar,
  **jangan tahan napas**. Ini indikator yang paling jujur untuk lemak perut —
  angkanya sering turun duluan sebelum timbangan bergerak.

**Kalau berat mandek 2 minggu berturut-turut:** hampir selalu penyebabnya porsi
makan siang yang perlahan membesar tanpa disadari, atau minuman manis yang mulai
masuk lagi. Pakai mode "Hitung Sendiri" selama 3 hari untuk mengeceknya.

---

## Bagian 3 — Catatan Teknis

### Struktur proyek
```
program-perut-rata/
├── api/
│   └── data.js          serverless function untuk sinkronisasi
├── public/
│   ├── index.html       seluruh aplikasi (satu file, tanpa dependensi)
│   └── manifest.json    supaya bisa dipasang di layar HP
├── package.json
├── vercel.json
└── README.md
```

### Urutan penyimpanan
1. **Server** — dipakai kalau kode akses diisi dan Upstash sudah terhubung
2. **localStorage** — cadangan lokal, selalu ditulis
3. **Memori** — kondisi darurat kalau browser memblokir penyimpanan

Setiap penyimpanan ditulis ke lokal **dan** server, jadi kalau internet mati
aplikasi tetap jalan normal dan menyusul menyinkronkan saat online kembali.

### Soal keamanan
Kode akses bukan sistem login sungguhan — tidak ada kata sandi atau enkripsi.
Siapa pun yang tahu kodenya dan alamat situsnya bisa membuka datanya. Untuk data
berat badan pribadi ini memadai, tapi **jangan pakai kode yang mudah ditebak**
seperti `12345` atau `test`, dan jangan simpan informasi sensitif lain di sini.

### Mengubah isi program
Semua data ada di dalam `public/index.html` sebagai konstanta di bagian atas
`<script>`, jadi mudah disunting tanpa perlu build:

| Konstanta | Isi |
|---|---|
| `B`, `L`, `D`, `S` | Pilihan sarapan, makan siang, makan malam, snack |
| `FOOD` | Database makanan `[nama, kkal, protein, kategori]` |
| `PROGRAM` | Program latihan per hari (0 = Minggu … 6 = Sabtu) |
| `GUIDE` | Panduan gerakan: ilustrasi SVG, langkah, kesalahan umum |
| `schedule()` | Jadwal jam harian |
| `TARGET_K`, `TARGET_P` | Target kalori dan protein harian |

Setelah disunting, `git push` — Vercel otomatis deploy ulang.

---

## Penutup

Aplikasi ini alat bantu, bukan penentu hasil. Yang menentukan tetap konsistensi
pada empat hal: defisit kalori, protein cukup, latihan teratur, dan tidur 7 jam.
Konsisten 85% selama 3 bulan jauh lebih berhasil daripada sempurna selama 2 minggu
lalu berhenti.

Kalau muncul keluhan nyeri sendi yang menetap, pusing berlebihan, atau berat turun
lebih dari 1 kg per minggu secara konsisten, kurangi intensitasnya dan
pertimbangkan berkonsultasi dengan dokter atau ahli gizi.
