const Result = require('../models/resultQuiz');

exports.saveResult = async (req, res) => {
  const { userId, quizId, score } = req.body;

  try {
    const newResult = new Result({
      userId,
      quizId,
      score
    });

    await newResult.save();
    res.status(201).json(newResult);
  } catch (error) {
    console.error('Error saving result:', error);
    res.status(500).json({ message: 'Error saving result' });
  }
};
