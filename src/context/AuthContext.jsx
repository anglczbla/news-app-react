import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(localStorage.getItem("admin"));
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );

  const navigate = useNavigate();
  const login = (email, password) => {
    if (email === "angel@gmail.com" && password === "123") {
      const dataAdmin = {
        email,
        password,
        role: "admin",
      };
      const adminData = {
        email: email,
        role: "admin",
      };
      localStorage.setItem("admin", JSON.stringify(dataAdmin));
      localStorage.setItem("currentUser", JSON.stringify(adminData));
      setCurrentUser(adminData);
      setAdmin(dataAdmin);
      return true;
    } else {
      const dataUser = JSON.parse(localStorage.getItem("user"));
      if (dataUser.email === email && dataUser.password === password) {
        const userData = {
          email: dataUser.email,
          role: "user",
        };
        localStorage.setItem("currentUser", JSON.stringify(userData));
        setCurrentUser(userData);
        setUser(dataUser);
        return true;
      } else {
        return false;
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/login");
  };

  const regist = (valueRegist) => {
    const { email, password, username } = valueRegist;
    if (!email || !password || !username) {
      alert("Email dan Password wajib diisi");
      return false;
    } else {
      localStorage.setItem("user", JSON.stringify(valueRegist));
      setUser(valueRegist);
      return true;
    }
  };

  return (
    <div>
      <AuthContext.Provider
        value={{ login, logout, admin, regist, user, currentUser }}
      >
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
