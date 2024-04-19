const express = require('express');
const router = express.Router();
const trainingContentController = require('../controllers/TrainingController');
const { keycloak, sessionStore } = require('../config/keycloak');

const upload = require('../middelwares/storageMulter');
// Route pour créer un nouveau trainingContent
router.post('/',keycloak.protect('backoffice:admin'),upload.single('image'), trainingContentController.createTrainingContent);

// Route pour récupérer tous les trainingContents
router.get('/',keycloak.protect(),trainingContentController.getAllTrainingContents);

// Route pour récupérer un trainingContent par son ID
router.get('/:id',keycloak.protect(), trainingContentController.getTrainingContentById);

// Route pour mettre à jour un trainingContent
router.put('/:id',keycloak.protect('backoffice:admin'),upload.single('image'), trainingContentController.updateTrainingContent);

// Route pour supprimer un trainingContent
router.delete('/:id',keycloak.protect('backoffice:admin'), trainingContentController.deleteTrainingContent);

module.exports = router;
