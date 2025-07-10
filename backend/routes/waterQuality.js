const express = require('express');
const router = express.Router();
const waterQualityController = require('../controllers/waterQualityController');
const jwt = require('jsonwebtoken');

// JWT middleware
function protect(req, res, next) {
  let token = req.headers.authorization;
  if (token && token.startsWith('Bearer ')) {
    token = token.split(' ')[1];
  } else {
    return res.status(401).json({ error: 'Not authorized, no token' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Not authorized, token failed' });
  }
}

router.get('/', waterQualityController.getAll);
router.get('/:id', waterQualityController.getById);
router.post('/', protect, waterQualityController.create);
router.put('/:id', protect, waterQualityController.update);
router.delete('/:id', protect, waterQualityController.delete);

module.exports = router; 