const User = require("../Model/user");
const path = require("path");

const loginProcess = (req, res) => {
  const { username, password } = req.body;
  const user = new User();

  user.find(username, (err, results) => {
    if (err || results.length === 0) {
      return res.redirect("/?error=user_not_found");
    }

    const data = results[0];

    if (data.password !== password) {
      return res.redirect("/?error=wrong_password");
    }

    req.session.user = {
      username: data.username,
      role: data.idRole,
      nama: data.nama_lengkap,
    };

    if (data.idRole === 1) {
      return res.redirect("/admin/dashboard");
    }
    if (data.idRole === 2) {
      return res.redirect("/home");
    }
    if (data.idRole === 3) {
      return res.redirect("/usher/dashboard");
    }

    res.redirect("/");
  });
};


const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
    }

    res.clearCookie("connect.sid"); // optional tapi disarankan
    res.redirect("/"); // ⬅️ halaman ga_ada_akun/home.html
  });
};


module.exports = {
  loginProcess,
  logout,
};
