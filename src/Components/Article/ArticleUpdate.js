import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../../Assets/Styles/modal.css';
import { useDropzone } from 'react-dropzone';
import LoadingSpinner from '../Loading/LoadingSpinner';
import { uploadFile } from '../../Utils/firebaseConfig';

Modal.setAppElement('#root');

function ArticleUpdate({ id, articleData, refreshArticleList, topicList }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [topicId, setTopicId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imageWasUpdated, setImageWasUpdated] = useState(false);

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImage(file);
    setImageWasUpdated(true);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    onDrop,
  });

  const openModal = () => {
    setModalIsOpen(true);
    setName(articleData.name);
    setImage(articleData.image);
    setTopicId(articleData.topic.id);
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
    setImage('');
  };

  async function uploadImageAndGetURL(image) {
    const url = await uploadFile(image);
    return url;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const url = imageWasUpdated ? await uploadImageAndGetURL(image) : image;

      const articleUpdated = {
        name,
        image: url,
        topic: { id: topicId },
      };

      await updateArticle(articleUpdated);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateArticle = (articleUpdated) => {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(articleUpdated),
    };

    fetch(`/api/article/update/${id}`, requestOptions)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        console.log(data);
        window.alert(data);
      })
      .catch((error) => {
        console.error('Error updating article:', error);
      })
      .finally(() => {
        refreshArticleList();
        closeAndRefreshForm();
      });
  };

  return (
    <>
      <button onClick={openModal}>Modificar</button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2 className='container'>Modificar articulo</h2>
        <br />
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <form className='modal' onSubmit={handleSubmit}>
            <label>
              <b>Nombre:</b>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <button type='button'>Cambiar Imagen</button>
              </div>
            </label>
            <br />
            <label>
              <b>Tematica:</b>
              <select
                value={topicId}
                onChange={(e) => setTopicId(e.target.value)}
                required
              >
                <option value=''>Seleccione una tematica..</option>
                {topicList.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.name}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <label>
              <button type='submit'>Actualizar</button>
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
export default ArticleUpdate;
