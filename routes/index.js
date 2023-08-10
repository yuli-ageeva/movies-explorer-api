const express = require('express');

const router = express.Router();
const NotFoundError = require('../errors/NotFoundError');
const { validateUserLogin, validateUserCreation } = require('../validations/userValidator');
const { logout, login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const { pageNotFoundErrorMessage } = require('../constants');

router.post('/signin', validateUserLogin, login);
router.post('/signout', logout);
router.post('/signup', validateUserCreation, createUser);

router.use('/users', auth, userRoutes);
router.use('/movies', auth, movieRoutes);
router.use((_req, _res) => {
  throw new NotFoundError(pageNotFoundErrorMessage);
});

module.exports = router;
