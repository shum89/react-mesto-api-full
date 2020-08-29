/**
 * Error messages
 * @type {{
 * CARD_NOT_FOUND: string,
 * USER_NOT_FOUND: string,
 * SERVER_ERROR: string,
 * INCORRECT_AVATAR_DATA: string,
 * INCORRECT_CARD_DATA: string,
 * NOT_FOUND: string,
 * INCORRECT_USER_DATA: string
 * }}
 */
const errorMessage = {
  CARD_NOT_FOUND: 'No card with this id ',
  USER_NOT_FOUND: 'No user with this id',
  INCORRECT_USER_DATA: 'Incorrect user data',
  INCORRECT_AVATAR_DATA: 'Incorrect avatar data',
  INCORRECT_CARD_DATA: 'Incorrect card data',
  SERVER_ERROR: 'Server error',
  NOT_FOUND: 'Requested resource is not found',
};

module.exports = {
  errorMessage,
};
