import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

function Login({ email, password, setEmail, setPassword, onSubmit }) {
  return (
    <div className="auth-container">
      <h2>Account Login</h2>
      <p>Login with your email address and password</p>
      <form onSubmit={onSubmit} className="login-form"> 
        <label>Email Address</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Enter email" 
          required 
        />
        
        <label>Password</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Enter password" 
          required 
        />
        
        <button type="submit" className="auth-button">Login</button>
      </form>
      <p className="auth-footer">
        Don’t have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
}

export default Login;
