import axios from "axios";

async function getArticleById(article_id) {
  const { data } = await axios(
    `https://back-end-nc-news-yvh9.onrender.com/api/articles/${article_id}`,
  );
  const { article } = data;
}

export default getArticleById;
