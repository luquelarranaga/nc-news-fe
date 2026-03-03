async function getArticle() {
  const { data } = await axios(
    `https://back-end-nc-news-yvh9.onrender.com/api/articles/${article_id}`,
  );
  const { articles } = data;
}

export default getArticle;
