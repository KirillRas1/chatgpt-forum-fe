import HomePage from 'components/screens/HomePage';
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <HomePage />
    </GoogleOAuthProvider>
  );
}
