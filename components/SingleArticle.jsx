import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function SingleArticle() {
  const { article_id } = useParams();
  const articleIdUrl = `https://back-end-nc-news-yvh9.onrender.com/api/articles/${article_id}`;

  const [singleArticle, setArticle] = useState({});
  const [votes, setVote] = useState(0);
  useEffect(() => {
    async function getArticle() {
      const response = await fetch(articleIdUrl);
      console.log("response>>", response);
      const { article } = await response.json();
      console.log("ind article>>", article);
      setArticle(article);
      setVote(article.votes);
    }
    getArticle();
  }, []);

  function upVote() {
    setVote(votes + 1);
  }

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
            comments {singleArticle.total_comments}, {votes}
          </h6>
        </div>
      </section>
      <div className="article-body">
        <p>{singleArticle.body}</p>
      </div>
      <section className="comment-buttons">
        <button className="upvote-button" type="button" onClick={upVote}>
          <img
            className="upvote-img"
            src="../src/assets/upvote2.png"
            alt="upvote"
          />
        </button>
        <button type="button">new comment</button>
      </section>
    </section>
  );
}

export default SingleArticle;
