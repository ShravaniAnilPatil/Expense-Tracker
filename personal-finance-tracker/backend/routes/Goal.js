const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal'); 

router.post('/goals', async (req, res) => {
  try {
    const goal = new Goal(req.body);
    await goal.save();
    res.status(201).json(goal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all goals for a user
router.get('/goals', async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user._id });
    res.status(200).json(goals);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/users/:userId/goals', async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.params.userId });
    if (!goals.length) {
      return res.status(404).json({ message: 'No goals found for this user.' });
    }
    res.status(200).json(goals);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a goal (e.g., add to saved amount)
router.patch('/goals/:id', async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ error: 'Goal not found.' });

    const { saved } = req.body;
    if (saved !== undefined) {
      goal.saved += saved;
    }

    await goal.save();
    res.status(200).json(goal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/goals/:id', async (req, res) => {
  try {
    const goal = await Goal.findByIdAndDelete(req.params.id);
    if (!goal) return res.status(404).json({ error: 'Goal not found.' });
    res.status(200).json({ message: 'Goal deleted successfully.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
