/*
  Usage: node scripts/ensure_idUser_autoincrement.js

  What this script does:
  - Connects to the DB using /config/mysql.config.js
  - Reads table columns for `user` and detects the `idUser` column
  - If `idUser` exists and is not AUTO_INCREMENT, runs an ALTER TABLE to set it

  IMPORTANT:
  - Back up your DB before running this script.
  - If your `idUser` column isn't an integer type, this script will change it to INT.
  - If `idUser` isn't the primary key, the script will set it to primary key while altering.
*/

const mysql = require('mysql');
const path = require('path');
const config = require('../config/mysql.config');

const dbConf = config.db || config;
const conn = mysql.createConnection(dbConf);

conn.connect(err => {
    if (err) return console.error('Connection error:', err);
    console.log('Connected to DB');
    checkAndAlter();
});

function checkAndAlter() {
    conn.query('SHOW COLUMNS FROM `user`', (err, results) => {
        if (err) {
            console.error('Error getting columns:', err.sqlMessage || err.message || err);
            return conn.end();
        }

        console.log('User table columns:');
        results.forEach(r => console.log(` - ${r.Field}: Type=${r.Type}, Null=${r.Null}, Key=${r.Key}, Default=${r.Default}, Extra=${r.Extra}`));

        const idCol = results.find(c => c.Field.toLowerCase() === 'iduser' || c.Field.toLowerCase() === 'id_user');
        if (!idCol) {
            console.warn('No idUser or id_user column found. You may need to add one manually.');
            return conn.end();
        }

        const currentlyAI = (idCol.Extra || '').toLowerCase().includes('auto_increment');
        if (currentlyAI) {
            console.log(`Column ${idCol.Field} is already AUTO_INCREMENT. No change needed.`);
            return conn.end();
        }

        // We will alter the column to be INT NOT NULL AUTO_INCREMENT PRIMARY KEY
        // But first check the type and if there are any non-numeric values in the column
        const colName = idCol.Field;
        console.log(`Preparing to convert ${colName} to INT NOT NULL AUTO_INCREMENT PRIMARY KEY`);

        // At this point, we should make sure there are no duplicates or invalid values
        conn.query(`SELECT COUNT(*) AS cnt, COUNT(DISTINCT ${colName}) AS distinct_cnt FROM \`user\``, (err2, rows) => {
            if (err2) {
                console.error('Error checking duplicates:', err2.sqlMessage || err2.message || err2);
                return conn.end();
            }
            const cnt = rows[0].cnt;
            const distinctCnt = rows[0].distinct_cnt;
            if (cnt !== distinctCnt) {
                console.error('There are duplicate id values. Please resolve duplicates before converting to AUTO_INCREMENT.');
                return conn.end();
            }

            // Check for non-numeric values
            conn.query(`SELECT ${colName} FROM \`user\` WHERE ${colName} REGEXP '[^0-9]' LIMIT 1`, (err3, badRows) => {
                if (err3) {
                    console.error('Error checking non-numeric values:', err3.sqlMessage || err3.message || err3);
                    return conn.end();
                }
                if (badRows && badRows.length > 0) {
                    console.error(`Column ${colName} contains non-numeric values. Convert them or remove those rows first.`);
                    return conn.end();
                }

                // Determine the max id for AUTO_INCREMENT starting value
                conn.query(`SELECT MAX(${colName}) AS maxId FROM \`user\``, (err4, rmax) => {
                    if (err4) {
                        console.error('Error getting max id:', err4.sqlMessage || err4.message || err4);
                        return conn.end();
                    }
                    const maxId = rmax[0].maxId || 0;
                    const nextAI = parseInt(maxId, 10) + 1;

                    // Build ALTER TABLE statement. Use CHANGE to keep name and reset type
                    // Also set it as primary key if it's not
                    const alterSql = `ALTER TABLE \`user\` MODIFY \`${colName}\` INT NOT NULL AUTO_INCREMENT PRIMARY KEY`;
                    console.log('Running:', alterSql);
                    conn.query(alterSql, (err5, res5) => {
                        if (err5) {
                            console.error('ALTER TABLE failed:', err5.sqlMessage || err5.message || err5);
                            return conn.end();
                        }
                        // Set next auto increment value just in case
                        const setAiSql = `ALTER TABLE \`user\` AUTO_INCREMENT = ${nextAI}`;
                        conn.query(setAiSql, (err6, res6) => {
                            if (err6) console.warn('Failed to set AUTO_INCREMENT start:', err6.sqlMessage || err6.message || err6);
                            else console.log('AUTO_INCREMENT set to', nextAI);
                            console.log('idUser column successfully converted to AUTO_INCREMENT');
                            conn.end();
                        });
                    });
                });
            });
        });
    });
}
