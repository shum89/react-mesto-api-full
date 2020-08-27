const mongoose = require('mongoose');
const { validateUrl, validateText } = require('../helpers/validators');

const usersSchema = new mongoose.Schema({
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
      validator: (link) => validateUrl(link),
    },
    message: 'Please enter valid URL',
  },
});

module.exports = mongoose.model('user', usersSchema);
