import mysql from "mysql"

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "mydb"
})


db.connect((err) => {
    if (err) throw err
    console.log("Connected to database")
})
app.get("/api/users", (req, res) => {
  const q = `
    SELECT u.username, u.nama_lengkap, u.email, r.namaRole
    FROM user u
    JOIN role r ON u.idRole = r.idRole
  `;

  db.query(q, (err, result) => {
    if (err) {
      console.log("SQL ERROR:", err);
      return res.status(500).json(err);
    }
    res.json(result);
  });
});

// db.connect((err) => {
//     if (err) throw err
//     connection.query("SELECT * FROM member", (err, result,fields) => {
//         if (err) throw err
//         console.log(result)
//         connection.end()
//     })
// })