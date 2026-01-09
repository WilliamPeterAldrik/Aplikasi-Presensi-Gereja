const path = require("path");
const express = require("express");
const router = express.Router();



router.use(express.static('public'))


const auth = require("../Middleware/authMiddleware");
const allowRoles = require("../Middleware/roleMiddleware");

const UserController = require("../Controller/UserController");
const AbsensiController = require("../Controller/AbsensiController");
const AuthController = require("../Controller/AuthController");
const roleController = require("../Controller/RoleController");

// LOGIN
router.post("/login", AuthController.loginProcess);
router.get("/logout", AuthController.logout);

// ADMIN
router.get(
  "/admin/dashboard",
  auth,
  allowRoles(1),
  (req, res) => {
    res.sendFile("admin/home_admin.html", { root: "pages" });
  }
);

router.get(
  "/users",
  auth,
  allowRoles(1),
  UserController.index
);

router.get(
  "/users/create",
  auth,
  allowRoles(1),
  (req, res) => {
    res.sendFile(path.join(__dirname, "..", "pages", "admin", "add_user.html"));
  }
);

router.post(
  "/user/create",
  auth,
  allowRoles(1),
  UserController.store
);

// USHER
router.get(
  "/usher/dashboard",
  auth,
  allowRoles(3),
  (req, res) => {
    res.sendFile("usher/home_au.html", { root: "pages" });
  }
);

router.post(
  "/usher/scan",
  auth,
  allowRoles(3),
  AbsensiController.scanQR
);

// JEMAAT
router.get(
  "/home",
  auth,
  allowRoles(2),
  (req, res) => {
    res.sendFile("jemaat/home_u.html", { root: "pages" });
  }
);

router.get(
  "/about",
  auth,
  allowRoles(2),
  (req, res) => {
    res.sendFile("jemaat/aboutus_u.html", { root: "pages" });
  }
);

router.get(
  "/kegiatan",
  auth,
  allowRoles(2),
  (req, res) => {
    res.sendFile("jemaat/kegiatan_u.html", { root: "pages" });
  }
);

// ROLE
router.get("/role", auth, allowRoles(1), roleController.index);
router.get("/role/create", auth, allowRoles(1), roleController.create);
router.post("/role/create", auth, allowRoles(1), roleController.store);

// API SESSION CHECK
router.get("/api/me", (req, res) => {
  if (!req.session.user) {
    return res.json({ loggedIn: false });
  }

  res.json({
    loggedIn: true,
    username: req.session.user.username,
    nama: req.session.user.nama,
    role: req.session.user.role
  });
});

router.get("/home", auth, allowRoles(2), (req, res) => {
  res.sendFile("jemaat/home_u.html", { root: "pages" });	
});

router.get("/about", auth, allowRoles(2), (req, res) => {
  res.sendFile("jemaat/aboutus_u.html", { root: "pages" });
});

router.get("/kegiatan", auth, allowRoles(2), (req, res) => {
  res.sendFile("jemaat/kegiatan_u.html", { root: "pages" });
});


// Halaman Web User
router.get("/users", (req, res) => {

	res.sendFile(path.join(__dirname, '..', 'pages','admin','lihat_users.html'));
});
router.get("/user/create", UserController.create);
router.get('/users/create', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'pages', 'admin','add_user.html'));
});
router.post("/user/create", UserController.store);
router.get("/user/edit/:username", UserController.edit);
router.post("/user/update/:username", UserController.update);
router.get("/user/delete/:username", UserController.destroy);
// Halaman Web Role
router.get('/role', roleController.index);
router.get('/role/create', roleController.create);
router.post('/role/create', roleController.store);
router.get('/role/edit/:id', (req, res) => {
res.sendFile(require('path').join(__dirname, '..', 'pages', 'admin','edit_role.html'));
});
router.get('/role/delete/:id', (req, res) => {
	// optional: perform delete via api
	res.redirect('/role');
});
router.get("/api/me", (req, res) => {
  if (!req.session.user) {
    return res.json({ loggedIn: false });
  }

  res.json({
    loggedIn: true,
    username: req.session.user.username,
    nama: req.session.user.nama,
    role: req.session.user.role
  });
});

module.exports = router;
