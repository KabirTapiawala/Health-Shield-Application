import React, { useState, useEffect } from 'react';
import './Header.css';

function Header({ userName }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [error, setError] = useState('');

  // Fetch all doctors on component mount
  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/doctors');
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const searchDoctors = async () => {
    if (!name && !location && !specialty) {
      setError('Please provide at least one search criterion.');
      setFilteredDoctors([]);
      return;
    }
  
    try {
      const queryParams = {};
      if (name) queryParams.name = name;
      if (location) queryParams.location = location;
      if (specialty) queryParams.specialty = specialty;  // Assuming you use 'specialty' on the backend
      
      const query = new URLSearchParams(queryParams).toString();
      const response = await fetch(`http://localhost:5000/api/doctors?${query}`);
      const data = await response.json();
  
      if (data.length === 0) {
        setError('No matching doctors found.');
        setFilteredDoctors([]);
      } else {
        setError('');
        setFilteredDoctors(data);
      }
    } catch (error) {
      console.error('Error searching doctors:', error);
    }
  };

  return (
    <header className="dashboard-header">
      <div className="welcome-message">
        <h1>Welcome Back</h1>
        <p>Hi, {userName}</p>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Doctor's Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Specialty"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
        />
        <button onClick={searchDoctors}>Search</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="doctor-list">
        {filteredDoctors.map((doctor, index) => (
          <div key={index} className="doctor">
            <h4>{doctor.name}</h4>
            <p>Location: {doctor.location}</p>
            <p>Specialty: {doctor.specialty}</p>
          </div>
        ))}
      </div>
    </header>
  );
}

export default Header;
