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
          <CommentCard removeComment={setComments} comments={comments} />
        </ul>
      )}
    </>
  );
}

export default Comments;
