import axios from "axios";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import { UserContext } from "../src/context/User";
import { useContext } from "react";
import getUserAvatars from "../utils/getUserAvatars";

function CommentCard({ removeComment, comments }) {
  const [unauthorised, setUnauthorised] = useState(false);
  const [lookUp, setLookUp] = useState([]);

  const { loggedUser } = useContext(UserContext);

  useEffect(() => {
    async function fetchLookUp() {
      const lookUp = await getUserAvatars();
      setLookUp(lookUp);
    }
    fetchLookUp();
  }, []);

  async function deleteComment(comment_id, author) {
    if (author === loggedUser.username) {
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
              <img
                className="user-avatar"
                src={lookUp[comment.author]}
                alt="user avatar"
              />
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
