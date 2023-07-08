import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../Assets/Styles/modal.css';
Modal.setAppElement('#root');

function BookingAdd({ refreshBookingList }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [date, setDate] = useState('');
  const [clientId, setClientId] = useState('');
  const [deposit, setDeposit] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [cost, setCost] = useState('');
  const [clientList, setClientList] = useState([]);

  useEffect(() => {
    fetchClientList();
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a new booking object with the form values
    const newBooking = {
      date,
      client: { id: clientId },
      topic: [{ id: 1 }],
      deposit: parseInt(deposit),
      isPaid,
      confirm: false,
      cost: parseFloat(cost),
    };

    try {
      // Call addBooking method with bookingData
      await addBooking(newBooking);

      // Reset the form fields
      setDate('');
      setClientId('');
      setDeposit('');
      setIsPaid(false);
      setCost('');

      closeModal();

      // TODO: Redirect the user or show a success message
    } catch (error) {
      // TODO: Handle the error appropriately (e.g., show an error message)
    }
  };

  const addBooking = (bookingData) => {
    fetch('/api/booking/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    })
      .then((response) => response.text())
      .then((response) => {
        if (response.ok) {
          console.log(response);
          window.alert(response);
        } else {
          response.replace(/\[|\]/g, '');
          window.alert('Revise los siguientes errores: '+ response);
        }
      })
      .catch((error) => {
        console.error('Error adding booking:', error);
      }).finally(() => {
        refreshBookingList();
      });
  };


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

  return (
    <div>
      <button onClick={openModal}>Agregar</button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2 className="container">Nueva Reserva</h2>
        <br />
        <form className="modal" onSubmit={handleSubmit}>
          <label>
            <b>Fecha: </b>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
          <br />
          <label>
            <b>Cliente:</b>
            <select value={clientId} onChange={(e) => setClientId(e.target.value)}>
              <option value="">Seleccione un cliente..</option>
              {clientList.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            <b>Deposito:</b>
            <input type="number" min="0" value={deposit} onChange={(e) => setDeposit(e.target.value)} />
          </label>
          <br />
          <label>
            <b>Precio:</b>
            <input type="number" min="0" value={cost} onChange={(e) => setCost(e.target.value)} />
          </label>
          <br />
          <label>
            <b>Pagado:</b>
            <input type="checkbox" checked={isPaid} onChange={(e) => setIsPaid(e.target.checked)} />
          </label>
          <br />
          <label>
            <button type="submit">Reservar</button>
            <button className="cancel-button" onClick={closeModal}>
              Cancelar
            </button>
          </label>
        </form>
      </Modal>
    </div>
  );
}

export default BookingAdd;
