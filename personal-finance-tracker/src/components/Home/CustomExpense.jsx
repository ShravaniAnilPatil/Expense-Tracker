import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/checkexpense.module.css";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
export default function CheckExpense() {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState("");
  const [viewAll, setViewAll] = useState(false); // state to track whether to show all expenses

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

  const handleViewAll = () => {
    setViewAll(!viewAll); 
  };

  const displayedExpenses = viewAll ? expenses : expenses.slice(0, 4);

  return (
    <div>
      <h2 align="center">Your Custom Expenses till now!</h2>

      {error && <p className="error-message">{error}</p>}

      {displayedExpenses.length > 0 ? (
        <div>
        <div className={styles.cardContainer}>
          {displayedExpenses.map((expense) => (
            <div key={expense._id} className={styles.card}>
              <h3>{expense.name}</h3>
              <p><strong>Amount:</strong> ${expense.amount}</p>
              <p><strong>Date:</strong> {new Date(expense.date).toLocaleDateString()}</p>
              <p><strong>Description:</strong> {expense.description || "N/A"}</p>
              <button onClick={() => handleEdit(expense._id)} className={styles.editButton}>Edit</button>
            </div>
          ))}
         
        </div>
        <div className={styles.btnbody}>
        <button onClick={handleViewAll} className={styles.viewAllButton}>
            {viewAll ? "Show Less" : "View All"}
          </button>
        </div>  
        </div>
      ) : (
        <p>No expenses to show.</p>
      )}

      {/* "View All" / "Show Less" button always visible */}
      {expenses.length > 4 && (
        <div className={styles.viewAllButtonContainer}>
          <button onClick={handleViewAll} className={styles.viewAllButton}>
            {viewAll ? "Show Less" : "View All"}
          </button>
        </div>
      )}
      <hr></hr>
      
      <div className={styles.createNew}>
          <h3>Track a New Custom Expense</h3>
          <p><AddCircleOutlineRoundedIcon /></p>
      </div>
    </div>
  );
}
