const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100
  },
  password: {
    type: String,
    required: true,
    maxlength: 255
  },
  gender: {
    type: String,
    required: true,
    maxlength: 25
  },
  age: {
    type: Number,
    required: true,
    min: 0,
    max: 120
  },
  dob: {
    type: Date,
    required: true
  },
  workingStatus: {
    type: String,
    required: true,
    enum: ['Student', 'Housewife', 'Working Professional'], 
    maxlength: 50
  }
});
module.exports = mongoose.model('User', UserSchema);
