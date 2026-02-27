import arrowUp from "../src/assets/arrow-up.svg";
import arrowDown from "../src/assets/arrow-down.svg";

function VotingButtons({ upVote, upVoted, downVote, downVoted }) {
  return (
    <>
      <button
        className="all-buttons"
        type="button"
        aria-label="upvote-button"
        onClick={upVote}
        id="upvote-button"
        style={{
          borderColor: upVoted === true ? "rgb(172, 217, 172)" : "",
        }}
      >
        <img
          src={arrowUp}
          alt="up vote"
          style={{ width: "16px", height: "20px" }}
        />
      </button>

      <button
        className="all-buttons"
        type="button"
        aria-label="downvote-button"
        onClick={downVote}
        id="downvote-button"
        style={{
          borderColor: downVoted === true ? "rgb(244, 65, 65)" : "",
        }}
      >
        <img
          src={arrowDown}
          alt="down vote"
          style={{ width: "16px", height: "20px" }}
        />
      </button>
    </>
  );
}

export default VotingButtons;
