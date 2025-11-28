const path = require("path");
const express = require("express");
const router = express.Router();

const userController = require('../Controller/UserController');

router.use(express.static('public'))

// Halaman Web User
router.get("/user", userController.index);
router.get("/users", (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'pages', 'lihat_users.html'));
});
router.get("/user/create", userController.create);
router.get('/users/create', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'pages', 'add_user.html'));
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
module.exports = router;
