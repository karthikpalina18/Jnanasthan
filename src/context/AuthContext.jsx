import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the auth context with default values
export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
  register: () => {},
  login: () => {},
  logout: () => {},
  updateProfile: () => {},
  changePassword: () => {},
  forgotPassword: () => {},
  resetPassword: () => {},
  clearErrors: () => {}
});

/**
 * AuthProvider component that wraps the application and provides authentication state and functions.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} AuthContext Provider
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user on initial mount if token exists
  useEffect(() => {
    const loadUser = async () => {
      // Check if token exists in localStorage
      const token = localStorage.getItem('token');

      if (!token) {
        setLoading(false);
        return;
      }

      // Set default headers for all requests
      axios.defaults.headers.common['x-auth-token'] = token;

      try {
        const res = await axios.get('/api/auth/user');
        setUser(res.data);
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Error loading user:', err);
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['x-auth-token'];
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  /**
   * Register a new user
   * 
   * @param {Object} formData - User registration data
   * @returns {Promise<void>}
   */
  const register = async (formData) => {
    try {
      setError(null);
      const res = await axios.post('/api/auth/register', formData);
      
      // Save token and set auth state
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['x-auth-token'] = res.data.token;
      
      // Load user data
      const userRes = await axios.get('/api/auth/user');
      setUser(userRes.data);
      setIsAuthenticated(true);
      
      return res.data;
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Registration failed. Please try again.'
      );
      throw err;
    }
  };

  /**
   * Log in an existing user
   * 
   * @param {Object} formData - User login credentials
   * @returns {Promise<void>}
   */
  const login = async (formData) => {
    try {
      setError(null);
      const res = await axios.post('/api/auth/login', formData);
      
      // Save token and set auth state
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['x-auth-token'] = res.data.token;
      
      // Load user data
      const userRes = await axios.get('/api/auth/user');
      setUser(userRes.data);
      setIsAuthenticated(true);
      
      return res.data;
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Login failed. Please check your credentials and try again.'
      );
      throw err;
    }
  };

  /**
   * Log out the current user
   */
  const logout = () => {
    // Remove token from storage and headers
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['x-auth-token'];
    
    // Reset auth state
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  };

  /**
   * Update user profile
   * 
   * @param {Object} profileData - User profile data to update
   * @returns {Promise<Object>} Updated user data
   */
  const updateProfile = async (profileData) => {
    try {
      setError(null);
      const res = await axios.put('/api/users/profile', profileData);
      setUser(res.data);
      return res.data;
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Failed to update profile. Please try again.'
      );
      throw err;
    }
  };

  /**
   * Change user password
   * 
   * @param {Object} passwordData - Current and new password data
   * @returns {Promise<Object>} Success message
   */
  const changePassword = async (passwordData) => {
    try {
      setError(null);
      const res = await axios.put('/api/users/password', passwordData);
      return res.data;
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Failed to change password. Please try again.'
      );
      throw err;
    }
  };

  /**
   * Request password reset for forgotten password
   * 
   * @param {Object} emailData - Email address for reset
   * @returns {Promise<Object>} Success message
   */
  const forgotPassword = async (emailData) => {
    try {
      setError(null);
      const res = await axios.post('/api/auth/forgot-password', emailData);
      return res.data;
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Failed to process request. Please try again.'
      );
      throw err;
    }
  };

  /**
   * Reset password with token from email
   * 
   * @param {string} token - Password reset token
   * @param {Object} passwordData - New password
   * @returns {Promise<Object>} Success message
   */
  const resetPassword = async (token, passwordData) => {
    try {
      setError(null);
      const res = await axios.post(`/api/auth/reset-password/${token}`, passwordData);
      return res.data;
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Failed to reset password. Please try again.'
      );
      throw err;
    }
  };

  /**
   * Clear any errors in the auth context
   */
  const clearErrors = () => {
    setError(null);
  };

  // Create value object with state and functions
  const value = {
    user,
    isAuthenticated,
    loading,
    error,
    register,
    login,
    logout,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    clearErrors
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;