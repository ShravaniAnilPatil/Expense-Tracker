import React, { useState } from "react";
import styles from "../../styles/addform.module.css";
import { useNavigate } from 'react-router-dom';

const StyledForm = () => {
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleCategoryChange = (e) => {
    if (e.target.value === "custom") {
      setIsCustomCategory(true);
    } else {
      setIsCustomCategory(false);
      setCategory(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const expenseData = {
        user: "675db2c85699be0759b241a8", // Replace with the logged-in user's ID
        category: isCustomCategory ? customCategory :category,
        name,
        amount: parseFloat(amount), 
        date,
        description,
      };
      console.log(expenseData);
      const response = await fetch("http://localhost:5000/api/expense/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expenseData),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        navigate("/"); // Redirect back to the main page after adding the expense
      } else {
        alert(result.error || "Failed to add expense.");
      }
    } catch (error) {
      console.error("Error adding expense:", error);
      alert("An error occurred while adding the expense.");
    }
  };

  const handleBack = () => {
    navigate("/");
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
        <form onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <select
              value={category}
              onChange={handleCategoryChange}
              className={styles.input}
              required
            >
              <option value="" disabled>Select Category</option>
              <option value="food">Food</option>
              <option value="travel">Travel</option>
              <option value="shopping">Shopping</option>
              <option value="entertainment">Entertainment</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          {isCustomCategory && (
            <div className={styles.formRow}>
              <input
                type="text"
                placeholder="Enter custom category"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                className={styles.input}
                required
              />
            </div>
          )}
          <div className={styles.formRow}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formRow}>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formRow}>
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formRow}>
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.textarea}
              rows="3"
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            ADD
          </button>
        </form>
      </div>
    </div>
  );
};

export default StyledForm;
