const mongoose = require('mongoose');
const { Schema } = mongoose;

const GoalSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    maxlength: [100, 'Goal name cannot exceed 100 characters.']
  },
  amount: {
    type: Number,
    required: true,
    min: [0, 'Amount must be a positive number.']
  },
  saved: {
    type: Number,
    default: 0,
    min: [0, 'Saved amount cannot be negative.'],
    validate: {
      validator: function (value) {
        return value <= this.amount;
      },
      message: 'Saved amount cannot exceed the goal amount.'
    }
  },
  remainingToSave: {
    type: Number,
    default: function () {
      return this.amount;
    }
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
  },
  goalAccomplished: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Middleware to update remainingToSave and goalAccomplished
GoalSchema.pre('save', function (next) {
  this.remainingToSave = this.amount - this.saved;
  this.goalAccomplished = this.saved >= this.amount;
  next();
});

module.exports = mongoose.model('Goal', GoalSchema);

