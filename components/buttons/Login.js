// components/LoginButton.js
'use client';
import React from 'react';
import Button from '@mui/material/Button';
const LoginButton = () => {
  return (
    <a href="/api/auth/login">
      <Button variant="contained" color="secondary">
        Login
      </Button>
    </a>
  );
};

export default LoginButton;
