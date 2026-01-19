import { QueryClient } from "@tanstack/react-query";
import type { AxiosError, AxiosInstance } from "axios";
import axios, { HttpStatusCode } from "axios";
import {
  MAX_RETRIES,
  MAX_TIMEOUT,
  PRICE_API_URL,
  SECOND_TO_MILLISECONDS,
} from "@common";

export const priceClient: AxiosInstance = axios.create({
  baseURL: PRICE_API_URL,
  timeout: MAX_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Response Interceptor for Public Client
 * Basic error handling
 */
priceClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("Access forbidden");

    return Promise.reject(error);
  },
);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Global retry strategy
      retry: (failureCount: number, error: unknown) => {
        const axiosError = error as AxiosError;
        // Don't retry on 4xx errors
        if (
          axiosError?.response?.status &&
          axiosError.response.status >= HttpStatusCode.BadRequest &&
          axiosError.response.status < HttpStatusCode.InternalServerError
        ) {
          return false;
        }
        // Retry max 2 times for 5xx and network errors
        return failureCount < MAX_RETRIES;
      },
      // Retry delay
      retryDelay: (attemptIndex: number) =>
        Math.min(
          SECOND_TO_MILLISECONDS * MAX_RETRIES ** attemptIndex,
          MAX_TIMEOUT,
        ),
    },
  },
});
