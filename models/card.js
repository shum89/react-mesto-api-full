const mongoose = require('mongoose');
const { validateUrl, validateText } = require('../helpers/validators');

const cardsSchema = new mongoose.Schema({
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
  owner: {
    type: mongoose.Schema.Types.ObjectID,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (link) => validateUrl(link),
      message: 'Please enter valid URL',
    },
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectID,
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardsSchema);
