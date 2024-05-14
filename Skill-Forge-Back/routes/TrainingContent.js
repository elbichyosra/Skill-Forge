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
// Route pour assigner un trainingContent
router.post('/assigned',keycloak.protect('backoffice:admin'),trainingContentController.assignTrainingContentToUser);
// Route pour récupérer les assigned trainingContents
router.get('/assigned/:userId',keycloak.protect(),trainingContentController.getAssignedTrainingContentForUser);
// Route pour mettre à jour le progrès d'un user dans un training
router.put('/progress/:trainingId/:userId', keycloak.protect(),trainingContentController.updateProgress);
// Route pour enregistrer la participation à l'entraînement
router.post('/participate/:trainingId/:userId', keycloak.protect(),trainingContentController.participateInTraining);
//Route pour Envoyer un email
router.post('/reminder', keycloak.protect('backoffice:admin'),trainingContentController.emailReminder);
module.exports = router;
