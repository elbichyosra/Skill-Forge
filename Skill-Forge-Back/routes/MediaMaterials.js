const express = require('express');
const router = express.Router();
const mediaMaterialController = require('../controllers/MediaMaterialController');
const { keycloak, sessionStore } = require('../config/keycloak');
const upload = require('../middelwares/multerCloudinary');

// Route pour créer un nouveau media Material
router.post('/',upload.single('file'), mediaMaterialController.create);

// Route pour récupérer tous les media Materials
router.get('/',mediaMaterialController.getAll);

// Route pour récupérer un media Material par son ID
router.get('/:id',mediaMaterialController.getOne);

// Route pour récupérer un media Material par son ID
router.get('/getMediaMaterials/:trainingContentId',mediaMaterialController.getMediaMaterialsByTrainingContentId);

// Route pour mettre à jour un media Material
router.put('/:id', mediaMaterialController.update);

// Route pour supprimer un media Material
router.delete('/:id', mediaMaterialController.delete);

module.exports = router;
