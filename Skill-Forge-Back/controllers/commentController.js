// commentController.js

const Comment = require('../models/comment');

// Créer un commentaire
exports.createComment = async (req, res) => {
  try {
    const { content, userId, trainingContentId } = req.body;
    const comment = new Comment({ content, user: userId, trainingContent: trainingContentId });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lire tous les commentaires d'un contenu de formation spécifique
exports.getCommentsByTrainingContentId = async (req, res) => {
  try {
    const { trainingContentId } = req.params;
    const comments = await Comment.find({ trainingContent: trainingContentId }).populate();
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

// Supprimer un commentaire
exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    await Comment.findByIdAndDelete(commentId);
    res.json({ message: 'Comment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
