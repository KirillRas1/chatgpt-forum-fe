// components/LoginButton.js
'use client';
import React from 'react';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
const LoginButton = () => {
  const router = useRouter();
  const handleLogin = () => {
    router.push('/api/auth/login');
  };

  return (
    <Button variant="contained" color="secondary" onClick={handleLogin}>
      Login
    </Button>
  );
};

export default LoginButton;
