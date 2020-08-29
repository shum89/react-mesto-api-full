const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
/**
 * throws BadRequestError
 * @param err {object} error object
 * @param messageForBadRequest {string}
 */
const createBadRequestError = (err, messageForBadRequest) => {
  throw new BadRequestError({ message: `${messageForBadRequest}: ${err.message}` });
};
/**
 * Throws NotFoundError
 * @param err {object}
 * @param messageForNotFound {string}
 */
const createNotFoundError = (err, messageForNotFound) => {
  throw new NotFoundError({ message: `${messageForNotFound}: ${err.message}` });
};

/**
 * handles both NotFoundError and BadRequestError
 * @param err {object}
 * @param messageForNotFound {string}
 * @param messageForBadRequest {string}
 */
const errorHandler = (err, messageForNotFound, messageForBadRequest) => {
  if (err.name === 'CastError') {
    createNotFoundError(err, messageForNotFound);
  }
  createBadRequestError(err, messageForBadRequest);
};

module.exports = {
  errorHandler,
  createBadRequestError,
  createNotFoundError,
};
