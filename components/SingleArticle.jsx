import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Comments from "./Comments";
import axios from "axios";
import arrowUp from "../src/assets/arrow-up.svg";
import arrowDown from "../src/assets/arrow-down.svg";

function SingleArticle() {
  const { article_id } = useParams();
  const articleIdUrl = `https://back-end-nc-news-yvh9.onrender.com/api/articles/${article_id}`;

  const [singleArticle, setArticle] = useState({});
  const [votes, setVote] = useState(0);
  const [updateVote, setUpdateVote] = useState(1);
  const [error, setError] = useState(false);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    async function getArticle() {
      const { data } = await axios.get(articleIdUrl);
      const { article } = data;
      setArticle(article);
      setVote(article.votes);
    }
    getArticle();
  }, []);

  async function upVote() {
    try {
      if (updateVote === -1) {
        setVote(votes + updateVote);
        setUpdateVote(1);
        const response = await axios.patch(articleIdUrl, {
          inc_votes: -1,
        });
        setError(false);
        setVoted(false);
      } else if (updateVote === 1) {
        setVote(votes + updateVote);
        setUpdateVote(-1);
        const response = await axios.patch(articleIdUrl, {
          inc_votes: 1,
        });
        setError(false);
        setVoted(true);
      }
    } catch (err) {
      setError(true);
    }
  }

  return (
    <>
      <section className="article-list-card">
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
          <p>{singleArticle.body}</p>
        </div>
        <button
          className="order-toggle"
          type="button"
          aria-label="toggle order"
          onClick={upVote}
        >
          <img
            src={voted ? arrowDown : arrowUp}
            alt={voted ? "down vote" : "up vote"}
            style={{ width: "16px", height: "16px" }}
          />
        </button>
        {error && (
          <h6 style={{ color: "rgb(199, 16, 16)" }}> Something went wrong</h6>
        )}
      </section>

      <section className="comments-section">
        <Comments />
      </section>
    </>
  );
}

export default SingleArticle;
