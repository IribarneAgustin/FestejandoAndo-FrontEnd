import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../Assets/Styles/WebSite/WebSite.css'
import '../Loading/LoadingSpinner'
import LoadingSpinner from "../Loading/LoadingSpinner";
import { FaMoneyBill,FaCreditCard    } from 'react-icons/fa'; 
import Layout from './Layout';
function TopicDetail() {
  const { id } = useParams();
  const [topic, setTopic] = useState(null);

  useEffect(() => {
    fetchTopicById(id);
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

  if (!topic) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <Layout>
    <div className="topic-detail-container">
      <div className="carousel-container">
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
              <img src={image} alt={`Image ${index}`} className="carousel-image" />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="topic-info">
        <h1>{topic.name}</h1>
        <h4><FaCreditCard  /> Todos los medios de pago</h4>
        <h4><FaMoneyBill  /> 15% de descuento pagando en efectivo o transferencia</h4>
        <h3>Armamos presupuesto a tu medida</h3>
      </div>
    </div>
    </Layout>
  );
}

export default TopicDetail;
