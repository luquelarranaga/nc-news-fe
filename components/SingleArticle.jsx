import { useParams } from "react-router-dom";
import { useState } from "react";
import Comments from "./Comments";
import axios from "axios";
import VotingButtons from "./VotingButtons";
import ArticleCard from "./ArticleCard";
import getArticleById from "../utils/getArticleById";
import useAxios from "./hooks/useAxios";

function SingleArticle() {
  const { article_id } = useParams();
  console.log("article id in single article>>", article_id);
  const articleIdUrl = `https://back-end-nc-news-yvh9.onrender.com/api/articles/${article_id}`;

  const [votes, setVote] = useState(0);
  const [updateVote, setUpdateVote] = useState(1);
  const [upVoted, setUpVoted] = useState(false);
  const [downVoted, setDownVoted] = useState(false);

  const { isLoading, error, data } = useAxios(getArticleById, {
    deps: [article_id],
    params: [article_id],
  });

  console.log("I am data >>>", data);
  if (isLoading === true) return <h4>Loading...</h4>;
  if (error)
    return <h4 style={{ color: "rgb(199, 16, 16)" }}> Something went wrong</h4>;

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
            articleId={data.article_id}
            articleImg={data.article_img_url}
            author={data.author}
            createdAt={data.created_at}
            title={data.title}
            topic={data.topic}
            totalComments={data.total_comments}
            votes={data.votes}
          />
        </section>
        <div>
          <p style={{ color: "rgba(212, 212, 212, 0.87)" }}>{data.body}</p>
          <div className="voting-buttons">
            <VotingButtons
              upVote={upVote}
              upVoted={upVoted}
              downVote={downVote}
              downVoted={downVoted}
            />
          </div>
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
