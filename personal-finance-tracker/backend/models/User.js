import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import "./SignUp.css";

const UserSignUp = () => {
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");
  const [workingStatus, setWorkingStatus] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    setErrorMessage(""); 

    if (!email || !phone_number || !password || !username || !gender || !age || !dob || !workingStatus) {
      setErrorMessage("All fields are required.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    const phonePattern = /^[789]\d{9}$/;
    if (!phonePattern.test(phone_number)) {
      setErrorMessage("Please enter a valid phone number.");
      return;
    }

    if (password.length < 10) {
      setErrorMessage("Password must be at least 10 characters long.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          phone_number,
          password,
          username,
          gender,
          age,
          dob,
          workingStatus,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          navigate("/login"); 
        }, 3000);
      } else {
        setErrorMessage(data.message || "Sign-up failed. Please try again.");
      }
    } catch (error) {
      console.error("Sign-up error:", error);
      setErrorMessage("An error occurred during sign-up. Please try again.");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-box">
        <h2>User Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="phone_number">Phone Number</label>
            <input
              type="text"
              id="phone_number"
              value={phone_number}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              min="0"
              max="120"
            />
          </div>

          <div className="input-group">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="workingStatus">Working Status</label>
            <select
              id="workingStatus"
              value={workingStatus}
              onChange={(e) => setWorkingStatus(e.target.value)}
              required
            >
              <option value="">Select your working status</option>
              <option value="Student">Student</option>
              <option value="Housewife">Housewife</option>
              <option value="Working Professional">Working Professional</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select your gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>

        <div className="login-link">
          <p>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>

      {showPopup && (
        <div className="popup">
          <h2>Account Created Successfully!</h2>
          <p>You can now log in with your credentials.</p>
        </div>
      )}
    </div>
  );
};

export default UserSignUp;
