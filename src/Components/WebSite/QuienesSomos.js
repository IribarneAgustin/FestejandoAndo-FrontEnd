import React from 'react';
import '../../Assets/Styles/WebSite/TopicCards.css';
import image from '../../Assets/Styles/Images/QuienesSomos.jpg';

function QuienesSomos() {
  return (
    <>
      <div className='centered-container-text'>
        <div className='image-container'>
          <img src={image} alt='Imagen' className='side-image' />
        </div>
        <div className='text-container'>
          <p className='text-quienesSomos'>
            Holis por acá <strong>Agus</strong> 👋🏻🧚🏼‍♀️ O en mis otras versiones… seño agus,
            tina, zapallita y para los peques POFE (sisi sin r, para mas ternura). Por
            ahora sere la primer cara visible de este hermoso emprendimiento 🤫 Por suerte
            mi familia, amigos y amor tambien son parte dando animos, pintura y
            construccion para llevar a cabo esta locura de emprender!!
          </p>
          <p className='text-quienesSomos'>
            Festejando ando nacio del juego simple y risueño. Del juego que achica a los
            mas grandes y vuelve enorme a los pequeños. Ese que se disfruta a la par y que
            no tiene limites. Donde las historias pueden contarse de mil formas y siempre
            hay lugar para tod@s.
          </p>
          <p className='text-quienesSomos'>
            Festejando ando, es el proyecto que anhelaba hace varios años, donde poder
            crear, imaginar y dejarme ser una niña todo el tiempo que quisiera. Los
            estaremos acompañando llenos de juegos, peloteros, comiditas, mountruos y por
            sobre todo, con mucha risa❤️
          </p>
          <p className='text-quienesSomos'>
            Asi que los invito a ponerse una capa, tal vez una 👑 y pensar en ese poder
            magico que nos hacia poderosos de chicos. Aunque ahora ya sabemos que para ser
            invencibles solo basta con ser felices y eso hay que FESTEJARLO!
          </p>
        </div>
      </div>
    </>
  );
}

export default QuienesSomos;
