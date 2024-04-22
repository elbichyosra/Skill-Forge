const MediaMaterials = require('../models/mediaMaterials');
const TrainingContent = require('../models/trainingContent');


const { getVideoDurationInSeconds } = require('get-video-duration');

// Function to convert duration from seconds to formatted string
const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.round(seconds % 60);

    let formattedDuration = '';

    if (hours > 0) {
        formattedDuration += `${hours}h `;
    }

    if (minutes > 0) {
        formattedDuration += `${minutes}min `;
    }

    if (remainingSeconds > 0) {
        formattedDuration += `${remainingSeconds}sec`;
    }

    return formattedDuration.trim();
};

// Create a new Media Material
exports.create = async (req, res) => {
    try {
        const { title, description, trainingContent } = req.body;

        // Create a new Media Material object with the uploaded details
        const newMediaMaterial = await MediaMaterials.create({
            title,
            description,
            file: req.file.path,
            trainingContent
        });

        if (req.file.mimetype.startsWith('video/')) {
            // Extract video duration
            const durationInSeconds = await getVideoDurationInSeconds(req.file.path);

            // Convert duration to formatted string
            const formattedDuration = formatDuration(durationInSeconds);

            // Add formatted duration to the Media Material
            newMediaMaterial.duration = formattedDuration;

            // Save the Media Material with duration
            await newMediaMaterial.save();
        }

        // Add reference to Training Content
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
    let imagePath;
    if (req.file) {
        // If an file is uploaded, use its path
        filePath = req.file.path;
    } else {
        // If no file is uploaded, fetch the existing file path from the database
        const existingMediaMaterial = await MediaMaterials.findById(req.params.id);
        filePath = existingMediaMaterial.file;
    }

    const updatedMediaMaterial = await MediaMaterials.findByIdAndUpdate(
        req.params.id,
        {
           ...req.body,
           file: filePath
        },
        { new: true }
    );

    if (updatedMediaMaterial) {
        res.status(200).json(updatedMediaMaterial);
    } else {
        res.status(404).json({ message: "Media material not found" });
    }
} catch (err) {
    res.status(400).json({ message: err.message });
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
