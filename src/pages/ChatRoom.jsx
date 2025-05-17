// src/pages/ChatRoom.js
import React, { useState, useContext, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChatContext from '../context/ChatContext';
import { FaArrowLeft, FaPaperPlane, FaUserCircle } from 'react-icons/fa';

const ChatRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);
  const messageInputRef = useRef(null);
  const { 
    username, 
    messages, 
    roomUsers, 
    typingUsers, 
    connected, 
    sendMessage, 
    setTyping 
  } = useContext(ChatContext);
  
  // Redirect to join page if user doesn't exist
  useEffect(() => {
    if (connected && (!username || username.roomId !== roomId)) {
      navigate('/');
    }
  }, [username, roomId, connected, navigate]);
  
  // Scroll to bottom on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Focus input when component mounts
  useEffect(() => {
    if (messageInputRef.current) {
      messageInputRef.current.focus();
    }
  }, []);

  // Handle typing indicator
  useEffect(() => {
    let typingTimeout;
    
    const handleTyping = () => {
      setTyping(true);
      
      // Clear previous timeout
      clearTimeout(typingTimeout);
      
      // Set new timeout
      typingTimeout = setTimeout(() => {
        setTyping(false);
      }, 3000);
    };
    
    if (messageInputRef.current) {
      messageInputRef.current.addEventListener('input', handleTyping);
    }
    
    return () => {
      if (messageInputRef.current) {
        messageInputRef.current.removeEventListener('input', handleTyping);
      }
      clearTimeout(typingTimeout);
      setTyping(false);
    };
  }, [setTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
      setTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSendMessage(e);
    }
  };
  
  // Format time
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Get user's initial for avatar
  const getUserInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  // Handle leave chat
  const handleLeaveChat = () => {
    navigate('/dashboard');
  };

  // Show typing indicator
  const renderTypingIndicator = () => {
    const typingUsersArray = Object.values(typingUsers);
    
    if (typingUsersArray.length === 0) {
      return null;
    }
    
    let text = '';
    if (typingUsersArray.length === 1) {
      text = `${typingUsersArray[0]} is typing`;
    } else if (typingUsersArray.length === 2) {
      text = `${typingUsersArray[0]} and ${typingUsersArray[1]} are typing`;
    } else {
      text = 'Several people are typing';
    }
    
    return (
      <div className="typing-indicator">
        {text}
        <span className="typing-dots">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>
    );
  };

  // Check if message is from system
  const isSystemMessage = (sender) => {
    return sender === 'System';
  };

  if (!username) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="chat-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Chat Room</h2>
          <div className="room-id">Room ID: {roomId}</div>
        </div>
        
        <div className="users-list">
          <h3 style={{ padding: '0 1.5rem', marginBottom: '0.5rem' }}>Active Users ({roomUsers.length})</h3>
          {roomUsers.map((roomUser) => (
            <div key={roomUser.userId} className="user-item">
              <div 
                className="user-avatar"
                style={{ 
                  backgroundColor: roomUser.userId === username.userId ? 'var(--primary-color)' : 'var(--secondary-color)'
                }}
              >
                {getUserInitial(roomUser.name)}
              </div>
              <span className="user-name">
                {roomUser.name} {roomUser.userId === username.userId ? '(You)' : ''}
              </span>
              <span className="user-status"></span>
            </div>
          ))}
        </div>
        
        <div style={{ padding: '1rem 1.5rem' }}>
          <button 
            className="btn btn-outline" 
            style={{ width: '100%' }}
            onClick={handleLeaveChat}
          >
            <FaArrowLeft style={{ marginRight: '0.5rem' }} /> Leave Chat
          </button>
        </div>
      </div>
      
      {/* Main Chat Area */}
      <div className="main-chat">
        <div className="chat-header">
          <h3 className="chat-title">
            Chat Room: {roomId}
          </h3>
          <div>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              {roomUsers.length} {roomUsers.length === 1 ? 'user' : 'users'} online
            </span>
          </div>
        </div>
        
        <div className="chat-messages">
          {messages.length === 0 && (
            <div style={{ 
              textAlign: 'center', 
              margin: 'auto', 
              color: 'var(--text-secondary)',
              padding: '2rem' 
            }}>
              <FaUserCircle size={50} style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <p>No messages yet. Be the first to say hello!</p>
            </div>
          )}
          
          {messages.map((msg, index) => (
            isSystemMessage(msg.sender) ? (
              <div key={index} className="system-message">
                {msg.content}
              </div>
            ) : (
              <div 
                key={index} 
                className={`message ${msg.sender === username.name ? 'own' : ''}`}
              >
                <div className="message-bubble">
                  {msg.sender !== username.name && (
                    <div className="message-sender">{msg.sender}</div>
                  )}
                  <div className="message-content">{msg.content}</div>
                  <div className="message-time">{formatTime(msg.timestamp)}</div>
                </div>
              </div>
            )
          ))}
          
          <div ref={messagesEndRef} />
        </div>
        
        {renderTypingIndicator()}
        
        <div className="chat-input-container">
          <form className="chat-input-form" onSubmit={handleSendMessage}>
            <textarea
              ref={messageInputRef}
              className="chat-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              rows={1}
            />
            <button 
              type="submit" 
              className="btn btn-primary send-btn"
              disabled={!message.trim()}
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;