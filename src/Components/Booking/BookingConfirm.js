import React, { useState } from 'react';

function BookingConfirm({ id, refreshBookingList }) {
  const [isConfirm, setIsConfirm] = useState(false);

  const handleConfirmBooking = async () => {
    try {
      setIsConfirm(true);
      const response = await fetch(`/api/booking/confirm/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(true),
      });
      if (response.ok) {
        window.alert('Se ha confirmado la reserva');
        console.log('Se ha confirmado la reserva');
        refreshBookingList();
      } else {
        console.error('Error modifying booking');
      }
    } catch (error) {
      console.error('Error when trying to confirm booking:', error);
    } finally {
      setIsConfirm(false);
    }
  };

  return (
    <button className='update-button' onClick={handleConfirmBooking} disabled={isConfirm}>
      Confirmar
    </button>
  );
}

export default BookingConfirm;
