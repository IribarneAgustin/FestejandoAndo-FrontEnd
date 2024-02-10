import React, { useState } from 'react';

function BookingCancel({ id, refreshBookingList }) {
  const [isCancel, setIsCancel] = useState(false);

  const handleCancelBooking = async () => {
    try {
      setIsCancel(true);
      const response = await fetch(`/api/booking/cancel/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ confirm: true }),
      });
      if (response.ok) {
        window.alert('Se ha cancelado la reserva');
        console.log('Se ha cancelado la reserva');
        refreshBookingList();
      } else {
        console.error('Error modifying booking');
      }
    } catch (error) {
      console.error('Error when trying to cancel booking:', error);
    } finally {
      setIsCancel(false);
    }
  };

  return (
    <button className='red-button' onClick={handleCancelBooking} disabled={isCancel}>
      Cancelar
    </button>
  );
}

export default BookingCancel;
