import React, { useState, useEffect } from 'react';
import '../Assets/Styles/AdministratorPanel.css';
import BookingList from './Booking/BookingList';
import TopicList from './Topic/TopicList';
import ArticleList from './Article/ArticleList';
import ClientList from './Client/ClientList';
import { useNavigate } from 'react-router-dom';
import Navbar from './AdminPanel/Navbar';

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
    <>
      <Navbar
        clientsClick={handleListClientsClick}
        bookingsClick={handleListBookingClick}
        topicsClick={handleListTopicsClick}
        articlesClick={handleListArticlesClick}
      ></Navbar>
      <br></br>
      {showClientList && <ClientList />}
      {showTopicList && <TopicList />}
      {showBookingList && <BookingList />}
      {showArticleList && <ArticleList />}
    </>
  );
}

export default AdministratorPanel;
