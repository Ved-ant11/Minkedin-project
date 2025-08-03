import { useState, useEffect } from "react";
import { getPosts, createPost } from "../api/posts";
import { useAuth } from "../hooks/useAuth";

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

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-semibold text-center mb-6 text-blue-700">
        Home Feed
      </h2>

      {user ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <textarea
            placeholder="What's on your mind?"
            value={newPost}
            onChange={(e) => {
              setNewPost(e.target.value);
              setError("");
            }}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-600 mt-1">{error}</p>}
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Post
          </button>
        </form>
      ) : (
        <p className="text-center text-gray-600 mb-6">
          Please log in to create posts.
        </p>
      )}

      <div className="space-y-6">
        {posts.length === 0 ? (
          <p className="text-center text-gray-600">No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white p-5 rounded shadow-md border border-gray-200"
            >
              <p className="text-gray-800 mb-2">{post.content}</p>
              <div className="text-sm text-gray-500">
                By <span className="font-semibold">{post.author.name}</span> at{" "}
                {new Date(post.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
