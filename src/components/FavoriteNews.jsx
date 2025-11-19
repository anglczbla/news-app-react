import { Search, Star, Trash2 } from "lucide-react";
import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { NewsContext } from "../context/NewsContext";

const FavoriteNews = () => {
  const { favNews, deleteFavNews } = useContext(NewsContext);
  const { currentUser } = useContext(AuthContext);

  const [search, setSearch] = useSearchParams();
  const searching = search.get("q") || "";

  const findEmail = favNews.find(
    (news) => news.email == currentUser.email
  )?.items;

  const filterFavNews =
    searching != ""
      ? findEmail.filter((news) =>
          news.title.toLowerCase().includes(searching.toLowerCase())
        )
      : findEmail;

  const handleFavSearchNews = (e) => {
    setSearch({
      q: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center space-x-2">
            <Star className="h-10 w-10 text-yellow-500 fill-yellow-500" />
            <span>Favorite News</span>
          </h1>
          <p className="text-gray-600">Your saved articles</p>
        </div>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              name="search"
              value={searching}
              onChange={handleFavSearchNews}
              placeholder="Search Favorite News"
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-colors shadow-sm"
            />
          </div>
        </div>

        {favNews.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Star className="h-20 w-20 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-600">No news in favorites</p>
            <p className="text-gray-400 mt-2">
              Start adding articles to your favorites!
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              Results ({filterFavNews.length})
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filterFavNews.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 h-2"></div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800 flex-1">
                        {item.title}
                      </h3>
                      <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full">
                        #{item.id}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {item.body}
                    </p>
                    <button
                      onClick={() => deleteFavNews(item.id)}
                      className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 w-full justify-center"
                    >
                      <Trash2 className="h-5 w-5" />
                      <span>Delete from Favorites</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoriteNews;
