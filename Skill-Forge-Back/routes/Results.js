const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultsControler')
const { keycloak, sessionStore } = require('../config/keycloak');
router.post('/', keycloak.protect(),resultController.saveResult);

module.exports = router;
