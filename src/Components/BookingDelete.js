import React from 'react';
import PropTypes from 'prop-types';

const BookingDelete = ({ id, bookingData, refreshBookingList }) => {

    const handleDelete = () => {
        const requestBody = {
          id: id,
          booking: bookingData,
        };
      
        const requestOptions = {
          method: 'PUT', //is Logical Deletion
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        };
      
        fetch(`/api/booking/delete/${id}`, requestOptions)
        .then((response) => {
          if (response.ok) {
            // Handle successful deletion
            return response.text(); // Parse the response body
          } else {
            // Handle error condition
            throw new Error('Error deleting booking');
          }
        })
        .then((data) => {
          console.log(data); // Response data
          window.alert(data);
        })
        .catch((error) => {
          console.error('Error deleting booking:', error);
          // Handle the error condition appropriately
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
