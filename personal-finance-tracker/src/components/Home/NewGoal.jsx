import React, { useState } from "react";
import styles from "../../styles/addform.module.css";
import { useNavigate } from 'react-router-dom';
const NewGoal = () => {
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [isCustomCategory, setIsCustomCategory] = useState(false);

  const handleCategoryChange = (e) => {
    if (e.target.value === "custom") {
      setIsCustomCategory(true);
    } else {
      setIsCustomCategory(false);
      setCategory(e.target.value);
    }
  };
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    
  };

  const handleBack = (e) => {
    
    navigate('/');
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formLeft}>
        <div className={styles.welcomeIcon}>💰</div>
        <h2 className={styles.welcomeTitle}>Expense</h2>
        <p className={styles.welcomeText}>Fill in your expense details!</p>
        <button className={styles.backButton} onClick={handleBack}>GO BACK</button>
      </div>
      <div className={styles.formRight}>
        <h3 className={styles.formTitle}>Expense Details</h3>
        <form>
        
          <div className={styles.formRow}>
           
          </div>
          

          
          <div className={styles.formRow}>
            <input
              type="text"
              placeholder="Name"
              className={styles.input}
              required
            />
          </div>

         
          <div className={styles.formRow}>
            <input
              type="date"
              className={styles.input}
              required
            />
          </div>

         
          <div className={styles.formRow}>
            <input
              type="number"
              placeholder="Amount"
              className={styles.input}
              required
            />
          </div>

         
          <div className={styles.formRow}>
            <textarea
              placeholder="Description"
              className={styles.textarea}
              rows="3"
              
            />
          </div>

        
          <button type="submit" className={styles.submitButton} onClick={handleSubmit}>
            ADD
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewGoal;
