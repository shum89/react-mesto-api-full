const express = require('express');
const { validateId, validateCard } = require('../middlewares/requestValidation');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards.js');

const cardsRouter = express.Router();
/**
 * get cards route
 */
cardsRouter.get('/', getCards);
/**
 * create card route
 */
cardsRouter.post('/', validateCard, createCard);
/**
 * delete card route
 */
cardsRouter.delete('/:_id', validateId, deleteCard);
/**
 * like and dislike routes
 */
cardsRouter.put('/:_id/likes', validateId, likeCard);
cardsRouter.delete('/:_id/likes', validateId, dislikeCard);

module.exports = cardsRouter;
