import React, { useState } from 'react';
import '../../Assets/Styles/WebSite/InteractiveCalendar.css';
import { Calendar } from 'react-modern-calendar-datepicker';
import { myCustomLocale } from './MyCustomLocale';

const InteractiveCalendar = () => {

  const [selectedDay, setSelectedDay] = useState();

  const handleDateChange = (selectedDay) => {
    setSelectedDay(selectedDay);
    if (selectedDay) {
      console.log('Selected Date:', selectedDay);
    }
  };


  return (
    <div className="calendar-container">
      <Calendar
        locale={myCustomLocale}
        value={selectedDay}
        onChange={handleDateChange}
        shouldHighlightWeekends
        colorPrimary="#e67e22"
      />
    </div>
  );
};

export default InteractiveCalendar;
