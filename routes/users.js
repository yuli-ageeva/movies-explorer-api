const express = require('express');

const router = express.Router();
const userController = require('../controllers/users');
const {
  validateUpdateUser,
} = require('../validations/userValidator');

router.get('/me', userController.getUserProfile);
router.patch('/me', validateUpdateUser, userController.updateUserProfile);

module.exports = router;
