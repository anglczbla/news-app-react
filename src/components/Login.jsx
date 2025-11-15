import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, admin, regist, user } = useContext(AuthContext);
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });
  const [formRegist, setFormRegist] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [showLogin, setShowLogin] = useState(null);
  console.log("isi form login", formLogin);

  const handleLogin = (e) => {
    const { name, value } = e.target;
    setFormLogin({ ...formLogin, [name]: value });
  };

  const handleRegist = (e) => {
    const { name, value } = e.target;
    setFormRegist({ ...formRegist, [name]: value });
  };

  const submitRegist = (e) => {
    e.preventDefault();
    const successRegist = regist({ ...formRegist });
    if (successRegist) {
      alert("berhasil regist");
      setShowLogin(true);
    } else {
      alert("gagal regist, field harus lengkap");
    }
  };

  const submitLogin = (e) => {
    e.preventDefault();
    const success = login(formLogin.email, formLogin.password);

    if (success) {
      navigate("/");
      alert("sukses");
    } else {
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    if (admin || user) {
      navigate("/");
    }
  }, [admin, user, navigate]);

  return (
    <div>
      {!user && !showLogin ? (
        <div>
          <p>Regist Form</p>
          <form onSubmit={submitRegist}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={formRegist.email}
              placeholder="Masukan email anda"
              onChange={handleRegist}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={formRegist.password}
              placeholder="Masukan password anda"
              onChange={handleRegist}
            />
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={formRegist.username}
              placeholder="Masukan username anda"
              onChange={handleRegist}
            />
            <button type="submit">Regist</button>
            <button onClick={() => setShowLogin(true)}>Already Regist?</button>
          </form>
        </div>
      ) : (
        <div>
          <form onSubmit={submitLogin}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Masukan Email anda"
              value={formLogin.email}
              onChange={handleLogin}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Masukan Password anda"
              value={formLogin.password}
              onChange={handleLogin}
            />
            <button type="submit">Login</button>
            <button onClick={() => setShowLogin(false)}>Need to Regist?</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
