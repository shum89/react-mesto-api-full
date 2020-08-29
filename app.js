const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { userRouter, cardsRouter } = require('./routes');
const { limiter } = require('./helpers/limiter');
const { errorMessage } = require('./constants/errorMessages');

const { PORT = 3000 } = process.env;

const app = express();
app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

/**
 * Temporary authorization solution
 */
app.use((req, res, next) => {
  req.user = {
    _id: '5f467b46459efc584e599f12',
  };
  next();
});

/**
 * users router
 */
app.use('/users', userRouter);

/**
 * cards router
 */
app.use('/cards', cardsRouter);

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

/**
 * Handles Resource Not Found Error
 */
app.use((req, res) => {
  res
    .status(404)
    .send({ message: errorMessage.NOT_FOUND });
});

app.listen(PORT, () => {
  console.log(`App listening on  port ${PORT}`);
});
