import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../src/context/User";

function Modal({ articleId, addNewComment, currentComments }) {
  const [inputValue, setInputValue] = useState("");
  const [invalidInput, setInvalidInput] = useState(false);
  const [error, setError] = useState(false);

  const { loggedUser } = useContext(UserContext);

  const newComment = {
    comment_id: currentComments.length + 1,
    author: loggedUser.username,
    body: inputValue,
    created_at: new Date(),
    votes: 0,
    avatar_url: loggedUser.avatar_url,
  };

  async function handleSubmit(e) {
    e.preventDefault();

    inputValue.length === 0 ? setInvalidInput(true) : setInvalidInput(false);

    if (inputValue.length > 0) {
      try {
        await axios.post(
          `https://back-end-nc-news-yvh9.onrender.com/api/articles/${articleId}/comments`,
          {
            username: loggedUser.username,
            body: inputValue,
          },
        );
        setInputValue("");
        setError(false);
        addNewComment((currComments) => {
          return [newComment, ...currComments];
        });
      } catch (err) {
        setError(true);
      }
    }
  }

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  return (
    <section className="modal">
      <form onSubmit={handleSubmit}>
        {" "}
        <p>{loggedUser.name}</p>
        <label htmlFor="comment"></label>
        <textarea
          id="comment"
          rows={5}
          placeholder="enter your comment here"
          value={inputValue}
          onChange={handleChange}
        />{" "}
        <button type="submit" id="post-comment-button">
          post comment
        </button>
        {invalidInput && <h6>"Please enter a comment!"</h6>}
        {error && (
          <h6 style={{ color: "rgb(199, 16, 16)" }}>Something went wrong</h6>
        )}
      </form>
    </section>
  );
}

export default Modal;
