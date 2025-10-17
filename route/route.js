const path = require('path');
const express = require('express');
const router = express.Router();

const userController = require('../controller/UserController');
const absenController = require('../controller/AbsenController');
const kegiatanController = require('../controller/KegiatanController');
const roleController = require('../controller/RoleController');
