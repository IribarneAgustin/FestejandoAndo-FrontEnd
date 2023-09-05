import React from 'react';

const ClientDelete = ({ id, clientData, refreshClientList }) => {
  const handleDelete = () => {
    const requestOptions = {
      method: 'PUT', //is Logical Deletion
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clientData),
    };

    fetch(`/api/client/delete/${id}`, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error('Error deleting client');
        }
      })
      .then((data) => {
        console.log(data);
        window.alert(data);
      })
      .catch((error) => {
        console.error('Error deleting client:', error);
      })
      .finally(() => {
        refreshClientList();
      });
  };

  return (
    <button className='red-button-big' onClick={handleDelete}>
      Eliminar
    </button>
  );
};
export default ClientDelete;
