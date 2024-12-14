const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");
const Budget = require("../models/Budget");
const fetchUser = require("../middleware/fetchUser");

// Add an Expense
router.post("/add", fetchUser, async (req, res) => {
  try {
    const { user,category,name} = req.body;

    // Add expense
    const newExpense = new Expense({
      category,
      name,
      amount,
      user: req.user._id,
      duration,
    });

    await newExpense.save();

    // Deduct from the user's budget
    const budget = await Budget.findOne({ user: req.user._id });
    if (!budget) {
      return res.status(404).json({ error: "No budget found for this user." });
    }

    if (budget.currentAmount < amount) {
      return res.status(400).json({ error: "Insufficient budget for this expense." });
    }

    budget.currentAmount -= amount;
    await budget.save();

    res.status(201).json({ message: "Expense added and budget updated!", expense: newExpense });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Fetch User's Expenses
router.get("/fetch", fetchUser, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;