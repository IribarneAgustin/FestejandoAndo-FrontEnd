import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../Assets/Styles/WebSite/WebSite.css';
import '../../Assets/Styles/WebSite/Navbar.css';
import ShoppingCart from './ShoppingCart';
import { useNavigate } from 'react-router-dom';

function SubNavBar() {
  const [clicked] = useState(false);
  const navigate = useNavigate();

  const home = () => {
    navigate('/');
  };

  return (
    <>
      <div className='container-sub-navbar'>
        <a className='logo'>
          <img onClick={home} src='/logo.png' alt='logo'></img>
        </a>
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
