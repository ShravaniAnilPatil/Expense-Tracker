import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const [budget, setBudget] = useState(0);

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const email = localStorage.getItem('email'); // Retrieve the email from localStorage
        if (email) {
          const response = await axios.get(`/api/budget/${email}`); // Make API call using the email
          setBudget(response.data.amount); // Assuming `amount` is the budget property in the response
        } else {
          console.error('No email found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching budget:', error);
      }
    };

    fetchBudget();
  }, []);

  return (
    <BudgetContext.Provider value={{ budget, setBudget }}>
      {children}
    </BudgetContext.Provider>
  );
};
