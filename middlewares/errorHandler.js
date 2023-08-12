const { internalErrorMessage } = require('../constants');

function errorHandler() {
  return (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = statusCode === 500 ? internalErrorMessage : err.message;
    res.status(statusCode).json({ message });
    next();
  };
}

module.exports = errorHandler;
