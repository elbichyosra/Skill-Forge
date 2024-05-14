const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notitficationController');

// Route to fetch notifications for a specific user
router.get('/:userId', notificationController.getNotificationsByUserId);
router.post('/:userId', notificationController.sendReminders);

module.exports = router;
