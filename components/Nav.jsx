import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function navigateHome() {
    navigate("/");
  }

  function navigateTopics() {
    navigate("/topics");
  }

  return (
    <nav className="nav">
      <button
        className={`nav-buttons ${pathname === "/" ? "active" : ""}`}
        type="button"
        onClick={navigateHome}
      >
        Home
      </button>
      <button
        className={`nav-buttons ${pathname === "/topics" ? "active" : ""}`}
        type="button"
        onClick={navigateTopics}
      >
        Topics
      </button>
    </nav>
  );
}

export default Nav;
