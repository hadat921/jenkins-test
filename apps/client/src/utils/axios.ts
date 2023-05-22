import axios from "axios";
import { API_URL } from "../configs/appConfigs";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
