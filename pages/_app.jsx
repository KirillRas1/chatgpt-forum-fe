import DefaultLayout from 'layouts/DefaultLayout';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from 'contexts/Auth';
import AxiosProvider from 'contexts/Axios';

export default function MyApp({ Component, pageProps }) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <AxiosProvider>
        <AuthProvider>
          <DefaultLayout>
            <Component {...pageProps} />
          </DefaultLayout>
        </AuthProvider>
      </AxiosProvider>
    </GoogleOAuthProvider>
  );
}
