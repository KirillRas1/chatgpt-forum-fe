import { GoogleLogin, googleLogout } from '@react-oauth/google';
import React, { use, useState, useEffect } from 'react';
import apiClient from 'infrastructure/apiClient';
import { Button } from '@mui/material';
export default function GoogleLoginButton() {
  const [username, setUserName] = useState('');
  const responseMessage = responseFromGoogle => {
    apiClient
      .post('login/', {
        jwt: responseFromGoogle.credential
      })
      .then(function (response) {
        setUserName(response.data.email);
        apiClient.defaults.headers.common['Authorization'] =
          responseFromGoogle.credential;
        localStorage.setItem('jwt_token', responseFromGoogle.credential);
        localStorage.setItem('username', response.data.email);
      });
  };
  const errorMessage = error => {
    console.log(error);
  };
  useEffect(() => {
    setUserName(window?.localStorage?.username);
  }, []);
  return (
    <div>
      {!username ? (
        <GoogleLogin
          onSuccess={responseMessage}
          onError={errorMessage}
          useOneTap
        />
      ) : (
        <Button variant="contained" color="secondary" onClick={googleLogout}>
          Logout
        </Button>
      )}
    </div>
  );
}
