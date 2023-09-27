import React from 'react';
import '../../Assets/Styles/WebSite/PopUp.css';
import { useNavigate } from 'react-router-dom';

function CartPopUp({ name, isOpen, onClose }) {
  const navigate = useNavigate();

  const handleInitPurhcase = () => {
    navigate('/bookingForm');
  };

  return (
    <div className={`cart-popUp ${isOpen ? 'open' : ''}`}>
      <div className='popUp-content'>
        <div className='title-popUp'>
          <h2>Temática: {name}</h2>
          <h3>Ha sido agregada al carrito con éxito!</h3>
        </div>
        <button className='purchase-button' onClick={() => handleInitPurhcase()}>
          INICIAR COMPRA
        </button>
        <button className='close-popUp' onClick={onClose}>
          Seguir comprando
        </button>
      </div>
    </div>
  );
}

export default CartPopUp;
