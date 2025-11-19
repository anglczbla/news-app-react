import { Edit, Plus, Save, Search, Trash2, X } from "lucide-react";
import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { NewsContext } from "../context/NewsContext";

const News = () => {
  const { currentUser, user } = useContext(AuthContext);
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
  } = useContext(NewsContext);
  const navigate = useNavigate();

  const [search, setSearch] = useSearchParams();
  const searching = search.get("q") || "";

  const handleSearch = (e) => {
    setSearch({
      q: e.target.value,
    });
  };

  useEffect(() => {
    if (currentUser.role !== "admin") {
      navigate("/login");
    }
  }, [currentUser]);

  const filterNews = searching
    ? news.filter((findNews) =>
        findNews.title.toLowerCase().includes(searching.toLowerCase())
      )
    : news;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add News Form Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-t-4 border-indigo-600">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-lg">
              <Plus className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                Add New Article
              </h2>
              <p className="text-gray-600">Create and publish news content</p>
            </div>
          </div>

          <form onSubmit={addNews} className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label
                  htmlFor="id"
                  className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide"
                >
                  News ID
                </label>
                <input
                  type="text"
                  name="id"
                  value={formNews.id}
                  placeholder="Masukan id news"
                  onChange={handleChangeNews}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide"
                >
                  Article Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formNews.title}
                  placeholder="Masukan title news"
                  onChange={handleChangeNews}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="body"
                className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide"
              >
                Article Content
              </label>
              <textarea
                name="body"
                value={formNews.body}
                placeholder="Masukan body news"
                onChange={handleChangeNews}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all resize-none"
                rows="5"
              />
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-lg font-bold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <Plus className="h-5 w-5" />
              <span>Publish Article</span>
            </button>
          </form>
        </div>

        {/* News List Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-purple-600">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Manage Articles
            </h1>
            <p className="text-gray-600">
              Edit or delete existing news articles
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                name="search"
                value={searching}
                onChange={handleSearch}
                placeholder="Search News"
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all shadow-sm"
              />
            </div>
          </div>

          {filterNews !== null ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-700">
                  Hasil Search ({filterNews.length} results)
                </h2>
              </div>

              <div className="space-y-6">
                {filterNews.map((item, index) => (
                  <div
                    key={item.id}
                    className="border-2 border-gray-200 rounded-xl p-6 hover:border-purple-400 hover:shadow-lg transition-all duration-200 bg-gradient-to-r from-white to-gray-50"
                  >
                    {/* News Item Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-md">
                            ID: {item.id}
                          </span>
                          <h3 className="text-2xl font-bold text-gray-800">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                          {item.body}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3 mt-4">
                      <button
                        onClick={() => deleteNews(item.id)}
                        className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-5 py-2.5 rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Delete news</span>
                      </button>

                      <button
                        onClick={() => toggleNews(item, index)}
                        className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-5 py-2.5 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
                      >
                        <Edit className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                    </div>

                    {/* Edit Form */}
                    {showToggleNews === index ? (
                      <div className="mt-6 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-200">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-bold text-xl text-gray-800 flex items-center space-x-2">
                            <Edit className="h-5 w-5 text-indigo-600" />
                            <span>Edit Article</span>
                          </h4>
                          <button
                            onClick={() => toggleNews(null, null)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <X className="h-6 w-6" />
                          </button>
                        </div>

                        <form className="space-y-4">
                          <div>
                            <label
                              htmlFor="id"
                              className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide"
                            >
                              ID
                            </label>
                            <input
                              type="text"
                              name="id"
                              value={editNews.id}
                              placeholder="Input ID Baru"
                              onChange={handleChangeEditNews}
                              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="title"
                              className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide"
                            >
                              Title
                            </label>
                            <input
                              type="text"
                              name="title"
                              value={editNews.title}
                              placeholder="Input Title Baru"
                              onChange={handleChangeEditNews}
                              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="body"
                              className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide"
                            >
                              Body
                            </label>
                            <textarea
                              name="body"
                              value={editNews.body}
                              placeholder="Input Body Baru"
                              onChange={handleChangeEditNews}
                              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all resize-none"
                              rows="4"
                            />
                          </div>
                        </form>

                        <button
                          onClick={() => saveEdit(item, editNews)}
                          className="mt-4 flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          <Save className="h-5 w-5" />
                          <span>Save Edit</span>
                        </button>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default News;
