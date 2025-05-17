// src/pages/JoinPage.js
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatContext from '../context/ChatContext';
import { FaComment, FaUserAlt, FaKey } from 'react-icons/fa';

const JoinPage = () => {
  const [name, setName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [error, setError] = useState('');
  const { joinRoom, connected } = useContext(ChatContext);
  const navigate = useNavigate();

  // Generate a random room ID
  const generateRoomId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setRoomId(result);
  };

  // Set a random room ID on component mount
  useEffect(() => {
    generateRoomId();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    
    if (!roomId.trim()) {
      setError('Please enter a room ID');
      return;
    }
    
    // Clear any previous errors
    setError('');
    
    // Join the chat room - Modify this to match what your ChatContext expects
    joinRoom({
      username: name, // Changed from 'name' to 'username' to match ChatContext
      roomId
    });
    
    // Navigate to the chat room
    navigate(`/chat/${roomId}`);
  };

  return (
    <div className="join-container">
      <div className="join-card">
        <div className="join-header">
          <div className="logo">
            <FaComment size={40} color="#4f46e5" />
          </div>
          <h1 className="join-title">Join a Chat Room</h1>
          <p className="join-subtitle">Connect with others in real-time</p>
        </div>
        
        <form className="join-form" onSubmit={handleSubmit}>
          {error && (
            <div className="error-message" style={{ color: 'var(--error-color)', marginBottom: '1rem', textAlign: 'center' }}>
              {error}
            </div>
          )}
          
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Your Name
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="name"
                type="text"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your display name"
                style={{ paddingLeft: '2.5rem' }}
              />
              <div style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }}>
                <FaUserAlt color="#6b7280" />
              </div>
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="roomId">
              Room ID
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="roomId"
                type="text"
                className="form-input"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                placeholder="Enter room ID"
                style={{ paddingLeft: '2.5rem', textTransform: 'uppercase' }}
              />
              <div style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }}>
                <FaKey color="#6b7280" />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <button 
                type="button" 
                onClick={generateRoomId}
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  color: 'var(--primary-color)', 
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Generate random ID
              </button>
            </div>
          </div>
          
          <button
            type="submit"
            className="btn btn-primary join-btn"
            disabled={!connected}
          >
            {connected ? 'Join Chat' : 'Connecting...'}
          </button>
          
          {/* Debug connection info */}
          <div style={{ marginTop: '10px', textAlign: 'center', fontSize: '12px', color: '#666' }}>
            Connection status: {connected ? '✅ Connected' : '❌ Disconnected'}
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinPage;