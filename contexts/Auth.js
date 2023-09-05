import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  use
} from 'react';
import { googleLogout } from '@react-oauth/google';
import { axiosContext } from './Axios';
import LoginDialog from 'components/modals/LoginModal';

export const authContext = createContext();

function setTokenExpirationTimes() {
  const currentTimeEpoch = Math.floor(new Date().getTime() / 1000);
  const oneHourFromNow = currentTimeEpoch + 3600 * 3;
  const oneMonthFromNow = currentTimeEpoch + 3600 * 24 * 30;
  localStorage.setItem('accessTokenExpirationTime', oneHourFromNow);
  localStorage.setItem('refreshTokenExpirationTime', oneMonthFromNow);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const [userId, setUserId] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { apiClient } = useContext(axiosContext);

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

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setUser(localStorage.getItem('username'));
    setUserId(localStorage.getItem('user_id'));
  }, [apiClient]);

  useEffect(() => {
    apiClient.interceptors.response.use(
      response => response,
      showAnonUserModal
    );
    apiClient.interceptors.request.use(
      async config => {
        if (!config.url.includes('token/')) {
          const expirationTime = localStorage.getItem(
            'accessTokenExpirationTime'
          );
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
  }, [apiClient]);

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
