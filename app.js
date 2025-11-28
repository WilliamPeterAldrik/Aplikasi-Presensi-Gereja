const express = require("express");
const path = require("path");
const Myrouter = require("./route/route.js");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("pages"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API ROUTE
app.use("/api/users", require("./route/userRoute"));
app.use('/api/roles', require('./route/roleRoute'));

// WEB ROUTE
app.use(Myrouter);


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "home.html"));
});

// Route untuk setiap halaman
app.get("/home.html", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "home.html"));
});

app.get("/absen_u.html", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "absen_u.html"));
});

app.get("/aboutus_u.html", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "aboutus_u.html"));
});

app.get("/contactus_u.html", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "contactus_u.html"));
});

app.get("/dashboard_admin.html", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "dashboard_admin.html"));
});

app.get("/lihat_users.html", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "lihat_users.html"));
});

app.get("/lihat_role.html", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "lihat_role.html"));
});

app.get("/add_role.html", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "add_role.html"));
});

app.get("/edit_role.html", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "edit_role.html"));
});


app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "login.html"));
});

app.listen(port, () => console.log(`Running at http://localhost:${port}`));
