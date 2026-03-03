import { useState } from "react";
import SortBy from "./SortBy";
import FilterBy from "./FilterBy";
import ArticleCard from "./ArticleCard";
import useAxios from "./hooks/useAxios";
import getArticles from "../utils/getArticles";

function Articles() {
  const [sortBy, setSortBy] = useState("sort_by=votes");
  const [order, setOrderTo] = useState("order=desc");
  const [toggled, setToggled] = useState(false);

  const { isLoading, error, data } = useAxios(getArticles, {
    deps: [sortBy, order],
    params: [sortBy, order],
  });

  if (isLoading === true) return <h4>Loading...</h4>;
  if (error)
    return <h4 style={{ color: "rgb(199, 16, 16)" }}> Something went wrong</h4>;

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
        {data.map((article) => {
          const articleId = article.article_id;
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
