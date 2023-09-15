import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:8000/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

const refreshToken = async () => {
  const response = await apiClient.post('token/refresh/', {
    refresh: localStorage.getItem('refresh')
  });
  apiClient.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${response.data.access}`;
  localStorage.setItem('access', response.data.access);
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
          localStorage.setItem('access', newAccessToken);
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
