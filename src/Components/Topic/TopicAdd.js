import React, { useState } from 'react';
import '../../Assets/Styles/List.css';
import Modal from 'react-modal';
import '../../Assets/Styles/modal.css';
import Select from 'react-select';
import { useDropzone } from 'react-dropzone';
import { uploadFile } from '../../Utils/firebaseConfig';
import LoadingSpinner from '../Loading/LoadingSpinner';

Modal.setAppElement('#root');

function TopicAdd({ articleList, refreshTopicList }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [images, setImages] = useState([]);
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = (acceptedFiles) => {
    setImages([...images, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    onDrop,
  });

  const options = articleList.map((article) => ({
    value: article.id,
    label: article.name,
  }));

  const handleSelectChange = (selectedArticles) => {
    setSelectedArticles(selectedArticles);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const closeAndRefreshForm = () => {
    closeModal();
    refreshForm();
  };

  const refreshForm = () => {
    setName('');
    setImages([]);
    setSelectedArticles([]);
  };

  // Modified code to handle multiple image uploads
  async function uploadImagesAndGetURLs(images) {
    const uploadPromises = images.map((image) => uploadFile(image));
    const urls = await Promise.all(uploadPromises);
    return urls;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      // Upload files to Firebase Cloud Storage
      const urls = await uploadImagesAndGetURLs(images); //images.map((image) => uploadFile(image));
      console.log(urls);
      // Getting selected Articles
      const articlesToAdd = selectedArticles.map((article) => ({
        id: article.value,
      }));

      // Create a new topic object with the form values
      const newTopic = {
        name,
        suggestionsIds: articlesToAdd.map((article) => article.id),
        images: urls,
      };

      await addTopic(newTopic);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addTopic = (topicData) => {
    fetch('/api/topic/save', {
      method: 'POST',
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
        console.error('Error adding topic:', error);
      })
      .finally(() => {
        refreshTopicList();
        closeAndRefreshForm();
      });
  };

  return (
    <>
      <button onClick={openModal}>Agregar</button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2 className='container'>Nueva Temática</h2>
        <br />
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <form className='modal' onSubmit={handleSubmit}>
            <label>
              <b>Nombre: </b>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              <b>Artículos sugeridos: </b>
              <Select
                options={options}
                isMulti
                value={selectedArticles}
                onChange={handleSelectChange}
                placeholder='Seleccione los artículos'
              />
            </label>
            <p className='description'>
              Los artículos seleccionados se ofrecerán cada vez que se desee reservar esta
              temática
            </p>
            <br />
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              <button type='button'>Agregar Imágenes</button>
            </div>
            <aside>
              <ul>
                {images.map((image, index) => (
                  <li key={index}>{image.name}</li>
                ))}
              </ul>
            </aside>
            <label>
              <button type='submit'>Agregar</button>
              <button className='cancel-button' onClick={closeAndRefreshForm}>
                Cancelar
              </button>
            </label>
          </form>
        )}
      </Modal>
    </>
  );
}

export default TopicAdd;
