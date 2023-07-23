import React from 'react';

const ArticleDelete = ({ id, articleData, refreshArticleList }) => {
  const handleDelete = () => {
    const requestOptions = {
      method: 'PUT', //is Logical Deletion
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(articleData),
    };

    fetch(`/api/article/delete/${id}`, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error('Error deleting article');
        }
      })
      .then((data) => {
        console.log(data);
        window.alert(data);
      })
      .catch((error) => {
        console.error('Error deleting article:', error);
      })
      .finally(() => {
        refreshArticleList();
      });
  };
  return (
    <button className='delete-button' onClick={handleDelete}>
      Eliminar
    </button>
  );
};
export default ArticleDelete;
