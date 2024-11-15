import React, { useState } from 'react';
import Calendar from '../components/Calendar';
import AppointmentSummary from '../components/AppointmentSummary';
import TimeSlots from '../components/TimeSlots';
import './ScheduleAppointment.css';

function ScheduleAppointment() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [message, setMessage] = useState(""); // Message to display feedback

  const availableTimes = ["10:30am", "11:30am", "02:30pm", "03:00pm", "03:30pm", "04:30pm", "05:00pm", "05:30pm"];
  const bookedAppointments = {
    // Example of booked appointments
    "2024-11-15": ["10:30am", "02:30pm"],
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset time on new date selection
    setMessage(""); // Clear any existing messages
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setMessage(""); // Clear any existing messages
  };

  const handleConfirmation = () => {
    if (!selectedDate || !selectedTime) {
      // Test Case 1: Blank date/time
      setMessage("Please select a date and time for your appointment.");
    } else if (
      bookedAppointments[selectedDate] &&
      bookedAppointments[selectedDate].includes(selectedTime)
    ) {
      // Test Case 3: Conflict with existing appointment
      setMessage("This time slot is already booked. Please select a different time.");
    } else {
      // Test Case 2: Valid date/time
      setMessage("Appointment successfully scheduled and confirmed.");
    }
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
            <button className="next-button" onClick={handleConfirmation}>
              Confirm
            </button>
          )}
          {message && <p className="feedback-message">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default ScheduleAppointment;
