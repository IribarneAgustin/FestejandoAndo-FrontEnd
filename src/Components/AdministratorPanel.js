import React, { useState, useEffect } from 'react';
import '../Assets/Styles/AdministratorPanel.css';
import BookingList from './Booking/BookingList';
import TopicList from './Topic/TopicList';
import ArticleList from './Article/ArticleList';
import ClientList from './Client/ClientList';
import { useNavigate } from 'react-router-dom';
import { FaPowerOff } from 'react-icons/fa';

function AdministratorPanel() {
  const [showBookingList, setShowBookingList] = useState(false);
  const [showClientList, setShowClientList] = useState(false);
  const [showArticleList, setShowArticleList] = useState(false);
  const [showTopicList, setShowTopicList] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLoginForm();
  }, []);

  //We are using basic auth with navigator form
  async function fetchLoginForm() {
    try {
      const response = await fetch('/api/', {
        method: 'GET',
      });

      if (!response.ok) {
        console.log('login failed');
        navigate('/');
      } else {
        setShowClientList(true);
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  const logout = () => {
    navigate('/');
  };

  const handleListBookingClick = () => {
    setShowClientList(false);
    setShowTopicList(false);
    setShowArticleList(false);
    setShowBookingList(true);
  };

  const handleListClientsClick = () => {
    setShowBookingList(false);
    setShowTopicList(false);
    setShowArticleList(false);
    setShowClientList(true);
  };

  const handleListTopicsClick = () => {
    setShowBookingList(false);
    setShowClientList(false);
    setShowArticleList(false);
    setShowTopicList(true);
  };

  const handleListArticlesClick = () => {
    setShowBookingList(false);
    setShowClientList(false);
    setShowTopicList(false);
    setShowArticleList(true);
  };

  return (
    <div className='admin-panel'>
      <div className='navbar'>
        <div className='dropdown'>
          <button className='dropbtn' onClick={handleListClientsClick}>
            Clientes
          </button>
          <div className='dropdown-content'></div>
        </div>
        <div className='dropdown'>
          <button className='dropbtn' onClick={handleListBookingClick}>
            Reservas
          </button>
          <div className='dropdown-content'></div>
        </div>
        <div className='dropdown'>
          <button className='dropbtn' onClick={handleListTopicsClick}>
            Temáticas
          </button>
          <div className='dropdown-content'></div>
        </div>
        <div className='dropdown'>
          <button className='dropbtn' onClick={handleListArticlesClick}>
            Artículos
          </button>
          <div className='dropdown-content'></div>
        </div>
        <div className='dropdown'>
          <button className='dropbtn logout-button' onClick={logout}>
            <FaPowerOff />
            <br></br>Salir
          </button>
          <div className='dropdown-content'></div>
        </div>
      </div>
      {showClientList && <ClientList />}
      {showTopicList && <TopicList />}
      {showBookingList && <BookingList />}
      {showArticleList && <ArticleList />}
    </div>
  );
}

export default AdministratorPanel;
