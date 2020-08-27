/**
 * Custom error class for a bad request
 */
class BadRequestError extends Error {
  constructor(message, ...args) {
    super(args);
    this.message = message;
    this.status = 400;
  }
}
module.exports = BadRequestError;
