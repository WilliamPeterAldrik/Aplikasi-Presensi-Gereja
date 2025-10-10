const mysql     = require('mysql');
const dbConfig  = require('../config/mysql.config');

class Absensi{
    constructor() {
        this.db = mysql.createConnection(dbConfig.db);
        this.db.connect(err => {
            if (err) throw err;
            console.log("MySQL connected (Absensi)");
        });
    }
    all (callback) {
        const query = `
      SELECT id_absensi, id_kegiatan, id_user, status_kehadiran, CREATED_AT, UPDATED_AT
      FROM absensi
    `;
        this.db.query(query, (err, results) => {
            if (err) {
                this.db.end();
                return callback(err);
            }; 
            const absensis = results.map(r => ({
                id_absensi         : r.id_absensi,
                id_kegiatan        : r.id_kegiatan,
                id_user            : r.id_user,
                status_kehadiran   : r.status_kehadiran,
                CREATED_AT         : r.CREATED_AT,
                UPDATED_AT         : r.UPDATED_AT,
            }));
            this.db.end();                 // tutup koneksi
            callback(null, absensis);
        });
    } 
}  

module.exports = Absensi;