const express = require('express');
const router = express.Router();
const { getBudgetByEmail } = require('../controllers/expenseController');

// Route to get budget by email
router.get('/api/budget/:email', async (req, res) => {
  const { email } = req.params; // Get the email from the URL parameter

  try {
    const budget = await getBudgetByEmail(email); // Fetch budget by email from controller
    if (budget) {
      res.json({ amount: budget.amount }); // Send the budget amount back as a response
    } else {
      res.status(404).json({ message: 'Budget not found' });
    }
  } catch (error) {
    console.error('Error fetching budget:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
