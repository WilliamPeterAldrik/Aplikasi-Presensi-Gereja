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

// db.connect((err) => {
//     if (err) throw err
//     connection.query("SELECT * FROM member", (err, result,fields) => {
//         if (err) throw err
//         console.log(result)
//         connection.end()
//     })
// })