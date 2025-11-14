import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/news">News</Link>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Navbar;
