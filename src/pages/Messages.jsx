// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Messages = () => {
//   const [connections, setConnections] = useState([]);
//   const [selectedConnection, setSelectedConnection] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [messageContent, setMessageContent] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const token = localStorage.getItem('token');
//   const currentUserEmail = JSON.parse(localStorage.getItem('user'))?.email;

//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   // Fetch all accepted connections
//   useEffect(() => {
//     const fetchConnections = async () => {
//       if (!token) {
//         setError('No token found. Please login again.');
//         return;
//       }

//       setLoading(true);
//       try {
//         const response = await axios.get('http://localhost:5000/api/connection/myConnections', config);
//         setConnections(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch connections. ' + (err.response?.data?.message || err.message));
//         setLoading(false);
//       }
//     };

//     fetchConnections();
//   }, [token]);

//   // Fetch messages for selected connection
//   useEffect(() => {
//     const fetchMessages = async () => {
//       const selectedConnectionEmail = selectedConnection?.receiverEmail;
//       if (!selectedConnectionEmail) {
//         return;
//       }

//       setLoading(true);
//       try {
//         const response = await axios.get(`http://localhost:5000/api/message/${selectedConnectionEmail}`, config);
//         setMessages(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching messages:', error);
//         setError('Failed to fetch messages. ' + (error.response?.data?.message || error.message));
//         setLoading(false);
//       }
//     };

//     if (selectedConnection) {
//       fetchMessages();
//     }
//   }, [selectedConnection, token]);

//   // Handle sending a message
//   const handleSendMessage = async () => {
//     if (!messageContent.trim()) return;

//     if (!selectedConnection?.receiverEmail) {
//       setError('Receiver email is not available.');
//       return;
//     }

//     setLoading(true);
//     const messageData = {
//       content: messageContent,
//       receiver: selectedConnection.receiverId,
//     };

//     try {
//       const response = await axios.post('http://localhost:5000/api/message', messageData, config);
//       setMessages([...messages, response.data]);
//       setMessageContent('');
//       setLoading(false);
//     } catch (error) {
//       console.error('Failed to send message:', error.response?.data || error.message);
//       setError('Failed to send message. ' + (error.response?.data?.message || error.message));
//       setLoading(false);
//     }
//   };

//   // Handle connection click
//   const handleConnectionClick = (conn) => {
//     const isSender = conn.sender.email === currentUserEmail;
//     const receiverEmail = isSender ? conn.receiver.email : conn.sender.email;
//     const receiverId = isSender ? conn.receiver._id : conn.sender._id;
//     const receiverName = isSender ? conn.receiver.username : conn.sender.username;

//     setSelectedConnection({ ...conn, receiverEmail, receiverId, receiverName });
//   };

//   // Format timestamp
//   const formatTimestamp = (timestamp) => {
//     if (isNaN(new Date(timestamp))) {
//       return 'Invalid Date';
//     }
//     return new Date(timestamp).toLocaleString();
//   };

//   return (
//     <div className="card flex overflow-hidden" style={{ height: '80vh' }}>
//       {/* Left Panel - Connections */}
//       <div className="w-64 border-r border-gray-200 overflow-y-auto">
//         <div className="p-4 border-b border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-800">Connections</h3>
//         </div>

//         {loading && connections.length === 0 ? (
//           <div className="flex justify-center p-4">
//             <div className="loader"></div>
//           </div>
//         ) : error ? (
//           <div className="p-4 text-red-500 text-center">{error}</div>
//         ) : connections.length === 0 ? (
//           <div className="p-4 text-gray-500 text-center">No connections found</div>
//         ) : (
//           <div className="divide-y divide-gray-200">
//             {connections.map((conn) => {
//               const isSender = conn.sender.email === currentUserEmail;
//               const connectionName = isSender ? conn.receiver.username : conn.sender.username;
//               const connectionEmail = isSender ? conn.receiver.email : conn.sender.email;
              
//               return (
//                 <div
//                   key={conn._id}
//                   onClick={() => handleConnectionClick(conn)}
//                   className={`p-3 hover:bg-gray-50 cursor-pointer ${
//                     selectedConnection?._id === conn._id ? 'bg-indigo-100' : ''
//                   }`}
//                 >
//                   <div className="flex items-center">
//                     <div className="rounded-full bg-indigo-500 text-white w-10 h-10 flex items-center justify-center mr-3">
//                       {connectionName.charAt(0).toUpperCase()}
//                     </div>
//                     <div className="overflow-hidden">
//                       <div className="font-medium text-gray-800 text-truncate">{connectionName}</div>
//                       <div className="text-xs text-gray-500 text-truncate">{connectionEmail}</div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>

