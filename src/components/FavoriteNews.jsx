import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { NewsContext } from "../context/NewsContext";

const FavoriteNews = () => {
  const { favNews, deleteFavNews } = useContext(NewsContext);

  const [search, setSearch] = useSearchParams();
  const searching = search.get("q") || "";

  const filterFavNews = searching
    ? favNews.filter((news) =>
        news.title.toLowerCase().includes(searching.toLowerCase())
      )
    : favNews;

  const handleFavSearchNews = (e) => {
    setSearch({
      q: e.target.value,
    });
  };

  return (
    <div>
      <input
        type="text"
        name="search"
        value={searching}
        onChange={handleFavSearchNews}
        placeholder="Search Favorite News"
      />
      <h1>Favorite News</h1>
      {favNews.length === 0 ? (
        <p>No news in favorites</p>
      ) : (
        <div>
          <h2>Results ({filterFavNews.length})</h2>
          {filterFavNews.map((item) => (
            <div key={item.id}>
              <ul>
                <li>ID: {item.id}</li>
                <li>Title: {item.title}</li>
                <li>Body: {item.body}</li>
              </ul>
              <button onClick={() => deleteFavNews(item.id)}>
                Delete from Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteNews;
