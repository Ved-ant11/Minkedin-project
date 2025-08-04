import { useState, useEffect } from "react";
import { getPosts, createPost } from "../api/posts";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";
import { PenLine } from "lucide-react";

function Home() {
  const { user, token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    try {
      const res = await getPosts();
      setPosts(res.data);
    } catch {
      setError("Failed to load posts");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return setError("Post content cannot be empty.");
    try {
      await createPost(newPost, token);
      setNewPost("");
      fetchPosts();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create post");
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-12 px-4 overflow-x-hidden hide-scrollbar">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(120,119,198,0.10),transparent_65%)] pointer-events-none z-0" />
      <div className="absolute -top-10 -left-10 w-80 h-80 bg-slate-700/10 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-12 -right-16 w-80 h-80 bg-slate-700/10 rounded-full blur-3xl -z-10" />

      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="text-3xl font-bold text-center mb-8 text-slate-100 tracking-tight drop-shadow"
      >
        <span className="inline-flex items-center gap-3">
          <PenLine className="w-8 h-8 text-slate-400" />
          Home Feed
        </span>
      </motion.h2>

      <div className="w-full max-w-2xl z-10">
        <motion.div variants={fadeInUp} initial="hidden" animate="visible">
          {user ? (
            <form
              onSubmit={handleSubmit}
              className="mb-10 bg-slate-900/60 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-800/50 p-6 space-y-4"
            >
              <textarea
                placeholder="What's on your mind?"
                value={newPost}
                onChange={(e) => {
                  setNewPost(e.target.value);
                  setError("");
                }}
                rows={4}
                className="w-full p-4 text-base rounded-lg bg-slate-800/60 border border-slate-700/50 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-violet-700 focus:ring-2 focus:ring-violet-700/10 transition-all duration-200 resize-none"
              />
              {error && (
                <p className="text-red-400 bg-red-500/10 border border-red-500/30 rounded px-3 py-1 mt-1 text-sm">
                  {error}
                </p>
              )}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-slate-100 text-slate-900 font-semibold px-8 py-2 rounded-lg shadow hover:bg-white transition-all duration-200"
                >
                  Post
                </Button>
              </div>
            </form>
          ) : (
            <p className="text-center text-slate-400 bg-slate-900/40 px-4 py-3 mb-10 rounded-xl border border-slate-800/30">
              Please log in to create posts.
            </p>
          )}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {posts.length === 0 ? (
            <p className="text-center text-slate-500/80 bg-slate-900/40 px-4 py-4 rounded-xl border border-slate-800/30">
              No posts yet.
            </p>
          ) : (
            posts.map((post) => (
              <div
                key={post._id}
                className="bg-slate-900/60 border border-slate-800/40 rounded-xl shadow-md px-6 py-5 transition-transform hover:-translate-y-1 hover:shadow-2xl"
              >
                <p className="text-slate-100 mb-2">{post.content}</p>
                <div className="text-xs text-slate-400 flex flex-row gap-2 justify-end">
                  By{" "}
                  <span className="font-semibold text-slate-200">
                    {post.author.name}
                  </span>
                  <span>|</span>
                  {new Date(post.createdAt).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Home;
