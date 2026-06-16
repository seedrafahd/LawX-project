import axios from "axios";
import Cookies from "universal-cookie";
import { baseURL } from "../shared/constants/URL";

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

Axios.interceptors.response.use(
  (response) => response,

  (error) => {
    // السيرفر لا يعمل
    if (!error.response) {
      return Promise.reject(new Error("لا يمكن الاتصال بالسيرفر "));
    }

    //  API message
    const data = error.response.data;
    console.log(data);
    let message = "حدث خطأ";

    if (Array.isArray(data?.error)) {
      message = data.error[0];
    } else if (data?.errors) {
      const firstKey = Object.keys(data.errors)[0];
      message = data.errors[firstKey][0];
    } else if (data?.message) {
      message = data.message;
    } else if (data?.data?.message) {
      message = data?.data?.message;
    }
    const status = error.response.status;

    //  Unauthorized
    if (status === 401) {
      const isLoginPage = window.location.pathname.includes("/login");

      // if login → logout
      if (!isLoginPage) {
        cookie.remove("auth", { path: "/" });
        window.location.href = "/login";
      }

      // Axios default
      return Promise.reject(new Error(message));
    }

    //  Forbidden
    if (status === 403) {
      return Promise.reject(new Error("ليس لديك صلاحية "));
    }

    //  Server Error
    if (status >= 500) {
      return Promise.reject(new Error("خطأ في السيرفر ⚠️"));
    }
    console.log(message);
    return Promise.reject(new Error(message));
  },
);
