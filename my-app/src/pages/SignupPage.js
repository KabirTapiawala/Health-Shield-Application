// /src/pages/SignupPage.js
import React, { useState } from 'react';
import Logo from '../components/Logo';
import Signup from '../components/Auth/Signup';
import './AuthPage.css';
import { signup } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState(''); // State for phone number
  const [dob, setDob] = useState(''); // State for date of birth
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const userData = await signup({ fullName, email, password, phone, dob }); // Include phone and dob in the signup payload
      console.log(userData);
      login(userData);
      navigate('/dashboard');
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
          phone={phone} // Pass phone state to Signup component
          dob={dob} // Pass dob state to Signup component
          setFullName={setFullName}
          setEmail={setEmail}
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
          setPhone={setPhone} // Pass phone setter to Signup component
          setDob={setDob} // Pass dob setter to Signup component
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default SignupPage;
