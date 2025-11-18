import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { NewsContext } from "../context/NewsContext";
const Dashboard = () => {
  const { news, favoriteNews, alreadyFavorite, deleteFavNews } =
    useContext(NewsContext);
  const { currentUser } = useContext(AuthContext);
  console.log("isi current user", currentUser);

  console.log("isi news", news);
  const [search, setSearch] = useSearchParams();
  const searching = search.get("q") || "";

  const handleSearch = (e) => {
    setSearch({
      q: e.target.value,
    });
  };

  const filterNews = searching
    ? news.filter((findNews) =>
        findNews.title.toLowerCase().includes(searching.toLowerCase())
      )
    : news;

  return (
    <div>
      <h1>Featured News</h1>

      <div>
        <input
          type="text"
          name="search"
          value={searching}
          onChange={handleSearch}
          placeholder="Search News"
        />
        <h1>List News</h1>
        {filterNews !== null
          ? filterNews.map((item, index) => (
              <div key={item.id}>
                <ul>
                  <li>ID: {item.id}</li>
                  <li>Title: {item.title}</li>
                  <li>Body:{item.body}</li>
                </ul>
                {alreadyFavorite(item.id) ? (
                  <button onClick={() => deleteFavNews(item.id)}>
                    Delete Favorite
                  </button>
                ) : (
                  <button onClick={() => favoriteNews(item, currentUser.email)}>
                    Add to Favorites
                  </button>
                )}
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default Dashboard;
