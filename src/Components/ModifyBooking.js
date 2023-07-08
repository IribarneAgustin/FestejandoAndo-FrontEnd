import React, { useState, useEffect } from 'react';

function ModifyBooking({ id }) {
  const [booking, setBooking] = useState({
    date: '',
    clientId: '',
    topicIds: [],
    deposit: '',
    isPaid: false,
    confirm: false,
    cost: ''
  });

  useEffect(() => {
    fetchBooking();
  }, []);

  async function fetchBooking() {
    try {
      const response = await fetch(`/api/booking/${id}`);

      if (response.ok) {
        const data = await response.json();
        setBooking({
          date: data.date,
          clientId: data.client.id,
          topicIds: data.topic.map(topic => topic.id),
          deposit: data.deposit,
          isPaid: data.isPaid,
          confirm: data.confirm,
          cost: data.cost
        });
      } else {
        throw new Error('Failed to fetch booking');
      }
    } catch (error) {
      console.log('Error fetching booking:', error);
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBooking(prevBooking => ({
      ...prevBooking,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // TODO: Perform form validation

    try {
      const response = await fetch(`/api/booking/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(booking)
      });

      if (response.ok) {
        console.log('Booking updated successfully');
        // TODO: Redirect or perform any other action upon successful update
      } else {
        console.log('Error updating booking');
        // TODO: Handle the error appropriately (e.g., show an error message)
      }
    } catch (error) {
      console.log('Fetch error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Modify Booking</h1>
      <label>
        Date:
        <input type="date" name="date" value={booking.date} onChange={handleChange} />
      </label>
      <label>
        Client ID:
        <input type="text" name="clientId" value={booking.clientId} onChange={handleChange} />
      </label>
      <label>
        Topic IDs:
        <input type="text" name="topicIds" value={booking.topicIds.join(',')} onChange={handleChange} />
      </label>
      <label>
        Deposit:
        <input type="number" name="deposit" value={booking.deposit} onChange={handleChange} />
      </label>
      <label>
        Is Paid:
        <input type="checkbox" name="isPaid" checked={booking.isPaid} onChange={handleChange} />
      </label>
      <label>
        Confirm:
        <input type="checkbox" name="confirm" checked={booking.confirm} onChange={handleChange} />
      </label>
      <label>
        Cost:
        <input type="number" name="cost" value={booking.cost} onChange={handleChange} />
      </label>
      <button type="submit">Update</button>
    </form>
  );
}

export default ModifyBooking;
