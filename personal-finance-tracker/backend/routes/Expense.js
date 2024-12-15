const express = require('express');
const router = express.Router();

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

    await newExpense.save();

    const budget = await Budget.findOne({ user: user });
    if (!budget) {
      return res.status(404).json({ error: "No budget found for this user." });
    }

    if (budget.currentAmount < amount) {
      return res.status(400).json({ error: "Insufficient budget for this expense." });
    }

    budget.currentAmount -= amount;
    await budget.save();

    res.status(201).json({
      message: "Expense added and budget updated!",
      expense: newExpense,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
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
