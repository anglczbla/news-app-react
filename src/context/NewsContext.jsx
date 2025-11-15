import { createContext, useEffect, useState } from "react";

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState(JSON.parse(localStorage.getItem("news")));
  const [favNews, setFavNews] = useState([]);
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

  const favoriteNews = (item) => {
    const isExist = favNews.find((news) => news.id === item.id);

    if (!isExist) {
      const newFavNews = [...favNews, item];
      setFavNews(newFavNews);
      alert("success add to favorite");
      localStorage.setItem("favnews", JSON.stringify(newFavNews));
    } else {
      alert("news already exist in favorite");
    }
  };

  const deleteFavNews = (id) => {
    const deleteFavNewsList = favNews.filter((news) => news.id !== id);
    setFavNews(deleteFavNewsList);
    localStorage.setItem("favnews", JSON.stringify(deleteFavNewsList));
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
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};
