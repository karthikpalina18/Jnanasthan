import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Connect = () => {
  const [requests, setRequests] = useState([]);
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch connection requests and accepted connections
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        alert('You are not authenticated.');
        navigate('/login');
        return;
      }
      
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      try {
        // Fetch connections and requests in parallel
        const [connectionsResponse, requestsResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/connection/myConnections', config),
          axios.get('http://localhost:5000/api/connection/pendingRequests', config)
        ]);
        
        setConnections(connectionsResponse.data);
        setRequests(requestsResponse.data);
      } catch (error) {
        console.error('Error fetching connection data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // Accept a connection request
  const acceptRequest = async (connectionId) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error("No token found. Please log in.");
        navigate('/login');
        return;
      }
      
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      await axios.put(`http://localhost:5000/api/connection/${connectionId}/accept`, {}, config);
      
      // Update state after successful acceptance
      const acceptedRequest = requests.find(req => req._id === connectionId);
      
      setRequests(prev => prev.filter(req => req._id !== connectionId));
      
      if (acceptedRequest) {
        setConnections(prev => [...prev, acceptedRequest]);
      }
      
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  // Navigate to user profile
  const viewProfile = (userId) => {
    navigate(`/profilePage/${userId}`);
  };

  // Get the other user in the connection (not the current user)
  const getConnectionName = (connection) => {
    const token = localStorage.getItem('token');
    if (!token) return '';
    
    try {
      // Extract user id from token to determine which user is the other person
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      const currentUserId = tokenData.id || tokenData.userId || tokenData._id;
      
      // Return the username of the other person in the connection
      return connection.sender._id === currentUserId 
        ? connection.receiver.username 
        : connection.sender.username;
    } catch (error) {
      console.error("Error parsing token:", error);
      return '';
    }
  };

  // Get the ID of the other user in the connection
  const getConnectionUserId = (connection) => {
    const token = localStorage.getItem('token');
    if (!token) return '';
    
    try {
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      const currentUserId = tokenData.id || tokenData.userId || tokenData._id;
      
      return connection.sender._id === currentUserId 
        ? connection.receiver._id 
        : connection.sender._id;
    } catch (error) {
      console.error("Error parsing token:", error);
      return '';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Pending Requests Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">
          Pending Connection Requests
        </h2>
        
        {requests.length === 0 ? (
          <p className="text-gray-500 italic">No pending connection requests</p>
        ) : (
          <ul className="space-y-4">
            {requests.map((request) => (
              <li key={request._id} className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
                    {request.sender.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-gray-800">
                      {request.sender.username}
                    </p>
                    <p className="text-sm text-gray-500">
                      Wants to connect with you
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => acceptRequest(request._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Accept
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Connections Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">
          Your Connections
        </h2>
        
        {connections.length === 0 ? (
          <p className="text-gray-500 italic">No connections yet</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {connections.map((connection) => (
              <li 
                key={connection._id} 
                className="bg-white rounded-lg shadow p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => viewProfile(getConnectionUserId(connection))}
              >
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                    {getConnectionName(connection).charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-gray-800">
                      {getConnectionName(connection)}
                    </p>
                    <p className="text-sm text-blue-500">
                      View profile →
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Connect;