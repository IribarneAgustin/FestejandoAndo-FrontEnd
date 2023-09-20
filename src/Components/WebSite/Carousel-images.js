import React, { useState, useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../Assets/Styles/WebSite/WebSite.css';
import { Carousel } from 'react-responsive-carousel';
import imageCellphoneView from '../../Assets/Styles/Images/main-banner.png';
import imagePcView from '../../Assets/Styles/Images/BANNER.png';

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
      <Carousel
        className='festejando-carousel'
        showArrows={true}
        autoPlay
        interval={3000}
        infiniteLoop
        centerSlidePercentage={100}
        centerMode
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        dynamicHeight
      >
        {isMobile ? (
          <div>
            <img src={imageCellphoneView} alt='logo2' sizes='auto'></img>
          </div>
        ) : (
          <div>
            <img src={imagePcView} alt='logo1' sizes='auto'></img>
          </div>
        )}
      </Carousel>
    </div>
  );
}

export default CarouselImages;
