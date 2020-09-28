const regExpEmpty = /^\S/;

/**
 * validate name or occupation(name or occupation can't consists only of whitespaces)
 * @param text {string} string to validate
 * @return {boolean} valid or invalid
 */
const validateText = (text) => regExpEmpty.test(text);

module.exports = {
  validateText,
};
