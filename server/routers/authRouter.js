const express = require('express');
const authController  = require('../controllers/authController');

const router = express.Router();

router.post('/register', authController.registerUser);

router.post('/login', authController.loginUser);

router.get('/token', authController.getToken);

router.get('/logout', authController.logout);

module.exports = {
  authRouter: router,
};
