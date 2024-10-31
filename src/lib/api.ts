import axios from "axios";

export const api = axios.create({
  baseURL: "https://tht01-be.vercel.app/",
});
