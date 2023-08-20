import DefaultLayout from 'layouts/DefaultLayout';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from 'contexts/Auth';

export default function MyApp({ Component, pageProps }) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
