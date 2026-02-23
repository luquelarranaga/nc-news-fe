import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const articlesUrl = "https://back-end-nc-news-yvh9.onrender.com/api/articles";

function Articles() {
  const [allArticles, setArticles] = useState([]);

  useEffect(() => {
    async function getArticles() {
      const response = await fetch(articlesUrl);
      console.log("response for all articles>>", response);
      const { articles } = await response.json();
      setArticles(articles);
      console.log(articles[0]);
    }
    getArticles();
  }, []);

  return (
    <>
      <ul>
        {allArticles.map((article) => {
          const articleId = article.article_id;
          return (
            <li className="article">
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
