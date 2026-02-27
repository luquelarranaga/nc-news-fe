import { Link } from "react-router-dom";

function ArticleCard({
  articleId,
  articleImg,
  author,
  createdAt,
  title,
  topic,
  totalComments,
  votes,
}) {
  return (
    <section className="article-list-card">
      <img className="article-img" src={articleImg} alt="article image" />
      <div>
        <h6 className="article-author-topic">
          {author} {new Date(createdAt).toLocaleDateString()}
        </h6>
        <Link to={`/articles/${articleId}`}>
          <h3 className="article-title">{title}</h3>
        </Link>
        <h5 className="article-topic">{topic}</h5>
        <h6 className="article-comments-votes">
          comments {totalComments}, {votes}
        </h6>
      </div>
    </section>
  );
}

export default ArticleCard;
