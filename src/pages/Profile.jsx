// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Profile = () => {
//   const [userId, setUserId] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const verifyTokenAndFetchUser = async () => {
//       const token = localStorage.getItem('token'); // ✅ token from localStorage

//       if (!token) {
//         setIsAuthenticated(false);
//         setIsLoading(false);
//         return;
//       }

//       try {
//         const response = await axios.get('http://localhost:5000/api/auth/user', {
//           headers: {
//             'x-auth-token': token,
//           },
//         });

//         setIsAuthenticated(true);
//         setUserId(response.data._id); // ✅ assumes API returns user object
//       } catch (error) {
//         console.error('Authentication failed:', error);
//         localStorage.removeItem('token');
//         setIsAuthenticated(false);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     verifyTokenAndFetchUser();
//   }, []);

//   const handleNavigate = () => {
//     if (userId) {
//       navigate(`/profilePage/${userId}`);
//     }
//   };

//   if (isLoading) return <div className="text-center mt-10">Loading...</div>;

//   return (
//     <div className="p-4 bg-white rounded shadow-md max-w-md mx-auto mt-10 text-center">
//       <h2 className="text-xl font-semibold mb-2">Welcome to Profile</h2>

//       {isAuthenticated && userId ? (
//         <>
//           <p className="mb-4 text-gray-600">User ID: <strong>{userId}</strong></p>
//           <button
//             onClick={handleNavigate}
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Go to Profile Page
//           </button>
//         </>
//       ) : (
//         <p className="text-red-500">User not authenticated</p>
//       )}
//     </div>
//   );
// };

// export default Profile;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Fetch and verify user
  useEffect(() => {
    const verifyTokenAndFetchUser = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/auth/user', {
          headers: {
            'x-auth-token': token,
          },
        });

        setIsAuthenticated(true);
        setUserId(response.data._id);
      } catch (error) {
        console.error('Authentication failed:', error);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyTokenAndFetchUser();
  }, []);

  // Auto-navigate when userId is available
  useEffect(() => {
    if (userId) {
      navigate(`/profilePage/${userId}`);
    }
  }, [userId, navigate]);

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="p-4 bg-white rounded shadow-md max-w-md mx-auto mt-10 text-center">
      <h2 className="text-xl font-semibold mb-2">Welcome to Profile</h2>
      {!isAuthenticated ? (
        <p className="text-red-500">User not authenticated</p>
      ) : (
        <p className="text-gray-600">Redirecting to your profile...</p>
      )}
    </div>
  );
};

export default Profile;
