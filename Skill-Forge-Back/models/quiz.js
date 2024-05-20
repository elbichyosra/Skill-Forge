
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const quizSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    description: { type: String },
    questions: [{ type: Schema.Types.ObjectId,ref: "Question" }],
    passingScore: { type: Number, default: 70 }, // Set a default passing score
    duration: { type: Number }, // Optional duration in minutes
    trainingContent: {  type: Schema.Types.ObjectId, ref: "trainingContent"},
    creator:{type:String,required:true},
  }
  ,
  {
    timestamps: true,
  });
  
  module.exports = mongoose.model('Quiz', quizSchema);
  