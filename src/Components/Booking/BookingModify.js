import React, { useState } from 'react';
import Modal from 'react-modal';
import '../../Assets/Styles/modal.css';
import PropTypes from 'prop-types';
import Select from 'react-select';
Modal.setAppElement('#root');

function BookingModify({ id, bookingData, refreshBookingList, clientList, topicList }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [date, setDate] = useState('');
  const [clientId, setClientId] = useState('');
  const [deposit, setDeposit] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [cost, setCost] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]);

  const openModal = () => {
    setModalIsOpen(true);
    setClientId(bookingData.client.id);
    setDate(bookingData.date);
    setDeposit(bookingData.deposit);
    setIsPaid(bookingData.isPaid);
    setCost(bookingData.cost);
    setSelectedTopics(
      bookingData.topic.map((topic) => ({
        value: topic.id,
        label: topic.name,
      }))
    );
  };

  const options = topicList.map((topic) => ({
    value: topic.id,
    label: topic.name,
  }));

  const handleSelectChange = (selectedTopics) => {
    setSelectedTopics(selectedTopics);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    //Getting selected topics
    const topicsToAdd = selectedTopics.map((topic) => ({
      id: topic.value,
    }));

    // Create a new booking object with the form values
    const bookingUpdated = {
      date,
      client: { id: clientId },
      topic: topicsToAdd,
      deposit: parseInt(deposit),
      isPaid,
      confirm: false,
      cost: parseFloat(cost),
    };

    try {
      await modifyBooking(bookingUpdated);
      closeModal();
      refreshBookingList();
    } catch (error) {
      console.log(error);
    }
  };

  const modifyBooking = (bookingUpdated) => {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingUpdated),
    };

    fetch(`/api/booking/update/${id}`, requestOptions)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        console.log(data);
        window.alert(data);
      })
      .catch((error) => {
        console.error('Error modifying booking:', error);
      })
      .finally(() => {
        refreshBookingList();
      });
  };

  return (
    <>
      <button onClick={openModal}>Modificar</button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2 className='container'>Modificar Reserva</h2>
        <br />
        <form className='modal' onSubmit={handleSubmit}>
          <label>
            <b>Fecha: </b>
            <input
              type='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            <b>Cliente:</b>
            <select
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              required
            >
              <option value=''>Seleccione un cliente...</option>
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
              placeholder='Seleccione las temáticas'
            />
          </label>
          <br />
          <label>
            <b>Deposito:</b>
            <input
              type='number'
              min='0'
              value={deposit}
              onChange={(e) => setDeposit(e.target.value)}
            />
          </label>
          <br />
          <label>
            <b>Precio:</b>
            <input
              type='number'
              min='0'
              step='0.01'
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </label>
          <br />
          <label>
            <b>Pagado:</b>
            <input
              type='checkbox'
              checked={isPaid}
              onChange={(e) => setIsPaid(e.target.checked)}
            />
          </label>
          <br />
          <label>
            <button type='submit'>Modificar</button>
            <button className='cancel-button' onClick={closeModal}>
              Cancelar
            </button>
          </label>
        </form>
      </Modal>
    </>
  );
}

BookingModify.propTypes = {
  id: PropTypes.number.isRequired,
  bookingData: PropTypes.object.isRequired,
};

export default BookingModify;
