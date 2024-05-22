const Quiz = require('../models/quiz');
const Question = require('../models/question');

// Create a new quiz
exports.createQuiz = async (req, res) => {
    try {
        const { title, description, passingScore, duration,creator} = req.body;
        const newQuiz = new Quiz({
            title,
            description,
            passingScore,
            duration,
            creator,
           
        });
        const savedQuiz = await newQuiz.save();
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
        const quiz = await Quiz.findById(req.params.id);
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
exports.deleteQuiz = async (req, res) => {
    try {
        const deletedQuiz = await Quiz.findByIdAndDelete(req.params.id);
        if (deletedQuiz) {
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
