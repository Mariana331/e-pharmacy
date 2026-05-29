import axios from 'axios';
import { AxiosError, InternalAxiosRequestConfig } from 'axios';

interface RetryAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const SESSION_PROBE_URL = '/user/user-info';

const AUTH_ROUTES_WITHOUT_REDIRECT = [
  SESSION_PROBE_URL,
  '/user/login',
  '/user/register',
  '/user/refresh',
  '/user/logout',
  '/statistics',
];

const shouldSkipAuthRetry = (url?: string) => {
  if (!url) return false;
  return AUTH_ROUTES_WITHOUT_REDIRECT.some((route) => url.includes(route));
};

export const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown) => {
  failedQueue.forEach(({ resolve, reject }) =>
    error ? reject(error) : resolve(null),
  );
  failedQueue = [];
};

nextServer.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryAxiosRequestConfig;

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (shouldSkipAuthRetry(originalRequest.url)) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(() => nextServer(originalRequest))
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      await nextServer.post('/user/refresh');
      processQueue(null);
      return nextServer(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError);
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);
