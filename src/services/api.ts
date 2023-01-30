import axios from "axios";

const api = axios.create({
  baseURL: "https://cnab-parser-api.onrender.com/api/",
  timeout: 5000,
});

export default api;
