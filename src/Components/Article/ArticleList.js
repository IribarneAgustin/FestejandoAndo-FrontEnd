import React, { useState, useEffect } from 'react';
import '../../Assets/Styles/List.css';
import ArticleAdd from './ArticleAdd';
import ArticleUpdate from './ArticleUpdate';
import ArticleDelete from './ArticleDelete';

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [topicList, setTopics] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    fetchTopicList();
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

  async function fetchTopicList() {
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
          <h1>Artículos</h1>
          {<ArticleAdd refreshArticleList={fetchArticles} topicList={topicList} />}
          <hr></hr>
          <li className='list-header'>
            {' '}
            {/* Add a header row */}
            <h2>Nombre</h2>
            <h2>Temática</h2>
            <h2>Imagen</h2>
            <h2></h2>
            <h2></h2>
          </li>
          {articles.map((article) => (
            <li key={article.id}>
              <p>{article.name}</p>
              <p>{article.topic.name}</p>
              <img src={article.image} alt="article" className='image-wrapper' />
              <p>
                {
                  <ArticleUpdate
                    id={article.id}
                    articleData={article}
                    refreshArticleList={fetchArticles}
                    topicList={topicList}
                  />
                }
              </p>
              <p>
                {
                  <ArticleDelete
                    id={article.id}
                    articleData={article}
                    refreshArticleList={fetchArticles}
                  />
                }
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ArticleList;
