import { Newspaper } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, regist, currentUser } = useContext(AuthContext);
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  const [formRegist, setFormRegist] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (currentUser !== null) {
      if (currentUser.role === "admin") {
        navigate("/");
      } else if (currentUser.role === "user") {
        navigate("/dashboard");
      }
    }
  }, [currentUser, navigate]);

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
      alert("sukses");
    } else {
      alert("wrong email or password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
          <div className="flex items-center justify-center space-x-2">
            <Newspaper className="h-10 w-10 text-white" />
            <h1 className="text-3xl font-bold text-white">NewsApp</h1>
          </div>
          <p className="text-center text-blue-100 mt-2">
            Stay informed, stay ahead
          </p>
        </div>

        <div className="p-8">
          {!showLogin ? (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Create Account
              </h2>
              <form onSubmit={submitRegist} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formRegist.email}
                    placeholder="Masukan email anda"
                    onChange={handleRegist}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formRegist.password}
                    placeholder="Masukan password anda"
                    onChange={handleRegist}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="username"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formRegist.username}
                    placeholder="Masukan username anda"
                    onChange={handleRegist}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105"
                >
                  Regist
                </button>
                <button
                  type="button"
                  onClick={() => setShowLogin(true)}
                  className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200"
                >
                  Already Regist?
                </button>
              </form>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Welcome Back!
              </h2>
              <form onSubmit={submitLogin} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Masukan Email anda"
                    value={formLogin.email}
                    onChange={handleLogin}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Masukan Password anda"
                    value={formLogin.password}
                    onChange={handleLogin}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 transform hover:scale-105"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => setShowLogin(false)}
                  className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200"
                >
                  Need to Regist?
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
