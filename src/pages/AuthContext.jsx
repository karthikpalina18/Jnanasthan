// This is a sample AuthContext file that works with the CollaborationSystem
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Check if user is already logged in (token exists)
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          // Configure axios with auth header
          const authAxios = axios.create({
            headers: {
              'x-auth-token': token
            }
          });
          
          // Verify token and get user data
          const response = await authAxios.get('/api/auth/me');
          setUser(response.data);
        } catch (err) {
          // Token is invalid or expired
          localStorage.removeItem('token');
          setError('Session expired. Please log in again.');
        }
      }
      
      setIsLoading(false);
    };
    
    checkAuthStatus();
  }, []);
  
  // Login function
  const login = async (credentials) => {
    setError(null);
    
    try {
      const response = await axios.post('/api/auth/login', credentials);
      
      // Save token to localStorage
      localStorage.setItem('token', response.data.token);
      
      // Set user
      setUser(response.data.user);
      
      return response.data.user;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    }
  };
  
  // Register function
  const register = async (userData) => {
    setError(null);
    
    try {
      const response = await axios.post('/api/auth/register', userData);
      
      // Save token to localStorage
      localStorage.setItem('token', response.data.token);
      
      // Set user
      setUser(response.data.user);
      
      return response.data.user;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    }
  };
  
  // Logout function
  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    // Clear user
    setUser(null);
  };
  
  // Update user profile
  const updateProfile = async (userData) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setError('Not authenticated');
      throw new Error('Not authenticated');
    }
    
    try {
      // Configure axios with auth header
      const authAxios = axios.create({
        headers: {
          'x-auth-token': token
        }
      });
      
      // Update user data
      const response = await authAxios.put('/api/users/profile', userData);
      
      // Update user in state
      setUser(response.data);
      
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
      throw err;
    }
  };
  
  // Provide auth context value
  const contextValue = {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    updateProfile
  };
  
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;