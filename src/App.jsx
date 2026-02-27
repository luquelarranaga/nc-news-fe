import "./App.css";
import { Routes, Route } from "react-router-dom";

import Header from "../components/Header";
import Nav from "../components/Nav";
import Articles from "../components/Articles";
import SingleArticle from "../components/SingleArticle";
import Topics from "../components/Topics";
import TopicSlug from "../components/TopicSlug";
import Comments from "../components/Comments";
import { UserProvider } from "./context/User";

function App() {
  return (
    <>
      <UserProvider>
        <Header />
        <Nav />
        <hr />
        <Routes>
          <Route path="/" element={<Articles />} />
          <Route path="/articles/:article_id" element={<SingleArticle />} />
          <Route path="/articles/:article_id/comments" element={<Comments />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/topics/:slug" element={<TopicSlug />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
