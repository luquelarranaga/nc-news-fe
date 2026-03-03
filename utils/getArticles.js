import axios from "axios";

async function getArticles(sortBy, order) {
  const { data } = await axios(
    `https://back-end-nc-news-yvh9.onrender.com/api/articles?${sortBy}&${order}`,
  );
  const { articles } = data;
  console.log("articles in getArticles utils function", articles);
  return articles;
}

export default getArticles;
