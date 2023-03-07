import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import axios from 'axios';

export default function GoogleLoginButton() {
    const [username, setUserName] =useState('');
    const responseMessage = (response) => {
        console.log(response);
        axios.post('/login', {
            jwt: response.credential
          }).then(function (response) {
            setUserName(response.data.email);
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