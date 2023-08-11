import DefaultLayout from 'layouts/DefaultLayout';
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function MyApp({ Component, pageProps }) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </GoogleOAuthProvider>
  );
}
