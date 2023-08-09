const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
const { jwtSecret } = require('../utils/jwtSecretProvider');

const auth = (req, res, next) => {
  const jwtToken = req.cookies.jwt;
  if (!jwtToken) {
    throw new AuthError('При авторизации произошла ошибка. Токен не передан или передан не в том формате.');
  }

  let payload;
  try {
    payload = jwt.verify(jwtToken, jwtSecret());
  } catch (err) {
    throw new AuthError('При авторизации произошла ошибка. Переданный токен некорректен.');
  }

  req.user = payload;
  next();
};

module.exports = auth;
