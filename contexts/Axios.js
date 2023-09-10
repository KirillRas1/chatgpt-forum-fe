import { createContext, useContext, useEffect } from 'react';
import axios from 'axios';

export const axiosContext = createContext();
const apiClient = axios.create({
  baseURL: 'http://localhost:8000/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});
const AxiosProvider = ({ children }) => {
  const { Provider } = axiosContext;
  return <Provider value={{ apiClient }}>{children}</Provider>;
};

export default AxiosProvider;
