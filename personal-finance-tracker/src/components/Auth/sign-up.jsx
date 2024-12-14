import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const UserSignUp = () => {
  const [email, setEmail] = useState("");
  const [work, setWork] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
 
  const [gender, setGender] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); 
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!email ||  !password || !username || work|| !gender) {
        setErrorMessage("All fields are required.");
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        setErrorMessage("Please enter a valid email address.");
        return;
    }

    if (password.length < 10) {
        setErrorMessage("Password must be at least 10 characters long.");
        return;
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
            <label htmlFor="work">DOB</label>
            <input
              type="date"
              id="date"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="work">Work profession</label>
            <input
              type="text"
              id="work"
              value={work}
              onChange={(e) => setWork(e.target.value)}
              required
            />
          </div>
          
          

          <div className="input-group">
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              id="confirmpassword"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
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
