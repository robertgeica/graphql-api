const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decodedToken.id;
    } catch (error) {
      return next(new Error('Invalid or expired token'));
    }
  }

  next();
};

module.exports = { authMiddleware };
