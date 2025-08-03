import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { token } = useAuth();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/profile/:id"
          element={token ? <Profile /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/" replace />}
        />
        <Route
          path="/register"
          element={!token ? <Register /> : <Navigate to="/" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
