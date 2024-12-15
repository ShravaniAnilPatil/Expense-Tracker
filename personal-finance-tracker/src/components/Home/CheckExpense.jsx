import React, { useState, useEffect } from "react";
import axios from "axios"; 
import styles from "../../styles/checkexpense.module.css"; 

export default function CheckExpense() {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState("");

  
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
       
        const response = await axios.get("http://localhost:5000/api/expense/all/675dee04bbac4d995aab0502");
        if (response.data.message === "Expenses fetched successfully!") {
          setExpenses(response.data.expenses); 
        }
      } catch (err) {
        console.error("Error fetching expenses:", err);
        setError("An error occurred while fetching expenses.");
      }
    };

    fetchExpenses();
  }, []); 

 
  const handleEdit = (expenseId) => {
    console.log(`Editing expense with ID: ${expenseId}`);
    
  };

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
              <button onClick={() => handleEdit(expense._id)} className={styles.editButton}>Edit</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No expenses to show.</p>
      )}
    </div>
  );
}
