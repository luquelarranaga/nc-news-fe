import { useState } from "react";

function Modal() {
  const [inputValue, setInputValue] = useState("");
  const [invalidInput, setInvalidInput] = useState(true);

  const user = {
    username: "tickle122",
    name: "Tom Tickle",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953",
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (inputValue === "") {
      setInvalidInput(true);
    } else {
      setInvalidInput(false);
    }

    const newComment = {
      username: user.name,
      body: inputValue,
    };

    console.log("form json>>>", inputValue);
    console.log("new comment>>>", newComment);

    setInputValue("");
  }

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  return (
    <section className="modal">
      <form onSubmit={handleSubmit}>
        {" "}
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
