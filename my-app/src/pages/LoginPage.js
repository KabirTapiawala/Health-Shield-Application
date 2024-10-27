import React, { useState } from 'react';
import Logo from '../components/Logo';
import Login from '../components/Auth/Login';
import './AuthPage.css';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate('/profile');
    } catch (error) {
      console.error(error);
      alert('Login failed');
    }
  };
  
  return (
    <div className="auth-page">
      <div className="logo-section">
        <Logo />
      </div>
      <div className="form-section">
        <Login 
          email={email} 
          password={password} 
          setEmail={setEmail} 
          setPassword={setPassword} 
          onSubmit={handleSubmit} 
        />
      </div>
    </div>
  );
}

export default LoginPage;
