import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import "./Login.css"; 
import styles from "../../styles/login.module.css"
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Both email and password are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          navigate("/dashboard"); 
        }, 3000); 
      } else {
        setErrorMessage(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className={styles.loginpage}>
      <div className="login-box">
        <h2>Sign In</h2>
        <form onSubmit={handleLogin}>
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
          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="signup-link">
          <p>
            New user? <Link to="/signup">Sign up</Link>
          </p>
        </div>

        {showPopup && (
          <div className="popup">
            <h2>Login Successful!</h2>
            <p>Redirecting to your dashboard...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
