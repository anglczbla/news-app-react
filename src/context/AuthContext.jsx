import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(localStorage.getItem("admin"));
  const [user, setUser] = useState(localStorage.getItem("user"));
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
    } else {
      const dataUser = JSON.parse(localStorage.getItem("user"));
      if (dataUser.email === email && dataUser === password) {
        navigate("/");
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("user");
    setAdmin(null);
    setUser(null);
    navigate("/login");
  };

  const regist = (valueRegist) => {
    const { email, password, username } = valueRegist;
    if (!email || !password || !username)
      return alert("Email dan Password wajib diisi");
    localStorage.setItem("user", JSON.stringify(valueRegist));
    setUser(valueRegist);
  };

  return (
    <div>
      <AuthContext.Provider value={{ login, logout, admin, regist, user }}>
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
