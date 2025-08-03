import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL + "/api/users";

export const getUserProfile = (userId) => axios.get(`${API_URL}/${userId}`);
