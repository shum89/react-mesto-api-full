const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const UnauthorisedError = require('../errors/UnauthorisedError');
const { validateText } = require('../helpers/validators');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator: (name) => validateText(name),
      message: 'Please enter valid text',
    },
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator: (about) => validateText(about),
      message: 'Please enter valid text',
    },
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (link) => validator.isURL(link),
    },
    message: 'Please enter valid URL',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (text) => validator.isEmail(text),
    },
    message: 'Please enter valid email',
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorisedError({ message: 'Incorrect email or password' });
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorisedError({ message: 'Incorrect email or password' });
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
