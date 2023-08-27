import axios from 'axios';

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

export default apiClient;
