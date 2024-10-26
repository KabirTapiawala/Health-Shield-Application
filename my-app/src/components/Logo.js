import React from 'react';
import logo from '../assets/logo.png'; // Add the logo image in the assets folder

function Logo() {
  return (
    <div className="logo-container">
      <img src={logo} alt="Health Shield Logo" className="logo" />
      <h1>Health Shield</h1>
    </div>
  );
}

export default Logo;
