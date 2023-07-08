import React from 'react';
import '../Assets/Styles/WebSite.css'; // CSS file for component styles

function WebSite() {
  return (
    <div className='website-container'>
      <nav className='navbar'>
        <ul className='navbar-list'>
          <li className='navbar-item'>
            <a href='/'>Home</a>
          </li>
          <li className='navbar-item'>
            <a href='/about'>About</a>
          </li>
          <li className='navbar-item'>
            <a href='/services'>Services</a>
          </li>
          <li className='navbar-item'>
            <a href='/contact'>Contact</a>
          </li>
        </ul>
      </nav>

      <div className='content'>
        {/* Content of the website */}
        <h1>FESTEJANDO ANDO</h1>
        <p>This is the main content of the website.</p>
      </div>

      <footer className='footer'>
        <p>&copy; {new Date().getFullYear()} My Website. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default WebSite;
