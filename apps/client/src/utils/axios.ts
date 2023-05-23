import axios, { InternalAxiosRequestConfig } from "axios";
import { API_URL } from "../configs/appConfigs";
import { storage } from "./storage";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const authRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = storage.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers.Accept = "application/json";
  return config;
};

axiosInstance.interceptors.request.use(authRequestInterceptor);
