import DefaultLayout from 'layouts/DefaultLayout';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from 'contexts/Auth';
import Script from 'next/script';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
    <title>Geppeta Board</title>
    <link rel="preconnect" href="https://kirillras.net" crossorigin/>
    <link rel="preconnect" href="https://adservice.google.com"/>
    <link rel="preconnect" href="https://googleads.g.doubleclick.net"/>
    <link rel="preconnect" href="https://www.googletagservices.com"/>
    <link rel="preconnect" href="https://tpc.googlesyndication.com"/>
    <link rel="preconnect" href="https://pagead2.googlesyndication.com"/>
    <link rel="preconnect" href="https://accounts.google.com"/>
    </Head>
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
<Script
  async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9479755495142783"
  crossorigin="anonymous"
/>
      <AuthProvider>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </AuthProvider>
    </GoogleOAuthProvider>
    </>
  );
}
