import React from 'react';
import { AuthProvider } from 'contexts/Auth';
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default async function GlobalContextProvider({ children }) {
  return (
      <UserProvider>
        <AuthProvider>{children}</AuthProvider>
      </UserProvider>
  );
}
