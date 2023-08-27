import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  use
} from 'react';
import { googleLogout } from '@react-oauth/google';
import { axiosContext } from './Axios';
import { Dialog, DialogTitle } from '@mui/material';
import GoogleLoginButton from 'components/GoogleLogin';

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const [userId, setUserId] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { apiClient } = useContext(axiosContext);

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
    if (user) {
      localStorage.setItem('username', user);
      localStorage.setItem('user_id', userId);
    } else {
      localStorage.removeItem('username');
      localStorage.removeItem('user_id');
    }
  }, [user]);

  function redirectOnTokenExpiration(error) {
    const tokenExpirationDetails =
      'Authentication credentials were not provided.';
    if (
      error.response.status === 401 &&
      error.response.data.detail === tokenExpirationDetails
    ) {
      window.localStorage.removeItem('username');
      setShowLoginModal(true);
      setUser('');
      setUserId('');
    }
    return Promise.reject(error);
  }

  useEffect(() => {
    apiClient.interceptors.response.use(
      response => response,
      redirectOnTokenExpiration
    );
  }, []);

  const { Provider } = authContext;
  return (
    <Provider value={{ login, logout, username: user, userId, setUser }}>
      <Dialog
        fullWidth
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      >
        <DialogTitle>Login required</DialogTitle>
        <GoogleLoginButton />
      </Dialog>
      {children}
    </Provider>
  );
};
