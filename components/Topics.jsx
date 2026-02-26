import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Topics() {
  const [allTopics, setTopics] = useState([]);

  useEffect(() => {
    async function getTopics() {
      const { data } = await axios.get(
        `https://back-end-nc-news-yvh9.onrender.com/api/topics`,
      );
      const { topics } = data;
      setTopics(topics);
    }
    getTopics();
  }, []);

  return (
    <ul>
      {allTopics.map((topic) => {
        return (
          <Link to={`/topics/${topic.slug}`}>
            <li>{topic.slug} </li>
          </Link>
        );
      })}
    </ul>
  );
}

export default Topics;
