import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// Create context
const AuthContext = createContext();

// Create axios instance with base URL and debug logging
const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for debugging
api.interceptors.request.use(request => {
  console.log('API Request:', {
    url: request.url,
    method: request.method,
    data: request.data
  });
  return request;
});

// Add response interceptor for debugging
api.interceptors.response.use(
  response => {
    console.log('API Response:', {
      url: response.config.url,
      status: response.status,
      data: response.data
    });
    return response;
  },
  error => {
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error);
  }
);

// AuthProvider component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const decodeToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      console.log('Decoded token:', decoded);
      return decoded;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  const login = async (email, password) => {
    try {
      console.log('Login attempt for:', email);
      const response = await api.post('/auth/login', { email, password });
      console.log('Login response:', response.data);

      const { token } = response.data;
      if (!token) {
        throw new Error('No token received from login');
      }

      // Store token
      localStorage.setItem('token', token);

      // Decode token to get user data
      const decoded = decodeToken(token);
      if (!decoded) {
        throw new Error('Invalid token received');
      }

      console.log('Decoded token data:', decoded);

      // Create user object from token data
      const userInfo = {
        id: decoded.id,
        email: email,
        name: decoded.name || decoded.username || email.split('@')[0], // Try to get name from token or use email username
        token
      };

      console.log('Setting user data:', userInfo);
      setUser(userInfo);
      return { token, user: userInfo };
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      console.log('Registration successful:', response.data);
      // After successful registration, store the name
      localStorage.setItem('userName', userData.name);
      return response.data;
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setUser(null);
  };

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = decodeToken(token);
      if (decoded) {
        const userName = localStorage.getItem('userName');
        setUser({
          id: decoded.id,
          name: userName,
          token
        });
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
      }
    }
    setLoading(false);
  }, []);

  // Add request interceptor to include token
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
