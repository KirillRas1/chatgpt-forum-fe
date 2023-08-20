import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import apiClient from 'infrastructure/apiClient';

export const postContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    
}