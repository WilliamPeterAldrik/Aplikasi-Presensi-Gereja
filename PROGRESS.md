JURNAL PROGRES MINGGUAN

Proyek: Sistem Presensi Gereja Berbasis Web
Minggu ke-12
Tanggal: 9 – 13 Desember 2025

1. Anggota dan Pembagian Tugas
  1	Rachel Apriyani	2372012	Mengembangkan halaman registrasi pengguna, membuat form registrasi dan tampilan antarmuka, namun proses registrasi belum sepenuhnya berfungsi.
  2	William Peter Aldrik	2372029	Menyelesaikan error pada halaman Lihat Role, memperbaiki fitur tambah role dan update role agar dapat tersimpan ke database dengan benar.
   
2. Latar Belakang

Pada fase ini, sistem presensi gereja telah memiliki struktur dasar yang stabil, termasuk koneksi database dan halaman dasar seperti List Users dan Role. Minggu ini fokus diarahkan untuk memperbaiki fitur manajemen role serta mulai membangun halaman registrasi sebagai fondasi autentikasi pengguna.

3. Tujuan Pengerjaan Minggu Ini

Memperbaiki error pada halaman Lihat Role.
Mengaktifkan fitur tambah role dan memastikan data tersimpan ke database.
Mengaktifkan fitur update role dan memastikan perubahan dapat disimpan.
Mengembangkan halaman registrasi pengguna.
Menyiapkan dasar untuk proses autentikasi pengguna.

4. Progress Pengerjaan Minggu Ini

a. Penyelesaian Error pada Halaman Lihat Role (William)
Debugging untuk menemukan penyebab role tidak bisa ditambahkan.
Memperbaiki query SQL untuk proses insert role, memastikan field auto-increment dan primary key berfungsi benar.
Memperbaiki fungsi update role agar dapat menyimpan data perubahan ke database.
Melakukan uji coba penuh pada halaman Role dan memastikan tidak ada error routing, query, ataupun tampilan.

b. Pengembangan Halaman Registrasi (Rachel)
Membuat form registrasi dengan struktur dan tampilan Bootstrap.
Menambahkan route untuk menampilkan halaman registrasi.
Menghubungkan halaman ke endpoint backend (masih dalam tahap pengerjaan).
Proses penyimpanan data pengguna belum dapat dilakukan, masih menunggu implementasi backend.

5. Hasil yang Telah Dicapai

Halaman Lihat Role kini berfungsi sepenuhnya.
Fitur tambah dan update role berhasil dan data masuk ke database tanpa error.
Struktur logika backend untuk Role menjadi lebih stabil dan mudah dikembangkan.
Halaman registrasi pengguna selesai dibuat dari sisi front-end.
Proses autentikasi telah dipersiapkan dan siap dilanjutkan pada minggu berikutnya.

6. Rencana Pekerjaan Minggu Berikutnya

Menyelesaikan backend proses registrasi agar data dapat tersimpan di database.
Membangun fitur login dan autentikasi admin/petugas.

7. Kesimpulan

Pada minggu ini, tim berhasil menyelesaikan masalah di halaman Role dan memastikan fitur tambah serta update role berfungsi sempurna. Halaman registrasi juga telah dibuat dan siap diintegrasikan dengan backend. Progres ini menjadi langkah penting menuju implementasi autentikasi serta manajemen pengguna, yang akan menjadi fokus pengembangan selanjutnya.
