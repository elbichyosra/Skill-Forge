const TrainingContent = require('../models/trainingContent');
const axios = require('axios');
const fs = require('fs');
const handlebars = require('handlebars');

const SendMail= require('./SendMail');
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
// // Assign training content to user
// exports.assignTrainingContentToUser = async (req, res) => {
//     try {
//         const { trainingId, userId } = req.params;
        
//         // Fetch the training content by its ID
//         const trainingContent = await TrainingContent.findById(trainingId);
//         if (!trainingContent) {
//             return res.status(404).json({ message: 'Training content not found' });
//         }
      
//         // Check if the user with the specified ID is already assigned to the training content
//         if (trainingContent.assignedUsers.includes(userId)) {
//             return res.status(400).json({ message: 'User already assigned to this training content' });
//         }
      
//         // Update the training content document to include the assigned user
//         trainingContent.assignedUsers.push(userId);
//         await trainingContent.save();

      
//         return res.status(200).json(trainingContent);
//     } catch (error) {
//         console.error('Error assigning training content:', error);
//         return res.status(500).json({ message: 'Error assigning training content' });
//     }
// };




// Controller to assign training content to user and send email
exports.assignTrainingContentToUser = async (req, res) => {
    try {
        const { trainingId, userId,userName, email } = req.body;

        // Fetch the training content by its ID
        const trainingContent = await TrainingContent.findById(trainingId);
        if (!trainingContent) {
            return res.status(404).json({ message: 'Training content not found' });
        }

        // Check if the user with the specified ID is already assigned to the training content
        if (trainingContent.assignedUsers.includes(userId)) {
            return res.status(400).json({ message: 'User already assigned to this training content' });
        }

        // Update the training content document to include the assigned user
        trainingContent.assignedUsers.push(userId);
        await trainingContent.save();

        console.log('Training content assigned successfully to user:', trainingContent);

     // Define the data to be inserted into the template
        const templateData = {
            userName,
            trainingTitle: trainingContent.title,
            trainingDeadline: new Date(trainingContent.endDate).toLocaleString('fr-FR', {  year: 'numeric', month: 'short', day: '2-digit'}),
            // Add more data fields as needed
        };

       

        // Send the email
        await SendMail(email, "New Training Assigned", templateData );
     


        // Send a success response
        return res.status(200).json({ message: 'Training content assigned successfully', trainingContent });
    } catch (error) {
        console.error('Error assigning training content:', error);
        return res.status(500).json({ message: 'Error assigning training content' });
    }
};

// Get assigned training contents by user
exports.getAssignedTrainingContentForUser = async (req, res) => {
    try {
        const { userId } = req.params;
         
        // Retrieve training content assigned to the user
        const assignedTrainingContent = await TrainingContent.find({ assignedUsers: userId });
       
        return res.status(200).json(assignedTrainingContent);
    } catch (error) {
        console.error('Error retrieving assigned training content:', error);
        return res.status(500).json({ message: 'Error retrieving assigned training content' });
    }
};
