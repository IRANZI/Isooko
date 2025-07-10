const express = require('express');
const router = express.Router();
const achievementController = require('../controllers/achievementController');

router.get('/', achievementController.getAll);
router.get('/:id', achievementController.getById);
router.post('/', achievementController.create);
router.put('/:id', achievementController.update);
router.delete('/:id', achievementController.delete);

module.exports = router; 