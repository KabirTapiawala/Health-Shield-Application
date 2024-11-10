import React, { useState } from 'react';
import Logo from '../components/Logo';
import Login from '../components/Auth/Login';
import './AuthPage.css';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login: loginContext } = useAuth(); // Destructure login from useAuth

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({ email, password });
      loginContext(userData);
      navigate('/dashboard');
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
