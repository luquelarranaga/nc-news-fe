import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function Modal({ articleId }) {
  const [inputValue, setInputValue] = useState("");
  const [invalidInput, setInvalidInput] = useState(true);

  const user = {
    username: "tickle122",
    name: "Tom Tickle",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953",
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (inputValue === "") {
      setInvalidInput(true);
    } else {
      setInvalidInput(false);
    }

    try {
      await axios.post(
        `https://back-end-nc-news-yvh9.onrender.com/api/articles/${articleId}/comments`,
        {
          username: user.username,
          body: inputValue,
        },
      );
      console.log("posted!");
    } catch (err) {
      console.log("error>>", err);
    }
    setInputValue("");
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
      </form>
    </section>
  );
}

export default Modal;
