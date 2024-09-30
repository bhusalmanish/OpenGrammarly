import axios from 'axios';

const API_URL = 'http://localhost:8000';  // Ensure this matches your FastAPI server

export const signup = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/users/`, { email, password });
    return response.data;
};

export const login = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/token`, { username: email, password });
    return response.data;
};


export const isAuthenticated = (): boolean => {
    return !!localStorage.getItem('token');
};


// src/utils/auth.ts

export const isTokenExpired = (token: string | null): boolean => {
    if (!token) return true; // If no token, consider it expired

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp * 1000 < Date.now(); // Convert exp from seconds to milliseconds
    } catch (error) {
        console.error('Failed to decode token:', error);
        return true; // If token decoding fails, consider it expired
    }
};

