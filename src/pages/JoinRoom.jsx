import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JoinRoom = () => {
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleJoin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simple validation
    if (!roomId.trim() || !username.trim()) {
      setError('Room ID and username are required');
      setIsLoading(false);
      return;
    }

    try {
      // No backend call needed for this simple version
      // Just navigate to the room with the roomId and username as parameters
      navigate(`/room/${roomId}?username=${encodeURIComponent(username)}`);
    } catch (error) {
      console.error('Error joining room:', error);
      setError('Failed to join the room. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="join-form-container">
      <form onSubmit={handleJoin} className="join-form">
        <h2>Join Video Call</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="roomId">Room ID:</label>
          <input
            id="roomId"
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Enter Room ID"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="username">Your Name:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isLoading}
          className="join-button"
        >
          {isLoading ? 'Joining...' : 'Join Call'}
        </button>
      </form>
    </div>
  );
};

export default JoinRoom;