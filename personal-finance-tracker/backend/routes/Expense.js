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

module.exports = router;
