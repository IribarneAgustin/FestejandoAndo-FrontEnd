import React, { useState } from 'react';
import Modal from 'react-modal';
import '../../Assets/Styles/modal.css';

Modal.setAppElement('#root');

function ClientAdd({ refreshClientList }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newClient = {
      name,
      lastName,
      email,
    };

    try {
      await addClient(newClient);

      setName('');
      setLastName('');
      setEmail('');
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const addClient = (clientData) => {
    fetch('/api/client/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clientData),
    })
      .then((response) => response.text())
      .then((response) => {
        console.log(response);
        window.alert(response);
      })
      .catch((error) => {
        console.error('Error adding client:', error);
      })
      .finally(() => {
        refreshClientList();
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
        <h2 className='container'>Nuevo cliente</h2>
        <br />
        <form className='modal' onSubmit={handleSubmit}>
          <label>
            <b>Nombre:</b>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            <b>Apellido:</b>
            <input
              type='text'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            <b>Email:</b>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <label>
            <button type='submit'>Guardar</button>
            <button className='cancel-button' onClick={closeModal}>
              Cancelar
            </button>
          </label>
        </form>
      </Modal>
    </div>
  );
}

export default ClientAdd;
