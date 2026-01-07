const express = require("express");
const path = require("path");
const Myrouter = require("./route/route.js");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static("pages"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const session = require("express-session");

app.use(
  session({
    secret: "gereja-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 2 // 2 jam
    }
  })
);


// API ROUTE
app.use("/api/users", require("./route/userRoute"));
app.use('/api/roles', require('./route/roleRoute'));

// WEB ROUTE
app.use(Myrouter);


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "pages","ga_ada_akun", "home.html"));
});

// Route untuk setiap halaman
app.get("/home.html", (req, res) => {
  res.sendFile(path.join(__dirname, "pages","ga_ada_akun","home.html"));
});

app.get("/kegiatan.html", (req, res) => {
  res.sendFile(path.join(__dirname, "pages","ga_ada_akun","kegiatan.html"));
});

app.get("/aboutus_u.html", (req, res) => {
  res.sendFile(path.join(__dirname, "pages","ga_ada_akun", "aboutus_u.html"));
});

app.get("/aboutus_new.html", (req, res) => {
  res.sendFile(path.join(__dirname, "pages","ga_ada_akun", "aboutus_new.html"));
});

app.get("/akun_baru.html", (req, res) => {
  res.sendFile(path.join(__dirname, "pages","ga_ada_akun", "akun_baru.html"));
});

app.get("/absen_u.html", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "jemaat","absen_u.html"));
});

app.get("/home_admin.html", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "admin","home_admin.html"));
});

app.get("/absen_a.html", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "admin","absen_a.html"));
});

app.get("/aboutus_a.html", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "admin","aboutus_a.html"));
});

app.get("/contactus_u.html", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "","contactus_u.html"));
});

app.get("/dashboard_admin.html", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "admin","dashboard_admin.html"));
});

app.get("/lihat_users.html", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "admin","lihat_users.html"));
});

app.get("/lihat_data_diri.html", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "admin","lihat_data_diri.html"));
});

app.get("/lihat_role.html", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "admin","lihat_role.html"));
});

app.get("/lihat_kegiatan.html", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "admin","lihat_kegiatan.html"));
});

app.get("/lihat_absensi.html", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "admin","lihat_absensi.html"));
});

app.get("/add_role.html", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "admin","add_role.html"));
});

app.get("/add_user.html", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "admin","add_user.html"));
});
app.get("/edit_role.html", (req, res) => {
  res.sendFile(path.join(__dirname, "pages","admin", "edit_role.html"));
});


app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "pages","admin", "login.html"));
});

app.listen(port, () => console.log(`Running at http://localhost:${port}`));
