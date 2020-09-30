class DuplicateEntryError extends Error {
  constructor(message, ...args) {
    super(args);
    this.message = message;
    this.status = 409;
  }
}
module.exports = DuplicateEntryError;
