import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import News from "./components/News";
import ProtectedNavbar from "./components/ProtectedNavbar";
import AuthProvider from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedNavbar />}>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<News />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
