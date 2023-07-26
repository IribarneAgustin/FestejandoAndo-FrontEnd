import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
import { useDropzone } from 'react-dropzone';
import { uploadFile } from '../../Utils/firebaseConfig';

Modal.setAppElement('#root');

function TopicModify({ entityToModify, articleList, refreshTopicList }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState(entityToModify.name);
  const [images, setImages] = useState([]);
  const [selectedArticles, setSelectedArticles] = useState([]);

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
    if (entityToModify) {
      const selectedOptions = options.filter((article) =>
        entityToModify.suggestionsIds.includes(article.value)
      );
      setSelectedArticles(selectedOptions);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const closeAndRefreshForm = () => {
    closeModal();
    refreshForm();
  };

  const refreshForm = () => {
    setName(entityToModify.name);
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
      // Upload files to Firebase Cloud Storage
      const urls = await uploadImagesAndGetURLs(images);

      // Getting selected Articles
      const articlesToAdd = selectedArticles.map((article) => ({
        id: article.value,
      }));

      // Create a new topic object with the form values
      const updatedTopic = {
        id: entityToModify.id,
        name,
        suggestionsIds: articlesToAdd.map((article) => article.id),
        images: urls,
      };

      await updateTopic(updatedTopic);
    } catch (error) {
      console.log(error);
    }
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
      })
      .finally(() => {
        refreshTopicList();
        closeAndRefreshForm();
      });
  };

  return (
    <>
      <button onClick={openModal}>Modificar</button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2 className='container'>Modificar Temática</h2>
        <br />
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
            <button type='submit'>Modificar</button>
            <button className='cancel-button' onClick={closeAndRefreshForm}>
              Cancelar
            </button>
          </label>
        </form>
      </Modal>
    </>
  );
}

export default TopicModify;
