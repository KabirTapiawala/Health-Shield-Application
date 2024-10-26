import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

function Login() {
  return (
    <div className="auth-container">
      <Link to="/" className="back-link">← Back</Link>
      <h2>Account Login</h2>
      <p>Login with your email address and password</p>
      <form>
        <label>Email Address</label>
        <input type="email" placeholder="Enter email" required />
        
        <label>Password</label>
        <input type="password" placeholder="Enter password" required />
        
        <div className="remember-forgot">
          <label>
            <input type="checkbox" /> Remember for 30 days
          </label>
          <Link to="/forgot-password">Forgot password?</Link>
        </div>
        
        <button type="submit" className="auth-button">Login</button>
      </form>
      <p className="auth-footer">
        Don’t have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
}

export default Login;
