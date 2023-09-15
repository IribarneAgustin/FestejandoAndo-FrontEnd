import React, { useState, useEffect } from 'react';
import '../../Assets/Styles/WebSite/BookingForm.css';
import { useForm } from 'react-hook-form';
import bgImg from '../../Assets/Styles/Images/tina.png';
import Layout from './Layout';
import DatePicker, { registerLocale } from 'react-datepicker';
import el from 'date-fns/locale/es';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../WebSite/Redux/ShoppingAction';
import ReCAPTCHA from 'react-google-recaptcha';
import LoadingSpinner from '../Loading/LoadingSpinner';
import AlertPopup from './AlertPopUp';
registerLocale('el', el);

const BookingForm = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const cartItems = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [captchaValue, setCaptchaValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    cartItems.forEach((item) => {
      fetchSuggestionsByTopic(item.id);
    });
  }, [cartItems]);

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);

    const client = {
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
    };

    const suggestionNames = suggestions
      .filter((suggestion) => checkedItems.includes(suggestion.id))
      .map((suggestion) => suggestion.name)
      .join(', ');

    console.log(suggestionNames);

    const bookingData = {
      suggestionNames: suggestionNames,
      quantity: data.quantity,
      address: data.address,
      description: data.description,
      date: selectedDate,
      client: client,
      confirm: false,
      isPaid: false,
      cost: null,
      topic: cartItems,
    };

    try {
      await saveData(bookingData);
    } catch (error) {
      console.error('An error occurred', error);
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  async function saveData(bookingData) {
    try {
      await fetch('/api/booking/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      })
        .then((response) => response.text())
        .then((response) => {
          console.log(response);
          setIsPopupOpen(true);
        })
        .catch((error) => {
          console.error('Error ', error);
          alert(error);
        });
    } catch (error) {
      console.error('An error occurred', error);
      alert(error);
    } finally {
      dispatch(clearCart());
      setIsLoading(false);
    }
  }

  async function fetchSuggestionsByTopic(id) {
    try {
      const response = await fetch(`/api/article/listSuggestedArticlesByTopic/${id}`);

      if (response.ok) {
        const newData = await response.json();
        setSuggestions((prevData) => {
          const existingSuggestionIds = new Set(prevData.map((item) => item.id));
          const uniqueSuggestions = newData.filter(
            (item) => !existingSuggestionIds.has(item.id)
          );
          return [...prevData, ...uniqueSuggestions];
        });
      } else {
        throw new Error('Failed to fetch topics');
      }
    } catch (error) {
      console.log('Error fetching topics:', error);
    }
  }

  const handleCheckboxChange = (itemId) => {
    if (checkedItems.includes(itemId)) {
      setCheckedItems(checkedItems.filter((id) => id !== itemId));
    } else {
      setCheckedItems([...checkedItems, itemId]);
    }
  };

  return (
    <Layout showSubNav={true}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className='BookingForm'>
          <div className='register'>
            <div className='col-1'>
              <h2>Solicitar Reserva</h2>
              <span>
                Completá tus datos y pronto te enviaremos un presupuesto adaptado para vos
              </span>
              <form
                id='form'
                className='flex flex-col'
                onSubmit={(e) => {
                  handleSubmit((data) => {
                    if (captchaValue) {
                      onSubmit(data);
                    } else {
                      alert('Por favor, complete el reCAPTCHA');
                    }
                  })(e);
                }}
              >
                <input type='text' {...register('name')} placeholder='Nombre' />
                <input type='email' {...register('email')} placeholder='Email' required />
                <input type='text' {...register('phoneNumber')} placeholder='Teléfono' />
                <input
                  type='number'
                  min='0'
                  {...register('quantity')}
                  placeholder='Cantidad de niños estimada'
                  required
                />
                <input
                  type='text'
                  {...register('address')}
                  placeholder='Dirección del evento'
                  required
                />
                <DatePicker
                  locale='el'
                  placeholderText='Fecha'
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat='dd/MM/yyyy'
                  minDate={new Date()}
                  required
                />
                <textarea
                  type='text'
                  {...register('description')}
                  placeholder='Comentarios...'
                />
                <div className='cart-items'>
                  <h4>Temáticas a reservar</h4>
                  <p className='topic-name'>
                    {cartItems.map((item, index) => (
                      <span key={item.id}>
                        {item.name}
                        {index !== cartItems.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </p>
                </div>
                <div>
                  {suggestions.length > 0 && (
                    <h4>Se sugieren agregar los siguientes artículos</h4>
                  )}
                  <div>
                    {suggestions.map((item, index) => (
                      <span key={`suggestion-${item.id}`}>
                        <input
                          type='checkbox'
                          checked={checkedItems.includes(item.id)}
                          onChange={() => handleCheckboxChange(item.id)}
                        />
                        <span>{item.name}</span>
                        {index !== suggestions.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </div>
                </div>
                <div className='captcha-festejando'>
                  <ReCAPTCHA
                    sitekey='6LcdQP0nAAAAALIiPuoEd1nGtoFtUZ3_fE6maEe7'
                    onChange={handleCaptchaChange}
                  />
                </div>
                <button type='submit' className='btn'>
                  SOLICITAR RESERVA
                </button>
              </form>
            </div>
            <div className='col-2'>
              <img src={bgImg} alt='' />
            </div>
          </div>
        </div>
      )}
      {isPopupOpen && (
        <AlertPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
      )}
    </Layout>
  );
};

export default BookingForm;
