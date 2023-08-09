import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../Assets/Styles/WebSite/WebSite.css';
import { Carousel } from 'react-responsive-carousel';
import logo from '../../Assets/Styles/Images/logo.png';

function CarouselImages() {
  return (
    <Carousel
      width={'50%'}
      showArrows
      autoPlay
      interval={3000}
      infiniteLoop
      centerSlidePercentage={100}
      centerMode
      showStatus={false}
    >
      <div>
        <img src={logo} alt='logo 1' />
      </div>
      <div>
        <img src={logo} alt='logo 2' />
      </div>
      <div>
        <img src={logo} alt='logo 3' />
      </div>
      <div>
        <img src={logo} alt='logo 4' />
      </div>
    </Carousel>
  );
}

export default CarouselImages;
