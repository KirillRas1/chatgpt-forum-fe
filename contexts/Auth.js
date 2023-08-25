import React, { createContext, useState, useEffect } from 'react';
import { googleLogout } from '@react-oauth/google';
import apiClient from 'infrastructure/api/apiClient';

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const [userId, setUserId] = useState('');
  const login = jwtToken => {
    apiClient
      .post('login/', {
        jwt: jwtToken
      })
      .then(function (response) {
        setUser(response.data.name);
        setUserId(response.data.id);
        apiClient.defaults.headers.common['Authorization'] = jwtToken;
        localStorage.setItem('jwt_token', jwtToken);
        localStorage.setItem('username', response.data.name);
        localStorage.setItem('user_id', response.data.id);
      });
  };

  const logout = () => {
    googleLogout();
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('username');
    localStorage.removeItem('user_id');
    delete apiClient.defaults.headers.common['Authorization'];
    setUser('');
    setUserId('');
  };

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      apiClient.defaults.headers.common['Authorization'] = token;
    }
    setUser(localStorage.getItem('username'));
    setUserId(localStorage.getItem('user_id'));
  }, []);

  useEffect(() => {
    localStorage.setItem('username', user);
    localStorage.setItem('user_id', userId);
  }, [user]);

  const { Provider } = authContext;
  return (
    <Provider value={{ login, logout, username: user, userId, setUser }}>
      {children}
    </Provider>
  );
};
