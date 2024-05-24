const Question = require('../models/question');
const Quiz = require('../models/quiz');

// Create a new question and push it into the quiz's questions array
exports.createQuestion = async (req, res) => {
    try {
        const { questionText, options, answer, quiz } = req.body;
        const newQuestion = new Question({
            questionText,
            options,
            answer,
            quiz
          
        });
        const savedQuestion = await newQuestion.save();

        // Push the question ID into the quiz's questions array
        await Quiz.findByIdAndUpdate(quiz, { $push: { questions: savedQuestion._id } });

        res.status(201).json(savedQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all questions
exports.getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find().populate('quiz');
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get questions by quiz ID
exports.getQuestionsByQuiz = async (req, res) => {
    try {
        const { quizId } = req.params;
        const questions = await Question.find({ quiz: quizId });
        if (questions.length === 0) {
            return res.status(404).json({ message: "No questions found for this quiz" });
        }
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Get question by ID
exports.getQuestionById = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (question) {
            res.status(200).json(question);
        } else {
            res.status(404).json({ message: "Question not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a question
exports.updateQuestion = async (req, res) => {
    try {
        const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedQuestion) {
            res.status(200).json(updatedQuestion);
        } else {
            res.status(404).json({ message: "Question not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a question and pull it from the quiz's questions array
exports.deleteQuestion = async (req, res) => {
    try {
        const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
        if (deletedQuestion) {
            // Pull the question ID from the quiz's questions array
            await Quiz.findByIdAndUpdate(deletedQuestion.quiz, { $pull: { questions: deletedQuestion._id } });
            res.status(200).json({ message: "Question deleted successfully" });
        } else {
            res.status(404).json({ message: "Question not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
