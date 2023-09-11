import React, { useState } from 'react';
import { FaShoppingCart, FaStar } from 'react-icons/fa';
import '../../Assets/Styles/WebSite/TopicCards.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../WebSite/Redux/ShoppingAction';
import CartPopUp from './CartPopUp';

export function TopicCards({
  id,
  image,
  name,
  description,
  rating,
  suggestedQuantity,
  suggestionsIds,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems);
  const itemExistsInCart = cartItems.some((item) => item.id === id);
  const [isCartPopUpOpen, setCartPopUpOpen] = useState(false);

  function onClickImage(topicId) {
    navigate(`/tematica/${topicId}`);
  }

  const handleAddToCart = () => {
    const item = { id, name, image, description, suggestedQuantity, suggestionsIds };
    dispatch(addToCart(item)); // Dispatch the addToCart action with the topic data
    setCartPopUpOpen(true);
  };

  return (
    <div className='productList'>
      <div key={id} className='productCard'>
        <img
          onClick={() => onClickImage(id)}
          src={image[0]}
          alt='product-img'
          className='productImage'
        />
        <div className='productCard__content'>
          <h3 className='productName'>{name}</h3>
          <div className='displayStack__1'>
            <div className='productDescription'>{description}</div>
          </div>
          <div className='displayStack__2'>
            <button
              onClick={handleAddToCart}
              disabled={itemExistsInCart}
              className='productCard__button'
            >
              {itemExistsInCart ? 'Agregado ' : 'Agregar al Carrito '}
              <FaShoppingCart />
            </button>
            <div className='productRating'>
              {[...Array(rating)].map((_, index) => (
                <FaStar id={index + 1} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <CartPopUp
        name={name}
        isOpen={isCartPopUpOpen}
        onClose={() => setCartPopUpOpen(false)}
      />
    </div>
  );
}
