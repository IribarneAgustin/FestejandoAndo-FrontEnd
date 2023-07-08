import React, { useState, useEffect } from 'react';
import '../Assets/Styles/List.css';

function TopicList() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetchTopics();
  }, []);

  async function fetchTopics() {
    try {
      const response = await fetch('/api/topic/list');

      if (response.ok) {
        const data = await response.json();
        setTopics(data);
      } else {
        throw new Error('Failed to fetch topics');
      }
    } catch (error) {
      console.log('Error fetching topics:', error);
    }
  }

  return (
    <div className='container'>
      <div>
        <ul className='list'>
          <h1>Temáticas</h1>
          <li className='list-header'>
            {' '}
            {/* Add a header row */}
            <h2>Nombre</h2>
            <h2>Sugerencias</h2>
            <h2>Imagenes</h2>
          </li>
          {topics.map((topic) => (
            <li key={topic.id}>
              <p>{topic.name}</p>
              <p>{topic.suggestionsIds}</p>
              <p>{topic.images}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TopicList;
