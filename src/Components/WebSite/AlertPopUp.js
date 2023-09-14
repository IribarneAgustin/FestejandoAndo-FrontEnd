import React from 'react';
import '../../Assets/Styles/WebSite/BookingForm.css';
import { useNavigate } from 'react-router-dom';

const AlertPopup = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handlePopupClose = () => {
    onClose();
    navigate('/');
  };

  return (
    <div className={`alert-popup ${isOpen ? 'open' : ''}`}>
      <div className='alert-popup-content'>
        <p>
          La reserva fue solicitada correctamente, pronto nos pondremos en contacto para
          continuar
        </p>
        <button className='close-alert-popUp' onClick={handlePopupClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default AlertPopup;
