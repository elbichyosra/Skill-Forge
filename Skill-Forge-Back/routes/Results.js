const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultsControler')
const { keycloak, sessionStore } = require('../config/keycloak');
router.post('/', keycloak.protect(),resultController.saveResult);
router.get('/', keycloak.protect('backoffice:admin'),resultController.getAllResults);
router.get('/:userId/:quizId', resultController.getResultByUserAndQuiz);
// router.get('/user/:userId/results', keycloak.protect('backoffice:admin'), resultController.getUserQuizResults);
router.get('/:userId', keycloak.protect('backoffice:admin'), resultController.getResultsForUser);
module.exports = router;
