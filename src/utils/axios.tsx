import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";
import { StaticRouter } from "react-router-dom";

const headers: AxiosRequestConfig["headers"] = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};

const userAuthData = localStorage.getItem("userAuthData") || "";
const token = (userAuthData && JSON.parse(userAuthData)?.token) || "";

if (token) {
  headers.authorization = `Bearer ${token}`;
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers,
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    const status = error.response?.status;
    if (status === 500) {
      toast.error(
        `Sorry! Something went wrong on server. We are actively working to solve it.`
      );
    }
    if (status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };
