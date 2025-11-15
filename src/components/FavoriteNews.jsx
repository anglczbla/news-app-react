import { useState } from "react";

const FavoriteNews = () => {
  const [favNews, setFavNews] = useState(
    JSON.parse(localStorage.getItem("favnews"))
  );

  const deleteNews = (id) => {
    const deleteFavNews = favNews.filter((news) => news.id !== id);
    setFavNews(deleteFavNews);
    localStorage.setItem("favnews", JSON.stringify(deleteFavNews));
  };

  return (
    <div>
      <h1>Favorite News</h1>
      {favNews.map((item) => (
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
  );
};

export default FavoriteNews;
