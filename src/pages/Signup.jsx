// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Signup = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSignup = async () => {
//     try {
//       await axios.post('http://localhost:5000/api/auth/signup', { email, password });
//       alert('Signup successful!');
//       navigate('/login');
//     } catch (err) {
//       alert('Signup failed');
//     }
//   };

//   return (
//     <div>
//       <h2>Signup</h2>
//       <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br />
//       <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br />
//       <button onClick={handleSignup}>Signup</button>
//     </div>
//   );
// };

// export default Signup;




import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  // Animation effect on component mount
  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!email || !password || !username) {
      setError('⚠ Please enter both email and password');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('⚠ Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('⚠ Password should be at least 6 characters long');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await axios.post('http://localhost:5000/api/auth/signup', { 
        username,
        email, 
        password 
      });
      
      setIsLoading(false);
      
      // Animate out before navigation
      setAnimate(false);
      setTimeout(() => {
        navigate('/login');
      }, 300);
    } catch (err) {
      setIsLoading(false);
      setError(`❌ ${err.response?.data?.message || 'Login failed. Please check your credentials.'}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 -top-20 -left-20 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute w-96 h-96 bottom-20 right-20 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" style={{animationDuration: '7s'}}></div>
        <div className="absolute w-96 h-96 top-1/2 left-1/3 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{animationDuration: '10s'}}></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className="absolute text-white opacity-80"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 14 + 10}px`,
              animation: `float ${Math.random() * 10 + 15}s infinite ease-in-out`
            }}
          >
            {['✨', '⭐', '🌟', '💫'][Math.floor(Math.random() * 4)]}
          </div>
        ))}
      </div>
      
      {/* Signup card with animation */}
      <div 
        className={`w-full max-w-md p-8 rounded-2xl shadow-2xl backdrop-blur-lg 
          transition-all duration-500 ease-in-out transform 
          ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
          bg-gradient-to-br from-white/90 to-white/70 border border-white/20`}
      >
        {/* Logo and header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform hover:rotate-6 transition-transform duration-300">
              <span className="text-white text-2xl font-bold">J</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Create an Account ✨</h2>
          <p className="text-gray-600 mt-2">Join Jnanasthan and begin your journey</p>
        </div>
        
        {/* Error message with animation */}
        {error && (
          <div className="mb-6 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup}>

        <div className="mb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                </svg>
              </div>
              
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setusername(e.target.value)}
                className="w-full pl-10 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-purple-500 focus:border-transparent text-gray-700 bg-white/90 transition-all duration-200 shadow-sm"
                disabled={isLoading}
              />
            </div>
          </div>


          {/* Email input with icon */}
          <div className="mb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                </svg>
              </div>
              
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-purple-500 focus:border-transparent text-gray-700 bg-white/90 transition-all duration-200 shadow-sm"
                disabled={isLoading}
              />
            </div>
          </div>
          
          {/* Password input with icon */}
          <div className="mb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-purple-500 focus:border-transparent text-gray-700 bg-white/90 transition-all duration-200 shadow-sm"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Confirm Password input with icon */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-purple-500 focus:border-transparent text-gray-700 bg-white/90 transition-all duration-200 shadow-sm"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Enhanced button with loading state */}
          <button
            type="submit"
            className={`w-full py-4 rounded-xl font-medium text-white shadow-lg 
              transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
              ${isLoading ? 'bg-purple-400 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                Create Account <span className="ml-2">🚀</span>
              </span>
            )}
          </button>
        </form>
        
        {/* Link to login */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <a 
              href="/login" 
              className="text-purple-600 hover:text-purple-800 transition-colors duration-200 hover:underline font-medium"
            >
              Login here
            </a>
          </p>
        </div>
        
        {/* Social signup options */}
        {/* <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white bg-opacity-75 text-gray-500">Or sign up with</span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-3 gap-3">
            <button type="button" className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200 hover:shadow-md">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
              </svg>
            </button>
            <button type="button" className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200 hover:shadow-md">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.441 16.892c-2.102.144-6.784.144-8.883 0-2.276-.156-2.541-1.27-2.558-4.892.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0 2.277.156 2.541 1.27 2.559 4.892-.018 3.629-.285 4.736-2.559 4.892zm-6.441-7.234l4.917 2.338-4.917 2.346v-4.684z" />
              </svg>
            </button>
            <button type="button" className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200 hover:shadow-md">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866.549 3.921 1.453l2.814-2.814C17.503 2.988 15.139 2 12.545 2 7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z" />
              </svg>
            </button>
          </div>
        </div> */}
        
        {/* Footer with security message */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Your data is protected with end-to-end encryption 🔒</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;