import { useEffect } from "react";
import { useParams } from "react-router";

function Comments() {
  const { article_id } = useParams();
  const commentsUrl = `https://back-end-nc-news-yvh9.onrender.com/api/articles/${article_id}/comments`;

  useEffect(() => {
    async function getComments() {
      const response = await fetch(commentsUrl);
      const comments = await response.json();
      console.log("all comments>>", comments);
    }
    getComments();
  });
  return <>comments!</>;
}

export default Comments;
