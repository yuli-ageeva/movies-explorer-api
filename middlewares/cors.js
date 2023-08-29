const corsOptions = {
  origin: [
    'https://api.yuliaageeva.nomoreparties.co',
    'https://yuliaageeva.nomoreparties.co',
    'http://localhost:3000',
    'http://localhost:3010',
  ],
  credentials: true,
};

module.exports = { corsOptions };
