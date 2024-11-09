// /src/components/Header.js
import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="dashboard-header">
      <div>
        <h1>Welcome Back</h1>
        <p>Hi, user</p>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Find doctors" />
        <input type="text" placeholder="Location" />
        <button>Search</button>
      </div>
      {/* <div className="user-info">
        <span>EN</span>
        <span>Username</span>
      </div> */}
    </header>
  );
}

export default Header;
