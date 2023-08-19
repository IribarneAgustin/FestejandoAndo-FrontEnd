import React, { useState } from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
import { useDropzone } from 'react-dropzone';
import { uploadFile } from '../../Utils/firebaseConfig';
import LoadingSpinner from '../Loading/LoadingSpinner';

Modal.setAppElement('#root');

function TopicModify({ entityToModify, articleList, refreshTopicList }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState(entityToModify.name);
  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState(entityToModify.description != null ? entityToModify.description : '');
  const [suggestedQuantity, setSuggestedQuantity] = useState(entityToModify.suggestedQuantity != null ? entityToModify.suggestedQuantity : '');

  const onDrop = (acceptedFiles) => {
    setNewImages([...newImages, ...acceptedFiles]);
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
    setImages(entityToModify.images);
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
    setNewImages([]);
    setDescription(entityToModify.description);
    setSuggestedQuantity(entityToModify.suggestedQuantity)
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
      const urls = await uploadImagesAndGetURLs(newImages);

      // Getting selected Articles
      const articlesToAdd = selectedArticles.map((article) => ({
        id: article.value,
      }));

      // Create a new topic object with the form values
      const updatedTopic = {
        id: entityToModify.id,
        name,
        suggestionsIds: articlesToAdd.map((article) => article.id),
        images: [...images, ...urls],
        description,
        suggestedQuantity,
      };

      await updateTopic(updatedTopic);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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
      <button className='update-button' onClick={openModal}>Modificar</button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2 className='container'>Modificar Temática</h2>
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

            <label>
              <b>Descripción:</b>
              <textarea
                type='text'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </label>
            <br />

            <label>
              <b>Cantidad de niños</b>
              <input
                type='number'
                min="0"
                value={suggestedQuantity}
                onChange={(e) => setSuggestedQuantity(e.target.value)}
                required
              />
            </label>
            <br />

            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              <button type='button'>Agregar Imágenes</button>
            </div>
            <p>La temática cuenta con {images.length + newImages.length} imágenes </p>
            <br />
            <label>
              <button type='submit'>Modificar</button>
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

export { TopicModify as default };
