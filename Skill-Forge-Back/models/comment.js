const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    content: { type: String, required: true },
    username:{ type: String, required: true },
    userId: {  type: String, required: true }, 
    trainingContent: {  type: Schema.Types.ObjectId, ref: "TrainingContent", required: true}, // Référence au contenu de formation auquel le commentaire est associé
  }, { timestamps: true });
  
  module.exports = mongoose.model('Comment', commentSchema);
  