import axios from 'axios';
import HomePage from 'components/screens/HomePage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter } from 'react-router-dom'

axios.defaults.baseURL = 'http://localhost:8000';
if (typeof window !== 'undefined') {
  // Perform localStorage action
  axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwt_token');
}
export default function App() {
  return <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
  <HomePage />
</GoogleOAuthProvider>
}