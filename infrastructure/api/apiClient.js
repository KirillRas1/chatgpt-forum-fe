import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.BACKED_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export function setTokenExpirationTimes() {
  const currentTimeEpoch = Math.floor(new Date().getTime() / 1000);
  const oneHourFromNow = currentTimeEpoch + 3600 * 3;
  const oneMonthFromNow = currentTimeEpoch + 3600 * 24 * 30;
  localStorage.setItem('accessTokenExpirationTime', oneHourFromNow);
  localStorage.setItem('refreshTokenExpirationTime', oneMonthFromNow);
}

const refreshToken = async () => {
  const response = await apiClient.post('token/refresh/', {
    refresh: localStorage.getItem('refresh')
  });
  apiClient.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${response.data.access}`;
  localStorage.setItem('access', response.data.access);
  setTokenExpirationTimes();
  return response.data.access;
};

apiClient.interceptors.request.use(config => {
  config.headers['Authorization'] = `Bearer ${localStorage.getItem('access')}`;
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
