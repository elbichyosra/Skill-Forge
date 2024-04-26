const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mediaMaterialsSchema = new Schema({
  id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    description: { type: String },
    file: { type: String ,required:true},
    duration: { type: String },
    trainingContent: { type: Schema.Types.ObjectId, ref: "trainingContent" },
    checkedByUser: [{ userId: String, isChecked: Boolean }],
},
{
  timestamps: true,
});



module.exports =mongoose.model('mediaMaterials', mediaMaterialsSchema);;
