import React, { createContext, useState, useEffect } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// AuthContext Provider component
export const AuthProvider = ({ children }) => {
  const [User, setUser] = useState(null); // Manage user state

  // Check if the user is already authenticated on initial load
  useEffect(() => {
    // Retrieve user info from localStorage or from API if needed
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser)); // Safely parse the JSON
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }, []);

  // Function to log in and set user state
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Store user in localStorage
  };

  // Function to log out and clear user state
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Clear user data from localStorage
  };

  return (
    <AuthContext.Provider value={{ User, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
