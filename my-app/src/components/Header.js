import React, { useState } from 'react';
import './Header.css';

// Sample doctor data
const doctors = [
  { name: 'Dr. John Smith', location: 'New York', specialty: 'Cardiology' },
  { name: 'Dr. Emily Davis', location: 'Los Angeles', specialty: 'Neurology' },
  { name: 'Dr. Robert Johnson', location: 'Chicago', specialty: 'Pediatrics' },
  { name: 'Dr. Sarah Brown', location: 'New York', specialty: 'Neurology' },
  { name: 'Dr. Michael Wilson', location: 'Los Angeles', specialty: 'Cardiology' },
  { name: 'Dr. Linda Martinez', location: 'Chicago', specialty: 'Cardiology' },
];

function Header({ userName }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [error, setError] = useState('');

  const uniqueNames = [...new Set(doctors.map((doctor) => doctor.name))];
  const uniqueLocations = [...new Set(doctors.map((doctor) => doctor.location))];
  const uniqueSpecialties = [...new Set(doctors.map((doctor) => doctor.specialty))];

  const searchDoctors = () => {
    const filtered = doctors.filter((doctor) => {
      const nameMatch = name ? doctor.name === name : true;
      const locationMatch = location ? doctor.location === location : true;
      const specialtyMatch = specialty ? doctor.specialty === specialty : true;
      return nameMatch && locationMatch && specialtyMatch;
    });

    if (!name && !location && !specialty) {
      setError('Please provide at least one search criterion.');
      setFilteredDoctors([]);
    } else if (filtered.length === 0) {
      setError('No matching doctors found.');
      setFilteredDoctors([]);
    } else {
      setError('');
      setFilteredDoctors(filtered);
    }
  };

  return (
    <header className="dashboard-header">
      <div className="welcome-message">
        <h1>Welcome Back</h1>
        <p>Hi, {userName}</p>
      </div>
      <div className="search-bar">
        <select
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-label="Select Doctor's Name"
        >
          <option value="">Select Doctor's Name</option>
          {uniqueNames.map((doctorName, index) => (
            <option key={index} value={doctorName}>{doctorName}</option>
          ))}
        </select>

        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          aria-label="Select Location"
        >
          <option value="">Select Location</option>
          {uniqueLocations.map((loc, index) => (
            <option key={index} value={loc}>{loc}</option>
          ))}
        </select>

        <select
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          aria-label="Select Specialty"
        >
          <option value="">Select Specialty</option>
          {uniqueSpecialties.map((spec, index) => (
            <option key={index} value={spec}>{spec}</option>
          ))}
        </select>

        <button onClick={searchDoctors} aria-label="Search">Search</button>
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
