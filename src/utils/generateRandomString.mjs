/**
 * Generates a random string of the given length
 * @param {number} length - Length of the random string to generate
 * @returns {string} A random alphanumeric string of the given length
 */
const generateRandomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export default generateRandomString;