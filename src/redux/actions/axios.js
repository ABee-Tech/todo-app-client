import axios from "axios";

const token = JSON.parse(localStorage.getItem("userAuthData"))?.token;

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  "Access-Control-Allow-Origin": "*",
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  },
});
