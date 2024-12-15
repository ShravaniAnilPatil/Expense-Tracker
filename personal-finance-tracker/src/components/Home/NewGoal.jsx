import React, { useState } from "react";
import styles from "../../styles/goal.module.css";
import { useNavigate } from "react-router-dom";

const NewGoal = () => {
  const [goalData, setGoalData] = useState({
    name: "",
    amount: "",
    saved: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGoalData({ ...goalData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/goals/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...goalData,
          amount: parseFloat(goalData.amount),
          saved: parseFloat(goalData.saved || 0),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create goal");
      }

      navigate("/goals"); 
    } catch (err) {
      setError(err.message);
    }
  };
  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formLeft}>
        <div className={styles.welcomeIcon}>🎯</div>
        <h2 className={styles.welcomeTitle}>Create Goal</h2>
        <p className={styles.welcomeText}>Set your goals high, and don't stop until you get there!</p>
        <button className={styles.backButton} onClick={handleBack}>
          GO BACK
        </button>
      </div>
      <div className={styles.formRight}>
        <h3 className={styles.formTitle}>Goal Details</h3>
        {error && <p className={styles.errorText}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <input
              type="text"
              name="name"
              placeholder="Goal Name"
              value={goalData.name}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formRow}>
            <input
              type="number"
              name="amount"
              placeholder="Target Amount"
              value={goalData.amount}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formRow}>
            <input
              type="number"
              name="saved"
              placeholder="Amount Saved (optional)"
              value={goalData.saved}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>
          <div className={styles.formRow}>
            <input
              type="date"
              name="startDate"
              placeholder="Start Date"
              value={goalData.startDate}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formRow}>
            <input
              type="date"
              name="endDate"
              placeholder="End Date"
              value={goalData.endDate}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formRow}>
            <textarea
              name="description"
              placeholder="Description (optional)"
              value={goalData.description}
              onChange={handleInputChange}
              className={styles.textarea}
              rows="3"
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            ADD GOAL
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewGoal;