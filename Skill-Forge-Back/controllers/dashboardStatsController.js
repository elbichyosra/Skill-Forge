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

