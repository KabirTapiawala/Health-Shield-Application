// /src/components/Calendar.js
import React, { useState } from 'react';
import './Calendar.css';

function Calendar() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const month = today.getMonth();
  const year = today.getFullYear();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDayOfWeek = new Date(year, month, 1).getDay();
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleDateClick = (day) => {
    setSelectedDate(new Date(year, month, day));
  };

  const renderDays = () => {
    const days = [];

    // Empty slots for days before the start of the month
    for (let i = 0; i < (startDayOfWeek === 0 ? 6 : startDayOfWeek - 1); i++) {
      days.push(<div key={`empty-${i}`} className="empty"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

      days.push(
        <div
          key={day}
          className={`day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
          onClick={() => handleDateClick(day)}
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
    </div>
  );
}

export default Calendar;
