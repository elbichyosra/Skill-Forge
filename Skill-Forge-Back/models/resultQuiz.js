const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizResultSchema = new Schema({
userId: {  type: String, required: true }, 
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  score: { type: Number, required: true },
//   answers: [{ questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' }, answer: String }],
  
}, { timestamps: true });

module.exports = mongoose.model('QuizResult', quizResultSchema);
