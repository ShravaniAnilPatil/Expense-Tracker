const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget'); 
const User = require('../models/User'); 
router.post('/create', async (req, res) => {
  const { userId, totalAmount, currentAmount, startDate, endDate } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    const existingBudget = await Budget.findOne({ user: userId });
    if (existingBudget) {
      return res.status(400).json({ error: 'User already has a budget.' });
    }
    const budget = new Budget({
      user: userId,
      totalAmount,
      currentAmount,
      startDate,
      endDate,
    });
    await budget.save();
    res.status(201).json({ message: 'Budget created successfully!', budget });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});
  
router.put('/update/:id', async (req, res) => {
  try {
    const { totalAmount, startDate, endDate } = req.body;
    const budget = await Budget.findById(req.params.id);
    if (!budget) {
      return res.status(404).json({ error: 'Budget not found.' });
    }
    if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
      return res.status(400).json({ error: 'End date must be after the start date.' });
    }

    if (totalAmount) {
      budget.totalAmount = totalAmount;
      budget.currentAmount = totalAmount; 
    }
    if (startDate) budget.startDate = startDate;
    if (endDate) budget.endDate = endDate;
    await budget.save();
    res.status(200).json({ message: 'Budget updated successfully!', budget });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

router.get('/fetch/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const budget = await Budget.findOne({ user: userId });
    if (!budget) {
      return res.status(404).json({ error: 'Budget not found for this user.' });
    }

    res.status(200).json(budget);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
