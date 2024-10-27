import React, { useState } from 'react';
import Logo from '../components/Logo';
import Signup from '../components/Auth/Signup';
import './AuthPage.css';
import { signup } from '../services/authService'; // Assuming `signup` is an API call for registration
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await signup({ fullName, email, password });
      navigate('/profile'); // Redirect to profile page after successful signup
    } catch (error) {
      console.error(error);
      alert('Signup failed');
    }
  };

  return (
    <div className="auth-page">
      <div className="logo-section">
        <Logo />
      </div>
      <div className="form-section">
        <Signup
          fullName={fullName}
          email={email}
          password={password}
          confirmPassword={confirmPassword}
          setFullName={setFullName}
          setEmail={setEmail}
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
          onSubmit={handleSubmit} 
        />
      </div>
    </div>
  );
}

export default SignupPage;
