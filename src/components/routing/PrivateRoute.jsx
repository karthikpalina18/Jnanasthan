// import React, { useContext } from 'react';
// import { Navigate, Outlet, useLocation } from 'react-router-dom';
// import { AuthContext } from '../../context/AuthContext;

// /**
//  * PrivateRoute component that restricts access to authenticated users only
//  * If user is not authenticated, they are redirected to the login page
//  * with the intended destination saved in the state for redirect after login
//  * 
//  * @param {Object} props
//  * @param {string} [props.requiredRole] - Optional role required to access the route
//  * @returns {JSX.Element} The protected route component or redirect
//  */
// const PrivateRoute = ({ requiredRole }) => {
//   const auth = useContext(AuthContext);
//   const location = useLocation();
  
//   // For debugging - remove in production
//   console.log("Auth context in PrivateRoute:", auth);
  
//   // Destructure after ensuring auth exists
//   const { isAuthenticated, user, loading } = auth || {};

//   // If auth is still loading, show a loading indicator
//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   // If user is not authenticated, redirect to login
//   if (!isAuthenticated) {
//     // Save the location they were trying to go to for redirect after login
//     return <Navigate to="/login" state={{ from: location.pathname }} replace />;
//   }

//   // If a specific role is required, check if user has that role
//   if (requiredRole && (!user?.role || user.role !== requiredRole)) {
//     // Redirect to unauthorized page or dashboard based on your preference
//     return <Navigate to="/unauthorized" replace />;
//   }

//   // If authenticated and authorized, render the child routes
//   return <Outlet />;
// };

// export default PrivateRoute;


// components/routing/PrivateRoute.js
import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }
      
      try {
        // Option 1: If you added the verify endpoint to your backend
        /*
        await axios.get('http://localhost:5000/api/auth/verify', {
          headers: {
            'x-auth-token': token
          }
        });
        */
        
        // Option 2: Simple token presence check
        // This assumes that if a token exists, the user is authenticated
        setIsAuthenticated(true);
        
        // Option 3: Check user profile endpoint instead
        // This uses an existing endpoint to verify if the token is valid
        /*
        await axios.get('http://localhost:5000/api/auth/user', {
          headers: {
            'x-auth-token': token
          }
        });
        setIsAuthenticated(true);
        */
      } catch (err) {
        console.error('Authentication failed', err);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    verifyToken();
  }, []);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;