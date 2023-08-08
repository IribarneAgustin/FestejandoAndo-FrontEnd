import React from 'react';
import { Link } from 'react-router-dom';
import '../../Assets/Styles/WebSite/WebSite.css';
import '../../Assets/Styles/WebSite/Navbar.css';

function NavBar({ onNavLinkClick }) {
  return (
    <>
      <header className='header-area'>
        <div className='container'>
          <a className='logo'>
            <img src='/logo.png' alt='logo'></img>
          </a>
          <nav className='main-nav'>
            <ul className='nav'>
              <li className='scroll-to-section'>
                <Link to='/'>HOME</Link>
              </li>
              <li
                className='scroll-to-section'
                onClick={() => onNavLinkClick('tematicas')}
              >
                <a>TEMATICAS</a>
              </li>
              <li
                className='scroll-to-section'
                onClick={() => onNavLinkClick('calendario')}
              >
                <a>CALENDARIO</a>
              </li>
              <li
                className='scroll-to-section'
                onClick={() => onNavLinkClick('contacto')}
              >
                <a>CONTACTO</a>
              </li>
              <li
                className='scroll-to-section'
                onClick={() => onNavLinkClick('quienesSomos')}
              >
                <a>QUIENES SOMOS</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

export default NavBar;
