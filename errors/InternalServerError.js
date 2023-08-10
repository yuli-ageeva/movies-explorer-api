const { internalErrorMessage } = require('../constants');

class InternalServerError extends Error {
  constructor() {
    super(internalErrorMessage);
    this.statusCode = 500;
  }
}

module.exports = InternalServerError;
