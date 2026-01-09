const mysql = require("mysql");
const dbConfig = require("../config/mysql.config");

class Kegiatan {
  constructor() {
    this.db = mysql.createConnection(dbConfig.db);
    this.db.connect((err) => {
      if (err) throw err;
      console.log("MySQL connected (Kegiatan)");
    });
  }
    all(callback) {
    const sql = `
      SELECT 
        idKegiatan,
        nama_kegiatan,
        lokasi,
        waktu,
        tanggal_mulai,
        tanggal_akhir,
        deskripsi,
        status
      FROM kegiatan
      ORDER BY tanggal_mulai DESC
    `;

    this.db.query(sql, callback);
  }

  create(data, callback) {
    const sql = `
    INSERT INTO kegiatan 
    (nama_kegiatan, lokasi, waktu, tanggal_mulai, tanggal_akhir, deskripsi, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

    this.db.query(
      sql,
      [
        data.nama_kegiatan,
        data.lokasi,
        data.waktu,
        data.tanggal_mulai,
        data.tanggal_akhir,
        data.deskripsi,
        data.status,
      ],
      callback
    );
  }
}


module.exports = Kegiatan;
