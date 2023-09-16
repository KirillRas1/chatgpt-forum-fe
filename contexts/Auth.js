import React, { createContext, useState, useEffect } from 'react';
import { googleLogout } from '@react-oauth/google';
import LoginDialog from 'components/modals/LoginModal';
import {
  apiClient,
  setTokenExpirationTimes
} from 'infrastructure/api/apiClient';
export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const [userId, setUserId] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);

  const login = jwtToken => {
    apiClient
      .post('token/', {
        jwt: jwtToken
      })
      .then(function (response) {
        setUser(response.data.name);
        setUserId(response.data.id);
        apiClient.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${response.data.access}`;
        localStorage.setItem('username', response.data.name);
        localStorage.setItem('user_id', response.data.id);
        localStorage.setItem('access', response.data.access);
        localStorage.setItem('refresh', response.data.refresh);
        setTokenExpirationTimes();
      });
  };

  const logout = () => {
    googleLogout();
    localStorage.removeItem('username');
    localStorage.removeItem('user_id');
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    delete apiClient.defaults.headers.common['Authorization'];
    setUser('');
    setUserId('');
  };

  function loadUserInfo() {
    setUser(localStorage.getItem('username'));
    setUserId(localStorage.getItem('user_id'));
  }
  useEffect(loadUserInfo, []);

  function loadAxiosInterceptors() {
    apiClient.interceptors.response.use(
      response => response,
      showAnonUserModal
    );
  }
  useEffect(loadAxiosInterceptors, [apiClient]);
  useEffect(() => {
    if (user) {
      localStorage.setItem('username', user);
      localStorage.setItem('user_id', userId);
    } else {
      localStorage.removeItem('username');
      localStorage.removeItem('user_id');
    }
  }, [user]);

  function showAnonUserModal(error) {
    const errorDetails = 'Authentication credentials were not provided.';
    if (
      error?.response?.status === 401 &&
      error?.response?.data?.detail === errorDetails
    ) {
      window.localStorage.removeItem('username');
      setShowLoginModal(true);
      setUser('');
      setUserId('');
    }
    return Promise.reject(error);
  }

  const { Provider } = authContext;
  return (
    <Provider
      value={{ login, logout, username: user, userId, setUser, apiClient }}
    >
      <LoginDialog
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
      {children}
    </Provider>
  );
};
