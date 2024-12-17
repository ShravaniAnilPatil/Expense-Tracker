import React, { useContext, useEffect, useState } from "react";
import NavBar from "../Navbar";
import Dashboard from "./Dashboard";
import styles from "../../styles/home.module.css";
import MyGoal from "./Goal";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.js";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [username, setUsername] = useState("");

 
  useEffect(() => {
    localStorage.setItem('userEmail', user?.email);
    const userEmail = localStorage.getItem("userEmail"); 
    if (userEmail) {
      const name = userEmail.split("@")[0];
      setUsername(name.charAt(0).toUpperCase() + name.slice(1)); 
    } else if (user?.email) {
      const name = user.email.split("@")[0];
      setUsername(name.charAt(0).toUpperCase() + name.slice(1));
    } else {
      setUsername("User");
    }
  }, [user]);

  const handleSubmit = () => {
    navigate("/addform");
  };

  const handleGoal = () => {
    navigate("/NewGoal");
  };

  return (
    <div className={styles.main}>
      <div>
        <h1 align="center" className={styles.wel}>
          Welcome {username}
        </h1>
      </div>

      <div className={styles.cardcontainer}>
        <div className={styles.card}>
          <h3>Set a Budget</h3>
          <Link to="/setBudget">
            <button>Get Started</button>
          </Link>
        </div>

        <div className={styles.card}>
          <h3>Expense History</h3>
          <Link to={`/api/expense/all/${user?.id}`}>
            <button>View Expenses</button>
          </Link>
        </div>
      </div>

      <p className={styles.hname}>Dashboard</p>
      <Dashboard />

      <div className={styles.btnmain}>
        <button className={styles.btn} onClick={handleSubmit}>
          <h6>Add an Expense</h6>
        </button>
      </div>

      <p className={styles.hname}>MyGoals</p>
      <MyGoal />

      <div className={styles.btnmain}>
        <button className={styles.btn} onClick={handleGoal}>
          <h6>Add a New Goal</h6>
        </button>
      </div>
    </div>
  );
};

export default Home;

