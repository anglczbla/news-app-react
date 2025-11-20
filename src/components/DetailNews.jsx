import { ArrowLeft, Hash } from "lucide-react";
import { useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { NewsContext } from "../context/NewsContext";

const DetailNews = () => {
  const { id } = useParams();
  const { news, favNews } = useContext(NewsContext);
  const navigate = useNavigate();
  const location = useLocation();

  const findNews = news.find((item) => item.id == id);
  const findFavNews = favNews.find((item) => item.id == id);
  const isFromFavorite = location.pathname.includes("/favoriteNews");

  const currentNews = findNews || findFavNews;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() =>
            navigate(isFromFavorite ? "/favoriteNews" : "/dashboard")
          }
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold mb-6 transition-colors group"
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          <span>
            {isFromFavorite ? "Back to Favorite News" : "Back to Dashboard"}
          </span>
        </button>

        {!currentNews ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <span className="text-3xl">📰</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              News Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              The news article you're looking for doesn't exist or has been
              removed.
            </p>
            <button
              onClick={() =>
                navigate(isFromFavorite ? "/favoriteNews" : "/dashboard")
              }
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all"
            >
              Go Back
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Header Gradient */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2"></div>

            {/* Content */}
            <div className="p-8 md:p-12">
              {/* Meta Info */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full">
                  <Hash className="h-4 w-4" />
                  <span>{currentNews.id}</span>
                </span>
                {isFromFavorite && (
                  <span className="inline-flex items-center space-x-2 bg-pink-100 text-pink-800 text-sm font-semibold px-4 py-2 rounded-full">
                    <span>⭐</span>
                    <span>Favorite</span>
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
                {currentNews.title}
              </h1>

              {/* Divider */}
              <div className="border-t border-gray-200 my-6"></div>

              {/* Body */}
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                  {currentNews.body}
                </p>
              </div>

              {/* Footer Actions */}
              <div className="mt-10 pt-6 border-t border-gray-200">
                <button
                  onClick={() =>
                    navigate(isFromFavorite ? "/favoriteNews" : "/dashboard")
                  }
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all transform hover:scale-105"
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span>
                    Back to {isFromFavorite ? "Favorites" : "Dashboard"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailNews;
