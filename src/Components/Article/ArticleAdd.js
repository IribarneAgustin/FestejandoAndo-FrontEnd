import React, { useState } from 'react';
import Modal from 'react-modal';
import '../../Assets/Styles/modal.css';

Modal.setAppElement('#root');

function ArticleAdd({ refreshArticleList, topicList }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [topicId, setTopicId] = useState('');

  const options = topicList.map((topic) => ({
    value: topic.id,
    label: topic.name,
  }));

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newArticle = {
      name,
      image,
      topic: { id: topicId },
    };

    try {
      await addArticle(newArticle);

      setName('');
      setImage('');
      setTopicId('');
      closeModal();
    } catch (error) {
      console.log(error);
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
      });
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Agregar</button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2 className='container'>Nuevo articulo</h2>
        <br />
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
            <b>Imagen:</b>
            <input type='text' value={image} onChange={(e) => setImage(e.target.value)} />
          </label>
          <br />
          <label>
            <b>Tematica:</b>
            <select value={topicId} onChange={(e) => setTopicId(e.target.value)} required>
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
            <button type='submit'>Guardar</button>
            <button className='cancel-button' onClick={closeModal}>
              Cancelar
            </button>
          </label>
        </form>
      </Modal>
    </div>
  );
}

export default ArticleAdd;
