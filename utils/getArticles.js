async function getArticles() {
  const { data } = await axios(
    `https://back-end-nc-news-yvh9.onrender.com/api/articles?${sortBy}&${order}`,
  );
  const { articles } = data;
}

export default getArticles;
