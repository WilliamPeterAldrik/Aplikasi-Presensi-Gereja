JURNAL PROGRES MINGGUAN
Proyek: Sistem Presensi Gereja Berbasis Web
Minggu ke-2
Tanggal: 14 – 17 Oktober 2025

1	Rachel Apriyani	2372012	Mendesain halaman “About Us” dan “Absen”
2	William Peter Aldrik	2372029	Menambahkan route awal dan konfigurasi pathing aplikasi,Mengatur koneksi ke database dan pengujian konektivitas,Instalasi dan konfigurasi module Node.js serta dokumentasi proyek
2. Latar Belakang

Presensi jemaat merupakan hal penting dalam kegiatan administrasi gereja karena dapat membantu pihak gereja dalam memantau tingkat kehadiran dan partisipasi jemaat. Namun, pencatatan presensi yang masih dilakukan secara manual sering kali menimbulkan kendala seperti kesalahan input data, duplikasi, dan kesulitan dalam pembuatan laporan kehadiran.

Untuk mengatasi permasalahan tersebut, kelompok kami mengembangkan Sistem Presensi Gereja Berbasis Web. Sistem ini dirancang agar dapat mencatat kehadiran jemaat secara digital dengan antarmuka yang sederhana, serta mempermudah admin dan petugas gereja dalam mengelola data pengguna, kegiatan, dan absensi secara efisien dan terintegrasi.

3. Tujuan Pengerjaan

Tujuan dari pengerjaan tugas besar ini adalah untuk:

Merancang dan membangun sistem presensi berbasis web yang terhubung dengan database MySQL.

Membuat tampilan web yang responsif dan mudah digunakan.

Mengimplementasikan struktur MVC (Model-View-Controller) untuk memisahkan logika, tampilan, dan data.

Menyusun route dan pathing awal untuk mengatur alur navigasi halaman dalam aplikasi.

Menambahkan halaman About Us dan Absen sebagai bagian dari fitur utama sistem.

4. Progress Pengerjaan Minggu Ini
a. Penambahan Route dan Pathing Awal

Kelompok telah menambahkan route dasar menggunakan Express.js untuk mengatur alur navigasi antar halaman. Route yang telah dibuat mencakup:

/ → Halaman utama

/login → Halaman login pengguna

/dashboard → Dashboard admin/petugas

/about → Halaman About Us

/absen → Halaman absensi jemaat

Semua route sudah diatur di dalam folder routes/ dengan pathing terstruktur untuk kemudahan pengembangan berikutnya.

b. Koneksi ke Database

Sistem telah dikoneksikan ke database MySQL menggunakan modul mysql2.
Koneksi ini dikelola melalui file konfigurasi db.js yang memanfaatkan dotenv untuk menyimpan kredensial database dengan aman.
Uji koneksi berhasil dilakukan dan aplikasi dapat membaca data dari tabel yang ada.

c. Instalasi dan Konfigurasi Module Node.js

Beberapa module Node.js yang telah diinstal dan digunakan:

express → framework backend utama

mysql2 → koneksi ke database MySQL

dotenv → pengaturan environment variable

body-parser → membaca input dari form

nodemon → mempermudah pengembangan dengan auto-restart

d. Pembuatan Halaman About Us dan Absen

Dua halaman baru telah selesai dibuat minggu ini:

About Us Page – berisi informasi mengenai tim pengembang dan deskripsi singkat proyek.

Absen Page – halaman khusus untuk mencatat dan menampilkan data kehadiran jemaat.

Kedua halaman dirancang menggunakan HTML, CSS, dan Bootstrap, dan telah dihubungkan dengan route yang dibuat di Express.js.

5. Hasil yang Telah Dicapai

 Struktur route dan pathing awal telah berjalan dengan baik.
 Koneksi database MySQL berhasil dilakukan.
 Module Node.js utama telah terinstal dan berfungsi dengan benar.
 Halaman About Us dan Absen telah selesai dibuat

6. Rencana Pekerjaan Minggu Berikutnya

Melanjutkan pembuatan fitur CRUD untuk data absensi dan kegiatan.

Menghubungkan model dan controller dengan database.

Menyempurnakan tampilan halaman agar lebih konsisten dan responsif.

7. Kesimpulan

Progress pengerjaan tugas besar Sistem Presensi Gereja Berbasis Web pada minggu ini berjalan sesuai rencana. Kelompok berhasil menambahkan route dan pathing awal, menghubungkan aplikasi dengan database MySQL, menginstal module Node.js yang diperlukan, serta membuat halaman About Us dan Absen. Dengan struktur dasar yang telah terbentuk, sistem kini siap dilanjutkan ke tahap pengembangan CRUD dan autentikasi pengguna.
