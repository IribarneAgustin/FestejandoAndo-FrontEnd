import React from 'react';
import '../../Assets/Styles/Styles-WebSite/template.css';
import '../../Assets/Styles/Styles-WebSite/WebSite.css';
import '../../Assets/Styles/Styles-WebSite/font-awesome.css';
import '../../Assets/Styles/Styles-WebSite/carousel.css';
import '../../Assets/Styles/Styles-WebSite/flex-slider.css';
import '../../Assets/Styles/Styles-WebSite/lightbox.css';

function NavBar({ onNavLinkClick }) {
  return (
    <>
      <header className='header-area header-sticky background-header'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <nav className='main-nav'>
                <a className='logo'>
                  <img src='../../Assets/Styles/Images/logo.png'></img>
                </a>
                <ul className='nav'>
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
          </div>
        </div>
      </header>
    </>
  );
}

export default NavBar;
