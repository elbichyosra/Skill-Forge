const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const questionSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    questionText: { type: String, required: true },
    // type: { type: String, required: true, enum: ['multipleChoice', 'trueFalse', 'openEnded'] },
    options: [{ type: String }], 
    answer: { type: String, required: true }, 
    quiz: {  type: Schema.Types.ObjectId, ref: "Quiz"},
  }
  ,
  {
    timestamps: true,
  });
  
  module.exports = mongoose.model('Question', questionSchema);
  