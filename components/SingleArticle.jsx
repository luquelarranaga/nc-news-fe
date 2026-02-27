import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Comments from "./Comments";
import axios from "axios";
import VotingButtons from "./VotingButtons";
import ArticleCard from "./ArticleCard";

function SingleArticle() {
  const { article_id } = useParams();
  console.log("article id in single article>>", article_id);
  const articleIdUrl = `https://back-end-nc-news-yvh9.onrender.com/api/articles/${article_id}`;

  const [article, setArticle] = useState({});
  const [votes, setVote] = useState(0);
  const [updateVote, setUpdateVote] = useState(1);
  const [error, setError] = useState(false);
  const [upVoted, setUpVoted] = useState(false);
  const [downVoted, setDownVoted] = useState(false);

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
    setUpVoted(!upVoted);
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

  async function downVote() {
    setDownVoted(!downVoted);
    try {
      if (updateVote === -1) {
        setVote(votes - updateVote);
        setUpdateVote(1);
        const response = await axios.patch(articleIdUrl, {
          inc_votes: +1,
        });
        setError(false);
      } else if (updateVote === 1) {
        setVote(votes - updateVote);
        setUpdateVote(-1);
        const response = await axios.patch(articleIdUrl, {
          inc_votes: -1,
        });
        setError(false);
      }
    } catch (err) {
      setError(true);
    }
  }

  return (
    <>
      <section className="single-article-card">
        <section className="article-list-card">
          <ArticleCard
            articleId={article.article_id}
            articleImg={article.article_img_url}
            author={article.author}
            createdAt={article.created_at}
            title={article.title}
            topic={article.topic}
            totalComments={article.total_comments}
            votes={article.votes}
          />
        </section>
        <div>
          <p style={{ color: "rgba(212, 212, 212, 0.87)" }}>{article.body}</p>
          <div className="voting-buttons">
            <VotingButtons
              upVote={upVote}
              upVoted={upVoted}
              downVote={downVote}
              downVoted={downVoted}
            />
          </div>
          {error && (
            <h6 style={{ color: "rgb(199, 16, 16)" }}> Something went wrong</h6>
          )}
        </div>
      </section>

      <hr />
      <section className="comments-section">
        <Comments />
      </section>
    </>
  );
}

export default SingleArticle;
