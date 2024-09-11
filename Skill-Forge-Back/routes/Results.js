const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultsControler')
const { keycloak, sessionStore } = require('../config/keycloak');
router.post('/', keycloak.protect(),resultController.saveResult);
router.get('/', keycloak.protect('backoffice:admin'),resultController.getAllResults);
router.get('/:userId/:quizId', resultController.getResultByUserAndQuiz);

module.exports = router;
