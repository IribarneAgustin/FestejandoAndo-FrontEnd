import React, { useState, useEffect } from 'react';
import './BookingList.css';

function BookingList() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    try {
      const response = await fetch('/api/booking/list');

      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      } else {
        throw new Error('Failed to fetch bookings');
      }
    } catch (error) {
      console.log('Error fetching bookings:', error);
    }
  }

  return (
    <div className="container">
      <div>
        <ul className="booking-list">
        <h1>Reservas</h1>
          <li className="booking-list-header"> {/* Add a header row */}
            <h2>Temática</h2>
            <h2>Fecha</h2>
            <h2>Cliente</h2>
            <h2>Seña</h2>
            <h2>Pagado</h2>
            <h2>Confirmado</h2>
            <h2>Precio</h2>
          </li>
          {bookings.map((booking) => (
            <li key={booking.id}>
              <p>{booking.topic.name}</p>
              <p>{booking.date}</p>
              <p>{booking.client.name}</p>
              <p>{booking.deposit}</p>
              <p>{booking.isPaid}</p>
              <p>{booking.confirm}</p>
              <p>{booking.cost}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  
  
}

export default BookingList;
