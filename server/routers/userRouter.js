const express = require('express')
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/me', authMiddleware, userController.getUserInfo);

module.exports = {
  userRouter: router,
}
