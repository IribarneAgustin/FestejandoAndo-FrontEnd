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
        <Carousel
          className='festejando-carousel'
          showArrows={false}
          autoPlay
          interval={2500}
          infiniteLoop
          centerSlidePercentage={100}
          centerMode
          showThumbs={false}
          showStatus={false}
          showIndicators={true}
          dynamicHeight
        >
          <div>
            <img src={BannerMobile1} alt='bannerMobile' sizes='auto'></img>
          </div>
          <div>
            <img src={BannerMobile2} alt='bannerMobile' sizes='auto'></img>
          </div>
          <div>
            <img src={BannerMobile3} alt='bannerMobile' sizes='auto'></img>
          </div>

        </Carousel>
      ) : (
        <Carousel
          className='festejando-carousel'
          showArrows={false}
          autoPlay
          interval={2500}
          infiniteLoop
          centerSlidePercentage={100}
          centerMode
          showThumbs={false}
          showStatus={false}
          showIndicators={true}
          dynamicHeight
        >
          <div>
            <img src={Banner1} alt='banner' sizes='auto'></img>
          </div>
          <div>
            <img src={Banner2} alt='banner' sizes='auto'></img>
          </div>
          <div>
            <img src={Banner3} alt='banner' sizes='auto'></img>
          </div>

        </Carousel>

      )}

    </div >
  );
}

export default CarouselImages;
