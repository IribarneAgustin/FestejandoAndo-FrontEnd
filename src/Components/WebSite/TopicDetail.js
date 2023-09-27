import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../Assets/Styles/WebSite/WebSite.css';
import '../../Assets/Styles/WebSite/TopicCards.css';
import '../Loading/LoadingSpinner';
import LoadingSpinner from '../Loading/LoadingSpinner';
import Layout from './Layout';
import { FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../WebSite/Redux/ShoppingAction';
import CartPopUp from './CartPopUp';

function TopicDetail() {
  const { id } = useParams();
  const [topic, setTopic] = useState(null);
  const [articles, setArticles] = useState([]);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems);
  const [isCartPopUpOpen, setCartPopUpOpen] = useState(false);

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

  const itemExistsInCart = cartItems.some((item) => item.id === topic.id);

  const handleAddToCart = () => {
    const item = {
      id: topic.id,
      name: topic.name,
      image: topic.images,
    };
    dispatch(addToCart(item)); // Dispatch the addToCart action with the topic data
    setCartPopUpOpen(true);
  };

  return (
    <Layout showSubNav={true}>
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
            {[...topic.images, ...(articles || []).map((article) => article.image)].map(
              (image, index) => (
                <div key={index}>
                  <img src={image} alt={`Tematica ${index}`} className='carousel-image' />
                </div>
              )
            )}
          </Carousel>
        </div>
        <div className='topic-info'>
          <h1>{topic.name}</h1>
          <p>{topic.description}</p>
          <b>Cantidad de niños sugerida: </b>
          {topic.suggestedQuantity}
          <h3>Artículos</h3>
          <ul className='article-list'>
            {articles
              .filter((article) => !article.suggested)
              .map((article, index) => (
                  <li key={index}>
                      {article.name +
                        ' (' +
                        (article.quantity != null ? article.quantity : 0) +
                        ')'}
                  </li>
              ))}
          </ul>
        </div>
      </div>
      <div className='center-button-container'>
        <button
          className='productDetail__button'
          disabled={itemExistsInCart}
          onClick={handleAddToCart}
        >
          {itemExistsInCart ? 'Agregado ' : 'Agregar al Carrito '}
          <FaShoppingCart />
        </button>
        <CartPopUp
          name={topic.name}
          isOpen={isCartPopUpOpen}
          onClose={() => setCartPopUpOpen(false)}
        />
      </div>
    </Layout>
  );
}

export default TopicDetail;
