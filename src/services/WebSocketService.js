// src/services/WebSocketService.js
import { io } from "socket.io-client";

class WebSocketService {
  constructor() {
    this.socket = null;
    this.handlers = {
      'notification': [],
      'direct-message': [],
      'user-joined': [],
      'user-left': [],
      'room-users': [],
      'chat-message': [],
      'error': [],
    };
  }

  // Connect to WebSocket server
  connect(token) {
    if (this.socket) {
      this.disconnect();
    }

    const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
    
    this.socket = io(socketUrl, {
      auth: {
        token
      },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // Setup event listeners
    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
    });

    // Setup event handlers
    Object.keys(this.handlers).forEach(event => {
      this.socket.on(event, (data) => {
        this.handlers[event].forEach(handler => handler(data));
      });
    });
  }

  // Disconnect from WebSocket server
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Register event handler
  on(event, handler) {
    if (this.handlers[event]) {
      this.handlers[event].push(handler);
    }
    
    return () => this.off(event, handler);
  }

  // Remove event handler
  off(event, handler) {
    if (this.handlers[event]) {
      this.handlers[event] = this.handlers[event].filter(h => h !== handler);
    }
  }

  // Send message to server
  emit(event, data) {
    if (this.socket) {
      this.socket.emit(event, data);
    } else {
      console.error('Socket not connected');
    }
  }

  // Join a chat room
  joinRoom(roomId, username) {
    this.emit('join-room', { roomId, username });
  }

  // Send chat message
  sendMessage(roomId, message) {
    this.emit('send-message', { roomId, message });
  }

  // Send direct message
  sendDirectMessage(recipientId, content) {
    this.emit('direct-message', { recipientId, content });
  }
}

// Create singleton instance
const webSocketService = new WebSocketService();

export default webSocketService;