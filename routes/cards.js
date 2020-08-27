const express = require('express');
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
cardsRouter.post('/', createCard);
/**
 * delete card route
 */
cardsRouter.delete('/:_id', deleteCard);
/**
 * like and dislike routes
 */
cardsRouter.put('/:_id/likes', likeCard);
cardsRouter.delete('/:_id/likes', dislikeCard);

module.exports = cardsRouter;
