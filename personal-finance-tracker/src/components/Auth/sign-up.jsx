import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/signup.module.css"; 
import signup from "../../images/signup.png";

const UserSignUp = () => {
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");
  const [workingStatus, setWorkingStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone_number, password, username, gender, age, dob, workingStatus }),
      });
      const data = await response.json();
      if (response.ok) navigate("/login");
      else setErrorMessage(data.errors || "Sign-up failed. Try again.");
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className={styles.signupPage}>
      <div className={styles.signupCard}>
        {/* Left Section */}
        <div className={styles.signupLeft}>
          <h2>Welcome!</h2>
          <p>Join us and explore amazing opportunities.</p>
          <img src={signup} alt="Sign-Up" style={{ maxWidth: '300px', marginBottom: '20px' }} />
        </div>
        {/* Right Section */}
        <div className={styles.signupRight}>
          <h2>Create Account</h2>
          <form onSubmit={handleSignUp}>
            <div className={styles.formGrid}>
              {/* Form Fields */}
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="phone_number">Phone</label>
                <input
                  type="text"
                  id="phone_number"
                  value={phone_number}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="dob">Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="workingStatus">Working Status</label>
                <select
                  id="workingStatus"
                  value={workingStatus}
                  onChange={(e) => setWorkingStatus(e.target.value)}
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Student">Student</option>
                  <option value="Housewife">Housewife</option>
                  <option value="Working Professional">Working Professional</option>
                </select>
              </div>
            </div>
            <button type="submit" className={styles.signupButton}>
              Sign Up
            </button>
          </form>
          <div className={styles.loginLink}>
            <p>
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default UserSignUp;
