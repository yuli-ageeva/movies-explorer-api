const corsWhitelist = ['http://localhost:3001', 'https://api.yuliaageeva.nomoreparties.co', 'https://api.yuliaageeva.nomoreparties.co'];
const corsOptions = {
  origin(origin, callback) {
    if (!origin || corsWhitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

module.exports = { corsOptions };
