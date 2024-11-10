// /src/context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

// Create AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // This will store user data, including the name

  const login = (userData) => {
    setUser(userData); // Set the user data when logging in or signing up
    localStorage.setItem('user', JSON.stringify(userData)); // Optional: Persist user data
  };

  const logout = () => {
    setUser(null); // Clear user data
    localStorage.removeItem('user'); // Remove persisted user data
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
