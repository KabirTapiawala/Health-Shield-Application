// /src/pages/ScheduleAppointment.js
import React, { useState } from 'react';
import Calendar from '../components/Calendar';
import AppointmentSummary from '../components/AppointmentSummary';
import TimeSlots from '../components/TimeSlots';
import './ScheduleAppointment.css';

function ScheduleAppointment() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const availableTimes = ["10:30am", "11:30am", "02:30pm", "03:00pm", "03:30pm", "04:30pm", "05:00pm", "05:30pm"];

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset time on new date selection
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  return (
    <div className="schedule-appointment">
      <header>
        <h2>Calendar</h2>
      </header>
      <div className="appointment-container">
        <div className="appointment-summary-section">
          <AppointmentSummary 
            doctor="Dr. Steven John" 
            duration="30 mins" 
            confirmationMessage="Video call details provided upon successful confirmation"
          />
        </div>
        <div className="calendar-section">
          <Calendar onDateSelect={handleDateSelect} />
          {selectedDate && (
            <TimeSlots 
              availableTimes={availableTimes} 
              onSelectTime={handleTimeSelect} 
              selectedTime={selectedTime} 
            />
          )}
          {selectedDate && selectedTime && (
            <button className="next-button">Next</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ScheduleAppointment;
