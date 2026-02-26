import { useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();

  function navigateHome() {
    navigate("/");
  }

  function navigateTopics() {
    navigate("/topics");
  }

  return (
    <nav className="nav">
      <button type="button" onClick={navigateHome}>
        Home
      </button>
      <button type="button" onClick={navigateTopics}>
        Topics
      </button>
    </nav>
  );
}

export default Nav;
