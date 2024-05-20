const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notitficationController');
const commentController = require('../controllers/commentController');
const { keycloak, sessionStore } = require('../config/keycloak');
// Route to fetch notifications for a specific user
router.get('/:userId', notificationController.getNotificationsByUserId);
router.post('/:userId', notificationController.sendReminders);
router.put('/:userId/markAsRead', notificationController.markNotificationsAsRead);


module.exports = router;
