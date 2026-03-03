async function getArticles() {
  const { data } = await axios(articlesUrl);
  const { articles } = data;
}
