const Card = require('../models/card');
const { createNotFoundError, createBadRequestError } = require('../helpers/errorHandler');
const { errorMessage } = require('../constants/errorMessages');

/**
 * gets cards
 * @param req {object} request object
 * @param res {object} response object
 * @param next {function}
 */
const getCards = (req, res, next) => Card.find({})
  .populate('user')
  .then((cards) => {
    res.send({ data: cards });
  }).catch(next);

/**
 * create card
 * @param req {object} request object
 * @param res {object} response object
 * @param next {function}
 */
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .catch((err) => createBadRequestError(err, errorMessage.INCORRECT_CARD_DATA))
    .then((card) => res.send({ data: card }))
    .catch(next);
};
/**
 * delete card
 * @param req {object} request object
 * @param res {object} response object
 * @param next {function}
 */
const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params._id)
    .orFail()
    .catch((err) => {
      createNotFoundError(err, errorMessage.CARD_NOT_FOUND);
    })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

/**
 * like card
 * @param req {object} request object
 * @param res {object} response object
 * @param next {function}
 */
const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail()
    .catch((err) => {
      createNotFoundError(err, errorMessage.CARD_NOT_FOUND);
    })
    .then((likes) => res.send({ data: likes }))
    .catch(next);
};
/**
 * dislikeCard
 * @param req {object} request object
 * @param res {object} response object
 * @param next {function}
 */
const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).orFail()
    .catch((err) => {
      createNotFoundError(err, errorMessage.CARD_NOT_FOUND);
    })
    .then((likes) => res.send({ data: likes }))
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
