import axios from "axios";
import Cookies from "universal-cookie";

const baseURL = "http://127.0.0.1:8000/api/";
const cookie = new Cookies();

export const Axios = axios.create({
  baseURL: baseURL,
});

Axios.interceptors.request.use(
  (config) => {
    const auth =
      cookie.get("auth") || JSON.parse(sessionStorage.getItem("auth"));
    const token = auth?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
