import React from 'react';
import Logo from '../components/Logo';
import Login from '../components/Auth/Login';
import './AuthPage.css';

function LoginPage() {
  return (
    <div className="auth-page">
      <div className="logo-section">
        <Logo />
      </div>
      <div className="form-section">
        <Login />
      </div>
    </div>
  );
}

export default LoginPage;
