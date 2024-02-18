import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import DefaultLayoutAppBar from 'components/layout/AppBar';
import GlobalContextProvider from 'contexts/ContextWrapper';

export const metadata = {
  description:
    'Engage in collaborative conversations with ChatGPT at our forum, where discussions organically branch out in a tree-like structure.',
  'google-adsense-account': 'ca-pub-9479755495142783'
};

// const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })(
//     ({ open }) => ({
//       flexGrow: 1,
//       padding: '20px',
//       transition: 'margin 0.3s ease',
//       marginLeft: open ? `-${drawerWidth}px` : 0,
//     })
//   );

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <main>
          <GlobalContextProvider>
            <main>
              {/* <DrawerHeader />
                <CssBaseline />
                <DefaultLayoutAppBar/> */}
              {children}
            </main>
          </GlobalContextProvider>
        </main>
      </body>
    </html>
  );
}
