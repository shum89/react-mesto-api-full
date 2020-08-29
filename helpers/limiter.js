const rateLimit = require('express-rate-limit');
/**
 * limits requests
 * @type {rateLimit}
 */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

module.exports = {
  limiter,
};
