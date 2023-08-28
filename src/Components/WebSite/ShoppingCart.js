import React, { useState } from 'react';
import Modal from 'react-modal';
import { BiShoppingBag } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import '../../Assets/Styles/WebSite/ShoppingCart.css';

Modal.setAppElement('#root');

function ShoppingCart() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <BiShoppingBag className='cart-icon' onClick={openModal} />
      <Modal
        className={`shopping-modal ${modalIsOpen ? 'active' : ''}`}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <div className='shopping-header'>
          <h2>Carrito de compras</h2>
          <IoMdClose className='close-icon' onClick={closeModal} />
        </div>
      </Modal>
    </>
  );
}
export default ShoppingCart;
