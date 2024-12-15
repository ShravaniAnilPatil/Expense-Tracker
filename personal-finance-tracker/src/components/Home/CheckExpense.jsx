import React, { useState, useContext, useEffect } from "react";
import styles from "../../styles/checkexpense.module.css";
import axios from "axios"; // Import axios for making the API request
import { AuthContext } from "../../context/AuthContext.js";
import { useParams } from 'react-router-dom';

export default function CheckExpense() {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState("");
const { user } = useContext(AuthContext);
const { id } = useParams();
  // Fetch expenses when the component mounts
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        // Replace 'user_id' with the actual user ID or dynamically fetch it
        const response = await axios.get(`http://localhost:5000/api/expense/all/${id}`);

        if (response.data.message === "Expenses fetched successfully!") {
          setExpenses(response.data.expenses); // Store fetched expenses in state
        }
      } catch (err) {
        console.error("Error fetching expenses:", err);
        setError("An error occurred while fetching expenses.");
      }
    };

    fetchExpenses();
   
    console.log(expenses)
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div>
      <h1>Expenses</h1>
      {error && <p className="error-message">{error}</p>}

      {expenses.length > 0 ? (
        <div className={styles.cardContainer}>
          {expenses.map((expense) => (
            <div key={expense._id} className={styles.card}>
              <h3>{expense.name}</h3>
              <p><strong>Category:</strong> {expense.category}</p>
              <p><strong>Amount:</strong> ${expense.amount}</p>
              <p><strong>Date:</strong> {new Date(expense.date).toLocaleDateString()}</p>
              <p><strong>Description:</strong> {expense.description || "N/A"}</p>
              <button  className={styles.editButton}>Edit</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No expenses to show.</p>
      )}
    </div>
  );
}
