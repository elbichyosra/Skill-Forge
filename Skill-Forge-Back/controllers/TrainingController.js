const TrainingContent = require('../models/trainingContent');

// Créer un nouveau trainingContent
exports.createTrainingContent = async (req, res) => {
    try {
        const {  title,description,category,status,endDate,userId } = req.body;
        let imagePath;
        if (req.file) {
            // If an image is uploaded, use its path
            imagePath = req.file.path;
        } else {
            // If no image is uploaded, set imagePath to null or any default value you prefer
            imagePath = null;}
        const savedTrainingContent= await TrainingContent.create({
            title,
            description,
            category,
            image:imagePath,
            status,
            endDate,
            userId 
        });
       
        res.status(201).json(savedTrainingContent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Récupérer tous les trainingContents
exports.getAllTrainingContents = async (req, res) => {
    try {
        const trainingContents = await TrainingContent.find().populate('mediaMaterials');
        res.status(200).json(trainingContents);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Récupérer un trainingContent par son ID
exports.getTrainingContentById = async (req, res) => {
    try {
        const trainingContent = await TrainingContent.findById(req.params.id).populate('mediaMaterials');
        if (trainingContent) {
            res.status(200).json(trainingContent);
        } else {
            res.status(404).json({ message: "Training content not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Mettre à jour un trainingContent avec une image
exports.updateTrainingContent = async (req, res) => {
    try {
        let imagePath;
        if (req.file) {
            // If an image is uploaded, use its path
            imagePath = req.file.path;
        } else {
            // If no image is uploaded, fetch the existing image path from the database
            const existingTrainingContent = await TrainingContent.findById(req.params.id);
            imagePath = existingTrainingContent.image;
        }

        const updatedTrainingContent = await TrainingContent.findByIdAndUpdate(
            req.params.id,
            {
               ...req.body,
                image: imagePath
            },
            { new: true }
        );

        if (updatedTrainingContent) {
            res.status(200).json(updatedTrainingContent);
        } else {
            res.status(404).json({ message: "Training content not found" });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Supprimer un trainingContent
exports.deleteTrainingContent = async (req, res) => {
    try {
        const deletedTrainingContent = await TrainingContent.findByIdAndDelete(req.params.id);
        if (deletedTrainingContent) {
            res.status(200).json({ message: "Training content deleted successfully" });
        } else {
            res.status(404).json({ message: "Training content not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
