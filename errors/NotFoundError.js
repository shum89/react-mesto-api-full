/**
 * custom class for a Not Found error
 */
class NotFoundError extends Error {
  constructor(message, ...args) {
    super(args);
    this.message = message;
    this.status = 404;
    this.name = this.constructor.name;
  }
}

module.exports = NotFoundError;
