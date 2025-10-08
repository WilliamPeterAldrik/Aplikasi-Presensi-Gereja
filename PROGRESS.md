29 Sept - 3 Oct 2025

2372029 - William Peter Aldrik mengerjakan database jemaat yang akan dimasukan
2372012 - Rachel Apriyani mengerjakan tampilan web yang ingin dibuat



1. Latar Belakang

Presensi jemaat merupakan hal penting dalam kegiatan administrasi gereja karena dapat membantu pihak gereja dalam memantau tingkat kehadiran dan partisipasi
jemaat. Namun, sistem pencatatan presensi yang masih dilakukan secara manual sering kali menimbulkan kendala seperti kesalahan input data, duplikasi, dan kesulitan
dalam pembuatan laporan kehadiran.

Untuk mengatasi permasalahan tersebut, kelompok kami mengembangkan Sistem Presensi Gereja Berbasis Web yang berfungsi untuk mencatat kehadiran jemaat secara
digital. Sistem ini dirancang agar mudah digunakan oleh admin dan petugas gereja dalam mengelola data pengguna, kegiatan, dan absensi secara efisien dan
terintegrasi.

2. Tujuan Pengerjaan

Tujuan dari pengerjaan tugas besar ini adalah untuk:
> Merancang dan membangun database yang mampu menyimpan data pengguna, peran pengguna, kegiatan ibadah, dan absensi jemaat.
> Membuat tampilan web (frontend) yang sederhana, responsif, dan mudah diakses oleh admin serta petugas gereja.
> Mengembangkan model dan controller (backend) untuk menghubungkan data dari database dengan tampilan web menggunakan pola arsitektur Model-View-Controller (MVC).

3. Progress Pengerjaan
a. Pembuatan Database
Database dibuat menggunakan MySQL dengan empat tabel utama, yaitu tabel user, role, kegiatan, dan absensi.
> Tabel role digunakan untuk menyimpan data peran pengguna, seperti admin, petugas, dan jemaat.
> Tabel user menyimpan data akun pengguna, termasuk nama lengkap, username, password, serta relasi dengan tabel role.
> Tabel kegiatan berfungsi untuk menyimpan data jadwal ibadah atau kegiatan gereja, seperti nama kegiatan, tanggal, waktu, dan lokasi.
> Tabel absensi digunakan untuk mencatat kehadiran jemaat pada kegiatan tertentu, dengan relasi ke tabel user dan kegiatan.

b. Pembuatan Tampilan Web (Frontend) 
Tampilan web dibuat menggunakan HTML, CSS, Bootstrap, dan JavaScript agar mudah digunakan dan bersifat responsif.
Halaman yang telah dibuat meliputi:
> Halaman Login, untuk proses autentikasi pengguna.
> Dashboard, yang menampilkan ringkasan data kegiatan, jumlah pengguna, dan informasi absensi terbaru.

c. Pembuatan Model dan Controller
Pembuatan model dan controller dilakukan menggunakan bahasa pemrograman PHP dengan struktur Model-View-Controller (MVC).
Model berfungsi untuk mengatur pengelolaan data antara aplikasi dan database, sedangkan controller mengatur logika aplikasi dan alur data antara model dan tampilan.
Model yang telah dibuat meliputi:
> UserModel.php untuk mengatur data pengguna, termasuk proses CRUD (Create, Read, Update, Delete).
> RoleModel.php untuk mengelola data peran pengguna.
> KegiatanModel.php untuk mengatur data kegiatan ibadah.
> AbsensiModel.php untuk mengatur proses pencatatan dan penampilan data kehadiran.
> Controller yang telah dibuat meliputi:
> UserController.php untuk logika pengelolaan data pengguna dan peran.
> KegiatanController.php untuk proses input, edit, dan hapus data kegiatan.
> AbsensiController.php untuk mencatat dan menampilkan data absensi jemaat.

4. Hasil yang Telah Dicapai
Hingga saat ini, sistem sudah memiliki database yang terstruktur dan berfungsi dengan baik, tampilan web sudah selesai sebagian, serta model dan controller yang sudah saling terhubung. 

5. Rencana Selanjutnya
Langkah berikutnya yang akan dilakukan oleh kelompok kami adalah:
> Membuat tampilan laporan absensi.
> Menyelesaikan integrasi antara model dan controller supaya kita dapat melakukan CRUD.

6. Kesimpulan

Progress pengerjaan tugas besar Sistem Presensi Gereja Berbasis Web memasuki tahap pertama, yaitu pembuatan database, tampilan web, serta model dan controller. Hingga tahap ini, proyek berjalan dengan lancar tanpa kendala, dan sistem siap untuk dikembangkan lebih lanjut menuju tahap pengembangan.
