import { useState } from "react";

const FavoriteNews = () => {
  const [favNews, setFavNews] = useState(
    JSON.parse(localStorage.getItem("favnews"))
  );

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
        </div>
      ))}
    </div>
  );
};

export default FavoriteNews;
