require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { userRouter, cardsRouter, authRouter } = require('./routes');
const { limiter } = require('./helpers/limiter');
const { errorMessage } = require('./constants/errorMessages');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./helpers/logger');

const { PORT = 3000 } = process.env;

const app = express();
app.use(helmet());
app.use(limiter);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
app.use(requestLogger);

app.use('/', authRouter);

app.use(auth);

/**
 * users router
 */
app.use('/users', userRouter);

/**
 * cards router
 */
app.use('/cards', cardsRouter);

/**
 * Handles Resource Not Found Error
 */
app.use(() => {
  throw new NotFoundError({ message: errorMessage.NOT_FOUND });
});

app.use(errorLogger);

app.use(errors());

/**
 * handles NotFound, BadRequest, Server Errors
 */
app.use((err, req, res, next) => {
  if (err.status !== '500') {
    res.status(err.status).send({ message: err.message });
    return;
  }
  res.status(500).send({ message: `${errorMessage.SERVER_ERROR}: ${err.message}` });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on  port ${PORT}`);
});
