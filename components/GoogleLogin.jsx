'use client';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import React, { useContext, useState } from 'react';
import { Box, Button } from '@mui/material';
import { authContext } from 'contexts/Auth';
import SignUpButton from 'components/auth/Signup';

export default function GoogleLoginButton() {
  const { login, logout, displayName } = useContext(authContext);

  const responseMessage = responseFromGoogle => {
    login(responseFromGoogle.credential);
  };

  return (
    <div>
      {!displayName ? (
        <Box display="flex" flexDirection="row" gap="5px" alignItems="center">
          <SignUpButton />
          <GoogleLogin onSuccess={responseMessage} />
        </Box>
      ) : (
        <Button variant="contained" color="secondary" onClick={logout}>
          Logout
        </Button>
      )}
    </div>
  );
}
