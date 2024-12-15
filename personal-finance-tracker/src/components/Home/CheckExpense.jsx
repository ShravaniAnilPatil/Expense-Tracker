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
  const [totalAmount, setTotalAmount] = useState(0);
  const [range, setRange] = useState("daily");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/expense/all/${id}`);
        if (response.data.message === "Expenses fetched successfully!") {
          setExpenses(response.data.expenses);
          setFilteredExpenses(response.data.expenses);
        }
      } catch (err) {
        console.error("Error fetching expenses:", err);
        setError("An error occurred while fetching expenses.");
      }
    };
    fetchExpenses();
  }, [id]);

  const handleRangeChange = (event) => {
    const selectedRange = event.target.value;
    setRange(selectedRange);
    setSelectedDate(null);
    setSelectedMonth(null);
    setSelectedYear(null);
    setStartDate(null);
    setEndDate(null);
    filterExpenses(selectedRange);
  };

  // Format date to MM/dd/yyyy
  const formatDate = (date) => {
    const month = ("0" + (date.getMonth() + 1)).slice(-2); 
    const day = ("0" + date.getDate()).slice(-2); 
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  // Compare dates while ignoring time (time is set to midnight for comparison)
  const compareDate = (d1, d2) => {
    const date1 = new Date(d1);
    const date2 = new Date(d2);
    date1.setHours(0, 0, 0, 0); // Set time to midnight
    date2.setHours(0, 0, 0, 0); // Set time to midnight
    return date1.getTime() === date2.getTime(); // Compare date values
  };

  // Filter expenses based on the selected range (daily, monthly, yearly, custom)
  const filterExpenses = (selectedRange) => {
    let filtered = [];
    let total = 0;

    if (selectedRange === "daily" && selectedDate) {
      filtered = expenses.filter(expense => compareDate(expense.date, selectedDate));
    } else if (selectedRange === "monthly" && selectedMonth) {
      filtered = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() === selectedMonth - 1 && expenseDate.getFullYear() === new Date().getFullYear();
      });
    } else if (selectedRange === "yearly" && selectedYear) {
      filtered = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getFullYear() === selectedYear;
      });
    } else if (selectedRange === "custom" && startDate && endDate) {
      filtered = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= new Date(startDate) && expenseDate <= new Date(endDate);
      });
    }

    total = filtered.reduce((acc, expense) => acc + expense.amount, 0);
    setFilteredExpenses(filtered);
    setTotalAmount(total);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    filterExpenses("daily");
  };

  const handleMonthChange = (event) => {
    const month = event.target.value;
    setSelectedMonth(month);
    filterExpenses("monthly");
  };

  const handleYearChange = (event) => {
    const year = event.target.value;
    setSelectedYear(year);
    filterExpenses("yearly");
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (endDate) {
      filterExpenses("custom");
    }
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    if (startDate) {
      filterExpenses("custom");
    }
  };

  return (
    <div>
      <div className={styles.dailyexpense}>
        <h1>Expenses</h1>

        {/* Dropdown to select time range */}
        <div>
          <select onChange={handleRangeChange} value={range}>
            <option value="daily">Daily</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
            <option value="custom">Custom</option>
          </select>
        </div>

        {/* Calendar for daily */}
        {range === "daily" && (
          <div>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="MM/dd/yyyy"
              placeholderText="Select a date"
            />
          </div>
        )}

        {/* Dropdown for monthly */}
        {range === "monthly" && (
          <div>
            <select onChange={handleMonthChange} value={selectedMonth}>
              <option value="">Select Month</option>
              {[...Array(12)].map((_, index) => (
                <option key={index} value={index + 1}>
                  {new Date(0, index).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Dropdown for yearly */}
        {range === "yearly" && (
          <div>
            <select onChange={handleYearChange} value={selectedYear}>
              <option value="">Select Year</option>
              {[...Array(10)].map((_, index) => (
                <option key={index} value={new Date().getFullYear() - index}>
                  {new Date().getFullYear() - index}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Date Pickers for custom range */}
        {range === "custom" && (
          <div>
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              dateFormat="MM/dd/yyyy"
              placeholderText="Select start date"
            />
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              dateFormat="MM/dd/yyyy"
              placeholderText="Select end date"
            />
          </div>
        )}
      </div>

      {error && <p className="error-message">{error}</p>}

      {filteredExpenses.length > 0 ? (
        <div className={styles.cardContainer}>
          {filteredExpenses.map((expense) => (
            <div key={expense._id} className={styles.card}>
              <h3>{expense.name}</h3>
              <p><strong>Category:</strong> {expense.category}</p>
              <p><strong>Amount:</strong> ${expense.amount}</p>
              <p><strong>Date:</strong> {formatDate(new Date(expense.date))}</p>
              <p><strong>Description:</strong> {expense.description || "N/A"}</p>
              <button className={styles.editButton}>Edit</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No expenses to show.</p>
      )}

      {/* Display total cost */}
      <div>
        <h3 align="center">Total Expenses: ${totalAmount.toFixed(2)}</h3>
      </div>
    </div>
  );
}
