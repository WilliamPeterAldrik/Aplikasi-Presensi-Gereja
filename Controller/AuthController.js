const User = require("../Model/user");
const path = require("path");

const loginPage = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "pages", "login.html"));
};

const loginProcess = (req, res) => {
  const { username, password } = req.body;
  const user = new User();

  user.find(username, (err, results) => {
    if (err || results.length === 0) {
      return res.redirect("/login?error=user_not_found");
    }

    const data = results[0];

    // ⚠️ sementara plaintext (nanti bisa bcrypt)
    if (data.password !== password) {
      return res.redirect("/login?error=wrong_password");
    }

    // SIMPAN SESSION
    req.session.user = {
      username: data.username,
      role: data.idRole,
      nama: data.nama_lengkap,
    };

    if (data.idRole === 1) {
      return res.redirect("/dashboard_admin.html");
    }
    if (data.idRole === 2) {
      return res.redirect("/home");
    }
    if (data.idRole === 3) {
      return res.redirect("/dashboard_usher.html");
    }
  });
};

const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/home");
  });
};

module.exports = {
  loginPage,
  loginProcess,
  logout,
};
