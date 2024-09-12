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



// Define the endpoint for fetching quiz results
exports.getAllResults = async (req, res) => {
  try {
    // Fetch results with populated user, quiz details, and training content
    const results = await Result.find()
      .populate({
        path: 'quizId',
        select: 'title trainingContent',  // Include trainingContent in the populated fields
        populate: {
          path: 'trainingContent',
          select: 'title'
        }
      });

    if (results.length > 0) {
      res.status(200).json(results);
    } else {
      res.status(404).json({ message: 'No quiz results found.' });
    }
  } catch (error) {
    console.error('Error fetching quiz results:', error);
    res.status(500).json({ message: 'Error fetching quiz results.' });
  }
};



// exports.getUserQuizResults = async (req, res) => {
//     const { userId } = req.params;

//     try {
//         // Chercher les résultats de quiz pour l'utilisateur donné
//         const results = await Result.find({ userId })
//             .populate({
//                 path: 'quizId',
//                 select: 'title trainingContent',  // Inclure trainingContent dans la réponse
//                 populate: {
//                     path: 'trainingContent',  // Peuple les informations du training content
//                     select: 'title'  // Inclure le titre du training content
//                 }
//             });

//         if (results.length > 0) {
//             res.status(200).json(results);
//         } else {
//             res.status(404).json({ message: 'Aucun résultat trouvé pour cet utilisateur.' });
//         }
//     } catch (error) {
//         console.error('Error fetching user quiz results:', error);
//         res.status(500).json({ message: 'Erreur lors de la récupération des résultats de quiz.' });
//     }
// };
// Controller to get quiz results for a user
exports.getResultsForUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const results = await Result.find({ userId })
      .populate({
        path: 'quizId',
        select: 'title trainingContent',  // Include trainingContent
        populate: {
          path: 'trainingContent',  // Populate the trainingContent model
          select: 'title'  // Fetch the title of the training content
        }
      })
      .sort({ createdAt: 1 });  // Sort by date

    if (results.length === 0) {
      return res.status(404).json({ message: 'No results found for this user.' });
    }

    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching results for user:', error);
    res.status(500).json({ message: 'Error fetching results for user' });
  }
};

