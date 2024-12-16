const db = require('../config/db'); 
const getGoalByEmail = async (email) => {
  try {
    const result = await db.query('SELECT amount FROM goals WHERE email = ?', [email]);
    return result[0]; // Assuming this returns an object with the 'amount' field
  } catch (error) {
    throw new Error('Error fetching goals from database');
  }
};

module.exports = { getGoalByEmail };
