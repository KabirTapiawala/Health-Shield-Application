// /src/components/Calendar.js
import React, { useState } from 'react';
import './Calendar.css';

function Calendar() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const month = today.getMonth(); // Current month (0-11)
  const year = today.getFullYear(); // Current year

  // Available time slots (can be fetched dynamically)
  const timeSlots = ['10:30am', '11:30am', '02:30pm', '03:30pm', '04:30pm', '05:30pm'];

  // Get the number of days in the month and the starting day of the week
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // Last day of the month
  const startDayOfWeek = new Date(year, month, 1).getDay(); // Day of the week (0=Sun, 6=Sat) for the 1st day

  // Array of month names for display
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Function to handle date selection
  const handleDateClick = (day) => {
    const selectedDateObj = new Date(year, month, day);
    if (selectedDateObj >= today) {
      setSelectedDate(day);
      setSelectedTime(null); // Clear time selection when a new date is selected
    }
  };

  // Function to handle time slot selection
  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  // Function to confirm appointment
  const confirmAppointment = () => {
    if (selectedDate && selectedTime) {
      alert(`Appointment scheduled for ${monthNames[month]} ${selectedDate}, ${year} at ${selectedTime}`);
      // Reset selections (optional)
      setSelectedDate(null);
      setSelectedTime(null);
    }
  };

  // Helper function to render the days in the calendar
  const renderDays = () => {
    const days = [];
    for (let i = 0; i < (startDayOfWeek === 0 ? 6 : startDayOfWeek - 1); i++) {
      days.push(<div key={`empty-${i}`} className="empty"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
      const isPast = currentDate < today;
      const isSelected = selectedDate === day;
      days.push(
        <div
          key={day}
          className={`day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${isPast ? 'disabled' : ''}`}
          onClick={() => !isPast && handleDateClick(day)}
        >
          {day}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="calendar">
      <h3>{`${monthNames[month]} ${year}`}</h3>
      <div className="calendar-grid">
        <div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div><div>SAT</div><div>SUN</div>
        {renderDays()}
      </div>

      {selectedDate && (
        <div className="time-slots">
          <h4>Available Time Slots for {monthNames[month]} {selectedDate}, {year}</h4>
          <div className="time-slot-buttons">
            {timeSlots.map((time) => (
              <button
                key={time}
                className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                onClick={() => handleTimeClick(time)}
              >
                {time}
              </button>
            ))}
          </div>
          {selectedTime && (
            <button className="confirm-button" onClick={confirmAppointment}>
              Confirm Appointment
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Calendar;
