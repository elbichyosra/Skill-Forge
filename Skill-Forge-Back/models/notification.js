const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    userId: { type: String, required: true },
    message: { type: String, required: true },
    
    read: { type: Boolean, default: false },
},
{
    timestamps: true,
}
);

module.exports = mongoose.model('Notification', notificationSchema);
