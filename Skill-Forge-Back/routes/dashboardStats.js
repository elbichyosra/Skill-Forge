const express = require('express');
const router = express.Router();
const dashboardStatsController = require('../controllers/dashboardStatsController');

const { keycloak, sessionStore } = require('../config/keycloak');


router.get('/',keycloak.protect('backoffice:admin'), dashboardStatsController.getDashboardStats);
router.get('/completionRate',keycloak.protect('backoffice:admin'), dashboardStatsController.getCompletionRate);

module.exports = router;
