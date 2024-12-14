const mongoose = require('mongoose');
const { Schema } = mongoose;

const GoalSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: [0, 'Amount must be a positive number.']
  },
  description: {
    type: String,
    maxlength: [255, 'Description cannot be more than 255 characters.']
  },
  startDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value >= new Date();
      },
      message: 'Start date must be today or in the future.'
    }
  },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value > this.startDate;
      },
      message: 'End date must be after the start date.'
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('Goal', GoalSchema);
