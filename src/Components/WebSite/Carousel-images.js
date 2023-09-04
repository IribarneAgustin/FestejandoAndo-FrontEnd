import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../Assets/Styles/WebSite/WebSite.css';
import { Carousel } from 'react-responsive-carousel';
import logo from '../../Assets/Styles/Images/BANNER.png';

function CarouselImages() {
  return (
    <Carousel
      className='festejando-carousel'
      width={'80%'}
      showArrows={true}
      autoPlay
      interval={3000}
      infiniteLoop
      centerSlidePercentage={100}
      centerMode
      showThumbs={false}
      showStatus={false}
      showIndicators={true}
    >
      <div>
       {/*src="//acdn.mitiendanube.com/stores/002/235/467/themes/idea/1-slide-1693585777841-5425392598-958b476d0ec387243b589edad4cc25c01693585788-50-0.webp?661528058" class="slider-image blur-up swiper-lazy swiper-lazy-loaded" alt="Carrusel 1" srcset="//acdn.mitiendanube.com/stores/002/235/467/themes/idea/1-slide-1693585777841-5425392598-958b476d0ec387243b589edad4cc25c01693585788-1400-1400.webp?661528058 1400w, //acdn.mitiendanube.com/stores/002/235/467/themes/idea/1-slide-1693585777841-5425392598-958b476d0ec387243b589edad4cc25c01693585788-1920-1920.webp?661528058 1920w"*/} 
        <img src={logo} sizes="auto"></img>
      </div>

    </Carousel>
  );
}

export default CarouselImages;
