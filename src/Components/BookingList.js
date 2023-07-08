import React, { useState, useEffect } from 'react';
import '../Assets/Styles/List.css';
import BookingAdd from './BookingAdd';
import BookingDelete from './BookingDelete';

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

  async function onClickModify(id) {
    const endpoint = `/api/booking/update/${id}`;

    try {
      const response = await fetch(endpoint);

      if (response.ok) {
        console.log('Booking updated successfully');
      } else {
        console.log('Error updating booking');
      }
    } catch (error) {
      console.log('Fetch error:', error);
    }
  }

  return (
    <div className='container'>
      <div>
        <ul className='list'>
          <h1>Reservas</h1>
          {<BookingAdd refreshBookingList={fetchBookings}/>}
          <hr></hr>
          <li className='list-header'>
            {' '}
            {/* Add a header row */}
            <h3>Temática</h3>
            <h3>Fecha</h3>
            <h3>Cliente</h3>
            <h3>Precio</h3>
          </li>
          {bookings.map((booking) => (
            <li key={booking.id}>
              <p>{booking.topic.name}</p>
              <p>{booking.date}</p>
              <p>{booking.client.name}</p>
              <p>{booking.cost}</p>
              <p>
                <button className="update-button" onClick={() => onClickModify(booking.id)}>Modificar</button>
              </p>
              <p>
                {<BookingDelete id={booking.id}  bookingData={booking} refreshBookingList={ fetchBookings }/>}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BookingList;
