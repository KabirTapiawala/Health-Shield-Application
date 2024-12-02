import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import logo from '../assets/logo.png'; // Import the logo image

function Sidebar() {
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    // Perform any logout-related logic here, e.g., clearing tokens
    navigate('/'); // Redirect to the '/' route
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="App Logo" />
      </div>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/calendar">Calendar</Link></li>
        <li><Link to="/inbox">Inbox</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/prescriptions">Prescriptions</Link></li>
      </ul>
      <button className="logout" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Sidebar;
