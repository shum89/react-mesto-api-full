const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');

/**
 * gets cards
 * @param req {object} request object
 * @param res {object} response object
 */
const getCards = (req, res) => Card.find({})
  .populate('user')
  .then((cards) => {
    res.send({ data: cards });
  }).catch((err) => res.status(500).send({ message: `Server error: ${err.message}` }));

/**
 * create card
 * @param req {object} request object
 * @param res {object} response object
 */
const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .catch((err) => { throw new BadRequestError({ message: `Incorrect card data ${err.message}` }); })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err instanceof BadRequestError) {
        res.status(err.status).send({ message: err.message });
      }
      res.send(500).send({ message: `Server error: ${err.message}` });
    });
};
/**
 * delete card
 * @param req {object} request object
 * @param res {object} response object
 */
const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params._id).catch((err) => {
    throw new NotFoundError({ message: `Can't find a card with this id ${req.params._id}: ${err.message}` });
  })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err instanceof NotFoundError) {
        res.status(err.status).send({ message: err.message });
      }
      res.send(500).send({ message: `Server error: ${err.message}` });
    });
};
/**
 * like card
 * @param req {object} request object
 * @param res {object} response object
 */
const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).catch((err) => {
    throw new NotFoundError({ message: `Can't find a card with this id ${req.params._id}: ${err.message}` });
  })
    .then((likes) => res.send({ data: likes }))
    .catch((err) => {
      if (err instanceof NotFoundError) {
        res.status(err.status).send({ message: err.message });
      }
      res.send(500).send({ message: `Server error: ${err.message}` });
    });
};
/**
 * dislikeCard
 * @param req {object} request object
 * @param res {object} response object
 */
const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).catch((err) => {
    throw new NotFoundError({ message: `Can't find a card with this id ${req.params._id}: ${err.message}` });
  })
    .then((likes) => res.send({ data: likes }))
    .catch((err) => {
      if (err instanceof NotFoundError) {
        res.status(err.status).send({ message: err.message });
      }
      res.send(500).send({ message: `Server error: ${err.message}` });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
