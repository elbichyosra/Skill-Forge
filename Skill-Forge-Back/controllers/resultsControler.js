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


exports.getResultByUserAndQuiz = async (req, res) => {
  const { userId, quizId } = req.params;

  try {
    const result = await Result.findOne({ userId, quizId });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'No result found for this user and quiz.' });
    }
  } catch (error) {
    console.error('Error fetching result:', error);
    res.status(500).json({ message: 'Error fetching result' });
  }
};

