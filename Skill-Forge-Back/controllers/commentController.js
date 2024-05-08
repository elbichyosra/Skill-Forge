const TrainingContent = require('../models/trainingContent');
const Comment = require('../models/comment');

// Créer un commentaire et le pousser dans le contenu de formation
exports.createComment = async (req, res) => {
  try {
    const { content,username, userId, trainingContentId } = req.body;
    const comment = new Comment({ content, username, userId, trainingContent: trainingContentId });
    await comment.save();

    // Pousser le commentaire nouvellement créé dans le contenu de formation associé
    await TrainingContent.findByIdAndUpdate(trainingContentId, { $push: { comments: comment._id } });

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lire tous les commentaires d'un contenu de formation spécifique
exports.getCommentsByTrainingContentId = async (req, res) => {
  try {
    const { trainingContentId } = req.params;
    const comments = await Comment.find({ trainingContent: trainingContentId }).populate('userId');
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mettre à jour un commentaire
exports.updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const updatedComment = await Comment.findByIdAndUpdate(commentId, { content }, { new: true });
    res.json(updatedComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Supprimer un commentaire et le retirer du contenu de formation associé
exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Retirer le commentaire de la liste des commentaires dans le contenu de formation associé
    await TrainingContent.findByIdAndUpdate(comment.trainingContent, { $pull: { comments: commentId } });

    // Supprimer le commentaire
    await Comment.findByIdAndDelete(commentId);
    res.json({ message: 'Comment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
