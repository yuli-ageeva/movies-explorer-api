function jwtSecret() {
  return process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'strong-jwt-secret';
}

module.exports = {
  jwtSecret,
};
