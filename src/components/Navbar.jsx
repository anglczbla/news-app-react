import { Home, LogOut, Menu, Newspaper, Star, X } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { logout, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    if (currentUser == null) {
      navigate("/login");
    }
  }, [currentUser]);

  if (!currentUser) {
    return null;
  }

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Newspaper className="h-8 w-8 text-white" />
            <span className="text-white text-2xl font-bold">NewsApp</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser.role == "user" ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 text-white hover:bg-blue-500 px-4 py-2 rounded-lg transition-all duration-200"
                >
                  <Home className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/favoriteNews"
                  className="flex items-center space-x-2 text-white hover:bg-blue-500 px-4 py-2 rounded-lg transition-all duration-200"
                >
                  <Star className="h-5 w-5" />
                  <span>Favorites</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className="flex items-center space-x-2 text-white hover:bg-blue-500 px-4 py-2 rounded-lg transition-all duration-200"
                >
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </Link>
                <Link
                  to="/news"
                  className="flex items-center space-x-2 text-white hover:bg-blue-500 px-4 py-2 rounded-lg transition-all duration-200"
                >
                  <Newspaper className="h-5 w-5" />
                  <span>News</span>
                </Link>
              </>
            )}
            <button
              onClick={logout}
              className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-200"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden text-white"
          >
            {mobileMenu ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="md:hidden pb-4 space-y-2">
            {currentUser.role == "user" ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 text-white hover:bg-blue-500 px-4 py-2 rounded-lg"
                >
                  <Home className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/favoriteNews"
                  className="flex items-center space-x-2 text-white hover:bg-blue-500 px-4 py-2 rounded-lg"
                >
                  <Star className="h-5 w-5" />
                  <span>Favorites</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className="flex items-center space-x-2 text-white hover:bg-blue-500 px-4 py-2 rounded-lg"
                >
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </Link>
                <Link
                  to="/news"
                  className="flex items-center space-x-2 text-white hover:bg-blue-500 px-4 py-2 rounded-lg"
                >
                  <Newspaper className="h-5 w-5" />
                  <span>News</span>
                </Link>
              </>
            )}
            <button
              onClick={logout}
              className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg w-full"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
