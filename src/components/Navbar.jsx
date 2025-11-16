import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { logout, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser == null) {
      navigate("/login");
    }
  }, [currentUser]);

  if (!currentUser) {
    return null;
  }

  return (
    <div>
      {currentUser.role == "user" ? (
        <div>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/favoriteNews">Favorite</Link>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <Link to="/">Home</Link>
          <Link to="/news">News</Link>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