//       {/* Right Panel - Chat */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {selectedConnection ? (
//           <>
//             <div className="p-4 border-b border-gray-200 flex items-center">
//               <div className="rounded-full bg-indigo-500 text-white w-10 h-10 flex items-center justify-center mr-3">
//                 {selectedConnection.receiverName.charAt(0).toUpperCase()}
//               </div>
//               <div>
//                 <h3 className="font-semibold text-gray-800">{selectedConnection.receiverName}</h3>
//                 <div className="text-xs text-gray-500">{selectedConnection.receiverEmail}</div>
//               </div>
//             </div>
            
//             <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
//               {loading && messages.length === 0 ? (
//                 <div className="flex justify-center items-center h-full">
//                   <div className="loader"></div>
//                 </div>
//               ) : messages.length === 0 ? (
//                 <div className="flex justify-center items-center h-full text-gray-500">
//                   No messages yet. Start a conversation!
//                 </div>
//               ) : (
//                 messages.map((message) => (
//                   <div
//                     key={message._id}
//                     className={`flex ${message.senderEmail === currentUserEmail ? 'justify-end' : 'justify-start'} mb-4`}
//                   >
//                     <div
//                       className={`rounded-lg px-4 py-2 max-w-xs ${
//                         message.senderEmail === currentUserEmail
//                           ? 'bg-indigo-500 text-white'
//                           : 'bg-white border border-gray-200'
//                       }`}
//                     >
//                       <div>{message.content}</div>
//                       <div className={`text-xs mt-1 ${
//                         message.senderEmail === currentUserEmail
//                           ? 'text-indigo-300'
//                           : 'text-gray-500'
//                       }`}>
//                         {formatTimestamp(message.timestamp)}
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
            
