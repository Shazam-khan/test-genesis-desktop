import axios from 'axios';
import { useAppStore } from '../store/appStore';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 120000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Dynamically resolve baseURL from settings on every request
api.interceptors.request.use((config) => {
  const { settings } = useAppStore.getState();
  config.baseURL = settings.apiBaseUrl;
  config.timeout = settings.executionTimeout * 1000;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.error || error.message || 'An unexpected error occurred';
    console.error('[API Error]', message);
    return Promise.reject(error);
  }
);

export default api;

/** Helper to call GET /health on the root (not /api) */
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const { settings } = useAppStore.getState();
    const rootURL = settings.apiBaseUrl.replace(/\/api\/?$/, '');
    const res = await axios.get(`${rootURL}/health`, { timeout: 5000 });
    return res.data?.success === true;
  } catch {
    return false;
  }
}
