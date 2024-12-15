import React, { useState, useContext, useEffect } from "react";
import styles from "../../styles/checkexpense.module.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext.js";
import { useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CheckExpense() {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);  // State to store the total amount
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  // Fetch expenses when the component mounts
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/expense/all/${id}`);
        
        if (response.data.message === "Expenses fetched successfully!") {
          setExpenses(response.data.expenses); // Store fetched expenses in state
          setFilteredExpenses(response.data.expenses); // Set all expenses as default
        }
      } catch (err) {
        console.error("Error fetching expenses:", err);
        setError("An error occurred while fetching expenses.");
      }
    };

    fetchExpenses();
  }, [id]);

  // Handle date selection and filter expenses
  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      // Filter expenses based on the selected date
      const formattedDate = date.toLocaleDateString(); // Format the date
      const filtered = expenses.filter(expense => 
        new Date(expense.date).toLocaleDateString() === formattedDate
      );
      setFilteredExpenses(filtered);
      
      // Calculate total amount for the filtered expenses
      const total = filtered.reduce((acc, expense) => acc + expense.amount, 0);
      setTotalAmount(total);
    } else {
      // If no date is selected, show all expenses and calculate total
      setFilteredExpenses(expenses);
      const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
      setTotalAmount(total);
    }
  };

  return (
    <div>
    <div className={styles.dailyexpense}>
      <h1>Expenses</h1>

      {/* Date Picker */}
      <div>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="MM/dd/yyyy"
          placeholderText="Select a date"
        />
      </div>
      </div>
      <div>

      {error && <p className="error-message">{error}</p>}

      {filteredExpenses.length > 0 ? (
        <div className={styles.cardContainer}>
          {filteredExpenses.map((expense) => (
            <div key={expense._id} className={styles.card}>
              <h3>{expense.name}</h3>
              <p><strong>Category:</strong> {expense.category}</p>
              <p><strong>Amount:</strong> ${expense.amount}</p>
              <p><strong>Date:</strong> {new Date(expense.date).toLocaleDateString()}</p>
              <p><strong>Description:</strong> {expense.description || "N/A"}</p>
              <button className={styles.editButton}>Edit</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No expenses to show.</p>
      )}
</div>
      {/* Display total cost */}
      <div>
        <h3 align="center">Total Expenses on this day: ${totalAmount.toFixed(2)}</h3>
      </div>
    </div>
  );
}
