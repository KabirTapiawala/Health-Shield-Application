// /src/components/Appointments.js
import React from 'react';
import './Appointments.css';

const appointments = [
  { day: 'Fri ', date: 14, name: 'Dr. Ashton Cleve', time: '10:00am - 10:30am' },
  { day: 'Sat ', date: 15, name: 'Dr. Ashton Cleve', time: '10:00am - 10:30am' },
  // Add more as needed
];

function Appointments() {
  return (
    <div className="appointments">
      <div className="appointments-header">
        <h2>Upcoming Appointments</h2>
        <a href="#">View All</a>
      </div>
      <ul>
        {appointments.map((appt, index) => (
          <li key={index}>
            <div className="date">
              <span>{appt.day}</span>
              <span>{appt.date}</span>
            </div>
            <div className="details">
              <h3>{appt.name}</h3>
              <p>{appt.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Appointments;
