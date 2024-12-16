import React, { useState, useContext, useEffect } from "react";
import styles from "../../styles/checkexpense.module.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext.js";
import { useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NoData from "../../images/NoData.png";
export default function CheckExpense() {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [viewMode, setViewMode] = useState("daily"); // New state for view mode ('daily' or 'monthly')
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
        
      }
    };

    fetchExpenses();
  }, [id]);

  // Handle date selection and filter expenses based on view mode
  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      if (viewMode === "daily") {
        // Filter expenses by exact date
        const formattedDate = date.toLocaleDateString();
        const filtered = expenses.filter(expense =>
          new Date(expense.date).toLocaleDateString() === formattedDate
        );
        setFilteredExpenses(filtered);
      } else if (viewMode === "monthly") {
        // Filter expenses by month and year
        const selectedMonthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
        const filtered = expenses.filter(expense => {
          const expenseDate = new Date(expense.date);
          const expenseMonthYear = `${expenseDate.getFullYear()}-${expenseDate.getMonth() + 1}`;
          return expenseMonthYear === selectedMonthYear;
        });
        setFilteredExpenses(filtered);
      }
    } else {
      // If no date is selected, show all expenses
      setFilteredExpenses(expenses);
    }
  };

  // Calculate total amount
  const calculateTotalAmount = () => {
    return filteredExpenses.reduce((total, expense) => total + expense.amount, 0);
  };

  // Toggle between daily and monthly view modes
  const toggleViewMode = (mode) => {
    setViewMode(mode);
    setSelectedDate(null); // Reset selected date when view mode changes
    setFilteredExpenses(expenses); // Reset filter when switching modes
  };

  return (
    <div>
      <div className={styles.dailyexpense}>
        <h1>Expenses</h1>

        {/* Toggle Buttons for View Mode */}
        <div className={styles.togbtn}>
          <div>
          <button 
            className={viewMode === "daily" ? styles.activeButton : ""} 
            onClick={() => toggleViewMode("daily")}>Daily</button></div>
          <div>
          <button 
            className={viewMode === "monthly" ? styles.activeButton : ""} 
            onClick={() => toggleViewMode("monthly")}>Monthly</button></div>
        </div>

        {/* Date Picker */}
        <div>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat={viewMode === "daily" ? "MM/dd/yyyy" : "MM/yyyy"}
            showMonthYearPicker={viewMode === "monthly"}
            placeholderText={viewMode === "daily" ? "Select a date" : "Select a month"}
          />
        </div>
        
        {/* Display Total Amount */}
        <div>
          <h3>Total Amount: ₹{calculateTotalAmount().toFixed(2)}</h3>
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}

      {filteredExpenses.length > 0 ? (
        <div className={styles.cardContainer}>
          {filteredExpenses.map((expense) => (
            <div key={expense._id} className={styles.card}>
              <h3>{expense.name}</h3>
              <p><strong>Category:</strong> {expense.category}</p>
              <p><strong>Amount:</strong> ₹{expense.amount}</p>
              <p><strong>Date:</strong> {new Date(expense.date).toLocaleDateString()}</p>
              <p><strong>Description:</strong> {expense.description || "N/A"}</p>
              
            </div>
          ))}
        </div>
      ) : (
        
          <div className={styles.nodata}>
            <img src={NoData} alt="Error" style={{ maxWidth: "200px", marginBottom: "20px" }} />
          </div> 
      )}
    </div>
  );
}
