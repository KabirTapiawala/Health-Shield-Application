// /src/components/Header.js
import React from 'react';
import './Header.css';

function Header({ userName }) {  // Receive userName as a prop
  return (
    <header className="dashboard-header">
      <div className="welcome-message">
        <h1>Welcome Back</h1>
        <p>Hi, {userName}</p>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Find doctors" aria-label="Search for doctors" />
        <input type="text" placeholder="Location" aria-label="Search by location" />
        <button aria-label="Search">Search</button>
      </div>
      {/* <div className="user-info">
        <span className="language">EN</span>
        <span className="username">{userName}</span>
      </div> */}
    </header>
  );
}

export default Header;
