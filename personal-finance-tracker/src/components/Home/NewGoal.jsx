import React, { useState, useContext } from "react";
import styles from "../../styles/goal.module.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

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

  const { User } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGoalData({ ...goalData, [name]: value });
  };

  const fetchUserId = async (email) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/auth/${email}`);
      return response.data.user_id;
    } catch (err) {
      console.error("Error fetching user ID:", err);
      setError("Failed to fetch user ID.");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    if (!User?.email) {
      setError("Unable to identify user. Please log in.");
      console.error("User email is missing or invalid.");
      return;
    }

    const userId = await fetchUserId(User.email); 

    if (!userId) {
      setError("User ID not found.");
      return;
    }

    try {
      console.log("Sending goal data:", goalData); 

      const response = await fetch("http://localhost:5000/api/goal/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${User.token}`, 
        },
        body: JSON.stringify({
          ...goalData,
          user_id: userId, 
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
      console.error("Error occurred:", err); 
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
