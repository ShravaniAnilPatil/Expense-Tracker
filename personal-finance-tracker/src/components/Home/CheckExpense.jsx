import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for making the API request

export default function CheckExpense() {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState("");

  // Fetch expenses when the component mounts
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        // Replace 'user_id' with the actual user ID or dynamically fetch it
        const response = await axios.get("http://localhost:5000/api/expense/all/${userId}");
        console.log("************")
        if (response.data.message === "Expenses fetched successfully!") {
          setExpenses(response.data.expenses); // Store fetched expenses in state
        }
      } catch (err) {
        console.error("Error fetching expenses:", err);
        setError("An error occurred while fetching expenses.");
      }
    };

    fetchExpenses();
    console.log("************")
    console.log(expenses)
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div>
      <h1>Expenses</h1>
      {error && <p className="error-message">{error}</p>}

      {expenses.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense._id}>
                <td>{expense.category}</td>
                <td>{expense.name}</td>
                <td>{expense.amount}</td>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td>{expense.description || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No expenses to show.</p>
      )}
    </div>
  );
}
