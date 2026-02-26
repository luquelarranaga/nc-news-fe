import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function TopicSlug() {
  const { slug } = useParams();
  console.log(slug);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function getArticles() {
      const { data } = await axios.get(
        `https://back-end-nc-news-yvh9.onrender.com/api/articles?topic=${slug}`,
      );
      const { articles } = data;
      setArticles(articles);
    }
    getArticles();
  }, [slug]);

  return (
    <ul>
      {articles.map((article) => {
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
  );
}

export default TopicSlug;
