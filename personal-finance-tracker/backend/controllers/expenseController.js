const db = require('../config/db'); // Make sure to import the database connection here

// Controller function to fetch the budget based on email
const getBudgetByEmail = async (email) => {
  try {
    // Example DB query to get the user's budget
    const result = await db.query('SELECT amount FROM budgets WHERE email = ?', [email]);
    return result[0]; // Assuming this returns an object with the 'amount' field
  } catch (error) {
    throw new Error('Error fetching budget from database');
  }
};

module.exports = { getBudgetByEmail };
