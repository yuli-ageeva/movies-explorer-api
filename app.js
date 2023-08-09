const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('./middlewares/rateLimit');
const corsOptions = require('./middlewares/cors');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');

const app = express();
const { PORT = 3001, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

dotenv.config();

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(cors(corsOptions));
app.use(helmet());
app.use(rateLimit);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler());

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
