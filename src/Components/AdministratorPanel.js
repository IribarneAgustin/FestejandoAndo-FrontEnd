import React, { useState } from 'react';
import '../Assets/Styles/AdministratorPanel.css';
import BookingList from './Booking/BookingList';
import ArticleList from './ArticleList';
import TopicList from './Topic/TopicList';

function AdministratorPanel() {
  const [showBookingList, setShowBookingList] = useState(false);
  const [showClientList, setShowClientList] = useState(false);
  const [showArticleList, setShowArticleList] = useState(false);
  const [showTopicList, setShowTopicList] = useState(false);

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
            <i className='fa fa-caret-down'></i>
          </button>
          <div className='dropdown-content'></div>
        </div>
        <div className='dropdown'>
          <button className='dropbtn' onClick={handleListBookingClick}>
            Reservas
            <i className='fa fa-caret-down'></i>
          </button>
          <div className='dropdown-content'></div>
        </div>
        <div className='dropdown'>
          <button className='dropbtn' onClick={handleListTopicsClick}>
            Temáticas
            <i className='fa fa-caret-down'></i>
          </button>
          <div className='dropdown-content'></div>
        </div>
        <div className='dropdown'>
          <button className='dropbtn' onClick={handleListArticlesClick}>
            Artículos
            <i className='fa fa-caret-down'></i>
          </button>
          <div className='dropdown-content'></div>
        </div>
      </div>
      {showTopicList && <TopicList />}
      {showBookingList && <BookingList />}
      {showArticleList && <ArticleList />}
    </div>
  );
  
}

export default AdministratorPanel;
