import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(JSON.parse(localStorage.getItem("admin")));
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || []
  );
  console.log("isi data user", user);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );
  console.log("current user", currentUser);

  const navigate = useNavigate();

  const login = (email, password) => {
    if (email === "angel@gmail.com" && password === "123") {
      const adminData = {
        email: email,
        role: "admin",
      };
      localStorage.setItem("currentUser", JSON.stringify(adminData));
      setCurrentUser(adminData);
      return true;
    } else {
      const findUser = user.find(
        (user) => user.email === email && user.password === password
      );

      if (findUser) {
        const userData = {
          email: findUser.email,
          role: "user",
        };
        localStorage.setItem("currentUser", JSON.stringify(userData));
        setCurrentUser(userData);
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
    console.log("isi value regist", valueRegist);

    const { email, password, username } = valueRegist;
    if (!email || !password || !username) {
      alert("Email dan Password wajib diisi");
      return false;
    } else {
      const newUserList = [...user, valueRegist];
      localStorage.setItem("user", JSON.stringify(newUserList));
      setUser(newUserList);
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
