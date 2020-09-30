const express = require('express');
const { validateLogin, validateUser } = require('../middlewares/requestValidation');
const {
  createUser, login,
} = require('../controllers/users.js');

const authRouter = express.Router();

authRouter.post('/signup', validateUser, createUser);

authRouter.post('/signin', validateLogin, login);

module.exports = authRouter;
