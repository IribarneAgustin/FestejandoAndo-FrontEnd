import React, { useState } from 'react';
import Modal from 'react-modal';
import '../../Assets/Styles/galleryModal.css';

const GalleryModal = ({ images }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <button onClick={openModal}>Ver Fotos</button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <div className='gallery-image-container'>
          {images.map((image, index) => (
            <div key={index} className='gallery-image-item'>
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className='gallery-image'
                onClick={closeModal}
              />
            </div>
          ))}
        </div>
        <div>
          <button className='cancel-button gallery-button' onClick={closeModal}>
            Volver
          </button>
        </div>
      </Modal>
    </>
  );
};

export default GalleryModal;
