import React, { useState, useEffect } from "react";
import "../../Assets/Styles/List.css";
import TopicAdd from "./TopicAdd";
import TopicDelete from "./TopicDelete";
import GalleryModal from "../Gallery/GalleryModal";
import TopicModify from "./TopicModify"
function TopicList() {
  const [topics, setTopics] = useState([]);
  const [articleList, setArticleList] = useState([]);

  useEffect(() => {
    fetchTopics();
  }, []);

  useEffect(() => {
    fetchArticlesList();
  }, []);

  async function fetchTopics() {
    try {
      const response = await fetch("/api/topic/list");

      if (response.ok) {
        const data = await response.json();
        setTopics(data);
      } else {
        throw new Error("Failed to fetch topics");
      }
    } catch (error) {
      console.log("Error fetching topics:", error);
    }
  }

  async function fetchArticlesList() {
    try {
      const response = await fetch("/api/article/list");

      if (response.ok) {
        const data = await response.json();
        setArticleList(data);
      } else {
        throw new Error("Failed to fetch articles");
      }
    } catch (error) {
      console.log("Error fetching articles:", error);
    }
  }

  function getSuggestedArticleNames(topic) {
    const suggestedArticleIds = topic.suggestionsIds;
    const matchingArticles = articleList.filter(article => suggestedArticleIds.includes(article.id) && article.suggested === true);
    return matchingArticles.map(article => article.name).join(', ');
  }

  function getArticleNamesByTopic(topic) {
    const matchingArticles = articleList.filter(article => article.topic.id === topic.id);
    return matchingArticles.map(article => article.name).join(', ');
  }

  function getSuggetedArticleList() {
    return articleList.filter(article => article.suggested === true);
  }
  

  return (
    <div className="container">
      <div>
        <ul className="list">
          <h1>Temáticas</h1>
          <TopicAdd refreshTopicList={fetchTopics} articleList={getSuggetedArticleList()} />
          <hr></hr>
          <li className="list-header">
            {" "}
            {/* Add a header row */}
            <h2>Nombre</h2>
            <h2>Artículos</h2>
            <h2>Artículos sugeridos</h2>
            <h2></h2>
            <h2></h2>
          </li>
          {topics.map((topic) => (
            <li key={topic.id}>
              <p>{topic.name}</p>
              <p>{ getArticleNamesByTopic(topic) }</p>
              <p>{ getSuggestedArticleNames(topic) }</p>
              <p>
                <GalleryModal topic={topic}/>
              </p>
              <p>
                <TopicModify entityToModify={topic} articleList={getSuggetedArticleList()} refreshTopicList={fetchTopics} />
              </p>
              <p>
                {<TopicDelete id={topic.id} topicData={topic} refreshTopicList={fetchTopics}/>}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TopicList;
