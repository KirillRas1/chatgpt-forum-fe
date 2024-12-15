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
    <a href="/api/auth/login">
      <Button variant="contained" color="secondary" >
        Login
      </Button>
    </a>
  );
};

export default LoginButton;
