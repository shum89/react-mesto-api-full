const { JWT_SECRET, NODE_ENV } = process.env;
const jwt = require('jsonwebtoken');
const UnauthorisedError = require('../errors/UnauthorisedError');

module.exports = (req, res, next) => {
  const authToken = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(authToken, `${NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'}`);
  } catch (err) {
    throw new UnauthorisedError({ message: 'Authorisation required' });
  }

  req.user = payload;

  next();
};
