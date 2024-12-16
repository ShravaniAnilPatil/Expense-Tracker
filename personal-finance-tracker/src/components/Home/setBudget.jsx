import React, { useState, useEffect, useContext } from 'react';
import styles from '../../styles/addform.module.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext.js";
import axios from 'axios';

const BudgetForm = () => {
  const { user } = useContext(AuthContext);
  const [amount, setAmount] = useState('');

  const [currentAmount, setCurrentAmount] = useState(0);
  const [error, setError] = useState('');
  const [totalAmount, setTotalAmount] = useState(null);
  const [startdate, setstartdate] = useState(null);
  const [enddate, setenddate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [budgetData, setBudgetData] = useState(null);  // Store budget data in state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        const response1 = await axios.get(`http://localhost:5000/api/budget/fetch/${user.id}`);

        // Setting totalAmount and currentAmount
        setTotalAmount(response1.data.totalAmount);
        setCurrentAmount(response1.data.currentAmount);

        // Formatting start date
        const startdate = new Date(response1.data.startdate);
        const startformattedDate = startdate.toISOString().split('T')[0];

        // Formatting end date
        const enddate = new Date(response1.data.enddate);
        const endformattedDate = enddate.toISOString().split('T')[0];

        // Setting the formatted start and end dates
        setstartdate(startformattedDate);
        setenddate(endformattedDate);

        // Store the fetched data in state
        setBudgetData(response1.data);  // Store response in state

      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    // Fetching the data when the component mounts or user.id changes
    fetchBudgetData();
  }, [user.id]);

  const calculateEndDate = (start) => {
    if (!start) return '';
    const date = new Date(start);
    date.setMonth(date.getMonth() + 1);
    return date.toISOString().split('T')[0];
  };

  const handleStartDateChange = (e) => {
    const start = e.target.value;
    setstartdate(start);
    setenddate(calculateEndDate(start));
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!budgetData){
    if (!totalAmount || !startdate || !currentAmount) {
      setError('Please fill in all fields');
      return;
    }
  }
    try {
      console.log(user.id)
      // Check if the budget data is already fetched
      const url = budgetData ? `http://localhost:5000/api/budget/update/${user.id}` : `http://localhost:5000/api/budget/create`;
      console.log("id")
      
      const method = budgetData ? 'PUT' : 'POST';

      const body = {
        user: user.id,
        totalAmount,
        currentAmount,
        startDate: startdate,
        endDate: enddate,
      };

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        alert('Budget ' + (method === 'POST' ? 'created' : 'updated') + ' successfully!');
        navigate('/'); // Navigate to the home page after successful submit
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
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formRow}>
            <label>Start Date</label>
            <input
              type="date"
              value={startdate}
              onChange={handleStartDateChange}
              className={styles.input}
              disabled={!!budgetData}
              readOnly={!!budgetData}
              required
            />
          </div>

          <div className={styles.formRow}>
            <label>End Date</label>
            <input
              type="date"
              value={enddate}
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
              disabled={true}
              readOnly={!!budgetData}
              required={!!budgetData}
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
