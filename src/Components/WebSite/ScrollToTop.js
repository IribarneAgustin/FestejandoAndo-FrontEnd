import React, { useState, useEffect } from 'react';
import { FaAngleDoubleUp } from 'react-icons/fa';
import '../../Assets/Styles/WebSite/WebSite.css';

const ScrollToTop = () => {
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  const settingScroll = () => {
    if (window.scrollY > 300) {
      setShowScrollTopButton(true);
    } else {
      setShowScrollTopButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', settingScroll);
    return () => {
      window.removeEventListener('scroll', settingScroll);
    };
  }, []);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {showScrollTopButton && (
        <FaAngleDoubleUp className='top-btn-position top-btn-style' onClick={scrollTop} />
      )}
    </>
  );
};

export default ScrollToTop;
