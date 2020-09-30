const { JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const UnauthorisedError = require('../errors/UnauthorisedError');

module.exports = (req, res, next) => {
  const authToken = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(authToken, JWT_SECRET);
  } catch (err) {
    throw new UnauthorisedError({ message: 'Authorisation required' });
  }

  req.user = payload;

  next();
};
