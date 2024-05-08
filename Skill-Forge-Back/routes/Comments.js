// commentRoutes.js

const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { keycloak, sessionStore } = require('../config/keycloak');
// Créer un commentaire
router.post('/',keycloak.protect(), commentController.createComment);

// Lire tous les commentaires d'un contenu de formation spécifique
router.get('/getBy/:trainingContentId',keycloak.protect(), commentController.getCommentsByTrainingContentId);

// Mettre à jour un commentaire
router.put('/:commentId',keycloak.protect(), commentController.updateComment);

// Supprimer un commentaire
router.delete('/:commentId',keycloak.protect(), commentController.deleteComment);

module.exports = router;
