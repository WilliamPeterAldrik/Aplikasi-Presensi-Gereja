const User = require("../Model/user");
const path = require("path");
const crypto = require("crypto");
const QRCode = require("qrcode");
const fs = require("fs");

const QR_SECRET = "presensi_gereja_2025";

/* ==============================
   HELPER: GENERATE QR TOKEN
================================ */
const generateQRToken = (username) => {
  return crypto
    .createHash("sha256")
    .update(username + QR_SECRET)
    .digest("hex");
};
const generateQRImage = async (username, qrToken) => {
  const qrDir = path.join(__dirname, "..", "public", "qr");

  // pastikan folder ada
  if (!fs.existsSync(qrDir)) {
    fs.mkdirSync(qrDir, { recursive: true });
  }

  const filePath = path.join(qrDir, `${username}.png`);

  await QRCode.toFile(filePath, qrToken, {
    type: "png",
    width: 300,
    margin: 2,
  });

  return `/public/qr/${username}.png`;
};

/* ==============================
   VIEW CONTROLLER
================================ */
const index = (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "pages", "admin", "lihat_users.html")
  );
};

const create = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "pages", "admin", "add_user.html"));
};

/* ==============================
   STORE USER (WEB)
================================ */
const store = (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.render("user/create", {
      error: "username and password are required",
    });
  }

  const userBaru = new User();
  const payload = {
    username: req.body.username || req.body.nama || req.body.nama_lengkap,
    password: req.body.password,
    email: req.body.email,
    nama_lengkap: req.body.nama_lengkap || req.body.nama || req.body.username,
    role: parseInt(req.body.role || req.body.id_role) || null,
  };

  console.log("store payload:", payload);

  userBaru.save(payload, (err) => {
    if (err) {
      console.error(err);
      return res.sendFile(
        path.join(__dirname, "..", "pages", "admin", "add_user.html")
      );
    }

    const username = payload.username;
    const qrToken = generateQRToken(username);

    userBaru.updateQRByUsername(username, qrToken, async (err2) => {
      if (err2) {
        console.error("QR token save error:", err2);
      } else {
        await generateQRImage(username, qrToken);
      }

      res.redirect("/users");
    });
  });
};

/* ==============================
   STORE USER (API)
================================ */
const apiStore = (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res
      .status(400)
      .json({ error: "username and password are required" });
  }

  const userBaru = new User();
  const payload = {
    username: req.body.username || req.body.nama || req.body.nama_lengkap,
    password: req.body.password,
    email: req.body.email,
    nama_lengkap: req.body.nama_lengkap || req.body.nama || req.body.username,
    role: parseInt(req.body.role || req.body.id_role) || null,
  };

  console.log("apiStore payload:", payload);

  userBaru.save(payload, (err) => {
    if (err) {
      return res.status(500).json({ error: "Gagal menyimpan user" });
    }

    const username = payload.username;
    const qrToken = generateQRToken(username);

    userBaru.updateQRByUsername(username, qrToken, async (err2) => {
      if (err2) {
        return res.status(500).json({ error: "Gagal menyimpan QR token" });
      }

      const qrImage = await generateQRImage(username, qrToken);

      res.status(201).json({
        message: "User created",
        username,
        qr_token: qrToken,
        qr_image: qrImage,
      });
    });
  });
};

/* ==============================
   EDIT & UPDATE
================================ */
const edit = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "pages", "admin", "edit_user.html"));
};

const update = (req, res) => {
  const user = new User();
  const username = req.params.username;

  const updatedData = {};
  if (req.body.username !== undefined) updatedData.username = req.body.username;
  if (req.body.password !== undefined && req.body.password.trim() !== "")
    updatedData.password = req.body.password;
  if (req.body.email !== undefined) updatedData.email = req.body.email;
  if (req.body.nama_lengkap !== undefined)
    updatedData.nama_lengkap = req.body.nama_lengkap;
  if (req.body.role !== undefined && req.body.role !== "")
    updatedData.role = parseInt(req.body.role);

  user.update(username, updatedData, (err) => {
    if (err) {
      return res.sendFile(
        path.join(__dirname, "..", "pages", "admin", "edit_user.html")
      );
    }
    res.redirect("/users");
  });
};

/* ==============================
   DELETE
================================ */
const destroy = (req, res) => {
  const user = new User();
  const username = req.params.username;

  user.delete(username, (err) => {
    if (err) return res.redirect("/users?error=Gagal menghapus user");
    res.redirect("/users");
  });
};

/* ==============================
   API SECTION
================================ */
const apiShow = (req, res) => {
  const user = new User();
  const username = req.params.username;

  user.find(username, (err, results) => {
    if (err) return res.status(500).json({ error: "Gagal mengambil user" });
    if (!results || results.length === 0)
      return res.status(404).json({ error: "User tidak ditemukan" });

    const row = results[0];
    res.json({
      username: row.username,
      email: row.email,
      nama_lengkap: row.nama_lengkap,
      role: row.id_role || row.role || null,
      qr_token: row.qr_token || null,
    });
  });
};

const apiUpdate = (req, res) => {
  const user = new User();
  const username = req.params.username;

  const updatedData = {};
  if (req.body.username !== undefined) updatedData.username = req.body.username;
  if (req.body.password && req.body.password.trim() !== "")
    updatedData.password = req.body.password;
  if (req.body.email !== undefined) updatedData.email = req.body.email;
  if (req.body.nama_lengkap !== undefined)
    updatedData.nama_lengkap = req.body.nama_lengkap;
  if (req.body.role !== undefined && req.body.role !== "")
    updatedData.role = parseInt(req.body.role);

  user.update(username, updatedData, (err) => {
    if (err) return res.status(500).json({ error: "Gagal mengupdate user" });
    res.json({ message: "User updated" });
  });
};

const apiDelete = (req, res) => {
  const user = new User();
  const username = req.params.username;

  user.delete(username, (err) => {
    if (err) return res.status(500).json({ error: "Gagal menghapus user" });
    res.json({ message: "User deleted" });
  });
};

const apiColumns = (req, res) => {
  const user = new User();
  user.db.query("SHOW COLUMNS FROM user", (err, results) => {
    if (err)
      return res.status(500).json({ error: "Gagal mengambil kolom user" });
    res.json(results);
  });
};

const apiUsers = (req, res) => {
  const user = new User();
  user.all((err, users) => {
    if (err)
      return res.status(500).json({ error: "Gagal mengambil data user" });
    res.json(users);
  });
};

module.exports = {
  index,
  create,
  store,
  apiStore,
  apiShow,
  apiUpdate,
  apiDelete,
  apiColumns,
  edit,
  update,
  destroy,
  apiUsers,
};
