import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NewsContext } from "../context/NewsContext";

const DetailNews = () => {
  const { id } = useParams();
  const { news, favNews } = useContext(NewsContext);
  const navigate = useNavigate();

  const findNews = news.find((news) => news.id == id);
  const findFavNeWS = favNews.find((news) => news.id == id);
  const isFromFavorite = location.pathname.includes("/favoriteNews");

  return (
    <div>
      {!findNews && !findFavNeWS ? (
        <p>No News</p>
      ) : (
        <div>
          <h1>Title: {findNews?.title || findFavNews?.title}</h1>
          <p>Body: {findNews?.body || findFavNews?.body}</p>
        </div>
      )}

      <button
        onClick={() =>
          navigate(isFromFavorite ? "/favoriteNews" : "/dashboard")
        }
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {isFromFavorite ? "Back to Favorite News" : "Back to Dashboard"}
      </button>
    </div>
  );
};

export default DetailNews;
