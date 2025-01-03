import React, { useContext, useState } from "react";
import styles from "../../styles/goal.module.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const NewGoal = () => {
  const [goalData, setGoalData] = useState({
    user: "", 
    name: "",
    amount: "",
    saved: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

 


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGoalData({ ...goalData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      // Include the logged-in user's email
      const goal = {
        email: user.email, // Use the email from AuthContext
        name: goalData.name,
        amount: parseFloat(goalData.amount),
        saved: parseFloat(goalData.saved || 0),
        description: goalData.description,
        startDate: goalData.startDate,
        endDate: goalData.endDate,
      };
  
      const response = await axios.post("http://localhost:5000/api/goal/usercreate", goal, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 201) {
        alert(response.data.message || "Goal added successfully!");
        navigate("/home");
      }
    } catch (error) {
      console.error("Error adding goal:", error.response?.data || error.message);
      setError(error.response?.data?.error || "An error occurred while adding the goal.");
    }
  };
  
  const handleBack = () => {
    navigate("/home"); 
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formLeft}>
        <div className={styles.welcomeIcon}>🎯</div>
        <h2 className={styles.welcomeTitle}>Create Goal</h2>
        <p className={styles.welcomeText}>Set your goals high, and don't stop until you get there!</p>
        <button className={styles.backButton} onClick={handleBack}>GO BACK</button>
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
              placeholder="Goal Amount"
              value={goalData.amount}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>
          <div className={styles.formRow}>
            <input
              type="number"
              name="saved"
              placeholder="Amount Already Saved"
              value={goalData.saved}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>
          <div className={styles.formRow}>
            <textarea
              name="description"
              placeholder="Goal Description"
              value={goalData.description}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formRow}>
            <input
              type="date"
              name="startDate"
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
              value={goalData.endDate}
              onChange={handleInputChange}
              className={styles.input}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>ADD GOAL</button>
        </form>
      </div>
    </div>
  );
};

export default NewGoal;
