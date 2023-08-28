import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../Assets/Styles/WebSite/WebSite.css';
import '../Loading/LoadingSpinner';
import LoadingSpinner from '../Loading/LoadingSpinner';
import Layout from './Layout';
import { FaShoppingCart } from 'react-icons/fa';
import SubNavBar from './SubNavBar';

function TopicDetail() {
  const { id } = useParams();
  const [topic, setTopic] = useState(null);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchTopicById(id);
    fetchArticlesByTopicId(id);
  }, [id]);

  async function fetchTopicById(id) {
    try {
      const response = await fetch(`/api/topic/find/${id}`);

      if (response.ok) {
        const data = await response.json();
        setTopic(data);
      } else {
        throw new Error('Failed to fetch topics');
      }
    } catch (error) {
      console.log('Error fetching topics:', error);
    }
  }

  async function fetchArticlesByTopicId(id) {
    try {
      const response = await fetch(`/api/article/listByTopic/${id}`);

      if (response.ok) {
        const data = await response.json();
        setArticles(data);
      } else {
        throw new Error('Failed to fetch topics');
      }
    } catch (error) {
      console.log('Error fetching topics:', error);
    }
  }

  if (!topic) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <Layout>
      <SubNavBar />
      <div className='topic-detail-container'>
        <div className='carousel-container'>
          <Carousel
            showArrows
            autoPlay
            interval={3000}
            infiniteLoop
            centerMode={false}
            showStatus={false}
          >
            {topic.images.map((image, index) => (
              <div key={index}>
                <img src={image} alt={`Tematica ${index}`} className='carousel-image' />
              </div>
            ))}
          </Carousel>
        </div>
        <div className='topic-info'>
          <h1>{topic.name}</h1>
          <p>{topic.description}</p>
          <b>Cantidad de niños sugerida: </b>
          {topic.suggestedQuantity}
          <h3>Artículos</h3>
          <ul>
            {articles.map((article, index) => (
              <li key={index}>
                {article.name +
                  ' (' +
                  (article.quantity != null ? article.quantity : 0) +
                  ')'}
              </li>
            ))}
          </ul>

          <button className='productCard__button'>
            Agregar al carrito <FaShoppingCart />
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default TopicDetail;
