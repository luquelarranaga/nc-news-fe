import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
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

  const [votes, setVotes] = useState(null);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);
  const [voteError, setVoteError] = useState(false);

  const { isLoading, error, data } = useAxios(getArticleById, {
    deps: [article_id],
    params: [article_id],
  });

  useEffect(() => {
    if (data) setVotes(data.votes);
  }, [data]);

  if (isLoading === true) return <h4>Loading...</h4>;
  if (error)
    return <h4 style={{ color: "rgb(199, 16, 16)" }}> Something went wrong</h4>;

  async function upVote() {
    const increment = hasUpvoted ? -1 : 1;
    setVotes((current) => current + increment);
    setHasUpvoted(!hasUpvoted);
    try {
      await axios.patch(articleIdUrl, { inc_votes: increment });
      setVoteError(false);
    } catch (err) {
      setVotes((current) => current - increment);
      setHasUpvoted(hasUpvoted);
      setVoteError(true);
    }
  }

  async function downVote() {
    const increment = hasDownvoted ? 1 : -1;
    setVotes((current) => current + increment);
    setHasDownvoted(!hasDownvoted);
    try {
      await axios.patch(articleIdUrl, { inc_votes: increment });
      setVoteError(false);
    } catch (err) {
      setVotes((current) => current - increment);
      setHasDownvoted(hasDownvoted);
      setVoteError(true);
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
            votes={votes}
          />
        </section>
        <div>
          <p style={{ color: "rgba(212, 212, 212, 0.87)" }}>{data.body}</p>
          <div className="voting-buttons">
            <VotingButtons
              upVote={upVote}
              hasUpvoted={hasUpvoted}
              downVote={downVote}
              hasDownvoted={hasDownvoted}
            />
            {voteError && (
              <h4 style={{ color: "rgb(199, 16, 16)" }}>
                {" "}
                Something went wrong
              </h4>
            )}
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
