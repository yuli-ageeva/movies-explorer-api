const dotenv = require('dotenv');

const localEnv = 'local';
const prodEnv = 'production';

function loadJwtSecret(env) {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret && env === prodEnv) {
    throw new Error('jwtSecret is required in production');
  }
  return jwtSecret || 'strong-jwt-secret';
}

function loadConfig() {
  const env = process.env.NODE_ENV || localEnv;
  const port = process.env.PORT || 3000;
  const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/bitfilmsdb';
  const jwtSecret = loadJwtSecret(env);
  return {
    env, port, dbUrl, jwtSecret,
  };
}

dotenv.config();
const appConfig = loadConfig();

module.exports = appConfig;
