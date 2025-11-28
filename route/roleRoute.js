const express = require('express');
const router = express.Router();
const roleController = require('../Controller/RoleController');

// API Roles
router.get('/', roleController.apiIndex);
router.post('/', roleController.apiStore);
router.get('/:id', roleController.apiShow);
router.put('/:id', roleController.apiUpdate);
router.delete('/:id', roleController.apiDelete);

module.exports = router;
