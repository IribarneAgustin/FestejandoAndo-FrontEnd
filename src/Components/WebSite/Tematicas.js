import React, { useState, useEffect } from 'react';
import { TopicCards } from './TopicCards';

function Tematicas() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetchTopics();
  }, []);

  async function fetchTopics() {
    try {
      const response = await fetch('/api/topic/list');
  
      if (response.ok) {
        const rawData = await response.text();
        console.log(response);
        const data = JSON.parse(rawData);
        setTopics(data);
      } else {
        throw new Error('Failed to fetch topics');
      }
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  }
  

  return (
    <div className='TopicCards'>
      {topics.map((topic) => (
        <TopicCards
          key={topic.id}
          id={topic.id}
          image={topic.images}
          name={topic.name}
          description={topic.description}
          suggestionsIds={topic.suggestionsIds}
          suggestedQuantity={topic.suggestedQuantity}
          rating={5}
        />
      ))}
    </div>
  );
}

export default Tematicas;
