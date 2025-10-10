// Model/User.js
const mysql     = require('mysql');
const dbConfig  = require('../config/mysql.config');

class User {
  constructor() {
    this.db = mysql.createConnection(dbConfig.db);
    this.db.connect(err => {
      if (err) throw err;
      console.log("MySQL connected (User)");
    }); 
  }
  
  /**
   * Ambil semua user → callback(error, hasilArray)
   */
  all (callback) {
    const query = `
      SELECT id_user, nama, email, no_hp, id_role, CREATED_AT, UPDATED_AT
      FROM user
    `;
    this.db.query(query, (err, results) => {
      if (err) {
        this.db.end();
        return callback(err);
      }

      const users = results.map(r => ({
        id_user    : r.id_user,
        username       : r.username,
        email      : r.email,
        password   : r.password,
        nama_lengkap: r.nama_lengkap,
        id_role    : r.id_role,
        CREATED_AT : r.CREATED_AT,
        UPDATED_AT : r.UPDATED_AT,
      }));

      this.db.end();                 // tutup koneksi
      callback(null, users);
    });
  }

  /**
   * Simpan user baru → callback(error, { userId })
   * id_user BIASANYA auto-increment; jika PK manual, sertakan di objek `user`.
   */
  save (user, callback) {
    const query = `
      INSERT INTO user (nama, email, password, no_hp, id_role)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [
      user.nama,
      user.email,
      user.password,   // hash dulu sebelum simpan di produksi!
      user.no_hp,
      user.id_role,
    ];

    this.db.query(query, values, (err, results) => {
      if (err) {
        this.db.end();
        return callback(err);
      }

      this.db.end();               // tutup koneksi
      callback(null, { userId: results.insertId });
    });
  }

  find(id, callback) {
    const sql = 'SELECT * FROM user WHERE id_user = ?';
    this.db.query(sql, [id], (err, rows) => {
      if (err) return callback(err);
      callback(null, rows[0]);
    });
  }

  update(id, data, callback) {
    const sql = `UPDATE user SET nama = ?, email = ?, password = ?, no_hp = ?, id_role = ? WHERE id_user = ?`;
    const values = [data.nama, data.email, data.password, data.no_hp, data.id_role, id];
    this.db.query(sql, values, callback);
  }
  delete(id, callback) {
    const sql = 'DELETE FROM user WHERE id_user = ?';
    this.db.query(sql, [id], (err, result) => {
      if (err) return callback(err);
      callback(null);
    });
  }

}

module.exports = User;
