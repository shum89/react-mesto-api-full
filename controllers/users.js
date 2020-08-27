const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
/**
 * gets users JSON
 * @param req {object} request object
 * @param res {object} response object
 */
const getAllUsers = (req, res) => {
  User.find({}).then((users) => {
    res.send({ data: users });
  }).catch((err) => res.status(500).send({ message: `Server error:${err.message}` }));
};

/**
 * get particular user with certain id
 * @param req {object} request object
 * @param res {object} response object
 */

const getUser = (req, res) => {
  User.findById(req.params._id)
    .catch((err) => {
      throw new NotFoundError({ message: `Can't find user with this id ${req.params.id}: ${err.message}` });
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof NotFoundError) {
        res.status(err.status).send({ message: err.message });
      }
      res.send(500).send({ message: `Server error: ${err.message}` });
    });
};
/**
 * create a user
 * @param req {object} request object
 * @param res {object} response object
 */
const createUser = (req, res) => {
  const { name, avatar, about } = req.body;
  User.create({ name, avatar, about })
    .catch((err) => { throw new BadRequestError({ message: `Incorrect user data: ${err.message}` }); })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof BadRequestError) {
        res.status(err.status).send({ message: err.message });
      }
      res.send(500).send({ message: `Server error: ${err.message}` });
    });
};

/**
 * update user info
 * @param req {object} request object
 * @param res {object} response object
 */
const updateUser = (req, res) => {
  const { avatar, name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar, name, about },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .catch((err) => {
      throw new BadRequestError({ message: `Incorrect user data: ${err.message}` });
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof BadRequestError) {
        res.status(err.status).send({ message: err.message });
      }
      res.send(500).send({ message: `Server error: ${err.message}` });
    });
};
/**
 * Update user avatar
 * @param req {object} request object
 * @param res {object} response object
 */
const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  ).catch((err) => {
    throw new BadRequestError({ message: `Incorrect avatar link: ${err.message}` });
  })
    .then((newAvatar) => res.send({ data: newAvatar }))
    .catch((err) => {
      if (err instanceof BadRequestError) {
        res.status(err.status).send({ message: err.message });
      }
      res.send(500).send({ message: `Server error: ${err.message}` });
    });
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUserAvatar,
  updateUser,
};
