/**
 * Custom error class for a unauthorised error
 */
class UnauthorisedError extends Error {
  constructor(message, ...args) {
    super(args);
    this.message = message;
    this.status = 401;
  }
}
module.exports = UnauthorisedError;
