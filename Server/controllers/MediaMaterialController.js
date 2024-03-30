const MediaMaterials = require('../models/mediaMaterials');
const TrainingContent = require('../models/trainingContent');

// Create a new Media Material

exports.create = async (req, res) => {
    try {
        const { title, description, trainingContent } = req.body;
        
        // Créer un nouvel objet Media Material avec les détails téléchargés
        const newMediaMaterial = await MediaMaterials.create({
            title,
            description,
            file: req.file.path, // chemin du fichier sur Cloudinary
            trainingContent
        });

        // Ajouter la référence au Training Content
        await TrainingContent.findByIdAndUpdate(trainingContent, {
            $push: { mediaMaterials: newMediaMaterial._id }
        });

        res.status(201).json(newMediaMaterial);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




// Get all MediaMaterials
exports.getAll= async (req, res) => {
  try {
      const mediaMaterials = await MediaMaterials.find()
      res.status(200).json(mediaMaterials);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

// Récupérer un mediaMaterial par son ID
exports.getOne = async (req, res) => {
  try {
    const mediaMaterial = await MediaMaterials.findById(req.params.id);
    if (!mediaMaterial) {
      return res.status(404).json({ error: 'Media Material non trouvé' });
    }
    res.status(200).json(mediaMaterial);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération du mediaMaterial' });
  }
};
// Obtenir tous les mediaMaterials liés à un trainingContent spécifique
exports.getMediaMaterialsByTrainingContentId = async (req, res) => {
  try {
      const mediaMaterials = await MediaMaterials.find({ trainingContent: req.params.trainingContentId });
      res.status(200).json( mediaMaterials );
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
};
// Mettre à jour un mediaMaterial
exports.update = async (req, res) => {
  try {
    const mediaMaterial = await MediaMaterials.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!mediaMaterial) {
      return res.status(404).json({ error: 'Media Material non trouvé' });
    }
    res.status(200).json(mediaMaterial);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du mediaMaterial' });
  }
};

// Supprimer un mediaMaterial
exports.delete = async (req, res) => {
  try {
    const mediaMaterial = await MediaMaterials.findByIdAndDelete(req.params.id);
    if (!mediaMaterial) {
      return res.status(404).json({ error: 'Media Material non trouvé' });
    }
    res.status(200).json({ message: 'Media Material supprimé avec succès' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la suppression du mediaMaterial' });
  }
};
