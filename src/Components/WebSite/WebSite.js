import React from 'react';
import { useRef } from 'react';
import Navbar from '../WebSite/Navbar';
import Tematicas from './Tematicas';
import ScrollToTop from './ScrollToTop';

function WebSite() {
  const tematicas = useRef(null);
  const calendario = useRef(null);
  const contacto = useRef(null);
  const quienesSomos = useRef(null);

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: 'smooth',
    });
  };
  const handleNavLinkClick = (section) => {
    switch (section) {
      case 'tematicas':
        scrollToSection(tematicas);
        break;
      case 'calendario':
        scrollToSection(calendario);
        break;
      case 'contacto':
        scrollToSection(contacto);
        break;
      case 'quienesSomos':
        scrollToSection(quienesSomos);
        break;
      default:
        break;
    }
  };
  return (
    <>
      <div>
        <Navbar onNavLinkClick={handleNavLinkClick} />
      </div>
      <ScrollToTop />
      <div className='hero'></div>
      <div>
        <div ref={tematicas} className='tematicas'>
          {<Tematicas />}
        </div>
        <div ref={calendario} className='calendario'>
          <h3>CALENDARIO</h3>
        </div>
        <div ref={contacto} className='contacto'>
          CONTACTO
        </div>
        <div ref={quienesSomos} className='quienes-somos'>
          QUIENES SOMOS
        </div>
      </div>
      <footer>
        <p>&copy; {new Date().getFullYear()} My Website. All rights reserved.</p>
      </footer>
    </>
  );
}

export default WebSite;
