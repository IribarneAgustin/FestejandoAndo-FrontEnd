import React, { useState, useEffect } from 'react';
import { TopicCards } from './TopicCards';
import Layout from './Layout';

function Tematicas() {

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
    <div className="TopicCards">
      {topics.map(topic => (
        <TopicCards
          key={topic.id}
          id={topic.id}
          image={topic.images}
          name={topic.name}
          price={topic.price}
          totalSales={1000}
          timeLeft={1}
          rating={5}
        />
      ))}
    </div>
  );
}

export default Tematicas;
