import { useState } from 'react';
import Modal from 'react-modal';
import { FiTrash } from 'react-icons/fi';
import { BiShoppingBag } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import '../../Assets/Styles/WebSite/ShoppingCart.css';
import { useSelector, useDispatch } from 'react-redux';
import { deleteFromCart, clearCart } from '../WebSite/Redux/ShoppingAction';

Modal.setAppElement('#root');

function ShoppingCart() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const cartItems = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();

  const handleDeleteFromCart = (id) => {
    dispatch(deleteFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <div className='cart-icon' onClick={openModal}>
        <BiShoppingBag />
      </div>
      <Modal
        className={`shopping-modal ${modalIsOpen ? 'active' : ''}`}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <div className='shopping-header'>
          <h2>Carrito de compras</h2>
          <IoMdClose className='close-icon' onClick={closeModal} />
        </div>
        <div className='shopping-container'>
          <div className='cart-items'>
            {cartItems.map((item) => (
              <div key={item.id} className='saved-topic'>
                <img src={item.image[0]} alt='topic-img' className='topic-image'></img>
                <p className='topic-name'>{item.name}</p>
                <button
                  onClick={() => handleDeleteFromCart(item.id)}
                  className='remove-icon'
                >
                  <FiTrash />
                </button>
              </div>
            ))}
          </div>
          <div className='shopping-footer'>
            <button className='clean-cart-button' onClick={() => handleClearCart()}>
              Vaciar carrito
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
export default ShoppingCart;
