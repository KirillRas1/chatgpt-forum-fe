'use client';
import React, { createContext, useState, useEffect } from 'react';
import LoginDialog from 'components/common/dataDisplay/modals/LoginModal';
import { apiClient } from 'infrastructure/api/apiClient';
import { useUser } from '@auth0/nextjs-auth0/client';

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [displayName, setDisplayName] = useState('');
  const [username, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginStatus, setLoginStatus] = useState(null);
  const { user, error, isLoading } = useUser();
  const [auth0AccessToken, setAuth0AccessToken] = useState();

  useEffect(() => {
    if (!isLoading && user && !auth0AccessToken) {
      fetch('/api/auth/token')
        .then(res => res.json())
        .then(data => {
          apiClient.defaults.headers.common['Authorization'] = data.token
            ? `Bearer ${data.token}`
            : null;
          localStorage.setItem('access', data.token);
          setAuth0AccessToken(data.token);
          setLoginStatus(true);
        });
    }
  }, [user]);

  function loadUserInfo() {
    setDisplayName(localStorage.getItem('displayName'));
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

  function showAnonUserModal(error) {
    const errorDetails = 'Authentication credentials were not provided.';
    if (
      error?.response?.status === 401 &&
      error?.response?.data?.detail === errorDetails
    ) {
      window.localStorage.removeItem('displayName');
      setShowLoginModal(true);
      setDisplayName('');
      setUserId('');
    }
    return Promise.reject(error);
  }

  useEffect(() => {
    if (displayName) {
      setShowLoginModal(false);
    }
  }, [displayName]);

  const { Provider } = authContext;
  return (
    <Provider
      value={{
        loginStatus,
        displayName,
        userId,
        setDisplayName,
        apiClient,
        loginWithCredentials
      }}
    >
      <LoginDialog
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
      {children}
    </Provider>
  );
};
