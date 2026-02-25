import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import Comments from "./Comments";
import axios from "axios";
import Modal from "./Modal";

function SingleArticle() {
  const { article_id } = useParams();
  const articleIdUrl = `https://back-end-nc-news-yvh9.onrender.com/api/articles/${article_id}`;

  const [singleArticle, setArticle] = useState({});
  const [votes, setVote] = useState(0);
  const [updateVote, setUpdateVote] = useState(1);
  const [areCommentsShowing, setCommentsShowing] = useState(false);
  const [error, setError] = useState(false);

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
      } else if (updateVote === 1) {
        setVote(votes + updateVote);
        setUpdateVote(-1);
        const response = await axios.patch(articleIdUrl, {
          inc_votes: 1,
        });
        setError(false);
      }
    } catch (err) {
      setError(true);
    }
  }

  function updateCommentsShowing() {
    setCommentsShowing(!areCommentsShowing);
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
        <div>
          <button
            className={
              updateVote === 1 ? "upvoted-button" : "not-upvoted-button"
            }
            type="button"
            onClick={upVote}
          >
            <img
              className="upvote-img"
              src="../src/assets/upvote2.png"
              alt="upvote"
            />
          </button>
          <button type="button" onClick={updateCommentsShowing}>
            show comments
          </button>
        </div>
        <Popup trigger={<button type="button">new comment</button>} modal>
          {" "}
          <Modal articleId={article_id} />
        </Popup>
      </section>
      {error && (
        <h6 style={{ color: "rgb(199, 16, 16)" }}> Something went wrong</h6>
      )}
      {areCommentsShowing && <Comments articleId={article_id} />}
    </section>
  );
}

export default SingleArticle;
