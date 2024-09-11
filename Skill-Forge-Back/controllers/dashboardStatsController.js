const TrainingContent = require('../models/trainingContent');
const Quiz = require('../models/quiz');
const MediaMaterials = require('../models/mediaMaterials');

// Endpoint to get counts for dashboard
exports.getDashboardStats = async (req, res) => {
    try {
        const [trainingContentCount, quizCount, mediaMaterialsCount] = await Promise.all([
          TrainingContent.countDocuments(),
          Quiz.countDocuments(),
          MediaMaterials.countDocuments()
        ]);
    
        res.status(200).json({
          trainingContentCount,
          quizCount,
          mediaMaterialsCount
        });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};



const calculateCompletionRate = (trainingContent) => {
    const totalUsers = trainingContent.participants.length;
    const completedUsers = Array.from(trainingContent.userProgress.values()).filter(progress => progress === 100).length;
    return totalUsers > 0 ? (completedUsers / totalUsers) * 100 : 0;
};

exports.getCompletionRate = async (req, res) => {
    try {
        const trainingContents = await TrainingContent.find().populate('mediaMaterials');

        // Calculer le taux de complétion pour chaque contenu de formation
        const trainingContentsWithCompletionRate = trainingContents.map(content => ({
            ...content.toObject(),
            completionRate: calculateCompletionRate(content),
        }));

        res.status(200).json(trainingContentsWithCompletionRate);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
