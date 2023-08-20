import React, { createContext, useState, useEffect } from 'react';
import { googleLogout } from '@react-oauth/google';
import apiClient from 'infrastructure/apiClient';

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const login = (jwtToken) => {
        apiClient
        .post('login/', {
        jwt: jwtToken
        })
        .then(function (response) {
        setUser(response.data.name);
        apiClient.defaults.headers.common['Authorization'] =
        jwtToken;
        localStorage.setItem('jwt_token', jwtToken);
        localStorage.setItem('username', response.data.name);
        });
    }

    const logout = () => {
        googleLogout();
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('username');
        delete apiClient.defaults.headers.common['Authorization'];
        setUser('');
      };

    useEffect(() => {
        const token = localStorage.getItem('jwt_token')
        if (token) {
            apiClient.defaults.headers.common['Authorization'] = token;
        }
        setUser(localStorage.getItem('username'));
    }, [])

    const { Provider } = authContext;
    return (
    <Provider value={{ login, logout, username: user}}>
        {children}
    </Provider>
    );
}

