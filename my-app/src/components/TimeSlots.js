// /src/components/TimeSlots.js
import React from 'react';
import './TimeSlots.css';

function TimeSlots({ availableTimes, onSelectTime, selectedTime }) {
  return (
    <div className="time-slots">
      <h4>Select Date and Time</h4>
      <div className="time-options">
        {availableTimes.map((time, index) => (
          <button
            key={index}
            className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
            onClick={() => onSelectTime(time)}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TimeSlots;
