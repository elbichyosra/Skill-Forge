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



// exports.getAllResults = async (req, res) => {
//   try {
//     // Récupérer tous les résultats de quiz
//     const results = await Result.find(); 

//     // Vérifier si des résultats existent
//     if (results.length > 0) {
//       res.status(200).json(results);
//     } else {
//       res.status(404).json({ message: 'No quiz results found.' });
//     }
//   } catch (error) {
//     console.error('Error fetching quiz results:', error);
//     res.status(500).json({ message: 'Error fetching quiz results.' });
//   }
// };

// const axios = require('axios');

// exports.getAllResults = async (req, res) => {
//     const token = req.headers.authorization;

//     try {
//         const results = await Result.find();
//         if (results.length === 0) {
//             return res.status(404).json({ message: 'No quiz results found.' });
//         }

//         const userIds = [...new Set(results.map(result => result.userId))];
//         const quizIds = [...new Set(results.map(result => result.quizId))];

//         const [usersResponse, quizzesResponse] = await Promise.all([
//             axios.get(`http://localhost:9000/admin/realms/skillForge/users`, { 
//                 headers: { Authorization: token }
//             }),
//             axios.get(`http://localhost:5000/quiz`, { 
//                 headers: { Authorization: token }
//             })
//         ]);

//         const usersMap = new Map(usersResponse.data.map(user => [user.id, user]));
//         const quizzesMap = new Map(quizzesResponse.data.map(quiz => [quiz.id, quiz]));

//         const resultsWithDetails = results.map(result => {
//             const user = usersMap.get(result.userId);
//             const quiz = quizzesMap.get(result.quizId);

//             if (!user || !quiz) {
//                 console.error('User or quiz data missing for result:', result);
//                 return null;
//             }

//             return {
//                 userName: `${user.firstName} ${user.lastName}`,
//                 userEmail: user.email,
//                 quizTitle: quiz.title,
//                 score: result.score
//             };
//         }).filter(result => result !== null);

//         res.status(200).json(resultsWithDetails);
//     } catch (error) {
//         console.error('Error fetching quiz results with details:', error);
//         res.status(500).json({ message: 'Error fetching quiz results with details' });
//     }
// };
// backend/results.js


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

