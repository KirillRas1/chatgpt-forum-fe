import axios from 'axios';
import HomePage from 'components/screens/HomePage';
import { GoogleOAuthProvider } from '@react-oauth/google';

axios.defaults.baseURL = 'http://localhost:8000';
export default function App() {
  return <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <HomePage />
  </GoogleOAuthProvider>
}