const Quiz = require('../models/quiz');
const Question = require('../models/question');
const TrainingContent=require('../models/trainingContent')
// Create a new quiz
// exports.createQuiz = async (req, res) => {
//     try {
//         const { title, description, passingScore, duration,creator} = req.body;
//         const newQuiz = new Quiz({
//             title,
//             description,
//             passingScore,
//             duration,
//             creator,
           
//         });
//         const savedQuiz = await newQuiz.save();
//         res.status(201).json(savedQuiz);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };
// Create a new quiz
exports.createQuiz = async (req, res) => {
    try {
        const { title, description, passingScore, duration, trainingContent, creator } = req.body;
        
        // Créez le nouveau quiz
        const newQuiz = new Quiz({
            title,
            description,
            passingScore,
            duration,
            trainingContent,
            creator,
        });

        // Enregistrez le nouveau quiz dans la base de données
        const savedQuiz = await newQuiz.save();

        // Mettez à jour le champ 'quiz' dans le contenu de formation correspondant
        await TrainingContent.findByIdAndUpdate(trainingContent, { quiz: savedQuiz._id });

        res.status(201).json(savedQuiz);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Get all quizzes
exports.getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find();
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

// Update a quiz
exports.updateQuiz = async (req, res) => {
    try {
        const updatedQuiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
// exports.deleteQuiz = async (req, res) => {
//     try {
//         const deletedQuiz = await Quiz.findByIdAndDelete(req.params.id);
//         if (deletedQuiz) {
//             res.status(200).json({ message: "Quiz deleted successfully" });
//         } else {
//             res.status(404).json({ message: "Quiz not found" });
//         }
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
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


// Assign question to quiz
// exports.assignQuestionToQuiz = async (req, res) => {
//     try {
//         const { quizId, questionId } = req.body;
//         const quiz = await Quiz.findById(quizId);
//         if (!quiz) {
//             return res.status(404).json({ message: "Quiz not found" });
//         }
//         const question = await Question.findById(questionId);
//         if (!question) {
//             return res.status(404).json({ message: "Question not found" });
//         }
//         quiz.questions.push(questionId);
//         await quiz.save();
//         res.status(200).json(quiz);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
