/*
  Usage: node scripts/convert_to_username_pk.js

  This script attempts to convert `user` table to use `username` as PRIMARY KEY and drop `idUser`.
  It performs safety checks and does NOT run dangerous changes if pre-conditions are not satisfied.

  IMPORTANT: BACKUP your DB first. This script will not attempt to update foreign keys.
*/

const mysql = require('mysql');
const config = require('../config/mysql.config');

const conn = mysql.createConnection(config.db);

conn.connect(err => {
  if (err) return console.error('Connection error:', err);
  console.log('Connected to DB');
  safeConvert();
});

async function queryAsync(sql) {
  return new Promise((resolve, reject) => {
    conn.query(sql, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

async function safeConvert() {
  try {
    // 1) Ensure username column exists and is unique and non-empty
    const cols = await queryAsync('SHOW COLUMNS FROM `user`');
    const colNames = cols.map(c => c.Field);
    if (!colNames.includes('username')) {
      throw new Error('`username` column does not exist in `user` table. Create it before running this script.');
    }

    const duplicates = await queryAsync("SELECT username, COUNT(*) as c FROM user GROUP BY username HAVING c > 1");
    if (duplicates && duplicates.length) {
      console.error('Duplicates found for username. Resolve them before conversion:');
      console.table(duplicates);
      return done();
    }

    const nullUsernames = await queryAsync("SELECT COUNT(*) AS c FROM user WHERE username IS NULL OR username = ''");
    if (nullUsernames && nullUsernames[0] && nullUsernames[0].c > 0) {
      console.error('There are rows with empty or NULL username. Fix them before conversion.');
      return done();
    }

    // 2) Check for foreign keys referencing idUser
    const fks = await queryAsync(`SELECT TABLE_NAME, COLUMN_NAME, CONSTRAINT_NAME
      FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
      WHERE REFERENCED_TABLE_SCHEMA = DATABASE()
        AND REFERENCED_TABLE_NAME = 'user'
        AND REFERENCED_COLUMN_NAME = 'idUser'`);

    if (fks && fks.length) {
      console.error('Foreign key references to `user.idUser` detected. You must convert these referencing columns to username or drop constraints before proceeding.');
      console.table(fks);
      return done();
    }

    // 3) Check if idUser exists
    const hasIdUser = colNames.includes('idUser') || colNames.includes('id_user');
    if (!hasIdUser) {
      console.log('No idUser column found; make sure the table uses username as primary key already.');
      return done();
    }

    // 4) Show current CREATE TABLE for review
    const createRes = await queryAsync('SHOW CREATE TABLE `user`');
    console.log('Current CREATE TABLE:');
    console.log(createRes[0]['Create Table']);

    console.log('\nOK to proceed? This script will:');
    console.log('- Ensure username is NOT NULL and UNIQUE');
    console.log('- Drop primary key and `idUser` column');
    console.log('- Add PRIMARY KEY(username)');

    // Prepare SQL statements (not executed automatically, we ask for confirmation)
    const sqls = [];

    // Make username NOT NULL
    sqls.push("ALTER TABLE `user` MODIFY `username` VARCHAR(255) NOT NULL");
    // Add unique index if not exists
    sqls.push("ALTER TABLE `user` ADD UNIQUE (`username`)");
    // If idUser is primary key, drop primary
    sqls.push("ALTER TABLE `user` DROP PRIMARY KEY");
    // Drop idUser column
    sqls.push("ALTER TABLE `user` DROP COLUMN `idUser`");
    // Add primary key on username
    sqls.push("ALTER TABLE `user` ADD PRIMARY KEY (`username`)");

    console.log('\nTHE FOLLOWING SQL STATEMENTS WILL BE EXECUTED (in this order):');
    sqls.forEach((s, i) => console.log(`${i + 1}) ${s}`));

    // Ask for confirmation via console prompt
    process.stdout.write('\nType YES to proceed: ');
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', async (data) => {
      const input = data.toString().trim();
      if (input === 'YES') {
        try {
          for (const s of sqls) {
            console.log('Running:', s);
            await queryAsync(s);
          }
          console.log('Conversion completed. Verify the table schema with SHOW CREATE TABLE `user`;');
        } catch (e) {
          console.error('Error executing SQL:', e.sqlMessage || e.message || e);
        } finally {
          done();
        }
      } else {
        console.log('Aborted by user. No changes made.');
        done();
      }
    });

  } catch (e) {
    console.error('Error during checks:', e.sqlMessage || e.message || e);
    done();
  }
}

function done() {
  try { conn.end(); } catch (e) {}
  process.exit(0);
}
