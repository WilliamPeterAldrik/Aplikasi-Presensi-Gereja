import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Folder static (CSS, JS, gambar)
app.use(express.static(path.join(__dirname, "public")));


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

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "login.html"));
});

app.listen(port, () => console.log(`Running at http://localhost:${port}`));
