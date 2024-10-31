import axios from "axios";

export const api = axios.create({
  baseURL: "https://tht01-be.vercel.app",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 25000, // 25 seconds
});
