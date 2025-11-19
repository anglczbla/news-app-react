import { Heart, HeartOff, Search } from "lucide-react";
import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { NewsContext } from "../context/NewsContext";

const Dashboard = () => {
  const { news, favoriteNews, alreadyFavorite, deleteFavNews } =
    useContext(NewsContext);
  const { currentUser } = useContext(AuthContext);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Featured News
          </h1>
          <p className="text-gray-600">Stay updated with the latest stories</p>
        </div>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              name="search"
              value={searching}
              onChange={handleSearch}
              placeholder="Search News"
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors shadow-sm"
            />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">List News</h2>
        {filterNews !== null ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filterNews.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2"></div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800 flex-1">
                      {item.title}
                    </h3>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                      #{item.id}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6 line-clamp-3">{item.body}</p>
                  {alreadyFavorite(item.id) ? (
                    <button
                      onClick={() => deleteFavNews(item.id)}
                      className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 w-full justify-center"
                    >
                      <HeartOff className="h-5 w-5" />
                      <span>Delete Favorite</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => favoriteNews(item, currentUser.email)}
                      className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-red-600 transition-all duration-200 transform hover:scale-105 w-full justify-center"
                    >
                      <Heart className="h-5 w-5" />
                      <span>Add to Favorites</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Dashboard;
