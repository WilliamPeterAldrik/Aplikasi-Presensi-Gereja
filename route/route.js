const path = require("path");
const express = require("express");
const router = express.Router();

const userController = require('../Controller/UserController');

router.use(express.static('public'))


const auth = require("../Middleware/authMiddleware");
const allowRoles = require("../Middleware/roleMiddleware");

const UserController = require("../Controller/UserController");
const AbsensiController = require("../Controller/AbsensiController");
const AuthController = require("../Controller/AuthController");

router.get("/login", AuthController.loginPage);
router.post("/login", AuthController.loginProcess);
router.get("/logout", AuthController.logout);

router.get(
  "/admin/dashboard",
  auth,
  allowRoles(1),
  (req, res) => {
    res.sendFile("admin/dashboard.html", { root: "pages" });
  }
);

router.get(
  "/users",
  auth,
  allowRoles(1),
  UserController.index
);

router.get(
  "/usher/dashboard",
  auth,
  allowRoles(3),
  (req, res) => {
    res.sendFile("usher/dashboard.html", { root: "pages" });
  }
);

router.post(
  "/usher/scan",
  auth,
  allowRoles(3),
  AbsensiController.scanQR
);

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
router.get("/user/create", userController.create);
router.get('/users/create', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'pages', 'admin','add_user.html'));
});
router.post("/user/create", userController.store);
router.get("/user/edit/:username", userController.edit);
router.post("/user/update/:username", userController.update);
router.get("/user/delete/:username", userController.destroy);
// Halaman Web Role
const roleController = require('../Controller/RoleController');
router.get('/role', roleController.index);
router.get('/role/create', roleController.create);
router.post('/role/create', roleController.store);
router.get('/role/edit/:id', (req, res) => {
	res.sendFile(require('path').join(__dirname, '..', 'pages', 'edit_role.html'));
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
