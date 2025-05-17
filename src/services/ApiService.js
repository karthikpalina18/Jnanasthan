// src/services/ApiService.js
import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/collab',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API service methods
const ApiService = {
  // Users and Connections
  fetchUsers: () => api.get('/users'),
  fetchConnections: () => api.get('/connections'),
  fetchPendingRequests: () => api.get('/connections/pending'),
  sendConnectionRequest: (userId) => api.post('/connections', { userId }),
  acceptRequest: (requestId) => api.post(`/connections/pending/${requestId}/accept`),
  rejectRequest: (requestId) => api.post(`/connections/pending/${requestId}/reject`),
  
  // Conversations and Messages
  fetchConversations: () => api.get('/conversations'),
  fetchMessages: (conversationId) => api.get(`/conversations/${conversationId}/messages`),
  sendMessage: (conversationId, content) => 
    api.post(`/conversations/${conversationId}/messages`, { content }),
  
  // Activities
  fetchActivities: () => api.get('/activities'),
  
  // Notifications
  fetchNotifications: () => api.get('/notifications'),
  markAsRead: (notificationId) => api.post(`/notifications/${notificationId}/read`),
};

export default ApiService;