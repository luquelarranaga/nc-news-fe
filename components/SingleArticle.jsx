import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function SingleArticle() {
  const { article_id } = useParams();
  const articleIdUrl = `https://back-end-nc-news-yvh9.onrender.com/api/articles/${article_id}`;

  const [singleArticle, setArticle] = useState({});
  useEffect(() => {
    async function getArticle() {
      const response = await fetch(articleIdUrl);
      console.log("response>>", response);
      const { article } = await response.json();
      console.log("ind article>>", article);
      setArticle(article);
    }
    getArticle();
  }, []);

  return (
    <section className="single-article">
      <section className="article">
        <img
          className="article-img"
          src={singleArticle.article_img_url}
          alt="article image"
        />
        <div>
          <h6 className="article-author-topic">
            {singleArticle.author}{" "}
            {new Date(singleArticle.created_at).toLocaleDateString()}
          </h6>
          <h3 className="article-title">{singleArticle.title}</h3>
          <h5 className="article-topic">{singleArticle.topic}</h5>
          <h6 className="article-comments-votes">
            comments {singleArticle.total_comments}, {singleArticle.votes}
          </h6>
        </div>
      </section>
      <div className="article-body">
        <p>{singleArticle.body}</p>
      </div>
    </section>
  );
}

export default SingleArticle;
