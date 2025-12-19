  // Model/User.js
  const mysql = require("mysql");
  const dbConfig = require("../config/mysql.config");

  class User {
    constructor() {
      this.db = mysql.createConnection(dbConfig.db);
      this.db.connect((err) => {
        if (err) throw err;
        console.log("MySQL connected (User)");
        // Detect role column naming in `user` table (id_role, idRole, Role_idRole, etc.)
        this.roleColumn = "idRole"; // default to common column name used by the rest of project
        this.db.query("SHOW COLUMNS FROM user", (err, results) => {
          if (err) {
            console.warn(
              "Could not detect user table columns:",
              err && err.sqlMessage ? err.sqlMessage : err
            );
            return;
          }
          const cols = results.map((r) => r.Field);
          console.log("User table columns:", cols);
          const candidates = [
            "id_role",
            "idRole",
            "Role_idRole",
            "role_id",
            "idRole",
          ];
          for (const c of candidates) {
            if (cols.includes(c)) {
              this.roleColumn = c;
              break;
            }
          }
          console.log("User.role column used:", this.roleColumn || "(none)");

          // Check if username is AUTO_INCREMENT
          const idCol = results.find(
            (r) => r.Field === "username" || r.Field === "id_user"
          );
          if (idCol) {
            const extra = (idCol.Extra || "").toLowerCase();
            if (!extra.includes("auto_increment")) {
              console.warn(
                "WARNING: `user.username` is not AUTO_INCREMENT. This will cause duplicate primary key errors on insert."
              );
              console.warn(
                "If safe, run the migration script: node scripts/ensure_username_autoincrement.js to convert `username` to AUTO_INCREMENT."
              );
            }
          } else {
            console.warn(
              "WARNING: Could not find `username` column on `user` table."
            );
          }
          // also inspect role table's primary column
          this.roleTableId = "idRole";
          this.db.query("SHOW COLUMNS FROM role", (err2, colsRole) => {
            if (!err2 && colsRole && colsRole.map) {
              const rCols = colsRole.map((r) => r.Field);
              const rCandidates = ["id_role", "idRole", "idRole"];
              for (const rc of rCandidates) {
                if (rCols.includes(rc)) {
                  this.roleTableId = rc;
                  break;
                }
              }
            }
            console.log("Role table id column used:", this.roleTableId);
          });
        });
      });
    }

    // Ambil semua user
    all(callback) {
      const roleCol = this.roleColumn || "idRole";
      const roleTableId = this.roleTableId || "idRole";

      // Helper to run SELECT once we know which column to use for role name
      const runSelect = (roleNameCol) => {
        const roleSelect = roleNameCol
          ? `r.${roleNameCol} AS role`
          : `r.${roleTableId} AS role`;
        const query = `
          SELECT 
            u.username,
            u.email,
            u.nama_lengkap,
            ${roleSelect}
          FROM user u
          LEFT JOIN role r ON u.${roleCol} = r.${roleTableId}
        `;

        console.log("User.all SQL:", query.trim());
        this.db.query(query, (err, results) => {
          if (err) return callback(err);

          const users = results.map((u) => ({
            username: u.username,
            email: u.email,
            nama_lengkap: u.nama_lengkap,
            role: u.role,
          }));

          console.log("User.all got", users.length, "users");
          callback(null, users);
        });
      };

      if (this.roleNameColumn) {
        runSelect(this.roleNameColumn);
        return;
      }

      // If the roleNameColumn hasn't been detected yet, try to detect it now
      this.db.query("SHOW COLUMNS FROM role", (err, colsRole) => {
        if (!err && colsRole && colsRole.map) {
          const rCols = colsRole.map((r) => r.Field);
          const nameCandidates = ["nama_role", "role_name", "name", "role"];
          for (const nc of nameCandidates) {
            if (rCols.includes(nc)) {
              this.roleNameColumn = nc;
              break;
            }
          }
        }
        runSelect(this.roleNameColumn);
      });
    }

    // Simpan user baru
    save(user, callback) {
      // Build query robustly: include a role column only if a role value is provided
      const roleCol = this.roleColumn || "idRole";
      let query;
      const values = [
        user.username,
        user.password,
        user.email,
        user.nama_lengkap,
      ];
      if (user.role !== undefined && user.role !== null) {
        query = `INSERT INTO user (username, password, email, nama_lengkap, ${roleCol}) VALUES (?, ?, ?, ?, ?)`;
        values.push(user.role);
      } else {
        // no role provided — don't include the role column
        query = `INSERT INTO user (username, password, email, nama_lengkap) VALUES (?, ?, ?, ?)`;
      }

      console.log("User.save SQL:", query.trim());
      console.log("User.save values:", values);
      this.db.query(query, values, (err, result, fields) => {
        if (err) {
          console.error(
            "User.save error:",
            err && err.sqlMessage ? err.sqlMessage : err
          );
        }
        callback(err, result);
      });
    }

    // Cari user
    find(id, callback) {
      const sql = `SELECT * FROM user WHERE username = ?`;
      this.db.query(sql, [id], callback);
    }

    // Update user
    update(id, data, callback) {
      const roleCol2 = this.roleColumn || "idRole";
      const sets = [];
      const values_ = [];
      if (data.username !== undefined) {
        sets.push("username = ?");
        values_.push(data.username);
      }
      if (data.password !== undefined) {
        sets.push("password = ?");
        values_.push(data.password);
      }
      if (data.email !== undefined) {
        sets.push("email = ?");
        values_.push(data.email);
      }
      if (data.nama_lengkap !== undefined) {
        sets.push("nama_lengkap = ?");
        values_.push(data.nama_lengkap);
      }
      if (data.role !== undefined && data.role !== null) {
        sets.push(`${roleCol2} = ?`);
        values_.push(data.role);
      }

      if (sets.length === 0) return callback(null); // nothing to update

      const sql = `UPDATE user SET ${sets.join(", ")} WHERE username = ?`;
      values_.push(id);
      this.db.query(sql, values_, callback);
    }

    // Delete user
    delete(id, callback) {
      const sql = `DELETE FROM user WHERE username = ?`;
      this.db.query(sql, [id], callback);
    }
    // Update QR token berdasarkan username (PRIMARY KEY)
    updateQRByUsername(username, qrToken, callback) {
      const sql = `UPDATE user SET qr_token = ? WHERE username = ?`;
      const values = [qrToken, username];

      console.log("User.updateQRByUsername SQL:", sql);
      console.log("User.updateQRByUsername values:", values);

      this.db.query(sql, values, callback);
    }
  }

  module.exports = User;