//             <div className="border-t border-gray-200 p-4">
//               {error && <div className="text-red-500 mb-2 text-sm">{error}</div>}
//               <div className="flex">
//                 <textarea
//                   rows="2"
//                   value={messageContent}
//                   onChange={(e) => setMessageContent(e.target.value)}
//                   placeholder="Type your message..."
//                   className="form-textarea flex-1 border-gray-300 rounded-lg focus:ring-2 focus:border-indigo-500"
//                 />
//                 <button
//                   onClick={handleSendMessage}
//                   disabled={!messageContent.trim() || loading}
//                   className={`btn ml-2 ${
//                     !messageContent.trim() || loading
//                       ? 'bg-gray-300 cursor-not-allowed'
//                       : 'btn-primary hover:bg-indigo-700'
//                   }`}
//                 >
//                   {loading ? (
//                     <div className="loader w-5 h-5 border-white"></div>
//                   ) : (
//                     'Send'
//                   )}
//                 </button>
//               </div>
//             </div>
//           </>
//         ) : (
//           <div className="flex flex-col items-center justify-center h-full p-4 text-center">
//             <div className="bg-indigo-100 rounded-full p-6 mb-4">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
//               </svg>
//             </div>
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">Your Messages</h3>
//             <p className="text-gray-500">Select a connection to start chatting</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Messages;
import './Dashboard.css';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Messages = () => {
  const [connections, setConnections] = useState([]);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  const token = localStorage.getItem('token');
  const currentUserEmail = JSON.parse(localStorage.getItem('user'))?.email;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Fetch all accepted connections
  useEffect(() => {
    const fetchConnections = async () => {
      if (!token) {
        setError('No token found. Please login again.');
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/connection/myConnections', config);
        setConnections(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch connections. ' + (err.response?.data?.message || err.message));
        setLoading(false);
      }
    };

    fetchConnections();
  }, [token]);

  // Fetch messages for selected connection
  useEffect(() => {
    const fetchMessages = async () => {
      const selectedConnectionEmail = selectedConnection?.receiverEmail;
      if (!selectedConnectionEmail) {
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/message/${selectedConnectionEmail}`, config);
        setMessages(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setError('Failed to fetch messages. ' + (error.response?.data?.message || error.message));
        setLoading(false);
      }
    };

    if (selectedConnection) {
      fetchMessages();
    }
  }, [selectedConnection, token]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle sending a message
  const handleSendMessage = async (e) => {
    e?.preventDefault();
    
    if (!messageContent.trim()) return;

    if (!selectedConnection?.receiverEmail) {
      setError('Receiver email is not available.');
      return;
    }

    setLoading(true);
    const messageData = {
      content: messageContent,
      receiver: selectedConnection.receiverId,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/message', messageData, config);
      setMessages([...messages, response.data]);
      setMessageContent('');
      setLoading(false);
    } catch (error) {
      console.error('Failed to send message:', error.response?.data || error.message);
      setError('Failed to send message. ' + (error.response?.data?.message || error.message));
      setLoading(false);
    }
  };

  // Handle connection click
  const handleConnectionClick = (conn) => {
    const isSender = conn.sender.email === currentUserEmail;
    const receiverEmail = isSender ? conn.receiver.email : conn.sender.email;
    const receiverId = isSender ? conn.receiver._id : conn.sender._id;
    const receiverName = isSender ? conn.receiver.username : conn.sender.username;

    setSelectedConnection({ ...conn, receiverEmail, receiverId, receiverName });
    setError(''); // Clear any previous errors
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    if (isNaN(new Date(timestamp))) {
      return 'Invalid Date';
    }
    
    const messageDate = new Date(timestamp);
    const today = new Date();
    
    // If message was sent today, show only time
    if (messageDate.toDateString() === today.toDateString()) {
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // If message was sent yesterday, show "Yesterday" with time
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (messageDate.toDateString() === yesterday.toDateString()) {
      return `Yesterday, ${messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // Otherwise show date with time
    return messageDate.toLocaleString([], {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filter connections based on search
  const filteredConnections = connections.filter(conn => {
    const isSender = conn.sender.email === currentUserEmail;
    const connectionName = isSender ? conn.receiver.username : conn.sender.username;
    const connectionEmail = isSender ? conn.receiver.email : conn.sender.email;
    
    return connectionName.toLowerCase().includes(searchQuery.toLowerCase()) || 
           connectionEmail.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Function to simulate typing indicator status (in real app would be websocket)
  useEffect(() => {
    if (selectedConnection && messageContent.length > 0) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [messageContent, selectedConnection]);

  // Group messages by date
  const groupedMessages = () => {
    const groups = {};
    
    messages.forEach(message => {
      const date = new Date(message.timestamp).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    
    return groups;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex overflow-hidden w-full max-w-6xl mx-auto my-4 bg-white rounded-xl shadow-lg">
        {/* Left Panel - Connections */}
        <div className="w-80 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-800">Messages</h3>
            <div className="mt-3 relative">
              <input
                type="text"
                placeholder="Search connections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {loading && connections.length === 0 ? (
              <div className="flex justify-center p-8">
                <div className="w-8 h-8 border-4 border-t-indigo-500 border-b-indigo-700 rounded-full animate-spin"></div>
              </div>
            ) : error && connections.length === 0 ? (
              <div className="p-4 m-4 text-red-500 text-center bg-red-50 rounded-lg">
                {error}
              </div>
            ) : filteredConnections.length === 0 ? (
              <div className="p-8 text-gray-500 text-center">
                {searchQuery ? "No matching connections found" : "No connections yet"}
              </div>
            ) : (
              <div>
                {filteredConnections.map((conn) => {
                  const isSender = conn.sender.email === currentUserEmail;
                  const connectionName = isSender ? conn.receiver.username : conn.sender.username;
                  const connectionEmail = isSender ? conn.receiver.email : conn.sender.email;
                  
                  return (
                    <div
                      key={conn._id}
                      onClick={() => handleConnectionClick(conn)}
                      className={`p-4 hover:bg-gray-50 cursor-pointer transition duration-150 ${
                        selectedConnection?._id === conn._id ? 'bg-indigo-50 border-l-4 border-indigo-500' : ''
                      }`}
                    >
                      <div className="flex items-start">
                        <div className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white w-12 h-12 flex items-center justify-center mr-3 shadow-sm">
                          {connectionName.charAt(0).toUpperCase()}
                        </div>
                        <div className="overflow-hidden flex-1">
                          <div className="flex justify-between items-center">
                            <div className="font-medium text-gray-900">{connectionName}</div>
                            <div className="text-xs text-gray-500">12:42 PM</div>
                          </div>
                          <div className="text-sm text-gray-500 truncate">{connectionEmail}</div>
                          <div className="text-sm text-gray-600 truncate mt-1">
                            {conn.lastMessage || "Start a conversation!"}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Chat */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {selectedConnection ? (
            <>
              <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between shadow-sm">
                <div className="flex items-center">
                  <div className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white w-10 h-10 flex items-center justify-center mr-3 shadow-sm">
                    {selectedConnection.receiverName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{selectedConnection.receiverName}</h3>
                    <div className="text-xs text-gray-500 flex items-center">
                      <span className={`inline-block w-2 h-2 rounded-full mr-1 ${Math.random() > 0.5 ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                      {Math.random() > 0.5 ? 'Online' : 'Offline'}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-indigo-50/30 to-gray-50">
                {loading && messages.length === 0 ? (
                  <div className="flex justify-center items-center h-full">
                    <div className="w-8 h-8 border-4 border-t-indigo-500 border-b-indigo-700 rounded-full animate-spin"></div>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex flex-col justify-center items-center h-full text-gray-500">
                    <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <p className="text-lg font-medium text-gray-700 mb-1">No messages yet</p>
                    <p className="text-sm text-gray-500">Send a message to start the conversation</p>
                  </div>
                ) : (
                  Object.entries(groupedMessages()).map(([date, dateMessages]) => (
                    <div key={date}>
                      <div className="flex justify-center my-4">
                        <div className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                          {new Date(date).toLocaleDateString([], {weekday: 'long', month: 'short', day: 'numeric'})}
                        </div>
                      </div>
                      
                      {dateMessages.map((message, index) => (
                        <div
                          key={message._id}
                          className={`flex ${message.senderEmail === currentUserEmail ? 'justify-end' : 'justify-start'} mb-4`}
                        >
                          {message.senderEmail !== currentUserEmail && index > 0 && dateMessages[index-1].senderEmail === currentUserEmail && (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center mr-2 mt-auto">
                              {selectedConnection.receiverName.charAt(0).toUpperCase()}
                            </div>
                          )}
                          
                          <div
                            className={`rounded-2xl px-4 py-3 max-w-md ${
                              message.senderEmail === currentUserEmail
                                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                                : 'bg-white shadow-sm border border-gray-100'
                            }`}
                          >
                            <div className={`${message.senderEmail === currentUserEmail ? 'text-white' : 'text-gray-800'}`}>
                              {message.content}
                            </div>
                            <div className={`text-xs mt-1 ${
                              message.senderEmail === currentUserEmail
                                ? 'text-indigo-200'
                                : 'text-gray-500'
                            }`}>
                              {formatTimestamp(message.timestamp)}
                            </div>
                          </div>
                          
                          {message.senderEmail === currentUserEmail && index > 0 && dateMessages[index-1].senderEmail !== currentUserEmail && (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-500 text-white flex items-center justify-center ml-2 mt-auto">
                              {JSON.parse(localStorage.getItem('user'))?.username?.charAt(0).toUpperCase() || 'Y'}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ))
                )}
                {isTyping && selectedConnection && (
                  <div className="flex items-center space-x-2 text-gray-500 text-sm mb-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center">
                      {selectedConnection.receiverName.charAt(0).toUpperCase()}
                    </div>
                    <div className="bg-white py-2 px-4 rounded-xl shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              
              <div className="border-t border-gray-200 p-4 bg-white">
                {error && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                  </div>
                )}
                <form onSubmit={handleSendMessage} className="flex items-end">
                  <div className="flex-1 relative">
                    <textarea
                      rows="2"
                      value={messageContent}
                      onChange={(e) => setMessageContent(e.target.value)}
                      placeholder="Type your message..."
                      className="w-full border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pr-16 resize-none"
                    />
                    <div className="absolute bottom-2 right-2 flex space-x-1">
                      <button type="button" className="p-2 rounded-full hover:bg-gray-100 text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                      </button>
                      <button type="button" className="p-2 rounded-full hover:bg-gray-100 text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={!messageContent.trim() || loading}
                    className={`ml-2 h-10 w-10 rounded-full flex items-center justify-center ${
                      !messageContent.trim() || loading
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-md transition-all'
                    }`}
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    )}
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full p-6 mb-6 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Your Messages</h3>
              <p className="text-gray-500 max-w-md">Connect with your network and start meaningful conversations. Select a connection from the list to begin chatting.</p>
              <button className="mt-6 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                Find More Connections
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;