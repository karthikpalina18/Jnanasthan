import React, { useEffect, useRef, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import VideoPlayer from './VideoPlayer';

const Room = () => {
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  const username = searchParams.get('username');
  const navigate = useNavigate();

  const [peers, setPeers] = useState({});
  const [localStream, setLocalStream] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);
  const [error, setError] = useState('');

  const socketRef = useRef();
  const localVideoRef = useRef();
  const peerConnectionsRef = useRef({});
  const messagesEndRef = useRef(null);

  // Connect to socket.io server and set up WebRTC
  useEffect(() => {
    // Initialize socket connection
    const socket = io('http://localhost:5000', {
      query: { roomId, username }
    });
    socketRef.current = socket;

    // Get user media (camera and microphone)
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        console.log('Got local stream');
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        setIsConnecting(false);

        // Tell the server we've joined
        socket.emit('join-room', { roomId, username });

        // Set up socket event listeners
        setupSocketListeners(socket, stream);
      })
      .catch(err => {
        console.error('Error accessing media devices:', err);
        setError(`Could not access camera/microphone: ${err.message}`);
        setIsConnecting(false);
      });

    // Cleanup on unmount
    return () => {
      // Close all peer connections
      Object.values(peerConnectionsRef.current).forEach(pc => pc.close());
      
      // Stop all tracks in the local stream
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
      
      // Disconnect socket
      socket.disconnect();
    };
  }, [roomId, username]);

  // Setup all socket event listeners
  const setupSocketListeners = (socket, stream) => {
    // When a new user joins the room
    socket.on('user-joined', async ({ userId, username: peerUsername }) => {
      console.log(`${peerUsername} joined the room`);
      
      // Create a new peer connection for the user
      const peerConnection = createPeerConnection(userId, socket, stream);
      
      // Create and send an offer to the new user
      try {
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        socket.emit('offer', {
          target: userId,
          caller: socket.id,
          sdp: peerConnection.localDescription
        });
      } catch (err) {
        console.error('Error creating offer:', err);
      }
      
      // Add a system message
      addMessage({
        sender: 'System',
        content: `${peerUsername} joined the room`,
        timestamp: new Date(),
        isSystem: true
      });
    });

    // When receiving an offer from another peer
    socket.on('offer', async ({ caller, sdp }) => {
      console.log('Received offer');
      
      // Create a peer connection for the caller if it doesn't exist
      const peerConnection = createPeerConnection(caller, socket, stream);
      
      try {
        // Set the remote description from the offer
        await peerConnection.setRemoteDescription(new RTCSessionDescription(sdp));
        
        // Create and send an answer
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socket.emit('answer', {
          target: caller,
          caller: socket.id,
          sdp: peerConnection.localDescription
        });
      } catch (err) {
        console.error('Error handling offer:', err);
      }
    });

    // When receiving an answer to our offer
    socket.on('answer', async ({ caller, sdp }) => {
      console.log('Received answer');
      const peerConnection = peerConnectionsRef.current[caller];
      
      if (peerConnection) {
        try {
          await peerConnection.setRemoteDescription(new RTCSessionDescription(sdp));
        } catch (err) {
          console.error('Error setting remote description:', err);
        }
      }
    });

    // When receiving an ICE candidate from a peer
    socket.on('ice-candidate', async ({ candidate, from }) => {
      console.log('Received ICE candidate');
      const peerConnection = peerConnectionsRef.current[from];
      
      if (peerConnection) {
        try {
          await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (err) {
          console.error('Error adding ice candidate:', err);
        }
      }
    });

    // When a user leaves the room
    socket.on('user-left', ({ userId, username: peerUsername }) => {
      console.log(`${peerUsername} left the room`);
      
      // Close and remove the peer connection
      if (peerConnectionsRef.current[userId]) {
        peerConnectionsRef.current[userId].close();
        delete peerConnectionsRef.current[userId];
      }
      
      // Remove the peer from state
      setPeers(prevPeers => {
        const newPeers = { ...prevPeers };
        delete newPeers[userId];
        return newPeers;
      });
      
      // Add a system message
      addMessage({
        sender: 'System',
        content: `${peerUsername} left the room`,
        timestamp: new Date(),
        isSystem: true
      });
    });

    // When receiving a chat message
    socket.on('chat-message', message => {
      addMessage(message);
    });

    // Handle any errors
    socket.on('error', err => {
      console.error('Socket error:', err);
      setError(`Connection error: ${err.message}`);
    });
  };

  // Helper function to create a new RTCPeerConnection
  const createPeerConnection = (peerId, socket, stream) => {
    // ICE servers configuration (STUN/TURN)
    const iceServers = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' }
      ]
    };
    
    // Create new connection
    const peerConnection = new RTCPeerConnection(iceServers);
    peerConnectionsRef.current[peerId] = peerConnection;
    
    // Add all local tracks to the connection
    stream.getTracks().forEach(track => {
      peerConnection.addTrack(track, stream);
    });
    
    // Handle incoming tracks from the peer
    peerConnection.ontrack = event => {
      console.log('Got remote track');
      setPeers(prevPeers => ({
        ...prevPeers,
        [peerId]: {
          stream: event.streams[0]
        }
      }));
    };
    
    // When we have ICE candidates, send them to the peer
    peerConnection.onicecandidate = event => {
      if (event.candidate) {
        socket.emit('ice-candidate', {
          target: peerId,
          candidate: event.candidate
        });
      }
    };
    
    // Log connection state changes
    peerConnection.onconnectionstatechange = () => {
      console.log(`Connection state with ${peerId}: ${peerConnection.connectionState}`);
    };
    
    return peerConnection;
  };

  // Add a message to the chat
  const addMessage = (message) => {
    setMessages(prev => [...prev, message]);
  };

  // Send a chat message
  const sendMessage = (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    const message = {
      sender: username,
      content: newMessage,
      timestamp: new Date()
    };
    
    socketRef.current.emit('send-message', {
      roomId,
      message
    });
    
    addMessage(message);
    setNewMessage('');
  };

  // Toggle audio
  const toggleAudio = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    }
  };

  // Toggle video
  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOff(!videoTrack.enabled);
      }
    }
  };

  // Leave the room
  const leaveRoom = () => {
    navigate('/');
  };

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (isConnecting) {
    return (
      <div className="connecting">
        <h2>Connecting to room: {roomId}</h2>
        <p>Please allow camera and microphone access when prompted...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/')}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="room-container">
      <div className="room-header">
        <h2>Room: {roomId}</h2>
        <p>Joined as: {username}</p>
      </div>

      <div className="video-grid">
        {/* Local video */}
        <div className="video-container local-video">
          <video 
            ref={localVideoRef} 
            muted 
            autoPlay 
            playsInline
            className={isVideoOff ? 'video-off' : ''}
          />
          <div className="video-label">You {isMuted && '(muted)'}</div>
        </div>

        {/* Remote videos */}
        {Object.entries(peers).map(([peerId, { stream }]) => (
          <VideoPlayer 
            key={peerId} 
            stream={stream} 
          />
        ))}
      </div>

      <div className="controls">
        <button 
          onClick={toggleAudio}
          className={isMuted ? 'control-button muted' : 'control-button'}
        >
          {isMuted ? 'Unmute' : 'Mute'}
        </button>
        
        <button 
          onClick={toggleVideo}
          className={isVideoOff ? 'control-button video-off' : 'control-button'}
        >
          {isVideoOff ? 'Turn On Video' : 'Turn Off Video'}
        </button>
        
        <button 
          onClick={leaveRoom}
          className="control-button leave"
        >
          Leave
        </button>
      </div>

      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`message ${msg.sender === username ? 'sent' : 'received'} ${msg.isSystem ? 'system' : ''}`}
            >
              <div className="message-header">
                <span className="sender">{msg.sender}</span>
                <span className="timestamp">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div className="message-content">{msg.content}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={sendMessage} className="chat-input">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Room;