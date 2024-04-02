const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
 
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
},
{
  timestamps: true,
}
);

// Create the User model


module.exports =mongoose.model('user', userSchema);
