const mysql     = require('mysql');
const dbConfig  = require('../config/mysql.config');

class Kegiatan{
    constructor() {
        this.db = mysql.createConnection(dbConfig.db);
        this.db.connect(err => {
            if (err) throw err;
            console.log("MySQL connected (Kegiatan)");
        });
    }
    all (callback) {
        const query = `
      SELECT id_kegiatan, nama_kegiatan, deskripsi, tanggal, lokasi, id_penanggung_jawab, CREATED_AT, UPDATED_AT
      FROM kegiatan
    `;
        this.db.query(query, (err, results) => {
            if (err) {
                this.db.end();
                return callback(err);
            };

            const kegiatans = results.map(r => ({
                id_kegiatan         : r.id_kegiatan,
                nama_kegiatan       : r.nama_kegiatan,
                deskripsi           : r.deskripsi,
                tanggal             : r.tanggal,
                lokasi              : r.lokasi,
                id_penanggung_jawab : r.id_penanggung_jawab,
                CREATED_AT          : r.CREATED_AT,
                UPDATED_AT          : r.UPDATED_AT,
            }));
            this.db.end();                 // tutup koneksi
            callback(null, kegiatans);
        });
    }   
}

module.exports = Kegiatan;