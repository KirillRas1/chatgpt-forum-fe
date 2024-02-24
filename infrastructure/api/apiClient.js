import axios from 'axios';

export const apiClient = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});
export function setTokenExpirationTimes({
  accessExpirationTime,
  refreshExpirationTime
}) {
  let accessExpiration = new Date(accessExpirationTime);
  let refreshExpiration = new Date(refreshExpirationTime);
  if (!(accessExpiration && refreshExpiration)) {
    const currentTimeEpoch = Math.floor(new Date().getTime() / 1000);
    accessExpiration = currentTimeEpoch + 3600 * 3;
    refreshExpiration = currentTimeEpoch + 3600 * 24 * 30;
  }

  localStorage.setItem('accessTokenExpirationTime', accessExpiration);
  localStorage.setItem('refreshTokenExpirationTime', refreshExpiration);
}

const refreshToken = async () => {
  const response = await apiClient.post('token/refresh', {
    refresh: localStorage.getItem('refresh')
  });
  apiClient.defaults.headers.common['Authorization'] = response.data.access
    ? `Bearer ${response.data.access}`
    : null;
  localStorage.setItem('access', response.data.access);
  setTokenExpirationTimes();
  return response.data.access;
};

apiClient.interceptors.request.use(config => {
  config.headers['Authorization'] = localStorage.getItem('access')
    ? `Bearer ${localStorage.getItem('access')}`
    : null;
  return config;
});
apiClient.interceptors.request.use(
  async config => {
    if (!config.url.includes('token/')) {
      const expirationTime = localStorage.getItem('accessTokenExpirationTime');
      if (expirationTime) {
        const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
        if (currentTime > expirationTime) {
          const newAccessToken = await refreshToken();
          config.headers['Authorization'] = `Bearer ${newAccessToken}`;
        }
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
export default apiClient;
