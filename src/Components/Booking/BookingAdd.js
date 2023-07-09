import React, { useState } from 'react';
import Modal from 'react-modal';
import '../../Assets/Styles/modal.css';
import Select from 'react-select';

Modal.setAppElement('#root');

function BookingAdd({ refreshBookingList, clientList, topicList }) {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [date, setDate] = useState('');
  const [clientId, setClientId] = useState('');
  const [deposit, setDeposit] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [cost, setCost] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]);

  const options = topicList.map((topic) => ({
    value: topic.id,
    label: topic.name,
  }));

  const handleSelectChange = (selectedTopics) => {
    setSelectedTopics(selectedTopics);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    //Getting selected topics
    const topicsToAdd = selectedTopics.map((topic) => ({
      id: topic.value,
    }))


    // Create a new booking object with the form values
    const newBooking = {
      date,
      client: { id: clientId },
      topic: topicsToAdd,
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
      setSelectedTopics([]);
      closeModal();

    } catch (error) {
      console.log(error);
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
        console.log(response);
        window.alert(response);
      })
      .catch((error) => {
        console.error('Error adding booking:', error);
      })
      .finally(() => {
        refreshBookingList();
      });
  };
  
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
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
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </label>
          <br />
          <label>
            <b>Cliente:</b>
            <select value={clientId} onChange={(e) => setClientId(e.target.value)} required>
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
            <b>Temáticas:</b>
            <Select
              options={options}
              isMulti
              value={selectedTopics}
              onChange={handleSelectChange}
              placeholder="Seleccione las temáticas"
            />
          </label>
          <br />
          <label>
            <b>Seña:</b>
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
