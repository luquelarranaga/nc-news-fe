import { useState } from "react";
import axios from "axios";

function Modal({ articleId, addNewComment, currentComments }) {
  const [inputValue, setInputValue] = useState("");
  const [invalidInput, setInvalidInput] = useState(false);
  const [error, setError] = useState(false);

  const user = {
    username: "tickle122",
    name: "Tom Tickle",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953",
  };

  const newComment = {
    author: user.username,
    body: inputValue,
    created_at: new Date(),
    votes: 0,
    avatar_url: user.avatar_url,
  };

  async function handleSubmit(e) {
    e.preventDefault();

    inputValue.length === 0 ? setInvalidInput(true) : setInvalidInput(false);

    if (inputValue.length > 0) {
      try {
        await axios.post(
          `https://back-end-nc-news-yvh9.onrender.com/api/articles/${articleId}/comments`,
          {
            username: user.username,
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
        <p>{user.name}</p>
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
