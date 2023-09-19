import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../Assets/Styles/WebSite/WebSite.css';
import { Carousel } from 'react-responsive-carousel';
import logo from '../../Assets/Styles/Images/BANNER.png';

function CarouselImages() {
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
        <div>
          <img src={logo} alt='logo1' sizes='auto'></img>
        </div>
      </Carousel>
    </div>
  );
}

export default CarouselImages;
