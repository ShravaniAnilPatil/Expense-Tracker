const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Expense = require('../models/Expense');
const Budget = require('../models/Budget');

router.post("/add",  async (req, res) => {
  try {
    const { user, category, name, amount, date, description } = req.body;

    const newExpense = new Expense({
      user,
      category,
      name,
      amount,
      date,
      description,
    });

    

    const budget = await Budget.findOne({ user: user });
    if (!budget) {
      return res.status(404).json({ error: "No budget found for this user." });
    }

    if (budget.currentAmount < amount) {
      return res.status(400).json({ error: "Insufficient budget for this expense." });
    }
    console.log("no")
    await newExpense.save();
    budget.currentAmount -= amount;
    await budget.save();
    
    res.status(201).json({
      message: "Expense added and budget updated!",
      expense: newExpense,
    });
  } catch (error) {
    console.error("Error:", error.message); // Log the error message
  res.status(500).json({ error: "Internal server error" });
  }
});

router.get('/daily-expenses/:userId', async (req, res) => {
  console.log("working")
  try {
    const { userId } = req.params;

    // Find the user's budget
    const budget = await Budget.findOne({ user: userId });

    if (!budget) {
      return res.status(404).json({ error: 'Budget not found for the user.' });
    }

    const { startDate, endDate } = budget;

    // Query to calculate daily expenses within the budget period
    const dailyExpenses = await Expense.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
          date: { $gte: new Date(startDate), $lte: new Date(endDate) },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$date' },
          },
          totalAmount: { $sum: '$amount' },
        },
      },
      { $sort: { _id: 1 } }, // Sort by date
    ]);

    res.json({
      user: userId,
      budgetPeriod: { startDate, endDate },
      dailyExpenses,
    });
  } catch (error) {
    console.error('Error fetching daily expenses:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


// Route to get all expenses for a user
router.get('/all/:user', async (req, res) => {
  try {
    const { user } = req.params;

    // Fetch all expenses for the user
    const expenses = await Expense.find({ user: user });

    if (!expenses.length) {
      return res.status(404).json({ error: "No expenses found for this user." });
    }

    res.status(200).json({
      message: "Expenses fetched successfully!",
      expenses,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get('/category-percentage/:user', async (req, res) => {
  try {
    const { user } = req.params;

    // Fetch all expenses for the user
    const expenses = await Expense.find({ user: user });

    if (!expenses.length) {
      return res.status(404).json({ error: "No expenses found for this user." });
    }

    // Calculate the total amount of all expenses
    const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);

    // Group expenses by category and calculate the sum for each category
    const categorySums = expenses.reduce((acc, expense) => {
      if (!acc[expense.category]) {
        acc[expense.category] = 0;
      }
      acc[expense.category] += expense.amount;
      return acc;
    }, {});

    // Calculate the percentage for each category
    const categoryPercentages = Object.keys(categorySums).map(category => {
      const categoryAmount = categorySums[category];
      const percentage = (categoryAmount / totalAmount) * 100;
      return { category, amount: categoryAmount, percentage: percentage.toFixed(2) };
    });

    res.status(200).json({
      message: "Category percentages calculated successfully!",
      categoryPercentages,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to get expenses for a specific duration
router.get('/duration/:user', async (req, res) => {
  try {
    const { user } = req.params;
    const { startDate, endDate } = req.query;

    // Validate date range
    if (!startDate || !endDate) {
      return res.status(400).json({ error: "Please provide both startDate and endDate in query parameters." });
    }

    // Fetch expenses within the specified duration
    const expenses = await Expense.find({
      user: user,
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    });

    if (!expenses.length) {
      return res.status(404).json({ error: "No expenses found for the specified duration." });
    }

    res.status(200).json({
      message: "Expenses for the specified duration fetched successfully!",
      expenses,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Find the expense by ID and update the fields
    const updatedExpense = await Expense.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedExpense) {
      return res.status(404).json({ error: "Expense not found." });
    }

    res.status(200).json({
      message: "Expense updated successfully!",
      expense: updatedExpense,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
