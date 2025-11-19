import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  console.log("isi current user", currentUser);

  const [news, setNews] = useState(
    JSON.parse(localStorage.getItem("news") || "[]")
  );
  const [favNews, setFavNews] = useState(
    JSON.parse(localStorage.getItem("favnews")) || []
  );
  console.log("isi fav news", favNews);

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
    // user add fav news -> ngebentuk object yg berisi email dan items sbg key, yg dmna
    // items itu berisi value array of object dari berbagi news yg di favorite user
    // case 1
    // user blm pernah add favnews sama sekali -> ngebntuk object berisi email dan items dg value aof
    // case 2
    // user sudah perna favorite, mapping object lama dan di tambah dengan news baru

    // cek dlu udah ada blm isinya
    // const sudahAda = favNews.find(i => i.id == )
    // currentUser.email === database favNews (emailnya)

    const isExistEmail = favNews.find((news) => news.email == email) != null;
    console.log(isExistEmail);
    console.log(
      "testing",
      favNews.find((news) => news.email == email)
    );

    if (isExistEmail) {
      // case 2
      // user sudah perna favorite, mapping object lama dan di tambah dengan news baru
      const newDataEmail = favNews.map(function (news) {
        if (news.email == email) {
          return {
            ...news,
            items: [item, ...news.items],
          };
        } else {
          return news;
        }
      });
      setFavNews(newDataEmail);
      localStorage.setItem("favnews", JSON.stringify(newDataEmail));
    } else {
      // case 1
      // user blm pernah add favnews sama sekali -> ngebntuk object berisi email dan items dg value aof
      const newFavNews = {
        email: email,
        items: [item],
      };
      const data = [...favNews, newFavNews];
      setFavNews(data);
      localStorage.setItem("favnews", JSON.stringify(data));
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

    const newFavNews = favNews.map((u) => {
      if (u.email === currentUser.email) {
        return {
          ...u,
          items: u.items.filter((item) => item.id !== id),
        };
      } else {
        return u;
      }
    });

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
