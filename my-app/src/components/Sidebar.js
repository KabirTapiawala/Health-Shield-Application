// Inside /client/src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';  // Styles for sidebar

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src="../assets/logo.png" alt="App Logo" />
      </div>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/calendar">Calendar</Link></li>
        <li><Link to="/inbox">Inbox</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/prescriptions">Prescriptions</Link></li>
      </ul>
      <button className="logout">Logout</button>
    </div>
  );
}

export default Sidebar;
