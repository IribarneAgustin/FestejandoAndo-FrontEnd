import React, { useState } from 'react';
import Modal from 'react-modal';
import '../../Assets/Styles/galleryModal.css';

const GalleryModal = ({ topic }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [images, setImages] = useState([]);

  const openModal = () => {
    setModalIsOpen(true);
    setImages(topic.images);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setDeleteIndex(null); // Reset the delete index when closing the modal
  };

  const handleDeleteClick = (urlToDelete) => {
    const updatedImages = images.filter((url) => url !== urlToDelete);
    setImages(updatedImages);
    topic.images = updatedImages;
    updateTopic(topic);
  };

  const updateTopic = (topicData) => {
    fetch(`/api/topic/update/${topicData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(topicData),
    })
      .then((response) => response.text())
      .then((response) => {
        console.log(response);
        window.alert(response);
      })
      .catch((error) => {
        console.error('Error updating topic:', error);
      });
  };

  return (
    <>
      <button onClick={openModal}>Ver Fotos</button>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <div className='gallery-image-container'>
          {images.map((image, index) => (
            <div
              key={index}
              className='gallery-image-item'
              onMouseEnter={() => setDeleteIndex(index)}
              onMouseLeave={() => setDeleteIndex(null)}
            >
              <img
                src={image}
                alt={index + 1}
                className='gallery-image'
                onClick={(e) => e.stopPropagation()}
              />
              {deleteIndex === index && (
                <div
                  className='delete-button'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(image);
                  }}
                >
                  X
                </div>
              )}
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
