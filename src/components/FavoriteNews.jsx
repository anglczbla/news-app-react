import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { NewsContext } from "../context/NewsContext";

const FavoriteNews = () => {
  const { favNews, deleteFavNews } = useContext(NewsContext);
  const { currentUser } = useContext(AuthContext);

  const [search, setSearch] = useSearchParams();
  const searching = search.get("q") || "";

  const findEmail = favNews.find(
    (news) => news.email == currentUser.email
  )?.items;

  const filterFavNews =
    searching != ""
      ? findEmail.filter((news) =>
          news.title.toLowerCase().includes(searching.toLowerCase())
        )
      : findEmail;

  const handleFavSearchNews = (e) => {
    setSearch({
      q: e.target.value,
    });
  };

  return (
    <div>
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
    </div>
  );
};

export default FavoriteNews;
