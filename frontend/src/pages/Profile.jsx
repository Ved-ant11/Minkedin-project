import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserProfile } from "../api/users";

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

  if (error) return <p className="text-red-600 text-center mt-6">{error}</p>;

  if (!userData)
    return <p className="text-center mt-6 text-gray-600">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <div className="bg-white p-6 rounded shadow-md border border-gray-200 mb-8">
        <h2 className="text-3xl font-semibold text-blue-700 mb-3">
          {userData.name}
        </h2>
        <p className="text-gray-700 mb-1">
          <strong>Email: </strong>
          {userData.email}
        </p>
        <p className="text-gray-700">
          <strong>Bio: </strong>
          {userData.bio || "No bio provided"}
        </p>
      </div>

      <h3 className="text-2xl font-semibold mb-4 text-gray-800">Posts</h3>
      {posts.length === 0 ? (
        <p className="text-gray-600">No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            className="bg-white p-5 rounded shadow-md border border-gray-200 mb-4"
          >
            <p className="text-gray-800 mb-1">{post.content}</p>
            <small className="text-gray-500">
              {new Date(post.createdAt).toLocaleString()}
            </small>
          </div>
        ))
      )}
    </div>
  );
}

export default Profile;
