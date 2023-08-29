const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const RequestError = require('../errors/RequestError');
const AuthError = require('../errors/AuthError');
const ConflictError = require('../errors/ConflictError');
const appConfig = require('../config');
const {
  loginErrorMessage,
  userAlreadyExistsErrorMessage,
  userNotFoundErrorMessage,
  userCreationErrorMessage,
  getUserErrorMessage,
  updateUserErrorMessage,
  saltRounds,
} = require('../constants');

function cookieOptions() {
  return {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  };
}

function getUserProfile(req, res, next) {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(userNotFoundErrorMessage);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new RequestError(getUserErrorMessage));
      }
      return next(err);
    });
}

function createUser(req, res, next) {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, saltRounds)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(userAlreadyExistsErrorMessage));
      } else if (err.name === 'ValidationError') {
        return next(new RequestError(userCreationErrorMessage));
      }
      return next(err);
    });
}

function updateUserProfile(req, res, next) {
  const { name, email } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(userNotFoundErrorMessage);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError(userAlreadyExistsErrorMessage));
      }
      if (err.name === 'ValidationError') {
        return next(new RequestError(updateUserErrorMessage));
      }
      return next(err);
    });
}

function login(req, res, next) {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new AuthError(loginErrorMessage));
      }

      return bcrypt.compare(password, user.password, (err, matched) => {
        if (err) {
          return next(new AuthError(loginErrorMessage));
        }

        if (!matched) {
          return next(new AuthError(loginErrorMessage));
        }
        const payload = { _id: user._id };
        const token = jwt.sign(payload, appConfig.jwtSecret, { expiresIn: '7d' });

        res.cookie('jwt', token, cookieOptions());
        return res.status(200).send({
          _id: user._id,
          name: user.name,
          email: user.email,
        });
      });
    })
    .catch(next);
}

function logout(req, res) {
  return res.status(204).clearCookie('jwt').end();
}

module.exports = {
  createUser,
  updateUserProfile,
  login,
  getUserProfile,
  logout,
};
