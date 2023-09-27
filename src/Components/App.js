import '../Assets/Styles/App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdministratorPanel from './AdministratorPanel';
import WebSite from './WebSite/WebSite';
import TopicDetail from './WebSite/TopicDetail';
import BookingForm from './WebSite/BookingForm';
import store from './../Components/WebSite/Redux/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/admin' element={<AdministratorPanel />} />
          <Route path='/' element={<WebSite />} />
          <Route path='/tematica/:id' element={<TopicDetail />} />
          <Route path='/bookingForm' element={<BookingForm />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
