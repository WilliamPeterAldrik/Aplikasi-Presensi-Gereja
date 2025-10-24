const path = require('path');
const express = require('express');
const router = express.Router();

const userController = require('../Controller/UserController');
const absenController = require('../Controller/AbsensiController');
const kegiatanController = require('../Controller/KegiatanController');
const roleController = require('../Controller/RoleController');

// User Routes

