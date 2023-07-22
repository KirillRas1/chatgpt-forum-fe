import { useGoogleLogin ,GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import apiClient from 'infrastructure/apiClient';

export default function GoogleLoginButton() {
    const [username, setUserName] =useState('');
    const responseMessage = (responseFromGoogle) => {
        apiClient.post('/login/', {
            jwt: responseFromGoogle.credential
          }).then(function (response) {
            setUserName(response.data.email);
            apiClient.defaults.headers.common['Authorization'] = responseFromGoogle.credential
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