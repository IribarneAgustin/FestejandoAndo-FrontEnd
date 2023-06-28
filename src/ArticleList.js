import React, { useState, useEffect } from 'react';
import './ArticleList.css';

function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  async function fetchArticles() {
    try {
      const response = await fetch('/api/article/list');

      if (response.ok) {
        const data = await response.json();
        setArticles(data);
      } else {
        throw new Error('Failed to fetch articles');
      }
    } catch (error) {
      console.log('Error fetching articles:', error);
    }
  }

  return (
    <div className='container'>
      <div>
        <ul className='article-list'>
          <h1>Artículos</h1>
          <li className='article-list-header'>
            {' '}
            {/* Add a header row */}
            <h2>Nombre</h2>
            <h2>Imagen</h2>
            <h2>Temática</h2>
            <h2>Sugerencia</h2>
          </li>
          {articles.map((article) => (
            <li key={article.id}>
              <p>{article.name}</p>
              <p>{article.image}</p>
              <p>{article.topic.name}</p>
              <p>{article.suggested}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ArticleList;
