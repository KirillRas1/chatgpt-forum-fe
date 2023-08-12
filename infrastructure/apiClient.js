import axios from 'axios';
import Router from 'next/router';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

if (typeof window !== 'undefined') {
  // Perform localStorage action
  apiClient.defaults.headers.common['Authorization'] =
    localStorage.getItem('jwt_token');
}
function redirectOnTokenExpiration(error) {
  const tokenExpirationDetails =
    'Authentication credentials were not provided.';
  console.log(error.response.data);
  if (
    error.response.status === 401 &&
    error.response.data.detail === tokenExpirationDetails
  ) {
    window.localStorage.removeItem('username');
    Router.push({ pathname: `/` });
  }
  return Promise.reject(error);
}
apiClient.interceptors.response.use(
  response => response,
  redirectOnTokenExpiration
);

export default apiClient;
