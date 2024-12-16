const mongoose = require('mongoose');
const { Schema } = mongoose;

const BudgetSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  totalAmount: {
    type: Number,
    required: true,
    min: [0, 'Budget must be a positive number.']
  },
  currentAmount: {
    type: Number,
    required: true,
    min: [0, 'Budget balance must be a positive number.']
  },
  startDate: {
    type: Date,
    required: true,
    
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

module.exports = mongoose.model('Budget', BudgetSchema);
