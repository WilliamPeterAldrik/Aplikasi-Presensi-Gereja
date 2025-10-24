const mysql = require("mysql")

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "AplikasiGereja"
})


db.connect((err) => {
    if (err) throw err
    console.log("Connected to database")
})

connection.connect((err) => {
    if (err) throw err
    connection.query("SELECT * FROM member", (err, result,fields) => {
        if (err) throw err
        console.log(result)
        connection.end()
    })
})