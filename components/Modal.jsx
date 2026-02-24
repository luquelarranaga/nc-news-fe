function Modal() {
  function handleSubmit(e) {
    e.preventDefault();
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
        />{" "}
        <button type="submit" id="post-comment-button">
          post comment
        </button>
      </form>
    </section>
  );
}

export default Modal;
