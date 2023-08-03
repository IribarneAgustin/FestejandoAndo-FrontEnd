import '../Assets/Styles/App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdministratorPanel from './AdministratorPanel';
import WebSite from './WebSite';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdministratorPanel />} />
        <Route path="/" element={<WebSite />} />
      </Routes>
    </Router>
  );
}

export default App;
