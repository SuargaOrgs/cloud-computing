const jwt = require('jsonwebtoken');

const SECRET_KEY = 'S%4X&SDsd1o#jsadnid^jsdbj*dsajdb#';

const generateAccessToken = (payload) => {
  const options = {
    expiresIn: '1d',
  };

  return jwt.sign(payload, SECRET_KEY, options);
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    console.error('Invalid token:', error.message);
    return null;
  }
};

module.exports = { generateAccessToken, verifyToken };