import GlobalContextProvider from 'contexts/ContextWrapper';
import { AuthProvider } from 'contexts/Auth';
import Script from 'next/script';
import React from 'react';
import DefaultLayoutClientSide from 'layouts/DefaultLayout';

export const metadata = {
  description:
    'Engage in collaborative conversations with ChatGPT at our forum, where discussions organically branch out in a tree-like structure.',
  'google-adsense-account': 'ca-pub-9479755495142783'
};

export default function DefaultLayoutServerSide({ children }) {
  return (
    <html lang="en">
      <body>
        <GlobalContextProvider>
          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9479755495142783"
            crossorigin="anonymous"
          />
          <DefaultLayoutClientSide>{children}</DefaultLayoutClientSide>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
