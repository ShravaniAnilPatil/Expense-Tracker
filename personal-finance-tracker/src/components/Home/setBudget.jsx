import React, { useState, useContext } from 'react';
import styles from '../../styles/addform.module.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext.js";

const BudgetForm = () => {
  const { user } = useContext(AuthContext);
  const [amount, setAmount] = useState(''); 
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentAmount, setCurrentAmount] = useState(0);
  const [error, setError] = useState('');
  const navigate = useNavigate();
console.log(user)
  const calculateEndDate = (start) => {
    if (!start) return '';
    const date = new Date(start);
    date.setMonth(date.getMonth() + 1); 
    return date.toISOString().split('T')[0]; 
  };

  const handleStartDateChange = (e) => {
    const start = e.target.value;
    setStartDate(start);
    setEndDate(calculateEndDate(start));
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !startDate || !currentAmount) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/budget/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: user.id,
          totalAmount: amount,  
          currentAmount,
          startDate,
          endDate,
        }),
      });

      if (response.ok) {
        alert('Budget created successfully!');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to set budget');
      }
    } catch (err) {
      setError('Error setting budget');
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formLeft}>
        <div className={styles.welcomeIcon}>💰</div>
        <h2 className={styles.welcomeTitle}>Budget</h2>
        <p className={styles.welcomeText}>Fill in your Budget details!</p>
        <button className={styles.backButton} onClick={handleBack}>GO BACK</button>
      </div>
      <div className={styles.formRight}>
        <h3 className={styles.formTitle}>Details</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <label>Amount</label>
            <input
              type="number"
              value={amount}  
              onChange={(e) => setAmount(e.target.value)}  
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formRow}>
            <label>Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formRow}>
            <label>End Date</label>
            <input
              type="date"
              value={endDate}
              className={styles.input}
              disabled
              readOnly
            />
          </div>

          <div className={styles.formRow}>
            <label>Current Amount</label>
            <input
              type="number"
              value={currentAmount}
              onChange={(e) => setCurrentAmount(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button type="submit" className={styles.submitButton}>
            SET
          </button>
        </form>
      </div>
    </div>
  );
};

export default BudgetForm;
