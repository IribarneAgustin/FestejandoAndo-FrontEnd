import React from 'react';
import { useRef } from 'react';
import Navbar from '../WebSite/Navbar';
import CarouselImages from './Carousel-images';
import Tematicas from './Tematicas';
import ScrollToTop from './ScrollToTop';
import Layout from './Layout';
import QuienesSomos from './QuienesSomos';
import Presupuestos from './Presupuestos';

function WebSite() {
  const tematicas = useRef(null);
  const quienesSomos = useRef(null);
  const presupuestos = useRef(null);

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
      case 'quienesSomos':
        scrollToSection(quienesSomos);
        break;
      case 'presupuestos':
        scrollToSection(presupuestos);
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
            <div ref={quienesSomos}>{<QuienesSomos />}</div>
            <div ref={presupuestos}> {<Presupuestos />}</div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default WebSite;
