'use client';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import React, { use, useState, useEffect, useContext } from 'react';
import { Button } from '@mui/material';
import { authContext } from 'contexts/Auth';

export default function GoogleLoginButton() {
  const { login, logout, displayName } = useContext(authContext);
  const responseMessage = responseFromGoogle => {
    login(responseFromGoogle.credential);
  };

  return (
    <div>
      {!displayName ? (
        <GoogleLogin onSuccess={responseMessage} />
      ) : (
        <Button variant="contained" color="secondary" onClick={logout}>
          Logout
        </Button>
      )}
    </div>
  );
}
