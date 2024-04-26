const express = require('express');
const router = express.Router();
const mediaMaterialController = require('../controllers/MediaMaterialController');
const { keycloak, sessionStore } = require('../config/keycloak');
const upload = require('../middelwares/storageMulter');

// Route pour créer un nouveau media Material
router.post('/',keycloak.protect('backoffice:admin'),upload.single('file'), mediaMaterialController.create);

// Route pour récupérer tous les media Materials
router.get('/',keycloak.protect(),mediaMaterialController.getAll);

// Route pour récupérer un media Material par son ID
router.get('/:id',keycloak.protect(),mediaMaterialController.getOne);

// Route pour récupérer un media Material par son ID
router.get('/getByTraining/:trainingContentId',keycloak.protect(),mediaMaterialController.getMediaMaterialsByTrainingContentId);

// Route pour mettre à jour un media Material
router.put('/:id',keycloak.protect('backoffice:admin'),upload.single('file'), mediaMaterialController.update);

// Route pour supprimer un media Material
router.delete('/:id',keycloak.protect('backoffice:admin'), mediaMaterialController.delete);
// Mettre à jour l'état de la case à cocher pour un utilisateur
router.put('/updateCheckboxState/:mediaId',keycloak.protect(), mediaMaterialController.updateCheckboxState);
module.exports = router;
