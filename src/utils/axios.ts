import axios, { AxiosRequestConfig } from "axios";

const headers: AxiosRequestConfig["headers"] = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};

const userAuthData = localStorage.getItem("userAuthData") || "";
const token = (userAuthData && JSON.parse(userAuthData)?.token) || "";

if (token) {
  headers.authorization = `Bearer ${token}`;
}

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers,
});
