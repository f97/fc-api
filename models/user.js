const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: String,
  description: String,
  dateAdded: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

module.exports = {
  User
};
