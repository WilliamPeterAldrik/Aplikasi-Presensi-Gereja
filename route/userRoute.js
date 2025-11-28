const express = require("express");
const router = express.Router();
const userController = require("../Controller/UserController");

// API USERS → hanya JSON
router.get("/", userController.apiUsers);
router.post("/", userController.apiStore);
router.get("/:username", userController.apiShow);
router.put("/:username", userController.apiUpdate);
router.delete("/:username", userController.apiDelete);
router.get('/columns', userController.apiColumns); // debug route to inspect DB columns

module.exports = router;
