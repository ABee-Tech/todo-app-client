import axios from "axios";

const userAuthData = localStorage.getItem("userAuthData") || "";
const token = JSON.parse(userAuthData)?.token;

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  },
});
