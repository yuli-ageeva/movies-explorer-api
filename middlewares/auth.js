const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
const appConfig = require('../config');

const auth = (req, res, next) => {
  const jwtToken = req.cookies.jwt;
  if (!jwtToken) {
    throw new AuthError('При авторизации произошла ошибка. Токен не передан или передан не в том формате.');
  }

  try {
    req.user = jwt.verify(jwtToken, appConfig.jwtSecret);
    next();
  } catch (err) {
    throw new AuthError('При авторизации произошла ошибка. Переданный токен некорректен.');
  }
};

module.exports = auth;
