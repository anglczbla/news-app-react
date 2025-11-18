import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser.role !== "admin") {
      navigate("/login");
    }
  }, [currentUser]);

  return <div>Home</div>;
};

export default Home;
