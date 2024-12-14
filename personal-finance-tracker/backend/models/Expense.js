const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExpenseSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  category: {
    type: String,
    required: true,
    maxlength: 50
  },
  name: {
    type: String,
    required: true,
    maxlength: 50
  },
  amount: {
    type: Number,
    required: true,
    min: [0, 'Amount must be a positive number.'],
    validate: {
      validator: function(value) {
        return value > 0;
      },
      message: 'Amount must be a positive number.'
    }
  },
  date: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    maxlength: 255
  }
});

module.exports = mongoose.model('Expense', ExpenseSchema);
