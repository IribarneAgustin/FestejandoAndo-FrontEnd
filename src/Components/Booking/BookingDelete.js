import React from 'react';
import PropTypes from 'prop-types';

const BookingDelete = ({ id, bookingData, refreshBookingList }) => {
  const handleDelete = () => {
    const requestOptions = {
      method: 'PUT', //is Logical Deletion
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    };

    fetch(`/api/booking/delete/${id}`, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error('Error deleting booking');
        }
      })
      .then((data) => {
        console.log(data);
        window.alert(data);
      })
      .catch((error) => {
        console.error('Error deleting booking:', error);
      })
      .finally(() => {
        refreshBookingList();
      });
  };

  return <button onClick={handleDelete}>Eliminar</button>;
};

BookingDelete.propTypes = {
  id: PropTypes.number.isRequired,
  bookingData: PropTypes.object.isRequired,
};

export default BookingDelete;
