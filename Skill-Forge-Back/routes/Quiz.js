const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const commentController = require('../controllers/commentController');
const { keycloak, sessionStore } = require('../config/keycloak');
// CRUD routes for quizzes
router.post('/',keycloak.protect('backoffice:admin'), quizController.createQuiz);
router.get('/',keycloak.protect('backoffice:admin'), quizController.getAllQuizzes);
router.get('/:id',keycloak.protect('backoffice:admin'), quizController.getQuizById);
router.put('/:id',keycloak.protect('backoffice:admin'), quizController.updateQuiz);
router.delete('/:id',keycloak.protect('backoffice:admin'), quizController.deleteQuiz);
router.get('/byTrainingContent/:trainingContentId',keycloak.protect(), quizController.getQuizByTrainingContent);
router.put('/updateCompletion/:id',keycloak.protect(), quizController.updateQuizCompletion);
module.exports = router;
