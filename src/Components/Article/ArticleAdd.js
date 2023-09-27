import React, { useState } from 'react';
import Modal from 'react-modal';
import '../../Assets/Styles/List.css';
import '../../Assets/Styles/modal.css';
import { useDropzone } from 'react-dropzone';
import LoadingSpinner from '../Loading/LoadingSpinner';
import { uploadFile } from '../../Utils/firebaseConfig';

Modal.setAppElement('#root');

function ArticleAdd({ refreshArticleList, topicList }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [imageName, setImageName] = useState('');
  const [topicId, setTopicId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [suggested, setSuggested] = useState(false);


  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImage(file);
    setImageName(file.name); // Set the name of the selected image
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    onDrop,
  });

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
    setImage('');
    setQuantity('');
    setSuggested(false);
  };

  async function uploadImageAndGetURL(image) {
    const url = await uploadFile(image);
    return url;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      // Upload files to Firebase Cloud Storage
      const url = await uploadImageAndGetURL(image);

      const newArticle = {
        suggested,
        name,
        image: url,
        topic: { id: topicId },
        quantity,
      };

      await addArticle(newArticle);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addArticle = (articleData) => {
    fetch('/api/article/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(articleData),
    })
      .then((response) => response.text())
      .then((response) => {
        console.log(response);
        window.alert(response);
      })
      .catch((error) => {
        console.error('Error adding article:', error);
      })
      .finally(() => {
        refreshArticleList();
        closeAndRefreshForm();
      });
  };

  return (
    <>
      <button onClick={openModal}>Agregar</button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2 className='container'>Nuevo articulo</h2>
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
              <b>Cantidad:</b>
              <input
                type='number'
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
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
              <b>Sugerencia</b>
              <input
                type='checkbox'
                checked={suggested}
                onChange={(e) => setSuggested(e.target.checked)}
              />
            </label>

            <br />
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              <button type='button'>Agregar Imagen</button>
            </div>
            {image && (
              <aside>
                <li>{imageName}</li>
              </aside>
            )}
            <label>
              <button type='submit'>Guardar</button>
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

export default ArticleAdd;
