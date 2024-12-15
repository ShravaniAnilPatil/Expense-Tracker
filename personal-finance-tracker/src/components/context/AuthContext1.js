import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(); // Create context

export const useAuth = () => {
  return useContext(AuthContext); // Hook to use AuthContext
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, email, setEmail }}>
      {children}
    </AuthContext.Provider>
  );
};
