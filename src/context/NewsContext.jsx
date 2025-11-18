import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const { currentUser, user } = useContext(AuthContext);
  console.log("isi current user", currentUser);

  const [news, setNews] = useState(
    JSON.parse(localStorage.getItem("news") || "[]")
  );
  const [favNews, setFavNews] = useState(
    JSON.parse(localStorage.getItem("favnews")) || []
  );
  const [formNews, setFormNews] = useState({
    id: "",
    title: "",
    body: "",
  });
  const [editNews, setEditNews] = useState({
    id: "",
    title: "",
    body: "",
  });
  const [showToggleNews, setShowToggleNews] = useState(null);

  useEffect(() => {
    const dataNews = localStorage.getItem("news");
    if (dataNews) {
      const data = JSON.parse(dataNews);
      setNews(Array.isArray(data) ? data : []);
    }

    const dataFavNews = localStorage.getItem("favnews");
    if (dataFavNews) {
      const data = JSON.parse(dataFavNews);
      setFavNews(Array.isArray(data) ? data : []);
    }
  }, []);

  const handleChangeNews = (e) => {
    const { name, value } = e.target;
    setFormNews({ ...formNews, [name]: value });
  };

  const handleChangeEditNews = (e) => {
    const { name, value } = e.target;
    setEditNews({ ...editNews, [name]: value });
  };

  const addNews = (e) => {
    e.preventDefault();

    const newNewsList = [...news, { ...formNews }];
    setNews(newNewsList);
    localStorage.setItem("news", JSON.stringify(newNewsList));

    setFormNews({
      id: "",
      title: "",
      body: "",
    });
  };

  const deleteNews = (id) => {
    const deleteNewNews = news.filter((item) => item.id !== id);
    setNews(deleteNewNews);
    localStorage.setItem("news", JSON.stringify(deleteNewNews));
  };

  const toggleNews = (item, index) => {
    setShowToggleNews(index);
    setEditNews(item);
  };

  const saveEdit = (item, editNews) => {
    const newNewsEdit = news.map((newss) =>
      newss.id === item.id
        ? {
            id: editNews.id,
            title: editNews.title,
            body: editNews.body,
          }
        : newss
    );
    setNews(newNewsEdit);
    localStorage.setItem("news", JSON.stringify(newNewsEdit));
    setShowToggleNews(null);
  };

  const favoriteNews = (item, email) => {
    const userIndex = favNews.findIndex((u) => u.email === email);

    if (userIndex !== -1) {
      const sudahAda = favNews[userIndex].items.some((i) => i.id === item.id);

      if (sudahAda) {
        alert("already in favorites!");
        return;
      }

      const newFavNews = favNews.map((u, index) =>
        index === userIndex ? { ...u, items: [...u.items, item] } : u
      );

      setFavNews(newFavNews);
      localStorage.setItem("favnews", JSON.stringify(newFavNews));
      alert("success add to favorite!");
    } else {
      const newFavNews = [...favNews, { email, items: [item] }];

      setFavNews(newFavNews);
      localStorage.setItem("favnews", JSON.stringify(newFavNews));
      alert("success add to favorite!");
    }
  };

  const alreadyFavorite = (id) => {
    if (!currentUser) return false;

    const user = favNews.find((u) => u.email === currentUser.email);

    if (!user) return false;

    return user.items.some((item) => item.id === id);
  };

  const deleteFavNews = (id) => {
    if (!currentUser) return;

    const newFavNews = favNews
      .map((u) => {
        if (u.email === currentUser.email) {
          return {
            ...u,
            items: u.items.filter((item) => item.id !== id),
          };
        }
        return u;
      })
      .filter((u) => u.items.length > 0);

    setFavNews(newFavNews);
    localStorage.setItem("favnews", JSON.stringify(newFavNews));
  };

  return (
    <NewsContext.Provider
      value={{
        news,
        favNews,
        formNews,
        editNews,
        showToggleNews,
        handleChangeNews,
        handleChangeEditNews,
        addNews,
        deleteNews,
        toggleNews,
        saveEdit,
        favoriteNews,
        deleteFavNews,
        alreadyFavorite,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};
