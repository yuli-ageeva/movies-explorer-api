const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const RequestError = require('../errors/RequestError');
const AuthError = require('../errors/AuthError');
const ConflictError = require('../errors/ConflictError');
const appConfig = require('../config');

const saltRounds = 10;

function getUserProfile(req, res, next) {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new RequestError('Передано некорректное id пользователя'));
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
        next(new ConflictError('Пользователь с таким email уже существует.'));
      } else if (err.name === 'ValidationError') {
        return next(new RequestError('При регистрации пользователя произошла ошибка.'));
      }
      return next(err);
    });
}

function updateUserProfile(req, res, next) {
  const { name, email } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, email }, { new: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new RequestError('Переданы некорректные данные при обновлении пользователя'));
      }
      return next(err);
    });
}

function login(req, res, next) {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new AuthError('Вы ввели неправильный логин или пароль.'));
      }

      return bcrypt.compare(password, user.password, (err, matched) => {
        if (err) {
          return next(new AuthError('Вы ввели неправильный логин или пароль.'));
        }

        if (!matched) {
          return next(new AuthError('Вы ввели неправильный логин или пароль.'));
        }
        const payload = { _id: user._id };
        const token = jwt.sign(payload, appConfig.jwtSecret, { expiresIn: '7d' });

        res.cookie('jwt', token, {
          httpOnly: true,
          sameSite: 'strict',
        });
        return res.status(200).send({
          _id: user._id,
          name: user.name,
          email: user.email,
        });
      });
    })
    .catch(next);
}

function logout(req, res, _next) {
  return res.status(204).clearCookie('jwt').end();
}

module.exports = {
  createUser,
  updateUserProfile,
  login,
  getUserProfile,
  logout,
};
