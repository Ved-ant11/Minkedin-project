import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../api/users";
import { motion } from "framer-motion";
import { User, Mail, Info } from "lucide-react";

function Profile() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  const fetchUser = async () => {
    try {
      const res = await getUserProfile(id);
      setUserData(res.data.user);
      setPosts(res.data.posts);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch profile");
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 overflow-x-hidden hide-scrollbar">
        <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-6 py-4 rounded-xl shadow-lg text-center animate-pulse">
          {error}
        </div>
      </div>
    );

  if (!userData)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-x-hidden">
        <p className="text-slate-400 text-lg animate-pulse">Loading...</p>
      </div>
    );

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.13,
      },
    },
  };
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-10 px-4 overflow-x-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(120,119,198,0.08),transparent_62%)] pointer-events-none z-0" />

      <div className="absolute -top-10 -left-10 w-80 h-80 bg-slate-600/10 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-10 -right-16 w-80 h-80 bg-slate-600/10 rounded-full blur-3xl -z-10" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-3xl z-10"
      >
        <motion.div
          variants={cardVariants}
          className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl shadow-2xl p-8 flex flex-col items-center mb-10"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center mb-4">
            <User className="w-8 h-8 text-slate-200" />
          </div>
          <h2 className="text-3xl font-bold text-slate-100 mb-2">
            {userData.name}
          </h2>
          <div className="flex items-center gap-2 mb-2 text-slate-400">
            <Mail className="w-4 h-4" />
            <span className="text-sm">{userData.email}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <Info className="w-4 h-4" />
            <span>
              {userData.bio || (
                <span className="italic text-slate-500">No bio provided</span>
              )}
            </span>
          </div>
        </motion.div>

        <motion.div variants={cardVariants} className="mb-4">
          <h3 className="text-2xl font-semibold mb-6 text-slate-200 tracking-tight">
            Posts
          </h3>
          {posts.length === 0 ? (
            <p className="text-slate-500 italic text-center bg-slate-900/40 py-4 px-2 rounded-xl border border-slate-800/40">
              No posts yet.
            </p>
          ) : (
            posts.map((post) => (
              <motion.div
                key={post._id}
                variants={cardVariants}
                className="bg-slate-900/40 border border-slate-800/40 rounded-lg shadow-md mb-4 px-6 py-5 transition-transform hover:-translate-y-1 hover:shadow-xl"
              >
                <p className="text-slate-100 mb-2">{post.content}</p>
                <div className="text-slate-500 text-xs flex justify-end">
                  {new Date(post.createdAt).toLocaleString()}
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Profile;
