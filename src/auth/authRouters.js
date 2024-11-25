const express = require('express');
const router = express.Router();
const authController = require('./authController');

router.post('/users', authController.createUser);
router.post('/login', authController.login);
router.post('/auth/google', authController.googleLogin);
router.post('/forgot-password', authController.forgotPassword);

module.exports = router;