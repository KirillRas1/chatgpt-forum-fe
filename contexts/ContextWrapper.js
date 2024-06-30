'use client';
import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from 'contexts/Auth';
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function GlobalContextProvider({ children }) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <UserProvider>
        <AuthProvider>{children}</AuthProvider>
      </UserProvider>
    </GoogleOAuthProvider>
  );
}
