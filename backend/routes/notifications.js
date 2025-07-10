const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.get('/', notificationController.getAll);
router.get('/:id', notificationController.getById);
router.post('/', notificationController.create);
router.patch('/:id/read', notificationController.markAsRead);
router.delete('/:id', notificationController.delete);

module.exports = router; 