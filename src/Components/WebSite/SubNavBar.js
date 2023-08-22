import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../Assets/Styles/WebSite/WebSite.css';
import '../../Assets/Styles/WebSite/Navbar.css';
import BurguerButton from './BurguerButton';

function SubNavBar() {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(!clicked);
  };
  return (
    <>
      <div className='container-navbar'>
        <a className='logo'>
          <img src='/logo.png' alt='logo'></img>
        </a>
        <nav className={`nav ${clicked ? 'active' : ''}`}>
          <Link to='/' className='nav-link'>
            VOLVER ATRÁS
          </Link>
        </nav>
        <div className='burguer'>
          <BurguerButton clicked={clicked} handleClick={handleClick} />
        </div>
        <div className={`initial ${clicked ? 'active' : ''}`}></div>
      </div>
    </>
  );
}

export default SubNavBar;
