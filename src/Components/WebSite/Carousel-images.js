import React, { useState, useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../Assets/Styles/WebSite/WebSite.css';
import { Carousel } from 'react-responsive-carousel';
import Banner1 from '../../Assets/Styles/Images/Banner1.jpg';
import Banner2 from '../../Assets/Styles/Images/Banner2.jpg';
import Banner3 from '../../Assets/Styles/Images/Banner3.jpg';
import BannerMobile1 from '../../Assets/Styles/Images/BannerMobile1.jpg';
import BannerMobile2 from '../../Assets/Styles/Images/BannerMobile2.jpg';
import BannerMobile3 from '../../Assets/Styles/Images/BannerMobile3.jpg';


function CarouselImages() {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {

    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  return (
    <div className='carousel-container'>
      {isMobile ? (
        <>
          <img src={BannerMobile1} alt='bannerMobile' style={{ width: '100%', height: '500px' }}></img>
        </>
      ) : (
        <>
          <img src={Banner1} alt='banner' style={{ width: '100%', height: '500px' }}></img>
        </>
      )}
    </div >
  );
}

export default CarouselImages;
