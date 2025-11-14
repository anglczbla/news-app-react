import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(localStorage.getItem("admin"));
  const navigate = useNavigate();
  const login = (email, password) => {
    if (email === "angel@gmail.com" && password === "123") {
      const dataAdmin = {
        email,
        password,
        role: "admin",
      };
      localStorage.setItem("admin", JSON.stringify(dataAdmin));
      setAdmin(dataAdmin);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/login");
  };
  return (
    <div>
      <AuthContext.Provider value={{ login, logout, admin }}>
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
