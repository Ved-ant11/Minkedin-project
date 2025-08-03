import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <div className="space-x-4">
        <Link
          to="/"
          className="font-bold text-xl text-blue-600 hover:text-blue-800"
        >
          Mini LinkedIn
        </Link>
      </div>
      <div className="space-x-6">
        {user ? (
          <>
            <Link
              to={`/profile/${user.id}`}
              className="text-gray-700 hover:text-blue-600"
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-700 hover:text-blue-600">
              Login
            </Link>
            <Link to="/register" className="text-gray-700 hover:text-blue-600">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
