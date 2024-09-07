// routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const { sendMessage } = require('../controllers/messageController');

router.post('/message', sendMessage);

module.exports = router;
