import React, { useState } from 'react';
import styles from '../../styles/addform.module.css';
import { useNavigate } from 'react-router-dom';

function BudgetForm() {
  const [amount, setAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showForm, setShowForm] = useState(false); 
  const [error, setError] = useState('');
  const navigate = useNavigate();
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
    if (!amount || !startDate) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('/api/setBudget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          startDate,
          endDate,
        }),
      });

      if (response.ok) {
        alert('Budget set successfully!');
      } else {
        setError('Failed to set budget');
      }
    } catch (err) {
      setError('Error setting budget');
    }
  };

  return (
    // <div>
    //     <FormContainer>
    //       <h3>Set Your Monthly Budget</h3>
    //       <form onSubmit={handleSubmit}>
    //         <div>
    //           <label>Amount</label>
    //           <input
    //             type="number"
    //             value={amount}
    //             onChange={(e) => setAmount(e.target.value)}
    //             required
    //           />
    //         </div>

    //         <div>
    //           <label>Start Date</label>
    //           <input
    //             type="date"
    //             value={startDate}
    //             onChange={handleStartDateChange}
    //             required
    //           />
    //         </div>

    //         <div>
    //           <label>End Date</label>
    //           <input
    //             type="date"
    //             value={endDate}
    //             disabled
    //             readOnly
    //           />
    //         </div>

    //         {error && <p style={{ color: 'red' }}>{error}</p>}
    //         <StyledButton type="submit">Set Monthly Budget</StyledButton>
    //       </form>
    //     </FormContainer>
      
    // </div>
    <div className={styles.formContainer}>
      <div className={styles.formLeft}>
        <div className={styles.welcomeIcon}>💰</div>
        <h2 className={styles.welcomeTitle}>Expense</h2>
        <p className={styles.welcomeText}>Fill in your expense details!</p>
        <button className={styles.backButton} onClick={handleBack}>GO BACK</button>
      </div>
      <div className={styles.formRight}>
        <h3 className={styles.formTitle}>Expense Details</h3>
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
          
          <button type="submit" className={styles.submitButton}>
            SET
          </button>
        </form>
      </div>
    </div>
  );
}

export default BudgetForm;
