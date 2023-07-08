import React, { useState } from 'react';
import '../Assets/Styles/AdministratorPanel.css';
import BookingList from './BookingList';
import ArticleList from './ArticleList';
import TopicList from './TopicList';

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
      <div class='navbar'>
        <div class='dropdown'>
          <button class='dropbtn' onClick={handleListClientsClick}>
            Clientes
            <i class='fa fa-caret-down'></i>
          </button>
          <div class='dropdown-content'></div>
        </div>
        <div class='dropdown'>
          <button class='dropbtn' onClick={handleListBookingClick}>
            Reservas
            <i class='fa fa-caret-down'></i>
          </button>
          <div class='dropdown-content'></div>
        </div>
        <div class='dropdown'>
          <button class='dropbtn' onClick={handleListTopicsClick}>
            Temáticas
            <i class='fa fa-caret-down'></i>
          </button>
          <div class='dropdown-content'></div>
        </div>
        <div class='dropdown'>
          <button class='dropbtn' onClick={handleListArticlesClick}>
            Artículos
            <i class='fa fa-caret-down'></i>
          </button>
          <div class='dropdown-content'></div>
        </div>
      </div>
      {showTopicList && <TopicList />}
      {showBookingList && <BookingList />}
      {showArticleList && <ArticleList />}
    </div>
  );
}

export default AdministratorPanel;
