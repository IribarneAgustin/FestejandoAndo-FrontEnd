import React, { useState, useEffect } from "react";
import "../../Assets/Styles/List.css";
import TopicAdd from "./TopicAdd";
import Slider from "react-slick";
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
    fetchSuggestedArticlesList();
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

  async function fetchSuggestedArticlesList() {
    try {
      const response = await fetch("/api/article/list/suggested"); //Fetch only suggestions

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

  return (
    <div className="container">
      <div>
        <ul className="list">
          <h1>Temáticas</h1>
          <TopicAdd refreshTopicList={fetchTopics} articleList={articleList} />
          <hr></hr>
          <li className="list-header">
            {" "}
            {/* Add a header row */}
            <h2>Nombre</h2>
            <h2>Artículos sugeridos</h2>
            <h2></h2>
            <h2></h2>
          </li>
          {topics.map((topic) => (
            <li key={topic.id}>
              <p>{topic.name}</p>
              <p>{topic.suggestionsIds}</p>
              <p>
                <GalleryModal images={topic.images}/>
              </p>
              <p>
                <TopicModify entityToModify={topic} articleList={articleList} refreshTopicList={fetchTopics} />
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
