import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL + "/api/posts";

export const getPosts = () => axios.get(API_URL);

export const createPost = (content, token) =>
  axios.post(
    API_URL,
    { content },
    { headers: { Authorization: `Bearer ${token}` } }
  );
