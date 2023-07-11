import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../../Assets/Styles/modal.css';

Modal.setAppElement('#root');

function ArticleUpdate({ id, articleData, refreshArticleList, topicList }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [topicId, setTopicId] = useState('');

  const openModal = () => {
    setModalIsOpen(true);
    setName(articleData.name);
    setImage(articleData.image);
    setTopicId(articleData.topic.id);
  };

  const options = topicList.map((topic) => ({
    value: topic.id,
    label: topic.name,
  }));

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const articleUpdated = {
      name,
      image,
      topic: { id: topicId },
    };

    try {
      await updateArticle(articleUpdated);

      closeModal();
      refreshArticleList();
    } catch (error) {
      console.log(error);
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
      });
  };

  return (
    <div>
      <button onClick={openModal}>Modificar</button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2 className='container'>Modificar articulo</h2>
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
            <button type='submit'>Actualizar</button>
            <button className='cancel-button' onClick={closeModal}>
              Cancelar
            </button>
          </label>
        </form>
      </Modal>
    </div>
  );
}
export default ArticleUpdate;
