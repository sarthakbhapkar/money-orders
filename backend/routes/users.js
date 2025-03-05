const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { body, validationResult } = require('express-validator');


router.get('/', userController.getAllUsers);
router.get('/roles', userController.getAllRoles);
router.get('/id', userController.getUserId);
router.get('/:user_id', userController.getUserById);
router.post('/register', [
    body('name').notEmpty(),
    body('email').isEmail(),
    body('password','enter strong pass').isLength({min: 5})
], userController.insertUser);
router.post('/admin', userController.makeAdmin);

module.exports = router;