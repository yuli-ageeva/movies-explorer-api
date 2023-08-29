const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('./middlewares/rateLimit');
const { corsOptions } = require('./middlewares/cors');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const appConfig = require('./config');

const app = express();

mongoose.connect(appConfig.dbUrl, {
  useNewUrlParser: true,
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(helmet());
app.use(rateLimit);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler());

app.listen(appConfig.port, () => {
  console.log(`Server started on port ${appConfig.port}`);
});
