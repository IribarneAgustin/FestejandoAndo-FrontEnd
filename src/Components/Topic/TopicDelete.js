import React from 'react';
import PropTypes from 'prop-types';

const TopicDelete = ({ id, topicData, refreshTopicList }) => {

    const handleDelete = () => {
      
        const requestOptions = {
          method: 'PUT', //is Logical Deletion
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(topicData),
        };
      
        fetch(`/api/topic/delete/${id}`, requestOptions)
        .then((response) => {
          if (response.ok) {
            return response.text();
          } else {
            throw new Error('Error deleting topic');
          }
        })
        .then((data) => {
          console.log(data);
          window.alert(data);
        })
        .catch((error) => {
          console.error('Error deleting topic:', error);
        })
        .finally(() => {
            refreshTopicList();
        });
      
      };
      
      

  return <button onClick={handleDelete}>Eliminar</button>;
};

TopicDelete.propTypes = {
  id: PropTypes.number.isRequired,
  topicData: PropTypes.object.isRequired,
};

export default TopicDelete;
