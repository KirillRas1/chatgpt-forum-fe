'use client';
import React from 'react';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = () => {
    router.push('/api/auth/logout');
  };

  return (
    <Button variant="contained" color="secondary" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
