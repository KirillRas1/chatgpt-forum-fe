'use client';
import React from 'react';
import Button from '@mui/material/Button';
const LogoutButton = () => {
  return (
    <a href="/api/auth/logout">
      <Button variant="contained" color="secondary">
        Logout
      </Button>
    </a>
  );
};

export default LogoutButton;
