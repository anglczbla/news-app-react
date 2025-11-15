import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { NewsContext } from "../context/NewsContext";

const News = () => {
  const { admin } = useContext(AuthContext);
  const {
    news,
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
  } = useContext(NewsContext);

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
          <input
            type="text"
            name="search"
            value={searching}
            onChange={handleSearch}
            placeholder="Search News"
          />
          <h1>Hasil Search ({filterNews.length} results)</h1>
          {filterNews.map((item, index) => (
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
          <input
            type="text"
            name="search"
            value={searching}
            onChange={handleSearch}
            placeholder="Search News"
          />
          <h1>List News</h1>
          {filterNews.map((item, index) => (
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
