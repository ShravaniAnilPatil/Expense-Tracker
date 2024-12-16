const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');
const User = require('../models/User'); 

router.post('/create', async (req, res) => {
  try {
    const user = await User.findById(req.body.user);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const goal = new Goal(req.body);
    await goal.save();
    res.status(201).json(goal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.post('/usercreate', async (req, res) => {
  try {
    const { email, name, amount, saved, description, startDate, endDate } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Create the goal with the user's ID
    const goal = new Goal({
      user: user._id,
      name,
      amount,
      saved,
      description,
      startDate,
      endDate,
    });

    await goal.save();
    res.status(201).json({ message: 'Goal created successfully!', goal });
  } catch (error) {
    console.error('Error creating goal:', error.message);
    res.status(400).json({ error: error.message });
  }
});



router.get('/goals', async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const goals = await Goal.find({ user: req.user._id });
    res.status(200).json(goals);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// router.get('/email', async (req, res) => {
//   const email = req.params.email;
//   try {
//     console.log(222222);
//     const user = await User.findById({email});
//     if (!user) {
//       return res.status(404).json({ error: 'User not found.' });
//     }

//     const goals = await Goal.find({ user: req.params.email });
//     if (!goals.length) {
//       return res.status(404).json({ message: 'No goals found for this user.' });
//     }

//     res.status(200).json(goals);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });
// Backend Route
router.get('/email/:email', async (req, res) => {
  const { email } = req.params; // Extract email from the request
  try {
    console.log(`Fetching goals for email: ${email}`);

    // Validate the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Fetch goals for the given user ID
    const goals = await Goal.find({ user: user._id });
    if (!goals.length) {
      return res.status(404).json({ message: 'No goals found for this user.' });
    }

    // Return the goals
    res.status(200).json(goals);
  } catch (error) {
    console.error('Error fetching goals:', error.message);
    res.status(500).json({ error: 'Internal server error.' });
  }
});




router.patch('/goals/:id', async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
      return res.status(404).json({ error: 'Goal not found.' });
    }

    const user = await User.findById(goal.user);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
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

router.delete('/goals/:id', async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
      return res.status(404).json({ error: 'Goal not found.' });
    }

    const user = await User.findById(goal.user);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    await goal.remove();
    res.status(200).json({ message: 'Goal deleted successfully.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.put('/:id', async (req, res) => {
  try {
    const { saved, amount } = req.body;

    // Find the goal by ID and update it
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
      return res.status(404).json({ error: 'Goal not found.' });
    }

    // Update the goal values
    goal.saved = saved !== undefined ? saved : goal.saved;
    goal.amount = amount !== undefined ? amount : goal.amount;
    await goal.save();

    res.status(200).json({ message: 'Goal updated successfully!', goal });
  } catch (error) {
    console.error('Error updating goal:', error.message);
    res.status(400).json({ error: error.message });
  }
});


module.exports = router;
