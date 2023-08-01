import React from 'react';

function NavBar() {
  return (
    <>
      <nav className='navbar'>
        <ul className='navbar-list'>
          <li className='navbar-item'>
            <a>TEMATICAS</a>
          </li>
          <li className='navbar-item'>
            <a href='/about'>CALENDARIO</a>
          </li>
          <li className='navbar-item'>
            <a href='/services'>CONTACTO</a>
          </li>
          <li className='navbar-item'>
            <a href='/contact'>QUIENES SOMOS</a>
          </li>
        </ul>
      </nav>
      ;
    </>
  );
}

export default NavBar;
