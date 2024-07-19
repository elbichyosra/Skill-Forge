const Quiz = require('../models/quiz');
const Question = require('../models/question');
const TrainingContent=require('../models/trainingContent')


// Create a new quiz
exports.createQuiz = async (req, res) => {
    try {
        const { title, description, passingScore, duration, trainingContent, creator } = req.body;

        if (trainingContent) {
            // Check if the training content already has an assigned quiz
            const trainingContentDoc = await TrainingContent.findById(trainingContent);
            if (trainingContentDoc.quiz) {
                return res.status(400).json({ message: 'This training content already has an assigned quiz.' });
            }
        }

        // Create the new quiz
        const newQuiz = new Quiz({
            title,
            description,
            passingScore,
            duration,
            trainingContent,
            creator,
        });

        // Save the new quiz to the database
        const savedQuiz = await newQuiz.save();

        if (trainingContent) {
            // Update the 'quiz' field in the corresponding training content
            const trainingContentDoc = await TrainingContent.findById(trainingContent);
            trainingContentDoc.quiz = savedQuiz._id;
            await trainingContentDoc.save();
        }

        res.status(201).json(savedQuiz);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};




// Get all quizzes
exports.getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find().populate('questions').populate('trainingContent');
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get quiz by ID
exports.getQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id).populate('questions').populate('trainingContent');
        if (quiz) {
            res.status(200).json(quiz);
        } else {
            res.status(404).json({ message: "Quiz not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// // Update a quiz


exports.updateQuiz = async (req, res) => {
    try {
        const { trainingContent } = req.body;
        const quizId = req.params.id;

        // Find the current quiz to get the existing training content
        const currentQuiz = await Quiz.findById(quizId);
        if (!currentQuiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        if (trainingContent) {
            // Remove the quiz ID from the previous training content if it exists and is different
            if (currentQuiz.trainingContent && currentQuiz.trainingContent !== trainingContent) {
                await TrainingContent.findByIdAndUpdate(currentQuiz.trainingContent, { quiz: null });
            }

            // Check if the new training content is already assigned to another quiz
            const existingQuiz = await Quiz.findOne({ trainingContent });
            if (existingQuiz && existingQuiz._id.toString() !== quizId) {
                return res.status(400).json({ message: "This training content is already assigned to another quiz." });
            }

            // Update the new training content with the quiz ID
            await TrainingContent.findByIdAndUpdate(trainingContent, { quiz: quizId });
        }

        // Update the quiz with the new data
        const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, req.body, { new: true });
        if (updatedQuiz) {
            res.status(200).json(updatedQuiz);
        } else {
            res.status(404).json({ message: "Quiz not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Delete a quiz
exports.deleteQuiz = async (req, res) => {
    try {
        const deletedQuiz = await Quiz.findByIdAndDelete(req.params.id);
        if (deletedQuiz) {
            // Supprimez le champ 'quiz' dans le contenu de formation correspondant
            await TrainingContent.findOneAndUpdate({ quiz: deletedQuiz._id }, { quiz: null });
            res.status(200).json({ message: "Quiz deleted successfully" });
        } else {
            res.status(404).json({ message: "Quiz not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getQuizByTrainingContent = async (req, res) => {
    try {
        const trainingContentId = req.params.trainingContentId;
        const quiz = await Quiz.findOne({ trainingContent: trainingContentId }).populate('questions');
        
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found for this training content.' });
        }

        res.status(200).json(quiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Update quiz completion state
exports.updateQuizCompletion = async (req, res) => {
    const { userId, isCompleted } = req.body;
    const quizId = req.params.id;
  
    try {
      const quiz = await Quiz.findById(quizId);
      if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
  
      const userCompletionIndex = quiz.completedByUsers.findIndex(user => user.userId === userId);
  
      if (userCompletionIndex !== -1) {
        quiz.completedByUsers[userCompletionIndex].isCompleted = isCompleted;
      } else {
        quiz.completedByUsers.push({ userId, isCompleted });
      }
  
      await quiz.save();
      res.status(200).json({ message: 'Quiz completion state updated successfully' });
    } catch (error) {
      console.error('Error updating quiz completion state:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  