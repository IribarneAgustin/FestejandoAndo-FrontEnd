import React, { useState } from 'react';
import './AdministratorPanel.css';
import BookingList from './BookingList';

function AdministratorPanel() {

  const [showBookingList, setShowBookingList] = useState(false);
  const [showClientList, setShowClientList] = useState(false);

  const handleListBookingClick = () => {
    setShowClientList(false);
    setShowBookingList(true);

  };

  const handleListClientsClick = () => {
    setShowBookingList(false);
    setShowClientList(true);

  };



  return (
    <div className="admin-panel">
      <div class="navbar">
        <div class="dropdown">
          <button class="dropbtn">Clientes
            <i class="fa fa-caret-down"></i>
          </button>
          <div class="dropdown-content">
            <a href="#">Link 1</a>
          </div>
        </div>
        <div class="dropdown">
          <button class="dropbtn">Reservas
            <i class="fa fa-caret-down"></i>
          </button>
          <div class="dropdown-content">
            <a onClick={handleListClientsClick}>Agregar</a>
            <a onClick={handleListBookingClick}>Listar</a>
          </div>
        </div>
      </div>
      {showBookingList && <BookingList />}
    </div>

  );

}

export default AdministratorPanel;
