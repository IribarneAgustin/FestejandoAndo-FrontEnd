import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../Assets/Styles/WebSite/WebSite.css';
import '../../Assets/Styles/WebSite/Navbar.css';
import BurguerButton from './BurguerButton';

function NavBar({ onNavLinkClick }) {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <>
      <div className='container'>
        <a className='logo'>
          <img src='/logo.png' alt='logo'></img>
        </a>
        <nav className='nav'>
          <Link to='/' className='nav-link'>
            HOME
          </Link>
          <a onClick={() => onNavLinkClick('tematicas')}>TEMATICAS</a>
          <a onClick={() => onNavLinkClick('calendario')}>CALENDARIO</a>
          <a onClick={() => onNavLinkClick('contacto')}>CONTACTO</a>
          <a onClick={() => onNavLinkClick('quienesSomos')}>QUIENES SOMOS</a>
        </nav>
        <div className='burguer'>
          <BurguerButton clicked={clicked} handleClick={handleClick} />
        </div>
      </div>
    </>
  );
}

export default NavBar;
