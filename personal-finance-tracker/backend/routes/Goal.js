const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');
const User = require('../models/User');
const authenticateToken = require('../middleware/authMiddleware'); 

// router.post('/create', authenticateToken, async (req, res) => {
//   try {
//     const userId = req.user._id;

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found.' });
//     }

//     const goal = new Goal({ ...req.body, user: userId });
//     await goal.save();
//     res.status(201).json(goal);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

router.post("/create", authenticateToken, async (req, res) => {
  try {
    const { name, amount, saved, description, startDate, endDate } = req.body;
    const userId = req.userId; // Get the userId from the authenticated user
    
    const newGoal = new Goal({
      name,
      amount,
      saved,
      description,
      startDate,
      endDate,
      user: userId // Automatically associate the goal with the userId
    });

    await newGoal.save();

    res.status(201).json({ message: "Goal created successfully!", goal: newGoal });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create goal" });
  }
});

router.get('/goals', authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const goals = await Goal.find({ user: userId });
    res.status(200).json(goals);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/users/:userId/goals', authenticateToken, async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const goals = await Goal.find({ user: userId });
    if (!goals.length) {
      return res.status(404).json({ message: 'No goals found for this user.' });
    }

    res.status(200).json(goals);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.patch('/goals/:id', authenticateToken, async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
      return res.status(404).json({ error: 'Goal not found.' });
    }

    if (goal.user.toString() !== req.user._id) {
      return res.status(403).json({ error: 'You do not have permission to modify this goal.' });
    }

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
router.delete('/goals/:id', authenticateToken, async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
      return res.status(404).json({ error: 'Goal not found.' });
    }

    if (goal.user.toString() !== req.user._id) {
      return res.status(403).json({ error: 'You do not have permission to delete this goal.' });
    }

    await goal.remove();
    res.status(200).json({ message: 'Goal deleted successfully.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
