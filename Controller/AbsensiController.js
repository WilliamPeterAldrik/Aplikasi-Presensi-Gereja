const User = require("../Model/user");

const scanQR = (req, res) => {
  const { qr_token, idKegiatan } = req.body;
  const user = new User();

  const sql = "SELECT username FROM user WHERE qr_token = ?";
  user.db.query(sql, [qr_token], (err, result) => {
    if (!result || result.length === 0) {
      return res.status(400).json({ error: "QR tidak valid" });
    }

    const username = result[0].username;

    const insert = `
      INSERT INTO absensi 
      (User_username, Kegiatan_idKegiatan, waktu_absen, status)
      VALUES (?, ?, NOW(), 'HADIR')
    `;

    user.db.query(insert, [username, idKegiatan], () => {
      res.json({ message: "Absensi berhasil" });
    });
  });
};

module.exports = { scanQR };
