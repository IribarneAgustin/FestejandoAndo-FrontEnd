import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import logo from '../../Assets/Styles/Images/logo.png';

function CarouselImages() {
  return (
    <div className='carousel'>
      <Carousel
        width={'35%'}
        showArrows
        autoPlay
        interval={1000}
        infiniteLoop
        centerSlidePercentage={'50%'}
        centerMode
      >
        <div>
          <img src={logo} />
          <p className='legend'>Legend 1</p>
        </div>
        <div>
          <img src={logo} />
          <p className='legend'>Legend 2</p>
        </div>
        <div>
          <img src={logo} />
          <p className='legend'>Legend 3</p>
        </div>
      </Carousel>
    </div>
  );
}

export default CarouselImages;
