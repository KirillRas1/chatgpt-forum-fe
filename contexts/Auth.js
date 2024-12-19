'use client';
import React, { createContext, useState, useEffect, use } from 'react';
import LoginDialog from 'components/common/dataDisplay/modals/LoginModal';
import { apiClient } from 'infrastructure/api/apiClient';
import { useUser } from '@auth0/nextjs-auth0/client';
import { getSession } from '@auth0/nextjs-auth0';

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const { user, error, isLoading } = useUser();
  const [displayName, setDisplayName] = useState('');
  const [userId, setUserId] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginStatus, setLoginStatus] = useState(null);

  useEffect(() => {
    if (!isLoading) {
      console.log(user);
      if (user || error) {
        fetch('/api/auth/token').then(res => {
          res.json().then(data => {
            const accessToken = data.token;
            apiClient.defaults.headers.common['Authorization'] =
              `Bearer ${accessToken}`;
            localStorage.setItem('access', accessToken);
            setLoginStatus(true);
            apiClient.get('/users/').then(res => {
              setDisplayName(res.data[0].name);
            });
          });
        });
      } else {
        console.log('disconnectiong user');
        apiClient.defaults.headers.common['Authorization'] = null;
        localStorage.removeItem('access');
        setLoginStatus(false);
        setDisplayName('');
      }
    }
  }, [user, isLoading, error]);

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
      localStorage.removeItem('displayName');
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
        apiClient
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
