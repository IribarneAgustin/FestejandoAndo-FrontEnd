import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../Assets/Styles/WebSite/WebSite.css';
import '../../Assets/Styles/WebSite/Navbar.css';
import ShoppingCart from './ShoppingCart';

function SubNavBar() {
  const [clicked] = useState(false);



  return (
    <>
      <div className='container-sub-navbar'>
        <Link to='/' className='logo'>
          <img src='/logo.png' alt='logo'></img>
        </Link>
        <nav className={`nav ${clicked ? 'active' : ''}`}>
          <Link to='/' className='nav-link'>
            VOLVER ATRÁS
          </Link>
        </nav>
        <div>
          <ShoppingCart />
        </div>
      </div>
    </>
  );
}

export default SubNavBar;
