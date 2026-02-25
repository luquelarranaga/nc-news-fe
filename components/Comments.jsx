import { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react";
import Popup from "reactjs-popup";
import Modal from "./Modal";

function Comments({}) {
  const { article_id } = useParams();
  const commentsUrl = `https://back-end-nc-news-yvh9.onrender.com/api/articles/${article_id}/comments`;
  const [comments, setComments] = useState([]);
  const [areCommentsShowing, setCommentsShowing] = useState(false);

  useEffect(() => {
    async function getComments() {
      const response = await fetch(commentsUrl);
      const { comments } = await response.json();
      setComments(comments);
    }
    getComments();
  }, [comments]);

  function updateCommentsShowing() {
    setCommentsShowing(!areCommentsShowing);
  }

  return (
    <>
      <div>
        <button type="button" onClick={updateCommentsShowing}>
          show comments
        </button>
      </div>
      <Popup trigger={<button type="button">new comment</button>} modal>
        {" "}
        <Modal
          articleId={article_id}
          addNewComment={setComments}
          currentComments={comments}
        />
      </Popup>
      {areCommentsShowing && (
        <ul>
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
      )}
    </>
  );
}

export default Comments;
