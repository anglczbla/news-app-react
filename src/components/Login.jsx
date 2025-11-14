import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, logout } = useContext(AuthContext);
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });
  console.log("isi form login", formLogin);

  const handleLogin = (e) => {
    const { name, value } = e.target;
    setFormLogin({ ...formLogin, [name]: value });
  };

  const submitLogin = (e) => {
    e.preventDefault();
    const success = login(formLogin.email, formLogin.password);

    if (success) {
      navigate("/");
      alert("sukses");
    }
  };

  return (
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
      </form>
    </div>
  );
};

export default Login;
