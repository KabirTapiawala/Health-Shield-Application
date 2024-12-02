import React from 'react';
import './AppointmentSummary.css';

function AppointmentSummary({ doctor, duration, confirmationMessage }) {
    return (
        <div className="appointment-summary">
            <h3>Your Selected Appointments</h3>
            <div className="doctor-info">
                <p><span role="img" aria-label="doctor">👨‍⚕️</span> {doctor}</p>
                <p><span role="img" aria-label="clock">⏰</span> {duration}</p>
                <p><span role="img" aria-label="video">🎥</span> {confirmationMessage}</p>
            </div>
        </div>
    );
}

export default AppointmentSummary;
