"use client";
import { API_BACKEND_URL } from "../config";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";

import { useMemo } from "react";

/**
 * Returns a memoized Axios instance configured with authentication and organization headers for API requests.
 *
 * The Axios instance automatically attaches a Bearer token and, if available, an organization ID to each request.
 *
 * @returns An Axios instance preconfigured for authenticated backend API communication.
 */
export function useAxiosInstance() {
  const { getToken, orgId } = useAuth();
  return useMemo(() => {
    const instance = axios.create({
      baseURL: API_BACKEND_URL,
    });
    instance.interceptors.request.use(async (config) => {
      const token = await getToken();
      if (token) {
        config.headers = config.headers || {};
        config.headers["Authorization"] = `Bearer ${token}`;
        if (orgId) {
          config.headers["orgId"] = orgId;
        }
      }
      return config;
    });
    return instance;
  }, [getToken, orgId]);
}
