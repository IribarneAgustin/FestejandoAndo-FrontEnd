import '../Assets/Styles/App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdministratorPanel from './AdministratorPanel';
import WebSite from './WebSite/WebSite';
import TopicDetail from './WebSite/TopicDetail';
import BookingForm from './WebSite/BookingForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/admin' element={<AdministratorPanel />} />
        <Route path='/' element={<WebSite />} />
        <Route path='/tematica/:id' element={<TopicDetail />} />
        <Route path='/bookingForm' element={<BookingForm />} />
      </Routes>
    </Router>
  );
}

export default App;
