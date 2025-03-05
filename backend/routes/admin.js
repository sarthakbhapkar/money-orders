const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');

router.post('/auth', AdminController.authAdmin);

module.exports = router;

