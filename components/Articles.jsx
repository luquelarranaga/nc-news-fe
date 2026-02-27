import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import SortBy from "./SortBy";
import FilterBy from "./FilterBy";

function Articles() {
  const [allArticles, setArticles] = useState([]);
  const [sortBy, setSortBy] = useState("sort_by=votes");
  const [order, setOrderTo] = useState("order=desc");
  const [toggled, setToggled] = useState(false);

  const articlesUrl = `https://back-end-nc-news-yvh9.onrender.com/api/articles?${sortBy}&${order}`;

  useEffect(() => {
    async function getArticles() {
      const { data } = await axios(articlesUrl);
      const { articles } = data;
      setArticles(articles);
      console.log(articles);
    }
    getArticles();
  }, [sortBy, toggled]);

  return (
    <>
      <div className="sorting-filtering">
        <SortBy
          changeSortBy={setSortBy}
          changeOrder={setOrderTo}
          changeToggled={setToggled}
        />
        <FilterBy />
      </div>
      <ul>
        {allArticles.map((article) => {
          const articleId = article.article_id;
          return (
            <li className="article-list-card">
              <img
                className="article-img"
                src={article.article_img_url}
                alt="user avatar"
              />
              <div>
                <h6 className="article-author-topic">
                  {article.author}{" "}
                  {new Date(article.created_at).toLocaleDateString()}
                </h6>
                <Link to={`/articles/${articleId}`}>
                  <h3 className="article-title">{article.title}</h3>
                </Link>
                <h5 className="article-topic">{article.topic}</h5>
                <h6 className="article-comments-votes">
                  comments {article.total_comments}, {article.votes}
                </h6>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Articles;
