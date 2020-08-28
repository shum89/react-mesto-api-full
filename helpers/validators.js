const regExpUrl = /https?:\/\/(www\.)?([-a-z0-9]+\.)([0-9a-z].*)/;
const regExpEmpty = /^\S/;
/**
 * validate URL
 * @param link {string} link to validate
 * @return {boolean} valid or invalid
 */
const validateUrl = (link) => regExpUrl.test(link);
/**
 * validate name or occupation(name or occupation can't consists only of whitespaces)
 * @param text {string} string to validate
 * @return {boolean} valid or invalid
 */
const validateText = (text) => regExpEmpty.test(text);

module.exports = {
  validateUrl,
  validateText,
};
