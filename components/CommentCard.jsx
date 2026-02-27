import axios from "axios";
import { useState } from "react";
import Popup from "reactjs-popup";

function CommentCard({ removeComment, comments }) {
  const [unauthorised, setUnauthorised] = useState(false);

  async function deleteComment(comment_id, author) {
    if (author === "tickle122") {
      try {
        await axios.delete(
          `https://back-end-nc-news-yvh9.onrender.com/api/comments/${comment_id}`,
        );

        setUnauthorised(false);

        removeComment((currentComments) => {
          return currentComments.filter(
            (comment) => comment.comment_id !== comment_id,
          );
        });
      } catch (err) {
        console.log("error>>", err);
      }
    } else {
      setUnauthorised(true);
    }
  }

  return (
    <>
      {comments.map((comment) => {
        return (
          <>
            <li key={comment.comment_id} className="comment-card">
              <p>{comment.body}</p>
              <h6>
                {comment.author}{" "}
                {new Date(comment.created_at).toLocaleDateString()}
              </h6>
              <h6>votes {comment.votes}</h6>
              <button
                className="all-buttons"
                id="delete-button"
                type="button"
                onClick={() =>
                  deleteComment(comment.comment_id, comment.author)
                }
              >
                Delete
              </button>
            </li>
            <Popup trigger={setUnauthorised === true}>You can't delete</Popup>
          </>
        );
      })}
    </>
  );
}

export default CommentCard;
