const TrainingContent = require('../models/trainingContent');
const axios = require('axios');
const fs = require('fs');
const handlebars = require('handlebars');
const {createNotification}=require('./notitficationController')
const SendMail= require('./SendMail');
const Quiz = require('../models/quiz');

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
        // Create a notification for the user
           const notificationMessage = `You have been assigned to the training "${trainingContent.title}"`;
           await createNotification(userId, notificationMessage);
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

// exports.updateProgress = async (req, res) => {
//     const { trainingId, userId } = req.params;
    
//     try {
//       const training = await TrainingContent.findById(trainingId).populate('mediaMaterials');
  
//       if (!training) {
//         return res.status(404).json({ message: "Training non trouvé." });
//       }
  
//       // Vérifier si la liste des matériaux est définie et non vide
//       if (!training.mediaMaterials || training.mediaMaterials.length === 0) {
//         return ;
//       }
//      // Vérifier si l'utilisateur est un participant dans la formation
//      if (!training.participants.includes(userId)) {
//         return res.status(403).json({ message: "L'utilisateur n'est pas un participant dans cette formation." });
//       }
//       // Calculer le progrès de l'utilisateur dans cet training
//       const mediaMaterialsCheckedByUser = training.mediaMaterials.filter(material => {
//         return material.checkedByUser.some(user => user.userId === userId && user.isChecked);
//       });
     
//       const progress = Math.ceil((mediaMaterialsCheckedByUser.length / training.mediaMaterials.length) * 100);
    
  
//       // Mettre à jour le progrès de l'utilisateur dans cet training
//       training.userProgress.set(userId, progress);
  
//       // Enregistrer les modifications
//       await training.save();
  
//       res.status(200).json({ message: "Progrès mis à jour avec succès." ,progress});}
//      catch (error) {
//       console.error("Erreur lors de la mise à jour du progrès :", error);
//       res.status(500).json({ message: "Erreur lors de la mise à jour du progrès." });
//     }
//   };
  // Contrôleur pour gérer la participation au formation

  
  
  
  exports.updateProgress = async (req, res) => {
    const { trainingId, userId } = req.params;
  
    try {
      const training = await TrainingContent.findById(trainingId).populate('mediaMaterials quiz');
      
      if (!training) {
        return res.status(404).json({ message: "Training non trouvé." });
      }
  
      if (!training.mediaMaterials || training.mediaMaterials.length === 0) {
        return res.status(404).json({ message: "Aucun matériel trouvé pour ce training." });
      }
  
      // Vérifier si l'utilisateur est un participant dans la formation
      if (!training.participants.includes(userId)) {
        return res.status(403).json({ message: "L'utilisateur n'est pas un participant dans cette formation." });
      }
  
      // Calculer le nombre de matériaux multimédias cochés par l'utilisateur
      const mediaMaterialsCheckedByUser = training.mediaMaterials.filter(material => {
        return material.checkedByUser.some(user => user.userId === userId && user.isChecked);
      });
  
      // Initialiser le compteur de progrès
      let completedItems = mediaMaterialsCheckedByUser.length;
      const totalItems = training.mediaMaterials.length;
  
      // Vérifier si un quiz est associé à cette formation
      let quizCompleted = false;
      if (training.quiz) {
        const quiz = await Quiz.findById(training.quiz._id);
  
        // Vérifier si l'utilisateur a complété le quiz
        quizCompleted = quiz.completedByUsers.some(user => user.userId === userId && user.isCompleted);
  
        // Si le quiz est complété, ajouter +1 aux éléments complétés
        if (quizCompleted) {
          completedItems += 1;
        }
      }
  
      // Calculer le nombre total d'éléments (matériaux multimédias + quiz)
      const totalElements = totalItems + (training.quiz ? 1 : 0);
  
      // Calculer le progrès de l'utilisateur
      const progress = Math.ceil((completedItems / totalElements) * 100);
  
      // Mettre à jour le progrès de l'utilisateur dans cet training
      training.userProgress.set(userId, progress);
  
      // Enregistrer les modifications
      await training.save();
  
      res.status(200).json({ message: "Progrès mis à jour avec succès.", progress });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du progrès :", error);
      res.status(500).json({ message: "Erreur lors de la mise à jour du progrès." });
    }
  };
  
  exports.participateInTraining = async (req, res) => {
    try {
        const { trainingId, userId } = req.params;
        // Recherche de l'entraînement par ID
        const training = await TrainingContent.findById(trainingId);

        if (!training) {
            return res.status(404).json({ message: "L'entraînement n'existe pas." });
        }

        // Vérification si l'utilisateur est déjà participant
        if (!training.participants.includes(userId)) {
           
        

        // Ajout de l'utilisateur à la liste des participants
        training.participants.push(userId);}

        // Enregistrement des modifications
        await training.save();

        res.status(200).json({ message: "Participation enregistrée avec succès." ,training});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de l'enregistrement de la participation." });
    }
};

exports.emailReminder = async (req, res) => {
    try {
        const { trainingId, userId, userName, email } = req.body;

        // Fetch the training content by its ID
        const trainingContent = await TrainingContent.findById(trainingId);
        if (!trainingContent) {
            return res.status(404).json({ message: 'Training content not found' });
        }

        // Check if the user with the specified ID is already assigned to the training content
        if (!trainingContent.assignedUsers.includes(userId)) {
            return res.status(400).json({ message: 'User Not assigned to this training content' });
        }

        // Define the data to be inserted into the template
        const templateData = {
            userName,
            trainingTitle: trainingContent.title,
            trainingDeadline: new Date(trainingContent.endDate).toLocaleString('fr-FR', { year: 'numeric', month: 'short', day: '2-digit' }),
            // Add more data fields as needed
        };

        // Send the email
        await SendMail(email, "Reminder for Assigned Training", templateData);

        // Send a success response
        return res.status(200).json({ message: 'Email sent successfully', trainingContent });
    } catch (error) {
        console.error('Error sending email', error);
        return res.status(500).json({ message: 'Error sending email' });
    }
};

// Assign quiz to training content
exports.assignQuizToTrainingContent = async (req, res) => {
    try {
        const { trainingContentId, quizId } = req.body;
        const trainingContent = await TrainingContent.findById(trainingContentId);
        if (!trainingContent) {
            return res.status(404).json({ message: "Training content not found" });
        }
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }
        trainingContent.quiz = quizId;
        await trainingContent.save();
        res.status(200).json(trainingContent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

