const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const commentController = require('../controllers/commentController');
const { keycloak, sessionStore } = require('../config/keycloak');
// CRUD routes for questions
router.post('/',keycloak.protect('backoffice:admin'), questionController.createQuestion);
router.get('/',keycloak.protect('backoffice:admin'), questionController.getAllQuestions);
router.get('/:id',keycloak.protect('backoffice:admin'), questionController.getQuestionById);
router.put('/:id',keycloak.protect('backoffice:admin'), questionController.updateQuestion);
router.delete('/:id',keycloak.protect('backoffice:admin'), questionController.deleteQuestion);

module.exports = router;
