import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import FavoriteNews from "./components/FavoriteNews";
import Home from "./components/Home";
import Login from "./components/Login";
import News from "./components/News";
import ProtectedNavbar from "./components/ProtectedNavbar";
import AuthProvider from "./context/AuthContext";
import { NewsProvider } from "./context/NewsContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NewsProvider>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedNavbar />}>
              <Route path="/" element={<Home />} />
              <Route path="/news" element={<News />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/favoriteNews" element={<FavoriteNews />} />
            </Route>
          </Routes>
        </NewsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
