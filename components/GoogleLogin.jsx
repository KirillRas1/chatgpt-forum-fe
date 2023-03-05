import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';


export default function GoogleLoginButton() {
    const responseMessage = (response) => {
        console.log(response);
        axios.post('/login', {
            jwt: response.credential
          })
    };
    const errorMessage = (error) => {
        console.log(error);
    };
    return (
        <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
    )
}