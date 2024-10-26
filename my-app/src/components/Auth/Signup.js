import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

function Signup() {
  return (
    <div className="auth-container">
      <Link to="/" className="back-link">← Back</Link>
      <h2>Account Signup</h2>
      <p>Sign up to create your personalized health profile</p>
      <form>
        <label>Full Name</label>
        <input type="text" placeholder="Enter full name" required />
        
        <label>Email Address</label>
        <input type="email" placeholder="Enter email" required />
        
        <label>Password</label>
        <input type="password" placeholder="Enter password" required />
        
        <label>Verify Password</label>
        <input type="password" placeholder="Verify password" required />
        
        <button type="submit" className="auth-button">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
