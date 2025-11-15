import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const News = () => {
  const { user, admin } = useContext(AuthContext);
  const [formNews, setFormNews] = useState({
    id: "",
    title: "",
    body: "",
  });

  const [news, setNews] = useState([]);
  const [favNews, setFavNews] = useState([]);
  console.log("isi news", news);

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
    }
  };

  console.log("isi favNews", favNews);

  return (
    <div>
      {admin ? (
        <div>
          <form onSubmit={addNews}>
            <label htmlFor="id"></label>
            <input
              type="text"
              name="id"
              value={formNews.id}
              placeholder="Masukan id news"
              onChange={handleChangeNews}
            />
            <label htmlFor="title"></label>
            <input
              type="text"
              name="title"
              value={formNews.title}
              placeholder="Masukan title news"
              onChange={handleChangeNews}
            />
            <label htmlFor="body"></label>
            <input
              type="text"
              name="body"
              value={formNews.body}
              placeholder="Masukan body news"
              onChange={handleChangeNews}
            />
            <button type="submit">Add News</button>
          </form>

          <h1>List News</h1>
          {news.map((item, index) => (
            <div key={item.id}>
              <ul>
                <li>ID: {item.id}</li>
                <li>Title: {item.title}</li>
                <li>Body:{item.body}</li>
              </ul>
              <button onClick={() => deleteNews(item.id)}>Delete news</button>
              <button onClick={() => toggleNews(item, index)}>Edit</button>
              {showToggleNews === index ? (
                <div>
                  <form>
                    <label htmlFor="id">ID</label>
                    <input
                      type="text"
                      name="id"
                      value={editNews.id}
                      placeholder="Input ID Baru"
                      onChange={handleChangeEditNews}
                    />
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={editNews.title}
                      placeholder="Input Title Baru"
                      onChange={handleChangeEditNews}
                    />
                    <label htmlFor="body">Body</label>
                    <input
                      type="text"
                      name="body"
                      value={editNews.body}
                      placeholder="Input Body Baru"
                      onChange={handleChangeEditNews}
                    />
                  </form>
                  <button onClick={() => saveEdit(item, editNews)}>
                    Save Edit
                  </button>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h1>List News</h1>
          {news.map((item, index) => (
            <div key={item.id}>
              <ul>
                <li>ID: {item.id}</li>
                <li>Title: {item.title}</li>
                <li>Body:{item.body}</li>
              </ul>
              <button onClick={() => favoriteNews(item)}>
                Add to Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default News;
