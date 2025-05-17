// components/routing/AdminRoute.js
import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const checkAdminStatus = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }
      
      try {
        // Get user data including role
        const response = await axios.get('http://localhost:5000/api/auth/user', {
          headers: {
            'x-auth-token': token
          }
        });
        
        // Check if user has admin role
        setIsAdmin(response.data.role === "admin");
      } catch (err) {
        console.error('Admin verification failed', err);
        setIsAdmin(false);
        setError(err.response?.data?.message || 'Authentication failed');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAdminStatus();
  }, []);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen flex-col">
        <div className="text-red-500 font-semibold mb-4">Access Error</div>
        <div className="text-gray-700">{error}</div>
        <button 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => window.location.href = '/login'}
        >
          Return to Login
        </button>
      </div>
    );
  }
  
  return isAdmin ? children : <Navigate to="/dashboard" />;
};

export default AdminRoute;