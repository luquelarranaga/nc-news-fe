import { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react";

function Comments() {
  const { article_id } = useParams();
  const commentsUrl = `https://back-end-nc-news-yvh9.onrender.com/api/articles/${article_id}/comments`;
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function getComments() {
      const response = await fetch(commentsUrl);
      const { comments } = await response.json();
      console.log("all comments>>", comments);
      setComments(comments);
    }
    getComments();
  }, []);
  return (
    <>
      <ul className="comments-section">
        {comments.map((comment) => {
          return (
            <li className="comments">
              <p>{comment.body}</p>
              <h6>
                {comment.author}{" "}
                {new Date(comment.created_at).toLocaleDateString()}
              </h6>
              <h6>votes {comment.votes}</h6>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Comments;
