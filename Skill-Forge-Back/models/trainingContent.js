const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trainingContentSchema = new Schema({
  id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    description: { type: String},
    category: { type: String},
    image: { type: String ,default: 'uploads/acte.jpg' },
    status: { type: String, enum: ['available', 'unavailable'], default: 'available' },
    endDate: { type: Date },
    mediaMaterials: [{ type: Schema.Types.ObjectId, ref: "mediaMaterials" }],
    userId:{type:String,required:true},
    participants: [{ type:String}],
    assignedUsers: [{ type:String}],
    userProgress: { type: Map, of: Number, default: {} },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    quiz: { type: Schema.Types.ObjectId, ref: "Quiz" },
},
{
  timestamps: true,
}
);



module.exports = mongoose.model('trainingContent', trainingContentSchema);
