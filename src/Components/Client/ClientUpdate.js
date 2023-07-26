import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../../Assets/Styles/modal.css';

Modal.setAppElement('#root');

function ClientUpdate({ id, clientData, refreshClientList }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const openModal = () => {
    setModalIsOpen(true);
    setName(clientData.name);
    setLastName(clientData.lastName);
    setEmail(clientData.email);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const clientUpdated = {
      name,
      lastName,
      email,
    };
    try {
      await clientUpdate(clientUpdated);
      closeModal();
      refreshClientList();
    } catch (error) {
      console.log(error);
    }
  };

  const clientUpdate = (clientUpdated) => {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clientUpdated),
    };

    fetch(`/api/client/update/${id}`, requestOptions)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        console.log(data);
        window.alert(data);
      })
      .catch((error) => {
        console.error('Error updating client:', error);
      })
      .finally(() => {
        refreshClientList();
      });
  };

  return (
    <>
      <button onClick={openModal}>Modificar</button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2 className='container'>Modificar cliente</h2>
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
            />
          </label>
          <br />
          <label>
            <b>Email:</b>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            <button type='submit'>Actualizar</button>
            <button className='cancel-button' onClick={closeModal}>
              Cancelar
            </button>
          </label>
        </form>
      </Modal>
    </>
  );
}
export default ClientUpdate;
