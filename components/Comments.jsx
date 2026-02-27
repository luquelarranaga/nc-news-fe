import { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react";
import Popup from "reactjs-popup";
import Modal from "./Modal";
import CommentCard from "./CommentCard";

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
      <div className="comment-buttons-section">
        <button
          className="all-buttons"
          type="button"
          onClick={updateCommentsShowing}
          style={{
            borderColor:
              areCommentsShowing === true ? "rgb(172, 217, 172)" : "",
          }}
        >
          show comments
        </button>
        <Popup
          trigger={
            <button type="button" className="all-buttons">
              new comment
            </button>
          }
          modal
        >
          {" "}
          <Modal
            articleId={article_id}
            addNewComment={setComments}
            currentComments={comments}
          />
        </Popup>
      </div>
      {areCommentsShowing && (
        <ul style={{ margin: 0 }}>
          <CommentCard removeComment={setComments} comments={comments} />
        </ul>
      )}
    </>
  );
}

export default Comments;
