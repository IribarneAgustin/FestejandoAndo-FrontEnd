import React from 'react';
import { useRef } from 'react';
import Navbar from '../WebSite/Navbar';
import CarouselImages from './Carousel-images';
import Tematicas from './Tematicas';
import ScrollToTop from './ScrollToTop';
import Layout from './Layout';

function WebSite() {
  const tematicas = useRef(null);
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
      <Layout showSubNav={false}>
        <Navbar onNavLinkClick={handleNavLinkClick} />
        <ScrollToTop />
        <div>
          <CarouselImages />
          <div>
            <div ref={tematicas}>{<Tematicas />}</div>
            <div ref={contacto} className='contacto'>
              CONTACTO
            </div>
            <div ref={quienesSomos} className='quienes-somos'>
              QUIENES SOMOS
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default WebSite;
