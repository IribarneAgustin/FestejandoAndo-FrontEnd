import React, { useState } from 'react';
import Modal from 'react-modal';
import '../../Assets/Styles/modal.css';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import LoadingSpinner from '../Loading/LoadingSpinner';
Modal.setAppElement('#root');

function BookingAdd({ refreshBookingList, clientList, topicList }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [clientId, setClientId] = useState('');
  const [deposit, setDeposit] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [cost, setCost] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [suggestedChildrenQuantity, setSuggestedChildrenQuantity] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [selectedEmail, setSelectedEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const options = topicList.map((topic) => ({
    value: topic.id,
    label: topic.name,
  }));

  const handleSelectChange = (selectedTopics) => {
    setSelectedTopics(selectedTopics);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try{
    //Getting selected topics
    const topicsToAdd = selectedTopics.map((topic) => ({
      id: topic.value,
    }));

    // Create a new booking object with the form values
    const newBooking = {
      address,
      description,
      quantity: suggestedChildrenQuantity,
      date: selectedDate,
      client: { id: clientId, email: selectedEmail },
      topic: topicsToAdd,
      deposit: parseInt(deposit),
      isPaid,
      confirm: false,
      cost: parseFloat(cost),
    };

      await addBooking(newBooking);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      closeModal();
    }
  };

  function cleanForm() {
    setSuggestedChildrenQuantity('');
    setAddress('');
    setDescription('');
    setSelectedDate('');
    setClientId('');
    setDeposit('');
    setIsPaid(false);
    setCost('');
    setSelectedTopics([]);
  }

  const addBooking = async (bookingData) => {
    try {
      const response = await fetch('/api/booking/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });
  
      if (!response.ok) {
        throw new Error(`Error adding booking: ${response.statusText}`);
      }
  
      const result = await response.text();
      console.log(result);
      window.alert(result);
      refreshBookingList();
    } catch (error) {
      console.error('Error adding booking:', error);
    }
  };
  

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    cleanForm();
  };

  return (
    <div>
      <button onClick={openModal}>Agregar</button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2 className='container'>Nueva Reserva</h2>
        <br />
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <form className='modal' onSubmit={handleSubmit}>
            <b>Fecha</b>
            <div>
              <DatePicker
                locale='el'
                placeholderText='Fecha'
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat='dd/MM/yyyy'
                minDate={new Date()}
                required
              />
            </div>
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
              />
            </label>
            <label>
              <button type='submit'>Reservar</button>
              <button className='cancel-button' onClick={closeModal}>
                Cancelar
              </button>
            </label>
          </form>
        )}
      </Modal>
    </div>
  );
}

export default BookingAdd;
