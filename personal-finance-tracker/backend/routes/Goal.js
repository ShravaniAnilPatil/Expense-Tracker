const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');
const User = require('../models/User');
router.post('/create', async (req, res) => {
  const { userId, amount, description, startDate, endDate } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const goal = new Goal({
      user: userId,
      amount,
      description,
      startDate,
      endDate,
    });

    await goal.save();
    res.status(201).json({ message: 'Goal created successfully!', goal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});
router.put('/update/:id', async (req, res) => {
  try {
    const { amount, description, startDate, endDate } = req.body;
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({ error: 'Goal not found.' });
    }

    if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
      return res.status(400).json({ error: 'End date must be after the start date.' });
    }

    if (amount) goal.amount = amount;
    if (description) goal.description = description;
    if (startDate) goal.startDate = startDate;
    if (endDate) goal.endDate = endDate;

    await goal.save();
    res.status(200).json({ message: 'Goal updated successfully!', goal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});
router.get('/fetch/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const goals = await Goal.find({ user: userId });

    if (!goals.length) {
      return res.status(404).json({ error: 'No goals found for this user.' });
    }

    res.status(200).json(goals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
