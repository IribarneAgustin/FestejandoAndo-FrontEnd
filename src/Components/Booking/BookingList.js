import React, { useState, useEffect } from 'react';
import '../../Assets/Styles/List.css';
import BookingAdd from './BookingAdd';
import BookingDelete from './BookingDelete';
import BookingModify from './BookingModify';
import BookingConfirm from './BookingConfirm';
import BookingCancel from './BookingCancel';

function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [topicList, setTopics] = useState([]);
  const [showHistory, setShowHistory] = useState([]);
  const [showCurrents, setShowCurrents] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    fetchClientList();
  }, []);

  useEffect(() => {
    fetchTopicList();
  }, []);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchClientList = async () => {
    try {
      const response = await fetch('/api/client/list');

      if (response.ok) {
        const data = await response.json();
        setClientList(data);
        console.log(data);
      } else {
        throw new Error('Failed to fetch clients');
      }
    } catch (error) {
      console.log('Error fetching clients:', error);
    }
  };

  async function fetchBookings() {
    try {
      const response = await fetch('/api/booking/list');

      if (response.ok) {
        const data = await response.json();
        setBookings(data);
        setShowCurrents(data);
      } else {
        throw new Error('Failed to fetch bookings');
      }
    } catch (error) {
      console.log('Error fetching bookings:', error);
    }
  }

  async function fetchHistory() {
    try {
      const response = await fetch('/api/booking/listHistory');

      if (response.ok) {
        const data = await response.json();
        setShowHistory(data);
      } else {
        throw new Error('Failed to fetch bookings');
      }
    } catch (error) {
      console.log('Error fetching bookings:', error);
    }
  }

  async function fetchTopicList() {
    try {
      const response = await fetch('/api/topic/list');

      if (response.ok) {
        const data = await response.json();
        setTopics(data);
      } else {
        throw new Error('Failed to fetch topics');
      }
    } catch (error) {
      console.log('Error fetching topics:', error);
    }
  }

  function handleClickBookingHistory() {
    setBookings(showHistory);
  }

  function handleClickBookingActive() {
    setBookings(showCurrents);
  }

  function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  }

  return (
    <div className='container'>
      <div>
        <ul className='list'>
          <h1>Reservas</h1>
          <div className='button-alignment'>
            {
              <BookingAdd
                refreshBookingList={fetchBookings}
                clientList={clientList}
                topicList={topicList}
              />
            }
          </div>
          <button className='button-see-history' onClick={handleClickBookingHistory}>
            Ver Historial
          </button>
          <button className='button-see-history' onClick={handleClickBookingActive}>
            Ver Actuales
          </button>
          <hr></hr>
          <li className='list-header-booking'>
            <h3>Temática</h3>
            <h3>Fecha</h3>
            <h3>Cliente</h3>
            <h3>Precio</h3>
            <h3>Seña</h3>
            <h3 className='visually-hidden'>Hidden</h3>
            <h3 className='visually-hidden'>Hidden</h3>
            <h3>Reserva</h3>
            <h3>Estado</h3>
          </li>
          {bookings.map((booking) => (
            <li className='list-item-booking' key={booking.id}>
              <p>{booking.topic.map((topic) => topic.name).join(', ')}</p>
              <p>{formatDate(booking.date)}</p>
              <p>{booking.client.name}</p>
              <p>{booking.cost}</p>
              <p>{booking.deposit}</p>
              <p>
                {
                  <BookingModify
                    id={booking.id}
                    bookingData={booking}
                    refreshBookingList={fetchBookings}
                    clientList={clientList}
                    topicList={topicList}
                  />
                }
              </p>
              <p>
                {
                  <BookingDelete
                    id={booking.id}
                    bookingData={booking}
                    refreshBookingList={fetchBookings}
                  />
                }
              </p>
              <p className='buttons-booking'>
                <BookingConfirm id={booking.id} refreshBookingList={fetchBookings} />
                <BookingCancel id={booking.id} refreshBookingList={fetchBookings} />
              </p>
              <p className='status-booking'>
                {booking.confirm ? 'Confirmada' : 'No confirmada'}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BookingList;
