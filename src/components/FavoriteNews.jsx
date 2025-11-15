import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const FavoriteNews = () => {
  const [favNews, setFavNews] = useState(
    JSON.parse(localStorage.getItem("favnews"))
  );

  const deleteNews = (id) => {
    const deleteFavNews = favNews.filter((news) => news.id !== id);
    setFavNews(deleteFavNews);
    localStorage.setItem("favnews", JSON.stringify(deleteFavNews));
  };

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
      {favNews.length == 0 ? (
        <p>no news</p>
      ) : (
        <div>
          {filterFavNews.map((item) => (
            <div key={item.id}>
              <ul>
                <li>ID:{item.id}</li>
                <li>Title: {item.title}</li>
                <li>Body:{item.body}</li>
              </ul>
              <button onClick={() => deleteNews(item.id)}>Delete News</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteNews;
