import React, { useState } from 'react';
import Modal from 'react-modal';
import '../../Assets/Styles/modal.css';
import PropTypes from 'prop-types';
import Select from 'react-select';
import DatePicker, { registerLocale } from 'react-datepicker';
import el from 'date-fns/locale/es';
Modal.setAppElement('#root');
registerLocale('el', el);


function BookingModify({ id, bookingData, refreshBookingList, clientList, topicList }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [clientId, setClientId] = useState('');
  const [deposit, setDeposit] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [cost, setCost] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedEmail, setSelectedEmail] =  useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [suggestedChildrenQuantity, setSuggestedChildrenQuantity] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');


  const openModal = () => {
    setModalIsOpen(true);
    setDescription(bookingData.description)
    setAddress(bookingData.address);
    setSuggestedChildrenQuantity(bookingData.quantity);
    setClientId(bookingData.client.id);
    setSelectedDate(removeTimestamp(bookingData.date));
    setIsPaid(bookingData.isPaid);
    setCost(bookingData.cost);
    setSelectedEmail(bookingData.client.email);
    setDeposit(bookingData.deposit)
    setSelectedTopics(
      bookingData.topic.map((topic) => ({
        value: topic.id,
        label: topic.name,
      }))
    );
  };

  function removeTimestamp(dateString) {
    const originalDate = new Date(dateString);
    const newDate = new Date(originalDate.getFullYear(), originalDate.getMonth(), originalDate.getDate());
    return newDate;
  }

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
      description,
      quantity: suggestedChildrenQuantity,
      address,
      date: selectedDate,
      client: { id: clientId, email: selectedEmail },
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
        <b>Fecha</b>
            <DatePicker
                  locale='el'
                  placeholderText='Fecha'
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat='dd/MM/yyyy'
                  minDate={new Date()}
                  required
                />
          <b>Cliente</b>
          <br />
          <label>
            <select
              value={clientId}
              onChange={(e) => { 
                setClientId(e.target.value)
                setSelectedEmail(e.target.options[e.target.selectedIndex].getAttribute("data-email"));
              }}
              required
            >
              <option value=''>Seleccione un cliente...</option>
              {clientList.map((client) => (
                <option key={client.id} value={client.id} data-email={client.email}>
                  {client.name}
                </option>
              ))}
            </select>
          </label>
          <b>Temáticas</b>
          <br />
          <label>
            <Select
              options={options}
              isMulti
              value={selectedTopics}
              onChange={handleSelectChange}
              placeholder='Seleccione las temáticas'
            />
          </label>
          <b>Seña</b>
          <br />
          <label>
            <input
              type='number'
              min='0'
              value={deposit}
              onChange={(e) => setDeposit(e.target.value)}
            />
          </label>
          <b>Precio</b>
          <br />
          <label>
            <input
              type='number'
              min='0'
              step='0.01'
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </label>
          <b>Pagado</b>
          <br />
          <label>
            <input
              type='checkbox'
              checked={isPaid}
              onChange={(e) => setIsPaid(e.target.checked)}
            />
          </label>
          <b>Cantidad de niños sugerida</b>
          <br />
          <label>
            <input
              type='number'
              min='0'
              value={suggestedChildrenQuantity}
              onChange={(e) => setSuggestedChildrenQuantity(e.target.value)}
            />
          </label>
          <b>Direccion</b>
          <br />
          <label>
            <input
              type='text'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          <b>Descripción</b>
          <br />
          <label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ resize: 'none' }}
            />
          </label>
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
