import React from 'react';
import Logo from '../components/Logo';
import Signup from '../components/Auth/Signup';
import './AuthPage.css';

function SignupPage() {
  return (
    <div className="auth-page">
      <div className="logo-section">
        <Logo />
      </div>
      <div className="form-section">
        <Signup />
      </div>
    </div>
  );
}

export default SignupPage;
