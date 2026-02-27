import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import SortBy from "./SortBy";
import FilterBy from "./FilterBy";
import ArticleCard from "./ArticleCard";

function Articles() {
  const [allArticles, setArticles] = useState([]);
  const [sortBy, setSortBy] = useState("sort_by=votes");
  const [order, setOrderTo] = useState("order=desc");
  const [toggled, setToggled] = useState(false);

  const articlesUrl = `https://back-end-nc-news-yvh9.onrender.com/api/articles?${sortBy}&${order}`;

  useEffect(() => {
    async function getArticles() {
      const { data } = await axios(articlesUrl);
      const { articles } = data;
      setArticles(articles);
      console.log("ARTICLES in articles component>>>", articles);
    }
    getArticles();
  }, [sortBy, toggled]);

  return (
    <>
      <div className="sorting-filtering">
        <SortBy
          changeSortBy={setSortBy}
          changeOrder={setOrderTo}
          changeToggled={setToggled}
        />
        <FilterBy />
      </div>
      <ul className="articles-list">
        {allArticles.map((article) => {
          const articleId = article.article_id;
          console.log("article idssss >>", articleId);
          return (
            <li className="article-list-card">
              <ArticleCard
                articleId={articleId}
                articleImg={article.article_img_url}
                author={article.author}
                createdAt={article.created_at}
                title={article.title}
                topic={article.topic}
                totalComments={article.total_comments}
                votes={article.votes}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Articles;
