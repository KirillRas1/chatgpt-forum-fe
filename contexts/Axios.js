import { createContext, useContext, useEffect } from 'react';
import axios from 'axios';

const axiosContext = createContext();

const AxiosProvider = ({ children }) => {
  function redirectOnTokenExpiration(error) {
    const tokenExpirationDetails =
      'Authentication credentials were not provided.';
    console.log(error.response.data);
    if (
      error.response.status === 401 &&
      error.response.data.detail === tokenExpirationDetails
    ) {
      window.localStorage.removeItem('username');
    }
    return Promise.reject(error);
  }

  useEffect(() => {
    axios.interceptors.response.use(
      response => response,
      redirectOnTokenExpiration
    );
  }, []);

  const apiClient = axios.create({
    baseURL: 'http://localhost:8000/',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const { Provider } = axiosContext;
  return <Provider value={{ apiClient }}>{children}</Provider>;
};

export default AxiosProvider;
