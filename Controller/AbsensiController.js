const db = require("../config/mysql.config");

exports.scanQR = (req, res) => {
  const { username } = req.body;

  // 1️⃣ Cari kegiatan aktif
  const kegiatanAktif = `
    SELECT idKegiatan FROM kegiatan
    WHERE status = 1
    LIMIT 1
  `;

  db.query(kegiatanAktif, (err, kegiatan) => {
    if (err || kegiatan.length === 0) {
      return res.status(400).json({
        message: "Tidak ada kegiatan aktif"
      });
    }

    const idKegiatan = kegiatan[0].idKegiatan;

    // 2️⃣ Cek sudah absen atau belum
    const cekAbsen = `
      SELECT * FROM absen
      WHERE User_username = ?
      AND Kegiatan_idKegiatan = ?
    `;

    db.query(cekAbsen, [username, idKegiatan], (err, result) => {
      if (result.length > 0) {
        return res.json({
          message: "⚠️ Sudah absen untuk kegiatan ini"
        });
      }

      // 3️⃣ Insert absensi
      const insert = `
        INSERT INTO absen
        (User_username, Kegiatan_idKegiatan, waktu_absen, status)
        VALUES (?, ?, NOW(), 'Hadir')
      `;

      db.query(insert, [username, idKegiatan], (err) => {
        if (err) {
          return res.status(500).json({
            message: "Gagal mencatat absensi"
          });
        }

        res.json({
          message: "✅ Absensi berhasil dicatat"
        });
      });
    });
  });
};
