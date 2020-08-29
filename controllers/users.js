const User = require('../models/user');
const { errorHandler, createNotFoundError, createBadRequestError } = require('../helpers/errorHandler');
const { errorMessage } = require('../constants/errorMessages');
/**
 * gets users JSON
 * @param req {object} request object
 * @param res {object} response object
 * @param next {function}
 */
const getAllUsers = (req, res, next) => {
  User.find({}).then((users) => {
    res.send({ data: users });
  }).catch(next);
};

/**
 * get particular user with certain id
 * @param req {object} request object
 * @param res {object} response object
 * @param next {function}
 */

const getUser = (req, res, next) => {
  User.findById(req.params._id)
    .orFail()
    .catch((err) => {
      createNotFoundError(err, errorMessage.USER_NOT_FOUND);
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};
/**
 * create a user
 * @param req {object} request object
 * @param res {object} response object
 * @param next {function}
 */
const createUser = (req, res, next) => {
  const { name, avatar, about } = req.body;
  User.create({ name, avatar, about })
    .catch((err) => createBadRequestError(err, errorMessage.INCORRECT_USER_DATA))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

/**
 * update user info
 * @param req {object} request object
 * @param res {object} response object
 * @param next {function}
 */
const updateUser = (req, res, next) => {
  const { avatar, name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar, name, about },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  ).orFail()
    .catch((err) => {
      errorHandler(err, errorMessage.USER_NOT_FOUND, errorMessage.INCORRECT_USER_DATA);
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};
/**
 * Update user avatar
 * @param req {object} request object
 * @param res {object} response object
 * @param next {function}
 */
const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  ).orFail()
    .catch((err) => {
      errorHandler(err, errorMessage.USER_NOT_FOUND, errorMessage.INCORRECT_AVATAR_DATA);
    })
    .then((newAvatar) => res.send({ data: newAvatar }))
    .catch(next);
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUserAvatar,
  updateUser,
};
