import axios from "axios";
import Cookies from "js-cookie";
import router from "@/router";

const commonAxios = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {},
});

commonAxios.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers["Authorization"] = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

commonAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      Cookies.remove("accessToken");
      await router.push("/login");
    }

    return Promise.reject(error);
  }
);

export default commonAxios;
