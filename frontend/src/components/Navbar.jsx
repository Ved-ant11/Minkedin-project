import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { motion } from "framer-motion";
import { User } from "lucide-react";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="relative z-50 w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 backdrop-blur-xl border-b border-slate-800/60 shadow-xl px-10 py-4 flex items-center justify-between">

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-900/60 via-slate-700/30 to-slate-950/60 pointer-events-none rounded-t" />
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-3"
      >
        <Link
          to="/"
          className="flex items-center font-extrabold text-2xl tracking-wide text-slate-100 hover:text-slate-200 transition-colors duration-200 select-none cursor-pointer"
          aria-label="Mini LinkedIn Home"
        >
          <User className="w-7 h-7 mr-3 text-slate-400" />
          Mini LinkedIn
        </Link>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.13, duration: 0.5 }}
        className="flex items-center gap-7"
      >
        {user ? (
          <>
            <Link
              to={`/profile/${user.id}`}
              className="text-slate-200 font-semibold px-4 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-slate-700"
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="bg-slate-800 text-slate-100 px-5 py-2 rounded-lg font-semibold shadow hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-slate-700 transition-all duration-300"
              aria-label="Logout"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-slate-400 px-4 py-2 rounded-lg hover:bg-slate-800 hover:text-slate-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-slate-700"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-slate-400 px-4 py-2 rounded-lg hover:bg-slate-800 hover:text-slate-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-slate-700"
            >
              Register
            </Link>
          </>
        )}
      </motion.div>
    </nav>
  );
}

export default Navbar;
