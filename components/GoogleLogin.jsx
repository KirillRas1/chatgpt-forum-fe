import { useGoogleLogin ,GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import axios from 'axios';

export default function GoogleLoginButton() {
    const [username, setUserName] =useState('');
    const responseMessage = (responseFromGoogle) => {
        axios.post('/login/', {
            jwt: responseFromGoogle.credential
          }).then(function (response) {
            setUserName(response.data.email);
            axios.defaults.headers.common['Authorization'] = responseFromGoogle.credential
            localStorage.setItem('jwt_token', responseFromGoogle.credential);
          })
    };
    const errorMessage = (error) => {
        console.log(error);
    };
    return (
        <div>
            <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
            <span>Logged in as {username}</span>
        </div>
    )
}