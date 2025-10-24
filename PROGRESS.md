JURNAL PROGRES MINGGUAN

Proyek: Sistem Presensi Gereja Berbasis Web
Minggu ke-3
Tanggal: 21 – 24 Oktober 2025

1. Anggota dan Pembagian Tugas
1	Rachel Apriyani	2372012	Membuat halaman untuk menampilkan daftar pengguna (list users) dan role, serta melakukan perbaikan tampilan halaman agar lebih konsisten.
2	William Peter Aldrik	2372029	Merapikan struktur file proyek, memastikan seluruh halaman dapat diakses melalui localhost, melakukan pengecekan dan pengujian koneksi database, serta memastikan routing dan pathing berjalan dengan baik.

3. Latar Belakang

Presensi jemaat merupakan bagian penting dari kegiatan administrasi gereja karena membantu pihak gereja dalam memantau kehadiran dan partisipasi jemaat. Proses presensi yang masih dilakukan secara manual berpotensi menimbulkan kesalahan pencatatan, duplikasi data, serta kesulitan dalam pelaporan.

Untuk mengatasi hal tersebut, kelompok kami mengembangkan Sistem Presensi Gereja Berbasis Web. Sistem ini bertujuan untuk memudahkan proses pencatatan kehadiran jemaat secara digital dengan antarmuka yang sederhana, terintegrasi, dan mudah digunakan oleh petugas maupun admin gereja.

3. Tujuan Pengerjaan

 1.Tujuan dari pengerjaan minggu ini adalah untuk:
 
 2.Menyempurnakan struktur proyek agar lebih teratur dan mudah dikembangkan.
 
 3.Memastikan setiap halaman dapat diakses melalui localhost tanpa error.
 
 4.Melakukan pengujian koneksi antara aplikasi dan database MySQL.
 
 5.Menambahkan halaman daftar pengguna (list users) beserta role untuk mempermudah pengelolaan data pengguna.
 
 6.Menyiapkan pondasi untuk tahap pengembangan fitur CRUD dan autentikasi pengguna.

4. Progress Pengerjaan Minggu Ini
a. Perapihan Struktur File Proyek

Struktur folder proyek telah diperbaiki agar lebih sesuai dengan pola MVC (Model-View-Controller). Folder routes, views, dan public sudah diatur ulang agar memudahkan pengembangan, dan setiap file route sudah diarahkan dengan benar.

b. Akses Halaman Melalui Localhost

Seluruh halaman kini dapat diakses langsung melalui localhost tanpa error. Pathing antara file HTML di folder pages/ dan resource (CSS, gambar, serta script) di folder public/ telah diperbaiki agar dapat dimuat dengan benar di browser.

c. Pengecekan dan Pengujian Koneksi Database

Telah dilakukan pengecekan ulang pada file db.js dan pengujian koneksi ke MySQL menggunakan modul mysql2. Koneksi dinyatakan berhasil, dan aplikasi dapat membaca tabel dari database dengan baik.

d. Pembuatan Halaman List Users dan Role

Salah satu anggota kelompok telah menambahkan halaman List Users dan Role yang menampilkan data pengguna beserta perannya di sistem. Halaman ini akan menjadi dasar untuk implementasi fitur CRUD di minggu berikutnya.

5. Hasil yang Telah Dicapai

Struktur file proyek lebih rapi dan sesuai standar MVC.

Semua halaman sudah dapat diakses melalui localhost.

Koneksi ke database MySQL berhasil diuji dan berjalan stabil.

Halaman List Users dan Role telah selesai dibuat dan diintegrasikan ke sistem.

6. Rencana Pekerjaan Minggu Berikutnya

Mengembangkan fitur CRUD untuk data pengguna dan absensi.

Menghubungkan controller dan model dengan database.

Menambahkan fitur autentikasi login (admin/petugas).

Menyempurnakan tampilan halaman dengan komponen Bootstrap.

Menyiapkan halaman dashboard yang menampilkan data kehadiran secara ringkas.

7. Kesimpulan

Pada minggu ke-3, tim berhasil merapikan struktur proyek, memastikan semua halaman dapat diakses dengan baik, serta menyelesaikan pengujian koneksi ke database. Selain itu, telah dibuat halaman List Users dan Role sebagai langkah awal menuju pengelolaan data pengguna yang dinamis. Dengan pondasi aplikasi yang kini lebih stabil, tim siap melanjutkan ke tahap pengembangan fitur CRUD dan autentikasi pada minggu berikutnya.
