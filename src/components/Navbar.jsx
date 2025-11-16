import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { logout, currentUser } = useContext(AuthContext);

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
