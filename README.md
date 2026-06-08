# Klinik Website Project

Proyek ini adalah landing page untuk website klinik kesehatan. Dibangun menggunakan HTML, CSS murni, dan Vanilla JavaScript.

## Struktur Direktori

*   [`index.html`](./index.html) - Struktur utama halaman website.
*   [`css/style.css`](./css/style.css) - Styling halaman website, mencakup layout, warna, dan responsivitas.
*   [`js/script.js`](./js/script.js) - Interaksi pengguna (slider, menu mobile, efek aktif).

## Dokumentasi Interaksi JavaScript & CSS

Berikut adalah penjelasan mengenai interaksi JavaScript dan CSS yang digunakan di dalam proyek ini. Anda dapat mengklik tautan file untuk langsung melihat kode yang dimaksud.

### 1. Mobile Menu Toggle (Buka/Tutup Menu di Layar Kecil)
Digunakan untuk memunculkan atau menyembunyikan navigasi saat diakses melalui *smartphone*.

*   **Logic (JS):** [`js/script.js`](./js/script.js)
    Mendeteksi klik pada tombol menu. Jika diklik, JS akan memicu (toggle) penambahan atau penghapusan class `tampil` pada kontainer navigasi.
*   **Visual (CSS):** [`css/style.css`](./css/style.css)
    Secara default di layar HP, menu disembunyikan (`display: none`). Ketika JS menambahkan class `.tampil`, CSS akan mengubah `display` menu tersebut sehingga muncul di layar.

### 2. Specialty Cards Selection (Efek Aktif pada Layanan)
Memberikan efek visual (seperti tersorot) saat pengguna mengklik salah satu kartu layanan/spesialisasi.

*   **Logic (JS):** [`js/script.js`](./js/script.js)
    Saat sebuah kartu diklik, JS akan mencari semua kartu dan menghapus class `active`. Kemudian, JS hanya menambahkan class `active` ke kartu yang baru saja diklik.
*   **Visual (CSS):** [`css/style.css`](./css/style.css)
    CSS menangkap class `.card.active`. Kartu yang memiliki class ini akan diubah latar belakangnya menjadi biru, teks menjadi putih, dan latar belakang ikon di dalamnya disesuaikan agar kontras.

### 3. Testimoni Carousel (Slider Feedback)
Mengizinkan pengguna menggeser daftar testimoni ke kiri atau ke kanan menggunakan tombol panah.

*   **Logic (JS):** [`js/script.js`](./js/script.js)
    Menangani fungsi klik pada tombol "Kiri" dan "Kanan". JS akan menghitung jarak geser (lebar kartu + *gap* = 269px) dan menggunakan method `scrollBy` untuk menggeser kontainer ke kiri (minus) atau ke kanan (plus).
*   **Visual (CSS):** [`css/style.css`](./css/style.css)
    Kontainer testimoni menggunakan `display: flex; overflow-x: auto;` agar elemen berjejer menyamping dan bisa digulir. CSS juga menghilangkan *scrollbar* bawaan (`::-webkit-scrollbar { display: none; }`) dan mengatur transisi pergeseran menjadi halus (`scroll-behavior: smooth;`).

### 4. Search Logic (Pencarian Dokter/Layanan)
Fungsi dasar pencarian di bagian atas (Hero Section).

*   **Logic (JS):** [`js/script.js`](./js/script.js)
    Saat tombol "Cari" diklik, JS memeriksa kolom input. Jika kosong, akan muncul peringatan (*alert*) "Masukkan kata kunci". Jika ada teksnya, akan menampilkan teks tersebut.
*   **Visual (CSS):** [`css/style.css`](./css/style.css)
    CSS merapikan tampilan *search box* dengan efek bayangan (glow) di sekitarnya (`.search-box-shadow`), memposisikan ikon kaca pembesar, dan menghilangkan garis bingkai bawaan pada kolom *input*.
