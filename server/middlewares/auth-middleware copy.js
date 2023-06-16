
const jwt = require('jsonwebtoken');
const config = require('../config/auth-config');
const User = require('../models/user-model');

function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, config.secretKey, async (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }

    try {
      const user = await User.findById(decodedToken.userId);
      if (!user) {
        return res.status(403).json({ error: 'User not found' });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error('Error retrieving user:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  });
}

function authorize(role) {
  return function (req, res, next) {
    if (!req.user.roles.includes(role)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    next();
  };
}

module.exports = {
  authenticateToken,
  authorize
};
