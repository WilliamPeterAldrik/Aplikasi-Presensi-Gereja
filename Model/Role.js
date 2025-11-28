const mysql = require('mysql');
const dbConfig = require('../config/mysql.config');

class Role {
  constructor() {
    this.db = mysql.createConnection(dbConfig.db);
    this.db.connect(err => {
      if (err) throw err;
      console.log('MySQL connected (Role)');
    });
    // detect name and id column names used in the DB and cache column name choices
    this.nameColumn = 'role_name'; // default
    this.idColumn = 'id_role'; // default
    this._columnsReady = false;
    this._columnsInitError = null;
    this._pendingColsCallbacks = [];
    this.db.query('SHOW COLUMNS FROM role', (err, cols) => {
      if (err) {
        console.error('Role.show columns error:', err);
        this._columnsInitError = err;
        this._columnsReady = true; // mark ready to avoid hanging callers
        this._pendingColsCallbacks.forEach(cb => cb(err));
        this._pendingColsCallbacks = [];
        return;
      }
      const colNames = cols.map(c => c.Field.toLowerCase());
      if (colNames.includes('role_name')) this.nameColumn = 'role_name';
      else if (colNames.includes('nama_role')) this.nameColumn = 'nama_role';
      else if (colNames.includes('rolename')) this.nameColumn = 'rolename';

      if (colNames.includes('id_role')) this.idColumn = 'id_role';
      else if (colNames.includes('idrole')) this.idColumn = 'idrole';
      else if (colNames.includes('id')) this.idColumn = 'id';

      this._columnsReady = true;
      this._pendingColsCallbacks.forEach(cb => cb(null));
      this._pendingColsCallbacks = [];
      console.log('Role model columns detected: idColumn=%s nameColumn=%s', this.idColumn, this.nameColumn);
    });
  }

  all(callback) {
    this.ensureColumns(err => {
      if (err) return callback(err);
      const sql = `SELECT * FROM role`;
      this.db.query(sql, (err2, results) => {
        if (err2) return callback(err2);
        const roles = results.map(r => ({ id_role: r.id_role || r.idRole || r.idrole || r.id, role_name: r.role_name || r.nama_role || r.roleName || r.role }));
        callback(null, roles);
      });
    });
  }

  save(role, callback) {
    this.ensureColumns(err => {
      if (err) return callback(err);
      const name = role.nama_role || role.role_name || role.roleName;
      const col = this.nameColumn || 'role_name';
      const sql = `INSERT INTO role (${col}) VALUES (?)`;
      console.log('Role.save SQL:', sql, 'values:', [name]);
      this.db.query(sql, [name], (err2, res) => {
        if (err2) console.error('Role.save.db error:', err2);
        callback(err2, res);
      });
    });
  }

  find(id, callback) {
    this.ensureColumns(err => {
      if (err) return callback(err);
      const col = this.idColumn || 'id_role';
      const sql = `SELECT * FROM role WHERE ${col} = ?`;
      console.log('Role.find SQL:', sql, 'values:', [id]);
      this.db.query(sql, [id], (err2, res) => {
        if (err2) console.error('Role.find.db error:', err2);
        callback(err2, res);
      });
    });
  }

  update(id, data, callback) {
    this.ensureColumns(err => {
      if (err) return callback(err);
      const val = data.role_name || data.nama_role || data.roleName;
      if (val === undefined) return callback(new Error('missing role_name'));
      const nameCol = this.nameColumn || 'role_name';
      const idCol = this.idColumn || 'id_role';
      const sql = `UPDATE role SET ${nameCol} = ? WHERE ${idCol} = ?`;
      console.log('Role.update SQL:', sql, 'values:', [val, id]);
      this.db.query(sql, [val, id], (err2, res) => {
        if (err2) console.error('Role.update.db error:', err2);
        callback(err2, res);
      });
    });
  }

  delete(id, callback) {
    this.ensureColumns(err => {
      if (err) return callback(err);
      const idCol = this.idColumn || 'id_role';
      const sql = `DELETE FROM role WHERE ${idCol} = ?`;
      console.log('Role.delete SQL:', sql, 'values:', [id]);
      this.db.query(sql, [id], (err2, res) => {
        if (err2) console.error('Role.delete.db error:', err2);
        callback(err2, res);
      });
    });
  }

  ensureColumns(cb) {
    if (this._columnsReady) return cb(this._columnsInitError);
    this._pendingColsCallbacks.push(cb);
  }
}

// Export the mysql-based Role class as default
module.exports = Role;

// If project uses Sequelize, provide a factory function to build the Sequelize model
module.exports.defineSequelize = (sequelize, DataTypes) => {
  const RoleModel = sequelize.define(
    'Role',
    {
      idRole: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      nama_role: DataTypes.STRING(45),
      CREATED_AT: DataTypes.DATE,
      UPDATED_AT: DataTypes.DATE,
    },
    {
      tableName: 'role',
      timestamps: false,        // kolom CREATED_AT/UPDATED_AT diurus DB
    }
  );

  RoleModel.associate = models => {
    RoleModel.hasMany(models.User, { foreignKey: 'idRole' });
  };

  return RoleModel;
};