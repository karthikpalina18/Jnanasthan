import React, { createContext, useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [roomUsers, setRoomUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState({});
  const [connected, setConnected] = useState(false);
  const socketRef = useRef(null);

  // Initialize socket connection
  useEffect(() => {
    const SOCKET_URL = "http://localhost:5000";
    
    // Only initialize socket if not already connected
    if (!socketRef.current) {
      console.log('Initializing socket connection to', SOCKET_URL);
      socketRef.current = io(SOCKET_URL);
      
      socketRef.current.on('connect', () => {
        console.log('Connected to server');
        setConnected(true);
      });
  
      socketRef.current.on('disconnect', () => {
        console.log('Disconnected from server');
        setConnected(false);
      });
    }

    // Store the current socket reference for cleanup
    const socket = socketRef.current;

    return () => {
      console.log('Cleaning up socket connection');
      if (socket) {
        socket.disconnect();
      }
      // Don't set socketRef.current to null here as it might cause issues with references
    };
  }, []);

  // Listen for messages and other events
  useEffect(() => {
    if (!socketRef.current) return;

    // Handle incoming chat messages
    socketRef.current.on('chat-message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Handle chat history loading
    socketRef.current.on('load-chat-history', (history) => {
      setMessages(history);
    });

    // Handle room users updates
    socketRef.current.on('room-users', (users) => {
      setRoomUsers(users);
    });

    // Handle user joining
    socketRef.current.on('user-joined', (user) => {
      setRoomUsers((prevUsers) => [...prevUsers, user]);
    });

    // Handle user leaving
    socketRef.current.on('user-left', ({ userId }) => {
      setRoomUsers((prevUsers) => prevUsers.filter(user => user.id !== userId));
      
      // Also remove from typing users
      setTypingUsers((prev) => {
        const newTyping = { ...prev };
        delete newTyping[userId];
        return newTyping;
      });
    });

    // Handle typing indicators
    socketRef.current.on('user-typing', ({ userId, username, isTyping }) => {
      setTypingUsers((prev) => {
        if (isTyping) {
          return { ...prev, [userId]: username };
        } else {
          const newTyping = { ...prev };
          delete newTyping[userId];
          return newTyping;
        }
      });
    });

    // WebRTC signaling handlers (if needed)
    socketRef.current.on('offer', ({ caller, sdp }) => {
      // Handle incoming WebRTC offer
      console.log('Received offer from', caller);
      // Add your WebRTC handling code here
    });

    socketRef.current.on('answer', ({ caller, sdp }) => {
      // Handle incoming WebRTC answer
      console.log('Received answer from', caller);
      // Add your WebRTC handling code here
    });

    socketRef.current.on('ice-candidate', ({ from, candidate }) => {
      // Handle incoming ICE candidate
      console.log('Received ICE candidate from', from);
      // Add your WebRTC handling code here
    });

    // Store the current socket reference for cleanup
    const socket = socketRef.current;

    // Cleanup function
    return () => {
      if (socket) {
        socket.off('chat-message');
        socket.off('load-chat-history');
        socket.off('room-users');
        socket.off('user-joined');
        socket.off('user-left');
        socket.off('user-typing');
        socket.off('offer');
        socket.off('answer');
        socket.off('ice-candidate');
      }
    };
  }, []);

  // Join a room
  const joinRoom = ({ username, roomId }) => {
    if (!socketRef.current || !username || !roomId) return;
    
    setUser({ username, roomId });
    
    // Join the room
    socketRef.current.emit('join-room', { 
      roomId, 
      username 
    });
  };

  // Send a message
  const sendMessage = (content) => {
    if (!user || !content.trim() || !socketRef.current) return;
    
    const message = {
      sender: user.username,
      content,
      timestamp: new Date()
    };
    
    socketRef.current.emit('send-message', {
      roomId: user.roomId,
      message
    });
    
    // Optimistically add message to local state
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  // Handle typing indicator
  const setTyping = (isTyping) => {
    if (!user || !socketRef.current) return;
    
    socketRef.current.emit('typing', {
      roomId: user.roomId,
      isTyping
    });
  };

  // WebRTC signaling - send offer
  const sendOffer = (targetUserId, sdp) => {
    if (!socketRef.current || !user) return;
    
    socketRef.current.emit('offer', {
      target: targetUserId,
      caller: socketRef.current.id,
      sdp
    });
  };

  // WebRTC signaling - send answer
  const sendAnswer = (targetUserId, sdp) => {
    if (!socketRef.current || !user) return;
    
    socketRef.current.emit('answer', {
      target: targetUserId,
      caller: socketRef.current.id,
      sdp
    });
  };

  // WebRTC signaling - send ICE candidate
  const sendIceCandidate = (targetUserId, candidate) => {
    if (!socketRef.current || !user) return;
    
    socketRef.current.emit('ice-candidate', {
      target: targetUserId,
      candidate
    });
  };

  return (
    <ChatContext.Provider
      value={{
        user,
        messages,
        roomUsers,
        typingUsers,
        connected,
        joinRoom,
        sendMessage,
        setTyping,
        sendOffer,
        sendAnswer,
        sendIceCandidate
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;