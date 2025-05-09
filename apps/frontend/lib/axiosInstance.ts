import axios from "axios";
import { API_BACKEND_URL } from "@/config";
import { useAuth } from "@clerk/nextjs";

import { useMemo } from "react";

export function useAxiosInstance() {
  const { getToken } = useAuth();
  return useMemo(() => {
    const instance = axios.create({
      baseURL: API_BACKEND_URL,
    });
    instance.interceptors.request.use(async (config) => {
      const token = await getToken();
      if (token) {
        config.headers = config.headers || {};
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    });
    return instance;
  }, [getToken]);
}